"use client";

/**
 * BodyCell — Data Grid/Body (Figma node 4456:290858)
 * ----------------------------------------------------------------
 * Phase 3 — 기본 텍스트/Blank 셀 (5 type)
 *   - blank, text-left, text-left-icon, text-center, text-right
 *
 * Phase 4 — 인터랙션 셀 (8 type)
 *   - checkbox, radio, icon, link, button, button-icon-only, like, switch
 *
 * Phase 5 — 폼/데이터 셀 (11 type)
 *   - text-field       : 160w, input 스타일 visual (placeholder 표시)
 *   - search           : 185w, input + trailing search icon
 *   - select           : 185w, text + trailing chevron-down
 *   - date-picker      : 155w, text + trailing calendar icon
 *   - state            : 74w, 좌측 dot + text (상태 인디케이터)
 *   - badge            : 123w, children slot (Badge 컴포넌트)
 *   - file             : 138w, PDF icon + 파일명
 *   - tree             : 253w, expand chevron + depth indent + text
 *   - multi-normal     : 100w, 56h, 2-line text
 *   - multi-sub-text   : 223w, 50h, title + badge slot + sub text
 *   - video            : 120w, 썸네일 이미지 + play overlay
 *
 * 공통 토큰
 *   - bg (Enabled)  : --context-background-surface-bg-surface-base
 *   - bg (Hovered)  : --context-background-surface-bg-surface-base-hover
 *   - bg (Selected) : --opacity-primary-opacity-8
 *   - border        : 1px solid --border-border-surface-border-surface-secondary
 *                     (right + bottom)
 *   - border(focus) : 1px solid --context-background-primary-bg-primary-secondary
 *   - text          : Body/Base_Regular (14/20)
 *                     --context-foreground-surface-on-surface-base
 *   - cell height   : 40px (multi-normal=56, multi-sub-text=50)
 */

import type {
  HTMLAttributes,
  ReactNode,
  CSSProperties,
  ChangeEvent,
  MouseEvent,
} from "react";
import { forwardRef } from "react";

import { Checkbox } from "../checkbox/checkbox";
import { Radio } from "../radio/radio";
import { Toggle } from "../toggle/toggle";

import styles from "./bodycell.module.css";

export type BodyCellState = "enabled" | "hovered" | "selected";

/** Phase 3 + Phase 4 + Phase 5 에서 지원하는 type */
export type BodyCellType =
  /* Phase 3 */
  | "blank"
  | "text-left"
  | "text-left-icon"
  | "text-center"
  | "text-right"
  /* Phase 4 */
  | "checkbox"
  | "radio"
  | "icon"
  | "link"
  | "button"
  | "button-icon-only"
  | "like"
  | "switch"
  /* Phase 5 */
  | "text-field"
  | "search"
  | "select"
  | "date-picker"
  | "state"
  | "badge"
  | "file"
  | "tree"
  | "multi-normal"
  | "multi-sub-text"
  | "video";

/** state 셀의 dot 색상 톤 */
export type BodyCellStateDotTone =
  | "primary"
  | "blue"
  | "green"
  | "red"
  | "yellow"
  | "gray";

type NativeDivProps = Omit<HTMLAttributes<HTMLDivElement>, "children">;

