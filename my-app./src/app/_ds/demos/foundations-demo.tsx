"use client";

import type { CSSProperties } from "react";
import { DemoSection } from "../demo-block";
import { useCopyToast } from "../toast";
import { Button } from "@/components/button/button";
import { TokenRow } from "./foundations/token-row";
import { SEMANTIC_GROUPS } from "./foundations/tokens.generated";
import { PALETTES } from "./foundations/palette";
import styles from "./foundations/foundations.module.css";

/* -----------------------------
 *  CSS token files — download metadata
 * ----------------------------- */
const CSS_FILES: Array<{ name: string; description: string }> = [
  { name: "_seed.css", description: "원천 컬러 팔레트 (Gray / Mint / Blue …)" },
  { name: "light.css", description: "Light 테마 시맨틱 컬러 토큰" },
  { name: "dark.css", description: "Dark 테마 시맨틱 컬러 토큰" },
  { name: "index.css", description: "전체 토큰 진입점 (@import 모음)" },
  { name: "typography.css", description: "폰트 패밀리 · 크기 · 무게" },
  { name: "spacing.css", description: "여백 스케일 (--spacing-*)" },
  { name: "size.css", description: "크기 스케일 (--size-*)" },
  { name: "border-radius.css", description: "모서리 반경 (--radius-*)" },
  { name: "border-width.css", description: "보더 두께 (--border-width-*)" },
  { name: "opacity.css", description: "불투명도 (--opacity-*)" },
];

const CHECKER_GROUPS = new Set([
  "opacity",
  "borderOpacity",
  "bgTransparency",
]);

/* -----------------------------
 *  Typography
 * ----------------------------- */
const TYPE_SCALE: Array<{ label: string; cssVar: string }> = [
  { label: "Heading / H1", cssVar: "--font-size-heading-h1" },
  { label: "Heading / H2", cssVar: "--font-size-heading-h2" },
  { label: "Heading / H3", cssVar: "--font-size-heading-h3" },
  { label: "Heading / H4", cssVar: "--font-size-heading-h4" },
  { label: "Body / XL", cssVar: "--font-size-body-xl" },
  { label: "Body / Base", cssVar: "--font-size-body-base" },
  { label: "Body / SM", cssVar: "--font-size-body-sm" },
  { label: "Body / XS", cssVar: "--font-size-body-xs" },
];

/* -----------------------------
 *  Radius
 * ----------------------------- */
const RADIUS_TOKENS = [
  "none",
  "xs",
  "sm",
  "md",
  "lg",
  "xl",
  "2xl",
  "3xl",
  "4xl",
  "full",
] as const;

const RADIUS_VALUES: Record<(typeof RADIUS_TOKENS)[number], string> = {
  none: "0px",
  xs: "2px",
  sm: "4px",
  md: "6px",
  lg: "8px",
  xl: "12px",
  "2xl": "16px",
  "3xl": "20px",
  "4xl": "24px",
  full: "1000px",
};

/* -----------------------------
 *  Spacing
 * ----------------------------- */
const SPACING_TOKENS = [
  "3xs",
  "2xs",
  "xs",
  "sm",
  "md",
  "lg",
  "xl",
  "2xl",
  "3xl",
  "4xl",
] as const;

const SPACING_VALUES: Record<(typeof SPACING_TOKENS)[number], string> = {
  "3xs": "2px",
  "2xs": "4px",
  xs: "6px",
  sm: "8px",
  md: "12px",
  lg: "16px",
  xl: "20px",
  "2xl": "24px",
  "3xl": "32px",
  "4xl": "40px",
};

/* -----------------------------
 *  Component
 * ----------------------------- */
