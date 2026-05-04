import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { FigmaLinkCard } from "@/stories/figma-link-card";
import {
  StoryDocsMatrixPage,
  StoryDocsPage,
  StoryDocsParagraph,
  StoryDocsSection,
  StoryPlaygroundFrame,
} from "@/stories/story-docs-shell";

import { StepperArea, type StepperAreaVariant } from "./stepperarea";

const DEMO_STEPS = [
  "Configure Parameters",
  "Select Model",
  "Review & Deploy",
];

const meta: Meta<typeof StepperArea> = {
  title: "Components/Step/StepperArea",
  component: StepperArea,
  parameters: {
    layout: "padded",
    nextjs: { appDirectory: true },
    docs: { disable: true },
  },
  argTypes: {
    variant: { control: "inline-radio", options: ["default", "brand"] },
    activeStep: { control: { type: "number", min: 0, max: 2 } },
  },
};
export default meta;

type Story = StoryObj<typeof StepperArea>;

/* -----------------------------------------------------------------
 *  Playground
 * ----------------------------------------------------------------- */
export const Playground: Story = {
  decorators: [
    (Story) => (
      <StoryPlaygroundFrame>
        <Story />
      </StoryPlaygroundFrame>
    ),
  ],
  args: {
    variant: "default",
    steps: DEMO_STEPS,
    activeStep: 1,
  },
};

/* -----------------------------------------------------------------
 *  Matrix
 * ----------------------------------------------------------------- */
const VARIANTS: { variant: StepperAreaVariant; label: string }[] = [
  { variant: "default", label: "Default (Light)" },
  { variant: "brand", label: "Brand (Dark)" },
];

export const Matrix: Story = {
  name: "Matrix",
  parameters: { layout: "padded", nextjs: { appDirectory: true } },
  render: () => (
    <StoryDocsMatrixPage
      title="StepperArea"
      description="variant(default·brand) × activeStep(0·1·2) 조합 매트릭스."
      figmaNode="18444-8508"
    >
      <FigmaLinkCard
        nodeId="18444-8508"
        caption="Components / Step / Stepper Area"
      />

      {VARIANTS.map(({ variant, label }) => (
        <section key={variant} style={{ marginBottom: 40 }}>
          <h3
            style={{
              margin: "0 0 12px",
              fontSize: 13,
              fontWeight: 600,
              color: "var(--context-foreground-surface-on-surface-base)",
              fontFamily: "var(--font-family-korean)",
            }}
          >
            {label}
          </h3>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {[0, 1, 2].map((active) => (
              <div key={active}>
                <div
                  style={{
                    fontSize: 11,
                    color: "var(--context-foreground-surface-on-surface-hint)",
                    marginBottom: 4,
                  }}
                >
                  activeStep={active}
                </div>
                <StepperArea
                  variant={variant}
                  steps={DEMO_STEPS}
                  activeStep={active}
                />
              </div>
            ))}
          </div>
        </section>
      ))}
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
      title="StepperArea"
      description="상단 고정 스텝 영역. 단계(step)의 번호·라벨·구분선을 한 줄로 배치합니다."
    >
      <FigmaLinkCard
        nodeId="18444-8508"
        caption="Components / Step / Stepper Area — Dev Mode"
      />

      <StoryDocsSection title="개요">
        <StoryDocsParagraph>
          <code>steps</code> 배열(라벨)과 <code>activeStep</code>(0-based 인덱스)으로
          각 단계의 상태(finish · current · next)를 자동 계산합니다.
        </StoryDocsParagraph>
        <StoryDocsParagraph>
          <code>variant=&quot;default&quot;</code>는 라이트 배경, <code>variant=&quot;brand&quot;</code>는
          다크 브랜드 배경입니다.
        </StoryDocsParagraph>
      </StoryDocsSection>

      <StoryDocsSection title="States">
        <StoryDocsParagraph>
          <strong>finish</strong> — 완료된 단계. Num은 외곽선+민트 텍스트, Step은 기본(회색).
        </StoryDocsParagraph>
        <StoryDocsParagraph>
          <strong>current</strong> — 현재 단계. Num은 민트 solid, Step은 active(배경+테두리).
        </StoryDocsParagraph>
        <StoryDocsParagraph>
          <strong>next</strong> — 미도달 단계. Num은 회색 배경, Step은 기본(회색).
        </StoryDocsParagraph>
      </StoryDocsSection>
    </StoryDocsPage>
  ),
};
