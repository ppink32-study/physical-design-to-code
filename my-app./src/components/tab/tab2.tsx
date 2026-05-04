"use client";

/**
 * Tab2 — Tabs Level 2 (Figma node 6141:10283)
 *
 * Browser-tab 스타일 탭. 수직 우측 border 로 구분.
 *   type="text" : [LeadingIcon?] [label + count] [CloseBtn?]  — h=32, px=12, gap=4
 *   type="icon" : [Center Icon]                               — h=32, px=8
 *
 * States
 *   default  : bg-surface-base      + border-right
 *   hover    : bg-surface-base-hover + border-right
 *   selected : bg-darkgray (dark)   — border-right 없음, 흰 텍스트/아이콘
 *   disabled : bg-neutral           + border-right
 */

import type {
  ButtonHTMLAttributes,
  CSSProperties,
  HTMLAttributes,
  ReactNode,
} from "react";
import { forwardRef } from "react";

import styles from "./tab2.module.css";

export type Tab2Type = "text" | "icon";
export type Tab2State = "default" | "hover" | "selected" | "disabled";

/* ---------------------------------------------------------------------------
 * Icon helper
 * ------------------------------------------------------------------------- */
function MaskIcon({ src, size = 16 }: { src: string; size?: number }) {
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
  return <span aria-hidden="true" style={style} />;
}

/* ---------------------------------------------------------------------------
 * Tab2 (단일 아이템)
 * ------------------------------------------------------------------------- */
type NativeButtonProps = Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  "type" | "disabled" | "children"
>;

export type Tab2Props = NativeButtonProps & {
  tabType?: Tab2Type;
  /** 상태 직접 지정 (Storybook·시연용) */
  state?: Tab2State;
  selected?: boolean;
  disabled?: boolean;
  /** type=text — 좌측 leading 아이콘. true 이면 기본 Search 아이콘 */
  leadingIcon?: boolean | ReactNode;
  /** type=text — 우측 숫자 카운트 */
  count?: ReactNode;
  /** type=text — 닫기 버튼 노출 */
  closable?: boolean;
  onClose?: () => void;
  /** type=icon — 중앙 아이콘. 미지정 시 Add */
  icon?: ReactNode;
  children?: ReactNode;
};

function Tab2Inner(props: Tab2Props, ref: React.ForwardedRef<HTMLButtonElement>) {
  const {
    tabType = "text",
    state: stateProp,
    selected = false,
    disabled = false,
    leadingIcon,
    count,
    closable = false,
    onClose,
    icon,
    className,
    children,
    ...rest
  } = props;

  const state: Tab2State =
    stateProp ?? (disabled ? "disabled" : selected ? "selected" : "default");

  const rootClass = [
    styles.root,
    styles[`type-${tabType}`],
    styles[`state-${state}`],
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const showLeading =
    tabType === "text" && leadingIcon !== false && leadingIcon !== undefined;

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
      {tabType === "text" ? (
        <>
          {showLeading && (
            <span className={styles.leadingIcon}>
              {leadingIcon === true ? (
                <MaskIcon src="/icon/Search.svg" size={16} />
              ) : (
                leadingIcon
              )}
            </span>
          )}

          <span className={styles.textGroup}>
            <span className={styles.label}>{children ?? "Tab"}</span>
            {count !== undefined && count !== null && count !== "" && (
              <span className={styles.count}>{count}</span>
            )}
          </span>

          {closable && (
            <span
              role="button"
              tabIndex={-1}
              aria-label="탭 닫기"
              className={styles.closeBtn}
              onClick={(e) => {
                e.stopPropagation();
                onClose?.();
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  e.stopPropagation();
                  onClose?.();
                }
              }}
            >
              <MaskIcon src="/icon/Close.svg" size={16} />
            </span>
          )}
        </>
      ) : (
        <span className={styles.iconCenter}>
          {icon ?? <MaskIcon src="/icon/Add.svg" size={16} />}
        </span>
      )}
    </button>
  );
}

export const Tab2 = forwardRef<HTMLButtonElement, Tab2Props>(Tab2Inner);
Tab2.displayName = "Tab2";

/* ---------------------------------------------------------------------------
 * Tab2List (그룹 컨테이너) — 탭을 gap 없이 수평 나열
 * ------------------------------------------------------------------------- */
export type Tab2ListProps = HTMLAttributes<HTMLDivElement>;

function Tab2ListInner(
  props: Tab2ListProps,
  ref: React.ForwardedRef<HTMLDivElement>,
) {
  const { className, role = "tablist", ...rest } = props;
  return (
    <div
      {...rest}
      ref={ref}
      className={[styles.list, className].filter(Boolean).join(" ")}
      role={role}
    />
  );
}

export const Tab2List = forwardRef<HTMLDivElement, Tab2ListProps>(Tab2ListInner);
Tab2List.displayName = "Tab2List";

export default Tab2;
