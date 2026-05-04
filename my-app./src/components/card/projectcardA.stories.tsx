import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { FigmaLinkCard } from "@/stories/figma-link-card";
import {
  StoryDocsMatrixPage,
  StoryDocsPage,
  StoryDocsParagraph,
  StoryDocsSection,
} from "@/stories/story-docs-shell";

import {
  ProjectCardA,
  type ProjectCardAState,
  type ProjectCardAType,
} from "./projectcardA";

/* ----------------------------------------------------------------- */

const meta: Meta<typeof ProjectCardA> = {
  title: "Components/Card/ProjectCardA",
  component: ProjectCardA,
  parameters: {
    layout: "centered",
    nextjs: { appDirectory: true },
    docs: { disable: true },
  },
  argTypes: {
    type: { control: "inline-radio", options: ["brand", "light"] },
    state: { control: "inline-radio", options: ["default", "hover"] },
    title: { control: "text" },
    description: { control: "text" },
    members: { control: "text" },
  },
};
export default meta;
type Story = StoryObj<typeof ProjectCardA>;

/* -----------------------------------------------------------------
 *  Playground
 * ----------------------------------------------------------------- */
export const Playground: Story = {
  args: {
    type: "light",
    state: "default",
    imageSrc: "/robot/Unitree G1.jpg",
    title: "Traffic_Sign_Dataset",
    description: "Collected from urban intersections",
    members: "8 members",
  },
};

/* -----------------------------------------------------------------
 *  Matrix — type × state (2×2)
 * ----------------------------------------------------------------- */
const TYPES: ProjectCardAType[] = ["brand", "light"];
const STATES: ProjectCardAState[] = ["default", "hover"];

export const Matrix: Story = {
  name: "Matrix",
  parameters: { layout: "padded", nextjs: { appDirectory: true } },
  render: () => (
    <StoryDocsMatrixPage
      title="ProjectCardA"
      description="프로젝트 카드 A — type(brand/light) × state(default/hover) 매트릭스."
      figmaNode="18404-696"
    >
      <FigmaLinkCard nodeId="18404-696" caption="Components / Project Card A (brand)" />
      <FigmaLinkCard nodeId="18404-755" caption="Components / Project Card A (light)" />

      <section>
        <h3 style={{ margin: "0 0 12px", fontSize: 13, fontWeight: 600, fontFamily: "var(--font-family-korean)", color: "var(--context-foreground-surface-on-surface-base)" }}>
          Type × State
        </h3>
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          {TYPES.map((t) => (
            <div key={t}>
              <span style={{ display: "block", marginBottom: 8, fontSize: 11, fontWeight: 600, color: "var(--context-foreground-surface-on-surface-hint)", fontFamily: "var(--font-family-korean)", textTransform: "uppercase", letterSpacing: "0.4px" }}>
                {t}
              </span>
              <div style={{ display: "flex", flexDirection: "row", gap: 16 }}>
                {STATES.map((s) => (
                  <div key={s} style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                    <span style={{ fontSize: 11, fontWeight: 600, color: "var(--context-foreground-surface-on-surface-hint)", fontFamily: "var(--font-family-korean)" }}>{s}</span>
                    <ProjectCardA type={t} state={s} />
                  </div>
                ))}
              </div>
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
      title="ProjectCardA"
      description="프로젝트 카드 A 컴포넌트 — Figma node 18404:696 (brand) / 18404:755 (light)."
    >
      <StoryDocsSection title="개요">
        <StoryDocsParagraph>
          로봇 이미지 + 타이틀/설명 + 멤버 수 + 계정 연결 링크로 구성된 카드입니다.
          brand/light 두 가지 타입과 default/hover 두 가지 상태를 지원합니다.
        </StoryDocsParagraph>
      </StoryDocsSection>

      <StoryDocsSection title="Type">
        <StoryDocsParagraph><strong>brand</strong> — neutral 계열 토큰. 이미지 bg: on-surface-invert, 콘텐츠 bg: bg-neutral, border: border-neutral.</StoryDocsParagraph>
        <StoryDocsParagraph><strong>light</strong> — surface 계열 토큰. 이미지 bg: bg-surface-secondary, 콘텐츠 bg: bg-surface-base, border: border-surface.</StoryDocsParagraph>
      </StoryDocsSection>

      <StoryDocsSection title="State">
        <StoryDocsParagraph><strong>default</strong> — 2px solid 컬러 테두리.</StoryDocsParagraph>
        <StoryDocsParagraph><strong>hover</strong> — 2px Mint→Purple 그라디언트 테두리 (inline). brand 타입은 이미지 bg가 background.svg로 교체됩니다.</StoryDocsParagraph>
      </StoryDocsSection>

      <StoryDocsSection title="Props">
        <StoryDocsParagraph><strong>type</strong>: "brand" | "light" — 색상 토큰 계열 선택</StoryDocsParagraph>
        <StoryDocsParagraph><strong>state</strong>: "default" | "hover" — 명시적 상태 (CSS :hover도 동작)</StoryDocsParagraph>
        <StoryDocsParagraph><strong>imageSrc</strong>: 로봇 이미지 경로 (public/robot/ 권장)</StoryDocsParagraph>
        <StoryDocsParagraph><strong>title / description</strong>: 카드 제목·설명</StoryDocsParagraph>
        <StoryDocsParagraph><strong>members</strong>: 멤버 수 텍스트</StoryDocsParagraph>
      </StoryDocsSection>

      <StoryDocsSection title="토큰 (brand)">
        <StoryDocsParagraph><strong>이미지 bg</strong>: --context-foreground-surface-on-suface-invert</StoryDocsParagraph>
        <StoryDocsParagraph><strong>콘텐츠 bg</strong>: --context-background-neutral-bg-neutral</StoryDocsParagraph>
        <StoryDocsParagraph><strong>타이틀</strong>: --context-foreground-neutral-on-neutral-base</StoryDocsParagraph>
        <StoryDocsParagraph><strong>설명/멤버</strong>: --context-foreground-neutral-on-neutral-hint</StoryDocsParagraph>
        <StoryDocsParagraph><strong>아이콘</strong>: --context-foreground-icon-neutral-icon-neutral</StoryDocsParagraph>
        <StoryDocsParagraph><strong>border</strong>: --border-neutral-border-neutral</StoryDocsParagraph>
      </StoryDocsSection>

      <StoryDocsSection title="토큰 (light)">
        <StoryDocsParagraph><strong>이미지 bg</strong>: --context-background-surface-bg-surface-secondary</StoryDocsParagraph>
        <StoryDocsParagraph><strong>콘텐츠 bg</strong>: --context-background-surface-bg-surface-base</StoryDocsParagraph>
        <StoryDocsParagraph><strong>타이틀</strong>: --context-foreground-surface-on-surface-base</StoryDocsParagraph>
        <StoryDocsParagraph><strong>설명/멤버</strong>: --context-foreground-surface-on-surface-hint</StoryDocsParagraph>
        <StoryDocsParagraph><strong>아이콘</strong>: --context-foreground-icon-surface-icon-surface</StoryDocsParagraph>
        <StoryDocsParagraph><strong>border</strong>: --border-border-surface-border-surface</StoryDocsParagraph>
      </StoryDocsSection>
    </StoryDocsPage>
  ),
};
