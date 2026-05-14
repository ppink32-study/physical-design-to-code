"use client";

import { Scrollbar, ScrollArea } from "@/components/scroll/scroll";
import { DemoSection, demoStyles as s } from "../demo-block";

export function ScrollDemo() {
  return (
    <>
      <DemoSection
        title="ScrollArea"
        description="max-height/width를 지정해 내부 콘텐츠를 자연스럽게 스크롤하는 래퍼"
      >
        <div className={s.grid2}>
          <ScrollArea maxHeight={160} orientation="vertical">
            <div style={{ padding: 12 }}>
              {Array.from({ length: 18 }).map((_, i) => (
                <p key={i} style={{ margin: "6px 0", fontSize: 13 }}>
                  Line {i + 1} — vertical scroll example content.
                </p>
              ))}
            </div>
          </ScrollArea>
          <ScrollArea maxWidth={320} orientation="horizontal">
            <div
              style={{
                display: "flex",
                gap: 8,
                padding: 12,
                whiteSpace: "nowrap",
              }}
            >
              {Array.from({ length: 20 }).map((_, i) => (
                <span
                  key={i}
                  style={{
                    padding: "6px 12px",
                    borderRadius: 8,
                    background: "var(--bg-sub-1)",
                    fontSize: 12,
                  }}
                >
                  Tag {i + 1}
                </span>
              ))}
            </div>
          </ScrollArea>
        </div>
      </DemoSection>

      <DemoSection title="Scrollbar — visual" description="트랙·썸 시각화 (실제 스크롤과 분리된 데코 컴포넌트)">
        <div className={s.row} style={{ alignItems: "flex-start", gap: 32 }}>
          <Scrollbar orientation="vertical" length={200} thumbLength={80} thumbOffset={40} />
          <Scrollbar orientation="horizontal" length={280} thumbLength={120} thumbOffset={60} />
          <Scrollbar orientation="vertical" size="small" length={200} thumbLength={60} />
        </div>
      </DemoSection>
    </>
  );
}

export default ScrollDemo;
