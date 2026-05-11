import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import type { CSSProperties } from "react";
import { useState } from "react";

import { SearchChip } from "./search-chip";
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

const meta: Meta<typeof SearchChip> = {
  title: "Components/Chips/SearchChip",
  component: SearchChip,
  parameters: {
    layout: "centered",
    docs: { disable: true },
  },
  argTypes: {
    state: {
      control: "inline-radio",
      options: ["default", "hover", "selected", "error", "disable"],
    },
    forceState: {
      control: "inline-radio",
      options: ["default", "hover", "disable"],
    },
    label: { control: "text" },
    closeIcon: { control: "boolean" },
    children: { control: "text" },
  },
  args: {
    children: "Chips",
    label: "Label",
    state: "default",
    closeIcon: true,
  },
};

export default meta;
type Story = StoryObj<typeof SearchChip>;

const matrixScrollWrap = storyMatrixScrollWrap;
const matrixTableBase = storyMatrixTableBase;
const thStyle = storyMatrixColHeaderStyle;
const rowThStyle: CSSProperties = {
  ...storyMatrixRowHeaderStyle,
  textAlign: "left",
};
const tdStyle = storyMatrixCellStyle;
const stickyCorner = storyMatrixStickyCornerStyle;

type SearchChipState = "default" | "hover" | "selected" | "error" | "disable";

type StateRow = {
  label: string;
  state: SearchChipState;
  forceState?: "hover";
};

const STATE_ROWS: StateRow[] = [
  { label: "Default", state: "default" },
  { label: "Hover", state: "default", forceState: "hover" },
  { label: "Selected", state: "selected" },
  { label: "Error", state: "error" },
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
      title="SearchChip"
      description={locale === "en"
        ? "Rows: all states. Columns: with/without label. The Hover row is visually locked via forceState; switch the theme from the top toolbar."
        : "행은 상태 전체, 열은 라벨 유무를 비교합니다. Hover 행은 forceState로 시각 고정이며 테마는 상단 툴바에서 전환합니다."}
    >
      <FigmaLinkCard
        storyTitle="Components/Chips/SearchChip"
        caption="Components / Chips · SearchChip — 매트릭스 원본"
      />

      <div style={matrixScrollWrap}>
        <table style={matrixTableBase}>
          <thead>
            <tr>
              <th style={{ ...thStyle, ...stickyCorner, minWidth: 100, zIndex: 2 }} />
              <th style={thStyle}>with label</th>
              <th style={thStyle}>without label</th>
            </tr>
          </thead>
          <tbody>
            {STATE_ROWS.map((row) => (
              <tr key={row.label}>
                <th scope="row" style={{ ...rowThStyle, ...stickyCorner }}>
                  {row.label}
                </th>
                <td style={tdStyle}>
                  <SearchChip state={row.state} forceState={row.forceState} label="Label">
                    Chips
                  </SearchChip>
                </td>
                <td style={tdStyle}>
                  <SearchChip state={row.state} forceState={row.forceState}>
                    Chips
                  </SearchChip>
                </td>
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
  const [items, setItems] = useState([
    { id: 1, label: "Status", text: "Active", selected: false },
    { id: 2, label: "Priority", text: "High", selected: true },
    { id: 3, label: "Assignee", text: "John", selected: false },
  ]);
  return (
    <div style={{ display: "flex", gap: 8, flexWrap: "wrap", maxWidth: 480 }}>
      {items.map((item) => (
        <SearchChip
          key={item.id}
          state={item.selected ? "selected" : "default"}
          label={item.label}
          onClose={() => setItems((prev) => prev.filter((it) => it.id !== item.id))}
        >
          {item.text}
        </SearchChip>
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
    <StoryDocsPage title="SearchChip" description="검색·필터 조건 칩 사용 가이드입니다.">
      <StoryDocsSection title="개요">
        <StoryDocsParagraph>
          검색 결과·필터 바에서 조건을 한눈에 보여줄 때 사용합니다.{" "}
          <StoryDocsInlineCode>label</StoryDocsInlineCode> 과 값 영역을 분리할 수 있습니다.
        </StoryDocsParagraph>
      </StoryDocsSection>

      <StoryDocsSection
        title="Interactive · 닫기 / 선택 표시"
        description="닫기로 제거하고, 일부 칩은 selected 상태로 표시하는 예시입니다."
      >
        <StoryDocsParagraph>
          <strong>Close icon (optional)</strong> — 제거 UI가 필요 없을 때는{" "}
          <StoryDocsInlineCode>closeIcon=&#123;false&#125;</StoryDocsInlineCode>로 닫기 아이콘을
          숨깁니다.
        </StoryDocsParagraph>
        <StoryDocsPanelInset>
          <InteractiveDemo />
        </StoryDocsPanelInset>
      </StoryDocsSection>

    </StoryDocsPage>
  ),
};
