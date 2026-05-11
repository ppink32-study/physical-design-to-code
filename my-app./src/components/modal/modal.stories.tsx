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

import { Modal, type ModalSize } from "./modal";

/* ----------------------------------------------------------------- */

const meta: Meta<typeof Modal> = {
  title: "Components/Modal/Modal",
  component: Modal,
  parameters: {
    layout: "centered",
    nextjs: { appDirectory: true },
    docs: { disable: true },
  },
  argTypes: {
    size: { control: "inline-radio", options: ["small", "medium", "large"] },
    open: { control: "boolean" },
    title: { control: "text" },
  },
};
export default meta;
type Story = StoryObj<typeof Modal>;

/* -----------------------------------------------------------------
 *  Playground
 * ----------------------------------------------------------------- */
export const Playground: Story = {
  args: {
    title: "Modal Title",
    size: "medium",
  },
  render: function PlaygroundRender(args) {
    const [open, setOpen] = useState(false);
    return (
      <>
        <Button variant="primary-solid" size="large" onClick={() => setOpen(true)}>
          Open Modal
        </Button>
        <Modal
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
            모달 본문 영역입니다. 원하는 콘텐츠를 이곳에 배치하세요.
          </p>
        </Modal>
      </>
    );
  },
};

/* -----------------------------------------------------------------
 *  Matrix — 3가지 사이즈
 * ----------------------------------------------------------------- */
const SIZES: { label: string; size: ModalSize }[] = [
  { label: "Small (500px)", size: "small" },
  { label: "Medium (800px)", size: "medium" },
  { label: "Large (1140px)", size: "large" },
];

function ModalPreview({ size }: { size: ModalSize }) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button variant="secondary-outline" size="small" onClick={() => setOpen(true)}>
        {size}
      </Button>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        title="Modal Title"
        size={size}
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
      </Modal>
    </>
  );
}

export const Matrix: Story = {
  name: "Matrix",
  parameters: {
    layout: "padded",
    nextjs: { appDirectory: true },
  },
  render: (_args, ctx) => {
    const locale = ctx.globals && ctx.globals.locale === "en" ? "en" : "ko";
    return (
    <StoryDocsMatrixPage
      title="Modal"
      description={locale === "en"
        ? "Modal matrix across three sizes (small · medium · large)."
        : "3가지 사이즈(small · medium · large)의 Modal 매트릭스입니다."}
      figmaNode="6446-446809"
    >
      <FigmaLinkCard
        nodeId="6446-446809"
        caption="Components / Modal — Small·Medium·Large 매트릭스 원본"
      />

      <section>
        <h3 style={{ margin: "0 0 12px", fontSize: 13, fontWeight: 600, fontFamily: "var(--font-family-korean)", color: "var(--context-foreground-surface-on-surface-base)" }}>
          Modal / Size
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
                  <ModalPreview size={size} />
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </section>
    </StoryDocsMatrixPage>
    );
  },
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
    <StoryDocsPage title="Modal" description="모달 컴포넌트 가이드입니다.">
      <StoryDocsSection title="개요">
        <StoryDocsParagraph>
          createPortal을 사용해 document.body에 직접 마운트합니다.
          오버레이 클릭 또는 ESC 키로 닫힙니다.
        </StoryDocsParagraph>
      </StoryDocsSection>

      <StoryDocsSection title="사이즈">
        <StoryDocsParagraph>
          <strong>small</strong> — max-width 500px. 간단한 확인/경고 다이얼로그.
        </StoryDocsParagraph>
        <StoryDocsParagraph>
          <strong>medium</strong> — max-width 800px. 기본값. 일반적인 폼·정보 입력.
        </StoryDocsParagraph>
        <StoryDocsParagraph>
          <strong>large</strong> — max-width 1140px. 복잡한 콘텐츠·테이블 표시.
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
