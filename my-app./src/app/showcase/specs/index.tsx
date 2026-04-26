"use client";

/**
 * /showcase 의 컴포넌트별 매트릭스 정의.
 * 각 export 는 단일 Section 을 반환하는 client 컴포넌트.
 *
 * 새로운 컴포넌트가 추가되면 (1) 이 파일에 SectionXxx 함수를 만들고
 * (2) page.tsx 의 SECTIONS 배열에 등록한다.
 */

import { Fragment } from "react";

import { Badge } from "@/components/badge/badge";
import { Button } from "@/components/button/button";
import { Checkbox, CheckboxGroup } from "@/components/checkbox/checkbox";
import { ChipButton } from "@/components/chips/chip-button/chip-button";
import { InputChip } from "@/components/chips/input-chip/input-chip";
import { SearchChip } from "@/components/chips/search-chip/search-chip";
import { SelectChip } from "@/components/chips/select-chip/select-chip";
import { SelectableChip } from "@/components/chips/selectable-chip/selectable-chip";
import { DatePicker } from "@/components/datepicker/datepicker";
import { Divider } from "@/components/divider/divider";
import { Empty } from "@/components/empty/empty";
import { Form, FormField } from "@/components/form/form";
import { Input } from "@/components/Input/input";
import { InlineMessage } from "@/components/Input/inlinemessage";
import { TextArea } from "@/components/Input/textarea";
import { Label } from "@/components/label/label";
import { Loader } from "@/components/loader/loader";
import { Gnb, GnbIconButton, GnbItem } from "@/components/nav/gnb";
import { Pagination } from "@/components/pagination/pagination";
import { PlaybookControlBar } from "@/components/playbookcontrolbar/playbookcontrolbar";
import { Radio, RadioGroup } from "@/components/radio/radio";
import { Scrollbar, ScrollArea } from "@/components/scroll/scroll";
import { Select } from "@/components/select/select";
import { SelectItem } from "@/components/select/selectitem";
import { SelectList } from "@/components/select/selectlist";
import { Tab, TabList } from "@/components/tab/tab";
import { BodyCell } from "@/components/table/bodycell";
import { GridHeader } from "@/components/table/gridheader";
import { ContentsTitleMain } from "@/components/title/contentstitlemain";
import { ContentsTitleSub } from "@/components/title/contentstitlesub";
import { ContentsTitleSub2D } from "@/components/title/contentstitlesub2d";
import { PageTitle } from "@/components/title/pagetitle";
import { Toggle } from "@/components/toggle/toggle";
import { Tooltip, HelpIconWithTooltip } from "@/components/tooltip/tooltip";

import { Matrix, Stack } from "../_components/Matrix";
import { Section, SubSection } from "../_components/Section";
import { Icons } from "./icons";

/* ────────────────────────────────────────────────────────────── */
/* Button                                                          */
/* ────────────────────────────────────────────────────────────── */

const BUTTON_VARIANTS = [
  "primary-solid",
  "primary-outline",
  "primary-ghost",
  "secondary-solid",
  "secondary-outline",
  "secondary-outline-white-invert",
  "secondary-outline-dark-invert",
  "secondary-ghost",
  "gray",
] as const;

const BUTTON_SIZES = ["small", "medium", "large", "xlarge"] as const;

export function ButtonSection() {
  return (
    <Section
      id="button"
      name="Button"
      category="Basics"
      detailSlug="button"
      description="9개 variant × 4개 size × 2개 shape × 4개 state. icon-only 모드 자동 감지."
    >
      <SubSection title="Variant × Size">
        <Matrix
          rowAxis="variant"
          colAxis="size"
          rows={BUTTON_VARIANTS.map((v) => ({ label: v, value: v }))}
          cols={BUTTON_SIZES.map((s) => ({ label: s, value: s }))}
          render={(v, s) => (
            <Button variant={v} size={s}>
              Label
            </Button>
          )}
        />
      </SubSection>

      <SubSection title="Shape (square / round)">
        <Matrix
          rowAxis="variant"
          colAxis="shape"
          rows={["primary-solid", "secondary-outline", "gray"].map((v) => ({
            label: v,
            value: v as (typeof BUTTON_VARIANTS)[number],
          }))}
          cols={[
            { label: "square", value: "square" as const },
            { label: "round", value: "round" as const },
          ]}
          render={(v, sh) => (
            <Button variant={v} shape={sh}>
              Label
            </Button>
          )}
        />
      </SubSection>

      <SubSection title="State (default / hover / disable)">
        <Matrix
          rowAxis="variant"
          colAxis="state"
          rows={[
            "primary-solid",
            "primary-outline",
            "secondary-solid",
            "secondary-ghost",
          ].map((v) => ({ label: v, value: v as (typeof BUTTON_VARIANTS)[number] }))}
          cols={[
            { label: "default", value: "default" as const },
            { label: "hover", value: "hover" as const },
            { label: "disable", value: "disable" as const },
          ]}
          render={(v, st) => (
            <Button variant={v} forceState={st}>
              Label
            </Button>
          )}
        />
      </SubSection>

      <SubSection title="Icon (left / right / icon-only)">
        <Stack
          axis="icon-mode"
          items={[
            {
              label: "leftIcon",
              node: (
                <Button variant="primary-solid" leftIcon={Icons.plus}>
                  Add
                </Button>
              ),
            },
            {
              label: "rightIcon",
              node: (
                <Button variant="secondary-outline" rightIcon={Icons.arrowRight}>
                  Next
                </Button>
              ),
            },
            {
              label: "iconOnly",
              node: (
                <Button
                  variant="primary-solid"
                  leftIcon={Icons.plus}
                  aria-label="Add"
                />
              ),
            },
            {
              label: "iconOnly · ghost",
              node: (
                <Button
                  variant="secondary-ghost"
                  leftIcon={Icons.search}
                  aria-label="Search"
                />
              ),
            },
          ]}
        />
      </SubSection>
    </Section>
  );
}

