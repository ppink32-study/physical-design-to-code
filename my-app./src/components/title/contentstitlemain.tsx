"use client";

/**
 * ContentsTitleMain — Contents Title / Main (Figma node 4790:206)
 * ----------------------------------------------------------------
 * 루트 폭: 1496px (max-width: 100%)
 *
 * 구조
 *   - height 40px
 *   - 좌측 (flex:1): Title(H4) + Badge(slot) + Toggle(slot) + Hint(info icon + text)
 *   - 우측 (gap=40): Actions 슬롯 (버튼 그룹)
 *
 * 토큰
 *   - title  : Heading/H4 (20/24 semibold) on-surface-base
 *   - hint   : Body/Sm-Medium (12/16 -0.5) on-surface-hint
 *            + leading Icon/InfoFill (16×16, icon-surface teriary)
 *   - gap    : 좌영역 inner gap=md(12) / 배지 gap=sm(8) / 우 actions gap=sm(8)
 */

import type { HTMLAttributes, ReactNode, CSSProperties } from "react";
import { forwardRef } from "react";

import styles from "./contentstitlemain.module.css";

export type ContentsTitleMainProps = Omit<
  HTMLAttributes<HTMLDivElement>,
  "title"
> & {
  /** 텍스트 제목 — children 으로 override 가능 */
  title?: string;
  children?: ReactNode;
  /** 제목 우측에 놓일 배지 슬롯 (Badge 등) */
  badge?: ReactNode;
  /** 배지 뒤에 놓일 Toggle 슬롯 (Toggle 등) */
  toggle?: ReactNode;
  /** Hint 메시지 (InfoFill 아이콘 + 작은 텍스트) */
  hint?: ReactNode;
  /** 우측 버튼 그룹 슬롯 */
  actions?: ReactNode;
};

/* =================================================================
 * InfoFill mask icon (16×16)
 * =============================================================== */
function InfoFillIcon() {
  const style: CSSProperties = {
    WebkitMaskImage: "url(/icon/InfoFill.svg)",
    maskImage: "url(/icon/InfoFill.svg)",
  };
  return (
    <span aria-hidden="true" className={styles.hintIcon} style={style} />
  );
}

/* =================================================================
 * Component
 * =============================================================== */
function ContentsTitleMainInner(
  props: ContentsTitleMainProps,
  ref: React.ForwardedRef<HTMLDivElement>,
) {
  const {
    title = "Header Title",
    children,
    badge,
    toggle,
    hint,
    actions,
    className,
    style,
    ...rest
  } = props;

  const rootClass = [styles.root, className].filter(Boolean).join(" ");

  const titleNode = children ?? <span className={styles.title}>{title}</span>;

  return (
    <div {...rest} ref={ref} className={rootClass} style={style}>
      <div className={styles.leftArea}>
        <div className={styles.titleBadge}>
          {titleNode}
          {badge ? <span className={styles.badgeSlot}>{badge}</span> : null}
        </div>
        {toggle ? <span className={styles.toggleSlot}>{toggle}</span> : null}
        {hint != null ? (
          <span className={styles.hint}>
            <InfoFillIcon />
            <span className={styles.hintText}>{hint}</span>
          </span>
        ) : null}
      </div>
      {actions ? <div className={styles.actions}>{actions}</div> : null}
    </div>
  );
}

export const ContentsTitleMain = forwardRef<
  HTMLDivElement,
  ContentsTitleMainProps
>(ContentsTitleMainInner);
ContentsTitleMain.displayName = "ContentsTitleMain";

export default ContentsTitleMain;
