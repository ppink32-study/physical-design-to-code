import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import type { CSSProperties, ReactNode } from "react";
import { Fragment, useState } from "react";

import { Toggle, ToggleGroup } from "./toggle";
import { FigmaLinkCard } from "@/stories/figma-link-card";
import {
  storyDocsGuideTableStyle,
  storyDocsGuideTdStyle,
  storyDocsGuideThStyle,
} from "@/stories/story-matrix-table-styles";
import {
  StoryDocsInlineCode,
  StoryDocsMatrixPage,
  StoryDocsPage,
  StoryDocsPanelInset,
  StoryDocsParagraph,
  StoryDocsSection,
  StoryPlaygroundFrame,
} from "@/stories/story-docs-shell";

const meta: Meta<typeof Toggle> = {
  title: "Components/Toggle",
  component: Toggle,
  parameters: {
    layout: "centered",
    docs: { disable: true },
  },
  argTypes: {
    checked: { control: "boolean" },
    disabled: { control: "boolean" },
    reverse: { control: "boolean" },
    forceState: {
      control: "inline-radio",
      options: [undefined, "default", "focused"],
    },
  },
  args: {
    children: "Label",
    defaultChecked: false,
    disabled: false,
    reverse: false,
  },
};
export default meta;
type Story = StoryObj<typeof Toggle>;

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

function ControlledToggleVerticalDemo() {
  const [wifi, setWifi] = useState(true);
  const [bt, setBt] = useState(false);
  const [dark, setDark] = useState(false);
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      <ToggleGroup orientation="vertical" aria-label="설정">
        <Toggle checked={wifi} onChange={(v) => setWifi(v)}>
          Wi-Fi
        </Toggle>
        <Toggle checked={bt} onChange={(v) => setBt(v)}>
          Bluetooth
        </Toggle>
        <Toggle checked={dark} onChange={(v) => setDark(v)}>
          다크 모드
        </Toggle>
      </ToggleGroup>
      <code style={{ fontSize: 12, color: "var(--context-foreground-surface-on-surface-hint)" }}>
        {JSON.stringify({ wifi, bt, dark })}
      </code>
    </div>
  );
}

/* =================================================================
 * 0. Playground — Controls
 * =============================================================== */
/* =================================================================
 * 0. Playground — Figma Properties 패널과 동일
 *   Checked · Focused · Disabled
 * =============================================================== */

type TogglePlaygroundArgs = {
  checked: boolean;
  focused: boolean;
  disabled: boolean;
};

export const Playground: StoryObj<TogglePlaygroundArgs> = {
  parameters: {
    controls: {
      sort: "none",
      include: ["Checked", "Focused", "Disabled"],
    },
  },
  argTypes: {
    checked: { name: "Checked", description: "True / False", control: "boolean" },
    focused: { name: "Focused", description: "True / False", control: "boolean" },
    disabled: { name: "Disabled", description: "True / False", control: "boolean" },
  },
  render: function PlaygroundRender(args) {
    return (
      <StoryPlaygroundFrame>
        <Toggle
          checked={args.checked}
          disabled={args.disabled}
          forceState={args.focused ? "focused" : undefined}
          onChange={() => {}}
        >
          Label
        </Toggle>
      </StoryPlaygroundFrame>
    );
  },
  args: {
    checked: false,
    focused: false,
    disabled: false,
  },
};

/* =================================================================
 * 1. Matrix — 상태 표 + reverse + Controlled (테마는 툴바)
 * =============================================================== */
export const Matrix: Story = {
  name: "Matrix",
  parameters: { layout: "padded" },
  render: () => (
    <StoryDocsMatrixPage
      title="Toggle"
      description="행은 Default·Focused·Disabled, 열은 Unchecked·Checked입니다. forceState는 Storybook 시각 고정용이며 테마는 상단 툴바에서 전환합니다."
      figmaNode="18001-55013"
    >
      <FigmaLinkCard
        nodeId="18001-55013"
        caption="Components / Toggle — State × Size 매트릭스 원본"
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
                <Toggle
                  checked={c.checked}
                  disabled={r.disabled}
                  forceState={r.forceState}
                  readOnly
                >
                  Label
                </Toggle>
              </div>
            ))}
          </Fragment>
        ))}
      </div>

      <SectionFrame title="Reverse (label position)">
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div style={{ display: "flex", gap: 32, flexWrap: "wrap" }}>
            <Toggle>Reverse false</Toggle>
            <Toggle reverse>Reverse true</Toggle>
          </div>
          <div style={{ display: "flex", gap: 32, flexWrap: "wrap" }}>
            <Toggle defaultChecked>Reverse false</Toggle>
            <Toggle defaultChecked reverse>
              Reverse true
            </Toggle>
          </div>
        </div>
      </SectionFrame>

      <SectionFrame title="Controlled · ToggleGroup (vertical)">
        <ControlledToggleVerticalDemo />
      </SectionFrame>
    </StoryDocsMatrixPage>
  ),
};

