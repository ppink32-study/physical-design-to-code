import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import type { CSSProperties, ReactNode } from "react";
import { Fragment, useState } from "react";

import { Toggle } from "./toggle";
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

const meta: Meta<typeof Toggle> = {
  title: "Components/Toggle",
  component: Toggle,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Figma MCP 기반 Toggle(Switch). 36x20 pill 트랙 + 14x14 knob. reverse 로 라벨 위치를 토글 좌/우에 선택할 수 있습니다. (Figma node 18001:55013 / 18001:55053)",
      },
    },
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

function ControlledToggleDemo() {
  const [on, setOn] = useState(false);
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      <Toggle checked={on} onChange={(v) => setOn(v)}>
        알림 받기 ({String(on)})
      </Toggle>
      <Toggle checked={on} onChange={(v) => setOn(v)} reverse>
        라벨 왼쪽
      </Toggle>
    </div>
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
 * 1. Matrix — 상태 표 + reverse + controlled (테마는 툴바)
 * =============================================================== */
export const Matrix: Story = {
  name: "Matrix",
  parameters: { layout: "padded" },
  render: () => (
    <StoryDocsMatrixPage
      title="Toggle"
      description="행은 Default·Focused·Disabled, 열은 Unchecked·Checked입니다. reverse·controlled 예시는 하단 섹션에서 확인합니다."
      figmaNode="18001-55013"
    >
      <FigmaLinkCard
        nodeId="18001-55013"
        caption="Components / Toggle — Size × State 매트릭스 원본"
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

      <SectionFrame title="Controlled">
        <ControlledToggleDemo />
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
    <StoryDocsPage title="Toggle" description="스위치 형태 설정 컴포넌트 가이드입니다.">
      <StoryDocsSection title="개요">
        <StoryDocsParagraph>
          설정 on/off를 스위치 형태로 표현합니다. <StoryDocsInlineCode>checked</StoryDocsInlineCode>{" "}
          / <StoryDocsInlineCode>onChange</StoryDocsInlineCode>로 제어하거나{" "}
          <StoryDocsInlineCode>defaultChecked</StoryDocsInlineCode>로 비제어 사용이 가능합니다.
        </StoryDocsParagraph>
      </StoryDocsSection>

      <StoryDocsSection title="주요 옵션">
        <div style={guideBlockStyle}>
          <table style={guideTableStyle}>
            <thead>
              <tr>
                <th style={thStyle}>옵션</th>
                <th style={thStyle}>설명</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={tdStyle}>
                  <StoryDocsInlineCode>reverse</StoryDocsInlineCode>
                </td>
                <td style={tdStyle}>
                  <StoryDocsInlineCode>true</StoryDocsInlineCode>이면 라벨이 트랙 왼쪽에 옵니다.
                </td>
              </tr>
              <tr>
                <td style={tdStyle}>
                  <StoryDocsInlineCode>forceState</StoryDocsInlineCode>
                </td>
                <td style={tdStyle}>
                  Storybook에서 포커스 링 고정용. 프로덕션에서는 비권장.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </StoryDocsSection>

      <StoryDocsSection title="코드 예시">
        <StoryDocsCode>{`import { Toggle } from "@/components/toggle/toggle";

<Toggle defaultChecked>알림</Toggle>

<Toggle checked={on} onChange={setOn} reverse>
  라벨 왼쪽
</Toggle>`}</StoryDocsCode>
      </StoryDocsSection>
    </StoryDocsPage>
  ),
};
