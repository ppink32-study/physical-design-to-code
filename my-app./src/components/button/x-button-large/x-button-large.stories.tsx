import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { FigmaLinkCard } from "@/stories/figma-link-card";
import {
  storyMatrixCellStyle,
  storyMatrixColHeaderStyle,
  storyMatrixTableBase,
} from "@/stories/story-matrix-table-styles";
import { StoryDocsMatrixPage } from "@/stories/story-docs-shell";

import { XButtonLarge } from "./x-button-large";

const meta: Meta<typeof XButtonLarge> = {
  title: "Components/Button/XButtonLarge",
  component: XButtonLarge,
  parameters: {
    layout: "centered",
    nextjs: { appDirectory: true },
    docs: { disable: true },
  },
};
export default meta;
type Story = StoryObj<typeof XButtonLarge>;

/* -----------------------------------------------------------------
 *  Playground
 * ----------------------------------------------------------------- */
export const Playground: Story = {
  render: () => (
    <div style={{ background: "#888", padding: 24, borderRadius: 8 }}>
      <XButtonLarge onClick={() => alert("닫기")} />
    </div>
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
  render: () => (
    <StoryDocsMatrixPage
      title="XButton Large"
      description="비디오/이미지 위에 오버레이로 올리는 32×32 원형 X 버튼."
      figmaNode="18369-15529"
    >
      <FigmaLinkCard
        nodeId="18369-15529"
        caption="Components / Button / XButtonLarge — overlay X (Default · Hover)"
      />

      <section>
        <h3 style={{ margin: "0 0 12px", fontSize: 13, fontWeight: 600, fontFamily: "var(--font-family-korean)", color: "var(--context-foreground-surface-on-surface-base)" }}>
          State
        </h3>
        <table style={{ ...storyMatrixTableBase, fontSize: 12 }}>
          <thead>
            <tr>
              <th style={storyMatrixColHeaderStyle}>Default</th>
              <th style={storyMatrixColHeaderStyle}>Hover (forceState)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{ ...storyMatrixCellStyle, padding: 24, background: "#888" }}>
                <XButtonLarge />
              </td>
              <td style={{ ...storyMatrixCellStyle, padding: 24, background: "#888" }}>
                <XButtonLarge forceState="hover" />
              </td>
            </tr>
          </tbody>
        </table>
      </section>
    </StoryDocsMatrixPage>
  ),
};

