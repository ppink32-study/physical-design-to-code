"use client";

/**
 * PageGnb — Layout Example 공용 GNB
 * Figma node 52:86004 (Brand / Dark)
 *
 * 기존 컴포넌트만 조합:
 *   - <Gnb>, <GnbItem>, <GnbIconButton> (components/nav/gnb)
 *   - <SearchToggleGroup>, <SearchToggleItem> (components/button/search-toggle-item)
 *
 * theme prop 으로 Standard(brand 다크) ↔ Focus(light) 전환.
 */

import { useState } from "react";

import { Gnb, GnbItem, GnbIconButton } from "@/components/nav/gnb";
import { SearchToggleGroup } from "@/components/button/search-toggle-item/search-toggle-group";
import { SearchToggleItem } from "@/components/button/search-toggle-item/search-toggle-item";

export type PageGnbTheme = "standard" | "focus";

export type PageGnbProps = {
  /** 선택된 메뉴 키. 미지정 시 selected 없음 */
  active?: "home" | "project" | "library";
  /** 초기 테마. 미지정 시 "standard" (brand 다크) */
  defaultTheme?: PageGnbTheme;
  /** controlled 테마. 지정 시 onThemeChange 와 함께 사용 */
  theme?: PageGnbTheme;
  onThemeChange?: (next: PageGnbTheme) => void;
};

export function PageGnb({
  active,
  defaultTheme = "standard",
  theme: themeProp,
  onThemeChange,
}: PageGnbProps) {
  const [themeState, setThemeState] = useState<PageGnbTheme>(defaultTheme);
  const theme = themeProp ?? themeState;
  const isStandard = theme === "standard";

  const setTheme = (next: PageGnbTheme) => {
    if (themeProp === undefined) setThemeState(next);
    onThemeChange?.(next);
  };

  return (
    <Gnb
      theme={isStandard ? "brand" : "light"}
      brand={
        <img
          src={isStandard ? "/Logo_dark.svg" : "/Logo_light.svg"}
          alt="PhysicalWorks Forge"
          height={22}
          style={{ display: "block" }}
        />
      }
      items={
        <>
          <GnbItem href="/" selected={active === "home"}>
            Home
          </GnbItem>
          <GnbItem href="/project" selected={active === "project"}>
            Project
          </GnbItem>
          <GnbItem href="/library" selected={active === "library"}>
            Library
          </GnbItem>
        </>
      }
      actions={
        <>
          <GnbIconButton
            aria-label="알림"
            iconUrl="/icon/Noti.svg"
            alarm
          />
          <GnbIconButton aria-label="프로필" iconUrl="/icon/User.svg" />
          <GnbIconButton aria-label="연결" iconUrl="/icon/Connection.svg" />
          <GnbIconButton aria-label="설정" iconUrl="/icon/Gear.svg" />
          <SearchToggleGroup aria-label="테마 선택">
            <SearchToggleItem
              selected={isStandard}
              onClick={() => setTheme("standard")}
            >
              Standard
            </SearchToggleItem>
            <SearchToggleItem
              selected={!isStandard}
              onClick={() => setTheme("focus")}
            >
              Focus
            </SearchToggleItem>
          </SearchToggleGroup>
        </>
      }
    />
  );
}

export default PageGnb;
