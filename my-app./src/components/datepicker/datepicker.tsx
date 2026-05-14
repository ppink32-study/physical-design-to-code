"use client";

/**
 * DatePicker (input) — Figma node 5132:60197
 * ----------------------------------------------------------------
 * "Date picker input" frame 기반. 달력 popover 는 별도이며 본 컴포넌트는
 * input 표면(field)만 담당합니다. 클릭 시 onOpen 콜백을 호출해 외부에서
 * 달력 UI 를 연결할 수 있도록 구성.
 *
 * Variants (4-axis)
 *   size   : "medium" (32h) / "large" (40h)
 *   tone   : "normal" / "success" / "error"
 *   state  : "default" / "focus" / "filled" / "disable" / "readonly"  (auto-derived)
 *   range  : false (single) / true (start → end)
 *
 * Props
 *   value, defaultValue           : 단일 모드의 날짜 문자열
 *   rangeValue, defaultRangeValue : 범위 모드의 [start, end]
 *   placeholder                   : 빈 상태 안내 (single: "Select date" / range 기본 "yyyy-mm-dd").
 *                                   range 에서 "시작 -> 끝" 형식이면 화살표 좌우에 각각 한 번씩만 표시.
 *   label                         : 좌측 label prefix 텍스트 (있으면 Label type)
 *   clearable                     : focus 상태에서 X 버튼 노출 (default: true)
 *   onOpen                        : 클릭/포커스 시 달력 UI open 트리거
 *   onClear                       : 값 초기화 시
 *   onChange/onRangeChange        : 값 변경 시 (controlled)
 *   disabled, readOnly            : HTML 표준 속성
 *   forcedState                   : 스토리북 / 강제 상태 시각화용 override
 *
 * 토큰 매핑 (light 기준)
 *   bg              : --bg-surface-base (white)
 *   bg (disabled/RO): --bg-surface-base-disabled (#f4f4f5)
 *   border          : --border-surface (#d7d8dc)
 *   border (focus)  : --border-primary (#5cc7d0)
 *   border (success): --border-valid (#3ac133)
 *   border (error)  : --border-invalid (#ff5a58)
 *   focus ring (normal) : --shadow-focus-ring-primary (Focus Ring / Primary)
 *   focus ring (success): --shadow-focus-ring-form-valid (Focus Ring / Form Valid)
 *   focus ring (error)  : --shadow-focus-ring-form-invalid (Focus Ring / Form Invalid)
 *   text            : --on-surface-base (#141518)
 *   placeholder     : --on-surface-hint (#787a88)
 *   disabled text   : --on-surface-disabled (#b3b4bc)
 *   radius          : --radius-md (6px)
 *   padding x       : --spacing-md (13px) / --spacing-lg (16px) for large ?  => figma: spacing-md
 *   size            : M 32, L 40
 *   font            : M body-base (14/20), L body-lg (16/24); label body-md 13/Medium
 */

import type {
  CSSProperties,
  FocusEvent,
  HTMLAttributes,
  KeyboardEvent,
  MouseEvent as ReactMouseEvent,
  ReactNode,
} from "react";
import { forwardRef, useCallback, useId, useState } from "react";

import styles from "./datepicker.module.css";

/** `yyyy-mm-dd -> yyyy-mm-dd` 처럼 한 문자열이면 시작/끝 슬롯에 분리, 아니면 동일 문구를 양쪽에 사용 */
function splitRangePlaceholder(placeholder: string): [string, string] {
  const t = placeholder.trim();
  const m = t.match(/^(.+?)\s*->\s*(.+)$/s);
  if (m) return [m[1].trim(), m[2].trim()];
  return [t, t];
}

/* ---------------------------------------------------------------------------
 * Types
 * ------------------------------------------------------------------------- */
export type DatePickerSize = "medium" | "large";
export type DatePickerTone = "normal" | "success" | "error";
export type DatePickerForcedState =
  | "default"
  | "focus"
  | "filled"
  | "disable"
  | "readonly";

type BaseProps = {
  size?: DatePickerSize;
  tone?: DatePickerTone;
  label?: string;
  placeholder?: string;
  clearable?: boolean;
  disabled?: boolean;
  readOnly?: boolean;
  forcedState?: DatePickerForcedState;
  onOpen?: () => void;
  onClear?: () => void;
  className?: string;
  style?: CSSProperties;
  id?: string;
  name?: string;
  "aria-label"?: string;
} & Omit<HTMLAttributes<HTMLDivElement>, "onChange" | "role">;

