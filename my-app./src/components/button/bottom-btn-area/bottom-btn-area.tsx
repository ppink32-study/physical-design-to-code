"use client";

/**
 * BottomBtnArea — Figma MCP 기반 컴포넌트 (node 9813:896)
 * ----------------------------------------------------------------
 * 페이지·모달 하단의 액션 영역 레이아웃.
 *
 * Variants (2)
 *   - Default : 좌·우 두 개의 버튼 그룹 (justify-between)
 *               leftActions 없으면 우측 그룹만 우측 정렬
 *   - Custom  : children 슬롯 — 임의 콘텐츠 자유 배치
 *
 * 토큰
 *   container bg : --bg-neutral (#FFFFFF)
 *   container padding : --spacing-2xl (24)
 *   group gap     : --spacing-sm (8)  — 버튼 사이
 *
 * Note: 실제 버튼은 `Button` 컴포넌트를 사용한다 (이 컴포넌트는 레이아웃만 담당).
 */

import type {
  ForwardedRef,
  HTMLAttributes,
  ReactNode,
} from "react";
import { forwardRef } from "react";

import styles from "./bottom-btn-area.module.css";

type NativeDivProps = Omit<HTMLAttributes<HTMLDivElement>, "children">;

export type BottomBtnAreaProps = NativeDivProps & {
  /** 왼쪽 버튼 그룹 (children 이 있으면 무시) */
  leftActions?: ReactNode;
  /** 오른쪽 버튼 그룹 (children 이 있으면 무시) */
  rightActions?: ReactNode;
  /** Custom 변형 — 지정하면 leftActions/rightActions 대신 직접 렌더 */
  children?: ReactNode;
};

function joinClasses(
  ...classes: Array<string | undefined | false | null>
): string {
  return classes.filter(Boolean).join(" ");
}

function BottomBtnAreaInner(
  props: BottomBtnAreaProps,
  ref: ForwardedRef<HTMLDivElement>,
) {
  const {
    leftActions,
    rightActions,
    children,
    className,
    ...rest
  } = props;

  const isCustom = children !== undefined && children !== null;
  const rootClass = joinClasses(styles.root, className);

  return (
    <div
      {...rest}
      ref={ref}
      className={rootClass}
      data-variant={isCustom ? "custom" : "default"}
    >
      {isCustom ? (
        children
      ) : (
        <div className={styles.row}>
          {leftActions ? (
            <div className={styles.group} data-side="left">
              {leftActions}
            </div>
          ) : (
            /* placeholder — flex justify-between 유지를 위해 */
            <span aria-hidden="true" />
          )}
          {rightActions ? (
            <div className={styles.group} data-side="right">
              {rightActions}
            </div>
          ) : null}
        </div>
      )}
    </div>
  );
}

export const BottomBtnArea = forwardRef<HTMLDivElement, BottomBtnAreaProps>(
  BottomBtnAreaInner,
);
BottomBtnArea.displayName = "BottomBtnArea";

export default BottomBtnArea;
