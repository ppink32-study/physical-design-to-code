import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import type { CSSProperties } from "react";

import { InputChip } from "../chips/input-chip/input-chip";
import { Label } from "../label/label";
import { InlineMessage, type InlineMessageType } from "./inlinemessage";
import {
  Input,
  INPUT_WRAPPER_DEFAULT_WIDTH_PX,
  type InputForcedState,
  type InputSize,
} from "./input";
import { TextArea } from "./textarea";
import { FigmaLinkCard } from "@/stories/figma-link-card";
import {
  StoryDocsCode,
  StoryDocsMatrixPage,
  StoryDocsPage,
  StoryDocsParagraph,
  StoryDocsSection,
  StoryPlaygroundFrame,
} from "@/stories/story-docs-shell";

/* =================================================================
 * Meta
 *   title: "Components/Input" 아래 4개 스토리.
 *     ├─ Default (Docs Primary + Controls)
 *     ├─ Matrix
 *     └─ Guidelines
 *   + autodocs 로 사이드바 상단에 "Docs" 페이지가 자동 생성된다.
 *     (Docs 타이틀 옆 Figma 버튼은 전역 DocsPageWithFigma 로 주입됨.)
 * =============================================================== */
const meta: Meta<typeof Input> = {
  title: "Components/Input",
  component: Input,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Figma `Input` (node [4771:26367](https://www.figma.com/design/myQPboBEUAPxUwlvH9MH2R/Physical-AI-Platfrom-Design-Guideline?node-id=4771-26367&m=dev), Anatomy 12210:7424). **Matrix** 는 상단 표(Size×State × Type)와 하단 **In-line Message**·**In-line Counter** 매트릭스를 포함합니다. `forceState` 는 Storybook 전용 시각 고정입니다.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    size: { control: "inline-radio", options: ["medium", "large"] },
    tone: { control: "inline-radio", options: ["normal", "success", "error"] },
    forceState: {
      control: "select",
      options: [undefined, "default", "focus", "filled", "disable", "readonly"],
    },
    type: { control: "text" },
    leadingIcon: { control: "boolean" },
    trailingIcon: { control: "boolean" },
    clearable: { control: "boolean" },
    counter: { control: "boolean" },
    passwordToggle: { control: "boolean" },
    placeholder: { control: "text" },
    disabled: { control: "boolean" },
    readOnly: { control: "boolean" },
  },
  args: {
    size: "medium",
    tone: "normal",
    placeholder: "Text",
    leadingIcon: true,
    trailingIcon: true,
  },
};
export default meta;

type Story = StoryObj<typeof Input>;

/* =================================================================
 * Layout helpers (Badge 스토리와 동일 토큰·패턴)
 * =============================================================== */
const rowStyle: CSSProperties = {
  display: "flex",
  gap: 12,
  alignItems: "center",
  flexWrap: "wrap",
};

const fieldColumnStyle: CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: 8,
  width: 280,
};

const sectionLabelStyle: CSSProperties = {
  fontSize: 12,
  color: "var(--context-foreground-surface-on-surface-hint)",
  marginBottom: 8,
  fontWeight: 500,
};

const forceStates = [
  "default",
  "focus",
  "filled",
  "disable",
  "readonly",
] as const;
const sizes = ["medium", "large"] as const;

/** 칩 매트릭스 셀 — Input 토큰과 동일한 border/focus/disable 패턴 */
const chipFieldInputSlotStyle: CSSProperties = {
  flex: "1 1 72px",
  minWidth: 72,
  minHeight: 24,
  border: 0,
  outline: 0,
  background: "transparent",
  padding: 0,
  margin: 0,
  fontFamily: "var(--font-family-korean)",
  fontSize: "var(--font-size-body-base, 14px)",
  lineHeight: "var(--font-line-height-sm, 20px)",
  color: "var(--context-foreground-surface-on-surface-base, #141518)",
};

