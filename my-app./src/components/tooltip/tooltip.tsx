"use client";

/**
 * Tooltip — Figma MCP 기반 구현
 * ----------------------------------------------------------------
 * Figma nodes
 *   - tooltip:              5543:321819 (5 variants: top/bottom/left/right/no-arrow)
 *   - helpIconWithTooltip:  13300:13569 (info icon × 4 directions)
 *
 * Design tokens
 *   - bg     : --bg-backdrop-dark   (#1F2025)
 *   - title  : --on-neutral-hint-muted (#9698A3)
 *   - text   : --on-neutral-white   (#FFFFFF)
 *   - padding: --spacing-sm (8px)
 *   - radius : --radius-lg (8px)
 *   - max-width: 240px
 *
 * Usage
 *   <Tooltip content="설명 문구">
 *     <Button>Hover me</Button>
 *   </Tooltip>
 *
 *   <Tooltip title="제목" content="본문" direction="right">
 *     <span>요소</span>
 *   </Tooltip>
 *
 *   // Controlled
 *   <Tooltip open={isOpen} onOpenChange={setIsOpen} content="...">
 *     ...
 *   </Tooltip>
 *
 *   // Info icon 조합
 *   <HelpIconWithTooltip title="필드명" content="상세 설명" direction="top" />
 */

import type {
  CSSProperties,
  ForwardedRef,
  HTMLAttributes,
  KeyboardEvent as ReactKeyboardEvent,
  ReactNode,
} from "react";
import { forwardRef, useCallback, useEffect, useId, useRef, useState } from "react";

import styles from "./tooltip.module.css";

export type TooltipDirection = "top" | "bottom" | "left" | "right";

export type TooltipProps = Omit<
  HTMLAttributes<HTMLSpanElement>,
  "title" | "content"
> & {
  /** 트리거 요소. tooltip 이 감쌀 자식 노드 */
  children: ReactNode;
  /** Tooltip 본문 (ReactNode 허용) */
  content: ReactNode;
  /** 상단 제목 (선택). Figma `Title` 슬롯 */
  title?: ReactNode;
  /** Tooltip 위치. 기본 `"top"` */
  direction?: TooltipDirection;
  /** 화살표(arrow) 표시 여부. 기본 `true` (Figma Trailing=true) */
  trailing?: boolean;

  /** Controlled 모드: 외부에서 open 상태를 제어 */
  open?: boolean;
  /** Uncontrolled 초기값 */
  defaultOpen?: boolean;
  /** 상태 변경 콜백 */
  onOpenChange?: (open: boolean) => void;

  /** hover/focus 진입 후 open 지연 ms. 기본 100 */
  openDelay?: number;
  /** hover/focus 해제 후 close 지연 ms. 기본 0 */
  closeDelay?: number;

  /** true 면 tooltip 을 렌더링하지 않음 */
  disabled?: boolean;
  /** panel 의 최대 너비. 기본 240px (Figma) */
  maxWidth?: number | string;
  /** trigger 와 tooltip 사이 간격(px). 기본 8 (HelpIconWithTooltip 은 4) */
  gap?: number;
  /** panel 에 추가할 className */
  panelClassName?: string;
};

function toMaxWidthValue(value: number | string | undefined): string | undefined {
  if (value === undefined) return undefined;
  return typeof value === "number" ? `${value}px` : value;
}

