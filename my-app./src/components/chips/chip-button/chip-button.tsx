"use client";

import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from "react";
import styles from "./chip-button.module.css";

export type ChipButtonState = "default" | "hovered" | "selected";

export interface ChipButtonProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "type"> {
  state?: ChipButtonState;
  /** 좌측 아이콘 (ReactNode) 또는 boolean true 이면 내장 Search 아이콘 사용 */
  icon?: ReactNode | boolean;
  /** 선택 여부 (state 를 직접 쓰지 않아도 되는 편의 prop) */
  selected?: boolean;
  /** Storybook 강제 상태 표시용 */
  forceState?: "default" | "hover" | "selected";
}

export const ChipButton = forwardRef<HTMLButtonElement, ChipButtonProps>(
  function ChipButton(
    {
      state: stateProp,
      icon,
      selected,
      forceState,
      className,
      children,
      disabled,
      ...rest
    },
    ref,
  ) {
    const state: ChipButtonState =
      stateProp ?? (selected ? "selected" : "default");

    const renderIcon = () => {
      if (!icon) return null;
      if (icon === true) {
        return (
          <span className={styles.icon} aria-hidden="true">
            <span className={styles.iconMask} />
          </span>
        );
      }
      return <span className={styles.icon} aria-hidden="true">{icon}</span>;
    };

    return (
      <button
        ref={ref}
        type="button"
        className={[styles.btn, className].filter(Boolean).join(" ")}
        data-state={state}
        data-selected={selected || undefined}
        data-force-state={forceState}
        disabled={disabled}
        aria-pressed={state === "selected" || selected}
        {...rest}
      >
        {renderIcon()}
        <span className={styles.inner}>{children}</span>
      </button>
    );
  },
);
