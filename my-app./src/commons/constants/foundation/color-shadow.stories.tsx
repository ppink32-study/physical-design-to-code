import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import type { CSSProperties, ReactNode } from "react";
import { useState } from "react";

import lightCssRaw    from "@/commons/constants/css/light.css?raw";
import darkCssRaw     from "@/commons/constants/css/dark.css?raw";
import brandCssRaw    from "@/commons/constants/css/brand.css?raw";
import gradientCssRaw from "@/commons/constants/css/gradient.css?raw";
import seedCssRaw     from "@/commons/constants/css/_seed.css?raw";
import globalsCssRaw  from "@/app/globals.css?raw";

import {
  SEMANTIC_GROUPS,
  type SemanticSection,
  type SemanticToken,
} from "@/app/_ds/demos/foundations/tokens.generated";
import { StoryDocsPage } from "@/stories/story-docs-shell";
import { DownloadButton } from "./foundation-shared";

/* -----------------------------------------------------------
 *  Meta — single page (no autodocs, no Default/Matrix)
 * ----------------------------------------------------------- */
const meta: Meta = {
  title: "Design System/Foundation/Color",
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
  borderColorMuted: "var(--border-neutral-secondary)",
  surface: "var(--bg-surface-base)",
  surfaceMuted: "var(--bg-neutral-secondary)",
  surfaceSubtle: "var(--bg-surface-secondary)",
  textBase: "var(--on-surface-base)",
  textMuted: "var(--on-surface)",
  textSubtle: "var(--on-surface-secondary)",
} as const;

const TABLE_MAX_WIDTH = 1280;

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
      {action ? (
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>{action}</div>
      ) : null}
    </header>
  );
}

/* -----------------------------------------------------------
 *  Cell building blocks
 * ----------------------------------------------------------- */
const TOKEN_COL = "minmax(280px, 1.2fr)";
const SWATCH_COL = "minmax(220px, 1fr)";
const COL_TEMPLATE = `${TOKEN_COL} ${SWATCH_COL} ${SWATCH_COL}`;

/* -----------------------------------------------------------
 *  Alpha helpers
 *    Opacity / BorderOpacity 그룹은 light/dark 필드가 솔리드 hex 라서
 *    alias 또는 토큰명에서 알파를 추출해 rgba 로 합성한 뒤 swatch 에 표시한다.
 * ----------------------------------------------------------- */
function parseAlpha(value: string, alias: string | null, leafName: string): number | null {
  // 이미 rgba/rgb/hex8 인 경우는 그대로 사용
  if (/^rgba?\(/i.test(value)) return null;
  if (/^#[0-9a-f]{8}$/i.test(value)) return null;

  const aliasMatch = alias?.match(/_(\d+)\s*%/);
  if (aliasMatch) return Number(aliasMatch[1]) / 100;

  const leafMatch = leafName.match(/Opacity[^0-9]*?(\d+)/i);
  if (leafMatch) return Number(leafMatch[1]) / 100;

  return null;
}

function hexToRgba(hex: string, alpha: number): string | null {
  const cleaned = hex.replace("#", "").trim();
  if (cleaned.length !== 6 && cleaned.length !== 3) return null;
  const full =
    cleaned.length === 3
      ? cleaned
          .split("")
          .map((c) => c + c)
          .join("")
      : cleaned;
  const r = parseInt(full.slice(0, 2), 16);
  const g = parseInt(full.slice(2, 4), 16);
  const b = parseInt(full.slice(4, 6), 16);
  if ([r, g, b].some((n) => Number.isNaN(n))) return null;
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

function resolveSwatch(
  value: string,
  alias: string | null,
  leafName: string,
): { background: string; display: string; alpha: number | null } {
  const alpha = parseAlpha(value, alias, leafName);
  if (alpha == null) {
    return { background: value, display: value, alpha: null };
  }
  const rgba = hexToRgba(value, alpha);
  if (!rgba) return { background: value, display: value, alpha: null };
  return {
    background: rgba,
    display: `${value.toUpperCase()} · ${Math.round(alpha * 100)}%`,
    alpha,
  };
}

/* 8px 체커보드 — 알파가 잘 보이도록 swatch 뒤에 깔아준다 */
const checkerboardStyle: CSSProperties = {
  backgroundColor: "#ffffff",
  backgroundImage: `
    linear-gradient(45deg, #d4d4d8 25%, transparent 25%),
    linear-gradient(-45deg, #d4d4d8 25%, transparent 25%),
    linear-gradient(45deg, transparent 75%, #d4d4d8 75%),
    linear-gradient(-45deg, transparent 75%, #d4d4d8 75%)
  `,
  backgroundSize: "8px 8px",
  backgroundPosition: "0 0, 0 4px, 4px -4px, -4px 0px",
};

function TokenChip({ leafName }: { leafName: string }) {
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 8,
        padding: "6px 12px",
        background: tokens.surface,
        border: `1px solid ${tokens.borderColorMuted}`,
        borderRadius: "var(--radius-full)",
        fontFamily: "ui-monospace, SFMono-Regular, monospace",
        fontSize: 12,
        color: tokens.textBase,
      }}
    >
      <span
        aria-hidden
        style={{
          display: "inline-flex",
          color: "var(--on-primary)",
        }}
      >
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
          <path d="M6 1l5 5-5 5-5-5 5-5z" fill="currentColor" />
        </svg>
      </span>
      {leafName}
    </span>
  );
}

