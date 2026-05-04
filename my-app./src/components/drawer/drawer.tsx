"use client";

/**
 * Drawer — Side Drawer (Figma node 8256:8490)
 *
 * Header 순서 (Figma node 8252:1461 기준, 좌→우):
 *   Left : [Back btn?] [titlePrefix?] [badges?] [title text] [titleActions?]
 *   Right: [headerControls?] [X btn]
 *
 * - size          : "small"(420px) | "medium"(720px) | "large"(1140px max)
 * - onBack        : 제공 시 Back(ChevronLeft 40×40) 버튼 표시
 * - titlePrefix   : 타이틀 앞 슬롯 (Bookmark/Like 32×32 등)
 * - badges        : 타이틀 앞 Badge 슬롯 (titlePrefix 뒤)
 * - titleActions  : 타이틀 뒤 아이콘 액션 슬롯 (Pencil-Line, ChevronDown 등)
 * - headerControls: X 버튼 앞 우측 슬롯 (Toggle 등)
 * - footer        : 하단 버튼 슬롯 (justify-end, border-top)
 */

import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import type { ReactNode } from "react";

import styles from "./drawer.module.css";

export type DrawerSize = "small" | "medium" | "large";

export type DrawerProps = {
  open: boolean;
  onClose: () => void;
  title?: string;
  size?: DrawerSize;
  /** Back(ChevronLeft) 버튼 — 제공 시 타이틀 가장 앞에 표시 */
  onBack?: () => void;
  /** 타이틀 앞 슬롯 (Bookmark/Like 버튼 등, Back 버튼 바로 뒤) */
  titlePrefix?: ReactNode;
  /** titlePrefix 뒤, 타이틀 앞 Badge 슬롯 */
  badges?: ReactNode;
  /** 타이틀 뒤 아이콘 액션 슬롯 (Pencil-Line, ChevronDown 등) */
  titleActions?: ReactNode;
  /** X 버튼 앞 우측 슬롯 (Toggle 등) */
  headerControls?: ReactNode;
  /** body 콘텐츠 슬롯 */
  children?: ReactNode;
  /** footer 버튼 슬롯 */
  footer?: ReactNode;
};

export function Drawer({
  open,
  onClose,
  title,
  size = "medium",
  onBack,
  titlePrefix,
  badges,
  titleActions,
  headerControls,
  children,
  footer,
}: DrawerProps) {
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [open, onClose]);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = prev; };
  }, [open]);

  if (!open) return null;

  return createPortal(
    <div
      className={styles.overlay}
      role="presentation"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? "drawer-title" : undefined}
        className={styles.panel}
        data-size={size}
      >
        <DrawerHeader
          title={title}
          onClose={onClose}
          onBack={onBack}
          titlePrefix={titlePrefix}
          badges={badges}
          titleActions={titleActions}
          headerControls={headerControls}
        />

        {children != null && (
          <div className={styles.body}>{children}</div>
        )}

        {footer != null && (
          <div className={styles.footer}>
            <div className={styles.btnGroup}>{footer}</div>
          </div>
        )}
      </div>
    </div>,
    document.body
  );
}

/* -----------------------------------------------------------------
 * DrawerHeader — 헤더 단독 렌더링용 서브컴포넌트 (스토리북 인라인 미리보기 등)
 * ----------------------------------------------------------------- */
export type DrawerHeaderProps = Pick<
  DrawerProps,
  "title" | "onBack" | "titlePrefix" | "badges" | "titleActions" | "headerControls"
> & {
  onClose?: () => void;
};

export function DrawerHeader({
  title,
  onClose,
  onBack,
  titlePrefix,
  badges,
  titleActions,
  headerControls,
}: DrawerHeaderProps) {
  return (
    <div className={styles.header}>
      {/* Left: [Back] [titlePrefix] [badges] [title text] [titleActions] */}
      <div className={styles.headerLeft}>
        {onBack && (
          <button type="button" className={styles.backBtn} aria-label="뒤로가기" onClick={onBack}>
            <span className={styles.backBtnGlyph} aria-hidden="true" />
          </button>
        )}
        {titlePrefix && (
          <div className={styles.titlePrefix}>{titlePrefix}</div>
        )}
        {badges && (
          <div className={styles.badges}>{badges}</div>
        )}
        <span id="drawer-title" className={styles.title}>{title}</span>
        {titleActions && (
          <div className={styles.titleActions}>{titleActions}</div>
        )}
      </div>

      {/* Right: [headerControls] [X btn] */}
      <div className={styles.headerRight}>
        {headerControls && (
          <div className={styles.headerControls}>{headerControls}</div>
        )}
        {onClose && (
          <button type="button" className={styles.closeBtn} aria-label="닫기" onClick={onClose}>
            <span className={styles.closeBtnGlyph} aria-hidden="true" />
          </button>
        )}
      </div>
    </div>
  );
}

export default Drawer;
