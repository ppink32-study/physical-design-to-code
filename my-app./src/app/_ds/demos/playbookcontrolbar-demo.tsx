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

  useEffect(() => {
    const id = setInterval(() => {
      setTime((t) => (t >= 180 ? 0 : t + 1));
    }, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <>
      <DemoSection
        title="예시"
        description="시간 필 + 프로그레스 (정적)"
      >
        <div style={videoStage}>
          <PlaybookControlBar
            currentTime={23}
            duration={180}
            showHandle="auto"
            onFullscreen={() => {}}
            onMore={() => {}}
          />
        </div>
        <div style={videoStage}>
          <PlaybookControlBar
            currentTime={96}
            duration={180}
            showHandle="auto"
            onFullscreen={() => {}}
            onMore={() => {}}
          />
        </div>
      </DemoSection>

      <DemoSection
        title="시간 진행 + 시크"
        description="트랙 클릭 시 onSeek으로 currentTime을 갱신합니다."
      >
        <div style={videoStage}>
          <PlaybookControlBar
            currentTime={time}
            duration={180}
            onSeek={setTime}
            showHandle="auto"
            onFullscreen={() => alert("fullscreen")}
            onMore={() => alert("more")}
          />
        </div>
      </DemoSection>

      <DemoSection
        title="Durations"
        description="길이에 따라 M:SS · MM:SS · H:MM:SS와 칸 너비가 바뀝니다."
      >
        <div style={videoStage}>
          <PlaybookControlBar
            currentTime={7}
            duration={45}
            showHandle="auto"
            onFullscreen={() => {}}
            onMore={() => {}}
          />
        </div>
        <div style={videoStage}>
          <PlaybookControlBar
            currentTime={3720}
            duration={9000}
            showHandle="auto"
            onFullscreen={() => {}}
            onMore={() => {}}
          />
        </div>
      </DemoSection>
    </>
  );
}

export default PlaybookControlBarDemo;