export type BodyCellProps = NativeDivProps & {
  /** Cell type */
  type?: BodyCellType;
  /** 셀의 visual state (row/cell hover·select 상태 연동) */
  state?: BodyCellState;
  /** Keyboard focus 링 (4변 border primary-secondary 톤) */
  focus?: boolean;
  /** 셀 컨텐츠.
   *  - text 타입 → 텍스트
   *  - link 타입 → 링크 텍스트
   *  - button / button-icon-only → Button 컴포넌트들
   *  - checkbox / radio / switch → 슬롯으로 직접 주입 가능 (미지정 시 내부 기본 렌더)
   */
  children?: ReactNode;
  /** text-left-icon 의 trailing 아이콘 또는 icon 타입의 중앙 아이콘.
   *  string 이면 mask-image(currentColor) 로 렌더, ReactNode 이면 그대로 렌더.
   *  text-left-icon 기본: /icon/Attachment.svg
   *  icon 기본: /icon/Attachment.svg */
  icon?: string | ReactNode;

  /* ========== Phase 4 전용 공통 폼 props ========== */
  /** checkbox / radio / switch 체크 상태 */
  checked?: boolean;
  /** checkbox / radio / switch 기본 체크 상태 (비제어) */
  defaultChecked?: boolean;
  /** checkbox / radio / switch onChange */
  onCheckedChange?: (checked: boolean, event: ChangeEvent<HTMLInputElement>) => void;
  /** checkbox / radio / switch disabled */
  disabled?: boolean;
  /** like 타입 on/off */
  liked?: boolean;
  /** like 토글 핸들러 */
  onLikeToggle?: (next: boolean, event: MouseEvent<HTMLButtonElement>) => void;
  /** link 타입 href */
  href?: string;
  /** link 타입 target */
  target?: string;

  /* ========== Phase 5 전용 props ========== */
  /** text-field / search placeholder */
  placeholder?: string;
  /** text-field / search value (표시용) */
  value?: string;
  /** select 펼친 상태 표시 (chevron 방향) */
  expanded?: boolean;
  /** state 셀의 dot 컬러 톤 */
  stateTone?: BodyCellStateDotTone;
  /** tree 셀의 depth (0부터, 한 depth 당 16px indent) */
  depth?: number;
  /** tree 셀 expand 상태 (chevron 방향) */
  treeExpanded?: boolean;
  /** multi-sub-text 의 부가 텍스트 */
  subText?: ReactNode;
  /** multi-sub-text 우측 badge slot */
  badge?: ReactNode;
  /** file 셀 파일 확장자 아이콘 경로 (기본: /icon/PDF.svg) */
  fileIcon?: string;
  /** video 셀 썸네일 이미지 src */
  thumbnailSrc?: string;

  /** Cell width override (number=px / css value) */
  width?: number | string;
  /** 우측 border 제거 (테이블 마지막 컬럼) */
  lastCol?: boolean;
  /** 하단 border 제거 (테이블 마지막 행) */
  lastRow?: boolean;
};

/* =================================================================
 * Icon helper (mask-image + currentColor)
 * =============================================================== */
function MaskIcon({
  src,
  size = 16,
  className,
}: {
  src: string;
  size?: number;
  className?: string;
}) {
  const style: CSSProperties = {
    WebkitMaskImage: `url(${src})`,
    maskImage: `url(${src})`,
    width: size,
    height: size,
  };
  return (
    <span
      aria-hidden="true"
      className={[styles.icon, className].filter(Boolean).join(" ")}
      style={style}
    />
  );
}

function isStringIcon(icon: unknown): icon is string {
  return typeof icon === "string" && icon.length > 0;
}

function renderIconContent(icon: BodyCellProps["icon"], fallback = "/icon/Attachment.svg") {
  if (icon === undefined) return <MaskIcon src={fallback} />;
  if (isStringIcon(icon)) return <MaskIcon src={icon} />;
  return icon;
}

/* =================================================================
 * Component
 * =============================================================== */
