import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import type { CSSProperties } from "react";

import { Input } from "@/components/Input/input";
import { Select } from "@/components/select/select";

import { Divider } from "./divider";
import { FigmaLinkCard } from "@/stories/figma-link-card";
import {
  StoryDocsInlineCode,
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
      <StoryDocsSection title="개요">
        <StoryDocsParagraph>
          가로 구분선은 <StoryDocsInlineCode>title</StoryDocsInlineCode> 또는 자식 텍스트로 중앙
          라벨을 넣을 수 있고, 세로 구분은{" "}
          <StoryDocsInlineCode>orientation=&quot;vertical&quot;</StoryDocsInlineCode> 과{" "}
          <StoryDocsInlineCode>length</StoryDocsInlineCode> 로 높이를 조절합니다. Matrix 에서
          가로·세로·타이틀 변형을 확인하세요.
        </StoryDocsParagraph>
      </StoryDocsSection>

      <StoryDocsSection title="세로 구분선 (입력 필드)">
        <StoryDocsParagraph>
          세로 구분선은 입력 필드 사이에 두어 정보를 그룹별로 나눌 때 사용합니다.
        </StoryDocsParagraph>
        <StoryDocsParagraph>
          세로 구분선의 선 길이(높이)는 16px로 고정합니다. 사이 gap은 12px입니다.
        </StoryDocsParagraph>
        <StoryDocsParagraph>
          가이드라인 Option 패턴과 동일하게, 검색{" "}
          <StoryDocsInlineCode>Input</StoryDocsInlineCode> · 세로{" "}
          <StoryDocsInlineCode>Divider</StoryDocsInlineCode>(16px) · 라벨형{" "}
          <StoryDocsInlineCode>Select</StoryDocsInlineCode> 를 한 줄에 배치한 예시입니다.
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
