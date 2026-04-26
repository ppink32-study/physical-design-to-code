import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import type { CSSProperties } from "react";

import { Input, INPUT_WRAPPER_DEFAULT_WIDTH_PX } from "./input";
import { InlineMessage, type InlineMessageType } from "./inlinemessage";
import { FigmaLinkCard } from "@/stories/figma-link-card";
import {
  StoryDocsCode,
  StoryDocsMatrixPage,
  StoryDocsPage,
  StoryDocsParagraph,
  StoryDocsSection,
  StoryPlaygroundFrame,
} from "@/stories/story-docs-shell";

const meta: Meta<typeof InlineMessage> = {
  title: "Components/Input/InlineMessage",
  component: InlineMessage,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "필드 하단 보조 텍스트·검증 메시지. type: info / success / warning / error / loading. **Matrix** 는 Figma와 동일하게 In-line Message 5종 + In-line Counter( Input ) 3종을 점선 그룹으로 나열합니다.",
      },
    },
  },
  argTypes: {
    type: {
      control: "inline-radio",
      options: ["info", "success", "warning", "error", "loading"],
    },
    text: { control: "text" },
  },
  args: {
    type: "info",
    text: "In-line message.",
  },
};
export default meta;

type Story = StoryObj<typeof InlineMessage>;

const matrixFigmaSectionTitleStyle: CSSProperties = {
  fontSize: 12,
  fontWeight: 700,
  color: "#7c3aed",
  margin: "0 0 16px",
  letterSpacing: "0.03em",
};

const dashedMatrixGroupStyle: CSSProperties = {
  padding: "14px 16px",
  border: "1px dashed rgba(124, 58, 237, 0.42)",
  borderRadius: 8,
  marginBottom: 14,
};

const INLINE_MESSAGE_MATRIX_TYPES: InlineMessageType[] = [
  "info",
  "error",
  "warning",
  "success",
  "loading",
];

function inlineMessageMatrixRowLabel(type: InlineMessageType): string {
  return type === "loading"
    ? "Processing"
    : type.charAt(0).toUpperCase() + type.slice(1);
}

/* 0. Default — Docs Primary + Controls */
export const Playground: Story = {
  decorators: [
    (Story) => (
      <StoryPlaygroundFrame>
        <Story />
      </StoryPlaygroundFrame>
    ),
  ],
};

/* 1. Matrix — Figma: In-line Message 5종 + In-line Counter 3종 */
export const Matrix: Story = {
  name: "Matrix",
  parameters: { layout: "padded" },
  render: () => (
    <StoryDocsMatrixPage
      title="InlineMessage"
      description="타입별 인라인 메시지와 Input 인라인 카운터(0/50·1/50·초과)를 나란히 비교합니다."
      figmaNode="5983-232959"
    >
      <FigmaLinkCard
        nodeId="5983-232959"
        caption="Components / Input · InlineMessage — Type 매트릭스 원본"
      />

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: 48,
          alignItems: "flex-start",
        }}
      >
        <div style={{ flex: "1 1 280px", maxWidth: 400 }}>
          <h2 style={matrixFigmaSectionTitleStyle}>In-line Message</h2>
          {INLINE_MESSAGE_MATRIX_TYPES.map((t) => (
            <div key={t} style={dashedMatrixGroupStyle}>
              <div
                style={{
                  fontSize: 11,
                  fontWeight: 600,
                  color: "#7c3aed",
                  marginBottom: 10,
                  letterSpacing: "0.06em",
                  textTransform: "uppercase",
                }}
              >
                {inlineMessageMatrixRowLabel(t)}
              </div>
              <InlineMessage type={t} text="In-line message." />
            </div>
          ))}
        </div>

        <div style={{ flex: "1 1 280px", maxWidth: 400 }}>
          <h2 style={matrixFigmaSectionTitleStyle}>In-line Counter</h2>
          <div style={dashedMatrixGroupStyle}>
            <div
              style={{
                fontSize: 12,
                fontWeight: 600,
                color: "#7c3aed",
                marginBottom: 10,
              }}
            >
              Default
            </div>
            <div style={{ width: INPUT_WRAPPER_DEFAULT_WIDTH_PX }}>
              <Input
                placeholder="Text"
                counter
                maxLength={50}
                leadingIcon={false}
                trailingIcon={false}
              />
            </div>
          </div>
          <div style={dashedMatrixGroupStyle}>
            <div
              style={{
                fontSize: 12,
                fontWeight: 600,
                color: "#7c3aed",
                marginBottom: 10,
              }}
            >
              Above 1
            </div>
            <div style={{ width: INPUT_WRAPPER_DEFAULT_WIDTH_PX }}>
              <Input
                placeholder="Text"
                counter
                maxLength={50}
                defaultValue="T"
                leadingIcon={false}
                trailingIcon={false}
              />
            </div>
          </div>
          <div style={{ ...dashedMatrixGroupStyle, marginBottom: 0 }}>
            <div
              style={{
                fontSize: 12,
                fontWeight: 600,
                color: "#7c3aed",
                marginBottom: 10,
              }}
            >
              Error
            </div>
            <div style={{ width: INPUT_WRAPPER_DEFAULT_WIDTH_PX }}>
              <Input
                tone="error"
                counter={{ current: 51, max: 50 }}
                defaultValue="Lorem ipsum dolor sit amet consectetur adipiscing elit, sed do."
                leadingIcon={false}
              />
            </div>
          </div>
        </div>
      </div>
    </StoryDocsMatrixPage>
  ),
};

/* 2. Guidelines */
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
    <StoryDocsPage
      title="InlineMessage"
      description="필드 하단 보조·검증 메시지 컴포넌트 가이드입니다."
    >
      <StoryDocsSection title="개요">
        <StoryDocsParagraph>
          입력 필드 바로 아래에 짧은 설명·검증 결과·로딩 상태를 붙일 때
          사용합니다. 아이콘 16px + 본문, gap 4px 레이아웃입니다.
        </StoryDocsParagraph>
      </StoryDocsSection>

      <StoryDocsSection title="type 선택 기준">
        <div style={guideBlockStyle}>
          <table style={guideTableStyle}>
            <thead>
              <tr>
                <th style={thStyle}>type</th>
                <th style={thStyle}>쓰임</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={tdStyle}>
                  <InlineMessage type="info" text="info" />
                </td>
                <td style={tdStyle}>힌트·중립 안내.</td>
              </tr>
              <tr>
                <td style={tdStyle}>
                  <InlineMessage type="success" text="success" />
                </td>
                <td style={tdStyle}>저장 완료·조건 충족.</td>
              </tr>
              <tr>
                <td style={tdStyle}>
                  <InlineMessage type="warning" text="warning" />
                </td>
                <td style={tdStyle}>주의·재확인 요청.</td>
              </tr>
              <tr>
                <td style={tdStyle}>
                  <InlineMessage type="error" text="error" />
                </td>
                <td style={tdStyle}>검증 실패·차단 사유.</td>
              </tr>
              <tr>
                <td style={tdStyle}>
                  <InlineMessage type="loading" text="loading" />
                </td>
                <td style={tdStyle}>비동기 처리 중.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </StoryDocsSection>

      <StoryDocsSection title="코드 예시">
        <StoryDocsCode>{`import { InlineMessage } from "@/components/Input/inlinemessage";

<InlineMessage type="error" text="Invalid value." />`}</StoryDocsCode>
      </StoryDocsSection>
    </StoryDocsPage>
  ),
};
