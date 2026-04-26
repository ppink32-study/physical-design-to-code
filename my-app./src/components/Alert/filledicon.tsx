"use client";

/**
 * AlertFilledIcon — Figma MCP (node 6390:256693 · Alert / Filled icon)
 * ------------------------------------------------------------------
 * 5 Type × size (small · medium · large)
 *
 * Figma variant 매핑
 *   - Type  → `type` prop ("info" / "success" / "warning" / "error" / "grayscale")
 *   - size  → `size` prop ("small" · "medium" · "large")
 *           small  : message 만 (400 × 44)
 *           medium : title (body-lg semibold) + message (400 × 90)
 *           large  : H1 heading + message + divider + extraMessage (400 × 237)
 *
 * 아이콘
 *   filled icon 패밀리 (/icon/*Fill.svg) 를 mask-image + currentColor 로 사용.
 *   색상은 CSS 변수 --al-icon (타입별) 로 주입.
 */

import type { CSSProperties, ReactNode } from "react";

import styles from "./filledicon.module.css";

/* ================================================================
 * Types
 * ============================================================== */
export type AlertType = "info" | "success" | "warning" | "error" | "grayscale";
export type AlertFilledSize = "small" | "medium" | "large";

const FILLED_ICON_SRC: Record<AlertType, string> = {
  info: "/icon/InfoFill.svg",
  success: "/icon/CheckCircleFill.svg",
  warning: "/icon/WarningFill.svg",
  error: "/icon/CloseCircleFill.svg",
  grayscale: "/icon/InfoFill.svg",
};

const TYPE_LABEL: Record<AlertType, string> = {
  info: "정보",
  success: "성공",
  warning: "경고",
  error: "오류",
  grayscale: "안내",
};

/**
 * 타입별 컬러 토큰 — Figma `Alert / Filled icon` (node 6390:256693) 의
 * variable_defs 와 1:1 매칭. hex fallback 포함.
 *
 *   bg     : `Context/Background/Tint/bg-{type}-tint`   (Grayscale = `bg-surface-secondary`)
 *   border : `Border/border-{type}-tint`                (filled 변형 · Grayscale = `border-surface`)
 *   icon   : `Context/Foreground/{type}/on-{type}`      (Grayscale = `icon-surface-teriary`)
 */
const TYPE_COLOR: Record<
  AlertType,
  { bg: string; border: string; icon: string }
> = {
  info: {
    bg: "var(--color-tint-cyan, #E7FBFF)",
    border: "var(--color-border-cyan-tint, #CFF4FC)",
    icon: "var(--color-on-progress, #0DCAF0)",
  },
  success: {
    bg: "var(--color-tint-green, #E9F8E8)",
    border: "var(--color-border-green-tint, #CEF0CC)",
    icon: "var(--color-on-success, #09B200)",
  },
  warning: {
    bg: "var(--color-tint-yellow, #FFF8E0)",
    border: "var(--color-border-yellow-tint, #FFEEB6)",
    icon: "var(--color-on-warning, #FF8F0E)",
  },
  error: {
    bg: "var(--color-tint-red, #FFECEC)",
    border: "var(--color-border-red-tint, #FFD6D5)",
    icon: "var(--color-on-error, #FF312E)",
  },
  grayscale: {
    bg: "var(--color-surface-secondary, #F4F4F5)",
    border: "var(--color-border-surface, #D7D8DC)",
    icon: "var(--color-icon-surface-tertiary, #787A88)",
  },
};

/* ================================================================
 * AlertFilledIcon
 * ============================================================== */
export type AlertFilledIconProps = {
  /** 알림 타입 — default "info" */
  type?: AlertType;
  /** size — default "small" */
  size?: AlertFilledSize;
  /** 본문 메시지 (필수) */
  message: ReactNode;
  /**
   * 제목 —
   * - size="medium" 에서는 body-lg / Semibold 로 표시
   * - size="large"  에서는 H1 (36/48) 로 표시
   * - size="small"  에서는 무시
   */
  title?: ReactNode;
  /** divider 아래 추가 본문 (size="large" 에서만 사용) */
  extraMessage?: ReactNode;
  /** aria role — default "status" (error/warning 은 "alert") */
  role?: "status" | "alert";
  id?: string;
  className?: string;
};

export function AlertFilledIcon(props: AlertFilledIconProps) {
  const {
    type = "info",
    size = "small",
    message,
    title,
    extraMessage,
    role,
    id,
    className,
  } = props;

  const resolvedRole: "status" | "alert" =
    role ?? (type === "error" || type === "warning" ? "alert" : "status");

  /* 타입별 컬러 토큰을 root 에 inline 주입 (CSS Modules 영향 배제) */
  const rootStyle: CSSProperties = {
    ["--al-bg" as string]: TYPE_COLOR[type].bg,
    ["--al-border" as string]: TYPE_COLOR[type].border,
    ["--al-icon" as string]: TYPE_COLOR[type].icon,
  };

  const iconStyle: CSSProperties = {
    ["--al-mask" as string]: `url("${encodeURI(FILLED_ICON_SRC[type])}")`,
  };

  const rootClass = className ? `${styles.root} ${className}` : styles.root;

  return (
    <div
      id={id}
      className={rootClass}
      style={rootStyle}
      data-type={type}
      data-size={size}
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

        {size === "small" && (
          <div className={styles.textSmall}>
            <p className={styles.bodyText}>{message}</p>
          </div>
        )}

        {size === "medium" && (
          <div className={styles.contentMedium}>
            {title ? <p className={styles.titleMedium}>{title}</p> : null}
            <div className={styles.text}>
              <p className={styles.bodyText}>{message}</p>
            </div>
          </div>
        )}

        {size === "large" && (
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
        )}
      </div>
    </div>
  );
}
AlertFilledIcon.displayName = "AlertFilledIcon";

export default AlertFilledIcon;
