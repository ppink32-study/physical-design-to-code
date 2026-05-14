"use client";

/**
 * Empty (Empty state) — Figma node 12368:26042 기반
 * ----------------------------------------------------------------
 * Size variants
 *   small  : icon 48 / description Body/Sm  (12/16, medium)  / subtext Body/Xs (11/14, medium)
 *   medium : icon 60 / description Body/Base(14/20, regular) / subtext Body/Sm (12/16, medium)
 *   large  : icon 80 / description Body/Lg  (16/24, regular) / subtext Body/Md (13/20, medium)
 *
 * Icon variants (preset SVG)
 *   - data    : /icon/EmptyData.svg
 *   - image   : /icon/EmptyImage.svg
 *   - table   : /icon/EmptyTable.svg
 *   - upload  : /icon/EmptyUpload.svg
 *   - 또는 임의의 SVG 경로(string) / ReactNode 직접 전달 가능
 *
 * Tokens
 *   - icon  : --icon-surface-secondary
 *   - desc  : --on-surface-hint
 *   - sub   : --on-neutral-hint-muted
 *   - gap   : --spacing-2xs (4)
 */

import type { CSSProperties, HTMLAttributes, ReactNode } from "react";
import { forwardRef } from "react";

import styles from "./empty.module.css";

export type EmptySize = "small" | "medium" | "large";
export type EmptyIconType = "data" | "image" | "table" | "upload";

const ICON_PRESETS: Record<EmptyIconType, string> = {
  data: "/icon/EmptyData.svg",
  image: "/icon/EmptyImage.svg",
  table: "/icon/EmptyTable.svg",
  upload: "/icon/EmptyUpload.svg",
};

type NativeDivProps = Omit<HTMLAttributes<HTMLDivElement>, "children">;

export type EmptyProps = NativeDivProps & {
  size?: EmptySize;
  /** preset key, 또는 직접 svg 경로(string), 또는 직접 ReactNode */
  icon?: EmptyIconType | string | ReactNode;
  /** 메인 설명 텍스트 (Description) */
  description?: ReactNode;
  /** 보조 설명 텍스트 (Subtext) */
  subtext?: ReactNode;
};

function isIconPresetKey(value: unknown): value is EmptyIconType {
  return (
    typeof value === "string" &&
    (value === "data" ||
      value === "image" ||
      value === "table" ||
      value === "upload")
  );
}

function MaskIcon({ src }: { src: string }) {
  const style: CSSProperties = {
    WebkitMaskImage: `url(${src})`,
    maskImage: `url(${src})`,
  };
  return <span aria-hidden="true" className={styles.icon} style={style} />;
}

function renderIcon(icon: EmptyProps["icon"]): ReactNode {
  if (icon === undefined || icon === null) return null;
  if (isIconPresetKey(icon)) return <MaskIcon src={ICON_PRESETS[icon]} />;
  if (typeof icon === "string") return <MaskIcon src={icon} />;
  return (
    <span aria-hidden="true" className={styles.iconCustom}>
      {icon}
    </span>
  );
}

function EmptyInner(
  props: EmptyProps,
  ref: React.ForwardedRef<HTMLDivElement>,
) {
  const {
    size = "medium",
    icon = "data",
    description = "Description",
    subtext,
    className,
    ...rest
  } = props;

  const rootClass = [styles.root, className].filter(Boolean).join(" ");
  const hasText = description !== undefined && description !== null && description !== "";

  return (
    <div
      {...rest}
      ref={ref}
      className={rootClass}
      data-size={size}
      role="status"
      aria-live="polite"
    >
      {icon !== undefined && icon !== null ? (
        <div className={styles.iconWrap}>{renderIcon(icon)}</div>
      ) : null}

      {hasText ? (
        <div className={styles.textGroup}>
          <p className={styles.description}>{description}</p>
          {subtext ? <p className={styles.subtext}>{subtext}</p> : null}
        </div>
      ) : null}
    </div>
  );
}

export const Empty = forwardRef<HTMLDivElement, EmptyProps>(EmptyInner);
Empty.displayName = "Empty";

export default Empty;
