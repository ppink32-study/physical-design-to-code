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

import { Num, type NumMode, type NumState } from "./num";

const ICON_STATES: NumState[] = ["complete", "error", "success", "stop"];

const meta: Meta<typeof Num> = {
  title: "Components/Step/Num",
  component: Num,
  parameters: {
    layout: "centered",
    nextjs: { appDirectory: true },
    docs: { disable: true },
  },
  argTypes: {
    state: {
      control: "inline-radio",
      options: ["finish", "current", "next", "complete", "error", "success", "stop"],
    },
    mode: { control: "inline-radio", options: ["light", "brand"] },
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
const NUM_STATES: NumState[] = ["finish", "current", "next"];
const MODES: { label: string; mode: NumMode; bg: string }[] = [
  { label: "Light", mode: "light", bg: "#FFFFFF" },
  { label: "Brand", mode: "brand", bg: "#1F2025" },
];

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
      title="Num"
      description={locale === "en"
        ? "Step number badge. mode (light · dark) × state (finish · current · next · complete · error · success · stop)"
        : "Step 번호 배지. mode(light·dark) × state(finish·current·next·complete·error·success·stop)"}
      figmaNode="18374-238"
    >
      <FigmaLinkCard nodeId="18374-238" caption="Components / Step / Num" />

      <section>
        <h3 style={{ margin: "0 0 12px", fontSize: 13, fontWeight: 600, fontFamily: "var(--font-family-korean)", color: "var(--context-foreground-surface-on-surface-base)" }}>
          Number State × Mode
        </h3>
        <table style={{ ...storyMatrixTableBase, fontSize: 12 }}>
          <thead>
            <tr>
              <th style={{ ...storyMatrixColHeaderStyle, width: 64 }} />
              {NUM_STATES.map((s) => (
                <th key={s} style={storyMatrixColHeaderStyle}>{s}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {MODES.map(({ label, mode, bg }) => (
              <tr key={mode}>
                <td style={storyMatrixRowHeaderStyle}>{label}</td>
                {NUM_STATES.map((s, i) => (
                  <td key={s} style={{ ...storyMatrixCellStyle, padding: 16, background: bg }}>
                    <Num number={i + 1} state={s} mode={mode} />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <section style={{ marginTop: 24 }}>
        <h3 style={{ margin: "0 0 12px", fontSize: 13, fontWeight: 600, fontFamily: "var(--font-family-korean)", color: "var(--context-foreground-surface-on-surface-base)" }}>
          Icon State (Light only)
        </h3>
        <table style={{ ...storyMatrixTableBase, fontSize: 12 }}>
          <thead>
            <tr>
              {ICON_STATES.map((s) => (
                <th key={s} style={storyMatrixColHeaderStyle}>{s}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr>
              {ICON_STATES.map((s) => (
                <td key={s} style={{ ...storyMatrixCellStyle, padding: 16, background: "#FFFFFF" }}>
                  <Num state={s} />
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </section>
    </StoryDocsMatrixPage>
    );
  },
};
