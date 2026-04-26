import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import type { CSSProperties, ReactNode } from "react";
import { figmaNodeUrl } from "../../stories/story-figma-urls";
import {
  DropdownMenuHeader,
  DropdownMenuItem,
  type DropdownMenuItemProps,
} from "./dropdown-menu-item";
import { FigmaLinkCard } from "@/stories/figma-link-card";
import {
  StoryDocsMatrixPage,
  StoryDocsPanel,
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

/* -----------------------------------------------------------------
 * Matrix — Button Matrix 와 동일 GUI 토큰·여백(StoryDocsPanel + 그리드)
 * --------------------------------------------------------------- */
const ROW_LABEL_WIDTH = 200;
const COL_WIDTH = 220;

const matrixScrollStyle: CSSProperties = {
  overflowX: "auto",
  paddingBottom: 4,
};

const columnHeaderStyle: CSSProperties = {
  fontSize: 11,
  fontWeight: 600,
  letterSpacing: 0.4,
  color: "var(--context-foreground-surface-on-surface-secondary)",
  padding: "10px 12px",
  whiteSpace: "nowrap",
  textAlign: "left",
};

const matrixRowLabelColumnPadding = "10px 24px 10px 16px";

const rowLabelStyle: CSSProperties = {
  fontSize: 11,
  color: "var(--context-foreground-surface-on-surface-hint)",
  padding: matrixRowLabelColumnPadding,
  whiteSpace: "nowrap",
  fontFamily: "ui-monospace, SFMono-Regular, monospace",
};

const cellWrapStyle: CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  gap: 8,
  padding: "10px 12px",
  width: COL_WIDTH,
  boxSizing: "border-box",
};

const meta: Meta<typeof DropdownMenuItem> = {
  title: "Components/Dropdown/Menu Item",
  component: DropdownMenuItem,
  parameters: {
    layout: "centered",
    figma: FIGMA_SECTION,
    docs: { disable: true },
  },
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
};
export default meta;

type Story = StoryObj<typeof DropdownMenuItem>;

export const Playground: Story = {
  decorators: [
    (Story) => (
      <StoryPlaygroundFrame>
        <div style={{ width: 220 }}>
          <Story />
        </div>
      </StoryPlaygroundFrame>
    ),
  ],
  args: {
    leadingIcon: <CopyIcon />,
    children: "menu item",
    hasSubmenu: true,
  },
};

const STATES = ["Default", "Hover", "Select", "Disable"] as const;
type StateKey = (typeof STATES)[number];

const TYPES = ["level 1", "level 2", "level 3", "Header", "Custom"] as const;
type TypeKey = (typeof TYPES)[number];

function renderCell(state: StateKey, type: TypeKey) {
  const staticTypes: TypeKey[] = ["Header", "Custom"];
  if (state !== "Default" && staticTypes.includes(type)) {
    return null;
  }

  const baseProps: Partial<DropdownMenuItemProps> = {
    leadingIcon: <CopyIcon />,
    children: "menu item",
    selected: state === "Select",
    disabled: state === "Disable",
  };

  let node: ReactNode = null;

  if (type === "Header") {
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
  },
  render: () => (
    <StoryDocsMatrixPage
      title="Menu Item"
      description="상태(Default·Hover·Select·Disable)와 유형(level·Header·Custom) 매트릭스입니다."
      figmaNode="13292-55986"
    >
      <FigmaLinkCard
        nodeId="13292-55986"
        caption="Components / Dropdown · Menu Item — State × Variant 매트릭스 원본"
      />
      <section>
        <StoryDocsPanel>
          <div style={matrixScrollStyle}>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: `${ROW_LABEL_WIDTH}px repeat(${TYPES.length}, ${COL_WIDTH}px)`,
                background: "var(--context-background-surface-bg-surface-base)",
                minWidth:
                  ROW_LABEL_WIDTH + TYPES.length * COL_WIDTH,
              }}
            >
              <div
                style={{
                  ...columnHeaderStyle,
                  padding: matrixRowLabelColumnPadding,
                }}
              >
                State · Type
              </div>
              {TYPES.map((t) => (
                <div key={t} style={columnHeaderStyle}>
                  {t}
                </div>
              ))}
            </div>

            {STATES.map((s) => (
              <div
                key={s}
                style={{
                  display: "grid",
                  gridTemplateColumns: `${ROW_LABEL_WIDTH}px repeat(${TYPES.length}, ${COL_WIDTH}px)`,
                  alignItems: "center",
                  minWidth: ROW_LABEL_WIDTH + TYPES.length * COL_WIDTH,
                  borderTop:
                    "1px solid var(--border-border-surface-border-surface-secondary)",
                }}
              >
                <div style={rowLabelStyle}>{s}</div>
                {TYPES.map((t) => (
                  <div key={`${s}-${t}`} style={cellWrapStyle}>
                    {renderCell(s, t)}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </StoryDocsPanel>
      </section>
    </StoryDocsMatrixPage>
  ),
};
