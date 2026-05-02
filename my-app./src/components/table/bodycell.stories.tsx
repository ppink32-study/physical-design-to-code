/**
 * BodyCell — Data Grid/Body (Figma node 4456:290858)
 * Matrix 전용 검수: Phase 3–4 / Phase 5 를 두 스토리로 나눔.
 */

import type { CSSProperties, ReactNode } from "react";
import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { Badge } from "../badge/badge";
import { Button } from "../button/button/button";
import { BodyCell, type BodyCellType } from "./bodycell";
import { FigmaLinkCard } from "@/stories/figma-link-card";
import {
  storyMatrixCellTopStyle,
  storyMatrixColHeaderStyle,
  storyMatrixRowHeaderTopStyle,
  storyMatrixScrollWrap,
  storyMatrixStickyCornerStyle,
  storyMatrixTableBase,
} from "@/stories/story-matrix-table-styles";
import {
  StoryDocsMatrixPage,
  StoryPlaygroundFrame,
} from "@/stories/story-docs-shell";

const BtnIcon = ({ src, size = 16 }: { src: string; size?: number }) => {
  const style: CSSProperties = {
    display: "inline-block",
    width: size,
    height: size,
    background: "currentColor",
    WebkitMaskImage: `url(${src})`,
    maskImage: `url(${src})`,
    WebkitMaskRepeat: "no-repeat",
    maskRepeat: "no-repeat",
    WebkitMaskPosition: "center",
    maskPosition: "center",
    WebkitMaskSize: "contain",
    maskSize: "contain",
    flexShrink: 0,
  };
  return <span aria-hidden="true" style={style} />;
};
const SearchIcon = () => <BtnIcon src="/icon/Search.svg" />;

const meta: Meta<typeof BodyCell> = {
  title: "Components/Table/BodyCell",
  component: BodyCell,
  parameters: {
    layout: "padded",
    docs: { disable: true },
  },
  argTypes: {
    type: {
      control: "select",
      options: [
        "blank",
        "text-left",
        "text-left-icon",
        "text-center",
        "text-right",
        "checkbox",
        "radio",
        "icon",
        "link",
        "button",
        "button-icon-only",
        "like",
        "switch",
        "text-field",
        "search",
        "select",
        "date-picker",
        "state",
        "badge",
        "file",
        "tree",
        "multi-normal",
        "multi-sub-text",
        "video",
      ],
    },
    state: {
      control: "inline-radio",
      options: ["enabled", "hovered", "selected"],
    },
    focus: { control: "boolean" },
    children: { control: "text" },
    icon: { control: false },
    width: { control: "text" },
  },
  args: {
    type: "text-left",
    state: "enabled",
    focus: false,
    children: "Left",
  },
};
export default meta;
type Story = StoryObj<typeof BodyCell>;

const matrixScrollWrap = storyMatrixScrollWrap;
const matrixTableBase = storyMatrixTableBase;
const matrixColHeaderStyle = storyMatrixColHeaderStyle;
const matrixRowHeaderStyle = storyMatrixRowHeaderTopStyle;
const matrixCellStyle = storyMatrixCellTopStyle;
const matrixStickyCornerStyle = storyMatrixStickyCornerStyle;

const sectionTitleStyle: CSSProperties = {
  fontSize: 14,
  fontWeight: 600,
  marginTop: 8,
  marginBottom: 12,
  color: "var(--context-foreground-surface-on-surface-base)",
};

const STATE_COLS: Array<{
  state: "enabled" | "hovered" | "selected";
  focus: boolean;
  label: string;
}> = [
  { state: "enabled", focus: false, label: "Enabled / focus off" },
  { state: "enabled", focus: true, label: "Enabled / focus on" },
  { state: "hovered", focus: false, label: "Hovered / focus off" },
  { state: "selected", focus: false, label: "Selected / focus off" },
  { state: "selected", focus: true, label: "Selected / focus on" },
];

const PHASE3_TYPES: Array<{
  type: BodyCellType;
  label: string;
  content: ReactNode | undefined;
}> = [
  { type: "blank", label: "Blank", content: undefined },
  { type: "text-left", label: "Text left", content: "Left" },
  { type: "text-left-icon", label: "Text left + icon", content: "Left" },
  { type: "text-center", label: "Text center", content: "Center" },
  { type: "text-right", label: "Text right", content: "1,000" },
];

