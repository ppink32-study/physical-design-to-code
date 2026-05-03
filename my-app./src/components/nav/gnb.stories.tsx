import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { useState } from "react";
import type { CSSProperties } from "react";

import { FigmaLinkCard } from "@/stories/figma-link-card";
import {
  storyMatrixCellStyle,
  storyMatrixColHeaderStyle,
  storyMatrixRowHeaderStyle,
  storyMatrixTableBase,
} from "@/stories/story-matrix-table-styles";
import {
  StoryDocsMatrixPage,
  StoryDocsPage,
  StoryDocsParagraph,
  StoryDocsSection,
} from "@/stories/story-docs-shell";

import { SearchToggleItem } from "@/components/button/search-toggle-item/search-toggle-item";

import {
  Gnb,
  GnbIconButton,
  GnbItem,
  type GnbTheme,
} from "./gnb";

/* ----------------------------------------------------------------- */

const meta: Meta<typeof Gnb> = {
  title: "Components/Nav/Gnb",
  component: Gnb,
  parameters: {
    layout: "fullscreen",
    nextjs: { appDirectory: true },
    docs: { disable: true },
  },
  argTypes: {
    theme: { control: "inline-radio", options: ["light", "brand"] },
    brand:   { table: { disable: true } },
    items:   { table: { disable: true } },
    actions: { table: { disable: true } },
  },
};
export default meta;
type Story = StoryObj<typeof Gnb>;

/* -----------------------------------------------------------------
 *  샘플 콘텐츠
 * ----------------------------------------------------------------- */
function Logo({ theme }: { theme: GnbTheme }) {
  return (
    <img
      src={theme === "brand" ? "/Logo_dark.svg" : "/Logo_light.svg"}
      alt="Brand"
      width={184}
      height={32}
      style={{ display: "block" }}
    />
  );
}

/* 정적 매트릭스용 — selectedIndex prop 으로 강제 지정 */
function NavItems({ selectedIndex = 0 }: { selectedIndex?: number }) {
  const labels = ["Home", "Menu 1", "Menu 1", "Menu 1"];
  return (
    <>
      {labels.map((label, i) => (
        <GnbItem key={i} selected={i === selectedIndex}>
          {label}
        </GnbItem>
      ))}
    </>
  );
}

/* 인터랙티브 — Playground 용. 클릭 시 selected 전환 */
function InteractiveNavItems({ defaultSelected = 0 }: { defaultSelected?: number }) {
  const [selected, setSelected] = useState(defaultSelected);
  const labels = ["Home", "Menu 1", "Menu 1", "Menu 1"];
  return (
    <>
      {labels.map((label, i) => (
        <GnbItem
          key={i}
          selected={i === selected}
          onClick={() => setSelected(i)}
        >
          {label}
        </GnbItem>
      ))}
    </>
  );
}

function ActionButtons() {
  return (
    <>
      <GnbIconButton aria-label="알림" iconUrl="/icon/Noti.svg" alarm />
      <GnbIconButton aria-label="사용자" iconUrl="/icon/User.svg" />
      <GnbIconButton aria-label="연결" iconUrl="/icon/Connection.svg" />
      <GnbIconButton aria-label="설정" iconUrl="/icon/Gear.svg" />
      <div
        style={{
          display: "inline-flex",
          borderRadius: 8,
          background: "var(--context-background-surface-bg-surface-secondary)",
          flexShrink: 0,
        }}
      >
        <SearchToggleItem selected>Standard</SearchToggleItem>
        <SearchToggleItem>Focus</SearchToggleItem>
      </div>
    </>
  );
}

/* -----------------------------------------------------------------
 *  Playground
 * ----------------------------------------------------------------- */
export const Playground: Story = {
  args: { theme: "light" },
  render: ({ theme = "light" }) => (
    <div style={{ overflowX: "auto" }}>
      <div style={{ minWidth: 1920 }}>
        <Gnb
          theme={theme}
          brand={<Logo theme={theme} />}
          /* 클릭하면 selected 전환되는 인터랙티브 메뉴 */
          items={<InteractiveNavItems />}
          actions={<ActionButtons />}
        />
      </div>
    </div>
  ),
};

/* -----------------------------------------------------------------
 *  Matrix
 * ----------------------------------------------------------------- */
