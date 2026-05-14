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
  render: (_args, ctx) => {
    const locale = ctx.globals && ctx.globals.locale === "en" ? "en" : "ko";
    return (
    <StoryDocsMatrixPage
      title="Tab2"
      description={locale === "en"
        ? "Tabs Level 2 — browser-tab style. State × Type matrix."
        : "Tabs Level 2 — browser-tab 스타일. State × Type 매트릭스."}
      figmaNode="6141-10283"
    >
      <FigmaLinkCard nodeId="6141-10283" caption="Components / Tabs - level 2" />

      {/* State × Type */}
      <section>
        <h3 style={{ margin: "0 0 12px", fontSize: 13, fontWeight: 600, fontFamily: "var(--font-family-korean)", color: "var(--on-surface-base)" }}>
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
        <h3 style={{ margin: "0 0 12px", fontSize: 13, fontWeight: 600, fontFamily: "var(--font-family-korean)", color: "var(--on-surface-base)" }}>
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
        <h3 style={{ margin: "0 0 12px", fontSize: 13, fontWeight: 600, fontFamily: "var(--font-family-korean)", color: "var(--on-surface-base)" }}>
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
    );
  },
};
