"use client";

import type { HTMLAttributes } from "react";

import { Loader, type LoaderProps } from "./loader";
import styles from "./page-loader-overlay.module.css";

export type PageLoaderOverlayProps = Omit<HTMLAttributes<HTMLDivElement>, "children"> & {
  /**
   * `viewport`: 전체 뷰포트 덮음 (`position: fixed`).
   * `parent`: `position: relative` 인 조상을 채움 — Storybook·섹션 미리보기용.
   */
  container?: "viewport" | "parent";
  /** 기존 `Loader`에 전달. 기본 large(48px)·mint·「로딩 중」 */
  loaderProps?: Pick<LoaderProps, "size" | "color" | "label">;
};

/**
 * 전체 페이지 로딩 — [Figma 18219:10393](https://www.figma.com/design/myQPboBEUAPxUwlvH9MH2R/Physical-AI-Platfrom-Design-Guideline?node-id=18219-10393&m=dev)
 * Dim 레이어(BlackOpacity_50) + backdrop blur 4px, 화면 정중앙에 `Loader`.
 */
export function PageLoaderOverlay({
  container = "viewport",
  loaderProps,
  className,
  ...rest
}: PageLoaderOverlayProps) {
  const { size = "large", color = "mint", label = "로딩 중" } = loaderProps ?? {};
  const rootClass = [
    container === "parent" ? styles.rootParent : styles.rootViewport,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={rootClass} aria-busy="true" {...rest}>
      <div className={styles.dim} aria-hidden="true" />
      <div className={styles.center}>
        <Loader size={size} color={color} label={label} />
      </div>
    </div>
  );
}
