"use client";

/**
 * DatasetCard — Figma node 18397:4135 (Dataset Card)
 *
 * state="default" : bg-surface-secondary, 테두리 없음
 * state="hover"   : bg-surface-white + 3px gradient border Mint→Purple (inline)
 *
 * Layout: vertical, padding=20px, gap=8px, radius=12px, width=355px, height=158px
 */

import type { CSSProperties, HTMLAttributes } from "react";

import { Badge } from "@/components/badge/badge";

import styles from "./datasetcard.module.css";

export type DatasetCardState = "default" | "hover";

export type DatasetCardProps = HTMLAttributes<HTMLDivElement> & {
  state?: DatasetCardState;
  title?: string;
  description?: string;
  badgeLabel?: string;
  platform?: string;
  fileSize?: string;
  createdAt?: string;
};

function MaskIcon({ src, size = 16 }: { src: string; size?: number }) {
  const style: CSSProperties = {
    width: size,
    height: size,
    display: "inline-block",
    backgroundColor: "currentColor",
    WebkitMaskImage: `url(${src})`,
    maskImage: `url(${src})`,
    WebkitMaskRepeat: "no-repeat",
    maskRepeat: "no-repeat",
    WebkitMaskPosition: "center",
    maskPosition: "center",
    WebkitMaskSize: "contain",
    maskSize: "contain",
    flexShrink: 0,
  };
  return <span aria-hidden="true" style={style} />;
}

function CardIcon({ src, size = 24 }: { src: string; size?: number }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={src} alt="" aria-hidden="true" width={size} height={size} style={{ display: "block", flexShrink: 0 }} />
  );
}

export function DatasetCard({
  state = "default",
  title = "Traffic_Sign_Dataset",
  description = "Collected from urban intersections",
  badgeLabel = "Local",
  platform = "Forge Core",
  fileSize = "2.4GB",
  createdAt = "Created 3 hours ago",
  className,
  ...rest
}: DatasetCardProps) {
  return (
    <div
      {...rest}
      className={[styles.root, className].filter(Boolean).join(" ")}
      data-state={state}
    >
      <div className={styles.header}>
        <CardIcon src="/cardicon/dataset.svg" size={40} />
        <Badge variant="status" color="purple" size="sm">
          {badgeLabel}
        </Badge>
      </div>

      <div className={styles.content}>
        <div className={styles.nameGroup}>
          <span className={styles.title}>{title}</span>
          <span className={styles.description}>{description}</span>
        </div>
        <div className={styles.metaRow}>
          <div className={styles.detail}>
            <span className={styles.detailIcon}>
              <MaskIcon src="/icon/DataAnalysis-1.svg" size={16} />
            </span>
            <span className={styles.detailText}>{platform}</span>
          </div>
          <div className={styles.detail}>
            <span className={styles.detailIcon}>
              <MaskIcon src="/icon/Save.svg" size={16} />
            </span>
            <span className={styles.detailText}>{fileSize}</span>
          </div>
          <div className={styles.detail}>
            <span className={styles.detailIcon}>
              <MaskIcon src="/icon/Clock.svg" size={16} />
            </span>
            <span className={styles.detailText}>{createdAt}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DatasetCard;
