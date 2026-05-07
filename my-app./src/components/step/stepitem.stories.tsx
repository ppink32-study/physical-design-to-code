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

import { StepItem, type StepItemProps } from "./stepitem";
import type { NumState, NumMode } from "./num";

const meta: Meta<typeof StepItem> = {
  title: "Components/Step/StepItem",
  component: StepItem,
  parameters: {
    layout: "centered",
    nextjs: { appDirectory: true },
    docs: { disable: true },
  },
  argTypes: {
    numState: {
      control: "inline-radio",
      options: ["finish", "current", "next", "complete", "error", "success", "stop"],
    },
    mode: { control: "inline-radio", options: ["light", "brand"] },
    hasLine: { control: "boolean" },
    number: { control: "text" },
  },
};
export default meta;
type Story = StoryObj<typeof StepItem>;

/* -----------------------------------------------------------------
 *  Playground
 * ----------------------------------------------------------------- */
export const Playground: Story = {
  args: { number: 1, numState: "current", mode: "light", hasLine: true },
};

/* -----------------------------------------------------------------
 *  Matrix
 * ----------------------------------------------------------------- */
const NUM_STATES: NumState[] = ["finish", "current", "next"];
const ICON_STATES: NumState[] = ["complete", "error", "success", "stop"];
const MODES: { label: string; mode: NumMode; bg: string }[] = [
  { label: "Light", mode: "light", bg: "#F4F7F7" },
  { label: "Brand", mode: "brand", bg: "#1F2025" },
];

export const Matrix: Story = {
  name: "Matrix",
  parameters: {
    layout: "padded",
    nextjs: { appDirectory: true },
  },
  render: () => (
    <StoryDocsMatrixPage
      title="StepItem"
      description="세로 step 아이템. Num 배지 + 하단 연결선(line O·X) × mode(light·dark) 조합."
      figmaNode="18505-14797"
    >
      <FigmaLinkCard nodeId="18505-14797" caption="Components / Step / StepItem" />

      {/* Number states */}
      <section>
        <h3 style={{ margin: "0 0 12px", fontSize: 13, fontWeight: 600, fontFamily: "var(--font-family-korean)", color: "var(--context-foreground-surface-on-surface-base)" }}>
          Number State × Line × Mode
        </h3>
        <table style={{ ...storyMatrixTableBase, fontSize: 12 }}>
          <thead>
            <tr>
              <th style={{ ...storyMatrixColHeaderStyle, width: 64 }} />
              {NUM_STATES.map((s) => (
                <>
                  <th key={`${s}-lineO`} style={storyMatrixColHeaderStyle}>{s} / line O</th>
                  <th key={`${s}-lineX`} style={storyMatrixColHeaderStyle}>{s} / line X</th>
                </>
              ))}
            </tr>
          </thead>
          <tbody>
            {MODES.map(({ label, mode, bg }) => (
              <tr key={mode}>
                <td style={storyMatrixRowHeaderStyle}>{label}</td>
                {NUM_STATES.map((s, i) => (
                  <>
                    <td key={`${s}-lineO`} style={{ ...storyMatrixCellStyle, padding: 16, background: bg }}>
                      <StepItem number={i + 1} numState={s} mode={mode} hasLine />
                    </td>
                    <td key={`${s}-lineX`} style={{ ...storyMatrixCellStyle, padding: 16, background: bg }}>
                      <StepItem number={i + 1} numState={s} mode={mode} hasLine={false} />
                    </td>
                  </>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {/* Icon states */}
      <section style={{ marginTop: 24 }}>
        <h3 style={{ margin: "0 0 12px", fontSize: 13, fontWeight: 600, fontFamily: "var(--font-family-korean)", color: "var(--context-foreground-surface-on-surface-base)" }}>
          Icon State × Line (Light only)
        </h3>
        <table style={{ ...storyMatrixTableBase, fontSize: 12 }}>
          <thead>
            <tr>
              {ICON_STATES.map((s) => (
                <>
                  <th key={`${s}-lineO`} style={storyMatrixColHeaderStyle}>{s} / line O</th>
                  <th key={`${s}-lineX`} style={storyMatrixColHeaderStyle}>{s} / line X</th>
                </>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr>
              {ICON_STATES.map((s) => (
                <>
                  <td key={`${s}-lineO`} style={{ ...storyMatrixCellStyle, padding: 16, background: "#F4F7F7" }}>
                    <StepItem numState={s} hasLine />
                  </td>
                  <td key={`${s}-lineX`} style={{ ...storyMatrixCellStyle, padding: 16, background: "#F4F7F7" }}>
                    <StepItem numState={s} hasLine={false} />
                  </td>
                </>
              ))}
            </tr>
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
    <StoryDocsPage
      title="StepItem"
      description="세로 배치 step 아이템. Num 배지와 하단 연결선으로 구성됩니다."
    >
      <StoryDocsSection title="개요">
        <StoryDocsParagraph>
          세로(vertical) step 목록에서 각 단계를 표현하는 단위 컴포넌트.
          내부적으로 <code>Num</code> 컴포넌트를 사용하며, 모든 Num 상태를 지원합니다.
        </StoryDocsParagraph>
      </StoryDocsSection>

      <StoryDocsSection title="Props">
        <StoryDocsParagraph>
          <strong>numState</strong> — Num의 시각 상태.
          number states(finish·current·next)와 icon states(complete·error·success·stop) 지원.
        </StoryDocsParagraph>
        <StoryDocsParagraph>
          <strong>hasLine</strong> — true(line O): 하단 연결선 표시 (중간 항목).
          false(line X): 연결선 없음 (마지막 항목).
        </StoryDocsParagraph>
        <StoryDocsParagraph>
          <strong>number</strong> — Num에 표시할 번호. icon states에서는 불필요.
        </StoryDocsParagraph>
        <StoryDocsParagraph>
          <strong>mode</strong> — light(기본) / dark. Num의 mode와 동일하게 전달됩니다.
        </StoryDocsParagraph>
      </StoryDocsSection>
    </StoryDocsPage>
  ),
};
