import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { FigmaLinkCard } from "@/stories/figma-link-card";
import {
  StoryDocsMatrixPage,
  StoryDocsPage,
  StoryDocsParagraph,
  StoryDocsSection,
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
  render: () => (
    <StoryDocsMatrixPage
      title="DatasetCard"
      description="데이터셋 카드 컴포넌트 — default · hover 상태 비교."
      figmaNode="18397-4135"
    >
      <FigmaLinkCard nodeId="18397-4135" caption="Components / Dataset Card" />

      <section>
        <h3 style={{ margin: "0 0 12px", fontSize: 13, fontWeight: 600, fontFamily: "var(--font-family-korean)", color: "var(--context-foreground-surface-on-surface-base)" }}>
          State
        </h3>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {STATES.map((s) => (
            <div key={s} style={{ display: "flex", flexDirection: "column", gap: 4 }}>
              <span style={{ fontSize: 11, fontWeight: 600, color: "var(--context-foreground-surface-on-surface-hint)", fontFamily: "var(--font-family-korean)" }}>{s}</span>
              <DatasetCard state={s} />
            </div>
          ))}
        </div>
      </section>
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
      title="DatasetCard"
      description="데이터셋 카드 컴포넌트 — Figma node 18397:4135."
    >
      <StoryDocsSection title="개요">
        <StoryDocsParagraph>
          데이터셋을 카드 형태로 표시합니다. 썸네일, 상태 뱃지, 타이틀, 설명, 메타 정보(플랫폼·파일 크기·생성일)로 구성됩니다.
        </StoryDocsParagraph>
      </StoryDocsSection>

      <StoryDocsSection title="State">
        <StoryDocsParagraph><strong>default</strong> — bg-surface-secondary, 테두리 없음.</StoryDocsParagraph>
        <StoryDocsParagraph><strong>hover</strong> — bg-surface-white + Mint→Purple 3px 그라디언트 테두리 (inline, box-sizing: border-box).</StoryDocsParagraph>
      </StoryDocsSection>

      <StoryDocsSection title="Props">
        <StoryDocsParagraph><strong>title</strong>: 데이터셋 이름 (16px SemiBold)</StoryDocsParagraph>
        <StoryDocsParagraph><strong>description</strong>: 부연 설명 (13px Regular)</StoryDocsParagraph>
        <StoryDocsParagraph><strong>badgeLabel</strong>: 상태 뱃지 텍스트</StoryDocsParagraph>
        <StoryDocsParagraph><strong>platform / fileSize / createdAt</strong>: 메타 정보 3종</StoryDocsParagraph>
      </StoryDocsSection>

      <StoryDocsSection title="토큰">
        <StoryDocsParagraph><strong>배경(default)</strong>: --context-background-surface-bg-surface-secondary</StoryDocsParagraph>
        <StoryDocsParagraph><strong>배경(hover)</strong>: --context-background-surface-bg-surface-white</StoryDocsParagraph>
        <StoryDocsParagraph><strong>hover 테두리</strong>: #5CC7D0 → #D5A5FF (3px, padding-box inline)</StoryDocsParagraph>
      </StoryDocsSection>
    </StoryDocsPage>
  ),
};
