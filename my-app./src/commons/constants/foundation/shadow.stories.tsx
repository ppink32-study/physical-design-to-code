import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import type { CSSProperties, ReactNode } from "react";

import shadowCssRaw from "@/commons/constants/css/shadow.css?raw";
import { StoryDocsPage } from "@/stories/story-docs-shell";

import { DownloadButton } from "./foundation-shared";

/* -----------------------------------------------------------
 *  Shadow tokens
 *  Source of truth: Figma — Token Spec / Shadows (node 13382-23979)
 * ----------------------------------------------------------- */
type ShadowToken = {
  /** Display label (Figma 상의 이름) */
  name: string;
  /** CSS variable name (without `var()`) */
  cssVar: string;
  /** Raw box-shadow value */
  value: string;
  /** 사용 가이드 (어디에 쓰는지) */
  usage: string;
  /** 카드 강조 (Primary tone) */
  emphasis?: boolean;
};

const SHADOW_TOKENS: ShadowToken[] = [
  {
    name: "Shadow / Xs",
    cssVar: "--shadow-xs",
    value: "0 2px 4px 0 rgba(0, 0, 0, 0.06)",
    usage: "—",
  },
  {
    name: "Shadow / Sm",
    cssVar: "--shadow-sm",
    value: "0 4px 14px 0 rgba(0, 0, 0, 0.06)",
    usage: "Master Area, Dropdown List, Popover",
  },
  {
    name: "Shadow / Md",
    cssVar: "--shadow-md",
    value: "0 6px 20px 0 rgba(0, 0, 0, 0.16)",
    usage: "Bottom Drawer",
  },
  {
    name: "Shadow / Lg",
    cssVar: "--shadow-lg",
    value: "0 12px 32px 0 rgba(0, 0, 0, 0.16)",
    usage: "Modal, Toast, Side Drawer",
  },
  {
    name: "Shadow / Xl",
    cssVar: "--shadow-xl",
    value: "0 16px 48px 0 rgba(0, 0, 0, 0.18)",
    usage: "—",
  },
  {
    name: "Shadow / Primary",
    cssVar: "--shadow-primary",
    value:
      "0 6px 20px 0 var(--color-opacity-accent-primary-50020, rgba(67, 198, 193, 0.20))",
    usage: "Builder · Prompt 실행창과 같이 강조가 필요한 영역의 Shadow",
    emphasis: true,
  },
];

type FocusRingToken = {
  name: string;
  cssVar: string;
  value: string;
  usage: string;
  /** 색 도트 미리보기에 쓸 ring color */
  ringColor: string;
};

const FOCUS_RING_TOKENS: FocusRingToken[] = [
  {
    name: "Focus Ring / Primary",
    cssVar: "--shadow-focus-ring-primary",
    value:
      "0 0 0 var(--border-width-lg, 4px) var(--color-opacity-accent-primary-50015, rgba(67, 198, 193, 0.15))",
    usage: "기본 인터랙티브 요소(버튼, 입력 등)의 Focus 상태",
    ringColor: "rgba(67, 198, 193, 0.15)",
  },
  {
    name: "Focus Ring / Gray",
    cssVar: "--shadow-focus-ring-gray",
    value:
      "0 0 0 var(--border-width-lg, 4px) var(--context-background-surface-bg-surface-teriary, #ECECEE)",
    usage: "보조 컨트롤·중립 톤 요소의 Focus 상태",
    ringColor: "#ECECEE",
  },
  {
    name: "Focus Ring / Form Valid",
    cssVar: "--shadow-focus-ring-form-valid",
    value:
      "0 0 0 var(--border-width-lg, 4px) var(--seed-color-green-100, #CEF0CC)",
    usage: "Form Validation 통과(성공) 상태",
    ringColor: "#CEF0CC",
  },
  {
    name: "Focus Ring / Form Invalid",
    cssVar: "--shadow-focus-ring-form-invalid",
    value:
      "0 0 0 var(--border-width-lg, 4px) var(--seed-color-red-100, #FFD6D5)",
    usage: "Form Validation 실패(에러) 상태",
    ringColor: "#FFD6D5",
  },
];

