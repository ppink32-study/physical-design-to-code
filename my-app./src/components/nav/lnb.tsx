"use client";

/**
 * LNB — Figma node 17947:9157 (Brand) / 17947:9158 (Light)
 *
 * - <Lnb>             : 260px 사이드바. theme prop 으로 data-theme 자체 적용
 * - <LnbItem>         : 1depth 아이콘 + 텍스트 메뉴 (Normal/Hover/Expanded/Selected/Disabled)
 * - <LnbSubItem>      : 2depth 텍스트 메뉴 (Normal/Hover/Expanded/Selected/Disabled)
 * - <LnbLeafItem>     : 3depth 텍스트 메뉴, 왼쪽 세로선 표시 (Normal/Hover/Selected/Disabled)
 * - <LnbProjectSelect>: 상단 프로젝트 셀렉터
 * - <LnbUserProfile>  : 하단 사용자 프로필 + Edit Profile 버튼
 */

import Link from "next/link";
import { usePathname } from "next/navigation";
import { forwardRef, useEffect, useRef, useState } from "react";
import type {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  CSSProperties,
  ReactNode,
} from "react";

import styles from "./lnb.module.css";

/** Selected indicator (좌측 mint 핀) 높이 — Figma node 18367:11455 */
const INDICATOR_HEIGHT = 26;

/* =================================================================
 *  타입
 * =============================================================== */
export type LnbTheme = "light" | "brand";

/* =================================================================
 *  <Lnb> — 컨테이너
 * =============================================================== */
export type LnbProps = {
  theme?: LnbTheme;
  className?: string;
  /** 상단 프로젝트 셀렉터 슬롯 */
  header?: ReactNode;
  /** 내비게이션 메뉴 슬롯 */
  nav: ReactNode;
  /** 하단 사용자 프로필 슬롯 */
  footer?: ReactNode;
};

export function Lnb({ theme = "light", className, header, nav, footer }: LnbProps) {
  const containerRef = useRef<HTMLElement>(null);
  const navRef = useRef<HTMLElement>(null);
  const [indicatorTop, setIndicatorTop] = useState<number | null>(null);

  /* 좌측 mint slider indicator 위치 추적 (1depth 전용).
   * 우선순위:
   *   1) [data-indicator="true"] — 명시적으로 마킹된 1depth (InteractiveLnb 가 자동 설정)
   *   2) .item1[data-selected="true"] — 1depth 가 직접 선택된 경우 (수동 사용 시 fallback)
   * 2depth/3depth 가 selected 여도 1depth 가 마킹되지 않으면 indicator 는 이동하지 않음
   * (InteractiveLnb 가 자동으로 부모 1depth 에 indicator 마킹 → 자연스러운 강조 유지)
   */
  useEffect(() => {
    const container = containerRef.current;
    const nav = navRef.current;
    if (!container) return;

    const update = () => {
      const target =
        container.querySelector<HTMLElement>('[data-indicator="true"]') ??
        container.querySelector<HTMLElement>('.' + styles.item1 + '[data-selected="true"]');
      if (!target) {
        setIndicatorTop(null);
        return;
      }
      const itemRect = target.getBoundingClientRect();
      const containerRect = container.getBoundingClientRect();
      const top = itemRect.top - containerRect.top + (itemRect.height - INDICATOR_HEIGHT) / 2;
      setIndicatorTop(top);
    };

    update();

    const mo = new MutationObserver(update);
    mo.observe(container, {
      subtree: true,
      childList: true,
      attributes: true,
      attributeFilter: ["data-selected", "data-indicator"],
    });

    const ro = new ResizeObserver(update);
    ro.observe(container);

    nav?.addEventListener("scroll", update, { passive: true });

    return () => {
      mo.disconnect();
      ro.disconnect();
      nav?.removeEventListener("scroll", update);
    };
  }, []);

  return (
    <aside
      ref={containerRef}
      className={[styles.lnb, className].filter(Boolean).join(" ")}
      data-theme={theme}
      data-component="lnb"
    >
      {/* Selected indicator — Brand 테마 전용. 두 박스: sharp + blur(4px) glow.
       * 둘 다 같은 transform 으로 슬라이드. 선택 항목이 바뀌면 부드럽게 이동.
       */}
      {theme === "brand" && indicatorTop !== null && (
        <>
          <span
            className={styles.selectedIndicatorBlur}
            style={{ transform: `translateY(${indicatorTop}px)` }}
            aria-hidden="true"
          />
          <span
            className={styles.selectedIndicator}
            style={{ transform: `translateY(${indicatorTop}px)` }}
            aria-hidden="true"
          />
        </>
      )}

      {header != null && <div className={styles.topArea}>{header}</div>}
      <nav ref={navRef} className={styles.navArea} aria-label="Side">
        <ul className={styles.menuList}>{nav}</ul>
      </nav>
      {footer != null && <div className={styles.bottomArea}>{footer}</div>}
    </aside>
  );
}

