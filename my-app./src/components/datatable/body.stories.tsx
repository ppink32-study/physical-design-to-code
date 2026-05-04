import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { Badge } from "@/components/badge/badge";
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
    width: 405,
  },
};

/* -----------------------------------------------------------------
 *  Matrix
 * ----------------------------------------------------------------- */
const VARIANTS: { label: string; variant: "text" | "badge" }[] = [
  { label: "Text", variant: "text" },
  { label: "Badge", variant: "badge" },
];

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
              {VARIANTS.map(({ label }) => (
                <th key={label} style={storyMatrixColHeaderStyle}>{label}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{ ...storyMatrixCellStyle, padding: 16, verticalAlign: "middle" }}>
                <DataTableBody variant="text" width={405}>v1.0</DataTableBody>
              </td>
              <td style={{ ...storyMatrixCellStyle, padding: 16, verticalAlign: "middle" }}>
                <DataTableBody variant="badge" width={405}>
                  <Badge variant="solid" color="purple" size="sm" shape="square">Badge</Badge>
                </DataTableBody>
              </td>
            </tr>
          </tbody>
        </table>
      </section>

      {/* 테이블 Row 미리보기 */}
      <section style={{ marginTop: 32 }}>
        <h3 style={{ margin: "0 0 12px", fontSize: 13, fontWeight: 600, fontFamily: "var(--font-family-korean)", color: "var(--context-foreground-surface-on-surface-base)" }}>
          Body Row 미리보기
        </h3>
        <div style={{ display: "flex" }}>
          <DataTableBody variant="text" width={150}>v1.0</DataTableBody>
          <DataTableBody variant="text" width={150}>v1.2</DataTableBody>
          <DataTableBody variant="badge" width={150}>
            <Badge variant="solid" color="purple" size="sm" shape="square">Active</Badge>
          </DataTableBody>
          <DataTableBody variant="text" width={150}>2026-05-04</DataTableBody>
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
        <StoryDocsParagraph><strong>badge</strong> — Badge 슬롯입니다. children으로 Badge 컴포넌트를 주입하세요.</StoryDocsParagraph>
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
