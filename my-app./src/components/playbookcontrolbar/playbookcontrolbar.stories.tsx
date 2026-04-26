import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import type { CSSProperties } from "react";
import { useEffect, useState } from "react";

import { StoryPlaygroundFrame } from "@/stories/story-docs-shell";
import { PlaybookControlBar } from "./playbookcontrolbar";

/* -------------------------------------------------------------------------
 * 비디오 썸네일 스타일 배경 (pill 의 블랙 50% opacity 가 잘 보이도록)
 * ----------------------------------------------------------------------- */
const stageStyle: CSSProperties = {
  width: 1243,
  padding: "40px 0",
  background:
    "linear-gradient(135deg, #2a2f3a 0%, #3c4556 35%, #525c6e 65%, #6b7788 100%)",
  borderRadius: 12,
  display: "flex",
  alignItems: "flex-end",
  minHeight: 240,
};

const stageLightStyle: CSSProperties = {
  ...stageStyle,
  background:
    "linear-gradient(135deg, #dfe3ea 0%, #c4cbd6 35%, #a9b2c0 65%, #8d97a8 100%)",
};

const stageDarkStyle: CSSProperties = {
  ...stageStyle,
  background:
    "linear-gradient(135deg, #1a1d25 0%, #252a35 35%, #333947 65%, #424a5a 100%)",
};

const meta: Meta<typeof PlaybookControlBar> = {
  title: "Components/PlaybookControlBar",
  component: PlaybookControlBar,
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "Figma MCP 기반 Playback Control Bar (node 17423:438). Play/Pause · 시간 표시 · Progress(scrubber handle) · Fullscreen · More 로 구성. 기본은 Default variant, hover/focus 시 Handle 이 표시됩니다 (Hover · Click variant).",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    currentTime: { control: { type: "number", min: 0 } },
    duration: { control: { type: "number", min: 0 } },
    playing: { control: "boolean" },
    showHandle: {
      control: "inline-radio",
      options: [true, false, "auto"],
    },
    forceState: {
      control: "inline-radio",
      options: [undefined, "default", "hover"],
    },
  },
  decorators: [
    (Story) => (
      <div style={stageStyle}>
        <Story />
      </div>
    ),
  ],
};
export default meta;
type Story = StoryObj<typeof PlaybookControlBar>;

/* =========================================================================
 * Default — paused, no handle (hover 시에만 나타남)
 * ======================================================================= */
export const Playground: Story = {
  decorators: [
    (Story) => (
      <StoryPlaygroundFrame>
        <Story />
      </StoryPlaygroundFrame>
    ),
  ],
  args: {
    currentTime: 20,
    duration: 312,
    playing: false,
    showHandle: "auto",
  },
  parameters: {
    docs: {
      description: {
        story:
          "기본 상태. Progress 에 마우스를 올려야 Scrubber Handle 이 나타납니다 (Figma Default variant 대응).",
      },
    },
  },
};

/* =========================================================================
 * Hover / Click — handle 상시 표시
 * ======================================================================= */
export const HoverClick: Story = {
  args: {
    currentTime: 80,
    duration: 312,
    playing: false,
    showHandle: true,
    forceState: "hover",
  },
  parameters: {
    docs: {
      description: {
        story:
          "Figma Hover · Click variant. Scrubber Handle 이 항상 표시되어 위치를 시각화합니다.",
      },
    },
  },
};

/* =========================================================================
 * Playing — pause icon 표시
 * ======================================================================= */
export const Playing: Story = {
  args: {
    currentTime: 125,
    duration: 312,
    playing: true,
    showHandle: "auto",
  },
  parameters: {
    docs: {
      description: {
        story:
          "재생 중 상태. Play 버튼이 Pause 아이콘으로 바뀌며 Play/Pause 토글이 가능합니다.",
      },
    },
  },
};

/* =========================================================================
 * Long Duration — HH:MM:SS 포맷
 * ======================================================================= */