/* ────────────────────────────────────────────────────────────── */
/* Badge                                                           */
/* ────────────────────────────────────────────────────────────── */

const SOLID_COLORS = [
  "primary",
  "purple",
  "red",
  "green",
  "orange",
  "pink",
  "blue",
  "cyan",
  "gray",
  "opacity",
] as const;

const LINE_COLORS = [
  "gray",
  "purple",
  "cyan",
  "green",
  "red",
  "orange",
  "pink",
  "blue",
  "teal",
  "magenta",
  "gold",
] as const;

const STATUS_COLORS = [
  "cyan",
  "blue",
  "yellow",
  "pink",
  "purple",
  "green",
  "red",
  "gray",
  "orange",
] as const;

export function BadgeSection() {
  return (
    <Section
      id="badge"
      name="Badge"
      category="Basics"
      detailSlug="badge"
      description="solid · line · status · notice 4개 variant. variant 별 color 팔레트가 다릅니다."
    >
      <SubSection title="Solid · color × size">
        <Matrix
          rowAxis="color"
          colAxis="size"
          rows={SOLID_COLORS.map((c) => ({ label: c, value: c }))}
          cols={[
            { label: "xs", value: "xs" as const },
            { label: "sm", value: "sm" as const },
            { label: "lg", value: "lg" as const },
          ]}
          render={(c, s) => (
            <Badge variant="solid" color={c} size={s}>
              Label
            </Badge>
          )}
        />
      </SubSection>

      <SubSection title="Solid · shape (square / round)">
        <Stack
          axis="shape"
          items={[
            { label: "square", node: <Badge variant="solid" shape="square">Label</Badge> },
            { label: "round", node: <Badge variant="solid" shape="round">Label</Badge> },
            {
              label: "with icon",
              node: (
                <Badge variant="solid" shape="round" icon={Icons.check}>
                  Done
                </Badge>
              ),
            },
          ]}
        />
      </SubSection>

      <SubSection title="Line · color × size">
        <Matrix
          rowAxis="color"
          colAxis="size"
          rows={LINE_COLORS.map((c) => ({ label: c, value: c }))}
          cols={[
            { label: "sm", value: "sm" as const },
            { label: "lg", value: "lg" as const },
          ]}
          render={(c, s) => (
            <Badge variant="line" color={c} size={s}>
              Label
            </Badge>
          )}
        />
      </SubSection>

      <SubSection title="Status · color × size">
        <Matrix
          rowAxis="color"
          colAxis="size"
          rows={STATUS_COLORS.map((c) => ({ label: c, value: c }))}
          cols={[
            { label: "sm", value: "sm" as const },
            { label: "lg", value: "lg" as const },
          ]}
          render={(c, s) => (
            <Badge variant="status" color={c} size={s}>
              Status
            </Badge>
          )}
        />
      </SubSection>

      <SubSection title="Status · with count / dot off">
        <Stack
          axis="variation"
          items={[
            {
              label: "default",
              node: (
                <Badge variant="status" color="green">
                  Active
                </Badge>
              ),
            },
            {
              label: "with count",
              node: (
                <Badge variant="status" color="blue" count={12}>
                  Pending
                </Badge>
              ),
            },
            {
              label: "dot=false",
              node: (
                <Badge variant="status" color="gray" dot={false}>
                  Idle
                </Badge>
              ),
            },
          ]}
        />
      </SubSection>

      <SubSection title="Notice (count badge)">
        <Stack
          axis="color × count"
          items={[
            { label: "red · 1", node: <Badge variant="notice" color="red" count={1} /> },
            { label: "red · 9", node: <Badge variant="notice" color="red" count={9} /> },
            { label: "red · 99→9", node: <Badge variant="notice" color="red" count={99} /> },
            { label: "purple · 5", node: <Badge variant="notice" color="purple" count={5} /> },
          ]}
        />
      </SubSection>
    </Section>
  );
}

/* ────────────────────────────────────────────────────────────── */
/* Divider                                                         */
/* ────────────────────────────────────────────────────────────── */

export function DividerSection() {
  return (
    <Section
      id="divider"
      name="Divider"
      category="Basics"
      detailSlug="divider"
      description="orientation: horizontal · vertical. horizontal 은 title 슬롯 지원."
    >
      <SubSection title="Horizontal">
        <Stack
          axis="variation"
          direction="column"
          items={[
            { label: "no title", node: <Divider /> },
            { label: "with title", node: <Divider title="Section Title" /> },
            { label: "long title", node: <Divider title="기본 정보 · Basic Information" /> },
          ]}
        />
      </SubSection>

      <SubSection title="Vertical">
        <Stack
          axis="length"
          items={[
            {
              label: "default (16)",
              node: (
                <div style={{ display: "inline-flex", alignItems: "center", gap: 12 }}>
                  <span>Left</span>
                  <Divider orientation="vertical" />
                  <span>Right</span>
                </div>
              ),
            },
            {
              label: "length=24",
              node: (
                <div style={{ display: "inline-flex", alignItems: "center", gap: 12 }}>
                  <span>A</span>
                  <Divider orientation="vertical" length={24} />
                  <span>B</span>
                </div>
              ),
            },
          ]}
        />
      </SubSection>
    </Section>
  );
}

/* ────────────────────────────────────────────────────────────── */
/* Label                                                           */
/* ────────────────────────────────────────────────────────────── */

