import type { Meta, StoryObj } from "@storybook/nextjs-vite";

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

import {
  InteractiveLnb,
  Lnb,
  LnbItem,
  LnbLeafItem,
  LnbProjectSelect,
  LnbSubItem,
  LnbUserProfile,
  type LnbMenuNode,
  type LnbTheme,
} from "./lnb";

/* ----------------------------------------------------------------- */

const meta: Meta<typeof Lnb> = {
  title: "Components/Nav/Lnb",
  component: Lnb,
  parameters: {
    layout: "fullscreen",
    nextjs: { appDirectory: true },
    docs: { disable: true },
  },
  argTypes: {
    theme: { control: "inline-radio", options: ["light", "brand"] },
    header: { table: { disable: true } },
    nav:    { table: { disable: true } },
    footer: { table: { disable: true } },
  },
};
export default meta;
type Story = StoryObj<typeof Lnb>;

/* -----------------------------------------------------------------
 *  공통 Nav 메뉴 콘텐츠
 * ----------------------------------------------------------------- */
function SampleNav({ selectedMenu = "Dashboard" }: { selectedMenu?: string }) {
  return (
    <>
      <LnbItem
        iconUrl="/icon/Home.svg"
        label="Dashboard"
        state={selectedMenu === "Dashboard" ? "selected" : "normal"}
      />
      <LnbItem iconUrl="/icon/Home.svg" label="Dashboard" />
      <LnbItem iconUrl="/icon/Home.svg" label="Dashboard" />

      <LnbItem iconUrl="/icon/Home.svg" label="Workspace" state="expanded" />
      <LnbSubItem label="Dashboard" state="expanded" />
      <LnbLeafItem label="Menu Name" />
      <LnbLeafItem label="Menu Name" state="selected" />
      <LnbLeafItem label="Menu Name" />
      <LnbSubItem label="Dashboard" />

      <LnbItem iconUrl="/icon/Home.svg" label="Settings" chevron={false} />
    </>
  );
}

/* -----------------------------------------------------------------
 *  Playground — light / brand 모두 인터랙티브하게 작동
 *  ── 컨트롤 패널의 theme 라디오로 테마 전환
 *  ── 클릭으로 expand/collapse + select 자동 처리
 *  ── Brand 테마에서 좌측 mint slider indicator 표시 (1depth 전용)
 * ----------------------------------------------------------------- */
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

export const Playground: Story = {
  args: { theme: "brand" },
  render: ({ theme = "brand" }) => (
    <div style={{ display: "flex", height: "100vh" }}>
      <InteractiveLnb
        theme={theme}
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
    </div>
  ),
};

/* -----------------------------------------------------------------
 *  Matrix — 전체 LNB
 * ----------------------------------------------------------------- */
const THEMES: { label: string; theme: LnbTheme }[] = [
  { label: "Brand", theme: "brand" },
  { label: "Light", theme: "light" },
];

/* Matrix 상단 — InteractiveLnb 로 클릭 동작(expand/collapse + select) 확인 가능.
 * theme 별로 별도 인스턴스 → 각 LNB 가 독립적인 상태를 가짐.
 */
function LnbFull({ theme }: { theme: LnbTheme }) {
  return (
    <div style={{ height: 820, display: "flex" }}>
      <InteractiveLnb
        theme={theme}
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
    </div>
  );
}

