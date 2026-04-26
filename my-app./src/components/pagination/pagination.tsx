"use client";

/**
 * Pagination — Figma MCP 기반 구현
 * ----------------------------------------------------------------
 * Figma nodes
 *   Pagination           : 5030:28833
 *   Item / Pagination-Prev   : 5024:11276  (First Page / Prev · Default/Hover/Selected/Disable · M/L)
 *   Item / Pagination-Next   : 5024:92466  (Last Page / Next · ...)
 *   Item / Pagination-Number : 5024:92499
 *   Item / Pagination-Ellipsis : 5024:92569
 *
 * Props
 *   total          : 전체 아이템 수 (Total N 표시용)
 *   page           : 현재 페이지 (controlled / 1-based)
 *   defaultPage    : 현재 페이지 (uncontrolled)
 *   pageSize       : 페이지당 항목 수
 *   onPageChange   : (page) => void
 *   size           : "medium" | "large"
 *   siblingCount   : 현재 페이지 좌우로 보여줄 숫자 개수 (default 1)
 *   boundaryCount  : 양 끝에서 보여줄 숫자 개수 (default 1)
 *   showTotal      : "Total N" 영역 표시 여부
 *   showPerPage    : "N per page" 영역 표시 여부
 *   pageSizeOptions: [10,20,50,100] 등
 *   onPageSizeChange : (n) => void
 *   showGoTo       : "Go to" 영역 표시 여부
 *   onGoToPage     : (n) => void   (미지정 시 onPageChange 호출)
 *   forceItemState : 스토리북 강제 상태 확인용. 모든 item 에 data-force-state 전파.
 */

import type {
  ChangeEvent,
  CSSProperties,
  KeyboardEvent,
} from "react";
import { forwardRef, useMemo, useState } from "react";

import styles from "./pagination.module.css";

/* ----------------------------------------------------------------
 * Icon helper : mask-image + currentColor
 * -------------------------------------------------------------- */
function Icon({ src }: { src: string }) {
  const style: CSSProperties = {
    WebkitMask: `url(${src}) center / contain no-repeat`,
    mask: `url(${src}) center / contain no-repeat`,
  };
  return <span className={styles.icon} style={style} aria-hidden="true" />;
}

const ICONS = {
  first: "/icon/DoubleChevronLeft.svg",
  prev: "/icon/ChevronLeft.svg",
  next: "/icon/ChevronRight.svg",
  last: "/icon/DoubleChevronRight.svg",
  ellipsis: "/icon/MoreHorizontal.svg",
};

/* ----------------------------------------------------------------
 * Pagination range 계산
 *  -> ['first','prev', 1, '...', 5,6,7, '...', 20, 'next','last']
 * -------------------------------------------------------------- */
type RangeItem = number | "start-ellipsis" | "end-ellipsis";

