"use client";
/* =============================================================================
 * SelectList — Figma Code Connect (node 11959:26477)
 * -----------------------------------------------------------------------------
 * Select 의 드롭다운 컨테이너(panel). 내부에 SelectItem 들을 children 으로 렌더한다.
 *
 * Variants
 *   type     : "1-level" | "2-levels" | "search"
 *     - "search" 는 상단에 검색 Input 이 기본 노출된다. (items 스크롤 영역 분리)
 *     - search prop 을 명시적으로 넘기면 "1-level" 에서도 검색 input 노출 가능.
 *   showScrollbar : 시각적 스크롤바 트랙 표시 (custom WebKit scrollbar 로 처리)
 *   maxHeight     : items 영역의 최대 높이 — 넘치면 내부 스크롤
 *
 * Props
 *   - children    : SelectItem 들 (또는 임의 노드)
 *   - search      : boolean | ReactNode   — true 이면 기본 검색 Input 노출
 *   - searchValue, onSearchChange, searchPlaceholder
 *   - width       : 기본 220
 * ========================================================================== */
import {
  forwardRef,
  type ChangeEvent,
  type HTMLAttributes,
  type ReactNode,
} from "react";
import styles from "./selectlist.module.css";

export type SelectListType = "1-level" | "2-levels" | "search";

export interface SelectListProps extends HTMLAttributes<HTMLDivElement> {
  type?: SelectListType;
  /** true / ReactNode 면 상단 검색 input 노출 */
  search?: boolean | ReactNode;
  searchValue?: string;
  onSearchChange?: (value: string) => void;
  searchPlaceholder?: string;
  /** items 영역 max-height (px). 기본 없음 — 내용만큼. */
  maxHeight?: number;
  /** 스크롤바 표시 여부 (native scroll 에 커스텀 스타일 적용) */
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
    const showSearch = type === "search" || Boolean(search);
    const customSearchNode =
      typeof search === "object" && search !== null ? (search as ReactNode) : null;

    return (
      <div
        ref={ref}
        className={[styles.list, className].filter(Boolean).join(" ")}
        data-type={type}
        data-scrollbar={showScrollbar || undefined}
        style={{
          width,
          ...style,
        }}
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

        <div
          className={styles.items}
          style={maxHeight != null ? { maxHeight } : undefined}
          data-scrollable={maxHeight != null || undefined}
        >
          {children}
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
