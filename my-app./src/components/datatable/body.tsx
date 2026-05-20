"use client";

/**
 * DataTableBody — DataTable/Body (Figma node 18385:9748)
 *
 * 단일 데이터 셀 컴포넌트.
 *   variant="text"     : 텍스트 표시 (Body/Md Regular 13px)
 *   variant="badge"    : Badge solid / purple / sm (children = 뱃지 라벨 텍스트)
 *   variant="input"    : 공용 Input 컴포넌트 (Figma 18857:56773)
 *   variant="textarea" : 공용 TextArea 컴포넌트 — 인포 아이콘·resize·스크롤 (Figma 18857:56790)
 *
 *   - 405×40px 기본 크기 (width prop으로 override 가능, textarea 는 높이 가변)
 *   - bg-surface-base, border-right + border-bottom
 *   - padding: 12px 양측
 */

import type { ReactNode, CSSProperties } from "react";

import { Badge } from "@/components/badge/badge";
import { Input } from "@/components/Input/input";
import { TextArea } from "@/components/Input/textarea";

import styles from "./body.module.css";

export type DataTableBodyVariant = "text" | "badge" | "input" | "textarea";

export type DataTableBodyProps = {
  variant?: DataTableBodyVariant;
  children?: ReactNode;
  width?: number | string;
  /** input / textarea placeholder */
  placeholder?: string;
  /** input / textarea 값 (표시용) */
  value?: string;
  /** input / textarea disabled */
  disabled?: boolean;
};

export function DataTableBody({
  variant = "text",
  children,
  width,
  placeholder,
  value,
  disabled,
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
        <div className={styles.badgeSlot}>
          <Badge variant="solid" color="purple" size="sm">{children}</Badge>
        </div>
      )}
      {variant === "input" && (
        <Input
          size="medium"
          width="100%"
          value={value}
          placeholder={placeholder ?? "Placeholder"}
          trailingIcon={false}
          disabled={disabled}
        />
      )}
      {variant === "textarea" && (
        <TextArea
          width="100%"
          value={value}
          placeholder={placeholder ?? "Text"}
          disabled={disabled}
        />
      )}
    </div>
  );
}

export default DataTableBody;
