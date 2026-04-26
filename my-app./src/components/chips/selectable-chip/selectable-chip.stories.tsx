import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import type { CSSProperties } from "react";
import { useState } from "react";

import { SelectableChip } from "./selectable-chip";
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
      title="SelectableChip"
      description="Input 칩과 같은 열 구성에 Selected 행이 추가되며, Hover 행에서는 휴지통 아이콘이 표시됩니다. 테마는 상단 툴바에서 전환합니다."
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
  ),
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

      <StoryDocsSection title="코드 예시">
        <StoryDocsCode>{`import { SelectableChip } from "@/components/chips/selectable-chip/selectable-chip";

<SelectableChip selected onToggle={(v) => {}}>Text</SelectableChip>`}</StoryDocsCode>
      </StoryDocsSection>
    </StoryDocsPage>
  ),
};
