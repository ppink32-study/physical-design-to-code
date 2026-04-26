"use client";

import { forwardRef, type ButtonHTMLAttributes, type HTMLAttributes } from "react";
import styles from "./input-chip.module.css";

export type InputChipSize = "medium" | "large";
export type InputChipType = "normal" | "error";
export type InputChipState = "default" | "readonly" | "disable";

export interface InputChipProps
  extends Omit<HTMLAttributes<HTMLSpanElement>, "onClick"> {
  size?: InputChipSize;
  type?: InputChipType;
  state?: InputChipState;
  /**
   * 닫기(×) 아이콘 표시 여부. `state="readonly"` 인 경우 강제로 숨겨집니다.
   * 기본값 true.
   */
  closeIcon?: boolean;
  /** 닫기 버튼 클릭 핸들러 */
  onClose?: () => void;
  /** 닫기 버튼 접근성 라벨 */
  closeAriaLabel?: string;
  /** Storybook 등에서 상태를 강제로 보여주기 위한 override */
  forceState?: "default" | "hover" | "disable";
}

export const InputChip = forwardRef<HTMLSpanElement, InputChipProps>(function InputChip(
  {
    size = "medium",
    type = "normal",
    state = "default",
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
  const disabled = state === "disable" || forceState === "disable";
  const readonly = state === "readonly";

  return (
    <span
      ref={ref}
      className={[styles.chip, className].filter(Boolean).join(" ")}
      data-size={size}
      data-type={type}
      data-state={state}
      data-force-state={forceState}
      aria-disabled={disabled || undefined}
      {...rest}
    >
      <span className={styles.label}>{children}</span>
      {closeIcon && (
        <CloseButton
          ariaLabel={closeAriaLabel}
          onClick={onClose}
          disabled={disabled || readonly}
        />
      )}
    </span>
  );
});

interface CloseButtonProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children"> {
  ariaLabel: string;
}

function CloseButton({ ariaLabel, disabled, onClick, ...rest }: CloseButtonProps) {
  return (
    <button
      type="button"
      className={styles.close}
      aria-label={ariaLabel}
      disabled={disabled}
      onClick={onClick}
      {...rest}
    >
      <span className={styles.closeIcon} aria-hidden="true" />
    </button>
  );
}
