"use client";

/**
 * Toast — Figma MCP (node 5307:14956 · Toast Alert)
 * --------------------------------------------------------------
 * 독립적인 부품 2개로 분리 (조립형 설계)
 *   - Toast         : 단일 알림 버블 (atom)
 *   - ToastViewport : 화면 하단 48px 고정 오버레이 컨테이너
 *
 * 접근성
 *   - error/warning → role="alert" / aria-live="assertive"
 *   - confirm/success → role="status" / aria-live="polite"
 *   - type-label 은 aria-label 로 스크린리더에 타입 전달
 *
 * 자동 dismiss
 *   - duration(ms) + onClose 함께 제공 시 자동 호출
 *
 * 요구사항 — prompt.201.stories
 *   - max-width 400px / 이상은 자동 줄바꿈 (CSS 에서 처리)
 *   - 화면 하단 48px 에 오버레이로 배치 (Viewport 에서 처리)
 */

import type { CSSProperties, MouseEvent, ReactNode } from "react";
import { useEffect } from "react";

import styles from "./toasts.module.css";

/* ================================================================
 * Types
 * ============================================================== */
export type ToastType = "confirm" | "success" | "warning" | "error";

/** type 별 아이콘 (public/icon/*). URL 안전성을 위해 encodeURI 적용 */
const TOAST_ICON_SRC: Record<ToastType, string> = {
  confirm: encodeURI("/icon/Question Fill.svg"),
  success: "/icon/CheckCircleFill.svg",
  warning: "/icon/WarningFill.svg",
  error: "/icon/CloseCircleFill.svg",
};

/** type 별 아이콘 색 토큰 — Figma 스펙 (현 프로젝트 --color-* 매핑)
 *  confirm : --color-on-neutral-disabled  (#B3B4BC)
 *  success : --color-on-success           (#09B200)
 *  warning : --color-on-warning           (#FF8F0E)
 *  error   : --color-on-error             (#FF312E)
 *
 *  CSS cascade / specificity 이슈를 피하기 위해 인라인 style 로 주입.
 */
const TOAST_ICON_COLOR: Record<ToastType, string> = {
  confirm: "var(--color-on-neutral-disabled, #B3B4BC)",
  success: "var(--color-on-success, #09B200)",
  warning: "var(--color-on-warning, #FF8F0E)",
  error: "var(--color-on-error, #FF312E)",
};

/** type 별 스크린리더 라벨 (한국어) */
const TOAST_TYPE_LABEL: Record<ToastType, string> = {
  confirm: "확인",
  success: "성공",
  warning: "경고",
  error: "오류",
};

/* ================================================================
 * ToastIcon — 내부 부품 (mask-image + currentColor)
 *   color 를 인라인 style 로 직접 지정하여 type 별 컬러가
 *   CSS cascade 와 무관하게 항상 정확히 적용되도록 함.
 * ============================================================== */
function ToastIcon({ type }: { type: ToastType }) {
  const style: CSSProperties = {
    ["--ti-mask" as string]: `url("${TOAST_ICON_SRC[type]}")`,
    color: TOAST_ICON_COLOR[type],
  };
  return (
    <span
      className={styles.icon}
      style={style}
      aria-label={TOAST_TYPE_LABEL[type]}
      role="img"
    />
  );
}

/* ================================================================
 * Toast (atom)
 * ============================================================== */
export type ToastProps = {
  /** 토스트 유형 — default "confirm" */
  type?: ToastType;
  /** 주 메시지. max-width 400px 이상 자동 줄바꿈 */
  message: ReactNode;
  /** 부가 설명 (선택) */
  subText?: ReactNode;
  /** 우측 링크 텍스트 (선택) */
  linkText?: ReactNode;
  /** 링크 클릭 콜백 */
  onLinkClick?: (event: MouseEvent<HTMLButtonElement>) => void;
  /** 닫기 콜백 — 제공 시 우측에 close 버튼 노출 */
  onClose?: () => void;
  /** 자동 닫힘 시간 (ms). onClose 와 함께 사용 */
  duration?: number;
  /** aria role override */
  role?: "status" | "alert";
  /** DOM id */
  id?: string;
  className?: string;
};

export function Toast(props: ToastProps) {
  const {
    type = "confirm",
    message,
    subText,
    linkText,
    onLinkClick,
    onClose,
    duration,
    role,
    id,
    className,
  } = props;

  /* 자동 dismiss */
  useEffect(() => {
    if (!duration || !onClose) return;
    const timer = window.setTimeout(() => {
      onClose();
    }, duration);
    return () => window.clearTimeout(timer);
  }, [duration, onClose]);

  const resolvedRole: "status" | "alert" =
    role ?? (type === "error" || type === "warning" ? "alert" : "status");

  const rootClass = className ? `${styles.root} ${className}` : styles.root;
  const showTrailing = Boolean(linkText) || Boolean(onClose);

  return (
    <div
      id={id}
      className={rootClass}
      data-type={type}
      role={resolvedRole}
      aria-live={resolvedRole === "alert" ? "assertive" : "polite"}
      aria-atomic="true"
    >
      <div className={styles.body}>
        {/* left : icon + message / subText */}
        <div className={styles.iconMessage}>
          <ToastIcon type={type} />
          <div className={styles.text}>
            <p className={styles.message}>{message}</p>
            {subText ? <p className={styles.subText}>{subText}</p> : null}
          </div>
        </div>

        {/* right : linkText + close (optional) */}
        {showTrailing ? (
          <div className={styles.trailing}>
            {linkText ? (
              <button
                type="button"
                className={styles.linkBtn}
                onClick={onLinkClick}
              >
                {linkText}
              </button>
            ) : null}
            {onClose ? (
              <button
                type="button"
                className={styles.closeBtn}
                onClick={onClose}
                aria-label="토스트 닫기"
              >
                <span className={styles.closeIcon} aria-hidden="true" />
              </button>
            ) : null}
          </div>
        ) : null}
      </div>
    </div>
  );
}
Toast.displayName = "Toast";

/* ================================================================
 * ToastViewport (container)
 *   - 화면 하단 고정 (default bottom 48px)
 *   - 여러 Toast 가 세로로 스택
 *   - 다른 콘텐츠 위 오버레이 (z-index 9999)
 * ============================================================== */
export type ToastViewportProps = {
  /** 하단 여백 (px). default 48 — 요구사항 명시값 */
  bottom?: number;
  /** 스크린리더 landmark label */
  "aria-label"?: string;
  /** 스택에 쌓을 Toast 들 */
  children?: ReactNode;
  className?: string;
};

export function ToastViewport(props: ToastViewportProps) {
  const {
    bottom = 48,
    "aria-label": ariaLabel = "알림",
    children,
    className,
  } = props;

  const style: CSSProperties = {
    ["--toast-viewport-bottom" as string]: `${bottom}px`,
  };
  const rootClass = className
    ? `${styles.viewport} ${className}`
    : styles.viewport;

  return (
    <div
      className={rootClass}
      style={style}
      role="region"
      aria-label={ariaLabel}
    >
      {children}
    </div>
  );
}
ToastViewport.displayName = "ToastViewport";

export default Toast;