function chipMatrixShellStyle(
  state: InputForcedState,
  size: InputSize,
  layout: "1line" | "2line",
): CSSProperties {
  const minH = size === "large" ? 40 : 32;
  const tall2Line =
    layout === "2line" &&
    (state === "filled" || state === "readonly" || state === "disable");

  const borderDefault =
    "1px solid var(--border-border-surface-border-surface, #d7d8dc)";
  const shell: CSSProperties = {
    display: "flex",
    flexWrap: layout === "1line" ? "nowrap" : "wrap",
    gap: 4,
    alignItems: "center",
    /* 칩 필드: 좌우 8px — large 는 Input large(40) 와 맞춰 상하 3px */
    padding: size === "large" ? "3px 8px" : "4px 8px",
    boxSizing: "border-box",
    backgroundColor:
      "var(--context-background-surface-bg-surface-base, #ffffff)",
    border: borderDefault,
    borderRadius: "var(--radius-md, 6px)",
    width: INPUT_WRAPPER_DEFAULT_WIDTH_PX,
    minHeight: tall2Line ? minH + 28 : minH,
    overflow: layout === "1line" ? "hidden" : "visible",
    boxShadow: "none",
    transition:
      "border-color 120ms ease, box-shadow 120ms ease, background-color 120ms ease",
  };

  if (state === "focus") {
    shell.border = "1px solid var(--border-border-primary, #5cc7d0)";
    shell.boxShadow =
      "0 0 0 4px var(--color-opacity-primary-15, rgba(67, 198, 193, 0.15))";
    shell.cursor = "text";
  } else if (state === "disable") {
    shell.backgroundColor =
      "var(--context-background-surface-bg-surface-base-disabled, #f4f4f5)";
    shell.border =
      "1px solid var(--border-border-surface-border-surface-disabled, #d7d8dc)";
    shell.cursor = "not-allowed";
  } else if (state === "readonly") {
    shell.backgroundColor =
      "var(--context-background-surface-bg-surface-secondary, #f4f4f5)";
    shell.border = borderDefault;
    shell.cursor = "default";
  } else {
    shell.cursor = "text";
  }

  return shell;
}

/** Figma Matrix 열 Chip 1line / Chip 2line */
function MatrixChipField({
  size,
  state,
  layout,
}: {
  size: InputSize;
  state: InputForcedState;
  layout: "1line" | "2line";
}) {
  const chipSize = size === "large" ? "large" : "medium";
  const showChips =
    state === "filled" || state === "readonly" || state === "disable";
  const chipLabels = showChips
    ? layout === "2line"
      ? ["Tag1", "Tag2", "Tag Name 긴 경우", "Tag4"]
      : ["Tag1", "Tag2", "Tag3"]
    : [];
  const chipState =
    state === "disable"
      ? "disable"
      : state === "readonly"
        ? "readonly"
        : "default";

  const inputDisabled = state === "disable";
  const inputReadOnly = state === "readonly";

  return (
    <div style={chipMatrixShellStyle(state, size, layout)}>
      {chipLabels.map((t) => (
        <InputChip key={t} size={chipSize} closeIcon state={chipState}>
          {t}
        </InputChip>
      ))}
      <input
        type="text"
        placeholder="Add Tag"
        aria-label="태그 추가"
        disabled={inputDisabled}
        readOnly={inputReadOnly}
        style={{
          ...chipFieldInputSlotStyle,
          ...(inputDisabled
            ? {
                color:
                  "var(--context-foreground-surface-on-surface-disabled, #b3b4bc)",
                cursor: "not-allowed",
              }
            : {}),
          ...(inputReadOnly ? { cursor: "default" } : {}),
        }}
      />
    </div>
  );
}

const matrixColHeaderStyle: CSSProperties = {
  fontSize: 11,
  fontWeight: 600,
  letterSpacing: "0.04em",
  textAlign: "left",
  padding: "10px 12px",
  borderBottom:
    "1px solid var(--border-border-surface-border-surface-secondary)",
  color: "#7c3aed",
  whiteSpace: "nowrap",
};

const matrixRowHeaderStyle: CSSProperties = {
  fontSize: 12,
  fontWeight: 600,
  color: "var(--context-foreground-surface-on-surface-secondary)",
  padding: "12px 16px 12px 0",
  whiteSpace: "nowrap",
  verticalAlign: "middle",
  borderBottom:
    "1px solid var(--border-border-surface-border-surface-secondary)",
};

const matrixCellStyle: CSSProperties = {
  padding: "12px 16px",
  verticalAlign: "middle",
  borderBottom:
    "1px solid var(--border-border-surface-border-surface-secondary)",
};

const MATRIX_COLUMNS = [
  { id: "normal", header: "Normal" },
  { id: "success", header: "Success" },
  { id: "error", header: "Error" },
  { id: "password", header: "Password" },
  { id: "chip1", header: "Chip 1line" },
  { id: "chip2", header: "Chip 2line" },
] as const;

