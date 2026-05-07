"use client";

import { Num, type NumMode, type NumState } from "./num";
import styles from "./stepitem.module.css";

export type StepItemProps = {
  /** Num에 전달할 번호 — icon states(complete·error·success·stop)에서는 불필요 */
  number?: number | string;
  numState?: NumState;
  mode?: NumMode;
  /** true → line O (하단 연결선 표시), false → line X (마지막 항목) */
  hasLine?: boolean;
  className?: string;
};

export function StepItem({
  number,
  numState = "next",
  mode = "light",
  hasLine = true,
  className,
}: StepItemProps) {
  return (
    <div
      className={[styles.root, className].filter(Boolean).join(" ")}
      data-theme={mode === "brand" ? "brand" : undefined}
    >
      <div className={styles.numWrap}>
        <Num number={number} state={numState} mode={mode} />
      </div>
      {hasLine && <div className={styles.line} aria-hidden="true" />}
    </div>
  );
}

export default StepItem;