/* -----------------------------------------------------------
 *  Meta — single page (no autodocs, no Default/Matrix)
 * ----------------------------------------------------------- */
const meta: Meta = {
  title: "Design System/Foundation/Shadow",
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
  backboard: "var(--context-background-backdrop-bg-backboard)",
  textBase: "var(--context-foreground-surface-on-surface-base)",
  textMuted: "var(--context-foreground-surface-on-surface)",
  textSubtle: "var(--context-foreground-surface-on-surface-secondary)",
  textHint: "var(--context-foreground-neutral-on-neutral-hint)",
} as const;

const TABLE_MAX_WIDTH = 1280;

/* -----------------------------------------------------------
 *  Section header
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
 *  Preview cards (Figma 와 동일한 Backboard + 흰 카드 그리드)
 * ----------------------------------------------------------- */
function ShadowPreviewGrid() {
  return (
    <div
      style={{
        background: tokens.backboard,
        borderRadius: "var(--radius-xl)",
        padding: "100px 80px",
        width: "100%",
      }}
    >
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: 48,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {SHADOW_TOKENS.map((s) => (
          <div
            key={s.cssVar}
            style={{
              width: 140,
              height: 140,
              background: "#FFFFFF",
              borderRadius: "var(--radius-xl)",
              boxShadow: `var(${s.cssVar})`,
              position: "relative",
              overflow: "hidden",
            }}
            title={`${s.name} · ${s.value}`}
          >
            <span
              style={{
                position: "absolute",
                top: 16,
                left: 16,
                fontSize: 18,
                fontWeight: 600,
                color: tokens.textHint,
                fontFamily: "var(--font-family-korean)",
              }}
            >
              {s.name.replace(/^Shadow\s*\/\s*/, "")}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* -----------------------------------------------------------
 *  Focus ring preview grid
 *  ring 은 box-shadow 로 적용되므로 카드에 여백을 충분히 둡니다.
 * ----------------------------------------------------------- */
function FocusRingPreviewGrid() {
  return (
    <div
      style={{
        background: tokens.backboard,
        borderRadius: "var(--radius-xl)",
        padding: "80px 60px",
        width: "100%",
      }}
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: 56,
          alignItems: "center",
          justifyItems: "center",
        }}
      >
        {FOCUS_RING_TOKENS.map((r) => (
          <div
            key={r.cssVar}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 16,
            }}
          >
            <div
              style={{
                width: 140,
                height: 56,
                background: "#FFFFFF",
                border: `1px solid ${tokens.borderColorMuted}`,
                borderRadius: "var(--radius-md)",
                boxShadow: `var(${r.cssVar})`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 12,
                fontWeight: 600,
                color: tokens.textHint,
                fontFamily: "var(--font-family-korean)",
              }}
              title={`${r.name} · ${r.value}`}
            >
              {r.name.replace(/^Focus Ring\s*\/\s*/, "")}
            </div>
            <span
              style={{
                fontSize: 11,
                color: "#FFFFFF",
                opacity: 0.72,
                fontFamily: "ui-monospace, SFMono-Regular, monospace",
              }}
            >
              {r.cssVar}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* -----------------------------------------------------------
 *  Token chip (color 페이지와 동일한 모양)
 * ----------------------------------------------------------- */
function TokenChip({ label }: { label: string }) {
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
      {label}
    </span>
  );
}

/* -----------------------------------------------------------
 *  Shadow scale table
 * ----------------------------------------------------------- */
const COL_TEMPLATE = "minmax(200px, 0.8fr) minmax(220px, 1fr) minmax(360px, 1.6fr)";

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
  padding: "16px 20px",
  minHeight: 64,
  display: "flex",
  alignItems: "center",
  fontSize: 13,
  color: tokens.textBase,
  borderTop: `1px solid ${tokens.borderColor}`,
};

function ShadowScaleTable() {
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
          display: "grid",
          gridTemplateColumns: COL_TEMPLATE,
          background: tokens.surfaceMuted,
        }}
      >
        <div style={headerCellStyle}>Token</div>
        <div style={headerCellStyle}>Usage</div>
        <div style={headerCellStyle}>Box-shadow value</div>
      </div>

      {SHADOW_TOKENS.map((s) => (
        <div
          key={s.cssVar}
          style={{
            display: "grid",
            gridTemplateColumns: COL_TEMPLATE,
            background: tokens.surface,
          }}
        >
          <div style={dataCellStyle}>
            <TokenChip label={s.name} />
          </div>
          <div
            style={{
              ...dataCellStyle,
              color: tokens.textMuted,
            }}
          >
            {s.usage}
          </div>
          <div
            style={{
              ...dataCellStyle,
              fontFamily: "ui-monospace, SFMono-Regular, monospace",
              fontSize: 12,
              color: tokens.textBase,
              whiteSpace: "normal",
              wordBreak: "break-word",
            }}
          >
            {s.value};
          </div>
        </div>
      ))}
    </div>
  );
}

function FocusRingScaleTable() {
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
          display: "grid",
          gridTemplateColumns: COL_TEMPLATE,
          background: tokens.surfaceMuted,
        }}
      >
        <div style={headerCellStyle}>Token</div>
        <div style={headerCellStyle}>Usage</div>
        <div style={headerCellStyle}>Box-shadow value</div>
      </div>

      {FOCUS_RING_TOKENS.map((r) => (
        <div
          key={r.cssVar}
          style={{
            display: "grid",
            gridTemplateColumns: COL_TEMPLATE,
            background: tokens.surface,
          }}
        >
          <div style={dataCellStyle}>
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
                  width: 12,
                  height: 12,
                  borderRadius: "var(--radius-full)",
                  background: r.ringColor,
                  border: `1px solid ${tokens.borderColorMuted}`,
                  flexShrink: 0,
                }}
              />
              {r.name}
            </span>
          </div>
          <div
            style={{
              ...dataCellStyle,
              color: tokens.textMuted,
            }}
          >
            {r.usage}
          </div>
          <div
            style={{
              ...dataCellStyle,
              fontFamily: "ui-monospace, SFMono-Regular, monospace",
              fontSize: 12,
              color: tokens.textBase,
              whiteSpace: "normal",
              wordBreak: "break-word",
            }}
          >
            {r.value};
          </div>
        </div>
      ))}
    </div>
  );
}

