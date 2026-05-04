"use client";

/**
 * DataTableHeader — DataTable/Header (Figma node 18385:9746)
 *
 * 단일 헤더 셀 컴포넌트.
 *   - 150×40px 기본 크기 (width prop으로 override 가능)
 *   - bg-surface-secondary, border-right + border-bottom
 *   - 텍스트: Body/Md SemiBold (13px / 20px / -0.4px)
 */

import type { ReactNode, CSSProperties } from "react";

import styles from "./header.module.css";

export type DataTableHeaderProps = {
  children?: ReactNode;
  width?: number | string;
};

export function DataTableHeader({ children, width }: DataTableHeaderProps) {
  const style: CSSProperties | undefined =
    width !== undefined
      ? { width: typeof width === "number" ? `${width}px` : width }
      : undefined;

  return (
    <div className={styles.root} role="columnheader" style={style}>
      <div className={styles.wrapper}>
        <div className={styles.label}>
          <span className={styles.text}>{children ?? "Header"}</span>
        </div>
      </div>
    </div>
  );
}

export default DataTableHeader;
