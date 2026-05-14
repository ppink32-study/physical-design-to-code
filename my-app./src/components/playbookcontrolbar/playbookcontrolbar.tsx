"use client";

/**
 * PlaybookControlBar — Figma [17423:438](시간 + 프로그레스), [17423:429](매트릭스)
 *
 * [타임 필] ———— Progress ———— [전체화면] [더보기]  (Figma 17423:438)
 *
 * Props
 *   currentTime / defaultCurrentTime / duration (초)
 *   onSeek        : (time: number) => void — 트랙 클릭 시
 *   onFullscreen  : () => void — 우측 전체화면
 *   onMore        : () => void — 우측 더보기
 *   showHandle    : boolean | "auto" — 스크러버 핸들. "auto"면 호버 시 표시
 *   forceState    : "default" | "hover" — Storybook 등에서 핸들 강제
 *
 * 고정 너비(타임 칸): <10분 32px · ≥10분 & <1h 48px · ≥1h 64px
 *
 * 토큰
 *   pill / progress / handle : 기존 가이드(--black-opacity-50, primary-hover 등)
 */

import type {
  CSSProperties,
  HTMLAttributes,
  MouseEvent as ReactMouseEvent,
} from "react";
import { forwardRef, useCallback, useMemo, useRef, useState } from "react";

import styles from "./playbookcontrolbar.module.css";

function clamp(v: number, min: number, max: number): number {
  return Math.min(Math.max(v, min), max);
}

type IconKind = "play" | "pause" | "expand" | "more";

const ICON_MAP: Record<IconKind, { src: string; className: string }> = {
  play: { src: "/icon/PlayTriangle_2.svg", className: styles.playIcon },
  pause: { src: "/icon/Pause.svg", className: styles.playIcon },
  expand: { src: "/icon/Expand-2.svg", className: styles.expandIcon },
  more: { src: "/icon/MoreHorizontal.svg", className: styles.moreIcon },
};

type IconBtnProps = {
  icon: IconKind;
  label: string;
  onClick?: () => void;
  disabled?: boolean;
};

function IconBtn({ icon, label, onClick, disabled }: IconBtnProps) {
  const { src, className } = ICON_MAP[icon];
  return (
    <button
      type="button"
      className={styles.iconBtn}
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
    >
      <span
        className={`${styles.icon} ${className}`}
        style={{
          WebkitMaskImage: `url(${src})`,
          maskImage: `url(${src})`,
        }}
        aria-hidden
      />
    </button>
  );
}

function formatTime(
  totalSeconds: number,
  hasHour: boolean,
  padMinutes: boolean,
): string {
  const safe = Math.max(0, Math.floor(totalSeconds));
  const hours = Math.floor(safe / 3600);
  const minutes = Math.floor((safe % 3600) / 60);
  const seconds = safe % 60;
  const pad2 = (n: number) => String(n).padStart(2, "0");
  if (hasHour) return `${hours}:${pad2(minutes)}:${pad2(seconds)}`;
  return padMinutes
    ? `${pad2(minutes)}:${pad2(seconds)}`
    : `${minutes}:${pad2(seconds)}`;
}

export type PlaybookControlBarProps = {
  currentTime?: number;
  duration?: number;
  defaultCurrentTime?: number;
  /** 재생 중 여부 — 지정 시 controlled 모드 */
  isPlaying?: boolean;
  onPlay?: () => void;
  onSeek?: (time: number) => void;
  onFullscreen?: () => void;
  onMore?: () => void;
  showHandle?: boolean | "auto";
  forceState?: "default" | "hover";
  className?: string;
  style?: CSSProperties;
} & Omit<HTMLAttributes<HTMLDivElement>, "onSeek" | "onFullscreen">;

export const PlaybookControlBar = forwardRef<
  HTMLDivElement,
  PlaybookControlBarProps
>(function PlaybookControlBar(
  {
    currentTime: currentTimeProp,
    defaultCurrentTime = 0,
    duration = 0,
    isPlaying = false,
    onPlay,
    onSeek,
    onFullscreen,
    onMore,
    showHandle = "auto",
    forceState,
    className,
    style,
    ...rest
  },
  ref,
) {
  const [innerTime, setInnerTime] = useState<number>(defaultCurrentTime);
  const isControlled = currentTimeProp !== undefined;
  const currentTime = isControlled ? currentTimeProp : innerTime;

  const percent = useMemo(() => {
    if (duration <= 0) return 0;
    return clamp((currentTime / duration) * 100, 0, 100);
  }, [currentTime, duration]);

  const hasHour = duration >= 3600;
  const padMinutes = !hasHour && duration >= 600;
  const timeFormat: "mss" | "mmss" | "hms" = hasHour
    ? "hms"
    : padMinutes
      ? "mmss"
      : "mss";
  const curText = formatTime(currentTime, hasHour, padMinutes);
  const totText = formatTime(duration, hasHour, padMinutes);

  const trackRef = useRef<HTMLDivElement>(null);
  const handleTrackClick = useCallback(
    (e: ReactMouseEvent<HTMLDivElement>) => {
      if (!trackRef.current || duration <= 0) return;
      const rect = trackRef.current.getBoundingClientRect();
      const ratio = clamp((e.clientX - rect.left) / rect.width, 0, 1);
      const next = ratio * duration;
      if (!isControlled) setInnerTime(next);
      onSeek?.(next);
    },
    [duration, isControlled, onSeek],
  );

  const renderHandle = showHandle !== false;
  const resolvedState =
    forceState ?? (showHandle === true ? "hover" : undefined);

  return (
    <div
      ref={ref}
      className={[styles.root, className].filter(Boolean).join(" ")}
      style={style}
      data-state={resolvedState}
      {...rest}
    >
      <div className={styles.leftGroup}>
        <IconBtn
          icon={isPlaying ? "pause" : "play"}
          label={isPlaying ? "일시정지" : "재생"}
          onClick={onPlay}
        />
        <div className={styles.timePill}>
          <span className={styles.timePart} data-time-format={timeFormat}>
            {curText}
          </span>
          <span className={styles.timeSep}>/</span>
          <span className={styles.timePart} data-time-format={timeFormat}>
            {totText}
          </span>
        </div>
      </div>

      <div className={styles.progressWrap}>
        <div
          ref={trackRef}
          className={styles.progressTrack}
          role="slider"
          aria-label="Seek"
          aria-valuemin={0}
          aria-valuemax={duration}
          aria-valuenow={currentTime}
          tabIndex={0}
          onClick={handleTrackClick}
        >
          <div className={styles.progressTrackInner}>
            <div
              className={styles.progressFill}
              style={{ width: `${percent}%` }}
            />
          </div>
          {renderHandle && (
            <span
              className={styles.handle}
              style={{ left: `${percent}%` }}
              aria-hidden
            />
          )}
        </div>
      </div>

      <div className={styles.rightGroup}>
        <IconBtn icon="expand" label="Fullscreen" onClick={onFullscreen} />
        <IconBtn icon="more" label="More options" onClick={onMore} />
      </div>
    </div>
  );
});

export default PlaybookControlBar;
