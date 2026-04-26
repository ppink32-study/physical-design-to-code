import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import type { CSSProperties } from "react";

import {
  HelpIconWithTooltip,
  Tooltip,
  type TooltipDirection,
} from "./tooltip";
import { FigmaLinkCard } from "@/stories/figma-link-card";
import {
  StoryDocsInlineCode,
  StoryDocsMatrixPage,
  StoryDocsPage,
  StoryDocsParagraph,
  StoryDocsSection,
  StoryPlaygroundFrame,
} from "@/stories/story-docs-shell";

const meta: Meta<typeof Tooltip> = {
  title: "Components/Tooltip",
  component: Tooltip,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Figma MCP 기반 Tooltip. 4방향(top/bottom/left/right) + 화살표 on/off 변형을 지원하며, hover/focus 에 자동 반응하는 Uncontrolled 모드와 open prop 을 통한 Controlled 모드를 모두 제공합니다. 버튼 트리거와는 함께 사용하지 않으며, 라벨 · 아이콘 · 인라인 텍스트 옆의 보조 설명 용도로 사용합니다. (node 5543:321819, 13300:13569)",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    direction: {
      control: "inline-radio",
      options: ["top", "bottom", "left", "right"],
    },
    trailing: { control: "boolean" },
    title: { control: "text" },
    content: { control: "text" },
    openDelay: { control: { type: "number", min: 0, step: 50 } },
    closeDelay: { control: { type: "number", min: 0, step: 50 } },
    disabled: { control: "boolean" },
    maxWidth: { control: { type: "number", min: 80, step: 20 } },
    gap: { control: { type: "number", min: 0, max: 24, step: 1 } },
  },
};
export default meta;
type Story = StoryObj<typeof Tooltip>;


export const Playground: Story = {
  decorators: [
    (Story) => (
      <StoryPlaygroundFrame>
        <Story />
      </StoryPlaygroundFrame>
    ),
  ],
  args: {
    title: "Title",
    content: "Tooltip text",
    direction: "top",
    trailing: true,
    openDelay: 100,
    closeDelay: 0,
    gap: 8,
  },
};

/* =================================================================
 * Styles
 * =============================================================== */
const gridStyle: CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(4, 1fr)",
  gap: 80,
  padding: 80,
};
const cellStyle: CSSProperties = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: 16,
};
const captionStyle: CSSProperties = {
  fontSize: 12,
  color: "var(--context-foreground-surface-on-surface-sub)",
};
const triggerTextStyle: CSSProperties = {
  fontFamily: "var(--font-family-korean, Pretendard)",
  fontSize: 14,
  lineHeight: "20px",
  color: "var(--context-foreground-surface-on-surface-base)",
  borderBottom: "1px dashed var(--context-foreground-surface-on-surface-sub)",
  cursor: "help",
  outline: "none",
  padding: "2px 0",
};

const DIRECTIONS: TooltipDirection[] = ["top", "right", "bottom", "left"];

const helpRowStyle: CSSProperties = {
  display: "flex",
  gap: 48,
  padding: "48px 24px",
  alignItems: "center",
  flexWrap: "wrap",
};

