import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import type { CSSProperties } from "react";
import { useState } from "react";

import { Button } from "../button/button";

import { Tab, TabList } from "./tab";
import { FigmaLinkCard } from "@/stories/figma-link-card";
import {
  StoryDocsCode,
  StoryDocsInlineCode,
  StoryDocsMatrixPage,
  StoryDocsPage,
  StoryDocsParagraph,
  StoryDocsSection,
  StoryPlaygroundFrame,
} from "@/stories/story-docs-shell";

const meta: Meta<typeof Tab> = {
  title: "Components/Tab",
  component: Tab,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Figma Tabs - level 1 (node 5185:210328) 기반. Tab(단일 item) + TabList(컨테이너). horizontal/vertical 그룹 레이아웃을 지원합니다.",
      },
    },
  },
  argTypes: {
    tabType: { control: { type: "inline-radio" }, options: ["text", "more"] },
    state: {
      control: { type: "inline-radio" },
      options: ["default", "hover", "selected", "disabled"],
    },
    selected: { control: "boolean" },
    disabled: { control: "boolean" },
    leadingIcon: { control: "boolean" },
    closable: { control: "boolean" },
    count: { control: "text" },
    children: { control: "text" },
  },
  args: {
    tabType: "text",
    children: "Tab",
    count: "5",
    leadingIcon: true,
    selected: false,
    disabled: false,
    closable: false,
  },
};

export default meta;
type Story = StoryObj<typeof Tab>;

/* -------------------------------------------------------------------------
 * Default — Docs Primary + Controls
 * ---------------------------------------------------------------------- */
export const Playground: Story = {
  decorators: [
    (Story) => (
      <StoryPlaygroundFrame>
        <Story />
      </StoryPlaygroundFrame>
    ),
  ],
  args: { state: "default" },
};

/* -------------------------------------------------------------------------
 * Matrix — 상태 표 + 그룹 레이아웃 + 인터랙션
 * ---------------------------------------------------------------------- */
const matrixStyle: CSSProperties = {
  display: "grid",
  gridTemplateColumns: "140px repeat(4, minmax(120px, auto))",
  gap: 16,
  alignItems: "center",
  padding: 16,
};

const headerStyle: CSSProperties = {
  fontWeight: 600,
  fontSize: 12,
  color: "#565967",
  textTransform: "uppercase",
  letterSpacing: 0.5,
};

const rowLabelStyle: CSSProperties = {
  fontWeight: 600,
  fontSize: 13,
  color: "#141518",
};

function TabStateMatrixGrid() {
  return (
    <div style={matrixStyle}>
      <span />
      <span style={headerStyle}>Default</span>
      <span style={headerStyle}>Hover</span>
      <span style={headerStyle}>Selected</span>
      <span style={headerStyle}>Disabled</span>

      <span style={rowLabelStyle}>Text</span>
      <Tab tabType="text" state="default" count="5">
        Tab
      </Tab>
      <Tab tabType="text" state="hover" count="5">
        Tab
      </Tab>
      <Tab tabType="text" state="selected" count="5">
        Tab
      </Tab>
      <Tab tabType="text" state="disabled" disabled count="5">
        Tab
      </Tab>

      <span style={rowLabelStyle}>Text (no icon)</span>
      <Tab tabType="text" state="default" leadingIcon={false} count="5">
        Tab
      </Tab>
      <Tab tabType="text" state="hover" leadingIcon={false} count="5">
        Tab
      </Tab>
      <Tab tabType="text" state="selected" leadingIcon={false} count="5">
        Tab
      </Tab>
      <Tab tabType="text" state="disabled" disabled leadingIcon={false} count="5">
        Tab
      </Tab>

      <span style={rowLabelStyle}>Text + Close</span>
      <Tab tabType="text" state="default" closable count="5">
        Tab
      </Tab>
      <Tab tabType="text" state="hover" closable count="5">
        Tab
      </Tab>
      <Tab tabType="text" state="selected" closable count="5">
        Tab
      </Tab>
      <Tab tabType="text" state="disabled" disabled closable count="5">
        Tab
      </Tab>

      <span style={rowLabelStyle}>More</span>
      <Tab tabType="more" state="default" aria-label="more" />
      <Tab tabType="more" state="hover" aria-label="more" />
      <span style={{ color: "#b3b4bc", fontSize: 12 }}>N/A</span>
      <Tab tabType="more" state="disabled" disabled aria-label="more" />
    </div>
  );
}

/* -------------------------------------------------------------------------
 * Horizontal Grouping (Figma node 13282:12683)
 * ---------------------------------------------------------------------- */
type HTabItem = { id: string; label: string };

const H_ITEMS: HTabItem[] = [
  { id: "overview", label: "Overview" },
  { id: "usage", label: "Usage" },
  { id: "review", label: "Review" },
];

function HorizontalBasic({ showMore = false }: { showMore?: boolean }) {
  const [selected, setSelected] = useState<string>("overview");
  return (
    <TabList orientation="horizontal">
      {H_ITEMS.map((item) => (
        <Tab
          key={item.id}
          selected={selected === item.id}
          onClick={() => setSelected(item.id)}
        >
          {item.label}
        </Tab>
      ))}
      {showMore && <Tab tabType="more" aria-label="more" />}
    </TabList>
  );
}

/* -------------------------------------------------------------------------
 * Vertical Grouping (Figma node 13281:28922)
 * ---------------------------------------------------------------------- */
function VerticalBasic({ showMore = false }: { showMore?: boolean }) {
  const [selected, setSelected] = useState<string>("overview");
  return (
    <TabList orientation="vertical" showBorder={false}>
      {H_ITEMS.map((item) => (
        <Tab
          key={item.id}
          selected={selected === item.id}
          onClick={() => setSelected(item.id)}
        >
          {item.label}
        </Tab>
      ))}
      {showMore && <Tab tabType="more" aria-label="more" />}
    </TabList>
  );
}

