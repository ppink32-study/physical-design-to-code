import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import type { CSSProperties } from "react";

import { AlertLineIcon, type AlertType } from "./lineicon";
import { FigmaLinkCard } from "@/stories/figma-link-card";
import {
  StoryDocsCode,
  StoryDocsInlineCode,
  StoryDocsMatrixPage,
  StoryDocsPage,
  StoryDocsParagraph,
  StoryDocsSection,
  StoryPlaygroundFrame,
} from "@/stories/story-docs-shell";

/** Figma 매트릭스 열 순서: Info · Grayscale · Success · Warning · Error */
const MATRIX_TYPES: readonly AlertType[] = [
  "info",
  "grayscale",
  "success",
  "warning",
  "error",
] as const;

const TYPE_TITLE: Record<AlertType, string> = {
  info: "Info",
  grayscale: "Grayscale",
  success: "Success",
  warning: "Warning",
  error: "Error",
};

const COMPACT_MESSAGE = "A simple alert—check it out!";
const LARGE_TITLE = "Well done!";
const LARGE_MESSAGE =
  "Aww yeah, you successfully read this important alert message. This example text is going to run a bit longer so that you can see how spacing within an alert works with this kind of content.";
const LARGE_EXTRA =
  "Whenever you need to, be sure to use margin utilities to keep things nice and tidy.";

const matrixScrollWrap: CSSProperties = {
  overflowX: "auto",
  paddingBottom: 8,
  marginLeft: -8,
  marginRight: -8,
  paddingLeft: 8,
  paddingRight: 8,
};

const matrixTableBase: CSSProperties = {
  borderCollapse: "collapse",
  width: "max-content",
  background: "var(--context-background-surface-bg-surface-base)",
};

const matrixColHeaderStyle: CSSProperties = {
  fontSize: 11,
  fontWeight: 600,
  letterSpacing: "0.04em",
  textAlign: "left",
  padding: "10px 12px",
  borderBottom:
    "1px solid var(--border-border-surface-border-surface-secondary)",
  color: "var(--context-foreground-surface-on-surface-secondary)",
  whiteSpace: "nowrap",
};

const matrixRowHeaderStyle: CSSProperties = {
  fontSize: 12,
  fontWeight: 600,
  color: "var(--context-foreground-surface-on-surface-secondary)",
  padding: "12px 16px 12px 0",
  whiteSpace: "nowrap",
  verticalAlign: "top",
  borderBottom:
    "1px solid var(--border-border-surface-border-surface-secondary)",
};

const matrixCellStyle: CSSProperties = {
  padding: "12px 16px",
  verticalAlign: "top",
  borderBottom:
    "1px solid var(--border-border-surface-border-surface-secondary)",
  minWidth: 400,
};

const matrixStickyCornerStyle: CSSProperties = {
  position: "sticky",
  left: 0,
  zIndex: 1,
  background: "var(--context-background-surface-bg-surface-base)",
  boxShadow: "6px 0 12px -8px rgba(20, 21, 24, 0.12)",
};

const meta: Meta<typeof AlertLineIcon> = {
  title: "Components/Alert/Line icon",
  component: AlertLineIcon,
  parameters: {
    layout: "centered",
    docs: { disable: true },
  },
  argTypes: {
    type: {
      control: "inline-radio",
      options: ["info", "success", "warning", "error", "grayscale"] as AlertType[],
    },
    message: { control: "text" },
    title: { control: "text" },
    extraMessage: { control: "text" },
    additional: { control: "boolean" },
    role: { control: "inline-radio", options: ["status", "alert"] },
  },
  args: {
    type: "info",
    message: COMPACT_MESSAGE,
  },
};
export default meta;

type Story = StoryObj<typeof AlertLineIcon>;

/* =================================================================
 * 0. Playground — Controls
 * =============================================================== */
export const Playground: Story = {
  decorators: [
    (Story) => (
      <StoryPlaygroundFrame>
        <Story />
      </StoryPlaygroundFrame>
    ),
  ],
};

/* =================================================================
 * 1. Matrix — 열=Type, 행=Small(한 줄) / Large(제목+본문)
 * =============================================================== */
