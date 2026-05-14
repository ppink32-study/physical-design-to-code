"use client";

/**
 * Stepper — Figma node 16722:36406
 * ----------------------------------------------------------------
 * 단일 step 블록 (좌 Num + 우 "Step N · Name of step N").
 *
 *   current : 현재 진행 중인 step (그라데이션 Num + 박스 배경)
 *   finish  : 완료된 step (Check Num + 투명 배경)
 */

import type { HTMLAttributes, ReactNode } from "react";
import { forwardRef } from "react";

import { Num, type NumVariant } from "./num";
import styles from "./stepper.module.css";

export type StepperVariant = "current" | "finish";

const NUM_VARIANT_FOR: Record<StepperVariant, NumVariant> = {
  current: "current-brand",
  finish: "complete",
};

type NativeDivProps = Omit<HTMLAttributes<HTMLDivElement>, "children">;

export type StepperProps = NativeDivProps & {
  variant?: StepperVariant;
  /** Num 의 step 숫자 (current 일 때 표시됨) */
  step?: number | string;
  /** "Step 1" 같은 보조 라벨 */
  label?: ReactNode;
  /** "Name of step 1" 같은 메인 이름 */
  name?: ReactNode;
};

function StepperInner(
  props: StepperProps,
  ref: React.ForwardedRef<HTMLDivElement>,
) {
  const {
    variant = "current",
    step = 1,
    label = `Step ${step}`,
    name = `Name of step ${step}`,
    className,
    ...rest
  } = props;

  const rootClass = [styles.root, className].filter(Boolean).join(" ");

  return (
    <div
      {...rest}
      ref={ref}
      className={rootClass}
      data-variant={variant}
    >
      <span className={styles.indicator}>
        <span className={styles.numWrap}>
          <Num variant={NUM_VARIANT_FOR[variant]} step={step} />
        </span>
      </span>
      <div className={styles.labels}>
        <p className={styles.label}>{label}</p>
        <p className={styles.name}>{name}</p>
      </div>
    </div>
  );
}

export const Stepper = forwardRef<HTMLDivElement, StepperProps>(StepperInner);
Stepper.displayName = "Stepper";

export default Stepper;