/* =================================================================
 *  아이콘 헬퍼 — mask-image 방식
 * =============================================================== */
function IconMask({
  url,
  size = 20,
  className,
}: {
  url: string;
  size?: number;
  className?: string;
}) {
  const safeUrl = url.replace(/ /g, "%20");
  return (
    <span
      aria-hidden="true"
      className={className}
      style={
        {
          display: "inline-block",
          width: size,
          height: size,
          backgroundColor: "currentColor",
          WebkitMaskImage: `url('${safeUrl}')`,
          maskImage: `url('${safeUrl}')`,
          WebkitMaskRepeat: "no-repeat",
          maskRepeat: "no-repeat",
          WebkitMaskPosition: "center",
          maskPosition: "center",
          WebkitMaskSize: "contain",
          maskSize: "contain",
          flexShrink: 0,
        } as CSSProperties
      }
    />
  );
}

/* =================================================================
 *  <LnbProjectSelect> — 상단 프로젝트 셀렉터
 * =============================================================== */
export type LnbProjectSelectProps = {
  label?: string;
  iconUrl?: string;
  onClick?: () => void;
};

export function LnbProjectSelect({
  label = "Project Name",
  iconUrl,
  onClick,
}: LnbProjectSelectProps) {
  return (
    <button
      type="button"
      className={styles.projectSelect}
      onClick={onClick}
    >
      {/* icon + label */}
      <span className={styles.projectSelectInner}>
        {iconUrl && (
          <IconMask
            url={iconUrl}
            size={20}
            className={styles.projectSelectIcon}
          />
        )}
        <span className={styles.projectSelectLabel}>{label}</span>
      </span>
      {/* chevron */}
      <IconMask url="/icon/ChevronRight.svg" size={16} />
    </button>
  );
}

/* =================================================================
 *  <LnbItem> — 1depth 아이콘 메뉴
 * =============================================================== */
export type LnbItemState = "normal" | "expanded" | "selected" | "disabled";

export type LnbItemProps = {
  href?: string;
  /** SVG URL (mask-image 방식) */
  iconUrl?: string;
  /** ReactNode 아이콘 */
  icon?: ReactNode;
  label: string;
  state?: LnbItemState;
  /** true 이면 우측에 chevron 표시 (기본 true) */
  chevron?: boolean;
  /** chevron 방향 강제. 미지정 시 state 에 따라 자동 (expanded → up, 그 외 → down).
   *  state="selected" 이지만 실제로는 펼쳐진 상태를 표현하고 싶을 때 "up" 으로 강제. */
  chevronDirection?: "up" | "down";
  /** Storybook용 hover 강제 */
  forceHover?: boolean;
  /** 좌측 mint slider indicator의 타겟 (1depth 만, Brand 테마에서 노출).
   *  InteractiveLnb 에서는 자동으로 selected 1depth 또는 selected 2/3depth 의 부모 1depth 에 설정. */
  indicator?: boolean;
  className?: string;
  onClick?: () => void;
};