export function LabelSection() {
  return (
    <Section
      id="label"
      name="Label"
      category="Basics"
      detailSlug="label"
      description="size: medium · small / type: normal · outline-button · ghost-button."
    >
      <SubSection title="Type × Size">
        <Matrix
          rowAxis="type"
          colAxis="size"
          rows={[
            { label: "normal", value: "normal" as const },
            { label: "outline-button", value: "outline-button" as const },
            { label: "ghost-button", value: "ghost-button" as const },
          ]}
          cols={[
            { label: "medium", value: "medium" as const },
            { label: "small", value: "small" as const },
          ]}
          render={(t, s) => (
            <Label type={t} size={s}>
              Label
            </Label>
          )}
        />
      </SubSection>

      <SubSection title="Mandatory / Info icon">
        <Stack
          axis="variation"
          items={[
            { label: "mandatory", node: <Label mandatory>Required</Label> },
            { label: "infoIcon", node: <Label infoIcon>With info</Label> },
            { label: "both", node: <Label mandatory infoIcon>Both</Label> },
          ]}
        />
      </SubSection>
    </Section>
  );
}

/* ────────────────────────────────────────────────────────────── */
/* Title (Page · Contents)                                         */
/* ────────────────────────────────────────────────────────────── */

export function TitleSection() {
  return (
    <Section
      id="title"
      name="Title"
      category="Layout"
      detailSlug="title"
      description="PageTitle (1d / 2d) + ContentsTitle 3종 (Main · Sub · Sub2D)."
    >
      <SubSection title="PageTitle 1d / 2d">
        <Stack
          axis="type"
          direction="column"
          items={[
            { label: "1d", node: <PageTitle type="1d" title="Page Title" /> },
            {
              label: "2d (with badges)",
              node: (
                <PageTitle
                  type="2d"
                  title="Page Title"
                  badges={
                    <Badge variant="line" size="sm" shape="round" color="gray">
                      Beta
                    </Badge>
                  }
                />
              ),
            },
          ]}
        />
      </SubSection>

      <SubSection title="ContentsTitle Main / Sub / Sub2D">
        <Stack
          axis="kind"
          direction="column"
          items={[
            {
              label: "Main",
              node: (
                <ContentsTitleMain
                  title="Contents Title Main"
                  badge={<Badge variant="solid" size="sm">v1</Badge>}
                />
              ),
            },
            { label: "Sub", node: <ContentsTitleSub title="Contents Title Sub" /> },
            { label: "Sub · required", node: <ContentsTitleSub title="Sub Required" required /> },
            { label: "Sub2D", node: <ContentsTitleSub2D title="Contents Title Sub 2D" /> },
            {
              label: "Sub2D · bullet=false",
              node: <ContentsTitleSub2D title="No bullet" bullet={false} />,
            },
          ]}
        />
      </SubSection>
    </Section>
  );
}

/* ────────────────────────────────────────────────────────────── */
/* Input + TextArea + InlineMessage                                */
/* ────────────────────────────────────────────────────────────── */

const INPUT_TONES = ["normal", "success", "error"] as const;
const INPUT_STATES = ["default", "focus", "filled", "disable", "readonly"] as const;

export function InputSection() {
  return (
    <Section
      id="input"
      name="Input"
      category="Form Inputs"
      detailSlug="input"
      description="Input · TextArea · InlineMessage. tone × state 매트릭스 + affix 변형."
    >
      <SubSection title="Input · tone × state">
        <Matrix
          rowAxis="tone"
          colAxis="state"
          rows={INPUT_TONES.map((t) => ({ label: t, value: t }))}
          cols={INPUT_STATES.map((s) => ({ label: s, value: s }))}
          render={(tone, state) => (
            <Input
              tone={tone}
              forceState={state}
              defaultValue={state === "filled" || state === "focus" ? "Sample" : ""}
              placeholder="Placeholder"
              width={180}
            />
          )}
          cellMinHeight={72}
        />
      </SubSection>

      <SubSection title="Input · size · affix · counter">
        <Stack
          axis="variation"
          direction="column"
          items={[
            {
              label: "size=medium",
              node: <Input size="medium" placeholder="medium" width={240} />,
            },
            {
              label: "size=large",
              node: <Input size="large" placeholder="large" width={240} />,
            },
            {
              label: "leadingIcon=true (search)",
              node: <Input leadingIcon placeholder="Search" width={240} />,
            },
            {
              label: "trailingIcon (custom)",
              node: (
                <Input
                  trailingIcon={Icons.arrowRight}
                  placeholder="With trailing"
                  width={240}
                />
              ),
            },
            {
              label: "clearable + filled",
              node: (
                <Input clearable defaultValue="hello" width={240} />
              ),
            },
            {
              label: "counter",
              node: (
                <Input
                  defaultValue="hello"
                  counter={{ max: 20, current: 5 }}
                  width={240}
                />
              ),
            },
          ]}
        />
      </SubSection>

      <SubSection title="TextArea · tone × state">
        <Matrix
          rowAxis="tone"
          colAxis="state"
          rows={INPUT_TONES.map((t) => ({ label: t, value: t }))}
          cols={INPUT_STATES.map((s) => ({ label: s, value: s }))}
          render={(tone, state) => (
            <TextArea
              tone={tone}
              forceState={state}
              placeholder="Placeholder"
              defaultValue={state === "filled" || state === "focus" ? "Multiline\ncontent" : ""}
              width={200}
              height={72}
            />
          )}
          cellMinHeight={120}
        />
      </SubSection>

      <SubSection title="InlineMessage · type">
        <Stack
          axis="type"
          direction="column"
          items={[
            { label: "info", node: <InlineMessage type="info" text="info message" /> },
            { label: "success", node: <InlineMessage type="success" text="success message" /> },
            { label: "warning", node: <InlineMessage type="warning" text="warning message" /> },
            { label: "error", node: <InlineMessage type="error" text="error message" /> },
            { label: "loading", node: <InlineMessage type="loading" text="loading message" /> },
          ]}
        />
      </SubSection>
    </Section>
  );
}

