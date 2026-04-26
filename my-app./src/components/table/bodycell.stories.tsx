/**
 * BodyCell stories — Data Grid/Body (Figma node 4456:290858)
 *
 * Phase 3 : blank / text-left / text-left-icon / text-center / text-right
 * Phase 4 : checkbox / radio / icon / link / button / button-icon-only / like / switch
 *
 *   - 타입별 기본 (Phase 3 + Phase 4)
 *   - State Matrix (Enabled × Hovered × Selected × Focus Off/On)
 *   - Full Matrix (Phase 3 / Phase 4 각각)
 *   - Light/Dark compare
 *   - Row Preview (여러 BodyCell 을 나란히 놓아 실제 테이블 느낌 확인)
 */

import { Fragment, useState } from "react";
import type { CSSProperties } from "react";
import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { StoryPlaygroundFrame } from "@/stories/story-docs-shell";
import { Badge } from "../badge/badge";
import { Button } from "../button/button";
import { BodyCell } from "./bodycell";

/* ---------------- Icon helpers (mask-image + currentColor) --------------- */
const BtnIcon = ({ src, size = 16 }: { src: string; size?: number }) => {
  const style: CSSProperties = {
    display: "inline-block",
    width: size,
    height: size,
    background: "currentColor",
    WebkitMaskImage: `url(${src})`,
    maskImage: `url(${src})`,
    WebkitMaskRepeat: "no-repeat",
    maskRepeat: "no-repeat",
    WebkitMaskPosition: "center",
    maskPosition: "center",
    WebkitMaskSize: "contain",
    maskSize: "contain",
    flexShrink: 0,
  };
  return <span aria-hidden="true" style={style} />;
};
const SearchIcon = () => <BtnIcon src="/icon/Search.svg" />;

const meta: Meta<typeof BodyCell> = {
  title: "Components/Table/BodyCell",
  component: BodyCell,
  parameters: {
    layout: "centered",
  },
  argTypes: {
    type: {
      control: "select",
      options: [
        "blank",
        "text-left",
        "text-left-icon",
        "text-center",
        "text-right",
        "checkbox",
        "radio",
        "icon",
        "link",
        "button",
        "button-icon-only",
        "like",
        "switch",
        "text-field",
        "search",
        "select",
        "date-picker",
        "state",
        "badge",
        "file",
        "tree",
        "multi-normal",
        "multi-sub-text",
        "video",
      ],
    },
    state: {
      control: "inline-radio",
      options: ["enabled", "hovered", "selected"],
    },
    focus: { control: "boolean" },
    children: { control: "text" },
    icon: { control: false },
    width: { control: "text" },
  },
  args: {
    type: "text-left",
    state: "enabled",
    focus: false,
    children: "Left",
  },
};
export default meta;

type Story = StoryObj<typeof BodyCell>;


export const Playground: Story = {
  decorators: [
    (Story) => (
      <StoryPlaygroundFrame>
        <Story />
      </StoryPlaygroundFrame>
    ),
  ],
  args: {
    type: "text-left",
    state: "enabled",
    focus: false,
    children: "Left",
  },
};

/* =============================================================
 * 타입별 기본
 * =========================================================== */
export const Blank: Story = {
  args: { type: "blank", children: undefined },
};

export const TextLeft: Story = {
  args: { type: "text-left", children: "Left" },
};

export const TextLeftWithIcon: Story = {
  args: { type: "text-left-icon", children: "Left" },
};

export const TextCenter: Story = {
  args: { type: "text-center", children: "Center" },
};

export const TextRight: Story = {
  args: { type: "text-right", children: "1,000" },
};

/* =============================================================
 * State Matrix (Focus Off)
 * =========================================================== */
export const StatesFocusOff: Story = {
  render: () => (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(3, auto)", gap: 12 }}>
      <BodyCell type="text-left" state="enabled">Enabled</BodyCell>
      <BodyCell type="text-left" state="hovered">Hovered</BodyCell>
      <BodyCell type="text-left" state="selected">Selected</BodyCell>
    </div>
  ),
};

export const StatesFocusOn: Story = {
  render: () => (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(3, auto)", gap: 12 }}>
      <BodyCell type="text-left" state="enabled" focus>Enabled</BodyCell>
      <BodyCell type="text-left" state="hovered" focus>Hovered</BodyCell>
      <BodyCell type="text-left" state="selected" focus>Selected</BodyCell>
    </div>
  ),
};

/* =============================================================
 * Full Matrix (Phase 3)
 *   Columns : Enabled / Hovered / Selected, Focus Off / On
 *   Rows    : 5 types
 * =========================================================== */