export function LnbItem({
  href,
  iconUrl,
  icon,
  label,
  state = "normal",
  chevron = true,
  chevronDirection,
  forceHover,
  indicator,
  className,
  onClick,
}: LnbItemProps) {
  const isExpanded = state === "expanded";
  const isSelected = state === "selected";
  const isDisabled = state === "disabled";

  /** 명시 prop > 자동 (expanded 면 up, 아니면 down) */
  const chevronUp = chevronDirection === "up" || (chevronDirection !== "down" && isExpanded);

  const dataProps = {
    "data-expanded": isExpanded || undefined,
    "data-selected": isSelected || undefined,
    "data-disabled": isDisabled || undefined,
    "data-force-hover": forceHover || undefined,
    "data-indicator": indicator || undefined,
  };

  const safeIconUrl = iconUrl?.replace(/ /g, "%20");
  const iconNode = (
    <span className={styles.item1IconWrap} aria-hidden="true">
      {safeIconUrl ? (
        <span
          className={styles.item1Glyph}
          style={
            {
              WebkitMaskImage: `url('${safeIconUrl}')`,
              maskImage: `url('${safeIconUrl}')`,
            } as CSSProperties
          }
        />
      ) : icon ? (
        <span style={{ display: "inline-flex", width: 24, height: 24, alignItems: "center", justifyContent: "center", color: "currentColor" }}>
          {icon}
        </span>
      ) : null}
    </span>
  );

  const chevronNode = chevron ? (
    <span aria-hidden="true" className={styles.item1Chevron}>
      <IconMask
        url={chevronUp ? "/icon/ChevronUp.svg" : "/icon/ChevronDown.svg"}
        size={20}
      />
    </span>
  ) : null;

  const cls = [styles.item1, className].filter(Boolean).join(" ");

  if (href && !isDisabled) {
    return (
      <li>
        <Link href={href} className={cls} {...dataProps} onClick={onClick}>
          {iconNode}
          <span className={styles.item1Label}>{label}</span>
          {chevronNode}
        </Link>
      </li>
    );
  }

  return (
    <li>
      <button
        type="button"
        className={cls}
        {...dataProps}
        disabled={isDisabled}
        aria-disabled={isDisabled || undefined}
        aria-expanded={isExpanded || undefined}
        onClick={onClick}
      >
        {iconNode}
        <span className={styles.item1Label}>{label}</span>
        {chevronNode}
      </button>
    </li>
  );
}

/* =================================================================
 *  <LnbSubItem> — 2depth 텍스트 메뉴
 * =============================================================== */
export type LnbSubItemProps = {
  href?: string;
  label: string;
  state?: LnbItemState;
  chevron?: boolean;
  /** chevron 방향 강제. 미지정 시 state 에 따라 자동 (expanded → up, 그 외 → down).
   *  state="selected" 이지만 실제로는 펼쳐진 상태를 표현하고 싶을 때 "up" 으로 강제. */
  chevronDirection?: "up" | "down";
  forceHover?: boolean;
  className?: string;
  onClick?: () => void;
};

export function LnbSubItem({
  href,
  label,
  state = "normal",
  chevron = true,
  chevronDirection,
  forceHover,
  className,
  onClick,
}: LnbSubItemProps) {
  const isExpanded = state === "expanded";
  const isSelected = state === "selected";
  const isDisabled = state === "disabled";

  /** 명시 prop > 자동 (expanded 면 up, 아니면 down) */
  const chevronUp = chevronDirection === "up" || (chevronDirection !== "down" && isExpanded);

  const dataProps = {
    "data-expanded": isExpanded || undefined,
    "data-selected": isSelected || undefined,
    "data-disabled": isDisabled || undefined,
    "data-force-hover": forceHover || undefined,
    /* chevron 없을 때 라벨 위치 보정용 — CSS 에서 padding-left: 28px 적용 */
    "data-no-chevron": !chevron || undefined,
  };

  const chevronNode = chevron ? (
    <span aria-hidden="true" className={styles.item2Chevron}>
      <IconMask
        url={chevronUp ? "/icon/ChevronUp Fill.svg" : "/icon/ChevronDown Fill.svg"}
        size={12}
      />
    </span>
  ) : null;

  const cls = [styles.item2, className].filter(Boolean).join(" ");

  if (href && !isDisabled) {
    return (
      <li>
        <Link href={href} className={cls} {...dataProps} onClick={onClick}>
          {chevronNode}
          <span className={styles.item2Label}>{label}</span>
        </Link>
      </li>
    );
  }

  return (
    <li>
      <button
        type="button"
        className={cls}
        {...dataProps}
        disabled={isDisabled}
        aria-disabled={isDisabled || undefined}
        aria-expanded={isExpanded || undefined}
        onClick={onClick}
      >
        {chevronNode}
        <span className={styles.item2Label}>{label}</span>
      </button>
    </li>
  );
}

