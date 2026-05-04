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

import { DataTableBody } from "./body";
import { DataTableHeader } from "./header";

/* ----------------------------------------------------------------- */

const meta: Meta<typeof DataTableBody> = {
  title: "Components/DataTable/Body",
  component: DataTableBody,
  parameters: {
    layout: "centered",
    nextjs: { appDirectory: true },
    docs: { disable: true },
  },
  argTypes: {
    variant: { control: "inline-radio", options: ["text", "badge"] },
    children: { control: "text" },
    width: { control: "text" },
  },
};
export default meta;
type Story = StoryObj<typeof DataTableBody>;

/* -----------------------------------------------------------------
 *  Playground
 * ----------------------------------------------------------------- */
export const Playground: Story = {
  args: {
    variant: "text",
    children: "v1.0",
    width: 496,
  },
};

/* -----------------------------------------------------------------
 *  상수
 * ----------------------------------------------------------------- */
/** Figma 5269:129425 기준 — header 200px / body 496px */
const H_W = 200;
const B_W = 496;

/* -----------------------------------------------------------------
 *  Matrix
 * ----------------------------------------------------------------- */
export const Matrix: Story = {
  name: "Matrix",
  parameters: { layout: "padded", nextjs: { appDirectory: true } },
  render: () => (
    <StoryDocsMatrixPage
      title="DataTable / Body"
      description="데이터 테이블 바디 셀 컴포넌트입니다."
      figmaNode="18385-9748"
    >
      <FigmaLinkCard nodeId="18385-9748" caption="Components / DataTable — Body" />

      {/* Variant 매트릭스 */}
      <section>
        <h3 style={{ margin: "0 0 12px", fontSize: 13, fontWeight: 600, fontFamily: "var(--font-family-korean)", color: "var(--context-foreground-surface-on-surface-base)" }}>
          Body / Variant
        </h3>
        <table style={{ ...storyMatrixTableBase, fontSize: 12 }}>
          <thead>
            <tr>
              <th style={storyMatrixColHeaderStyle}>text</th>
              <th style={storyMatrixColHeaderStyle}>badge</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{ ...storyMatrixCellStyle, padding: 16, verticalAlign: "middle" }}>
                <DataTableBody variant="text" width={405}>v1.0</DataTableBody>
              </td>
              <td style={{ ...storyMatrixCellStyle, padding: 16, verticalAlign: "middle" }}>
                <DataTableBody variant="badge" width={405}>Badge</DataTableBody>
              </td>
            </tr>
          </tbody>
        </table>
      </section>

      {/* -------------------------------------------------------
       *  Step Layout (Figma 5269:129425)
       *  가로 배치: [Header 200] + [Body 496] × 2 = 1392px
       * ----------------------------------------------------- */}
      <section style={{ marginTop: 40 }}>
        <h3 style={{ margin: "0 0 4px", fontSize: 13, fontWeight: 600, fontFamily: "var(--font-family-korean)", color: "var(--context-foreground-surface-on-surface-base)" }}>
          Step Layout — 가로 배치 (Figma 5269:129425)
        </h3>
        <p style={{ margin: "0 0 12px", fontSize: 12, fontFamily: "var(--font-family-korean)", color: "var(--context-foreground-surface-on-surface-secondary)" }}>
          Header(200px) + Body(496px) × 2컬럼, 3행 구성
        </p>

        <div style={{
          display: "inline-flex",
          flexDirection: "column",
          border: "1px solid var(--border-border-surface-border-surface-secondary)",
          boxSizing: "border-box",
        }}>
          {/* Row 1 — text cells */}
          <div style={{ display: "flex" }}>
            <DataTableHeader width={H_W}>Version</DataTableHeader>
            <DataTableBody variant="text" width={B_W}>v1.0</DataTableBody>
            <DataTableHeader width={H_W}>Model Name</DataTableHeader>
            <DataTableBody variant="text" width={B_W}>GPT-4 Turbo</DataTableBody>
          </div>

          {/* Row 2 — badge cells */}
          <div style={{ display: "flex" }}>
            <DataTableHeader width={H_W}>Status</DataTableHeader>
            <DataTableBody variant="badge" width={B_W}>Active</DataTableBody>
            <DataTableHeader width={H_W}>Category</DataTableHeader>
            <DataTableBody variant="badge" width={B_W}>AI</DataTableBody>
          </div>

          {/* Row 3 — text cells */}
          <div style={{ display: "flex" }}>
            <DataTableHeader width={H_W}>Created</DataTableHeader>
            <DataTableBody variant="text" width={B_W}>2026-05-04</DataTableBody>
            <DataTableHeader width={H_W}>Author</DataTableHeader>
            <DataTableBody variant="text" width={B_W}>Physical AI Platform</DataTableBody>
          </div>
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
    <StoryDocsPage title="DataTable / Body" description="데이터 테이블 바디 셀 컴포넌트 가이드입니다.">
      <StoryDocsSection title="개요">
        <StoryDocsParagraph>
          단일 데이터 셀 컴포넌트입니다. Text와 Badge 두 가지 variant를 지원합니다.
        </StoryDocsParagraph>
      </StoryDocsSection>

      <StoryDocsSection title="Variant">
        <StoryDocsParagraph><strong>text</strong> — 텍스트를 표시합니다. children으로 문자열을 전달하세요.</StoryDocsParagraph>
        <StoryDocsParagraph><strong>badge</strong> — Badge 슬롯입니다. children으로 Badge 컴포넌트를 주입하세요. 여러 Badge는 4px gap으로 자동 배치됩니다.</StoryDocsParagraph>
      </StoryDocsSection>

      <StoryDocsSection title="Step Layout 조합">
        <StoryDocsParagraph>
          Figma 5269:129425 기준 — DataTableHeader(200px)와 DataTableBody(496px)를 교대로 배치해
          가로 2컬럼 key-value 테이블을 구성합니다.
        </StoryDocsParagraph>
        <StoryDocsParagraph>
          <code>{`[Header 200] + [Body 496] + [Header 200] + [Body 496] = 1392px`}</code>
        </StoryDocsParagraph>
      </StoryDocsSection>

      <StoryDocsSection title="크기">
        <StoryDocsParagraph><strong>기본</strong> — 405px × 40px. width prop으로 override 가능합니다.</StoryDocsParagraph>
      </StoryDocsSection>

      <StoryDocsSection title="토큰">
        <StoryDocsParagraph><strong>배경</strong>: --context-background-surface-bg-surface-base</StoryDocsParagraph>
        <StoryDocsParagraph><strong>테두리</strong>: --border-border-surface-border-surface-secondary (우측 + 하단 1px)</StoryDocsParagraph>
        <StoryDocsParagraph><strong>텍스트</strong>: --context-foreground-surface-on-surface-base, Regular 13/20</StoryDocsParagraph>
        <StoryDocsParagraph><strong>패딩</strong>: 양측 12px (--spacing-md)</StoryDocsParagraph>
      </StoryDocsSection>
    </StoryDocsPage>
  ),
};
