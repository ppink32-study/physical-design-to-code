"use client";

/**
 * DatasetCard — Figma node 18397:4135 (Dataset Card)
 *
 * variant="default"  : white bg + 3px gradient border (Mint→Purple)
 * variant="variant2" : bg-surface-secondary + 1px border-surface-secondary
 *
 * Layout: vertical, padding=20px, gap=8px, radius=12px
 */

import type { CSSProperties, HTMLAttributes } from "react";

import { Badge } from "@/components/badge/badge";

import styles from "./datasetcard.module.css";

export type DatasetCardVariant = "default" | "variant2";

export type DatasetCardProps = HTMLAttributes<HTMLDivElement> & {
  variant?: DatasetCardVariant;
  title?: string;
  description?: string;
  badgeLabel?: string;
  badgeCount?: number | string;
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

export function DatasetCard({
  variant = "default",
  title = "Traffic_Sign_Dataset",
  description = "Collected from urban intersections",
  badgeLabel = "Local",
  badgeCount = 1,
  platform = "Forge Core",
  fileSize = "2.4GB",
  createdAt = "Created 3 hours ago",
  className,
  ...rest
}: DatasetCardProps) {
  return (
    <div
      {...rest}
      className={[styles.root, styles[`variant-${variant}`], className]
        .filter(Boolean)
        .join(" ")}
      data-variant={variant}
    >
      <div className={styles.header}>
        <div className={styles.thumbnail}>
          <span className={styles.thumbnailIcon}>
            <MaskIcon src="/icon/Configuration.svg" size={24} />
          </span>
        </div>
        <Badge variant="status" color="purple" size="sm" count={badgeCount}>
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
              <MaskIcon src="/icon/DataAnalysis.svg" size={16} />
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
