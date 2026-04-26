/**
 * ContentsTitleMain — Figma node 4790:206 · Matrix only (세로 스택, 가로 스크롤 없음)
 */

import type { CSSProperties, ReactNode } from "react";
import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { Badge } from "../badge/badge";
import { Button } from "../button/button";
import { Toggle } from "../toggle/toggle";
import { ContentsTitleMain } from "./contentstitlemain";
import { FigmaLinkCard } from "@/stories/figma-link-card";
import { StoryDocsMatrixPage } from "@/stories/story-docs-shell";

const meta: Meta<typeof ContentsTitleMain> = {
  title: "Components/Title/ContentsTitleMain",
  component: ContentsTitleMain,
  parameters: {
    layout: "padded",
    docs: { disable: true },
  },
};
export default meta;
type Story = StoryObj<typeof ContentsTitleMain>;

/** Figma Contents Title 프레임 폭 */
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

const badge = (
  <Badge variant="solid" color="purple" shape="round" size="lg">
    32
  </Badge>
);

const actions = (
  <>
    <Button variant="secondary-outline" size="large">
      Button
    </Button>
    <Button variant="secondary-outline" size="large">
      Button
    </Button>
    <Button variant="primary-solid" size="large">
      Button
    </Button>
  </>
);

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

const MAIN_VARIANTS: Array<{ key: string; caption: string; node: ReactNode }> = [];
for (const hasHint of [false, true]) {
  for (const hasToggle of [false, true]) {
    for (const hasBadge of [false, true]) {
      for (const withActions of [false, true]) {
        MAIN_VARIANTS.push({
          key: `h${hasHint ? 1 : 0}t${hasToggle ? 1 : 0}b${hasBadge ? 1 : 0}a${withActions ? 1 : 0}`,
          caption: [
            hasHint ? "hint" : "no hint",
            hasToggle ? "toggle" : "no toggle",
            hasBadge ? "badge" : "no badge",
            withActions ? "Actions · default" : "Actions · none",
          ].join(" · "),
          node: (
            <ContentsTitleMain
              title="Header Title"
              badge={hasBadge ? badge : undefined}
              toggle={hasToggle ? <Toggle defaultChecked={false} /> : undefined}
              hint={hasHint ? "In-line message." : undefined}
              actions={withActions ? actions : undefined}
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
  render: () => (
    <StoryDocsMatrixPage
      title="ContentsTitleMain"
      description="프레임 폭 1496px. Hint · Toggle · Badge · Actions 조합을 세로로 나열합니다 (가로 스크롤 없음)."
      figmaNode="4790-206"
      pageMaxWidth={DOCS_PAGE_MAX_WIDTH}
    >
      <FigmaLinkCard nodeId="4790-206" caption="Components / Title — Contents Title Main" />

      <div style={verticalStackStyle}>
        {MAIN_VARIANTS.map((v) => (
          <VariantBlock key={v.key} caption={v.caption}>
            {v.node}
          </VariantBlock>
        ))}
      </div>
    </StoryDocsMatrixPage>
  ),
};
