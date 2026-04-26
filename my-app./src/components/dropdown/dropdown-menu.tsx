"use client";

/**
 * DropdownMenu (Container)
 * ----------------------------------------------------------------
 * Figma node: 5355:154239 (Menu) / 5355:154595 (Items=1 instance)
 *               5355:154720 (top-left arrow) / 5355:154696 (top-center)
 *
 * 본 컴포넌트는 "container" 만 담당합니다.
 *   - padding / border / shadow / radius / bg / scroll / arrow
 *   - children 으로 DropdownMenuItem · DropdownMenuHeader
 * 다음 단계에서 다룹니다.
 *   - 위치 결정 / open-close / focus trap → Composite (Step 6)
 *
 * Variants
 *   arrow:
 *     "none"
 *     "top-left" | "top-center" | "top-right"
 *     "bottom-left" | "bottom-center" | "bottom-right"
 *
 * a11y
 *   - root: role="menu" + aria-label / aria-labelledby
 *   - children 의 atom 이 menuitem / separator role 보유
 */

import type {
  CSSProperties,
  ForwardedRef,
  HTMLAttributes,
  ReactNode,
} from "react";
import { forwardRef } from "react";

import { ScrollArea } from "@/components/scroll/scroll";

import styles from "./dropdown-menu.module.css";

/* -----------------------------------------------------------------
 * Types
 * --------------------------------------------------------------- */
type Dim = number | string;

export type DropdownMenuArrow =
  | "none"
  | "top-left"
  | "top-center"
  | "top-right"
  | "bottom-left"
  | "bottom-center"
  | "bottom-right";

type DropdownMenuOwnProps = {
  /** 명시적 width. 미지정 시 minWidth 만 적용. */
  width?: Dim;
  /** 최소 width. default 180 (Figma) */
  minWidth?: Dim;
  /** 최대 height. 지정 시 내부 list 가 스크롤됨. */
  maxHeight?: Dim;
  /** 화살표 표시 위치. default "none" */
  arrow?: DropdownMenuArrow;
  children: ReactNode;
};

export type DropdownMenuProps = DropdownMenuOwnProps &
  Omit<HTMLAttributes<HTMLDivElement>, keyof DropdownMenuOwnProps>;

/* -----------------------------------------------------------------
 * Helpers
 * --------------------------------------------------------------- */
function joinClasses(...classes: Array<string | undefined | false | null>) {
  return classes.filter(Boolean).join(" ");
}

function toCssDim(v: Dim | undefined): string | undefined {
  if (v == null) return undefined;
  return typeof v === "number" ? `${v}px` : v;
}

type ArrowParts = {
  position: "top" | "bottom";
  align: "left" | "center" | "right";
};

function parseArrow(arrow: DropdownMenuArrow): ArrowParts | null {
  if (arrow === "none") return null;
  const [position, align] = arrow.split("-") as [
    ArrowParts["position"],
    ArrowParts["align"],
  ];
  return { position, align };
}

/* -----------------------------------------------------------------
 * Arrow SVG — 12 × 7 triangle
 *   - fill : surface-base (메뉴 배경과 동일)
 *   - stroke: border-surface (메뉴 border 와 동일, 두 빗변만)
 *   - 베이스(밑변)는 stroke 없음 → 메뉴 border 와 자연스럽게 합쳐짐
 * --------------------------------------------------------------- */
function ArrowSvg({ position }: { position: "top" | "bottom" }) {
  // top: 위로 향함 (▲) — base 가 아래쪽
  // bottom: 아래로 향함 (▼) — base 가 위쪽
  const fillPath =
    position === "top" ? "M0 7 L6 0 L12 7 Z" : "M0 0 L6 7 L12 0 Z";
  const strokePath =
    position === "top" ? "M0 7 L6 0 L12 7" : "M0 0 L6 7 L12 0";

  return (
    <svg
      width="12"
      height="7"
      viewBox="0 0 12 7"
      fill="none"
      aria-hidden="true"
    >
      <path
        d={fillPath}
        fill="var(--context-background-surface-bg-surface-base, #fff)"
      />
      <path
        d={strokePath}
        stroke="var(--border-border-surface-border-surface, #d7d8dc)"
        strokeWidth="1"
        strokeLinejoin="round"
        strokeLinecap="square"
      />
    </svg>
  );
}

/* -----------------------------------------------------------------
 * Component
 * --------------------------------------------------------------- */
function DropdownMenuInner(
  props: DropdownMenuProps,
  ref: ForwardedRef<HTMLDivElement>,
) {
  const {
    width,
    minWidth,
    maxHeight,
    arrow = "none",
    className,
    style,
    children,
    role = "menu",
    ...rest
  } = props;

  const scrollable = maxHeight != null;
  const arrowParts = parseArrow(arrow);

  const cssVars: CSSProperties = {
    ...(minWidth != null
      ? { ["--dm-min-width" as string]: toCssDim(minWidth) }
      : null),
    ...(maxHeight != null
      ? { ["--dm-max-height" as string]: toCssDim(maxHeight) }
      : null),
    ...(width != null ? { width: toCssDim(width) } : null),
    ...style,
  };

  return (
    <div
      {...rest}
      ref={ref}
      role={role}
      className={joinClasses(styles.menu, className)}
      style={cssVars}
      data-scrollable={scrollable || undefined}
      data-arrow={arrow !== "none" ? arrow : undefined}
    >
      {arrowParts?.position === "top" ? (
        <div
          className={styles.arrowTop}
          data-align={arrowParts.align}
          aria-hidden="true"
        >
          <ArrowSvg position="top" />
        </div>
      ) : null}

      <div
        role="none"
        className={joinClasses(styles.list, scrollable && styles.listScrollable)}
      >
        {scrollable ? (
          <div className={styles.scrollClip}>
            <ScrollArea
              size="small"
              orientation="vertical"
              maxHeight={maxHeight}
              className={styles.menuScrollArea}
            >
              <div className={styles.listBody}>{children}</div>
            </ScrollArea>
          </div>
        ) : (
          children
        )}
      </div>

      {arrowParts?.position === "bottom" ? (
        <div
          className={styles.arrowBottom}
          data-align={arrowParts.align}
          aria-hidden="true"
        >
          <ArrowSvg position="bottom" />
        </div>
      ) : null}
    </div>
  );
}

export const DropdownMenu = forwardRef<HTMLDivElement, DropdownMenuProps>(
  DropdownMenuInner,
);
DropdownMenu.displayName = "DropdownMenu";

export default DropdownMenu;