/* ────────────────────────────────────────────────────────────── */
/* Checkbox                                                        */
/* ────────────────────────────────────────────────────────────── */

export function CheckboxSection() {
  return (
    <Section
      id="checkbox"
      name="Checkbox"
      category="Form Inputs"
      detailSlug="checkbox"
      description="checked / indeterminate / disabled / focused 상태 + Group."
    >
      <SubSection title="States × disabled">
        <Matrix
          rowAxis="state"
          colAxis="disabled"
          rows={[
            { label: "unchecked", value: { checked: false, indeterminate: false } },
            { label: "checked", value: { checked: true, indeterminate: false } },
            { label: "indeterminate", value: { checked: false, indeterminate: true } },
            { label: "focused", value: { checked: false, indeterminate: false, focus: true } },
          ]}
          cols={[
            { label: "false", value: false },
            { label: "true", value: true },
          ]}
          render={(row, disabled) => (
            <Checkbox
              checked={row.checked}
              indeterminate={row.indeterminate}
              disabled={disabled}
              forceState={row.focus ? "focused" : undefined}
              readOnly
            >
              Label
            </Checkbox>
          )}
        />
      </SubSection>

      <SubSection title="CheckboxGroup (orientation)">
        <Stack
          axis="orientation"
          direction="column"
          items={[
            {
              label: "vertical",
              node: (
                <CheckboxGroup defaultValue={["a"]} orientation="vertical">
                  <Checkbox value="a">Option A</Checkbox>
                  <Checkbox value="b">Option B</Checkbox>
                  <Checkbox value="c">Option C</Checkbox>
                </CheckboxGroup>
              ),
            },
            {
              label: "horizontal",
              node: (
                <CheckboxGroup defaultValue={["b"]} orientation="horizontal">
                  <Checkbox value="a">A</Checkbox>
                  <Checkbox value="b">B</Checkbox>
                  <Checkbox value="c">C</Checkbox>
                </CheckboxGroup>
              ),
            },
          ]}
        />
      </SubSection>
    </Section>
  );
}

/* ────────────────────────────────────────────────────────────── */
/* Radio                                                           */
/* ────────────────────────────────────────────────────────────── */

export function RadioSection() {
  return (
    <Section
      id="radio"
      name="Radio"
      category="Form Inputs"
      detailSlug="radio"
      description="단일 선택 + Group. checked / disabled / focused 상태."
    >
      <SubSection title="States × disabled">
        <Matrix
          rowAxis="state"
          colAxis="disabled"
          rows={[
            { label: "unchecked", value: { checked: false } },
            { label: "checked", value: { checked: true } },
            { label: "focused", value: { checked: false, focus: true } },
          ]}
          cols={[
            { label: "false", value: false },
            { label: "true", value: true },
          ]}
          render={(row, disabled) => (
            <Radio
              value="x"
              checked={row.checked}
              disabled={disabled}
              forceState={row.focus ? "focused" : undefined}
              readOnly
            >
              Label
            </Radio>
          )}
        />
      </SubSection>

      <SubSection title="RadioGroup (orientation)">
        <Stack
          axis="orientation"
          direction="column"
          items={[
            {
              label: "vertical",
              node: (
                <RadioGroup name="rg-v" defaultValue="a" orientation="vertical">
                  <Radio value="a">Option A</Radio>
                  <Radio value="b">Option B</Radio>
                  <Radio value="c">Option C</Radio>
                </RadioGroup>
              ),
            },
            {
              label: "horizontal",
              node: (
                <RadioGroup name="rg-h" defaultValue="b" orientation="horizontal">
                  <Radio value="a">A</Radio>
                  <Radio value="b">B</Radio>
                  <Radio value="c">C</Radio>
                </RadioGroup>
              ),
            },
          ]}
        />
      </SubSection>
    </Section>
  );
}

/* ────────────────────────────────────────────────────────────── */
/* Toggle                                                          */
/* ────────────────────────────────────────────────────────────── */

export function ToggleSection() {
  return (
    <Section
      id="toggle"
      name="Toggle"
      category="Form Inputs"
      detailSlug="toggle"
      description="checked × disabled × focused 6개 상태 + 라벨 위치."
    >
      <SubSection title="State × disabled">
        <Matrix
          rowAxis="state"
          colAxis="disabled"
          rows={[
            { label: "unchecked", value: { checked: false } },
            { label: "checked", value: { checked: true } },
            { label: "focused", value: { checked: false, focus: true } },
            { label: "checked·focused", value: { checked: true, focus: true } },
          ]}
          cols={[
            { label: "false", value: false },
            { label: "true", value: true },
          ]}
          render={(row, disabled) => (
            <Toggle
              checked={row.checked}
              disabled={disabled}
              forceState={row.focus ? "focused" : undefined}
              readOnly
            />
          )}
        />
      </SubSection>

      <SubSection title="With label / reverse">
        <Stack
          axis="variation"
          direction="column"
          items={[
            { label: "label right", node: <Toggle defaultChecked>Enable feature</Toggle> },
            {
              label: "label left (reverse)",
              node: <Toggle defaultChecked reverse>Enable feature</Toggle>,
            },
          ]}
        />
      </SubSection>
    </Section>
  );
}

/* ────────────────────────────────────────────────────────────── */
/* Select                                                          */
/* ────────────────────────────────────────────────────────────── */

const SELECT_TONES = ["normal", "success", "error"] as const;
const SELECT_STATES = ["default", "focus", "filled", "disable", "readonly"] as const;

