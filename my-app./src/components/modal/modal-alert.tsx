"use client";

/**
 * ModalAlert — Figma node 5453:10090
 *
 * - <ModalAlert>      : overlay + portal 전체 모달
 * - <ModalAlertPanel> : 오버레이 없이 다이얼로그 패널만 (Matrix 스토리용)
 *
 * type: "confirm" | "error" | "warning" | "success"
 */

import { useEffect } from "react";
import { createPortal } from "react-dom";
import type { ReactNode } from "react";

import { Button } from "@/components/button/button/button";
import styles from "./modal-alert.module.css";

export type ModalAlertType = "confirm" | "error" | "warning" | "success";

const ICON_URL: Record<ModalAlertType, string> = {
  confirm: "/modal/Property%201=confirm.svg",
  error:   "/modal/Property%201=error.svg",
  warning: "/modal/Property%201=warning.svg",
  success: "/modal/Property%201=success.svg",
};

export type ModalAlertProps = {
  open: boolean;
  onClose: () => void;
  type?: ModalAlertType;
  title?: string;
  message?: string;
  /** 회색 박스에 표시할 보조 텍스트 */
  dataBox?: string;
  onConfirm?: () => void;
  cancelLabel?: string;
  confirmLabel?: string;
  /** 버튼을 완전히 커스텀할 경우 */
  footer?: ReactNode;
};

/* -----------------------------------------------------------------
 *  패널 컴포넌트 (오버레이 없음 — Matrix 스토리에서 직접 사용)
 * ----------------------------------------------------------------- */
export type ModalAlertPanelProps = Omit<ModalAlertProps, "open" | "onClose"> & {
  onClose?: () => void;
};

export function ModalAlertPanel({
  type = "confirm",
  title = "Title",
  message = "메시지 영역입니다.",
  dataBox,
  onConfirm,
  onClose,
  cancelLabel = "취소",
  confirmLabel = "확인",
  footer,
}: ModalAlertPanelProps) {
  const footerContent = footer ?? (
    <div className={styles.btnGroup}>
      {onClose && (
        <Button
          variant="secondary-outline"
          size="large"
          className={styles.btn}
          onClick={onClose}
        >
          {cancelLabel}
        </Button>
      )}
      {onConfirm && (
        <Button
          variant="primary-solid"
          size="large"
          className={styles.btn}
          onClick={onConfirm}
        >
          {confirmLabel}
        </Button>
      )}
    </div>
  );

  return (
    <div className={styles.dialog} data-type={type}>
      <div className={styles.body}>
        <img src={ICON_URL[type]} alt="" aria-hidden="true" className={styles.icon} />
        <div className={styles.textCon}>
          <div className={styles.titleBody}>
            <p className={styles.title}>{title}</p>
            <p className={styles.message}>{message}</p>
          </div>
          {dataBox != null && (
            <div className={styles.dataBox}>{dataBox}</div>
          )}
        </div>
      </div>
      <div className={styles.footer}>{footerContent}</div>
    </div>
  );
}

/* -----------------------------------------------------------------
 *  전체 모달 (overlay + portal)
 * ----------------------------------------------------------------- */
export function ModalAlert({
  open,
  onClose,
  type = "confirm",
  title = "Title",
  message = "메시지 영역입니다.",
  dataBox,
  onConfirm,
  cancelLabel = "취소",
  confirmLabel = "확인",
  footer,
}: ModalAlertProps) {
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
      <div role="alertdialog" aria-modal="true" aria-labelledby="modal-alert-title">
        <ModalAlertPanel
          type={type}
          title={title}
          message={message}
          dataBox={dataBox}
          onConfirm={onConfirm}
          onClose={onClose}
          cancelLabel={cancelLabel}
          confirmLabel={confirmLabel}
          footer={footer}
        />
      </div>
    </div>,
    document.body
  );
}

export default ModalAlert;
