import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import type { CSSProperties, ReactNode } from "react";
import { Fragment, useState } from "react";

import { Checkbox, CheckboxGroup } from "./checkbox";
import { FigmaLinkCard } from "@/stories/figma-link-card";
import {
  StoryDocsInlineCode,
  StoryDocsMatrixPage,
  StoryDocsPage,
  StoryDocsPanelInset,
  StoryDocsParagraph,
  StoryDocsSection,
  StoryPlaygroundFrame,
} from "@/stories/story-docs-shell";

const meta: Meta<typeof Checkbox> = {
  title: "Components/Checkbox",
  component: Checkbox,
  parameters: {
    layout: "centered",
    docs: { disable: true },
  },
  argTypes: {
    checked: { control: "boolean" },
    indeterminate: { control: "boolean" },
    disabled: { control: "boolean" },
    forceState: {
      control: "inline-radio",
      options: [undefined, "default", "focused"],
    },
  },
  args: {
    children: "Label",
    defaultChecked: false,
    disabled: false,
    indeterminate: false,
  },
};
export default meta;
type Story = StoryObj<typeof Checkbox>;

const sectionTitleStyle: CSSProperties = {
  fontSize: 14,
  fontWeight: 600,
  marginBottom: 12,
  color: "var(--on-surface-base)",
};

const SectionFrame = ({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) => (
  <section>
    <h3 style={sectionTitleStyle}>{title}</h3>
    {children}
  </section>
);

const cellStyle: CSSProperties = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

const headerStyle: CSSProperties = {
  fontSize: 12,
  color: "var(--on-surface-hint)",
  fontWeight: 600,
  textTransform: "uppercase",
  letterSpacing: 0.4,
};

const rowLabelStyle: CSSProperties = {
  fontSize: 12,
  color: "var(--on-surface)",
};

const COLS: Array<{
  key: string;
  label: string;
  props: { checked?: boolean; indeterminate?: boolean };
}> = [
  { key: "unchecked", label: "Unchecked", props: {} },
  { key: "indeterminate", label: "Indeterminate", props: { indeterminate: true } },
  { key: "checked", label: "Checked", props: { checked: true } },
];

const ROWS: Array<{
  key: string;
  label: string;
  forceState?: "focused";
  disabled?: boolean;
}> = [
  { key: "default", label: "Default" },
  { key: "focused", label: "Focused", forceState: "focused" },
  { key: "disabled", label: "Disabled", disabled: true },
];

function ControlledCheckboxDemo() {
  const [a, setA] = useState(false);
  const [b, setB] = useState(true);
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      <Checkbox checked={a} onChange={(v) => setA(v)}>
        동의합니다 (checked = {String(a)})
      </Checkbox>
      <Checkbox checked={b} onChange={(v) => setB(v)}>
        알림 수신 (checked = {String(b)})
      </Checkbox>
      <Checkbox indeterminate onChange={() => {}}>
        일부만 선택된 상태
      </Checkbox>
    </div>
  );
}

/* =================================================================
 * 0. Playground — Figma Properties 패널과 동일
 *   Checked · Indeterminate · Focused · Disabled
 * =============================================================== */

type CheckboxPlaygroundArgs = {
  checked: boolean;
  indeterminate: boolean;
  focused: boolean;
  disabled: boolean;
};

export const Playground: StoryObj<CheckboxPlaygroundArgs> = {
  parameters: {
    controls: {
      sort: "none",
      include: ["Checked", "Indeterminate", "Focused", "Disabled"],
    },
  },
  argTypes: {
    checked: { name: "Checked", description: "True / False", control: "boolean" },
    indeterminate: { name: "Indeterminate", description: "True / False", control: "boolean" },
    focused: { name: "Focused", description: "True / False", control: "boolean" },
    disabled: { name: "Disabled", description: "True / False", control: "boolean" },
  },
  render: function PlaygroundRender(args) {
    return (
      <StoryPlaygroundFrame>
        <Checkbox
          checked={args.checked}
          indeterminate={args.indeterminate}
          disabled={args.disabled}
          forceState={args.focused ? "focused" : undefined}
          onChange={() => {}}
        >
          Label
        </Checkbox>
      </StoryPlaygroundFrame>
    );
  },
  args: {
    checked: false,
    indeterminate: false,
    focused: false,
    disabled: false,
  },
};

/* =================================================================
 * 1. Matrix — 상태 표 + Group + controlled 예시 (테마는 툴바)
 * =============================================================== */