export function SelectSection() {
  return (
    <Section
      id="select"
      name="Select"
      category="Form Inputs"
      detailSlug="select"
      description="Trigger (size · tone · state) + SelectItem + SelectList."
    >
      <SubSection title="Trigger · tone × state">
        <Matrix
          rowAxis="tone"
          colAxis="state"
          rows={SELECT_TONES.map((t) => ({ label: t, value: t }))}
          cols={SELECT_STATES.map((s) => ({ label: s, value: s }))}
          render={(tone, state) => (
            <Select
              tone={tone}
              state={state}
              placeholder="Placeholder"
              value={state === "filled" || state === "focus" ? "Selected" : undefined}
              style={{ width: 180 }}
            />
          )}
          cellMinHeight={72}
        />
      </SubSection>

      <SubSection title="Trigger · size · type · multi">
        <Stack
          axis="variation"
          direction="column"
          items={[
            { label: "size=medium", node: <Select size="medium" placeholder="Medium" /> },
            { label: "size=large", node: <Select size="large" placeholder="Large" /> },
            {
              label: "type=label",
              node: <Select type="label" label="Sort" placeholder="Newest" />,
            },
            {
              label: "multi · chips",
              node: (
                <Select
                  chips={[
                    <Badge key="a" variant="line" size="sm" shape="round" color="gray">A</Badge>,
                    <Badge key="b" variant="line" size="sm" shape="round" color="gray">B</Badge>,
                  ]}
                  moreCount={3}
                  clearable
                />
              ),
            },
          ]}
        />
      </SubSection>

      <SubSection title="SelectItem · state × size">
        <Matrix
          rowAxis="state"
          colAxis="size"
          rows={[
            { label: "default", value: "default" as const },
            { label: "hover", value: "hover" as const },
            { label: "select", value: "select" as const },
          ]}
          cols={[
            { label: "medium", value: "medium" as const },
            { label: "large", value: "large" as const },
          ]}
          render={(state, size) => (
            <div style={{ width: 200 }}>
              <SelectItem state={state} size={size}>
                Option label
              </SelectItem>
            </div>
          )}
        />
      </SubSection>

      <SubSection title="SelectList (full)">
        <div style={{ width: 240 }}>
          <SelectList>
            <SelectItem selected>Option A</SelectItem>
            <SelectItem>Option B</SelectItem>
            <SelectItem badge={<Badge variant="solid" size="xs" color="primary">N</Badge>}>
              Option C
            </SelectItem>
            <SelectItem type="2-level">Group submenu</SelectItem>
            <SelectItem disabled>Option D (disabled)</SelectItem>
          </SelectList>
        </div>
      </SubSection>
    </Section>
  );
}

/* ────────────────────────────────────────────────────────────── */
/* DatePicker                                                      */
/* ────────────────────────────────────────────────────────────── */

const DP_TONES = ["normal", "success", "error"] as const;
const DP_STATES = ["default", "focus", "filled", "disable", "readonly"] as const;

export function DatePickerSection() {
  return (
    <Section
      id="datepicker"
      name="DatePicker"
      category="Form Inputs"
      detailSlug="datepicker"
      description="Single + Range. tone × state 매트릭스."
    >
      <SubSection title="Single · tone × state">
        <Matrix
          rowAxis="tone"
          colAxis="state"
          rows={DP_TONES.map((t) => ({ label: t, value: t }))}
          cols={DP_STATES.map((s) => ({ label: s, value: s }))}
          render={(tone, state) => (
            <DatePicker
              tone={tone}
              forcedState={state}
              defaultValue={state === "filled" || state === "focus" ? "2026-04-24" : ""}
              placeholder="YYYY-MM-DD"
              style={{ width: 180 }}
            />
          )}
          cellMinHeight={72}
        />
      </SubSection>

      <SubSection title="Range · size">
        <Stack
          axis="size"
          direction="column"
          items={[
            {
              label: "medium",
              node: (
                <DatePicker
                  range
                  size="medium"
                  defaultRangeValue={["2026-04-01", "2026-04-24"]}
                />
              ),
            },
            {
              label: "large",
              node: (
                <DatePicker
                  range
                  size="large"
                  defaultRangeValue={["2026-04-01", "2026-04-24"]}
                />
              ),
            },
          ]}
        />
      </SubSection>
    </Section>
  );
}

/* ────────────────────────────────────────────────────────────── */
/* Form                                                            */
/* ────────────────────────────────────────────────────────────── */

export function FormSection() {
  return (
    <Section
      id="form"
      name="Form"
      category="Form Inputs"
      detailSlug="form"
      description="FormField (label · helper · mandatory) + Form (layout · direction)."
    >
      <SubSection title="Layout · top">
        <Form layout="top" direction="vertical" style={{ maxWidth: 360 }}>
          <FormField label="Email" mandatory helper="회사 이메일을 입력하세요.">
            <Input placeholder="you@example.com" width="100%" />
          </FormField>
          <FormField label="Password" mandatory>
            <Input type="password" placeholder="••••••••" width="100%" />
          </FormField>
        </Form>
      </SubSection>

      <SubSection title="Layout · left">
        <Form layout="left" direction="vertical" style={{ maxWidth: 480 }}>
          <FormField label="Name" mandatory>
            <Input placeholder="Yein Lim" width="100%" />
          </FormField>
          <FormField label="Role" infoIcon helper="권한 그룹">
            <Select placeholder="Select role" />
          </FormField>
        </Form>
      </SubSection>
    </Section>
  );
}

/* ────────────────────────────────────────────────────────────── */
/* Chips (5 sub-types)                                             */
/* ────────────────────────────────────────────────────────────── */

