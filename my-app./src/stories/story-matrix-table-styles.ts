import type { CSSProperties } from "react";

/** Storybook 매트릭스(Figma 비교) 표 — 가로 스크롤 래퍼 */
export const storyMatrixScrollWrap: CSSProperties = {
  overflowX: "auto",
  paddingBottom: 8,
  marginLeft: -8,
  marginRight: -8,
  paddingLeft: 8,
  paddingRight: 8,
};

/** 매트릭스 `<table>` 기본 */
export const storyMatrixTableBase: CSSProperties = {
  borderCollapse: "collapse",
  width: "max-content",
  background: "var(--context-background-surface-bg-surface-base)",
};

/** 열 헤더 `<th>` */
export const storyMatrixColHeaderStyle: CSSProperties = {
  fontSize: 11,
  fontWeight: 600,
  letterSpacing: "0.04em",
  textAlign: "left",
  padding: "10px 12px",
  borderBottom:
    "1px solid var(--border-border-surface-border-surface-secondary)",
  color: "var(--context-foreground-surface-on-surface-secondary)",
  whiteSpace: "nowrap",
};

/** 행 헤더 `<th scope="row">` — 기본 middle 정렬 */
export const storyMatrixRowHeaderStyle: CSSProperties = {
  fontSize: 12,
  fontWeight: 600,
  color: "var(--context-foreground-surface-on-surface-secondary)",
  padding: "12px 16px 12px 0",
  whiteSpace: "nowrap",
  verticalAlign: "middle",
  borderBottom:
    "1px solid var(--border-border-surface-border-surface-secondary)",
};

/** Alert 등 본문이 긴 행용 */
export const storyMatrixRowHeaderTopStyle: CSSProperties = {
  ...storyMatrixRowHeaderStyle,
  verticalAlign: "top",
};

/** 데이터 셀 `<td>` — 기본 middle */
export const storyMatrixCellStyle: CSSProperties = {
  padding: "12px 16px",
  verticalAlign: "middle",
  borderBottom:
    "1px solid var(--border-border-surface-border-surface-secondary)",
};

/** TextArea 등 상단 정렬 셀 */
export const storyMatrixCellTopStyle: CSSProperties = {
  ...storyMatrixCellStyle,
  verticalAlign: "top",
};

/** Alert 매트릭스: 넓은 본문 열 */
export const storyMatrixCellAlertStyle: CSSProperties = {
  ...storyMatrixCellTopStyle,
  minWidth: 400,
};

export const storyMatrixStickyCornerStyle: CSSProperties = {
  position: "sticky",
  left: 0,
  zIndex: 1,
  background: "var(--context-background-surface-bg-surface-base)",
  boxShadow: "6px 0 12px -8px rgba(20, 21, 24, 0.12)",
};

/* ------------------------------------------------------------------
 * Guideline / 문서 내 비교 표 (전체 폭)
 * ------------------------------------------------------------------ */

export const storyDocsGuideTableStyle: CSSProperties = {
  width: "100%",
  borderCollapse: "collapse",
  fontSize: 13,
  lineHeight: 1.5,
  color: "var(--context-foreground-surface-on-surface-base)",
};

export const storyDocsGuideThStyle: CSSProperties = {
  textAlign: "left",
  fontWeight: 600,
  fontSize: 12,
  padding: "8px 12px",
  borderBottom: "1px solid var(--border-border-surface-border-surface)",
  color: "var(--context-foreground-surface-on-surface-secondary)",
};

export const storyDocsGuideTdStyle: CSSProperties = {
  padding: "10px 12px",
  borderBottom:
    "1px solid var(--border-border-surface-border-surface-secondary)",
  verticalAlign: "top",
};
