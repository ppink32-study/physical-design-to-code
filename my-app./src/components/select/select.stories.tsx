import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { useState } from "react";

import { Select, type SelectProps } from "./select";
import { InputChip } from "../chips/input-chip/input-chip";
import { FigmaLinkCard } from "@/stories/figma-link-card";
import {
  StoryDocsMatrixPage,
  StoryDocsPage,
  StoryDocsParagraph,
  StoryDocsSection,
  StoryPlaygroundFrame,
} from "@/stories/story-docs-shell";

const meta: Meta<typeof Select> = {
  title: "Components/Select",
  component: Select,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  argTypes: {
    size: {
      control: "radio",
      options: ["medium", "large"],
    },
    tone: {
      control: "radio",
      options: ["normal", "success", "error"],
    },
    type: {
      control: "radio",
      options: ["normal", "label"],
    },
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
  decorators: [
    (Story) => (
      <div style={{ width: 280 }}>
        <Story />
      </div>
    ),
  ],
};
export default meta;

type Story = StoryObj<typeof Select>;


export const Playground: Story = {
  decorators: [
    (Story) => (
      <StoryPlaygroundFrame>
        <Story />
      </StoryPlaygroundFrame>
    ),
  ],
  args: {
    placeholder: "Select an option",
  },
};

/* -------------------------------------------------------------------------
 * Single — State 별
 * ----------------------------------------------------------------------- */
export const SingleDefault: Story = {
  name: "Single / Default",
  args: { placeholder: "Select option" },
};

export const SingleFocus: Story = {
  name: "Single / Focus",
  args: { state: "focus", placeholder: "Select option" },
};

export const SingleFilled: Story = {
  name: "Single / Filled",
  args: { state: "filled", value: "Option A" },
};

export const SingleDisable: Story = {
  name: "Single / Disable",
  args: { disabled: true, value: "Option A" },
};

export const SingleReadonly: Story = {
  name: "Single / Readonly",
  args: { readOnly: true, value: "Option A" },
};

/* -------------------------------------------------------------------------
 * Tone 별 (Normal / Success / Error)
 * ----------------------------------------------------------------------- */
export const ToneSuccess: Story = {
  name: "Tone / Success",
  args: { tone: "success", value: "Valid value" },
};
export const ToneError: Story = {
  name: "Tone / Error",
  args: { tone: "error", value: "Invalid value" },
};

/* -------------------------------------------------------------------------
 * Label 타입
 * ----------------------------------------------------------------------- */
export const LabelType: Story = {
  name: "Type / Label",
  args: {
    type: "label",
    label: "label",
    value: "Option A",
  },
};

/* -------------------------------------------------------------------------
 * Large size
 * ----------------------------------------------------------------------- */
export const LargeFilled: Story = {
  name: "Size / Large · Filled",
  args: { size: "large", value: "Option A" },
};

/* -------------------------------------------------------------------------
 * Multiple 1 line
 * ----------------------------------------------------------------------- */
export const MultipleOneLine: Story = {
  name: "Multiple / 1line",
  args: {
    chips: [
      <InputChip key="a">Option A</InputChip>,
      <InputChip key="b">Option B</InputChip>,
      <InputChip key="c">Option C</InputChip>,
    ],
    moreCount: 2,
    clearable: true,
  },
};

/* -------------------------------------------------------------------------
 * Multiple 2 line
 * ----------------------------------------------------------------------- */
export const MultipleTwoLine: Story = {
  name: "Multiple / 2line",
  args: {
    multiline: true,
    clearable: true,
    chips: [
      <InputChip key="a">Option A</InputChip>,
      <InputChip key="b">Option B</InputChip>,
      <InputChip key="c">Option C</InputChip>,
      <InputChip key="d">Option D</InputChip>,
      <InputChip key="e">Option E</InputChip>,
    ],
  },
};

/* -------------------------------------------------------------------------
 * Interactive — open 토글
 * ----------------------------------------------------------------------- */
export const Interactive: Story = {
  name: "Interactive / open toggle",
  render: (args: SelectProps) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [open, setOpen] = useState(false);
    return (
      <Select {...args} open={open} onClick={() => setOpen((v) => !v)} />
    );
  },
  args: { placeholder: "Click to toggle" },
};

/* -------------------------------------------------------------------------
 * Matrix — tone × state
 * ----------------------------------------------------------------------- */
const stateRows: Array<{
  key: string;
  label: string;
  args: Partial<SelectProps>;
}> = [
  { key: "default", label: "Default", args: { placeholder: "Text" } },
  { key: "focus", label: "Focus", args: { state: "focus", value: "Text" } },
  { key: "filled", label: "Filled", args: { value: "Text" } },
  { key: "disable", label: "Disable", args: { disabled: true, value: "Text" } },
  { key: "readonly", label: "Readonly", args: { readOnly: true, value: "Text" } },
];

export const Matrix: Story = {
  name: "Matrix",
  parameters: { layout: "padded" },
  render: () => (
    <StoryDocsMatrixPage
      title="Select"
      description="Normal·Success·Error tone과 Default·Focus·Filled·Disable·Readonly 상태 조합을 그리드로 비교합니다."
      figmaNode="4811-29737"
    >
      <FigmaLinkCard
        nodeId="4811-29737"
        caption="Components / Select — Size × State 매트릭스 원본"
      />
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "120px repeat(3, minmax(0, 280px))",
          gap: 12,
          alignItems: "center",
        }}
      >
        <div />
        <div style={{ fontWeight: 600 }}>Normal</div>
        <div style={{ fontWeight: 600 }}>Success</div>
        <div style={{ fontWeight: 600 }}>Error</div>

        {stateRows.map((r) => (
          <RowGroup key={r.key} label={r.label} args={r.args} />
        ))}
      </div>
    </StoryDocsMatrixPage>
  ),
};

function RowGroup({
  label,
  args,
}: {
  label: string;
  args: Partial<SelectProps>;
}) {
  return (
    <>
      <div style={{ fontWeight: 500, fontSize: 13 }}>{label}</div>
      <Select {...args} tone="normal" />
      <Select {...args} tone="success" />
      <Select {...args} tone="error" />
    </>
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
    <StoryDocsPage title="Select" description="Select 컴포넌트 사용 가이드입니다.">
      <StoryDocsSection title="개요">
        <StoryDocsParagraph>
          단일·다중 선택, tone, label 타입 등은 Default·Matrix 및 개별 스토리 Controls 로 확인할 수
          있습니다.
        </StoryDocsParagraph>
      </StoryDocsSection>
    </StoryDocsPage>
  ),
};
