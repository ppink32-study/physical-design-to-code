/**
 * ContentsTitleSub stories — Figma node 5784:48007
 *
 *   - Variants (accordion on/off × expand × required × info × count × button)
 *   - Full Matrix
 *   - LightDarkCompare
 */

import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { StoryPlaygroundFrame } from "@/stories/story-docs-shell";
import { ContentsTitleSub } from "./contentstitlesub";

const meta: Meta<typeof ContentsTitleSub> = {
  title: "Components/Title/ContentsTitleSub",
  component: ContentsTitleSub,
  parameters: { layout: "padded" },
  argTypes: {
    title: { control: "text" },
    required: { control: "boolean" },
    infoIcon: { control: "boolean" },
    count: { control: "text" },
    accordion: { control: "boolean" },
    expanded: { control: "boolean" },
    button: { control: false },
  },
  args: {
    title: "Header Title",
    accordion: true,
    expanded: true,
    infoIcon: true,
  },
};
export default meta;

type Story = StoryObj<typeof ContentsTitleSub>;


export const Playground: Story = {
  decorators: [
    (Story) => (
      <StoryPlaygroundFrame>
        <Story />
      </StoryPlaygroundFrame>
    ),
  ],
  args: {
    title: "Header Title",
    accordion: true,
    expanded: true,
    infoIcon: true,
  },
};

/* =============================================================
 * Variants
 * =========================================================== */
export const Accordion_Expand: Story = {
  args: { accordion: true, expanded: true, infoIcon: true },
};

export const Accordion_Collapsed: Story = {
  args: { accordion: true, expanded: false, infoIcon: true },
};

export const WithCountBadge: Story = {
  args: {
    accordion: true,
    expanded: true,
    infoIcon: true,
    count: "32",
  },
};

export const Required: Story = {
  args: {
    accordion: true,
    expanded: true,
    required: true,
    infoIcon: true,
  },
};

export const NoAccordion_NoButton: Story = {
  args: {
    accordion: false,
    expanded: false,
    infoIcon: true,
  },
};

export const NoAccordion_TextButton: Story = {
  args: {
    accordion: false,
    expanded: false,
    infoIcon: true,
    button: true,
  },
};

export const Interactive: Story = {
  render: () => {
    function Demo() {
      const [expanded, setExpanded] = useState(true);
      return (
        <ContentsTitleSub
          title="Header Title"
          accordion
          expanded={expanded}
          infoIcon
          count="32"
          onToggle={() => setExpanded((v) => !v)}
        />
      );
    }
    return <Demo />;
  },
};

/* =============================================================
 * Full matrix
 * =========================================================== */
export const FullMatrix: Story = {
  parameters: { layout: "fullscreen" },
  render: () => (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
        gap: 16,
        padding: 24,
      }}
    >
      <ContentsTitleSub title="Accordion · Expand" accordion expanded infoIcon />
      <ContentsTitleSub title="Accordion · Collapsed" accordion expanded={false} infoIcon />
      <ContentsTitleSub title="Accordion + Count" accordion expanded infoIcon count="32" />
      <ContentsTitleSub title="Required" accordion expanded required infoIcon />
      <ContentsTitleSub title="No accordion" />
      <ContentsTitleSub title="No accordion · Button" button />
    </div>
  ),
};

/* =============================================================
 * Light/Dark compare
 * =========================================================== */
export const LightDarkCompare: Story = {
  parameters: { layout: "fullscreen" },
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <div data-theme="light" style={{ padding: 24, background: "var(--context-background-surface-bg-surface-base)" }}>
        <div style={{ fontSize: 12, marginBottom: 8, color: "#787a88" }}>Light</div>
        <ContentsTitleSub title="Header Title" accordion expanded infoIcon count="32" />
      </div>
      <div data-theme="dark" style={{ padding: 24, background: "var(--context-background-surface-bg-surface-base)" }}>
        <div style={{ fontSize: 12, marginBottom: 8, color: "#b3b4bc" }}>Dark</div>
        <ContentsTitleSub title="Header Title" accordion expanded infoIcon count="32" />
      </div>
    </div>
  ),
};
