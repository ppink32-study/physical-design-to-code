"use client";

/**
 * Drawer — Side Drawer (Figma node 8256:8490)
 *
 * - size        : "small"(420px) | "medium"(720px) | "large"(1140px max)
 * - onBack      : 제공 시 Back 버튼(ChevronLeft) 표시
 * - badges      : 타이틀 옆 badge 슬롯
 * - titleActions: 타이틀 옆 아이콘 액션 슬롯 (Pencil-Line, ChevronDown 등)
 * - headerControls: X 버튼 앞 우측 영역 슬롯 (Toggle 등)
 * - footer      : 하단 버튼 슬롯 (justify-end, border-top)
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
  /** Back 버튼 표시 및 클릭 핸들러 */
  onBack?: () => void;
  /** 타이틀 옆 badge 슬롯 */
  badges?: ReactNode;
  /** 타이틀 옆 아이콘 액션 슬롯 (Pencil-Line, ChevronDown 등) */
  titleActions?: ReactNode;
  /** X 버튼 앞 우측 영역 슬롯 (Toggle 등) */
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
        {/* Header */}
        <div className={styles.header}>
          {/* Left: Back + Title 영역 */}
          <div className={styles.headerLeft}>
            {onBack && (
              <button
                type="button"
                className={styles.backBtn}
                aria-label="뒤로가기"
                onClick={onBack}
              >
                <span className={styles.backBtnGlyph} aria-hidden="true" />
              </button>
            )}
            <div className={styles.titleRow}>
              <span id="drawer-title" className={styles.title}>
                {title}
              </span>
              {badges && (
                <div className={styles.badges}>{badges}</div>
              )}
              {titleActions && (
                <div className={styles.titleActions}>{titleActions}</div>
              )}
            </div>
          </div>

          {/* Right: Controls + X 버튼 */}
          <div className={styles.headerRight}>
            {headerControls && (
              <div className={styles.headerControls}>{headerControls}</div>
            )}
            <button
              type="button"
              className={styles.closeBtn}
              aria-label="닫기"
              onClick={onClose}
            >
              <span className={styles.closeBtnGlyph} aria-hidden="true" />
            </button>
          </div>
        </div>

        {/* Body */}
        {children != null && (
          <div className={styles.body}>{children}</div>
        )}

        {/* Footer */}
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

export default Drawer;
