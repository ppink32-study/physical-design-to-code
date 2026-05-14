import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import type { CSSProperties, ReactNode } from "react";

import {
  TextArea,
  type TextAreaForcedState,
  type TextAreaTone,
} from "./textarea";
import { FigmaLinkCard } from "@/stories/figma-link-card";
import {
  storyDocsGuideTableStyle,
  storyDocsGuideTdStyle,
  storyDocsGuideThStyle,
  storyMatrixColHeaderStyle,
  storyMatrixRowHeaderTopStyle,
  storyMatrixCellTopStyle,
  storyMatrixScrollWrap,
  storyMatrixStickyCornerStyle,
  storyMatrixTableBase,
} from "@/stories/story-matrix-table-styles";
import {
  StoryDocsInlineCode,
  StoryDocsMatrixPage,
  StoryDocsPage,
  StoryDocsParagraph,
  StoryDocsSection,
  StoryPlaygroundFrame,
} from "@/stories/story-docs-shell";

const meta: Meta<typeof TextArea> = {
  title: "Components/Input/TextArea",
  component: TextArea,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Figma `TextArea` (node 4783:27389). tone, trailing 아이콘, resize 핸들, 오버레이 스크롤바를 지원합니다. `forceState` 는 Storybook 등에서 시각 상태를 고정할 때만 사용합니다.",
      },
    },
  },
  argTypes: {
    tone: { control: "inline-radio", options: ["normal", "success", "error"] },
    forceState: {
      control: "select",
      options: [undefined, "default", "focus", "filled", "disable", "readonly"],
    },
    trailingIcon: { control: "boolean" },
    resize: { control: "boolean" },
    placeholder: { control: "text" },
    disabled: { control: "boolean" },
    readOnly: { control: "boolean" },
  },
};

export default meta;

type Story = StoryObj<typeof TextArea>;

const fieldColumnStyle: CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: 8,
  width: 340,
};

const sectionLabelStyle: CSSProperties = {
  fontSize: 12,
  color: "var(--on-surface-hint)",
  marginBottom: 8,
  fontWeight: 500,
};

const sectionTitleStyle: CSSProperties = {
  fontSize: 14,
  fontWeight: 600,
  marginBottom: 12,
  color: "var(--on-surface-base)",
};