/* =================================================================
 *  <LnbLeafItem> — 3depth 텍스트 메뉴 (왼쪽 세로 구분선)
 * =============================================================== */
export type LnbLeafItemState = "normal" | "hover" | "selected" | "disabled";

export type LnbLeafItemProps = {
  href?: string;
  label: string;
  state?: LnbLeafItemState;
  forceHover?: boolean;
  className?: string;
  onClick?: () => void;
};

export function LnbLeafItem({
  href,
  label,
  state = "normal",
  forceHover,
  className,
  onClick,
}: LnbLeafItemProps) {
  const isSelected = state === "selected";
  const isDisabled = state === "disabled";

  const dataProps = {
    "data-selected": isSelected || undefined,
    "data-disabled": isDisabled || undefined,
    "data-force-hover": forceHover || undefined,
  };

  const inner = (
    <>
      <span className={styles.item3Blank} aria-hidden="true" />
      <span className={styles.item3Content}>
        {/* Figma 구조: pl-4 → Border (1px line) → gap-8 → Label
            CSS border-left 가 아닌 별도 엘리먼트로 두어야 Figma 의 padding 정렬과 일치 */}
        <span className={styles.item3Border} aria-hidden="true" />
        <span className={styles.item3Label}>{label}</span>
      </span>
    </>
  );

  const cls = [styles.item3, className].filter(Boolean).join(" ");

  if (href && !isDisabled) {
    return (
      <li>
        <Link href={href} className={cls} {...dataProps} onClick={onClick}>
          {inner}
        </Link>
      </li>
    );
  }

  return (
    <li>
      <button
        type="button"
        className={cls}
        {...dataProps}
        disabled={isDisabled}
        aria-disabled={isDisabled || undefined}
        onClick={onClick}
      >
        {inner}
      </button>
    </li>
  );
}

/* =================================================================
 *  <LnbUserProfile> — 하단 유저 프로필
 * =============================================================== */
export type LnbUserProfileProps = {
  name?: string;
  role?: string;
  avatarUrl?: string;
  avatarFallback?: ReactNode;
  onEditProfile?: () => void;
};

export function LnbUserProfile({
  name = "Christopher Nolan",
  role = "Developer",
  avatarUrl,
  avatarFallback,
  onEditProfile,
}: LnbUserProfileProps) {
  return (
    <>
      <div className={styles.userRow}>
        <span className={styles.avatar}>
          {avatarUrl ? (
            <img src={avatarUrl} alt={name} className={styles.avatarImg} />
          ) : avatarFallback ? (
            avatarFallback
          ) : (
            /* Figma 17947:9254 silhouette — /public/icon/avatar.svg (32x32, fill #B3B4BC) */
            <img src="/icon/avatar.svg" alt="" aria-hidden="true" className={styles.avatarImg} />
          )}
        </span>
        <span className={styles.userInfo}>
          <span className={styles.userName}>{name}</span>
          <span className={styles.userRole}>{role}</span>
        </span>
      </div>
      <button type="button" className={styles.editProfileBtn} onClick={onEditProfile}>
        <IconMask url="/icon/Pencil-Line.svg" size={16} />
        <span className={styles.editProfileLabel}>Edit Profile</span>
        <IconMask url="/icon/ChevronRight.svg" size={16} />
      </button>
    </>
  );
}

