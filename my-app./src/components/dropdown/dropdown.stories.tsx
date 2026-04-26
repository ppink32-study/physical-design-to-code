import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import type { CSSProperties } from "react";

import { figmaNodeUrl } from "../../stories/story-figma-urls";
import {
  DropdownMenuDivider,
  DropdownMenuHeader,
  DropdownMenuItem,
} from "./dropdown-menu-item";
import { Dropdown } from "./dropdown";
import { FigmaLinkCard } from "@/stories/figma-link-card";
import {
  StoryDocsInlineCode,
  StoryDocsMatrixPage,
  StoryDocsPage,
  StoryDocsSection,
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

function TriggerMenuItems() {
  return (
    <>
      <DropdownMenuItem leadingIcon={<DocumentIcon />} hasSubmenu>
        menu item
      </DropdownMenuItem>
      <DropdownMenuItem leadingIcon={<DocumentIcon />} hasSubmenu>
        menu item
      </DropdownMenuItem>
      <DropdownMenuItem leadingIcon={<DocumentIcon />} hasSubmenu>
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
    docs: {
      description: {
        component:
          "Figma `Dropdown Trigger with menu`. 트리거·메뉴·위치·화살표·닫힘 동작을 한 컴포넌트로 묶습니다.",
      },
    },
  },
  tags: ["autodocs"],
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
  },
  decorators: [
    (Story) => (
      <div
        style={{
          minHeight: 320,
          display: "flex",
          alignItems: "center",
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

type Story = StoryObj<typeof Dropdown>;

export const Playground: Story = {
  decorators: [
    (Story) => (
      <StoryPlaygroundFrame>
        <Story />
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
      <DropdownMenuItem leadingIcon={<DocumentIcon />} selected trailingIcon={<Icon src="/icon/Check.svg" />}>
        menu item
      </DropdownMenuItem>
      <DropdownMenuItem leadingIcon={<DocumentIcon />}>menu item</DropdownMenuItem>
      <DropdownMenuDivider />
      <DropdownMenuItem leadingIcon={<DocumentIcon />}>menu item</DropdownMenuItem>
    </Dropdown>
  ),
};

export const Matrix: Story = {
  name: "Matrix",
  parameters: {
    layout: "padded",
    docs: {
      description: {
        story: "`Opened` false/true 비교와 트리거–메뉴 4px 간격 검수.",
      },
    },
  },
  decorators: [(Story) => <Story />],
  render: () => (
    <StoryDocsMatrixPage
      title="Dropdown"
      description="트리거와 메뉴의 열림 상태 비교, 트리거–메뉴 4px 간격 시각 검수를 보여줍니다."
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
            <div style={{ fontSize: 12, color: "var(--color-on-surface-secondary)", marginBottom: 12 }}>
              Opened = false
            </div>
            <Dropdown triggerLabel="Button Title" defaultOpen={false} menuAriaLabel="Closed">
              <TriggerMenuItems />
            </Dropdown>
          </div>
          <div>
            <div style={{ fontSize: 12, color: "var(--color-on-surface-secondary)", marginBottom: 12 }}>
              Opened = true
            </div>
            <Dropdown triggerLabel="Button Title" defaultOpen menuAriaLabel="Open">
              <TriggerMenuItems />
            </Dropdown>
          </div>
        </div>
      </section>

      <section>
        <h4 style={{ margin: "0 0 16px", fontSize: 13, fontWeight: 600 }}>Trigger ↔ menu gap (4px)</h4>
        <div style={{ display: "flex", gap: 120, alignItems: "flex-start", paddingTop: 8 }}>
          <Dropdown triggerLabel="Button Title" defaultOpen menuAriaLabel="Gap sample">
            <TriggerMenuItems />
          </Dropdown>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              paddingTop: 32,
              gap: 4,
            }}
            aria-hidden="true"
          >
            <div style={{ width: 18, height: 4, position: "relative" }}>
              <span
                style={{
                  position: "absolute",
                  top: "50%",
                  left: 0,
                  transform: "translateY(-50%)",
                  width: 1,
                  height: 7,
                  background: "#fe3f82",
                }}
              />
              <span
                style={{
                  position: "absolute",
                  top: "50%",
                  right: 0,
                  transform: "translateY(-50%)",
                  width: 1,
                  height: 7,
                  background: "#fe3f82",
                }}
              />
              <span
                style={{
                  position: "absolute",
                  top: "50%",
                  left: 0,
                  right: 0,
                  transform: "translateY(-50%)",
                  height: 1,
                  background: "#fe3f82",
                }}
              />
            </div>
            <span style={{ color: "#fe3f82", fontSize: 10, fontWeight: 500 }}>4 px</span>
          </div>
        </div>
      </section>
    </StoryDocsMatrixPage>
  ),
};

export const Guideline: Story = {
  name: "Guideline",
  parameters: {
    layout: "padded",
    controls: { hideNoControlsWarning: true, disable: true },
    actions: { disable: true },
  },
  render: () => (
    <StoryDocsPage title="Dropdown" description="트리거와 메뉴를 묶은 컴포넌트 사용 가이드입니다.">
      <StoryDocsSection title="사용 가이드">
        <ul style={{ margin: 0, paddingLeft: 20, fontSize: 14, lineHeight: 1.65 }}>
          <li>
            외부 클릭·ESC·포커스 복귀는 내장 동작입니다. 제어가 필요하면{" "}
            <StoryDocsInlineCode>open</StoryDocsInlineCode> /{" "}
            <StoryDocsInlineCode>onOpenChange</StoryDocsInlineCode> 로 상태를 끌어올리세요.
          </li>
          <li>
            트리거와 메뉴 패널 사이 기본 간격은{" "}
            <StoryDocsInlineCode>offset</StoryDocsInlineCode>(기본 4px)입니다. Matrix 의 핑크
            눈금으로 시각 검수할 수 있습니다.
          </li>
          <li>
            메뉴 패널만 단독 쓰려면 <strong>Dropdown Menu</strong> 스토리를, 항목 atom 은{" "}
            <strong>Menu Item</strong> 을 참고하세요.
          </li>
        </ul>
      </StoryDocsSection>
    </StoryDocsPage>
  ),
};
