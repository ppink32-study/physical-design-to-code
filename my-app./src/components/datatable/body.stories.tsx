import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { FigmaLinkCard } from "@/stories/figma-link-card";
import {
  StoryDocsMatrixPage,
} from "@/stories/story-docs-shell";

import { DataTableBody } from "./body";
import { DataTableHeader } from "./header";

/* ----------------------------------------------------------------- */

const meta: Meta<typeof DataTableBody> = {
  title: "Components/DataTable/Body",
  component: DataTableBody,
  parameters: {
    layout: "centered",
    nextjs: { appDirectory: true },
    docs: { disable: true },
  },
  argTypes: {
    variant: { control: "inline-radio", options: ["text", "badge", "input", "textarea"] },
    children: { control: "text" },
    width: { control: "text" },
  },
};
export default meta;
type Story = StoryObj<typeof DataTableBody>;

/* -----------------------------------------------------------------
 *  Playground
 * ----------------------------------------------------------------- */
export const Playground: Story = {
  args: {
    variant: "text",
    children: "v1.0",
    width: 496,
  },
};

/* -----------------------------------------------------------------
 *  상수
 * ----------------------------------------------------------------- */
/** Figma 5269:129425 기준 — header 200px / body 496px */
const H_W = 200;
const B_W = 496;

/* -----------------------------------------------------------------
 *  Matrix
 * ----------------------------------------------------------------- */
export const Matrix: Story = {
  name: "Matrix",
  parameters: { layout: "padded", nextjs: { appDirectory: true } },
  render: (_args, ctx) => {
    const locale = (ctx.globals?.locale as "ko" | "en") === "en" ? "en" : "ko";
    return (
    <StoryDocsMatrixPage
      title="DataTable / Body"
      description={locale === "en"
        ? "Data table body cell component."
        : "데이터 테이블 바디 셀 컴포넌트입니다."}
      figmaNode="18385-9748"
    >
      <FigmaLinkCard nodeId="18385-9748" caption="Components / DataTable — Body" />

      {/* Variant 매트릭스 */}
      <section>
        <h3 style={{ margin: "0 0 12px", fontSize: 13, fontWeight: 600, fontFamily: "var(--font-family-korean)", color: "var(--on-surface-base)" }}>
          Body / Variant
        </h3>
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {[
            { variant: "text" as const, node: <DataTableBody variant="text" width={405}>v1.0</DataTableBody> },
            { variant: "badge" as const, node: <DataTableBody variant="badge" width={405}>Badge</DataTableBody> },
            { variant: "input" as const, node: <DataTableBody variant="input" width={405} placeholder="Placeholder" /> },
            { variant: "textarea" as const, node: <DataTableBody variant="textarea" width={405} placeholder="Text" /> },
          ].map((row) => (
            <div key={row.variant} style={{ display: "flex", alignItems: "flex-start", gap: 16 }}>
              <span
                style={{
                  width: 80,
                  flexShrink: 0,
                  fontSize: 12,
                  fontFamily: "var(--font-family-korean)",
                  color: "var(--on-surface-secondary)",
                  paddingTop: 10,
                }}
              >
                {row.variant}
              </span>
              {row.node}
            </div>
          ))}
        </div>
      </section>

      {/* -------------------------------------------------------
       *  Step Layout (Figma 5269:129425)
       *  가로 배치: [Header 200] + [Body 496] × 2 = 1392px
       * ----------------------------------------------------- */}
      <section style={{ marginTop: 40 }}>
        <h3 style={{ margin: "0 0 4px", fontSize: 13, fontWeight: 600, fontFamily: "var(--font-family-korean)", color: "var(--on-surface-base)" }}>
          Step Layout — 가로 배치 (Figma 5269:129425)
        </h3>
        <p style={{ margin: "0 0 12px", fontSize: 12, fontFamily: "var(--font-family-korean)", color: "var(--on-surface-secondary)" }}>
          Header(200px) + Body(496px) × 2컬럼, 3행 구성
        </p>

        <div style={{
          display: "inline-flex",
          flexDirection: "column",
          border: "1px solid var(--border-surface-secondary)",
          boxSizing: "border-box",
        }}>
          {/* Row 1 — text cells */}
          <div style={{ display: "flex" }}>
            <DataTableHeader width={H_W}>Version</DataTableHeader>
            <DataTableBody variant="text" width={B_W}>v1.0</DataTableBody>
            <DataTableHeader width={H_W}>Model Name</DataTableHeader>
            <DataTableBody variant="text" width={B_W}>GPT-4 Turbo</DataTableBody>
          </div>

          {/* Row 2 — badge cells */}
          <div style={{ display: "flex" }}>
            <DataTableHeader width={H_W}>Status</DataTableHeader>
            <DataTableBody variant="badge" width={B_W}>Active</DataTableBody>
            <DataTableHeader width={H_W}>Category</DataTableHeader>
            <DataTableBody variant="badge" width={B_W}>AI</DataTableBody>
          </div>

          {/* Row 3 — text cells */}
          <div style={{ display: "flex" }}>
            <DataTableHeader width={H_W}>Created</DataTableHeader>
            <DataTableBody variant="text" width={B_W}>2026-05-04</DataTableBody>
            <DataTableHeader width={H_W}>Author</DataTableHeader>
            <DataTableBody variant="text" width={B_W}>Physical AI Platform</DataTableBody>
          </div>
        </div>
      </section>
    </StoryDocsMatrixPage>
    );
  },
};
