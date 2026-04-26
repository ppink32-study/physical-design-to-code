"use client";

// Tab - Figma MCP 기반 구현 (node 5185:210328)
// - Tab: 단일 탭 item (Text / More type, Default/Hover/Selected/Disabled)
// - TabList: horizontal(밑줄 border) / vertical 레이아웃 컨테이너
//
// Figma -> Project 토큰 매핑
//   Context/Foreground/Surface/on-surface-hint        -> --context-foreground-surface-on-surface-hint
//   Context/Foreground/Neutral/on-neutral-hint-muted  -> --context-foreground-neutral-on-neutral-hint-muted
//   Context/Foreground/Icon-Surface/Icon-surface-hover-> --context-foreground-icon-surface-icon-surface-hover
//   Context/Foreground/Icon-Surface/Icon-surface-base -> --context-foreground-icon-surface-icon-surface-base
//   Context/Foreground/Icon-Surface/Icon-surface      -> --context-foreground-icon-surface-icon-surface
//   Context/Foreground/Icon-Surface/Icon-surface-disabled -> --context-foreground-icon-surface-icon-surface-disabled
//   Context/Foreground/Primary/on-primary             -> --context-foreground-primary-on-primary
//   Context/Background/Surface/bg-surface-secondary   -> --context-background-surface-bg-surface-secondary
//   Border/Neutral/border-neutral-secondary           -> --border-border-neutral-border-neutral-secondary

import type {
  ButtonHTMLAttributes,
  CSSProperties,
  HTMLAttributes,
  ReactNode,
} from "react";
import { forwardRef } from "react";

import styles from "./tab.module.css";

export type TabState = "default" | "hover" | "selected" | "disabled";
export type TabType = "text" | "more";
export type TabListOrientation = "horizontal" | "vertical";

/* ---------------------------------------------------------------------------
 * Icon helper (mask-image + currentColor)
 * ------------------------------------------------------------------------- */
type MaskIconProps = {
  src: string;
  size?: number;
  className?: string;
  "aria-hidden"?: boolean;
};

function MaskIcon({
  src,
  size = 20,
  className,
  "aria-hidden": ariaHidden = true,
}: MaskIconProps) {
  const style: CSSProperties = {
    width: size,
    height: size,
    display: "inline-block",
    backgroundColor: "currentColor",
    WebkitMaskImage: `url(${src})`,
    maskImage: `url(${src})`,
    WebkitMaskRepeat: "no-repeat",
    maskRepeat: "no-repeat",
    WebkitMaskPosition: "center",
    maskPosition: "center",
    WebkitMaskSize: "contain",
    maskSize: "contain",
    flexShrink: 0,
  };
  return <span aria-hidden={ariaHidden} style={style} className={className} />;
}

function GearIcon({ size = 20 }: { size?: number }) {
  return <MaskIcon src="/icon/Gear.svg" size={size} />;
}

function MoreHorizontalIcon({ size = 20 }: { size?: number }) {
  return <MaskIcon src="/icon/MoreHorizontal.svg" size={size} />;
}

function CloseIcon({ size = 12 }: { size?: number }) {
  return <MaskIcon src="/icon/Close-2.svg" size={size} />;
}

/* ---------------------------------------------------------------------------
 * Tab (단일 아이템)
 * ------------------------------------------------------------------------- */
type NativeButtonProps = Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  "type" | "disabled" | "children"
>;

export type TabProps = NativeButtonProps & {
  /** text: 라벨 탭 / more: "..." 오버플로우 트리거 */
  tabType?: TabType;
  /** 상태 직접 지정(주로 Storybook/시연용). 일반 사용 시엔 `selected` 사용 */
  state?: TabState;
  selected?: boolean;
  disabled?: boolean;
  /** 좌측 leading icon (기본 Gear). ReactNode 로 커스텀 아이콘 지정 가능 */
  leadingIcon?: boolean | ReactNode;
  /** 우측 숫자 카운트 (예: 5, 99+) */
  count?: ReactNode;
  /** 탭 우측에 닫기 버튼 노출 */
  closable?: boolean;
  onClose?: () => void;
  children?: ReactNode;
};

function TabInner(props: TabProps, ref: React.ForwardedRef<HTMLButtonElement>) {
  const {
    tabType = "text",
    state: stateProp,
    selected = false,
    disabled = false,
    leadingIcon,
    count,
    closable = false,
    onClose,
    className,
    children,
    ...rest
  } = props;

  const state: TabState =
    stateProp ?? (disabled ? "disabled" : selected ? "selected" : "default");

  const rootClass = [
    styles.tab,
    styles[`type-${tabType}`],
    styles[`state-${state}`],
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const isTextType = tabType === "text";
  const showLeadingIcon = isTextType && leadingIcon !== false && leadingIcon !== undefined;
  const leadingIconNode =
    leadingIcon === true || leadingIcon === undefined ? <GearIcon /> : leadingIcon;

  return (
    <button
      {...rest}
      ref={ref}
      type="button"
      className={rootClass}
      disabled={disabled}
      data-state={state}
      data-type={tabType}
      aria-current={selected ? "page" : undefined}
    >
      {isTextType ? (
        <span className={styles.content}>
          <span className={styles.con}>
            {showLeadingIcon && (
              <span className={styles.leading}>{leadingIconNode}</span>
            )}
            <span className={styles.label}>{children}</span>
            {count !== undefined && count !== null && count !== "" && (
              <span className={styles.count}>{count}</span>
            )}
          </span>
          {closable && (
            <span
              role="button"
              tabIndex={-1}
              aria-label="close tab"
              className={styles.closeBtn}
              onClick={(event) => {
                event.stopPropagation();
                onClose?.();
              }}
              onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === " ") {
                  event.preventDefault();
                  event.stopPropagation();
                  onClose?.();
                }
              }}
            >
              <CloseIcon size={12} />
            </span>
          )}
        </span>
      ) : (
        <span className={styles.moreIcon}>
          <MoreHorizontalIcon size={20} />
        </span>
      )}

      {isTextType && state === "selected" && (
        <span aria-hidden="true" className={styles.underline} />
      )}
    </button>
  );
}

export const Tab = forwardRef<HTMLButtonElement, TabProps>(TabInner);
Tab.displayName = "Tab";

/* ---------------------------------------------------------------------------
 * TabList (그룹 컨테이너)
 * ------------------------------------------------------------------------- */
export type TabListProps = HTMLAttributes<HTMLDivElement> & {
  orientation?: TabListOrientation;
  /** horizontal 에서 하단 구분선 표시 (기본 true) */
  showBorder?: boolean;
};

function TabListInner(
  props: TabListProps,
  ref: React.ForwardedRef<HTMLDivElement>,
) {
  const {
    orientation = "horizontal",
    showBorder = true,
    className,
    role = "tablist",
    ...rest
  } = props;

  const cls = [
    styles.list,
    styles[`orientation-${orientation}`],
    showBorder && orientation === "horizontal" ? styles.withBorder : null,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div
      {...rest}
      ref={ref}
      className={cls}
      role={role}
      aria-orientation={orientation}
      data-orientation={orientation}
    />
  );
}

export const TabList = forwardRef<HTMLDivElement, TabListProps>(TabListInner);
TabList.displayName = "TabList";

export default Tab;
