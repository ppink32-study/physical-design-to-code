import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import type { CSSProperties, ReactNode } from "react";

import { StoryDocsPage } from "@/stories/story-docs-shell";

/* -----------------------------------------------------------
 *  i18n — ko / en (Storybook 상단 언어 토글에서 globals.locale 로 전환)
 * ----------------------------------------------------------- */
type Locale = "ko" | "en";

type Messages = {
  eyebrow: string;
  title: string;
  description: string;
  section01: { index: string; title: string; description: string };
  section02: { index: string; title: string; description: string };
  section03: { index: string; title: string; description: string };
  env: {
    device: { label: string; value: string };
    resolution: { label: string; value: string };
    principle: { label: string; value: string };
  };
  layouts: Array<{ label: string; title: string; purpose: string }>;
  spec: {
    pageWidth: string;
    contentWidth: string;
    withoutLnb: string;
    withLnb: string;
    sideMargin: string;
    lnbArea: string;
    approx: string;
    purpose: string;
    structure: string;
    contentsLabel: string;
  };
  responsive: {
    responseMethod: { label: string; value: string };
    safeArea: { label: string; note: string };
  };
  footer: (n: number) => string;
};

const MESSAGES: Record<Locale, Messages> = {
  ko: {
    eyebrow: "Design System",
    title: "Resolution & Layout System",
    description:
      "PC Web 기준 1920 × 1080 해상도와 정보 밀도·작업 유형에 따른 3가지 레이아웃 구조 가이드입니다.",
    section01: {
      index: "01 — ENVIRONMENT",
      title: "기본 환경",
      description: "대상 디바이스와 기준 해상도, 레이아웃 적용 원칙입니다.",
    },
    section02: {
      index: "02 — LAYOUT TYPES",
      title: "Layout Types",
      description:
        "정보 밀도와 사용자 작업 유형에 따라 3가지 레이아웃 구조를 정의합니다.",
    },
    section03: {
      index: "03 — RESPONSIVE MARGIN RULE",
      title: "Responsive Margin Rule",
      description:
        "레이아웃은 해상도에 따라 유동적으로 대응하며, 모든 화면에서 최소 24px의 좌우 안전 여백(safe area)을 유지합니다.",
    },
    env: {
      device: { label: "대상 디바이스", value: "PC Web" },
      resolution: { label: "기준 해상도", value: "1920 × 1080" },
      principle: {
        label: "원칙",
        value:
          "정보 밀도와 사용자 작업 유형에 따라 레이아웃 구조를 다르게 적용합니다.",
      },
    },
    layouts: [
      {
        label: "Dashboard, Setting",
        title: "Dashboard / Setting Layout",
        purpose:
          "대시보드, 모니터링, 분석, 설정 등 높은 정보 밀도를 가진 화면에 사용합니다.",
      },
      {
        label: "List",
        title: "List Layout",
        purpose: "목록, 검색 결과, 필터, 탐색 중심의 화면에 사용합니다.",
      },
      {
        label: "Step",
        title: "Step Layout",
        purpose:
          "단계형 작업, 생성 플로우, 설정 프로세스 등 작업 중심 화면에 사용합니다.",
      },
    ],
    spec: {
      pageWidth: "전체 화면 기준 폭",
      contentWidth: "콘텐츠 영역 폭",
      withoutLnb: "LNB 미포함 시",
      withLnb: "LNB 포함 시",
      sideMargin: "좌우 여백",
      lnbArea: "LNB 영역",
      approx: "약",
      purpose: "목적",
      structure: "구조",
      contentsLabel: "contents",
    },
    responsive: {
      responseMethod: {
        label: "대응 방식",
        value: "해상도에 따라 유동적으로 대응",
      },
      safeArea: { label: "Safe Area", note: "좌·우 안전 여백" },
    },
    footer: (n: number) => `PC Web · 1920 × 1080 기준 · 총 ${n}개 레이아웃 타입`,
  },
  en: {
    eyebrow: "Design System",
    title: "Resolution & Layout System",
    description:
      "Guidelines for the 1920 × 1080 PC Web baseline resolution and three layout structures based on information density and task type.",
    section01: {
      index: "01 — ENVIRONMENT",
      title: "Baseline Environment",
      description:
        "Target device, baseline resolution, and principles for applying the layout system.",
    },
    section02: {
      index: "02 — LAYOUT TYPES",
      title: "Layout Types",
      description:
        "Three layout structures defined according to information density and user task type.",
    },
    section03: {
      index: "03 — RESPONSIVE MARGIN RULE",
      title: "Responsive Margin Rule",
      description:
        "Layouts respond fluidly to viewport changes while always maintaining a minimum 24px safe area on the left and right.",
    },
    env: {
      device: { label: "Target device", value: "PC Web" },
      resolution: { label: "Baseline resolution", value: "1920 × 1080" },
      principle: {
        label: "Principle",
        value:
          "Apply different layout structures depending on information density and user task type.",
      },
    },
    layouts: [
      {
        label: "Dashboard, Setting",
        title: "Dashboard / Setting Layout",
        purpose:
          "Used for screens with high information density such as dashboards, monitoring, analytics, and settings.",
      },
      {
        label: "List",
        title: "List Layout",
        purpose:
          "Used for list, search, filter, and navigation-focused screens.",
      },
      {
        label: "Step",
        title: "Step Layout",
        purpose:
          "Used for task-oriented screens such as stepwise workflows, creation flows, and setting processes.",
      },
    ],
    spec: {
      pageWidth: "Full screen width",
      contentWidth: "Content area width",
      withoutLnb: "Without LNB",
      withLnb: "With LNB",
      sideMargin: "Side margin",
      lnbArea: "LNB area",
      approx: "approx.",
      purpose: "Purpose",
      structure: "Structure",
      contentsLabel: "contents",
    },
    responsive: {
      responseMethod: {
        label: "Response method",
        value: "Responds fluidly to viewport changes",
      },
      safeArea: { label: "Safe Area", note: "Left/right safe area" },
    },
    footer: (n: number) =>
      `PC Web · 1920 × 1080 baseline · ${n} layout types in total`,
  },
};

