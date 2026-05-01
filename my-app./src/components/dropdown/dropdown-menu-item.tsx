"use client";

/**
 * DropdownMenuItem (Atom)
 * ----------------------------------------------------------------
 * Figma node: 13292:55986 — Dropdown / Menu item
 *
 * 함께 export 합니다.
 *   - <DropdownMenuItem />       : 일반 항목 (level 1·2·3)
 *   - <DropdownMenuHeader />     : 섹션 라벨 (non-interactive)
 *   - <DropdownMenuDivider />    : 그룹 구분선 (non-interactive)
 *
 * 인터랙션은 atom 단계에서 외부 의존성 없이 자체 구현합니다.
 *   - click / Enter / Space → onSelect
 *   - disabled 시 모든 트리거 차단
 */

import type {
  ButtonHTMLAttributes,
  ForwardedRef,
  HTMLAttributes,
  KeyboardEvent,
  MouseEvent,
  ReactNode,
} from "react";
import { forwardRef } from "react";

import styles from "./dropdown-menu-item.module.css";

/* -----------------------------------------------------------------
 * Types
 * --------------------------------------------------------------- */
export type DropdownMenuItemLevel = 1 | 2 | 3;

export type DropdownMenuItemProps = Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  "onSelect" | "type"
> & {
  /** Indent depth (1·2·3). default 1 */
  level?: DropdownMenuItemLevel;
  /** 현재 선택 상태 */
  selected?: boolean;
  /** 비활성 */
  disabled?: boolean;
  /** 좌측 16px 아이콘 슬롯 */
  leadingIcon?: ReactNode;
  /** 우측 16px 아이콘 슬롯 (hasSubmenu 가 true면 무시되고 기본 chevron 노출) */
  trailingIcon?: ReactNode;
  /** 우측 텍스트 힌트 (예: 단축키) */
  trailingHint?: ReactNode;
  /** 하위 메뉴 진입 표시 — 우측에 chevron-right */
  hasSubmenu?: boolean;
  /** 선택 콜백 (click 또는 Enter / Space) */
  onSelect?: () => void;
  children?: ReactNode;
};

export type DropdownMenuHeaderProps = HTMLAttributes<HTMLDivElement> & {
  children?: ReactNode;
};

export type DropdownMenuDividerProps = HTMLAttributes<HTMLDivElement>;

/* -----------------------------------------------------------------
 * Helpers
 * --------------------------------------------------------------- */
function joinClasses(...classes: Array<string | undefined | false | null>) {
  return classes.filter(Boolean).join(" ");
}

const LEVEL_CLASS: Record<DropdownMenuItemLevel, string | undefined> = {
  1: undefined,
  2: styles.level2,
  3: styles.level3,
};

/** 기본 chevron-right (CSS mask 사용 가능 환경에서 동일 패턴이지만,
 *  외부 의존 최소화를 위해 inline SVG 로 그려 currentColor 상속 */
function ChevronRight() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M6 4L10 8L6 12"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/* -----------------------------------------------------------------
 * DropdownMenuItem
 * --------------------------------------------------------------- */
function DropdownMenuItemInner(
  props: DropdownMenuItemProps,
  ref: ForwardedRef<HTMLButtonElement>,
) {
  const {
    level = 1,
    selected = false,
    disabled = false,
    leadingIcon,
    trailingIcon,
    trailingHint,
    hasSubmenu = false,
    onSelect,
    onClick,
    onKeyDown,
    children,
    className,
    ...rest
  } = props;

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    if (disabled) {
      event.preventDefault();
      return;
    }
    onClick?.(event);
    if (!event.defaultPrevented) {
      onSelect?.();
    }
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    onKeyDown?.(event);
    if (event.defaultPrevented || disabled) return;
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      onSelect?.();
    }
  };

  const trailing = hasSubmenu ? <ChevronRight /> : trailingIcon;

  const classes = joinClasses(
    styles.item,
    LEVEL_CLASS[level],
    selected && styles.itemSelected,
    className,
  );

  return (
    <button
      {...rest}
      ref={ref}
      type="button"
      role="menuitem"
      className={classes}
      data-level={level}
      data-selected={selected || undefined}
      data-disabled={disabled || undefined}
      data-has-submenu={hasSubmenu || undefined}
      aria-disabled={disabled || undefined}
      aria-haspopup={hasSubmenu ? "menu" : undefined}
      disabled={disabled}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
    >
      {leadingIcon !== undefined ? (
        <span className={styles.leading} aria-hidden="true">
          {leadingIcon}
        </span>
      ) : null}

      <span className={styles.label}>{children}</span>

      {trailingHint != null ? (
        <span className={styles.hint} aria-hidden="true">
          {trailingHint}
        </span>
      ) : null}

      {trailing !== undefined && trailing !== null ? (
        <span className={styles.trailing} aria-hidden="true">
          {trailing}
        </span>
      ) : null}
    </button>
  );
}

export const DropdownMenuItem = forwardRef<
  HTMLButtonElement,
  DropdownMenuItemProps
>(DropdownMenuItemInner);
DropdownMenuItem.displayName = "DropdownMenuItem";

/* -----------------------------------------------------------------
 * DropdownMenuHeader
 * --------------------------------------------------------------- */
function DropdownMenuHeaderInner(
  props: DropdownMenuHeaderProps,
  ref: ForwardedRef<HTMLDivElement>,
) {
  const { className, children, ...rest } = props;
  return (
    <div
      {...rest}
      ref={ref}
      role="presentation"
      className={joinClasses(styles.header, className)}
    >
      {children}
    </div>
  );
}

export const DropdownMenuHeader = forwardRef<
  HTMLDivElement,
  DropdownMenuHeaderProps
>(DropdownMenuHeaderInner);
DropdownMenuHeader.displayName = "DropdownMenuHeader";

/* -----------------------------------------------------------------
 * DropdownMenuDivider
 * --------------------------------------------------------------- */
function DropdownMenuDividerInner(
  props: DropdownMenuDividerProps,
  ref: ForwardedRef<HTMLDivElement>,
) {
  const { className, ...rest } = props;
  return (
    <div
      {...rest}
      ref={ref}
      role="separator"
      aria-orientation="horizontal"
      className={joinClasses(styles.divider, className)}
    />
  );
}

export const DropdownMenuDivider = forwardRef<
  HTMLDivElement,
  DropdownMenuDividerProps
>(DropdownMenuDividerInner);
DropdownMenuDivider.displayName = "DropdownMenuDivider";

export default DropdownMenuItem;