const PHASE3_TYPES = [
  { type: "blank" as const, label: "Blank", content: undefined },
  { type: "text-left" as const, label: "Text-Left", content: "Left" },
  { type: "text-left-icon" as const, label: "Text-Left w/Icon", content: "Left" },
  { type: "text-center" as const, label: "Text-Center", content: "Center" },
  { type: "text-right" as const, label: "Text-Right", content: "1,000" },
];

const STATE_COLS: Array<{ state: "enabled" | "hovered" | "selected"; focus: boolean; label: string }> = [
  { state: "enabled", focus: false, label: "Enabled / Off" },
  { state: "enabled", focus: true, label: "Enabled / On" },
  { state: "hovered", focus: false, label: "Hovered / Off" },
  { state: "selected", focus: false, label: "Selected / Off" },
  { state: "selected", focus: true, label: "Selected / On" },
];

export const FullMatrix: Story = {
  parameters: { layout: "fullscreen" },
  render: () => (
    <div style={{ padding: 24 }}>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: `140px repeat(${STATE_COLS.length}, auto)`,
          gap: 16,
          alignItems: "center",
          fontFamily: "var(--font-family-korean)",
          fontSize: 12,
          color: "var(--context-foreground-surface-on-surface-hint)",
        }}
      >
        {/* header row */}
        <div />
        {STATE_COLS.map((col) => (
          <div key={col.label} style={{ textAlign: "left" }}>{col.label}</div>
        ))}

        {/* rows */}
        {PHASE3_TYPES.map((row) => (
          <Fragment key={row.type}>
            <div style={{ fontWeight: 600 }}>{row.label}</div>
            {STATE_COLS.map((col) => (
              <BodyCell
                key={`${row.type}-${col.label}`}
                type={row.type}
                state={col.state}
                focus={col.focus}
              >
                {row.content}
              </BodyCell>
            ))}
          </Fragment>
        ))}
      </div>
    </div>
  ),
};

/* =============================================================
 * Phase 4 — 타입별 기본
 * =========================================================== */
export const CheckboxCell: Story = {
  args: { type: "checkbox", children: undefined },
};

export const RadioCell: Story = {
  args: { type: "radio", children: undefined },
};

export const IconCell: Story = {
  args: { type: "icon", children: undefined },
};

export const LinkCell: Story = {
  args: { type: "link", children: "Link Text", href: "#link" },
};

export const ButtonCell: Story = {
  render: (args) => (
    <BodyCell {...args} type="button">
      <Button variant="secondary-outline" size="small">Button</Button>
      <Button variant="secondary-outline" size="small">Button</Button>
    </BodyCell>
  ),
};

export const ButtonIconOnlyCell: Story = {
  render: (args) => (
    <BodyCell {...args} type="button-icon-only">
      <Button variant="secondary-outline" size="small" iconOnly leftIcon={<SearchIcon />} aria-label="search" />
      <Button variant="secondary-outline" size="small" iconOnly leftIcon={<SearchIcon />} aria-label="search" />
    </BodyCell>
  ),
};

export const LikeCell: Story = {
  render: () => {
    function Demo() {
      const [liked, setLiked] = useState(false);
      return (
        <BodyCell type="like" liked={liked} onLikeToggle={(next) => setLiked(next)} />
      );
    }
    return <Demo />;
  },
};

export const SwitchCell: Story = {
  render: () => {
    function Demo() {
      const [on, setOn] = useState(false);
      return (
        <BodyCell
          type="switch"
          checked={on}
          onCheckedChange={(next) => setOn(next)}
        />
      );
    }
    return <Demo />;
  },
};

/* =============================================================
 * Phase 4 — Full Matrix (8 types × state × focus)
 * =========================================================== */
