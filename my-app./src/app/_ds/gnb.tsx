"use client";

/**
 * GNB — Figma node 17945:4068 (Dark) / 17945:4070 (Light)
 *
 * 구성
 * - <Gnb> : 56px 높이의 sticky 바. brand · items · actions 슬롯
 * - <GnbItem> : 텍스트 메뉴 한 칸 (Default / Selected) · Figma node 17945:3582 family
 * - <GnbIconButton> : 32×32 아이콘 액션 (Default / Hovered / Selected · alarm dot)
 *                    · Figma node 17945:3481 family
 *                    · `forceState="hover"` 은 Storybook 매트릭스용 (호버 배경만 고정)
 *
 * Light / Dark 는 상위 `[data-theme]` 토큰으로 자동 전환됩니다.
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
export type GnbProps = {
  className?: string;
  /** 좌측 로고/브랜드 슬롯 */
  brand: ReactNode;
  /** 가운데 텍스트 메뉴 */
  items: ReactNode;
  /** 우측 아이콘/버튼 액션 */
  actions?: ReactNode;
};

export function Gnb({ className, brand, items, actions }: GnbProps) {
  return (
    <header
      className={[styles.gnb, className].filter(Boolean).join(" ")}
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
  /** 라우팅 대상. 없으면 button 으로 렌더 */
  href?: string;
  /** 직접 selected 상태 지정. 없으면 pathname 매칭 */
  selected?: boolean;
  /**
   * pathname 매칭 규칙. 없으면 다음 기본 규칙을 사용:
   *  - href === "/" : pathname === "/"
   *  - 그 외        : pathname === href || pathname.startsWith(`${href}/`)
   */
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
type IconRenderProps = { className?: string; style?: CSSProperties };

export type GnbIconButtonProps = Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  "children"
> & {
  /** 접근성 이름 (필수) */
  "aria-label": string;
  /**
   * 아이콘. 둘 중 하나를 사용:
   *  - icon: ReactNode  — 직접 렌더 (currentColor 상속)
   *  - iconUrl: string  — public 경로의 단색 SVG. mask-image 로 적용
   */
  icon?: ReactNode;
  iconUrl?: string;
  /** 빨간 알림 dot */
  alarm?: boolean;
  /** Selected 상태 강조 (배경 적용) */
  selected?: boolean;
  /**
   * Storybook·문서용 시각 상태 (실제 hover 외부에서 Hovered 열 표시)
   * - `hover`: 배경만 호버와 동일
   * - `default`: 강제 없음 (일반 Default)
   */
  forceState?: "default" | "hover";
};

export const GnbIconButton = forwardRef<
  HTMLButtonElement,
  GnbIconButtonProps
>(function GnbIconButton(
  { icon, iconUrl, alarm, selected, forceState, className, ...rest },
  ref,
) {
  const cls = [styles.iconButton, className].filter(Boolean).join(" ");

  return (
    <button
      ref={ref}
      type="button"
      className={cls}
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
        <RenderGlyph icon={icon} />
      ) : null}
      {alarm ? <span className={styles.iconButtonAlarm} aria-hidden="true" /> : null}
    </button>
  );
});

/** 사용자가 ReactNode 로 넘긴 아이콘에 자동으로 20×20 크기·currentColor 적용 */
function RenderGlyph({ icon }: { icon: ReactNode }) {
  if (icon == null) return null;
  return (
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
  );
}

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
