"use client";

/**
 * AlertLineIcon — Figma MCP (node 5012:68852 · Alert / Line icon)
 * --------------------------------------------------------------
 * 5 Type × Additional Content (true / false)
 *
 * Figma variant 매핑
 *   - Type                 → `type` prop ("info" / "success" / "warning" / "error" / "grayscale")
 *   - Additional content   → `title` 또는 `extraMessage` prop 제공 시 자동 true
 *                            (또는 `additional` prop 으로 강제)
 *
 * 조립형 설계
 *   - Icon / Heading / Body / Divider / Body-2 는 각각 내부 부품으로 분리.
 *   - 외부에선 props 만 넘기면 된다.
 *
 * 아이콘
 *   public/icon/* 의 기존 SVG 를 mask-image + currentColor 로 사용.
 *   아이콘 색은 CSS 변수 --al-icon (Icon-surface-teriary) 로 주입.
 */

import type { CSSProperties, ReactNode } from "react";

import styles from "./lineicon.module.css";

/* ================================================================
 * Types
 * ============================================================== */
export type AlertType = "info" | "success" | "warning" | "error" | "grayscale";

/** line icon 패밀리는 outlined stroke 아이콘 사용 */
const LINE_ICON_SRC: Record<AlertType, string> = {
  info: "/icon/Info.svg",
  success: "/icon/CheckCircle.svg",
  warning: "/icon/Warning.svg",
  error: "/icon/CloseCircle.svg",
  grayscale: "/icon/Info.svg",
};

const TYPE_LABEL: Record<AlertType, string> = {
  info: "정보",
  success: "성공",
  warning: "경고",
  error: "오류",
  grayscale: "안내",
};

/** Context/Foreground/Icon-Surface/Icon-surface-teriary — 모든 Line 타입 아이콘 공통 */
const ICON_SURFACE_TERTIARY =
  "var(--context-foreground-icon-surface-icon-surface-teriary, #787a88)";

/**
 * 타입별 컬러 토큰 — Figma `Alert / Line icon` (node 5012:68852)
 *
 *   bg     : `Context/Background/Tint/bg-{type}-tint` (Grayscale = `bg-surface-secondary`)
 *   border : `Accent/{type}/accent-{type}-light` (Grayscale = `border-surface`)
 *   icon   : 전 타입 `Icon-surface-teriary` 로 통일
 */
const TYPE_COLOR: Record<
  AlertType,
  { bg: string; border: string; icon: string }
> = {
  info: {
    bg: "var(--color-tint-cyan, #E7FBFF)",
    border: "var(--color-accent-cyan-light, #3DD5F3)",
    icon: ICON_SURFACE_TERTIARY,
  },
  success: {
    bg: "var(--color-tint-green, #E9F8E8)",
    border: "var(--color-accent-green-light, #3AC133)",
    icon: ICON_SURFACE_TERTIARY,
  },
  warning: {
    bg: "var(--color-tint-yellow, #FFF8E0)",
    border: "var(--color-accent-yellow-light, #FFD13D)",
    icon: ICON_SURFACE_TERTIARY,
  },
  error: {
    bg: "var(--color-tint-red, #FFECEC)",
    border: "var(--color-accent-red-light, #FF5A58)",
    icon: ICON_SURFACE_TERTIARY,
  },
  grayscale: {
    bg: "var(--color-surface-secondary, #F4F4F5)",
    border: "var(--color-border-surface, #D7D8DC)",
    icon: ICON_SURFACE_TERTIARY,
  },
};

/* ================================================================
 * AlertLineIcon
 * ============================================================== */
export type AlertLineIconProps = {
  /** 알림 타입 — default "info" */
  type?: AlertType;
  /** 본문 메시지 (필수) */
  message: ReactNode;
  /** 제목 (제공 시 additional-content 레이아웃으로 전환) */
  title?: ReactNode;
  /** divider 아래 추가 본문 (제공 시 additional-content 로 전환) */
  extraMessage?: ReactNode;
  /** additional-content 강제 지정. title/extraMessage 자동감지 대신 사용 */
  additional?: boolean;
  /** aria role — default "status" (error/warning 은 "alert") */
  role?: "status" | "alert";
  id?: string;
  className?: string;
};

export function AlertLineIcon(props: AlertLineIconProps) {
  const {
    type = "info",
    message,
    title,
    extraMessage,
    additional,
    role,
    id,
    className,
  } = props;

  /* title 또는 extraMessage 가 제공되면 additional-content 레이아웃.
   * `additional` prop 이 명시되면 그 값을 우선 사용. */
  const resolvedAdditional =
    additional ?? (Boolean(title) || Boolean(extraMessage));

  const resolvedRole: "status" | "alert" =
    role ?? (type === "error" || type === "warning" ? "alert" : "status");

  /* 타입별 컬러 토큰을 root 에 inline 으로 주입 —
   * CSS Modules hash / cascade / HMR 캐시 영향 없이 확실히 적용된다. */
  const rootStyle: CSSProperties = {
    ["--al-bg" as string]: TYPE_COLOR[type].bg,
    ["--al-border" as string]: TYPE_COLOR[type].border,
    ["--al-icon" as string]: TYPE_COLOR[type].icon,
  };

  /* 아이콘 mask-image 도 inline 으로 주입 (타입별 SVG). 색은 currentColor 로
   * 이어받으며 color 는 .icon CSS 에서 var(--al-icon) 으로 해석된다. */
  const iconStyle: CSSProperties = {
    ["--al-mask" as string]: `url("${encodeURI(LINE_ICON_SRC[type])}")`,
  };

  const rootClass = className ? `${styles.root} ${className}` : styles.root;

  return (
    <div
      id={id}
      className={rootClass}
      style={rootStyle}
      data-type={type}
      data-additional={resolvedAdditional ? "true" : "false"}
      role={resolvedRole}
      aria-live={resolvedRole === "alert" ? "assertive" : "polite"}
    >
      <div className={styles.wrapper}>
        <span className={styles.iconSlot}>
          <span
            className={styles.icon}
            style={iconStyle}
            role="img"
            aria-label={TYPE_LABEL[type]}
          />
        </span>

        {resolvedAdditional ? (
          <div className={styles.content}>
            {title ? (
              <div className={styles.heading}>
                <p className={styles.headingText}>{title}</p>
              </div>
            ) : null}

            <div
              className={
                extraMessage
                  ? `${styles.text} ${styles["text--pbLg"]}`
                  : styles.text
              }
            >
              <p className={styles.bodyText}>{message}</p>
            </div>

            {extraMessage ? (
              <>
                <div className={styles.divider} role="separator" aria-hidden="true">
                  <span className={styles.dividerLine} />
                </div>
                <div className={styles.text}>
                  <p className={styles.bodyText}>{extraMessage}</p>
                </div>
              </>
            ) : null}
          </div>
        ) : (
          <div className={styles.text}>
            <p className={styles.bodyText}>{message}</p>
          </div>
        )}
      </div>
    </div>
  );
}
AlertLineIcon.displayName = "AlertLineIcon";

export default AlertLineIcon;
