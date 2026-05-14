import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import type { CSSProperties } from "react";

import { figmaNodeUrl } from "../../stories/story-figma-urls";
import { Num, type NumVariant } from "./num";
import { FigmaLinkCard } from "@/stories/figma-link-card";
import { StoryDocsMatrixPage } from "@/stories/story-docs-shell";

const FIGMA_NODE = "18374-238";
const FIGMA_SECTION = figmaNodeUrl(FIGMA_NODE);

const VARIANTS: { key: NumVariant; ko: string; en: string }[] = [
  { key: "stop", ko: "정지", en: "Stop" },
  { key: "complete", ko: "완료", en: "Complete" },
  { key: "error", ko: "오류", en: "Error" },
  { key: "success", ko: "성공", en: "Success" },
  { key: "next", ko: "다음(예정)", en: "Next" },
  { key: "current-light", ko: "현재 · Light", en: "Current · Light" },
  { key: "current-brand", ko: "현재 · Brand", en: "Current · Brand" },
];

const cellStyle: CSSProperties = {
  padding: "16px 24px",
  border: "1px dashed #e5e6ea",
  borderRadius: 8,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  gap: 12,
  minHeight: 120,
};

const labelMuted: CSSProperties = {
  fontSize: 11,
  fontWeight: 600,
  color: "var(--on-surface-secondary)",
  fontFamily: "ui-monospace, SFMono-Regular, monospace",
};

const meta: Meta<typeof Num> = {
  title: "Components/Step/Num",
  component: Num,
  parameters: {
    layout: "padded",
    figma: FIGMA_SECTION,
    docs: { disable: true },
  },
  argTypes: {
    variant: {
      control: "select",
      options: VARIANTS.map((v) => v.key),
    },
    step: { control: "text" },
  },
};
export default meta;

type Story = StoryObj<typeof Num>;

export const Matrix: Story = {
  name: "Matrix",
  parameters: { layout: "padded" },
  render: (_args, ctx) => {
    const locale = ctx.globals && ctx.globals.locale === "en" ? "en" : "ko";
    return (
      <StoryDocsMatrixPage
        title="Num"
        description={
          locale === "en"
            ? "24×24 circular indicator used inside Stepper · StepItem · StepCard. Seven variants: icon-based status (Stop · Complete · Error · Success) and text-based step number (Next · Current Light · Current Brand)."
            : "Stepper · StepItem · StepCard 내부에서 사용하는 24×24 원형 인디케이터. 아이콘 기반 상태(Stop · Complete · Error · Success) 와 텍스트 기반 스텝 번호(Next · Current Light · Current Brand) 7종."
        }
        figmaNode={FIGMA_NODE}
      >
        <FigmaLinkCard
          nodeId={FIGMA_NODE}
          caption="Components / Step / Num — 원본 노드"
        />

        <section style={{ overflowX: "auto" }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(7, minmax(120px, 1fr))",
              gap: 12,
              minWidth: 720,
            }}
          >
            {VARIANTS.map((v) => (
              <div key={v.key} style={cellStyle}>
                <Num variant={v.key} step={1} />
                <div style={{ textAlign: "center" }}>
                  <div style={labelMuted}>{v.key}</div>
                  <div
                    style={{
                      marginTop: 4,
                      fontSize: 11,
                      color: "var(--on-surface-hint)",
                    }}
                  >
                    {locale === "en" ? v.en : v.ko}
                  </div>
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
  args: { variant: "success", step: 1 },
};