function SwatchValue({
  value,
  alias,
  leafName,
}: {
  value: string;
  alias: string | null;
  leafName: string;
}) {
  const { background, display, alpha } = resolveSwatch(value, alias, leafName);
  const isAlpha = alpha != null || /^rgba\(/i.test(value);

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 12,
      }}
    >
      <span
        aria-hidden
        style={{
          position: "relative",
          width: 56,
          height: 32,
          borderRadius: 4,
          border: `1px solid ${tokens.borderColorMuted}`,
          flexShrink: 0,
          overflow: "hidden",
          ...(isAlpha ? checkerboardStyle : null),
        }}
      >
        <span
          style={{
            position: "absolute",
            inset: 0,
            background,
          }}
        />
      </span>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
          minWidth: 0,
        }}
      >
        <span
          style={{
            fontSize: 13,
            color: tokens.textBase,
            lineHeight: 1.3,
            wordBreak: "break-word",
          }}
        >
          {alias ?? "—"}
        </span>
      <code
        style={{
          fontFamily: "ui-monospace, SFMono-Regular, monospace",
          fontSize: 11,
            color: tokens.textSubtle,
            lineHeight: 1.3,
          wordBreak: "break-all",
        }}
      >
          {display}
      </code>
      </div>
    </div>
  );
}

const headerCellStyle: CSSProperties = {
  padding: "0 20px",
  height: 40,
  display: "flex",
  alignItems: "center",
  fontSize: 13,
  fontWeight: 600,
  color: tokens.textBase,
  background: tokens.surfaceMuted,
};

const dataCellStyle: CSSProperties = {
  padding: "12px 20px",
  minHeight: 64,
  display: "flex",
  alignItems: "center",
  fontSize: 13,
  color: tokens.textBase,
  borderTop: `1px solid ${tokens.borderColor}`,
};

/* -----------------------------------------------------------
 *  Color section table — one section = one card with header + rows
 * ----------------------------------------------------------- */
function ColorSectionTable({ section }: { section: SemanticSection }) {
  return (
    <div
      style={{
        border: `1px solid ${tokens.borderColor}`,
        borderRadius: "var(--radius-md)",
        overflow: "hidden",
        background: tokens.surface,
      }}
    >
      <div
        style={{
          padding: "12px 20px",
          background: tokens.surface,
          borderBottom: `1px solid ${tokens.borderColor}`,
          fontSize: 14,
          fontWeight: 600,
          color: tokens.textBase,
        }}
      >
        {section.path}
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: COL_TEMPLATE,
          background: tokens.surfaceMuted,
        }}
      >
        <div style={headerCellStyle}>Token</div>
        <div style={headerCellStyle}>Light</div>
        <div style={headerCellStyle}>Dark / Brand</div>
      </div>

      {section.tokens.map((t: SemanticToken) => (
        <div
          key={t.name}
          style={{
            display: "grid",
            gridTemplateColumns: COL_TEMPLATE,
            background: tokens.surface,
          }}
        >
          <div style={dataCellStyle}>
            <TokenChip leafName={t.leafName} />
          </div>
          <div style={dataCellStyle}>
            <SwatchValue value={t.light} alias={t.lightAlias} leafName={t.leafName} />
          </div>
          <div style={dataCellStyle}>
            <SwatchValue value={t.dark} alias={t.darkAlias} leafName={t.leafName} />
          </div>
        </div>
      ))}
    </div>
  );
}

/* -----------------------------------------------------------
 *  Group block — title + description + sections
 * ----------------------------------------------------------- */
function GroupBlock({
  index,
  title,
  description,
  sections,
}: {
  index: string;
  title: string;
  description?: ReactNode;
  sections: SemanticSection[];
}) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      <SectionTitle index={index} title={title} description={description} />
      <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
        {sections.map((s) => (
          <ColorSectionTable key={s.id} section={s} />
        ))}
      </div>
    </div>
  );
}

/* -----------------------------------------------------------
 *  Gradient tokens (Figma — Color Style / Gradient Color, node 13385-10689)
 * ----------------------------------------------------------- */
type GradientStop = {
  position: string;
  hex: string;
};