type SingleProps = BaseProps & {
  range?: false;
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  rangeValue?: never;
  defaultRangeValue?: never;
  onRangeChange?: never;
};

type RangeProps = BaseProps & {
  range: true;
  rangeValue?: [string, string];
  defaultRangeValue?: [string, string];
  onRangeChange?: (value: [string, string]) => void;
  value?: never;
  defaultValue?: never;
  onChange?: never;
};

export type DatePickerProps = SingleProps | RangeProps;

/* ---------------------------------------------------------------------------
 * Mask icon helper (mask-image + currentColor)
 * ------------------------------------------------------------------------- */
type MaskIconProps = { src: string; size?: number; className?: string };

function MaskIcon({ src, size = 16, className }: MaskIconProps) {
  const style: CSSProperties = {
    width: size,
    height: size,
    display: "inline-block",
    flexShrink: 0,
    backgroundColor: "currentColor",
    WebkitMaskImage: `url(${src})`,
    maskImage: `url(${src})`,
    WebkitMaskRepeat: "no-repeat",
    maskRepeat: "no-repeat",
    WebkitMaskPosition: "center",
    maskPosition: "center",
    WebkitMaskSize: "contain",
    maskSize: "contain",
  };
  return <span aria-hidden="true" style={style} className={className} />;
}

/* ---------------------------------------------------------------------------
 * Main
 * ------------------------------------------------------------------------- */
