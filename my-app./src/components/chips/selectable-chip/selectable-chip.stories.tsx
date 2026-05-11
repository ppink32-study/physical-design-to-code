import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import type { CSSProperties } from "react";
import { useState } from "react";

import { SelectableChip } from "./selectable-chip";
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
  StoryDocsInlineCode,
  StoryDocsMatrixPage,
  StoryDocsPage,
  StoryDocsPanelInset,
  StoryDocsParagraph,
  StoryDocsSection,
  StoryPlaygroundFrame,
} from "@/stories/story-docs-shell";

const meta: Meta<typeof SelectableChip> = {
  title: "Components/Chips/SelectableChip",
  component: SelectableChip,
  parameters: {
    layout: "centered",
    docs: { disable: true },
  },
  argTypes: {
    size: { control: "inline-radio", options: ["medium", "large"] },
    kind: { control: "inline-radio", options: ["normal", "error"] },
    state: {
      control: "inline-radio",
      options: [undefined, "default", "selected", "readonly", "disable"],
    },
    forceState: {
      control: "inline-radio",
      options: [undefined, "default", "hover", "disable"],
    },
    selected: { control: "boolean" },
    children: { control: "text" },
  },
  args: {
    children: "Text",
    size: "medium",
    kind: "normal",
    selected: false,
  },
};

export default meta;
type Story = StoryObj<typeof SelectableChip>;

const matrixScrollWrap = storyMatrixScrollWrap;
const matrixTableBase = storyMatrixTableBase;
const thStyle = storyMatrixColHeaderStyle;
const rowThStyle: CSSProperties = {
  ...storyMatrixRowHeaderStyle,
  textAlign: "left",
};
const tdStyle = storyMatrixCellStyle;
const stickyCorner = storyMatrixStickyCornerStyle;

const SIZES: Array<"medium" | "large"> = ["medium", "large"];
const TYPES: Array<"normal" | "error"> = ["normal", "error"];
const ROWS: Array<{
  label: string;
  state?: "default" | "selected" | "readonly" | "disable";
  forceState?: "hover";
}> = [
  { label: "Default", state: "default" },
  { label: "Hover", state: "default", forceState: "hover" },
  { label: "Selected", state: "selected" },
  { label: "Readonly", state: "readonly" },
  { label: "Disable", state: "disable" },
];

export const Playground: Story = {
  argTypes: {
    forceState: { table: { disable: true } },
  },
  decorators: [
    (Story) => (
      <StoryPlaygroundFrame>
        <Story />
      </StoryPlaygroundFrame>
    ),
  ],
};

export const Matrix: Story = {
  name: "Matrix",
  parameters: { layout: "padded" },
  render: (_args, ctx) => {
    const locale = ctx.globals && ctx.globals.locale === "en" ? "en" : "ko";
    return (
    <StoryDocsMatrixPage
      title="SelectableChip"
      description={locale === "en"
        ? "Adds a Selected row to the same column layout as the Input chip; the Hover row shows a trash icon. Switch the theme from the top toolbar."
        : "Input 칩과 같은 열 구성에 Selected 행이 추가되며, Hover 행에서는 휴지통 아이콘이 표시됩니다. 테마는 상단 툴바에서 전환합니다."}
    >
      <FigmaLinkCard
        storyTitle="Components/Chips/SelectableChip"
        caption="Components / Chips · SelectableChip — 매트릭스 원본"
      />

      <div style={matrixScrollWrap}>
        <table style={matrixTableBase}>
          <thead>
            <tr>
              <th style={{ ...thStyle, ...stickyCorner, minWidth: 100, zIndex: 2 }} />
              {SIZES.flatMap((size) =>
                TYPES.map((type) => (
                  <th key={`${size}-${type}`} style={thStyle}>
                    {size === "medium" ? "Medium (24px)" : "Large (32px)"} · {type}
                  </th>
                )),
              )}
            </tr>
          </thead>
          <tbody>
            {ROWS.map((row) => (
              <tr key={row.label}>
                <th scope="row" style={{ ...rowThStyle, ...stickyCorner }}>
                  {row.label}
                </th>
                {SIZES.flatMap((size) =>
                  TYPES.map((type) => (
                    <td key={`${row.label}-${size}-${type}`} style={tdStyle}>
                      <SelectableChip
                        size={size}
                        kind={type}
                        state={row.state}
                        forceState={row.forceState}
                      >
                        Text
                      </SelectableChip>
                    </td>
                  )),
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </StoryDocsMatrixPage>
    );
  },
};

function InteractiveDemo() {
  const options = ["React", "Vue", "Svelte", "Solid", "Angular"];
  const [selected, setSelected] = useState<Set<string>>(new Set(["React"]));
  return (
    <div style={{ display: "flex", gap: 8, flexWrap: "wrap", maxWidth: 420 }}>
      {options.map((opt) => (
        <SelectableChip
          key={opt}
          size="medium"
          selected={selected.has(opt)}
          onToggle={(next) =>
            setSelected((prev) => {
              const n = new Set(prev);
              if (next) n.add(opt);
              else n.delete(opt);
              return n;
            })
          }
        >
          {opt}
        </SelectableChip>
      ))}
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
    <StoryDocsPage title="SelectableChip" description="토글 선택용 칩 사용 가이드입니다.">
      <StoryDocsSection title="개요">
        <StoryDocsParagraph>
          다중 선택·토글에 사용합니다. <StoryDocsInlineCode>selected</StoryDocsInlineCode> 와{" "}
          <StoryDocsInlineCode>onToggle</StoryDocsInlineCode> 으로 제어하거나,{" "}
          <StoryDocsInlineCode>state=&quot;selected&quot;</StoryDocsInlineCode> 로 고정 표시할 수
          있습니다.
        </StoryDocsParagraph>
      </StoryDocsSection>

      <StoryDocsSection
        title="Interactive · 다중 선택"
        description="여러 칩을 클릭해 onToggle으로 다중 선택 상태를 바꾸는 예시입니다."
      >
        <StoryDocsPanelInset>
          <InteractiveDemo />
        </StoryDocsPanelInset>
      </StoryDocsSection>

    </StoryDocsPage>
  ),
};
