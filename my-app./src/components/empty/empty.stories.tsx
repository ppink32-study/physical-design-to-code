import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import type { CSSProperties } from "react";

import { figmaNodeUrl } from "../../stories/story-figma-urls";
import { Empty, type EmptyIconType, type EmptySize } from "./empty";
import { FigmaLinkCard } from "@/stories/figma-link-card";
import { StoryDocsMatrixPage } from "@/stories/story-docs-shell";

const FIGMA_SECTION = figmaNodeUrl("5262-317642");

const SIZES: EmptySize[] = ["small", "medium", "large"];

/** Figma Empty 아이콘 4종 — `icon` preset 키와 동일 */
const ICON_PRESETS: { key: EmptyIconType; file: string }[] = [
  { key: "data", file: "EmptyData.svg" },
  { key: "image", file: "EmptyImage.svg" },
  { key: "table", file: "EmptyTable.svg" },
  { key: "upload", file: "EmptyUpload.svg" },
];

const cellStyle: CSSProperties = {
  padding: "16px 24px",
  border: "1px dashed #e5e6ea",
  borderRadius: 8,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  minHeight: 160,
};

const labelMuted: CSSProperties = {
  fontSize: 11,
  fontWeight: 600,
  color: "var(--context-foreground-surface-on-surface-secondary)",
};

const meta: Meta<typeof Empty> = {
  title: "Components/Empty",
  component: Empty,
  parameters: {
    layout: "padded",
    figma: FIGMA_SECTION,
    docs: { disable: true },
  },
  argTypes: {
    size: {
      control: "inline-radio",
      options: ["small", "medium", "large"],
    },
    icon: {
      control: "select",
      options: ["data", "image", "table", "upload"],
    },
    description: { control: "text" },
    subtext: { control: "text" },
  },
};
export default meta;

type Story = StoryObj<typeof Empty>;

export const Matrix: Story = {
  name: "Matrix",
  parameters: { layout: "padded" },
  render: (_args, ctx) => {
    const locale = ctx.globals && ctx.globals.locale === "en" ? "en" : "ko";
    return (
    <StoryDocsMatrixPage
      title="Empty"
      description={locale === "en"
        ? "Four icon presets (data · image · table · upload) shown alongside Text · Subtext · Size combinations."
        : "아이콘 프리셋 4종(data·image·table·upload)과 Text·Subtext·Size 조합을 정리해 보여줍니다."}
      figmaNode="12368-26042"
    >
      <FigmaLinkCard
        nodeId="12368-26042"
        caption="Components / Empty — Layout 매트릭스 원본"
      />

      <section style={{ marginBottom: 40 }}>
        <h4 style={{ margin: "0 0 12px", fontSize: 13, fontWeight: 600 }}>
          Icon preset — 4 types
        </h4>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, minmax(140px, 1fr))",
            gap: 16,
            maxWidth: 960,
          }}
        >
          {ICON_PRESETS.map(({ key, file }) => (
            <div
              key={key}
              style={{
                ...cellStyle,
                flexDirection: "column",
                gap: 12,
                minHeight: 180,
              }}
            >
              <Empty size="medium" icon={key} description="Description" />
              <div style={{ textAlign: "center", width: "100%" }}>
                <div
                  style={{
                    fontSize: 12,
                    fontWeight: 600,
                    fontFamily: "ui-monospace, SFMono-Regular, monospace",
                    color: "var(--context-foreground-surface-on-surface-base)",
                  }}
                >
                  {key}
                </div>
                <div
                  style={{
                    marginTop: 4,
                    fontSize: 10,
                    color: "var(--context-foreground-surface-on-surface-hint)",
                  }}
                >
                  /icon/{file}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section style={{ overflowX: "auto" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: `100px repeat(6, minmax(140px, 1fr))`,
            gap: 12,
            alignItems: "stretch",
            minWidth: 640,
          }}
        >
          <div />
          <div style={{ ...labelMuted, gridColumn: "span 3", textAlign: "center" }}>
            Subtext: False
          </div>
          <div style={{ ...labelMuted, gridColumn: "span 3", textAlign: "center" }}>
            Subtext: True
          </div>

          <div />
          {SIZES.map((s) => (
            <div key={`col-h-${s}`} style={{ ...labelMuted, textAlign: "center" }}>
              {s}
            </div>
          ))}
          {SIZES.map((s) => (
            <div key={`col-h2-${s}`} style={{ ...labelMuted, textAlign: "center" }}>
              {s}
            </div>
          ))}

          <div style={{ ...labelMuted, paddingTop: 8 }}>Text: True</div>
          {SIZES.map((size) => (
            <div key={`t-sf-${size}`} style={cellStyle}>
              <Empty size={size} icon="data" description="Description" />
            </div>
          ))}
          {SIZES.map((size) => (
            <div key={`t-st-${size}`} style={cellStyle}>
              <Empty size={size} icon="data" description="Description" subtext="Subtext" />
            </div>
          ))}

          <div style={{ ...labelMuted, paddingTop: 8 }}>Text: False</div>
          {SIZES.map((size) => (
            <div key={`f-sf-${size}`} style={cellStyle}>
              <Empty size={size} icon="data" description="" />
            </div>
          ))}
          {SIZES.map((size) => (
            <div key={`f-st-${size}`} style={cellStyle}>
              <Empty size={size} icon="data" description="" subtext="Subtext" />
            </div>
          ))}
        </div>
      </section>
    </StoryDocsMatrixPage>
    );
  },
};
