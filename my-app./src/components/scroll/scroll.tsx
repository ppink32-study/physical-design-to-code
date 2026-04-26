"use client";

/**
 * Scrollbar — Figma MCP 기반 구현 (node 5250:17591)
 * ----------------------------------------------------------------
 * 2가지 컴포넌트를 export 한다.
 *
 * 1. <Scrollbar />   — Figma 시각 재현용 "정적" 스크롤바. 실제 스크롤 기능
 *                      없이 디자인 스펙 확인 / 문서화 용도.
 *                      Props: orientation("vertical"|"horizontal"),
 *                             size("medium"|"small"),
 *                             length (track 전체 길이),
 *                             thumbLength (thumb 길이),
 *                             thumbOffset (track 내 thumb 시작 위치)
 *
 * 2. <ScrollArea />  — children 을 감싸 실제 overflow 스크롤을 제공하며
 *                      Figma 와 동일한 디자인의 native scrollbar 를
 *                      WebKit / Firefox 양쪽에 적용한다.
 *                      Props: size, orientation("both"|"vertical"|"horizontal"),
 *                             maxHeight, maxWidth
 */

import type {
  CSSProperties,
  ForwardedRef,
  HTMLAttributes,
  ReactNode,
} from "react";
import { forwardRef } from "react";

import styles from "./scroll.module.css";

/* =================================================================
 * Scrollbar (정적 시각 재현)
 * =============================================================== */
export type ScrollbarOrientation = "vertical" | "horizontal";
export type ScrollbarSize = "medium" | "small";

export type ScrollbarProps = HTMLAttributes<HTMLDivElement> & {
  orientation?: ScrollbarOrientation;
  size?: ScrollbarSize;
  /** track 전체 길이(px). vertical → height, horizontal → width. 기본 300 */
  length?: number | string;
  /** thumb 길이(px). 기본 100 */
  thumbLength?: number | string;
  /** track 내에서 thumb 시작 위치(px). 기본 0 */
  thumbOffset?: number | string;
};

function toCssLength(v: number | string | undefined): string | undefined {
  if (v === undefined) return undefined;
  return typeof v === "number" ? `${v}px` : v;
}

function ScrollbarInner(
  props: ScrollbarProps,
  ref: ForwardedRef<HTMLDivElement>,
) {
  const {
    orientation = "vertical",
    size = "medium",
    length,
    thumbLength,
    thumbOffset,
    className,
    style,
    ...rest
  } = props;

  const resolvedLength = toCssLength(length) ?? "300px";
  const resolvedThumb = toCssLength(thumbLength) ?? "100px";
  const resolvedOffset = toCssLength(thumbOffset) ?? "0px";

  const rootStyle: CSSProperties = {
    ...style,
    ...(orientation === "vertical"
      ? { height: resolvedLength }
      : { width: resolvedLength }),
    ["--sb-thumb-length" as string]: resolvedThumb,
  };

  const thumbStyle: CSSProperties =
    orientation === "vertical"
      ? { marginTop: resolvedOffset }
      : { marginLeft: resolvedOffset };

  return (
    <div
      ref={ref}
      {...rest}
      className={[styles.scrollbar, className].filter(Boolean).join(" ")}
      data-orientation={orientation}
      data-size={size}
      style={rootStyle}
      aria-hidden="true"
    >
      <div className={styles.thumb} style={thumbStyle} />
    </div>
  );
}

export const Scrollbar = forwardRef<HTMLDivElement, ScrollbarProps>(
  ScrollbarInner,
);
Scrollbar.displayName = "Scrollbar";

/* =================================================================
 * ScrollArea (실제 스크롤 컨테이너)
 * =============================================================== */
export type ScrollAreaOrientation = "both" | "vertical" | "horizontal";

export type ScrollAreaProps = HTMLAttributes<HTMLDivElement> & {
  size?: ScrollbarSize;
  orientation?: ScrollAreaOrientation;
  maxHeight?: number | string;
  maxWidth?: number | string;
  children?: ReactNode;
};

function ScrollAreaInner(
  props: ScrollAreaProps,
  ref: ForwardedRef<HTMLDivElement>,
) {
  const {
    size = "medium",
    orientation = "both",
    maxHeight,
    maxWidth,
    className,
    style,
    children,
    ...rest
  } = props;

  const overflowX =
    orientation === "vertical" ? "hidden" : "auto";
  const overflowY =
    orientation === "horizontal" ? "hidden" : "auto";

  const mergedStyle: CSSProperties = {
    ...style,
    overflowX,
    overflowY,
    maxHeight: toCssLength(maxHeight) ?? style?.maxHeight,
    maxWidth: toCssLength(maxWidth) ?? style?.maxWidth,
  };

  return (
    <div
      ref={ref}
      {...rest}
      className={[styles.area, className].filter(Boolean).join(" ")}
      data-size={size}
      data-orientation={orientation}
      style={mergedStyle}
    >
      {children}
    </div>
  );
}

export const ScrollArea = forwardRef<HTMLDivElement, ScrollAreaProps>(
  ScrollAreaInner,
);
ScrollArea.displayName = "ScrollArea";

export default Scrollbar;
