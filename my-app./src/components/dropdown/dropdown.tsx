"use client";

/**
 * Dropdown (Composite)
 * ----------------------------------------------------------------
 * Trigger + Menu 통합 컴포넌트.
 *
 * 기능
 *   - open/close (controlled + uncontrolled)
 *   - outside click → close
 *   - ESC → close + trigger focus 복귀
 *   - item 클릭 시 자동 close (closeOnSelect)
 *   - ArrowUp / ArrowDown 키보드 네비게이션
 *   - 위치 결정 (dropDirection × align)
 *   - showArrow=true 일 때 placement 에 맞춰 arrow 자동 매핑
 *
 * 의존
 *   - DropdownTrigger
 *   - DropdownMenu
 *
 * children: DropdownMenuItem · Divider · Header · Custom 노드
 */

import type { ReactNode } from "react";
import {
  useCallback,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
} from "react";

import { DropdownMenu, type DropdownMenuArrow } from "./dropdown-menu";
import {
  DropdownTrigger,
  type DropdownTriggerSize,
  type DropdownTriggerType,
} from "./dropdown-trigger";

import styles from "./dropdown.module.css";

/* -----------------------------------------------------------------
 * Types
 * --------------------------------------------------------------- */
type Dim = number | string;

export type DropdownDirection = "down" | "up" | "left" | "right";
export type DropdownAlign = "start" | "center" | "end";

export type DropdownProps = {
  /** controlled open state */
  open?: boolean;
  /** uncontrolled 초기값 */
  defaultOpen?: boolean;
  /** open 상태 변경 콜백 */
  onOpenChange?: (open: boolean) => void;

  /* ---- trigger ---- */
  triggerLabel: ReactNode;
  triggerType?: DropdownTriggerType;
  triggerSize?: DropdownTriggerSize;
  triggerSplitButton?: boolean;
  triggerLeftIcon?: ReactNode;
  triggerDisabled?: boolean;
  /** split mode 메인 영역 클릭 (chevron 영역은 자동 toggle) */
  onTriggerMainClick?: () => void;

  /* ---- positioning ---- */
  dropDirection?: DropdownDirection;
  align?: DropdownAlign;
  showArrow?: boolean;
  /** 트리거-메뉴 간격(px). default 4 */
  offset?: number;

  /* ---- menu ---- */
  menuMinWidth?: Dim;
  menuMaxHeight?: Dim;
  menuAriaLabel?: string;

  /** item 선택 시 자동 close. default true */
  closeOnSelect?: boolean;

  children: ReactNode;
};

/* -----------------------------------------------------------------
 * Helpers
 * --------------------------------------------------------------- */
function resolveArrow(
  showArrow: boolean,
  dir: DropdownDirection,
  align: DropdownAlign,
): DropdownMenuArrow {
  if (!showArrow) return "none";
  // arrow 는 메뉴의 trigger 쪽 변에 위치 → direction 의 반대편
  // down → 메뉴 top 변에 arrow / up → bottom 변
  // left/right 는 Figma 미지원이라 none
  if (dir === "down") return `top-${align}` as DropdownMenuArrow;
  if (dir === "up") return `bottom-${align}` as DropdownMenuArrow;
  return "none";
}

/** 메뉴 안에서 활성화 가능한 menuitem 목록 */
function getMenuItems(menu: HTMLElement | null): HTMLElement[] {
  if (!menu) return [];
  return Array.from(
    menu.querySelectorAll<HTMLElement>(
      '[role="menuitem"]:not([disabled]):not([data-disabled="true"])',
    ),
  );
}

/* -----------------------------------------------------------------
 * Component
 * --------------------------------------------------------------- */
