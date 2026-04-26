"use client";

/**
 * Loader — Figma MCP 기반 구현 (node 13289:46891)
 * ----------------------------------------------------------------
 * Circle loading spinner
 *
 * Figma CSS spec
 *   라인(arc):
 *     border-radius: 48px;
 *     background: conic-gradient(
 *       from 180deg at 50% 50%,
 *       var(--_Color-Mint-500, #7EF2F1) 0deg,
 *       var(--_Color-Mint-300, #B2FBED) 63.243deg,
 *       rgba(255,255,255,0) 360deg
 *     );
 *
 *   원(dot):
 *     border-radius: 7.2px;  // 지름 7.2px, 완전 원
 *     background: var(--_Color-Mint-500, #7EF2F1);
 *
 * Implementation
 *   - `conic-gradient` + radial-gradient `mask` 로 ring 모양 재현
 *   - dot 은 절대 배치로 arc 의 "진한 끝" 과 겹치게 놓고,
 *     wrapper 를 통째로 회전시켜 스피너 효과
 *
 * Usage
 *   <Loader />                    // 기본 48 × 48 (Mint)
 *   <Loader size="small" />       // 24 × 24
 *   <Loader size={64} />          // 커스텀 px
 *   <Loader color="white" />      // 어두운 배경용
 */

import type { CSSProperties, ForwardedRef, HTMLAttributes } from "react";
import { forwardRef } from "react";

import styles from "./loader.module.css";

export type LoaderSize = "small" | "medium" | "large";

const SIZE_PX: Record<LoaderSize, number> = {
  small: 24,
  medium: 32,
  large: 48,
};

/** 색상 프리셋 (CSS 변수 매핑은 loader.module.css 참조) */
export type LoaderColor = "mint" | "gray" | "white";

export type LoaderProps = Omit<HTMLAttributes<HTMLSpanElement>, "children"> & {
  /** 지름. 프리셋 키 또는 px 값. 기본 `"large"` (48px) */
  size?: LoaderSize | number;
  /** 색상 프리셋. 기본 `"mint"` (Figma 스펙) */
  color?: LoaderColor;
  /** 접근성 레이블. 기본 `"로딩 중"` */
  label?: string;
};

function resolveDim(size: LoaderSize | number): number {
  return typeof size === "number" ? size : SIZE_PX[size];
}

function LoaderInner(
  props: LoaderProps,
  ref: ForwardedRef<HTMLSpanElement>,
) {
  const {
    size = "large",
    color = "mint",
    label = "로딩 중",
    className,
    style,
    ...rest
  } = props;

  const dim = resolveDim(size);

  const rootClass = [styles.root, className].filter(Boolean).join(" ");
  /** `--loader-dim` 을 통해 dot 의 크기·위치 비율을 자식이 사용 */
  const rootStyle: CSSProperties = {
    width: dim,
    height: dim,
    ["--loader-dim" as string]: `${dim}px`,
    ...style,
  };

  return (
    <span
      {...rest}
      ref={ref}
      role="status"
      aria-live="polite"
      aria-label={label}
      className={rootClass}
      style={rootStyle}
      data-color={color}
    >
      <span className={styles.spinner} aria-hidden="true">
        <span className={styles.arc} />
        <span className={styles.dot} />
      </span>
      <span className={styles.srOnly}>{label}</span>
    </span>
  );
}

export const Loader = forwardRef<HTMLSpanElement, LoaderProps>(LoaderInner);
Loader.displayName = "Loader";

export default Loader;
