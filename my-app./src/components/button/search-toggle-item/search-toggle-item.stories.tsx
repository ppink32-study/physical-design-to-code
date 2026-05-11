import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { useArgs } from "storybook/preview-api";

import {
  SearchToggleItem,
} from "./search-toggle-item";
import { SearchToggleGroup } from "./search-toggle-group";
import { FigmaLinkCard } from "@/stories/figma-link-card";
import {
  storyMatrixCellStyle,
  storyMatrixColHeaderStyle,
  storyMatrixRowHeaderStyle,
  storyMatrixTableBase,
} from "@/stories/story-matrix-table-styles";
import {
  StoryDocsMatrixPage,
  StoryPlaygroundFrame,
} from "@/stories/story-docs-shell";

const meta: Meta<typeof SearchToggleItem> = {
  title: "Components/Button/SearchToggleItem",
  component: SearchToggleItem,
  parameters: {
    layout: "centered",
    docs: { disable: true },
  },
  argTypes: {
    selected: { control: "boolean" },
    children: { table: { disable: true } },
  },
};

export default meta;
type Story = StoryObj<typeof SearchToggleItem>;

export const Playground: Story = {
  argTypes: {
    selected: {
      name: "Multi Task 선택",
      description: "꺼짐: Single Task · 켜짐: Multi Task",
    },
    children: { table: { disable: true } },
  },
  render: function PlaygroundRender(args) {
    const [, updateArgs] = useArgs();
    const multiSelected = args.selected;
    return (
      <StoryPlaygroundFrame>
        <SearchToggleGroup aria-label="Task 모드">
          <SearchToggleItem
            selected={!multiSelected}
            onClick={() => {
              updateArgs({ selected: false });
            }}
          >
            Single Task
          </SearchToggleItem>
          <SearchToggleItem
            selected={multiSelected}
            onClick={() => {
              updateArgs({ selected: true });
            }}
          >
            Multi Task
          </SearchToggleItem>
        </SearchToggleGroup>
      </StoryPlaygroundFrame>
    );
  },
  args: {
    selected: false,
  },
};

/* =================================================================
 * Matrix — Figma node 17312:17269 (Default / Select)
 * =============================================================== */

export const Matrix: Story = {
  name: "Matrix",
  parameters: { layout: "padded" },
  render: (_args, ctx) => {
    const locale = ctx.globals && ctx.globals.locale === "en" ? "en" : "ko";
    return (
    <StoryDocsMatrixPage
      title="SearchToggleItem"
      description={locale === "en"
        ? "Compares Default / Select states of the item that toggles options in the search area."
        : "검색 영역에서 옵션을 토글하는 아이템의 Default / Select 상태를 비교합니다."}
      figmaNode="17312-17269"
    >
      <FigmaLinkCard
        nodeId="17312-17269"
        caption="Components / Button / SearchToggleItem — Default × Select 매트릭스 원본"
      />

      <table style={storyMatrixTableBase}>
        <thead>
          <tr>
            <th style={{ ...storyMatrixColHeaderStyle, width: 120 }} />
            <th style={storyMatrixColHeaderStyle}>Default</th>
            <th style={storyMatrixColHeaderStyle}>Select</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row" style={storyMatrixRowHeaderStyle}>
              Item
            </th>
            <td style={storyMatrixCellStyle}>
              <SearchToggleItem>Multi Task</SearchToggleItem>
            </td>
            <td style={storyMatrixCellStyle}>
              <SearchToggleItem selected>Single Task</SearchToggleItem>
            </td>
          </tr>
        </tbody>
      </table>

      <FigmaLinkCard
        nodeId="17312-17303"
        caption="Components / Button / SearchToggleGroup (Toggle All) — 두 아이템 결합 원본"
      />

      <table style={storyMatrixTableBase}>
        <thead>
          <tr>
            <th style={{ ...storyMatrixColHeaderStyle, width: 120 }} />
            <th style={storyMatrixColHeaderStyle}>Combined (Toggle All)</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row" style={storyMatrixRowHeaderStyle}>
              Group
            </th>
            <td style={storyMatrixCellStyle}>
              <SearchToggleGroup aria-label="Task 모드">
                <SearchToggleItem selected>Single Task</SearchToggleItem>
                <SearchToggleItem>Multi Task</SearchToggleItem>
              </SearchToggleGroup>
            </td>
          </tr>
        </tbody>
      </table>
    </StoryDocsMatrixPage>
    );
  },
};

