import type { ReactNode, CSSProperties } from "react";
import styles from "./Matrix.module.css";

export type MatrixAxis<V> = {
  /** 헤더에 표시될 라벨 */
  label: string;
  /** 셀 렌더에 전달될 값 */
  value: V;
};

export type MatrixProps<R, C> = {
  /** 행 헤더 이름 (좌상단 corner 에 표시) */
  rowAxis?: string;
  /** 열 헤더 이름 */
  colAxis?: string;
  /** 행 옵션 */
  rows: MatrixAxis<R>[];
  /** 열 옵션 */
  cols: MatrixAxis<C>[];
  /** 셀 렌더러. 행/열 값을 받아 React 노드 반환 */
  render: (row: R, col: C) => ReactNode;
  /** 행 라벨 폭 (기본 auto) */
  rowLabelWidth?: number | string;
  /** 셀 최소 높이 */
  cellMinHeight?: number | string;
  /** 셀 padding */
  cellPadding?: string;
  className?: string;
};

/**
 * Storybook Canvas 스타일의 2축 매트릭스.
 * - 좌측에 row label, 상단에 col label
 * - 라벨 표시 / 그리드 라인 / 배경은 ReviewToolbar 의 글로벌 data-attr 로 제어
 */
export function Matrix<R, C>({
  rowAxis,
  colAxis,
  rows,
  cols,
  render,
  rowLabelWidth = "minmax(80px, auto)",
  cellMinHeight,
  cellPadding,
  className,
}: MatrixProps<R, C>) {
  const gridStyle: CSSProperties = {
    gridTemplateColumns: `${rowLabelWidth} repeat(${cols.length}, minmax(0, 1fr))`,
  };

  const cellStyle: CSSProperties = {};
  if (cellMinHeight !== undefined) {
    cellStyle.minHeight =
      typeof cellMinHeight === "number" ? `${cellMinHeight}px` : cellMinHeight;
  }
  if (cellPadding !== undefined) cellStyle.padding = cellPadding;

  return (
    <div
      className={[styles.matrix, className].filter(Boolean).join(" ")}
      style={gridStyle}
      role="table"
    >
      {/* corner */}
      <div className={styles.corner} role="columnheader">
        <div className={styles.cornerAxes}>
          {colAxis ? <span className={styles.cornerCol}>↑ {colAxis}</span> : null}
          {rowAxis && colAxis ? (
            <span className={styles.cornerSep}>·</span>
          ) : null}
          {rowAxis ? <span className={styles.cornerRow}>← {rowAxis}</span> : null}
        </div>
      </div>

      {/* col labels */}
      {cols.map((c) => (
        <div key={`col-${c.label}`} className={styles.colLabel} role="columnheader">
          {c.label}
        </div>
      ))}

      {/* rows */}
      {rows.map((r) => (
        <div key={`row-${r.label}`} style={{ display: "contents" }} role="row">
          <div className={styles.rowLabel} role="rowheader">
            {r.label}
          </div>
          {cols.map((c) => (
            <div
              key={`cell-${r.label}-${c.label}`}
              className={styles.cell}
              style={cellStyle}
              role="cell"
            >
              {render(r.value, c.value)}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

/* -----------------------------------------------------------------
 *  Stack — 단일 축의 변형들을 가로/세로로 늘어놓기 위한 헬퍼
 * --------------------------------------------------------------- */

export type StackItem = {
  label: string;
  node: ReactNode;
};

export type StackProps = {
  axis: string;
  items: StackItem[];
  direction?: "row" | "column";
  /** 셀 폭 균등 분할 여부 */
  even?: boolean;
  className?: string;
};

export function Stack({
  axis,
  items,
  direction = "row",
  even = false,
  className,
}: StackProps) {
  const isRow = direction === "row";
  const gridStyle: CSSProperties = isRow
    ? {
        gridTemplateColumns: even
          ? `repeat(${items.length}, minmax(0, 1fr))`
          : `repeat(${items.length}, max-content)`,
      }
    : {
        gridTemplateColumns: "1fr",
      };

  return (
    <div
      className={[styles.matrix, className].filter(Boolean).join(" ")}
      style={gridStyle}
      role="table"
    >
      {isRow ? (
        <>
          {items.map((it) => (
            <div key={`s-col-${it.label}`} className={styles.colLabel}>
              {it.label}
            </div>
          ))}
          {items.map((it) => (
            <div key={`s-cell-${it.label}`} className={styles.cell}>
              {it.node}
            </div>
          ))}
        </>
      ) : (
        items.map((it) => (
          <div key={`s-row-${it.label}`} style={{ display: "contents" }}>
            <div className={styles.rowLabel}>{it.label}</div>
            <div className={styles.cell}>{it.node}</div>
          </div>
        ))
      )}
      {/* axis 표시는 grid label area 외부에서 (corner 가 없는 stack 변형) */}
      <span hidden>{axis}</span>
    </div>
  );
}
