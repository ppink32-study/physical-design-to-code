/**
 * PageTitle — Figma node 4790:161 · Matrix only (세로 스택, 가로 스크롤 없음)
 */

import type { CSSProperties, ReactNode } from "react";
import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { Badge } from "../badge/badge";
import { Button } from "../button/button/button";
import { PageTitle } from "./pagetitle";
import { FigmaLinkCard } from "@/stories/figma-link-card";
import { StoryDocsMatrixPage } from "@/stories/story-docs-shell";

const meta: Meta<typeof PageTitle> = {
  title: "Components/Title/PageTitle",
  component: PageTitle,
  parameters: {
    layout: "padded",
    docs: { disable: true },
  },
};
export default meta;
type Story = StoryObj<typeof PageTitle>;

/** Figma Page Title 프레임과 동일 폭 */
const PAGE_TITLE_FRAME_PX = 1612;

const sectionTitleStyle: CSSProperties = {
  fontSize: 14,
  fontWeight: 600,
  marginTop: 28,
  marginBottom: 12,
  color: "var(--on-surface-base)",
};

const verticalStackStyle: CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: 28,
  width: "100%",
};

const variantCaptionStyle: CSSProperties = {
  fontSize: 12,
  fontWeight: 600,
  letterSpacing: "0.02em",
  marginBottom: 8,
  color: "var(--on-surface-hint)",
};

const frameWrapStyle: CSSProperties = {
  width: PAGE_TITLE_FRAME_PX,
  maxWidth: "100%",
  boxSizing: "border-box",
};

function BtnIcon({ src, size = 16 }: { src: string; size?: number }) {
  const style: CSSProperties = {
    display: "inline-block",
    width: size,
    height: size,
    background: "currentColor",
    WebkitMaskImage: `url(${src})`,
    maskImage: `url(${src})`,
    WebkitMaskRepeat: "no-repeat",
    maskRepeat: "no-repeat",
    WebkitMaskPosition: "center",
    maskPosition: "center",
    WebkitMaskSize: "contain",
    maskSize: "contain",
  };
  return <span aria-hidden="true" style={style} />;
}

/** Figma [Back button — 17987-48203](https://www.figma.com/design/myQPboBEUAPxUwlvH9MH2R/Physical-AI-Platfrom-Design-Guideline?node-id=17987-48203&m=dev) — Secondary Outline White Invert · Medium · Round · Icon only */
const backButton2d = (
  <Button
    type="button"
    variant="secondary-outline-white-invert"
    size="medium"
    shape="round"
    iconOnly
    aria-label="뒤로 가기"
    leftIcon={<BtnIcon src="/icon/ChevronLeft.svg" size={16} />}
  />
);

/** Figma MCP (4790:161) Button Group — Secondary×3 · Primary · Icon-only */
const actions2d = (
  <>
    <Button variant="secondary-outline" size="large">
      Button
    </Button>
    <Button variant="secondary-outline" size="large">
      Button
    </Button>
    <Button variant="secondary-outline" size="large">
      Button
    </Button>
    <Button variant="primary-solid" size="large">
      Button
    </Button>
    <Button
      variant="secondary-outline"
      size="large"
      iconOnly
      aria-label="Search"
      leftIcon={<BtnIcon src="/icon/Search.svg" size={24} />}
    />
  </>
);

function VariantBlock({
  caption,
  children: blockChildren,
}: {
  caption: string;
  children: ReactNode;
}) {
  return (
    <div>
      <div style={variantCaptionStyle}>{caption}</div>
      <div style={frameWrapStyle}>{blockChildren}</div>
    </div>
  );
}

export const Matrix: Story = {
  name: "Matrix",
  parameters: { layout: "padded" },
  render: (_args, ctx) => {
    const locale = ctx.globals && ctx.globals.locale === "en" ? "en" : "ko";
    return (
    <StoryDocsMatrixPage
      title="PageTitle"
      description={locale === "en"
        ? "Frame width 1612px maintained. 2d includes a back button (backButton) based on Figma 4790-177. Variants are laid out vertically."
        : "프레임 폭 1612px 유지. 2d는 Figma 4790-177 기준 뒤로가기(backButton) 포함. 변형을 세로로 나열합니다."}
      figmaNode="4790-161"
      pageMaxWidth={1720}
    >
      <FigmaLinkCard nodeId="4790-161" caption="Components / Title — Page Title" />

      <h3 style={sectionTitleStyle}>1d</h3>
      <div style={verticalStackStyle}>
        <VariantBlock caption="Hint">
          <PageTitle
            type="1d"
            title="Header Title"
            hint="해당 페이지에 관한 설명이 나타납니다."
          />
        </VariantBlock>
        <VariantBlock caption="No hint">
          <PageTitle type="1d" title="Header Title" />
        </VariantBlock>
      </div>

      <h3 style={sectionTitleStyle}>2d</h3>
      <div style={verticalStackStyle}>
        <VariantBlock caption="Hint · Badges · 0">
          <PageTitle
            type="2d"
            backButton={backButton2d}
            title="Header Title"
            hint="해당 페이지에 관한 설명이 나타납니다."
            actions={actions2d}
          />
        </VariantBlock>
        <VariantBlock caption="Hint · Badge · 1">
          <PageTitle
            type="2d"
            backButton={backButton2d}
            title="Header Title"
            hint="해당 페이지에 관한 설명이 나타납니다."
            badges={
              <Badge variant="solid" color="gray" shape="square" size="lg">
                학습대기
              </Badge>
            }
            actions={actions2d}
          />
        </VariantBlock>
        <VariantBlock caption="Hint · Badges · 2">
          <PageTitle
            type="2d"
            backButton={backButton2d}
            title="Header Title"
            hint="해당 페이지에 관한 설명이 나타납니다."
            badges={
              <>
                <Badge variant="solid" color="gray" shape="square" size="lg">
                  학습대기
                </Badge>
                <Badge variant="solid" color="red" shape="square" size="lg">
                  오류
                </Badge>
              </>
            }
            actions={actions2d}
          />
        </VariantBlock>
        <VariantBlock caption="No hint · Badges · 0">
          <PageTitle
            type="2d"
            backButton={backButton2d}
            title="Header Title"
            actions={actions2d}
          />
        </VariantBlock>
        <VariantBlock caption="No hint · Badge · 1">
          <PageTitle
            type="2d"
            backButton={backButton2d}
            title="Header Title"
            badges={
              <Badge variant="solid" color="gray" shape="square" size="lg">
                학습대기
              </Badge>
            }
            actions={actions2d}
          />
        </VariantBlock>
        <VariantBlock caption="No hint · Badges · 2">
          <PageTitle
            type="2d"
            backButton={backButton2d}
            title="Header Title"
            badges={
              <>
                <Badge variant="solid" color="gray" shape="square" size="lg">
                  학습대기
                </Badge>
                <Badge variant="solid" color="red" shape="square" size="lg">
                  오류
                </Badge>
              </>
            }
            actions={actions2d}
          />
        </VariantBlock>
      </div>
    </StoryDocsMatrixPage>
    );
  },
};