export const Matrix: Story = {
  name: "Matrix",
  parameters: { layout: "padded" },
  render: (_args, ctx) => {
    const locale = ctx.globals && ctx.globals.locale === "en" ? "en" : "ko";
    return (
    <StoryDocsMatrixPage
      title="Checkbox"
      description={locale === "en"
        ? "Rows: Default · Focused · Disabled. Columns: Unchecked · Indeterminate · Checked. `forceState` is for Storybook visual lock; toggle the theme from the top toolbar."
        : "행은 Default·Focused·Disabled, 열은 Unchecked·Indeterminate·Checked입니다. forceState는 Storybook 시각 고정용이며 테마는 상단 툴바에서 전환합니다."}
      figmaNode="17995-61456"
    >
      <FigmaLinkCard
        nodeId="17995-61456"
        caption="Components / Checkbox — State × Size 매트릭스 원본"
      />
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "[label] 120px repeat(3, [state] max-content)",
          columnGap: 24,
          rowGap: 16,
          alignItems: "center",
          justifyItems: "start",
        }}
      >
          <div />
          {COLS.map((c) => (
            <div key={c.key} style={headerStyle}>
              {c.label}
            </div>
          ))}

          {ROWS.map((r) => (
            <Fragment key={r.key}>
              <div style={rowLabelStyle}>{r.label}</div>
              {COLS.map((c) => (
                <div key={`${r.key}-${c.key}`} style={cellStyle}>
                  <Checkbox
                    checked={c.props.checked ?? false}
                    indeterminate={c.props.indeterminate}
                    disabled={r.disabled}
                    forceState={r.forceState}
                    readOnly
                  >
                    Label
                  </Checkbox>
                </div>
              ))}
            </Fragment>
          ))}
      </div>

      <SectionFrame title="Controlled · indeterminate">
        <ControlledCheckboxDemo />
      </SectionFrame>
    </StoryDocsMatrixPage>
    );
  },
};

function ControlledGroupSnippet() {
  const [values, setValues] = useState<string[]>(["apple"]);
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      <CheckboxGroup
        name="fruits-c"
        value={values}
        onChange={setValues}
        orientation="horizontal"
      >
        <Checkbox value="apple">Apple</Checkbox>
        <Checkbox value="banana">Banana</Checkbox>
        <Checkbox value="cherry">Cherry</Checkbox>
      </CheckboxGroup>
      <code style={{ fontSize: 12, color: "var(--on-surface-hint)" }}>
        values = {JSON.stringify(values)}
      </code>
    </div>
  );
}

/* =================================================================
 * 2. Guideline
 * =============================================================== */

/* -----------------------------------------------------------------
 * CheckboxGroup 간격 — checkbox.module.css 과 동일 (vertical 4px / horizontal 16px)
 * ----------------------------------------------------------------- */
const groupSpacingCardLabelStyle: CSSProperties = {
  margin: 0,
  fontSize: 15,
  fontWeight: 700,
  letterSpacing: "-0.02em",
  color: "var(--on-surface-base)",
};

const groupSpacingCardDescStyle: CSSProperties = {
  margin: 0,
  fontSize: 14,
  lineHeight: 1.65,
  color: "var(--on-surface-secondary)",
};

/** Vertical / Horizontal 카드 미리보기 박스 — 동일 크기 · 내용 중앙 정렬 */
const groupSpacingPreviewBoxStyle: CSSProperties = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  boxSizing: "border-box",
  width: "100%",
  minHeight: 176,
  height: 176,
};

const CHECKBOX_GROUP_SPACING: Array<{
  key: string;
  label: string;
  description: ReactNode;
  orientation: "vertical" | "horizontal";
}> = [
  {
    key: "vertical",
    label: "Vertical (column)",
    description: (
      <>
        세로로 쌓을 때 항목 사이 간격은 <strong>4px</strong>입니다. (
        <StoryDocsInlineCode>--spacing-2xs</StoryDocsInlineCode> ·{" "}
        <StoryDocsInlineCode>gap</StoryDocsInlineCode> 기준)
      </>
    ),
    orientation: "vertical",
  },
  {
    key: "horizontal",
    label: "Horizontal (row)",
    description: (
      <>
        가로로 나란히 둘 때 항목 사이 간격은 <strong>16px</strong>입니다. (
        <StoryDocsInlineCode>--spacing-lg</StoryDocsInlineCode> ·{" "}
        <StoryDocsInlineCode>gap</StoryDocsInlineCode> 기준)
      </>
    ),
    orientation: "horizontal",
  },
];

