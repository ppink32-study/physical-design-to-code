import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { Button } from "@/components/button/button/button";
import { FigmaLinkCard } from "@/stories/figma-link-card";
import {
  storyMatrixCellStyle,
  storyMatrixColHeaderStyle,
  storyMatrixTableBase,
} from "@/stories/story-matrix-table-styles";
import {
  StoryDocsMatrixPage,
  StoryDocsPage,
  StoryDocsParagraph,
  StoryDocsSection,
} from "@/stories/story-docs-shell";

import { Drawer, type DrawerSize, type DrawerSide } from "./drawer";

/* ----------------------------------------------------------------- */

const meta: Meta<typeof Drawer> = {
  title: "Components/Drawer/Drawer",
  component: Drawer,
  parameters: {
    layout: "centered",
    nextjs: { appDirectory: true },
    docs: { disable: true },
  },
  argTypes: {
    size: { control: "inline-radio", options: ["small", "medium", "large"] },
    side: { control: "inline-radio", options: ["left", "right"] },
    open: { control: "boolean" },
    title: { control: "text" },
  },
};
export default meta;
type Story = StoryObj<typeof Drawer>;

/* -----------------------------------------------------------------
 *  Playground
 * ----------------------------------------------------------------- */
export const Playground: Story = {
  args: {
    title: "Drawer Title",
    size: "medium",
    side: "right",
  },
  render: function PlaygroundRender(args) {
    const [open, setOpen] = useState(false);
    return (
      <>
        <Button variant="primary-solid" size="large" onClick={() => setOpen(true)}>
          Open Drawer
        </Button>
        <Drawer
          {...args}
          open={open}
          onClose={() => setOpen(false)}
          footer={
            <>
              <Button variant="secondary-outline" size="large" onClick={() => setOpen(false)}>
                취소
              </Button>
              <Button variant="primary-solid" size="large" onClick={() => setOpen(false)}>
                확인
              </Button>
            </>
          }
        >
          <p style={{ margin: 0, fontFamily: "var(--font-family-korean)", fontSize: 14, color: "var(--context-foreground-surface-on-surface-base)", lineHeight: "22px" }}>
            드로어 본문 영역입니다. 원하는 콘텐츠를 이곳에 배치하세요.
          </p>
        </Drawer>
      </>
    );
  },
};

/* -----------------------------------------------------------------
 *  Matrix — 3가지 사이즈
 * ----------------------------------------------------------------- */
const SIZES: { label: string; size: DrawerSize }[] = [
  { label: "Small (420px)", size: "small" },
  { label: "Medium (720px)", size: "medium" },
  { label: "Large (max 1140px)", size: "large" },
];

function DrawerPreview({ size, side = "right" }: { size: DrawerSize; side?: DrawerSide }) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button variant="secondary-outline" size="small" onClick={() => setOpen(true)}>
        {size}
      </Button>
      <Drawer
        open={open}
        onClose={() => setOpen(false)}
        title="Drawer Title"
        size={size}
        side={side}
        footer={
          <>
            <Button variant="secondary-outline" size="large" onClick={() => setOpen(false)}>
              취소
            </Button>
            <Button variant="primary-solid" size="large" onClick={() => setOpen(false)}>
              확인
            </Button>
          </>
        }
      >
        <p style={{ margin: 0, fontFamily: "var(--font-family-korean)", fontSize: 14, color: "var(--context-foreground-surface-on-surface-base)", lineHeight: "22px" }}>
          Swap content
        </p>
      </Drawer>
    </>
  );
}

export const Matrix: Story = {
  name: "Matrix",
  parameters: {
    layout: "padded",
    nextjs: { appDirectory: true },
  },
  render: () => (
    <StoryDocsMatrixPage
      title="Drawer"
      description="3가지 사이즈(small · medium · large)의 Side Drawer 매트릭스입니다."
      figmaNode="8256-8490"
    >
      <FigmaLinkCard
        nodeId="8256-8490"
        caption="Components / Drawer — Small·Medium·Large 매트릭스 원본"
      />

      <section>
        <h3 style={{ margin: "0 0 12px", fontSize: 13, fontWeight: 600, fontFamily: "var(--font-family-korean)", color: "var(--context-foreground-surface-on-surface-base)" }}>
          Drawer / Size
        </h3>
        <table style={{ ...storyMatrixTableBase, fontSize: 12 }}>
          <thead>
            <tr>
              {SIZES.map(({ label }) => (
                <th key={label} style={storyMatrixColHeaderStyle}>{label}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr>
              {SIZES.map(({ size }) => (
                <td key={size} style={{ ...storyMatrixCellStyle, padding: 16, verticalAlign: "middle", textAlign: "center" }}>
                  <DrawerPreview size={size} />
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </section>

      <section style={{ marginTop: 24 }}>
        <h3 style={{ margin: "0 0 12px", fontSize: 13, fontWeight: 600, fontFamily: "var(--font-family-korean)", color: "var(--context-foreground-surface-on-surface-base)" }}>
          Drawer / Side
        </h3>
        <table style={{ ...storyMatrixTableBase, fontSize: 12 }}>
          <thead>
            <tr>
              <th style={storyMatrixColHeaderStyle}>Right (기본)</th>
              <th style={storyMatrixColHeaderStyle}>Left</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{ ...storyMatrixCellStyle, padding: 16, verticalAlign: "middle", textAlign: "center" }}>
                <DrawerPreview size="medium" side="right" />
              </td>
              <td style={{ ...storyMatrixCellStyle, padding: 16, verticalAlign: "middle", textAlign: "center" }}>
                <DrawerPreview size="medium" side="left" />
              </td>
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
    <StoryDocsPage title="Drawer" description="사이드 드로어 컴포넌트 가이드입니다.">
      <StoryDocsSection title="개요">
        <StoryDocsParagraph>
          createPortal을 사용해 document.body에 직접 마운트합니다.
          오버레이 클릭 또는 ESC 키로 닫힙니다.
        </StoryDocsParagraph>
      </StoryDocsSection>

      <StoryDocsSection title="사이즈">
        <StoryDocsParagraph>
          <strong>small</strong> — 420px. 짧은 폼·필터·상세보기 등.
        </StoryDocsParagraph>
        <StoryDocsParagraph>
          <strong>medium</strong> — 720px. 기본값. 일반적인 폼·정보 입력.
        </StoryDocsParagraph>
        <StoryDocsParagraph>
          <strong>large</strong> — max-width 1140px. 복잡한 콘텐츠·테이블 표시.
        </StoryDocsParagraph>
      </StoryDocsSection>

      <StoryDocsSection title="방향">
        <StoryDocsParagraph>
          <strong>right</strong> — 화면 우측에서 등장 (기본값).
        </StoryDocsParagraph>
        <StoryDocsParagraph>
          <strong>left</strong> — 화면 좌측에서 등장.
        </StoryDocsParagraph>
      </StoryDocsSection>

      <StoryDocsSection title="슬롯">
        <StoryDocsParagraph>
          <strong>title</strong>: 헤더 타이틀 텍스트. 생략 시 공간만 표시됩니다.
        </StoryDocsParagraph>
        <StoryDocsParagraph>
          <strong>children</strong>: body 콘텐츠 슬롯. overflow-y: auto로 스크롤됩니다.
        </StoryDocsParagraph>
        <StoryDocsParagraph>
          <strong>footer</strong>: 버튼 행 슬롯. justify-end 정렬입니다.
        </StoryDocsParagraph>
      </StoryDocsSection>
    </StoryDocsPage>
  ),
};
