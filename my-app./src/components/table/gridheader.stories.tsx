import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import type { CSSProperties } from "react";

import { Checkbox } from "../checkbox/checkbox";
import { Toggle } from "../toggle/toggle";
import { Pagination } from "../pagination/pagination";

import { GridHeader } from "./gridheader";
import { BodyCell } from "./bodycell";
import {
  StoryDocsPage,
  StoryDocsParagraph,
  StoryDocsSection,
  StoryDocsNote,
} from "@/stories/story-docs-shell";

const meta: Meta<typeof GridHeader> = {
  title: "Components/Table/GridHeader",
  component: GridHeader,
  parameters: {
    layout: "padded",
    docs: { disable: true },
  },
};
export default meta;
type Story = StoryObj<typeof GridHeader>;

const matrixCell: CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "flex-start",
};

function Row({
  size,
  label,
}: {
  size: "single" | "double";
  label: string;
}) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      <div
        style={{
          fontSize: 11,
          color: "#787a88",
          fontWeight: 600,
          textTransform: "uppercase",
          letterSpacing: 0.4,
        }}
      >
        {label}
      </div>
      <div style={{ display: "flex", alignItems: "stretch" }}>
        <div style={matrixCell}>
          <GridHeader size={size} type="blank" />
        </div>
        <div style={matrixCell}>
          <GridHeader
            size={size}
            type="checkbox"
            checkboxSlot={<Checkbox aria-label="select all" />}
          />
        </div>
        <div style={matrixCell}>
          <GridHeader size={size} type="expand-all" />
        </div>
        <div style={matrixCell}>
          <GridHeader size={size} type="collapse-all" />
        </div>
        <div style={matrixCell}>
          <GridHeader size={size} type="default">
            Table Header
          </GridHeader>
        </div>
        <div style={matrixCell}>
          <GridHeader size={size} type="no" />
        </div>
        <div style={matrixCell}>
          <GridHeader
            size={size}
            type="toggle"
            toggleSlot={<Toggle aria-label="toggle" />}
          />
        </div>
      </div>
    </div>
  );
}

/** 2 sizes × 7 types — Figma sample 레이아웃 */
export const Matrix: Story = {
  name: "Full Matrix",
  parameters: { layout: "padded" },
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      <Row size="single" label="single" />
      <Row size="double" label="double" />
    </div>
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
    <StoryDocsPage title="GridHeader" description={locale === "en"
      ? "Layout guide for data-grid header and body cells."
      : "데이터 그리드 헤더 및 바디 셀 레이아웃 가이드입니다."}>
      <StoryDocsSection title="테이블 + Pagination 레이아웃">
        <StoryDocsParagraph>
          GridHeader와 BodyCell을 함께 사용해 데이터 테이블을 구성합니다. 헤더 행과 바디 행을 각각{" "}
          <strong>flex 컨테이너</strong>로 쌓아 열을 정렬합니다. 테이블을 감싸는 컨테이너에는{" "}
          <strong>좌우 border를 사용하지 않으며</strong> 하단 border만 적용합니다. Pagination은
          테이블 우측 하단에 <strong>16px</strong> 간격으로 배치합니다.
        </StoryDocsParagraph>
        <div style={{ padding: "20px 0", width: "100%" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 16, width: "100%" }}>
            <div
              style={{
                borderBottom: "1px solid var(--border-neutral, #d7d8dc)",
                borderRadius: "6px 6px 0 0",
                overflow: "hidden",
              }}
            >
              {/* Header */}
              <div style={{ display: "flex" }}>
                <GridHeader type="expand-all" width={40} />
                <GridHeader type="no" width={48} />
                <GridHeader type="default" width={160} align="left">MCP명</GridHeader>
                <GridHeader type="default" style={{ flex: 1 }} rPipe={false} align="left">설명</GridHeader>
              </div>
              {/* Body rows */}
              {[
                { no: 18, name: "MCP Name", desc: "MCP의 설명이 나타나는 영역입니다." },
                { no: 17, name: "MCP Name", desc: "MCP의 설명이 나타나는 영역입니다." },
                { no: 16, name: "MCP Name", desc: "MCP의 설명이 나타나는 영역입니다." },
                { no: 15, name: "MCP Name", desc: "MCP의 설명이 나타나는 영역입니다." },
              ].map((row) => (
                <div key={row.no} style={{ display: "flex" }}>
                  <BodyCell type="blank" width={40} />
                  <BodyCell type="text-center" width={48}>{row.no}</BodyCell>
                  <BodyCell type="text-left" width={160}>{row.name}</BodyCell>
                  <BodyCell type="text-left" style={{ flex: 1 }} lastCol>{row.desc}</BodyCell>
                </div>
              ))}
            </div>
            <div style={{ display: "flex", justifyContent: "flex-end" }}>
              <Pagination
                total={85}
                page={1}
                pageSize={10}
                showTotal
                showPerPage
                showGoTo
              />
            </div>
          </div>
        </div>
        <StoryDocsNote>
          헤더와 바디 행은 동일한 컬럼 너비를 공유해야 열이 정확히 정렬됩니다. 고정 컬럼은{" "}
          <strong>width prop</strong>으로, 가변 컬럼은 <strong>flex: 1</strong>로 지정합니다.
        </StoryDocsNote>
      </StoryDocsSection>
    </StoryDocsPage>
    );
  },
};
