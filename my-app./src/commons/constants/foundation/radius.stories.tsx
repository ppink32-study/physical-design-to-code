import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import type { CSSProperties } from "react";

import borderRadiusCssRaw from "@/commons/constants/css/border-radius.css?raw";
import { StoryDocsMatrixPage } from "@/stories/story-docs-shell";

import { DownloadButton } from "./foundation-shared";

const RADIUS_TOKENS: Array<{ token: string; value: string }> = [
  { token: "--radius-none", value: "0px" },
  { token: "--radius-xs", value: "2px" },
  { token: "--radius-sm", value: "4px" },
  { token: "--radius-md", value: "6px" },
  { token: "--radius-lg", value: "8px" },
  { token: "--radius-xl", value: "12px" },
  { token: "--radius-2xl", value: "16px" },
  { token: "--radius-3xl", value: "20px" },
  { token: "--radius-4xl", value: "24px" },
  { token: "--radius-full", value: "1000px" },
];

/* -----------------------------------------------------------
 *  Meta — single page (no autodocs, no Default/Guideline)
 * ----------------------------------------------------------- */
const meta: Meta = {
  title: "Design System/Foundation/Radius",
  parameters: {
    layout: "padded",
    options: { showPanel: false },
    controls: { hideNoControlsWarning: true, disable: true },
    actions: { disable: true },
    docs: { disable: true },
  },
};
export default meta;

type Story = StoryObj;

/* -----------------------------------------------------------
 *  Shared design tokens
 * ----------------------------------------------------------- */
const tokens = {
  borderColor: "var(--context-border-neutral-border-base)",
  borderColorMuted: "var(--border-neutral-border-neutral-secondary)",
  surface: "var(--context-background-surface-bg-surface-base)",
  surfaceMuted: "var(--context-background-neutral-bg-neutral-subtle)",
  textBase: "var(--context-foreground-surface-on-surface-base)",
  textMuted: "var(--context-foreground-surface-on-surface)",
  textSubtle: "var(--context-foreground-surface-on-surface-secondary)",
} as const;

const previewBaseStyle: CSSProperties = {
  width: 64,
  height: 40,
  background: tokens.surfaceMuted,
  border: `1px solid ${tokens.borderColor}`,
};

export const Matrix: Story = {
  name: "Matrix",
  render: () => (
    <StoryDocsMatrixPage
      eyebrow="Design System"
      title="Radius scale"
      description="모서리 반경(border-radius) 토큰입니다. 컴포넌트 모양을 결정하는 핵심 토큰이라 별도 페이지로 분리합니다. 임의 값 사용을 금지하고 정의된 토큰만 사용하세요."
    >
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          flexWrap: "wrap",
          marginBottom: 8,
        }}
      >
        <DownloadButton fileName="border-radius.css" css={borderRadiusCssRaw} />
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))",
          gap: 16,
        }}
      >
        {RADIUS_TOKENS.map((r) => (
          <div
            key={r.token}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 8,
              padding: 16,
              background: tokens.surface,
              border: `1px solid ${tokens.borderColor}`,
              borderRadius: "var(--radius-md)",
            }}
          >
            <div
              style={{
                ...previewBaseStyle,
                borderRadius: `var(${r.token})`,
              }}
            />
            <code
              style={{
                fontFamily: "ui-monospace, SFMono-Regular, monospace",
                fontSize: 12,
                color: tokens.textMuted,
              }}
            >
              {r.token}
            </code>
            <span
              style={{
                fontSize: 11,
                color: tokens.textSubtle,
              }}
            >
              {r.value}
            </span>
          </div>
        ))}
      </div>

      <footer
        style={{
          fontSize: 12,
          color: tokens.textSubtle,
          borderTop: `1px solid ${tokens.borderColor}`,
          paddingTop: 16,
        }}
      >
        총 {RADIUS_TOKENS.length}개 radius 변수 · 다운로드 버튼은{" "}
        <code>src/commons/constants/css/border-radius.css</code> 원본을 그대로 내려줍니다.
      </footer>
    </StoryDocsMatrixPage>
  ),
};
