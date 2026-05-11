import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import type { CSSProperties } from "react";

import { figmaNodeUrl } from "../../stories/story-figma-urls";
import {
  DropdownMenuHeader,
  DropdownMenuItem,
} from "./dropdown-menu-item";
import { Dropdown } from "./dropdown";
import { FigmaLinkCard } from "@/stories/figma-link-card";
import {
  StoryDocsMatrixPage,
  StoryPlaygroundFrame,
} from "@/stories/story-docs-shell";

const FIGMA_SECTION = figmaNodeUrl("5262-317642");

function Icon({ src, size = 16 }: { src: string; size?: number }) {
  const style: CSSProperties = {
    display: "inline-block",
    width: size,
    height: size,
    background: "currentColor",
    WebkitMaskImage: `url(${src})`,
    maskImage: `url(${src})`,
    WebkitMaskRepeat: "no-repeat",
    maskRepeat: "no-repeat",
    WebkitMaskSize: "contain",
    maskSize: "contain",
    WebkitMaskPosition: "center",
    maskPosition: "center",
  };
  return <span aria-hidden="true" style={style} />;
}

const CopyIcon = () => <Icon src="/icon/Copy.svg" />;

function TriggerMenuItems() {
  return (
    <>
      <DropdownMenuItem leadingIcon={<CopyIcon />} hasSubmenu>
        menu item
      </DropdownMenuItem>
      <DropdownMenuItem leadingIcon={<CopyIcon />} hasSubmenu>
        menu item
      </DropdownMenuItem>
      <DropdownMenuItem leadingIcon={<CopyIcon />} hasSubmenu>
        menu item
      </DropdownMenuItem>
    </>
  );
}

const meta: Meta<typeof Dropdown> = {
  title: "Components/Dropdown/Dropdown Trigger with menu",
  component: Dropdown,
  parameters: {
    layout: "centered",
    figma: FIGMA_SECTION,
    docs: { disable: true },
  },
  argTypes: {
    triggerLabel: { control: "text" },
    triggerType: { control: "inline-radio", options: ["primary", "secondary"] },
    triggerSize: {
      control: "inline-radio",
      options: ["small", "medium", "large"],
    },
    triggerSplitButton: { control: "boolean" },
    triggerDisabled: { control: "boolean" },
    dropDirection: {
      control: "inline-radio",
      options: ["down", "up", "left", "right"],
    },
    align: { control: "inline-radio", options: ["start", "center", "end"] },
    showArrow: { control: "boolean" },
    offset: { control: { type: "number", min: 0, max: 24, step: 1 } },
    menuMinWidth: { control: "text" },
    menuWidth: { control: "text" },
    menuMaxHeight: { control: "text" },
    closeOnSelect: { control: "boolean" },
    onOpenChange: { action: "openChange" },
  },
  args: {
    triggerLabel: "Button Title",
    triggerType: "primary",
    triggerSize: "medium",
    triggerSplitButton: false,
    triggerDisabled: false,
    dropDirection: "down",
    align: "start",
    showArrow: false,
    offset: 4,
    closeOnSelect: true,
    menuAriaLabel: "Sample menu",
    menuMinWidth: 180,
    menuWidth: 180,
  },
};
export default meta;

type Story = StoryObj<typeof Dropdown>;

export const Playground: Story = {
  decorators: [
    (Story) => (
      <StoryPlaygroundFrame>
        <div style={{ minHeight: 360, width: "100%", display: "flex", justifyContent: "center" }}>
          <Story />
        </div>
      </StoryPlaygroundFrame>
    ),
  ],
  args: {
    showArrow: true,
    align: "center",
  },
  render: (args) => (
    <Dropdown {...args}>
      <DropdownMenuHeader>Dropdown header</DropdownMenuHeader>
      <DropdownMenuItem leadingIcon={<CopyIcon />} selected trailingIcon={<Icon src="/icon/Check.svg" />}>
        menu item
      </DropdownMenuItem>
      <DropdownMenuItem leadingIcon={<CopyIcon />}>menu item</DropdownMenuItem>
      <DropdownMenuItem leadingIcon={<CopyIcon />}>menu item</DropdownMenuItem>
    </Dropdown>
  ),
};

export const Matrix: Story = {
  name: "Matrix",
  parameters: {
    layout: "padded",
  },
  render: (_args, ctx) => {
    const locale = ctx.globals && ctx.globals.locale === "en" ? "en" : "ko";
    return (
    <StoryDocsMatrixPage
      title="Dropdown"
      description={locale === "en"
        ? "Compares trigger and menu open states."
        : "트리거와 메뉴의 열림 상태를 비교합니다."}
      figmaNode="12149-94684"
    >
      <FigmaLinkCard
        nodeId="12149-94684"
        caption="Components / Dropdown — Trigger with Menu 통합 매트릭스 원본"
      />
      <section>
        <h4 style={{ margin: "0 0 16px", fontSize: 13, fontWeight: 600 }}>Opened</h4>
        <div style={{ display: "flex", gap: 80, alignItems: "flex-start", flexWrap: "wrap" }}>
          <div>
            <div
              style={{ fontSize: 12, color: "var(--color-on-surface-secondary)", marginBottom: 12 }}
            >
              Opened = false
            </div>
            <Dropdown
              triggerLabel="Button Title"
              defaultOpen={false}
              menuAriaLabel="Closed"
              menuMinWidth={180}
              menuWidth={180}
            >
              <TriggerMenuItems />
            </Dropdown>
          </div>
          <div>
            <div
              style={{ fontSize: 12, color: "var(--color-on-surface-secondary)", marginBottom: 12 }}
            >
              Opened = true
            </div>
            <Dropdown
              triggerLabel="Button Title"
              defaultOpen
              menuAriaLabel="Open"
              menuMinWidth={180}
              menuWidth={180}
            >
              <TriggerMenuItems />
            </Dropdown>
          </div>
        </div>
      </section>
    </StoryDocsMatrixPage>
    );
  },
};