type LocalizedString = { ko: string; en: string };

type GradientToken = {
  id: string;
  name: string;
  cssVar: string;
  value: string;
  angle: string;
  stops: GradientStop[];
  usage: LocalizedString;
  description: LocalizedString;
  example: ReactNode;
};

function BrandGradientExample() {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 16,
      }}
    >
      <div
        style={{
          padding: "2px",
          borderRadius: 12,
          background: "var(--gradient-brand)",
        }}
      >
        <div
          style={{
            background: "var(--bg-darkgray)",
            borderRadius: 10,
            padding: "10px 14px",
            display: "flex",
            alignItems: "center",
            gap: 10,
            color: "#FFFFFF",
            minWidth: 168,
          }}
        >
          <span
            aria-hidden
            style={{
              width: 18,
              height: 18,
              borderRadius: 4,
              background: "var(--gradient-brand)",
              display: "inline-block",
            }}
          />
          <span style={{ fontSize: 12, fontWeight: 600, letterSpacing: 0.2 }}>
            PhysicalWorks
          </span>
        </div>
      </div>
    </div>
  );
}

function BorderGradientExample() {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 16,
      }}
    >
      <div
        style={{
          padding: 2,
          borderRadius: 12,
          background: "var(--gradient-border)",
        }}
      >
        <div
          style={{
            background: tokens.surface,
            borderRadius: 10,
            padding: "14px 18px",
            display: "flex",
            flexDirection: "column",
            gap: 8,
            minWidth: 220,
          }}
        >
              <div
                style={{
              fontSize: 13,
              fontWeight: 600,
              color: tokens.textBase,
            }}
          >
            Human Interaction Data
              </div>
              <div
                style={{
              fontSize: 11,
              color: tokens.textSubtle,
              lineHeight: 1.4,
            }}
          >
            Card hover · gradient border
          </div>
        </div>
      </div>
    </div>
  );
}

function LightGradient01Example() {
                  return (
                    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 16,
      }}
    >
      <div
        style={{
          background: "var(--gradient-light-01)",
          borderRadius: 12,
          padding: "16px 14px",
          display: "flex",
          flexDirection: "column",
          gap: 12,
          minWidth: 168,
        }}
      >
        {[
          { idx: 1, label: "Basic Settings", active: true },
          { idx: 2, label: "Input Configuration" },
          { idx: 3, label: "File Upload" },
        ].map((step) => (
          <div
            key={step.idx}
                      style={{
                        display: "flex",
              alignItems: "center",
              gap: 8,
            }}
          >
            <span
              style={{
                width: 18,
                height: 18,
                borderRadius: "50%",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                        fontSize: 10,
                fontWeight: 600,
                color: step.active ? "#FFFFFF" : tokens.textSubtle,
                background: step.active
                  ? "linear-gradient(-26.819deg, #4BE1DF 8.94%, #7972F7 91.83%)"
                  : tokens.surface,
                border: step.active ? "none" : `1px solid ${tokens.borderColorMuted}`,
              }}
            >
              {step.idx}
            </span>
            <span
              style={{
                fontSize: 11,
                fontWeight: step.active ? 600 : 500,
                color: step.active ? tokens.textBase : tokens.textMuted,
              }}
            >
              {step.label}
            </span>
          </div>
        ))}
      </div>
                    </div>
                  );
}

function LightGradient02Example() {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 16,
      }}
    >
      <div
        style={{
          background: "var(--gradient-light-02)",
          borderRadius: 999,
          padding: "10px 18px",
          display: "flex",
          alignItems: "center",
          gap: 10,
          minWidth: 220,
          border: `1px solid ${tokens.borderColorMuted}`,
        }}
      >
        <span
          aria-hidden
          style={{
            display: "inline-flex",
            color: tokens.textSubtle,
          }}
        >
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
            <circle cx="7" cy="7" r="5" stroke="currentColor" strokeWidth="1.4" />
            <path d="m11 11 3 3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
          </svg>
        </span>
        <span style={{ fontSize: 12, color: tokens.textSubtle }}>Search…</span>
              </div>
            </div>
  );
}

