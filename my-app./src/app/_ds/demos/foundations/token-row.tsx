"use client";

import type { CSSProperties } from "react";
import { useCopyToast } from "../../toast";
import { useComputedCSSVar } from "./use-computed-css-var";
import { hexToAlias } from "./hex-to-alias";
import styles from "./foundations.module.css";

function DiamondGlyph() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <path
        d="M7 1l6 6-6 6-6-6 6-6z"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export type TokenRowProps = {
  /** Full CSS variable name (e.g. --on-blue-secondary) */
  name: string;
  /** Figma leaf key (e.g. `on-blue-secondary`) — row 라벨로 사용 */
  label: string;
  /** Light 테마 정적 값 */
  light: string;
  /** Dark 테마 정적 값 */
  dark: string;
  /** Figma alias (e.g. `Blue/500`) — 있으면 이걸 우선, 없으면 hex 로 역매핑 */
  lightAlias?: string | null;
  darkAlias?: string | null;
  /** 체커보드 배경(반투명 토큰용) */
  checker?: boolean;
};

export function TokenRow({
  name,
  label,
  light,
  dark,
  lightAlias,
  darkAlias,
  checker,
}: TokenRowProps) {
  const copy = useCopyToast();
  const computed = useComputedCSSVar(name);

  const lAlias = lightAlias ?? hexToAlias(light);
  const dAlias = darkAlias ?? hexToAlias(dark);

  const lightStyle: CSSProperties = { background: light };
  const darkStyle: CSSProperties = { background: dark };

  return (
    <div className={styles.row}>
      <button
        type="button"
        className={styles.nameCell}
        onClick={() => copy(`var(${name})`, label)}
        title={`${name} · computed=${computed}`}
      >
        <span className={styles.nameGlyph}>
          <DiamondGlyph />
        </span>
        <span className={styles.nameText}>{label}</span>
      </button>

      <button
        type="button"
        className={styles.valueCell}
        onClick={() => copy(light, `${label} · Light`)}
        title={`Light · ${light}`}
      >
        <span
          className={`${styles.swatch}${checker ? ` ${styles.swatchChecker}` : ""}`}
          style={lightStyle}
        />
        <span className={styles.valueMeta}>
          {lAlias ? (
            <span className={styles.valueAlias}>{lAlias}</span>
          ) : (
            <span className={styles.valueAliasMuted}>—</span>
          )}
          <span className={styles.valueHex}>{light}</span>
        </span>
      </button>

      <button
        type="button"
        className={`${styles.valueCell} ${styles.valueCellDark}`}
        onClick={() => copy(dark, `${label} · Dark`)}
        title={`Dark · ${dark}`}
      >
        <span
          className={`${styles.swatch}${checker ? ` ${styles.swatchChecker}` : ""}`}
          style={darkStyle}
        />
        <span className={styles.valueMeta}>
          {dAlias ? (
            <span className={styles.valueAlias}>{dAlias}</span>
          ) : (
            <span className={styles.valueAliasMuted}>—</span>
          )}
          <span className={styles.valueHex}>{dark}</span>
        </span>
      </button>
    </div>
  );
}

export default TokenRow;
