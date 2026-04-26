/**
 * PageTitle stories — Figma node 4790:161
 *
 *   - Type_1d (기본 / hint 있음 / hint 없음)
 *   - Type_2d (badges + title + hint + actions 조합)
 *   - LightDarkCompare
 */

import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { StoryPlaygroundFrame } from "@/stories/story-docs-shell";
import { Badge } from "../badge/badge";
import { Button } from "../button/button";
import { PageTitle } from "./pagetitle";

const meta: Meta<typeof PageTitle> = {
  title: "Components/Title/PageTitle",
  component: PageTitle,
  parameters: { layout: "padded" },
  argTypes: {
    type: {
      control: "inline-radio",
      options: ["1d", "2d"],
    },
    title: { control: "text" },
    hint: { control: "text" },
    badges: { control: false },
    actions: { control: false },
  },
  args: {
    type: "1d",
    title: "Header Title",
    hint: "해당 페이지에 관한 설명이 나타납니다.",
  },
};
export default meta;

type Story = StoryObj<typeof PageTitle>;


export const Playground: Story = {
  decorators: [
    (Story) => (
      <StoryPlaygroundFrame>
        <Story />
      </StoryPlaygroundFrame>
    ),
  ],
  args: {
    type: "1d",
    title: "Header Title",
    hint: "해당 페이지에 관한 설명이 나타납니다.",
  },
};

/* =============================================================
 * 1d 변형
 * =========================================================== */
export const Type1d_WithHint: Story = {
  args: {
    type: "1d",
    title: "Header Title",
    hint: "해당 페이지에 관한 설명이 나타납니다.",
  },
};

export const Type1d_NoHint: Story = {
  args: {
    type: "1d",
    title: "Header Title",
    hint: undefined,
  },
};

/* =============================================================
 * 2d 변형
 * =========================================================== */
export const Type2d_Full: Story = {
  args: {
    type: "2d",
    title: "Header Title",
    hint: "해당 페이지에 관한 설명이 나타납니다.",
    badges: (
      <>
        <Badge variant="solid" color="gray" shape="square" size="lg">학습대기</Badge>
      </>
    ),
    actions: (
      <>
        <Button variant="secondary-outline" size="large">Button</Button>
        <Button variant="secondary-outline" size="large">Button</Button>
        <Button variant="secondary-outline" size="large">Button</Button>
        <Button variant="primary-solid" size="large">Button</Button>
      </>
    ),
  },
};

export const Type2d_NoHint: Story = {
  args: {
    type: "2d",
    title: "Header Title",
    hint: undefined,
    badges: <Badge variant="solid" color="gray" shape="square" size="lg">학습대기</Badge>,
    actions: (
      <>
        <Button variant="secondary-outline" size="large">Button</Button>
        <Button variant="primary-solid" size="large">Button</Button>
      </>
    ),
  },
};

export const Type2d_MultipleBadges: Story = {
  args: {
    type: "2d",
    title: "Header Title",
    hint: "해당 페이지에 관한 설명이 나타납니다.",
    badges: (
      <>
        <Badge variant="solid" color="gray" shape="square" size="lg">학습대기</Badge>
        <Badge variant="solid" color="red" shape="square" size="lg">오류</Badge>
      </>
    ),
    actions: (
      <>
        <Button variant="secondary-outline" size="large">Button</Button>
        <Button variant="primary-solid" size="large">Button</Button>
      </>
    ),
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
        <div style={{ fontSize: 12, marginBottom: 8, color: "#787a88" }}>Light · 1d</div>
        <PageTitle type="1d" title="Header Title" hint="해당 페이지에 관한 설명이 나타납니다." />
        <div style={{ fontSize: 12, margin: "24px 0 8px", color: "#787a88" }}>Light · 2d</div>
        <PageTitle
          type="2d"
          title="Header Title"
          hint="해당 페이지에 관한 설명이 나타납니다."
          badges={<Badge variant="solid" color="gray" shape="square" size="lg">학습대기</Badge>}
          actions={
            <>
              <Button variant="secondary-outline" size="large">Button</Button>
              <Button variant="primary-solid" size="large">Button</Button>
            </>
          }
        />
      </div>

      <div
        data-theme="dark"
        style={{
          padding: 24,
          background: "var(--context-background-surface-bg-surface-base, #000)",
        }}
      >
        <div style={{ fontSize: 12, marginBottom: 8, color: "#b3b4bc" }}>Dark · 1d</div>
        <PageTitle type="1d" title="Header Title" hint="해당 페이지에 관한 설명이 나타납니다." />
        <div style={{ fontSize: 12, margin: "24px 0 8px", color: "#b3b4bc" }}>Dark · 2d</div>
        <PageTitle
          type="2d"
          title="Header Title"
          hint="해당 페이지에 관한 설명이 나타납니다."
          badges={<Badge variant="solid" color="gray" shape="square" size="lg">학습대기</Badge>}
          actions={
            <>
              <Button variant="secondary-outline" size="large">Button</Button>
              <Button variant="primary-solid" size="large">Button</Button>
            </>
          }
        />
      </div>
    </div>
  ),
};
