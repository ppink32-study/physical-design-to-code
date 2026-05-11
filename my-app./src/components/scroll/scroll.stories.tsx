import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import type { CSSProperties } from "react";

import { Scrollbar } from "./scroll";
import {
  storyMatrixCellStyle,
  storyMatrixColHeaderStyle,
  storyMatrixRowHeaderStyle,
  storyMatrixScrollWrap,
  storyMatrixStickyCornerStyle,
  storyMatrixTableBase,
} from "@/stories/story-matrix-table-styles";
import { StoryDocsMatrixPage } from "@/stories/story-docs-shell";

const matrixScrollWrap = storyMatrixScrollWrap;
const matrixTableBase = storyMatrixTableBase;
const matrixColHeaderStyle = storyMatrixColHeaderStyle;
const matrixRowHeaderStyle = storyMatrixRowHeaderStyle;
const matrixCellStyle = storyMatrixCellStyle;
const matrixStickyCornerStyle = storyMatrixStickyCornerStyle;

const cellInner: CSSProperties = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  minHeight: 180,
};

const meta: Meta<typeof Scrollbar> = {
  title: "Components/Scroll",
  component: Scrollbar,
  parameters: {
    layout: "padded",
    docs: { disable: true },
  },
};
export default meta;
type Story = StoryObj<typeof Scrollbar>;

const LENGTH_MEDIUM = 220;
const THUMB_MEDIUM = 72;
const LENGTH_SMALL = 72;
const THUMB_SMALL = 28;

export const Matrix: Story = {
  name: "Matrix",
  parameters: { layout: "padded" },
  render: (_args, ctx) => {
    const locale = ctx.globals && ctx.globals.locale === "en" ? "en" : "ko";
    return (
    <StoryDocsMatrixPage
      title="Scroll"
      description={locale === "en"
        ? "Static Scrollbar visuals — columns: Medium · Small, rows: Vertical · Horizontal (Figma node 5250:17591). Matrix table styling uses the same tokens as Badge Matrix."
        : "Scrollbar 정적 시각 — 열: Medium · Small, 행: Vertical · Horizontal (Figma node 5250:17591). 매트릭스 표 스타일은 Badge Matrix와 동일한 토큰을 사용합니다."}
      figmaNode="5250-17591"
    >
      <div style={matrixScrollWrap}>
        <table style={matrixTableBase}>
          <thead>
            <tr>
              <th
                style={{
                  ...matrixColHeaderStyle,
                  ...matrixStickyCornerStyle,
                  minWidth: 140,
                  zIndex: 2,
                }}
                aria-hidden
              />
              <th scope="col" style={matrixColHeaderStyle}>
                Medium
              </th>
              <th scope="col" style={matrixColHeaderStyle}>
                Small
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th
                scope="row"
                style={{
                  ...matrixRowHeaderStyle,
                  ...matrixStickyCornerStyle,
                }}
              >
                Vertical
              </th>
              <td style={matrixCellStyle}>
                <div style={cellInner}>
                  <Scrollbar
                    orientation="vertical"
                    size="medium"
                    length={LENGTH_MEDIUM}
                    thumbLength={THUMB_MEDIUM}
                  />
                </div>
              </td>
              <td style={matrixCellStyle}>
                <div style={cellInner}>
                  <Scrollbar
                    orientation="vertical"
                    size="small"
                    length={LENGTH_SMALL}
                    thumbLength={THUMB_SMALL}
                  />
                </div>
              </td>
            </tr>
            <tr>
              <th
                scope="row"
                style={{
                  ...matrixRowHeaderStyle,
                  ...matrixStickyCornerStyle,
                }}
              >
                Horizontal
              </th>
              <td style={matrixCellStyle}>
                <div style={cellInner}>
                  <Scrollbar
                    orientation="horizontal"
                    size="medium"
                    length={LENGTH_MEDIUM}
                    thumbLength={THUMB_MEDIUM}
                  />
                </div>
              </td>
              <td style={matrixCellStyle}>
                <div style={cellInner}>
                  <Scrollbar
                    orientation="horizontal"
                    size="small"
                    length={LENGTH_SMALL}
                    thumbLength={THUMB_SMALL}
                  />
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </StoryDocsMatrixPage>
    );
  },
};
