import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import type { CSSProperties } from "react";
import { useEffect, useState } from "react";

import { PlaybookControlBar } from "./playbookcontrolbar";
import { FigmaLinkCard } from "@/stories/figma-link-card";
import {
  storyMatrixCellStyle,
  storyMatrixColHeaderStyle,
  storyMatrixRowHeaderStyle,
  storyMatrixScrollWrap,
  storyMatrixTableBase,
} from "@/stories/story-matrix-table-styles";
import {
  StoryDocsMatrixPage,
  StoryDocsPage,
  StoryDocsParagraph,
  StoryDocsSection,
} from "@/stories/story-docs-shell";

const cellStageBase: CSSProperties = {
  padding: "24px 16px",
  borderRadius: 10,
  display: "flex",
  alignItems: "flex-end",
  minHeight: 120,
  width: "100%",
  minWidth: 480,
  maxWidth: 960,
};

const stageDark: CSSProperties = {
  ...cellStageBase,
  background:
    "linear-gradient(135deg, #1a1d25 0%, #252a35 35%, #333947 65%, #424a5a 100%)",
};

const stageLight: CSSProperties = {
  ...cellStageBase,
  background:
    "linear-gradient(135deg, #dfe3ea 0%, #c4cbd6 35%, #a9b2c0 65%, #8d97a8 100%)",
};

function MatrixStage({
  theme,
  children,
}: {
  theme: "light" | "brand";
  children: React.ReactNode;
}) {
  return (
    <div style={theme === "light" ? stageLight : stageDark}>
      <div style={{ width: "100%" }} data-theme={theme}>
        {children}
      </div>
    </div>
  );
}

const meta: Meta<typeof PlaybookControlBar> = {
  title: "Components/PlaybookControlBar",
  component: PlaybookControlBar,
  parameters: {
    layout: "padded",
    docs: { disable: true },
  },
};
export default meta;
type Story = StoryObj<typeof PlaybookControlBar>;

function TimeAndProgressTicker() {
  const duration = 312;
  const [currentTime, setCurrentTime] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    if (!isPlaying) return;
    const id = window.setInterval(() => {
      setCurrentTime((t) => {
        if (t >= duration) { setIsPlaying(false); return 0; }
        return t + 1;
      });
    }, 1000);
    return () => window.clearInterval(id);
  }, [isPlaying, duration]);

  return (
    <PlaybookControlBar
      currentTime={currentTime}
      duration={duration}
      isPlaying={isPlaying}
      onPlay={() => setIsPlaying((p) => !p)}
      onSeek={setCurrentTime}
      onFullscreen={() => {}}
      onMore={() => {}}
      showHandle="auto"
    />
  );
}

