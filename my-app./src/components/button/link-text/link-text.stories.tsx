import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import {
  LinkText,
  type LinkTextForceState,
  type LinkTextSize,
  type LinkTextVariant,
} from "./link-text";
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

const meta: Meta<typeof LinkText> = {
  title: "Components/Button/LinkText",
  component: LinkText,
  parameters: {
    layout: "centered",
    docs: { disable: true },
    /** Figma Properties 패널 순서(Type → Size → State) 유지 */
    controls: { sort: "none" },
  },
  argTypes: {
    variant: {
      name: "Type",
      description: "Neutral, Accent",
      options: ["Neutral", "Accent"],
      mapping: {
        Neutral: "neutral",
        Accent: "accent",
      } satisfies Record<string, LinkTextVariant>,
      control: "inline-radio",
    },
    size: {
      name: "Size",
      description: "Small, Large",
      options: ["Small", "Large"],
      mapping: {
        Small: "small",
        Large: "large",
      } satisfies Record<string, LinkTextSize>,
      control: "inline-radio",
    },
    forceState: {
      name: "State",
      description: "Default, Hover, Disabled",
      options: ["Default", "Hover", "Disabled"],
      mapping: {
        Default: "default",
        Hover: "hover",
        Disabled: "disabled",
      } satisfies Record<string, LinkTextForceState>,
      control: "inline-radio",
    },
    disabled: { table: { disable: true } },
    href: { table: { disable: true } },
    children: {
      name: "Label",
      control: "text",
      table: { category: "Content" },
    },
  },
};

export default meta;
type Story = StoryObj<typeof LinkText>;

export const Playground: Story = {
  parameters: {
    controls: {
      sort: "none",
      /** Type / Size / State / Label 만 표시 — include 는 argTypes 의 `name` 과 일치해야 함 */
      include: ["Type", "Size", "State", "Label"],
    },
  },
  render: (args) => (
    <StoryPlaygroundFrame>
      <LinkText
        {...args}
        href="#"
        onClick={(e) => e.preventDefault()}
      />
    </StoryPlaygroundFrame>
  ),
  args: {
    variant: "neutral",
    size: "small",
    forceState: "default",
    children: "Link Text",
  },
};

/* =================================================================
 * Matrix — Figma node 9813:1005
 *   행: state (default / hover / disabled)
 *   열: variant × size (Neutral Small/Large · Accent Small/Large)
 * =============================================================== */

type ColumnDef = {
  variant: LinkTextVariant;
  size: LinkTextSize;
  label: string;
};

const COLUMNS: ColumnDef[] = [
  { variant: "neutral", size: "small", label: "Neutral · Small" },
  { variant: "neutral", size: "large", label: "Neutral · Large" },
  { variant: "accent", size: "small", label: "Accent · Small" },
  { variant: "accent", size: "large", label: "Accent · Large" },
];

const STATE_ROWS: Array<{ key: LinkTextForceState; label: string }> = [
  { key: "default", label: "Default" },
  { key: "hover", label: "Hover" },
  { key: "disabled", label: "Disabled" },
];

export const Matrix: Story = {
  name: "Matrix",
  parameters: { layout: "padded" },
  render: (_args, ctx) => {
    const locale = ctx.globals && ctx.globals.locale === "en" ? "en" : "ko";
    return (
    <StoryDocsMatrixPage
      title="LinkText"
      description={locale === "en"
        ? "Compares variant · size · state combinations of the text-link component."
        : "텍스트 링크 컴포넌트의 variant · size · state 조합을 비교합니다."}
      figmaNode="9813-1005"
    >
      <FigmaLinkCard
        nodeId="9813-1005"
        caption="Components / Button / Link Text — Type × Size × State 매트릭스 원본"
      />

      <table style={storyMatrixTableBase}>
        <thead>
          <tr>
            <th style={{ ...storyMatrixColHeaderStyle, width: 120 }} />
            {COLUMNS.map((c) => (
              <th key={c.label} style={storyMatrixColHeaderStyle}>
                {c.label}
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
              {COLUMNS.map((c) => (
                <td
                  key={`${c.label}-${row.key}`}
                  style={storyMatrixCellStyle}
                >
                  <LinkText
                    variant={c.variant}
                    size={c.size}
                    forceState={row.key}
                    href="#"
                    onClick={(e) => e.preventDefault()}
                  >
                    Link Text
                  </LinkText>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      <StoryDocsNote>
        실 렌더링은 <StoryDocsInlineCode>:hover</StoryDocsInlineCode> ·{" "}
        <StoryDocsInlineCode>aria-disabled</StoryDocsInlineCode> 으로 처리되며,
        매트릭스에서는 <StoryDocsInlineCode>forceState</StoryDocsInlineCode> 로
        상태를 강제 표시합니다.
      </StoryDocsNote>
    </StoryDocsMatrixPage>
    );
  },
};

