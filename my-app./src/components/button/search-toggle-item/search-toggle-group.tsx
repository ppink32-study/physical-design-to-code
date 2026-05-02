"use client";

/**
 * SearchToggleGroup — Figma MCP 기반 컴포넌트 (node 17312:17303 "Toggle All")
 * ----------------------------------------------------------------
 * 여러 개의 SearchToggleItem 을 하나로 묶어 단일 선택 그룹으로 만든다.
 *
 * 시각적으로:
 *   - 외곽 컨테이너는 bg-surface-secondary 회색 + radius 8px
 *   - 내부 아이템 중 선택된 것만 흰 배경 + primary 보더로 "튀어나옴"
 *   - 선택되지 않은 아이템은 같은 회색이라 컨테이너에 자연스럽게 녹는다
 *
 * 토큰
 *   container bg     : --context-background-surface-bg-surface-secondary (#F4F4F5)
 *   container radius : --radius-lg (8)
 */

import type {
  ForwardedRef,
  HTMLAttributes,
  ReactNode,
} from "react";
import { forwardRef } from "react";

import styles from "./search-toggle-group.module.css";

type NativeDivProps = Omit<HTMLAttributes<HTMLDivElement>, "children">;

export type SearchToggleGroupProps = NativeDivProps & {
  /** 그룹 내부 아이템들 — SearchToggleItem 의 인스턴스를 넣는다 */
  children?: ReactNode;
  /** 접근성 라벨 — role="group" 와 함께 사용 */
  "aria-label"?: string;
};

function joinClasses(
  ...classes: Array<string | undefined | false | null>
): string {
  return classes.filter(Boolean).join(" ");
}

function SearchToggleGroupInner(
  props: SearchToggleGroupProps,
  ref: ForwardedRef<HTMLDivElement>,
) {
  const { children, className, role = "group", ...rest } = props;
  return (
    <div
      {...rest}
      ref={ref}
      role={role}
      className={joinClasses(styles.root, className)}
    >
      {children}
    </div>
  );
}

export const SearchToggleGroup = forwardRef<
  HTMLDivElement,
  SearchToggleGroupProps
>(SearchToggleGroupInner);
SearchToggleGroup.displayName = "SearchToggleGroup";

export default SearchToggleGroup;