/* -----------------------------------------------------------
 *  Page composition (single Guideline story)
 * ----------------------------------------------------------- */

export const Guideline: Story = {
  name: "Guideline",
  render: () => (
    <StoryDocsPage
      eyebrow="Design System"
      title="Shadow"
      description="표면 elevation 그림자와 포커스 링(box-shadow) 토큰 레퍼런스입니다."
    >
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 64,
        maxWidth: TABLE_MAX_WIDTH,
      }}
    >
      <div>
        <SectionTitle
          index="01 — SHADOW SCALE"
          title="Shadow scale"
          description="레이어 위계를 표현하는 6단계 표면 그림자 토큰입니다. 컴포넌트가 떠 있는 정도(layer height)에 맞춰 한 단계씩만 사용하세요."
          action={<DownloadButton fileName="shadow.css" css={shadowCssRaw} />}
        />
        <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
          <ShadowPreviewGrid />
          <ShadowScaleTable />
        </div>
      </div>

      <div>
        <SectionTitle
          index="02 — FOCUS RING"
          title="Focus ring"
          description="키보드 포커스·검증 상태를 표현하는 4종 링 토큰입니다. 외곽선이 아닌 box-shadow 로 적용되어 레이아웃을 밀지 않습니다. 컴포넌트의 의미(보통/중립/성공/실패)에 맞춰 한 토큰만 사용하세요."
        />
        <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
          <FocusRingPreviewGrid />
          <FocusRingScaleTable />
        </div>
      </div>

      <footer
        style={{
          fontSize: 12,
          color: tokens.textSubtle,
          borderTop: `1px solid ${tokens.borderColor}`,
          paddingTop: 16,
        }}
      >
        총 {SHADOW_TOKENS.length + FOCUS_RING_TOKENS.length}개 shadow 변수 (
        {SHADOW_TOKENS.length} elevation · {FOCUS_RING_TOKENS.length} focus ring) ·
        다운로드 버튼은 <code>src/commons/constants/css/shadow.css</code> 원본을
        그대로 내려줍니다.
      </footer>
    </div>
    </StoryDocsPage>
  ),
};