export const Matrix: Story = {
  name: "Matrix",
  parameters: { layout: "padded" },
  render: () => (
    <StoryDocsMatrixPage
      title="Tooltip"
      description="방향·타이틀 유무·trailing 화살표·HelpIcon·폼 라벨·긴 본문 등 툴팁 배치와 변형을 비교합니다."
      figmaNode="5543-321819"
    >
      <FigmaLinkCard
        nodeId="5543-321819"
        caption="Components / Tooltip — Placement 매트릭스 원본"
      />
      <section>
        <h4 style={{ margin: "0 0 12px", fontSize: 13, fontWeight: 600 }}>Directions</h4>
        <div style={gridStyle}>
          {DIRECTIONS.map((dir) => (
            <div key={dir} style={cellStyle}>
              <Tooltip
                title="Title"
                content="Tooltip text"
                direction={dir}
                defaultOpen
                openDelay={0}
              >
                <span tabIndex={0} style={triggerTextStyle}>
                  {dir}
                </span>
              </Tooltip>
              <span style={captionStyle}>direction=&quot;{dir}&quot;</span>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h4 style={{ margin: "0 0 12px", fontSize: 13, fontWeight: 600 }}>Title on / off</h4>
        <div style={{ ...gridStyle, gridTemplateColumns: "repeat(2, 1fr)" }}>
          <div style={cellStyle}>
            <Tooltip title="Title" content="Tooltip text" defaultOpen openDelay={0}>
              <span tabIndex={0} style={triggerTextStyle}>
                title + text
              </span>
            </Tooltip>
            <span style={captionStyle}>title + text</span>
          </div>
          <div style={cellStyle}>
            <Tooltip content="Tooltip text" defaultOpen openDelay={0}>
              <span tabIndex={0} style={triggerTextStyle}>
                text only
              </span>
            </Tooltip>
            <span style={captionStyle}>text only</span>
          </div>
        </div>
      </section>

      <section>
        <h4 style={{ margin: "0 0 12px", fontSize: 13, fontWeight: 600 }}>Trailing (arrow)</h4>
        <div style={{ ...gridStyle, gridTemplateColumns: "repeat(2, 1fr)" }}>
          <div style={cellStyle}>
            <Tooltip
              title="Title"
              content="Tooltip text"
              trailing
              defaultOpen
              openDelay={0}
            >
              <span tabIndex={0} style={triggerTextStyle}>
                trailing=true
              </span>
            </Tooltip>
            <span style={captionStyle}>arrow 표시</span>
          </div>
          <div style={cellStyle}>
            <Tooltip
              title="Title"
              content="Tooltip text"
              trailing={false}
              defaultOpen
              openDelay={0}
            >
              <span tabIndex={0} style={triggerTextStyle}>
                trailing=false
              </span>
            </Tooltip>
            <span style={captionStyle}>arrow 생략</span>
          </div>
        </div>
      </section>

      <section>
        <h4 style={{ margin: "0 0 12px", fontSize: 13, fontWeight: 600 }}>HelpIconWithTooltip</h4>
        <div style={helpRowStyle}>
          {DIRECTIONS.map((dir) => (
            <div key={dir} style={cellStyle}>
              <HelpIconWithTooltip
                title="Title"
                content="Tooltip text"
                direction={dir}
                defaultOpen
                openDelay={0}
              />
              <span style={captionStyle}>direction=&quot;{dir}&quot;</span>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h4 style={{ margin: "0 0 12px", fontSize: 13, fontWeight: 600 }}>With form label</h4>
        <div style={{ padding: 24, display: "flex", flexDirection: "column", gap: 24 }}>
          <label
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 4,
              fontSize: 14,
              fontWeight: 500,
              color: "var(--context-foreground-surface-on-surface-base)",
            }}
          >
            프로젝트 이름
            <HelpIconWithTooltip
              title="프로젝트 이름"
              content="영문/숫자 조합으로 최대 40자까지 입력할 수 있습니다."
              direction="top"
              iconSize={16}
            />
          </label>
        </div>
      </section>

      <section>
        <h4 style={{ margin: "0 0 12px", fontSize: 13, fontWeight: 600 }}>Long content (max-width)</h4>
        <div style={{ padding: 24 }}>
          <Tooltip
            title="Long content"
            content="툴팁은 240px 최대 너비를 가지며, 그 이상 길어지면 자동으로 줄바꿈 됩니다. word-break: keep-all 로 한글 가독성을 유지합니다."
            defaultOpen
            openDelay={0}
          >
            <span tabIndex={0} style={triggerTextStyle}>
              긴 문장 예시
            </span>
          </Tooltip>
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
    <StoryDocsPage title="Tooltip" description="보조 설명용 툴팁 컴포넌트 가이드입니다.">
      <StoryDocsSection title="개요">
        <StoryDocsParagraph>
          버튼 트리거와는 쓰지 말고, 라벨·인라인 텍스트·아이콘 옆 보조 설명에 맞춥니다.{" "}
          <StoryDocsInlineCode>HelpIconWithTooltip</StoryDocsInlineCode> 은 폼 라벨과 조합하는 권장
          패턴입니다. 방향·타이틀·화살표·긴 문장 동작은 Matrix 에서 확인하세요.
        </StoryDocsParagraph>
      </StoryDocsSection>
    </StoryDocsPage>
  ),
};
