"use client";

/**
 * SearchToggleItem — Figma MCP 기반 컴포넌트 (node 17312:17269)
 * ----------------------------------------------------------------
 * 검색 영역에서 한 가지 옵션을 선택하는 토글형 아이템.
 * (예: Multi Task / Single Task 중 택1)
 *
 * Variants (2)
 *   - Default : 배경 회색, 텍스트 secondary, font-weight 500
 *   - Select  : 배경 흰색 + primary 보더, 텍스트 primary, font-weight 600
 *
 * 토큰
 *   default bg     : --context-background-surface-bg-surface-secondary (#F4F4F5)
 *   default text   : --context-foreground-surface-on-surface-teriary   (#9698A3)
 *   select  bg     : --context-background-surface-bg-surface-white     (#FFFFFF)
 *   select  border : --border-border-primary                           (#5CC7D0)
 *   select  text   : --context-foreground-primary-on-primary           (#3F9BAE)
 *   font           : Body/Sm (12 / 16, weight 500/600, letter -0.06px)
 *
 * 접근성: `aria-pressed` 로 토글 상태를 알림 (`role="button"` 기본).
 */

import type {
  ButtonHTMLAttributes,
  ForwardedRef,
  ReactNode,
} from "react";
import { forwardRef } from "react";

import styles from "./search-toggle-item.module.css";

type NativeButtonProps = Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  "children"
>;

export type SearchToggleItemProps = NativeButtonProps & {
  /** 선택 상태 */
  selected?: boolean;
  children?: ReactNode;
};

function joinClasses(
  ...classes: Array<string | undefined | false | null>
): string {
  return classes.filter(Boolean).join(" ");
}

function SearchToggleItemInner(
  props: SearchToggleItemProps,
  ref: ForwardedRef<HTMLButtonElement>,
) {
  const {
    selected = false,
    type = "button",
    className,
    children,
    ...rest
  } = props;

  const classes = joinClasses(
    styles.root,
    selected ? styles.selected : styles.default,
    className,
  );

  return (
    <button
      {...rest}
      ref={ref}
      type={type}
      className={classes}
      aria-pressed={selected}
      data-selected={selected ? "true" : undefined}
    >
      {children}
    </button>
  );
}

export const SearchToggleItem = forwardRef<
  HTMLButtonElement,
  SearchToggleItemProps
>(SearchToggleItemInner);
SearchToggleItem.displayName = "SearchToggleItem";

export default SearchToggleItem;
