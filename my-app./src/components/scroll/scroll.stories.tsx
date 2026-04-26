import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import type { CSSProperties } from "react";

import { Scrollbar, ScrollArea } from "./scroll";
import { FigmaLinkCard } from "@/stories/figma-link-card";
import {
  StoryDocsInlineCode,
  StoryDocsMatrixPage,
  StoryDocsPage,
  StoryDocsParagraph,
  StoryDocsSection,
  StoryPlaygroundFrame,
} from "@/stories/story-docs-shell";

const meta: Meta<typeof Scrollbar> = {
  title: "Components/Scroll",
  component: Scrollbar,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Figma MCP 기반 Scrollbar. Scrollbar 는 Figma 시각 재현, ScrollArea 는 실제 overflow 스크롤에 동일한 스타일을 적용합니다. (node 5250:17591)",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    orientation: {
      control: "inline-radio",
      options: ["vertical", "horizontal"],
    },
    size: { control: "inline-radio", options: ["medium", "small"] },
    length: { control: "number" },
    thumbLength: { control: "number" },
    thumbOffset: { control: "number" },
  },
};
export default meta;
type Story = StoryObj<typeof Scrollbar>;

export const Playground: Story = {
  decorators: [
    (Story) => (
      <StoryPlaygroundFrame>
        <Story />
      </StoryPlaygroundFrame>
    ),
  ],
  args: {
    orientation: "vertical",
    size: "medium",
    length: 300,
    thumbLength: 100,
    thumbOffset: 0,
  },
};

const rowLabel: CSSProperties = {
  fontSize: 12,
  color: "var(--context-foreground-surface-on-surface-hint)",
  marginBottom: 8,
};

const DummyList = ({ count = 30 }: { count?: number }) => (
  <ul style={{ margin: 0, padding: 12, fontSize: 13, lineHeight: "20px" }}>
    {Array.from({ length: count }, (_, i) => (
      <li key={i}>
        Item {String(i + 1).padStart(2, "0")} — Lorem ipsum dolor sit amet
      </li>
    ))}
  </ul>
);

const DummyBlock = () => (
  <div
    style={{
      width: 1200,
      height: 400,
      background:
        "repeating-linear-gradient(135deg, #f4f4f5 0 20px, #ececee 20px 40px)",
    }}
  />
);

const boxStyle: CSSProperties = {
  border: "1px solid var(--border-border-surface-border-surface)",
  borderRadius: 8,
  background: "var(--context-background-surface-bg-surface-base)",
  color: "var(--context-foreground-surface-on-surface-base)",
};

const panelStyle: CSSProperties = {
  padding: 24,
  borderRadius: 12,
  minWidth: 520,
  flex: 1,
  background: "var(--context-background-surface-bg-surface-base)",
  color: "var(--context-foreground-surface-on-surface-base)",
  border: "1px solid var(--border-border-surface-border-surface)",
};

function Panel({ theme }: { theme: "light" | "dark" }) {
  return (
    <div data-theme={theme} style={panelStyle}>
      <div style={{ ...rowLabel, fontWeight: 600 }}>{theme.toUpperCase()}</div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "auto auto",
          columnGap: 32,
          rowGap: 32,
          alignItems: "flex-start",
          justifyItems: "start",
        }}
      >
        <div>
          <div style={rowLabel}>Scrollbar M</div>
          <Scrollbar orientation="vertical" size="medium" length={180} thumbLength={70} />
        </div>
        <div>
          <div style={rowLabel}>Scrollbar S</div>
          <Scrollbar orientation="vertical" size="small" length={120} thumbLength={40} />
        </div>
        <div>
          <div style={rowLabel}>ScrollArea M</div>
          <ScrollArea size="medium" maxHeight={180} style={{ width: 240, ...boxStyle }}>
            <DummyList count={20} />
          </ScrollArea>
        </div>
        <div>
          <div style={rowLabel}>ScrollArea S</div>
          <ScrollArea size="small" maxHeight={180} style={{ width: 240, ...boxStyle }}>
            <DummyList count={20} />
          </ScrollArea>
        </div>
      </div>
    </div>
  );
}