const PHASE4_TYPES: Array<{
  type: NonNullable<Parameters<typeof BodyCell>[0]["type"]>;
  label: string;
  render: (s: {
    state: "enabled" | "hovered" | "selected";
    focus: boolean;
    rowKey: string;
  }) => React.ReactNode;
}> = [
  {
    type: "checkbox",
    label: "Checkbox",
    render: ({ state, focus, rowKey }) => (
      <BodyCell key={rowKey} type="checkbox" state={state} focus={focus} defaultChecked={state === "selected"} />
    ),
  },
  {
    type: "radio",
    label: "Radio",
    render: ({ state, focus, rowKey }) => (
      <BodyCell key={rowKey} type="radio" state={state} focus={focus} defaultChecked={state === "selected"} />
    ),
  },
  {
    type: "icon",
    label: "Icon",
    render: ({ state, focus, rowKey }) => (
      <BodyCell key={rowKey} type="icon" state={state} focus={focus} />
    ),
  },
  {
    type: "link",
    label: "Link",
    render: ({ state, focus, rowKey }) => (
      <BodyCell key={rowKey} type="link" state={state} focus={focus} href="#link">
        Link Text
      </BodyCell>
    ),
  },
  {
    type: "button",
    label: "Button",
    render: ({ state, focus, rowKey }) => (
      <BodyCell key={rowKey} type="button" state={state} focus={focus}>
        <Button variant="secondary-outline" size="small">Button</Button>
        <Button variant="secondary-outline" size="small">Button</Button>
      </BodyCell>
    ),
  },
  {
    type: "button-icon-only",
    label: "Button-icon",
    render: ({ state, focus, rowKey }) => (
      <BodyCell key={rowKey} type="button-icon-only" state={state} focus={focus}>
        <Button variant="secondary-outline" size="small" iconOnly leftIcon={<SearchIcon />} aria-label="search" />
        <Button variant="secondary-outline" size="small" iconOnly leftIcon={<SearchIcon />} aria-label="search" />
      </BodyCell>
    ),
  },
  {
    type: "like",
    label: "Like",
    render: ({ state, focus, rowKey }) => (
      <BodyCell key={rowKey} type="like" state={state} focus={focus} liked={state === "selected"} />
    ),
  },
  {
    type: "switch",
    label: "Switch",
    render: ({ state, focus, rowKey }) => (
      <BodyCell key={rowKey} type="switch" state={state} focus={focus} defaultChecked={state === "selected"} />
    ),
  },
];

export const Phase4FullMatrix: Story = {
  name: "Phase4 · FullMatrix",
  parameters: { layout: "fullscreen" },
  render: () => (
    <div style={{ padding: 24 }}>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: `140px repeat(${STATE_COLS.length}, auto)`,
          gap: 16,
          alignItems: "center",
          fontFamily: "var(--font-family-korean)",
          fontSize: 12,
          color: "var(--context-foreground-surface-on-surface-hint)",
        }}
      >
        <div />
        {STATE_COLS.map((col) => (
          <div key={col.label} style={{ textAlign: "left" }}>{col.label}</div>
        ))}

        {PHASE4_TYPES.map((row) => (
          <Fragment key={row.type}>
            <div style={{ fontWeight: 600 }}>{row.label}</div>
            {STATE_COLS.map((col) =>
              row.render({
                state: col.state,
                focus: col.focus,
                rowKey: `${row.type}-${col.label}`,
              }),
            )}
          </Fragment>
        ))}
      </div>
    </div>
  ),
};

/* =============================================================
 * Phase 5 — 타입별 기본
 * =========================================================== */
export const TextFieldCell: Story = {
  args: { type: "text-field", placeholder: "Placeholder", children: undefined },
};

export const SearchCell: Story = {
  args: { type: "search", placeholder: "Placeholder", children: undefined },
};

export const SelectCell: Story = {
  args: { type: "select", children: "Text" },
};

export const DatePickerCell: Story = {
  args: { type: "date-picker", children: undefined },
};

export const StateCell: Story = {
  args: { type: "state", children: "Badge", stateTone: "blue" },
};

export const BadgeCell: Story = {
  render: (args) => (
    <BodyCell {...args} type="badge">
      <Badge variant="status" color="purple" shape="round" size="sm">Badge</Badge>
      <Badge variant="status" color="purple" shape="round" size="sm">Badge</Badge>
    </BodyCell>
  ),
};

export const FileCell: Story = {
  args: { type: "file", children: "File Name.pdf" },
};

export const TreeCell: Story = {
  args: { type: "tree", children: "1depth Name", depth: 0 },
};

export const TreeCellDeep: Story = {
  args: { type: "tree", children: "3depth Name", depth: 2, treeExpanded: true },
};

export const MultiNormalCell: Story = {
  args: { type: "multi-normal", children: "Multiple line", subText: "Multiple line" },
};

export const MultiSubTextCell: Story = {
  render: (args) => (
    <BodyCell
      {...args}
      type="multi-sub-text"
      subText="Sub Text"
      badge={<Badge variant="solid" color="primary" shape="round" size="sm">99</Badge>}
    >
      Multiple line Title 최대 한줄
    </BodyCell>
  ),
};

export const VideoCell: Story = {
  args: { type: "video", children: undefined },
};

/* =============================================================
 * Phase 5 — Full Matrix (11 types × state × focus)
 * =========================================================== */
