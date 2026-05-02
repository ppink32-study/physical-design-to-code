"use client";

/**
 * Button — Figma MCP 기반 통합 컴포넌트
 * ----------------------------------------------------------------
 * Figma Root: node-id=17987-47864
 *
 * variants (9)
 *   primary-solid                           (size: sm/md/lg/xl, shape: square/round)
 *   primary-outline                         (size: sm/md/lg,    shape: square/round)
 *   primary-ghost                           (size: sm/md/lg,    shape: square)
 *   secondary-solid                         (size: sm/md/lg,    shape: square/round)
 *   secondary-outline                       (size: sm/md/lg,    shape: square/round)
 *   secondary-outline-white-invert          (size: sm/md/lg,    shape: square/round)
 *   secondary-outline-dark-invert           (size: sm/md/lg,    shape: square/round)
 *   secondary-ghost                         (size: sm/md/lg,    shape: square)
 *   gray                                    (size: sm/md/lg/xl, shape: square)
 *
 * - label 이 비어있고 icon 만 제공되면 `iconOnly` 모드로 동작 (정사각형)
 * - forceState 는 스토리북에서 hover/disable 상태를 시각화할 때 사용
 */

import type {
  ButtonHTMLAttributes,
  ForwardedRef,
  ReactNode,
} from "react";
import { forwardRef } from "react";

import styles from "./button.module.css";

export type ButtonVariant =
  | "primary-solid"
  | "primary-outline"
  | "primary-ghost"
  | "secondary-solid"
  | "secondary-outline"
  | "secondary-outline-white-invert"
  | "secondary-outline-dark-invert"
  | "secondary-ghost"
  | "gray";

export type ButtonSize = "small" | "medium" | "large" | "xlarge";
export type ButtonShape = "square" | "round";
export type ButtonForceState = "default" | "hover" | "disable";

type NativeButtonProps = Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  "children"
>;

export type ButtonProps = NativeButtonProps & {
  variant?: ButtonVariant;
  size?: ButtonSize;
  shape?: ButtonShape;
  /** 텍스트 앞쪽 아이콘. `currentColor` 로 상속됩니다. */
  leftIcon?: ReactNode;
  /** 텍스트 뒤쪽 아이콘. `currentColor` 로 상속됩니다. */
  rightIcon?: ReactNode;
  /** 아이콘만 렌더링(label 없이). 자동 감지도 됩니다. */
  iconOnly?: boolean;
  /** 스토리북 등에서 상태를 강제로 고정할 때 사용 */
  forceState?: ButtonForceState;
  children?: ReactNode;
};

const VARIANT_CLASS: Record<ButtonVariant, string> = {
  "primary-solid": styles.variantPrimarySolid,
  "primary-outline": styles.variantPrimaryOutline,
  "primary-ghost": styles.variantPrimaryGhost,
  "secondary-solid": styles.variantSecondarySolid,
  "secondary-outline": styles.variantSecondaryOutline,
  "secondary-outline-white-invert": styles.variantSecondaryOutlineWhiteInvert,
  "secondary-outline-dark-invert": styles.variantSecondaryOutlineDarkInvert,
  "secondary-ghost": styles.variantSecondaryGhost,
  gray: styles.variantGray,
};

const SIZE_CLASS: Record<ButtonSize, string> = {
  small: styles.sizeSmall,
  medium: styles.sizeMedium,
  large: styles.sizeLarge,
  xlarge: styles.sizeXlarge,
};

const SHAPE_CLASS: Record<ButtonShape, string> = {
  square: styles.shapeSquare,
  round: styles.shapeRound,
};

function joinClasses(
  ...classes: Array<string | undefined | false | null>
): string {
  return classes.filter(Boolean).join(" ");
}

function ButtonInner(
  props: ButtonProps,
  ref: ForwardedRef<HTMLButtonElement>,
) {
  const {
    variant = "primary-solid",
    size = "large",
    shape = "square",
    leftIcon,
    rightIcon,
    iconOnly: iconOnlyProp,
    forceState,
    disabled,
    type = "button",
    className,
    children,
    ...rest
  } = props;

  const hasLabel = children !== undefined && children !== null && children !== "";
  const hasAnyIcon = Boolean(leftIcon || rightIcon);
  const iconOnly =
    iconOnlyProp ?? (!hasLabel && hasAnyIcon);

  const classes = joinClasses(
    styles.button,
    VARIANT_CLASS[variant],
    SIZE_CLASS[size],
    SHAPE_CLASS[shape],
    className,
  );

  const isDisabled = disabled || forceState === "disable";

  return (
    <button
      {...rest}
      ref={ref}
      type={type}
      className={classes}
      disabled={isDisabled}
      aria-disabled={isDisabled || undefined}
      data-variant={variant}
      data-size={size}
      data-shape={shape}
      data-icon-only={iconOnly ? "true" : undefined}
      data-force-state={forceState}
    >
      {iconOnly ? (
        <span className={styles.icon} aria-hidden="true">
          {leftIcon ?? rightIcon}
        </span>
      ) : (
        <span className={styles.inner}>
          {leftIcon ? (
            <span className={styles.icon} aria-hidden="true">
              {leftIcon}
            </span>
          ) : null}
          {hasLabel ? <span className={styles.label}>{children}</span> : null}
          {rightIcon ? (
            <span className={styles.icon} aria-hidden="true">
              {rightIcon}
            </span>
          ) : null}
        </span>
      )}
    </button>
  );
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(ButtonInner);
Button.displayName = "Button";

export default Button;
