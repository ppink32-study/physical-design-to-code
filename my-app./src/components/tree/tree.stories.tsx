import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import type { CSSProperties } from "react";

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
export const Guideline: Story = {
  name: "Guideline",
  render: () => (
    <StoryDocsPage
      title="Tree"
      description="계층 구조 데이터를 탐색하는 트리 컴포넌트입니다."
    >
      <StoryDocsSection title="개요">
        <StoryDocsParagraph>
          Tree는 최대 5단계 깊이의 계층적 데이터를 표시합니다. 각 노드는
          펼치기/접기가 가능하며, 선택 및 비활성화 상태를 지원합니다.
        </StoryDocsParagraph>
      </StoryDocsSection>

      <StoryDocsSection title="States">
        <StoryDocsParagraph>
          각 노드는 Default · Hover · Focus(펼쳐진 상태) · Selected · Disabled
          총 5가지 상태를 가집니다. Focus는 해당 폴더 노드가 열려 있을 때 적용됩니다.
        </StoryDocsParagraph>
      </StoryDocsSection>

      <StoryDocsSection title="Level Indent">
        <StoryDocsParagraph>
          레벨별 좌측 여백: L1 = 8px · L2 = 24px · L3 = 40px · L4 = 56px · L5 = 76px.
          L5는 리프 노드로 화살표가 표시되지 않습니다.
        </StoryDocsParagraph>
      </StoryDocsSection>

      <StoryDocsSection title="Variants">
        <StoryDocsParagraph>
          <strong>Basic</strong>: 화살표만 표시 (leadingIcon=false, selectable=false)
          <br />
          <strong>Leading Icon</strong>: 폴더 아이콘 추가 (leadingIcon=true)
          <br />
          <strong>Selectable</strong>: 체크박스 + 폴더 아이콘 (selectable=true)
        </StoryDocsParagraph>
      </StoryDocsSection>
    </StoryDocsPage>
  ),
};