const GRADIENT_TOKENS: GradientToken[] = [
  {
    id: "brand",
    name: "Gradient / Brand Gradient",
    cssVar: "--gradient-brand",
    value: "linear-gradient(105deg, #9EF7EE 50%, #971EFF 89.69%)",
    angle: "105°",
    stops: [
      { position: "50%", hex: "#9EF7EE" },
      { position: "89.69%", hex: "#971EFF" },
    ],
    usage: {
      ko: "Logo · 브랜드 컬러를 이용하여 강조하고자 하는 요소에 한정적으로 사용됩니다.",
      en: "Used sparingly with the brand color to emphasize specific elements such as the Logo.",
    },
    description: {
      ko: "예: 로고, 강조 라인, Highlight 영역",
      en: "e.g., Logo, accent lines, Highlight areas",
    },
    example: <BrandGradientExample />,
  },
  {
    id: "border",
    name: "Gradient / Gradient Border",
    cssVar: "--gradient-border",
    value: "linear-gradient(90deg, #5CC7D0 0.01%, #D5A5FF 100.01%)",
    angle: "90°",
    stops: [
      { position: "0.01%", hex: "#5CC7D0" },
      { position: "100.01%", hex: "#D5A5FF" },
    ],
    usage: {
      ko: "본 솔루션의 Card List Hover 시 Border Color로 사용됩니다.",
      en: "Used as the border color on Card List hover in this solution.",
    },
    description: {
      ko: "예: Dataset Card hover, Selectable card border",
      en: "e.g., Dataset Card hover, selectable card border",
    },
    example: <BorderGradientExample />,
  },
  {
    id: "light-01",
    name: "Gradient / Light Gradient_01",
    cssVar: "--gradient-light-01",
    value: "linear-gradient(354deg, #F6F6F6 2.29%, #F3F7EE 30.69%, #DDFCFA 104.75%)",
    angle: "354°",
    stops: [
      { position: "2.29%", hex: "#F6F6F6" },
      { position: "30.69%", hex: "#F3F7EE" },
      { position: "104.75%", hex: "#DDFCFA" },
    ],
    usage: { ko: "Vertical Stepper Area", en: "Vertical Stepper Area" },
    description: {
      ko: "예: 세로형 단계 진행 영역 배경",
      en: "e.g., background for vertical step-progress areas",
    },
    example: <LightGradient01Example />,
  },
  {
    id: "light-02",
    name: "Gradient / Light Gradient_02",
    cssVar: "--gradient-light-02",
    value: "linear-gradient(90deg, #EBEBF7 0%, #DDFCFA 100%)",
    angle: "90°",
    stops: [
      { position: "0%", hex: "#EBEBF7" },
      { position: "100%", hex: "#DDFCFA" },
    ],
    usage: {
      ko: "Horizontal Stepper Area, Floating Search Bar",
      en: "Horizontal Stepper Area, Floating Search Bar",
    },
    description: {
      ko: "예: 가로형 Stepper, Floating Search Bar 배경",
      en: "e.g., Horizontal Stepper, Floating Search Bar background",
    },
    example: <LightGradient02Example />,
  },
];

function GradientStopList({ stops }: { stops: GradientStop[] }) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 6,
      }}
    >
      {stops.map((stop) => (
        <div
          key={`${stop.position}-${stop.hex}`}
          style={{
            display: "grid",
            gridTemplateColumns: "56px 1fr",
            alignItems: "center",
            gap: 10,
            padding: "6px 10px",
            border: `1px solid ${tokens.borderColorMuted}`,
            borderRadius: 6,
            background: tokens.surface,
          }}
        >
          <span
            style={{
              fontSize: 12,
              color: tokens.textMuted,
              fontFamily: "ui-monospace, SFMono-Regular, monospace",
            }}
          >
            {stop.position}
          </span>
          <span
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              minWidth: 0,
            }}
          >
            <span
              aria-hidden
              style={{
                width: 16,
                height: 16,
                borderRadius: 4,
                background: stop.hex,
                border: `1px solid ${tokens.borderColorMuted}`,
                flexShrink: 0,
              }}
            />
            <code
              style={{
                fontFamily: "ui-monospace, SFMono-Regular, monospace",
                fontSize: 12,
                color: tokens.textBase,
              }}
            >
              {stop.hex.toUpperCase()}
            </code>
          </span>
        </div>
      ))}
    </div>
  );
}

