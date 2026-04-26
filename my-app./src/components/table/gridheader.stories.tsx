import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import type { CSSProperties } from "react";

import { StoryPlaygroundFrame } from "@/stories/story-docs-shell";
import { Checkbox } from "../checkbox/checkbox";
import { Toggle } from "../toggle/toggle";

import { GridHeader } from "./gridheader";

const meta: Meta<typeof GridHeader> = {
  title: "Components/Table/GridHeader",
  component: GridHeader,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Data Grid 의 Header 셀. Figma node 4456:290401 기반. 2 sizes × 7 types 총 14 variant 지원.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    size: { control: "inline-radio", options: ["single", "double"] },
    type: {
      control: "select",
      options: [
        "default",
        "no",
        "blank",
        "expand-all",
        "collapse-all",
        "checkbox",
        "toggle",
      ],
    },
    align: { control: "inline-radio", options: ["left", "center", "right"] },
    infoIcon: { control: "boolean" },
    headerFunction: { control: "boolean" },
    sortDirection: {
      control: "inline-radio",
      options: ["asc", "desc", "none"],
    },
    lPipe: { control: "boolean" },
    rPipe: { control: "boolean" },
    width: { control: "number" },
  },
};
export default meta;
type Story = StoryObj<typeof GridHeader>;

/* =================================================================
 * Type variants (single)
 * =============================================================== */
export const Playground: Story = {
  decorators: [
    (Story) => (
      <StoryPlaygroundFrame>
        <Story />
      </StoryPlaygroundFrame>
    ),
  ],
  args: { size: "single", type: "default", children: "Table Header" },
};
export const NoCell: Story = {
  name: "No.",
  args: { size: "single", type: "no" },
};
export const Blank: Story = {
  args: { size: "single", type: "blank" },
};
export const ExpandAll: Story = {
  args: { size: "single", type: "expand-all" },
};
export const CollapseAll: Story = {
  args: { size: "single", type: "collapse-all" },
};
export const CheckboxHeader: Story = {
  name: "Checkbox",
  render: () => (
    <GridHeader
      size="single"
      type="checkbox"
      checkboxSlot={<Checkbox aria-label="select all" />}
    />
  ),
};
export const ToggleHeader: Story = {
  name: "Toggle",
  render: () => (
    <GridHeader
      size="single"
      type="toggle"
      toggleSlot={<Toggle aria-label="toggle column" />}
    />
  ),
};

/* =================================================================
 * Sort arrows (Default type)
 * =============================================================== */
export const SortAsc: Story = {
  name: "Default / sort=asc",
  args: {
    size: "single",
    type: "default",
    children: "Name",
    sortDirection: "asc",
  },
};
export const SortDesc: Story = {
  name: "Default / sort=desc",
  args: {
    size: "single",
    type: "default",
    children: "Name",
    sortDirection: "desc",
  },
};
export const SortNone: Story = {
  name: "Default / sort=none",
  args: {
    size: "single",
    type: "default",
    children: "Name",
    sortDirection: "none",
    headerFunction: false,
  },
};
export const WithInfoIcon: Story = {
  name: "Default / with InfoIcon",
  args: {
    size: "single",
    type: "default",
    children: "Status",
    infoIcon: true,
  },
};

/* =================================================================
 * Full matrix (2 sizes × 7 types)  —  Figma 의 sample 레이아웃 재현
 * =============================================================== */
const matrixCell: CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "flex-start",
};

function Row({
  size,
  label,
}: {
  size: "single" | "double";
  label: string;
}) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      <div
        style={{
          fontSize: 11,
          color: "#787a88",
          fontWeight: 600,
          textTransform: "uppercase",
          letterSpacing: 0.4,
        }}
      >
        {label}
      </div>
      <div style={{ display: "flex", alignItems: "stretch" }}>
        <div style={matrixCell}>
          <GridHeader size={size} type="blank" />
        </div>
        <div style={matrixCell}>
          <GridHeader
            size={size}
            type="checkbox"
            checkboxSlot={<Checkbox aria-label="select all" />}
          />
        </div>
        <div style={matrixCell}>
          <GridHeader size={size} type="expand-all" />
        </div>
        <div style={matrixCell}>
          <GridHeader size={size} type="collapse-all" />
        </div>
        <div style={matrixCell}>
          <GridHeader size={size} type="default">
            Table Header
          </GridHeader>
        </div>
        <div style={matrixCell}>
          <GridHeader size={size} type="no" />
        </div>
        <div style={matrixCell}>
          <GridHeader
            size={size}
            type="toggle"
            toggleSlot={<Toggle aria-label="toggle" />}
          />
        </div>
      </div>
    </div>
  );
}

export const FullMatrix: Story = {
  name: "Full Matrix (size × type)",
  parameters: { layout: "padded" },
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      <Row size="single" label="single" />
      <Row size="double" label="double" />
    </div>
  ),
};

/* =================================================================
 * Light vs Dark
 * =============================================================== */
function Panel({ theme }: { theme: "light" | "dark" }) {
  const bg =
    theme === "light"
      ? "#ffffff"
      : "var(--context-background-surface-bg-surface-base, #18191c)";
  return (
    <div
      data-theme={theme}
      style={{
        padding: 24,
        borderRadius: 8,
        background: bg,
        display: "flex",
        flexDirection: "column",
        gap: 8,
        minWidth: 520,
      }}
    >
      <div
        style={{
          fontSize: 12,
          fontWeight: 600,
          color: theme === "light" ? "#18191c" : "#ffffff",
        }}
      >
        {theme.toUpperCase()}
      </div>
      <div style={{ display: "flex" }}>
        <GridHeader type="blank" />
        <GridHeader
          type="checkbox"
          checkboxSlot={<Checkbox aria-label="select" />}
        />
        <GridHeader type="default">Name</GridHeader>
        <GridHeader type="no" />
        <GridHeader
          type="toggle"
          toggleSlot={<Toggle aria-label="toggle" />}
        />
      </div>
    </div>
  );
}

export const LightDarkCompare: Story = {
  name: "Light vs Dark",
  parameters: { layout: "padded" },
  render: () => (
    <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
      <Panel theme="light" />
      <Panel theme="dark" />
    </div>
  ),
};
