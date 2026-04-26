import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import type { CSSProperties } from "react";
import { Fragment } from "react";

import { figmaNodeUrl } from "../../stories/story-figma-urls";
import { Dropdown } from "./dropdown";
import {
  DropdownMenuHeader,
  DropdownMenuItem,
} from "./dropdown-menu-item";
import { DropdownSubMenu } from "./dropdown-sub-menu";
import { DropdownMenu, type DropdownMenuArrow } from "./dropdown-menu";
import { FigmaLinkCard } from "@/stories/figma-link-card";
import {
  StoryDocsInlineCode,
  StoryDocsMatrixPage,
  StoryDocsPage,
  StoryDocsSection,
  StoryPlaygroundFrame,
} from "@/stories/story-docs-shell";

const FIGMA_SECTION = figmaNodeUrl("5262-317642");

/** Figma 메뉴 패널 기준 — Matrix·Multi-level·Playground 공통 */
const MENU_W = 180;

/** Multi-level: 메뉴가 absolute 라 열마다 최소 가로를 확보해야 패널이 겹치지 않음 */
const MULTI_LEVEL_COL_MIN = MENU_W + 48;
const MULTI_LEVEL_DRILL_MIN = MENU_W * 2 + 72;

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
const ArrowForwardIcon = () => <Icon src="/icon/Arrow-Forward.svg" />;

function makeItems(count: number) {
  return Array.from({ length: count }, (_, i) => (
    <DropdownMenuItem key={i} leadingIcon={<CopyIcon />} hasSubmenu>
      menu item
    </DropdownMenuItem>
  ));
}

function MenuItemRow(props: { selected?: boolean }) {
  return (
    <DropdownMenuItem
      leadingIcon={<CopyIcon />}
      selected={props.selected}
      trailingIcon={props.selected ? <Icon src="/icon/Check.svg" /> : undefined}
    >
      menu item
    </DropdownMenuItem>
  );
}

const ARROW_VARIANTS: DropdownMenuArrow[] = [
  "none",
  "top-left",
  "top-center",
  "top-right",
  "bottom-left",
  "bottom-center",
  "bottom-right",
];

const matrixGridMinWidth =
  88 + ARROW_VARIANTS.length * MENU_W + ARROW_VARIANTS.length * 12;

const meta: Meta<typeof DropdownMenu> = {
  title: "Components/Dropdown/Dropdown Menu",
  component: DropdownMenu,
  parameters: {
    layout: "centered",
    figma: FIGMA_SECTION,
    docs: { disable: true },
  },
  argTypes: {
    width: { control: "text" },
    minWidth: { control: "text" },
    maxHeight: { control: "text" },
    arrow: {
      control: "inline-radio",
      options: ARROW_VARIANTS,
    },
  },
  args: {
    minWidth: MENU_W,
    width: MENU_W,
    arrow: "none",
  },
};
export default meta;

type Story = StoryObj<typeof DropdownMenu>;

export const Playground: Story = {
  decorators: [
    (Story) => (
      <StoryPlaygroundFrame>
        <Story />
      </StoryPlaygroundFrame>
    ),
  ],
  render: (args) => (
    <DropdownMenu {...args} aria-label="Sample menu" maxHeight={240}>
      {makeItems(5)}
    </DropdownMenu>
  ),
};

