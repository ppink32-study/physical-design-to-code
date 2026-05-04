import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import type { CSSProperties, ReactNode } from "react";
import { useState } from "react";

import { Button } from "../button/button/button";
import { Tab, TabList } from "./tab";
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
  StoryDocsParagraph,
  StoryDocsSection,
  StoryPlaygroundFrame,
} from "@/stories/story-docs-shell";

const meta: Meta<typeof Tab> = {
  title: "Components/Tab",
  component: Tab,
  parameters: {
    layout: "padded",
    docs: { disable: true },
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

const matrixScrollWrap = storyMatrixScrollWrap;
const matrixTableBase = storyMatrixTableBase;
const matrixColHeaderStyle = storyMatrixColHeaderStyle;
const matrixRowHeaderStyle = storyMatrixRowHeaderStyle;
const matrixStickyCornerStyle = storyMatrixStickyCornerStyle;

const matrixCellDemo: CSSProperties = {
  ...storyMatrixCellStyle,
  verticalAlign: "middle",
};

const matrixCellWide: CSSProperties = {
  ...matrixCellDemo,
  minWidth: 200,
};

const matrixCellGroup: CSSProperties = {
  ...matrixCellDemo,
  minWidth: 180,
  maxWidth: 320,
};

const sectionTitleStyle: CSSProperties = {
  fontSize: 14,
  fontWeight: 600,
  marginTop: 32,
  marginBottom: 12,
  color: "var(--context-foreground-surface-on-surface-base)",
};

const Section = ({ title, children }: { title: string; children: ReactNode }) => (
  <section>
    <h3 style={sectionTitleStyle}>{title}</h3>
    {children}
  </section>
);

const extraButton = (
  <Button variant="secondary-outline" size="medium">
    Button
  </Button>
);

const hFlexEnd: CSSProperties = {
  display: "flex",
  alignItems: "flex-end",
  gap: 12,
  flexWrap: "nowrap",
};

const vFlexStart: CSSProperties = {
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  gap: 16,
};

/* -------------------------------------------------------------------------
 * Playground
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
 * Tab Level 1 — 행: 상태 / 열: Text · More (Figma)
 * ---------------------------------------------------------------------- */
const LEVEL1_STATES = [
  { key: "default", label: "Default" },
  { key: "hover", label: "Hover" },
  { key: "selected", label: "Selected" },
  { key: "disabled", label: "Disabled" },
] as const;

function TabLevel1MatrixTable() {
  return (
    <div style={matrixScrollWrap}>
      <table style={matrixTableBase}>
        <thead>
          <tr>
            <th
              scope="col"
              style={{
                ...matrixColHeaderStyle,
                ...matrixStickyCornerStyle,
                minWidth: 120,
                zIndex: 2,
              }}
              aria-hidden
            />
            <th scope="col" style={matrixColHeaderStyle}>
              Text
            </th>
            <th scope="col" style={matrixColHeaderStyle}>
              More
            </th>
          </tr>
        </thead>
        <tbody>
          {LEVEL1_STATES.map((row) => (
            <tr key={row.key}>
              <th
                scope="row"
                style={{
                  ...matrixRowHeaderStyle,
                  ...matrixStickyCornerStyle,
                }}
              >
                {row.label}
              </th>
              <td style={matrixCellDemo}>
                <TabList orientation="horizontal" showBorder={row.key !== "disabled"}>
                  <Tab
                    tabType="text"
                    state={row.key}
                    disabled={row.key === "disabled"}
                    count="5"
                    leadingIcon
                  >
                    Tab
                  </Tab>
                </TabList>
              </td>
              <td style={matrixCellDemo}>
                {row.key === "selected" ? (
                  <span
                    style={{
                      fontSize: 12,
                      color: "var(--context-foreground-surface-on-surface-secondary)",
                    }}
                  >
                    —
                  </span>
                ) : (
                  <TabList orientation="horizontal" showBorder={false}>
                    <Tab
                      tabType="more"
                      state={row.key}
                      disabled={row.key === "disabled"}
                      aria-label="more tabs"
                    />
                  </TabList>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/* -------------------------------------------------------------------------
 * Horizontal grouping — 열: 시나리오 (Figma Horizontal Grouping)
 * ---------------------------------------------------------------------- */
const IDS3 = ["t1", "t2", "t3"] as const;
const IDS2 = ["t1", "t2"] as const;

function TabStripHorizontal({
  ids,
  selected,
  onSelect,
  showMore,
}: {
  ids: readonly string[];
  selected: string;
  onSelect: (id: string) => void;
  showMore?: boolean;
}) {
  return (
    <TabList orientation="horizontal">
      {ids.map((id) => (
        <Tab
          key={id}
          selected={selected === id}
          count="5"
          leadingIcon
          onClick={() => onSelect(id)}
        >
          Tab
        </Tab>
      ))}
      {showMore ? <Tab tabType="more" aria-label="more tabs" /> : null}
    </TabList>
  );
}

function HMatrixBasic() {
  const [selected, setSelected] = useState<string>("t1");
  return <TabStripHorizontal ids={IDS3} selected={selected} onSelect={setSelected} />;
}

function HMatrixOverflow() {
  const [selected, setSelected] = useState<string>("t1");
  return (
    <TabStripHorizontal ids={IDS3} selected={selected} onSelect={setSelected} showMore />
  );
}

function HMatrixLeftExtra() {
  const [selected, setSelected] = useState<string>("t1");
  return (
    <div style={hFlexEnd}>
      {extraButton}
      <TabStripHorizontal ids={IDS3} selected={selected} onSelect={setSelected} />
    </div>
  );
}

function HMatrixRightExtra() {
  const [selected, setSelected] = useState<string>("t1");
  return (
    <div style={hFlexEnd}>
      <TabStripHorizontal ids={IDS3} selected={selected} onSelect={setSelected} />
      {extraButton}
    </div>
  );
}

function HMatrixTwoSide() {
  const [selected, setSelected] = useState<string>("t2");
  return (
    <div style={hFlexEnd}>
      {extraButton}
      <TabStripHorizontal ids={IDS3} selected={selected} onSelect={setSelected} />
      {extraButton}
    </div>
  );
}

function HMatrixLeftOverflow() {
  const [selected, setSelected] = useState<string>("t1");
  return (
    <div style={hFlexEnd}>
      {extraButton}
      <TabStripHorizontal ids={IDS3} selected={selected} onSelect={setSelected} showMore />
    </div>
  );
}

function HMatrixRightOverflow() {
  const [selected, setSelected] = useState<string>("t1");
  return (
    <div style={hFlexEnd}>
      <TabStripHorizontal ids={IDS3} selected={selected} onSelect={setSelected} showMore />
      {extraButton}
    </div>
  );
}

function HMatrixTwoSideOverflow() {
  const [selected, setSelected] = useState<string>("t1");
  return (
    <div style={hFlexEnd}>
      {extraButton}
      <TabStripHorizontal ids={IDS3} selected={selected} onSelect={setSelected} showMore />
      {extraButton}
    </div>
  );
}

function HorizontalGroupingMatrixTable() {
  const rows = [
    { key: "basic", label: "Basic", Demo: HMatrixBasic },
    { key: "overflow", label: "Overflow", Demo: HMatrixOverflow },
    { key: "left", label: "Left extra", Demo: HMatrixLeftExtra },
    { key: "right", label: "Right extra", Demo: HMatrixRightExtra },
    { key: "2side", label: "2-side extra", Demo: HMatrixTwoSide },
    { key: "leftOv", label: "Left + overflow", Demo: HMatrixLeftOverflow },
    { key: "rightOv", label: "Right + overflow", Demo: HMatrixRightOverflow },
    { key: "2sideOv", label: "2-side + overflow", Demo: HMatrixTwoSideOverflow },
  ] as const;

  return (
    <div style={matrixScrollWrap}>
      <table style={matrixTableBase}>
        <thead>
          <tr>
            <th
              style={{
                ...matrixColHeaderStyle,
                ...matrixStickyCornerStyle,
                minWidth: 160,
                zIndex: 2,
              }}
              aria-hidden
            />
            <th scope="col" style={matrixColHeaderStyle}>
              Sample
            </th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => {
            const Cell = r.Demo;
            return (
              <tr key={r.key}>
                <th
                  scope="row"
                  style={{
                    ...matrixRowHeaderStyle,
                    ...matrixStickyCornerStyle,
                    whiteSpace: "nowrap",
                  }}
                >
                  {r.label}
                </th>
                <td style={{ ...matrixCellGroup, minWidth: 320 }}>
                  <div style={hFlexEnd}>
                    <Cell />
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

/* -------------------------------------------------------------------------
 * Vertical grouping (Figma Vertical Grouping)
 * ---------------------------------------------------------------------- */
function TabStripVertical({
  ids,
  selected,
  onSelect,
  showMore,
}: {
  ids: readonly string[];
  selected: string;
  onSelect: (id: string) => void;
  showMore?: boolean;
}) {
  return (
    <TabList orientation="vertical" showBorder={false}>
      {ids.map((id) => (
        <Tab
          key={id}
          selected={selected === id}
          count="5"
          leadingIcon
          onClick={() => onSelect(id)}
        >
          Tab
        </Tab>
      ))}
      {showMore ? <Tab tabType="more" aria-label="more tabs" /> : null}
    </TabList>
  );
}

function VMatrixBasic() {
  const [selected, setSelected] = useState("t1");
  return <TabStripVertical ids={IDS3} selected={selected} onSelect={setSelected} />;
}

function VMatrixOverflow() {
  const [selected, setSelected] = useState("t1");
  return <TabStripVertical ids={IDS2} selected={selected} onSelect={setSelected} showMore />;
}

function VMatrixTopExtra() {
  const [selected, setSelected] = useState("t2");
  return (
    <div style={vFlexStart}>
      {extraButton}
      <TabStripVertical ids={IDS3} selected={selected} onSelect={setSelected} />
    </div>
  );
}

function VMatrixBottomExtra() {
  const [selected, setSelected] = useState("t1");
  return (
    <div style={vFlexStart}>
      <TabStripVertical ids={IDS3} selected={selected} onSelect={setSelected} />
      {extraButton}
    </div>
  );
}

function VMatrixTwoSide() {
  const [selected, setSelected] = useState("t2");
  return (
    <div style={vFlexStart}>
      {extraButton}
      <TabStripVertical ids={IDS3} selected={selected} onSelect={setSelected} />
      {extraButton}
    </div>
  );
}

function VMatrixTopOverflow() {
  const [selected, setSelected] = useState("t1");
  return (
    <div style={vFlexStart}>
      {extraButton}
      <TabStripVertical ids={IDS3} selected={selected} onSelect={setSelected} showMore />
    </div>
  );
}

function VMatrixBottomOverflow() {
  const [selected, setSelected] = useState("t1");
  return (
    <div style={vFlexStart}>
      <TabStripVertical ids={IDS2} selected={selected} onSelect={setSelected} showMore />
      {extraButton}
    </div>
  );
}

function VMatrixTwoSideOverflow() {
  const [selected, setSelected] = useState("t2");
  return (
    <div style={vFlexStart}>
      {extraButton}
      <TabStripVertical ids={IDS2} selected={selected} onSelect={setSelected} showMore />
      {extraButton}
    </div>
  );
}

function VerticalGroupingMatrixBlock({
  title,
  cols,
}: {
  title: string;
  cols: readonly { key: string; label: string; Demo: React.ComponentType }[];
}) {
  return (
    <>
      <h4
        style={{
          fontSize: 12,
          fontWeight: 600,
          marginBottom: 8,
          color: "var(--context-foreground-surface-on-surface-secondary)",
        }}
      >
        {title}
      </h4>
      <div style={matrixScrollWrap}>
        <table style={matrixTableBase}>
          <thead>
            <tr>
              <th
                style={{
                  ...matrixColHeaderStyle,
                  ...matrixStickyCornerStyle,
                  minWidth: 88,
                  zIndex: 2,
                }}
                aria-hidden
              />
              {cols.map((c) => (
                <th key={c.key} scope="col" style={matrixColHeaderStyle}>
                  {c.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr>
              <th
                scope="row"
                style={{
                  ...matrixRowHeaderStyle,
                  ...matrixStickyCornerStyle,
                }}
              >
                Sample
              </th>
              {cols.map((c) => {
                const Cell = c.Demo;
                return (
                  <td key={c.key} style={matrixCellWide}>
                    <div style={vFlexStart}>
                      <Cell />
                    </div>
                  </td>
                );
              })}
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
}

export const Matrix: Story = {
  name: "Matrix",
  parameters: { layout: "padded" },
  render: () => (
    <StoryDocsMatrixPage
      title="Tab"
      description="Tab Level 1(상태×Text/More), Horizontal Grouping, Vertical Grouping 을 표 형태로 정리했습니다. 셀 안 샘플은 Figma와 동일하게 Tab·숫자·Gear·More·Extra Button 조합입니다."
      figmaNode="5185-210328"
    >
      <FigmaLinkCard
        nodeId="5185-210328"
        caption="Components / Tab — Tab Level 1 · Grouping 매트릭스"
      />

      <Section title="Tab Level 1">
        <TabLevel1MatrixTable />
      </Section>

      <Section title="Horizontal grouping">
        <HorizontalGroupingMatrixTable />
      </Section>

      <Section title="Vertical grouping">
        <VerticalGroupingMatrixBlock
          title="기본 · overflow · extra"
          cols={[
            { key: "basic", label: "Basic", Demo: VMatrixBasic },
            { key: "overflow", label: "Overflow", Demo: VMatrixOverflow },
            { key: "top", label: "Top extra", Demo: VMatrixTopExtra },
            { key: "bottom", label: "Bottom extra", Demo: VMatrixBottomExtra },
            { key: "2side", label: "2-side extra", Demo: VMatrixTwoSide },
          ]}
        />
        <div style={{ marginTop: 24 }} />
        <VerticalGroupingMatrixBlock
          title="Extra + overflow"
          cols={[
            { key: "topOv", label: "Top + overflow", Demo: VMatrixTopOverflow },
            { key: "botOv", label: "Bottom + overflow", Demo: VMatrixBottomOverflow },
            { key: "2sideOv", label: "2-side + overflow", Demo: VMatrixTwoSideOverflow },
          ]}
        />
      </Section>
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
          <StoryDocsInlineCode>TabList</StoryDocsInlineCode> 컨테이너를 조합합니다. Level 1
          상태·Text/More 타입, 가로·세로 그룹·overflow·extra 슬롯 조합은 Matrix 스토리 표를
          참고하세요.
        </StoryDocsParagraph>
      </StoryDocsSection>
    </StoryDocsPage>
  ),
};
