import type { CSSProperties, ReactNode } from "react";

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
