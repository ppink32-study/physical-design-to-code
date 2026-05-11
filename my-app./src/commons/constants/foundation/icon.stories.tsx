import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import type { CSSProperties } from "react";

import { figmaNodeUrl } from "@/stories/story-figma-urls";
import { StoryDocsMatrixPage } from "@/stories/story-docs-shell";

/** Physical AI Platform Design Guideline — Icon (Figma node 4823-23177) */
const FIGMA_ICON_URL = figmaNodeUrl("4823-23177");

const meta: Meta = {
  title: "Design System/Foundation/Icon",
  parameters: {
    layout: "padded",
    options: { showPanel: false },
    controls: { hideNoControlsWarning: true, disable: true },
    actions: { disable: true },
    docs: { disable: true },
  },
};
export default meta;

type Story = StoryObj;

const linkStyle: CSSProperties = {
  display: "inline-block",
  marginTop: 12,
  fontSize: 15,
  fontWeight: 600,
  color: "var(--context-foreground-primary-on-primary-hover)",
  wordBreak: "break-all",
};

const ICON_DESCRIPTIONS = {
  ko: "아이콘 스펙은 아래 Figma 링크에서 확인합니다.",
  en: "Refer to the Figma link below for the full icon specification.",
} as const;

export const Matrix: Story = {
  name: "Matrix",
  render: (_args, ctx) => {
    const locale = (ctx.globals?.locale as "ko" | "en") === "en" ? "en" : "ko";
    return (
    <StoryDocsMatrixPage
      eyebrow="Design System"
      title="Icon"
      description={ICON_DESCRIPTIONS[locale]}
      figmaNode="4823-23177"
    >
      <a href={FIGMA_ICON_URL} target="_blank" rel="noreferrer noopener" style={linkStyle}>
        {FIGMA_ICON_URL}
      </a>
    </StoryDocsMatrixPage>
    );
  },
};
