"use client";

// Input - Figma MCP 기반 (node 4771:26367)
//   size : medium(32) / large(40)
//   tone : normal / success / error
//   type : text / password / email / number / search 등 (HTML 속성)
//   state(forced) : default / focus / filled / disable / readonly
//   - leadingIcon (기본: Search), trailingIcon (기본: tone 별 Info/Check/Alert)
//   - counter, clearable(xButton), passwordToggle(eye)
//   - wrapper 기본 너비 240px (상수 INPUT_WRAPPER_DEFAULT_WIDTH_PX · CSS .wrapper 동기)

import type {
  ChangeEvent,
  CSSProperties,
  InputHTMLAttributes,
  ReactNode,
} from "react";
import { forwardRef, useId, useState } from "react";

import styles from "./input.module.css";

export type InputSize = "medium" | "large";
export type InputTone = "normal" | "success" | "error";
export type InputForcedState =
  | "default"
  | "focus"
  | "filled"
  | "disable"
  | "readonly";

/** 바깥 래퍼 기본 너비(px). `input.module.css` 의 `.wrapper { width }` 와 맞출 것. */
export const INPUT_WRAPPER_DEFAULT_WIDTH_PX = 240;

/* ---------------------------------------------------------------------------
 * Mask icon helper (mask-image + currentColor)
 * ------------------------------------------------------------------------- */
type MaskIconProps = {
  src: string;
  size?: number;
  className?: string;
};

function MaskIcon({ src, size = 16, className }: MaskIconProps) {
  const style: CSSProperties = {
    width: size,
    height: size,
    display: "inline-block",
    backgroundColor: "currentColor",
    WebkitMaskImage: `url(${src})`,
    maskImage: `url(${src})`,
    WebkitMaskRepeat: "no-repeat",
    maskRepeat: "no-repeat",
    WebkitMaskPosition: "center",
    maskPosition: "center",
    WebkitMaskSize: "contain",
    maskSize: "contain",
    flexShrink: 0,
  };
  return <span aria-hidden="true" style={style} className={className} />;
}

const SearchIcon = ({ size = 16 }: { size?: number }) => (
  <MaskIcon src="/icon/Search.svg" size={size} />
);
const InfoIcon = ({ size = 16 }: { size?: number }) => (
  <MaskIcon src="/icon/Info.svg" size={size} />
);
const CheckIcon = ({ size = 16 }: { size?: number }) => (
  <MaskIcon src="/icon/Check.svg" size={size} />
);
const AlertIcon = ({ size = 16 }: { size?: number }) => (
  <MaskIcon src="/icon/Alert.svg" size={size} />
);
const HideIcon = ({ size = 16 }: { size?: number }) => (
  <MaskIcon src="/icon/Hide.svg" size={size} />
);
const CloseIcon = ({ size = 12 }: { size?: number }) => (
  <MaskIcon src="/icon/Close-2.svg" size={size} />
);

/* ---------------------------------------------------------------------------
 * Counter (in-line)
 * ------------------------------------------------------------------------- */
type CounterProps = {
  value: number;
  max: number;
  tone: InputTone;
  filled: boolean;
};

function Counter({ value, max, tone, filled }: CounterProps) {
  const over = value > max;
  const currentColor =
    tone === "error" || over
      ? "var(--on-error)"
      : filled
        ? "var(--on-surface-tertiary)"
        : "var(--on-surface-secondary)";
  return (
    <span className={styles.counter} aria-hidden="true">
      <span style={{ color: currentColor }}>{value}</span>
      <span>/</span>
      <span>{max}</span>
    </span>
  );
}

/* ---------------------------------------------------------------------------
 * Clear button (xButton)
 * ------------------------------------------------------------------------- */
function ClearButton({ onClick }: { onClick?: () => void }) {
  return (
    <button
      type="button"
      className={styles.clearBtn}
      onClick={(e) => {
        e.stopPropagation();
        onClick?.();
      }}
      aria-label="clear input"
      tabIndex={-1}
    >
      <CloseIcon size={12} />
    </button>
  );
}

/* ---------------------------------------------------------------------------
 * Input
 * ------------------------------------------------------------------------- */
type NativeInputProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "size" | "type"
>;

export type InputProps = NativeInputProps & {
  size?: InputSize;
  tone?: InputTone;
  /** Storybook 등에서 시각적 상태를 강제로 지정 */
  forceState?: InputForcedState;
  /** HTML input type (text/password/email/...) */
  type?: string;
  leadingIcon?: ReactNode | boolean;
  trailingIcon?: ReactNode | boolean;
  /** clear(x) 버튼 표시 — focus/filled 상태에서 의미 있음 */
  clearable?: boolean;
  onClear?: () => void;
  /** 인라인 카운터 표시. true 또는 { current?, max } */
  counter?: boolean | { max: number; current?: number };
  /** Password type 일 때 eye 토글 표시 (기본 true) */
  passwordToggle?: boolean;
  /** wrapper 너비. 미지정 시 {@link INPUT_WRAPPER_DEFAULT_WIDTH_PX}px */
  width?: number | string;
};

