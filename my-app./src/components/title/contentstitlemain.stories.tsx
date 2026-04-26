/**
 * ContentsTitleMain stories — Figma node 4790:206
 *
 *   - Basic / WithBadge / WithToggle / WithHint / Full / NoActions
 *   - LightDarkCompare
 */

import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { StoryPlaygroundFrame } from "@/stories/story-docs-shell";
import { Badge } from "../badge/badge";
import { Button } from "../button/button";
import { Toggle } from "../toggle/toggle";
import { ContentsTitleMain } from "./contentstitlemain";

const meta: Meta<typeof ContentsTitleMain> = {
  title: "Components/Title/ContentsTitleMain",
  component: ContentsTitleMain,
  parameters: { layout: "padded" },
  argTypes: {
    title: { control: "text" },
    hint: { control: "text" },
    badge: { control: false },
    toggle: { control: false },
    actions: { control: false },
  },
  args: {
    title: "Header Title",
  },
};
export default meta;

type Story = StoryObj<typeof ContentsTitleMain>;

const defaultActions = (
  <>
    <Button variant="secondary-outline" size="large">Button</Button>
    <Button variant="secondary-outline" size="large">Button</Button>
    <Button variant="primary-solid" size="large">Button</Button>
  </>
);

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
  },
};

/* =============================================================
 * Variants
 * =========================================================== */
export const Basic: Story = {
  args: {
    title: "Header Title",
    actions: defaultActions,
  },
};

export const WithBadge: Story = {
  args: {
    title: "Header Title",
    badge: <Badge variant="solid" color="purple" shape="round" size="lg">32</Badge>,
    actions: defaultActions,
  },
};

export const WithToggle: Story = {
  args: {
    title: "Header Title",
    badge: <Badge variant="solid" color="purple" shape="round" size="lg">32</Badge>,
    toggle: <Toggle defaultChecked={false} />,
    actions: defaultActions,
  },
};

export const WithHint: Story = {
  args: {
    title: "Header Title",
    badge: <Badge variant="solid" color="purple" shape="round" size="lg">32</Badge>,
    hint: "In-line message.",
    actions: defaultActions,
  },
};

export const Full: Story = {
  args: {
    title: "Header Title",
    badge: <Badge variant="solid" color="purple" shape="round" size="lg">32</Badge>,
    toggle: <Toggle defaultChecked />,
    hint: "In-line message.",
    actions: defaultActions,
  },
};

export const NoActions: Story = {
  args: {
    title: "Header Title",
    badge: <Badge variant="solid" color="purple" shape="round" size="lg">32</Badge>,
  },
};

/* =============================================================
 * Light / Dark compare
 * =========================================================== */
export const LightDarkCompare: Story = {
  parameters: { layout: "fullscreen" },
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <div
        data-theme="light"
        style={{
          padding: 24,
          background: "var(--context-background-surface-bg-surface-base, #fff)",
        }}
      >
        <div style={{ fontSize: 12, marginBottom: 8, color: "#787a88" }}>Light</div>
        <ContentsTitleMain
          title="Header Title"
          badge={<Badge variant="solid" color="purple" shape="round" size="lg">32</Badge>}
          hint="In-line message."
          actions={defaultActions}
        />
      </div>

      <div
        data-theme="dark"
        style={{
          padding: 24,
          background: "var(--context-background-surface-bg-surface-base, #000)",
        }}
      >
        <div style={{ fontSize: 12, marginBottom: 8, color: "#b3b4bc" }}>Dark</div>
        <ContentsTitleMain
          title="Header Title"
          badge={<Badge variant="solid" color="purple" shape="round" size="lg">32</Badge>}
          hint="In-line message."
          actions={defaultActions}
        />
      </div>
    </div>
  ),
};