function getRange(
  currentPage: number,
  totalPages: number,
  siblingCount: number,
  boundaryCount: number,
): RangeItem[] {
  const total = Math.max(1, totalPages);
  const current = Math.min(Math.max(1, currentPage), total);

  const startPages = range(1, Math.min(boundaryCount, total));
  const endPages = range(
    Math.max(total - boundaryCount + 1, boundaryCount + 1),
    total,
  );

  const siblingsStart = Math.max(
    Math.min(current - siblingCount, total - boundaryCount - siblingCount * 2 - 1),
    boundaryCount + 2,
  );
  const siblingsEnd = Math.min(
    Math.max(current + siblingCount, boundaryCount + siblingCount * 2 + 2),
    endPages.length > 0 ? endPages[0] - 2 : total - 1,
  );

  const result: RangeItem[] = [
    ...startPages,
    ...(siblingsStart > boundaryCount + 2
      ? (["start-ellipsis"] as const)
      : boundaryCount + 1 < total - boundaryCount
        ? [boundaryCount + 1]
        : []),
    ...range(siblingsStart, siblingsEnd),
    ...(siblingsEnd < total - boundaryCount - 1
      ? (["end-ellipsis"] as const)
      : total - boundaryCount > boundaryCount
        ? [total - boundaryCount]
        : []),
    ...endPages,
  ];

  // 중복 제거 (boundary/sibling 이 작을 때 생길 수 있음)
  const seen = new Set<string>();
  return result.filter((v) => {
    const key = typeof v === "number" ? `n-${v}` : v;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

function range(start: number, end: number): number[] {
  const length = end - start + 1;
  return length > 0 ? Array.from({ length }, (_, i) => start + i) : [];
}

/* ================================================================
 * Pagination Component
 * ============================================================== */
export type PaginationSize = "medium" | "large";
export type PaginationItemForceState = "default" | "hover" | "disable";

export type PaginationProps = {
  total?: number;
  page?: number;
  defaultPage?: number;
  pageSize?: number;
  onPageChange?: (page: number) => void;

  size?: PaginationSize;
  siblingCount?: number;
  boundaryCount?: number;

  showTotal?: boolean;
  showPerPage?: boolean;
  pageSizeOptions?: number[];
  onPageSizeChange?: (size: number) => void;

  showGoTo?: boolean;
  onGoToPage?: (page: number) => void;

  /** 스토리북 강제 상태 확인용 */
  forceItemState?: PaginationItemForceState;

  className?: string;
  style?: CSSProperties;
};

function PaginationInner(
  props: PaginationProps,
  ref: React.ForwardedRef<HTMLDivElement>,
) {
  const {
    total,
    page,
    defaultPage = 1,
    pageSize = 20,
    onPageChange,
    size = "medium",
    siblingCount = 1,
    boundaryCount = 1,
    showTotal = false,
    showPerPage = false,
    pageSizeOptions = [10, 20, 50, 100],
    onPageSizeChange,
    showGoTo = false,
    onGoToPage,
    forceItemState,
    className,
    style,
    ...rest
  } = props;

  const [uncontrolled, setUncontrolled] = useState(defaultPage);
  const isControlled = page !== undefined;
  const current = isControlled ? (page as number) : uncontrolled;

  const totalPages = useMemo(() => {
    if (typeof total === "number" && total >= 0 && pageSize > 0) {
      return Math.max(1, Math.ceil(total / pageSize));
    }
    return undefined;
  }, [total, pageSize]);

  const maxPage = totalPages ?? Number.MAX_SAFE_INTEGER;

  const goto = (next: number) => {
    const clamped = Math.max(1, Math.min(next, maxPage));
    if (clamped === current) return;
    if (!isControlled) setUncontrolled(clamped);
    onPageChange?.(clamped);
  };

  const items = useMemo(
    () =>
      totalPages
        ? getRange(current, totalPages, siblingCount, boundaryCount)
        : range(Math.max(1, current - 2), current + 2),
    [current, totalPages, siblingCount, boundaryCount],
  );

  const isFirst = current <= 1;
  const isLast = totalPages !== undefined ? current >= totalPages : false;

  /* ---------------- Go-to input state ---------------- */
  const [goToValue, setGoToValue] = useState("");
  const handleGoToKey = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== "Enter") return;
    const n = Number(goToValue);
    if (!Number.isFinite(n) || n <= 0) return;
    (onGoToPage ?? goto)(n);
    setGoToValue("");
  };

  /* ---------------- Per-page select ----------------- */
  const handlePageSize = (e: ChangeEvent<HTMLSelectElement>) => {
    const n = Number(e.target.value);
    onPageSizeChange?.(n);
  };

  /* ---------------- Item renderers ------------------- */
  const renderNavItem = (
    key: string,
    icon: keyof typeof ICONS,
    disabled: boolean,
    onClick: () => void,
    label: string,
  ) => (
    <button
      key={key}
      type="button"
      className={styles.item}
      data-icon="true"
      data-force-state={forceItemState}
      disabled={disabled}
      aria-disabled={disabled || undefined}
      aria-label={label}
      onClick={onClick}
    >
      <Icon src={ICONS[icon]} />
    </button>
  );

  return (
    <div
      ref={ref}
      className={[styles.root, className].filter(Boolean).join(" ")}
      data-size={size}
      style={style}
      {...rest}
    >
      {showTotal && typeof total === "number" ? (
        <p className={styles.total}>
          Total <strong>{total.toLocaleString()}</strong>
        </p>
      ) : null}

      <div className={styles.page} role="navigation" aria-label="Pagination">
        {renderNavItem("first", "first", isFirst, () => goto(1), "First page")}
        {renderNavItem("prev", "prev", isFirst, () => goto(current - 1), "Previous page")}

        {items.map((it, idx) => {
          if (it === "start-ellipsis" || it === "end-ellipsis") {
            return (
              <span
                key={`${it}-${idx}`}
                className={styles.item}
                data-icon="true"
                data-force-state={forceItemState}
                aria-hidden="true"
              >
                <Icon src={ICONS.ellipsis} />
              </span>
            );
          }
          const selected = it === current;
          return (
            <button
              key={`p-${it}`}
              type="button"
              className={styles.item}
              data-selected={selected || undefined}
              data-force-state={forceItemState}
              aria-current={selected ? "page" : undefined}
              aria-label={`Page ${it}`}
              onClick={() => goto(it)}
            >
              {it}
            </button>
          );
        })}

        {renderNavItem("next", "next", isLast, () => goto(current + 1), "Next page")}
        {renderNavItem(
          "last",
          "last",
          isLast,
          () => totalPages && goto(totalPages),
          "Last page",
        )}
      </div>

      {showPerPage ? (
        <div className={styles.helper}>
          <label className={styles.selectBox}>
            <select
              value={pageSize}
              onChange={handlePageSize}
              aria-label="Items per page"
            >
              {pageSizeOptions.map((n) => (
                <option key={n} value={n}>
                  {n}
                </option>
              ))}
            </select>
            <span className={styles.selectChevron} aria-hidden="true" />
          </label>
          <span>Per page</span>
        </div>
      ) : null}

      {showGoTo ? (
        <div className={styles.helper}>
          <span>Go to</span>
          <input
            className={styles.goInput}
            type="number"
            min={1}
            max={totalPages}
            value={goToValue}
            placeholder="Page"
            onChange={(e) => setGoToValue(e.target.value)}
            onKeyDown={handleGoToKey}
            aria-label="Go to page"
          />
        </div>
      ) : null}
    </div>
  );
}

export const Pagination = forwardRef<HTMLDivElement, PaginationProps>(
  PaginationInner,
);
Pagination.displayName = "Pagination";

export default Pagination;
