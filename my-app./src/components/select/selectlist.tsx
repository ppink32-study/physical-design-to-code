"use client";
/* =============================================================================
 * SelectList — Figma node 11959:26477
 * -----------------------------------------------------------------------------
 * Select 의 드롭다운 컨테이너(panel). 내부에 SelectItem 들을 children 으로 렌더한다.
 *
 * Variants
 *   type     : "1-level" | "2-levels" | "search"
 *   showScrollbar : maxHeight 초과 시 커스텀 Scrollbar 컴포넌트(absolute) 표시
 *   maxHeight     : items 영역의 최대 높이 — 넘치면 내부 스크롤
 * ========================================================================== */
import {
  forwardRef,
  useCallback,
  useEffect,
  useRef,
  useState,
  type ChangeEvent,
  type HTMLAttributes,
  type ReactNode,
} from "react";

import { Scrollbar } from "@/components/scroll/scroll";

import styles from "./selectlist.module.css";

export type SelectListType = "1-level" | "2-levels" | "search";

export interface SelectListProps extends HTMLAttributes<HTMLDivElement> {
  type?: SelectListType;
  /** true / ReactNode 면 상단 검색 input 노출 */
  search?: boolean | ReactNode;
  searchValue?: string;
  onSearchChange?: (value: string) => void;
  searchPlaceholder?: string;
  /** items 영역 max-height (px). 기본 없음 — 내용만큼 */
  maxHeight?: number;
  /** 넘칠 때 커스텀 스크롤바 표시 여부. 기본 true */
  showScrollbar?: boolean;
  /** 기본 220 */
  width?: number | string;
}

export const SelectList = forwardRef<HTMLDivElement, SelectListProps>(
  function SelectList(
    {
      type = "1-level",
      search,
      searchValue,
      onSearchChange,
      searchPlaceholder = "Search",
      maxHeight,
      showScrollbar = true,
      width = 220,
      className,
      style,
      children,
      ...rest
    },
    ref,
  ) {
    const itemsRef = useRef<HTMLDivElement>(null);
    const [isOverflow, setIsOverflow] = useState(false);
    const [trackHeight, setTrackHeight] = useState(0);
    const [thumbLength, setThumbLength] = useState(40);
    const [thumbOffset, setThumbOffset] = useState(0);

    const syncScrollbar = useCallback(() => {
      const el = itemsRef.current;
      if (!el) return;
      const { scrollHeight, clientHeight, scrollTop } = el;
      const overflow = scrollHeight > clientHeight;
      setTrackHeight(clientHeight);
      setIsOverflow(overflow);
      if (!overflow) return;

      const ratio = clientHeight / scrollHeight;
      const len = Math.max(clientHeight * ratio, 24);
      const maxThumbOffset = clientHeight - len;
      const scrollFraction = scrollTop / (scrollHeight - clientHeight);
      setThumbLength(len);
      setThumbOffset(maxThumbOffset * scrollFraction);
    }, []);

    useEffect(() => {
      const el = itemsRef.current;
      if (!el || maxHeight == null) return;
      syncScrollbar();
      el.addEventListener("scroll", syncScrollbar);
      const ro = new ResizeObserver(syncScrollbar);
      ro.observe(el);
      return () => {
        el.removeEventListener("scroll", syncScrollbar);
        ro.disconnect();
      };
    }, [syncScrollbar, maxHeight]);

    const showSearch = type === "search" || Boolean(search);
    const customSearchNode =
      typeof search === "object" && search !== null ? (search as ReactNode) : null;

    const renderScrollbar = showScrollbar && maxHeight != null && isOverflow;

    return (
      <div
        ref={ref}
        className={[styles.list, className].filter(Boolean).join(" ")}
        data-type={type}
        style={{ width, ...style }}
        role="listbox"
        {...rest}
      >
        {showSearch && (
          <>
            {customSearchNode ?? (
              <DefaultSearchInput
                value={searchValue}
                onChange={onSearchChange}
                placeholder={searchPlaceholder}
              />
            )}
            <div className={styles.divider} aria-hidden="true">
              <span className={styles.dividerLine} />
            </div>
          </>
        )}

        <div className={styles.itemsWrap}>
          <div
            ref={itemsRef}
            className={styles.items}
            style={maxHeight != null ? { maxHeight } : undefined}
          >
            {children}
          </div>

          {renderScrollbar && (
            <Scrollbar
              className={styles.scrollbarOverlay}
              orientation="vertical"
              size="small"
              length={trackHeight}
              thumbLength={thumbLength}
              thumbOffset={thumbOffset}
            />
          )}
        </div>
      </div>
    );
  },
);

/* -------------------------------------------------------------------------
 * 내장 기본 Search Input
 * ----------------------------------------------------------------------- */
function DefaultSearchInput({
  value,
  onChange,
  placeholder,
}: {
  value?: string;
  onChange?: (v: string) => void;
  placeholder?: string;
}) {
  return (
    <div className={styles.searchInput}>
      <span className={styles.searchIcon} aria-hidden="true" />
      <input
        className={styles.searchField}
        type="text"
        value={value ?? ""}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          onChange?.(e.target.value)
        }
        placeholder={placeholder}
        aria-label={placeholder}
      />
    </div>
  );
}
