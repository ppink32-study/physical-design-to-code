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
  StoryDocsPage,
  StoryDocsParagraph,
  StoryDocsSection,
} from "@/stories/story-docs-shell";

import { DatasetCard, type DatasetCardVariant } from "./datasetcard";

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
    variant: { control: "inline-radio", options: ["default", "variant2"] },
    title: { control: "text" },
    description: { control: "text" },
    badgeLabel: { control: "text" },
    badgeCount: { control: "text" },
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
    variant: "default",
    title: "Traffic_Sign_Dataset",
    description: "Collected from urban intersections",
    badgeLabel: "Local",
    badgeCount: 1,
    platform: "Forge Core",
    fileSize: "2.4GB",
    createdAt: "Created 3 hours ago",
  },
};

/* -----------------------------------------------------------------
 *  Matrix
 * ----------------------------------------------------------------- */
const VARIANTS: DatasetCardVariant[] = ["default", "variant2"];

export const Matrix: Story = {
  name: "Matrix",
  parameters: { layout: "padded", nextjs: { appDirectory: true } },
  render: () => (
    <StoryDocsMatrixPage
      title="DatasetCard"
      description="데이터셋 카드 컴포넌트 — Variant × 구성 매트릭스."
      figmaNode="18397-4135"
    >
      <FigmaLinkCard nodeId="18397-4135" caption="Components / Dataset Card" />

      <section>
        <h3 style={{ margin: "0 0 12px", fontSize: 13, fontWeight: 600, fontFamily: "var(--font-family-korean)", color: "var(--context-foreground-surface-on-surface-base)" }}>
          Variant
        </h3>
        <table style={{ ...storyMatrixTableBase, fontSize: 12 }}>
          <thead>
            <tr>
              <th style={{ ...storyMatrixColHeaderStyle, width: 80 }} />
              {VARIANTS.map((v) => (
                <th key={v} style={storyMatrixColHeaderStyle}>{v}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={storyMatrixRowHeaderStyle}>card</td>
              {VARIANTS.map((v) => (
                <td key={v} style={{ ...storyMatrixCellStyle, padding: 24 }}>
                  <DatasetCard variant={v} />
                </td>
              ))}
            </tr>
          </tbody>
        </table>
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

      <StoryDocsSection title="Variant">
        <StoryDocsParagraph><strong>default</strong> — 흰 배경 + Mint→Purple 3px 그라디언트 테두리. 활성 상태.</StoryDocsParagraph>
        <StoryDocsParagraph><strong>variant2</strong> — bg-surface-secondary + 1px border-surface-secondary. 비활성/선택 해제 상태.</StoryDocsParagraph>
      </StoryDocsSection>

      <StoryDocsSection title="Props">
        <StoryDocsParagraph><strong>title</strong>: 데이터셋 이름 (16px SemiBold)</StoryDocsParagraph>
        <StoryDocsParagraph><strong>description</strong>: 부연 설명 (13px Regular)</StoryDocsParagraph>
        <StoryDocsParagraph><strong>badgeLabel / badgeCount</strong>: 상태 뱃지 텍스트·카운트</StoryDocsParagraph>
        <StoryDocsParagraph><strong>platform / fileSize / createdAt</strong>: 메타 정보 3종</StoryDocsParagraph>
      </StoryDocsSection>

      <StoryDocsSection title="토큰">
        <StoryDocsParagraph><strong>배경(default)</strong>: --context-background-surface-bg-surface-white</StoryDocsParagraph>
        <StoryDocsParagraph><strong>그라디언트 테두리</strong>: #5CC7D0 → #D5A5FF (3px, padding-box)</StoryDocsParagraph>
        <StoryDocsParagraph><strong>배경(variant2)</strong>: --context-background-surface-bg-surface-secondary</StoryDocsParagraph>
        <StoryDocsParagraph><strong>썸네일</strong>: --accent-pink-accent-pink + --context-background-tint-bg-pink-tint-hover</StoryDocsParagraph>
      </StoryDocsSection>
    </StoryDocsPage>
  ),
};