/* =================================================================
 *  <InteractiveLnb> — 트리 데이터로 expand/collapse + select 자동 처리
 * =================================================================
 *  사용 예:
 *    <InteractiveLnb
 *      theme="brand"
 *      menu={[
 *        { id: "dashboard", label: "Dashboard", iconUrl: "/icon/Home.svg" },
 *        { id: "workspace", label: "Workspace", iconUrl: "/icon/Home.svg",
 *          children: [
 *            { id: "ws-dash", label: "Dashboard", children: [
 *              { id: "ws-menu1", label: "Menu Name" },
 *              { id: "ws-menu2", label: "Menu Name" },
 *            ]},
 *          ],
 *        },
 *      ]}
 *      defaultSelectedId="dashboard"
 *      header={...}
 *      footer={...}
 *    />
 * ----------------------------------------------------------------- */
export type LnbLeafMenuNode = {
  id: string;
  label: string;
  href?: string;
  disabled?: boolean;
};

export type LnbSubMenuNode = {
  id: string;
  label: string;
  href?: string;
  disabled?: boolean;
  /** 3depth (Leaf) 자식들. 있으면 chevron 표시 + 토글 가능 */
  children?: LnbLeafMenuNode[];
};

export type LnbMenuNode = {
  id: string;
  label: string;
  iconUrl?: string;
  icon?: ReactNode;
  href?: string;
  disabled?: boolean;
  /** 2depth 자식들. 있으면 chevron 표시 + 토글 가능 */
  children?: LnbSubMenuNode[];
};

export type InteractiveLnbProps = Omit<LnbProps, "nav"> & {
  /** 메뉴 트리 데이터 */
  menu: LnbMenuNode[];
  /** 제어 모드 — 외부에서 selected 관리 */
  selectedId?: string;
  /** 비제어 모드 — 초기 선택 */
  defaultSelectedId?: string;
  /** 제어 모드 — 외부에서 expanded 관리 */
  expandedIds?: string[];
  /** 비제어 모드 — 초기 펼친 노드들 */
  defaultExpandedIds?: string[];
  /** 선택 변경 핸들러 */
  onSelect?: (id: string) => void;
  /** expand/collapse 변경 핸들러 */
  onExpandChange?: (expandedIds: string[]) => void;
};

/** 주어진 id 가 속한 1depth 의 id 를 반환 (자기 자신이 1depth 면 자기 id) */
function findParent1Depth(menu: LnbMenuNode[], id: string | undefined): string | undefined {
  if (!id) return undefined;
  for (const item of menu) {
    if (item.id === id) return item.id;
    if (item.children) {
      for (const sub of item.children) {
        if (sub.id === id) return item.id;
        if (sub.children?.some((leaf) => leaf.id === id)) return item.id;
      }
    }
  }
  return undefined;
}

