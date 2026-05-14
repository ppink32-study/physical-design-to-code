import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import type { CSSProperties } from "react";

import { figmaNodeUrl } from "../../stories/story-figma-urls";
import { Badge } from "@/components/badge/badge";
import { StepCard } from "./stepcard";
import { FigmaLinkCard } from "@/stories/figma-link-card";
import { StoryDocsMatrixPage } from "@/stories/story-docs-shell";

const FIGMA_NODE = "16861-17888";
const FIGMA_SECTION = figmaNodeUrl(FIGMA_NODE);

const cellStyle: CSSProperties = {
  padding: "16px",
  background: "var(--bg-surface-secondary)",
  border: "1px dashed #e5e6ea",
  borderRadius: 8,
};

const meta: Meta<typeof StepCard> = {
  title: "Components/Step/StepCard",
  component: StepCard,
  parameters: {
    layout: "padded",
    figma: FIGMA_SECTION,
    docs: { disable: true },
  },
  argTypes: {
    variant: {
      control: "select",
      options: [
        "stop",
        "complete",
        "error",
        "success",
        "next",
        "current-light",
        "current-brand",
      ],
    },
    line: { control: "boolean" },
    step: { control: "text" },
    title: { control: "text" },
    description: { control: "text" },
  },
};
export default meta;

type Story = StoryObj<typeof StepCard>;

export const Matrix: Story = {
  name: "Matrix",
  render: (_args, ctx) => {
    const locale = ctx.globals && ctx.globals.locale === "en" ? "en" : "ko";
    return (
      <StoryDocsMatrixPage
        title="StepCard"
        description={
          locale === "en"
            ? "Horizontal Step Card: left StepItem indicator + right Data Pipeline Card. Card body shows title / description, an info row (Owner · ID · Date · Time) and an optional badge slot on the right."
            : "가로형 Step Card — 좌측 StepItem + 우측 Data Pipeline Card. 카드 본문은 title/description + Info (Owner · ID · Date · Time) + 우측 Badge 슬롯으로 구성됩니다."
        }
        figmaNode={FIGMA_NODE}
      >
        <FigmaLinkCard
          nodeId={FIGMA_NODE}
          caption="Components / Step / StepCard — 원본 노드"
        />

        <section
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 16,
          }}
        >
          <div style={cellStyle}>
            <StepCard
              variant="success"
              step={1}
              title="Collect"
              description="Collected through teleoperation."
              owner={{ label: "Owner ", value: "Team Alpha " }}
              id={{ label: "ID ", value: "Team Alpha " }}
              date="2025-11-15"
              time="2h 30m"
              badge={
                <Badge variant="solid" color="green" size="sm">
                  Completed
                </Badge>
              }
            />
          </div>

          <div style={cellStyle}>
            <StepCard
              variant="current-brand"
              step={2}
              title="Train"
              description="Model training pipeline."
              owner={{ label: "Owner ", value: "Team Beta " }}
              id={{ label: "ID ", value: "Pipeline-002 " }}
              date="2025-11-16"
              time="In progress"
              badge={
                <Badge variant="solid" color="blue" size="sm">
                  In progress
                </Badge>
              }
            />
          </div>

          <div style={cellStyle}>
            <StepCard
              variant="error"
              step={3}
              line={false}
              title="Deploy"
              description="Deploy to inference fleet."
              owner={{ label: "Owner ", value: "Team Gamma " }}
              id={{ label: "ID ", value: "Pipeline-003 " }}
              date="2025-11-17"
              time="—"
              badge={
                <Badge variant="solid" color="red" size="sm">
                  Failed
                </Badge>
              }
            />
          </div>
        </section>
      </StoryDocsMatrixPage>
    );
  },
};

export const Playground: Story = {
  name: "Playground",
  args: {
    variant: "success",
    step: 1,
    line: true,
    title: "Collect",
    description: "Collected through teleoperation.",
    owner: { label: "Owner ", value: "Team Alpha " },
    id: { label: "ID ", value: "Team Alpha " },
    date: "2025-11-15",
    time: "2h 30m",
    badge: (
      <Badge variant="solid" color="green" size="sm">
        Completed
      </Badge>
    ),
  },
};
