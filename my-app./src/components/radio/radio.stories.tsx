import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import type { CSSProperties, ReactNode } from "react";
import { Fragment, useState } from "react";

import { Radio, RadioGroup } from "./radio";
import { FigmaLinkCard } from "@/stories/figma-link-card";
import {
  StoryDocsCode,
  StoryDocsInlineCode,
  StoryDocsMatrixPage,
  StoryDocsPage,
  StoryDocsParagraph,
  StoryDocsSection,
  StoryPlaygroundFrame,
} from "@/stories/story-docs-shell";

const meta: Meta<typeof Radio> = {
  title: "Components/Radio",
  component: Radio,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Figma MCP 기반 Radio. 16x16 원형 입력 + 라벨. `RadioGroup` 으로 묶어 value/onChange 를 관리하거나 단독(uncontrolled)으로 사용할 수 있습니다. (Figma node 17995:61609 / 17995:61649 / 17995:61676)",
      },
    },
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

function VerticalGroupDemo() {
  const [value, setValue] = useState("mobile");
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <RadioGroup
        name="device"
        orientation="vertical"
        value={value}
        onChange={(v) => setValue(v)}
      >
        <Radio value="mobile">Mobile</Radio>
        <Radio value="tablet">Tablet</Radio>
        <Radio value="desktop">Desktop</Radio>
      </RadioGroup>
      <div style={{ ...rowLabelStyle, marginTop: 8 }}>
        selected: <b>{value}</b>
      </div>
    </div>
  );
}

function HorizontalGroupDemo() {
  const [value, setValue] = useState("b");
  return (
    <RadioGroup
      name="opt"
      orientation="horizontal"
      value={value}
      onChange={(v) => setValue(v)}
    >
      <Radio value="a">Option A</Radio>
      <Radio value="b">Option B</Radio>
      <Radio value="c">Option C</Radio>
      <Radio value="d">Option D</Radio>
    </RadioGroup>
  );
}

/* =================================================================
 * 0. Default — Docs Primary + Controls
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
 * 1. Matrix — 상태 표 + RadioGroup (테마는 툴바)
 * =============================================================== */
export const Matrix: Story = {
  name: "Matrix",
  parameters: { layout: "padded" },
  render: () => (
    <StoryDocsMatrixPage
      title="Radio"
      description="행은 Default·Focused·Disabled, 열은 Unchecked·Checked입니다. 테마는 상단 툴바에서 전환합니다."
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

      <SectionFrame title="RadioGroup">
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 28,
            maxWidth: 560,
          }}
        >
          <div>
            <div style={{ ...rowLabelStyle, marginBottom: 8, fontWeight: 600 }}>
              Vertical
            </div>
            <VerticalGroupDemo />
          </div>
          <div>
            <div style={{ ...rowLabelStyle, marginBottom: 8, fontWeight: 600 }}>
              Horizontal
            </div>
            <HorizontalGroupDemo />
          </div>
        </div>
      </SectionFrame>
    </StoryDocsMatrixPage>
  ),
};

/* =================================================================
 * 2. Guidelines
 * =============================================================== */
const guideBlockStyle: CSSProperties = {
  padding: 16,
  borderRadius: 8,
  border: "1px solid var(--border-border-surface-border-surface)",
  background: "var(--context-background-surface-bg-surface-base)",
};

const guideTableStyle: CSSProperties = {
  width: "100%",
  borderCollapse: "collapse",
  fontSize: 13,
  lineHeight: 1.5,
  color: "var(--context-foreground-surface-on-surface-base)",
};

const thStyle: CSSProperties = {
  textAlign: "left",
  fontWeight: 600,
  fontSize: 12,
  padding: "8px 12px",
  borderBottom: "1px solid var(--border-border-surface-border-surface)",
  color: "var(--context-foreground-surface-on-surface-secondary)",
};

const tdStyle: CSSProperties = {
  padding: "10px 12px",
  borderBottom:
    "1px solid var(--border-border-surface-border-surface-secondary)",
  verticalAlign: "top",
};

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

<RadioGroup name="plan" defaultValue="pro" orientation="vertical">
  <Radio value="free">Free</Radio>
  <Radio value="pro">Pro</Radio>
</RadioGroup>`}</StoryDocsCode>
      </StoryDocsSection>
    </StoryDocsPage>
  ),
};