export function Dropdown(props: DropdownProps) {
  const {
    open: controlledOpen,
    defaultOpen = false,
    onOpenChange,

    triggerLabel,
    triggerType = "primary",
    triggerSize = "medium",
    triggerSplitButton = false,
    triggerLeftIcon,
    triggerDisabled = false,
    onTriggerMainClick,

    dropDirection = "down",
    align = "start",
    showArrow = false,
    offset = 4,

    menuMinWidth,
    menuMaxHeight,
    menuAriaLabel,

    closeOnSelect = true,

    children,
  } = props;

  /* ---- open state (controlled / uncontrolled) ---- */
  const isControlled = controlledOpen !== undefined;
  const [internalOpen, setInternalOpen] = useState(defaultOpen);
  const open = isControlled ? controlledOpen : internalOpen;

  const setOpen = useCallback(
    (next: boolean) => {
      if (!isControlled) setInternalOpen(next);
      onOpenChange?.(next);
    },
    [isControlled, onOpenChange],
  );

  /* ---- refs / id ---- */
  const triggerRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const menuId = useId();

  /* ---- outside click + ESC ---- */
  useEffect(() => {
    if (!open) return;

    const handleDocPointer = (event: MouseEvent) => {
      const target = event.target as Node | null;
      if (!target) return;
      if (triggerRef.current?.contains(target)) return;
      if (menuRef.current?.contains(target)) return;
      setOpen(false);
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.stopPropagation();
        setOpen(false);
        triggerRef.current?.focus();
      }
    };

    document.addEventListener("mousedown", handleDocPointer);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleDocPointer);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open, setOpen]);

  /* ---- 메뉴 키보드 네비게이션 (Arrow Up/Down) ---- */
  const handleMenuKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLDivElement>) => {
      if (event.key !== "ArrowDown" && event.key !== "ArrowUp") return;
      event.preventDefault();

      const items = getMenuItems(menuRef.current);
      if (items.length === 0) return;

      const activeEl = document.activeElement as HTMLElement | null;
      const currentIdx = activeEl ? items.indexOf(activeEl) : -1;

      let nextIdx: number;
      if (event.key === "ArrowDown") {
        nextIdx = currentIdx < 0 ? 0 : (currentIdx + 1) % items.length;
      } else {
        nextIdx =
          currentIdx <= 0 ? items.length - 1 : (currentIdx - 1) % items.length;
      }
      items[nextIdx]?.focus();
    },
    [],
  );

  /* ---- 메뉴 열림 시 첫 item focus ---- */
  useEffect(() => {
    if (!open) return;
    // mount 직후 focus 이동
    const id = window.requestAnimationFrame(() => {
      const items = getMenuItems(menuRef.current);
      items[0]?.focus();
    });
    return () => window.cancelAnimationFrame(id);
  }, [open]);

  /* ---- item click 시 자동 close ---- */
  const handleMenuClickCapture = useCallback(
    (event: React.MouseEvent<HTMLDivElement>) => {
      if (!closeOnSelect) return;
      const target = event.target as HTMLElement | null;
      const item = target?.closest('[role="menuitem"]') as HTMLElement | null;
      if (!item) return;
      if (item.dataset.disabled === "true") return;
      if (item.dataset.hasSubmenu === "true") return; // 서브메뉴 진입 시는 close 안 함
      // 클릭 핸들러 실행 후 close (microtask)
      Promise.resolve().then(() => {
        setOpen(false);
        triggerRef.current?.focus();
      });
    },
    [closeOnSelect, setOpen],
  );

  /* ---- toggle ---- */
  const toggle = useCallback(() => setOpen(!open), [open, setOpen]);

  /* ---- arrow 자동 매핑 ---- */
  const menuArrow = useMemo(
    () => resolveArrow(showArrow, dropDirection, align),
    [showArrow, dropDirection, align],
  );

  /* ---- render ---- */
  return (
    <div className={styles.root}>
      <DropdownTrigger
        ref={triggerRef}
        type={triggerType}
        size={triggerSize}
        splitButton={triggerSplitButton}
        dropDirection={dropDirection}
        leftIcon={triggerLeftIcon}
        disabled={triggerDisabled}
        opened={open}
        aria-expanded={open}
        aria-controls={menuId}
        aria-haspopup="menu"
        onToggle={toggle}
        onMainClick={onTriggerMainClick}
        onChevronClick={toggle}
      >
        {triggerLabel}
      </DropdownTrigger>

      {open ? (
        <div
          className={styles.menuWrapper}
          data-direction={dropDirection}
          data-align={align}
          data-arrow={menuArrow !== "none" ? "true" : undefined}
          style={{ ["--dd-offset" as string]: `${offset}px` }}
          onKeyDown={handleMenuKeyDown}
          onClickCapture={handleMenuClickCapture}
        >
          <DropdownMenu
            ref={menuRef}
            id={menuId}
            arrow={menuArrow}
            minWidth={menuMinWidth}
            maxHeight={menuMaxHeight}
            aria-label={menuAriaLabel}
          >
            {children}
          </DropdownMenu>
        </div>
      ) : null}
    </div>
  );
}

Dropdown.displayName = "Dropdown";

export default Dropdown;