type MatrixColumnId = (typeof MATRIX_COLUMNS)[number]["id"];

const matrixStickyCornerStyle: CSSProperties = {
  position: "sticky",
  left: 0,
  zIndex: 1,
  background: "var(--context-background-surface-bg-surface-base)",
  boxShadow: "6px 0 12px -8px rgba(20, 21, 24, 0.12)",
};

/** Figma 매트릭스 보라 라벨 (In-line Message / Counter 구역) */
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
  return type === "loading" ? "Processing" : type.charAt(0).toUpperCase() + type.slice(1);
}

function matrixTextValue(state: InputForcedState): string {
  if (state === "disable") return "";
  if (state === "filled" || state === "focus" || state === "readonly") {
    return "Text";
  }
  return "";
}

function MatrixToneInputCell({
  size,
  state,
  tone,
}: {
  size: InputSize;
  state: InputForcedState;
  tone: "normal" | "success" | "error";
}) {
  return (
    <Input
      size={size}
      tone={tone}
      type="text"
      forceState={state}
      placeholder="Text"
      defaultValue={matrixTextValue(state)}
      disabled={state === "disable"}
      readOnly={state === "readonly"}
      clearable={state === "focus"}
    />
  );
}

function MatrixPasswordCell({
  size,
  state,
}: {
  size: InputSize;
  state: InputForcedState;
}) {
  const secret =
    state === "filled" || state === "focus" || state === "readonly";
  return (
    <Input
      size={size}
      tone="normal"
      type="password"
      forceState={state}
      placeholder="Password"
      defaultValue={secret ? "secret" : ""}
      disabled={state === "disable"}
      readOnly={state === "readonly"}
      clearable={state === "focus"}
    />
  );
}

function MatrixCell({
  size,
  state,
  column,
}: {
  size: InputSize;
  state: InputForcedState;
  column: MatrixColumnId;
}) {
  switch (column) {
    case "normal":
      return <MatrixToneInputCell size={size} state={state} tone="normal" />;
    case "success":
      return <MatrixToneInputCell size={size} state={state} tone="success" />;
    case "error":
      return <MatrixToneInputCell size={size} state={state} tone="error" />;
    case "password":
      return <MatrixPasswordCell size={size} state={state} />;
    case "chip1":
      return <MatrixChipField size={size} state={state} layout="1line" />;
    case "chip2":
      return <MatrixChipField size={size} state={state} layout="2line" />;
  }
}

/* =================================================================
 * 0. Default — Docs Primary + Controls
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
 * 1. Matrix
 *   표: Size×State × Type. 하단: In-line Message 5종 + Counter 3종 (Figma 매트릭스).
 * =============================================================== */
