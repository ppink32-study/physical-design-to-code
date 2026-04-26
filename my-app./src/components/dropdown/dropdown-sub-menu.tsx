"use client";

/**
 * DropdownSubMenu — Multi-level (depth 2)
 * ----------------------------------------------------------------
 * Figma node: 13292:56877 — Dropdown / Dropdown Menu - Multiple levels
 *                            (type=drill down)
 *
 * 부모 DropdownMenu 안에서 한 menuitem 처럼 동작하면서, 우측에 자체
 * DropdownMenu(depth 2) 를 띄운다. depth 2 까지만 지원한다.
 *
 * Open 트리거 (3종 동시 지원)
 *   - Mouse hover (200ms intent delay) → open / leave (200ms) → close
 *   - Click (mouse / touch) → toggle
 *   - Keyboard ArrowRight / Enter / Space (트리거 focus 상태) → open + sub 첫 item focus
 *
 * Close 트리거
 *   - mouse leave (delay)
 *   - sub 안 ArrowLeft → close + 트리거 focus 복귀
 *   - ESC (capture 단계, stopPropagation) → 가장 깊은 sub 부터 닫기
 *   - sub item 선택 → bubble 으로 root Dropdown 의 closeOnSelect 가 root 를 닫음
 *
 * 외부 의존
 *   - DropdownMenu (container)
 *   - DropdownMenuItem (트리거)
 *
 * 외부 영향
 *   - 부모 Dropdown.tsx 변경 없음
 *     · 부모의 ESC keydown 은 bubble 단계, sub 의 ESC 는 capture 단계 +
 *       stopPropagation 으로 자연 차단됨.
 *     · 부모의 closeOnSelect 는 트리거 항목의 data-has-submenu="true" 로
 *       이미 close 안 함.
 *     · 부모의 ArrowDown/Up 은 sub 의 같은 키 핸들러가 stopPropagation 으로 차단.
 */

import type {
  KeyboardEvent as ReactKeyboardEvent,
  ReactNode,
} from "react";
import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
} from "react";

import { DropdownMenu } from "./dropdown-menu";
import {
  DropdownMenuItem,
  type DropdownMenuItemLevel,
} from "./dropdown-menu-item";

import styles from "./dropdown-sub-menu.module.css";

/* -----------------------------------------------------------------
 * Constants
 * --------------------------------------------------------------- */
const HOVER_OPEN_DELAY_MS = 200;
const HOVER_CLOSE_DELAY_MS = 200;

/* -----------------------------------------------------------------
 * Types
 * --------------------------------------------------------------- */
type Dim = number | string;

export type DropdownSubMenuProps = {
  /** 트리거 라벨 */
  label: ReactNode;
  /** 트리거 좌측 16px 아이콘 */
  leadingIcon?: ReactNode;
  /** 트리거 비활성화 (sub 열림 차단 + 시각 disabled) */
  disabled?: boolean;
  /** 트리거 indent depth (parent menu 안에서의 level). default 1 */
  level?: DropdownMenuItemLevel;

  /** sub menu 자식 (DropdownMenuItem · Header 등) */
  children: ReactNode;

  /** sub menu min width. default 180 (DropdownMenu 기본) */
  menuMinWidth?: Dim;
  /** sub menu 고정 width */
  menuWidth?: Dim;
  /** sub menu max height. 지정 시 sub 내부 list 가 스크롤 */
  menuMaxHeight?: Dim;
  /** sub menu aria-label */
  menuAriaLabel?: string;

  /** 좌측으로 펼치기 (자동 flip 미지원, 강제 옵션) */
  flip?: boolean;

  /** 외부에서 hover/keyboard delay 커스터마이즈 */
  openDelayMs?: number;
  closeDelayMs?: number;
};

/* -----------------------------------------------------------------
 * Helpers
 * --------------------------------------------------------------- */
