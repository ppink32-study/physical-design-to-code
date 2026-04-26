"use client";

/**
 * DropdownTrigger
 * ----------------------------------------------------------------
 * Figma node: 5286:121691 — dropdown-trigger
 *
 * 기존 Button 컴포넌트를 컴포즈해서 사용합니다.
 *
 * Variants (Figma 4 축)
 *   type           : "primary" | "secondary"
 *   size           : "small" | "medium" | "large"
 *   splitButton    : boolean
 *   dropDirection  : "down" | "up" | "left" | "right"  (chevron 방향만 결정)
 *
 * Composition
 *   splitButton=false : 단일 Button — dropDirection=right 만 chevron 이 라벨 오른쪽, 그 외는 왼쪽
 *   splitButton=true  : 메인 Button + chevron-only Button (left 일 때 chevron 이 선행)
 *
 * Note
 *   - open/close 로직은 Composite (Step 6) 에서 주입합니다.
 *   - opened 는 시각적 active 표시 prop (a11y aria-expanded 와 별개로 토글)
 */

import type { ButtonHTMLAttributes, ForwardedRef, ReactNode } from "react";
import { forwardRef } from "react";

import { Button } from "../button/button";

import styles from "./dropdown-trigger.module.css";

/* -----------------------------------------------------------------
 * Types
 * --------------------------------------------------------------- */
export type DropdownTriggerType = "primary" | "secondary";
export type DropdownTriggerSize = "small" | "medium" | "large";
export type DropdownTriggerDropDirection = "down" | "up" | "left" | "right";

type NativeButtonProps = Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  "type" | "children" | "onClick"
>;

export type DropdownTriggerProps = NativeButtonProps & {
  /** Figma type (primary/secondary). default "primary" */
  type?: DropdownTriggerType;
  /** default "medium" */
  size?: DropdownTriggerSize;
  /** split 모드 — 메인 / chevron 두 영역 분리 */
  splitButton?: boolean;
  /** chevron 방향. default "down" */
  dropDirection?: DropdownTriggerDropDirection;
  /** 시각적 active(열림) 표시 */
  opened?: boolean;
  /** 라벨 좌측 아이콘 */
  leftIcon?: ReactNode;
  /** 라벨 텍스트 */
  children?: ReactNode;
  disabled?: boolean;

  /** non-split: 전체 클릭 시 호출 */
  onToggle?: () => void;
  /** split: 메인 영역 클릭 시 (라벨 액션) */
  onMainClick?: () => void;
  /** split: chevron 영역 클릭 시 (메뉴 토글) */
  onChevronClick?: () => void;
};

/* -----------------------------------------------------------------
 * Helpers
 * --------------------------------------------------------------- */
function joinClasses(...classes: Array<string | undefined | false | null>) {
  return classes.filter(Boolean).join(" ");
}

const TYPE_TO_VARIANT: Record<
  DropdownTriggerType,
  "primary-solid" | "secondary-outline"
> = {
  primary: "primary-solid",
  secondary: "secondary-outline",
};

/** chevron SVG — 12px viewBox, currentColor */
function Chevron({
  direction,
}: {
  direction: DropdownTriggerDropDirection;
}) {
  const rotation: Record<DropdownTriggerDropDirection, number> = {
    down: 0,
    up: 180,
    left: 90,
    right: -90,
  };
  return (
    <span
      style={{
        display: "inline-flex",
        width: 16,
        height: 16,
        transform: `rotate(${rotation[direction]}deg)`,
      }}
      aria-hidden="true"
    >
      <svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        style={{ display: "block" }}
      >
        <path
          d="M4 6L8 10L12 6"
          stroke="currentColor"
          strokeWidth="1.25"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
}

/* -----------------------------------------------------------------
 * Component
 * --------------------------------------------------------------- */
function DropdownTriggerInner(
  props: DropdownTriggerProps,
  ref: ForwardedRef<HTMLButtonElement>,
) {
  const {
    type = "primary",
    size = "medium",
    splitButton = false,
    dropDirection = "down",
    opened = false,
    leftIcon,
    children,
    disabled,
    onToggle,
    onMainClick,
    onChevronClick,
    className,
    "aria-expanded": ariaExpanded,
    "aria-controls": ariaControls,
    "aria-haspopup": ariaHasPopup = "menu",
    ...rest
  } = props;

  const variant = TYPE_TO_VARIANT[type];
  const chevron = <Chevron direction={dropDirection} />;
  /** Figma: 비-split 일 때 Right 만 케럿이 라벨 오른쪽, 그 외(D/U/L)는 왼쪽 */
  const chevronOnRight = dropDirection === "right";
  const chevronFirstSplit = splitButton && dropDirection === "left";

  const composedLeadingIcon =
    !chevronOnRight && leftIcon ? (
      <span
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 4,
        }}
      >
        {leftIcon}
        {chevron}
      </span>
    ) : undefined;

  const wrapperClasses = joinClasses(styles.trigger, className);

  /* -------- Single mode -------- */
  if (!splitButton) {
    return (
      <span
        className={wrapperClasses}
        data-split="false"
        data-type={type}
        data-opened={opened || undefined}
      >
        <Button
          {...rest}
          ref={ref}
          variant={variant}
          size={size}
          leftIcon={
            chevronOnRight ? leftIcon : composedLeadingIcon ?? chevron
          }
          rightIcon={chevronOnRight ? chevron : undefined}
          disabled={disabled}
          onClick={onToggle ? () => onToggle() : undefined}
          aria-expanded={ariaExpanded ?? opened}
          aria-controls={ariaControls}
          aria-haspopup={ariaHasPopup}
          className={styles.single}
        >
          {children}
        </Button>
      </span>
    );
  }

  /* -------- Split mode — dropDirection=left 일 때 케럿 영역이 Figma 대로 선행 -------- */
  const splitMainBtn = (
    <Button
      {...rest}
      ref={ref}
      variant={variant}
      size={size}
      leftIcon={leftIcon}
      disabled={disabled}
      onClick={onMainClick ? () => onMainClick() : undefined}
      className={chevronFirstSplit ? styles.splitMainTrailing : styles.splitMain}
    >
      {children}
    </Button>
  );

  const splitChevronBtn = (
    <Button
      variant={variant}
      size={size}
      iconOnly
      leftIcon={chevron}
      disabled={disabled}
      onClick={onChevronClick ? () => onChevronClick() : undefined}
      aria-label="Toggle menu"
      aria-expanded={ariaExpanded ?? opened}
      aria-controls={ariaControls}
      aria-haspopup={ariaHasPopup}
      className={
        chevronFirstSplit ? styles.splitChevronLeading : styles.splitChevron
      }
    />
  );

  return (
    <span
      className={wrapperClasses}
      data-split="true"
      data-type={type}
      data-opened={opened || undefined}
      data-chevron-first={chevronFirstSplit || undefined}
    >
      {chevronFirstSplit ? (
        <>
          {splitChevronBtn}
          {splitMainBtn}
        </>
      ) : (
        <>
          {splitMainBtn}
          {splitChevronBtn}
        </>
      )}
    </span>
  );
}

export const DropdownTrigger = forwardRef<
  HTMLButtonElement,
  DropdownTriggerProps
>(DropdownTriggerInner);
DropdownTrigger.displayName = "DropdownTrigger";

export default DropdownTrigger;