function GradientCard({
  token,
  locale,
}: {
  token: GradientToken;
  locale: "ko" | "en";
}) {
  return (
    <article
      data-figma-node="13385-10689"
      style={{
        border: `1px solid ${tokens.borderColor}`,
        borderRadius: "var(--radius-md)",
        background: tokens.surface,
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <header
        style={{
          padding: "16px 20px",
          borderBottom: `1px solid ${tokens.borderColor}`,
          display: "flex",
          flexDirection: "column",
          gap: 4,
        }}
      >
        <h3
          style={{
            margin: 0,
            fontSize: 15,
            fontWeight: 600,
            color: tokens.textBase,
            lineHeight: 1.3,
          }}
        >
          {token.name}
        </h3>
        <p
          style={{
            margin: 0,
            fontSize: 12,
            color: tokens.textMuted,
            lineHeight: 1.5,
          }}
        >
          {token.usage[locale]}
        </p>
      </header>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "minmax(0, 1.4fr) minmax(0, 1fr)",
          gap: 0,
        }}
      >
        <div
          style={{
            padding: 20,
            display: "flex",
            flexDirection: "column",
            gap: 14,
            borderRight: `1px solid ${tokens.borderColor}`,
          }}
        >
          <div
            aria-hidden
            style={{
              height: 40,
              borderRadius: 6,
              background: token.value,
              border: `1px solid ${tokens.borderColorMuted}`,
            }}
          />

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 8,
            }}
          >
            <div
              style={{
                display: "flex",
                gap: 12,
                alignItems: "center",
                fontSize: 11,
                color: tokens.textSubtle,
              }}
            >
              <span style={{ fontWeight: 600, color: tokens.textMuted }}>Angle</span>
              <code
                style={{
                  fontFamily: "ui-monospace, SFMono-Regular, monospace",
                  fontSize: 12,
                  color: tokens.textBase,
                }}
              >
                {token.angle}
              </code>
            </div>
            <GradientStopList stops={token.stops} />
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 4,
              padding: "10px 12px",
              background: tokens.surfaceMuted,
              borderRadius: 6,
            }}
          >
            <span
              style={{
                fontSize: 10,
                fontWeight: 600,
                color: tokens.textSubtle,
                letterSpacing: 0.6,
                textTransform: "uppercase",
              }}
            >
              CSS variable
            </span>
            <code
              style={{
                fontFamily: "ui-monospace, SFMono-Regular, monospace",
                fontSize: 12,
                color: tokens.textBase,
                wordBreak: "break-all",
              }}
            >
              background: var({token.cssVar});
            </code>
          </div>
        </div>

        <div
          style={{
            background: "var(--bg-backboard)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            minHeight: 200,
          }}
        >
          {token.example}
        </div>
      </div>

      <footer
        style={{
          padding: "10px 20px",
          borderTop: `1px solid ${tokens.borderColor}`,
          fontSize: 11,
          color: tokens.textSubtle,
          background: tokens.surface,
        }}
      >
        {token.description[locale]}
      </footer>
    </article>
  );
}

/* -----------------------------------------------------------
 *  Theme Overview — Standard vs Focus (Figma node 5353-15398)
 * ----------------------------------------------------------- */
const badgeStyle = (bg: string, color: string): CSSProperties => ({
  display: "inline-flex",
  alignItems: "center",
  padding: "3px 10px",
  borderRadius: "var(--radius-md, 6px)",
  background: bg,
  color,
  fontSize: 12,
  fontWeight: 500,
  whiteSpace: "nowrap" as const,
});

