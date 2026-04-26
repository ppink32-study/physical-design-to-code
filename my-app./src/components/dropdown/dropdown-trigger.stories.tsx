import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Fragment } from "react";

import { figmaNodeUrl } from "../../stories/story-figma-urls";
import {
  DropdownTrigger,
  type DropdownTriggerDropDirection,
  type DropdownTriggerSize,
  type DropdownTriggerType,
} from "./dropdown-trigger";
import { FigmaLinkCard } from "@/stories/figma-link-card";
import { StoryDocsMatrixPage, StoryPlaygroundFrame } from "@/stories/story-docs-shell";

const FIGMA_SECTION = figmaNodeUrl("5262-317642");

const meta: Meta<typeof DropdownTrigger> = {
  title: "Components/Dropdown/Trigger",
  component: DropdownTrigger,
  parameters: {
    layout: "centered",
    figma: FIGMA_SECTION,
    docs: { disable: true },
  },
  argTypes: {
    type: { control: "inline-radio", options: ["primary", "secondary"] },
    size: { control: "inline-radio", options: ["small", "medium", "large"] },
    splitButton: { control: "boolean" },
    dropDirection: {
      control: "inline-radio",
      options: ["down", "up", "left", "right"],
    },
    opened: { control: "boolean" },
    disabled: { control: "boolean" },
    children: { control: "text" },
    onToggle: { action: "toggle" },
    onMainClick: { action: "mainClick" },
    onChevronClick: { action: "chevronClick" },
  },
  args: {
    type: "primary",
    size: "medium",
    splitButton: false,
    dropDirection: "down",
    opened: false,
    disabled: false,
    children: "Button Title",
  },
};
export default meta;

type Story = StoryObj<typeof DropdownTrigger>;

export const Playground: Story = {
  decorators: [
    (Story) => (
      <StoryPlaygroundFrame>
        <Story />
      </StoryPlaygroundFrame>
    ),
  ],
  args: {
    children: "Button Title",
  },
};

const SIZES: DropdownTriggerSize[] = ["small", "medium", "large"];
const DIRECTIONS: DropdownTriggerDropDirection[] = ["down", "up", "left", "right"];
const COLS: Array<{ type: DropdownTriggerType; split: boolean; label: string }> = [
  { type: "primary", split: false, label: "Primary / split=false" },
  { type: "primary", split: true, label: "Primary / split=true" },
  { type: "secondary", split: false, label: "Secondary / split=false" },
  { type: "secondary", split: true, label: "Secondary / split=true" },
];

export const Matrix: Story = {
  name: "Matrix",
  parameters: {
    layout: "padded",
  },
  render: () => (
    <StoryDocsMatrixPage
      title="Trigger"
      description="Size·Direction 행과 Type·Split 열로 드롭다운 트리거 variant를 비교합니다."
      figmaNode="5286-121691"
    >
      <FigmaLinkCard
        nodeId="5286-121691"
        caption="Components / Dropdown · Trigger — Variant × State 매트릭스 원본"
      />
      <div
        style={{
          display: "grid",
          gridTemplateColumns: `100px 140px repeat(${COLS.length}, minmax(140px, max-content))`,
          gap: "12px 16px",
          alignItems: "center",
          overflowX: "auto",
        }}
      >
        <div />
        <div />
        {COLS.map((c) => (
          <div
            key={c.label}
            style={{
              fontSize: 11,
              color: "var(--color-on-surface-secondary)",
              lineHeight: 1.3,
              borderBottom: "1px solid var(--color-border-surface)",
              paddingBottom: 4,
            }}
          >
            {c.label}
          </div>
        ))}

        {SIZES.map((size) =>
          DIRECTIONS.map((dir) => (
            <Fragment key={`${size}-${dir}`}>
              <div
                style={{
                  fontSize: 11,
                  color: "var(--color-on-surface-secondary)",
                  fontWeight: 600,
                }}
              >
                {size}
              </div>
              <div
                style={{
                  fontSize: 11,
                  color: "var(--color-on-surface-secondary)",
                }}
              >
                {dir}
              </div>
              {COLS.map((c) => (
                <div key={`${size}-${dir}-${c.label}`} style={{ display: "flex" }}>
                  <DropdownTrigger
                    type={c.type}
                    size={size}
                    splitButton={c.split}
                    dropDirection={dir}
                    onToggle={() => undefined}
                    onMainClick={() => undefined}
                    onChevronClick={() => undefined}
                  >
                    Button Title
                  </DropdownTrigger>
                </div>
              ))}
            </Fragment>
          )),
        )}
      </div>
    </StoryDocsMatrixPage>
  ),
};