export const Matrix: Story = {
  name: "Matrix",
  parameters: { layout: "padded" },
  render: () => (
    <StoryDocsMatrixPage
      title="PlaybookControlBar"
      description={
        <>
          <strong>시간 필</strong>·<strong>프로그레스</strong>·우측 <strong>전체화면·더보기</strong>.
          Figma 컴포넌트 스펙:{" "}
          <a
            href="https://www.figma.com/design/myQPboBEUAPxUwlvH9MH2R/Physical-AI-Platfrom-Design-Guideline?node-id=17423-438&m=dev"
            target="_blank"
            rel="noreferrer noopener"
          >
            Figma 17423:438
          </a>
          .
        </>
      }
      figmaNode="17423-438"
    >
      <FigmaLinkCard
        nodeId="17423-438"
        caption="Playback Control Bar — 시간 + 프로그레스 (17423:438)"
      />

      <section style={{ marginTop: 8 }}>
        <h4 style={{ margin: "0 0 12px", fontSize: 13, fontWeight: 600 }}>시간 표기</h4>
        <div style={storyMatrixScrollWrap}>
          <table style={storyMatrixTableBase}>
            <thead>
              <tr>
                <th style={storyMatrixColHeaderStyle}>케이스</th>
                <th style={storyMatrixColHeaderStyle}>미리보기 (Dark)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row" style={storyMatrixRowHeaderStyle}>
                  10분 미만 (M:SS · 칸 32px) + progress
                </th>
                <td style={storyMatrixCellStyle}>
                  <MatrixStage theme="brand">
                    <PlaybookControlBar
                      currentTime={35}
                      duration={312}
                      showHandle="auto"
                    />
                  </MatrixStage>
                </td>
              </tr>
              <tr>
                <th scope="row" style={storyMatrixRowHeaderStyle}>
                  10분 이상 (MM:SS · 48px) + progress
                </th>
                <td style={storyMatrixCellStyle}>
                  <MatrixStage theme="brand">
                    <PlaybookControlBar
                      currentTime={420}
                      duration={900}
                      showHandle="auto"
                    />
                  </MatrixStage>
                </td>
              </tr>
              <tr>
                <th scope="row" style={storyMatrixRowHeaderStyle}>
                  1시간 이상 (H:MM:SS · 64px) + progress
                </th>
                <td style={storyMatrixCellStyle}>
                  <MatrixStage theme="brand">
                    <PlaybookControlBar
                      currentTime={1835}
                      duration={7325}
                      showHandle="auto"
                    />
                  </MatrixStage>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section style={{ marginTop: 40 }}>
        <h4 style={{ margin: "0 0 12px", fontSize: 13, fontWeight: 600 }}>
          Handle · auto vs 항상 (Dark)
        </h4>
        <div style={storyMatrixScrollWrap}>
          <table style={storyMatrixTableBase}>
            <thead>
              <tr>
                <th style={storyMatrixColHeaderStyle} />
                <th style={storyMatrixColHeaderStyle}>Handle auto</th>
                <th style={storyMatrixColHeaderStyle}>Handle 항상</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row" style={storyMatrixRowHeaderStyle}>
                  Default
                </th>
                <td style={storyMatrixCellStyle}>
                  <MatrixStage theme="brand">
                    <PlaybookControlBar
                      currentTime={80}
                      duration={312}
                      showHandle="auto"
                    />
                  </MatrixStage>
                </td>
                <td style={storyMatrixCellStyle}>
                  <MatrixStage theme="brand">
                    <PlaybookControlBar
                      currentTime={80}
                      duration={312}
                      showHandle
                      forceState="hover"
                    />
                  </MatrixStage>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section style={{ marginTop: 40 }}>
        <h4 style={{ margin: "0 0 12px", fontSize: 13, fontWeight: 600 }}>Light</h4>
        <div style={storyMatrixScrollWrap}>
          <MatrixStage theme="light">
            <PlaybookControlBar
              currentTime={60}
              duration={312}
              showHandle
              forceState="hover"
            />
          </MatrixStage>
        </div>
      </section>

      <section style={{ marginTop: 40 }}>
        <h4 style={{ margin: "0 0 12px", fontSize: 13, fontWeight: 600 }}>
          시간 진행 + 트랙 seek
        </h4>
        <MatrixStage theme="brand">
          <TimeAndProgressTicker />
        </MatrixStage>
      </section>
    </StoryDocsMatrixPage>
  ),
};

export const Guideline: Story = {
  name: "Guideline",
  parameters: {
    layout: "padded",
    controls: { hideNoControlsWarning: true, disable: true },
    actions: { disable: true },
  },
  render: (_args, ctx) => {
    const locale = ctx.globals && ctx.globals.locale === "en" ? "en" : "ko";
    return (
    <StoryDocsPage
      title="PlaybookControlBar"
      description={locale === "en"
        ? "Playback UI that places the time field and progress bar on a single row."
        : "시간 필과 프로그레스 바를 한 줄에 배치한 재생 UI입니다."}
    >
      <StoryDocsSection title="개요">
        <StoryDocsParagraph>
          <code>currentTime</code>, <code>duration</code>(초)로 타임 필과 진행률을 표시합니다.
          트랙 클릭 → <code>onSeek</code>, 우측 아이콘 → <code>onFullscreen</code>,{" "}
          <code>onMore</code>. <code>showHandle=&quot;auto&quot;</code>이면 호버 시 핸들 표시.
          타임 칸 고정 폭: 10분 미만 <strong>32px</strong>, 10분~1시간 미만 <strong>48px</strong>,
          1시간 이상 <strong>64px</strong>.
        </StoryDocsParagraph>
      </StoryDocsSection>
      <StoryDocsSection title="Figma">
        <StoryDocsParagraph>
          <a
            href="https://www.figma.com/design/myQPboBEUAPxUwlvH9MH2R/Physical-AI-Platfrom-Design-Guideline?node-id=17423-438&m=dev"
            target="_blank"
            rel="noreferrer noopener"
          >
            Playback Control Bar (node 17423:438)
          </a>
          , 매트릭스는{" "}
          <a
            href="https://www.figma.com/design/myQPboBEUAPxUwlvH9MH2R/Physical-AI-Platfrom-Design-Guideline?node-id=17423-429&m=dev"
            target="_blank"
            rel="noreferrer noopener"
          >
            17423:429
          </a>
          를 참고하세요.
        </StoryDocsParagraph>
      </StoryDocsSection>
    </StoryDocsPage>
    );
  },
};