export const Matrix: Story = {
  name: "Matrix",
  parameters: { layout: "padded" },
  render: () => (
    <StoryDocsMatrixPage
      title="Input"
      description="Medium·Large별 상태 행과 Normal·Success·Error·Password·Chip·In-line Message·Counter 열을 Figma 매트릭스와 동일한 축으로 비교합니다."
      figmaNode="4771-26367"
    >
      <FigmaLinkCard
        nodeId="4771-26367"
        caption="Components / Input — Variant × Size × State 매트릭스 원본"
      />
      <div
        style={{
          overflowX: "auto",
          paddingBottom: 8,
          marginLeft: -8,
          marginRight: -8,
          paddingLeft: 8,
          paddingRight: 8,
        }}
      >
        <table
          style={{
            borderCollapse: "collapse",
            width: "max-content",
            background: "var(--context-background-surface-bg-surface-base)",
          }}
        >
          <thead>
            <tr>
              <th
                style={{
                  ...matrixColHeaderStyle,
                  ...matrixStickyCornerStyle,
                  minWidth: 148,
                  zIndex: 2,
                }}
              />
              {MATRIX_COLUMNS.map((col) => (
                <th key={col.id} style={matrixColHeaderStyle}>
                  {col.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {sizes.flatMap((sz) => [
              <tr key={`${sz}-band`}>
                <td
                  colSpan={1 + MATRIX_COLUMNS.length}
                  style={{
                    padding: "14px 12px 6px",
                    fontSize: 11,
                    fontWeight: 700,
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    color:
                      "var(--context-foreground-surface-on-surface-hint)",
                    borderBottom:
                      "1px solid var(--border-border-surface-border-surface)",
                  }}
                >
                  {sz === "medium" ? "Medium (32px)" : "Large (40px)"}
                </td>
              </tr>,
              ...forceStates.map((st) => (
                <tr key={`${sz}-${st}`}>
                  <th
                    scope="row"
                    style={{
                      ...matrixRowHeaderStyle,
                      ...matrixStickyCornerStyle,
                    }}
                  >
                    <span style={{ fontWeight: 600 }}>{sz}</span>
                    <span
                      style={{
                        color:
                          "var(--context-foreground-surface-on-surface-hint)",
                        fontWeight: 500,
                      }}
                    >
                      {" "}
                      · {st}
                    </span>
                  </th>
                  {MATRIX_COLUMNS.map((col) => (
                    <td key={col.id} style={matrixCellStyle}>
                      <MatrixCell size={sz} state={st} column={col.id} />
                    </td>
                  ))}
                </tr>
              )),
            ])}
          </tbody>
        </table>
      </div>

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: 48,
          alignItems: "flex-start",
          marginTop: 8,
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
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 4,
                  width: INPUT_WRAPPER_DEFAULT_WIDTH_PX,
                }}
              >
                <Input
                  size="medium"
                  tone="normal"
                  placeholder="Text"
                  leadingIcon
                  trailingIcon
                />
                <InlineMessage type={t} text="In-line message." />
              </div>
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
            <Input
              placeholder="Text"
              counter
              maxLength={50}
              leadingIcon={false}
              trailingIcon={false}
            />
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
            <Input
              placeholder="Text"
              counter
              maxLength={50}
              defaultValue="T"
              leadingIcon={false}
              trailingIcon={false}
            />
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
            <Input
              tone="error"
              counter={{ current: 51, max: 50 }}
              defaultValue="Lorem ipsum dolor sit amet consectetur adipiscing elit, sed do."
              leadingIcon={false}
            />
          </div>
        </div>
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

/** Figma 12210:7424 Common 영역과 동일한 세로 스택(간격 4px). PNG는 public 에 두고 img 주석 해제. */
const FIGMA_INPUT_ANATOMY_PNG = "/guidelines/input-anatomy-12210-7424.png";

function FigmaAnatomyLivePreview() {
  const surface: CSSProperties = {
    ...guideBlockStyle,
    marginBottom: 16,
    background: "rgba(244, 244, 245, 0.72)",
    border:
      "1px solid var(--border-border-neutral-border-neutral-secondary, #ececee)",
    padding: 24,
  };
  const col: CSSProperties = {
    display: "flex",
    flexDirection: "column",
    gap: 4,
    alignItems: "flex-start",
  };
  const row: CSSProperties = {
    display: "flex",
    flexWrap: "wrap",
    gap: 40,
    alignItems: "flex-start",
  };
  return (
    <div>
      <div style={surface}>
        <p
          style={{
            ...sectionLabelStyle,
            marginTop: 0,
            marginBottom: 12,
          }}
        >
          Common — Figma와 동일 구성(라이브)
        </p>
        <div style={row}>
          <div style={col}>
            <Label size="small" mandatory infoIcon={false} label="Label" />
            <Input
              size="medium"
              forceState="focus"
              defaultValue="Text"
              counter={{ max: 50, current: 1 }}
              leadingIcon
              trailingIcon
              clearable
            />
            <InlineMessage type="info" text="In-line message." />
          </div>
          <div style={col}>
            <Label size="small" mandatory infoIcon={false} label="Label" />
            <TextArea placeholder="Text" trailingIcon />
            <InlineMessage type="info" text="In-line message." />
          </div>
        </div>
      </div>
      <p
        style={{
          margin: "0 0 8px",
          fontSize: 12,
          lineHeight: 1.5,
          color: "var(--context-foreground-surface-on-surface-hint)",
        }}
      >
        픽셀 단위로 Figma 캡처를 쓰려면 해당 프레임을 PNG로보낸 뒤{" "}
        <code>public{FIGMA_INPUT_ANATOMY_PNG}</code> 에 저장하고, 아래{" "}
        <code>img</code> 줄의 주석을 제거하세요.
      </p>
      {/* Figma PNG 배치 후 주석 해제
      <img
        src={FIGMA_INPUT_ANATOMY_PNG}
        alt="Figma Input Anatomy (node 12210:7424)"
        style={{
          maxWidth: "100%",
          height: "auto",
          display: "block",
          borderRadius: 6,
          border: "1px solid var(--border-border-surface-border-surface)",
        }}
      />
      */}
    </div>
  );
}

export const Guideline: Story = {
  name: "Guideline",
  parameters: {
    layout: "padded",
    controls: { hideNoControlsWarning: true, disable: true },
    actions: { disable: true },
  },
  render: () => (
    <StoryDocsPage title="Input" description="한 줄 텍스트 입력 필드 가이드입니다.">
      <StoryDocsSection title="개요">
        <StoryDocsParagraph>
          한 줄 텍스트 입력 필드입니다. 검색·로그인·폼 레이블과 함께 쓰이며, tone 과 trailing
          아이콘으로 검증 결과를 시각적으로 전달합니다.
        </StoryDocsParagraph>
      </StoryDocsSection>

      <StoryDocsSection title="Figma 가이드 — Anatomy · Common">
        <p style={{ margin: "0 0 12px", fontSize: 13, lineHeight: 1.6 }}>
          아래 항목은{" "}
          <a
            href="https://www.figma.com/design/myQPboBEUAPxUwlvH9MH2R/Physical-AI-Platfrom-Design-Guideline?node-id=12210-7424&m=dev"
            target="_blank"
            rel="noreferrer"
            style={{ color: "var(--context-foreground-primary-on-primary-base)" }}
          >
            Physical AI Platform Design Guideline — Input Anatomy
          </a>{" "}
          (node <code>12210:7424</code>)의 Common 섹션을 한국어로 정리한 것입니다.
        </p>

        <FigmaAnatomyLivePreview />

        <div style={guideBlockStyle}>
          <p
            style={{
              margin: "0 0 12px",
              fontSize: 13,
              fontWeight: 600,
              color: "var(--context-foreground-surface-on-surface-base)",
            }}
          >
            구성 요소
          </p>
          <ol
            style={{
              margin: 0,
              paddingLeft: 22,
              fontSize: 13,
              lineHeight: 1.65,
              color: "var(--context-foreground-surface-on-surface-base)",
              listStyleType: "decimal",
            }}
          >
            <li style={{ marginBottom: 8 }}>
              <strong>리딩 아이콘</strong> — medium <strong>16px</strong>, large{" "}
              <strong>20px</strong>
            </li>
            <li style={{ marginBottom: 8 }}>
              <strong>입력 텍스트</strong>
            </li>
            <li style={{ marginBottom: 8 }}>
              <strong>입력 내용 삭제 아이콘</strong> — medium <strong>16px</strong>
              , large <strong>18px</strong>
            </li>
            <li style={{ marginBottom: 8 }}>
              <strong>트레일링 아이콘</strong> — medium <strong>16px</strong>, large{" "}
              <strong>20px</strong>
            </li>
            <li style={{ marginBottom: 8 }}>
              <strong>인라인 메시지</strong>
              <ul
                style={{
                  margin: "6px 0 0",
                  paddingLeft: 18,
                  listStyleType: "disc",
                }}
              >
                <li style={{ marginBottom: 4 }}>
                  <strong>인라인 메시지 아이콘</strong> — <strong>16px</strong>
                </li>
                <li>
                  <strong>인라인 메시지 텍스트</strong>
                </li>
              </ul>
            </li>
            <li style={{ marginBottom: 8 }}>
              <strong>스크롤</strong> (여러 줄 텍스트 영역)
            </li>
            <li style={{ marginBottom: 8 }}>
              <strong>텍스트 영역 리사이즈 아이콘</strong> — <strong>16px</strong>
            </li>
            <li style={{ marginBottom: 8 }}>
              <strong>레이블 · 텍스트 필드 · 인라인 메시지</strong> 사이 세로 간격{" "}
              <strong>4px</strong>
            </li>
            <li style={{ marginBottom: 8 }}>
              <strong>글자 수 카운터</strong>
            </li>
            <li style={{ marginBottom: 0 }}>
              <strong>기본 너비</strong> — 목록·데이터 테이블 뷰에서 쓰는 필터 등은
              고정된 기본 너비를 사용합니다. (*콘텐츠 영역에서는 내용에 맞게 너비를
              조정할 수 있습니다.)
              <br />
              <span style={{ marginTop: 6, display: "inline-block" }}>
                · 검색(Search) 박스: <strong>240px</strong> (고정) — 디자인 상 표기:{" "}
                <em>Search Box — Default Width: 240px</em>
              </span>
            </li>
          </ol>
          <p
            style={{
              margin: "16px 0 8px",
              fontSize: 13,
              fontWeight: 600,
              color: "var(--context-foreground-surface-on-surface-base)",
            }}
          >
            Tag (같은 문서 섹션 요약)
          </p>
          <ol
                style={{
              margin: 0,
              paddingLeft: 22,
              fontSize: 13,
              lineHeight: 1.65,
              color: "var(--context-foreground-surface-on-surface-base)",
            }}
          >
            <li style={{ marginBottom: 8 }}>
              새 태그 추가: 입력 영역을 클릭한 뒤 태그 이름을 입력하고{" "}
              <kbd>Enter</kbd>를 누르면 새 태그가 만들어집니다.
            </li>
            <li style={{ marginBottom: 8 }}>
              이미 태그가 있으면 입력 필드를 클릭했을 때 기존 태그 목록이 드롭다운으로
              표시됩니다.
            </li>
            <li style={{ marginBottom: 8 }}>
              입력값으로 새 태그가 만들어지면 입력 필드 앞쪽에 붙고, 같은 방식으로
              이어서 추가 태그를 만들 수 있습니다.
            </li>
            <li style={{ marginBottom: 0 }}>
              목록에 보이는 태그는 클릭해 선택할 수 있으며, 항목에 마우스를 올리면
              휴지통 아이콘이 나타나 삭제할 수 있습니다.
            </li>
          </ol>
          </div>
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
                  <code>size</code>
                </td>
                <td style={tdStyle}>
                  <code>medium</code> (32px) · <code>large</code> (40px) 높이.
                </td>
              </tr>
              <tr>
                <td style={tdStyle}>
                  <code>width</code>
                </td>
                <td style={tdStyle}>
                  래퍼 기본 너비 <code>{INPUT_WRAPPER_DEFAULT_WIDTH_PX}px</code>.
                  숫자·문자열로 덮어쓸 수 있으며, <code>style.width</code> 로도
                  조정 가능합니다.
                </td>
              </tr>
              <tr>
                <td style={tdStyle}>
                  <code>tone</code>
                </td>
                <td style={tdStyle}>
                  <code>normal</code> / <code>success</code> /{" "}
                  <code>error</code> — 테두리·아이콘 톤 연동.
                </td>
              </tr>
              <tr>
                <td style={tdStyle}>
                  <code>leadingIcon</code> · <code>trailingIcon</code>
                </td>
                <td style={tdStyle}>
                  기본은 검색(leading) + tone 별 정보 아이콘(trailing).{" "}
                  <code>false</code> 로 끌 수 있습니다.
                </td>
              </tr>
              <tr>
                <td style={tdStyle}>
                  <code>counter</code>
                </td>
                <td style={tdStyle}>
                  <code>true</code> 또는 <code>{"{ current, max }"}</code> 로
                  인라인 글자 수 표시. 초과 시 카운터가 error 색으로 강조됩니다.
                </td>
              </tr>
              <tr>
                <td style={tdStyle}>
                  <code>clearable</code>
                </td>
                <td style={tdStyle}>
                  포커스/입력값이 있을 때 우측 클리어(x) 버튼 표시.
                </td>
              </tr>
              <tr>
                <td style={tdStyle}>
                  <code>type=&quot;password&quot;</code>
                </td>
                <td style={tdStyle}>
                  비밀번호 필드 + eye 토글(<code>passwordToggle</code>, 기본
                  on).
                </td>
              </tr>
              <tr>
                <td style={tdStyle}>
                  <code>forceState</code>
                </td>
                <td style={tdStyle}>
                  Storybook 전용 시각 고정용. 프로덕션에서는 사용하지 않는 것을
                  권장합니다.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </StoryDocsSection>

      <StoryDocsSection title="코드 예시">
        <StoryDocsCode>{`import { Input } from "@/components/Input/input";

<Input size="medium" tone="normal" placeholder="Text" />

<Input tone="error" counter={{ current: 51, max: 50 }} defaultValue="…" />

<Input type="password" placeholder="Password" leadingIcon={false} />`}</StoryDocsCode>
      </StoryDocsSection>
    </StoryDocsPage>
  ),
};