/* -----------------------------------------------------------
 *  Meta — single Guideline page (Color/Typography 와 동일 패턴)
 * ----------------------------------------------------------- */
const meta: Meta = {
  title: "Design System/Foundation/Layout",
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
 *  Shared design tokens (Typography/Color 와 동일)
 * ----------------------------------------------------------- */
const tokens = {
  borderColor: "var(--context-border-neutral-border-base)",
  /** Figma 36:25219 테이블 전용 — border-surface-secondary (#ECECEE) */
  cellBorder: "var(--border-surface-secondary)",
  /** Figma 36:25219 테이블 헤더 셀 bg (#F4F4F5) */
  cellHeaderBg: "var(--bg-surface-secondary)",
  surface: "var(--bg-surface-base)",
  surfaceMuted: "var(--bg-neutral-secondary)",
  textBase: "var(--on-surface-base)",
  textMuted: "var(--on-surface)",
  textSubtle: "var(--on-surface-secondary)",
  accentRed: "#f13e3e",
  accentGray: "#636b74",
} as const;

/* -----------------------------------------------------------
 *  InfoTable — Figma 36:25219 패턴 (헤더 200px / 값 셀 / 40px / 6px 라운드)
 *  모든 셀에 border-bottom + border-right (외곽 overflow:hidden 으로 가장자리 정리)
 * ----------------------------------------------------------- */
function InfoTable({
  rows,
  headerWidth = 200,
}: {
  rows: Array<{ label: string; value: ReactNode }>;
  headerWidth?: number;
}) {
  const headerCellStyle: CSSProperties = {
    width: headerWidth,
    minHeight: 40,
    display: "flex",
    alignItems: "center",
    padding: "0 12px",
    background: tokens.cellHeaderBg,
    borderBottom: `1px solid ${tokens.cellBorder}`,
    borderRight: `1px solid ${tokens.cellBorder}`,
    fontFamily: "var(--font-family-korean)",
    fontSize: 13,
    fontWeight: 600,
    lineHeight: "20px",
    letterSpacing: "-0.052px",
    color: tokens.textBase,
    boxSizing: "border-box",
  };

  const valueCellStyle: CSSProperties = {
    flex: "1 0 0",
    minWidth: 0,
    minHeight: 40,
    display: "flex",
    alignItems: "center",
    padding: "10px 12px",
    background: tokens.surface,
    borderBottom: `1px solid ${tokens.cellBorder}`,
    fontFamily: "var(--font-family-korean)",
    fontSize: 13,
    fontWeight: 400,
    lineHeight: "20px",
    letterSpacing: "-0.052px",
    color: tokens.textBase,
    boxSizing: "border-box",
  };

  return (
    <div
      style={{
        border: `1px solid ${tokens.cellBorder}`,
        borderRadius: 6,
        overflow: "hidden",
        background: tokens.surface,
      }}
    >
      {rows.map((row, idx) => {
        const isLast = idx === rows.length - 1;
        return (
          <div key={`${row.label}-${idx}`} style={{ display: "flex", alignItems: "stretch" }}>
            <div
              style={{
                ...headerCellStyle,
                borderBottom: isLast ? "none" : headerCellStyle.borderBottom,
              }}
            >
              {row.label}
            </div>
            <div
              style={{
                ...valueCellStyle,
                borderBottom: isLast ? "none" : valueCellStyle.borderBottom,
              }}
            >
              {row.value}
            </div>
          </div>
        );
      })}
    </div>
  );
}

/* -----------------------------------------------------------
 *  SectionTitle — Typography/Color 와 동일 헤더
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
        flexWrap: "wrap",
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
 *  기본 환경 — InfoTable
 * ----------------------------------------------------------- */
function EnvironmentBlock({ locale }: { locale: Locale }) {
  const m = MESSAGES[locale];
  return (
    <InfoTable
      rows={[
        { label: m.env.device.label, value: m.env.device.value },
        { label: m.env.resolution.label, value: m.env.resolution.value },
        { label: m.env.principle.label, value: m.env.principle.value },
      ]}
    />
  );
}

/* -----------------------------------------------------------
 *  LayoutTypeCard — Pill label + Wireframe + 측정 라벨 + Spec
 * ----------------------------------------------------------- */
type LayoutSpec = {
  index: string;
  pageWidth: number;
  contentWidth: number | { withLnb: number; withoutLnb: number };
  sideMargin: number;
  lnbWidth?: number;
  /** Wireframe 시각화 — 좌여백 + (옵션) LNB + (옵션) LNB-콘텐츠 gap + 콘텐츠 + 우여백 = pageWidth */
  geometry: {
    leftMargin: number;
    lnb: number;
    /** LNB 와 콘텐츠 사이 간격 (Dashboard 만 24px) */
    gap: number;
    content: number;
    rightMargin: number;
  };
};

/** 숫자/구조 데이터는 locale 과 무관 — 텍스트만 MESSAGES.layouts 에서 가져옴 */
const LAYOUTS: LayoutSpec[] = [
  {
    index: "01",
    pageWidth: 1920,
    contentWidth: { withLnb: 1612, withoutLnb: 1872 },
    sideMargin: 24,
    lnbWidth: 260,
    // LNB(260) + gap(24) + content(1612) + rightMargin(24) = 1920
    geometry: {
      leftMargin: 0,
      lnb: 260,
      gap: 24,
      content: 1612,
      rightMargin: 24,
    },
  },
  {
    index: "02",
    pageWidth: 1920,
    contentWidth: 1440,
    sideMargin: 240,
    geometry: {
      leftMargin: 240,
      lnb: 0,
      gap: 0,
      content: 1440,
      rightMargin: 240,
    },
  },
  {
    index: "03",
    pageWidth: 1920,
    contentWidth: 1600,
    sideMargin: 160,
    geometry: {
      leftMargin: 160,
      lnb: 0,
      gap: 0,
      content: 1600,
      rightMargin: 160,
    },
  },
];

/* 측정 라벨 (badge) 공통 스타일 */
const dimBadgeBase: CSSProperties = {
  position: "absolute",
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  padding: "2px 4px",
  borderRadius: 2,
  fontFamily: "var(--font-family-korean)",
  fontSize: 11,
  fontWeight: 400,
  lineHeight: 1,
  letterSpacing: "-0.3px",
  color: "#fff",
  whiteSpace: "nowrap",
  zIndex: 2,
};

/** 시각화 상수 — wireframe 은 1920 × 960 비율로 그림 */
const WIRE_HEIGHT = 960;
const GNB_HEIGHT = 56;
const GNB_PCT = (GNB_HEIGHT / WIRE_HEIGHT) * 100;

function Wireframe({ spec, locale }: { spec: LayoutSpec; locale: Locale }) {
  const m = MESSAGES[locale];
  // 시각적 비율은 1920 폭에 대한 백분율로 계산
  const total = spec.pageWidth;
  const leftPct = (spec.geometry.leftMargin / total) * 100;
  const lnbPct = (spec.geometry.lnb / total) * 100;
  const gapPct = (spec.geometry.gap / total) * 100;
  const contentPct = (spec.geometry.content / total) * 100;
  const rightPct = (spec.geometry.rightMargin / total) * 100;
  const hasLnb = Boolean(spec.lnbWidth);
  const hasLeftMargin = spec.geometry.leftMargin > 0;
  const hasGap = spec.geometry.gap > 0;
  const contentDisplay =
    typeof spec.contentWidth === "number"
      ? spec.contentWidth
      : spec.contentWidth.withLnb;

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        aspectRatio: "1920 / 960",
        padding: "20px 0 30px",
        boxSizing: "border-box",
      }}
    >
      {/* 상단 전체 폭 (1920px) */}
      <span
        style={{
          ...dimBadgeBase,
          top: 0,
          left: "50%",
          transform: "translateX(-50%)",
          background: tokens.accentRed,
        }}
      >
        {spec.pageWidth}px
      </span>

      {/* 좌측 높이 (960px) */}
      <span
        style={{
          ...dimBadgeBase,
          top: "50%",
          left: -8,
          transform: "translate(-50%, -50%) rotate(-90deg)",
          transformOrigin: "center",
          background: tokens.accentRed,
        }}
      >
        960px
      </span>


      {/* Wireframe Body — absolute layered (GNB top + LNB full-height + content/margins) */}
      <div
        style={{
          position: "relative",
          width: "100%",
          height: "100%",
          background: "#eee",
          border: `1px solid #ddd`,
          boxSizing: "border-box",
          overflow: "visible",
        }}
      >
        {/* 좌측 여백 점선 (leftMargin > 0 일 때만, GNB 아래만) */}
        {hasLeftMargin ? (
          <div
            style={{
              position: "absolute",
              top: `${GNB_PCT}%`,
              bottom: 0,
              left: 0,
              width: `${leftPct}%`,
              borderRight: `1px dashed ${tokens.accentGray}`,
              boxSizing: "border-box",
              zIndex: 1,
            }}
          />
        ) : null}

        {/* LNB — 전체 높이 (GNB 영역까지 채움) */}
        {hasLnb ? (
          <div
            style={{
              position: "absolute",
              top: 0,
              bottom: 0,
              left: `${leftPct}%`,
              width: `${lnbPct}%`,
              background: tokens.surface,
              padding: `calc(${GNB_PCT}% + 12px) 14px 0`,
              boxSizing: "border-box",
              zIndex: 3,
              display: "flex",
              flexDirection: "column",
              gap: 8,
            }}
          >
            {Array.from({ length: 7 }).map((_, i) => (
              <span
                key={i}
                style={{
                  display: "block",
                  height: 9,
                  width: "100%",
                  background: "#ddd",
                  borderRadius: 2,
                  flexShrink: 0,
                }}
              />
            ))}
            <span
              style={{
                display: "block",
                height: 9,
                width: "100%",
                background: "#ddd",
                borderRadius: 2,
                flexShrink: 0,
                marginTop: "auto",
              }}
            />
          </div>
        ) : null}

        {/* GNB — LNB 우측부터 끝까지 (LNB 없으면 전체 폭) */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: `${leftPct + lnbPct}%`,
            right: 0,
            height: `${GNB_PCT}%`,
            background: tokens.surface,
            borderBottom: `1px solid #ddd`,
            boxSizing: "border-box",
            zIndex: 2,
          }}
        />

        {/* GNB 56px 라벨 — 우측 외곽, 세로 회전 */}
        <span
          style={{
            ...dimBadgeBase,
            top: `${GNB_PCT / 2}%`,
            right: -8,
            transform: "translate(50%, -50%) rotate(-90deg)",
            transformOrigin: "center",
            background: tokens.accentRed,
            zIndex: 5,
          }}
        >
          56px
        </span>

        {/* LNB ↔ 콘텐츠 gap 점선 (GNB 아래만) */}
        {hasGap ? (
          <div
            style={{
              position: "absolute",
              top: `${GNB_PCT}%`,
              bottom: 0,
              left: `${leftPct + lnbPct}%`,
              width: `${gapPct}%`,
              borderLeft: `1px dashed ${tokens.accentGray}`,
              borderRight: `1px dashed ${tokens.accentGray}`,
              boxSizing: "border-box",
              zIndex: 1,
            }}
          />
        ) : null}

        {/* Content area — 12-col 빨강 grid (GNB 아래) */}
        <div
          style={{
            position: "absolute",
            top: `${GNB_PCT}%`,
            bottom: 0,
            left: `${leftPct + lnbPct + gapPct}%`,
            width: `${contentPct}%`,
            display: "flex",
            alignItems: "stretch",
            gap: 4,
            padding: "0 6px",
            boxSizing: "border-box",
            background: tokens.surface,
            zIndex: 1,
          }}
        >
          {Array.from({ length: 12 }).map((_, i) => (
            <span
              key={i}
              style={{
                flex: "1 0 0",
                minWidth: 0,
                background: "rgba(255, 0, 0, 0.1)",
              }}
            />
          ))}
        </div>

        {/* 우측 여백 점선 (GNB 아래만) */}
        <div
          style={{
            position: "absolute",
            top: `${GNB_PCT}%`,
            bottom: 0,
            right: 0,
            width: `${rightPct}%`,
            borderLeft: `1px dashed ${tokens.accentGray}`,
            boxSizing: "border-box",
            zIndex: 1,
          }}
        />
      </div>

      {/* 하단 라벨: (좌여백) → (LNB) → (gap) → 콘텐츠 → 우여백 */}
      {hasLeftMargin ? (
        <span
          style={{
            ...dimBadgeBase,
            bottom: 8,
            left: `${leftPct / 2}%`,
            transform: "translateX(-50%)",
            background: tokens.accentGray,
          }}
        >
          {spec.geometry.leftMargin}px
        </span>
      ) : null}

      {hasLnb ? (
        <span
          style={{
            ...dimBadgeBase,
            bottom: 8,
            left: `${leftPct + lnbPct / 2}%`,
            transform: "translateX(-50%)",
            background: tokens.accentGray,
          }}
        >
          {spec.lnbWidth}px
        </span>
      ) : null}

      {hasGap ? (
        <span
          style={{
            ...dimBadgeBase,
            bottom: 8,
            left: `${leftPct + lnbPct + gapPct / 2}%`,
            transform: "translateX(-50%)",
            background: tokens.accentGray,
          }}
        >
          {spec.geometry.gap}px
        </span>
      ) : null}

      <span
        style={{
          ...dimBadgeBase,
          bottom: 8,
          left: `${leftPct + lnbPct + gapPct + contentPct / 2}%`,
          transform: "translateX(-50%)",
          background: tokens.accentRed,
        }}
      >
        {m.spec.contentsLabel} w={contentDisplay}px
      </span>

      <span
        style={{
          ...dimBadgeBase,
          bottom: 8,
          left: `${leftPct + lnbPct + gapPct + contentPct + rightPct / 2}%`,
          transform: "translateX(-50%)",
          background: tokens.accentGray,
        }}
      >
        {spec.geometry.rightMargin}px
      </span>
    </div>
  );
}

