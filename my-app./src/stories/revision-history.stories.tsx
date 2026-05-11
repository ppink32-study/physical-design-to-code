import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import type { CSSProperties } from "react";

import { StoryDocsPage } from "@/stories/story-docs-shell";

/**
 * Storybook `meta.component` 슬롯용 — 실제 UI는 Overview 스토리 render 에서 구성합니다.
 */
function RevisionHistoryStub() {
  return null;
}

/* -----------------------------------------------------------
 *  Revision Entry — Figma 19415:79175 GridTable 컬럼 매핑
 * ----------------------------------------------------------- */
type RevisionStatus = "added" | "modified";

type LocalizedString = { ko: string; en: string };

type RevisionHistoryEntry = {
  status: RevisionStatus;
  target: string;
  change: LocalizedString;
  date: string;
  /** Storybook 내부 이동 (`?path=/story/...`) 또는 외부 URL */
  href?: string;
};

const STATUS_LABELS: Record<RevisionStatus, LocalizedString> = {
  added: { ko: "추가", en: "Added" },
  modified: { ko: "수정", en: "Modified" },
};

const REVISION_HISTORY_ENTRIES: RevisionHistoryEntry[] = [
  {
    status: "added",
    target: "Foundation > Layout",
    change: { ko: "Layout 가이드 추가", en: "Layout guideline added" },
    date: "2026-05-11",
    href: "?path=/story/design-system-foundation-layout--guideline",
  },
];

/* -----------------------------------------------------------
 *  GridTable — Figma 19415:79175 (header 32 + body 32, rounded 6)
 * ----------------------------------------------------------- */
const COLS = {
  status: 80,
  target: 280,
  change: 280,
  date: 130,
  link: 78,
} as const;

const TABLE_WIDTH =
  COLS.status + COLS.target + COLS.change + COLS.date + COLS.link;

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

/* ---- 상태 배지 (추가 / 수정) ---- */
function StatusBadge({ status, locale }: { status: RevisionStatus; locale: "ko" | "en" }) {
  const palette =
    status === "added"
      ? { bg: "#deeaff", border: "#c2d8ff", text: "#0050d9" }
      : { bg: "#fce7f3", border: "#fbcfe8", text: "#be185d" };
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        minWidth: 32,
        padding: "1px 6px",
        borderRadius: 4,
        background: palette.bg,
        border: `1px solid ${palette.border}`,
        color: palette.text,
        fontFamily: "var(--font-family-korean)",
        fontSize: 13,
        fontWeight: 400,
        lineHeight: "18px",
      }}
    >
      {STATUS_LABELS[status][locale]}
    </span>
  );
}

type GridLabels = {
  status: string;
  target: string;
  change: string;
  date: string;
  link: string;
  empty: string;
  goto: string;
};

function GridTable({
  entries,
  labels,
  locale,
}: {
  entries: RevisionHistoryEntry[];
  labels: GridLabels;
  locale: "ko" | "en";
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
        <div style={{ ...headerCellStyle, width: COLS.status, flexShrink: 0 }}>
          {labels.status}
        </div>
        <div style={{ ...headerCellStyle, width: COLS.target, flexShrink: 0 }}>
          {labels.target}
        </div>
        <div style={{ ...headerCellStyle, width: COLS.change, flexShrink: 0 }}>
          {labels.change}
        </div>
        <div style={{ ...headerCellStyle, width: COLS.date, flexShrink: 0 }}>
          {labels.date}
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
              key={`${row.date}-${row.target}`}
              style={{ display: "flex", alignItems: "stretch" }}
            >
              <div
                style={{
                  ...bodyCellStyle,
                  width: COLS.status,
                  flexShrink: 0,
                  justifyContent: "center",
                  borderBottom: rowBorderBottom,
                }}
              >
                <StatusBadge status={row.status} locale={locale} />
              </div>
              <div
                style={{
                  ...bodyCellStyle,
                  width: COLS.target,
                  flexShrink: 0,
                  borderBottom: rowBorderBottom,
                }}
              >
                {row.target}
              </div>
              <div
                style={{
                  ...bodyCellStyle,
                  width: COLS.change,
                  flexShrink: 0,
                  borderBottom: rowBorderBottom,
                }}
              >
                {row.change[locale]}
              </div>
              <div
                style={{
                  ...bodyCellStyle,
                  width: COLS.date,
                  flexShrink: 0,
                  justifyContent: "center",
                  borderBottom: rowBorderBottom,
                }}
              >
                {row.date}
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
const meta: Meta<typeof RevisionHistoryStub> = {
  title: "00 · 수정 히스토리",
  component: RevisionHistoryStub,
  parameters: {
    layout: "padded",
    docs: { disable: true },
  },
};

export default meta;
type Story = StoryObj<typeof RevisionHistoryStub>;

const PAGE_MESSAGES = {
  ko: {
    title: "수정 히스토리",
    description:
      "디자인·문서·스토리북 변경을 표로 기록합니다. Link 컬럼의 ‘바로가기’ 를 누르면 해당 가이드 페이지로 이동합니다.",
    labels: {
      status: "상태",
      target: "Target",
      change: "변경내용",
      date: "변경일자",
      link: "Link",
      empty: "기록된 항목이 없습니다.",
      goto: "바로가기",
    } as GridLabels,
  },
  en: {
    title: "Revision History",
    description:
      "A table of design, document, and Storybook changes. Click ‘Go’ in the Link column to jump to the corresponding guideline page.",
    labels: {
      status: "Status",
      target: "Target",
      change: "Change",
      date: "Date",
      link: "Link",
      empty: "No entries recorded.",
      goto: "Go",
    } as GridLabels,
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
    const m = PAGE_MESSAGES[locale];
    return (
    <StoryDocsPage
      eyebrow="Design System"
      title={m.title}
      description={m.description}
      pageMaxWidth={TABLE_WIDTH + 32}
    >
      <GridTable entries={REVISION_HISTORY_ENTRIES} labels={m.labels} locale={locale} />
    </StoryDocsPage>
    );
  },
};
