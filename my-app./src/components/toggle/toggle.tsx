"use client";

/**
 * Toggle — Figma MCP 기반 재작성
 * ----------------------------------------------------------------
 * Figma nodes
 *   - Toggle input (36x20, 6 states) : 18001:55013
 *   - Toggle (input + label)         : 18001:55053
 *
 * ToggleGroup — 여러 Toggle 레이아웃(gap 은 RadioGroup 과 동일: 세로 4px · 가로 16px)
 *
 * Props
 *   - checked / defaultChecked
 *   - disabled
 *   - reverse : true 이면 라벨을 토글 왼쪽에 배치
 *   - onChange(checked, event)
 *   - forceState : 'focused' (Storybook States 용)
 */

import type {
  ChangeEvent,
  ForwardedRef,
  HTMLAttributes,
  InputHTMLAttributes,
  ReactNode,
} from "react";
import { forwardRef, useId, useState } from "react";

import styles from "./toggle.module.css";

/* =================================================================
 * ToggleGroup — 여러 Toggle 을 세로/가로로 묶을 때 RadioGroup 과 동일 gap
 * =============================================================== */
export type ToggleGroupProps = {
  orientation?: "vertical" | "horizontal";
  children?: ReactNode;
  className?: string;
} & Pick<HTMLAttributes<HTMLDivElement>, "aria-label" | "aria-labelledby">;

export function ToggleGroup({
  orientation = "vertical",
  children,
  className,
  ...aria
}: ToggleGroupProps) {
  const rootClass = [styles.toggleGroup, className].filter(Boolean).join(" ");
  return (
    <div
      role="group"
      data-orientation={orientation}
      className={rootClass}
      {...aria}
    >
      {children}
    </div>
  );
}

type NativeInputProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "children" | "onChange" | "type" | "checked" | "defaultChecked" | "size"
>;

export type ToggleForceState = "default" | "focused";

export type ToggleProps = NativeInputProps & {
  checked?: boolean;
  defaultChecked?: boolean;
  disabled?: boolean;
  reverse?: boolean;
  onChange?: (checked: boolean, event: ChangeEvent<HTMLInputElement>) => void;
  children?: ReactNode;
  forceState?: ToggleForceState;
};

function ToggleInner(
  props: ToggleProps,
  ref: ForwardedRef<HTMLInputElement>,
) {
  const {
    id,
    checked,
    defaultChecked,
    disabled = false,
    reverse = false,
    onChange,
    children,
    className,
    forceState,
    ...rest
  } = props;

  const isControlled = checked !== undefined;
  const [internal, setInternal] = useState<boolean>(defaultChecked ?? false);
  const current = isControlled ? checked! : internal;

  const autoId = useId();
  const inputId = id ?? `toggle-${autoId}`;

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (disabled) return;
    const next = event.target.checked;
    if (!isControlled) setInternal(next);
    onChange?.(next, event);
  };

  const state: "unchecked" | "checked" = current ? "checked" : "unchecked";
  const rootClass = [styles.root, className].filter(Boolean).join(" ");

  return (
    <label
      htmlFor={inputId}
      className={rootClass}
      data-state={state}
      data-disabled={disabled ? "true" : undefined}
      data-reverse={reverse ? "true" : undefined}
      data-force-state={forceState}
    >
      <input
        {...rest}
        ref={ref}
        id={inputId}
        type="checkbox"
        role="switch"
        className={styles.input}
        checked={current}
        disabled={disabled}
        aria-checked={current}
        onChange={handleChange}
      />
      <span className={styles.track} aria-hidden="true">
        <span className={styles.knob} />
      </span>
      {children ? <span className={styles.label}>{children}</span> : null}
    </label>
  );
}

export const Toggle = forwardRef<HTMLInputElement, ToggleProps>(ToggleInner);
Toggle.displayName = "Toggle";

export default Toggle;
