import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import type { CSSProperties, ReactNode } from "react";

import { Select, type SelectProps, type SelectTone } from "./select";
import { InputChip } from "../chips/input-chip/input-chip";
import { FigmaLinkCard } from "@/stories/figma-link-card";
import {
  storyMatrixCellStyle,
  storyMatrixColHeaderStyle,
  storyMatrixRowHeaderStyle,
  storyMatrixScrollWrap,
  storyMatrixStickyCornerStyle,
  storyMatrixTableBase,
} from "@/stories/story-matrix-table-styles";
import {
  StoryDocsCode,
  StoryDocsInlineCode,
  StoryDocsMatrixPage,
  StoryDocsPage,
  StoryDocsParagraph,
  StoryDocsSection,
  StoryPlaygroundFrame,
} from "@/stories/story-docs-shell";

const meta: Meta<typeof Select> = {
  title: "Components/Select",
  component: Select,
  parameters: {
    layout: "centered",
    docs: { disable: true },
  },
  argTypes: {
    size: { control: "radio", options: ["medium", "large"] },
    tone: { control: "radio", options: ["normal", "success", "error"] },
    type: { control: "radio", options: ["normal", "label"] },
    state: {
      control: "radio",
      options: [undefined, "default", "focus", "filled", "disable", "readonly"],
    },
    open: { control: "boolean" },
    multiline: { control: "boolean" },
    clearable: { control: "boolean" },
    moreCount: { control: { type: "number", min: 0, max: 99 } },
  },
  args: {
    size: "medium",
    tone: "normal",
    type: "normal",
    placeholder: "Text",
    label: "label",
  },
};
export default meta;
type Story = StoryObj<typeof Select>;

const sectionTitleStyle: CSSProperties = {
  fontSize: 14,
  fontWeight: 600,
  marginBottom: 12,
  color: "var(--context-foreground-surface-on-surface-base)",
};

