"use client";

/**
 * Drawer — Side Drawer
 *
 * - <Drawer>      : overlay + side panel (createPortal 사용)
 * - size          : "small"(420px) | "medium"(720px) | "large"(1140px max)
 * - side          : "right"(기본) | "left"
 * - footer        : 버튼 슬롯 (justify-end, border-top)
 *
 * Modal 컴포넌트와 동일한 portal/overlay/ESC/scroll-lock 패턴을 사용한다.
 */

import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import type { ReactNode } from "react";

import styles from "./drawer.module.css";

export type DrawerSize = "small" | "medium" | "large";
export type DrawerSide = "left" | "right";

export type DrawerProps = {
  open: boolean;
  onClose: () => void;
  title?: string;
  size?: DrawerSize;
  side?: DrawerSide;
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
  side = "right",
  children,
  footer,
}: DrawerProps) {
  const panelRef = useRef<HTMLDivElement>(null);

  /* ESC 키로 닫기 */
  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [open, onClose]);

  /* 열려 있는 동안 body 스크롤 잠금 */
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
      data-side={side}
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
        data-side={side}
      >
        {/* Header */}
        <div className={styles.header}>
          {title && (
            <span id="drawer-title" className={styles.title}>
              {title}
            </span>
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
