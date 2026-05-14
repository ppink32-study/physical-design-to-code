import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import type { CSSProperties } from "react";

import { FigmaLinkCard } from "@/stories/figma-link-card";
import {
  storyMatrixCellStyle,
  storyMatrixColHeaderStyle,
  storyMatrixRowHeaderStyle,
  storyMatrixTableBase,
} from "@/stories/story-matrix-table-styles";
import {
  StoryDocsMatrixPage,
  StoryDocsPage,
  StoryDocsSection,
  StoryDocsParagraph,
} from "@/stories/story-docs-shell";

import {
  Progress,
  ProgressMultiple,
  type ProgressColor,
  type ProgressSegment,
  type ProgressSize,
} from "./progress";

/* -----------------------------------------------------------------
 * Meta
 * ----------------------------------------------------------------- */
const meta: Meta<typeof Progress> = {
  title: "Components/Progress",
  component: Progress,
  parameters: {
    layout: "centered",
    docs: { disable: true },
  },
  argTypes: {
    value: { control: { type: "range", min: 0, max: 100, step: 1 } },
    color: {
      control: "inline-radio",
      options: ["primary", "success", "info", "warning", "danger"],
    },
    striped: { control: "boolean" },
    size: { control: "inline-radio", options: ["default", "sm"] },
  },
};
export default meta;

type Story = StoryObj<typeof Progress>;

/* -----------------------------------------------------------------
 * Playground
 * ----------------------------------------------------------------- */
export const Playground: Story = {
  args: { value: 60, color: "primary", striped: false, size: "default" },
  decorators: [
    (StoryFn) => (
      <div style={{ width: 400 }}>
        <StoryFn />
      </div>
    ),
  ],
};

/* -----------------------------------------------------------------
 * Matrix
 * ----------------------------------------------------------------- */
const COLORS: ProgressColor[] = [
  "primary",
  "success",
  "info",
  "warning",
  "danger",
];

const PATTERNS: { label: string; striped: boolean }[] = [
  { label: "Pattern No", striped: false },
  { label: "Pattern Yes", striped: true },
];

const MULTI_EXAMPLES: { label: string; segments: ProgressSegment[] }[] = [
  {
    label: "No=2",
    segments: [
      { value: 60, color: "primary" },
      { value: 40, color: "success" },
    ],
  },
  {
    label: "No=3",
    segments: [
      { value: 40, color: "primary" },
      { value: 35, color: "success" },
      { value: 25, color: "info" },
    ],
  },
  {
    label: "No=4",
    segments: [
      { value: 30, color: "primary" },
      { value: 30, color: "success" },
      { value: 20, color: "info" },
      { value: 20, color: "warning" },
    ],
  },
  {
    label: "No=5",
    segments: [
      { value: 25, color: "primary" },
      { value: 25, color: "success" },
      { value: 20, color: "info" },
      { value: 15, color: "warning" },
      { value: 15, color: "danger" },
    ],
  },
];

const barWrap: CSSProperties = { width: 280 };

const SIZES: { label: string; size: ProgressSize }[] = [
  { label: "default (16px)", size: "default" },
  { label: "sm (8px)", size: "sm" },
];