function SpecTable({ spec, locale }: { spec: LayoutSpec; locale: Locale }) {
  const m = MESSAGES[locale];
  const rows: Array<{ label: string; value: ReactNode }> = [
    { label: m.spec.pageWidth, value: `${spec.pageWidth}px` },
    {
      label: m.spec.contentWidth,
      value:
        typeof spec.contentWidth === "number" ? (
          `${spec.contentWidth}px`
        ) : (
          <span style={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <span>{m.spec.withoutLnb} : {spec.contentWidth.withoutLnb}px</span>
            <span>{m.spec.withLnb} : {spec.contentWidth.withLnb}px</span>
          </span>
        ),
    },
    { label: m.spec.sideMargin, value: `${spec.sideMargin}px` },
    ...(spec.lnbWidth
      ? [{ label: m.spec.lnbArea, value: `${m.spec.approx} ${spec.lnbWidth}px` }]
      : []),
  ];
  return <InfoTable rows={rows} headerWidth={200} />;
}

function LayoutTypeCard({
  spec,
  locale,
  layoutText,
}: {
  spec: LayoutSpec;
  locale: Locale;
  layoutText: { label: string; title: string; purpose: string };
}) {
  const m = MESSAGES[locale];
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 24,
        padding: 32,
        background: tokens.surface,
        border: `1px solid ${tokens.borderColor}`,
        borderRadius: "var(--radius-lg)",
      }}
    >
      {/* Pill + Title + 목적 */}
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        <span
          style={{
            display: "inline-flex",
            alignSelf: "flex-start",
            padding: "6px 12px",
            borderRadius: 6,
            background: "#f6f6f6",
            color: "#4e4e4e",
            fontSize: 13,
            fontWeight: 500,
            lineHeight: 1.4,
          }}
        >
          {layoutText.label}
        </span>
        <h3
          style={{
            margin: 0,
            fontSize: 18,
            fontWeight: 700,
            color: tokens.textBase,
            lineHeight: 1.4,
          }}
        >
          {spec.index}. {layoutText.title}
        </h3>
        <div>
          <p
            style={{
              margin: 0,
              fontSize: 13,
              fontWeight: 600,
              color: tokens.textBase,
              marginBottom: 4,
            }}
          >
            {m.spec.purpose}
          </p>
          <p
            style={{
              margin: 0,
              fontSize: 14,
              lineHeight: 1.65,
              color: tokens.textMuted,
            }}
          >
            {layoutText.purpose}
          </p>
        </div>
      </div>

      {/* Wireframe */}
      <Wireframe spec={spec} locale={locale} />

      {/* 구조 표 */}
      <div>
        <p
          style={{
            margin: "0 0 8px",
            fontSize: 13,
            fontWeight: 600,
            color: tokens.textBase,
          }}
        >
          {m.spec.structure}
        </p>
        <SpecTable spec={spec} locale={locale} />
      </div>
    </div>
  );
}

