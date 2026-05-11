import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import type { CSSProperties, ReactNode } from "react";

import { Tree, TreeNodeRow } from "./tree";
import type { NodeLevel, NodeState, TreeItem } from "./tree";
import { FigmaLinkCard } from "@/stories/figma-link-card";
import {
  storyMatrixTableBase,
  storyMatrixColHeaderStyle,
  storyMatrixRowHeaderStyle,
  storyMatrixCellStyle,
  storyMatrixScrollWrap,
  storyMatrixStickyCornerStyle,
} from "@/stories/story-matrix-table-styles";
import {
  StoryDocsMatrixPage,
  StoryDocsNote,
  StoryDocsPage,
  StoryDocsParagraph,
  StoryDocsSection,
  StoryPlaygroundFrame,
} from "@/stories/story-docs-shell";

/* =================================================================
 * Meta
 * =============================================================== */
const meta: Meta<typeof TreeNodeRow> = {
  title: "Components/Tree",
  component: TreeNodeRow,
  parameters: {
    layout: "centered",
    docs: { disable: true },
    controls: { sort: "none" },
  },
  argTypes: {
    level: {
      control: "select",
      options: [1, 2, 3, 4, 5] satisfies NodeLevel[],
    },
    state: {
      control: "inline-radio",
      options: [
        "default",
        "hover",
        "focus",
        "selected",
        "disabled",
      ] satisfies NodeState[],
    },
    showArrow: { control: "boolean" },
    expanded: { control: "boolean" },
    checkbox: { control: "boolean" },
    leadingIcon: { control: "boolean" },
    count: { control: "number" },
  },
  args: {
    label: "1depth Name",
    count: 5,
    level: 1,
    state: "default",
    showArrow: true,
    expanded: false,
    checkbox: false,
    leadingIcon: false,
  },
};
export default meta;
type Story = StoryObj<typeof TreeNodeRow>;

/* =================================================================
 * Playground
 * =============================================================== */
export const Default: Story = {
  name: "Default (Playground)",
  render: (args) => (
    <StoryPlaygroundFrame>
      <div style={{ width: 244 }}>
        <TreeNodeRow {...args} />
      </div>
    </StoryPlaygroundFrame>
  ),
};

/* =================================================================
 * Matrix — States × Levels
 * =============================================================== */

const STATES: NodeState[] = ["default", "hover", "focus", "selected", "disabled"];
const LEVELS: NodeLevel[] = [1, 2, 3, 4, 5];

const STATE_LABELS: Record<NodeState, string> = {
  default: "Default",
  hover: "Hover",
  focus: "Focus",
  selected: "Selected",
  disabled: "Disable",
};

const LEVEL_LABELS: Record<NodeLevel, string> = {
  1: "Level 1",
  2: "Level 2",
  3: "Level 3",
  4: "Level 4",
  5: "Level 5",
};

const LEVEL_LABELS_TEXT: Record<NodeLevel, string> = {
  1: "1depth Name",
  2: "2depth Name",
  3: "3depth Name",
  4: "4depth Name",
  5: "5depth Name",
};

const nodeCellStyle: CSSProperties = {
  ...storyMatrixCellStyle,
  padding: "8px 12px",
  background: "var(--context-background-surface-bg-surface-base)",
};

const nodeWrapStyle: CSSProperties = {
  width: 200,
};

