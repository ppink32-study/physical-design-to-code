import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { FigmaLinkCard } from "@/stories/figma-link-card";
import {
  StoryDocsMatrixPage,
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
