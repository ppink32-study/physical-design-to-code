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

import { Num, type NumMode, type NumState } from "./num";

const meta: Meta<typeof Num> = {
  title: "Components/Step/Num",
  component: Num,
  parameters: {
    layout: "centered",
    nextjs: { appDirectory: true },
    docs: { disable: true },
  },
  argTypes: {
    state: { control: "inline-radio", options: ["finish", "current", "next"] },
    mode: { control: "inline-radio", options: ["light", "dark"] },
    number: { control: "text" },
  },
};
export default meta;
type Story = StoryObj<typeof Num>;

/* -----------------------------------------------------------------
 *  Playground
 * ----------------------------------------------------------------- */
export const Playground: Story = {
  args: { number: 1, state: "finish", mode: "light" },
};

/* -----------------------------------------------------------------
 *  Matrix
 * ----------------------------------------------------------------- */
const STATES: NumState[] = ["finish", "current", "next"];
const MODES: { label: string; mode: NumMode; bg: string }[] = [
  { label: "Light", mode: "light", bg: "#FFFFFF" },
  { label: "Dark",  mode: "dark",  bg: "#1F2025" },
];

export const Matrix: Story = {
  name: "Matrix",
  parameters: {
    layout: "padded",
    nextjs: { appDirectory: true },
  },
  render: () => (
    <StoryDocsMatrixPage
      title="Num"
      description="Step 번호 배지. mode(light·dark) × state(finish·current·next) 6 variants."
      figmaNode="18374-238"
    >
      <FigmaLinkCard nodeId="18374-238" caption="Components / Step / Num" />

      <section>
        <h3 style={{ margin: "0 0 12px", fontSize: 13, fontWeight: 600, fontFamily: "var(--font-family-korean)", color: "var(--context-foreground-surface-on-surface-base)" }}>
          State × Mode
        </h3>
        <table style={{ ...storyMatrixTableBase, fontSize: 12 }}>
          <thead>
            <tr>
              <th style={{ ...storyMatrixColHeaderStyle, width: 64 }} />
              {STATES.map((s) => (
                <th key={s} style={storyMatrixColHeaderStyle}>{s}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {MODES.map(({ label, mode, bg }) => (
              <tr key={mode}>
                <td style={storyMatrixRowHeaderStyle}>{label}</td>
                {STATES.map((s, i) => (
                  <td key={s} style={{ ...storyMatrixCellStyle, padding: 16, background: bg }}>
                    <Num number={i + 1} state={s} mode={mode} />
                  </td>
                ))}
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
    <StoryDocsPage title="Num" description="Step 번호 배지 (24×24).">
      <StoryDocsSection title="개요">
        <StoryDocsParagraph>
          Step 진행 표시에 사용되는 24×24 원형 번호 배지. mode 와 state 두 prop 으로
          현재 단계의 시각 상태를 표현합니다.
        </StoryDocsParagraph>
      </StoryDocsSection>

      <StoryDocsSection title="States">
        <StoryDocsParagraph>
          <strong>finish</strong> — 완료된 단계. 외곽선 + mint 텍스트.
        </StoryDocsParagraph>
        <StoryDocsParagraph>
          <strong>current</strong> — 현재 단계. solid mint 배경 + 흰/dark 텍스트.
        </StoryDocsParagraph>
        <StoryDocsParagraph>
          <strong>next</strong> — 다가올 단계. 회색 배경 + 흐린 텍스트.
        </StoryDocsParagraph>
      </StoryDocsSection>
    </StoryDocsPage>
  ),
};
