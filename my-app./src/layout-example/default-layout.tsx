"use client";

/**
 * DefaultLayoutPage — Layout Example / Default
 * Figma node 62:77706
 *
 * 구조: GNB(상단) + LNB(좌측) + 빈 콘텐츠 영역
 *   - GNB / LNB 만 있는 가장 단순한 페이지
 *   - Standard ↔ Focus 토글: PageGnb 의 SearchToggle 로 전환
 *     · Standard: GNB brand / LNB brand / Dashboard.png 배경
 *     · Focus   : GNB light / LNB light / bg-backboard 배경
 *
 * 모든 컴포넌트는 기존 components/* 만 사용.
 */

import { useState } from "react";
import type { CSSProperties, ReactNode } from "react";

import {
  InteractiveLnb,
  LnbProjectSelect,
  LnbUserProfile,
  type LnbMenuNode,
} from "@/components/nav/lnb";

import { PageGnb, type PageGnbTheme } from "./page-gnb";
import styles from "./default-layout.module.css";

const SAMPLE_MENU: LnbMenuNode[] = [
  { id: "dashboard", label: "Dashboard", iconUrl: "/icon/Home.svg" },
  { id: "dashboard-2", label: "Dashboard", iconUrl: "/icon/Home.svg" },
  { id: "dashboard-3", label: "Dashboard", iconUrl: "/icon/Home.svg" },
  {
    id: "workspace",
    label: "Workspace",
    iconUrl: "/icon/Home.svg",
    children: [
      {
        id: "ws-dashboard",
        label: "Dashboard",
        children: [
          { id: "ws-menu-1", label: "Menu Name" },
          { id: "ws-menu-2", label: "Menu Name" },
          { id: "ws-menu-3", label: "Menu Name" },
        ],
      },
      { id: "ws-dashboard-2", label: "Dashboard" },
    ],
  },
  { id: "settings", label: "Settings", iconUrl: "/icon/Home.svg" },
];

export type DefaultLayoutPageProps = {
  /** GNB 슬롯 (미지정 시 기본 PageGnb) */
  gnb?: ReactNode;
  /** LNB 슬롯 (미지정 시 기본 InteractiveLnb + 샘플 메뉴) */
  lnb?: ReactNode;
  /** controlled theme (미지정 시 내부 state) */
  theme?: PageGnbTheme;
  onThemeChange?: (next: PageGnbTheme) => void;
  className?: string;
  style?: CSSProperties;
};

export function DefaultLayoutPage({
  gnb,
  lnb,
  theme: themeProp,
  onThemeChange,
  className,
  style,
}: DefaultLayoutPageProps) {
  const rootClass = [styles.root, className].filter(Boolean).join(" ");

  /* ---- Theme (Standard / Focus) — GNB·LNB·background 동기화 ---- */
  const [themeState, setThemeState] = useState<PageGnbTheme>("standard");
  const theme = themeProp ?? themeState;
  const setTheme = (next: PageGnbTheme) => {
    if (themeProp === undefined) setThemeState(next);
    onThemeChange?.(next);
  };

  return (
    <div className={rootClass} style={style} data-theme={theme}>
      {/* GNB — top 56px */}
      {gnb ?? <PageGnb active="home" theme={theme} onThemeChange={setTheme} />}

      {/* Body — LNB + empty content area */}
      <div className={styles.body}>
        {lnb ?? (
          <InteractiveLnb
            theme={theme === "standard" ? "brand" : "light"}
            menu={SAMPLE_MENU}
            defaultSelectedId="dashboard"
            defaultExpandedIds={["workspace", "ws-dashboard"]}
            header={
              <LnbProjectSelect
                label="Project Number 01"
                iconUrl="/icon/Flag Filled.svg"
              />
            }
            footer={<LnbUserProfile />}
          />
        )}
        <main className={styles.contentArea} />
      </div>
    </div>
  );
}

export default DefaultLayoutPage;
