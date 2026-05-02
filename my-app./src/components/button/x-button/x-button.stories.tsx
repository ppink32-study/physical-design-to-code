import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import {
  XButton,
  type XButtonForceState,
  type XButtonSize,
} from "./x-button";
import { FigmaLinkCard } from "@/stories/figma-link-card";
import {
  storyMatrixCellStyle,
  storyMatrixColHeaderStyle,
  storyMatrixRowHeaderStyle,
  storyMatrixTableBase,
} from "@/stories/story-matrix-table-styles";
import {
  StoryDocsInlineCode,
  StoryDocsMatrixPage,
  StoryDocsNote,
  StoryPlaygroundFrame,
} from "@/stories/story-docs-shell";

const meta: Meta<typeof XButton> = {
  title: "Components/Button/XButton",
  component: XButton,
  parameters: {
    layout: "centered",
    docs: { disable: true },
    /** Figma Properties 순서(Property 1 → Size) */
    controls: { sort: "none" },
  },
  argTypes: {
    forceState: {
      name: "Property 1",
      description: "Default, Hover, Disabled",
      options: ["Default", "Hover", "Disabled"],
      mapping: {
        Default: "default",
        Hover: "hover",
        Disabled: "disable",
      } satisfies Record<string, XButtonForceState>,
      control: "inline-radio",
    },
    size: {
      name: "Size",
      description: "Medium, Large",
      options: ["Medium", "Large"],
      mapping: {
        Medium: "medium",
        Large: "large",
      } satisfies Record<string, XButtonSize>,
      control: "inline-radio",
    },
    disabled: { table: { disable: true } },
    "aria-label": { table: { disable: true } },
  },
};

export default meta;
type Story = StoryObj<typeof XButton>;

export const Playground: Story = {
  parameters: {
    /**
     * `controls.include` 는 arg **키**가 아니라 `argTypes.*.name`(없으면 키)과 매칭됩니다.
     * Property 1 / Size 로 표시 이름을 썼으면 include 도 동일 문자열이어야 합니다.
     */
    controls: { sort: "none", include: ["Property 1", "Size"] },
  },
  render: (args) => (
    <StoryPlaygroundFrame>
      <XButton {...args} aria-label="닫기" />
    </StoryPlaygroundFrame>
  ),
  args: {
    forceState: "default",
    size: "medium",
  },
};

/* =================================================================
 * Matrix — Figma node 6592:270982
 *   행: state · 열: size
 * =============================================================== */

const SIZES: Array<{ key: XButtonSize; label: string }> = [
  { key: "medium", label: "Medium (16)" },
  { key: "large", label: "Large (18)" },
];

const STATE_ROWS: Array<{ key: XButtonForceState; label: string }> = [
  { key: "default", label: "Default" },
  { key: "hover", label: "Hover" },
  { key: "disable", label: "Disabled" },
];

export const Matrix: Story = {
  name: "Matrix",
  parameters: { layout: "padded" },
  render: () => (
    <StoryDocsMatrixPage
      title="XButton"
      description="원형 닫기(X) 버튼의 size · state 조합을 비교합니다."
      figmaNode="6592-270982"
    >
      <FigmaLinkCard
        nodeId="6592-270982"
        caption="Components / Button / XButton — Size × State 매트릭스 원본"
      />

      <table style={storyMatrixTableBase}>
        <thead>
          <tr>
            <th style={{ ...storyMatrixColHeaderStyle, width: 120 }} />
            {SIZES.map((s) => (
              <th key={s.key} style={storyMatrixColHeaderStyle}>
                {s.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {STATE_ROWS.map((row) => (
            <tr key={row.key}>
              <th scope="row" style={storyMatrixRowHeaderStyle}>
                {row.label}
              </th>
              {SIZES.map((s) => (
                <td
                  key={`${s.key}-${row.key}`}
                  style={storyMatrixCellStyle}
                >
                  <XButton
                    size={s.key}
                    forceState={row.key}
                    aria-label={`${s.label} ${row.label}`}
                  />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      <StoryDocsNote>
        실 렌더링은 <StoryDocsInlineCode>:hover</StoryDocsInlineCode> ·{" "}
        <StoryDocsInlineCode>disabled</StoryDocsInlineCode> 으로 처리되며,
        매트릭스에서는 <StoryDocsInlineCode>forceState</StoryDocsInlineCode> 로
        상태를 강제 표시합니다.
      </StoryDocsNote>
    </StoryDocsMatrixPage>
  ),
};