function ControlledToggleGroupSnippet() {
  const [a, setA] = useState(false);
  const [b, setB] = useState(true);
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      <ToggleGroup orientation="horizontal" aria-label="옵션">
        <Toggle checked={a} onChange={(v) => setA(v)}>
          알림 A
        </Toggle>
        <Toggle checked={b} onChange={(v) => setB(v)}>
          알림 B
        </Toggle>
      </ToggleGroup>
      <code style={{ fontSize: 12, color: "var(--context-foreground-surface-on-surface-hint)" }}>
        {JSON.stringify({ a, b })}
      </code>
    </div>
  );
}

/* -----------------------------------------------------------------
 * ToggleGroup 간격 — toggle.module.css 의 .toggleGroup 과 동일 (RadioGroup 과 동일 토큰)
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

const TOGGLE_GROUP_SPACING: Array<{
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
        <StoryDocsInlineCode>toggle.module.css</StoryDocsInlineCode> 의{" "}
        <StoryDocsInlineCode>.toggleGroup</StoryDocsInlineCode> 기본{" "}
        <StoryDocsInlineCode>gap</StoryDocsInlineCode> · RadioGroup 과 동일)
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
        <StoryDocsInlineCode>gap</StoryDocsInlineCode> · RadioGroup 과 동일)
      </>
    ),
    orientation: "horizontal",
  },
];

function ToggleGroupSpacingCard({
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
          <ToggleGroup
            orientation={orientation}
            aria-label="Toggle spacing demo"
          >
            <Toggle defaultChecked={orientation === "horizontal"}>Apple</Toggle>
            <Toggle defaultChecked={orientation === "vertical"}>Banana</Toggle>
            <Toggle>Cherry</Toggle>
          </ToggleGroup>
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
    <StoryDocsPage title="Toggle" description="스위치 형태 설정 컴포넌트 가이드입니다.">
      <StoryDocsSection title="개요">
        <StoryDocsParagraph>
          설정 on/off를 스위치로 표현합니다. <StoryDocsInlineCode>checked</StoryDocsInlineCode> /{" "}
          <StoryDocsInlineCode>onChange</StoryDocsInlineCode>로 제어하거나{" "}
          <StoryDocsInlineCode>defaultChecked</StoryDocsInlineCode>로 비제어 사용이 가능합니다. 여러
          개를 나란히 둘 때는 <StoryDocsInlineCode>ToggleGroup</StoryDocsInlineCode>으로 묶어
          RadioGroup 과 동일한 간격(세로 4px · 가로 16px)을 적용합니다.
        </StoryDocsParagraph>
      </StoryDocsSection>

      <StoryDocsSection
        title="ToggleGroup 간격"
        description="ToggleGroup 은 orientation 에 따라 항목 간 gap 이 다릅니다. 구현은 toggle.module.css 의 .toggleGroup 이며 RadioGroup·CheckboxGroup 과 동일 토큰입니다."
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            gap: 24,
          }}
        >
          {TOGGLE_GROUP_SPACING.map((item) => (
            <ToggleGroupSpacingCard key={item.key} {...item} />
          ))}
        </div>
      </StoryDocsSection>

      <StoryDocsSection
        title="ToggleGroup 예시"
        description="Horizontal · Vertical · Controlled · 그룹 비활성화 조합입니다."
      >
        <div style={{ display: "flex", flexDirection: "column", gap: 24, maxWidth: 560 }}>
          <div>
            <div style={groupExampleLabelStyle}>Horizontal</div>
            <ToggleGroup orientation="horizontal" aria-label="과일">
              <Toggle defaultChecked>Apple</Toggle>
              <Toggle>Banana</Toggle>
              <Toggle>Cherry</Toggle>
            </ToggleGroup>
          </div>
          <div>
            <div style={groupExampleLabelStyle}>Vertical</div>
            <ToggleGroup orientation="vertical" aria-label="과일">
              <Toggle>Apple</Toggle>
              <Toggle defaultChecked>Banana</Toggle>
              <Toggle>Cherry</Toggle>
            </ToggleGroup>
          </div>
          <div>
            <div style={groupExampleLabelStyle}>Controlled</div>
            <ControlledToggleGroupSnippet />
          </div>
          <div>
            <div style={groupExampleLabelStyle}>Group disabled</div>
            <ToggleGroup orientation="horizontal" aria-label="비활성 그룹">
              <Toggle defaultChecked disabled>
                Apple
              </Toggle>
              <Toggle disabled>Banana</Toggle>
              <Toggle disabled>Cherry</Toggle>
            </ToggleGroup>
          </div>
        </div>
      </StoryDocsSection>

      <StoryDocsSection title="Toggle vs Checkbox">
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
                <td style={tdStyle}>Toggle</td>
                <td style={tdStyle}>즉시 반영되는 on/off(설정·기능 스위치).</td>
              </tr>
              <tr>
                <td style={tdStyle}>Checkbox</td>
                <td style={tdStyle}>다중 선택 또는 폼 제출 전까지 보류되는 선택.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </StoryDocsSection>
    </StoryDocsPage>
  ),
};
