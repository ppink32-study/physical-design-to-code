"use client";
/* =============================================================================
 * Select (Select Box / Trigger) — Figma Code Connect (node 4811:29737)
 * -----------------------------------------------------------------------------
 * 단일/다중 선택을 모두 표현하는 "Trigger" 컴포넌트.
 * 실제 드롭다운 열림/닫힘 로직은 SelectList / SelectItem 을 합성해서 구성한다.
 *
 * Figma variant 매핑
 *   size  : "medium"(32) | "large"(40)
 *   tone  : "normal" | "success" | "error"
 *   state : "default" | "focus" | "filled" | "disable" | "readonly"
 *   type  : "normal" | "label"  (Label 타입은 좌측에 meta-label 텍스트가 붙음)
 *
 * 선택 값 표기
 *   - 단일 : `value` prop 으로 한 줄 텍스트 렌더
 *   - 다중 : `chips` prop 에 ReactNode 배열 전달 → 내부 chip 영역에 렌더
 *            `moreCount` 로 "(+N)" 표시, `multiline` 으로 2line wrap 지원
 *   - `clearable` + `onClear` 로 전체 지우기(x-button) 제공 — tone 아이콘보다 앞
 * ========================================================================== */
import {
  forwardRef,
  useState,
  type ButtonHTMLAttributes,
  type FocusEvent,
  type MouseEvent,
  type ReactNode,
} from "react";
import styles from "./select.module.css";

export type SelectSize = "medium" | "large";
export type SelectTone = "normal" | "success" | "error";
export type SelectState =
  | "default"
  | "focus"
  | "filled"
  | "disable"
  | "readonly";
export type SelectType = "normal" | "label";

export interface SelectProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "type" | "value"> {
  size?: SelectSize;
  tone?: SelectTone;
  /** 강제 표시 상태 (Storybook · 비제어 상황용) */
  state?: SelectState;
  /** "normal" | "label" — Label 형은 좌측에 meta 라벨 노출 */
  type?: SelectType;
  /** Label 타입에서 좌측 라벨 텍스트 */
  label?: string;
  /** 선택되지 않았을 때 표시 */
  placeholder?: string;
  /** 단일 선택 값 */
  value?: ReactNode;
  /** 다중 선택 시 chip 리스트 */
  chips?: ReactNode[];
  /** 다중 선택 시 (+N) 표시용 숫자 (0 이하면 숨김) */
  moreCount?: number;
  /** 다중 선택 시 chip 래핑 (2line) */
  multiline?: boolean;
  /** x-button 노출 여부 (multi + clear) */
  clearable?: boolean;
  onClear?: (event: MouseEvent<HTMLButtonElement>) => void;
  /** 드롭다운 열림 상태 — aria-expanded 및 Focus 스타일 트리거 */
  open?: boolean;
  /** 읽기 전용 (시각적으로 disable 과 유사하나 텍스트 색은 유지) */
  readOnly?: boolean;
}

export const Select = forwardRef<HTMLButtonElement, SelectProps>(function Select(
  {
    size = "medium",
    tone = "normal",
    state: stateProp,
    type = "normal",
    label,
    placeholder = "Text",
    value,
    chips,
    moreCount = 0,
    multiline = false,
    clearable = false,
    onClear,
    open,
    readOnly,
    disabled,
    className,
    children,
    onFocus: onFocusProp,
    onBlur: onBlurProp,
    ...rest
  },
  ref,
) {
  const [focused, setFocused] = useState(false);

  const hasChips = Array.isArray(chips) && chips.length > 0;
  const isFilled = hasChips || value != null || children != null;

  const state: SelectState =
    stateProp ??
    (disabled
      ? "disable"
      : readOnly
        ? "readonly"
        : open || focused
          ? "focus"
          : isFilled
            ? "filled"
            : "default");

  const iconSize = size === "large" ? 20 : 16;

  return (
    <button
      ref={ref}
      type="button"
      className={[styles.trigger, className].filter(Boolean).join(" ")}
      data-size={size}
      data-tone={tone}
      data-state={state}
      data-type={type}
      data-has-chips={hasChips || undefined}
      data-multiline={multiline || undefined}
      data-open={open || undefined}
      aria-expanded={open}
      aria-disabled={disabled || undefined}
      aria-readonly={readOnly || undefined}
      disabled={disabled}
      onFocus={(e: FocusEvent<HTMLButtonElement>) => {
        if (!disabled && !readOnly) setFocused(true);
        onFocusProp?.(e);
      }}
      onBlur={(e: FocusEvent<HTMLButtonElement>) => {
        setFocused(false);
        onBlurProp?.(e);
      }}
      {...rest}
    >
      <span className={styles.input} data-multiline={multiline || undefined}>
        {type === "label" && label != null && (
          <span className={styles.labelText}>{label}</span>
        )}

        {hasChips ? (
          <>
            <span
              className={styles.chips}
              data-multiline={multiline || undefined}
            >
              {chips!.map((node, i) => (
                <span key={i} className={styles.chipSlot}>
                  {node}
                </span>
              ))}
            </span>
            {moreCount > 0 && !multiline && (
              <span className={styles.more}>(+{moreCount})</span>
            )}
          </>
        ) : children != null ? (
          <span className={styles.value}>{children}</span>
        ) : value != null ? (
          <span className={styles.value}>{value}</span>
        ) : (
          <span className={styles.placeholder}>{placeholder}</span>
        )}
      </span>

      {/* x-button / tone-icon / chevron — 2line 에서 h-24 고정 그룹으로 상단 정렬 */}
      <span className={styles.trailingGroup}>
        {hasChips && clearable && (
          <span
            className={styles.clear}
            role="button"
            tabIndex={-1}
            aria-label="전체 지우기"
            onClick={(e) => {
              e.stopPropagation();
              onClear?.(e as unknown as MouseEvent<HTMLButtonElement>);
            }}
          >
            <span className={styles.clearIcon} aria-hidden="true" />
          </span>
        )}

        {tone === "success" && (
          <span
            className={styles.toneIcon}
            data-tone="success"
            aria-hidden="true"
            style={{ width: iconSize, height: iconSize }}
          >
            <span
              className={styles.toneIconMask}
              style={{
                WebkitMaskImage: "url(/icon/Check.svg)",
                maskImage: "url(/icon/Check.svg)",
              }}
            />
          </span>
        )}
        {tone === "error" && (
          <span
            className={styles.toneIcon}
            data-tone="error"
            aria-hidden="true"
            style={{ width: iconSize, height: iconSize }}
          >
            <span
              className={styles.toneIconMask}
              style={{
                WebkitMaskImage: "url(/icon/Alert.svg)",
                maskImage: "url(/icon/Alert.svg)",
              }}
            />
          </span>
        )}

        <span
          className={styles.chevron}
          data-open={open || undefined}
          aria-hidden="true"
          style={{ width: iconSize, height: iconSize }}
        >
          <span className={styles.chevronMask} />
        </span>
      </span>
    </button>
  );
});
