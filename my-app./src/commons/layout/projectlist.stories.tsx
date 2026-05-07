import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { ProjectListPage, type ProjectListTheme } from "./projectlist";

/* ------------------------------------------------------------------ */

const meta: Meta<typeof ProjectListPage> = {
  title: "Layout/ProjectList",
  component: ProjectListPage,
  parameters: {
    layout: "fullscreen",
    nextjs: { appDirectory: true },
    docs: { disable: true },
  },
};
export default meta;
type Story = StoryObj<typeof ProjectListPage>;

/* ------------------------------------------------------------------ *
 * Stories                                                              *
 * ------------------------------------------------------------------ */

export const Playground: Story = {
  name: "Playground (Interactive)",
  render: () => {
    const [theme, setTheme] = useState<ProjectListTheme>("focus");
    return (
      <div style={{ width: 1920, height: 960, overflow: "hidden" }}>
        <ProjectListPage theme={theme} onThemeChange={setTheme} />
      </div>
    );
  },
};

export const Standard: Story = {
  name: "Standard Theme",
  render: () => (
    <div style={{ width: 1920, height: 960, overflow: "hidden" }}>
      <ProjectListPage theme="standard" />
    </div>
  ),
};

export const Focus: Story = {
  name: "Focus Theme",
  render: () => (
    <div style={{ width: 1920, height: 960, overflow: "hidden" }}>
      <ProjectListPage theme="focus" />
    </div>
  ),
};
