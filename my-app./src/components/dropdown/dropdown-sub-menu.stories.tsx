import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import type { CSSProperties } from "react";

import { figmaNodeUrl } from "../../stories/story-figma-urls";
import { Dropdown } from "./dropdown";
import {
  DropdownMenuDivider,
  DropdownMenuHeader,
  DropdownMenuItem,
} from "./dropdown-menu-item";
import { DropdownSubMenu } from "./dropdown-sub-menu";
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

const DocumentIcon = () => <Icon src="/icon/Document.svg" />;
const ArrowForwardIcon = () => <Icon src="/icon/Arrow-Forward.svg" />;

const meta: Meta<typeof DropdownSubMenu> = {
  title: "Components/Dropdown/Dropdown Menu/Multiple levels",
  component: DropdownSubMenu,
  parameters: {
    layout: "centered",
    figma: FIGMA_SECTION,
    docs: {
      description: {
        component:
          "Figma `Dropdown Menu - Multiple levels`. 드릴다운·다중 그룹·스크롤을 `DropdownSubMenu` 와 조합으로 표현합니다.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    label: { control: "text" },
    disabled: { control: "boolean" },
    flip: { control: "boolean" },
    level: { control: "inline-radio", options: [1, 2, 3] },
    openDelayMs: { control: { type: "number", min: 0, max: 1000, step: 50 } },
    closeDelayMs: { control: { type: "number", min: 0, max: 1000, step: 50 } },
    menuMinWidth: { control: "text" },
    menuMaxHeight: { control: "text" },
  },
  args: {
    label: "menu item",
    disabled: false,
    flip: false,
    level: 1,
    openDelayMs: 200,
    closeDelayMs: 200,
  },
  decorators: [
    (Story) => (
      <div
        style={{
          minHeight: 360,
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "center",
          padding: 80,
        }}
      >
        <Story />
      </div>
    ),
  ],
};
export default meta;

type Story = StoryObj<typeof DropdownSubMenu>;

export const Playground: Story = {
  decorators: [
    (Story) => (
      <StoryPlaygroundFrame>
        <Story />
      </StoryPlaygroundFrame>
    ),
  ],
  render: (args) => (
    <Dropdown triggerLabel="More" defaultOpen menuAriaLabel="Default menu">
      <DropdownMenuItem leadingIcon={<DocumentIcon />}>Open</DropdownMenuItem>

      <DropdownSubMenu {...args} leadingIcon={<DocumentIcon />}>
        <DropdownMenuItem>Inbox</DropdownMenuItem>
        <DropdownMenuItem>Archive</DropdownMenuItem>
        <DropdownMenuItem>Trash</DropdownMenuItem>
      </DropdownSubMenu>

      <DropdownMenuDivider />
      <DropdownMenuItem disabled>Delete</DropdownMenuItem>
    </Dropdown>
  ),
};

function MenuItemRow(props: { selected?: boolean }) {
  return (
    <DropdownMenuItem
      leadingIcon={<DocumentIcon />}
      selected={props.selected}
      trailingIcon={props.selected ? <Icon src="/icon/Check.svg" /> : undefined}
    >
      menu item
    </DropdownMenuItem>
  );
}

export const Matrix: Story = {
  name: "Matrix",
  parameters: {
    layout: "padded",
    docs: {
      description: {
        story: "`1 Group` / `Multiple Groups` / `Drill down` 패턴 예시.",
      },
    },
  },
  decorators: [(Story) => <Story />],
  render: () => (
    <StoryDocsMatrixPage
      title="Sub Menu"
      description="1 Group·Multiple Groups·Drill down 등 다단 메뉴 패턴 예시를 보여줍니다."
      figmaNode="13292-56877"
    >
      <FigmaLinkCard
        nodeId="13292-56877"
        caption="Components / Dropdown · Multi-level Menu 매트릭스 원본"
      />
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: 48,
          alignItems: "flex-start",
          justifyContent: "center",
        }}
      >
        <section style={{ width: 240 }}>
          <h4 style={{ margin: "0 0 12px", fontSize: 12, color: "var(--color-on-surface-secondary)" }}>
            1 Group
          </h4>
          <Dropdown triggerLabel="Open" defaultOpen menuAriaLabel="One group">
            <DropdownMenuHeader>Dropdown header</DropdownMenuHeader>
            <MenuItemRow selected />
            <MenuItemRow />
            <MenuItemRow />
            <MenuItemRow />
          </Dropdown>
        </section>

        <section style={{ width: 240 }}>
          <h4 style={{ margin: "0 0 12px", fontSize: 12, color: "var(--color-on-surface-secondary)" }}>
            Multiple Groups (scroll)
          </h4>
          <Dropdown triggerLabel="Open" defaultOpen menuAriaLabel="Multiple groups" menuMaxHeight={280}>
            <DropdownMenuHeader>Dropdown header</DropdownMenuHeader>
            <MenuItemRow selected />
            <MenuItemRow />
            <MenuItemRow />
            <MenuItemRow />
            <DropdownMenuDivider />
            <DropdownMenuHeader>Dropdown header</DropdownMenuHeader>
            <MenuItemRow selected />
            <MenuItemRow />
            <MenuItemRow />
            <MenuItemRow />
          </Dropdown>
        </section>

        <section style={{ minWidth: 320 }}>
          <h4 style={{ margin: "0 0 12px", fontSize: 12, color: "var(--color-on-surface-secondary)" }}>
            Drill down
          </h4>
          <div style={{ display: "flex", gap: 24, alignItems: "flex-start" }}>
            <Dropdown triggerLabel="Open" defaultOpen menuAriaLabel="Drill down">
              <DropdownMenuHeader>Dropdown header</DropdownMenuHeader>
              <DropdownMenuItem leadingIcon={<ArrowForwardIcon />}>menu item</DropdownMenuItem>
              <DropdownSubMenu label="menu item" leadingIcon={<ArrowForwardIcon />}>
                <DropdownMenuItem leadingIcon={<ArrowForwardIcon />}>menu item</DropdownMenuItem>
                <DropdownMenuItem
                  leadingIcon={<ArrowForwardIcon />}
                  selected
                  trailingIcon={<Icon src="/icon/Check.svg" />}
                >
                  menu item
                </DropdownMenuItem>
                <DropdownMenuItem leadingIcon={<ArrowForwardIcon />}>menu item</DropdownMenuItem>
              </DropdownSubMenu>
              <DropdownMenuItem leadingIcon={<ArrowForwardIcon />}>menu item</DropdownMenuItem>
            </Dropdown>
          </div>
        </section>
      </div>
    </StoryDocsMatrixPage>
  ),
};