export const Matrix: Story = {
  name: "Matrix",
  parameters: { layout: "padded" },
  render: () => (
    <StoryDocsMatrixPage
      title="Line icon"
      description="가로는 5가지 Type, 세로는 Small(한 줄)과 Large(제목·본문·추가 본문)로 라인 아이콘 알림을 비교합니다."
      figmaNode="5012-68852"
    >
      <FigmaLinkCard
        nodeId="5012-68852"
        caption="Components / Alert · Line icon — Type × Size 매트릭스 원본"
      />
      <div style={matrixScrollWrap}>
        <table style={matrixTableBase}>
          <thead>
            <tr>
              <th
                style={{
                  ...matrixColHeaderStyle,
                  ...matrixStickyCornerStyle,
                  minWidth: 100,
                  zIndex: 2,
                }}
              />
              {MATRIX_TYPES.map((t) => (
                <th key={t} style={matrixColHeaderStyle}>
                  {TYPE_TITLE[t]}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr>
              <th
                scope="row"
                style={{
                  ...matrixRowHeaderStyle,
                  ...matrixStickyCornerStyle,
                }}
              >
                Small
              </th>
              {MATRIX_TYPES.map((t) => (
                <td key={t} style={matrixCellStyle}>
                  <AlertLineIcon type={t} message={COMPACT_MESSAGE} />
                </td>
              ))}
            </tr>
            <tr>
              <th
                scope="row"
                style={{
                  ...matrixRowHeaderStyle,
                  ...matrixStickyCornerStyle,
                }}
              >
                Large
              </th>
              {MATRIX_TYPES.map((t) => (
                <td key={t} style={matrixCellStyle}>
                  <AlertLineIcon
                    type={t}
                    title={LARGE_TITLE}
                    message={LARGE_MESSAGE}
                    extraMessage={LARGE_EXTRA}
                  />
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    </StoryDocsMatrixPage>
  ),
};

/* =================================================================
 * 2. Guidelines
 * =============================================================== */
const guideBlockStyle: CSSProperties = {
  padding: 16,
  borderRadius: 8,
  border: "1px solid var(--border-border-surface-border-surface)",
  background: "var(--context-background-surface-bg-surface-base)",
};

const guideTableStyle: CSSProperties = {
  width: "100%",
  borderCollapse: "collapse",
  fontSize: 13,
  lineHeight: 1.5,
  color: "var(--context-foreground-surface-on-surface-base)",
};

const thStyle: CSSProperties = {
  textAlign: "left",
  fontWeight: 600,
  fontSize: 12,
  padding: "8px 12px",
  borderBottom: "1px solid var(--border-border-surface-border-surface)",
  color: "var(--context-foreground-surface-on-surface-secondary)",
};

const tdStyle: CSSProperties = {
  padding: "10px 12px",
  borderBottom:
    "1px solid var(--border-border-surface-border-surface-secondary)",
  verticalAlign: "top",
};

export const Guideline: Story = {
  name: "Guideline",
  parameters: {
    layout: "padded",
    controls: { hideNoControlsWarning: true, disable: true },
    actions: { disable: true },
  },
  render: () => (
    <StoryDocsPage title="Line icon" description="라인 아이콘 스트로크 스타일 인라인 알림 가이드입니다.">
      <StoryDocsSection title="개요">
        <StoryDocsParagraph>
          라인 아이콘 스트로크 스타일의 인라인 알림입니다.{" "}
          <StoryDocsInlineCode>message</StoryDocsInlineCode> 만 넣으면 Small(한 줄),{" "}
          <StoryDocsInlineCode>title</StoryDocsInlineCode> 또는{" "}
          <StoryDocsInlineCode>extraMessage</StoryDocsInlineCode> 를 주면 Large(추가 콘텐츠)
          레이아웃으로 전환됩니다.
        </StoryDocsParagraph>
      </StoryDocsSection>

      <StoryDocsSection title="Type">
        <div style={guideBlockStyle}>
          <table style={guideTableStyle}>
            <thead>
              <tr>
                <th style={thStyle}>type</th>
                <th style={thStyle}>용도</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={tdStyle}>
                  <AlertLineIcon type="info" message="Info" />
                </td>
                <td style={tdStyle}>정보·중립 안내</td>
              </tr>
              <tr>
                <td style={tdStyle}>
                  <AlertLineIcon type="grayscale" message="Grayscale" />
                </td>
                <td style={tdStyle}>보조·낮은 강조 톤</td>
              </tr>
              <tr>
                <td style={tdStyle}>
                  <AlertLineIcon type="success" message="Success" />
                </td>
                <td style={tdStyle}>성공·완료</td>
              </tr>
              <tr>
                <td style={tdStyle}>
                  <AlertLineIcon type="warning" message="Warning" />
                </td>
                <td style={tdStyle}>경고·주의</td>
              </tr>
              <tr>
                <td style={tdStyle}>
                  <AlertLineIcon type="error" message="Error" />
                </td>
                <td style={tdStyle}>오류·실패</td>
              </tr>
            </tbody>
          </table>
        </div>
      </StoryDocsSection>

      <StoryDocsSection title="코드 예시">
        <StoryDocsCode>{`import { AlertLineIcon } from "@/components/Alert/lineicon";

<AlertLineIcon type="info" message="A simple alert—check it out!" />

<AlertLineIcon
  type="success"
  title="Well done!"
  message="Long body…"
  extraMessage="Secondary body…"
/>`}</StoryDocsCode>
      </StoryDocsSection>
    </StoryDocsPage>
  ),
};
