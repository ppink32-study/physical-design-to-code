import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import type { CSSProperties } from "react";
import { Fragment } from "react";

import { figmaNodeUrl } from "../../stories/story-figma-urls";
import { DropdownMenuItem } from "./dropdown-menu-item";
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

const DotIcon = () => <Icon src="/icon/Dot.svg" />;

function makeItems(count: number) {
  return Array.from({ length: count }, (_, i) => (
    <DropdownMenuItem key={i} leadingIcon={<DotIcon />} hasSubmenu>
      menu item
    </DropdownMenuItem>
  ));
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

const meta: Meta<typeof DropdownMenu> = {
  title: "Components/Dropdown/Dropdown Menu",
  component: DropdownMenu,
  parameters: {
    layout: "centered",
    figma: FIGMA_SECTION,
    docs: {
      description: {
        component:
          "Figma `Dropdown / Dropdown Menu` 컨테이너. 항목 수·화살표(비크) 위치·스크롤은 props 로 조절합니다.",
      },
    },
  },
  tags: ["autodocs"],
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
    minWidth: 180,
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
    docs: {
      description: {
        story: "Items 1…12 × Arrow 7종 매트릭스.",
      },
    },
  },
  render: () => (
    <StoryDocsMatrixPage
      title="Menu"
      description="항목 개수(1~12)와 arrow variant 7종 조합으로 메뉴 패널을 비교합니다."
      figmaNode="5355-154239"
    >
      <FigmaLinkCard
        nodeId="5355-154239"
        caption="Components / Dropdown · Menu — Variant 매트릭스 원본"
      />
      <div style={{ overflowX: "auto" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: `88px repeat(${ARROW_VARIANTS.length}, minmax(132px, 150px))`,
            gap: "10px 12px",
            alignItems: "start",
            minWidth: 1100,
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

          {Array.from({ length: 12 }, (_, idx) => {
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
                  <div key={`${n}-${a}`} style={{ transform: "scale(0.92)", transformOrigin: "top left" }}>
                    <DropdownMenu arrow={a} aria-label={`Items ${n} arrow ${a}`} minWidth={140}>
                      {makeItems(n)}
                    </DropdownMenu>
                  </div>
                ))}
              </Fragment>
            );
          })}
        </div>
      </div>
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
            제한하세요. 다단 구조는 <strong>Dropdown Menu/Multiple levels</strong> 스토리를
            참고합니다.
          </li>
        </ul>
      </StoryDocsSection>
    </StoryDocsPage>
  ),
};
