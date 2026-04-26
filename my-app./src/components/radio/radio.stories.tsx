import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import type { CSSProperties, ReactNode } from "react";
import { Fragment, useState } from "react";

import { Radio, RadioGroup } from "./radio";
import { FigmaLinkCard } from "@/stories/figma-link-card";
import {
  storyDocsGuideTableStyle,
  storyDocsGuideTdStyle,
  storyDocsGuideThStyle,
} from "@/stories/story-matrix-table-styles";
import {
  StoryDocsCode,
  StoryDocsInlineCode,
  StoryDocsMatrixPage,
  StoryDocsPage,
  StoryDocsPanelInset,
  StoryDocsParagraph,
  StoryDocsSection,
  StoryPlaygroundFrame,
} from "@/stories/story-docs-shell";

const meta: Meta<typeof Radio> = {
  title: "Components/Radio",
  component: Radio,
  parameters: {
    layout: "centered",
    docs: { disable: true },
  },
  argTypes: {
    value: { control: "text" },
    disabled: { control: "boolean" },
    forceState: {
      control: "inline-radio",
      options: [undefined, "default", "focused"],
    },
  },
  args: {
    value: "a",
    children: "Label",
    defaultChecked: false,
    disabled: false,
  },
};
export default meta;
type Story = StoryObj<typeof Radio>;

const sectionTitleStyle: CSSProperties = {
  fontSize: 14,
  fontWeight: 600,
  marginBottom: 12,
  color: "var(--context-foreground-surface-on-surface-base)",
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
  color: "var(--context-foreground-surface-on-surface-hint)",
  fontWeight: 600,
  textTransform: "uppercase",
  letterSpacing: 0.4,
};

const rowLabelStyle: CSSProperties = {
  fontSize: 12,
  color: "var(--context-foreground-surface-on-surface)",
};

const COLS: Array<{ key: string; label: string; checked: boolean }> = [
  { key: "unchecked", label: "Unchecked", checked: false },
  { key: "checked", label: "Checked", checked: true },
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

function ControlledRadioVerticalDemo() {
  const [value, setValue] = useState("mobile");
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      <RadioGroup
        name="device-matrix"
        orientation="vertical"
        value={value}
        onChange={(v) => setValue(v)}
      >
        <Radio value="mobile">Mobile</Radio>
        <Radio value="tablet">Tablet</Radio>
        <Radio value="desktop">Desktop</Radio>
      </RadioGroup>
      <code style={{ fontSize: 12, color: "var(--context-foreground-surface-on-surface-hint)" }}>
        value = {JSON.stringify(value)}
      </code>
    </div>
  );
}

/* =================================================================
 * 0. Playground — Controls
 * =============================================================== */
export const Playground: Story = {
  decorators: [
    (Story) => (
      <StoryPlaygroundFrame>
        <Story />
      </StoryPlaygroundFrame>
    ),
  ],
};

/* =================================================================
 * 1. Matrix — 상태 표 + Controlled 예시 (테마는 툴바)
 * =============================================================== */
export const Matrix: Story = {
  name: "Matrix",
  parameters: { layout: "padded" },
  render: () => (
    <StoryDocsMatrixPage
      title="Radio"
      description="행은 Default·Focused·Disabled, 열은 Unchecked·Checked입니다. forceState는 Storybook 시각 고정용이며 테마는 상단 툴바에서 전환합니다."
      figmaNode="17995-61609"
    >
      <FigmaLinkCard
        nodeId="17995-61609"
        caption="Components / Radio — State × Size 매트릭스 원본"
      />
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "[label] 120px repeat(2, [state] max-content)",
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
                <Radio
                  value={`${r.key}-${c.key}`}
                  checked={c.checked}
                  disabled={r.disabled}
                  forceState={r.forceState}
                  readOnly
                >
                  Label
                </Radio>
              </div>
            ))}
          </Fragment>
        ))}
      </div>

      <SectionFrame title="Controlled · RadioGroup (vertical)">
        <ControlledRadioVerticalDemo />
      </SectionFrame>
    </StoryDocsMatrixPage>
  ),
};

function ControlledRadioGroupSnippet() {
  const [value, setValue] = useState("b");
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      <RadioGroup
        name="opts-c"
        value={value}
        onChange={(v) => setValue(v)}
        orientation="horizontal"
      >
        <Radio value="a">A</Radio>
        <Radio value="b">B</Radio>
        <Radio value="c">C</Radio>
      </RadioGroup>
      <code style={{ fontSize: 12, color: "var(--context-foreground-surface-on-surface-hint)" }}>
        value = {JSON.stringify(value)}
      </code>
    </div>
  );
}

/* -----------------------------------------------------------------
 * RadioGroup 간격 — radio.module.css 의 .group 과 동일 (vertical 4px / horizontal 16px)
 * ----------------------------------------------------------------- */
const groupSpacingCardLabelStyle: CSSProperties = {
  margin: 0,
  fontSize: 15,
  fontWeight: 700,
  letterSpacing: "-0.02em",
  color: "var(--context-foreground-surface-on-surface-base)",
};

const groupSpacingCardDescStyle: CSSProperties = {
  margin: 0,
  fontSize: 14,
  lineHeight: 1.65,
  color: "var(--context-foreground-surface-on-surface-secondary)",
};

const groupSpacingPreviewBoxStyle: CSSProperties = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  boxSizing: "border-box",
  width: "100%",
  minHeight: 176,
  height: 176,
};

