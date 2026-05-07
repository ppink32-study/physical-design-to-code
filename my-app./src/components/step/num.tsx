"use client";

import styles from "./num.module.css";

export type NumState =
  | "finish"
  | "current"
  | "next"
  | "complete"
  | "error"
  | "success"
  | "stop";
export type NumMode = "light" | "brand";

export type NumProps = {
  /** 표시할 번호 — icon states(complete·error·success·stop)에서는 불필요 */
  number?: number | string;
  state?: NumState;
  mode?: NumMode;
  className?: string;
};

const ICON_URL: Partial<Record<NumState, string>> = {
  complete: "/icon/Check.svg",
  error: "/icon/Alert.svg",
  success: "/icon/CheckCircle.svg",
  stop: "/icon/Stock.svg",
};

export function Num({
  number,
  state = "finish",
  mode = "light",
  className,
}: NumProps) {
  const iconSrc = ICON_URL[state];

  return (
    <div
      className={[styles.root, className].filter(Boolean).join(" ")}
      data-state={state}
      data-theme={mode === "brand" ? "brand" : undefined}
    >
      {iconSrc ? (
        <span
          className={styles.icon}
          style={{
            WebkitMaskImage: `url('${iconSrc}')`,
            maskImage: `url('${iconSrc}')`,
          }}
        />
      ) : (
        <div className={styles.anchor}>
          <span className={styles.label}>{number}</span>
        </div>
      )}
    </div>
  );
}

export default Num;
