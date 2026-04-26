import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import type { CSSProperties, ReactNode } from "react";

import lightCssRaw from "@/commons/constants/css/light.css?raw";
import darkCssRaw from "@/commons/constants/css/dark.css?raw";
import gradientCssRaw from "@/commons/constants/css/gradient.css?raw";

import {
  SEMANTIC_GROUPS,
  type SemanticSection,
  type SemanticToken,
} from "@/app/_ds/demos/foundations/tokens.generated";
import { StoryDocsPage } from "@/stories/story-docs-shell";

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
  borderColorMuted: "var(--border-neutral-border-neutral-secondary)",
  surface: "var(--context-background-surface-bg-surface-base)",
  surfaceMuted: "var(--context-background-neutral-bg-neutral-secondary)",
  surfaceSubtle: "var(--context-background-surface-bg-surface-secondary)",
  textBase: "var(--context-foreground-surface-on-surface-base)",
  textMuted: "var(--context-foreground-surface-on-surface)",
  textSubtle: "var(--context-foreground-surface-on-surface-secondary)",
} as const;

const TABLE_MAX_WIDTH = 1280;

/* -----------------------------------------------------------
 *  Download CSS — uses Vite ?raw imports of the existing files
 * ----------------------------------------------------------- */
function triggerCssDownload(content: string, fileName: string) {
  const blob = new Blob([content], { type: "text/css;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = fileName;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  window.setTimeout(() => URL.revokeObjectURL(url), 1000);
}

function DownloadButton({
  fileName,
  css,
}: {
  fileName: string;
  css: string;
}) {
  return (
    <button
      type="button"
      onClick={() => triggerCssDownload(css, fileName)}
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
      {fileName} 다운로드
    </button>
  );
}

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
          color: "var(--context-foreground-primary-on-primary)",
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
        <div style={headerCellStyle}>Dark</div>
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

type GradientToken = {
  id: string;
  name: string;
  cssVar: string;
  value: string;
  angle: string;
  stops: GradientStop[];
  usage: string;
  description: string;
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
            background: "var(--context-background-gray-bg-darkgray)",
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
    usage: "Logo · 브랜드 컬러를 이용하여 강조하고자 하는 요소에 한정적으로 사용됩니다.",
    description: "예: 로고, 강조 라인, Highlight 영역",
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
    usage: "본 솔루션의 Card List Hover 시 Border Color로 사용됩니다.",
    description: "예: Dataset Card hover, Selectable card border",
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
    usage: "Vertical Stepper Area",
    description: "예: 세로형 단계 진행 영역 배경",
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
    usage: "Horizontal Stepper Area, Floating Search Bar",
    description: "예: 가로형 Stepper, Floating Search Bar 배경",
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

function GradientCard({ token }: { token: GradientToken }) {
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
          {token.usage}
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
            background: "var(--context-background-backdrop-bg-backboard)",
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
        {token.description}
      </footer>
    </article>
  );
}

function GradientSection() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      <SectionTitle
        index={`${pad2(SEMANTIC_GROUPS.length + 1)} — GRADIENT`}
        title="Gradient color"
        description="Logo·브랜드, Card hover, Stepper 영역 등 한정적 강조 표현에 사용되는 Gradient 토큰입니다. 본 솔루션 외 임의 사용을 지양하고 정의된 4종 안에서만 사용하세요."
      />
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(420px, 1fr))",
          gap: 24,
        }}
      >
        {GRADIENT_TOKENS.map((token) => (
          <GradientCard key={token.id} token={token} />
        ))}
      </div>
    </div>
  );
}

/* -----------------------------------------------------------
 *  Page composition (single Guideline story)
 * ----------------------------------------------------------- */
const TOTAL_TOKEN_COUNT = SEMANTIC_GROUPS.reduce(
  (acc, g) => acc + g.sections.reduce((s, sec) => s + sec.tokens.length, 0),
  0,
);

function pad2(n: number) {
  return String(n).padStart(2, "0");
}

export const Guideline: Story = {
  name: "Guideline",
  render: () => (
    <StoryDocsPage
      eyebrow="Design System"
      title="Color"
      description="시맨틱 컬러·그라데이션 토큰과 Light/Dark 값을 표로 확인합니다."
    >
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 64,
        maxWidth: TABLE_MAX_WIDTH,
      }}
    >
      <SectionTitle
        title="Color tokens"
        description="모든 컴포넌트는 시맨틱 컬러 토큰만 사용합니다. 각 토큰은 Light / Dark 두 테마 값을 함께 가지고 있으며, 아래 표는 Figma 의 alias(예: Gray/100)와 실제 hex 값을 함께 표기합니다. 추가로 브랜드 강조용 Gradient 토큰 4종이 정의되어 있습니다."
        action={
          <>
            <DownloadButton fileName="light.css" css={lightCssRaw} />
            <DownloadButton fileName="dark.css" css={darkCssRaw} />
            <DownloadButton fileName="gradient.css" css={gradientCssRaw} />
          </>
        }
      />

      {SEMANTIC_GROUPS.map((g, idx) => (
        <GroupBlock
          key={g.id}
          index={`${pad2(idx + 1)} — ${g.title.toUpperCase()}`}
          title={g.title}
          description={g.description}
          sections={g.sections}
        />
      ))}

      <GradientSection />

      <footer
        style={{
          fontSize: 12,
          color: tokens.textSubtle,
          borderTop: `1px solid ${tokens.borderColor}`,
          paddingTop: 16,
        }}
      >
        총 {TOTAL_TOKEN_COUNT}개 컬러 변수 ({SEMANTIC_GROUPS.length}개 그룹) · Gradient {GRADIENT_TOKENS.length}종 ·
        {" "}다운로드 버튼은{" "}
        <code>src/commons/constants/css/light.css</code>,{" "}
        <code>src/commons/constants/css/dark.css</code>,{" "}
        <code>src/commons/constants/css/gradient.css</code> 원본을 그대로 내려줍니다.
      </footer>
    </div>
    </StoryDocsPage>
  ),
};
