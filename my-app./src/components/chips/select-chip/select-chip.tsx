"use client";

import { forwardRef, type ButtonHTMLAttributes, type HTMLAttributes } from "react";
import styles from "./select-chip.module.css";

export type SelectChipSize = "medium" | "large";
export type SelectChipState = "default" | "readonly" | "disable";

export interface SelectChipProps
  extends Omit<HTMLAttributes<HTMLSpanElement>, "onClick"> {
  size?: SelectChipSize;
  state?: SelectChipState;
  /** true 이면 WarningFill 아이콘 + red border 표시 */
  error?: boolean;
  /** 닫기(×) 아이콘 표시 여부 (기본 true) */
  closeIcon?: boolean;
  /** 닫기 버튼 클릭 핸들러 */
  onClose?: () => void;
  closeAriaLabel?: string;
  /** Storybook 강제 상태 표시용 */
  forceState?: "default" | "hover" | "disable";
}

export const SelectChip = forwardRef<HTMLSpanElement, SelectChipProps>(
  function SelectChip(
    {
      size = "medium",
      state = "default",
      error = false,
      closeIcon = true,
      onClose,
      closeAriaLabel = "삭제",
      forceState,
      className,
      children,
      ...rest
    },
    ref,
  ) {
    const isDisabled = state === "disable" || forceState === "disable";

    return (
      <span
        ref={ref}
        className={[styles.chip, className].filter(Boolean).join(" ")}
        data-size={size}
        data-state={state}
        data-error={error || undefined}
        data-force-state={forceState}
        aria-disabled={isDisabled || undefined}
        {...rest}
      >
        <span className={styles.content}>
          {error && (
            <span className={styles.warningIcon} aria-hidden="true">
              <span className={styles.warningIconMask} />
            </span>
          )}
          <span className={styles.label}>{children}</span>
        </span>

        {closeIcon && (
          <CloseButton
            ariaLabel={closeAriaLabel}
            onClick={onClose}
            disabled={isDisabled || state === "readonly"}
            state={state}
            forceState={forceState}
          />
        )}
      </span>
    );
  },
);

interface CloseButtonProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children" | "className"> {
  ariaLabel: string;
  state?: SelectChipState;
  forceState?: string;
}

function CloseButton({ ariaLabel, disabled, onClick, ...rest }: CloseButtonProps) {
  return (
    <button
      type="button"
      className={styles.closeBtn}
      aria-label={ariaLabel}
      disabled={disabled}
      onClick={onClick}
    >
      <span className={styles.closeIcon} aria-hidden="true" />
    </button>
  );
}
