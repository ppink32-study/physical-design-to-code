import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import type { CSSProperties, ReactNode } from "react";

import { SelectItem, type SelectItemProps } from "./selectitem";
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
  StoryDocsMatrixPage,
  StoryPlaygroundFrame,
} from "@/stories/story-docs-shell";

const meta: Meta<typeof SelectItem> = {
  title: "Components/Select/SelectItem",
  component: SelectItem,
  parameters: {
    layout: "centered",
    docs: { disable: true },
  },
  argTypes: {
    size: { control: "radio", options: ["medium", "large"] },
    type: { control: "radio", options: ["1-level", "2-level"] },
    state: {
      control: "radio",
      options: [undefined, "default", "hover", "select"],
    },
    selected: { control: "boolean" },
    disabled: { control: "boolean" },
  },
  args: {
    size: "medium",
    type: "1-level",
    children: "Text",
  },
};
export default meta;
type Story = StoryObj<typeof SelectItem>;

const sectionTitleStyle: CSSProperties = {
  fontSize: 14,
  fontWeight: 600,
  marginBottom: 12,
  color: "var(--context-foreground-surface-on-surface-base)",
};

const SectionFrame = ({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) => (
  <section style={{ marginTop: 24 }}>
    <h3 style={sectionTitleStyle}>{title}</h3>
    {children}
  </section>
);

const matrixScrollWrap = storyMatrixScrollWrap;
const matrixTableBase = storyMatrixTableBase;
const matrixColHeaderStyle = storyMatrixColHeaderStyle;
const matrixRowHeaderStyle = storyMatrixRowHeaderStyle;
const matrixStickyCornerStyle = storyMatrixStickyCornerStyle;
const matrixCellStyle: CSSProperties = {
  ...storyMatrixCellStyle,
  minWidth: 200,
};

const LEVEL_COLS = [
  { key: "1-level" as const, label: "1 level" },
  { key: "2-level" as const, label: "2 levels" },
];

const STATE_ROWS: Array<{
  key: string;
  label: string;
  args: Partial<SelectItemProps>;
}> = [
  { key: "default", label: "Default", args: {} },
  { key: "hover", label: "Hover", args: { state: "hover" } },
  { key: "select", label: "Select", args: { state: "select", selected: true } },
  { key: "disable", label: "Disable", args: { disabled: true } },
];

function ItemMatrixTable({ size }: { size: "medium" | "large" }) {
  return (
    <div style={matrixScrollWrap}>
      <table style={matrixTableBase}>
        <thead>
          <tr>
            <th
              style={{
                ...matrixColHeaderStyle,
                ...matrixStickyCornerStyle,
                minWidth: 120,
                zIndex: 2,
              }}
            />
            {LEVEL_COLS.map((c) => (
              <th key={c.key} scope="col" style={matrixColHeaderStyle}>
                {c.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {STATE_ROWS.map((r) => (
            <tr key={r.key}>
              <th
                scope="row"
                style={{
                  ...matrixRowHeaderStyle,
                  ...matrixStickyCornerStyle,
                }}
              >
                {r.label}
              </th>
              {LEVEL_COLS.map((c) => (
                <td key={`${r.key}-${c.key}`} style={matrixCellStyle}>
                  <SelectItem {...r.args} size={size} type={c.key}>
                    Text
                  </SelectItem>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export const Playground: Story = {
  decorators: [
    (Story) => (
      <StoryPlaygroundFrame>
        <div style={{ width: 240, padding: 4 }}>
          <Story />
        </div>
      </StoryPlaygroundFrame>
    ),
  ],
  args: {},
};

export const Matrix: Story = {
  name: "Matrix",
  parameters: { layout: "padded" },
  render: () => (
    <StoryDocsMatrixPage
      title="SelectItem"
      description="Figma 매트릭스: Medium(32px)·Large(40px) × 행 Default·Hover·Select·Disable × 열 1 level·2 levels."
      figmaNode="4811-36049"
    >
      <FigmaLinkCard
        nodeId="4811-36049"
        caption="Components / Select · SelectItem 매트릭스 원본"
      />
      <SectionFrame title="Medium (height 32px)">
        <ItemMatrixTable size="medium" />
      </SectionFrame>
      <SectionFrame title="Large (height 40px)">
        <ItemMatrixTable size="large" />
      </SectionFrame>
    </StoryDocsMatrixPage>
  ),
};
