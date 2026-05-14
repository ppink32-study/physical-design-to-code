import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import type { CSSProperties, ReactNode } from "react";

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
type RevisionStatus = "added" | "modified" | "notice";

type LocalizedString = { ko: string; en: string };

type RevisionHistoryEntry = {
  status: RevisionStatus;
  target: string;
  change: LocalizedString;
  date: string;
  /** Storybook 내부 이동 (`?path=/story/...`) 또는 외부 URL */
  href?: string;
  /** 변경 셀 하단에 펼쳐서 노출할 상세 그리드 (컬러 토큰 rename 표 등) */
  details?: (locale: "ko" | "en") => ReactNode;
};

/* -----------------------------------------------------------
 *  Color Token Rename — 2026-05-14 일괄 정리 (총 47건)
 *  대소문자(PascalCase → kebab-case) + 오타(suface/teriary) 통합 매핑
 * ----------------------------------------------------------- */
type ColorRenameRow = {
  group: string;
  before: string;
  after: string;
  /** Figma 키 자체의 오타까지 함께 수정한 항목 */
  typo?: boolean;
};

const COLOR_RENAME_ROWS: ColorRenameRow[] = [
  // Context/Foreground/Surface — 4건 (전부 오타)
  { group: "Context/Foreground/Surface", before: "on-suface-white", after: "on-surface-white", typo: true },
  { group: "Context/Foreground/Surface", before: "on-suface-black", after: "on-surface-black", typo: true },
  { group: "Context/Foreground/Surface", before: "on-suface-invert", after: "on-surface-invert", typo: true },
  { group: "Context/Foreground/Surface", before: "on-surface-teriary", after: "on-surface-tertiary", typo: true },
  // Context/Foreground/Neutral — 1건
  { group: "Context/Foreground/Neutral", before: "on-neutral-teriary", after: "on-neutral-tertiary", typo: true },
  // Context/Foreground/Icon-Surface — 9건
  { group: "Context/Foreground/Icon-Surface", before: "Icon-surface-base", after: "icon-surface-base" },
  { group: "Context/Foreground/Icon-Surface", before: "Icon-suface-invert", after: "icon-surface-invert", typo: true },
  { group: "Context/Foreground/Icon-Surface", before: "Icon-surface-secondary", after: "icon-surface-secondary" },
  { group: "Context/Foreground/Icon-Surface", before: "Icon-surface-teriary", after: "icon-surface-tertiary", typo: true },
  { group: "Context/Foreground/Icon-Surface", before: "Icon-surface", after: "icon-surface" },
  { group: "Context/Foreground/Icon-Surface", before: "Icon-surface-hover", after: "icon-surface-hover" },
  { group: "Context/Foreground/Icon-Surface", before: "Icon-surface-selected", after: "icon-surface-selected" },
  { group: "Context/Foreground/Icon-Surface", before: "Icon-surface-readonly", after: "icon-surface-readonly" },
  { group: "Context/Foreground/Icon-Surface", before: "Icon-surface-disabled", after: "icon-surface-disabled" },
  // Context/Foreground/Icon-Neutral — 1건
  { group: "Context/Foreground/Icon-Neutral", before: "icon-neutral-teriary", after: "icon-neutral-tertiary", typo: true },
  // Context/Foreground/Warning — 1건
  { group: "Context/Foreground/Warning", before: "on-warning-Hover", after: "on-warning-hover" },
  // Context/Background/Surface — 2건
  { group: "Context/Background/Surface", before: "BgBackdrop_Dark", after: "bg-backdrop-dark" },
  { group: "Context/Background/Surface", before: "bg-surface-teriary", after: "bg-surface-tertiary", typo: true },
  // Context/Background/Neutral — 1건
  { group: "Context/Background/Neutral", before: "bg-neutral-teriary", after: "bg-neutral-tertiary", typo: true },
  // Context/Background/Backdrop — 1건
  { group: "Context/Background/Backdrop", before: "BgBackboard", after: "bg-backboard" },
  // Border — 1건
  { group: "Border", before: "border-Primary-hover", after: "border-primary-hover" },
  // Border/Border Surface — 1건
  { group: "Border/Border Surface", before: "border-surface-Hover", after: "border-surface-hover" },
  // Border/OpacityBorder — 2건
  { group: "Border/OpacityBorder", before: "BorderBlackOpacity10 2", after: "border-black-opacity-10" },
  { group: "Border/OpacityBorder", before: "BorderOpacity70", after: "border-opacity-70" },
  // Opacity — 23건
  { group: "Opacity", before: "SurfaceSecondary_70", after: "surface-secondary-70" },
  { group: "Opacity", before: "OpacityPanel", after: "opacity-panel" },
  { group: "Opacity", before: "SurfaceWhiteOpacity_50", after: "surface-white-opacity-50" },
  { group: "Opacity", before: "SurfaceWhiteOpacity_70", after: "surface-white-opacity-70" },
  { group: "Opacity", before: "SurfaceBlackOpacity_8", after: "surface-black-opacity-8" },
  { group: "Opacity", before: "WhiteOpacity_8", after: "white-opacity-8" },
  { group: "Opacity", before: "WhiteOpacity_50", after: "white-opacity-50" },
  { group: "Opacity", before: "WhiteOpacity_70", after: "white-opacity-70" },
  { group: "Opacity", before: "BlackOpacity_8", after: "black-opacity-8" },
  { group: "Opacity", before: "BlackOpacity_50", after: "black-opacity-50" },
  { group: "Opacity", before: "BlackOpacity_90", after: "black-opacity-90" },
  { group: "Opacity", before: "PrimaryOpacity_8", after: "primary-opacity-8" },
  { group: "Opacity", before: "PrimaryOpacity_15", after: "primary-opacity-15" },
  { group: "Opacity", before: "PrimaryOpacity_20", after: "primary-opacity-20" },
  { group: "Opacity", before: "PrimaryOpacity_25", after: "primary-opacity-25" },
  { group: "Opacity", before: "PrimaryOpacity_30", after: "primary-opacity-30" },
  { group: "Opacity", before: "SurfacePrimaryOpacity_30", after: "surface-primary-opacity-30" },
  { group: "Opacity", before: "BlueOpacity_30", after: "blue-opacity-30" },
  { group: "Opacity", before: "OrangeOpacity_15", after: "orange-opacity-15" },
  { group: "Opacity", before: "CyanOpacity_15", after: "cyan-opacity-15" },
  { group: "Opacity", before: "CyanOpacity_30", after: "cyan-opacity-30" },
  { group: "Opacity", before: "PinkOpacity_8", after: "pink-opacity-8" },
  { group: "Opacity", before: "PinkOpacity_10", after: "pink-opacity-10" },
];

