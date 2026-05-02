import type { CSSProperties, ReactNode } from "react";

/* -----------------------------------------------------------
 *  공통 CSS 다운로드 유틸
 * ----------------------------------------------------------- */
export function triggerCssDownload(content: string, fileName: string) {
  const blob = new Blob([content], { type: "text/css;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = fileName;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  window.setTimeout(() => URL.revokeObjectURL(url), 1000);
}

export function DownloadButton({ fileName, css }: { fileName: string; css: string }) {
  return (
    <button
      type="button"
      onClick={() => triggerCssDownload(css, fileName)}
      style={{
        appearance: "none",
        display: "inline-flex",
        alignItems: "center",
        gap: 6,
        padding: "6px 12px",
        background: "#18181B",
        color: "#FFFFFF",
        border: "none",
        borderRadius: 8,
        fontWeight: 500,
        fontSize: 12,
        cursor: "pointer",
        whiteSpace: "nowrap",
      }}
    >
      <span aria-hidden style={{ display: "inline-flex" }}>
        <svg width="12" height="12" viewBox="0 0 16 16" fill="none">
          <path
            d="M8 2v8m0 0 3-3m-3 3-3-3M3 13h10"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
      {fileName}
    </button>
  );
}

export const PAGE_STYLE: CSSProperties = {
  fontFamily: "var(--font-family-korean)",
  color: "var(--context-foreground-surface-on-surface-base)",
};

export const SECTION_STYLE: CSSProperties = {
  marginBottom: "2.5rem",
};

export const SECTION_TITLE_STYLE: CSSProperties = {
  fontSize: "var(--font-size-heading-h4)",
  fontWeight: 700,
  marginBottom: "1rem",
  color: "var(--context-foreground-surface-on-surface-base)",
};

export function FoundationSection({
  title,
  description,
  children,
}: {
  title: string;
  description?: ReactNode;
  children: ReactNode;
}) {
  return (
    <section style={SECTION_STYLE}>
      <h3 style={SECTION_TITLE_STYLE}>{title}</h3>
      {description ? (
        <p
          style={{
            margin: "0 0 1rem",
            fontSize: 13,
            lineHeight: 1.6,
            color: "var(--context-foreground-surface-on-surface)",
          }}
        >
          {description}
        </p>
      ) : null}
      {children}
    </section>
  );
}

export function GuidelineList({ items }: { items: ReactNode[] }) {
  return (
    <ul style={{ margin: 0, paddingLeft: 20, fontSize: 14, lineHeight: 1.65 }}>
      {items.map((it, idx) => (
        <li key={idx} style={{ marginBottom: 4 }}>
          {it}
        </li>
      ))}
    </ul>
  );
}

export function GuidelinePage({
  overview,
  bullets,
}: {
  overview: ReactNode;
  bullets: ReactNode[];
}) {
  return (
    <div style={{ ...PAGE_STYLE, maxWidth: 760 }}>
      <h3 style={{ margin: "0 0 8px", fontSize: 15, fontWeight: 600 }}>개요</h3>
      <p style={{ margin: "0 0 20px", fontSize: 14, lineHeight: 1.65 }}>
        {overview}
      </p>
      <h3 style={{ margin: "0 0 8px", fontSize: 15, fontWeight: 600 }}>사용 가이드</h3>
      <GuidelineList items={bullets} />
    </div>
  );
}