function CheckboxGroupSpacingCard({
  label,
  description,
  orientation,
}: {
  label: string;
  description: ReactNode;
  orientation: "vertical" | "horizontal";
}) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 12, minWidth: 0 }}>
      <div style={groupSpacingCardLabelStyle}>{label}</div>
      <p style={groupSpacingCardDescStyle}>{description}</p>
      <StoryDocsPanelInset>
        <div style={groupSpacingPreviewBoxStyle}>
          <CheckboxGroup
            name={`spacing-demo-${orientation}`}
            defaultValue={orientation === "vertical" ? ["banana", "cherry"] : ["apple"]}
            orientation={orientation}
            aria-label="Spacing demo"
          >
            <Checkbox value="apple">Apple</Checkbox>
            <Checkbox value="banana">Banana</Checkbox>
            <Checkbox value="cherry">Cherry</Checkbox>
          </CheckboxGroup>
        </div>
      </StoryDocsPanelInset>
    </div>
  );
}

const groupExampleLabelStyle: CSSProperties = {
  marginBottom: 8,
  fontSize: 13,
  fontWeight: 600,
  color: "var(--on-surface-base)",
};

export const Guideline: Story = {
  name: "Guideline",
  parameters: {
    layout: "padded",
    controls: { hideNoControlsWarning: true, disable: true },
    actions: { disable: true },
  },
  render: () => (
    <StoryDocsPage title="Checkbox" description="다중 옵션 입력 컴포넌트 가이드입니다.">
      <StoryDocsSection title="개요">
        <StoryDocsParagraph>
          단일 선택이 아닌 다중 옵션에 사용합니다.{" "}
          <StoryDocsInlineCode>CheckboxGroup</StoryDocsInlineCode>으로 값 배열을 묶거나, 단일{" "}
          <StoryDocsInlineCode>Checkbox</StoryDocsInlineCode>로 on/off를 표현할 수 있습니다.
        </StoryDocsParagraph>
      </StoryDocsSection>

      <StoryDocsSection
        title="CheckboxGroup 간격"
        description="CheckboxGroup 은 orientation 에 따라 항목 간 gap 이 다릅니다. 구현은 checkbox.module.css 의 .group 과 동일합니다."
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            gap: 24,
          }}
        >
          {CHECKBOX_GROUP_SPACING.map((item) => (
            <CheckboxGroupSpacingCard key={item.key} {...item} />
          ))}
        </div>
      </StoryDocsSection>

      <StoryDocsSection
        title="CheckboxGroup 예시"
        description="Horizontal · Vertical · Controlled · 그룹 비활성화 조합입니다."
      >
        <div style={{ display: "flex", flexDirection: "column", gap: 24, maxWidth: 560 }}>
          <div>
            <div style={groupExampleLabelStyle}>Horizontal</div>
            <CheckboxGroup
              name="guide-fruits-h"
              defaultValue={["apple"]}
              orientation="horizontal"
              aria-label="Fruits"
            >
              <Checkbox value="apple">Apple</Checkbox>
              <Checkbox value="banana">Banana</Checkbox>
              <Checkbox value="cherry">Cherry</Checkbox>
            </CheckboxGroup>
          </div>
          <div>
            <div style={groupExampleLabelStyle}>Vertical</div>
            <CheckboxGroup
              name="guide-fruits-v"
              defaultValue={["banana", "cherry"]}
              orientation="vertical"
              aria-label="Fruits"
            >
              <Checkbox value="apple">Apple</Checkbox>
              <Checkbox value="banana">Banana</Checkbox>
              <Checkbox value="cherry">Cherry</Checkbox>
            </CheckboxGroup>
          </div>
          <div>
            <div style={groupExampleLabelStyle}>Controlled</div>
            <ControlledGroupSnippet />
          </div>
          <div>
            <div style={groupExampleLabelStyle}>Group disabled</div>
            <CheckboxGroup
              name="guide-fruits-d"
              defaultValue={["apple"]}
              orientation="horizontal"
              disabled
            >
              <Checkbox value="apple">Apple</Checkbox>
              <Checkbox value="banana">Banana</Checkbox>
              <Checkbox value="cherry">Cherry</Checkbox>
            </CheckboxGroup>
          </div>
        </div>
      </StoryDocsSection>
    </StoryDocsPage>
  ),
};
