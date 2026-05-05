"use client";

/**
 * Badge — Figma MCP 기반 통합 컴포넌트
 * ----------------------------------------------------------------
 * 4 variants (variant prop으로 분기)
 *   - solid  : bg = tint-{color},   fg = accent-{color}
 *   - line   : border = border-{color}-tint, fg = accent-{color}
 *   - status : bg-surface + border-surface + dot + text(+count)
 *   - notice : 고정 카운트 뱃지 (red/purple) · 높이 12px · 좌우 4px padding
 *              1~98 은 그대로, 99 이상은 "+99" (세 자리 숫자 미표시)
 *
 * Figma nodes
 *   - Solid  : 17976:110564
 *   - Line   : 17976:110839
 *   - Status : 17976:111050
 *   - Notice : 17976:111245
 */

import type {
  ForwardedRef,
  HTMLAttributes,
  ReactNode,
} from "react";
import { forwardRef } from "react";

import styles from "./badge.module.css";

/* -----------------------------------------------------------------
 * Types
 * --------------------------------------------------------------- */
export type BadgeVariant = "solid" | "line" | "status" | "notice";
export type BadgeSize = "xs" | "sm" | "lg";
export type BadgeShape = "square" | "round";

export type BadgeSolidColor =
  | "primary"
  | "purple"
  | "red"
  | "green"
  | "orange"
  | "pink"
  | "blue"
  | "cyan"
  | "gray"
  | "opacity";

export type BadgeLineColor =
  | "gray"
  | "purple"
  | "cyan"
  | "green"
  | "red"
  | "orange"
  | "pink"
  | "blue"
  | "teal"
  | "magenta"
  | "gold";

export type BadgeStatusColor =
  | "cyan"
  | "blue"
  | "yellow"
  | "pink"
  | "purple"
  | "green"
  | "red"
  | "gray"
  | "orange";

export type BadgeNoticeColor = "red" | "purple" | "primary";

export type BadgeColor =
  | BadgeSolidColor
  | BadgeLineColor
  | BadgeStatusColor
  | BadgeNoticeColor;

type NativeSpanProps = Omit<HTMLAttributes<HTMLSpanElement>, "children">;

export type BadgeProps = NativeSpanProps & {
  variant?: BadgeVariant;
  /** variant 별로 허용 색상이 다름. 런타임 검증은 하지 않음 (타입에서 분리해 사용 권장) */
  color?: BadgeColor;
  /** solid: xs/sm/lg, line·status: sm/lg. notice 는 무시 */
  size?: BadgeSize;
  /** solid / line / status 에만 적용. notice 는 무시(항상 round) */
  shape?: BadgeShape;
  /** solid / line 에서 좌측에 표시할 아이콘 노드. `currentColor` 로 색상 상속됨 */
  icon?: ReactNode;
  /** status 에서 좌측 dot 표시 여부. 기본 true */
  dot?: boolean;
  /** status 에서 우측 보조 숫자 / notice 에서 표시할 카운트(99+ 는 "+99") */
  count?: ReactNode;
  children?: ReactNode;
};

/* -----------------------------------------------------------------
 * Constants
 * --------------------------------------------------------------- */
const VARIANT_CLASS: Record<BadgeVariant, string> = {
  solid: styles.variantSolid,
  line: styles.variantLine,
  status: styles.variantStatus,
  notice: styles.variantNotice,
};

const SIZE_CLASS: Record<BadgeSize, string> = {
  xs: styles.sizeXs,
  sm: styles.sizeSm,
  lg: styles.sizeLg,
};

const SHAPE_CLASS: Record<BadgeShape, string> = {
  square: styles.shapeSquare,
  round: styles.shapeRound,
};

const COLOR_CLASS: Record<string, string> = {
  primary: styles.colorPrimary,
  purple: styles.colorPurple,
  red: styles.colorRed,
  green: styles.colorGreen,
  orange: styles.colorOrange,
  pink: styles.colorPink,
  blue: styles.colorBlue,
  cyan: styles.colorCyan,
  gray: styles.colorGray,
  opacity: styles.colorOpacity,
  teal: styles.colorTeal,
  magenta: styles.colorMagenta,
  gold: styles.colorGold,
  yellow: styles.colorYellow,
};