const RADIO_GROUP_SPACING: Array<{
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
        <StoryDocsInlineCode>radio.module.css</StoryDocsInlineCode> 의{" "}
        <StoryDocsInlineCode>.group</StoryDocsInlineCode> 기본 <StoryDocsInlineCode>gap</StoryDocsInlineCode>)
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
        <StoryDocsInlineCode>data-orientation=&quot;horizontal&quot;</StoryDocsInlineCode> 일 때{" "}
        <StoryDocsInlineCode>gap</StoryDocsInlineCode>)
      </>
    ),
    orientation: "horizontal",
  },
];

function RadioGroupSpacingCard({
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
          <RadioGroup
            name={`radio-spacing-demo-${orientation}`}
            orientation={orientation}
            aria-label="Radio spacing demo"
          >
            <Radio value="apple" defaultChecked={orientation === "horizontal"}>
              Apple
            </Radio>
            <Radio value="banana" defaultChecked={orientation === "vertical"}>
              Banana
            </Radio>
            <Radio value="cherry">Cherry</Radio>
          </RadioGroup>
        </div>
      </StoryDocsPanelInset>
    </div>
  );
}

const groupExampleLabelStyle: CSSProperties = {
  marginBottom: 8,
  fontSize: 13,
  fontWeight: 600,
  color: "var(--context-foreground-surface-on-surface-base)",
};

const guideBlockStyle: CSSProperties = {
  padding: 16,
  borderRadius: 8,
  border: "1px solid var(--border-border-surface-border-surface)",
  background: "var(--context-background-surface-bg-surface-base)",
};

const guideTableStyle = storyDocsGuideTableStyle;
const thStyle = storyDocsGuideThStyle;
const tdStyle = storyDocsGuideTdStyle;

/* =================================================================
 * 2. Guideline
 * =============================================================== */
export const Guideline: Story = {
  name: "Guideline",
  parameters: {
    layout: "padded",
    controls: { hideNoControlsWarning: true, disable: true },
    actions: { disable: true },
  },
  render: () => (
    <StoryDocsPage title="Radio" description="단일 선택 라디오 컴포넌트 가이드입니다.">
      <StoryDocsSection title="개요">
        <StoryDocsParagraph>
          여러 옵션 중 하나만 선택할 때 사용합니다. 동일한{" "}
          <StoryDocsInlineCode>name</StoryDocsInlineCode>과{" "}
          <StoryDocsInlineCode>RadioGroup</StoryDocsInlineCode>의{" "}
          <StoryDocsInlineCode>value</StoryDocsInlineCode> /{" "}
          <StoryDocsInlineCode>onChange</StoryDocsInlineCode>로 선택 상태를 맞춥니다.
        </StoryDocsParagraph>
      </StoryDocsSection>

      <StoryDocsSection
        title="RadioGroup 간격"
        description="RadioGroup 은 orientation 에 따라 항목 간 gap 이 다릅니다. 구현은 radio.module.css 의 .group 과 동일합니다 (CheckboxGroup 과 동일 토큰)."
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            gap: 24,
          }}
        >
          {RADIO_GROUP_SPACING.map((item) => (
            <RadioGroupSpacingCard key={item.key} {...item} />
          ))}
        </div>
      </StoryDocsSection>

      <StoryDocsSection
        title="RadioGroup 예시"
        description="Horizontal · Vertical · Controlled · 그룹 비활성화 조합입니다."
      >
        <div style={{ display: "flex", flexDirection: "column", gap: 24, maxWidth: 560 }}>
          <div>
            <div style={groupExampleLabelStyle}>Horizontal</div>
            <RadioGroup
              name="guide-radio-h"
              orientation="horizontal"
              aria-label="Fruits"
            >
              <Radio value="apple" defaultChecked>
                Apple
              </Radio>
              <Radio value="banana">Banana</Radio>
              <Radio value="cherry">Cherry</Radio>
            </RadioGroup>
          </div>
          <div>
            <div style={groupExampleLabelStyle}>Vertical</div>
            <RadioGroup name="guide-radio-v" orientation="vertical" aria-label="Fruits">
              <Radio value="apple">Apple</Radio>
              <Radio value="banana" defaultChecked>
                Banana
              </Radio>
              <Radio value="cherry">Cherry</Radio>
            </RadioGroup>
          </div>
          <div>
            <div style={groupExampleLabelStyle}>Controlled</div>
            <ControlledRadioGroupSnippet />
          </div>
          <div>
            <div style={groupExampleLabelStyle}>Group disabled</div>
            <RadioGroup name="guide-radio-d" orientation="horizontal" disabled>
              <Radio value="apple" defaultChecked>
                Apple
              </Radio>
              <Radio value="banana">Banana</Radio>
              <Radio value="cherry">Cherry</Radio>
            </RadioGroup>
          </div>
        </div>
      </StoryDocsSection>

      <StoryDocsSection title="Radio vs Checkbox">
        <div style={guideBlockStyle}>
          <table style={guideTableStyle}>
            <thead>
              <tr>
                <th style={thStyle}>컴포넌트</th>
                <th style={thStyle}>용도</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={tdStyle}>Radio</td>
                <td style={tdStyle}>단일 선택(배타적 옵션).</td>
              </tr>
              <tr>
                <td style={tdStyle}>Checkbox</td>
                <td style={tdStyle}>다중 선택 또는 단독 on/off.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </StoryDocsSection>

      <StoryDocsSection title="코드 예시">
        <StoryDocsCode>{`import { Radio, RadioGroup } from "@/components/radio/radio";

<RadioGroup name="plan" orientation="vertical">
  <Radio value="free">Free</Radio>
  <Radio value="pro" defaultChecked>Pro</Radio>
</RadioGroup>`}</StoryDocsCode>
      </StoryDocsSection>
    </StoryDocsPage>
  ),
};
