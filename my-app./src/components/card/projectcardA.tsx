

"use client";

/**
 * ProjectCardA — Figma node 18404:696 (brand) / 18404:755 (light)
 *
 * type="brand" : neutral 계열 토큰, default border=border-neutral
 * type="light" : surface 계열 토큰, default border=border-surface
 *
 * state="default" : 1px inline border
 * state="hover"   : 2px gradient border Mint→Purple (inline)
 *                   brand: backgroundhover.svg
 *
 * Layout: vertical, width=266px, radius=12px
 * 구조: [ImageArea 200px] [ContentArea: title + desc + meta]
 */

import type { CSSProperties, HTMLAttributes } from "react";

import styles from "./projectcardA.module.css";

export type ProjectCardAType = "brand" | "light";
export type ProjectCardAState = "default" | "hover";

export type ProjectCardAProps = HTMLAttributes<HTMLDivElement> & {
  type?: ProjectCardAType;
  state?: ProjectCardAState;
  imageSrc?: string;
  title?: string;
  description?: string;
  members?: string;
  onLink?: () => void;
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

export function ProjectCardA({
  type = "light",
  state = "default",
  imageSrc = "/robot/Unitree G1.jpg",
  title = "Traffic_Sign_Dataset",
  description = "Collected from urban intersections",
  members = "8 members",
  className,
  style: styleProp,
  ...rest
}: ProjectCardAProps) {
  const typeClass = type === "brand" ? styles.typeBrand : styles.typeLight;

  // border / hover gradient 는 CSS 모듈(:hover & [data-state="hover"])에서 처리.
  // box-sizing:border-box + width:266px 로 default(1px) ↔ hover(2px) 외곽 사이즈 동일.
  return (
    <div
      {...rest}
      className={[styles.root, typeClass, className].filter(Boolean).join(" ")}
      data-state={state}
      data-type={type}
      style={styleProp}
    >
      {/* Image area */}
      <div className={styles.imageArea}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={imageSrc}
          alt={title}
          className={styles.robotImg}
          width={200}
          height={200}
        />
      </div>

      {/* Content area */}
      <div className={styles.content}>
        <div className={styles.nameGroup}>
          <span className={styles.title}>{title}</span>
          <span className={styles.description}>{description}</span>
        </div>

        <div className={styles.metaRow}>
          <div className={styles.membersGroup}>
            <span className={styles.memberIcon}>
              <MaskIcon src="/icon/User.svg" size={16} />
            </span>
            <span className={styles.memberText}>{members}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProjectCardA;
