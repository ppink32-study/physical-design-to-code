"use client";

/**
 * Modal — Figma node 6446:446809
 *
 * - <Modal>       : overlay + dialog 패널 (createPortal 사용)
 * - size          : "small"(500px) | "medium"(800px) | "large"(1140px)
 * - footer        : 버튼 슬롯 (justify-end, border-top)
 */

import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import type { ReactNode } from "react";

import styles from "./modal.module.css";

export type ModalSize = "small" | "medium" | "large";

export type ModalProps = {
  open: boolean;
  onClose: () => void;
  title?: string;
  size?: ModalSize;
  /** body 콘텐츠 슬롯 */
  children?: ReactNode;
  /** footer 버튼 슬롯 */
  footer?: ReactNode;
};

export function Modal({
  open,
  onClose,
  title,
  size = "medium",
  children,
  footer,
}: ModalProps) {
  const dialogRef = useRef<HTMLDivElement>(null);

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
      role="presentation"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? "modal-title" : undefined}
        className={styles.dialog}
        data-size={size}
      >
        {/* Header */}
        <div className={styles.header}>
          {title && (
            <span id="modal-title" className={styles.title}>
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

export default Modal;
