"use client";

import { useEffect, useState } from "react";
import styles from "./ReviewToolbar.module.css";

type Bg = "surface-base" | "white" | "dark" | "checker";

const BG_OPTIONS: Array<{ value: Bg; label: string }> = [
  { value: "surface-base", label: "Surface" },
  { value: "white", label: "White" },
  { value: "dark", label: "Dark" },
  { value: "checker", label: "Checker" },
];

/**
 * 검수용 컨트롤바.
 * - 클라이언트에서 `data-review-bg` / `data-review-show-labels` /
 *   `data-review-show-grid` 어트리뷰트를 root 요소(`#review-root`)에 토글하여
 *   하위 CSS 가 그에 맞춰 스타일을 변경한다.
 */
export function ReviewToolbar() {
  const [bg, setBg] = useState<Bg>("surface-base");
  const [showLabels, setShowLabels] = useState(true);
  const [showGrid, setShowGrid] = useState(true);

  useEffect(() => {
    const root = document.getElementById("review-root");
    if (!root) return;
    root.dataset.reviewBg = bg;
    root.dataset.reviewShowLabels = showLabels ? "true" : "false";
    root.dataset.reviewShowGrid = showGrid ? "true" : "false";
  }, [bg, showLabels, showGrid]);

  return (
    <div className={styles.toolbar} role="toolbar" aria-label="Review controls">
      <div className={styles.group}>
        <span className={styles.label}>Canvas</span>
        <div className={styles.segment}>
          {BG_OPTIONS.map((opt) => (
            <button
              key={opt.value}
              type="button"
              className={styles.option}
              data-active={bg === opt.value}
              onClick={() => setBg(opt.value)}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      <div className={styles.spacer} />

      <label className={styles.checkbox}>
        <input
          type="checkbox"
          checked={showLabels}
          onChange={(e) => setShowLabels(e.target.checked)}
        />
        Prop labels
      </label>
      <label className={styles.checkbox}>
        <input
          type="checkbox"
          checked={showGrid}
          onChange={(e) => setShowGrid(e.target.checked)}
        />
        Grid lines
      </label>

      <span className={styles.note}>상단 GNB의 테마 토글로 light / dark 검수</span>
    </div>
  );
}