function TooltipInner(
  props: TooltipProps,
  ref: ForwardedRef<HTMLSpanElement>,
) {
  const {
    children,
    content,
    title,
    direction = "top",
    trailing = true,
    open: openProp,
    defaultOpen = false,
    onOpenChange,
    openDelay = 100,
    closeDelay = 0,
    disabled = false,
    maxWidth = 240,
    gap = 8,
    className,
    panelClassName,
    style,
    onMouseEnter,
    onMouseLeave,
    onFocus,
    onBlur,
    onKeyDown,
    ...rest
  } = props;

  const isControlled = openProp !== undefined;
  const [uncontrolledOpen, setUncontrolledOpen] = useState(defaultOpen);
  const open = isControlled ? !!openProp : uncontrolledOpen;

  const openTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearTimers = useCallback(() => {
    if (openTimer.current) {
      clearTimeout(openTimer.current);
      openTimer.current = null;
    }
    if (closeTimer.current) {
      clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
  }, []);

  useEffect(() => () => clearTimers(), [clearTimers]);

  const setOpen = useCallback(
    (next: boolean) => {
      if (!isControlled) setUncontrolledOpen(next);
      onOpenChange?.(next);
    },
    [isControlled, onOpenChange],
  );

  const scheduleOpen = useCallback(() => {
    if (disabled) return;
    clearTimers();
    if (openDelay > 0) {
      openTimer.current = setTimeout(() => setOpen(true), openDelay);
    } else {
      setOpen(true);
    }
  }, [disabled, clearTimers, openDelay, setOpen]);

  const scheduleClose = useCallback(() => {
    clearTimers();
    if (closeDelay > 0) {
      closeTimer.current = setTimeout(() => setOpen(false), closeDelay);
    } else {
      setOpen(false);
    }
  }, [clearTimers, closeDelay, setOpen]);

  const handleMouseEnter: HTMLAttributes<HTMLSpanElement>["onMouseEnter"] = (e) => {
    scheduleOpen();
    onMouseEnter?.(e);
  };
  const handleMouseLeave: HTMLAttributes<HTMLSpanElement>["onMouseLeave"] = (e) => {
    scheduleClose();
    onMouseLeave?.(e);
  };
  const handleFocus: HTMLAttributes<HTMLSpanElement>["onFocus"] = (e) => {
    scheduleOpen();
    onFocus?.(e);
  };
  const handleBlur: HTMLAttributes<HTMLSpanElement>["onBlur"] = (e) => {
    scheduleClose();
    onBlur?.(e);
  };
  const handleKeyDown = (e: ReactKeyboardEvent<HTMLSpanElement>) => {
    if (e.key === "Escape" && open) {
      setOpen(false);
    }
    onKeyDown?.(e);
  };

  const descId = useId();

  const panelStyle: CSSProperties = {
    maxWidth: toMaxWidthValue(maxWidth),
    ["--tt-gap" as string]: `${gap}px`,
  };

  const rootClass = [styles.root, className].filter(Boolean).join(" ");
  const panelClass = [styles.panel, panelClassName].filter(Boolean).join(" ");

  return (
    <span
      {...rest}
      ref={ref}
      className={rootClass}
      style={style}
      data-direction={direction}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onFocus={handleFocus}
      onBlur={handleBlur}
      onKeyDown={handleKeyDown}
    >
      <span
        className={styles.trigger}
        aria-describedby={open && !disabled ? descId : undefined}
      >
        {children}
      </span>

      {open && !disabled ? (
        <span
          className={panelClass}
          role="tooltip"
          id={descId}
          data-direction={direction}
          data-arrow={trailing ? "true" : "false"}
          style={panelStyle}
        >
          {title !== undefined && title !== null && title !== "" ? (
            <span className={styles.title}>{title}</span>
          ) : null}
          <span className={styles.text}>{content}</span>
          {trailing ? <span className={styles.arrow} aria-hidden="true" /> : null}
        </span>
      ) : null}
    </span>
  );
}

export const Tooltip = forwardRef<HTMLSpanElement, TooltipProps>(TooltipInner);
Tooltip.displayName = "Tooltip";

/* =================================================================
 *  HelpIconWithTooltip
 *  Figma node: 13300:13569
 *  - 24px Info 아이콘 버튼 + Tooltip 조합 편의 컴포넌트
 * =============================================================== */

export type HelpIconWithTooltipProps = Omit<TooltipProps, "children"> & {
  /** 아이콘 크기(px). 기본 24 (Figma) */
  iconSize?: number;
  /** 버튼 aria-label. 기본 `"도움말"` */
  iconLabel?: string;
  /** 아이콘 SVG 경로. 기본 `/icon/Info.svg` */
  iconSrc?: string;
  /** 아이콘 색상. 기본 currentColor(부모 color 상속) */
  iconColor?: string;
};

export const HelpIconWithTooltip = forwardRef<
  HTMLSpanElement,
  HelpIconWithTooltipProps
>(function HelpIconWithTooltip(props, ref) {
  const {
    iconSize = 24,
    iconLabel = "도움말",
    iconSrc = "/icon/Info.svg",
    iconColor,
    gap = 4,
    className,
    ...rest
  } = props;

  const wrapClass = [styles.helpWrap, className].filter(Boolean).join(" ");
  const iconStyle: CSSProperties = {
    width: iconSize,
    height: iconSize,
    WebkitMaskImage: `url(${iconSrc})`,
    maskImage: `url(${iconSrc})`,
    ...(iconColor ? { background: iconColor } : null),
  };

  return (
    <Tooltip {...rest} ref={ref} gap={gap} className={wrapClass}>
      <button
        type="button"
        className={styles.helpButton}
        aria-label={iconLabel}
        style={{ width: iconSize, height: iconSize }}
      >
        <span className={styles.helpIcon} style={iconStyle} />
      </button>
    </Tooltip>
  );
});

export default Tooltip;
