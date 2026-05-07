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

import { Num } from "./num";
import { Step, type StepMode, type StepState } from "./step";

const meta: Meta<typeof Step> = {
  title: "Components/Step/Step",
  component: Step,
  parameters: {
    layout: "centered",
    nextjs: { appDirectory: true },
    docs: { disable: true },
  },
  argTypes: {
    state: { control: "inline-radio", options: ["default", "active"] },
    mode: { control: "inline-radio", options: ["light", "brand"] },
    label: { control: "text" },
  },
};
export default meta;
type Story = StoryObj<typeof Step>;

/* -----------------------------------------------------------------
 *  Playground
 * ----------------------------------------------------------------- */
export const Playground: Story = {
  args: { label: "Configure Parameters", state: "default", mode: "light" },
};

/* -----------------------------------------------------------------
 *  Matrix
 * ----------------------------------------------------------------- */
const STATES: StepState[] = ["default", "active"];
const MODES: { label: string; mode: StepMode; bg: string }[] = [
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
      title="Step"
      description="Step 라벨. mode(light·dark) × state(default·active) 4 variants."
      figmaNode="18374-260"
    >
      <FigmaLinkCard nodeId="18374-260" caption="Components / Step / Step (label)" />

      {/* Step 단독 */}
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
                {STATES.map((s) => (
                  <td key={s} style={{ ...storyMatrixCellStyle, padding: 24, background: bg }}>
                    <Step label="Configure Parameters" state={s} mode={mode} />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {/* Numstep — Num + Step 조합 (Figma node 18374:295) */}
      <section>
        <h3 style={{ margin: "0 0 12px", fontSize: 13, fontWeight: 600, fontFamily: "var(--font-family-korean)", color: "var(--context-foreground-surface-on-surface-base)" }}>
          Numstep — Num + Step 조합 (Figma 18374:295)
        </h3>
        <table style={{ ...storyMatrixTableBase, fontSize: 12 }}>
          <thead>
            <tr>
              <th style={storyMatrixColHeaderStyle}>Light</th>
              <th style={storyMatrixColHeaderStyle}>Dark (Brand)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{ ...storyMatrixCellStyle, padding: 24, background: "#F4F7F7" }}>
                <div style={{ display: "inline-flex", gap: 8, alignItems: "center" }}>
                  <Num number={1} state="finish" mode="light" />
                  <Step label="Configure Parameters" state="default" mode="light" />
                </div>
              </td>
              <td style={{ ...storyMatrixCellStyle, padding: 24, background: "#1F2025" }}>
                <div style={{ display: "inline-flex", gap: 8, alignItems: "center" }}>
                  <Num number={1} state="finish" mode="brand" />
                  <Step label="Configure Parameters" state="default" mode="brand" />
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </section>
    </StoryDocsMatrixPage>
  ),
};
