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

import { LibraryCardA, type LibraryCardAVariant } from "./librarycardA";

/* ----------------------------------------------------------------- */

const meta: Meta<typeof LibraryCardA> = {
  title: "Components/Card/LibraryCardA",
  component: LibraryCardA,
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
    category: { control: "text" },
    fileSize: { control: "text" },
    createdAt: { control: "text" },
  },
};
export default meta;
type Story = StoryObj<typeof LibraryCardA>;

/* -----------------------------------------------------------------
 *  Playground
 * ----------------------------------------------------------------- */
export const Playground: Story = {
  args: {
    variant: "default",
    imageSrc: "/robot/Unitree G1.jpg",
    title: "Traffic_Sign_Dataset",
    description: "Collected from urban intersections",
    badgeLabel: "Local",
    category: "Smart City",
    fileSize: "2.4GB",
    createdAt: "Created 3 hours ago",
  },
};

/* -----------------------------------------------------------------
 *  Matrix
 * ----------------------------------------------------------------- */
const VARIANTS: LibraryCardAVariant[] = ["default", "variant2"];

export const Matrix: Story = {
  name: "Matrix",
  parameters: { layout: "padded", nextjs: { appDirectory: true } },
  render: () => (
    <StoryDocsMatrixPage
      title="LibraryCardA"
      description="라이브러리 카드 A — Variant × 구성 매트릭스."
      figmaNode="18403-1736"
    >
      <FigmaLinkCard nodeId="18403-1736" caption="Components / Library Card A" />

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
                  <LibraryCardA variant={v} />
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </section>

      <section style={{ marginTop: 32 }}>
        <h3 style={{ margin: "0 0 12px", fontSize: 13, fontWeight: 600, fontFamily: "var(--font-family-korean)", color: "var(--context-foreground-surface-on-surface-base)" }}>
          이미지 변형
        </h3>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <LibraryCardA imageSrc="/robot/Dexmate Vega.jpg" title="Dexmate_Vega_Dataset" />
          <LibraryCardA imageSrc="/robot/Robotis AI Worker.jpg" title="Robotis_AIWorker_Dataset" />
          <LibraryCardA imageSrc="/robot/Unitree Go2.jpg" title="Unitree_Go2_Dataset" variant="variant2" />
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
      title="LibraryCardA"
      description="라이브러리 카드 A 컴포넌트 — Figma node 18403:1736."
    >
      <StoryDocsSection title="개요">
        <StoryDocsParagraph>
          로봇 이미지 썸네일 + 타이틀/설명 + 상태 뱃지 + 메타 정보 + Accept 버튼으로 구성된 가로형 카드입니다.
        </StoryDocsParagraph>
      </StoryDocsSection>

      <StoryDocsSection title="Variant">
        <StoryDocsParagraph><strong>default</strong> — bg-surface-secondary + Mint→Purple 2px 그라디언트 테두리(inside).</StoryDocsParagraph>
        <StoryDocsParagraph><strong>variant2</strong> — bg-surface-secondary, 테두리 없음.</StoryDocsParagraph>
      </StoryDocsSection>

      <StoryDocsSection title="Props">
        <StoryDocsParagraph><strong>imageSrc</strong>: 썸네일 이미지 경로 (public/robot/ 권장)</StoryDocsParagraph>
        <StoryDocsParagraph><strong>title / description</strong>: 카드 제목·설명</StoryDocsParagraph>
        <StoryDocsParagraph><strong>badgeLabel</strong>: 상태 뱃지 텍스트</StoryDocsParagraph>
        <StoryDocsParagraph><strong>category / fileSize / createdAt</strong>: 메타 정보 3종</StoryDocsParagraph>
        <StoryDocsParagraph><strong>onAccept</strong>: Accept 버튼 클릭 콜백</StoryDocsParagraph>
      </StoryDocsSection>

      <StoryDocsSection title="토큰">
        <StoryDocsParagraph><strong>배경</strong>: --context-background-surface-bg-surface-secondary</StoryDocsParagraph>
        <StoryDocsParagraph><strong>그라디언트 테두리(default)</strong>: #5CC7D0 → #D5A5FF (2px, padding-box)</StoryDocsParagraph>
        <StoryDocsParagraph><strong>Accept 버튼</strong>: --context-background-gray-bg-darkgray / --context-foreground-neutral-on-neutral-invert</StoryDocsParagraph>
      </StoryDocsSection>
    </StoryDocsPage>
  ),
};