export const LongDuration: Story = {
  args: {
    currentTime: 1835, // 30:35
    duration: 7325, // 2:02:05
    playing: false,
    showHandle: "auto",
  },
  parameters: {
    docs: {
      description: {
        story:
          "duration 이 1시간 이상이면 자동으로 `H:MM:SS` 포맷으로 표시됩니다. 10분 이상 1시간 미만이면 `MM:SS` 로 표시.",
      },
    },
  },
};

/* =========================================================================
 * Short Duration — M:SS 포맷
 * ======================================================================= */
export const ShortDuration: Story = {
  args: {
    currentTime: 35,
    duration: 312, // 5:12
    playing: false,
    showHandle: "auto",
  },
  parameters: {
    docs: {
      description: {
        story:
          "duration 이 10분 미만이면 `M:SS` 로 표시됩니다 (Figma Default variant 의 '0:00 / 5:12').",
      },
    },
  },
};

/* =========================================================================
 * Variants — Default + Hover/Click 세로 나열 (Figma 구성 그대로)
 * ======================================================================= */
export const Variants: Story = {
  render: () => (
    <div
      style={{
        width: 1243,
        display: "flex",
        flexDirection: "column",
        gap: 48,
      }}
    >
      <PlaybookControlBar
        currentTime={20}
        duration={312}
        showHandle="auto"
      />
      <PlaybookControlBar
        currentTime={80}
        duration={312}
        showHandle
        forceState="hover"
      />
    </div>
  ),
  decorators: [
    (Story) => (
      <div
        style={{
          ...stageStyle,
          width: 1291,
          flexDirection: "column",
          gap: 48,
          alignItems: "stretch",
          padding: 24,
        }}
      >
        <Story />
      </div>
    ),
  ],
  parameters: {
    docs: {
      description: {
        story:
          "Figma 원본 Component Set 과 동일한 구성 — 위: Default, 아래: Hover · Click.",
      },
    },
  },
};

/* =========================================================================
 * Interactive — state 연결 + 자동 재생 타이머
 * ======================================================================= */
function InteractivePlayer() {
  const duration = 312;
  const [playing, setPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);

  useEffect(() => {
    if (!playing) return undefined;
    const id = window.setInterval(() => {
      setCurrentTime((t) => {
        if (t >= duration) {
          setPlaying(false);
          return duration;
        }
        return t + 1;
      });
    }, 1000);
    return () => window.clearInterval(id);
  }, [playing]);

  return (
    <PlaybookControlBar
      currentTime={currentTime}
      duration={duration}
      playing={playing}
      onPlayPause={(next) => {
        setPlaying(next);
        if (currentTime >= duration) setCurrentTime(0);
      }}
      onSeek={(t) => setCurrentTime(t)}
      onFullscreen={() => window.alert("Fullscreen")}
      onMore={() => window.alert("More options")}
      showHandle="auto"
    />
  );
}

export const Interactive: Story = {
  render: () => <InteractivePlayer />,
  parameters: {
    docs: {
      description: {
        story:
          "실제 동작 확인용 — Play 토글로 시간이 매초 증가, Progress 트랙 클릭으로 seek.",
      },
    },
  },
};

/* =========================================================================
 * Light / Dark compare
 * ======================================================================= */
export const LightDarkCompare: Story = {
  render: () => (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "1fr",
        gap: 24,
        width: "100%",
      }}
    >
      <div style={stageLightStyle}>
        <div style={{ width: "100%" }} data-theme="light">
          <PlaybookControlBar
            currentTime={60}
            duration={312}
            showHandle
            forceState="hover"
          />
        </div>
      </div>
      <div style={stageDarkStyle}>
        <div style={{ width: "100%" }} data-theme="dark">
          <PlaybookControlBar
            currentTime={60}
            duration={312}
            showHandle
            forceState="hover"
          />
        </div>
      </div>
    </div>
  ),
  decorators: [(Story) => <Story />],
  parameters: {
    layout: "padded",
    docs: {
      description: {
        story:
          "Light / Dark 배경 대비 확인. Control bar 자체는 블랙 50% opacity 배경이므로 어느 테마에서도 일관된 가독성을 유지합니다.",
      },
    },
  },
};
