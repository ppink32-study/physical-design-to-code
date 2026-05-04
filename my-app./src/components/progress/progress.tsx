"use client";

/**
 * Progress — Figma node 13262:76705 (default 16px) · 7370:219807 (sm 8px)
 *
 * Progress (single bar)
 *   - value   : 0–100 (fill %)
 *   - color   : primary | success | info | warning | danger
 *   - striped : Pattern overlay (White_8% diagonal)
 *   - size    : "default" (16px, with label) | "sm" (8px, no label)
 *
 * ProgressMultiple (multi-segment bar)
 *   - segments : { value: number; color?: ProgressColor }[]
 *                value 는 상대 가중치 (합산 후 % 환산)
 *   - striped  : 동일한 Pattern overlay
 *   - size     : "default" | "sm"
 */

import type { HTMLAttributes } from "react";

import styles from "./progress.module.css";

export type ProgressColor =
  | "primary"
  | "success"
  | "info"
  | "warning"
  | "danger";

export type ProgressSize = "default" | "sm";

export type ProgressProps = Omit<HTMLAttributes<HTMLDivElement>, "children"> & {
  value?: number;
  color?: ProgressColor;
  striped?: boolean;
  size?: ProgressSize;
};

export type ProgressSegment = {
  value: number;
  color?: ProgressColor;
};

export type ProgressMultipleProps = Omit<
  HTMLAttributes<HTMLDivElement>,
  "children"
> & {
  segments: ProgressSegment[];
  striped?: boolean;
  size?: ProgressSize;
};

const COLOR_SEQUENCE: ProgressColor[] = [
  "primary",
  "success",
  "info",
  "warning",
  "danger",
];

function clamp(n: number, min: number, max: number) {
  return Math.min(Math.max(n, min), max);
}

function joinCls(...parts: Array<string | undefined | false>) {
  return parts.filter(Boolean).join(" ");
}

/* ------------------------------------------------------------------
 * Progress (single)
 * ----------------------------------------------------------------- */
export function Progress({
  value = 0,
  color = "primary",
  striped = false,
  size = "default",
  className,
  ...rest
}: ProgressProps) {
  const pct = clamp(value, 0, 100);

  return (
    <div
      {...rest}
      className={joinCls(styles.track, className)}
      data-size={size !== "default" ? size : undefined}
      role="progressbar"
      aria-valuenow={pct}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      <div
        className={joinCls(styles.bar, striped ? styles.striped : undefined)}
        data-color={color}
        style={{ width: `${pct}%` }}
      >
        {size !== "sm" && <span className={styles.label}>{pct}%</span>}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------
 * ProgressMultiple
 * ----------------------------------------------------------------- */
export function ProgressMultiple({
  segments,
  striped = false,
  size = "default",
  className,
  ...rest
}: ProgressMultipleProps) {
  const total = segments.reduce(
    (sum, seg) => sum + Math.max(0, seg.value),
    0,
  );

  return (
    <div
      {...rest}
      className={joinCls(styles.track, styles.multiple, className)}
      data-size={size !== "default" ? size : undefined}
      role="progressbar"
      aria-valuemin={0}
      aria-valuemax={100}
    >
      {segments.map((seg, i) => {
        const color =
          seg.color ?? COLOR_SEQUENCE[i % COLOR_SEQUENCE.length];
        const pct = total > 0 ? (Math.max(0, seg.value) / total) * 100 : 0;
        return (
          <div
            key={i}
            className={joinCls(
              styles.bar,
              striped ? styles.striped : undefined,
            )}
            data-color={color}
            style={{ width: `${pct}%` }}
          />
        );
      })}
    </div>
  );
}
