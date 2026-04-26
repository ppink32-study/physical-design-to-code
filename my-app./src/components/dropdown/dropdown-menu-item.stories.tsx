import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import type { CSSProperties, ReactNode } from "react";
import { Fragment } from "react";

import { figmaNodeUrl } from "../../stories/story-figma-urls";
import {
  DropdownMenuDivider,
  DropdownMenuHeader,
  DropdownMenuItem,
  type DropdownMenuItemProps,
} from "./dropdown-menu-item";
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
const CheckIcon = () => <Icon src="/icon/Check.svg" />;

const HOVER_STYLE: CSSProperties = {
  ["--dmi-bg" as string]: "var(--color-surface-secondary)",
  ["--dmi-icon" as string]: "var(--color-icon-surface-hover)",
};

function ForceHover({ children }: { children: ReactNode }) {
  return (
    <div style={{ display: "contents", ...HOVER_STYLE }} aria-hidden="false">
      {children}
    </div>
  );
}

const meta: Meta<typeof DropdownMenuItem> = {
  title: "Components/Dropdown/Menu Item",
  component: DropdownMenuItem,
  parameters: {
    layout: "centered",
    figma: FIGMA_SECTION,
    docs: {
      description: {
        component:
          "Figma `Dropdown / Menu item` 기반 atom. 일반 항목·Header·Divider·커스텀 슬롯을 지원합니다.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    level: { control: "inline-radio", options: [1, 2, 3] },
    selected: { control: "boolean" },
    disabled: { control: "boolean" },
    hasSubmenu: { control: "boolean" },
    children: { control: "text" },
    trailingHint: { control: "text" },
    leadingIcon: { control: false },
    trailingIcon: { control: false },
    onSelect: { action: "select" },
  },
  args: {
    level: 1,
    selected: false,
    disabled: false,
    hasSubmenu: true,
    children: "menu item",
  },
  decorators: [
    (Story) => (
      <div style={{ width: 220 }}>
        <Story />
      </div>
    ),
  ],
};
export default meta;

type Story = StoryObj<typeof DropdownMenuItem>;

export const Playground: Story = {
  decorators: [
    (Story) => (
      <StoryPlaygroundFrame>
        <Story />
      </StoryPlaygroundFrame>
    ),
  ],
  args: {
    leadingIcon: <DocumentIcon />,
    children: "menu item",
    hasSubmenu: true,
  },
};

const STATES = ["Default", "Hover", "Select", "Disable"] as const;
type StateKey = (typeof STATES)[number];

const TYPES = [
  "level 1",
  "level 2",
  "level 3",
  "Header",
  "Divider",
  "Custom",
] as const;
type TypeKey = (typeof TYPES)[number];

function renderCell(state: StateKey, type: TypeKey) {
  const staticTypes: TypeKey[] = ["Header", "Divider", "Custom"];
  if (state !== "Default" && staticTypes.includes(type)) {
    return null;
  }

  const baseProps: Partial<DropdownMenuItemProps> = {
    leadingIcon: <DocumentIcon />,
    children: "menu item",
    selected: state === "Select",
    disabled: state === "Disable",
  };

  let node: ReactNode = null;

  if (type === "Divider") {
    node = <DropdownMenuDivider />;
  } else if (type === "Header") {
    node = <DropdownMenuHeader>Dropdown header</DropdownMenuHeader>;
  } else if (type === "Custom") {
    node = (
      <div
        style={{
          padding: "var(--spacing-xs) var(--spacing-sm)",
          display: "flex",
          alignItems: "center",
        }}
      >
        <button
          type="button"
          style={{
            padding: "4px 12px",
            fontSize: 12,
            fontFamily: "var(--font-family-korean)",
            color: "var(--color-action-primary-default)",
            border: "1px solid var(--color-action-primary-default)",
            borderRadius: "var(--radius-sm)",
            background: "transparent",
            cursor: "default",
          }}
        >
          Setup
        </button>
      </div>
    );
  } else if (type === "level 1") {
    node = <DropdownMenuItem {...baseProps} level={1} hasSubmenu />;
  } else {
    const level = type === "level 2" ? 2 : 3;
    node = (
      <DropdownMenuItem
        {...baseProps}
        level={level}
        hasSubmenu={false}
        trailingIcon={<CheckIcon />}
      />
    );
  }

  if (
    state === "Hover" &&
    type !== "Divider" &&
    type !== "Header" &&
    type !== "Custom"
  ) {
    return <ForceHover>{node}</ForceHover>;
  }
  return node;
}

export const Matrix: Story = {
  name: "Matrix",
  parameters: {
    layout: "padded",
    docs: {
      description: {
        story:
          "상태 × 유형 매트릭스. Header·Divider·Custom 은 Default 행만 표기합니다.",
      },
    },
  },
  render: () => (
    <StoryDocsMatrixPage
      title="Menu Item"
      description="상태(Default·Hover·Select·Disable)와 유형(level·Header·Divider 등) 매트릭스입니다."
      figmaNode="13292-55986"
    >
      <FigmaLinkCard
        nodeId="13292-55986"
        caption="Components / Dropdown · Menu Item — State × Variant 매트릭스 원본"
      />
      <div
        style={{
          display: "grid",
          gridTemplateColumns: `120px repeat(${TYPES.length}, minmax(180px, 1fr))`,
          gap: 12,
          alignItems: "stretch",
        }}
      >
        <div />
        {TYPES.map((t) => (
          <div
            key={t}
            style={{
              fontSize: 12,
              color: "var(--color-on-surface-secondary)",
              paddingBottom: 4,
              borderBottom: "1px solid var(--color-border-surface)",
            }}
          >
            {t}
          </div>
        ))}

        {STATES.map((s) => (
          <Fragment key={s}>
            <div
              style={{
                fontSize: 12,
                color: "var(--color-on-surface-secondary)",
                alignSelf: "center",
              }}
            >
              {s}
            </div>
            {TYPES.map((t) => (
              <div
                key={`${s}-${t}`}
                style={{
                  padding: 8,
                  background: "var(--color-surface-base)",
                  border: "1px solid var(--color-border-surface)",
                  borderRadius: 6,
                  display: "flex",
                  alignItems: "center",
                  minHeight: 44,
                }}
              >
                {renderCell(s, t)}
              </div>
            ))}
          </Fragment>
        ))}
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
    <StoryDocsPage title="Menu Item" description="드롭다운 메뉴 항목 atom 사용 가이드입니다.">
      <StoryDocsSection title="사용 가이드">
        <ul style={{ margin: 0, paddingLeft: 20, fontSize: 14, lineHeight: 1.65 }}>
          <li>
            <strong>level 1</strong>은 하위 메뉴가 있을 때{" "}
            <StoryDocsInlineCode>hasSubmenu</StoryDocsInlineCode>로 우측 chevron 을 씁니다.
          </li>
          <li>
            <strong>level 2·3</strong>은 들여쓰기만 다르고, 선택 표시가 필요하면{" "}
            <StoryDocsInlineCode>trailingIcon</StoryDocsInlineCode>에 체크 등을 넣습니다.
          </li>
          <li>
            <StoryDocsInlineCode>DropdownMenuHeader</StoryDocsInlineCode>는 비인터랙티브 구역
            제목, <StoryDocsInlineCode>DropdownMenuDivider</StoryDocsInlineCode>는 그룹 구분에
            사용합니다.
          </li>
          <li>
            Matrix 의 Hover 행은 CSS 변수로만 재현한 정적 미리보기이며, 실제 인터랙션은 포인터
            hover 와 동일한 토큰을 따릅니다.
          </li>
        </ul>
      </StoryDocsSection>
    </StoryDocsPage>
  ),
};
