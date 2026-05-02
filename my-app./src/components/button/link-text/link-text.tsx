"use client";

/**
 * LinkText — Figma MCP 기반 컴포넌트 (node 9813:1005)
 * ----------------------------------------------------------------
 * Variants (12)
 *   variant : neutral / accent
 *   size    : small (13/20) / large (14/24)
 *   state   : default / hover / disabled
 *
 * 토큰
 *   neutral default  : --context-foreground-surface-on-surface          (#565967)
 *   neutral hover    : --context-foreground-surface-on-surface-selected (#434551)
 *   neutral disabled : --context-foreground-surface-on-surface-disabled (#B3B4BC)
 *   accent  default  : --context-foreground-blue-on-blue                (#316CF4)
 *   accent  hover    : --context-foreground-blue-on-blue-hover          (#2757C3)
 *   accent  disabled : --context-foreground-blue-on-blue-disabled       (#A6C4F9)
 *
 * forceState 는 스토리북에서 hover/disable 상태를 시각화할 때 사용.
 */

import type {
  AnchorHTMLAttributes,
  ForwardedRef,
  MouseEvent,
  ReactNode,
} from "react";
import { forwardRef } from "react";

import styles from "./link-text.module.css";

export type LinkTextVariant = "neutral" | "accent";
export type LinkTextSize = "small" | "large";
export type LinkTextForceState = "default" | "hover" | "disabled";

type NativeAnchorProps = Omit<
  AnchorHTMLAttributes<HTMLAnchorElement>,
  "children"
>;

export type LinkTextProps = NativeAnchorProps & {
  variant?: LinkTextVariant;
  size?: LinkTextSize;
  /** 비활성 상태 — aria-disabled + pointer-events:none */
  disabled?: boolean;
  /** 스토리북 등에서 상태를 강제로 고정할 때 사용 */
  forceState?: LinkTextForceState;
  children?: ReactNode;
};

const VARIANT_CLASS: Record<LinkTextVariant, string> = {
  neutral: styles.variantNeutral,
  accent: styles.variantAccent,
};

const SIZE_CLASS: Record<LinkTextSize, string> = {
  small: styles.sizeSmall,
  large: styles.sizeLarge,
};

function joinClasses(
  ...classes: Array<string | undefined | false | null>
): string {
  return classes.filter(Boolean).join(" ");
}

function LinkTextInner(
  props: LinkTextProps,
  ref: ForwardedRef<HTMLAnchorElement>,
) {
  const {
    variant = "neutral",
    size = "small",
    disabled,
    forceState,
    href,
    onClick,
    className,
    children = "Link Text",
    ...rest
  } = props;

  const isDisabled = disabled || forceState === "disabled";

  const classes = joinClasses(
    styles.root,
    VARIANT_CLASS[variant],
    SIZE_CLASS[size],
    className,
  );

  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    if (isDisabled) {
      e.preventDefault();
      return;
    }
    onClick?.(e);
  };

  return (
    <a
      {...rest}
      ref={ref}
      href={isDisabled ? undefined : href}
      className={classes}
      data-variant={variant}
      data-size={size}
      data-force-state={forceState}
      aria-disabled={isDisabled || undefined}
      onClick={handleClick}
    >
      {children}
    </a>
  );
}

export const LinkText = forwardRef<HTMLAnchorElement, LinkTextProps>(
  LinkTextInner,
);
LinkText.displayName = "LinkText";

export default LinkText;