export const DatePicker = forwardRef<HTMLDivElement, DatePickerProps>(
  function DatePicker(props, ref) {
    const {
      size = "medium",
      tone = "normal",
      label,
      placeholder,
      clearable = true,
      disabled = false,
      readOnly = false,
      forcedState,
      onOpen,
      onClear,
      className,
      style,
      id: idProp,
      name,
      "aria-label": ariaLabel,
      ...rest
    } = props;

    /* ----- Single vs Range ----- */
    const isRange = props.range === true;
    const defaultPlaceholder = isRange ? "yyyy-mm-dd" : "Select date";
    const ph = placeholder ?? defaultPlaceholder;
    const [rangePlaceholderStart, rangePlaceholderEnd] = isRange
      ? splitRangePlaceholder(ph)
      : ["", ""];

    /* ----- Controlled / uncontrolled value ----- */
    const [innerSingle, setInnerSingle] = useState<string>(
      !isRange ? props.defaultValue ?? "" : "",
    );
    const [innerRange, setInnerRange] = useState<[string, string]>(
      isRange ? props.defaultRangeValue ?? ["", ""] : ["", ""],
    );

    const singleValue = !isRange
      ? props.value !== undefined
        ? props.value
        : innerSingle
      : "";
    const rangeValue = isRange
      ? props.rangeValue !== undefined
        ? props.rangeValue
        : innerRange
      : (["", ""] as [string, string]);

    /* ----- Focus tracking ----- */
    const [focused, setFocused] = useState(false);

    const hasValue = isRange
      ? !!(rangeValue[0] || rangeValue[1])
      : !!singleValue;

    /* ----- Resolve visual state ----- */
    const resolvedState: DatePickerForcedState =
      forcedState ??
      (disabled
        ? "disable"
        : readOnly
          ? "readonly"
          : focused
            ? "focus"
            : hasValue
              ? "filled"
              : "default");

    /* ----- Handlers ----- */
    const handleClick = useCallback(
      (e: ReactMouseEvent<HTMLDivElement>) => {
        if (disabled || readOnly) return;
        rest.onClick?.(e);
        if (e.defaultPrevented) return;
        onOpen?.();
      },
      [disabled, readOnly, onOpen, rest],
    );

    const handleKeyDown = useCallback(
      (e: KeyboardEvent<HTMLDivElement>) => {
        if (disabled || readOnly) return;
        rest.onKeyDown?.(e);
        if (e.defaultPrevented) return;
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onOpen?.();
        }
      },
      [disabled, readOnly, onOpen, rest],
    );

    const handleFocus = useCallback(
      (e: FocusEvent<HTMLDivElement>) => {
        setFocused(true);
        rest.onFocus?.(e);
      },
      [rest],
    );

    const handleBlur = useCallback(
      (e: FocusEvent<HTMLDivElement>) => {
        setFocused(false);
        rest.onBlur?.(e);
      },
      [rest],
    );

    const handleClear = useCallback(
      (e: ReactMouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        if (disabled || readOnly) return;
        if (isRange) {
          if (props.rangeValue === undefined) setInnerRange(["", ""]);
          props.onRangeChange?.(["", ""]);
        } else {
          if (props.value === undefined) setInnerSingle("");
          props.onChange?.("");
        }
        onClear?.();
      },
      [disabled, readOnly, isRange, onClear, props],
    );

    /* ----- Derived ----- */
    const reactId = useId();
    const rootId = idProp ?? `datepicker-${reactId}`;
    const iconSize = size === "large" ? 20 : 16;
    const statusIconSize = 16;
    const showStatusIcon = tone === "success" || tone === "error";
    const statusIconSrc =
      tone === "success" ? "/icon/Check.svg" : "/icon/Alert.svg";
    const showClearBtn =
      clearable && resolvedState === "focus" && hasValue;
    // Disable 는 trailing icon 유지 (회색 처리). calendar 는 항상 우측에 노출.
    const showCalendar = true;

    const placeholderText = ph;
    const singleTextVisible = hasValue ? singleValue : placeholderText;

    /* rest 에 포함될 수 있는 이벤트 핸들러는 handleX 내부에서 이미 호출하므로
       JSX 에선 rest 가 명시 핸들러를 덮어쓰지 않도록 rest → 명시 핸들러 순서로 배치. */
    const { onClick: _oc, onKeyDown: _ok, onFocus: _of, onBlur: _ob, ...restOther } =
      rest;
    void _oc; void _ok; void _of; void _ob;

    return (
      <div
        ref={ref}
        {...restOther}
        id={rootId}
        className={[styles.root, className].filter(Boolean).join(" ")}
        style={style}
        data-size={size}
        data-tone={tone}
        data-state={resolvedState}
        data-range={isRange ? "true" : "false"}
        data-has-label={label ? "true" : "false"}
        data-has-value={hasValue ? "true" : "false"}
        role="button"
        tabIndex={disabled ? -1 : 0}
        aria-disabled={disabled || undefined}
        aria-readonly={readOnly || undefined}
        aria-label={ariaLabel ?? label ?? placeholderText}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        onFocus={handleFocus}
        onBlur={handleBlur}
      >
        {/* 숨김 name/value 입력 (form 전송 지원) */}
        {name && !isRange && (
          <input type="hidden" name={name} value={singleValue} readOnly />
        )}
        {name && isRange && (
          <>
            <input
              type="hidden"
              name={`${name}-start`}
              value={rangeValue[0]}
              readOnly
            />
            <input
              type="hidden"
              name={`${name}-end`}
              value={rangeValue[1]}
              readOnly
            />
          </>
        )}

        <div className={styles.inner}>
          {label && <span className={styles.label}>{label}</span>}
          <div className={styles.valueWrap}>
            {isRange ? (
              <>
                <span
                  className={styles.dateText}
                  data-empty={rangeValue[0] ? "false" : "true"}
                >
                  {rangeValue[0] || rangePlaceholderStart}
                </span>
                <MaskIcon
                  src="/icon/ArrowRight.svg"
                  size={statusIconSize}
                  className={styles.rangeArrow}
                />
                <span
                  className={styles.dateText}
                  data-empty={rangeValue[1] ? "false" : "true"}
                >
                  {rangeValue[1] || rangePlaceholderEnd}
                </span>
              </>
            ) : (
              <span
                className={styles.singleText}
                data-empty={hasValue ? "false" : "true"}
              >
                {singleTextVisible}
              </span>
            )}
          </div>
        </div>

        <div className={styles.trailing}>
          {showClearBtn && (
            <button
              type="button"
              className={styles.clearBtn}
              onClick={handleClear}
              aria-label="Clear date"
              tabIndex={-1}
            >
              <MaskIcon
                src="/icon/Close-2.svg"
                size={12}
                className={styles.clearIcon}
              />
            </button>
          )}
          {showStatusIcon && (
            <MaskIcon
              src={statusIconSrc}
              size={statusIconSize}
              className={styles.statusIcon}
            />
          )}
          {showCalendar && (
            <MaskIcon
              src="/icon/Calendar.svg"
              size={iconSize}
              className={styles.calendarIcon}
            />
          )}
        </div>
      </div>
    );
  },
);

DatePicker.displayName = "DatePicker";

export default DatePicker;
