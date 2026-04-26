"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { Button } from "@/components/button/button";
import { figmaNodeUrl, type FigmaRef } from "./manifest";
import styles from "./figma-link.module.css";

function FigmaGlyph({ size = 14 }: { size?: number }) {
  const style: CSSProperties = {
    width: size,
    height: size,
    display: "inline-block",
    backgroundColor: "currentColor",
    WebkitMaskImage: "url(/icon/Link.svg)",
    maskImage: "url(/icon/Link.svg)",
    WebkitMaskRepeat: "no-repeat",
    maskRepeat: "no-repeat",
    WebkitMaskPosition: "center",
    maskPosition: "center",
    WebkitMaskSize: "contain",
    maskSize: "contain",
    flexShrink: 0,
  };
  return <span aria-hidden="true" style={style} />;
}

export type FigmaLinkButtonProps = {
  figma: FigmaRef;
};

export function FigmaLinkButton({ figma }: FigmaLinkButtonProps) {
  const { primary, sub } = figma;
  const hasSub = sub && sub.length > 0;
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (!wrapRef.current) return;
      if (!wrapRef.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const primaryUrl = figmaNodeUrl(primary.nodeId);

  if (!hasSub) {
    return (
      <a
        href={primaryUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={styles.anchor}
      >
        <Button
          variant="secondary-outline"
          size="medium"
          shape="round"
          leftIcon={<FigmaGlyph size={14} />}
        >
          Figma에서 보기
        </Button>
      </a>
    );
  }

  return (
    <div className={styles.wrap} ref={wrapRef}>
      <Button
        variant="secondary-outline"
        size="medium"
        shape="round"
        leftIcon={<FigmaGlyph size={14} />}
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-haspopup="menu"
      >
        Figma에서 보기
        <span className={styles.chev} aria-hidden>
          ▾
        </span>
      </Button>
      {open ? (
        <div className={styles.menu} role="menu">
          <a
            href={primaryUrl}
            target="_blank"
            rel="noopener noreferrer"
            role="menuitem"
            className={styles.menuItem}
            onClick={() => setOpen(false)}
          >
            <span className={styles.menuItemLabel}>
              {primary.label ?? "Primary"}
            </span>
            <span className={styles.menuItemNode}>#{primary.nodeId}</span>
          </a>
          {sub!.map((s) => (
            <a
              key={s.nodeId}
              href={figmaNodeUrl(s.nodeId)}
              target="_blank"
              rel="noopener noreferrer"
              role="menuitem"
              className={styles.menuItem}
              onClick={() => setOpen(false)}
            >
              <span className={styles.menuItemLabel}>
                {s.label ?? "Sub"}
              </span>
              <span className={styles.menuItemNode}>#{s.nodeId}</span>
            </a>
          ))}
        </div>
      ) : null}
    </div>
  );
}

export default FigmaLinkButton;