const THEMES: { label: string; theme: GnbTheme; bg: string }[] = [
  { label: "Light", theme: "light", bg: "#ffffff" },
  { label: "Brand", theme: "brand", bg: "#141518" },
];

const labelStyle: CSSProperties = {
  margin: "0 0 8px",
  fontSize: 12,
  fontWeight: 600,
  color: "var(--context-foreground-surface-on-surface-hint)",
  fontFamily: "var(--font-family-korean)",
  textTransform: "uppercase",
  letterSpacing: "0.06em",
};

/* GNB 전체 바 — Matrix 상단도 클릭으로 selected 전환 가능 */
function GnbRow({ theme, bg }: { theme: GnbTheme; bg: string }) {
  return (
    <div style={{ overflowX: "auto", borderRadius: 4, border: "1px solid var(--border-border-surface-border-surface)" }}>
      <div style={{ minWidth: 1920, background: bg }}>
        <Gnb
          theme={theme}
          brand={<Logo theme={theme} />}
          items={<InteractiveNavItems />}
          actions={<ActionButtons />}
        />
      </div>
    </div>
  );
}

/* GNB / Select 매트릭스 */
const ITEM_COLS = ["Default", "Selected"] as const;
type ItemCol = (typeof ITEM_COLS)[number];

function ItemCell({ theme, bg, col }: { theme: GnbTheme; bg: string; col: ItemCol }) {
  return (
    <td style={{ ...storyMatrixCellStyle, padding: 0, background: bg }}>
      <div
        data-theme={theme}
        style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: 56 }}
      >
        <ul style={{ margin: 0, padding: 0, listStyle: "none", display: "inline-flex" }}>
          <GnbItem selected={col === "Selected"}>Menu 1</GnbItem>
        </ul>
      </div>
    </td>
  );
}

/* GNB / Icon 매트릭스 */
const ICON_COLS = ["Default", "Hovered", "Selected"] as const;
type IconCol = (typeof ICON_COLS)[number];

function IconCell({
  theme,
  bg,
  col,
  alarm,
}: {
  theme: GnbTheme;
  bg: string;
  col: IconCol;
  alarm: boolean;
}) {
  return (
    <td style={{ ...storyMatrixCellStyle, padding: 0, background: bg }}>
      <div
        data-theme={theme}
        style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: 64, padding: "12px 20px" }}
      >
        <GnbIconButton
          aria-label={`${theme} alarm=${String(alarm)} ${col}`}
          iconUrl="/icon/Noti.svg"
          alarm={alarm}
          selected={col === "Selected"}
          forceState={col === "Hovered" ? "hover" : undefined}
        />
      </div>
    </td>
  );
}