function ThemeCard({
  name,
  badges,
  description,
  tokenLabel,
  tokenColor,
  badgeBg,
  badgeColor,
  accent,
  note,
}: {
  name: string;
  badges: string[];
  description: string;
  tokenLabel: ReactNode;
  tokenColor: string;
  badgeBg: string;
  badgeColor: string;
  accent: string;
  note?: string;
}) {
  return (
    <div
      style={{
        flex: "1 1 360px",
        border: "1px solid #E4E4E7",
        borderRadius: 16,
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* 상단 accent 바 */}
      <div style={{ height: 4, background: accent, flexShrink: 0 }} />

      <div style={{ padding: "20px 22px", display: "flex", flexDirection: "column", gap: 14, flex: 1 }}>
        {/* 제목 + 배지 */}
        <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
          <span
            style={{
              fontSize: 15,
              fontWeight: 700,
              color: "#111111",
              lineHeight: 1.3,
              letterSpacing: "-0.02em",
            }}
          >
            {name}
          </span>
          {badges.map((b) => (
            <span key={b} style={badgeStyle(badgeBg, badgeColor)}>
              {b}
            </span>
          ))}
        </div>

        {/* 설명 */}
        <p
          style={{
            margin: 0,
            fontSize: 13,
            color: "#6B6B7B",
            lineHeight: 1.75,
          }}
        >
          {description}
        </p>

        {/* 구분선 */}
        <div style={{ height: 1, background: "#F0F0F2" }} />

        {/* 토큰 */}
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          <span
            style={{
              fontSize: 10,
              fontWeight: 700,
              color: "#A1A1AA",
              textTransform: "uppercase",
              letterSpacing: "0.08em",
            }}
          >
            사용 토큰
          </span>
          <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
            {tokenLabel}
          </div>
        </div>

        {note ? (
          <p
            style={{
              margin: 0,
              fontSize: 11,
              color: "#A1A1AA",
              lineHeight: 1.6,
            }}
          >
            {note}
          </p>
        ) : null}
      </div>
    </div>
  );
}

function ThemeOverviewSection({ locale }: { locale: "ko" | "en" }) {
  const isKo = locale === "ko";
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <div>
        <h2
          style={{
            margin: "0 0 6px",
            fontSize: 20,
            fontWeight: 700,
            color: tokens.textBase,
          }}
        >
          {isKo ? "Theme 구성" : "Theme composition"}
        </h2>
        <p style={{ margin: 0, fontSize: 13, color: tokens.textMuted, lineHeight: 1.6 }}>
          {isKo
            ? "전역 Theme 변경이 아닌, 일부 강조 컴포넌트만 다른 스타일을 적용합니다. 강조 영역(GNB, LNB, Card 등)에는 Brand 컬러 토큰이 사용됩니다."
            : "Rather than swapping the global theme, only selected emphasized components receive a different style. Brand color tokens are applied to emphasized areas such as GNB, LNB, and Card."}
        </p>
      </div>

      <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
        <ThemeCard
          name="Standard Theme"
          badges={["Brand-driven", "Sales-oriented Theme"]}
          description={
            isKo
              ? "강한 명도 대비와 네온 컬러를 활용하여, 로보틱 시스템의 에너지 흐름과 첨단 기술 이미지를 직관적으로 표현합니다. 그라데이션 기반의 시각 요소를 통해 다양한 플랫폼과 데이터가 유기적으로 연결된 통합 흐름을 강조하며, 역동적이고 미래 지향적인 사용자 경험을 제공합니다."
              : "High-contrast values and neon colors intuitively express the energy flow and cutting-edge image of robotic systems. Gradient-based visual elements emphasize a unified flow that organically connects various platforms and data, delivering a dynamic, future-oriented user experience."
          }
          tokenLabel={
            <span style={{ display: "inline-flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
              <code
                style={{
                  padding: "3px 10px",
                  borderRadius: "var(--radius-md, 6px)",
                  background: "#141518",
                  color: "#9EF7EE",
                  fontSize: 12,
                  fontFamily: "ui-monospace, SFMono-Regular, monospace",
                }}
              >
                brand.css
              </code>
              <span style={{ fontSize: 12, color: tokens.textSubtle }}>
                {isKo
                  ? "일부 강조 영역에 사용 (LNB, GNB, Card)"
                  : "Applied to selected emphasized areas (LNB, GNB, Card)"}
              </span>
              <span style={{ fontSize: 12, color: tokens.textSubtle }}>+</span>
              <code
                style={{
                  padding: "3px 10px",
                  borderRadius: "var(--radius-md, 6px)",
                  background: tokens.surfaceMuted,
                  color: tokens.textBase,
                  fontSize: 12,
                  fontFamily: "ui-monospace, SFMono-Regular, monospace",
                  border: `1px solid ${tokens.borderColorMuted}`,
                }}
              >
                light.css
              </code>
            </span>
          }
          tokenColor="#0AA2C0"
          badgeBg="var(--bg-cyan-tint, #E7FBFF)"
          badgeColor="var(--accent-cyan, #0AA2C0)"
          accent="linear-gradient(105deg, #9EF7EE 50%, #971EFF 89.69%)"
        />

        <ThemeCard
          name="Focus Theme"
          badges={["Work-focused", "Utility Theme"]}
          description={
            isKo
              ? "모노톤 중심의 절제된 컬러와 안정적인 명도 대비를 통해, 정보 밀도가 높은 대시보드 환경에서도 장시간 사용에 적합한 시각 경험을 제공합니다. 구조화된 그리드와 정제된 라인을 바탕으로 데이터와 기능의 위계를 명확히 하여, 운영 환경에 필요한 신뢰감과 집중도를 강화합니다."
              : "A restrained, monotone palette with stable value contrast delivers a visual experience suited to long sessions even in high-density dashboards. A structured grid and refined lines clarify the hierarchy of data and functions, reinforcing the trust and focus required in operational environments."
          }
          tokenLabel={
            <code
              style={{
                padding: "3px 10px",
                borderRadius: "var(--radius-md, 6px)",
                background: tokens.surfaceMuted,
                color: tokens.textBase,
                fontSize: 12,
                fontFamily: "ui-monospace, SFMono-Regular, monospace",
                border: `1px solid ${tokens.borderColorMuted}`,
              }}
            >
              light.css
            </code>
          }
          tokenColor="#3F9BAE"
          badgeBg="var(--bg-blue-tint, #E7F1FF)"
          badgeColor="var(--accent-blue, #316CF4)"
          accent="#3F9BAE"
          note={
            isKo
              ? "추후 Dark 모드 추가 시 dark.css 토큰([data-theme=dark])을 사용합니다."
              : "When Dark mode is added later, dark.css tokens ([data-theme=dark]) will be used."
          }
        />
      </div>
    </div>
  );
}

function GradientSection({ locale }: { locale: "ko" | "en" }) {
  const description =
    locale === "en"
      ? "Gradient tokens used for limited emphasis such as Logo·brand, Card hover, and Stepper areas. Avoid arbitrary use outside this solution — use only the defined four tokens."
      : "Logo·브랜드, Card hover, Stepper 영역 등 한정적 강조 표현에 사용되는 Gradient 토큰입니다. 본 솔루션 외 임의 사용을 지양하고 정의된 4종 안에서만 사용하세요.";
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      <SectionTitle
        index="08 — GRADIENT"
        title="Gradient color"
        description={description}
      />
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(420px, 1fr))",
          gap: 24,
        }}
      >
        {GRADIENT_TOKENS.map((token) => (
          <GradientCard key={token.id} token={token} locale={locale} />
        ))}
      </div>
    </div>
  );
}

