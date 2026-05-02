"use client";

/**
 * GNB — Figma node 17945:4068 (Dark) / 17945:4070 (Light)
 *
 * - <Gnb>           : 56px sticky 바. theme prop 으로 data-theme 자체 적용
 * - <GnbItem>       : 텍스트 메뉴 (Default / Selected) — pathname 자동 매칭
 * - <GnbIconButton> : 32×32 아이콘 액션 (Default / Hovered / Selected · alarm dot)
 * - <GnbBrandLink>  : 로고 래핑용 헬퍼
 */

import Link from "next/link";
import { usePathname } from "next/navigation";
import { forwardRef } from "react";
import type {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  CSSProperties,
  ReactNode,
} from "react";

import styles from "./gnb.module.css";

/* =================================================================
 *  <Gnb> — 컨테이너
 * =============================================================== */
export type GnbTheme = "light" | "brand";

export type GnbProps = {
  /** "light" | "brand" — data-theme 을 컴포넌트 루트에 직접 적용 */
  theme?: GnbTheme;
  className?: string;
  /** 좌측 로고/브랜드 슬롯 */
  brand: ReactNode;
  /** 가운데 텍스트 메뉴 (GnbItem 목록) */
  items: ReactNode;
  /** 우측 아이콘/버튼 액션 */
  actions?: ReactNode;
};

export function Gnb({ theme, className, brand, items, actions }: GnbProps) {
  return (
    <header
      className={[styles.gnb, className].filter(Boolean).join(" ")}
      data-theme={theme}
      data-component="gnb"
    >
      <div className={styles.brandSlot}>{brand}</div>
      <ul className={styles.nav} aria-label="Primary">
        {items}
      </ul>
      {actions != null ? <div className={styles.actions}>{actions}</div> : null}
    </header>
  );
}

/* =================================================================
 *  <GnbItem> — 텍스트 메뉴
 * =============================================================== */
export type GnbItemProps = {
  href?: string;
  selected?: boolean;
  matchPath?: (pathname: string) => boolean;
  disabled?: boolean;
  className?: string;
  children: ReactNode;
  onClick?: () => void;
};

function defaultMatch(pathname: string, href: string): boolean {
  if (href === "/") return pathname === "/";
  const base = href.replace(/\/$/, "");
  return pathname === base || pathname.startsWith(`${base}/`);
}

export function GnbItem({
  href,
  selected,
  matchPath,
  disabled,
  className,
  children,
  onClick,
}: GnbItemProps) {
  const pathname = usePathname() ?? "/";
  const computedSelected =
    selected ??
    (matchPath
      ? matchPath(pathname)
      : href != null
        ? defaultMatch(pathname, href)
        : false);

  const cls = [styles.item, className].filter(Boolean).join(" ");

  if (href && !disabled) {
    return (
      <li>
        <Link
          href={href}
          className={cls}
          data-selected={computedSelected || undefined}
          aria-current={computedSelected ? "page" : undefined}
          onClick={onClick}
        >
          {children}
        </Link>
      </li>
    );
  }

  return (
    <li>
      <button
        type="button"
        className={cls}
        data-selected={computedSelected || undefined}
        aria-current={computedSelected ? "page" : undefined}
        aria-disabled={disabled || undefined}
        disabled={disabled}
        onClick={onClick}
      >
        {children}
      </button>
    </li>
  );
}

/* =================================================================
 *  <GnbIconButton> — 32×32 아이콘 액션
 * =============================================================== */
export type GnbIconButtonProps = Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  "children"
> & {
  "aria-label": string;
  icon?: ReactNode;
  iconUrl?: string;
  /** 빨간 알림 dot */
  alarm?: boolean;
  /** Selected 상태 강조 (배경 적용) */
  selected?: boolean;
  /**
   * Storybook·문서용 시각 상태 override
   * - "hover" : hover 배경 고정
   */
  forceState?: "default" | "hover";
};

export const GnbIconButton = forwardRef<HTMLButtonElement, GnbIconButtonProps>(
  function GnbIconButton(
    { icon, iconUrl, alarm, selected, forceState, className, ...rest },
    ref,
  ) {
    return (
      <button
        ref={ref}
        type="button"
        className={[styles.iconButton, className].filter(Boolean).join(" ")}
        data-selected={selected || undefined}
        data-force-state={forceState === "hover" ? "hover" : undefined}
        {...rest}
      >
        {iconUrl ? (
          <span
            aria-hidden="true"
            className={styles.iconButtonGlyph}
            style={
              {
                WebkitMaskImage: `url(${iconUrl})`,
                maskImage: `url(${iconUrl})`,
              } as CSSProperties
            }
          />
        ) : icon ? (
          <span
            aria-hidden="true"
            style={{
              display: "inline-flex",
              width: 20,
              height: 20,
              alignItems: "center",
              justifyContent: "center",
              color: "currentColor",
            }}
          >
            {icon}
          </span>
        ) : null}
        {alarm && (
          <span className={styles.iconButtonAlarm} aria-hidden="true" />
        )}
      </button>
    );
  },
);

/* =================================================================
 *  <GnbBrandLink> — 로고 래핑용 헬퍼 (선택)
 * =============================================================== */
export type GnbBrandLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  href?: string;
  children: ReactNode;
};

export function GnbBrandLink({
  href = "/",
  children,
  ...rest
}: GnbBrandLinkProps) {
  return (
    <Link
      href={href}
      {...rest}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 10,
        textDecoration: "none",
        color: "inherit",
        flexShrink: 0,
        ...(rest.style ?? {}),
      }}
    >
      {children}
    </Link>
  );
}

export default Gnb;
