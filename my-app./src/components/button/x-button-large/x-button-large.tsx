"use client";

/**
 * XButtonLarge — Figma node 18369:15529 (btn/delete)
 * ----------------------------------------------------------------
 * 비디오/이미지 등 미디어 위에 오버레이로 올리는 32×32 원형 X 버튼.
 *
 *   default bg : --opacity-black-opacity-50  (rgba(0,0,0,0.5))
 *   hover   bg : --opacity-black-opacity-90  (rgba(0,0,0,0.9))
 *   icon fg    : --context-foreground-neutral-on-neutral-white  (흰 X)
 *
 * 사이즈
 *   container : 32×32 (--size-base-4xl), rounded-100 (pill = 원형)
 *   icon      : 16×16 Close-2 SVG (mask-image, currentColor 상속)
 *
 * forceState 는 스토리북에서 hover 상태를 고정 시각화할 때 사용.
 */

import type { ButtonHTMLAttributes, ForwardedRef } from "react";
import { forwardRef } from "react";

import styles from "./x-button-large.module.css";

export type XButtonLargeForceState = "default" | "hover";

type NativeButtonProps = Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  "children"
>;

export type XButtonLargeProps = NativeButtonProps & {
  /** 스토리북 등에서 hover 시각 상태 강제 */
  forceState?: XButtonLargeForceState;
  /** 접근성 라벨 — 기본 "닫기" */
  "aria-label"?: string;
};

function joinClasses(...classes: Array<string | undefined | false | null>): string {
  return classes.filter(Boolean).join(" ");
}

function XButtonLargeInner(
  props: XButtonLargeProps,
  ref: ForwardedRef<HTMLButtonElement>,
) {
  const {
    forceState,
    type = "button",
    className,
    "aria-label": ariaLabel = "닫기",
    ...rest
  } = props;

  return (
    <button
      ref={ref}
      type={type}
      className={joinClasses(styles.root, className)}
      data-force-state={forceState === "hover" ? "hover" : undefined}
      aria-label={ariaLabel}
      {...rest}
    >
      <span aria-hidden="true" className={styles.icon} />
    </button>
  );
}

export const XButtonLarge = forwardRef<HTMLButtonElement, XButtonLargeProps>(
  XButtonLargeInner,
);

export default XButtonLarge;
