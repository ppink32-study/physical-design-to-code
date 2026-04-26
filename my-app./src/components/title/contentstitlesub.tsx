"use client";

/**
 * ContentsTitleSub — Contents Title / Sub (Figma node 5784:48007)
 * ----------------------------------------------------------------
 * 루트 폭: 1496px (max-width: 100%)
 *
 * 구조
 *   - height 32px (accordion 버튼 클릭 영역 포함)
 *   - 좌측 (flex:1, gap=8):
 *     · Title+Icon (gap=4):
 *         - Label (gap=2) : title(H6) + (optional) required dot 4×4 (red)
 *         - (optional) InfoFill 16×16 (icon-surface-teriary)
 *     · (optional) Count badge : purple-tint pill, h=20, purple text
 *   - 우측 (선택 1가지):
 *     · accordion=true → 24×24 버튼 (expanded → ChevronUp, else → ChevronDown)
 *     · button={...}   → text 버튼 (border, h=24, minw=44)
 *
 * 토큰
 *   - title        : Heading/H6 (16/22 semibold) on-surface-base
 *   - required dot : 4×4 circle, --accent-red-accent-red (#ff312e)
 *   - info icon    : 16×16 icon-surface-teriary
 *   - count badge  : bg --context-background-tint-bg-purple-tint
 *                    text --accent-purple-accent-purple (Body/Sm-Medium)
 *   - accordion    : size 24, chevron 16, icon-surface
 *   - text button  : border --border-border-surface-border-surface
 *                    text Body/Sm_SemiB on-surface
 */

import type { HTMLAttributes, ReactNode, CSSProperties } from "react";
import { forwardRef } from "react";

import styles from "./contentstitlesub.module.css";

export type ContentsTitleSubProps = Omit<
  HTMLAttributes<HTMLDivElement>,
  "title"
> & {
  /** 제목 텍스트. children 으로 override 가능 */
  title?: string;
  children?: ReactNode;
  /** 필수 표시 빨간 점 */
  required?: boolean;
  /** Info 아이콘 표시 */
  infoIcon?: boolean;
  /** 우측 count badge 에 표시할 숫자/텍스트. undefined 면 숨김 */
  count?: ReactNode;
  /** 우측 Accordion 버튼 */
  accordion?: boolean;
  /** accordion=true 일 때 펼침 상태 (true=Up / false=Down) */
  expanded?: boolean;
  /** Accordion 버튼 클릭 핸들러 */
  onToggle?: () => void;
  /**
   * 우측 text 버튼. accordion 이 false 일 때만 렌더.
   *   - true → 기본 "Button" 텍스트
   *   - string → 해당 텍스트 사용
   *   - ReactNode → 그대로 슬롯으로 사용
   */
  button?: boolean | string | ReactNode;
};

/* =================================================================
 * Mask icon helper
 * =============================================================== */
function MaskIcon({
  src,
  size = 16,
  className,
}: {
  src: string;
  size?: number;
  className?: string;
}) {
  const style: CSSProperties = {
    WebkitMaskImage: `url(${src})`,
    maskImage: `url(${src})`,
    width: size,
    height: size,
  };
  return (
    <span
      aria-hidden="true"
      className={[styles.icon, className].filter(Boolean).join(" ")}
      style={style}
    />
  );
}

/* =================================================================
 * Component
 * =============================================================== */
function ContentsTitleSubInner(
  props: ContentsTitleSubProps,
  ref: React.ForwardedRef<HTMLDivElement>,
) {
  const {
    title = "Header Title",
    children,
    required = false,
    infoIcon = false,
    count,
    accordion = false,
    expanded = true,
    onToggle,
    button,
    className,
    style,
    ...rest
  } = props;

  const rootClass = [styles.root, className].filter(Boolean).join(" ");

  const titleNode = children ?? <span className={styles.title}>{title}</span>;

  let rightEl: ReactNode = null;
  if (accordion) {
    rightEl = (
      <button
        type="button"
        aria-label={expanded ? "Collapse" : "Expand"}
        aria-expanded={expanded}
        className={styles.accordionBtn}
        onClick={onToggle}
      >
        <MaskIcon
          src={expanded ? "/icon/ChevronUp.svg" : "/icon/ChevronDown.svg"}
        />
      </button>
    );
  } else if (button) {
    const label = button === true ? "Button" : button;
    const isNode = typeof label !== "string" && typeof label !== "number";
    rightEl = isNode ? (
      <span className={styles.buttonSlot}>{label as ReactNode}</span>
    ) : (
      <button type="button" className={styles.textBtn}>
        <span className={styles.textBtnInner}>{label as ReactNode}</span>
      </button>
    );
  }

  return (
    <div {...rest} ref={ref} className={rootClass} style={style}>
      <div className={styles.leftArea}>
        <div className={styles.titleIcon}>
          <span className={styles.label}>
            {titleNode}
            {required ? (
              <span aria-hidden="true" className={styles.requiredDot} />
            ) : null}
          </span>
          {infoIcon ? <MaskIcon src="/icon/InfoFill.svg" /> : null}
        </div>
        {count !== undefined && count !== null && count !== false ? (
          <span className={styles.countBadge}>
            <span className={styles.countText}>{count}</span>
          </span>
        ) : null}
      </div>
      {rightEl}
    </div>
  );
}

export const ContentsTitleSub = forwardRef<
  HTMLDivElement,
  ContentsTitleSubProps
>(ContentsTitleSubInner);
ContentsTitleSub.displayName = "ContentsTitleSub";

export default ContentsTitleSub;
