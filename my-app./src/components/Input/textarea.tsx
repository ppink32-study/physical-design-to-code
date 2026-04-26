"use client";

// TextArea - Figma MCP 기반 (node 4783:27389)
//   tone : normal / success / error
//   state(forced) : default / focus / filled / disable / readonly
//   container : w=340, h=80(default), px=md(12), py=sm(8), gap=2xs
//   - trailingIcon (기본: tone 별 Info/Check/Alert)
//   - resize handle (우측 하단)
//   - 세로 스크롤: wrapper 패딩 구역 — position absolute; right: 4px (아이콘 왼쪽, 리사이즈와 분리)

import type {
  ChangeEvent,
  CSSProperties,
  ReactNode,
  TextareaHTMLAttributes,
} from "react";
import {
  forwardRef,
  useCallback,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import { Scrollbar } from "@/components/scroll/scroll";
import styles from "./textarea.module.css";

export type TextAreaTone = "normal" | "success" | "error";
export type TextAreaForcedState =
  | "default"
  | "focus"
  | "filled"
  | "disable"
  | "readonly";

/* mask icon helpers (Input.tsx 와 동일 컨셉) ----------------------------- */
function MaskIcon({ src, size = 16 }: { src: string; size?: number }) {
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
  return <span aria-hidden="true" style={style} />;
}
const InfoIcon = () => <MaskIcon src="/icon/Info.svg" />;
const CheckIcon = () => <MaskIcon src="/icon/Check.svg" />;
const AlertIcon = () => <MaskIcon src="/icon/Alert.svg" />;

const SCROLL_THUMB_MIN = 24;

function computeVerticalScrollMetrics(el: HTMLTextAreaElement): {
  show: boolean;
  track: number;
  thumb: number;
  offset: number;
} {
  const sh = el.scrollHeight;
  const ch = el.clientHeight;
  const st = el.scrollTop;
  const track = Math.max(0, ch);
  if (!Number.isFinite(sh) || !Number.isFinite(ch) || sh <= ch + 1) {
    return { show: false, track, thumb: track, offset: 0 };
  }
  const ratio = ch / sh;
  let thumb = Math.max(SCROLL_THUMB_MIN, ratio * track);
  thumb = Math.min(thumb, track);
  const scrollRange = sh - ch;
  const maxTravel = Math.max(0, track - thumb);
  const offset =
    scrollRange > 0 ? maxTravel * Math.min(1, Math.max(0, st / scrollRange)) : 0;
  return { show: true, track, thumb, offset };
}

/** Scrollbar 슬롯 padding-y(2×2xs) 만큼 짧은 트랙에 thumb·offset 재맵 */
function rescaleScrollMetricsForSlot(
  m: { track: number; thumb: number; offset: number },
  slotVerticalPaddingPx: number,
): { track: number; thumb: number; offset: number } {
  const inner = Math.max(1, m.track - slotVerticalPaddingPx);
  const scale = inner / Math.max(1, m.track);
  let thumb = m.thumb * scale;
  thumb = Math.max(SCROLL_THUMB_MIN, Math.min(inner, thumb));
  const outerTravel = Math.max(0, m.track - m.thumb);
  const innerTravel = Math.max(0, inner - thumb);
  const offset =
    outerTravel > 0 ? (m.offset / outerTravel) * innerTravel : 0;
  return { track: inner, thumb, offset };
}

/* ---------------------------------------------------------------------- */

type NativeProps = Omit<
  TextareaHTMLAttributes<HTMLTextAreaElement>,
  "size"
>;

export type TextAreaProps = NativeProps & {
  tone?: TextAreaTone;
  forceState?: TextAreaForcedState;
  trailingIcon?: ReactNode | boolean;
  /** 우측 하단 resize 핸들 표시 */
  resize?: boolean;
  /** wrapper width override (default 340px) */
  width?: number | string;
  /** wrapper height override (default 80px) */
  height?: number | string;
};

function TextAreaInner(
  props: TextAreaProps,
  ref: React.ForwardedRef<HTMLTextAreaElement>,
) {
  const {
    tone = "normal",
    forceState,
    trailingIcon,
    resize = true,
    width,
    height,
    className,
    style,
    value,
    defaultValue,
    onChange,
    onFocus,
    onBlur,
    onScroll: onScrollProp,
    disabled,
    readOnly,
    placeholder,
    ...rest
  } = props;

  const isControlled = value !== undefined;
  const [innerValue, setInnerValue] = useState<string>(
    String(defaultValue ?? ""),
  );
  const currentValue = isControlled ? String(value ?? "") : innerValue;
  const [focused, setFocused] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const [scrollMetrics, setScrollMetrics] = useState(() => ({
    show: false,
    track: 0,
    thumb: 0,
    offset: 0,
  }));

  const syncScrollMetrics = useCallback(() => {
    const el = textareaRef.current;
    if (!el) return;
    setScrollMetrics(computeVerticalScrollMetrics(el));
  }, []);

  /** 슬롯 CSS padding-y = 2× --spacing-2xs (4px) */
  const scrollSlotVerticalPadding = 8;
  const slottedScroll = useMemo(() => {
    if (!scrollMetrics.show || scrollMetrics.track <= 0) return null;
    return rescaleScrollMetricsForSlot(
      scrollMetrics,
      scrollSlotVerticalPadding,
    );
  }, [scrollMetrics]);

  const setTextareaRef = useCallback(
    (node: HTMLTextAreaElement | null) => {
      textareaRef.current = node;
      if (typeof ref === "function") {
        ref(node);
      } else if (ref) {
        ref.current = node;
      }
    },
    [ref],
  );

  useLayoutEffect(() => {
    const el = textareaRef.current;
    if (!el) return;
    syncScrollMetrics();
    const ro = new ResizeObserver(() => syncScrollMetrics());
    ro.observe(el);
    return () => ro.disconnect();
  }, [currentValue, syncScrollMetrics, width, height, disabled, readOnly]);

  const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    if (!isControlled) setInnerValue(event.target.value);
    onChange?.(event);
    requestAnimationFrame(() => syncScrollMetrics());
  };

  const filledByValue = currentValue.length > 0;
  const derivedState: TextAreaForcedState = disabled
    ? "disable"
    : readOnly
      ? "readonly"
      : focused
        ? "focus"
        : filledByValue
          ? "filled"
          : "default";
  const visualState = forceState ?? derivedState;

  const defaultTrailingIcon = (() => {
    if (tone === "error") return <AlertIcon />;
    if (tone === "success") return <CheckIcon />;
    return <InfoIcon />;
  })();
  const trailingNode =
    trailingIcon === false
      ? null
      : trailingIcon === true || trailingIcon === undefined
        ? defaultTrailingIcon
        : trailingIcon;

  const wrapperClass = [
    styles.wrapper,
    styles[`tone-${tone}`],
    styles[`state-${visualState}`],
    resize ? styles["resize-on"] : null,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const wrapperStyle: CSSProperties = {
    ...(width !== undefined
      ? { width: typeof width === "number" ? `${width}px` : width }
      : null),
    ...(height !== undefined
      ? { height: typeof height === "number" ? `${height}px` : height }
      : null),
    ...style,
  };

  return (
    <div
      className={wrapperClass}
      style={wrapperStyle}
      data-state={visualState}
      data-tone={tone}
    >
      <div className={styles.bodyRow}>
        <div className={styles.field}>
          <textarea
            {...rest}
            ref={setTextareaRef}
            className={styles.textarea}
            value={isControlled ? currentValue : undefined}
            defaultValue={isControlled ? undefined : defaultValue}
            onChange={handleChange}
            onScroll={(e) => {
              syncScrollMetrics();
              onScrollProp?.(e);
            }}
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
          />
        </div>

        {trailingNode ? (
          <span className={styles.trailing}>{trailingNode}</span>
        ) : null}
      </div>

      {slottedScroll ? (
        <div className={styles.textareaScrollbarSlot}>
          <Scrollbar
            className={styles.textareaScrollbarInner}
            orientation="vertical"
            size="small"
            length={slottedScroll.track}
            thumbLength={slottedScroll.thumb}
            thumbOffset={slottedScroll.offset}
          />
        </div>
      ) : null}
    </div>
  );
}

export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  TextAreaInner,
);
TextArea.displayName = "TextArea";

export default TextArea;