/* -----------------------------------------------------------
 *  Page composition — globals.locale 로 언어 분기
 * ----------------------------------------------------------- */
function GuidelineBody({ locale }: { locale: Locale }) {
  const m = MESSAGES[locale];
  return (
    <StoryDocsPage
      eyebrow={m.eyebrow}
      title={m.title}
      description={m.description}
      pageMaxWidth={1280}
    >
      <div style={{ display: "flex", flexDirection: "column", gap: 64 }}>
        {/* 01 — Environment */}
        <div>
          <SectionTitle
            index={m.section01.index}
            title={m.section01.title}
            description={m.section01.description}
          />
          <EnvironmentBlock locale={locale} />
        </div>

        {/* 02 — Layout Types */}
        <div>
          <SectionTitle
            index={m.section02.index}
            title={m.section02.title}
            description={m.section02.description}
          />
          <div style={{ display: "flex", flexDirection: "column", gap: 40 }}>
            {LAYOUTS.map((spec, i) => (
              <LayoutTypeCard
                key={spec.index}
                spec={spec}
                locale={locale}
                layoutText={m.layouts[i]}
              />
            ))}
          </div>
        </div>

        {/* 03 — Responsive Margin Rule */}
        <div>
          <SectionTitle
            index={m.section03.index}
            title={m.section03.title}
            description={m.section03.description}
          />
          <InfoTable
            rows={[
              {
                label: m.responsive.responseMethod.label,
                value: m.responsive.responseMethod.value,
              },
              {
                label: m.responsive.safeArea.label,
                value: (
                  <span style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
                    <code
                      style={{
                        fontFamily:
                          "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
                        fontSize: 13,
                        padding: "2px 6px",
                        borderRadius: 4,
                        background: tokens.cellHeaderBg,
                        color: tokens.textBase,
                      }}
                    >
                      min 24px
                    </code>
                    <span>{m.responsive.safeArea.note}</span>
                  </span>
                ),
              },
            ]}
          />
        </div>

        <footer
          style={{
            fontSize: 12,
            color: tokens.textSubtle,
            borderTop: `1px solid ${tokens.borderColor}`,
            paddingTop: 16,
          }}
        >
          {m.footer(LAYOUTS.length)}
        </footer>
      </div>
    </StoryDocsPage>
  );
}

export const Guideline: Story = {
  name: "Guideline",
  render: (_args, ctx) => {
    const locale: Locale = (ctx.globals?.locale as Locale) === "en" ? "en" : "ko";
    return <GuidelineBody locale={locale} />;
  },
};
