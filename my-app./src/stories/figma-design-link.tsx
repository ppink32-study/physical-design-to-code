import type { CSSProperties } from "react";

/** Figma 브랜드 마크 (단순화 SVG) */
export function FigmaLogo({ size = 18 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 38 57"
      aria-hidden
      focusable="false"
    >
      <path fill="#1ABCFE" d="M19 9.5a9.5 9.5 0 1 1 19 0v9.5H19V9.5Z" />
      <path fill="#0ACF83" d="M0 19h19v9.5H9.5A9.5 9.5 0 0 1 0 19Z" />
      <path fill="#A259FF" d="M19 19h19a9.5 9.5 0 1 1-9.5 9.5H19V19Z" />
      <path fill="#F24E1E" d="M9.5 28.5H19V38H9.5A9.5 9.5 0 0 1 9.5 28.5Z" />
      <path fill="#FF7262" d="M19 28.5h9.5a9.5 9.5 0 1 1-19 0H19v-9.5Z" />
    </svg>
  );
}

const btnStyle: CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  gap: 8,
  padding: "8px 14px",
  borderRadius: 8,
  border: "1px solid var(--border-border-surface-border-surface, #d7d8dc)",
  background: "var(--context-background-surface-bg-surface-base, #fff)",
  color: "var(--context-foreground-surface-on-surface-base, #141518)",
  fontSize: 13,
  fontWeight: 600,
  fontFamily: "var(--font-family-korean, system-ui, sans-serif)",
  textDecoration: "none",
  boxShadow: "0 1px 2px rgba(20, 21, 24, 0.06)",
};

export function FigmaDesignLinkButton({
  href,
  label = "Figma에서 보기",
}: {
  href: string;
  label?: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      style={btnStyle}
    >
      <FigmaLogo size={18} />
      <span>{label}</span>
    </a>
  );
}
