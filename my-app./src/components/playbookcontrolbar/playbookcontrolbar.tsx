"use client";

/**
 * PlaybookControlBar — Figma node 17423:438
 * ----------------------------------------------------------------
 * Variants : Default / Hover · Click (scrubber handle 표시)
 *
 * Structure
 *   [Play pill 32×32] [Time pill h=32] ———— Progress ———— [Expand] [More]
 *
 * Props
 *   currentTime  : number  — 현재 재생 시간 (초). controlled/uncontrolled 지원
 *   duration     : number  — 총 길이 (초)
 *   playing      : boolean — 재생 중 여부 (controlled)
 *   defaultPlaying : boolean — 재생 중 여부 (uncontrolled)
 *   onPlayPause  : (next: boolean) => void
 *   onSeek       : (time: number) => void
 *   onFullscreen : () => void
 *   onMore       : () => void
 *   showHandle   : boolean | "auto" — 스크러버 핸들 표시. "auto"이면 hover 시에만 표시
 *   forceState   : "default" | "hover" — Storybook 상태 강제
 *
 * 토큰
 *   pill bg      : --opacity-black-opacity-50
 *   pill text    : --context-foreground-icon-neutral-icon-neutral-white (white)
 *   pill icon    : --context-foreground-icon-neutral-icon-neutral-white (white)
 *   progress bg  : rgba(143,143,143,0.24) (figma: progress-opacity)
 *   progress fill: --context-background-primary-bg-primary-hover
 *   handle bg    : --context-background-primary-bg-primary-hover
 *   radius       : --radius-full
 */

import type {
  HTMLAttributes,
  CSSProperties,
  MouseEvent as ReactMouseEvent,
} from "react";
import { forwardRef, useCallback, useMemo, useRef, useState } from "react";

import styles from "./playbookcontrolbar.module.css";

/* ---------------------------------------------------------------------------
 * Helpers
 * ------------------------------------------------------------------------- */
function clamp(v: number, min: number, max: number): number {
  return Math.min(Math.max(v, min), max);
}

/**
 * 초(number) → 시간 문자열.
 *   hasHour=true : "H:MM:SS"
 *   padMinutes=true : "MM:SS"  (minutes 2자리 고정)
 *   else : "M:SS"
 */
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

/* ---------------------------------------------------------------------------
 * Icon Button (32×32 pill)
 * ------------------------------------------------------------------------- */
type IconKind = "play" | "pause" | "expand" | "more";

const ICON_MAP: Record<IconKind, { src: string; className: string }> = {
  play: { src: "/icon/PlayTriangle_2.svg", className: styles.playIcon },
  pause: { src: "/icon/Pause.svg", className: styles.pauseIcon },
  expand: { src: "/icon/Expand-2.svg", className: styles.expandIcon },
  more: { src: "/icon/MoreHorizontal.svg", className: styles.moreIcon },
};

type IconBtnProps = {
  icon: IconKind;
  label: string;
  onClick?: (e: ReactMouseEvent<HTMLButtonElement>) => void;
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

/* ---------------------------------------------------------------------------
 * Main Component
 * ------------------------------------------------------------------------- */
export type PlaybookControlBarProps = {
  currentTime?: number;
  duration?: number;
  defaultCurrentTime?: number;

  playing?: boolean;
  defaultPlaying?: boolean;

  onPlayPause?: (next: boolean) => void;
  onSeek?: (time: number) => void;
  onFullscreen?: () => void;
  onMore?: () => void;

  showHandle?: boolean | "auto";
  forceState?: "default" | "hover";

  className?: string;
  style?: CSSProperties;
} & Omit<HTMLAttributes<HTMLDivElement>, "onSeek">;

export const PlaybookControlBar = forwardRef<
  HTMLDivElement,
  PlaybookControlBarProps
>(function PlaybookControlBar(
  {
    currentTime: currentTimeProp,
    defaultCurrentTime = 0,
    duration = 0,
    playing: playingProp,
    defaultPlaying = false,
    onPlayPause,
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
  /* ----- controlled / uncontrolled ----- */
  const [innerTime, setInnerTime] = useState<number>(defaultCurrentTime);
  const [innerPlaying, setInnerPlaying] = useState<boolean>(defaultPlaying);

  const isTimeControlled = currentTimeProp !== undefined;
  const isPlayingControlled = playingProp !== undefined;

  const currentTime = isTimeControlled ? currentTimeProp : innerTime;
  const playing = isPlayingControlled ? playingProp : innerPlaying;

  const percent = useMemo(() => {
    if (duration <= 0) return 0;
    return clamp((currentTime / duration) * 100, 0, 100);
  }, [currentTime, duration]);

  /* ----- duration 포맷 판단 -----
   *   >= 1hr : "H:MM:SS" (양쪽 동일)
   *   >= 10min : "MM:SS"
   *   else : "M:SS"
   * current 과 duration 양쪽의 자리수를 맞춰 일관된 표시.
   */
  const hasHour = duration >= 3600;
  const padMinutes = !hasHour && duration >= 600;
  const extendedWidth = hasHour || padMinutes;
  const curText = formatTime(currentTime, hasHour, padMinutes);
  const totText = formatTime(duration, hasHour, padMinutes);

  /* ----- play / pause ----- */
  const handlePlayPause = useCallback(() => {
    const next = !playing;
    if (!isPlayingControlled) setInnerPlaying(next);
    onPlayPause?.(next);
  }, [playing, isPlayingControlled, onPlayPause]);

  /* ----- seek (click on track) ----- */
  const trackRef = useRef<HTMLDivElement>(null);
  const handleTrackClick = useCallback(
    (e: ReactMouseEvent<HTMLDivElement>) => {
      if (!trackRef.current || duration <= 0) return;
      const rect = trackRef.current.getBoundingClientRect();
      const ratio = clamp((e.clientX - rect.left) / rect.width, 0, 1);
      const next = ratio * duration;
      if (!isTimeControlled) setInnerTime(next);
      onSeek?.(next);
    },
    [duration, isTimeControlled, onSeek],
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
      {/* Left group : Play + Time */}
      <div className={styles.leftGroup}>
        <IconBtn
          icon={playing ? "pause" : "play"}
          label={playing ? "Pause" : "Play"}
          onClick={handlePlayPause}
        />
        <div className={styles.timePill}>
          <span
            className={styles.timePart}
            data-extended={extendedWidth ? "true" : "false"}
          >
            {curText}
          </span>
          <span className={styles.timeSep}>/</span>
          <span
            className={styles.timePart}
            data-extended={extendedWidth ? "true" : "false"}
          >
            {totText}
          </span>
        </div>
      </div>

      {/* Progress bar */}
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
            <div className={styles.progressFill} style={{ width: `${percent}%` }} />
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

      {/* Right group : Expand + More */}
      <div className={styles.rightGroup}>
        <IconBtn icon="expand" label="Fullscreen" onClick={onFullscreen} />
        <IconBtn icon="more" label="More options" onClick={onMore} />
      </div>
    </div>
  );
});

export default PlaybookControlBar;