export function ChipsSection() {
  return (
    <Section
      id="chips"
      name="Chips"
      category="Selection"
      detailSlug="chips"
      description="ChipButton · SelectableChip · SearchChip · SelectChip · InputChip."
    >
      <SubSection title="ChipButton · state × icon">
        <Matrix
          rowAxis="state"
          colAxis="icon"
          rows={[
            { label: "default", value: "default" as const },
            { label: "hovered", value: "hovered" as const },
            { label: "selected", value: "selected" as const },
          ]}
          cols={[
            { label: "no icon", value: false },
            { label: "with icon", value: true },
          ]}
          render={(state, icon) => (
            <ChipButton state={state} icon={icon}>
              Filter
            </ChipButton>
          )}
        />
      </SubSection>

      <SubSection title="SelectableChip · state × kind × size">
        <Matrix
          rowAxis="state"
          colAxis="kind · size"
          rows={[
            { label: "default", value: "default" as const },
            { label: "selected", value: "selected" as const },
            { label: "readonly", value: "readonly" as const },
            { label: "disable", value: "disable" as const },
          ]}
          cols={[
            { label: "normal · m", value: { kind: "normal", size: "medium" } as const },
            { label: "normal · l", value: { kind: "normal", size: "large" } as const },
            { label: "error · m", value: { kind: "error", size: "medium" } as const },
            { label: "error · l", value: { kind: "error", size: "large" } as const },
          ]}
          render={(state, col) => (
            <SelectableChip state={state} kind={col.kind} size={col.size}>
              Chip
            </SelectableChip>
          )}
        />
      </SubSection>

      <SubSection title="SearchChip · state">
        <Stack
          axis="state"
          items={[
            { label: "default", node: <SearchChip>Search term</SearchChip> },
            { label: "hover", node: <SearchChip state="hover">Search term</SearchChip> },
            { label: "selected", node: <SearchChip state="selected">Search term</SearchChip> },
            { label: "error", node: <SearchChip state="error">Search term</SearchChip> },
            { label: "disable", node: <SearchChip state="disable">Search term</SearchChip> },
          ]}
        />
      </SubSection>

      <SubSection title="SelectChip · size × state · error">
        <Matrix
          rowAxis="state"
          colAxis="size"
          rows={[
            { label: "default", value: "default" as const },
            { label: "readonly", value: "readonly" as const },
            { label: "disable", value: "disable" as const },
          ]}
          cols={[
            { label: "medium", value: "medium" as const },
            { label: "large", value: "large" as const },
          ]}
          render={(state, size) => (
            <SelectChip state={state} size={size}>
              Selected
            </SelectChip>
          )}
        />
      </SubSection>

      <SubSection title="InputChip · type × state × size">
        <Matrix
          rowAxis="state"
          colAxis="type · size"
          rows={[
            { label: "default", value: "default" as const },
            { label: "readonly", value: "readonly" as const },
            { label: "disable", value: "disable" as const },
          ]}
          cols={[
            { label: "normal · m", value: { type: "normal", size: "medium" } as const },
            { label: "normal · l", value: { type: "normal", size: "large" } as const },
            { label: "error · m", value: { type: "error", size: "medium" } as const },
            { label: "error · l", value: { type: "error", size: "large" } as const },
          ]}
          render={(state, col) => (
            <InputChip state={state} type={col.type} size={col.size}>
              Tag
            </InputChip>
          )}
        />
      </SubSection>
    </Section>
  );
}

/* ────────────────────────────────────────────────────────────── */
/* Tab                                                             */
/* ────────────────────────────────────────────────────────────── */

export function TabSection() {
  return (
    <Section
      id="tab"
      name="Tab"
      category="Selection"
      detailSlug="tab"
      description="Tab (text · more) · TabList (horizontal · vertical)."
    >
      <SubSection title="Tab · state × type">
        <Matrix
          rowAxis="state"
          colAxis="type"
          rows={[
            { label: "default", value: "default" as const },
            { label: "hover", value: "hover" as const },
            { label: "selected", value: "selected" as const },
            { label: "disabled", value: "disabled" as const },
          ]}
          cols={[
            { label: "text", value: "text" as const },
            { label: "text · count", value: "text-count" as const },
            { label: "text · closable", value: "text-close" as const },
            { label: "more", value: "more" as const },
          ]}
          render={(state, type) => {
            if (type === "more") return <Tab state={state} tabType="more" />;
            return (
              <Tab
                state={state}
                tabType="text"
                count={type === "text-count" ? 12 : undefined}
                closable={type === "text-close"}
              >
                Tab
              </Tab>
            );
          }}
        />
      </SubSection>

      <SubSection title="TabList · horizontal">
        <TabList orientation="horizontal">
          <Tab selected>Overview</Tab>
          <Tab>Activity</Tab>
          <Tab count={3}>Settings</Tab>
          <Tab disabled>Archive</Tab>
          <Tab tabType="more" />
        </TabList>
      </SubSection>

      <SubSection title="TabList · vertical">
        <TabList orientation="vertical" style={{ width: 200 }}>
          <Tab selected>Overview</Tab>
          <Tab>Activity</Tab>
          <Tab>Settings</Tab>
        </TabList>
      </SubSection>
    </Section>
  );
}

/* ────────────────────────────────────────────────────────────── */
/* Table                                                           */
/* ────────────────────────────────────────────────────────────── */

const HEADER_TYPES = [
  "default",
  "no",
  "blank",
  "expand-all",
  "collapse-all",
  "checkbox",
  "toggle",
] as const;

export function TableSection() {
  return (
    <Section
      id="table"
      name="Table"
      category="Data Display"
      detailSlug="table"
      description="GridHeader 7 type × 2 size + BodyCell 다수 type × 3 state."
    >
      <SubSection title="GridHeader · type × size">
        <Matrix
          rowAxis="type"
          colAxis="size"
          rows={HEADER_TYPES.map((t) => ({ label: t, value: t }))}
          cols={[
            { label: "single", value: "single" as const },
            { label: "double", value: "double" as const },
          ]}
          render={(type, size) => (
            <div style={{ width: 160 }}>
              <GridHeader type={type} size={size}>
                {type === "default" ? "Header" : type === "no" ? "No." : ""}
              </GridHeader>
            </div>
          )}
          cellMinHeight={56}
        />
      </SubSection>

      <SubSection title="BodyCell · type × state">
        <Matrix
          rowAxis="type"
          colAxis="state"
          rows={[
            { label: "blank", value: "blank" as const },
            { label: "text-left", value: "text-left" as const },
            { label: "text-center", value: "text-center" as const },
            { label: "text-right", value: "text-right" as const },
            { label: "checkbox", value: "checkbox" as const },
          ]}
          cols={[
            { label: "enabled", value: "enabled" as const },
            { label: "hovered", value: "hovered" as const },
            { label: "selected", value: "selected" as const },
          ]}
          render={(type, state) => (
            <div style={{ width: 160 }}>
              <BodyCell type={type} state={state}>
                Sample
              </BodyCell>
            </div>
          )}
          cellMinHeight={56}
        />
      </SubSection>
    </Section>
  );
}

