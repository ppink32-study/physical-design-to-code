import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import type { CSSProperties } from "react";

import spacingCssRaw from "@/commons/constants/css/spacing.css?raw";
import { StoryDocsMatrixPage } from "@/stories/story-docs-shell";

const SPACING_TOKENS: Array<{ token: string; value: string }> = [
  { token: "--spacing-none", value: "0px" },
  { token: "--spacing-3xs", value: "2px" },
  { token: "--spacing-2xs", value: "4px" },
  { token: "--spacing-xs", value: "6px" },
  { token: "--spacing-sm", value: "8px" },
  { token: "--spacing-md", value: "12px" },
  { token: "--spacing-lg", value: "16px" },
  { token: "--spacing-xl", value: "20px" },
  { token: "--spacing-2xl", value: "24px" },
  { token: "--spacing-3xl", value: "32px" },
  { token: "--spacing-4xl", value: "36px" },
  { token: "--spacing-5xl", value: "40px" },
  { token: "--spacing-6xl", value: "44px" },
  { token: "--spacing-7xl", value: "48px" },
  { token: "--spacing-8xl", value: "56px" },
  { token: "--spacing-9xl", value: "64px" },
  { token: "--spacing-10xl", value: "80px" },
];

/* -----------------------------------------------------------
 *  Meta — single Matrix page (same pattern as Radius)
 * ----------------------------------------------------------- */
const meta: Meta = {
  title: "Design System/Foundation/Spacing",
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

const tokens = {
  borderColor: "var(--context-border-neutral-border-base)",
  borderColorMuted: "var(--border-neutral-border-neutral-secondary)",
  surface: "var(--context-background-surface-bg-surface-base)",
  surfaceMuted: "var(--context-background-neutral-bg-neutral-subtle)",
  textBase: "var(--context-foreground-surface-on-surface-base)",
  textMuted: "var(--context-foreground-surface-on-surface)",
  textSubtle: "var(--context-foreground-surface-on-surface-secondary)",
} as const;

function triggerCssDownload() {
  const blob = new Blob([spacingCssRaw], {
    type: "text/css;charset=utf-8",
  });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "spacing.css";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  window.setTimeout(() => URL.revokeObjectURL(url), 1000);
}

function DownloadButton() {
  return (
    <button
      type="button"
      onClick={triggerCssDownload}
      style={{
        appearance: "none",
        display: "inline-flex",
        alignItems: "center",
        gap: 8,
        padding: "10px 18px",
        background: "var(--accent-gray-accent-gray-darkest)",
        color: "#FFFFFF",
        border: "none",
        borderRadius: "var(--radius-full)",
        fontWeight: 600,
        fontSize: 13,
        cursor: "pointer",
        boxShadow: "0 1px 2px rgba(0,0,0,0.12)",
      }}
    >
      <span aria-hidden style={{ display: "inline-flex" }}>
        <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
          <path
            d="M8 2v8m0 0 3-3m-3 3-3-3M3 13h10"
            stroke="currentColor"
            strokeWidth="1.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
      spacing.css 다운로드
    </button>
  );
}

const previewTrackStyle: CSSProperties = {
  width: "100%",
  height: 40,
  display: "flex",
  alignItems: "center",
  background: tokens.surfaceMuted,
  border: `1px solid ${tokens.borderColor}`,
  borderRadius: "var(--radius-sm)",
  padding: "0 10px",
  overflow: "hidden",
};

function SpacingPreviewBar({ token, value }: { token: string; value: string }) {
  const isZero = value === "0px";
  if (isZero) {
    return (
      <div
        style={{
          ...previewTrackStyle,
          justifyContent: "center",
          fontSize: 11,
          color: tokens.textSubtle,
          fontFamily: "ui-monospace, SFMono-Regular, monospace",
        }}
      >
        0px
      </div>
    );
  }
  return (
    <div style={previewTrackStyle}>
      <div
        aria-hidden
        style={{
          height: 18,
          width: `var(${token})`,
          flexShrink: 0,
          background: "var(--context-foreground-primary-on-primary)",
          borderRadius: 2,
        }}
      />
    </div>
  );
}

export const Matrix: Story = {
  name: "Matrix",
  render: () => (
    <StoryDocsMatrixPage
      eyebrow="Design System"
      title="Spacing scale"
      description="4pt 그리드 기준 spacing 토큰과 예외(2px·6px)를 카드 그리드로 확인합니다. 임의 값 대신 정의된 토큰만 사용하세요."
      figmaNode="6453-348396"
    >
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          flexWrap: "wrap",
          marginBottom: 8,
        }}
      >
        <DownloadButton />
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))",
          gap: 16,
        }}
      >
        {SPACING_TOKENS.map((s) => (
          <div
            key={s.token}
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
            <SpacingPreviewBar token={s.token} value={s.value} />
            <code
              style={{
                fontFamily: "ui-monospace, SFMono-Regular, monospace",
                fontSize: 12,
                color: tokens.textMuted,
                textAlign: "center",
                wordBreak: "break-all",
              }}
            >
              {s.token}
            </code>
            <span
              style={{
                fontSize: 11,
                color: tokens.textSubtle,
              }}
            >
              {s.value}
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
        총 {SPACING_TOKENS.length}개 spacing 변수 · 다운로드 버튼은{" "}
        <code>src/commons/constants/css/spacing.css</code> 원본을 그대로 내려줍니다.
      </footer>
    </StoryDocsMatrixPage>
  ),
};
