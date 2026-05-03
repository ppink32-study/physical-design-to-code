"use client";

import { forwardRef, type HTMLAttributes } from "react";
import styles from "./search-chip.module.css";
import { XButton } from "@/components/button/x-button/x-button";

export type SearchChipState = "default" | "hover" | "selected" | "error" | "disable";

export interface SearchChipProps
  extends Omit<HTMLAttributes<HTMLSpanElement>, "onClick"> {
  state?: SearchChipState;
  /**
   * Optional 레이블 텍스트 (Semibold 12px, hint color).
   * 예: "Label", "Category" 등
   */
  label?: string;
  /**
   * 닫기(×) 아이콘 표시 여부 (기본 true).
   */
  closeIcon?: boolean;
  onClose?: () => void;
  closeAriaLabel?: string;
  /** Storybook 강제 상태 표시용 */
  forceState?: "default" | "hover" | "disable";
}

export const SearchChip = forwardRef<HTMLSpanElement, SearchChipProps>(
  function SearchChip(
    {
      state = "default",
      label,
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
        data-state={state}
        data-force-state={forceState}
        aria-disabled={isDisabled || undefined}
        {...rest}
      >
        <span className={styles.content}>
          {label && <span className={styles.labelText}>{label}</span>}
          <span className={styles.chipText}>{children}</span>
        </span>

        {closeIcon && (
          <XButton
            className={styles.closeBtn}
            size="medium"
            aria-label={closeAriaLabel}
            disabled={isDisabled}
            onClick={onClose}
          />
        )}
      </span>
    );
  },
);