const PHASE4_TYPES: Array<{
  type: BodyCellType;
  label: string;
  render: (ctx: {
    state: "enabled" | "hovered" | "selected";
    focus: boolean;
    cellKey: string;
  }) => ReactNode;
}> = [
  {
    type: "checkbox",
    label: "Checkbox",
    render: ({ state, focus, cellKey }) => (
      <BodyCell
        key={cellKey}
        type="checkbox"
        state={state}
        focus={focus}
        defaultChecked={state === "selected"}
      />
    ),
  },
  {
    type: "radio",
    label: "Radio",
    render: ({ state, focus, cellKey }) => (
      <BodyCell
        key={cellKey}
        type="radio"
        state={state}
        focus={focus}
        defaultChecked={state === "selected"}
      />
    ),
  },
  {
    type: "icon",
    label: "Icon",
    render: ({ state, focus, cellKey }) => (
      <BodyCell key={cellKey} type="icon" state={state} focus={focus} />
    ),
  },
  {
    type: "link",
    label: "Link",
    render: ({ state, focus, cellKey }) => (
      <BodyCell key={cellKey} type="link" state={state} focus={focus} href="#link">
        Link Text
      </BodyCell>
    ),
  },
  {
    type: "button",
    label: "Button",
    render: ({ state, focus, cellKey }) => (
      <BodyCell key={cellKey} type="button" state={state} focus={focus}>
        <Button variant="secondary-outline" size="small">
          Button
        </Button>
        <Button variant="secondary-outline" size="small">
          Button
        </Button>
      </BodyCell>
    ),
  },
  {
    type: "button-icon-only",
    label: "Button icon only",
    render: ({ state, focus, cellKey }) => (
      <BodyCell key={cellKey} type="button-icon-only" state={state} focus={focus}>
        <Button
          variant="secondary-outline"
          size="small"
          iconOnly
          leftIcon={<SearchIcon />}
          aria-label="search"
        />
        <Button
          variant="secondary-outline"
          size="small"
          iconOnly
          leftIcon={<SearchIcon />}
          aria-label="search"
        />
      </BodyCell>
    ),
  },
  {
    type: "like",
    label: "Like",
    render: ({ state, focus, cellKey }) => (
      <BodyCell
        key={cellKey}
        type="like"
        state={state}
        focus={focus}
        liked={state === "selected"}
      />
    ),
  },
  {
    type: "switch",
    label: "Switch",
    render: ({ state, focus, cellKey }) => (
      <BodyCell
        key={cellKey}
        type="switch"
        state={state}
        focus={focus}
        defaultChecked={state === "selected"}
      />
    ),
  },
];

const PHASE5_TYPES: Array<{
  type: BodyCellType;
  label: string;
  render: (ctx: {
    state: "enabled" | "hovered" | "selected";
    focus: boolean;
    cellKey: string;
  }) => ReactNode;
}> = [
  {
    type: "text-field",
    label: "Text field",
    render: ({ state, focus, cellKey }) => (
      <BodyCell
        key={cellKey}
        type="text-field"
        state={state}
        focus={focus}
        placeholder="Placeholder"
        value={state === "selected" ? "Entered text" : undefined}
      />
    ),
  },
  {
    type: "search",
    label: "Search",
    render: ({ state, focus, cellKey }) => (
      <BodyCell
        key={cellKey}
        type="search"
        state={state}
        focus={focus}
        placeholder="Placeholder"
        value={state === "selected" ? "keyword" : undefined}
      />
    ),
  },
  {
    type: "select",
    label: "Select",
    render: ({ state, focus, cellKey }) => (
      <BodyCell key={cellKey} type="select" state={state} focus={focus} expanded={focus}>
        Text
      </BodyCell>
    ),
  },
  {
    type: "date-picker",
    label: "Date picker",
    render: ({ state, focus, cellKey }) => (
      <BodyCell
        key={cellKey}
        type="date-picker"
        state={state}
        focus={focus}
        value={state === "selected" ? "2025-01-01" : undefined}
      />
    ),
  },
  {
    type: "state",
    label: "State",
    render: ({ state, focus, cellKey }) => (
      <BodyCell key={cellKey} type="state" state={state} focus={focus} stateTone="blue">
        Badge
      </BodyCell>
    ),
  },
  {
    type: "badge",
    label: "Badge",
    render: ({ state, focus, cellKey }) => (
      <BodyCell key={cellKey} type="badge" state={state} focus={focus}>
        <Badge variant="status" color="purple" shape="round" size="sm">
          Badge
        </Badge>
        <Badge variant="status" color="purple" shape="round" size="sm">
          Badge
        </Badge>
      </BodyCell>
    ),
  },
  {
    type: "file",
    label: "File",
    render: ({ state, focus, cellKey }) => (
      <BodyCell key={cellKey} type="file" state={state} focus={focus}>
        File Name.pdf
      </BodyCell>
    ),
  },
  {
    type: "tree",
    label: "Tree",
    render: ({ state, focus, cellKey }) => (
      <BodyCell key={cellKey} type="tree" state={state} focus={focus} depth={0}>
        1depth Name
      </BodyCell>
    ),
  },
  {
    type: "multi-normal",
    label: "Multi normal",
    render: ({ state, focus, cellKey }) => (
      <BodyCell
        key={cellKey}
        type="multi-normal"
        state={state}
        focus={focus}
        subText="Multiple line"
      >
        Multiple line
      </BodyCell>
    ),
  },
  {
    type: "multi-sub-text",
    label: "Multi sub text",
    render: ({ state, focus, cellKey }) => (
      <BodyCell
        key={cellKey}
        type="multi-sub-text"
        state={state}
        focus={focus}
        subText="Sub Text"
        badge={
          <Badge variant="solid" color="primary" shape="round" size="sm">
            99
          </Badge>
        }
      >
        Multiple line Title 최대 한줄
      </BodyCell>
    ),
  },
  {
    type: "video",
    label: "Video",
    render: ({ state, focus, cellKey }) => (
      <BodyCell key={cellKey} type="video" state={state} focus={focus} />
    ),
  },
];

