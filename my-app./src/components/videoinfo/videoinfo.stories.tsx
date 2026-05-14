import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { FigmaLinkCard } from "@/stories/figma-link-card";
import {
  storyMatrixCellStyle,
  storyMatrixColHeaderStyle,
  storyMatrixTableBase,
} from "@/stories/story-matrix-table-styles";
import {
  StoryDocsMatrixPage,
} from "@/stories/story-docs-shell";

import { XButtonLarge } from "@/components/button/x-button-large/x-button-large";

import { VideoInfoBadge, VideoInfoCard } from "./videoinfo";

/* ----------------------------------------------------------------- */

const meta: Meta<typeof VideoInfoCard> = {
  title: "Components/Video Info",
  component: VideoInfoCard,
  parameters: {
    layout: "centered",
    nextjs: { appDirectory: true },
    docs: { disable: true },
  },
};
export default meta;
type Story = StoryObj<typeof VideoInfoCard>;

/* -----------------------------------------------------------------
 *  Playground
 * ----------------------------------------------------------------- */
export const Playground: Story = {
  render: () => (
    <VideoInfoCard
      width={320}
      badge={<VideoInfoBadge text="/camera/camera/color/image/w..." />}
      onClose={() => alert("삭제")}
    />
  ),
};

/* -----------------------------------------------------------------
 *  Matrix
 * ----------------------------------------------------------------- */
export const Matrix: Story = {
  name: "Matrix",
  parameters: {
    layout: "padded",
    nextjs: { appDirectory: true },
  },
  render: (_args, ctx) => {
    const locale = ctx.globals && ctx.globals.locale === "en" ? "en" : "ko";
    return (
    <StoryDocsMatrixPage
      title="Video Info"
      description={locale === "en"
        ? "Video thumbnail card + info badge shown at the bottom-left."
        : "비디오 썸네일 카드 + 좌측 하단에 표시되는 정보 배지."}
      figmaNode="17312-17623"
    >
      <FigmaLinkCard
        nodeId="17312-17623"
        caption="Components / Video Info — Card"
      />

      {/* Badge 단독 */}
      <section>
        <h3 style={{ margin: "0 0 12px", fontSize: 13, fontWeight: 600, fontFamily: "var(--font-family-korean)", color: "var(--on-surface-base)" }}>
          Badge — 텍스트 길이별
        </h3>
        <table style={{ ...storyMatrixTableBase, fontSize: 12 }}>
          <thead>
            <tr>
              <th style={storyMatrixColHeaderStyle}>짧은 텍스트</th>
              <th style={storyMatrixColHeaderStyle}>중간</th>
              <th style={storyMatrixColHeaderStyle}>긴 (188px 초과 → ellipsis)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{ ...storyMatrixCellStyle, padding: 24, background: "#333" }}>
                <VideoInfoBadge text="/img" />
              </td>
              <td style={{ ...storyMatrixCellStyle, padding: 24, background: "#333" }}>
                <VideoInfoBadge text="/camera/color/image" />
              </td>
              <td style={{ ...storyMatrixCellStyle, padding: 24, background: "#333" }}>
                <VideoInfoBadge text="/camera/camera/color/image/with/very/long/path/that/overflows" />
              </td>
            </tr>
          </tbody>
        </table>
      </section>

      {/* Card */}
      <section>
        <h3 style={{ margin: "0 0 12px", fontSize: 13, fontWeight: 600, fontFamily: "var(--font-family-korean)", color: "var(--on-surface-base)" }}>
          Card — 썸네일 영역 + Badge / Close 오버레이 (8px 여백)
        </h3>
        <table style={{ ...storyMatrixTableBase, fontSize: 12 }}>
          <thead>
            <tr>
              <th style={storyMatrixColHeaderStyle}>Placeholder</th>
              <th style={storyMatrixColHeaderStyle}>Badge 포함</th>
              <th style={storyMatrixColHeaderStyle}>Badge + Close</th>
              <th style={storyMatrixColHeaderStyle}>Close 만</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{ ...storyMatrixCellStyle, padding: 16 }}>
                <VideoInfoCard width={240} />
              </td>
              <td style={{ ...storyMatrixCellStyle, padding: 16 }}>
                <VideoInfoCard
                  width={240}
                  badge={<VideoInfoBadge text="/camera/color/image/w..." />}
                />
              </td>
              <td style={{ ...storyMatrixCellStyle, padding: 16 }}>
                <VideoInfoCard
                  width={240}
                  badge={<VideoInfoBadge text="/camera/color/image/w..." />}
                  onClose={() => alert("삭제")}
                />
              </td>
              <td style={{ ...storyMatrixCellStyle, padding: 16 }}>
                <VideoInfoCard
                  width={240}
                  closeButton={<XButtonLarge onClick={() => alert("삭제")} aria-label="삭제" />}
                />
              </td>
            </tr>
          </tbody>
        </table>
      </section>
    </StoryDocsMatrixPage>
    );
  },
};