export const Matrix: Story = {
  name: "Matrix",
  parameters: { layout: "padded" },
  render: () => (
    <StoryDocsMatrixPage
      title="Progress"
      description="Progress_Single (Color × Pattern) · Progress_Multiple (No=2~5 × Pattern)"
      figmaNode="13262-76705"
    >
      <FigmaLinkCard
        nodeId="13262-76705"
        caption="Components / Progress"
      />

      {/* ── Single: Color × Pattern ── */}
      {SIZES.map(({ label: sizeLabel, size }) => (
        <section key={size}>
          <h3
            style={{
              margin: "0 0 12px",
              fontSize: 13,
              fontWeight: 600,
              fontFamily: "var(--font-family-korean)",
              color: "var(--on-surface-base)",
            }}
          >
            Single — {sizeLabel} × Color × Pattern
          </h3>
          <table style={{ ...storyMatrixTableBase, fontSize: 12 }}>
            <thead>
              <tr>
                <th style={{ ...storyMatrixColHeaderStyle, width: 80 }} />
                {PATTERNS.map((p) => (
                  <th key={String(p.striped)} style={storyMatrixColHeaderStyle}>
                    {p.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {COLORS.map((color) => (
                <tr key={color}>
                  <td style={storyMatrixRowHeaderStyle}>{color}</td>
                  {PATTERNS.map((p) => (
                    <td
                      key={String(p.striped)}
                      style={{ ...storyMatrixCellStyle, padding: 16 }}
                    >
                      <div style={barWrap}>
                        <Progress value={60} color={color} striped={p.striped} size={size} />
                      </div>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      ))}

      {/* ── Multiple: Segment count × Pattern ── */}
      {SIZES.map(({ label: sizeLabel, size }) => (
        <section key={size}>
          <h3
            style={{
              margin: "0 0 12px",
              fontSize: 13,
              fontWeight: 600,
              fontFamily: "var(--font-family-korean)",
              color: "var(--on-surface-base)",
            }}
          >
            Multiple — {sizeLabel} × No × Pattern
          </h3>
          <table style={{ ...storyMatrixTableBase, fontSize: 12 }}>
            <thead>
              <tr>
                <th style={{ ...storyMatrixColHeaderStyle, width: 80 }} />
                {PATTERNS.map((p) => (
                  <th key={String(p.striped)} style={storyMatrixColHeaderStyle}>
                    {p.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {MULTI_EXAMPLES.map((ex) => (
                <tr key={ex.label}>
                  <td style={storyMatrixRowHeaderStyle}>{ex.label}</td>
                  {PATTERNS.map((p) => (
                    <td
                      key={String(p.striped)}
                      style={{ ...storyMatrixCellStyle, padding: 16 }}
                    >
                      <div style={barWrap}>
                        <ProgressMultiple
                          segments={ex.segments}
                          striped={p.striped}
                          size={size}
                        />
                      </div>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      ))}
    </StoryDocsMatrixPage>
  ),
};

/* -----------------------------------------------------------------
 * Guideline
 * ----------------------------------------------------------------- */
export const Guideline: Story = {
  name: "Guideline",
  parameters: { layout: "padded" },
  render: (_args, ctx) => {
    const locale = ctx.globals && ctx.globals.locale === "en" ? "en" : "ko";
    return (
    <StoryDocsPage
      eyebrow="Components"
      title="Progress"
      description={locale === "en"
        ? "Single/multi-segment bar component that visually expresses task / loading progress."
        : "작업·로딩 진행률을 시각적으로 표현하는 단일/다중 세그먼트 바 컴포넌트입니다."}
    >
      <StoryDocsSection title="Single progress">
        <StoryDocsParagraph>
          단일 색상 바. <code>value</code>(0–100), <code>color</code>,{" "}
          <code>striped</code> prop 으로 제어합니다.
        </StoryDocsParagraph>
        <div style={{ display: "flex", flexDirection: "column", gap: 12, maxWidth: 480 }}>
          {COLORS.map((color) => (
            <div
              key={color}
              style={{ display: "flex", alignItems: "center", gap: 12 }}
            >
              <span
                style={{
                  width: 64,
                  fontSize: 12,
                  color: "var(--on-surface)",
                  fontFamily: "var(--font-family-korean)",
                  flexShrink: 0,
                }}
              >
                {color}
              </span>
              <div style={{ flex: 1 }}>
                <Progress value={60} color={color} />
              </div>
            </div>
          ))}
        </div>
      </StoryDocsSection>

      <StoryDocsSection title="Striped pattern">
        <StoryDocsParagraph>
          <code>striped</code>를 <code>true</code>로 설정하면 White_8% 대각선 줄무늬가
          오버레이됩니다.
        </StoryDocsParagraph>
        <div style={{ display: "flex", flexDirection: "column", gap: 12, maxWidth: 480 }}>
          {COLORS.map((color) => (
            <div
              key={color}
              style={{ display: "flex", alignItems: "center", gap: 12 }}
            >
              <span
                style={{
                  width: 64,
                  fontSize: 12,
                  color: "var(--on-surface)",
                  fontFamily: "var(--font-family-korean)",
                  flexShrink: 0,
                }}
              >
                {color}
              </span>
              <div style={{ flex: 1 }}>
                <Progress value={60} color={color} striped />
              </div>
            </div>
          ))}
        </div>
      </StoryDocsSection>

      <StoryDocsSection title="Multiple segments">
        <StoryDocsParagraph>
          <code>ProgressMultiple</code>에 <code>segments</code> 배열을 전달합니다.
          각 세그먼트의 <code>value</code>는 상대 가중치로 환산됩니다.
        </StoryDocsParagraph>
        <div style={{ display: "flex", flexDirection: "column", gap: 12, maxWidth: 480 }}>
          {MULTI_EXAMPLES.map((ex) => (
            <div
              key={ex.label}
              style={{ display: "flex", alignItems: "center", gap: 12 }}
            >
              <span
                style={{
                  width: 64,
                  fontSize: 12,
                  color: "var(--on-surface)",
                  fontFamily: "var(--font-family-korean)",
                  flexShrink: 0,
                }}
              >
                {ex.label}
              </span>
              <div style={{ flex: 1 }}>
                <ProgressMultiple segments={ex.segments} />
              </div>
            </div>
          ))}
        </div>
      </StoryDocsSection>

      <StoryDocsSection title="Thin (sm) — 8px">
        <StoryDocsParagraph>
          <code>size="sm"</code>은 Figma node 7370:219807 기준 8px 얇은 바입니다.
          퍼센트 레이블은 표시되지 않습니다.
        </StoryDocsParagraph>
        <div style={{ display: "flex", flexDirection: "column", gap: 12, maxWidth: 480 }}>
          {COLORS.map((color) => (
            <div
              key={color}
              style={{ display: "flex", alignItems: "center", gap: 12 }}
            >
              <span
                style={{
                  width: 64,
                  fontSize: 12,
                  color: "var(--on-surface)",
                  fontFamily: "var(--font-family-korean)",
                  flexShrink: 0,
                }}
              >
                {color}
              </span>
              <div style={{ flex: 1 }}>
                <Progress value={60} color={color} size="sm" />
              </div>
            </div>
          ))}
        </div>
      </StoryDocsSection>

      <StoryDocsSection title="Thin (sm) + Striped">
        <StoryDocsParagraph>
          얇은 바에도 동일한 스트라이프 패턴을 적용할 수 있습니다.
        </StoryDocsParagraph>
        <div style={{ display: "flex", flexDirection: "column", gap: 12, maxWidth: 480 }}>
          {COLORS.map((color) => (
            <div
              key={color}
              style={{ display: "flex", alignItems: "center", gap: 12 }}
            >
              <span
                style={{
                  width: 64,
                  fontSize: 12,
                  color: "var(--on-surface)",
                  fontFamily: "var(--font-family-korean)",
                  flexShrink: 0,
                }}
              >
                {color}
              </span>
              <div style={{ flex: 1 }}>
                <Progress value={60} color={color} size="sm" striped />
              </div>
            </div>
          ))}
        </div>
      </StoryDocsSection>

      <StoryDocsSection title="Value range">
        <StoryDocsParagraph>10% 단위 — 위 default(16px), 아래 sm(8px)</StoryDocsParagraph>
        <div style={{ display: "flex", flexDirection: "column", gap: 8, maxWidth: 480 }}>
          {[10, 20, 40, 60, 80, 100].map((v) => (
            <Progress key={v} value={v} color="primary" />
          ))}
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 8, maxWidth: 480, marginTop: 16 }}>
          {[10, 20, 40, 60, 80, 100].map((v) => (
            <Progress key={v} value={v} color="primary" size="sm" />
          ))}
        </div>
      </StoryDocsSection>
    </StoryDocsPage>
    );
  },
};
