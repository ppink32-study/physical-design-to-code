import type { Meta, StoryObj } from "@storybook/nextjs-vite";

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

import { DataTableHeader } from "./header";

/* ----------------------------------------------------------------- */

const meta: Meta<typeof DataTableHeader> = {
  title: "Components/DataTable/Header",
  component: DataTableHeader,
  parameters: {
    layout: "centered",
    nextjs: { appDirectory: true },
    docs: { disable: true },
  },
  argTypes: {
    children: { control: "text" },
    width: { control: "text" },
  },
};
export default meta;
type Story = StoryObj<typeof DataTableHeader>;

/* -----------------------------------------------------------------
 *  Playground
 * ----------------------------------------------------------------- */
export const Playground: Story = {
  args: {
    children: "Version",
    width: 150,
  },
};

/* -----------------------------------------------------------------
 *  Matrix
 * ----------------------------------------------------------------- */
const WIDTHS: { label: string; width: number }[] = [
  { label: "150px (기본)", width: 150 },
  { label: "200px", width: 200 },
  { label: "300px", width: 300 },
];

export const Matrix: Story = {
  name: "Matrix",
  parameters: { layout: "padded", nextjs: { appDirectory: true } },
  render: () => (
    <StoryDocsMatrixPage
      title="DataTable / Header"
      description="데이터 테이블 헤더 셀 컴포넌트입니다."
      figmaNode="18385-9746"
    >
      <FigmaLinkCard nodeId="18385-9746" caption="Components / DataTable — Header" />

      {/* Width 매트릭스 */}
      <section>
        <h3 style={{ margin: "0 0 12px", fontSize: 13, fontWeight: 600, fontFamily: "var(--font-family-korean)", color: "var(--context-foreground-surface-on-surface-base)" }}>
          Header / Width
        </h3>
        <table style={{ ...storyMatrixTableBase, fontSize: 12 }}>
          <thead>
            <tr>
              {WIDTHS.map(({ label }) => (
                <th key={label} style={storyMatrixColHeaderStyle}>{label}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr>
              {WIDTHS.map(({ width }) => (
                <td key={width} style={{ ...storyMatrixCellStyle, padding: 16, verticalAlign: "middle" }}>
                  <DataTableHeader width={width}>Version</DataTableHeader>
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
    <StoryDocsPage title="DataTable / Header" description="데이터 테이블 헤더 셀 컴포넌트 가이드입니다.">
      <StoryDocsSection title="개요">
        <StoryDocsParagraph>
          단일 헤더 셀 컴포넌트입니다. 여러 셀을 나란히 배치해 헤더 행을 구성합니다.
        </StoryDocsParagraph>
      </StoryDocsSection>

      <StoryDocsSection title="크기">
        <StoryDocsParagraph><strong>기본</strong> — 150px × 40px. width prop으로 override 가능합니다.</StoryDocsParagraph>
      </StoryDocsSection>

      <StoryDocsSection title="토큰">
        <StoryDocsParagraph><strong>배경</strong>: --context-background-surface-bg-surface-secondary</StoryDocsParagraph>
        <StoryDocsParagraph><strong>테두리</strong>: --border-border-surface-border-surface-secondary (우측 + 하단 1px)</StoryDocsParagraph>
        <StoryDocsParagraph><strong>텍스트</strong>: --context-foreground-surface-on-surface-base, SemiBold 13/20</StoryDocsParagraph>
        <StoryDocsParagraph><strong>패딩</strong>: left 12px (--spacing-md), right 8px (--spacing-sm)</StoryDocsParagraph>
      </StoryDocsSection>
    </StoryDocsPage>
  ),
};
