import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import type { CSSProperties, ReactNode } from "react";

import typographyCssRaw from "@/commons/constants/css/typography.css?raw";
import { Badge } from "@/components/badge/badge";
import { StoryDocsPage } from "@/stories/story-docs-shell";

import { DownloadButton } from "./foundation-shared";

import {
  ALL_ROWS,
  BODY_ROWS,
  HEADLINE_ROWS,
  WEIGHT_CARDS,
  WEIGHT_LABEL,
  WEIGHT_VALUE,
  type TypographyRow,
  type WeightKey,
} from "./typography-data";

/* -----------------------------------------------------------
 *  Meta — single page (no autodocs, no Default/Matrix)
 * ----------------------------------------------------------- */
const meta: Meta = {
  title: "Design System/Foundation/Typography",
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
 *  Layout constants — Figma-faithful column widths (Usage 제거)
 *  category 160 / type 460 / weight 230 / size 230 / line-height 230 = 1310
 * ----------------------------------------------------------- */
const COLUMN_WIDTHS = {
  category: 160,
  type: 400,
  weight: 200,
  size: 180,
  lineHeight: 180,
  letterSpacing: 180,
} as const;

const TABLE_WIDTH =
  COLUMN_WIDTHS.category +
  COLUMN_WIDTHS.type +
  COLUMN_WIDTHS.weight +
  COLUMN_WIDTHS.size +
  COLUMN_WIDTHS.lineHeight +
  COLUMN_WIDTHS.letterSpacing;

/** Figma % → CSS px 환산 (e.g. "-0.4%", 13 → "-0.052px") */
function toLetterSpacingPx(pct: string, sizePx: number): string {
  const val = (parseFloat(pct) / 100) * sizePx;
  return `${val.toFixed(3)}px`;
}

const tokens = {
  borderColor: "var(--context-border-neutral-border-base)",
  surface: "var(--context-background-surface-bg-surface-base)",
  surfaceMuted: "var(--context-background-neutral-bg-neutral-secondary)",
  textBase: "var(--context-foreground-surface-on-surface-base)",
  textMuted: "var(--context-foreground-surface-on-surface)",
  textSubtle: "var(--context-foreground-surface-on-surface-secondary)",
} as const;

const headerCellStyle: CSSProperties = {
  padding: "0 20px",
  height: 40,
  display: "flex",
  alignItems: "center",
  fontSize: 14,
  fontWeight: 600,
  color: tokens.textBase,
  background: tokens.surfaceMuted,
};

const dataCellStyle: CSSProperties = {
  padding: "0 20px",
  minHeight: 60,
  display: "flex",
  alignItems: "center",
  fontSize: 13,
  color: tokens.textBase,
  borderTop: `1px solid ${tokens.borderColor}`,
};

/* -----------------------------------------------------------
 *  Section header (title + downloadable hint)
 * ----------------------------------------------------------- */
function SectionTitle({
  index,
  title,
  description,
  action,
}: {
  index?: string;
  title: string;
  description?: ReactNode;
  action?: ReactNode;
}) {
  return (
    <header
      style={{
        display: "flex",
        alignItems: "flex-end",
        justifyContent: "space-between",
        gap: 24,
        marginBottom: 24,
      }}
    >
      <div>
        {index ? (
          <span
            style={{
              display: "inline-block",
              fontSize: 12,
              letterSpacing: 1.4,
              color: tokens.textSubtle,
              marginBottom: 6,
            }}
          >
            {index}
          </span>
        ) : null}
        <h2
          style={{
            margin: 0,
            fontSize: 24,
            fontWeight: 700,
            color: tokens.textBase,
            lineHeight: 1.25,
          }}
        >
          {title}
        </h2>
        {description ? (
          <p
            style={{
              margin: "8px 0 0",
              fontSize: 13,
              color: tokens.textMuted,
              maxWidth: 720,
              lineHeight: 1.6,
            }}
          >
            {description}
          </p>
        ) : null}
      </div>
      {action ? <div>{action}</div> : null}
    </header>
  );
}

/* -----------------------------------------------------------
 *  Font Weight cards
 * ----------------------------------------------------------- */
function WeightCards() {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(4, 1fr)",
        gap: 24,
      }}
    >
      {WEIGHT_CARDS.map((card) => (
        <div
          key={card.id}
          style={{
            padding: 24,
            background: tokens.surface,
            border: `1px solid ${tokens.borderColor}`,
            borderRadius: "var(--radius-lg)",
            display: "flex",
            flexDirection: "column",
            gap: 12,
            minHeight: 138,
          }}
        >
          <span
            style={{
              fontSize: 18,
              fontWeight: WEIGHT_VALUE[card.id],
              color: tokens.textBase,
            }}
          >
            {card.title}
          </span>
          <span
            style={{
              fontSize: 13,
              color: tokens.textMuted,
              lineHeight: 1.5,
            }}
          >
            {card.description}
          </span>
        </div>
      ))}
    </div>
  );
}