const SectionFrame = ({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) => (
  <section>
    <h3 style={sectionTitleStyle}>{title}</h3>
    {children}
  </section>
);

const forceStates = [
  "default",
  "focus",
  "filled",
  "disable",
  "readonly",
] as const;

const MATRIX_TYPE_COLUMNS = [
  { id: "normal", label: "Normal" },
  { id: "success", label: "Success" },
  { id: "error", label: "Error" },
] as const;

const matrixColHeaderStyle = storyMatrixColHeaderStyle;
const matrixRowHeaderStyle = storyMatrixRowHeaderTopStyle;
const matrixCellStyle = storyMatrixCellTopStyle;
const matrixStickyCornerStyle = storyMatrixStickyCornerStyle;
const matrixTableBase = storyMatrixTableBase;
const matrixScrollWrap = storyMatrixScrollWrap;

function matrixTextValue(state: TextAreaForcedState): string {
  if (state === "disable") return "";
  if (state === "filled" || state === "focus" || state === "readonly") {
    return "Text";
  }
  return "";
}

function MatrixTextAreaCell({
  state,
  tone,
}: {
  state: TextAreaForcedState;
  tone: TextAreaTone;
}) {
  return (
    <TextArea
      tone={tone}
      forceState={state}
      placeholder="Text"
      defaultValue={matrixTextValue(state)}
      disabled={state === "disable"}
      readOnly={state === "readonly"}
    />
  );
}

export const Playground: Story = {
  decorators: [
    (Story) => (
      <StoryPlaygroundFrame>
        <Story />
      </StoryPlaygroundFrame>
    ),
  ],
  args: {
    tone: "normal",
    placeholder: "Text",
    trailingIcon: true,
    resize: true,
  },
};

export const Matrix: Story = {
  name: "Matrix",
  parameters: { layout: "padded" },
  render: (_args, ctx) => {
    const locale = ctx.globals && ctx.globals.locale === "en" ? "en" : "ko";
    return (
    <StoryDocsMatrixPage
      title="TextArea"
      description={locale === "en"
        ? "Compares state rows × Normal · Success · Error tone columns, including resize · trailing · long body examples."
        : "상태 행과 Normal·Success·Error tone 열을 비교하고, resize·trailing·긴 본문 예시를 포함합니다."}
      figmaNode="4783-27558"
    >
      <FigmaLinkCard
        nodeId="4783-27558"
        caption="Components / Input · TextArea — Size × State 매트릭스 원본"
      />
      <div style={matrixScrollWrap}>
        <table style={matrixTableBase}>
          <thead>
            <tr>
              <th
                style={{
                  ...matrixColHeaderStyle,
                  ...matrixStickyCornerStyle,
                  minWidth: 120,
                  zIndex: 2,
                }}
              />
              {MATRIX_TYPE_COLUMNS.map((col) => (
                <th key={col.id} style={matrixColHeaderStyle}>
                  {col.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {forceStates.map((st) => (
              <tr key={st}>
                <th
                  scope="row"
                  style={{
                    ...matrixRowHeaderStyle,
                    ...matrixStickyCornerStyle,
                  }}
                >
                  {st}
                </th>
                {MATRIX_TYPE_COLUMNS.map((col) => (
                  <td key={col.id} style={matrixCellStyle}>
                    <MatrixTextAreaCell state={st} tone={col.id} />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <SectionFrame title="추가 확인 — resize · trailing · 긴 본문">
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div>
            <div style={sectionLabelStyle}>Resize off</div>
            <div style={fieldColumnStyle}>
              <TextArea placeholder="Text" resize={false} />
            </div>
          </div>
          <div>
            <div style={sectionLabelStyle}>Trailing 아이콘 off</div>
            <div style={fieldColumnStyle}>
              <TextArea placeholder="Text" trailingIcon={false} />
            </div>
          </div>
          <div>
            <div style={sectionLabelStyle}>스크롤 — 긴 본문</div>
            <div style={fieldColumnStyle}>
              <TextArea
                defaultValue="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur."
              />
            </div>
          </div>
        </div>
      </SectionFrame>
    </StoryDocsMatrixPage>
    );
  },
};

const guideBlockStyle: CSSProperties = {
  padding: 16,
  borderRadius: 8,
  border: "1px solid var(--border-surface)",
  background: "var(--bg-surface-base)",
};

const guideTableStyle = storyDocsGuideTableStyle;
const thStyle = storyDocsGuideThStyle;
const tdStyle = storyDocsGuideTdStyle;

export const Guideline: Story = {
  name: "Guideline",
  parameters: {
    layout: "padded",
    controls: { hideNoControlsWarning: true, disable: true },
    actions: { disable: true },
  },
  render: () => (
    <StoryDocsPage title="TextArea" description="여러 줄 입력 컴포넌트 가이드입니다.">
      <StoryDocsSection title="개요">
        <StoryDocsParagraph>
          여러 줄 본문 입력에 사용합니다. 기본 너비 340px · 높이 80px이며{" "}
          <StoryDocsInlineCode>width</StoryDocsInlineCode> /{" "}
          <StoryDocsInlineCode>height</StoryDocsInlineCode> 로 덮어쓸 수 있습니다.
        </StoryDocsParagraph>
      </StoryDocsSection>

      <StoryDocsSection title="주요 옵션">
        <div style={guideBlockStyle}>
          <table style={guideTableStyle}>
            <thead>
              <tr>
                <th style={thStyle}>옵션</th>
                <th style={thStyle}>설명</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={tdStyle}>
                  <code>tone</code>
                </td>
                <td style={tdStyle}>
                  <code>normal</code> / <code>success</code> /{" "}
                  <code>error</code>
                </td>
              </tr>
              <tr>
                <td style={tdStyle}>
                  <code>resize</code>
                </td>
                <td style={tdStyle}>
                  우측 하단 리사이즈 핸들 표시 여부 (기본 on).
                </td>
              </tr>
              <tr>
                <td style={tdStyle}>
                  <code>trailingIcon</code>
                </td>
                <td style={tdStyle}>
                  tone 별 기본 정보 아이콘. <code>false</code> 로 비활성화.
                </td>
              </tr>
              <tr>
                <td style={tdStyle}>
                  <code>forceState</code>
                </td>
                <td style={tdStyle}>
                  Storybook 전용 시각 고정. 프로덕션에서는 생략 권장.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </StoryDocsSection>

    </StoryDocsPage>
  ),
};
