"use client";

import { useState, useEffect } from "react";
import { PlaybookControlBar } from "@/components/playbookcontrolbar/playbookcontrolbar";
import { DemoSection } from "../demo-block";

const videoStage = {
  background:
    "linear-gradient(135deg, rgba(20,22,28,0.96), rgba(40,44,54,0.96))",
  padding: 24,
  borderRadius: 14,
} as const;

export function PlaybookControlBarDemo() {
  const [time, setTime] = useState(65);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    if (!playing) return;
    const id = setInterval(() => {
      setTime((t) => (t >= 180 ? 0 : t + 1));
    }, 300);
    return () => clearInterval(id);
  }, [playing]);

  return (
    <>
      <DemoSection
        title="Default · Playing"
        description="기본 상태와 재생 중 상태를 비교"
      >
        <div style={videoStage}>
          <PlaybookControlBar currentTime={23} duration={180} />
        </div>
        <div style={videoStage}>
          <PlaybookControlBar currentTime={96} duration={180} defaultPlaying />
        </div>
      </DemoSection>

      <DemoSection
        title="Interactive"
        description="Play/Pause · Seek · Fullscreen 콜백 연결 데모"
      >
        <div style={videoStage}>
          <PlaybookControlBar
            currentTime={time}
            duration={180}
            playing={playing}
            onPlayPause={setPlaying}
            onSeek={setTime}
            onFullscreen={() => alert("fullscreen!")}
            onMore={() => alert("more!")}
          />
        </div>
      </DemoSection>

      <DemoSection
        title="Durations"
        description="짧은/긴 duration에 따라 시간 표시가 M:SS · H:MM:SS로 자동 전환"
      >
        <div style={videoStage}>
          <PlaybookControlBar currentTime={7} duration={45} />
        </div>
        <div style={videoStage}>
          <PlaybookControlBar currentTime={3720} duration={9000} />
        </div>
      </DemoSection>
    </>
  );
}

export default PlaybookControlBarDemo;
