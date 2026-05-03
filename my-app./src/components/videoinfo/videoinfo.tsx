"use client";

/**
 * Video Info — Figma node 17312:17621 (badge), 17312:17623 (card)
 *
 * - <VideoInfoBadge> : 검은 50% 투명 배경 + 11px 흰 텍스트, max-width 188px, ellipsis
 * - <VideoInfoCard>  : 썸네일 카드. rounded-10. 이미지는 영역만 잡거나 src 받음.
 *                      badge(좌하단) / closeButton(우상단) 슬롯, 카드 끝에서 8px 여백.
 *                      onClose shortcut 사용 시 자동으로 <XButtonLarge> 렌더.
 */

import type { ReactNode, CSSProperties } from "react";

import { XButtonLarge } from "@/components/button/x-button-large/x-button-large";

import styles from "./videoinfo.module.css";

/* =================================================================
 *  <VideoInfoBadge>
 * =============================================================== */
export type VideoInfoBadgeProps = {
  /** 표시할 텍스트 — 188px 초과 시 말 줄임표 처리 */
  text: string;
  className?: string;
};

export function VideoInfoBadge({ text, className }: VideoInfoBadgeProps) {
  return (
    <div className={[styles.badge, className].filter(Boolean).join(" ")} title={text}>
      <p className={styles.badgeText}>{text}</p>
    </div>
  );
}

/* =================================================================
 *  <VideoInfoCard>
 *  closeButton 슬롯에 <XButtonLarge /> 등 자유 배치.
 *  onClose shortcut 지정 시 자동으로 <XButtonLarge> 렌더.
 * =============================================================== */
export type VideoInfoCardProps = {
  /** 썸네일 이미지 URL. 미지정 시 placeholder 영역만 표시 */
  imageSrc?: string;
  /** 썸네일에 대한 alt 텍스트 (이미지 있을 때) */
  imageAlt?: string;
  /** 좌하단 슬롯 — 일반적으로 <VideoInfoBadge />. 카드 끝에서 8px 여백 */
  badge?: ReactNode;
  /** 우상단 슬롯 — 일반적으로 <XButtonLarge />. 카드 끝에서 8px 여백 */
  closeButton?: ReactNode;
  /** shortcut: 지정하면 closeButton 슬롯에 기본 <XButtonLarge> 자동 배치 */
  onClose?: () => void;
  /** 카드 너비 (number=px, string=CSS 값) — 미지정 시 부모 폭 채움 */
  width?: number | string;
  /** 카드 높이 — 미지정 시 16:9 aspect-ratio */
  height?: number | string;
  className?: string;
};

export function VideoInfoCard({
  imageSrc,
  imageAlt = "",
  badge,
  closeButton,
  onClose,
  width,
  height,
  className,
}: VideoInfoCardProps) {
  const style: CSSProperties = {};
  if (width != null) style.width = typeof width === "number" ? `${width}px` : width;
  if (height != null) style.height = typeof height === "number" ? `${height}px` : height;

  /* closeButton 명시 우선, 없고 onClose 만 주어지면 XButtonLarge 자동 렌더 */
  const closeNode =
    closeButton ?? (onClose ? <XButtonLarge onClick={onClose} aria-label="삭제" /> : null);

  return (
    <div
      className={[styles.card, className].filter(Boolean).join(" ")}
      style={style}
    >
      {imageSrc ? (
        <img src={imageSrc} alt={imageAlt} className={styles.cardImage} />
      ) : (
        <div className={styles.cardPlaceholder} aria-hidden="true" />
      )}
      {badge && <div className={styles.cardBadge}>{badge}</div>}
      {closeNode && <div className={styles.cardCloseBtn}>{closeNode}</div>}
    </div>
  );
}

export default VideoInfoCard;