export function FoundationsDemo() {
  const copy = useCopyToast();

  return (
    <>
      <DemoSection
        title="CSS Files"
        description="디자인 토큰 CSS 파일을 개별 혹은 통합본(design-tokens.css)으로 다운로드할 수 있습니다. 프로젝트의 글로벌 스타일에 @import 또는 link 로 가져와 사용하세요."
      >
        <div className={styles.filesBar}>
          <div className={styles.filesBarInfo}>
            <span className={styles.filesBarTitle}>
              전체 번들 (모든 토큰을 하나의 CSS 로)
            </span>
            <span className={styles.filesBarDesc}>design-tokens.css</span>
          </div>
          <a
            href="/api/tokens/css-bundle"
            download="design-tokens.css"
            style={{ textDecoration: "none" }}
          >
            <Button
              variant="secondary-solid"
              size="medium"
              shape="round"
              leftIcon={<span className={styles.downloadIcon} aria-hidden />}
            >
              전체 다운로드
            </Button>
          </a>
        </div>

        <div className={styles.fileHeader}>
          <span>File</span>
          <span>Description</span>
          <span style={{ textAlign: "right" }}>Action</span>
        </div>
        <div className={styles.rowList}>
          {CSS_FILES.map((f) => (
            <a
              key={f.name}
              className={styles.fileRow}
              href={`/api/tokens/css/${f.name}`}
              download={f.name}
              aria-label={`${f.name} 다운로드`}
            >
              <span className={styles.fileName}>{f.name}</span>
              <span className={styles.fileDesc}>{f.description}</span>
              <span className={styles.fileActionCell}>
                <span className={styles.fileDownloadLabel}>
                  <span className={styles.downloadIcon} aria-hidden />
                  Download
                </span>
              </span>
            </a>
          ))}
        </div>
      </DemoSection>

      <DemoSection
        title="Semantic Tokens"
        description="Figma의 Color Token 페이지와 동일한 계층(Context/Foreground/Blue 등)으로 정리했습니다. 각 셀을 클릭하면 값이 복사됩니다."
      >
        <div className={styles.section}>
          {SEMANTIC_GROUPS.map((group) => {
            const checker = CHECKER_GROUPS.has(group.id);
            const totalTokens = group.sections.reduce(
              (s, sec) => s + sec.tokens.length,
              0
            );
            return (
              <div key={group.id} className={styles.category}>
                <div className={styles.categoryHead}>
                  <span className={styles.categoryTitle}>{group.title}</span>
                  <span className={styles.categoryCount}>
                    {totalTokens} tokens · {group.sections.length} sections
                  </span>
                </div>
                <p className={styles.groupDesc}>{group.description}</p>

                {group.sections.map((section) => (
                  <div key={section.id} className={styles.group}>
                    <div className={styles.groupHead}>
                      <span className={styles.sectionPath}>{section.path}</span>
                      <span className={styles.groupCount}>
                        {section.tokens.length} tokens
                      </span>
                    </div>
                    <div className={styles.modeHeader}>
                      <span>Token</span>
                      <span>Light</span>
                      <span>Dark</span>
                    </div>
                    <div className={styles.rowList}>
                      {section.tokens.map((t) => (
                        <TokenRow
                          key={t.name}
                          name={t.name}
                          label={t.leafName}
                          light={t.light}
                          dark={t.dark}
                          lightAlias={t.lightAlias}
                          darkAlias={t.darkAlias}
                          checker={checker}
                        />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            );
          })}
        </div>
      </DemoSection>

      <DemoSection
        title="Seed Palette"
        description="시맨틱 토큰의 원천이 되는 raw 컬러 팔레트. 행을 클릭하면 hex 가, 우측 변수명을 누르면 var(--seed-color-*) 가 복사됩니다."
      >
        <div className={styles.section}>
          {PALETTES.map((p) => (
            <div key={p.id} className={styles.group}>
              <div className={styles.groupHead}>
                <span className={styles.groupTitle}>{p.name}</span>
                <span className={styles.groupCount}>
                  {p.steps.length} steps
                </span>
              </div>
              <div className={styles.seedModeHeader}>
                <span>Step</span>
                <span>Color</span>
                <span>Hex</span>
                <span>CSS Variable</span>
              </div>
              <div className={styles.rowList}>
                {p.steps.map((s) => (
                  <button
                    key={s.step}
                    type="button"
                    className={styles.seedRow}
                    onClick={() => copy(s.hex, `${p.name}/${s.step}`)}
                    title={`${p.name}/${s.step}`}
                  >
                    <span className={styles.seedStep}>
                      {p.name}/{s.step}
                    </span>
                    <span
                      className={styles.seedSwatch}
                      style={{ background: s.hex }}
                      aria-hidden
                    />
                    <span className={styles.seedHex}>{s.hex}</span>
                    <span
                      className={styles.seedVar}
                      onClick={(e) => {
                        e.stopPropagation();
                        copy(`var(${s.cssVar})`, s.cssVar);
                      }}
                    >
                      {s.cssVar}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </DemoSection>

      <DemoSection
        title="Typography"
        description="행을 클릭해 var(--font-size-*) 를 복사합니다."
      >
        <div className={styles.kvHeader}>
          <span>Token</span>
          <span>Sample</span>
          <span style={{ textAlign: "right" }}>Value</span>
        </div>
        <div className={styles.rowList}>
          {TYPE_SCALE.map(({ label, cssVar }) => (
            <button
              key={cssVar}
              type="button"
              className={styles.kvRow}
              onClick={() => copy(`var(${cssVar})`, cssVar)}
            >
              <span className={styles.kvName}>{cssVar}</span>
              <span
                className={styles.kvSample}
                style={{ fontSize: `var(${cssVar})` }}
              >
                {label} — 안녕하세요 Hello 1234
              </span>
              <span className={styles.kvValue}>{label.split(" / ")[1]}</span>
            </button>
          ))}
        </div>
      </DemoSection>

      <DemoSection
        title="Radius"
        description="카드를 클릭해 var(--radius-*) 를 복사합니다."
      >
        <div className={styles.kvHeader}>
          <span>Token</span>
          <span>Preview</span>
          <span style={{ textAlign: "right" }}>Value</span>
        </div>
        <div className={styles.rowList}>
          {RADIUS_TOKENS.map((k) => {
            const cssVar = `--radius-${k}`;
            const previewStyle: CSSProperties = { borderRadius: `var(${cssVar})` };
            return (
              <button
                key={k}
                type="button"
                className={styles.kvRow}
                onClick={() => copy(`var(${cssVar})`, `${cssVar} · ${RADIUS_VALUES[k]}`)}
              >
                <span className={styles.kvName}>--radius-{k}</span>
                <span>
                  <span className={styles.radiusPreview} style={previewStyle} />
                </span>
                <span className={styles.kvValue}>{RADIUS_VALUES[k]}</span>
              </button>
            );
          })}
        </div>
      </DemoSection>

      <DemoSection
        title="Spacing"
        description="행을 클릭해 var(--spacing-*) 를 복사합니다."
      >
        <div className={styles.kvHeader}>
          <span>Token</span>
          <span>Preview</span>
          <span style={{ textAlign: "right" }}>Value</span>
        </div>
        <div className={styles.rowList}>
          {SPACING_TOKENS.map((k) => {
            const cssVar = `--spacing-${k}`;
            return (
              <button
                key={k}
                type="button"
                className={styles.kvRow}
                onClick={() => copy(`var(${cssVar})`, `${cssVar} · ${SPACING_VALUES[k]}`)}
              >
                <span className={styles.kvName}>--spacing-{k}</span>
                <span>
                  <span
                    className={styles.spacingBar}
                    style={{ width: `var(${cssVar})` }}
                    aria-hidden
                  />
                </span>
                <span className={styles.kvValue}>{SPACING_VALUES[k]}</span>
              </button>
            );
          })}
        </div>
      </DemoSection>
    </>
  );
}

export default FoundationsDemo;