function TabInteractiveDemo() {
  const [selected, setSelected] = useState<string>("overview");
  const [items, setItems] = useState<HTabItem[]>([
    { id: "overview", label: "Overview" },
    { id: "usage", label: "Usage" },
    { id: "review", label: "Review" },
    { id: "specs", label: "Specs" },
  ]);

  const handleClose = (id: string) => {
    setItems((prev) => {
      const next = prev.filter((it) => it.id !== id);
      if (selected === id && next[0]) {
        setSelected(next[0].id);
      }
      return next;
    });
  };

  return (
    <TabList orientation="horizontal">
      {items.map((item) => (
        <Tab
          key={item.id}
          selected={selected === item.id}
          onClick={() => setSelected(item.id)}
          closable
          onClose={() => handleClose(item.id)}
        >
          {item.label}
        </Tab>
      ))}
    </TabList>
  );
}

const sectionTitleStyle: CSSProperties = {
  fontSize: 13,
  fontWeight: 600,
  marginBottom: 12,
  color: "#141518",
};

export const Matrix: Story = {
  name: "Matrix",
  parameters: { layout: "padded" },
  render: () => (
    <StoryDocsMatrixPage
      title="Tab"
      description="상태 매트릭스와 가로·세로 TabList, overflow·extra 슬롯·closable 인터랙션을 한 페이지에서 비교합니다."
      figmaNode="5185-210328"
    >
      <FigmaLinkCard
        nodeId="5185-210328"
        caption="Components / Tab — Direction × Size × State 매트릭스 원본"
      />
      <section>
        <div style={sectionTitleStyle}>State matrix</div>
        <TabStateMatrixGrid />
      </section>
      <section>
        <div style={sectionTitleStyle}>Horizontal · Basic</div>
        <HorizontalBasic />
      </section>
      <section>
        <div style={sectionTitleStyle}>Horizontal · Overflow</div>
        <HorizontalBasic showMore />
      </section>
      <section>
        <div style={sectionTitleStyle}>Horizontal · Left extra</div>
        <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
          <Button variant="secondary-outline" size="medium">
            Button
          </Button>
          <HorizontalBasic />
        </div>
      </section>
      <section>
        <div style={sectionTitleStyle}>Horizontal · Right extra</div>
        <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
          <HorizontalBasic />
          <Button variant="secondary-outline" size="medium">
            Button
          </Button>
        </div>
      </section>
      <section>
        <div style={sectionTitleStyle}>Horizontal · Both extra</div>
        <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
          <Button variant="secondary-outline" size="medium">
            Button
          </Button>
          <HorizontalBasic />
          <Button variant="secondary-outline" size="medium">
            Button
          </Button>
        </div>
      </section>
      <section>
        <div style={sectionTitleStyle}>Horizontal · Both extra + overflow</div>
        <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
          <Button variant="secondary-outline" size="medium">
            Button
          </Button>
          <HorizontalBasic showMore />
          <Button variant="secondary-outline" size="medium">
            Button
          </Button>
        </div>
      </section>
      <section>
        <div style={sectionTitleStyle}>Vertical · Basic</div>
        <VerticalBasic />
      </section>
      <section>
        <div style={sectionTitleStyle}>Vertical · Overflow</div>
        <VerticalBasic showMore />
      </section>
      <section>
        <div style={sectionTitleStyle}>Vertical · Top extra</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 16, alignItems: "flex-start" }}>
          <Button variant="secondary-outline" size="medium">
            Button
          </Button>
          <VerticalBasic />
        </div>
      </section>
      <section>
        <div style={sectionTitleStyle}>Vertical · Bottom extra</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 16, alignItems: "flex-start" }}>
          <VerticalBasic />
          <Button variant="secondary-outline" size="medium">
            Button
          </Button>
        </div>
      </section>
      <section>
        <div style={sectionTitleStyle}>Vertical · Both extra</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 16, alignItems: "flex-start" }}>
          <Button variant="secondary-outline" size="medium">
            Button
          </Button>
          <VerticalBasic />
          <Button variant="secondary-outline" size="medium">
            Button
          </Button>
        </div>
      </section>
      <section>
        <div style={sectionTitleStyle}>Vertical · Both extra + overflow</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 16, alignItems: "flex-start" }}>
          <Button variant="secondary-outline" size="medium">
            Button
          </Button>
          <VerticalBasic showMore />
          <Button variant="secondary-outline" size="medium">
            Button
          </Button>
        </div>
      </section>
      <section>
        <div style={sectionTitleStyle}>Interactive · closable</div>
        <TabInteractiveDemo />
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
    <StoryDocsPage title="Tab" description="탭 컴포넌트 사용 가이드입니다.">
      <StoryDocsSection title="개요">
        <StoryDocsParagraph>
          <StoryDocsInlineCode>Tab</StoryDocsInlineCode> 단일 항목과{" "}
          <StoryDocsInlineCode>TabList</StoryDocsInlineCode> 컨테이너를 조합합니다. horizontal /
          vertical 그룹, overflow 시 More 탭, closable 과 controlled 선택은 Matrix 스토리를
          참고하세요.
        </StoryDocsParagraph>
      </StoryDocsSection>
      <StoryDocsSection title="코드 예시">
        <StoryDocsCode>{`import { Tab, TabList } from "@/components/tab/tab";

<TabList orientation="horizontal">
  <Tab selected>Overview</Tab>
  <Tab>Usage</Tab>
</TabList>`}</StoryDocsCode>
      </StoryDocsSection>
    </StoryDocsPage>
  ),
};
