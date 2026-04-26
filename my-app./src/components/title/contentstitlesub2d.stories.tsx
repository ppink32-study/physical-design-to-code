/**
 * ContentsTitleSub2D stories — Figma node 7544:663
 *
 *   - Variants (bullet / count / addBtn / toggle 조합)
 *   - Full Matrix
 *   - LightDarkCompare
 */

import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { StoryPlaygroundFrame } from "@/stories/story-docs-shell";
import { Toggle } from "../toggle/toggle";
import { ContentsTitleSub2D } from "./contentstitlesub2d";

const meta: Meta<typeof ContentsTitleSub2D> = {
  title: "Components/Title/ContentsTitleSub2D",
  component: ContentsTitleSub2D,
  parameters: { layout: "padded" },
  argTypes: {
    title: { control: "text" },
    bullet: { control: "boolean" },
    count: { control: "text" },
    addBtn: { control: "boolean" },
    badge: { control: false },
    toggle: { control: false },
  },
  args: {
    title: "3depth Header Title",
    bullet: true,
    count: "32",
    toggle: <Toggle reverse>Label</Toggle>,
  },
};
export default meta;

type Story = StoryObj<typeof ContentsTitleSub2D>;

/* =============================================================
 * Variants
 * =========================================================== */
export const Playground: Story = {
  decorators: [
    (Story) => (
      <StoryPlaygroundFrame>
        <Story />
      </StoryPlaygroundFrame>
    ),
  ],
  args: {
    title: "3depth Header Title",
    count: "32",
    toggle: <Toggle reverse>Label</Toggle>,
  },
};

export const NoBullet: Story = {
  args: {
    title: "3depth Header Title",
    bullet: false,
    count: "32",
    toggle: <Toggle reverse>Label</Toggle>,
  },
};

export const NoCount: Story = {
  args: {
    title: "3depth Header Title",
    count: undefined,
    toggle: <Toggle reverse>Label</Toggle>,
  },
};

export const WithAddBtn: Story = {
  args: {
    title: "3depth Header Title",
    count: "32",
    addBtn: true,
    toggle: <Toggle reverse>Label</Toggle>,
  },
};

export const NoToggle: Story = {
  args: {
    title: "3depth Header Title",
    count: "32",
    toggle: undefined,
  },
};

/* =============================================================
 * Full matrix
 * =========================================================== */
export const FullMatrix: Story = {
  parameters: { layout: "fullscreen" },
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 16, padding: 24 }}>
      <ContentsTitleSub2D title="Default" count="32" toggle={<Toggle reverse>Label</Toggle>} />
      <ContentsTitleSub2D title="No bullet" bullet={false} count="32" toggle={<Toggle reverse>Label</Toggle>} />
      <ContentsTitleSub2D title="No count" toggle={<Toggle reverse>Label</Toggle>} />
      <ContentsTitleSub2D title="+ AddBtn" count="32" addBtn toggle={<Toggle reverse>Label</Toggle>} />
      <ContentsTitleSub2D title="No toggle" count="32" />
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
        <ContentsTitleSub2D title="3depth Header Title" count="32" toggle={<Toggle reverse>Label</Toggle>} />
      </div>
      <div data-theme="dark" style={{ padding: 24, background: "var(--context-background-surface-bg-surface-base)" }}>
        <div style={{ fontSize: 12, marginBottom: 8, color: "#b3b4bc" }}>Dark</div>
        <ContentsTitleSub2D title="3depth Header Title" count="32" toggle={<Toggle reverse>Label</Toggle>} />
      </div>
    </div>
  ),
};
