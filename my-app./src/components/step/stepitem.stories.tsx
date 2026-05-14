import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import type { CSSProperties } from "react";

import { figmaNodeUrl } from "../../stories/story-figma-urls";
import { StepItem } from "./stepitem";
import type { NumVariant } from "./num";
import { FigmaLinkCard } from "@/stories/figma-link-card";
import { StoryDocsMatrixPage } from "@/stories/story-docs-shell";

const FIGMA_NODE = "18505-14797";
const FIGMA_SECTION = figmaNodeUrl(FIGMA_NODE);

const VARIANTS: NumVariant[] = [
  "stop",
  "complete",
  "error",
  "success",
  "next",
  "current-light",
  "current-brand",
];

const cellStyle: CSSProperties = {
  padding: "16px 24px",
  border: "1px dashed #e5e6ea",
  borderRadius: 8,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "flex-start",
  gap: 12,
  minHeight: 140,
};

const labelMuted: CSSProperties = {
  fontSize: 11,
  fontWeight: 600,
  color: "var(--on-surface-secondary)",
  fontFamily: "ui-monospace, SFMono-Regular, monospace",
};

const meta: Meta<typeof StepItem> = {
  title: "Components/Step/StepItem",
  component: StepItem,
  parameters: {
    layout: "padded",
    figma: FIGMA_SECTION,
    docs: { disable: true },
  },
  argTypes: {
    variant: { control: "select", options: VARIANTS },
    line: { control: "boolean" },
    step: { control: "text" },
  },
};
export default meta;

type Story = StoryObj<typeof StepItem>;

export const Matrix: Story = {
  name: "Matrix",
  render: (_args, ctx) => {
    const locale = ctx.globals && ctx.globals.locale === "en" ? "en" : "ko";
    return (
      <StoryDocsMatrixPage
        title="StepItem"
        description={
          locale === "en"
            ? "Vertical step indicator: a Num on top and an optional vertical line below. Set `line` to false on the last step so the chain ends cleanly."
            : "상단 Num + 하단 세로선으로 구성된 세로 인디케이터. 마지막 step 에서는 `line=false` 로 체인을 닫습니다."
        }
        figmaNode={FIGMA_NODE}
      >
        <FigmaLinkCard
          nodeId={FIGMA_NODE}
          caption="Components / Step / StepItem — 원본 노드"
        />

        <section style={{ overflowX: "auto" }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "120px repeat(7, minmax(100px, 1fr))",
              gap: 12,
              alignItems: "stretch",
              minWidth: 720,
            }}
          >
            <div />
            {VARIANTS.map((v) => (
              <div key={`h-${v}`} style={{ ...labelMuted, textAlign: "center" }}>
                {v}
              </div>
            ))}

            <div style={{ ...labelMuted, alignSelf: "center" }}>line: true</div>
            {VARIANTS.map((v) => (
              <div key={`o-${v}`} style={cellStyle}>
                <StepItem variant={v} step={1} line />
              </div>
            ))}

            <div style={{ ...labelMuted, alignSelf: "center" }}>line: false</div>
            {VARIANTS.map((v) => (
              <div key={`x-${v}`} style={cellStyle}>
                <StepItem variant={v} step={1} line={false} />
              </div>
            ))}
          </div>
        </section>
      </StoryDocsMatrixPage>
    );
  },
};

export const Playground: Story = {
  name: "Playground",
  args: { variant: "error", step: 1, line: true },
};
