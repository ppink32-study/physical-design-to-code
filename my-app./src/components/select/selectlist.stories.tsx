import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import type { CSSProperties } from "react";
import { useMemo, useState } from "react";

import { SelectList } from "./selectlist";
import { SelectItem } from "./selectitem";
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

const meta: Meta<typeof SelectList> = {
  title: "Components/Select/SelectList",
  component: SelectList,
  parameters: {
    layout: "centered",
    docs: { disable: true },
  },
  argTypes: {
    type: {
      control: "radio",
      options: ["1-level", "2-levels", "search"],
    },
    showScrollbar: { control: "boolean" },
    maxHeight: { control: { type: "number", min: 0 } },
    search: { control: "boolean" },
  },
  args: {
    type: "1-level",
    showScrollbar: true,
    width: 220,
  },
};
export default meta;
type Story = StoryObj<typeof SelectList>;

const defaultItems = [
  { key: "1", label: "Item 1" },
  { key: "2", label: "Item 2" },
  { key: "3", label: "Item 3" },
  { key: "4", label: "Item 4" },
  { key: "5", label: "Item 5" },
];

const matrixHeaderRowStyle: CSSProperties = {
  ...storyMatrixColHeaderStyle,
  textAlign: "center",
};

const matrixCellListStyle: CSSProperties = {
  ...storyMatrixCellStyle,
  verticalAlign: "top",
  minWidth: 200,
};

function SearchDemo() {
  const [q, setQ] = useState("");
  const filtered = useMemo(
    () => defaultItems.filter((it) => it.label.toLowerCase().includes(q.toLowerCase())),
    [q],
  );
  return (
    <SelectList
      type="search"
      searchValue={q}
      onSearchChange={setQ}
      searchPlaceholder="Text"
      width={220}
      maxHeight={200}
      showScrollbar
    >
      {filtered.length > 0 ? (
        filtered.map((it) => <SelectItem key={it.key}>{it.label}</SelectItem>)
      ) : (
        <SelectItem disabled>결과가 없습니다</SelectItem>
      )}
    </SelectList>
  );
}

export const Playground: Story = {
  decorators: [
    (Story) => (
      <StoryPlaygroundFrame>
        <Story />
      </StoryPlaygroundFrame>
    ),
  ],
  render: (args) => (
    <SelectList {...args}>
      {defaultItems.map((it) => (
        <SelectItem key={it.key}>{it.label}</SelectItem>
      ))}
    </SelectList>
  ),
};

export const Matrix: Story = {
  name: "Matrix",
  parameters: { layout: "padded" },
  render: () => (
    <StoryDocsMatrixPage
      title="SelectList"
      description="Figma 매트릭스: 1 level · 2 levels · Search(Yes) 세 가지 패널 구성입니다."
      figmaNode="11959-26477"
    >
      <FigmaLinkCard
        nodeId="11959-26477"
        caption="Components / Select · SelectList 매트릭스 원본"
      />
      <div style={storyMatrixScrollWrap}>
        <table style={storyMatrixTableBase}>
          <thead>
            <tr>
              <th
                style={{
                  ...storyMatrixColHeaderStyle,
                  ...storyMatrixStickyCornerStyle,
                  minWidth: 100,
                  zIndex: 2,
                }}
              />
              <th scope="col" style={matrixHeaderRowStyle}>
                Select List — 1 level
              </th>
              <th scope="col" style={matrixHeaderRowStyle}>
                Select List — 2 levels
              </th>
              <th scope="col" style={matrixHeaderRowStyle}>
                Search: Yes
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th
                scope="row"
                style={{
                  ...storyMatrixRowHeaderStyle,
                  ...storyMatrixStickyCornerStyle,
                }}
              >
                Preview
              </th>
              <td style={matrixCellListStyle}>
                <SelectList width={220} maxHeight={200} showScrollbar>
                  {defaultItems.map((it, i) => (
                    <SelectItem key={it.key} selected={i === 1}>
                      {it.label}
                    </SelectItem>
                  ))}
                </SelectList>
              </td>
              <td style={matrixCellListStyle}>
                <SelectList type="2-levels" width={220} maxHeight={200} showScrollbar>
                  {defaultItems.map((it) => (
                    <SelectItem key={it.key} type="2-level">
                      {it.label}
                    </SelectItem>
                  ))}
                </SelectList>
              </td>
              <td style={matrixCellListStyle}>
                <SearchDemo />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </StoryDocsMatrixPage>
  ),
};