/* -----------------------------------------------------------
 *  Page composition — tabbed
 * ----------------------------------------------------------- */
const TOTAL_TOKEN_COUNT = SEMANTIC_GROUPS.reduce(
  (acc, g) => acc + g.sections.reduce((s, sec) => s + sec.tokens.length, 0),
  0,
);

type TabId =
  | "overview"
  | "foreground"
  | "background"
  | "tint"
  | "accent"
  | "border"
  | "opacity"
  | "bgTransparency"
  | "gradient"
  | "seed";

const TABS: { id: TabId; label: string }[] = [
  { id: "overview",      label: "Overview" },
  { id: "foreground",    label: "Foreground" },
  { id: "background",    label: "Background" },
  { id: "tint",          label: "Tint" },
  { id: "accent",        label: "Accent" },
  { id: "border",        label: "Border" },
  { id: "opacity",       label: "Opacity" },
  { id: "bgTransparency",label: "BG · Transparency" },
  { id: "gradient",      label: "Gradient" },
  { id: "seed",          label: "Seed" },
];

/* Border 탭은 border / borderNeutral / borderSurface / borderOpacity 4개 그룹을 합친다 */
const BORDER_GROUP_IDS = new Set(["border", "borderNeutral", "borderSurface", "borderOpacity"]);

/* Seed 탭은 seed (raw palette) + seedOpacity 두 그룹을 합친다 */
const SEED_GROUP_IDS = new Set(["seed", "seedOpacity"]);

