import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import type { CSSProperties } from "react";

import { Loader, type LoaderColor, type LoaderSize } from "./loader";
import { PageLoaderOverlay } from "./page-loader-overlay";
import { FigmaLinkCard } from "@/stories/figma-link-card";
import { figmaNodeUrl } from "@/stories/story-figma-urls";
import { StoryDocsMatrixPage } from "@/stories/story-docs-shell";

const meta: Meta<typeof Loader> = {
  title: "Components/Loader",
  component: Loader,
  parameters: {
    layout: "centered",
    docs: { disable: true },
  },
};
export default meta;
type Story = StoryObj<typeof Loader>;

const rowStyle: CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: 40,
};
const cellStyle: CSSProperties = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: 12,
};
const captionStyle: CSSProperties = {
  fontSize: 12,
  color: "var(--context-foreground-surface-on-surface-sub)",
};

const SIZES: Array<{ key: LoaderSize; label: string; px: number }> = [
  { key: "small", label: "Small", px: 24 },
  { key: "medium", label: "Medium", px: 32 },
  { key: "large", label: "Large (default)", px: 48 },
];

const COLORS: Array<{ key: LoaderColor; label: string; bg?: string }> = [
  { key: "mint", label: "Mint (default)" },
  { key: "gray", label: "Gray" },
  { key: "white", label: "White (on dark)", bg: "#1f2025" },
];

const FIGMA_FULL_PAGE_LOADER = figmaNodeUrl("18219:10393");

/** Figma 18219:10393 — 전체 화면 오버레이 미리보기 (Design 탭 Figma 연동용) */
export const FullPageOverlay: Story = {
  name: "Full page overlay",
  parameters: { layout: "padded", figma: FIGMA_FULL_PAGE_LOADER },
  render: (_args, ctx) => {
    const locale = ctx.globals && ctx.globals.locale === "en" ? "en" : "ko";
    return (
    <StoryDocsMatrixPage
      title="PageLoaderOverlay"
      description={locale === "en"
        ? "Full-viewport Dim (BlackOpacity_50) + 4px blur with a centered large Loader. In production, omit container to use a fixed full-screen overlay."
        : "뷰포트 전체를 덮는 Dim(BlackOpacity_50) + blur 4px, 정중앙 large Loader. 프로덕션에서는 container를 생략하면 fixed 전체 화면입니다."}
      figmaNode="18219-10393"
    >
      <div
        style={{
          position: "relative",
          height: 520,
          borderRadius: 12,
          overflow: "hidden",
          border: "1px solid var(--border-border-surface-border-surface-secondary)",
        }}
      >
        <PageLoaderOverlay container="parent" />
      </div>
    </StoryDocsMatrixPage>
    );
  },
};

export const Matrix: Story = {
  name: "Matrix",
  parameters: { layout: "padded" },
  render: (_args, ctx) => {
    const locale = ctx.globals && ctx.globals.locale === "en" ? "en" : "ko";
    return (
    <StoryDocsMatrixPage
      title="Loader"
      description={locale === "en"
        ? "Compares preset sizes (small / medium / large) × colors (mint / gray / white)."
        : "preset size(small / medium / large)와 색상(mint / gray / white) 조합을 비교합니다."}
      figmaNode="13289-46891"
    >
      <FigmaLinkCard
        nodeId="13289-46891"
        caption="Components / Loader — Size × Variant 매트릭스 원본"
      />
      <section>
        <h4 style={{ margin: "0 0 12px", fontSize: 13, fontWeight: 600 }}>Sizes</h4>
        <div style={rowStyle}>
          {SIZES.map(({ key, label, px }) => (
            <div key={key} style={cellStyle}>
              <Loader size={key} />
              <span style={captionStyle}>
                {label} · {px}px
              </span>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h4 style={{ margin: "0 0 12px", fontSize: 13, fontWeight: 600 }}>Colors</h4>
        <div style={rowStyle}>
          {COLORS.map(({ key, label, bg }) => (
            <div
              key={key}
              style={{
                ...cellStyle,
                padding: 16,
                borderRadius: 12,
                background:
                  bg ?? "var(--context-background-surface-bg-surface-base)",
              }}
            >
              <Loader size="large" color={key} />
              <span
                style={{
                  ...captionStyle,
                  color:
                    key === "white"
                      ? "rgba(255,255,255,0.8)"
                      : captionStyle.color,
                }}
              >
                {label}
              </span>
            </div>
          ))}
        </div>
      </section>
    </StoryDocsMatrixPage>
    );
  },
};