function BodyCellInner(
  props: BodyCellProps,
  ref: React.ForwardedRef<HTMLDivElement>,
) {
  const {
    type = "blank",
    state = "enabled",
    focus = false,
    children,
    icon,
    checked,
    defaultChecked,
    onCheckedChange,
    disabled,
    liked,
    onLikeToggle,
    href,
    target,
    placeholder,
    value,
    expanded,
    stateTone = "primary",
    depth = 0,
    treeExpanded = false,
    subText,
    badge,
    fileIcon = "/icon/PDF.svg",
    thumbnailSrc,
    width,
    lastCol = false,
    lastRow = false,
    className,
    style,
    role,
    ...rest
  } = props;

  const rootClass = [styles.root, className].filter(Boolean).join(" ");
  const rootStyle: CSSProperties = {
    ...(width !== undefined
      ? { width: typeof width === "number" ? `${width}px` : width }
      : null),
    ...style,
  };

  /* onChange 어댑터: Checkbox / Radio / Toggle 공용 */
  const handleChange = onCheckedChange
    ? (e: ChangeEvent<HTMLInputElement>) =>
        onCheckedChange(e.target.checked, e)
    : undefined;

  /* ---------- content by type ------------------------------------ */
  let content: ReactNode = null;

  switch (type) {
    case "blank": {
      content = <div className={styles.blankInner} aria-hidden="true" />;
      break;
    }

    case "text-left-icon": {
      content = (
        <div className={styles.wrapper}>
          <span className={styles.text} data-align="left">
            {children}
          </span>
          <span className={styles.trailing}>{renderIconContent(icon)}</span>
        </div>
      );
      break;
    }

    case "text-left":
    case "text-center":
    case "text-right": {
      const align =
        type === "text-center"
          ? "center"
          : type === "text-right"
            ? "right"
            : "left";
      content = (
        <span className={styles.text} data-align={align}>
          {children}
        </span>
      );
      break;
    }

    /* -----------------------------------------------------------
     * Phase 4 — Interaction cells
     * --------------------------------------------------------- */
    case "checkbox": {
      content = (
        <span className={styles.formSlot}>
          {children ?? (
            <Checkbox
              checked={checked}
              defaultChecked={defaultChecked}
              onChange={handleChange}
              disabled={disabled}
            />
          )}
        </span>
      );
      break;
    }

    case "radio": {
      content = (
        <span className={styles.formSlot}>
          {children ?? (
            <Radio
              checked={checked}
              defaultChecked={defaultChecked}
              onChange={handleChange}
              disabled={disabled}
            />
          )}
        </span>
      );
      break;
    }

    case "switch": {
      content = (
        <span className={styles.formSlot}>
          {children ?? (
            <Toggle
              checked={checked}
              defaultChecked={defaultChecked}
              onChange={handleChange}
              disabled={disabled}
            />
          )}
        </span>
      );
      break;
    }

    case "icon": {
      content = (
        <span className={styles.iconSlot}>
          {renderIconContent(icon)}
        </span>
      );
      break;
    }

    case "link": {
      const linkClass = [styles.link, disabled ? styles.linkDisabled : null]
        .filter(Boolean)
        .join(" ");
      content = href != null ? (
        <a
          className={linkClass}
          href={href}
          target={target}
          aria-disabled={disabled || undefined}
          onClick={disabled ? (e) => e.preventDefault() : undefined}
        >
          {children ?? "Link Text"}
        </a>
      ) : (
        <span className={linkClass}>{children ?? "Link Text"}</span>
      );
      break;
    }

    case "button":
    case "button-icon-only": {
      content = <div className={styles.buttonGroup}>{children}</div>;
      break;
    }

    case "like": {
      const isLiked = !!liked;
      content = (
        <button
          type="button"
          className={styles.likeBtn}
          aria-pressed={isLiked}
          aria-label={isLiked ? "좋아요 취소" : "좋아요"}
          disabled={disabled}
          onClick={(e) => onLikeToggle?.(!isLiked, e)}
        >
          <MaskIcon
            src={isLiked ? "/icon/StarFill.svg" : "/icon/Star.svg"}
            size={20}
            className={isLiked ? styles.likeIconOn : styles.likeIconOff}
          />
        </button>
      );
      break;
    }

    /* -----------------------------------------------------------
     * Phase 5 — Form / Data cells
     * --------------------------------------------------------- */
    case "text-field": {
      content = (
        <div className={styles.formBox}>
          <span
            className={styles.formBoxText}
            data-placeholder={value ? undefined : "true"}
          >
            {value ?? placeholder ?? "Placeholder"}
          </span>
        </div>
      );
      break;
    }

    case "search": {
      content = (
        <div className={styles.formBox}>
          <span
            className={styles.formBoxText}
            data-placeholder={value ? undefined : "true"}
          >
            {value ?? placeholder ?? "Placeholder"}
          </span>
          <MaskIcon src="/icon/Search.svg" size={16} className={styles.formBoxTrailing} />
        </div>
      );
      break;
    }

    case "select": {
      content = (
        <div className={styles.formBox}>
          <span className={styles.formBoxText}>
            {children ?? "Text"}
          </span>
          <MaskIcon
            src={expanded ? "/icon/ChevronDown.svg" : "/icon/ChevronDown.svg"}
            size={16}
            className={styles.formBoxTrailing}
          />
        </div>
      );
      break;
    }

    case "date-picker": {
      content = (
        <div className={styles.formBox}>
          <span
            className={styles.formBoxText}
            data-placeholder={value ? undefined : "true"}
          >
            {value ?? "yyyy-mm-dd"}
          </span>
          <MaskIcon src="/icon/Calendar.svg" size={16} className={styles.formBoxTrailing} />
        </div>
      );
      break;
    }

    case "state": {
      content = (
        <div className={styles.stateWrap}>
          <span className={styles.stateDot} data-tone={stateTone} aria-hidden="true" />
          <span className={styles.stateText}>{children ?? "Badge"}</span>
        </div>
      );
      break;
    }

    case "badge": {
      content = <div className={styles.badgeGroup}>{children}</div>;
      break;
    }

    case "file": {
      content = (
        <div className={styles.fileWrap}>
          <span className={styles.fileIcon}>
            <MaskIcon src={fileIcon} size={20} />
          </span>
          <span className={styles.text} data-align="left">
            {children ?? "File Name.pdf"}
          </span>
        </div>
      );
      break;
    }

    case "tree": {
      const indent = Math.max(0, depth) * 16;
      content = (
        <div className={styles.treeWrap} style={{ paddingLeft: indent }}>
          <span className={styles.treeChevron} aria-hidden="true">
            <MaskIcon
              src={treeExpanded ? "/icon/ChevronDown.svg" : "/icon/ChevronRight.svg"}
              size={16}
            />
          </span>
          <span className={styles.text} data-align="left">
            {children ?? "1depth Name"}
          </span>
        </div>
      );
      break;
    }

    case "multi-normal": {
      content = (
        <div className={styles.multiWrap}>
          <span className={styles.multiLine}>{children ?? "Multiple line"}</span>
          <span className={styles.multiLine}>{subText ?? "Multiple line"}</span>
        </div>
      );
      break;
    }

    case "multi-sub-text": {
      content = (
        <div className={styles.multiSubWrap}>
          <div className={styles.multiSubTop}>
            <span className={styles.multiSubTitle}>
              {children ?? "Multiple line Title 최대 한줄"}
            </span>
            {badge ? <span className={styles.multiSubBadge}>{badge}</span> : null}
          </div>
          <span className={styles.multiSubBottom}>
            {subText ?? "Sub Text"}
          </span>
        </div>
      );
      break;
    }

    case "video": {
      content = (
        <div className={styles.videoWrap}>
          {thumbnailSrc ? (
            <img
              src={thumbnailSrc}
              alt=""
              className={styles.videoThumb}
            />
          ) : (
            <div className={styles.videoThumbFallback} aria-hidden="true" />
          )}
          <span className={styles.videoPlay} aria-hidden="true">
            <MaskIcon src="/icon/Play.svg" size={12} />
          </span>
        </div>
      );
      break;
    }

    default: {
      content = null;
    }
  }

  return (
    <div
      {...rest}
      ref={ref}
      className={rootClass}
      data-type={type}
      data-state={state}
      data-focus={focus ? "true" : undefined}
      data-last-col={lastCol ? "true" : undefined}
      data-last-row={lastRow ? "true" : undefined}
      style={rootStyle}
      role={role ?? "cell"}
    >
      {content}
    </div>
  );
}

export const BodyCell = forwardRef<HTMLDivElement, BodyCellProps>(BodyCellInner);
BodyCell.displayName = "BodyCell";

export default BodyCell;