/* ────────────────────────────────────────────────────────────── */
/* Pagination                                                      */
/* ────────────────────────────────────────────────────────────── */

export function PaginationSection() {
  return (
    <Section
      id="pagination"
      name="Pagination"
      category="Data Display"
      detailSlug="pagination"
      description="size · 보조 컨트롤(showTotal · showPerPage · showGoTo)."
    >
      <SubSection title="Size">
        <Stack
          axis="size"
          direction="column"
          items={[
            {
              label: "medium",
              node: <Pagination size="medium" total={120} defaultPage={3} />,
            },
            {
              label: "large",
              node: <Pagination size="large" total={120} defaultPage={3} />,
            },
          ]}
        />
      </SubSection>

      <SubSection title="With controls">
        <Pagination
          total={520}
          defaultPage={5}
          showTotal
          showPerPage
          showGoTo
        />
      </SubSection>

      <SubSection title="Item state (default / hover / disable)">
        <Stack
          axis="forceItemState"
          items={[
            {
              label: "default",
              node: <Pagination total={50} defaultPage={2} forceItemState="default" />,
            },
            {
              label: "hover",
              node: <Pagination total={50} defaultPage={2} forceItemState="hover" />,
            },
            {
              label: "disable",
              node: <Pagination total={50} defaultPage={2} forceItemState="disable" />,
            },
          ]}
        />
      </SubSection>
    </Section>
  );
}

/* ────────────────────────────────────────────────────────────── */
/* Empty                                                           */
/* ────────────────────────────────────────────────────────────── */

export function EmptySection() {
  return (
    <Section
      id="empty"
      name="Empty"
      category="Layout"
      detailSlug="empty"
      description="placeholder · size × icon preset."
    >
      <SubSection title="size × icon">
        <Matrix
          rowAxis="size"
          colAxis="icon"
          rows={[
            { label: "small", value: "small" as const },
            { label: "medium", value: "medium" as const },
            { label: "large", value: "large" as const },
          ]}
          cols={[
            { label: "data", value: "data" as const },
            { label: "image", value: "image" as const },
            { label: "table", value: "table" as const },
            { label: "upload", value: "upload" as const },
          ]}
          render={(size, icon) => (
            <Empty
              size={size}
              icon={icon}
              description="No data"
              subtext="설명 텍스트"
            />
          )}
          cellMinHeight={180}
        />
      </SubSection>
    </Section>
  );
}

/* ────────────────────────────────────────────────────────────── */
/* Scroll                                                          */
/* ────────────────────────────────────────────────────────────── */

export function ScrollSection() {
  return (
    <Section
      id="scroll"
      name="Scroll"
      category="Layout"
      detailSlug="scroll"
      description="Scrollbar (정적 시각 재현) + ScrollArea (실제 스크롤)."
    >
      <SubSection title="Scrollbar · orientation × size">
        <Matrix
          rowAxis="size"
          colAxis="orientation"
          rows={[
            { label: "medium", value: "medium" as const },
            { label: "small", value: "small" as const },
          ]}
          cols={[
            { label: "vertical", value: "vertical" as const },
            { label: "horizontal", value: "horizontal" as const },
          ]}
          render={(size, orientation) => (
            <Scrollbar
              orientation={orientation}
              size={size}
              length={orientation === "vertical" ? 120 : 200}
              thumbLength={60}
              thumbOffset={20}
            />
          )}
          cellMinHeight={150}
        />
      </SubSection>

      <SubSection title="ScrollArea · vertical">
        <ScrollArea maxHeight={120} style={{ width: 240 }}>
          <div style={{ padding: 8, lineHeight: 1.8 }}>
            {Array.from({ length: 12 }).map((_, i) => (
              <div key={i}>줄 {i + 1} — overflow content sample</div>
            ))}
          </div>
        </ScrollArea>
      </SubSection>
    </Section>
  );
}

/* ────────────────────────────────────────────────────────────── */
/* Loader                                                          */
/* ────────────────────────────────────────────────────────────── */

export function LoaderSection() {
  return (
    <Section
      id="loader"
      name="Loader"
      category="Layout"
      detailSlug="loader"
      description="circle spinner · color × size."
    >
      <SubSection title="color × size">
        <Matrix
          rowAxis="color"
          colAxis="size"
          rows={[
            { label: "mint", value: "mint" as const },
            { label: "gray", value: "gray" as const },
            { label: "white", value: "white" as const },
          ]}
          cols={[
            { label: "small", value: "small" as const },
            { label: "medium", value: "medium" as const },
            { label: "large", value: "large" as const },
          ]}
          render={(color, size) => (
            <div
              style={{
                background: color === "white" ? "#1a1a1a" : "transparent",
                padding: 8,
                borderRadius: 8,
              }}
            >
              <Loader color={color} size={size} />
            </div>
          )}
        />
      </SubSection>
    </Section>
  );
}

/* ────────────────────────────────────────────────────────────── */
/* Tooltip                                                         */
/* ────────────────────────────────────────────────────────────── */