function InputInner(
  props: InputProps,
  ref: React.ForwardedRef<HTMLInputElement>,
) {
  const {
    size = "medium",
    tone = "normal",
    forceState,
    type = "text",
    leadingIcon,
    trailingIcon,
    clearable = false,
    onClear,
    counter,
    passwordToggle = true,
    width,
    className,
    style,
    value,
    defaultValue,
    onChange,
    onFocus,
    onBlur,
    disabled,
    readOnly,
    placeholder,
    maxLength,
    ...rest
  } = props;

  const id = useId();
  const isControlled = value !== undefined;
  const [innerValue, setInnerValue] = useState<string>(
    String(defaultValue ?? ""),
  );
  const currentValue = isControlled ? String(value ?? "") : innerValue;
  const [focused, setFocused] = useState(false);
  const [revealed, setRevealed] = useState(false);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (!isControlled) setInnerValue(event.target.value);
    onChange?.(event);
  };

  /* state derivation -------------------------------------------------- */
  const filledByValue = currentValue.length > 0;
  const derivedState: InputForcedState = disabled
    ? "disable"
    : readOnly
      ? "readonly"
      : focused
        ? "focus"
        : filledByValue
          ? "filled"
          : "default";
  const visualState = forceState ?? derivedState;

  /* leading icon ------------------------------------------------------ */
  const leadingNode =
    leadingIcon === false || leadingIcon === undefined
      ? null
      : leadingIcon === true
        ? <SearchIcon size={size === "large" ? 20 : 16} />
        : leadingIcon;

  /* trailing icon (tone 별 기본값) ----------------------------------- */
  const defaultTrailingIcon = (() => {
    const iconSize = size === "large" ? 20 : 16;
    if (tone === "error") return <AlertIcon size={iconSize} />;
    if (tone === "success") return <CheckIcon size={iconSize} />;
    return <InfoIcon size={iconSize} />;
  })();
  const trailingNode =
    trailingIcon === false
      ? null
      : trailingIcon === true || trailingIcon === undefined
        ? defaultTrailingIcon
        : trailingIcon;

  /* counter ----------------------------------------------------------- */
  const counterNode = (() => {
    if (!counter) return null;
    const max =
      typeof counter === "object" ? counter.max : maxLength ?? 50;
    const current =
      typeof counter === "object"
        ? (counter.current ?? currentValue.length)
        : currentValue.length;
    return (
      <Counter
        value={current}
        max={max}
        tone={tone}
        filled={visualState === "filled" || visualState === "focus"}
      />
    );
  })();

  /* password toggle --------------------------------------------------- */
  const isPassword = type === "password";
  const renderTrailing = (() => {
    if (isPassword && passwordToggle) {
      return (
        <button
          type="button"
          className={styles.eyeBtn}
          onClick={() => setRevealed((v) => !v)}
          aria-label={revealed ? "hide password" : "show password"}
          tabIndex={-1}
        >
          <HideIcon size={size === "large" ? 20 : 16} />
        </button>
      );
    }
    return trailingNode;
  })();

  const wrapperClass = [
    styles.wrapper,
    styles[`size-${size}`],
    styles[`tone-${tone}`],
    styles[`state-${visualState}`],
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const wrapperStyle: CSSProperties = {
    width:
      width !== undefined
        ? typeof width === "number"
          ? `${width}px`
          : width
        : `${INPUT_WRAPPER_DEFAULT_WIDTH_PX}px`,
    ...style,
  };

  return (
    <div
      className={wrapperClass}
      style={wrapperStyle}
      data-state={visualState}
      data-tone={tone}
      data-size={size}
      onClick={() => {
        if (!disabled && !readOnly) {
          const el = document.getElementById(id) as HTMLInputElement | null;
          el?.focus();
        }
      }}
    >
      {leadingNode && <span className={styles.leading}>{leadingNode}</span>}

      <input
        {...rest}
        id={id}
        ref={ref}
        type={isPassword && revealed ? "text" : type}
        className={styles.input}
        value={isControlled ? currentValue : undefined}
        defaultValue={isControlled ? undefined : defaultValue}
        onChange={handleChange}
        onFocus={(e) => {
          setFocused(true);
          onFocus?.(e);
        }}
        onBlur={(e) => {
          setFocused(false);
          onBlur?.(e);
        }}
        disabled={disabled}
        readOnly={readOnly}
        placeholder={placeholder}
        maxLength={maxLength}
      />

      {clearable && filledByValue && !disabled && !readOnly && (
        <ClearButton onClick={() => {
          if (!isControlled) setInnerValue("");
          onClear?.();
        }} />
      )}

      {counterNode}

      {renderTrailing && (
        <span className={styles.trailing}>{renderTrailing}</span>
      )}
    </div>
  );
}

export const Input = forwardRef<HTMLInputElement, InputProps>(InputInner);
Input.displayName = "Input";

export default Input;
