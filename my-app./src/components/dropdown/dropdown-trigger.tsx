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
 *   dropDirection  : "down" | "up" | "left" | "right"  (ChevronDown Fill 회전)
 *
 * Composition
 *   splitButton=false : 단일 Button — dropDirection=right 만 chevron 이 라벨 오른쪽, 그 외는 왼쪽
 *   splitButton=true  : 메인 Button + chevron-only Button (left 일 때 chevron 이 선행)
 *
 * Note
 *   - open/close 로직은 Composite (Step 6) 에서 주입합니다.
 *   - opened 는 시각적 active 표시 prop (a11y aria-expanded 와 별개로 토글)
 *   - type=secondary → Button `secondary-solid` (bg-gray-hover #434551, on-neutral-invert)
 */

import type { ButtonHTMLAttributes, ForwardedRef, ReactNode } from "react";
import { forwardRef } from "react";

import { Button } from "../button/button/button";

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
  "primary-solid" | "secondary-solid"
> = {
  primary: "primary-solid",
  /** Figma: Gray fill 기본 — bg-gray-hover, large 40h·16px pad·radius 8 등은 Button size/variant 와 정합 */
  secondary: "secondary-solid",
};

/** ChevronDown Fill (Figma) — 24 viewBox, fill + currentColor 로 버튼 텍스트색 상속 */
const CHEVRON_DOWN_FILL_PATH =
  "M18.8894 9.68788L12.4552 16.122C12.3955 16.1818 12.3245 16.2293 12.2464 16.2617C12.1683 16.2941 12.0846 16.3107 12 16.3107C11.9155 16.3107 11.8317 16.2941 11.7536 16.2617C11.6755 16.2293 11.6045 16.1818 11.5448 16.122L5.11064 9.68788C5.02056 9.59789 4.9592 9.4832 4.93433 9.35832C4.90946 9.23345 4.9222 9.104 4.97094 8.98637C5.01968 8.86874 5.10223 8.76821 5.20813 8.69752C5.31403 8.62682 5.43853 8.58914 5.56586 8.58924H18.4342C18.5615 8.58914 18.686 8.62682 18.7919 8.69752C18.8978 8.76821 18.9803 8.86874 19.0291 8.98637C19.0778 9.104 19.0906 9.23345 19.0657 9.35832C19.0408 9.4832 18.9795 9.59789 18.8894 9.68788Z";

function Chevron({
  direction,
  color,
}: {
  direction: DropdownTriggerDropDirection;
  color?: string;
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
        ...(color ? { color } : undefined),
      }}
      aria-hidden="true"
    >
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        style={{ display: "block" }}
      >
        <path d={CHEVRON_DOWN_FILL_PATH} fill="currentColor" />
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
  const chevronColor =
    type === "secondary"
      ? "var(--icon-neutral-disabled)"
      : undefined;
  const chevron = <Chevron direction={dropDirection} color={chevronColor} />;
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
        data-size={size}
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
      data-size={size}
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