export const Matrix: Story = {
  name: "Matrix",
  parameters: { layout: "padded" },
  render: () => (
    <StoryDocsMatrixPage
      title="Scroll"
      description="Scrollbar·ScrollArea의 방향·크기·실제 overflow·라이트·다크를 비교합니다."
      figmaNode="5250-17591"
    >
      <FigmaLinkCard
        nodeId="5250-17591"
        caption="Components / Scroll — 구성 매트릭스 원본"
      />
      <section>
        <h4 style={{ margin: "0 0 12px", fontSize: 13, fontWeight: 600 }}>Scrollbar — 4 variants</h4>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, auto)",
            columnGap: 48,
            rowGap: 32,
            alignItems: "flex-start",
            justifyItems: "start",
          }}
        >
          <div>
            <div style={rowLabel}>Vertical · Medium (12 / thumb 6)</div>
            <Scrollbar orientation="vertical" size="medium" length={300} thumbLength={100} />
          </div>
          <div>
            <div style={rowLabel}>Vertical · Small (8 / thumb 4)</div>
            <Scrollbar orientation="vertical" size="small" length={100} thumbLength={30} />
          </div>
          <div>
            <div style={rowLabel}>Horizontal · Medium (12 / thumb 6)</div>
            <Scrollbar
              orientation="horizontal"
              size="medium"
              length={300}
              thumbLength={100}
            />
          </div>
          <div>
            <div style={rowLabel}>Horizontal · Small (8 / thumb 4)</div>
            <Scrollbar
              orientation="horizontal"
              size="small"
              length={100}
              thumbLength={30}
            />
          </div>
        </div>
      </section>

      <section>
        <h4 style={{ margin: "0 0 12px", fontSize: 13, fontWeight: 600 }}>ScrollArea — Medium</h4>
        <div style={{ display: "flex", gap: 32, flexWrap: "wrap" }}>
          <div>
            <div style={rowLabel}>Vertical scroll</div>
            <ScrollArea
              size="medium"
              orientation="vertical"
              maxHeight={260}
              style={{ width: 280, ...boxStyle }}
            >
              <DummyList />
            </ScrollArea>
          </div>
          <div>
            <div style={rowLabel}>Horizontal scroll</div>
            <ScrollArea size="medium" orientation="horizontal" maxWidth={360} style={{ ...boxStyle }}>
              <DummyBlock />
            </ScrollArea>
          </div>
          <div>
            <div style={rowLabel}>Both (vertical + horizontal)</div>
            <ScrollArea
              size="medium"
              orientation="both"
              maxHeight={260}
              maxWidth={360}
              style={{ ...boxStyle }}
            >
              <DummyBlock />
            </ScrollArea>
          </div>
        </div>
      </section>

      <section>
        <h4 style={{ margin: "0 0 12px", fontSize: 13, fontWeight: 600 }}>ScrollArea — Small</h4>
        <div style={{ display: "flex", gap: 32, flexWrap: "wrap" }}>
          <div>
            <div style={rowLabel}>Vertical scroll · Small</div>
            <ScrollArea
              size="small"
              orientation="vertical"
              maxHeight={200}
              style={{ width: 240, ...boxStyle }}
            >
              <DummyList count={20} />
            </ScrollArea>
          </div>
          <div>
            <div style={rowLabel}>Horizontal scroll · Small</div>
            <ScrollArea size="small" orientation="horizontal" maxWidth={280} style={{ ...boxStyle }}>
              <DummyBlock />
            </ScrollArea>
          </div>
        </div>
      </section>

      <section>
        <h4 style={{ margin: "0 0 12px", fontSize: 13, fontWeight: 600 }}>Light vs Dark</h4>
        <div style={{ display: "flex", gap: 24, flexWrap: "wrap", alignItems: "flex-start" }}>
          <Panel theme="light" />
          <Panel theme="dark" />
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
    <StoryDocsPage title="Scroll" description="스크롤바·스크롤 영역 컴포넌트 가이드입니다.">
      <StoryDocsSection title="개요">
        <StoryDocsParagraph>
          <StoryDocsInlineCode>Scrollbar</StoryDocsInlineCode> 는 디자인 스펙 시각화용이고, 실제
          스크롤이 필요한 영역에는 <StoryDocsInlineCode>ScrollArea</StoryDocsInlineCode> 를
          사용합니다. <StoryDocsInlineCode>size</StoryDocsInlineCode>·
          <StoryDocsInlineCode>orientation</StoryDocsInlineCode>·
          <StoryDocsInlineCode>maxHeight</StoryDocsInlineCode>/
          <StoryDocsInlineCode>maxWidth</StoryDocsInlineCode> 조합은 Matrix 에서 확인하세요.
        </StoryDocsParagraph>
      </StoryDocsSection>
    </StoryDocsPage>
  ),
};
