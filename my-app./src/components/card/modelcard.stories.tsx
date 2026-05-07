import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { FigmaLinkCard } from "@/stories/figma-link-card";
import {
  StoryDocsMatrixPage,
} from "@/stories/story-docs-shell";

import { ModelCard, type ModelCardState } from "./modelcard";

/* ----------------------------------------------------------------- */

const meta: Meta<typeof ModelCard> = {
  title: "Components/Card/ModelCard",
  component: ModelCard,
  parameters: {
    layout: "centered",
    nextjs: { appDirectory: true },
    docs: { disable: true },
  },
  argTypes: {
    state: { control: "inline-radio", options: ["default", "hover"] },
    title: { control: "text" },
    description: { control: "text" },
    badgeLabel: { control: "text" },
    platform: { control: "text" },
    fileSize: { control: "text" },
    createdAt: { control: "text" },
  },
};
export default meta;
type Story = StoryObj<typeof ModelCard>;

/* -----------------------------------------------------------------
 *  Playground
 * ----------------------------------------------------------------- */
export const Playground: Story = {
  args: {
    state: "default",
    title: "Traffic_Sign_Model",
    description: "Collected from urban intersections",
    badgeLabel: "Local",
    platform: "Forge Core",
    fileSize: "2.4GB",
    createdAt: "Created 3 hours ago",
  },
};

/* -----------------------------------------------------------------
 *  Matrix — default / hover 세로 배치
 * ----------------------------------------------------------------- */
const STATES: ModelCardState[] = ["default", "hover"];

export const Matrix: Story = {
  name: "Matrix",
  parameters: { layout: "padded", nextjs: { appDirectory: true } },
  render: () => (
    <StoryDocsMatrixPage
      title="ModelCard"
      description="모델 카드 컴포넌트 — default · hover 상태 비교."
      figmaNode="18397-3969"
    >
      <FigmaLinkCard nodeId="18397-3969" caption="Components / Model Card" />

      <section>
        <h3 style={{ margin: "0 0 12px", fontSize: 13, fontWeight: 600, fontFamily: "var(--font-family-korean)", color: "var(--context-foreground-surface-on-surface-base)" }}>
          State
        </h3>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {STATES.map((s) => (
            <div key={s} style={{ display: "flex", flexDirection: "column", gap: 4 }}>
              <span style={{ fontSize: 11, fontWeight: 600, color: "var(--context-foreground-surface-on-surface-hint)", fontFamily: "var(--font-family-korean)" }}>{s}</span>
              <ModelCard state={s} />
            </div>
          ))}
        </div>
      </section>
    </StoryDocsMatrixPage>
  ),
};
