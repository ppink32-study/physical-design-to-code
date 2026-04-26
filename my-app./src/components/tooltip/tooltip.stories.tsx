/**
 * Tooltip — Placement × Trailing 매트릭스 + Help icon with tooltip (4방향)
 * Help: 아이콘 ↔ 툴팁 패널(화살표 끝) 간격 gap 4px (Figma 13300:13569)
 */

import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import type { CSSProperties } from "react";

import {
  HelpIconWithTooltip,
  Tooltip,
  type TooltipDirection,
} from "./tooltip";
import { FigmaLinkCard } from "@/stories/figma-link-card";
import {
  storyMatrixCellTopStyle,
  storyMatrixColHeaderStyle,
  storyMatrixRowHeaderTopStyle,
  storyMatrixTableBase,
} from "@/stories/story-matrix-table-styles";
import { StoryDocsMatrixPage } from "@/stories/story-docs-shell";

const meta: Meta<typeof Tooltip> = {
  title: "Components/Tooltip",
  component: Tooltip,
  parameters: {
    layout: "padded",
    docs: { disable: true },
  },
};
export default meta;
type Story = StoryObj<typeof Tooltip>;

const matrixTableBase = storyMatrixTableBase;
const matrixColHeaderStyle = storyMatrixColHeaderStyle;
const matrixRowHeaderStyle = storyMatrixRowHeaderTopStyle;

const matrixCellStyle: CSSProperties = {
  ...storyMatrixCellTopStyle,
  minWidth: 200,
  minHeight: 140,
  textAlign: "center",
};

const triggerStyle: CSSProperties = {
  display: "inline-block",
  fontFamily: "var(--font-family-korean, Pretendard)",
  fontSize: 12,
  lineHeight: "16px",
  color: "var(--context-foreground-surface-on-surface-base)",
  borderBottom: "1px dashed var(--context-foreground-surface-on-surface-hint)",
  cursor: "default",
  outline: "none",
  padding: "2px 4px",
};

const COLS: Array<{ key: string; label: string; direction: TooltipDirection }> = [
  { key: "left", label: "left ←", direction: "left" },
  { key: "top", label: "top ↑", direction: "top" },
  { key: "right", label: "right →", direction: "right" },
  { key: "bottom", label: "bottom ↓", direction: "bottom" },
];

const ROWS: Array<{ key: string; label: string; trailing: boolean }> = [
  { key: "trailing-true", label: "Trailing=True", trailing: true },
  { key: "trailing-false", label: "Trailing=False", trailing: false },
];

/** Help icon with tooltip — 가이드 캡처 순서: top · bottom · right · left */
const HELP_ICON_COLS: Array<{
  key: string;
  label: string;
  direction: TooltipDirection;
}> = [
  { key: "top", label: "top ↑", direction: "top" },
  { key: "bottom", label: "bottom ↓", direction: "bottom" },
  { key: "right", label: "right →", direction: "right" },
  { key: "left", label: "left ←", direction: "left" },
];

const sectionHeadingStyle: CSSProperties = {
  margin: "40px 0 8px",
  fontSize: 14,
  fontWeight: 600,
  color: "var(--context-foreground-surface-on-surface-base)",
};

const sectionLeadStyle: CSSProperties = {
  margin: "0 0 20px",
  fontSize: 13,
  lineHeight: 1.55,
  color: "var(--context-foreground-surface-on-surface-secondary)",
};

const helpGridCellStyle: CSSProperties = {
  ...storyMatrixCellTopStyle,
  minWidth: 160,
  minHeight: 160,
  verticalAlign: "middle",
  textAlign: "center",
};

function MatrixCell({
  direction,
  trailing,
  show,
}: {
  direction: TooltipDirection;
  trailing: boolean;
  show: boolean;
}) {
  if (!show) {
    return (
      <span
        style={{
          display: "inline-block",
          minHeight: 24,
          color: "var(--context-foreground-surface-on-surface-hint)",
          fontSize: 11,
        }}
        aria-hidden
      >
        —
      </span>
    );
  }
  return (
    <Tooltip
      title="Title"
      content="Tooltip text"
      direction={direction}
      trailing={trailing}
      defaultOpen
      openDelay={0}
    >
      <span tabIndex={0} style={triggerStyle}>
        trigger
      </span>
    </Tooltip>
  );
}

export const Matrix: Story = {
  name: "Matrix",
  parameters: { layout: "padded" },
  render: () => (
    <StoryDocsMatrixPage
      title="Tooltip"
      description="Placement × Trailing 매트릭스와, Help 아이콘 + 툴팁 4방향 예시입니다. Help 조합은 아이콘과 툴팁 사이 gap 4px입니다."
      figmaNode="5543-321819"
    >
      <FigmaLinkCard
        nodeId="5543-321819"
        caption="Components / Tooltip — Placement × Trailing"
      />

      <table style={matrixTableBase}>
        <thead>
          <tr>
            <th style={{ ...matrixColHeaderStyle, minWidth: 120 }} aria-hidden />
            {COLS.map((c) => (
              <th key={c.key} scope="col" style={matrixColHeaderStyle}>
                {c.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {ROWS.map((row) => (
            <tr key={row.key}>
              <th scope="row" style={matrixRowHeaderStyle}>
                {row.label}
              </th>
              {COLS.map((col) => {
                const show =
                  row.trailing || (!row.trailing && col.direction === "left");
                return (
                  <td key={col.key} style={matrixCellStyle}>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        minHeight: 120,
                      }}
                    >
                      <MatrixCell
                        direction={col.direction}
                        trailing={row.trailing}
                        show={show}
                      />
                    </div>
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>

      <h3 style={sectionHeadingStyle}>Help icon with tooltip</h3>
      <p style={sectionLeadStyle}>
        정보 아이콘 트리거와 툴팁 패널 사이 간격은 <strong>4px</strong>입니다. (
        <code style={{ fontSize: 12 }}>HelpIconWithTooltip</code>의 <code style={{ fontSize: 12 }}>gap</code>{" "}
        기본값, Tooltip의 <code style={{ fontSize: 12 }}>--tt-gap</code> · Figma 13300:13569)
      </p>
      <FigmaLinkCard
        nodeId="13300-13569"
        caption="Components / Tooltip — Help icon with tooltip"
      />

      <table style={{ ...matrixTableBase, marginTop: 12 }}>
        <thead>
          <tr>
            <th style={{ ...matrixColHeaderStyle, minWidth: 0 }} aria-hidden />
            {HELP_ICON_COLS.map((c) => (
              <th key={c.key} scope="col" style={matrixColHeaderStyle}>
                {c.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row" style={matrixRowHeaderStyle}>
              Help
            </th>
            {HELP_ICON_COLS.map((c) => (
              <td key={c.key} style={helpGridCellStyle}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    minHeight: 140,
                  }}
                >
                  <HelpIconWithTooltip
                    title="Title"
                    content="Tooltip text"
                    direction={c.direction}
                    gap={4}
                    defaultOpen
                    openDelay={0}
                    trailing
                  />
                </div>
              </td>
            ))}
          </tr>
        </tbody>
      </table>
    </StoryDocsMatrixPage>
  ),
};
