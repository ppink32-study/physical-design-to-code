import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import type { CSSProperties } from "react";
import { Fragment } from "react";

import {
  Label,
  type LabelSize,
  type LabelType,
} from "./label";
import { FigmaLinkCard } from "@/stories/figma-link-card";
import {
  StoryDocsMatrixPage,
  StoryDocsPage,
  StoryDocsParagraph,
  StoryDocsSection,
  StoryPlaygroundFrame,
} from "@/stories/story-docs-shell";

const meta: Meta<typeof Label> = {
  title: "Components/Label",
  component: Label,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Figma MCP 기반 Label. 4가지 variant (Normal Medium/Small, + Outline Btn Small, + Ghost Btn Small) 를 단일 컴포넌트로 통합했습니다. (node 5691:20257)",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: "inline-radio",
      options: ["medium", "small"],
    },
    type: {
      control: "inline-radio",
      options: ["normal", "outline-button", "ghost-button"],
    },
    mandatory: { control: "boolean" },
    infoIcon: { control: "boolean" },
    children: { control: "text" },
    buttonLabel: {
      control: "text",
      description:
        "outline-button / ghost-button variant 의 버튼 텍스트. 기본값: outline-button='설정', ghost-button='' (icon-only)",
    },
  },
};
export default meta;
type Story = StoryObj<typeof Label>;


export const Playground: Story = {
  decorators: [
    (Story) => (
      <StoryPlaygroundFrame>
        <Story />
      </StoryPlaygroundFrame>
    ),
  ],
  args: {
    children: "항목명",
    size: "medium",
    type: "normal",
    mandatory: true,
    infoIcon: true,
  },
};

/* =================================================================
 * Matrix — variant grid + theme
 * =============================================================== */
const headerStyle: CSSProperties = {
  fontSize: 12,
  color: "var(--context-foreground-surface-on-surface-hint)",
  fontWeight: 600,
  textTransform: "uppercase",
  letterSpacing: 0.4,
};
const rowLabelStyle: CSSProperties = {
  fontSize: 12,
  color: "var(--context-foreground-surface-on-surface)",
};

type RowDef = {
  key: string;
  label: string;
  size: LabelSize;
  type: LabelType;
};

const ROWS: RowDef[] = [
  { key: "normal-md", label: "Normal / Medium", size: "medium", type: "normal" },
  { key: "normal-sm", label: "Normal / Small", size: "small", type: "normal" },
  {
    key: "outline-sm",
    label: "+ Outline Btn / Small",
    size: "small",
    type: "outline-button",
  },
  {
    key: "ghost-sm",
    label: "+ Ghost Btn / Small",
    size: "small",
    type: "ghost-button",
  },
];

type ColDef = {
  key: string;
  label: string;
  mandatory?: boolean;
  infoIcon?: boolean;
};

const COLS: ColDef[] = [
  { key: "plain", label: "Plain", mandatory: false, infoIcon: false },
  { key: "mandatory", label: "Mandatory", mandatory: true, infoIcon: false },
  { key: "info", label: "Info", mandatory: false, infoIcon: true },
  {
    key: "both",
    label: "Mandatory + Info",
    mandatory: true,
    infoIcon: true,
  },
];

export const Matrix: Story = {
  name: "Matrix",
  parameters: { layout: "padded" },
  render: () => (
    <StoryDocsMatrixPage
      title="Label"
      description="variant·size·필수·정보 아이콘 조합을 그리드로 비교하고, 하단에서 라이트·다크 테마 대비를 확인합니다."
      figmaNode="5691-20257"
    >
      <FigmaLinkCard
        nodeId="5691-20257"
        caption="Components / Label — Variant × Size 매트릭스 원본"
      />
      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "[label] 200px repeat(4, [col] max-content)",
          columnGap: 32,
          rowGap: 20,
          alignItems: "center",
          justifyItems: "start",
        }}
      >
        <div />
        {COLS.map((c) => (
          <div key={c.key} style={headerStyle}>
            {c.label}
          </div>
        ))}
        {ROWS.map((r) => (
          <Fragment key={r.key}>
            <div style={rowLabelStyle}>{r.label}</div>
            {COLS.map((c) => (
              <Label
                key={`${r.key}-${c.key}`}
                size={r.size}
                type={r.type}
                mandatory={c.mandatory}
                infoIcon={c.infoIcon}
              >
                항목명
              </Label>
            ))}
          </Fragment>
        ))}
      </div>
      <section>
        <h4 style={{ margin: "0 0 12px", fontSize: 13, fontWeight: 600 }}>Light vs Dark</h4>
        <div
          style={{ display: "flex", gap: 24, alignItems: "flex-start", flexWrap: "wrap" }}
        >
          <ThemePanel theme="light" />
          <ThemePanel theme="dark" />
        </div>
      </section>
    </StoryDocsMatrixPage>
  ),
};

const panelStyle: CSSProperties = {
  padding: 24,
  borderRadius: 12,
  minWidth: 420,
  flex: 1,
  background: "var(--context-background-surface-bg-surface-base)",
  color: "var(--context-foreground-surface-on-surface-base)",
  border: "1px solid var(--border-border-surface-border-surface)",
};

function ThemePanel({ theme }: { theme: "light" | "dark" }) {
  return (
    <div data-theme={theme} style={panelStyle}>
      <div style={{ ...rowLabelStyle, marginBottom: 12, fontWeight: 600 }}>
        {theme.toUpperCase()}
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        <Label>Normal / Medium</Label>
        <Label mandatory infoIcon>
          Normal / Medium
        </Label>
        <Label size="small">Normal / Small</Label>
        <Label size="small" mandatory infoIcon>
          Normal / Small
        </Label>
        <Label size="small" type="outline-button" mandatory infoIcon>
          항목명
        </Label>
        <Label size="small" type="ghost-button" mandatory infoIcon>
          항목명
        </Label>
      </div>
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
    <StoryDocsPage title="Label" description="폼 라벨 컴포넌트 사용 가이드입니다.">
      <StoryDocsSection title="개요">
        <StoryDocsParagraph>
          폼 필드 라벨·필수 표시·정보 아이콘·outline/ghost 버튼 슬롯을 한 컴포넌트로 다룹니다.
          variant 조합은 Matrix 그리드에서, 테마 대비는 Matrix 하단 Light/Dark 섹션에서 확인하세요.
        </StoryDocsParagraph>
      </StoryDocsSection>
    </StoryDocsPage>
  ),
};