/* -----------------------------------------------------------
 *  Reusable typography table
 * ----------------------------------------------------------- */
function TypographyTable({
  category,
  rows,
}: {
  category: "Headline" | "Body";
  rows: TypographyRow[];
}) {
  return (
    <div
      style={{
        width: "100%",
        maxWidth: TABLE_WIDTH,
        border: `1px solid ${tokens.borderColor}`,
        borderRadius: "var(--radius-md)",
        overflow: "hidden",
      }}
    >
      {/* Header row */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: `${COLUMN_WIDTHS.category}px 1fr ${COLUMN_WIDTHS.weight}px ${COLUMN_WIDTHS.size}px ${COLUMN_WIDTHS.lineHeight}px ${COLUMN_WIDTHS.letterSpacing}px`,
          background: tokens.surfaceMuted,
        }}
      >
        <div style={headerCellStyle}>Type</div>
        <div style={headerCellStyle}>Type</div>
        <div style={headerCellStyle}>Weight</div>
        <div style={headerCellStyle}>Size</div>
        <div style={headerCellStyle}>Line Height</div>
        <div style={headerCellStyle}>Letter Spacing</div>
      </div>

      {/* Body */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: `${COLUMN_WIDTHS.category}px 1fr`,
        }}
      >
        {/* Left category cell — spans all rows */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-start",
            padding: "0 20px",
            borderTop: `1px solid ${tokens.borderColor}`,
            background: tokens.surface,
            fontSize: 16,
            fontWeight: 600,
            color: tokens.textBase,
          }}
        >
          {category}
        </div>

        <div>
          {rows.map((row, idx) => {
            const isStandard = Boolean(row.standard);
            const rowSurface = isStandard
              ? "var(--context-background-primary-bg-primary-secondary)"
              : tokens.surface;
            const cellBorderTop =
              idx === 0 ? "none" : (`1px solid ${tokens.borderColor}` as const);
            return (
              <div
                key={row.className}
                style={{
                  display: "grid",
                  gridTemplateColumns: `1fr ${COLUMN_WIDTHS.weight}px ${COLUMN_WIDTHS.size}px ${COLUMN_WIDTHS.lineHeight}px ${COLUMN_WIDTHS.letterSpacing}px`,
                  background: rowSurface,
                  borderTop:
                    idx === 0 ? `1px solid ${tokens.borderColor}` : undefined,
                  boxShadow: isStandard
                    ? "inset 3px 0 0 var(--context-background-primary-bg-primary)"
                    : undefined,
                }}
              >
                <div
                  style={{
                    ...dataCellStyle,
                    borderTop: cellBorderTop,
                    fontSize: row.sizePx,
                    fontWeight: WEIGHT_VALUE[row.weight],
                    lineHeight: `${row.lineHeightPx}px`,
                    fontFamily: "var(--font-family-korean)",
                    letterSpacing: row.letterSpacingPct
                      ? toLetterSpacingPx(row.letterSpacingPct, row.sizePx)
                      : undefined,
                  }}
                  title={`font-size:${row.sizePx}px / line-height:${row.lineHeightPx}px${row.letterSpacingPct ? ` / letter-spacing:${row.letterSpacingPct}` : ""}`}
                >
                  <span
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      flexWrap: "wrap",
                      gap: 8,
                    }}
                  >
                    <span>{row.name}</span>
                    {isStandard ? (
                      <Badge variant="solid" color="primary" size="xs" shape="round">
                        Standard
                      </Badge>
                    ) : null}
                  </span>
                </div>
                <div
                  style={{
                    ...dataCellStyle,
                    borderTop: cellBorderTop,
                    color: tokens.textMuted,
                  }}
                >
                  {WEIGHT_LABEL[row.weight as WeightKey]}
                </div>
                <div
                  style={{
                    ...dataCellStyle,
                    borderTop: cellBorderTop,
                    color: tokens.textMuted,
                  }}
                >
                  {row.sizePx}
                </div>
                <div
                  style={{
                    ...dataCellStyle,
                    borderTop: cellBorderTop,
                    color: tokens.textMuted,
                  }}
                >
                  {row.lineHeightPx}
                </div>
                <div
                  style={{
                    ...dataCellStyle,
                    borderTop: cellBorderTop,
                    color: row.letterSpacingPct ? tokens.textBase : tokens.textSubtle,
                    fontWeight: row.letterSpacingPct ? 500 : 400,
                  }}
                >
                  {row.letterSpacingPct ? (
                    <span style={{ display: "flex", flexDirection: "column", gap: 2 }}>
                      <span>{row.letterSpacingPct}</span>
                      <span style={{ fontSize: 11, color: tokens.textSubtle, fontWeight: 400 }}>
                        {toLetterSpacingPx(row.letterSpacingPct, row.sizePx)}
                      </span>
                    </span>
                  ) : "—"}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

/* -----------------------------------------------------------
 *  Page composition (single Guideline story)
 * ----------------------------------------------------------- */
const TYPO_MESSAGES = {
  ko: {
    description: "폰트 웨이트·Headline·Body 스케일과 typography.css 클래스 레퍼런스입니다.",
    headlineDesc: "페이지·콘텐츠·카드 등 위계의 ‘제목’ 영역에 사용합니다.",
    bodyDesc: "본문·라벨·힌트 등 일반 텍스트에 사용합니다.",
    footer: (n: number) => `총 ${n}개 typography 클래스 · 다운로드 버튼은 `,
    footerSuffix: "원본을 그대로 내려줍니다.",
  },
  en: {
    description:
      "Reference for font weights, Headline / Body scales, and typography.css classes.",
    headlineDesc:
      "Used for hierarchical heading areas such as page, content, and card titles.",
    bodyDesc:
      "Used for body text, labels, hints, and other general text.",
    footer: (n: number) => `${n} typography classes in total · The download button serves `,
    footerSuffix: "as the original.",
  },
} as const;

export const Guideline: Story = {
  name: "Guideline",
  render: (_args, ctx) => {
    const locale = (ctx.globals?.locale as "ko" | "en") === "en" ? "en" : "ko";
    const m = TYPO_MESSAGES[locale];
    return (
    <StoryDocsPage
      eyebrow="Design System"
      title="Typography"
      description={m.description}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 64,
        }}
      >
      <SectionTitle index="01 — FONT WEIGHT" title="Font weight" />
      <div style={{ marginTop: -32 }}>
        <WeightCards />
      </div>

      <div>
        <SectionTitle
          index="02 — HEADLINE"
          title="Headline"
          description={m.headlineDesc}
          action={<DownloadButton fileName="typography.css" css={typographyCssRaw} />}
        />
        <TypographyTable category="Headline" rows={HEADLINE_ROWS} />
      </div>

      <div>
        <SectionTitle
          index="03 — BODY"
          title="Body"
          description={m.bodyDesc}
        />
        <TypographyTable category="Body" rows={BODY_ROWS} />
      </div>

      <footer
        style={{
          fontSize: 12,
          color: tokens.textSubtle,
          borderTop: `1px solid ${tokens.borderColor}`,
          paddingTop: 16,
        }}
      >
        {m.footer(ALL_ROWS.length)}
        <code>src/commons/constants/css/typography.css</code> {m.footerSuffix}
      </footer>
      </div>
    </StoryDocsPage>
    );
  },
};
