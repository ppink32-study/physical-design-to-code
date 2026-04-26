"use client";

/**
 * GridHeader — Data Grid/Header (Figma node 4456:290401)
 * ----------------------------------------------------------------
 * 2 sizes (single 32 / double 64) × 7 types
 *   - default      : 타이틀 텍스트 + (옵션) info icon + (옵션) sort 화살표
 *   - no           : "No." 전용 (중앙 정렬, 48px width)
 *   - blank        : 빈 셀 (40w)
 *   - expand-all   : chevron (single=Down, double=Up)  40w
 *   - collapse-all : chevron (single=Down, double=Up, mirror) 40w
 *   - checkbox     : 중앙에 체크박스 슬롯 (Checkbox 컴포넌트 주입)
 *   - toggle       : 중앙에 토글 슬롯 (Toggle 컴포넌트 주입) 56w
 *
 * 공통 토큰
 *   - bg       : --context-background-surface-bg-surface-secondary (#f4f4f5)
 *   - border-b : 1px --border-border-surface-border-surface (#d7d8dc)
 *   - text     : --context-foreground-surface-on-surface
 *   - font     : Body/Md semibold (13 / 20, -0.4)
 *   - padding  : px=12 / gap=6 (title/icon)
 *   - pipe     : lPipe / rPipe 옵션으로 좌우 resize 파이프 표시
 *                - single : 14px 세로 1px 라인
 *                - double : full-height - 2*12 padding 1px 라인
 */

import type { HTMLAttributes, ReactNode, CSSProperties } from "react";
import { forwardRef } from "react";

import styles from "./gridheader.module.css";

export type GridHeaderSize = "single" | "double";
export type GridHeaderType =
  | "default"
  | "no"
  | "blank"
  | "expand-all"
  | "collapse-all"
  | "checkbox"
  | "toggle";

type NativeDivProps = Omit<HTMLAttributes<HTMLDivElement>, "children">;

export type GridHeaderProps = NativeDivProps & {
  size?: GridHeaderSize;
  type?: GridHeaderType;
  /** type=default/no 에서의 표시 텍스트 (default 는 "Table Header", no 는 "No.") */
  children?: ReactNode;
  /** type=default 에서 타이틀 옆 info icon 표시 */
  infoIcon?: boolean;
  /** type=default 에서 sort 화살표 표시 (Figma headerFunction=true) */
  headerFunction?: boolean;
  /** sort 화살표 방향 (ArrowUp / ArrowDown) — headerFunction=true 일 때만 유효 */
  sortDirection?: "asc" | "desc" | "none";
  /** 좌측 resize handle pipe */
  lPipe?: boolean;
  /** 우측 resize handle pipe */
  rPipe?: boolean;
  /** type=checkbox 슬롯 — <Checkbox ... /> 등을 주입. 미지정 시 시각 플레이스홀더 박스만 표시 */
  checkboxSlot?: ReactNode;
  /** type=toggle 슬롯 — <Toggle ... /> 등을 주입. 미지정 시 시각 플레이스홀더만 표시 */
  toggleSlot?: ReactNode;
  /** Cell width override (px / css value) */
  width?: number | string;
  /** Align: default 셀에서 내부 정렬. Figma 는 center 기본 */
  align?: "left" | "center" | "right";
};

/* =================================================================
 * Icon helpers (mask-image + currentColor)
 * =============================================================== */
function MaskIcon({
  src,
  size = 16,
  className,
}: {
  src: string;
  size?: number;
  className?: string;
}) {
  const style: CSSProperties = {
    WebkitMaskImage: `url(${src})`,
    maskImage: `url(${src})`,
    width: size,
    height: size,
  };
  return (
    <span
      aria-hidden="true"
      className={[styles.icon, className].filter(Boolean).join(" ")}
      style={style}
    />
  );
}

/* =================================================================
 * Component
 * =============================================================== */
function GridHeaderInner(
  props: GridHeaderProps,
  ref: React.ForwardedRef<HTMLDivElement>,
) {
  const {
    size = "single",
    type = "default",
    children,
    infoIcon = false,
    headerFunction = type === "default",
    sortDirection = "asc",
    lPipe = false,
    rPipe = true,
    checkboxSlot,
    toggleSlot,
    width,
    align = "center",
    className,
    style,
    ...rest
  } = props;

  const rootClass = [styles.root, className].filter(Boolean).join(" ");
  const rootStyle: CSSProperties = {
    ...(width !== undefined
      ? { width: typeof width === "number" ? `${width}px` : width }
      : null),
    ...style,
  };

  const showLPipe = lPipe;
  const showRPipe = rPipe;

  const pipeLeft = showLPipe ? (
    <span aria-hidden="true" className={styles.pipe} data-side="left" />
  ) : null;
  const pipeRight = showRPipe ? (
    <span aria-hidden="true" className={styles.pipe} data-side="right" />
  ) : null;

  /* -------- Inner content --------------------------------------- */
  let content: ReactNode = null;

  if (type === "default") {
    const arrowIcon =
      sortDirection === "desc"
        ? "/icon/ArrowDown.svg"
        : "/icon/ArrowUp.svg";

    content = (
      <div className={styles.wrapper} data-align={align}>
        <span className={styles.title}>
          <span className={styles.titleText}>{children ?? "Table Header"}</span>
          {infoIcon ? <MaskIcon src="/icon/InfoFill.svg" /> : null}
        </span>
        {headerFunction && sortDirection !== "none" ? (
          <span className={styles.sortSlot} aria-hidden="true">
            <MaskIcon src={arrowIcon} />
          </span>
        ) : null}
      </div>
    );
  } else if (type === "no") {
    content = (
      <div className={styles.wrapper} data-align="center">
        <span className={styles.title}>
          <span className={styles.titleText}>{children ?? "No."}</span>
        </span>
      </div>
    );
  } else if (type === "blank") {
    content = <div className={styles.wrapper} data-align="center" />;
  } else if (type === "expand-all" || type === "collapse-all") {
    // Figma spec :
    //   single : ChevronDown (both expand & collapse)
    //   double : ChevronUp   (both expand & collapse, collapse mirrors)
    const iconSrc =
      size === "single" ? "/icon/ChevronDown.svg" : "/icon/ChevronUp.svg";
    const mirror = size === "double" && type === "collapse-all";
    content = (
      <div className={styles.wrapper} data-align="center">
        <span
          aria-hidden="true"
          className={styles.chevronWrap}
          data-mirror={mirror ? "true" : undefined}
        >
          <MaskIcon src={iconSrc} />
        </span>
      </div>
    );
  } else if (type === "checkbox") {
    content = (
      <div className={styles.wrapper} data-align="center">
        {checkboxSlot ?? (
          <span aria-hidden="true" className={styles.checkboxPlaceholder} />
        )}
      </div>
    );
  } else if (type === "toggle") {
    content = (
      <div className={styles.wrapper} data-align="center">
        {toggleSlot ?? (
          <span aria-hidden="true" className={styles.togglePlaceholder} />
        )}
      </div>
    );
  }

  return (
    <div
      {...rest}
      ref={ref}
      className={rootClass}
      data-size={size}
      data-type={type}
      style={rootStyle}
      role="columnheader"
    >
      {pipeLeft}
      {content}
      {pipeRight}
    </div>
  );
}

export const GridHeader = forwardRef<HTMLDivElement, GridHeaderProps>(
  GridHeaderInner,
);
GridHeader.displayName = "GridHeader";

export default GridHeader;