const PHASE5_TYPES: Array<{
  type: NonNullable<Parameters<typeof BodyCell>[0]["type"]>;
  label: string;
  render: (s: {
    state: "enabled" | "hovered" | "selected";
    focus: boolean;
    rowKey: string;
  }) => React.ReactNode;
}> = [
  {
    type: "text-field",
    label: "Text Field",
    render: ({ state, focus, rowKey }) => (
      <BodyCell
        key={rowKey}
        type="text-field"
        state={state}
        focus={focus}
        placeholder="Placeholder"
        value={state === "selected" ? "Entered text" : undefined}
      />
    ),
  },
  {
    type: "search",
    label: "Search",
    render: ({ state, focus, rowKey }) => (
      <BodyCell
        key={rowKey}
        type="search"
        state={state}
        focus={focus}
        placeholder="Placeholder"
        value={state === "selected" ? "keyword" : undefined}
      />
    ),
  },
  {
    type: "select",
    label: "Select",
    render: ({ state, focus, rowKey }) => (
      <BodyCell key={rowKey} type="select" state={state} focus={focus} expanded={focus}>
        Text
      </BodyCell>
    ),
  },
  {
    type: "date-picker",
    label: "Date picker",
    render: ({ state, focus, rowKey }) => (
      <BodyCell
        key={rowKey}
        type="date-picker"
        state={state}
        focus={focus}
        value={state === "selected" ? "2025-01-01" : undefined}
      />
    ),
  },
  {
    type: "state",
    label: "State",
    render: ({ state, focus, rowKey }) => (
      <BodyCell key={rowKey} type="state" state={state} focus={focus} stateTone="blue">
        Badge
      </BodyCell>
    ),
  },
  {
    type: "badge",
    label: "Badge",
    render: ({ state, focus, rowKey }) => (
      <BodyCell key={rowKey} type="badge" state={state} focus={focus}>
        <Badge variant="status" color="purple" shape="round" size="sm">Badge</Badge>
        <Badge variant="status" color="purple" shape="round" size="sm">Badge</Badge>
      </BodyCell>
    ),
  },
  {
    type: "file",
    label: "File",
    render: ({ state, focus, rowKey }) => (
      <BodyCell key={rowKey} type="file" state={state} focus={focus}>
        File Name.pdf
      </BodyCell>
    ),
  },
  {
    type: "tree",
    label: "Tree",
    render: ({ state, focus, rowKey }) => (
      <BodyCell key={rowKey} type="tree" state={state} focus={focus} depth={0}>
        1depth Name
      </BodyCell>
    ),
  },
  {
    type: "multi-normal",
    label: "Multi-Normal",
    render: ({ state, focus, rowKey }) => (
      <BodyCell
        key={rowKey}
        type="multi-normal"
        state={state}
        focus={focus}
        subText="Multiple line"
      >
        Multiple line
      </BodyCell>
    ),
  },
  {
    type: "multi-sub-text",
    label: "Multi-Sub Text",
    render: ({ state, focus, rowKey }) => (
      <BodyCell
        key={rowKey}
        type="multi-sub-text"
        state={state}
        focus={focus}
        subText="Sub Text"
        badge={<Badge variant="solid" color="primary" shape="round" size="sm">99</Badge>}
      >
        Multiple line Title 최대 한줄
      </BodyCell>
    ),
  },
  {
    type: "video",
    label: "Video",
    render: ({ state, focus, rowKey }) => (
      <BodyCell key={rowKey} type="video" state={state} focus={focus} />
    ),
  },
];

export const Phase5FullMatrix: Story = {
  name: "Phase5 · FullMatrix",
  parameters: { layout: "fullscreen" },
  render: () => (
    <div style={{ padding: 24 }}>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: `140px repeat(${STATE_COLS.length}, auto)`,
          gap: 16,
          alignItems: "center",
          fontFamily: "var(--font-family-korean)",
          fontSize: 12,
          color: "var(--context-foreground-surface-on-surface-hint)",
        }}
      >
        <div />
        {STATE_COLS.map((col) => (
          <div key={col.label} style={{ textAlign: "left" }}>{col.label}</div>
        ))}

        {PHASE5_TYPES.map((row) => (
          <Fragment key={row.type}>
            <div style={{ fontWeight: 600 }}>{row.label}</div>
            {STATE_COLS.map((col) =>
              row.render({
                state: col.state,
                focus: col.focus,
                rowKey: `${row.type}-${col.label}`,
              }),
            )}
          </Fragment>
        ))}
      </div>
    </div>
  ),
};

