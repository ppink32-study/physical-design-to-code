"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import styles from "./toast.module.css";

type ToastItem = {
  id: number;
  message: string;
  detail?: string;
};

type ToastContextValue = {
  notify: (message: string, detail?: string) => void;
};

const ToastContext = createContext<ToastContextValue | null>(null);

export function ToastProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<ToastItem[]>([]);
  const counter = useRef(0);

  const notify = useCallback((message: string, detail?: string) => {
    counter.current += 1;
    const id = counter.current;
    setItems((prev) => [...prev, { id, message, detail }]);
    setTimeout(() => {
      setItems((prev) => prev.filter((i) => i.id !== id));
    }, 1800);
  }, []);

  const value = useMemo(() => ({ notify }), [notify]);

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div className={styles.viewport} aria-live="polite" aria-atomic="true">
        {items.map((it) => (
          <div key={it.id} className={styles.toast} role="status">
            <span className={styles.tick} aria-hidden>
              ✓
            </span>
            <div className={styles.body}>
              <strong className={styles.message}>{it.message}</strong>
              {it.detail ? (
                <code className={styles.detail}>{it.detail}</code>
              ) : null}
            </div>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast(): ToastContextValue {
  const ctx = useContext(ToastContext);
  if (ctx) return ctx;
  // Fallback: provider 미적용 환경에서도 동작하도록 콘솔 출력
  return {
    notify: (m: string, d?: string) => {
      if (typeof window !== "undefined") {
        // eslint-disable-next-line no-console
        console.info("[toast]", m, d ?? "");
      }
    },
  };
}

/**
 * 클립보드에 텍스트를 복사한다. Clipboard API 가 없거나 거부된 경우
 * document.execCommand("copy") 로 폴백.
 */
export async function copyToClipboard(text: string): Promise<boolean> {
  try {
    if (navigator?.clipboard?.writeText) {
      await navigator.clipboard.writeText(text);
      return true;
    }
  } catch {
    // fallthrough
  }
  try {
    const ta = document.createElement("textarea");
    ta.value = text;
    ta.style.position = "fixed";
    ta.style.opacity = "0";
    document.body.appendChild(ta);
    ta.focus();
    ta.select();
    const ok = document.execCommand("copy");
    document.body.removeChild(ta);
    return ok;
  } catch {
    return false;
  }
}

/** 전역 토스트 + 복사 유틸을 하나로 묶은 훅 */
export function useCopyToast() {
  const { notify } = useToast();
  return useCallback(
    async (value: string, label?: string) => {
      const ok = await copyToClipboard(value);
      if (ok) {
        notify("복사됨", label ?? value);
      } else {
        notify("복사에 실패했어요", value);
      }
    },
    [notify]
  );
}

/**
 * ToastProvider 외부에서 필요 시 간편히 사용할 수 있는 보조 훅.
 * 내부적으로 useToast 와 동일하지만 이름이 명시적.
 */
export const useNotify = useToast;