export function InteractiveLnb({
  menu,
  selectedId,
  defaultSelectedId,
  expandedIds,
  defaultExpandedIds,
  onSelect,
  onExpandChange,
  ...lnbRest
}: InteractiveLnbProps) {
  const [internalSelected, setInternalSelected] = useState<string | undefined>(defaultSelectedId);
  const [internalExpanded, setInternalExpanded] = useState<Set<string>>(
    () => new Set(defaultExpandedIds ?? [])
  );

  const isControlledSelect = selectedId !== undefined;
  const isControlledExpand = expandedIds !== undefined;
  const currentSelected = isControlledSelect ? selectedId : internalSelected;
  const currentExpanded = isControlledExpand ? new Set(expandedIds) : internalExpanded;

  /* 좌측 mint slider indicator 타겟 — 1depth 만 추적 (sticky).
   *   - 1depth 클릭 시 갱신
   *   - 2depth/3depth 클릭 시 변동 없음 → indicator 가 마지막 1depth 자리에 머무름
   *   - 초기값: defaultSelectedId 가 속한 1depth
   */
  const [lastIndicator1DepthId, setLastIndicator1DepthId] = useState<string | undefined>(
    () => findParent1Depth(menu, defaultSelectedId)
  );

  const handleSelect = (id: string) => {
    if (!isControlledSelect) setInternalSelected(id);
    onSelect?.(id);
  };

  const toggleExpand = (id: string) => {
    const next = new Set(currentExpanded);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    if (!isControlledExpand) setInternalExpanded(next);
    onExpandChange?.(Array.from(next));
  };

  /* 1depth 클릭 — indicator 갱신 + 자기 자신 select + (자식 있으면 토글)
   * 자식 있는 1depth 도 클릭 시 select variant 로 표시되며, chevron 은 펼침/닫힘 방향 그대로 유지됨
   */
  const handle1DepthClick = (item: LnbMenuNode, hasChildren: boolean) => {
    if (item.disabled) return;
    setLastIndicator1DepthId(item.id);
    handleSelect(item.id);
    if (hasChildren) toggleExpand(item.id);
  };

  const computeItemState = (id: string, disabled: boolean | undefined, hasChildren: boolean): LnbItemState => {
    if (disabled) return "disabled";
    /* selected 가 expanded 보다 우선 — expand 상태이더라도 select 면 select 컴포넌트로 표시 */
    if (currentSelected === id) return "selected";
    if (hasChildren && currentExpanded.has(id)) return "expanded";
    return "normal";
  };

  const computeLeafState = (id: string, disabled: boolean | undefined): LnbLeafItemState => {
    if (disabled) return "disabled";
    if (currentSelected === id) return "selected";
    return "normal";
  };

  /* 트리를 렌더링 — 펼쳐진 노드의 자식만 노출 */
  const renderNav = () => {
    const nodes: ReactNode[] = [];

    for (const item of menu) {
      const hasChildren = !!item.children?.length;
      const itemExpanded = currentExpanded.has(item.id);

      nodes.push(
        <LnbItem
          key={item.id}
          iconUrl={item.iconUrl}
          icon={item.icon}
          label={item.label}
          state={computeItemState(item.id, item.disabled, hasChildren)}
          chevron={hasChildren}
          /* state="selected" 이지만 실제 펼쳐진 상태일 때 chevron Up 유지 */
          chevronDirection={hasChildren && itemExpanded ? "up" : "down"}
          indicator={item.id === lastIndicator1DepthId}
          onClick={() => handle1DepthClick(item, hasChildren)}
        />
      );

      if (hasChildren && itemExpanded) {
        for (const sub of item.children!) {
          const subHasChildren = !!sub.children?.length;
          const subExpanded = currentExpanded.has(sub.id);

          nodes.push(
            <LnbSubItem
              key={sub.id}
              label={sub.label}
              state={computeItemState(sub.id, sub.disabled, subHasChildren)}
              chevron={subHasChildren}
              /* state="selected" 이지만 실제 펼쳐진 상태일 때 chevron Up 유지 */
              chevronDirection={subHasChildren && subExpanded ? "up" : "down"}
              onClick={() => {
                if (sub.disabled) return;
                /* 1depth 와 동일 — 자식 있어도 select 함께 처리 → expand+selected 시 select variant */
                handleSelect(sub.id);
                if (subHasChildren) toggleExpand(sub.id);
              }}
            />
          );

          if (subHasChildren && subExpanded) {
            for (const leaf of sub.children!) {
              nodes.push(
                <LnbLeafItem
                  key={leaf.id}
                  label={leaf.label}
                  state={computeLeafState(leaf.id, leaf.disabled)}
                  onClick={() => {
                    if (leaf.disabled) return;
                    handleSelect(leaf.id);
                  }}
                />
              );
            }
          }
        }
      }
    }

    return nodes;
  };

  return <Lnb {...lnbRest} nav={renderNav()} />;
}

export default Lnb;