export const Matrix: Story = {
  name: "Matrix",
  parameters: {
    layout: "padded",
  },
  render: () => (
    <StoryDocsMatrixPage
      title="Menu"
      description="항목 개수(1~5)·arrow 7종과 다단(Multi-level) 패턴을 한 페이지에서 비교합니다. 메뉴 패널 width는 180px로 통일합니다."
      figmaNode="5355-154239"
    >
      <FigmaLinkCard
        nodeId="5355-154239"
        caption="Components / Dropdown · Menu — Variant 매트릭스 원본"
      />
      <section>
        <h4 style={{ margin: "0 0 12px", fontSize: 13, fontWeight: 600 }}>Items × Arrow</h4>
        <div style={{ overflowX: "auto" }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: `88px repeat(${ARROW_VARIANTS.length}, ${MENU_W}px)`,
              gap: "10px 12px",
              alignItems: "start",
              minWidth: matrixGridMinWidth,
            }}
          >
            <div />
            {ARROW_VARIANTS.map((a) => (
              <div
                key={a}
                style={{
                  fontSize: 10,
                  color: "var(--color-on-surface-secondary)",
                  lineHeight: 1.25,
                  borderBottom: "1px solid var(--color-border-surface)",
                  paddingBottom: 4,
                }}
              >
                Arrow={a.replace("-", " ")}
              </div>
            ))}

            {Array.from({ length: 5 }, (_, idx) => {
              const n = idx + 1;
              return (
                <Fragment key={n}>
                  <div
                    style={{
                      fontSize: 11,
                      color: "var(--color-on-surface-secondary)",
                      paddingTop: 4,
                    }}
                  >
                    Items={n}
                  </div>
                  {ARROW_VARIANTS.map((a) => (
                    <div key={`${n}-${a}`}>
                      <DropdownMenu
                        arrow={a}
                        aria-label={`Items ${n} arrow ${a}`}
                        minWidth={MENU_W}
                        width={MENU_W}
                      >
                        {makeItems(n)}
                      </DropdownMenu>
                    </div>
                  ))}
                </Fragment>
              );
            })}
          </div>
        </div>
      </section>

      <FigmaLinkCard
        nodeId="13292-56877"
        caption="Components / Dropdown · Multi-level Menu (Figma)"
      />
      <section
        style={{
          paddingBottom: 160,
          marginBottom: 24,
        }}
      >
        <h4 style={{ margin: "0 0 12px", fontSize: 13, fontWeight: 600 }}>Multi-level</h4>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            columnGap: 64,
            rowGap: 56,
            alignItems: "flex-start",
          }}
        >
          <div style={{ flex: "0 0 auto", minWidth: MULTI_LEVEL_COL_MIN }}>
            <div
              style={{
                fontSize: 12,
                color: "var(--color-on-surface-secondary)",
                marginBottom: 12,
              }}
            >
              1 Group
            </div>
            <Dropdown
              triggerLabel="Open"
              defaultOpen
              menuAriaLabel="One group"
              menuMinWidth={MENU_W}
              menuWidth={MENU_W}
            >
              <DropdownMenuHeader>Dropdown header</DropdownMenuHeader>
              <MenuItemRow selected />
              <MenuItemRow />
              <MenuItemRow />
              <MenuItemRow />
              <MenuItemRow />
            </Dropdown>
          </div>

          <div style={{ flex: "0 0 auto", minWidth: MULTI_LEVEL_COL_MIN }}>
            <div
              style={{
                fontSize: 12,
                color: "var(--color-on-surface-secondary)",
                marginBottom: 12,
              }}
            >
              Multiple Groups (scroll)
            </div>
            <Dropdown
              triggerLabel="Open"
              defaultOpen
              menuAriaLabel="Multiple groups"
              menuMinWidth={MENU_W}
              menuWidth={MENU_W}
              menuMaxHeight={280}
            >
              <DropdownMenuHeader>Dropdown header</DropdownMenuHeader>
              <MenuItemRow selected />
              <MenuItemRow />
              <MenuItemRow />
              <MenuItemRow />
              <MenuItemRow />
              <DropdownMenuHeader>Dropdown header</DropdownMenuHeader>
              <MenuItemRow selected />
              <MenuItemRow />
              <MenuItemRow />
              <MenuItemRow />
              <MenuItemRow />
            </Dropdown>
          </div>

          <div style={{ flex: "0 0 auto", minWidth: MULTI_LEVEL_DRILL_MIN }}>
            <div
              style={{
                fontSize: 12,
                color: "var(--color-on-surface-secondary)",
                marginBottom: 12,
              }}
            >
              Drill down
            </div>
            <Dropdown
              triggerLabel="Open"
              defaultOpen
              menuAriaLabel="Drill down"
              menuMinWidth={MENU_W}
              menuWidth={MENU_W}
            >
              <DropdownMenuHeader>Dropdown header</DropdownMenuHeader>
              <DropdownMenuItem leadingIcon={<ArrowForwardIcon />}>menu item</DropdownMenuItem>
              <DropdownSubMenu
                label="menu item"
                leadingIcon={<ArrowForwardIcon />}
                menuMinWidth={MENU_W}
                menuWidth={MENU_W}
              >
                <DropdownMenuItem leadingIcon={<ArrowForwardIcon />}>menu item</DropdownMenuItem>
                <DropdownMenuItem
                  leadingIcon={<ArrowForwardIcon />}
                  selected
                  trailingIcon={<Icon src="/icon/Check.svg" />}
                >
                  menu item
                </DropdownMenuItem>
              </DropdownSubMenu>
              <DropdownMenuItem leadingIcon={<ArrowForwardIcon />}>menu item</DropdownMenuItem>
            </Dropdown>
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
    <StoryDocsPage title="Menu" description="드롭다운 메뉴 패널 컴포넌트 사용 가이드입니다.">
      <StoryDocsSection title="사용 가이드">
        <ul style={{ margin: 0, paddingLeft: 20, fontSize: 14, lineHeight: 1.65 }}>
          <li>
            트리거와의 간격·플립·포커스는 <strong>Dropdown Trigger with menu</strong>{" "}
            Composite 에서 다룹니다. 이 컴포넌트는 패널·스크롤·비크만 담당합니다.
          </li>
          <li>
            <StoryDocsInlineCode>arrow</StoryDocsInlineCode> 는 트리거에 붙이는 말풍선 비크
            위치입니다. 트리거 정렬에 맞춰 <StoryDocsInlineCode>top-*</StoryDocsInlineCode> /{" "}
            <StoryDocsInlineCode>bottom-*</StoryDocsInlineCode> 를 고릅니다.
          </li>
          <li>
            긴 목록은 <StoryDocsInlineCode>maxHeight</StoryDocsInlineCode> 로 스크롤 영역을
            제한하세요. 다단 구조는 같은 <strong>Matrix</strong> 페이지의 Multi-level 블록을
            참고합니다.
          </li>
        </ul>
      </StoryDocsSection>
    </StoryDocsPage>
  ),
};
