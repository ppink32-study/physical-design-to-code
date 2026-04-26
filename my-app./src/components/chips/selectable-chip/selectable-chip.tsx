"use client";

import {
  forwardRef,
  type ButtonHTMLAttributes,
  type KeyboardEvent,
  type MouseEvent,
} from "react";
import styles from "./selectable-chip.module.css";

export type SelectableChipSize = "medium" | "large";
export type SelectableChipType = "normal" | "error";
export type SelectableChipState = "default" | "selected" | "readonly" | "disable";

export interface SelectableChipProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "type"> {
  size?: SelectableChipSize;
  /** 내용 유형 (Normal / Error) */
  kind?: SelectableChipType;
  state?: SelectableChipState;
  /**
   * 제어형(selected) 사용 시 true/false 전달.
   * 선택·해제 동작은 내부에서 자동 처리하지 않으며 `onToggle` 콜백으로 위임.
   */
  selected?: boolean;
  /** 선택 상태가 바뀌기를 요청할 때 호출 (state 가 readonly/disable 이면 호출 안됨) */
  onToggle?: (nextSelected: boolean) => void;
  /** Storybook 강제 상태 표시용 */
  forceState?: "default" | "hover" | "disable";
}

export const SelectableChip = forwardRef<HTMLButtonElement, SelectableChipProps>(
  function SelectableChip(
    {
      size = "medium",
      kind = "normal",
      state: stateProp,
      selected,
      onToggle,
      forceState,
      className,
      children,
      onClick,
      onKeyDown,
      disabled,
      ...rest
    },
    ref,
  ) {
    const state: SelectableChipState =
      stateProp ?? (selected ? "selected" : "default");
    const isDisabled = state === "disable" || forceState === "disable" || disabled;
    const isReadonly = state === "readonly";
    const isSelected = state === "selected";

    const toggle = () => {
      if (isDisabled || isReadonly) return;
      onToggle?.(!isSelected);
    };

    const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
      onClick?.(e);
      if (e.defaultPrevented) return;
      toggle();
    };

    const handleKeyDown = (e: KeyboardEvent<HTMLButtonElement>) => {
      onKeyDown?.(e);
      if (e.defaultPrevented) return;
      if (e.key === " " || e.key === "Enter") {
        e.preventDefault();
        toggle();
      }
    };

    return (
      <button
        ref={ref}
        type="button"
        className={[styles.chip, className].filter(Boolean).join(" ")}
        data-size={size}
        data-type={kind}
        data-state={state}
        data-force-state={forceState}
        aria-pressed={isReadonly ? undefined : isSelected}
        aria-disabled={isDisabled || undefined}
        disabled={isDisabled}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        {...rest}
      >
        <span className={styles.label}>{children}</span>
        <span className={styles.trash} aria-hidden="true">
          <span className={styles.trashIcon} />
        </span>
      </button>
    );
  },
);
