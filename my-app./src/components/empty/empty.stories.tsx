import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import type { CSSProperties } from "react";

import { Empty } from "./empty";
import { FigmaLinkCard } from "@/stories/figma-link-card";
import {
  StoryDocsMatrixPage,
  StoryDocsPage,
  StoryDocsParagraph,
  StoryDocsSection,
  StoryPlaygroundFrame,
} from "@/stories/story-docs-shell";

const meta: Meta<typeof Empty> = {
  title: "Components/Empty",
  component: Empty,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Empty state — Figma node 12368:26042 기반.\n\n3가지 size(small/medium/large) × 4가지 preset 아이콘(data/image/layout/upload). 임의의 SVG 경로(string) 또는 ReactNode 도 `icon` prop 으로 직접 전달 가능.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: "inline-radio",
      options: ["small", "medium", "large"],
    },
    icon: {
      control: "select",
      options: ["data", "image", "table", "upload"],
    },
    description: { control: "text" },
    subtext: { control: "text" },
  },
};
export default meta;
type Story = StoryObj<typeof Empty>;

export const Playground: Story = {
  decorators: [
    (Story) => (
      <StoryPlaygroundFrame>
        <Story />
      </StoryPlaygroundFrame>
    ),
  ],
  args: {
    size: "medium",
    icon: "data",
    description: "Description",
    subtext: "",
  },
};

const cellStyle: CSSProperties = {
  padding: "16px 24px",
  border: "1px dashed #e5e6ea",
  borderRadius: 8,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  minHeight: 160,
};

function ThemePanel({ theme }: { theme: "light" | "dark" }) {
  const bg =
    theme === "light"
      ? "var(--context-background-surface-bg-surface-base, #ffffff)"
      : "var(--context-background-surface-bg-surface-base, #18191c)";
  return (
    <div
      data-theme={theme}
      style={{
        padding: 32,
        borderRadius: 12,
        background: bg,
        minWidth: 360,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 24,
      }}
    >
      <div
        style={{
          fontSize: 12,
          fontWeight: 600,
          color: theme === "light" ? "#18191c" : "#ffffff",
        }}
      >
        {theme.toUpperCase()}
      </div>
      <Empty size="medium" icon="data" description="Description" subtext="Subtext" />
    </div>
  );
}

export const Matrix: Story = {
  name: "Matrix",
  parameters: { layout: "padded" },
  render: () => (
    <StoryDocsMatrixPage
      title="Empty"
      description="size·설명·subtext·아이콘 preset·그리드·라이트·다크에서 빈 상태 UI를 비교합니다."
      figmaNode="12368-26042"
    >
      <FigmaLinkCard
        nodeId="12368-26042"
        caption="Components / Empty — Layout 매트릭스 원본"
      />
      <section>
        <h4 style={{ margin: "0 0 12px", fontSize: 13, fontWeight: 600 }}>Size × description</h4>
        <div style={{ display: "flex", gap: 48, alignItems: "flex-end", flexWrap: "wrap" }}>
          <Empty size="small" icon="data" description="Description" />
          <Empty size="medium" icon="data" description="Description" />
          <Empty size="large" icon="data" description="Description" />
        </div>
      </section>

      <section>
        <h4 style={{ margin: "0 0 12px", fontSize: 13, fontWeight: 600 }}>With subtext</h4>
        <div style={{ display: "flex", gap: 48, alignItems: "flex-end", flexWrap: "wrap" }}>
          <Empty size="small" icon="data" description="Description" subtext="Subtext" />
          <Empty size="medium" icon="data" description="Description" subtext="Subtext" />
          <Empty size="large" icon="data" description="Description" subtext="Subtext" />
        </div>
      </section>

      <section>
        <h4 style={{ margin: "0 0 12px", fontSize: 13, fontWeight: 600 }}>Icon presets</h4>
        <div style={{ display: "flex", gap: 48, flexWrap: "wrap" }}>
          <Empty icon="data" description="No data" />
          <Empty icon="image" description="No image" />
          <Empty icon="table" description="No table" />
          <Empty icon="upload" description="Drop a file" />
        </div>
      </section>

      <section>
        <h4 style={{ margin: "0 0 12px", fontSize: 13, fontWeight: 600 }}>Full grid</h4>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 16,
          }}
        >
          <div style={cellStyle}>
            <Empty size="small" icon="data" description="Description" />
          </div>
          <div style={cellStyle}>
            <Empty size="medium" icon="data" description="Description" />
          </div>
          <div style={cellStyle}>
            <Empty size="large" icon="data" description="Description" />
          </div>
          <div style={cellStyle}>
            <Empty
              size="small"
              icon="upload"
              description="Description"
              subtext="Subtext"
            />
          </div>
          <div style={cellStyle}>
            <Empty
              size="medium"
              icon="upload"
              description="Description"
              subtext="Subtext"
            />
          </div>
          <div style={cellStyle}>
            <Empty
              size="large"
              icon="upload"
              description="Description"
              subtext="Subtext"
            />
          </div>
        </div>
      </section>

      <section>
        <h4 style={{ margin: "0 0 12px", fontSize: 13, fontWeight: 600 }}>Light vs Dark</h4>
        <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
          <ThemePanel theme="light" />
          <ThemePanel theme="dark" />
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
    <StoryDocsPage title="Empty" description="빈 상태 UI 컴포넌트 가이드입니다.">
      <StoryDocsSection title="개요">
        <StoryDocsParagraph>
          빈 화면·빈 목록 등에서 사용자에게 다음 행동을 안내할 때 사용합니다. Matrix 에서 size·아이콘
          preset·subtext·테마 조합을 한 번에 대조할 수 있습니다.
        </StoryDocsParagraph>
      </StoryDocsSection>
    </StoryDocsPage>
  ),
};
