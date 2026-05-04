"use client";

/**
 * LibraryCardA — Figma node 18403:1736 (Library card B component set)
 *
 * variant="default"  : bg-surface-secondary + 2px gradient border (Mint→Purple, inside)
 * variant="variant2" : bg-surface-secondary, no border
 *
 * Layout: horizontal, padding=20px, gap=8px, radius=12px, width=600px
 * 구조: [Thumbnail 80×80] [Content flex-grow] [Accept Button 75×32]
 */

import type { CSSProperties, HTMLAttributes } from "react";

import { Badge } from "@/components/badge/badge";

import styles from "./librarycardA.module.css";

export type LibraryCardAVariant = "default" | "variant2";

export type LibraryCardAProps = HTMLAttributes<HTMLDivElement> & {
  variant?: LibraryCardAVariant;
  imageSrc?: string;
  title?: string;
  description?: string;
  badgeLabel?: string;
  category?: string;
  fileSize?: string;
  createdAt?: string;
  onAccept?: () => void;
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

export function LibraryCardA({
  variant = "default",
  imageSrc = "/robot/Unitree G1.jpg",
  title = "Traffic_Sign_Dataset",
  description = "Collected from urban intersections",
  badgeLabel = "Local",
  category = "Smart City",
  fileSize = "2.4GB",
  createdAt = "Created 3 hours ago",
  onAccept,
  className,
  ...rest
}: LibraryCardAProps) {
  return (
    <div
      {...rest}
      className={[styles.root, styles[`variant-${variant}`], className]
        .filter(Boolean)
        .join(" ")}
      data-variant={variant}
    >
      {/* Thumbnail */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={imageSrc}
        alt={title}
        className={styles.thumbnail}
        width={80}
        height={80}
      />

      {/* Content */}
      <div className={styles.content}>
        <div className={styles.titleRow}>
          <div className={styles.nameGroup}>
            <span className={styles.title}>{title}</span>
            <span className={styles.description}>{description}</span>
          </div>
          <Badge variant="status" color="purple" size="sm">
            {badgeLabel}
          </Badge>
        </div>

        <div className={styles.metaRow}>
          <div className={styles.detail}>
            <span className={styles.detailIcon}>
              <MaskIcon src="/icon/Calendar.svg" size={16} />
            </span>
            <span className={styles.detailText}>{category}</span>
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

      {/* Accept Button */}
      <button type="button" className={styles.acceptBtn} onClick={onAccept}>
        Accept
      </button>
    </div>
  );
}

export default LibraryCardA;
