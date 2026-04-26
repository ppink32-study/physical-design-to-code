"use client";
/* =============================================================================
 * SelectItem — Figma Code Connect (node 4811:36049)
 * -----------------------------------------------------------------------------
 * Select 드롭다운 내부의 옵션 행(row).
 *
 * Variants
 *   type  : "1-level" | "2-level"  (2-level 은 우측 ChevronRight 로 하위 메뉴 표시)
 *   size  : "medium" | "large"     (medium py=6, large py=10)
 *   state : "default" | "hover" | "select"   (하드 변경용)
 *     - selected prop 을 통해 논리적 선택도 지원
 *
 * Props
 *   - children : 메인 라벨
 *   - badge    : 우측에 노출할 Badge 노드 (문자열/커스텀 노드 모두 허용)
 *   - onSelect : 클릭 시 호출 (onClick 과 별개로 의미를 분리)
 *   - disabled, selected
 * ========================================================================== */
import {
  forwardRef,
  type ButtonHTMLAttributes,
  type ReactNode,
} from "react";
import styles from "./selectitem.module.css";

export type SelectItemSize = "medium" | "large";
export type SelectItemType = "1-level" | "2-level";
export type SelectItemState = "default" | "hover" | "select";

export interface SelectItemProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "type"> {
  size?: SelectItemSize;
  type?: SelectItemType;
  state?: SelectItemState;
  selected?: boolean;
  badge?: ReactNode;
}

export const SelectItem = forwardRef<HTMLButtonElement, SelectItemProps>(
  function SelectItem(
    {
      size = "medium",
      type = "1-level",
      state: stateProp,
      selected,
      badge,
      disabled,
      className,
      children,
      ...rest
    },
    ref,
  ) {
    const state: SelectItemState =
      stateProp ?? (selected ? "select" : "default");

    return (
      <button
        ref={ref}
        type="button"
        role="option"
        aria-selected={selected}
        aria-disabled={disabled || undefined}
        disabled={disabled}
        className={[styles.item, className].filter(Boolean).join(" ")}
        data-size={size}
        data-type={type}
        data-state={state}
        data-selected={selected || undefined}
        {...rest}
      >
        <span className={styles.inner}>
          <span className={styles.label}>{children}</span>
          {badge != null && <span className={styles.badge}>{badge}</span>}
        </span>

        {type === "2-level" && (
          <span className={styles.trailingIcon} aria-hidden="true">
            <span className={styles.chevronRightMask} />
          </span>
        )}
        {type === "1-level" && selected && (
          <span className={styles.trailingIcon} aria-hidden="true">
            <span className={styles.checkMask} />
          </span>
        )}
      </button>
    );
  },
);
