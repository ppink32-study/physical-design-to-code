import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import type { CSSProperties } from "react";
import { useState } from "react";

import { ChipButton } from "./chip-button";
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

const meta: Meta<typeof ChipButton> = {
  title: "Components/Chips/ChipButton",
  component: ChipButton,
  parameters: {
    layout: "centered",
    docs: { disable: true },
  },
  argTypes: {
    state: {
      control: "inline-radio",
      options: ["default", "hovered", "selected"],
    },
    forceState: {
      control: "inline-radio",
      options: ["default", "hover", "selected"],
    },
    icon: { control: "boolean" },
    selected: { control: "boolean" },
    children: { control: "text" },
    disabled: { control: "boolean" },
  },
  args: {
    children: "Chip",
    state: "default",
    icon: false,
    selected: false,
    disabled: false,
  },
};

export default meta;
type Story = StoryObj<typeof ChipButton>;

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

type ChipRow = {
  label: string;
  state: "default" | "hovered" | "selected";
};

const ROWS: ChipRow[] = [
  { label: "Default", state: "default" },
  { label: "Hover", state: "hovered" },
  { label: "Selected", state: "selected" },
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
      title="ChipButton"
      description="행은 시각 상태(Default · Hover · Selected), 열은 아이콘 유무를 비교합니다. 라이트·다크는 상단 툴바 테마에서 전환합니다."
    >
      <FigmaLinkCard
        storyTitle="Components/Chips/ChipButton"
        caption="Components / Chips · ChipButton — 매트릭스 원본"
      />

      <div style={matrixScrollWrap}>
        <table style={matrixTableBase}>
          <thead>
            <tr>
              <th style={{ ...thStyle, ...stickyCorner, minWidth: 100, zIndex: 2 }} />
              <th style={thStyle}>without icon</th>
              <th style={thStyle}>with icon</th>
            </tr>
          </thead>
          <tbody>
            {ROWS.map((row) => (
              <tr key={row.label}>
                <th scope="row" style={{ ...rowThStyle, ...stickyCorner }}>
                  {row.label}
                </th>
                <td style={tdStyle}>
                  <ChipButton state={row.state}>Chip</ChipButton>
                </td>
                <td style={tdStyle}>
                  <ChipButton state={row.state} icon>
                    Chip
                  </ChipButton>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </StoryDocsMatrixPage>
  ),
};

function InteractiveDemo() {
  const tabs = ["All", "Active", "Inactive", "Pending"];
  const [active, setActive] = useState("All");
  return (
    <div style={{ display: "flex", gap: 6 }}>
      {tabs.map((tab) => (
        <ChipButton key={tab} selected={active === tab} onClick={() => setActive(tab)}>
          {tab}
        </ChipButton>
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
    <StoryDocsPage title="ChipButton" description="탭·필터 그룹용 버튼형 칩 사용 가이드입니다.">
      <StoryDocsSection title="개요">
        <StoryDocsParagraph>
          단일 선택 탭·세그먼트에 쓰입니다. <StoryDocsInlineCode>selected</StoryDocsInlineCode> 와{" "}
          <StoryDocsInlineCode>onClick</StoryDocsInlineCode> 으로 그룹에서 하나만 활성화하는 패턴이
          일반적입니다.
        </StoryDocsParagraph>
      </StoryDocsSection>

      <StoryDocsSection
        title="Interactive · 탭 그룹 선택"
        description="클릭으로 하나만 선택되는 단일 선택(세그먼트·탭) 패턴 예시입니다."
      >
        <StoryDocsPanelInset>
          <InteractiveDemo />
        </StoryDocsPanelInset>
      </StoryDocsSection>

      <StoryDocsSection title="코드 예시">
        <StoryDocsCode>{`import { ChipButton } from "@/components/chips/chip-button/chip-button";

<ChipButton selected onClick={() => {}}>Chip</ChipButton>`}</StoryDocsCode>
      </StoryDocsSection>
    </StoryDocsPage>
  ),
};