function ColorRenameGrid({ locale }: { locale: "ko" | "en" }) {
  const grouped = new Map<string, ColorRenameRow[]>();
  for (const row of COLOR_RENAME_ROWS) {
    if (!grouped.has(row.group)) grouped.set(row.group, []);
    grouped.get(row.group)!.push(row);
  }
  const headerLabels = locale === "ko"
    ? { before: "현재 Figma 키", after: "최종 키", note: "비고" }
    : { before: "Current Figma key", after: "Final key", note: "Note" };
  const typoBadge = locale === "ko" ? "오타 수정" : "Typo fix";

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 12,
        width: "100%",
        fontFamily: "var(--font-family-korean)",
      }}
    >
      {[...grouped.entries()].map(([group, rows]) => (
        <div
          key={group}
          style={{
            border: `1px solid ${BORDER_CELL}`,
            borderRadius: 4,
            overflow: "hidden",
            background: "#fff",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "6px 10px",
              background: HEADER_BG,
              borderBottom: `1px solid ${BORDER_CELL}`,
              fontSize: 12,
              fontWeight: 700,
              color: HEADER_TEXT,
              lineHeight: "16px",
            }}
          >
            <span>{group}</span>
            <span style={{ fontSize: 11, color: "#9698A3", fontWeight: 400 }}>
              {locale === "ko" ? `${rows.length}건` : `${rows.length} item${rows.length > 1 ? "s" : ""}`}
            </span>
          </div>
          <div style={{ display: "flex", background: "#FAFAFA", borderBottom: `1px solid ${BORDER_CELL}`, fontSize: 11, fontWeight: 700, color: HEADER_TEXT, lineHeight: "16px" }}>
            <div style={{ flex: "0 0 36px", padding: "4px 8px", textAlign: "right", borderRight: `1px solid ${BORDER_CELL}` }}>#</div>
            <div style={{ flex: 1, padding: "4px 8px", borderRight: `1px solid ${BORDER_CELL}` }}>{headerLabels.before}</div>
            <div style={{ flex: 1, padding: "4px 8px", borderRight: `1px solid ${BORDER_CELL}` }}>{headerLabels.after}</div>
            <div style={{ flex: "0 0 72px", padding: "4px 8px" }}>{headerLabels.note}</div>
          </div>
          {rows.map((row, idx) => {
            const isLast = idx === rows.length - 1;
            const rowBorder = isLast ? "none" : `1px solid ${BORDER_CELL}`;
            return (
              <div key={row.before} style={{ display: "flex", fontSize: 12, lineHeight: "18px", borderBottom: rowBorder }}>
                <div style={{ flex: "0 0 36px", padding: "4px 8px", textAlign: "right", color: "#9698A3", borderRight: `1px solid ${BORDER_CELL}` }}>{idx + 1}</div>
                <div style={{ flex: 1, padding: "4px 8px", borderRight: `1px solid ${BORDER_CELL}`, fontFamily: "ui-monospace, SFMono-Regular, monospace", color: BODY_TEXT, wordBreak: "break-all" }}>{row.before}</div>
                <div style={{ flex: 1, padding: "4px 8px", borderRight: `1px solid ${BORDER_CELL}`, fontFamily: "ui-monospace, SFMono-Regular, monospace", color: BODY_TEXT, wordBreak: "break-all" }}>{row.after}</div>
                <div style={{ flex: "0 0 72px", padding: "4px 8px" }}>
                  {row.typo ? (
                    <span style={{ display: "inline-flex", alignItems: "center", padding: "1px 6px", borderRadius: 3, background: "#fff7e6", border: "1px solid #ffd591", color: "#d46b08", fontSize: 11, lineHeight: "14px" }}>{typoBadge}</span>
                  ) : (
                    <span style={{ color: "#cccccc" }}>—</span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
}

const STATUS_LABELS: Record<RevisionStatus, LocalizedString> = {
  added: { ko: "추가", en: "Added" },
  modified: { ko: "수정", en: "Modified" },
  notice: { ko: "공지", en: "Notice" },
};

const REVISION_HISTORY_ENTRIES: RevisionHistoryEntry[] = [
  {
    status: "added",
    target: "Components > Button > White button",
    change: {
      ko: "`white` variant 추가",
      en: "Added `white` variant",
    },
    date: "2026-05-14",
    href: "?path=/story/components-button--matrix",
  },
  {
    status: "modified",
    target: "Foundation > Color (Seed 팔레트 정리)",
    change: {
      ko: [
        "Seed 팔레트(_seed.css) 변수명에서 중복·불필요한 머리말을 줄여 짧게 사용하도록 정리했습니다.",
        "· `--seed-color-gray-25` → `--gray-25` 처럼 `seed-color-` 머리말 제거",
        "· `--seed-border-radius-radius-unit2` → `--border-radius-unit2` (중복 `radius-` 제거)",
        "· `--seed-border-width-border-width-unit2` → `--border-width-unit2` (중복 `border-width-` 제거)",
        "컬러 가이드라인 마지막에 Seed 탭이 추가되어 raw 팔레트를 직접 확인할 수 있습니다.",
      ].join("\n"),
      en: [
        "Cleaned up duplicate / redundant prefixes in seed palette variable names (_seed.css) so they're shorter to use.",
        "· `--seed-color-gray-25` → `--gray-25` (`seed-color-` prefix dropped)",
        "· `--seed-border-radius-radius-unit2` → `--border-radius-unit2` (duplicate `radius-` removed)",
        "· `--seed-border-width-border-width-unit2` → `--border-width-unit2` (duplicate `border-width-` removed)",
        "Added a new Seed tab at the end of the Color guideline to browse raw palette values.",
      ].join("\n"),
    },
    date: "2026-05-14",
    href: "?path=/story/design-system-foundation-color--guideline",
  },
  {
    status: "notice",
    target: "Components > GNB (기획 미정)",
    change: {
      ko: "GNB 기획 미정. 추후 재수정될 수 있습니다.",
      en: "GNB design not finalized — may be revised later.",
    },
    date: "2026-05-14",
  },
  {
    status: "modified",
    target: "Components > Title > PageTitle (뒤로가기 버튼)",
    change: {
      ko: "PageTitle 2d 의 backButton 을 'Secondary Outline White Invert' 로 변경",
      en: "Changed PageTitle 2d backButton to 'Secondary Outline White Invert'",
    },
    date: "2026-05-14",
    href: "?path=/story/components-title-pagetitle--matrix",
  },
  {
    status: "modified",
    target: "Foundation > Color (토큰명 일괄 정리)",
    change: {
      ko: "소문자로 변경 (피그마 반영 완료)",
      en: "Renamed to lowercase (synced with Figma)",
    },
    date: "2026-05-14",
    details: (locale) => <ColorRenameGrid locale={locale} />,
  },
  {
    status: "added",
    target: "Components > Step (Num · StepItem · Stepper · StepCard)",
    change: {
      ko: "컴포넌트 추가",
      en: "Component added",
    },
    date: "2026-05-14",
    href: "?path=/story/components-step-num--matrix",
  },
  {
    status: "modified",
    target: "Components > Empty",
    change: {
      ko: "Icon color — icon-surface-secondary(#B3B4BC) → icon-surface-readonly(#B3B4BC)",
      en: "Icon color — icon-surface-secondary(#B3B4BC) → icon-surface-readonly(#B3B4BC)",
    },
    date: "2026-05-14",
    href: "?path=/story/components-empty--guideline",
  },
  {
    status: "modified",
    target: "Components > Button > BottomBtnArea",
    change: {
      ko: "Container BG — bg-neutral(#FFFFFF) → bg-surface-base(#FFFFFF)",
      en: "Container BG — bg-neutral(#FFFFFF) → bg-surface-base(#FFFFFF)",
    },
    date: "2026-05-14",
    href: "?path=/story/components-button-bottombtnarea--guideline",
  },
  {
    status: "modified",
    target: "Components > Button > Primary Outline · Secondary Outline",
    change: {
      ko: "BG — bg-surface-white(#FFFFFF) → bg-surface-base(#FFFFFF)",
      en: "BG — bg-surface-white(#FFFFFF) → bg-surface-base(#FFFFFF)",
    },
    date: "2026-05-14",
    href: "?path=/story/components-button--guideline",
  },
  {
    status: "modified",
    target: "Components > Button > Primary 2 Solid",
    change: {
      ko: [
        "Primary 2 컴포넌트 컬러 수정",
        "BG default — bg-primary-secondary(#B2FBED) → on-primary(#3F9BAE)",
        "BG hover — opacity-accent-primary300-45(#43C6C1·45%) → on-primary-hover(#28738C)",
        "BG disabled — bg-primary-disabled(#D5F2F1) → on-primary-disabled(#8BC5C3)",
        "FG default — on-neutral-base(#141518) → on-suface-white(#FFFFFF)",
        "FG disabled — on-surface → on-suface-invert(#F4F4F5)",
      ].join("\n"),
      en: [
        "Primary 2 component color update",
        "BG default — bg-primary-secondary(#B2FBED) → on-primary(#3F9BAE)",
        "BG hover — opacity-accent-primary300-45(#43C6C1·45%) → on-primary-hover(#28738C)",
        "BG disabled — bg-primary-disabled(#D5F2F1) → on-primary-disabled(#8BC5C3)",
        "FG default — on-neutral-base(#141518) → on-suface-white(#FFFFFF)",
        "FG disabled — on-surface → on-suface-invert(#F4F4F5)",
      ].join("\n"),
    },
    date: "2026-05-14",
    href: "?path=/story/components-button--guideline",
  },
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
  target: 360,
  change: 760,
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
  minHeight: 32,
  padding: "8px 12px",
  background: "#fff",
  borderBottom: `1px solid ${BORDER_CELL}`,
  borderRight: `1px solid ${BORDER_CELL}`,
  fontFamily: "var(--font-family-korean)",
  fontSize: 13,
  fontWeight: 400,
  lineHeight: "18px",
  color: BODY_TEXT,
  boxSizing: "border-box",
  whiteSpace: "normal",
  wordBreak: "break-word",
};

/* ---- 상태 배지 (추가 / 수정) ---- */
function StatusBadge({ status, locale }: { status: RevisionStatus; locale: "ko" | "en" }) {
  const palette =
    status === "added"
      ? { bg: "#deeaff", border: "#c2d8ff", text: "#0050d9" }
      : status === "notice"
      ? { bg: "#fff4d6", border: "#ffd980", text: "#995608" }
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
                  whiteSpace: "pre-line",
                  alignItems: "flex-start",
                  flexDirection: "column",
                  gap: row.details ? 12 : 0,
                }}
              >
                <div style={{ width: "100%", whiteSpace: "pre-line" }}>{row.change[locale]}</div>
                {row.details ? (
                  <div style={{ width: "100%" }}>{row.details(locale)}</div>
                ) : null}
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
