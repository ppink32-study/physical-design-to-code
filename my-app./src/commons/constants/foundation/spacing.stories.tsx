import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import type { CSSProperties } from "react";

import spacingCssRaw from "@/commons/constants/css/spacing.css?raw";
import { StoryDocsMatrixPage } from "@/stories/story-docs-shell";

import { DownloadButton } from "./foundation-shared";

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

const SPACING_MESSAGES = {
  ko: {
    description:
      "4pt 그리드 기준 spacing 토큰과 예외(2px·6px)를 카드 그리드로 확인합니다. 임의 값 대신 정의된 토큰만 사용하세요.",
    footer: (n: number) =>
      `총 ${n}개 spacing 변수 · 다운로드 버튼은 `,
    footerSuffix: "원본을 그대로 내려줍니다.",
  },
  en: {
    description:
      "Spacing tokens on a 4pt grid (with exceptions at 2px and 6px) shown in a card grid. Use only the defined tokens — never arbitrary values.",
    footer: (n: number) =>
      `${n} spacing variables in total · The download button serves `,
    footerSuffix: "as the original.",
  },
} as const;

export const Matrix: Story = {
  name: "Matrix",
  render: (_args, ctx) => {
    const locale = (ctx.globals?.locale as "ko" | "en") === "en" ? "en" : "ko";
    const m = SPACING_MESSAGES[locale];
    return (
    <StoryDocsMatrixPage
      eyebrow="Design System"
      title="Spacing scale"
      description={m.description}
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
        <DownloadButton fileName="spacing.css" css={spacingCssRaw} />
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
        {m.footer(SPACING_TOKENS.length)}
        <code>src/commons/constants/css/spacing.css</code> {m.footerSuffix}
      </footer>
    </StoryDocsMatrixPage>
    );
  },
};
