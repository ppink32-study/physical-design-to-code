"use client";

/**
 * XButton — Figma MCP 기반 컴포넌트 (node 6592:270982)
 * ----------------------------------------------------------------
 * 모달·태그·검색칩 등에서 항목을 닫거나 제거할 때 쓰는 원형 X 버튼.
 *
 * Variants (6) : size{medium, large} × state{default, hover, disable}
 *
 * 토큰
 *   default bg : --bg-surface-secondary  (#F4F4F5)
 *   default fg : --icon-surface     (#565967)
 *   hover   bg : --bg-surface-tertiary    (#ECECEE)
 *   hover   fg : --icon-surface     (#565967)
 *   disable bg : --bg-gray-tint-hover       (#ECECEE)
 *   disable fg : --icon-surface-disabled (#B3B4BC)
 *
 * 사이즈
 *   medium : 16×16 컨테이너, 12×12 아이콘
 *   large  : 18×18 컨테이너, 14×14 아이콘
 *
 * forceState 는 스토리북에서 hover/disable 상태를 시각화할 때 사용.
 */

import type {
  ButtonHTMLAttributes,
  ForwardedRef,
} from "react";
import { forwardRef } from "react";

import styles from "./x-button.module.css";

export type XButtonSize = "medium" | "large";
export type XButtonForceState = "default" | "hover" | "disable";

type NativeButtonProps = Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  "children"
>;

export type XButtonProps = NativeButtonProps & {
  size?: XButtonSize;
  /** 스토리북 등에서 상태를 강제로 고정할 때 사용 */
  forceState?: XButtonForceState;
  /** 접근성 라벨 — 기본값 "닫기" */
  "aria-label"?: string;
};

const SIZE_CLASS: Record<XButtonSize, string> = {
  medium: styles.sizeMedium,
  large: styles.sizeLarge,
};

function joinClasses(
  ...classes: Array<string | undefined | false | null>
): string {
  return classes.filter(Boolean).join(" ");
}

function XButtonInner(
  props: XButtonProps,
  ref: ForwardedRef<HTMLButtonElement>,
) {
  const {
    size = "medium",
    forceState,
    disabled,
    type = "button",
    className,
    "aria-label": ariaLabel = "닫기",
    ...rest
  } = props;

  const isDisabled = disabled || forceState === "disable";

  const classes = joinClasses(
    styles.root,
    SIZE_CLASS[size],
    className,
  );

  return (
    <button
      {...rest}
      ref={ref}
      type={type}
      className={classes}
      disabled={isDisabled}
      aria-disabled={isDisabled || undefined}
      aria-label={ariaLabel}
      data-size={size}
      data-force-state={forceState}
    >
      <span className={styles.icon} aria-hidden="true" />
    </button>
  );
}

export const XButton = forwardRef<HTMLButtonElement, XButtonProps>(XButtonInner);
XButton.displayName = "XButton";

export default XButton;
