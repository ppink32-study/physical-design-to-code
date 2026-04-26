/**
 * ContentsTitleSub2D — Figma node 7544:663 · Matrix only (세로 스택, 가로 스크롤 없음)
 */

import type { CSSProperties, ReactNode } from "react";
import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { Toggle } from "../toggle/toggle";
import { ContentsTitleSub2D } from "./contentstitlesub2d";
import { FigmaLinkCard } from "@/stories/figma-link-card";
import { StoryDocsMatrixPage } from "@/stories/story-docs-shell";

const meta: Meta<typeof ContentsTitleSub2D> = {
  title: "Components/Title/ContentsTitleSub2D",
  component: ContentsTitleSub2D,
  parameters: {
    layout: "padded",
    docs: { disable: true },
  },
};
export default meta;
type Story = StoryObj<typeof ContentsTitleSub2D>;

const CONTENTS_TITLE_FRAME_PX = 1496;
const DOCS_PAGE_MAX_WIDTH = 1568;

const verticalStackStyle: CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: 28,
  width: "100%",
};

const variantCaptionStyle: CSSProperties = {
  fontSize: 12,
  fontWeight: 600,
  letterSpacing: "0.02em",
  marginBottom: 8,
  color: "var(--context-foreground-surface-on-surface-hint)",
};

const frameWrapStyle: CSSProperties = {
  width: CONTENTS_TITLE_FRAME_PX,
  maxWidth: "100%",
  boxSizing: "border-box",
};

const toggleSlot = <Toggle reverse>Label</Toggle>;

function VariantBlock({
  caption,
  children: blockChildren,
}: {
  caption: string;
  children: ReactNode;
}) {
  return (
    <div>
      <div style={variantCaptionStyle}>{caption}</div>
      <div style={frameWrapStyle}>{blockChildren}</div>
    </div>
  );
}

type RowDef = {
  key: string;
  label: string;
  bullet: boolean;
  hasCount: boolean;
  addBtn: boolean;
};

const ROW_DEFS: RowDef[] = [];
for (const bullet of [true, false]) {
  for (const hasCount of [true, false]) {
    for (const addBtn of [true, false]) {
      ROW_DEFS.push({
        key: `b${bullet ? 1 : 0}c${hasCount ? 1 : 0}a${addBtn ? 1 : 0}`,
        label: [
          `bullet ${bullet ? "on" : "off"}`,
          `count ${hasCount ? "on" : "off"}`,
          `add ${addBtn ? "on" : "off"}`,
        ].join(" · "),
        bullet,
        hasCount,
        addBtn,
      });
    }
  }
}

const SUB2D_VARIANTS: Array<{ key: string; caption: string; node: ReactNode }> = [];
for (const row of ROW_DEFS) {
  for (const withToggle of [true, false]) {
    SUB2D_VARIANTS.push({
      key: `${row.key}-t${withToggle ? 1 : 0}`,
      caption: `${row.label} · ${withToggle ? "Toggle" : "No toggle"}`,
      node: (
        <ContentsTitleSub2D
          title="3depth Header Title"
          bullet={row.bullet}
          count={row.hasCount ? "32" : undefined}
          addBtn={row.addBtn}
          toggle={withToggle ? toggleSlot : undefined}
        />
      ),
    });
  }
}

export const Matrix: Story = {
  name: "Matrix",
  parameters: { layout: "padded" },
  render: () => (
    <StoryDocsMatrixPage
      title="ContentsTitleSub2D"
      description="프레임 폭 1496px. Bullet · Count · Add × Toggle 유무를 세로로 나열합니다 (가로 스크롤 없음)."
      figmaNode="7544-663"
      pageMaxWidth={DOCS_PAGE_MAX_WIDTH}
    >
      <FigmaLinkCard nodeId="7544-663" caption="Components / Title — Contents Title Sub 2D" />

      <div style={verticalStackStyle}>
        {SUB2D_VARIANTS.map((v) => (
          <VariantBlock key={v.key} caption={v.caption}>
            {v.node}
          </VariantBlock>
        ))}
      </div>
    </StoryDocsMatrixPage>
  ),
};
