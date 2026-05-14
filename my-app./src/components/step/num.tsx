"use client";

/**
 * Num — Figma node 18374:238
 * ----------------------------------------------------------------
 * 24×24 원형 인디케이터. Stepper / StepItem / StepCard 내부에서 사용.
 *
 * variant 별 표시
 *   - stop / complete / error / success : icon (preset svg)
 *   - next / current-light / current-brand : step 숫자 (1, 2 …)
 */

import type { CSSProperties, HTMLAttributes } from "react";
import { forwardRef } from "react";

import styles from "./num.module.css";

export type NumVariant =
  | "stop"
  | "complete"
  | "error"
  | "success"
  | "next"
  | "current-light"
  | "current-brand";

const VARIANT_CLASS: Record<NumVariant, string> = {
  stop: styles.variantStop,
  complete: styles.variantComplete,
  error: styles.variantError,
  success: styles.variantSuccess,
  next: styles.variantNext,
  "current-light": styles.variantCurrentLight,
  "current-brand": styles.variantCurrentBrand,
};

const ICON_PRESETS: Partial<Record<NumVariant, string>> = {
  stop: "/icon/Stock.svg",
  complete: "/icon/Check.svg",
  error: "/icon/Alert.svg",
  success: "/icon/CheckCircle.svg",
};

const TEXT_VARIANTS: ReadonlySet<NumVariant> = new Set([
  "next",
  "current-light",
  "current-brand",
]);

type NativeDivProps = Omit<HTMLAttributes<HTMLDivElement>, "children">;

export type NumProps = NativeDivProps & {
  variant?: NumVariant;
  /** text variants(next / current-*) 에서 표시할 스텝 숫자 */
  step?: number | string;
};

function NumInner(props: NumProps, ref: React.ForwardedRef<HTMLDivElement>) {
  const { variant = "success", step = 1, className, ...rest } = props;

  const rootClass = [styles.root, VARIANT_CLASS[variant], className]
    .filter(Boolean)
    .join(" ");

  const presetIcon = ICON_PRESETS[variant];
  const isTextVariant = TEXT_VARIANTS.has(variant);

  return (
    <div
      {...rest}
      ref={ref}
      className={rootClass}
      data-variant={variant}
      aria-hidden={!isTextVariant ? "true" : undefined}
    >
      {presetIcon ? (
        <span
          aria-hidden="true"
          className={styles.icon}
          style={
            {
              WebkitMaskImage: `url(${presetIcon})`,
              maskImage: `url(${presetIcon})`,
            } as CSSProperties
          }
        />
      ) : null}
      {isTextVariant ? <span className={styles.label}>{step}</span> : null}
    </div>
  );
}

export const Num = forwardRef<HTMLDivElement, NumProps>(NumInner);
Num.displayName = "Num";

export default Num;
