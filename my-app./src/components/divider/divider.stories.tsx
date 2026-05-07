import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import type { CSSProperties } from "react";

import { Input } from "@/components/Input/input";
import { Select } from "@/components/select/select";

import { Divider } from "./divider";
import { FigmaLinkCard } from "@/stories/figma-link-card";
import {
  StoryDocsMatrixPage,
  StoryDocsPage,
  StoryDocsPanelInset,
  StoryDocsParagraph,
  StoryDocsSection,
  StoryPlaygroundFrame,
} from "@/stories/story-docs-shell";

const meta: Meta<typeof Divider> = {
  title: "Components/Divider",
  component: Divider,
  parameters: {
    layout: "centered",
    docs: { disable: true },
  },
  argTypes: {
    orientation: {
      control: "inline-radio",
      options: ["horizontal", "vertical"],
    },
    title: { control: "text" },
    length: { control: "number" },
  },
};
export default meta;

type Story = StoryObj<typeof Divider>;

export const Playground: Story = {
  decorators: [
    (Story) => (
      <StoryPlaygroundFrame>
        <Story />
      </StoryPlaygroundFrame>
    ),
  ],
  args: {
    orientation: "horizontal",
    title: "",
  },
};

const rowLabelStyle: CSSProperties = {
  fontSize: 12,
  color: "var(--context-foreground-surface-on-surface)",
  marginBottom: 8,
};

export const Matrix: Story = {
  name: "Matrix",
  parameters: { layout: "padded" },
  render: () => (
    <StoryDocsMatrixPage
      title="Divider"
      description="가로·세로·타이틀 변형을 비교합니다."
      figmaNode="1-15492"
    >
      <FigmaLinkCard
        nodeId="1-15492"
        caption="Components / Divider — Direction × Variant 매트릭스 원본"
      />
      <section>
        <h4 style={{ margin: "0 0 8px", fontSize: 13, fontWeight: 600 }}>
          Horizontal — no title
        </h4>
        <div style={{ width: 400 }}>
          <div style={rowLabelStyle}>width 400</div>
          <Divider />
        </div>
      </section>

      <section>
        <h4 style={{ margin: "0 0 8px", fontSize: 13, fontWeight: 600 }}>
          Horizontal — with title
        </h4>
        <div style={{ display: "flex", flexDirection: "column", gap: 24, width: 400 }}>
          <div>
            <div style={rowLabelStyle}>Center Text</div>
            <Divider title="Center Text" />
          </div>
          <div>
            <div style={rowLabelStyle}>또는</div>
            <Divider>또는</Divider>
          </div>
          <div>
            <div style={rowLabelStyle}>OR</div>
            <Divider title="OR" />
          </div>
        </div>
      </section>

      <section>
        <h4 style={{ margin: "0 0 8px", fontSize: 13, fontWeight: 600 }}>Vertical</h4>
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 12,
            fontSize: 13,
            color: "var(--context-foreground-surface-on-surface)",
          }}
        >
          <span>Left</span>
          <Divider orientation="vertical" />
          <span>Center</span>
          <Divider orientation="vertical" length={20} />
          <span>Right (length 20)</span>
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
    <StoryDocsPage title="Divider" description="구분선 컴포넌트 가이드입니다.">
      <StoryDocsSection title="Horizontal Divider">
        <StoryDocsParagraph>
          Divider는 콘텐츠 그룹을 구분할 때 사용합니다. Divider의 너비는 컨테이너의 전체 너비를 채웁니다.
        </StoryDocsParagraph>
        <StoryDocsPanelInset>
          <div style={{ width: "100%", padding: "24px 0" }}>
            <Divider />
          </div>
        </StoryDocsPanelInset>
      </StoryDocsSection>

      <StoryDocsSection title="Vertical Divider">
        <StoryDocsParagraph>
          Vertical Divider는 입력 필드 사이에서 정보 그룹을 구분할 때 사용합니다. Vertical Divider의 선 길이는 16px로 고정됩니다.
        </StoryDocsParagraph>
        <StoryDocsPanelInset>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              flexWrap: "wrap",
            }}
          >
            <Input
              type="search"
              placeholder="검색"
              trailingIcon={false}
              aria-label="검색"
              width={240}
            />
            <Divider orientation="vertical" length={16} />
            <Select
              type="label"
              label="상태"
              value="전체"
              aria-label="상태 선택"
              style={{ flexShrink: 0, width: 118 }}
            />
          </div>
        </StoryDocsPanelInset>
      </StoryDocsSection>
    </StoryDocsPage>
  ),
};
