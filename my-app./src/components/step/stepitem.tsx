"use client";

/**
 * StepItem — Figma node 18505:14797
 * ----------------------------------------------------------------
 * Stepper / StepCard 의 좌측에 들어가는 세로 인디케이터.
 * 상단 Num + 하단 세로선으로 구성. 마지막 step 에서는 line=false 로 선 숨김.
 */

import type { HTMLAttributes } from "react";
import { forwardRef } from "react";

import { Num, type NumVariant } from "./num";
import styles from "./stepitem.module.css";

type NativeDivProps = Omit<HTMLAttributes<HTMLDivElement>, "children">;

export type StepItemProps = NativeDivProps & {
  /** Num variant — Stepper / StepCard 에서 단계 상태를 표현 */
  variant?: NumVariant;
  /** Num text variant 일 때 표시할 스텝 숫자 */
  step?: number | string;
  /** 하단 세로 선 노출 여부. 마지막 단계에서는 false */
  line?: boolean;
};

function StepItemInner(
  props: StepItemProps,
  ref: React.ForwardedRef<HTMLDivElement>,
) {
  const {
    variant = "error",
    step = 1,
    line = true,
    className,
    ...rest
  } = props;

  const rootClass = [styles.root, className].filter(Boolean).join(" ");

  return (
    <div
      {...rest}
      ref={ref}
      className={rootClass}
      data-line={line ? "true" : "false"}
    >
      <span className={styles.numWrap}>
        <Num variant={variant} step={step} />
      </span>
      <span className={styles.line} aria-hidden="true" />
    </div>
  );
}

export const StepItem = forwardRef<HTMLDivElement, StepItemProps>(StepItemInner);
StepItem.displayName = "StepItem";

export default StepItem;