function ColorTabPage({ locale }: { locale: "ko" | "en" }) {
  const [activeTab, setActiveTab] = useState<TabId>("overview");
  const isKo = locale === "ko";

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 0, maxWidth: TABLE_MAX_WIDTH }}>

      {/* 고정 헤더 — 다운로드 버튼 */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: 12,
          paddingBottom: 20,
          marginBottom: 4,
          borderBottom: `1px solid ${tokens.borderColor}`,
        }}
      >
        <div>
          <p style={{ margin: 0, fontSize: 13, color: tokens.textMuted }}>
            {isKo
              ? `총 ${TOTAL_TOKEN_COUNT}개 컬러 변수 · Gradient ${GRADIENT_TOKENS.length}종`
              : `${TOTAL_TOKEN_COUNT} color variables in total · ${GRADIENT_TOKENS.length} gradients`}
          </p>
        </div>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          <DownloadButton fileName="globals.css"  css={globalsCssRaw} />
          <DownloadButton fileName="_seed.css"    css={seedCssRaw} />
          <DownloadButton fileName="light.css"    css={lightCssRaw} />
          <DownloadButton fileName="dark.css"     css={darkCssRaw} />
          <DownloadButton fileName="brand.css"    css={brandCssRaw} />
          <DownloadButton fileName="gradient.css" css={gradientCssRaw} />
        </div>
      </div>

      {/* 탭 바 — 세그먼트 컨트롤 */}
      <div
        role="tablist"
        style={{
          display: "flex",
          gap: 4,
          padding: 4,
          background: "#F4F4F5",
          borderRadius: 12,
          marginBottom: 32,
          overflowX: "auto",
          scrollbarWidth: "none",
        }}
      >
          {TABS.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                role="tab"
                aria-selected={isActive}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                style={{
                  appearance: "none",
                  border: "none",
                  padding: "8px 16px",
                  borderRadius: 8,
                  fontSize: 13,
                  fontWeight: isActive ? 600 : 500,
                  letterSpacing: isActive ? "-0.01em" : 0,
                  color: isActive ? "#141518" : "#787A88",
                  background: isActive ? "#FFFFFF" : "transparent",
                  boxShadow: isActive
                    ? "0 1px 4px rgba(0,0,0,0.10), 0 0 0 0.5px rgba(0,0,0,0.06)"
                    : "none",
                  cursor: "pointer",
                  whiteSpace: "nowrap",
                  transition: "background 0.15s, color 0.15s, box-shadow 0.15s",
                  position: "relative",
                }}
              >
                {tab.label}
              </button>
            );
          })}
      </div>

      {/* 탭 컨텐츠 */}
      <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>

        {activeTab === "overview" && (
          <>
            <ThemeOverviewSection locale={locale} />
            <div
              style={{
                padding: "14px 16px",
                background: tokens.surfaceMuted,
                borderRadius: "var(--radius-md)",
                fontSize: 12,
                color: tokens.textSubtle,
                lineHeight: 1.7,
              }}
            >
              {isKo ? (
                <>
                  <strong style={{ color: tokens.textMuted }}>brand.css</strong>는 dark.css와 동일한 토큰 값이며{" "}
                  <code>[data-theme=brand]</code> 선택자를 사용합니다. 추후 Focus Theme에 Dark 모드가 추가되면{" "}
                  <code>[data-theme=dark]</code>(dark.css)가 사용됩니다.
                </>
              ) : (
                <>
                  <strong style={{ color: tokens.textMuted }}>brand.css</strong> shares the same token values as dark.css and uses the{" "}
                  <code>[data-theme=brand]</code> selector. When Dark mode is later added to the Focus Theme,{" "}
                  <code>[data-theme=dark]</code> (dark.css) will be used instead.
                </>
              )}
            </div>
          </>
        )}

        {activeTab === "foreground" && (
          <GroupBlock
            index="01 — FOREGROUND"
            title="Foreground"
            description={SEMANTIC_GROUPS.find((g) => g.id === "foreground")?.description}
            sections={SEMANTIC_GROUPS.find((g) => g.id === "foreground")?.sections ?? []}
          />
        )}

        {activeTab === "background" && (
          <GroupBlock
            index="02 — BACKGROUND"
            title="Background"
            description={SEMANTIC_GROUPS.find((g) => g.id === "background")?.description}
            sections={SEMANTIC_GROUPS.find((g) => g.id === "background")?.sections ?? []}
          />
        )}

        {activeTab === "tint" && (
          <GroupBlock
            index="03 — TINT"
            title="Tint"
            description={SEMANTIC_GROUPS.find((g) => g.id === "tint")?.description}
            sections={SEMANTIC_GROUPS.find((g) => g.id === "tint")?.sections ?? []}
          />
        )}

        {activeTab === "accent" && (
          <GroupBlock
            index="04 — ACCENT"
            title="Accent"
            description={SEMANTIC_GROUPS.find((g) => g.id === "accent")?.description}
            sections={SEMANTIC_GROUPS.find((g) => g.id === "accent")?.sections ?? []}
          />
        )}

        {activeTab === "border" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 48 }}>
            {SEMANTIC_GROUPS.filter((g) => BORDER_GROUP_IDS.has(g.id)).map((g, idx) => (
              <GroupBlock
                key={g.id}
                index={`05.${idx + 1} — ${g.title.toUpperCase()}`}
                title={g.title}
                description={g.description}
                sections={g.sections}
              />
            ))}
          </div>
        )}

        {activeTab === "opacity" && (
          <GroupBlock
            index="06 — OPACITY"
            title="Opacity"
            description={SEMANTIC_GROUPS.find((g) => g.id === "opacity")?.description}
            sections={SEMANTIC_GROUPS.find((g) => g.id === "opacity")?.sections ?? []}
          />
        )}

        {activeTab === "bgTransparency" && (
          <GroupBlock
            index="07 — BG · TRANSPARENCY"
            title="BG · Transparency"
            description={SEMANTIC_GROUPS.find((g) => g.id === "bgTransparency")?.description}
            sections={SEMANTIC_GROUPS.find((g) => g.id === "bgTransparency")?.sections ?? []}
          />
        )}

        {activeTab === "gradient" && <GradientSection locale={locale} />}

        {activeTab === "seed" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 48 }}>
            {SEMANTIC_GROUPS.filter((g) => SEED_GROUP_IDS.has(g.id)).map((g, idx) => (
              <GroupBlock
                key={g.id}
                index={`09.${idx + 1} — ${g.title.toUpperCase()}`}
                title={g.title}
                description={g.description}
                sections={g.sections}
              />
            ))}
          </div>
        )}

      </div>
    </div>
  );
}

const COLOR_PAGE_MESSAGES = {
  ko: "시맨틱 컬러·그라데이션 토큰과 Light/Dark 값을 탭별로 확인합니다.",
  en: "Browse semantic color and gradient tokens with Light/Dark values across tabs.",
} as const;

export const Guideline: Story = {
  name: "Guideline",
  render: (_args, ctx) => {
    const locale = (ctx.globals?.locale as "ko" | "en") === "en" ? "en" : "ko";
    return (
    <StoryDocsPage
      eyebrow="Design System"
      title="Color"
      description={COLOR_PAGE_MESSAGES[locale]}
    >
      <ColorTabPage locale={locale} />
    </StoryDocsPage>
    );
  },
};
