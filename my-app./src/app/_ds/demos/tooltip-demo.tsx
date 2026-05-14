"use client";

import type { CSSProperties } from "react";

import {
  HelpIconWithTooltip,
  Tooltip,
  type TooltipDirection,
} from "@/components/tooltip/tooltip";
import { DemoSection, demoStyles as s } from "../demo-block";

const cellStyle: CSSProperties = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  gap: 12,
  padding: "64px 24px",
  borderRadius: 12,
  border:
    "1px solid color-mix(in srgb, var(--on-surface-base) 8%, transparent)",
  background: "var(--bg-surface-base)",
  minHeight: 160,
};

const captionStyle: CSSProperties = {
  fontSize: 12,
  fontWeight: 500,
  color: "var(--on-surface-sub)",
};

const triggerTextStyle: CSSProperties = {
  fontFamily: "var(--font-family-korean, Pretendard)",
  fontSize: 14,
  lineHeight: "20px",
  color: "var(--on-surface-base)",
  borderBottom: "1px dashed var(--on-surface-sub)",
  cursor: "help",
  outline: "none",
  padding: "2px 0",
};

const DIRECTIONS: TooltipDirection[] = ["top", "right", "bottom", "left"];

export function TooltipDemo() {
  return (
    <>
      <DemoSection
        title="Directions"
        description="top · right · bottom · left 4방향. 아래 툴팁들은 설명을 위해 기본 오픈 상태로 표시됩니다."
      >
        <div className={s.grid2} style={{ gap: 16 }}>
          {DIRECTIONS.map((dir) => (
            <div key={dir} style={cellStyle}>
              <Tooltip
                title="Title"
                content="Tooltip text"
                direction={dir}
                defaultOpen
                openDelay={0}
              >
                <span tabIndex={0} style={triggerTextStyle}>
                  direction=&quot;{dir}&quot;
                </span>
              </Tooltip>
              <span style={captionStyle}>direction=&quot;{dir}&quot;</span>
            </div>
          ))}
        </div>
      </DemoSection>

      <DemoSection
        title="Title / Arrow"
        description="Title 유무, Arrow(trailing) 유무의 조합을 확인할 수 있습니다."
      >
        <div className={s.grid2} style={{ gap: 16 }}>
          <div style={cellStyle}>
            <Tooltip title="Title" content="Tooltip text" defaultOpen openDelay={0}>
              <span tabIndex={0} style={triggerTextStyle}>
                title + text
              </span>
            </Tooltip>
            <span style={captionStyle}>title + text</span>
          </div>
          <div style={cellStyle}>
            <Tooltip content="Tooltip text" defaultOpen openDelay={0}>
              <span tabIndex={0} style={triggerTextStyle}>
                text only
              </span>
            </Tooltip>
            <span style={captionStyle}>text only</span>
          </div>
          <div style={cellStyle}>
            <Tooltip
              title="Title"
              content="Tooltip text"
              trailing={false}
              defaultOpen
              openDelay={0}
            >
              <span tabIndex={0} style={triggerTextStyle}>
                no arrow
              </span>
            </Tooltip>
            <span style={captionStyle}>trailing=false</span>
          </div>
          <div style={cellStyle}>
            <Tooltip
              title="Long content"
              content="툴팁은 240px 최대 너비를 가지며, 그 이상 길어지면 자동으로 줄바꿈 됩니다."
              defaultOpen
              openDelay={0}
            >
              <span tabIndex={0} style={triggerTextStyle}>
                long text
              </span>
            </Tooltip>
            <span style={captionStyle}>max-width 240px</span>
          </div>
        </div>
      </DemoSection>

      <DemoSection
        title="Help icon"
        description="HelpIconWithTooltip — 24px Info 아이콘 + 툴팁 조합. 아이콘과 툴팁 사이 간격은 4px 로 고정됩니다. 폼 라벨 옆 부가 설명 등에서 사용합니다."
      >
        <div className={s.grid2} style={{ gap: 16 }}>
          {DIRECTIONS.map((dir) => (
            <div key={dir} style={cellStyle}>
              <HelpIconWithTooltip
                title="Title"
                content="Tooltip text"
                direction={dir}
                defaultOpen
                openDelay={0}
              />
              <span style={captionStyle}>direction=&quot;{dir}&quot;</span>
            </div>
          ))}
        </div>
      </DemoSection>

      <DemoSection
        title="사용 가이드"
        description="폼 라벨, 인라인 텍스트, 아이콘 옆에 보조 설명을 붙일 때 사용합니다. 주요 액션(버튼)에 대해서는 툴팁 대신 명확한 문구나 Description 영역으로 정보를 전달하세요."
      >
        <div className={s.row} style={{ gap: 32, alignItems: "center" }}>
          <label
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 4,
              fontSize: 14,
              fontWeight: 500,
              color: "var(--on-surface-base)",
            }}
          >
            프로젝트 이름
            <HelpIconWithTooltip
              title="프로젝트 이름"
              content="영문/숫자 조합으로 최대 40자까지 입력할 수 있습니다."
              direction="top"
              iconSize={16}
            />
          </label>

          <Tooltip
            title="학습 진행률"
            content="현재까지 완료된 에피소드 비율입니다."
            direction="top"
          >
            <span tabIndex={0} style={triggerTextStyle}>
              학습 진행률
            </span>
          </Tooltip>
        </div>
      </DemoSection>
    </>
  );
}

export default TooltipDemo;
