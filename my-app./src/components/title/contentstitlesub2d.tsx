"use client";

/**
 * ContentsTitleSub2D — Contents Title / Sub (2d) (Figma node 7544:663)
 * ----------------------------------------------------------------
 * 루트 폭: 1496px (max-width: 100%)
 *
 * 구조 (height 32px, root gap=40)
 *   - 좌측 (flex:1, gap=4):
 *     · Title+Badge (gap=8):
 *         - Bullet+Title (gap=2) : title(Body/Base_SemiB 14/20) + trailing dot 4×4
 *         - (optional) Count badge (purple-tint pill, 20h)
 *     · (optional) Add button (24×24, AddFill)
 *   - 우측 : Toggle (reverse 배치, 라벨 좌측)
 *
 * 토큰
 *   - title    : Body/Base_SemiB (14/20 semibold) on-surface-base
 *   - bullet   : 4×4 circle, --accent-red-accent-red  (※ Figma svg 는 채워진 dot)
 *   - badge    : ContentsTitleSub 의 count badge 와 동일 (purple tint / purple text)
 *   - addBtn   : 24×24 버튼, AddFill 16×16 icon-surface
 *   - toggle   : 외부 Toggle 컴포넌트 주입 (reverse 권장)
 */

import type { HTMLAttributes, ReactNode, CSSProperties } from "react";
import { forwardRef } from "react";

import styles from "./contentstitlesub2d.module.css";

export type ContentsTitleSub2DProps = Omit<
  HTMLAttributes<HTMLDivElement>,
  "title"
> & {
  /** 제목 텍스트. children 으로 override 가능 */
  title?: string;
  children?: ReactNode;
  /** title 뒤의 bullet dot 표시. 기본 true (Figma 실측) */
  bullet?: boolean;
  /** 우측 count 배지에 표시할 숫자/텍스트 (badge slot 없을 때 사용) */
  count?: ReactNode;
  /** Count 배지 slot (ReactNode 직접 주입. count 보다 우선) */
  badge?: ReactNode;
  /** Add 버튼 (24×24 + AddFill) 표시 */
  addBtn?: boolean;
  /** Add 버튼 클릭 핸들러 */
  onAdd?: () => void;
  /** 우측 Toggle slot (보통 <Toggle reverse /> 를 넣음) */
  toggle?: ReactNode;
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
function ContentsTitleSub2DInner(
  props: ContentsTitleSub2DProps,
  ref: React.ForwardedRef<HTMLDivElement>,
) {
  const {
    title = "3depth Header Title",
    children,
    bullet = true,
    count,
    badge,
    addBtn = false,
    onAdd,
    toggle,
    className,
    style,
    ...rest
  } = props;

  const rootClass = [styles.root, className].filter(Boolean).join(" ");

  const titleNode = children ?? <span className={styles.title}>{title}</span>;

  const badgeNode = badge ?? (count !== undefined && count !== null && count !== false ? (
    <span className={styles.countBadge}>
      <span className={styles.countText}>{count}</span>
    </span>
  ) : null);

  return (
    <div {...rest} ref={ref} className={rootClass} style={style}>
      <div className={styles.leftArea}>
        <div className={styles.titleBadge}>
          <span className={styles.bulletTitle}>
            {titleNode}
            {bullet ? (
              <span aria-hidden="true" className={styles.bulletDot} />
            ) : null}
          </span>
          {badgeNode}
        </div>

        {addBtn ? (
          <button
            type="button"
            aria-label="Add"
            className={styles.addBtn}
            onClick={onAdd}
          >
            <MaskIcon src="/icon/AddFill.svg" />
          </button>
        ) : null}
      </div>

      {toggle ? <span className={styles.toggleSlot}>{toggle}</span> : null}
    </div>
  );
}

export const ContentsTitleSub2D = forwardRef<
  HTMLDivElement,
  ContentsTitleSub2DProps
>(ContentsTitleSub2DInner);
ContentsTitleSub2D.displayName = "ContentsTitleSub2D";

export default ContentsTitleSub2D;
