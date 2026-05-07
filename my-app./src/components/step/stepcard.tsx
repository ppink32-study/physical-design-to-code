"use client";

import type { ReactNode } from "react";

import { Badge, type BadgeSolidColor } from "@/components/badge/badge";

import type { NumMode, NumState } from "./num";
import { StepItem } from "./stepitem";
import styles from "./stepcard.module.css";

export type StepCardProps = {
  /** StepItem — Num 상태 */
  numState?: NumState;
  number?: number | string;
  mode?: NumMode;
  /** true: 하단 연결선 표시 (중간), false: 없음 (마지막) */
  hasLine?: boolean;

  /** 카드 — 제목·설명 */
  title?: string;
  description?: string;

  /** 카드 — 메타 정보 */
  owner?: string;
  ownerId?: string;
  date?: string;
  duration?: string;

  /** 카드 — 우측 상태 배지 */
  statusLabel?: string;
  statusColor?: BadgeSolidColor;

  className?: string;
};

export function StepCard({
  numState = "success",
  number,
  mode = "light",
  hasLine = true,
  title = "Collect",
  description = "Collected through teleoperation.",
  owner = "Team Alpha",
  ownerId = "Team Alpha",
  date = "2025-11-15",
  duration = "2h 30m",
  statusLabel = "Completed",
  statusColor = "green",
  className,
}: StepCardProps) {
  return (
    <div className={[styles.root, className].filter(Boolean).join(" ")}>
      <StepItem
        numState={numState}
        number={number}
        mode={mode}
        hasLine={hasLine}
        className={styles.stepItemStretch}
      />

      <div className={styles.card}>
        <div className={styles.header}>
          {/* 좌측: 제목 + 메타 정보 */}
          <div className={styles.content}>
            <div className={styles.titleGroup}>
              <span className={styles.title}>{title}</span>
              {description && (
                <span className={styles.description}>{description}</span>
              )}
            </div>

            <div className={styles.infoRow}>
              <div className={styles.personGroup}>
                {owner && (
                  <div className={styles.infoItem}>
                    <span className={styles.infoLabel}>Owner</span>
                    <span className={styles.infoValue}>{owner}</span>
                  </div>
                )}
                {ownerId && (
                  <div className={styles.infoItem}>
                    <span className={styles.infoLabel}>ID</span>
                    <span className={styles.infoValue}>{ownerId}</span>
                  </div>
                )}
              </div>

              {date && (
                <div className={styles.metaItem}>
                  <span
                    className={styles.metaIcon}
                    style={{
                      WebkitMaskImage: "url('/icon/Calendar.svg')",
                      maskImage: "url('/icon/Calendar.svg')",
                    }}
                    aria-hidden="true"
                  />
                  <span className={styles.metaText}>{date}</span>
                </div>
              )}

              {duration && (
                <div className={styles.metaItem}>
                  <span
                    className={styles.metaIcon}
                    style={{
                      WebkitMaskImage: "url('/icon/Clock.svg')",
                      maskImage: "url('/icon/Clock.svg')",
                    }}
                    aria-hidden="true"
                  />
                  <span className={styles.metaText}>{duration}</span>
                </div>
              )}
            </div>
          </div>

          {/* 우측: 상태 배지 */}
          {statusLabel && (
            <div className={styles.badgeWrap}>
              <Badge variant="solid" color={statusColor} size="sm">
                {statusLabel}
              </Badge>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/** StepCard 목록 래퍼 — 카드 간 gap spacing-md(12px) */
export function StepCardList({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={[styles.list, className].filter(Boolean).join(" ")}>
      {children}
    </div>
  );
}

export default StepCard;