function MatrixSection({
  title,
  checkbox,
  leadingIcon,
}: {
  title: string;
  checkbox: boolean;
  leadingIcon: boolean;
}) {
  return (
    <div style={{ marginBottom: 40 }}>
      <p
        style={{
          fontSize: 13,
          fontWeight: 600,
          marginBottom: 12,
          color: "var(--context-foreground-surface-on-surface-base)",
        }}
      >
        {title}
      </p>
      <div style={storyMatrixScrollWrap}>
        <table style={storyMatrixTableBase}>
          <thead>
            <tr>
              <th style={{ ...storyMatrixColHeaderStyle, ...storyMatrixStickyCornerStyle }}>
                Level / State
              </th>
              {STATES.map((s) => (
                <th key={s} style={storyMatrixColHeaderStyle}>
                  {STATE_LABELS[s]}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {LEVELS.map((level) => (
              <tr key={level}>
                <th
                  scope="row"
                  style={{ ...storyMatrixRowHeaderStyle, ...storyMatrixStickyCornerStyle }}
                >
                  {LEVEL_LABELS[level]}
                </th>
                {STATES.map((state) => {
                  const hasArrow = level < 5 && state !== "selected";
                  const isExpanded = state === "focus";
                  return (
                    <td key={state} style={nodeCellStyle}>
                      <div style={nodeWrapStyle}>
                        <TreeNodeRow
                          label={LEVEL_LABELS_TEXT[level]}
                          count={5}
                          level={level}
                          state={state}
                          showArrow={hasArrow}
                          expanded={isExpanded}
                          checkbox={checkbox}
                          leadingIcon={leadingIcon}
                        />
                      </div>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export const Matrix: Story = {
  name: "Matrix",
  render: () => (
    <StoryDocsMatrixPage title="Tree Node">
      <FigmaLinkCard
        url="https://www.figma.com/design/myQPboBEUAPxUwlvH9MH2R/Physical-AI-Platfrom-Design-Guideline?node-id=6786-991"
        nodeId="6786-991"
        caption="Tree — node 6786:991"
      />
      <FigmaLinkCard
        url="https://www.figma.com/design/myQPboBEUAPxUwlvH9MH2R/Physical-AI-Platfrom-Design-Guideline?node-id=12044-13917"
        nodeId="12044-13917"
        caption="Tree View — node 12044:13917"
      />

      <MatrixSection title="Basic (arrow only)" checkbox={false} leadingIcon={false} />
      <MatrixSection title="Leading Icon" checkbox={false} leadingIcon={true} />
      <MatrixSection title="Selectable (checkbox + icon)" checkbox={true} leadingIcon={true} />
    </StoryDocsMatrixPage>
  ),
};

/* =================================================================
 * Tree View — Interactive
 * =============================================================== */

const DEMO_ITEMS: TreeItem[] = [
  {
    id: "root1",
    label: "1depth Name",
    count: 5,
    children: [
      {
        id: "l2a",
        label: "2depth Name",
        count: 5,
        children: [
          {
            id: "l3a",
            label: "3depth Name",
            count: 5,
            children: [
              {
                id: "l4a",
                label: "4depth Name",
                count: 5,
                children: [
                  { id: "l5a", label: "5depth Name", count: 5 },
                  { id: "l5b", label: "5depth Name", count: 5 },
                  { id: "l5c", label: "5depth Name", count: 5 },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "root2",
    label: "1depth Name",
    count: 5,
    children: [
      { id: "r2l2a", label: "2depth Name", count: 5 },
    ],
  },
  {
    id: "root3",
    label: "1depth Name",
    count: 5,
    disabled: true,
    children: [
      { id: "r3l2a", label: "2depth Name", count: 5, disabled: true },
    ],
  },
];

const treeViewWrapStyle: CSSProperties = {
  display: "flex",
  gap: 24,
  alignItems: "flex-start",
  flexWrap: "wrap",
};

const treeViewLabelStyle: CSSProperties = {
  fontSize: 12,
  fontWeight: 600,
  color: "var(--context-foreground-surface-on-surface-secondary)",
  marginBottom: 8,
  textTransform: "uppercase",
  letterSpacing: "0.04em",
};

export const TreeViewStory: Story = {
  name: "Tree View",
  render: () => (
    <StoryPlaygroundFrame>
      <div style={treeViewWrapStyle}>
        <div>
          <p style={treeViewLabelStyle}>Basic</p>
          <Tree items={DEMO_ITEMS} defaultExpandedIds={["root1", "l2a", "l3a", "l4a"]} />
        </div>
        <div>
          <p style={treeViewLabelStyle}>Leading Icon</p>
          <Tree
            items={DEMO_ITEMS}
            leadingIcon
            defaultExpandedIds={["root1", "l2a", "l3a", "l4a"]}
          />
        </div>
        <div>
          <p style={treeViewLabelStyle}>Selectable</p>
          <Tree
            items={DEMO_ITEMS}
            selectable
            defaultExpandedIds={["root1", "l2a", "l3a", "l4a"]}
          />
        </div>
      </div>
    </StoryPlaygroundFrame>
  ),
};

/* =================================================================
 * Guideline
 * =============================================================== */

const anatomyListStyle: CSSProperties = {
  margin: "16px 0 0",
  padding: 0,
  listStyle: "none",
  display: "flex",
  flexDirection: "column",
  gap: 10,
};

const anatomyItemStyle: CSSProperties = {
  display: "flex",
  gap: 10,
  alignItems: "flex-start",
  fontSize: 14,
  lineHeight: "22px",
  color: "var(--context-foreground-surface-on-surface-base, #141518)",
};

const anatomyBadgeStyle: CSSProperties = {
  flexShrink: 0,
  width: 20,
  height: 20,
  borderRadius: 999,
  background: "var(--context-background-gray-bg-darkgray, #26282e)",
  color: "#fff",
  fontSize: 10,
  fontWeight: 700,
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  marginTop: 1,
};

function AnatomyItem({ num, children }: { num: number; children: ReactNode }) {
  return (
    <li style={anatomyItemStyle}>
      <span style={anatomyBadgeStyle}>{num}</span>
      <span>{children}</span>
    </li>
  );
}

const GUIDELINE_ITEMS: TreeItem[] = [
  {
    id: "g-root1",
    label: "1depth Name",
    count: 5,
    children: [
      {
        id: "g-l2a",
        label: "2depth Name",
        count: 5,
        children: [
          {
            id: "g-l3a",
            label: "3depth Name",
            count: 5,
            children: [
              {
                id: "g-l4a",
                label: "4depth Name",
                count: 5,
                children: [
                  { id: "g-l5a", label: "5depth Name", count: 5 },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
];

export const Guideline: Story = {
  name: "Guideline",
  parameters: {
    layout: "padded",
    controls: { hideNoControlsWarning: true, disable: true },
    actions: { disable: true },
  },
  render: (_args, ctx) => {
    const locale = ctx.globals && ctx.globals.locale === "en" ? "en" : "ko";
    return (
    <StoryDocsPage title="Tree" description={locale === "en"
      ? "Tree component guide for navigating hierarchical data."
      : "계층 구조 데이터를 탐색하는 트리 컴포넌트 가이드입니다."}>

      {/* ── Tree view ── */}
      <StoryDocsSection title="Tree view">
        <StoryDocsParagraph>
          Tree는 계층적 데이터를 탐색할 때 사용합니다. Branch node는 펼치기/접기가 가능하며,
          Leaf node는 하위 노드가 없는 최하위 항목입니다. Leading icon은 선택적으로 표시할 수 있습니다.
        </StoryDocsParagraph>
        <div style={{ marginTop: 20, display: "flex", gap: 48, alignItems: "flex-start", flexWrap: "wrap" }}>
          <div style={{ width: 244, flexShrink: 0 }}>
            <Tree
              items={GUIDELINE_ITEMS}
              leadingIcon
              defaultExpandedIds={["g-root1", "g-l2a", "g-l3a", "g-l4a"]}
            />
          </div>
          <ul style={anatomyListStyle}>
            <AnatomyItem num={1}>
              <strong>Chevron icon</strong>, 16px: 브랜치 노드를 펼치거나 접기 위한 화살표 아이콘입니다.
            </AnatomyItem>
            <AnatomyItem num={2}>
              <strong>Branch node</strong>: 하위 노드를 표시하거나 숨기기 위해 펼치거나 접을 수 있는 노드입니다.
            </AnatomyItem>
            <AnatomyItem num={3}>
              <strong>Leaf node</strong>: 펼칠 수 없으며 하위 노드가 없는 최하위 노드입니다.
            </AnatomyItem>
            <AnatomyItem num={4}>
              <strong>Text level</strong>: 들여쓰기로 계층 깊이를 나타냅니다. 최대 5단계(1depth ~ 5depth)를 지원합니다.
            </AnatomyItem>
            <AnatomyItem num={5}>
              <strong>Leading icon</strong> (optional), 16px: 노드 앞에 선택적으로 표시되는 폴더 아이콘입니다.
            </AnatomyItem>
          </ul>
        </div>
        <StoryDocsNote>
          <strong>leadingIcon</strong> prop을 사용하면 모든 노드에 폴더 아이콘이 표시됩니다.
        </StoryDocsNote>
      </StoryDocsSection>

      {/* ── Selectable Tree view ── */}
      <StoryDocsSection title="Selectable Tree view (+ Checkbox)">
        <StoryDocsParagraph>
          <strong>selectable</strong> prop을 사용하면 각 노드에 Checkbox가 추가되어 항목을 선택할 수 있습니다.
          Leading icon과 함께 사용할 수 있습니다.
        </StoryDocsParagraph>
        <div style={{ marginTop: 20, display: "flex", gap: 48, alignItems: "flex-start", flexWrap: "wrap" }}>
          <div style={{ width: 244, flexShrink: 0 }}>
            <Tree
              items={GUIDELINE_ITEMS}
              leadingIcon
              selectable
              defaultExpandedIds={["g-root1", "g-l2a", "g-l3a", "g-l4a"]}
            />
          </div>
          <ul style={anatomyListStyle}>
            <AnatomyItem num={1}>
              <strong>Chevron icon</strong>, 16px: 브랜치 노드를 펼치거나 접기 위한 화살표 아이콘입니다.
            </AnatomyItem>
            <AnatomyItem num={2}>
              <strong>Checkbox</strong>: 노드를 선택하기 위한 체크박스입니다. <strong>selectable</strong> prop 활성화 시 표시됩니다.
            </AnatomyItem>
            <AnatomyItem num={3}>
              <strong>Branch node</strong>: 하위 노드를 표시하거나 숨기기 위해 펼치거나 접을 수 있는 노드입니다.
            </AnatomyItem>
            <AnatomyItem num={4}>
              <strong>Leaf node</strong>: 펼칠 수 없으며 하위 노드가 없는 최하위 노드입니다.
            </AnatomyItem>
            <AnatomyItem num={5}>
              <strong>Leading icon</strong> (optional), 16px: 노드 앞에 선택적으로 표시되는 폴더 아이콘입니다.
            </AnatomyItem>
          </ul>
        </div>
        <StoryDocsNote>
          Checkbox 선택 상태는 <strong>selectedIds</strong> / <strong>onSelectionChange</strong> prop으로 제어합니다.
        </StoryDocsNote>
      </StoryDocsSection>

    </StoryDocsPage>
    );
  },
};
