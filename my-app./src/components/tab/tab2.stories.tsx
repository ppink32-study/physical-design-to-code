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

import { Tab2, Tab2List, type Tab2State, type Tab2Type } from "./tab2";

/* ----------------------------------------------------------------- */

const meta: Meta<typeof Tab2> = {
  title: "Components/Tab/Tab2",
  component: Tab2,
  parameters: {
    layout: "centered",
    nextjs: { appDirectory: true },
    docs: { disable: true },
  },
  argTypes: {
    tabType: { control: "inline-radio", options: ["text", "icon"] },
    state: {
      control: "inline-radio",
      options: ["default", "hover", "selected", "disabled"],
    },
    children: { control: "text" },
    count: { control: "text" },
    closable: { control: "boolean" },
  },
};
export default meta;
type Story = StoryObj<typeof Tab2>;

/* -----------------------------------------------------------------
 *  Playground
 * ----------------------------------------------------------------- */
export const Playground: Story = {
  args: {
    tabType: "text",
    state: "default",
    children: "Tab",
    count: "5",
    closable: true,
  },
};

/* -----------------------------------------------------------------
 *  Matrix
 * ----------------------------------------------------------------- */
const STATES: Tab2State[] = ["default", "hover", "selected", "disabled"];
const TYPES: Tab2Type[] = ["text", "icon"];

export const Matrix: Story = {
  name: "Matrix",
  parameters: { layout: "padded", nextjs: { appDirectory: true } },
  render: () => (
    <StoryDocsMatrixPage
      title="Tab2"
      description="Tabs Level 2 — browser-tab 스타일. State × Type 매트릭스."
      figmaNode="6141-10283"
    >
      <FigmaLinkCard nodeId="6141-10283" caption="Components / Tabs - level 2" />

      {/* State × Type */}
      <section>
        <h3 style={{ margin: "0 0 12px", fontSize: 13, fontWeight: 600, fontFamily: "var(--font-family-korean)", color: "var(--context-foreground-surface-on-surface-base)" }}>
          State × Type
        </h3>
        <table style={{ ...storyMatrixTableBase, fontSize: 12 }}>
          <thead>
            <tr>
              <th style={{ ...storyMatrixColHeaderStyle, width: 80 }} />
              {TYPES.map((t) => (
                <th key={t} style={storyMatrixColHeaderStyle}>{t}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {STATES.map((s) => (
              <tr key={s}>
                <td style={storyMatrixRowHeaderStyle}>{s}</td>
                <td style={{ ...storyMatrixCellStyle, padding: 16 }}>
                  <Tab2 tabType="text" state={s} count="5" closable>Tab</Tab2>
                </td>
                <td style={{ ...storyMatrixCellStyle, padding: 16 }}>
                  <Tab2 tabType="icon" state={s} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {/* Tab2List 조합 */}
      <section style={{ marginTop: 32 }}>
        <h3 style={{ margin: "0 0 12px", fontSize: 13, fontWeight: 600, fontFamily: "var(--font-family-korean)", color: "var(--context-foreground-surface-on-surface-base)" }}>
          Tab2List — 가로 조합 (text × 3 + icon)
        </h3>
        <Tab2List>
          <Tab2 tabType="text" state="selected" count="5" closable>Tab</Tab2>
          <Tab2 tabType="text" state="default" count="2" closable>Tab</Tab2>
          <Tab2 tabType="text" state="default" closable>Tab</Tab2>
          <Tab2 tabType="icon" state="default" />
        </Tab2List>
      </section>

      {/* Leading icon 포함 */}
      <section style={{ marginTop: 32 }}>
        <h3 style={{ margin: "0 0 12px", fontSize: 13, fontWeight: 600, fontFamily: "var(--font-family-korean)", color: "var(--context-foreground-surface-on-surface-base)" }}>
          Leading icon 포함
        </h3>
        <Tab2List>
          <Tab2 tabType="text" state="selected" leadingIcon count="5" closable>Tab</Tab2>
          <Tab2 tabType="text" state="default" leadingIcon count="2" closable>Tab</Tab2>
          <Tab2 tabType="text" state="disabled" leadingIcon closable>Tab</Tab2>
          <Tab2 tabType="icon" state="default" />
        </Tab2List>
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
    <StoryDocsPage
      title="Tab2"
      description="Tabs Level 2 — browser-tab 스타일 탭 컴포넌트."
    >
      <StoryDocsSection title="개요">
        <StoryDocsParagraph>
          탭 항목마다 우측 border로 구분되는 browser-tab 스타일입니다.
          선택된 탭은 어두운 배경(bg-darkgray) + 흰 텍스트로 강조됩니다.
        </StoryDocsParagraph>
      </StoryDocsSection>

      <StoryDocsSection title="Type">
        <StoryDocsParagraph><strong>text</strong> — [LeadingIcon?] [label + count] [닫기?]. h=32, px=12, gap=4.</StoryDocsParagraph>
        <StoryDocsParagraph><strong>icon</strong> — 중앙 아이콘(기본 Add). h=32, px=8.</StoryDocsParagraph>
      </StoryDocsSection>

      <StoryDocsSection title="States">
        <StoryDocsParagraph><strong>default</strong> — bg-surface-base, border-right.</StoryDocsParagraph>
        <StoryDocsParagraph><strong>hover</strong> — bg-surface-base-hover, border-right.</StoryDocsParagraph>
        <StoryDocsParagraph><strong>selected</strong> — bg-darkgray (어두운 bg), 흰 텍스트/아이콘, border-right 없음.</StoryDocsParagraph>
        <StoryDocsParagraph><strong>disabled</strong> — bg-neutral, border-right, 비활성 색상.</StoryDocsParagraph>
      </StoryDocsSection>

      <StoryDocsSection title="Props">
        <StoryDocsParagraph><strong>tabType</strong>: "text" | "icon"</StoryDocsParagraph>
        <StoryDocsParagraph><strong>leadingIcon</strong>: true (Search 아이콘) | ReactNode (커스텀)</StoryDocsParagraph>
        <StoryDocsParagraph><strong>count</strong>: 우측 숫자 카운트 (SemiBold)</StoryDocsParagraph>
        <StoryDocsParagraph><strong>closable</strong>: 닫기 버튼 표시. onClose 콜백 연동.</StoryDocsParagraph>
        <StoryDocsParagraph><strong>icon</strong>: type=icon 일 때 중앙 아이콘 (기본 Add)</StoryDocsParagraph>
      </StoryDocsSection>

      <StoryDocsSection title="Tab2List">
        <StoryDocsParagraph>
          Tab2List로 탭을 감싸면 gap 없이 수평 나열됩니다. 각 탭의 border-right가 구분선 역할을 합니다.
        </StoryDocsParagraph>
      </StoryDocsSection>
    </StoryDocsPage>
  ),
};
