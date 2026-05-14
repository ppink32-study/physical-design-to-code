import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import type { CSSProperties } from "react";

import { figmaNodeUrl } from "../../stories/story-figma-urls";
import { Stepper, type StepperVariant } from "./stepper";
import { FigmaLinkCard } from "@/stories/figma-link-card";
import { StoryDocsMatrixPage } from "@/stories/story-docs-shell";

const FIGMA_NODE = "16722-36406";
const FIGMA_SECTION = figmaNodeUrl(FIGMA_NODE);

const VARIANTS: StepperVariant[] = ["current", "finish"];

const cellStyle: CSSProperties = {
  padding: "12px",
  border: "1px dashed #e5e6ea",
  borderRadius: 8,
  display: "flex",
  alignItems: "flex-start",
  justifyContent: "flex-start",
  background: "var(--bg-surface-secondary)",
};

const labelMuted: CSSProperties = {
  fontSize: 11,
  fontWeight: 600,
  color: "var(--on-surface-secondary)",
  fontFamily: "ui-monospace, SFMono-Regular, monospace",
  alignSelf: "center",
};

const meta: Meta<typeof Stepper> = {
  title: "Components/Step/Stepper",
  component: Stepper,
  parameters: {
    layout: "padded",
    figma: FIGMA_SECTION,
    docs: { disable: true },
  },
  argTypes: {
    variant: { control: "inline-radio", options: VARIANTS },
    step: { control: "text" },
    label: { control: "text" },
    name: { control: "text" },
  },
};
export default meta;

type Story = StoryObj<typeof Stepper>;

export const Matrix: Story = {
  name: "Matrix",
  render: (_args, ctx) => {
    const locale = ctx.globals && ctx.globals.locale === "en" ? "en" : "ko";
    return (
      <StoryDocsMatrixPage
        title="Stepper"
        description={
          locale === "en"
            ? "Single step block — a Num indicator on the left and `Step N · Name of step N` labels on the right. Two variants: current (active step with gradient Num + surface background) and finish (completed step with check icon)."
            : "단일 step 블록 — 좌측 Num 인디케이터 + 우측 `Step N · Name of step N` 라벨. variant 2종: current(진행 중, 그라데이션 Num + 박스 배경) / finish(완료, 체크 Num)."
        }
        figmaNode={FIGMA_NODE}
      >
        <FigmaLinkCard
          nodeId={FIGMA_NODE}
          caption="Components / Step / Stepper — 원본 노드"
        />

        <section>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "100px 1fr",
              gap: 12,
              alignItems: "stretch",
              maxWidth: 720,
            }}
          >
            {VARIANTS.map((v) => (
              <div key={v} style={{ display: "contents" }}>
                <div style={labelMuted}>{v}</div>
                <div style={cellStyle}>
                  <Stepper variant={v} step={1} />
                </div>
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
  args: { variant: "current", step: 1, label: "Step 1", name: "Name of step 1" },
};
