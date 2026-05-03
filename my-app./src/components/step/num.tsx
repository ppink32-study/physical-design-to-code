"use client";

/**
 * Num — Figma node 18374:238
 * 24×24 원형 step 번호 배지.
 *
 * states (3) : finish · current · next
 * modes  (2) : light · dark
 *
 * mode 는 컴포넌트에 명시적으로 부여되며, 내부적으로 data-theme 을 같이 셋업해
 * 모든 --context-* 토큰이 해당 mode 값으로 자동 resolve 되도록 한다.
 *
 *   light = data-theme="light"
 *   dark  = data-theme="brand"   (브랜드 다크 토큰 세트)
 */

import styles from "./num.module.css";

export type NumState = "finish" | "current" | "next";
export type NumMode = "light" | "dark";

export type NumProps = {
  /** 표시할 번호 (또는 임의 텍스트) */
  number: number | string;
  state?: NumState;
  mode?: NumMode;
  className?: string;
};

export function Num({
  number,
  state = "finish",
  mode = "light",
  className,
}: NumProps) {
  return (
    <div
      className={[styles.root, className].filter(Boolean).join(" ")}
      data-state={state}
      data-theme={mode === "dark" ? "brand" : "light"}
    >
      <div className={styles.anchor}>
        <span className={styles.label}>{number}</span>
      </div>
    </div>
  );
}

export default Num;
