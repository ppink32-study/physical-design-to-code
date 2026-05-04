import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { FigmaLinkCard } from "@/stories/figma-link-card";
import {
  StoryDocsMatrixPage,
  StoryDocsPage,
  StoryDocsParagraph,
  StoryDocsSection,
} from "@/stories/story-docs-shell";

import { ProjectCardB, type ProjectCardBState } from "./projectcardB";

/* ----------------------------------------------------------------- */

const meta: Meta<typeof ProjectCardB> = {
  title: "Components/Card/ProjectCardB",
  component: ProjectCardB,
  parameters: {
    layout: "centered",
    nextjs: { appDirectory: true },
    docs: { disable: true },
  },
  argTypes: {
    state: { control: "inline-radio", options: ["default", "hover"] },
    title: { control: "text" },
    description: { control: "text" },
    members: { control: "text" },
  },
};
export default meta;
type Story = StoryObj<typeof ProjectCardB>;

/* -----------------------------------------------------------------
 *  Playground
 * ----------------------------------------------------------------- */
export const Playground: Story = {
  args: {
    state: "default",
    imageSrc: "/robot/Unitree G1.jpg",
    title: "Traffic_Sign_Dataset",
    description: "Collected from urban intersections",
    members: "16 members",
  },
};

/* -----------------------------------------------------------------
 *  Matrix — default / hover 세로 배치
 * ----------------------------------------------------------------- */
const STATES: ProjectCardBState[] = ["default", "hover"];

export const Matrix: Story = {
  name: "Matrix",
  parameters: { layout: "padded", nextjs: { appDirectory: true } },
  render: () => (
    <StoryDocsMatrixPage
      title="ProjectCardB"
      description="프로젝트 카드 B — default · hover 상태 비교."
      figmaNode="18403-1736"
    >
      <FigmaLinkCard nodeId="18403-1736" caption="Components / Project Card B" />

      <section>
        <h3 style={{ margin: "0 0 12px", fontSize: 13, fontWeight: 600, fontFamily: "var(--font-family-korean)", color: "var(--context-foreground-surface-on-surface-base)" }}>
          State
        </h3>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {STATES.map((s) => (
            <div key={s} style={{ display: "flex", flexDirection: "column", gap: 4 }}>
              <span style={{ fontSize: 11, fontWeight: 600, color: "var(--context-foreground-surface-on-surface-hint)", fontFamily: "var(--font-family-korean)" }}>{s}</span>
              <ProjectCardB state={s} />
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
      title="ProjectCardB"
      description="프로젝트 카드 B 컴포넌트 — Figma node 18403:1736."
    >
      <StoryDocsSection title="개요">
        <StoryDocsParagraph>
          로봇 이미지 썸네일 + 타이틀/설명 + 멤버 수 + Accept 버튼으로 구성된 가로형 카드입니다.
        </StoryDocsParagraph>
      </StoryDocsSection>

      <StoryDocsSection title="State">
        <StoryDocsParagraph><strong>default</strong> — bg-surface-secondary, 테두리 없음.</StoryDocsParagraph>
        <StoryDocsParagraph><strong>hover</strong> — bg-surface-secondary + Mint→Purple 2px 그라디언트 테두리 (inline, box-sizing: border-box).</StoryDocsParagraph>
      </StoryDocsSection>

      <StoryDocsSection title="Props">
        <StoryDocsParagraph><strong>imageSrc</strong>: 썸네일 이미지 경로 (public/robot/ 권장)</StoryDocsParagraph>
        <StoryDocsParagraph><strong>title / description</strong>: 카드 제목·설명</StoryDocsParagraph>
        <StoryDocsParagraph><strong>members</strong>: 멤버 수 텍스트 (Users 아이콘)</StoryDocsParagraph>
        <StoryDocsParagraph><strong>onAccept</strong>: Accept 버튼 클릭 콜백</StoryDocsParagraph>
      </StoryDocsSection>

      <StoryDocsSection title="토큰">
        <StoryDocsParagraph><strong>배경</strong>: --context-background-surface-bg-surface-secondary</StoryDocsParagraph>
        <StoryDocsParagraph><strong>hover 테두리</strong>: #5CC7D0 → #D5A5FF (2px, padding-box inline)</StoryDocsParagraph>
        <StoryDocsParagraph><strong>Accept 버튼</strong>: --context-background-gray-bg-darkgray</StoryDocsParagraph>
      </StoryDocsSection>
    </StoryDocsPage>
  ),
};