/* =============================================================
 * Row Preview — 여러 BodyCell 을 하나의 row 로 조립
 * =========================================================== */
export const RowPreview: Story = {
  parameters: { layout: "fullscreen" },
  render: () => (
    <div style={{ padding: 24, display: "flex", flexDirection: "column", gap: 24 }}>
      <div>
        <div style={{ fontSize: 12, marginBottom: 8, color: "#787a88" }}>Row — Enabled</div>
        <div style={{ display: "inline-flex" }}>
          <BodyCell type="blank" />
          <BodyCell type="text-left">Name</BodyCell>
          <BodyCell type="text-left-icon">Doc.pdf</BodyCell>
          <BodyCell type="text-center">Active</BodyCell>
          <BodyCell type="text-right" lastCol>1,234</BodyCell>
        </div>
      </div>

      <div>
        <div style={{ fontSize: 12, marginBottom: 8, color: "#787a88" }}>Row — Hovered</div>
        <div style={{ display: "inline-flex" }}>
          <BodyCell type="blank" state="hovered" />
          <BodyCell type="text-left" state="hovered">Name</BodyCell>
          <BodyCell type="text-left-icon" state="hovered">Doc.pdf</BodyCell>
          <BodyCell type="text-center" state="hovered">Active</BodyCell>
          <BodyCell type="text-right" state="hovered" lastCol>1,234</BodyCell>
        </div>
      </div>

      <div>
        <div style={{ fontSize: 12, marginBottom: 8, color: "#787a88" }}>Row — Selected (focused cell: Name)</div>
        <div style={{ display: "inline-flex" }}>
          <BodyCell type="blank" state="selected" />
          <BodyCell type="text-left" state="selected" focus>Name</BodyCell>
          <BodyCell type="text-left-icon" state="selected">Doc.pdf</BodyCell>
          <BodyCell type="text-center" state="selected">Active</BodyCell>
          <BodyCell type="text-right" state="selected" lastCol>1,234</BodyCell>
        </div>
      </div>
    </div>
  ),
};

/* =============================================================
 * Light / Dark compare
 * =========================================================== */
export const LightDarkCompare: Story = {
  parameters: { layout: "fullscreen" },
  render: () => (
    <div style={{ display: "flex", gap: 24, padding: 24, flexWrap: "wrap" }}>
      <div
        data-theme="light"
        style={{
          padding: 16,
          background: "var(--context-background-surface-bg-surface-quarernary)",
          borderRadius: 8,
        }}
      >
        <div style={{ marginBottom: 12, fontSize: 12 }}>Light</div>
        <div style={{ display: "inline-flex", flexDirection: "column" }}>
          <div style={{ display: "inline-flex" }}>
            <BodyCell type="blank" />
            <BodyCell type="text-left">Left</BodyCell>
            <BodyCell type="text-left-icon">Left</BodyCell>
            <BodyCell type="text-center">Center</BodyCell>
            <BodyCell type="text-right" lastCol>1,000</BodyCell>
          </div>
          <div style={{ display: "inline-flex" }}>
            <BodyCell type="blank" state="selected" />
            <BodyCell type="text-left" state="selected" focus>Left</BodyCell>
            <BodyCell type="text-left-icon" state="selected">Left</BodyCell>
            <BodyCell type="text-center" state="selected">Center</BodyCell>
            <BodyCell type="text-right" state="selected" lastCol>1,000</BodyCell>
          </div>
        </div>
      </div>

      <div
        data-theme="dark"
        style={{
          padding: 16,
          background: "var(--context-background-surface-bg-surface-quarernary)",
          borderRadius: 8,
        }}
      >
        <div style={{ marginBottom: 12, fontSize: 12, color: "#d7d8dc" }}>Dark</div>
        <div style={{ display: "inline-flex", flexDirection: "column" }}>
          <div style={{ display: "inline-flex" }}>
            <BodyCell type="blank" />
            <BodyCell type="text-left">Left</BodyCell>
            <BodyCell type="text-left-icon">Left</BodyCell>
            <BodyCell type="text-center">Center</BodyCell>
            <BodyCell type="text-right" lastCol>1,000</BodyCell>
          </div>
          <div style={{ display: "inline-flex" }}>
            <BodyCell type="blank" state="selected" />
            <BodyCell type="text-left" state="selected" focus>Left</BodyCell>
            <BodyCell type="text-left-icon" state="selected">Left</BodyCell>
            <BodyCell type="text-center" state="selected">Center</BodyCell>
            <BodyCell type="text-right" state="selected" lastCol>1,000</BodyCell>
          </div>
        </div>
      </div>
    </div>
  ),
};