export const Matrix: Story = {
  name: "Matrix",
  parameters: {
    layout: "padded",
    nextjs: { appDirectory: true },
  },
  render: (_args, ctx) => {
    const locale = ctx.globals && ctx.globals.locale === "en" ? "en" : "ko";
    return (
    <StoryDocsMatrixPage
      title="LNB"
      description={locale === "en"
        ? "Matrix of the full LNB and Items for both Light and Brand themes."
        : "Light·Brand 두 테마의 LNB 전체 및 Item 매트릭스입니다."}
      figmaNode="17947-9157"
    >
      <FigmaLinkCard
        nodeId="17947-9157"
        caption="Components / LNB — Brand·Light 매트릭스 원본"
      />

      {/* 전체 LNB */}
      <section>
        <h3 style={{ margin: "0 0 12px", fontSize: 13, fontWeight: 600, fontFamily: "var(--font-family-korean)", color: "var(--context-foreground-surface-on-surface-base)" }}>
          LNB
        </h3>
        <div style={{ display: "flex", gap: 24, alignItems: "flex-start" }}>
          {THEMES.map(({ label, theme }) => (
            <div key={theme}>
              <p style={{ margin: "0 0 8px", fontSize: 12, fontWeight: 600, color: "var(--context-foreground-surface-on-surface-hint)", fontFamily: "var(--font-family-korean)", textTransform: "uppercase", letterSpacing: "0.06em" }}>
                {label}
              </p>
              <LnbFull theme={theme} />
            </div>
          ))}
        </div>
      </section>

      {/* LNB / Item 1depth */}
      <section>
        <h3 style={{ margin: "0 0 12px", fontSize: 13, fontWeight: 600, fontFamily: "var(--font-family-korean)", color: "var(--context-foreground-surface-on-surface-base)" }}>
          LNB / Item / 1depth
        </h3>
        <table style={{ ...storyMatrixTableBase, fontSize: 12 }}>
          <thead>
            <tr>
              <th style={{ ...storyMatrixColHeaderStyle, width: 64 }} />
              {(["Normal", "Hover", "Expanded", "Selected", "Disabled"] as const).map((s) => (
                <th key={s} style={storyMatrixColHeaderStyle}>{s}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {THEMES.map(({ label, theme }) => (
              <tr key={theme}>
                <td style={storyMatrixRowHeaderStyle}>{label}</td>
                {(["Normal", "Hover", "Expanded", "Selected", "Disabled"] as const).map((s) => (
                  <td key={s} style={{ ...storyMatrixCellStyle, padding: 8 }}>
                    <div data-theme={theme} style={{ background: theme === "brand" ? "#141518" : "#ffffff", padding: 8, borderRadius: 4 }}>
                      <ul style={{ margin: 0, padding: 0, listStyle: "none", width: 228 }}>
                        <LnbItem
                          iconUrl="/icon/Home.svg"
                          label="Menu Item"
                          state={s === "Normal" ? "normal" : s === "Expanded" ? "expanded" : s === "Selected" ? "selected" : s === "Disabled" ? "disabled" : "normal"}
                          forceHover={s === "Hover"}
                        />
                      </ul>
                    </div>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {/* LNB / Item 2depth */}
      <section>
        <h3 style={{ margin: "0 0 12px", fontSize: 13, fontWeight: 600, fontFamily: "var(--font-family-korean)", color: "var(--context-foreground-surface-on-surface-base)" }}>
          LNB / Item / 2depth
        </h3>
        <table style={{ ...storyMatrixTableBase, fontSize: 12 }}>
          <thead>
            <tr>
              <th style={{ ...storyMatrixColHeaderStyle, width: 64 }} />
              {(["Normal", "Hover", "Expanded", "Selected", "Disabled"] as const).map((s) => (
                <th key={s} style={storyMatrixColHeaderStyle}>{s}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {THEMES.map(({ label, theme }) => (
              <tr key={theme}>
                <td style={storyMatrixRowHeaderStyle}>{label}</td>
                {(["Normal", "Hover", "Expanded", "Selected", "Disabled"] as const).map((s) => (
                  <td key={s} style={{ ...storyMatrixCellStyle, padding: 8 }}>
                    <div data-theme={theme} style={{ background: theme === "brand" ? "#141518" : "#ffffff", padding: 8, borderRadius: 4 }}>
                      <ul style={{ margin: 0, padding: 0, listStyle: "none", width: 228 }}>
                        <LnbSubItem
                          label="Menu Item"
                          state={s === "Normal" ? "normal" : s === "Expanded" ? "expanded" : s === "Selected" ? "selected" : s === "Disabled" ? "disabled" : "normal"}
                          forceHover={s === "Hover"}
                        />
                      </ul>
                    </div>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {/* LNB / Item 3depth */}
      <section>
        <h3 style={{ margin: "0 0 12px", fontSize: 13, fontWeight: 600, fontFamily: "var(--font-family-korean)", color: "var(--context-foreground-surface-on-surface-base)" }}>
          LNB / Item / 3depth
        </h3>
        <table style={{ ...storyMatrixTableBase, fontSize: 12 }}>
          <thead>
            <tr>
              <th style={{ ...storyMatrixColHeaderStyle, width: 64 }} />
              {(["Normal", "Hover", "Selected", "Disabled"] as const).map((s) => (
                <th key={s} style={storyMatrixColHeaderStyle}>{s}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {THEMES.map(({ label, theme }) => (
              <tr key={theme}>
                <td style={storyMatrixRowHeaderStyle}>{label}</td>
                {(["Normal", "Hover", "Selected", "Disabled"] as const).map((s) => (
                  <td key={s} style={{ ...storyMatrixCellStyle, padding: 8 }}>
                    <div data-theme={theme} style={{ background: theme === "brand" ? "#141518" : "#ffffff", padding: 8, borderRadius: 4 }}>
                      <ul style={{ margin: 0, padding: 0, listStyle: "none", width: 228 }}>
                        <LnbLeafItem
                          label="Menu Name"
                          state={s === "Normal" ? "normal" : s === "Selected" ? "selected" : s === "Disabled" ? "disabled" : "normal"}
                          forceHover={s === "Hover"}
                        />
                      </ul>
                    </div>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </StoryDocsMatrixPage>
    );
  },
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
    <StoryDocsPage title="LNB" description="레프트 내비게이션 바 컴포넌트 가이드입니다.">
      <StoryDocsSection title="개요">
        <StoryDocsParagraph>
          260px 고정폭 사이드바입니다. theme prop("light" | "brand")으로 컴포넌트 루트에
          data-theme을 직접 적용해 토큰을 전환합니다.
          header(프로젝트 셀렉터) · nav(LnbItem 목록) · footer(사용자 프로필) 슬롯으로 구성됩니다.
        </StoryDocsParagraph>
      </StoryDocsSection>

      <StoryDocsSection title="테마">
        <StoryDocsParagraph>
          <strong>Light</strong> — data-theme="light". 흰 배경 기반의 일반 화면.
        </StoryDocsParagraph>
        <StoryDocsParagraph>
          <strong>Brand</strong> — data-theme="brand". 다크 배경 (#141518). 1depth Selected는
          그라데이션 + 테두리가 적용됩니다.
        </StoryDocsParagraph>
      </StoryDocsSection>

      <StoryDocsSection title="컴포넌트">
        <StoryDocsParagraph>
          <strong>LnbItem</strong>: 아이콘 + 텍스트의 1depth 아이템. icon/iconUrl · label · state · chevron props.
        </StoryDocsParagraph>
        <StoryDocsParagraph>
          <strong>LnbSubItem</strong>: 2depth 텍스트 아이템. chevron 방향은 expanded 상태에 따라 자동 전환.
        </StoryDocsParagraph>
        <StoryDocsParagraph>
          <strong>LnbLeafItem</strong>: 3depth 아이템. 왼쪽 세로선으로 계층 구조를 표시합니다. Selected 시 배경 강조.
        </StoryDocsParagraph>
        <StoryDocsParagraph>
          <strong>LnbProjectSelect</strong>: 상단 프로젝트 셀렉터 (pill 형태, mint border).
        </StoryDocsParagraph>
        <StoryDocsParagraph>
          <strong>LnbUserProfile</strong>: 하단 유저 프로필 + Edit Profile 버튼.
        </StoryDocsParagraph>
      </StoryDocsSection>
    </StoryDocsPage>
  ),
};