const SectionFrame = ({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) => (
  <section style={{ marginTop: 24 }}>
    <h3 style={sectionTitleStyle}>{title}</h3>
    {children}
  </section>
);

const matrixScrollWrap = storyMatrixScrollWrap;
const matrixTableBase = storyMatrixTableBase;
const matrixColHeaderStyle = storyMatrixColHeaderStyle;
const matrixRowHeaderStyle = storyMatrixRowHeaderStyle;
const matrixStickyCornerStyle = storyMatrixStickyCornerStyle;
const matrixCellStyle: CSSProperties = {
  ...storyMatrixCellStyle,
  minWidth: 200,
  maxWidth: 280,
};

const CHIPS_MULTI = [
  <InputChip key="a">Text</InputChip>,
  <InputChip key="b">Text</InputChip>,
  <InputChip key="c">Text</InputChip>,
];

const TONE_COLS: Array<{ key: SelectTone | "label"; label: string }> = [
  { key: "normal", label: "Normal" },
  { key: "success", label: "Success" },
  { key: "error", label: "Error" },
  { key: "label", label: "Label" },
];

type RowKey =
  | "default"
  | "focus"
  | "filledSingle"
  | "filledMulti1"
  | "filledMulti2"
  | "disable"
  | "readonly";

const STATE_ROWS: Array<{ key: RowKey; label: string }> = [
  { key: "default", label: "Default" },
  { key: "focus", label: "Focus" },
  { key: "filledSingle", label: "Filled Single" },
  { key: "filledMulti1", label: "Filled Multiple 1line" },
  { key: "filledMulti2", label: "Filled Multiple 2line" },
  { key: "disable", label: "Disable" },
  { key: "readonly", label: "Readonly" },
];

function rowProps(row: RowKey): Partial<SelectProps> {
  switch (row) {
    case "default":
      return { placeholder: "Text", state: "default" };
    case "focus":
      return { placeholder: "Text", state: "focus" };
    case "filledSingle":
      return { value: "Option A", state: "filled" };
    case "filledMulti1":
      return {
        state: "filled",
        chips: CHIPS_MULTI,
        moreCount: 2,
        clearable: true,
      };
    case "filledMulti2":
      return {
        state: "filled",
        multiline: true,
        chips: CHIPS_MULTI,
        clearable: true,
      };
    case "disable":
      return { value: "Text", disabled: true };
    case "readonly":
      return { value: "Text", readOnly: true, state: "readonly" };
    default:
      return {};
  }
}

function cellProps(
  row: RowKey,
  col: SelectTone | "label",
): Partial<SelectProps> {
  const base = rowProps(row);
  if (col === "label") {
    return {
      ...base,
      type: "label",
      label: "label",
      tone: "normal",
    };
  }
  return { ...base, type: "normal", tone: col };
}

function SelectMatrixTable({ size }: { size: "medium" | "large" }) {
  return (
    <div style={matrixScrollWrap}>
      <table style={matrixTableBase}>
        <thead>
          <tr>
            <th
              style={{
                ...matrixColHeaderStyle,
                ...matrixStickyCornerStyle,
                minWidth: 160,
                zIndex: 2,
              }}
            />
            {TONE_COLS.map((c) => (
              <th key={c.key} scope="col" style={matrixColHeaderStyle}>
                {c.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {STATE_ROWS.map((r) => (
            <tr key={r.key}>
              <th
                scope="row"
                style={{
                  ...matrixRowHeaderStyle,
                  ...matrixStickyCornerStyle,
                }}
              >
                {r.label}
              </th>
              {TONE_COLS.map((c) => (
                <td key={`${r.key}-${c.key}`} style={matrixCellStyle}>
                  <Select size={size} {...cellProps(r.key, c.key)} />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export const Playground: Story = {
  decorators: [
    (Story) => (
      <StoryPlaygroundFrame>
        <div style={{ width: 280 }}>
          <Story />
        </div>
      </StoryPlaygroundFrame>
    ),
  ],
  args: {
    placeholder: "Select an option",
  },
};

export const Matrix: Story = {
  name: "Matrix",
  parameters: { layout: "padded" },
  render: () => (
    <StoryDocsMatrixPage
      title="Select"
      description="Figma Select box 매트릭스: 행은 상태(Default·Focus·Filled…), 열은 Normal·Success·Error·Label, Medium(32px)·Large(40px) 두 블록입니다."
      figmaNode="4811-29737"
    >
      <FigmaLinkCard
        nodeId="4811-29737"
        caption="Components / Select — Select box 매트릭스 원본"
      />
      <SectionFrame title="Medium (height 32px)">
        <SelectMatrixTable size="medium" />
      </SectionFrame>
      <SectionFrame title="Large (height 40px)">
        <SelectMatrixTable size="large" />
      </SectionFrame>
    </StoryDocsMatrixPage>
  ),
};

export const Guideline: Story = {
  name: "Guideline",
  parameters: {
    layout: "padded",
    controls: { hideNoControlsWarning: true, disable: true },
    actions: { disable: true },
  },
  render: () => (
    <StoryDocsPage title="Select" description="Select box(트리거) 컴포넌트 가이드입니다.">
      <StoryDocsSection title="개요">
        <StoryDocsParagraph>
          단일 값(<StoryDocsInlineCode>value</StoryDocsInlineCode>)·칩 다중(
          <StoryDocsInlineCode>chips</StoryDocsInlineCode> +{" "}
          <StoryDocsInlineCode>moreCount</StoryDocsInlineCode>)·
          <StoryDocsInlineCode>tone</StoryDocsInlineCode>·
          <StoryDocsInlineCode>type=&quot;label&quot;</StoryDocsInlineCode> 등은 Matrix 와
          Playground Controls 로 확인합니다.
        </StoryDocsParagraph>
      </StoryDocsSection>
      <StoryDocsSection title="코드 예시">
        <StoryDocsCode>{`import { Select } from "@/components/select/select";

<Select placeholder="Text" />
<Select tone="success" value="Valid" />
<Select type="label" label="label" value="Option A" />`}</StoryDocsCode>
      </StoryDocsSection>
    </StoryDocsPage>
  ),
};
