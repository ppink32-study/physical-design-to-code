"use client";

/**
 * PageTitle — Page Title (Figma MCP · node 4790:161)
 * ----------------------------------------------------------------
 * 루트 폭: 1612px (Figma 실측, 좁은 뷰포트에서는 max-width:100%로 축소)
 *
 * 두 가지 레이아웃
 *   - 1d : 좌측 제목(+ hint bubble) 한 줄. height 68px, pt=20 pb=12.
 *   - 2d : 좌측 (뒤로가기 + badges + 제목 + hint bubble) + 우측 buttons 슬롯 한 줄.
 *          gap=40, items-center. 뒤로가기는 Figma node 4790:177 — `backButton` 슬롯.
 *
 * 토큰
 *   - Title   : Heading/H3 (24px / 32px semibold)
 *   - Hint    : Body/Md-Medium (13px / 20px, -0.4)
 *               color: --context-foreground-surface-on-surface-hint (#787a88)
 *   - Bubble  : h=32, pl=16 pr=12, gap=8,
 *               radius tl=50 tr=full br=full bl=8 (Figma 실측)
 *   - Badge/Action 슬롯은 외부에서 주입 (Badge / Button 컴포넌트 재사용)
 */

import type { HTMLAttributes, ReactNode, CSSProperties } from "react";
import { forwardRef } from "react";

import styles from "./pagetitle.module.css";

export type PageTitleType = "1d" | "2d";

export type PageTitleProps = Omit<HTMLAttributes<HTMLDivElement>, "title"> & {
  /** 1d (한 줄 제목) / 2d (제목 + 배지 + 우측 액션) */
  type?: PageTitleType;
  /** 기본 텍스트 제목 — children 으로 override 가능 */
  title?: string;
  /** children override */
  children?: ReactNode;
  /** Hint bubble 메시지 (ReactNode). 값이 있으면 bubble 렌더 */
  hint?: ReactNode;
  /** bubble leading icon 커스텀. 미지정 시 기본 꼬리 SVG 삽입 */
  hintIcon?: ReactNode;
  /** 2d 전용. 좌측 맨 앞(배지 앞) — 뒤로가기 등 */
  backButton?: ReactNode;
  /** 2d 에서 제목 좌측에 배치되는 배지 슬롯 */
  badges?: ReactNode;
  /** 2d 에서 우측에 배치되는 버튼 그룹 슬롯 */
  actions?: ReactNode;
};

/* =================================================================
 * Default bubble icon — public/icon/Bubble.svg (11×8)
 *   mask-image + currentColor 로 적용해 light/dark 테마 자동 대응
 * =============================================================== */
function DefaultBubbleIcon() {
  return (
    <span
      aria-hidden="true"
      className={styles.bubbleIcon}
      style={{
        WebkitMaskImage: "url(/icon/Bubble.svg)",
        maskImage: "url(/icon/Bubble.svg)",
      }}
    />
  );
}

/* =================================================================
 * Component
 * =============================================================== */
function PageTitleInner(
  props: PageTitleProps,
  ref: React.ForwardedRef<HTMLDivElement>,
) {
  const {
    type = "1d",
    title = "Header Title",
    children,
    hint,
    hintIcon,
    backButton,
    badges,
    actions,
    className,
    style,
    ...rest
  } = props;

  const rootClass = [styles.root, className].filter(Boolean).join(" ");
  const rootStyle: CSSProperties = { ...style };

  const titleNode = children ?? <span className={styles.title}>{title}</span>;

  const bubbleNode = hint != null ? (
    <div className={styles.bubble} data-name="hint-bubble">
      <span className={styles.bubbleIconWrap}>
        {hintIcon ?? <DefaultBubbleIcon />}
      </span>
      <span className={styles.bubbleText}>{hint}</span>
    </div>
  ) : null;

  if (type === "1d") {
    return (
      <div
        {...rest}
        ref={ref}
        className={rootClass}
        data-type="1d"
        style={rootStyle}
      >
        <div className={styles.leftArea}>
          <div className={styles.titleWrap}>{titleNode}</div>
          {bubbleNode}
        </div>
      </div>
    );
  }

  /* 2d */
  return (
    <div
      {...rest}
      ref={ref}
      className={rootClass}
      data-type="2d"
      style={rootStyle}
    >
      <div className={styles.leftArea}>
        {backButton ? (
          <div className={styles.backSlot} data-name="page-title-back">
            {backButton}
          </div>
        ) : null}
        {badges ? <div className={styles.badges}>{badges}</div> : null}
        <div className={styles.titleWrap}>{titleNode}</div>
        {bubbleNode}
      </div>
      {actions ? <div className={styles.actions}>{actions}</div> : null}
    </div>
  );
}

export const PageTitle = forwardRef<HTMLDivElement, PageTitleProps>(PageTitleInner);
PageTitle.displayName = "PageTitle";

export default PageTitle;
