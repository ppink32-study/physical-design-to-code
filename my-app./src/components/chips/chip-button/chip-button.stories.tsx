import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import type { CSSProperties } from "react";
import { useState } from "react";

import { ChipButton } from "./chip-button";
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

const matrixScrollWrap = storyMatrixScrollWrap;
const matrixTableBase = storyMatrixTableBase;
const thStyle = storyMatrixColHeaderStyle;
const rowThStyle: CSSProperties = {
  ...storyMatrixRowHeaderStyle,
  textAlign: "left",
};
const tdStyle = storyMatrixCellStyle;
const stickyCorner = storyMatrixStickyCornerStyle;

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
  argTypes: {
    forceState: { table: { disable: true } },
    icon: { table: { disable: true } },
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
      title="ChipButton"
      description={locale === "en"
        ? "Rows are visual states (Default · Hover · Selected); columns compare with/without icon. Switch Light / Dark from the top toolbar theme."
        : "행은 시각 상태(Default · Hover · Selected), 열은 아이콘 유무를 비교합니다. 라이트·다크는 상단 툴바 테마에서 전환합니다."}
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

    </StoryDocsPage>
  ),
};