function joinClasses(...classes: Array<string | undefined | false | null>) {
  return classes.filter(Boolean).join(" ");
}

/**
 * Notice: 1~98 은 문자열 그대로, 99 이상은 "+99". 0/음수/NaN 은 "0".
 */
function clampNoticeCountDisplay(n: number): string {
  if (!Number.isFinite(n) || Number.isNaN(n)) return "0";
  const t = Math.trunc(n);
  if (t < 0) return "0";
  if (t === 0) return "0";
  if (t >= 99) return "+99";
  return String(t);
}

/**
 * Notice variant 전용 — count/children 을 숫자 문자열로 정규화(99+ → "+99").
 * number / bigint / 숫자형 string 은 `clampNoticeCountDisplay` 적용.
 * 숫자가 아닌 string 은 첫 정수 토큰을 파싱해 동일 규칙 적용. 그 외 ReactNode 는 "0".
 */
function formatNoticeCount(value: ReactNode): string {
  const raw = value ?? 0;
  if (raw == null || raw === false) return "0";
  if (typeof raw === "number") {
    return clampNoticeCountDisplay(raw);
  }
  if (typeof raw === "bigint") {
    const n = Number(raw);
    return clampNoticeCountDisplay(n);
  }
  if (typeof raw === "string") {
    const trimmed = raw.trim();
    if (trimmed === "") return "0";
    const parsed = parseInt(trimmed, 10);
    if (!Number.isNaN(parsed)) {
      return clampNoticeCountDisplay(parsed);
    }
    const m = trimmed.match(/\d+/);
    return m ? clampNoticeCountDisplay(parseInt(m[0], 10)) : "0";
  }
  return "0";
}

/** variant 별 기본 color */
function defaultColor(variant: BadgeVariant): BadgeColor {
  switch (variant) {
    case "line":
    case "status":
      return "gray";
    case "notice":
      return "red";
    case "solid":
    default:
      return "primary";
  }
}

/* -----------------------------------------------------------------
 * Component
 * --------------------------------------------------------------- */
function BadgeInner(
  props: BadgeProps,
  ref: ForwardedRef<HTMLSpanElement>,
) {
  const {
    variant = "solid",
    color,
    size = "lg",
    shape = "square",
    icon,
    dot = true,
    count,
    children,
    className,
    ...rest
  } = props;

  const resolvedColor = color ?? defaultColor(variant);

  // notice 는 size/shape 가 고정이므로 무시
  const isNotice = variant === "notice";

  const classes = joinClasses(
    styles.badge,
    VARIANT_CLASS[variant],
    !isNotice ? SIZE_CLASS[size] : undefined,
    !isNotice ? SHAPE_CLASS[shape] : undefined,
    COLOR_CLASS[resolvedColor],
    className,
  );

  /* -------- Notice : 카운트 전용 --------- */
  if (isNotice) {
    return (
      <span
        {...rest}
        ref={ref}
        className={classes}
        data-variant={variant}
        data-color={resolvedColor}
      >
        <span className={styles.noticeCount}>
          {formatNoticeCount(count ?? children ?? 0)}
        </span>
      </span>
    );
  }

  /* -------- Status : dot + text (+ count) ---- */
  if (variant === "status") {
    return (
      <span
        {...rest}
        ref={ref}
        className={classes}
        data-variant={variant}
        data-color={resolvedColor}
        data-size={size}
        data-shape={shape}
      >
        {dot ? <span className={styles.dot} aria-hidden="true" /> : null}
        <span className={styles.wrapper}>
          {children != null ? (
            <span className={styles.label}>{children}</span>
          ) : null}
          {count != null ? (
            <span className={styles.statusNumber}>{count}</span>
          ) : null}
        </span>
      </span>
    );
  }

  /* -------- Solid / Line : (icon) + text ----- */
  return (
    <span
      {...rest}
      ref={ref}
      className={classes}
      data-variant={variant}
      data-color={resolvedColor}
      data-size={size}
      data-shape={shape}
    >
      <span className={styles.wrapper}>
        {icon ? (
          <span className={styles.icon} aria-hidden="true">
            {icon}
          </span>
        ) : null}
        {children != null ? (
          <span className={styles.label}>{children}</span>
        ) : null}
      </span>
    </span>
  );
}

export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(BadgeInner);
Badge.displayName = "Badge";

export default Badge;