function BodyCellStateMatrixTable({
  rows,
  phaseId,
  phaseLabel,
}: {
  rows: Array<{
    key: string;
    label: string;
    renderCell: (col: (typeof STATE_COLS)[number]) => ReactNode;
  }>;
  phaseId: string;
  phaseLabel: string;
}) {
  return (
    <section aria-labelledby={`bodycell-matrix-${phaseId}`}>
      <h3 id={`bodycell-matrix-${phaseId}`} style={sectionTitleStyle}>
        {phaseLabel}
      </h3>
      <div style={matrixScrollWrap}>
        <table style={matrixTableBase}>
          <thead>
            <tr>
              <th
                style={{
                  ...matrixColHeaderStyle,
                  ...matrixStickyCornerStyle,
                  minWidth: 140,
                  zIndex: 2,
                }}
                aria-hidden
              />
              {STATE_COLS.map((c) => (
                <th
                  key={c.label}
                  scope="col"
                  style={{
                    ...matrixColHeaderStyle,
                    whiteSpace: "normal",
                    maxWidth: 120,
                    lineHeight: 1.35,
                  }}
                >
                  {c.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
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
                {STATE_COLS.map((col) => (
                  <td key={`${row.key}-${col.label}`} style={matrixCellStyle}>
                    {row.renderCell(col)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
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
  args: {
    type: "text-left",
    state: "enabled",
    focus: false,
    children: "Left",
  },
};

/** Phase 3 + 4 — 텍스트·blank + 인터랙션 셀 */
export const MatrixPhase3And4: Story = {
  name: "Matrix · Phase 3–4",
  parameters: { layout: "padded" },
  render: () => {
    const phase3Rows = PHASE3_TYPES.map((row) => ({
      key: row.type,
      label: row.label,
      renderCell: (col: (typeof STATE_COLS)[number]) => (
        <BodyCell type={row.type} state={col.state} focus={col.focus}>
          {row.content}
        </BodyCell>
      ),
    }));

    const phase4Rows = PHASE4_TYPES.map((row) => ({
      key: row.type,
      label: row.label,
      renderCell: (col: (typeof STATE_COLS)[number]) =>
        row.render({
          state: col.state,
          focus: col.focus,
          cellKey: `${row.type}-${col.state}-${col.focus}`,
        }),
    }));

    return (
      <StoryDocsMatrixPage
        title="BodyCell"
        description="Phase 3(텍스트·blank)과 Phase 4(체크·라디오·버튼 등) × 상태·포커스. Figma Body 셀(node 4456:290858) 검수용."
        figmaNode="4456-290858"
      >
        <FigmaLinkCard
          nodeId="4456-290858"
          caption="Components / Table — Body cell (Phase 3–5)"
        />
        <BodyCellStateMatrixTable
          phaseId="phase-3"
          phaseLabel="Phase 3 — Text & blank"
          rows={phase3Rows}
        />
        <BodyCellStateMatrixTable
          phaseId="phase-4"
          phaseLabel="Phase 4 — Controls"
          rows={phase4Rows}
        />
      </StoryDocsMatrixPage>
    );
  },
};

/** Phase 5 — 폼·데이터 셀만 별도 페이지로 분리 (세로 스크롤 완화) */
export const MatrixPhase5: Story = {
  name: "Matrix · Phase 5",
  parameters: { layout: "padded" },
  render: () => {
    const phase5Rows = PHASE5_TYPES.map((row) => ({
      key: row.type,
      label: row.label,
      renderCell: (col: (typeof STATE_COLS)[number]) =>
        row.render({
          state: col.state,
          focus: col.focus,
          cellKey: `${row.type}-${col.state}-${col.focus}`,
        }),
    }));

    return (
      <StoryDocsMatrixPage
        title="BodyCell · Phase 5"
        description="폼·배지·파일·트리·멀티라인·비디오 타입 × 상태·포커스. Phase 3–4 매트릭스와 나눠 두었습니다."
        figmaNode="4456-290858"
      >
        <FigmaLinkCard
          nodeId="4456-290858"
          caption="Components / Table — Body cell (Phase 5)"
        />
        <BodyCellStateMatrixTable
          phaseId="phase-5"
          phaseLabel="Phase 5 — Form & data"
          rows={phase5Rows}
        />
      </StoryDocsMatrixPage>
    );
  },
};
