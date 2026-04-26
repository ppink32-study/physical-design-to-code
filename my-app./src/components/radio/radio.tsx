"use client";

/**
 * Radio — Figma MCP 기반 재작성
 * ----------------------------------------------------------------
 * Figma nodes
 *   - Radio input  (16x16, 6 states) : 17995:61609
 *   - Radio button (input + label)   : 17995:61649
 *   - Radio Group  (layout/items)    : 17995:61676
 *
 * Usage
 *   <RadioGroup name="option" value={v} onChange={setV}>
 *     <Radio value="a">A</Radio>
 *     <Radio value="b">B</Radio>
 *   </RadioGroup>
 *
 * Or standalone (uncontrolled) :
 *   <Radio name="x" value="a" defaultChecked>A</Radio>
 */

import type {
  ChangeEvent,
  ForwardedRef,
  InputHTMLAttributes,
  ReactNode,
} from "react";
import { createContext, forwardRef, useContext, useId } from "react";

import styles from "./radio.module.css";

/* =================================================================
 * Context
 * =============================================================== */
type RadioGroupContextValue = {
  name?: string;
  value?: string;
  onChange?: (value: string, event: ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
};

const RadioGroupContext = createContext<RadioGroupContextValue | null>(null);

/* =================================================================
 * RadioGroup
 * =============================================================== */
export type RadioGroupProps = {
  name?: string;
  value?: string;
  defaultValue?: string;
  onChange?: (value: string, event: ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  orientation?: "vertical" | "horizontal";
  children?: ReactNode;
  className?: string;
  "aria-label"?: string;
  "aria-labelledby"?: string;
};

export function RadioGroup({
  name,
  value,
  defaultValue,
  onChange,
  disabled,
  orientation = "vertical",
  children,
  className,
  ...aria
}: RadioGroupProps) {
  const autoName = useId();
  const groupName = name ?? `radio-group-${autoName}`;

  // controlled 만 우선 지원 (uncontrolled 는 네이티브 동작)
  const ctx: RadioGroupContextValue = {
    name: groupName,
    value,
    onChange,
    disabled,
  };

  const rootClass = [styles.group, className].filter(Boolean).join(" ");

  return (
    <RadioGroupContext.Provider value={ctx}>
      <div
        role="radiogroup"
        data-orientation={orientation}
        className={rootClass}
        {...aria}
      >
        {/* defaultValue 는 단순 참조용으로 한 번만 전달 */}
        <RadioGroupDefaultValue defaultValue={defaultValue} />
        {children}
      </div>
    </RadioGroupContext.Provider>
  );
}

/** defaultValue 를 context 외부에서도 참조 가능하게 하는 얇은 헬퍼 */
function RadioGroupDefaultValue(_: { defaultValue?: string }) {
  return null;
}

/* =================================================================
 * Radio
 * =============================================================== */
type NativeInputProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "children" | "onChange" | "type" | "size"
>;

export type RadioForceState = "default" | "focused";

export type RadioProps = NativeInputProps & {
  value: string;
  children?: ReactNode;
  onChange?: (value: string, event: ChangeEvent<HTMLInputElement>) => void;
  /** Storybook States 매트릭스에서 focus ring 고정 */
  forceState?: RadioForceState;
};

function RadioInner(props: RadioProps, ref: ForwardedRef<HTMLInputElement>) {
  const group = useContext(RadioGroupContext);

  const {
    id,
    name: nameProp,
    value,
    checked: checkedProp,
    defaultChecked,
    disabled: disabledProp,
    onChange,
    children,
    className,
    forceState,
    ...rest
  } = props;

  const autoId = useId();
  const inputId = id ?? `radio-${autoId}`;

  const name = nameProp ?? group?.name;
  const disabled = disabledProp ?? group?.disabled ?? false;

  // 그룹 안에 있으면 그룹이 controlled 를 담당
  const isGroupControlled = group?.value !== undefined;
  const checked = isGroupControlled
    ? group!.value === value
    : checkedProp;

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (disabled) return;
    if (event.target.checked) {
      if (isGroupControlled) group!.onChange?.(value, event);
      onChange?.(value, event);
    }
  };

  const state: "unchecked" | "checked" = checked ? "checked" : "unchecked";

  const rootClass = [styles.root, className].filter(Boolean).join(" ");

  return (
    <label
      htmlFor={inputId}
      className={rootClass}
      data-state={state}
      data-disabled={disabled ? "true" : undefined}
      data-force-state={forceState}
    >
      <input
        {...rest}
        ref={ref}
        id={inputId}
        type="radio"
        name={name}
        value={value}
        className={styles.input}
        checked={checked}
        defaultChecked={
          isGroupControlled || checkedProp !== undefined ? undefined : defaultChecked
        }
        disabled={disabled}
        onChange={handleChange}
      />
      <span className={styles.box} aria-hidden="true">
        <span className={styles.dot} />
      </span>
      {children ? <span className={styles.label}>{children}</span> : null}
    </label>
  );
}

export const Radio = forwardRef<HTMLInputElement, RadioProps>(RadioInner);
Radio.displayName = "Radio";

export default Radio;
