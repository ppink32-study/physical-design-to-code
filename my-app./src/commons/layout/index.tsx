"use client";

/**
 * Layout — Figma node 18375:4173 (Workspace shell)
 * ----------------------------------------------------------------
 * 기준 viewport: 1920px
 *
 * 구조 (only flexbox, position-absolute 미사용):
 *   - GNB                : width 100%, height 56px
 *   - Main Area          : 나머지 영역 (backdrop bg, rounded-40)
 *       - Content Area   : width 1440 × 잔여, 양측 240px 마진 (1920 기준)
 *           - Header     : height 68
 *           - Stepper    : height 64
 *           - Body       : 잔여 세로 영역 채움
 *
 * Header / Stepper / Body 모두 1440 컨테이너 안에 수직 스택.
 */

import type { ReactNode } from "react";

import styles from "./styles.module.css";

export type LayoutProps = {
  /** 상단 GNB 슬롯 */
  gnb: ReactNode;
  /** Detail Page Header 영역 슬롯 (페이지 타이틀 등) — 선택. 1440 컨테이너 안 */
  header?: ReactNode;
  /** Stepper 영역 슬롯 — 선택. 1440 컨테이너 안 */
  stepper?: ReactNode;
  /** Main Contents 영역 (children) — 1440 컨테이너 안 */
  children: ReactNode;
};

export function Layout({ gnb, header, stepper, children }: LayoutProps) {
  return (
    <div className={styles.root}>
      <div className={styles.gnbSlot}>{gnb}</div>

      <div className={styles.mainArea}>
        {/* Content Area — 1440 폭 (양측 240px 마진), Header + Stepper + Body 포함 */}
        <div className={styles.contentArea}>
          <div className={styles.contentInner}>
            {header != null && (
              <div className={styles.headerSlot}>{header}</div>
            )}
            {stepper != null && (
              <div className={styles.stepperSlot}>{stepper}</div>
            )}
            <div className={styles.bodySlot}>{children}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Layout;
