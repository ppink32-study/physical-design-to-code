import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { FigmaLinkCard } from "@/stories/figma-link-card";
import {
  StoryDocsMatrixPage,
} from "@/stories/story-docs-shell";

import { DatasetCard, type DatasetCardState } from "./datasetcard";

/* ----------------------------------------------------------------- */

const meta: Meta<typeof DatasetCard> = {
  title: "Components/Card/DatasetCard",
  component: DatasetCard,
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
type Story = StoryObj<typeof DatasetCard>;

/* -----------------------------------------------------------------
 *  Playground
 * ----------------------------------------------------------------- */
export const Playground: Story = {
  args: {
    state: "default",
    title: "Traffic_Sign_Dataset",
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
const STATES: DatasetCardState[] = ["default", "hover"];

export const Matrix: Story = {
  name: "Matrix",
  parameters: { layout: "padded", nextjs: { appDirectory: true } },
  render: (_args, ctx) => {
    const locale = (ctx.globals?.locale as "ko" | "en") === "en" ? "en" : "ko";
    return (
    <StoryDocsMatrixPage
      title="DatasetCard"
      description={locale === "en"
        ? "Dataset card component — default · hover state comparison."
        : "데이터셋 카드 컴포넌트 — default · hover 상태 비교."}
      figmaNode="18397-4135"
    >
      <FigmaLinkCard nodeId="18397-4135" caption="Components / Dataset Card" />

      <section>
        <h3 style={{ margin: "0 0 12px", fontSize: 13, fontWeight: 600, fontFamily: "var(--font-family-korean)", color: "var(--on-surface-base)" }}>
          State
        </h3>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {STATES.map((s) => (
            <div key={s} style={{ display: "flex", flexDirection: "column", gap: 4 }}>
              <span style={{ fontSize: 11, fontWeight: 600, color: "var(--on-surface-hint)", fontFamily: "var(--font-family-korean)" }}>{s}</span>
              <DatasetCard state={s} />
            </div>
          ))}
        </div>
      </section>
    </StoryDocsMatrixPage>
    );
  },
};
