import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import type { CSSProperties } from "react";

import { StoryDocsPage } from "@/stories/story-docs-shell";

/**
 * Storybook `meta.component` 슬롯용 — 실제 UI 는 Overview 스토리 render 에서 구성합니다.
 */
function LayoutExampleStub() {
  return null;
}

/* -----------------------------------------------------------
 *  Entry — 화면명 + Storybook 링크
 * ----------------------------------------------------------- */
type LayoutExampleEntry = {
  /** 화면명 */
  name: string;
  /** Storybook 내부 이동 (`?path=/story/...`) 또는 외부 URL */
  href?: string;
};

const LAYOUT_EXAMPLE_ENTRIES: LayoutExampleEntry[] = [
  {
    name: "Default",
    href: "?path=/story/layout-example-default--default",
  },
  {
    name: "List Layout",
    href: "?path=/story/layout-example-list-layout--default",
  },
];

/* -----------------------------------------------------------
 *  GridTable — 수정 히스토리와 동일 시각 패턴 (화면명 / Link)
 * ----------------------------------------------------------- */
const COLS = {
  name: 480,
  link: 120,
} as const;

const TABLE_WIDTH = COLS.name + COLS.link;

const BORDER_OUTER = "#ddd"; // grayscale/300
const BORDER_CELL = "#eee"; // grayscale/200
const HEADER_BG = "#f6f6f6"; // grayscale/100
const HEADER_TEXT = "#666"; // grayscale/700
const BODY_TEXT = "#333"; // grayscale/900
const LINK_COLOR = "#2e7bff"; // primary/500

const headerCellStyle: CSSProperties = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  height: 32,
  padding: "0 10px",
  background: HEADER_BG,
  borderBottom: `1px solid ${BORDER_OUTER}`,
  fontFamily: "var(--font-family-korean)",
  fontSize: 13,
  fontWeight: 700,
  lineHeight: "18px",
  color: HEADER_TEXT,
  boxSizing: "border-box",
};

const bodyCellStyle: CSSProperties = {
  display: "flex",
  alignItems: "center",
  height: 32,
  padding: "0 12px",
  background: "#fff",
  borderBottom: `1px solid ${BORDER_CELL}`,
  borderRight: `1px solid ${BORDER_CELL}`,
  fontFamily: "var(--font-family-korean)",
  fontSize: 13,
  fontWeight: 400,
  lineHeight: "18px",
  color: BODY_TEXT,
  boxSizing: "border-box",
};

type GridLabels = { name: string; link: string; empty: string; goto: string };

function GridTable({
  entries,
  labels,
}: {
  entries: LayoutExampleEntry[];
  labels: GridLabels;
}) {
  return (
    <div
      style={{
        width: "100%",
        maxWidth: TABLE_WIDTH,
        background: "#fff",
        border: `1px solid ${BORDER_OUTER}`,
        borderRadius: 6,
        overflow: "hidden",
        boxSizing: "border-box",
      }}
    >
      {/* Header */}
      <div style={{ display: "flex", background: HEADER_BG }}>
        <div style={{ ...headerCellStyle, width: COLS.name, flexShrink: 0 }}>
          {labels.name}
        </div>
        <div style={{ ...headerCellStyle, width: COLS.link, flexShrink: 0 }}>
          {labels.link}
        </div>
      </div>

      {/* Body */}
      {entries.length === 0 ? (
        <div
          style={{
            padding: "16px 20px",
            fontFamily: "var(--font-family-korean)",
            fontSize: 13,
            color: HEADER_TEXT,
            background: "#fff",
            textAlign: "center",
          }}
        >
          {labels.empty}
        </div>
      ) : (
        entries.map((row, idx) => {
          const isLast = idx === entries.length - 1;
          const rowBorderBottom = isLast ? "none" : `1px solid ${BORDER_CELL}`;
          return (
            <div
              key={`${row.name}-${idx}`}
              style={{ display: "flex", alignItems: "stretch" }}
            >
              <div
                style={{
                  ...bodyCellStyle,
                  width: COLS.name,
                  flexShrink: 0,
                  borderBottom: rowBorderBottom,
                }}
              >
                {row.name}
              </div>
              <div
                style={{
                  ...bodyCellStyle,
                  width: COLS.link,
                  flexShrink: 0,
                  justifyContent: "center",
                  borderRight: "none",
                  borderBottom: rowBorderBottom,
                }}
              >
                {row.href ? (
                  <a
                    href={row.href}
                    target="_top"
                    rel="noreferrer"
                    style={{
                      color: LINK_COLOR,
                      textDecoration: "underline",
                      fontFamily: "var(--font-family-korean)",
                      fontSize: 13,
                      lineHeight: "18px",
                    }}
                  >
                    {labels.goto}
                  </a>
                ) : (
                  <span style={{ color: "#9698A3" }}>—</span>
                )}
              </div>
            </div>
          );
        })
      )}
    </div>
  );
}

/* -----------------------------------------------------------
 *  Meta
 * ----------------------------------------------------------- */
const meta: Meta<typeof LayoutExampleStub> = {
  title: "Layout Example/Overview",
  component: LayoutExampleStub,
  parameters: {
    layout: "padded",
    docs: { disable: true },
  },
};

export default meta;
type Story = StoryObj<typeof LayoutExampleStub>;

const OVERVIEW_MESSAGES = {
  ko: {
    title: "화면 예시",
    description:
      "각 레이아웃 타입별 화면 예시 목록입니다. ‘바로가기’ 를 누르면 해당 화면 스토리로 이동합니다.",
    labels: { name: "화면명", link: "Link", empty: "등록된 화면이 없습니다.", goto: "바로가기" },
  },
  en: {
    title: "Screen examples",
    description:
      "A list of screen examples for each layout type. Click ‘Go’ to jump to the corresponding screen story.",
    labels: { name: "Screen", link: "Link", empty: "No screens registered.", goto: "Go" },
  },
} as const;

export const Overview: Story = {
  name: "Overview",
  parameters: {
    controls: { hideNoControlsWarning: true, disable: true },
    actions: { disable: true },
  },
  render: (_args, ctx) => {
    const locale = (ctx.globals?.locale as "ko" | "en") === "en" ? "en" : "ko";
    const m = OVERVIEW_MESSAGES[locale];
    return (
    <StoryDocsPage
      eyebrow="Layout Example"
      title={m.title}
      description={m.description}
      pageMaxWidth={TABLE_WIDTH + 32}
    >
      <GridTable entries={LAYOUT_EXAMPLE_ENTRIES} labels={m.labels} />
    </StoryDocsPage>
    );
  },
};
