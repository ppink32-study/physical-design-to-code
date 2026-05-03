"use client";

/**
 * Step — Figma node 18374:260
 * Step 라벨. (Num 과 함께 묶이거나 단독 사용)
 *
 * states (2) : default · active
 * modes  (2) : light · dark
 *
 * mode 는 Num 과 동일한 패턴 — data-theme 을 같이 셋업해
 * --context-* 토큰이 알맞게 resolve 되도록 함.
 */

import type { ReactNode } from "react";

import styles from "./step.module.css";

export type StepState = "default" | "active";
export type StepMode = "light" | "dark";

export type StepProps = {
  label?: ReactNode;
  state?: StepState;
  mode?: StepMode;
  className?: string;
};

export function Step({
  label = "Configure Parameters",
  state = "default",
  mode = "light",
  className,
}: StepProps) {
  return (
    <div
      className={[styles.root, className].filter(Boolean).join(" ")}
      data-state={state}
      data-theme={mode === "dark" ? "brand" : "light"}
    >
      <span className={styles.label}>{label}</span>
    </div>
  );
}

export default Step;
