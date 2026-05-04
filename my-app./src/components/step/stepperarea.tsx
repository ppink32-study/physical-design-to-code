"use client";

/**
 * StepperArea — Figma node 18444:8508
 * ---------------------------------------------------------------
 * Variants
 *   default : 투명 배경 + 하단 primary opacity-30 border
 *   brand   : 다크(#141518) 배경 + 하단 black opacity-90 border
 *
 * Props
 *   steps      : 단계 라벨 배열 (순서 = 번호)
 *   activeStep : 현재 활성 단계 인덱스(0-based). 기본 0.
 *                activeStep 이전 → finish, 현재 → current, 이후 → next
 */

import { Fragment, type HTMLAttributes } from "react";
import { forwardRef } from "react";

import { Num } from "./num";
import { Step } from "./step";
import styles from "./stepperarea.module.css";

export type StepperAreaVariant = "default" | "brand";

export type StepperAreaProps = Omit<HTMLAttributes<HTMLDivElement>, "children"> & {
  variant?: StepperAreaVariant;
  steps: string[];
  activeStep?: number;
};

export const StepperArea = forwardRef<HTMLDivElement, StepperAreaProps>(
  function StepperArea(
    { variant = "default", steps, activeStep = 0, className, ...rest },
    ref,
  ) {
    const mode = variant === "brand" ? "dark" : "light";

    return (
      <div
        ref={ref}
        className={[styles.root, className].filter(Boolean).join(" ")}
        data-variant={variant}
        data-theme={variant === "brand" ? "brand" : "light"}
        {...rest}
      >
        <div className={styles.horizontal}>
          {steps.map((label, idx) => {
            const numState =
              idx < activeStep ? "finish" : idx === activeStep ? "current" : "next";
            const stepState = idx === activeStep ? "active" : "default";

            return (
              <Fragment key={idx}>
                {idx > 0 && (
                  <div className={styles.divider} aria-hidden="true" />
                )}
                <div className={styles.numstep}>
                  <Num number={idx + 1} state={numState} mode={mode} />
                  <Step label={label} state={stepState} mode={mode} />
                </div>
              </Fragment>
            );
          })}
        </div>
      </div>
    );
  },
);

StepperArea.displayName = "StepperArea";
export default StepperArea;
