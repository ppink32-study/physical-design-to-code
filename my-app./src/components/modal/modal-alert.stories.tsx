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

import { ModalAlert, ModalAlertPanel, type ModalAlertType } from "./modal-alert";

/* ----------------------------------------------------------------- */

const meta: Meta<typeof ModalAlert> = {
  title: "Components/Modal/Alert",
  component: ModalAlert,
  parameters: {
    layout: "centered",
    nextjs: { appDirectory: true },
    docs: { disable: true },
  },
  argTypes: {
    type: { control: "inline-radio", options: ["confirm", "error", "warning", "success"] },
    open: { control: "boolean" },
    title: { control: "text" },
    message: { control: "text" },
  },
};
export default meta;
type Story = StoryObj<typeof ModalAlert>;

/* -----------------------------------------------------------------
 *  Playground
 * ----------------------------------------------------------------- */
export const Playground: Story = {
  args: {
    type: "confirm",
    title: "Title",
    message: "메시지 영역입니다.",
  },
  render: function PlaygroundRender(args) {
    const [open, setOpen] = useState(false);
    return (
      <>
        <Button variant="primary-solid" size="medium" onClick={() => setOpen(true)}>
          Open Alert Modal
        </Button>
        <ModalAlert
          {...args}
          open={open}
          onClose={() => setOpen(false)}
          onConfirm={() => setOpen(false)}
        />
      </>
    );
  },
};

/* -----------------------------------------------------------------
 *  Matrix — 4가지 타입을 한 눈에
 * ----------------------------------------------------------------- */
const TYPES: { label: string; type: ModalAlertType }[] = [
  { label: "Confirm", type: "confirm" },
  { label: "Error",   type: "error"   },
  { label: "Warning", type: "warning" },
  { label: "Success", type: "success" },
];

export const Matrix: Story = {
  name: "Matrix",
  parameters: {
    layout: "padded",
    nextjs: { appDirectory: true },
  },
  render: () => (
    <StoryDocsMatrixPage
      title="Modal Alert"
      description="4가지 타입(Confirm · Error · Warning · Success)의 Alert Modal 매트릭스입니다."
      figmaNode="5453-10090"
    >
      <FigmaLinkCard
        nodeId="5453-10090"
        caption="Components / Modal - Alert — 4종 타입 원본"
      />

      {/* 타입별 패널 (클릭 없이 바로 보이는 정적 표시) */}
      <section>
        <h3 style={{ margin: "0 0 16px", fontSize: 13, fontWeight: 600, fontFamily: "var(--font-family-korean)", color: "var(--context-foreground-surface-on-surface-base)" }}>
          Modal Alert / Type
        </h3>
        <table style={{ ...storyMatrixTableBase, fontSize: 12 }}>
          <thead>
            <tr>
              {TYPES.map(({ label }) => (
                <th key={label} style={storyMatrixColHeaderStyle}>{label}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr>
              {TYPES.map(({ type }) => (
                <td key={type} style={{ ...storyMatrixCellStyle, padding: 24, verticalAlign: "top" }}>
                  <ModalAlertPanel
                    type={type}
                    title="Title"
                    message="메시지 영역입니다."
                    onClose={() => {}}
                    onConfirm={() => {}}
                  />
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
    <StoryDocsPage title="Modal Alert" description="Alert Modal 컴포넌트 가이드입니다.">
      <StoryDocsSection title="개요">
        <StoryDocsParagraph>
          사용자의 액션을 확인하거나 오류·경고·성공 상태를 전달하는 소형 다이얼로그입니다.
          너비 350px 고정이며, ESC 또는 오버레이 클릭으로 닫힙니다.
        </StoryDocsParagraph>
      </StoryDocsSection>

      <StoryDocsSection title="타입">
        <StoryDocsParagraph>
          <strong>confirm</strong> — 회색 물음표 아이콘. 사용자 확인이 필요한 액션.
        </StoryDocsParagraph>
        <StoryDocsParagraph>
          <strong>error</strong> — 빨간 X 아이콘. 오류·실패 상황을 알릴 때.
        </StoryDocsParagraph>
        <StoryDocsParagraph>
          <strong>warning</strong> — 주황 삼각형 아이콘. 주의가 필요한 상황을 알릴 때.
        </StoryDocsParagraph>
        <StoryDocsParagraph>
          <strong>success</strong> — 초록 체크 아이콘. 작업 성공을 알릴 때.
        </StoryDocsParagraph>
      </StoryDocsSection>

      <StoryDocsSection title="슬롯">
        <StoryDocsParagraph>
          <strong>title</strong>: 굵은 제목 텍스트 (H6_SemiB, 16px).
        </StoryDocsParagraph>
        <StoryDocsParagraph>
          <strong>message</strong>: 본문 설명 텍스트 (Body/Base, 14px).
        </StoryDocsParagraph>
        <StoryDocsParagraph>
          <strong>dataBox</strong>: 회색 배경의 보조 정보 박스. 삭제할 데이터명 등을 표시할 때 사용.
        </StoryDocsParagraph>
        <StoryDocsParagraph>
          <strong>onClose / onConfirm</strong>: 취소·확인 핸들러. footer prop으로 완전히 커스텀 가능.
        </StoryDocsParagraph>
      </StoryDocsSection>
    </StoryDocsPage>
  ),
};
