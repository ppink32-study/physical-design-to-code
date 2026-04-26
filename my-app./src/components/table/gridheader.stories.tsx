import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import type { CSSProperties } from "react";

import { Checkbox } from "../checkbox/checkbox";
import { Toggle } from "../toggle/toggle";

import { GridHeader } from "./gridheader";

const meta: Meta<typeof GridHeader> = {
  title: "Components/Table/GridHeader",
  component: GridHeader,
  parameters: {
    layout: "padded",
    docs: { disable: true },
  },
};
export default meta;
type Story = StoryObj<typeof GridHeader>;

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

/** 2 sizes × 7 types — Figma sample 레이아웃 */
export const Matrix: Story = {
  name: "Full Matrix",
  parameters: { layout: "padded" },
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      <Row size="single" label="single" />
      <Row size="double" label="double" />
    </div>
  ),
};
