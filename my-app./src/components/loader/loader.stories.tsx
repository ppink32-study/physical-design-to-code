import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import type { CSSProperties } from "react";

import { Loader, type LoaderColor, type LoaderSize } from "./loader";
import { FigmaLinkCard } from "@/stories/figma-link-card";
import {
  StoryDocsInlineCode,
  StoryDocsMatrixPage,
  StoryDocsPage,
  StoryDocsParagraph,
  StoryDocsSection,
  StoryPlaygroundFrame,
} from "@/stories/story-docs-shell";

const meta: Meta<typeof Loader> = {
  title: "Components/Loader",
  component: Loader,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Figma MCP 기반 Loader. 원호(arc) 와 끝점(dot) 이 회전하는 Circle loading 컴포넌트입니다. (node 13289:46891)",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: "inline-radio",
      options: ["small", "medium", "large"],
    },
    color: {
      control: "inline-radio",
      options: ["mint", "gray", "white"],
    },
    label: { control: "text" },
  },
};
export default meta;
type Story = StoryObj<typeof Loader>;

export const Playground: Story = {
  decorators: [
    (Story) => (
      <StoryPlaygroundFrame>
        <Story />
      </StoryPlaygroundFrame>
    ),
  ],
  args: {
    size: "large",
    color: "mint",
    label: "로딩 중",
  },
};

const rowStyle: CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: 40,
};
const cellStyle: CSSProperties = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: 12,
};
const captionStyle: CSSProperties = {
  fontSize: 12,
  color: "var(--context-foreground-surface-on-surface-sub)",
};

const SIZES: Array<{ key: LoaderSize; label: string; px: number }> = [
  { key: "small", label: "Small", px: 24 },
  { key: "medium", label: "Medium", px: 32 },
  { key: "large", label: "Large (default)", px: 48 },
];

const COLORS: Array<{ key: LoaderColor; label: string; bg?: string }> = [
  { key: "mint", label: "Mint (default)" },
  { key: "gray", label: "Gray" },
  { key: "white", label: "White (on dark)", bg: "#1f2025" },
];

export const Matrix: Story = {
  name: "Matrix",
  parameters: { layout: "padded" },
  render: () => (
    <StoryDocsMatrixPage
      title="Loader"
      description="preset size·색상·숫자 size로 로더 스피너를 비교합니다."
      figmaNode="13289-46891"
    >
      <FigmaLinkCard
        nodeId="13289-46891"
        caption="Components / Loader — Size × Variant 매트릭스 원본"
      />
      <section>
        <h4 style={{ margin: "0 0 12px", fontSize: 13, fontWeight: 600 }}>Sizes</h4>
        <div style={rowStyle}>
          {SIZES.map(({ key, label, px }) => (
            <div key={key} style={cellStyle}>
              <Loader size={key} />
              <span style={captionStyle}>
                {label} · {px}px
              </span>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h4 style={{ margin: "0 0 12px", fontSize: 13, fontWeight: 600 }}>Colors</h4>
        <div style={rowStyle}>
          {COLORS.map(({ key, label, bg }) => (
            <div
              key={key}
              style={{
                ...cellStyle,
                padding: 16,
                borderRadius: 12,
                background:
                  bg ?? "var(--context-background-surface-bg-surface-base)",
              }}
            >
              <Loader size="large" color={key} />
              <span
                style={{
                  ...captionStyle,
                  color:
                    key === "white"
                      ? "rgba(255,255,255,0.8)"
                      : captionStyle.color,
                }}
              >
                {label}
              </span>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h4 style={{ margin: "0 0 12px", fontSize: 13, fontWeight: 600 }}>
          Custom numeric size
        </h4>
        <div style={rowStyle}>
          {[16, 20, 48, 80, 120].map((px) => (
            <div key={px} style={cellStyle}>
              <Loader size={px} />
              <span style={captionStyle}>{px}px</span>
            </div>
          ))}
        </div>
      </section>
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
    <StoryDocsPage title="Loader" description="로딩 스피너 컴포넌트 가이드입니다.">
      <StoryDocsSection title="개요">
        <StoryDocsParagraph>
          <StoryDocsInlineCode>size</StoryDocsInlineCode> 는 preset(small/medium/large) 또는 픽셀
          숫자를 받습니다. <StoryDocsInlineCode>color</StoryDocsInlineCode> 는 배경 대비에 맞게
          mint / gray / white 중 선택하고, 필요 시 <StoryDocsInlineCode>label</StoryDocsInlineCode>{" "}
          로 접근 가능한 문구를 붙입니다.
        </StoryDocsParagraph>
      </StoryDocsSection>
    </StoryDocsPage>
  ),
};
