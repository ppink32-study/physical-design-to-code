"use client";

/**
 * Checkbox — Figma MCP 기반 재작성
 * ----------------------------------------------------------------
 * Figma nodes
 *   - Checkbox input (16x16, 9 states) : 17995:61456
 *   - Checkbox (input + label)         : 17995:61510
 *
 * Props
 *   - checked / defaultChecked : controlled / uncontrolled
 *   - indeterminate : 시각적 Dash 표시 (DOM 속성도 반영)
 *   - disabled
 *   - onChange(checked, event)
 *   - children : 라벨 텍스트(비워도 됨)
 *   - forceState : 'focused' 로 강제 지정 (Storybook States matrix 용)
 */

import type {
  ChangeEvent,
  ForwardedRef,
  InputHTMLAttributes,
  ReactNode,
} from "react";
import {
  createContext,
  forwardRef,
  useCallback,
  useContext,
  useEffect,
  useId,
  useRef,
  useState,
} from "react";

import styles from "./checkbox.module.css";

/* =================================================================
 * CheckboxGroup Context
 *
 * RadioGroup 과 동일한 컨벤션을 따르되, 다중 선택이라 value 가 string[].
 * - Checkbox 가 group 안에 들어있고 value prop 이 있으면 group 이 controlled
 *   상태와 onChange 를 위임받는다.
 * - group context 가 없으면 기존 Checkbox API(checked/defaultChecked) 그대로
 *   동작하므로 하위 호환성에 영향 없음.
 * =============================================================== */
type CheckboxGroupContextValue = {
  name?: string;
  values?: string[];
  onChange?: (values: string[], event: ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
};

const CheckboxGroupContext = createContext<CheckboxGroupContextValue | null>(
  null,
);

export type CheckboxGroupProps = {
  name?: string;
  /** controlled values */
  value?: string[];
  defaultValue?: string[];
  onChange?: (values: string[], event: ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  orientation?: "vertical" | "horizontal";
  children?: ReactNode;
  className?: string;
  "aria-label"?: string;
  "aria-labelledby"?: string;
};

export function CheckboxGroup({
  name,
  value,
  defaultValue,
  onChange,
  disabled,
  orientation = "vertical",
  children,
  className,
  ...aria
}: CheckboxGroupProps) {
  const autoName = useId();
  const groupName = name ?? `checkbox-group-${autoName}`;

  const isControlled = value !== undefined;
  const [internalValues, setInternalValues] = useState<string[]>(
    defaultValue ?? [],
  );
  const currentValues = isControlled ? value! : internalValues;

  const handleToggle = useCallback(
    (next: string[], event: ChangeEvent<HTMLInputElement>) => {
      if (!isControlled) setInternalValues(next);
      onChange?.(next, event);
    },
    [isControlled, onChange],
  );

  const ctx: CheckboxGroupContextValue = {
    name: groupName,
    values: currentValues,
    onChange: (next, event) => handleToggle(next, event),
    disabled,
  };

  const rootClass = [styles.group, className].filter(Boolean).join(" ");

  return (
    <CheckboxGroupContext.Provider value={ctx}>
      <div
        role="group"
        data-orientation={orientation}
        className={rootClass}
        {...aria}
      >
        {children}
      </div>
    </CheckboxGroupContext.Provider>
  );
}

type NativeInputProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "children" | "onChange" | "type" | "checked" | "defaultChecked" | "size"
>;

export type CheckboxForceState = "default" | "focused";

export type CheckboxProps = NativeInputProps & {
  /** group 안에서 toggle 대상 식별자 (그룹 사용 시 필수) */
  value?: string;
  checked?: boolean;
  defaultChecked?: boolean;
  indeterminate?: boolean;
  disabled?: boolean;
  onChange?: (checked: boolean, event: ChangeEvent<HTMLInputElement>) => void;
  children?: ReactNode;
  /** Storybook States 매트릭스에서 focus ring 을 고정 표시 */
  forceState?: CheckboxForceState;
};

function mergeRefs<T>(
  ...refs: Array<ForwardedRef<T> | undefined | null>
): (value: T | null) => void {
  return (value) => {
    for (const ref of refs) {
      if (!ref) continue;
      if (typeof ref === "function") ref(value);
      else (ref as { current: T | null }).current = value;
    }
  };
}

function CheckboxInner(
  props: CheckboxProps,
  forwardedRef: ForwardedRef<HTMLInputElement>,
) {
  const group = useContext(CheckboxGroupContext);

  const {
    id,
    name: nameProp,
    value,
    checked,
    defaultChecked,
    indeterminate = false,
    disabled: disabledProp,
    onChange,
    children,
    className,
    forceState,
    ...rest
  } = props;

  // 그룹 안에 있고 value 가 있으면 그룹이 controlled 를 담당
  const isGroupBound = group !== null && value !== undefined;
  const isControlled = !isGroupBound && checked !== undefined;

  const [internalChecked, setInternalChecked] = useState<boolean>(
    defaultChecked ?? false,
  );

  const currentChecked = isGroupBound
    ? (group!.values?.includes(value!) ?? false)
    : isControlled
      ? checked!
      : internalChecked;

  const disabled = disabledProp ?? group?.disabled ?? false;
  const name = nameProp ?? group?.name;

  const autoId = useId();
  const inputId = id ?? `checkbox-${autoId}`;
  const inputRef = useRef<HTMLInputElement | null>(null);

  // indeterminate 는 DOM 속성으로만 설정 가능 (HTML 표준)
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.indeterminate = indeterminate;
    }
  }, [indeterminate]);

  const state: "unchecked" | "checked" | "indeterminate" = indeterminate
    ? "indeterminate"
    : currentChecked
      ? "checked"
      : "unchecked";

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (disabled) return;
    const next = event.target.checked;
    if (isGroupBound) {
      const prev = group!.values ?? [];
      const nextValues = next
        ? prev.includes(value!)
          ? prev
          : [...prev, value!]
        : prev.filter((v) => v !== value);
      group!.onChange?.(nextValues, event);
      onChange?.(next, event);
      return;
    }
    if (!isControlled) setInternalChecked(next);
    onChange?.(next, event);
  };

  const rootClass = [styles.root, className].filter(Boolean).join(" ");

  const focusInput = useCallback(() => {
    if (disabled) return;
    const el = inputRef.current;
    if (!el) return;
    el.focus({ preventScroll: true });
  }, [disabled]);

  return (
    <label
      htmlFor={inputId}
      className={rootClass}
      data-state={state}
      data-disabled={disabled ? "true" : undefined}
      data-force-state={forceState}
      /** 클릭 직후 input 에 포커스 유지 (스토리북·일부 환경에서 포커스 링 미표시 방지) */
      onClick={focusInput}
    >
      <input
        {...rest}
        ref={mergeRefs(inputRef, forwardedRef)}
        id={inputId}
        name={name}
        value={value}
        type="checkbox"
        className={styles.input}
        checked={currentChecked}
        disabled={disabled}
        aria-checked={indeterminate ? "mixed" : currentChecked}
        onChange={handleChange}
      />
      <span className={styles.box} aria-hidden="true">
        {/* Check icon */}
        <svg
          className={styles.check}
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M3.5 8.2 L6.8 11.3 L12.5 5.2"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        {/* Indeterminate dash */}
        <span className={styles.dash} />
      </span>
      {children ? <span className={styles.label}>{children}</span> : null}
    </label>
  );
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  CheckboxInner,
);
Checkbox.displayName = "Checkbox";

export default Checkbox;
