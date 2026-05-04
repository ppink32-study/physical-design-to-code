"use client";

/**
 * DataTableBody — DataTable/Body (Figma node 18385:9748)
 *
 * 단일 데이터 셀 컴포넌트.
 *   variant="text"  : 텍스트 표시 (Body/Md Regular 13px)
 *   variant="badge" : Badge 슬롯 (children 으로 주입)
 *
 *   - 405×40px 기본 크기 (width prop으로 override 가능)
 *   - bg-surface-base, border-right + border-bottom
 *   - padding: 12px 양측
 */

import type { ReactNode, CSSProperties } from "react";

import styles from "./body.module.css";

export type DataTableBodyVariant = "text" | "badge";

export type DataTableBodyProps = {
  variant?: DataTableBodyVariant;
  children?: ReactNode;
  width?: number | string;
};

export function DataTableBody({
  variant = "text",
  children,
  width,
}: DataTableBodyProps) {
  const style: CSSProperties | undefined =
    width !== undefined
      ? { width: typeof width === "number" ? `${width}px` : width }
      : undefined;

  return (
    <div
      className={styles.root}
      data-variant={variant}
      role="cell"
      style={style}
    >
      {variant === "text" && (
        <span className={styles.text}>{children}</span>
      )}
      {variant === "badge" && (
        <div className={styles.badgeSlot}>{children}</div>
      )}
    </div>
  );
}

export default DataTableBody;