function getFocusableMenuItems(menu: HTMLElement | null): HTMLElement[] {
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
export function DropdownSubMenu(props: DropdownSubMenuProps) {
  const {
    label,
    leadingIcon,
    disabled = false,
    level = 1,
    children,
    menuMinWidth,
    menuWidth,
    menuMaxHeight,
    menuAriaLabel,
    flip = false,
    openDelayMs = HOVER_OPEN_DELAY_MS,
    closeDelayMs = HOVER_CLOSE_DELAY_MS,
  } = props;

  /* ---- state / refs ---- */
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const subMenuRef = useRef<HTMLDivElement>(null);
  const subId = useId();

  const openTimerRef = useRef<number | null>(null);
  const closeTimerRef = useRef<number | null>(null);

  /* ---- timer 관리 ---- */
  const clearTimers = useCallback(() => {
    if (openTimerRef.current != null) {
      window.clearTimeout(openTimerRef.current);
      openTimerRef.current = null;
    }
    if (closeTimerRef.current != null) {
      window.clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
  }, []);

  useEffect(() => {
    return () => clearTimers();
  }, [clearTimers]);

  /* ---- hover delay open / close ---- */
  const scheduleOpen = useCallback(() => {
    if (disabled) return;
    if (closeTimerRef.current != null) {
      window.clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
    if (open || openTimerRef.current != null) return;
    openTimerRef.current = window.setTimeout(() => {
      openTimerRef.current = null;
      setOpen(true);
    }, openDelayMs);
  }, [disabled, open, openDelayMs]);

  const scheduleClose = useCallback(() => {
    if (openTimerRef.current != null) {
      window.clearTimeout(openTimerRef.current);
      openTimerRef.current = null;
    }
    if (!open || closeTimerRef.current != null) return;
    closeTimerRef.current = window.setTimeout(() => {
      closeTimerRef.current = null;
      setOpen(false);
    }, closeDelayMs);
  }, [open, closeDelayMs]);

  /* ---- ESC (capture phase, root 보다 먼저 처리) ---- */
  useEffect(() => {
    if (!open) return;

    const handleEsc = (event: globalThis.KeyboardEvent) => {
      if (event.key !== "Escape") return;
      event.stopPropagation();
      // bubble 단계의 root Dropdown ESC 는 stopPropagation 으로 차단됨.
      clearTimers();
      setOpen(false);
      triggerRef.current?.focus();
    };

    document.addEventListener("keydown", handleEsc, true);
    return () => {
      document.removeEventListener("keydown", handleEsc, true);
    };
  }, [open, clearTimers]);

  /* ---- 메뉴 열림 시 첫 item 자동 focus ---- */
  useEffect(() => {
    if (!open) return;
    const id = window.requestAnimationFrame(() => {
      const items = getFocusableMenuItems(subMenuRef.current);
      items[0]?.focus();
    });
    return () => window.cancelAnimationFrame(id);
  }, [open]);

  /* ---- sub menu 안 키보드 네비게이션 ---- */
  const handleSubKeyDown = useCallback(
    (event: ReactKeyboardEvent<HTMLDivElement>) => {
      // ArrowLeft → sub close + 트리거 focus
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        event.stopPropagation();
        clearTimers();
        setOpen(false);
        triggerRef.current?.focus();
        return;
      }

      // ArrowDown / ArrowUp → sub items 순환 (root 까지 bubble 차단)
      if (event.key === "ArrowDown" || event.key === "ArrowUp") {
        event.preventDefault();
        event.stopPropagation();

        const items = getFocusableMenuItems(subMenuRef.current);
        if (items.length === 0) return;

        const activeEl = document.activeElement as HTMLElement | null;
        const currentIdx = activeEl ? items.indexOf(activeEl) : -1;

        let nextIdx: number;
        if (event.key === "ArrowDown") {
          nextIdx = currentIdx < 0 ? 0 : (currentIdx + 1) % items.length;
        } else {
          nextIdx =
            currentIdx <= 0
              ? items.length - 1
              : (currentIdx - 1) % items.length;
        }
        items[nextIdx]?.focus();
      }
    },
    [clearTimers],
  );

  /* ---- 트리거 인터랙션 ---- */
  const handleTriggerClick = useCallback(() => {
    if (disabled) return;
    clearTimers();
    setOpen((prev) => !prev);
  }, [disabled, clearTimers]);

  const handleTriggerKeyDown = useCallback(
    (event: ReactKeyboardEvent<HTMLButtonElement>) => {
      if (disabled) return;
      // ArrowRight / Enter / Space → open + 첫 item focus
      if (
        event.key === "ArrowRight" ||
        event.key === "Enter" ||
        event.key === " "
      ) {
        event.preventDefault();
        event.stopPropagation();
        clearTimers();
        if (!open) setOpen(true);
        return;
      }
      // ArrowLeft 가 트리거에서 눌리면 sub 가 닫혀있을 때는 무시
      // (root 의 ArrowDown/Up 만 bubble)
    },
    [disabled, open, clearTimers],
  );

  /* ---- render ---- */
  return (
    <div
      className={styles.root}
      onMouseEnter={scheduleOpen}
      onMouseLeave={scheduleClose}
    >
      <DropdownMenuItem
        ref={triggerRef}
        leadingIcon={leadingIcon}
        hasSubmenu
        disabled={disabled}
        level={level}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-controls={subId}
        data-submenu-open={open ? "true" : undefined}
        onClick={handleTriggerClick}
        onKeyDown={handleTriggerKeyDown}
      >
        {label}
      </DropdownMenuItem>

      {open ? (
        <div
          className={styles.submenu}
          data-flip={flip ? "true" : undefined}
          onKeyDown={handleSubKeyDown}
          // mouse 가 sub 안으로 이동해도 root onMouseEnter/Leave 가 정상 동작.
          // sub 자체는 root 의 자식이므로 별도 handler 불필요.
        >
          <DropdownMenu
            ref={subMenuRef}
            id={subId}
            minWidth={menuMinWidth}
            width={menuWidth}
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

DropdownSubMenu.displayName = "DropdownSubMenu";

export default DropdownSubMenu;