export const Matrix: Story = {
  name: "Matrix",
  parameters: {
    layout: "padded",
    nextjs: { appDirectory: true },
  },
  render: () => (
    <StoryDocsMatrixPage
      title="GNB"
      description="Light·Dark 두 테마의 전체 바, GNB/Select, GNB/Icon 매트릭스입니다."
      figmaNode="17945-4068"
    >
      <FigmaLinkCard
        nodeId="17945-4068"
        caption="Components / GNB — Dark·Light 매트릭스 원본"
      />

      {/* 전체 바 */}
      <section>
        <h3 style={{ margin: "0 0 12px", fontSize: 13, fontWeight: 600, fontFamily: "var(--font-family-korean)", color: "var(--context-foreground-surface-on-surface-base)" }}>
          GNB
        </h3>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {THEMES.map(({ label, theme, bg }) => (
            <div key={theme}>
              <p style={labelStyle}>{label}</p>
              <GnbRow theme={theme} bg={bg} />
            </div>
          ))}
        </div>
      </section>

      {/* GNB / Select */}
      <section>
        <h3 style={{ margin: "0 0 12px", fontSize: 13, fontWeight: 600, fontFamily: "var(--font-family-korean)", color: "var(--context-foreground-surface-on-surface-base)" }}>
          GNB / Select
        </h3>
        <table style={{ ...storyMatrixTableBase, fontSize: 12 }}>
          <thead>
            <tr>
              <th style={{ ...storyMatrixColHeaderStyle, width: 64 }} />
              {ITEM_COLS.map((c) => (
                <th key={c} style={storyMatrixColHeaderStyle}>{c}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {THEMES.map(({ label, theme, bg }) => (
              <tr key={theme}>
                <td style={storyMatrixRowHeaderStyle}>{label}</td>
                {ITEM_COLS.map((col) => (
                  <ItemCell key={col} theme={theme} bg={bg} col={col} />
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {/* GNB / Icon */}
      <section>
        <h3 style={{ margin: "0 0 12px", fontSize: 13, fontWeight: 600, fontFamily: "var(--font-family-korean)", color: "var(--context-foreground-surface-on-surface-base)" }}>
          GNB / Icon
        </h3>
        <table style={{ ...storyMatrixTableBase, fontSize: 12 }}>
          <thead>
            <tr>
              <th rowSpan={2} style={{ ...storyMatrixColHeaderStyle, width: 64 }} />
              <th colSpan={3} style={{ ...storyMatrixColHeaderStyle, textAlign: "center" }}>alarm: True</th>
              <th colSpan={3} style={{ ...storyMatrixColHeaderStyle, textAlign: "center" }}>alarm: False</th>
            </tr>
            <tr>
              {[true, false].flatMap((alarm) =>
                ICON_COLS.map((col) => (
                  <th key={`${alarm}-${col}`} style={{ ...storyMatrixColHeaderStyle, fontSize: 11 }}>
                    {col}
                  </th>
                )),
              )}
            </tr>
          </thead>
          <tbody>
            {THEMES.map(({ label, theme, bg }) => (
              <tr key={theme}>
                <td style={storyMatrixRowHeaderStyle}>{label}</td>
                {[true, false].flatMap((alarm) =>
                  ICON_COLS.map((col) => (
                    <IconCell key={`${alarm}-${col}`} theme={theme} bg={bg} col={col} alarm={alarm} />
                  )),
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </StoryDocsMatrixPage>
  ),
};

/* -----------------------------------------------------------------
 *  Guideline
 * ----------------------------------------------------------------- */
export const Guideline: Story = {
  name: "Guideline",
  parameters: {
    layout: "padded",
    nextjs: { appDirectory: true },
    controls: { hideNoControlsWarning: true, disable: true },
    actions: { disable: true },
  },
  render: () => (
    <StoryDocsPage title="GNB" description="글로벌 내비게이션 바 컴포넌트 가이드입니다.">
      <StoryDocsSection title="개요">
        <StoryDocsParagraph>
          56px 높이의 sticky 바입니다. theme prop("light" | "brand")으로 컴포넌트
          루트에 data-theme을 직접 적용해 토큰을 전환합니다.
          brand · items(GnbItem 목록) · actions(GnbIconButton 목록) 슬롯으로 구성됩니다.
        </StoryDocsParagraph>
      </StoryDocsSection>

      <StoryDocsSection title="테마">
        <StoryDocsParagraph>
          이 플랫폼은 두 가지 테마를 사용합니다.
        </StoryDocsParagraph>
        <StoryDocsParagraph>
          <strong>Focus</strong> — data-theme="light". light.css 컬러 토큰만을 사용합니다.
          밝은 배경 기반의 일반 화면에 적용됩니다.
        </StoryDocsParagraph>
        <StoryDocsParagraph>
          <strong>Standard</strong> — data-theme="brand". brand.css 컬러 토큰을 사용합니다.
          dark.css와 동일한 토큰 값을 가지며, 일부 강조 영역에서 brand 테마로 적용됩니다.
          GNB의 theme="brand"가 대표적인 사용 예입니다.
        </StoryDocsParagraph>
      </StoryDocsSection>

      <StoryDocsSection title="Props">
        <StoryDocsParagraph>
          <strong>theme</strong>: "light" | "brand" — 컴포넌트 루트에 data-theme을 직접 적용합니다.
        </StoryDocsParagraph>
        <StoryDocsParagraph>
          <strong>brand</strong>: ReactNode — 좌측 로고/브랜드 슬롯.
        </StoryDocsParagraph>
        <StoryDocsParagraph>
          <strong>items</strong>: ReactNode — 가운데 GnbItem 목록 슬롯.
        </StoryDocsParagraph>
        <StoryDocsParagraph>
          <strong>actions</strong>: ReactNode — 우측 GnbIconButton 및 SearchToggleItem 슬롯.
        </StoryDocsParagraph>
      </StoryDocsSection>
    </StoryDocsPage>
  ),
};
