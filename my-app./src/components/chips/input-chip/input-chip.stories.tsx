import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import type { CSSProperties } from "react";
import { useState } from "react";

import { InputChip } from "./input-chip";
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

const meta: Meta<typeof InputChip> = {
  title: "Components/Chips/InputChip",
  component: InputChip,
  parameters: {
    layout: "centered",
    docs: { disable: true },
  },
  argTypes: {
    size: { control: "inline-radio", options: ["medium", "large"] },
    type: { control: "inline-radio", options: ["normal", "error"] },
    state: { control: "inline-radio", options: ["default", "readonly", "disable"] },
    forceState: {
      control: "inline-radio",
      options: [undefined, "default", "hover", "disable"],
    },
    closeIcon: { control: "boolean" },
    children: { control: "text" },
  },
  args: {
    children: "Text",
    size: "medium",
    type: "normal",
    state: "default",
    closeIcon: true,
  },
};

export default meta;
type Story = StoryObj<typeof InputChip>;

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
const STATE_ROWS: Array<{
  key: string;
  label: string;
  state: "default" | "readonly" | "disable";
  forceState?: "hover";
}> = [
  { key: "default", label: "Default", state: "default" },
  { key: "hover", label: "Hover", state: "default", forceState: "hover" },
  { key: "readonly", label: "Readonly", state: "readonly" },
  { key: "disable", label: "Disable", state: "disable" },
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
  render: () => (
    <StoryDocsMatrixPage
      title="InputChip"
      description="열은 Medium·Large × Normal/Error, 행은 Default·Hover·Readonly·Disable입니다. Hover는 forceState로 시각 고정이며 테마는 상단 툴바에서 전환합니다."
    >
      <FigmaLinkCard
        storyTitle="Components/Chips/InputChip"
        caption="Components / Chips · InputChip — 매트릭스 원본"
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
            {STATE_ROWS.map((row) => (
              <tr key={row.key}>
                <th scope="row" style={{ ...rowThStyle, ...stickyCorner }}>
                  {row.label}
                </th>
                {SIZES.flatMap((size) =>
                  TYPES.map((type) => (
                    <td key={`${row.key}-${size}-${type}`} style={tdStyle}>
                      <InputChip
                        size={size}
                        type={type}
                        state={row.state}
                        forceState={row.forceState}
                      >
                        Text
                      </InputChip>
                    </td>
                  )),
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </StoryDocsMatrixPage>
  ),
};

function InteractiveDemo() {
  const [items, setItems] = useState<string[]>(["Apple", "Banana", "Cherry", "Durian"]);
  return (
    <div style={{ display: "flex", gap: 8, flexWrap: "wrap", maxWidth: 420 }}>
      {items.map((item) => (
        <InputChip
          key={item}
          size="medium"
          onClose={() => setItems((prev) => prev.filter((it) => it !== item))}
        >
          {item}
        </InputChip>
      ))}
      {items.length === 0 && (
        <span style={{ fontSize: 13, color: "var(--context-foreground-surface-on-surface-hint)" }}>
          모두 제거되었습니다.
        </span>
      )}
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
    <StoryDocsPage title="InputChip" description="입력 필드용 선택 칩 사용 가이드입니다.">
      <StoryDocsSection title="개요">
        <StoryDocsParagraph>
          태그 입력·필터 칩 등에 쓰이며, 닫기(×)로 항목을 제거합니다.{" "}
          <StoryDocsInlineCode>readonly</StoryDocsInlineCode> 에서는 닫기 버튼이 숨겨집니다.
        </StoryDocsParagraph>
      </StoryDocsSection>

      <StoryDocsSection
        title="Interactive · 닫기로 제거"
        description="닫기(×)로 목록에서 항목을 제거하는 동작 예시입니다."
      >
        <StoryDocsPanelInset>
          <InteractiveDemo />
        </StoryDocsPanelInset>
      </StoryDocsSection>

    </StoryDocsPage>
  ),
};