export function TooltipSection() {
  return (
    <Section
      id="tooltip"
      name="Tooltip"
      category="Layout"
      detailSlug="tooltip"
      description="4방향 · arrow on/off · title 슬롯 · HelpIcon 변형."
    >
      <SubSection title="Direction × arrow">
        <Matrix
          rowAxis="direction"
          colAxis="arrow"
          rows={[
            { label: "top", value: "top" as const },
            { label: "bottom", value: "bottom" as const },
            { label: "left", value: "left" as const },
            { label: "right", value: "right" as const },
          ]}
          cols={[
            { label: "trailing=true", value: true },
            { label: "trailing=false", value: false },
          ]}
          render={(direction, trailing) => (
            <Tooltip
              direction={direction}
              trailing={trailing}
              defaultOpen
              content="Tooltip body content"
              gap={32}
            >
              <Button variant="secondary-outline" size="small">
                {direction}
              </Button>
            </Tooltip>
          )}
          cellMinHeight={140}
        />
      </SubSection>

      <SubSection title="With title / HelpIcon">
        <Stack
          axis="variation"
          items={[
            {
              label: "with title",
              node: (
                <Tooltip
                  defaultOpen
                  title="Tooltip Title"
                  content="설명 텍스트가 들어갑니다."
                >
                  <Button variant="secondary-outline" size="small">
                    Hover
                  </Button>
                </Tooltip>
              ),
            },
            {
              label: "HelpIcon",
              node: <HelpIconWithTooltip content="도움말 텍스트" defaultOpen />,
            },
          ]}
        />
      </SubSection>
    </Section>
  );
}

/* ────────────────────────────────────────────────────────────── */
/* PlaybackBar                                                     */
/* ────────────────────────────────────────────────────────────── */

export function PlaybookBarSection() {
  return (
    <Section
      id="playbookcontrolbar"
      name="Playback Control Bar"
      category="Media"
      detailSlug="playbookcontrolbar"
      description="play · seek · time display · fullscreen · more."
    >
      <SubSection title="State">
        <Stack
          axis="state"
          direction="column"
          items={[
            {
              label: "default · paused",
              node: (
                <div style={{ width: 480 }}>
                  <PlaybookControlBar duration={300} defaultCurrentTime={45} />
                </div>
              ),
            },
            {
              label: "playing · long",
              node: (
                <div style={{ width: 480 }}>
                  <PlaybookControlBar
                    duration={3725}
                    defaultCurrentTime={1532}
                    defaultPlaying
                  />
                </div>
              ),
            },
            {
              label: "forceState=hover",
              node: (
                <div style={{ width: 480 }}>
                  <PlaybookControlBar
                    duration={120}
                    defaultCurrentTime={30}
                    forceState="hover"
                  />
                </div>
              ),
            },
          ]}
        />
      </SubSection>
    </Section>
  );
}

/* ────────────────────────────────────────────────────────────── */
/* GNB (Nav)                                                       */
/* ────────────────────────────────────────────────────────────── */

function GnbBrandImg({ theme = "light" }: { theme?: "light" | "dark" }) {
  return (
    <img
      src={theme === "dark" ? "/Logo_dark.svg" : "/Logo_light.svg"}
      alt="Brand"
      width={144}
      height={24}
      style={{ display: "block" }}
    />
  );
}

export function NavSection() {
  return (
    <Section
      id="nav"
      name="GNB (Global Navigation Bar)"
      category="Layout"
      description="Brand · GnbItem · GnbIconButton 슬롯 구성. Light / Dark 동시 비교."
    >
      <SubSection title="Light theme">
        <div data-theme="light" style={{ background: "#fff", borderRadius: 8 }}>
          <Gnb
            brand={<GnbBrandImg theme="light" />}
            items={
              <Fragment>
                <GnbItem href="/" selected>Overview</GnbItem>
                <GnbItem href="/components">Components</GnbItem>
                <GnbItem href="/about">About</GnbItem>
              </Fragment>
            }
            actions={
              <GnbIconButton
                aria-label="Theme"
                icon={<MaskIconSun />}
              />
            }
          />
        </div>
      </SubSection>

      <SubSection title="Dark theme">
        <div data-theme="dark" style={{ background: "#1a1a1a", borderRadius: 8 }}>
          <Gnb
            brand={<GnbBrandImg theme="dark" />}
            items={
              <Fragment>
                <GnbItem href="/" selected>Overview</GnbItem>
                <GnbItem href="/components">Components</GnbItem>
                <GnbItem href="/about">About</GnbItem>
              </Fragment>
            }
            actions={
              <GnbIconButton
                aria-label="Theme"
                icon={<MaskIconMoon />}
              />
            }
          />
        </div>
      </SubSection>
    </Section>
  );
}

function MaskIconSun() {
  return (
    <span
      aria-hidden="true"
      style={{
        width: 20,
        height: 20,
        display: "inline-block",
        backgroundColor: "currentColor",
        WebkitMaskImage: "url(/icon/Sun.svg)",
        maskImage: "url(/icon/Sun.svg)",
        WebkitMaskRepeat: "no-repeat",
        maskRepeat: "no-repeat",
        WebkitMaskPosition: "center",
        maskPosition: "center",
        WebkitMaskSize: "contain",
        maskSize: "contain",
      }}
    />
  );
}

function MaskIconMoon() {
  return (
    <span
      aria-hidden="true"
      style={{
        width: 20,
        height: 20,
        display: "inline-block",
        backgroundColor: "currentColor",
        WebkitMaskImage: "url(/icon/Moon.svg)",
        maskImage: "url(/icon/Moon.svg)",
        WebkitMaskRepeat: "no-repeat",
        maskRepeat: "no-repeat",
        WebkitMaskPosition: "center",
        maskPosition: "center",
        WebkitMaskSize: "contain",
        maskSize: "contain",
      }}
    />
  );
}
