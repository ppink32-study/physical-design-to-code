import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import type { CSSProperties } from "react";
import { useState } from "react";

import { SelectChip } from "./select-chip";
import { FigmaLinkCard } from "@/stories/figma-link-card";
import {
  StoryDocsCode,
  StoryDocsInlineCode,
  StoryDocsMatrixPage,
  StoryDocsPage,
  StoryDocsPanelInset,
  StoryDocsParagraph,
  StoryDocsSection,
  StoryPlaygroundFrame,
} from "@/stories/story-docs-shell";

const meta: Meta<typeof SelectChip> = {
  title: "Components/Chips/SelectChip",
  component: SelectChip,
  parameters: {
    layout: "centered",
    docs: { disable: true },
  },
  argTypes: {
    size: { control: "inline-radio", options: ["medium", "large"] },
    state: {
      control: "inline-radio",
      options: ["default", "readonly", "disable"],
    },
    error: { control: "boolean" },
    closeIcon: { control: "boolean" },
    forceState: {
      control: "inline-radio",
      options: [undefined, "default", "hover", "disable"],
    },
    children: { control: "text" },
  },
  args: {
    children: "Chips",
    size: "medium",
    state: "default",
    error: false,
    closeIcon: true,
  },
};

export default meta;
type Story = StoryObj<typeof SelectChip>;

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

const thStyle: CSSProperties = {
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

const rowThStyle: CSSProperties = {
  fontSize: 12,
  fontWeight: 600,
  color: "var(--context-foreground-surface-on-surface-secondary)",
  padding: "12px 16px 12px 0",
  whiteSpace: "nowrap",
  verticalAlign: "middle",
  textAlign: "left",
  borderBottom:
    "1px solid var(--border-border-surface-border-surface-secondary)",
};

const tdStyle: CSSProperties = {
  padding: "12px 16px",
  verticalAlign: "middle",
  borderBottom:
    "1px solid var(--border-border-surface-border-surface-secondary)",
};

const stickyCorner: CSSProperties = {
  position: "sticky",
  left: 0,
  zIndex: 1,
  background: "var(--context-background-surface-bg-surface-base)",
  boxShadow: "6px 0 12px -8px rgba(20, 21, 24, 0.12)",
};

/** 열: 상태 (Figma Select Chip 축 반전) */
const COLS: Array<{
  label: string;
  state: "default" | "readonly" | "disable";
  forceState?: "hover";
}> = [
  { label: "Default", state: "default" },
  { label: "Hover", state: "default", forceState: "hover" },
  { label: "Readonly", state: "readonly" },
  { label: "Disable", state: "disable" },
];

/** 행: size × error */
const ROWS: Array<{ size: "medium" | "large"; error: boolean }> = [
  { size: "medium", error: false },
  { size: "medium", error: true },
  { size: "large", error: false },
  { size: "large", error: true },
];

export const Playground: Story = {
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
      title="SelectChip"
      description="Figma와 동일하게 열은 Default·Hover·Readonly·Disable, 행은 Medium·Large × normal/error입니다. 테마는 상단 툴바에서 전환합니다."
    >
      <FigmaLinkCard
        storyTitle="Components/Chips/SelectChip"
        caption="Components / Chips · SelectChip — 매트릭스 원본"
      />

      <div style={matrixScrollWrap}>
        <table style={matrixTableBase}>
          <thead>
            <tr>
              <th style={{ ...thStyle, ...stickyCorner, minWidth: 140, zIndex: 2 }} />
              {COLS.map((col) => (
                <th key={col.label} style={thStyle}>
                  {col.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {ROWS.map((row) => (
              <tr key={`${row.size}-${row.error}`}>
                <th scope="row" style={{ ...rowThStyle, ...stickyCorner }}>
                  {row.size === "medium" ? "Medium (24px)" : "Large (32px)"} ·{" "}
                  {row.error ? "error" : "normal"}
                </th>
                {COLS.map((col) => (
                  <td key={`${row.size}-${row.error}-${col.label}`} style={tdStyle}>
                    <SelectChip
                      size={row.size}
                      error={row.error}
                      state={col.state}
                      forceState={col.forceState}
                    >
                      Chips
                    </SelectChip>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </StoryDocsMatrixPage>
  ),
};

function InteractiveDemo() {
  const [items, setItems] = useState<string[]>([
    "Category",
    "Status",
    "Priority",
    "Assignee",
  ]);
  return (
    <div style={{ display: "flex", gap: 8, flexWrap: "wrap", maxWidth: 420 }}>
      {items.map((item) => (
        <SelectChip
          key={item}
          size="medium"
          onClose={() => setItems((prev) => prev.filter((it) => it !== item))}
        >
          {item}
        </SelectChip>
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
    <StoryDocsPage title="SelectChip" description="선택 컨텍스트용 칩 사용 가이드입니다.">
      <StoryDocsSection title="개요">
        <StoryDocsParagraph>
          필터·선택 영역에서 라벨과 닫기를 함께 쓰는 칩입니다.{" "}
          <StoryDocsInlineCode>error</StoryDocsInlineCode> 시 경고 아이콘과 에러 스타일이
          적용됩니다.
        </StoryDocsParagraph>
      </StoryDocsSection>

      <StoryDocsSection
        title="Interactive · 닫기로 제거"
        description="닫기(×)로 선택된 조건 칩을 목록에서 제거하는 동작 예시입니다."
      >
        <StoryDocsParagraph>
          <strong>Close icon (optional)</strong> — 읽기 전용·고정 태그처럼 제거가 없을 때는{" "}
          <StoryDocsInlineCode>closeIcon=&#123;false&#125;</StoryDocsInlineCode>로 닫기 아이콘을
          숨깁니다.
        </StoryDocsParagraph>
        <StoryDocsPanelInset>
          <InteractiveDemo />
        </StoryDocsPanelInset>
      </StoryDocsSection>

      <StoryDocsSection title="코드 예시">
        <StoryDocsCode>{`import { SelectChip } from "@/components/chips/select-chip/select-chip";

<SelectChip error onClose={() => {}}>Chips</SelectChip>`}</StoryDocsCode>
      </StoryDocsSection>
    </StoryDocsPage>
  ),
};
