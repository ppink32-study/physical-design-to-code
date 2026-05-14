"use client";

/**
 * ProjectCardB — Figma node 18403:1736 (Library card B)
 *
 * state="default" : bg-surface-secondary, 테두리 없음
 * state="hover"   : bg-surface-secondary + 2px gradient border Mint→Purple (inline)
 *
 * Layout: horizontal, padding=20px, gap=8px, radius=12px, width=600px
 * 구조: [Thumbnail 80×80] [Content flex-grow] [Accept Button 75×32]
 */

import type { CSSProperties, HTMLAttributes } from "react";

import { Button } from "../button/button/button";
import styles from "./projectcardB.module.css";

export type ProjectCardBState = "default" | "hover";

export type ProjectCardBProps = HTMLAttributes<HTMLDivElement> & {
  state?: ProjectCardBState;
  imageSrc?: string;
  title?: string;
  description?: string;
  members?: string;
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

export function ProjectCardB({
  state = "default",
  imageSrc = "/robot/Unitree G1.jpg",
  title = "Traffic_Sign_Dataset",
  description = "Collected from urban intersections",
  members = "16 members",
  onAccept,
  className,
  ...rest
}: ProjectCardBProps) {
  return (
    <div
      {...rest}
      className={[styles.root, className].filter(Boolean).join(" ")}
      data-state={state}
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
        <div className={styles.nameGroup}>
          <span className={styles.title}>{title}</span>
          <span className={styles.description}>{description}</span>
        </div>

        <div className={styles.metaRow}>
          <div className={styles.detail}>
            <span className={styles.detailIcon}>
              <MaskIcon src="/icon/Users.svg" size={16} />
            </span>
            <span className={styles.detailText}>{members}</span>
          </div>
        </div>
      </div>

      {/* Accept Button — Button / secondary-solid, medium */}
      <Button variant="secondary-solid" size="medium" onClick={onAccept}>
        Accept
      </Button>
    </div>
  );
}

export default ProjectCardB;
