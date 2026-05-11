/**
 * ContentsTitleSub — Figma node 5784:48007 · Matrix only (세로 스택, 가로 스크롤 없음)
 */

import type { CSSProperties, ReactNode } from "react";
import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { ContentsTitleSub } from "./contentstitlesub";
import { FigmaLinkCard } from "@/stories/figma-link-card";
import { StoryDocsMatrixPage } from "@/stories/story-docs-shell";

const meta: Meta<typeof ContentsTitleSub> = {
  title: "Components/Title/ContentsTitleSub",
  component: ContentsTitleSub,
  parameters: {
    layout: "padded",
    docs: { disable: true },
  },
};
export default meta;
type Story = StoryObj<typeof ContentsTitleSub>;

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

const COLS = [
  {
    key: "c1",
    label: "Count + Accordion",
    accordion: true,
    count: "32" as const,
    button: undefined as boolean | undefined,
  },
  {
    key: "c2",
    label: "Accordion only",
    accordion: true,
    count: undefined,
    button: undefined,
  },
  {
    key: "c3",
    label: "Plain",
    accordion: false,
    count: undefined,
    button: undefined,
  },
  {
    key: "c4",
    label: "Plain + Button",
    accordion: false,
    count: undefined,
    button: true as const,
  },
] as const;

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

const SUB_VARIANTS: Array<{ key: string; caption: string; node: ReactNode }> = [];
for (const infoIcon of [false, true]) {
  for (const required of [false, true]) {
    for (const expanded of [false, true]) {
      for (const col of COLS) {
        const rowPart = [
          `info ${infoIcon ? "on" : "off"}`,
          `req ${required ? "on" : "off"}`,
          `expand ${expanded ? "up" : "down"}`,
        ].join(" · ");
        SUB_VARIANTS.push({
          key: `i${infoIcon ? 1 : 0}r${required ? 1 : 0}e${expanded ? 1 : 0}-${col.key}`,
          caption: `${rowPart} · ${col.label}`,
          node: (
            <ContentsTitleSub
              title="Header Title"
              infoIcon={infoIcon}
              required={required}
              accordion={col.accordion}
              expanded={col.accordion ? expanded : true}
              count={col.count}
              button={col.button}
            />
          ),
        });
      }
    }
  }
}

export const Matrix: Story = {
  name: "Matrix",
  parameters: { layout: "padded" },
  render: (_args, ctx) => {
    const locale = (ctx.globals?.locale as "ko" | "en") === "en" ? "en" : "ko";
    return (
    <StoryDocsMatrixPage
      title="ContentsTitleSub"
      description={locale === "en"
        ? "Frame width 1496px. Info · Required · Expanded × right-side patterns are laid out vertically (no horizontal scroll)."
        : "프레임 폭 1496px. Info · Required · Expanded × 우측 패턴을 세로로 나열합니다 (가로 스크롤 없음)."}
      figmaNode="5784-48007"
      pageMaxWidth={DOCS_PAGE_MAX_WIDTH}
    >
      <FigmaLinkCard nodeId="5784-48007" caption="Components / Title — Contents Title Sub" />

      <div style={verticalStackStyle}>
        {SUB_VARIANTS.map((v) => (
          <VariantBlock key={v.key} caption={v.caption}>
            {v.node}
          </VariantBlock>
        ))}
      </div>
    </StoryDocsMatrixPage>
    );
  },
};
