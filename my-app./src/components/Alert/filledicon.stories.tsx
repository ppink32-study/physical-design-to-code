import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import type { CSSProperties } from "react";

import {
  AlertFilledIcon,
  type AlertFilledSize,
  type AlertType,
} from "./filledicon";
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

const MATRIX_TYPES: readonly AlertType[] = [
  "info",
  "grayscale",
  "success",
  "warning",
  "error",
] as const;

const TYPE_TITLE: Record<AlertType, string> = {
  info: "Info",
  grayscale: "Neutral",
  success: "Success",
  warning: "Warning",
  error: "Error",
};

const COMPACT_MESSAGE = "A simple alert—check it out!";
/** medium 행: 제목과 동일 문구를 본문에서 반복해 두 줄 이상으로 줄바꿈 */
const MEDIUM_BODY =
  "A simple alert—check it out! A simple alert—check it out! A simple alert—check it out!";
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

const meta: Meta<typeof AlertFilledIcon> = {
  title: "Components/Alert/Filled icon",
  component: AlertFilledIcon,
  parameters: {
    layout: "centered",
    docs: { disable: true },
  },
  argTypes: {
    type: {
      control: "inline-radio",
      options: ["info", "success", "warning", "error", "grayscale"] as AlertType[],
    },
    size: {
      control: "inline-radio",
      options: ["small", "medium", "large"] as AlertFilledSize[],
    },
    message: { control: "text" },
    title: { control: "text" },
    extraMessage: { control: "text" },
    role: { control: "inline-radio", options: ["status", "alert"] },
  },
  args: {
    type: "info",
    size: "small",
    message: COMPACT_MESSAGE,
  },
};
export default meta;

type Story = StoryObj<typeof AlertFilledIcon>;

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
 * 1. Matrix — 열=Type(Info·Neutral·Success·Warning·Error),
 *            행=Simple(small) / Title+body(medium) / Detailed(large)
 * =============================================================== */
export const Matrix: Story = {
  name: "Matrix",
  parameters: { layout: "padded" },
  render: () => (
    <StoryDocsMatrixPage
      title="Filled icon"
      description="가로는 5가지 Type(Info·Neutral·Success·Warning·Error), 세로는 Simple(small 한 줄)·Title+body(medium)·Detailed(large)로 구성된 Filled 아이콘 알림 매트릭스입니다."
      figmaNode="6390-256693"
    >
      <FigmaLinkCard
        nodeId="6390-256693"
        caption="Components / Alert · Filled icon — Type × Size 매트릭스 원본"
      />
      <div style={matrixScrollWrap}>
        <table style={matrixTableBase}>
          <thead>
            <tr>
              <th
                style={{
                  ...matrixColHeaderStyle,
                  ...matrixStickyCornerStyle,
                  minWidth: 112,
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
                Simple
              </th>
              {MATRIX_TYPES.map((t) => (
                <td key={t} style={matrixCellStyle}>
                  <AlertFilledIcon
                    type={t}
                    size="small"
                    message={COMPACT_MESSAGE}
                  />
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
                Title + body
              </th>
              {MATRIX_TYPES.map((t) => (
                <td key={t} style={matrixCellStyle}>
                  <AlertFilledIcon
                    type={t}
                    size="medium"
                    title={COMPACT_MESSAGE}
                    message={MEDIUM_BODY}
                  />
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
                Detailed
              </th>
              {MATRIX_TYPES.map((t) => (
                <td key={t} style={matrixCellStyle}>
                  <AlertFilledIcon
                    type={t}
                    size="large"
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
    <StoryDocsPage title="Filled icon" description="Solid 아이콘 기반 알림 컴포넌트 가이드입니다.">
      <StoryDocsSection title="개요">
        <StoryDocsParagraph>
          면(Solid) 아이콘 기반 알림입니다. <StoryDocsInlineCode>size</StoryDocsInlineCode> 로{" "}
          <StoryDocsInlineCode>small</StoryDocsInlineCode>(한 줄) ·{" "}
          <StoryDocsInlineCode>medium</StoryDocsInlineCode>(제목+본문 2단) ·{" "}
          <StoryDocsInlineCode>large</StoryDocsInlineCode>(H1+본문+구분선+추가 본문) 타이포를
          바꿉니다. 매트릭스는 Simple · Title + body · Detailed 세 행으로 Type 5열을 표시합니다.
        </StoryDocsParagraph>
      </StoryDocsSection>

      <StoryDocsSection title="size">
        <div style={guideBlockStyle}>
          <table style={guideTableStyle}>
            <thead>
              <tr>
                <th style={thStyle}>size</th>
                <th style={thStyle}>설명</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={tdStyle}>
                  <StoryDocsInlineCode>small</StoryDocsInlineCode>
                </td>
                <td style={tdStyle}>
                  아이콘 + 한 줄 메시지 (Matrix <strong>Simple</strong> 행).
                </td>
              </tr>
              <tr>
                <td style={tdStyle}>
                  <StoryDocsInlineCode>medium</StoryDocsInlineCode>
                </td>
                <td style={tdStyle}>
                  <StoryDocsInlineCode>title</StoryDocsInlineCode> +{" "}
                  <StoryDocsInlineCode>message</StoryDocsInlineCode> (Matrix{" "}
                  <strong>Title + body</strong> 행).
                </td>
              </tr>
              <tr>
                <td style={tdStyle}>
                  <StoryDocsInlineCode>large</StoryDocsInlineCode>
                </td>
                <td style={tdStyle}>
                  <StoryDocsInlineCode>title</StoryDocsInlineCode> +{" "}
                  <StoryDocsInlineCode>message</StoryDocsInlineCode> + divider +{" "}
                  <StoryDocsInlineCode>extraMessage</StoryDocsInlineCode> (Matrix{" "}
                  <strong>Detailed</strong> 행).
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </StoryDocsSection>

      <StoryDocsSection title="코드 예시">
        <StoryDocsCode>{`import { AlertFilledIcon } from "@/components/Alert/filledicon";

<AlertFilledIcon type="info" size="small" message="A simple alert—check it out!" />

<AlertFilledIcon
  type="info"
  size="medium"
  title="A simple alert—check it out!"
  message="Repeated body for wrap…"
/>

<AlertFilledIcon
  type="success"
  size="large"
  title="Well done!"
  message="Long body…"
  extraMessage="Secondary body…"
/>`}</StoryDocsCode>
      </StoryDocsSection>
    </StoryDocsPage>
  ),
};
