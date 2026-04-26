import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import type { CSSProperties } from "react";
import { useState } from "react";

import { Pagination } from "./pagination";
import { FigmaLinkCard } from "@/stories/figma-link-card";
import {
  StoryDocsMatrixPage,
  StoryDocsPage,
  StoryDocsParagraph,
  StoryDocsSection,
  StoryPlaygroundFrame,
} from "@/stories/story-docs-shell";

const meta: Meta<typeof Pagination> = {
  title: "Components/Pagination",
  component: Pagination,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Figma MCP 기반 Pagination. First / Prev / Number / Ellipsis / Next / Last 아이템으로 구성되며 Medium(32) / Large(40) 두 가지 사이즈를 지원합니다. (node 5030:28833)",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    size: { control: "inline-radio", options: ["medium", "large"] },
    page: { control: { type: "number", min: 1 } },
    pageSize: { control: { type: "number", min: 1 } },
    total: { control: { type: "number", min: 0 } },
    siblingCount: { control: { type: "number", min: 0, max: 3 } },
    boundaryCount: { control: { type: "number", min: 0, max: 3 } },
    showTotal: { control: "boolean" },
    showPerPage: { control: "boolean" },
    showGoTo: { control: "boolean" },
    forceItemState: {
      control: "inline-radio",
      options: ["default", "hover", "disable"],
    },
  },
};
export default meta;
type Story = StoryObj<typeof Pagination>;

export const Playground: Story = {
  decorators: [
    (Story) => (
      <StoryPlaygroundFrame>
        <Story />
      </StoryPlaygroundFrame>
    ),
  ],
  args: {
    total: 85,
    pageSize: 20,
    defaultPage: 6,
    size: "medium",
    showTotal: true,
    showPerPage: true,
    showGoTo: true,
  },
};

const labelStyle: CSSProperties = {
  fontSize: 12,
  color: "var(--context-foreground-surface-on-surface-hint)",
  marginBottom: 8,
};

const panelStyle: CSSProperties = {
  padding: 24,
  borderRadius: 12,
  minWidth: 720,
  flex: 1,
  background: "var(--context-background-surface-bg-surface-base)",
  color: "var(--context-foreground-surface-on-surface-base)",
  border: "1px solid var(--border-border-surface-border-surface)",
};

function ThemePanel({ theme }: { theme: "light" | "dark" }) {
  return (
    <div data-theme={theme} style={panelStyle}>
      <div style={{ ...labelStyle, fontWeight: 600 }}>{theme.toUpperCase()}</div>
      <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
        <Pagination
          total={85}
          pageSize={20}
          defaultPage={3}
          size="medium"
          showTotal
          showPerPage
          showGoTo
        />
        <Pagination total={400} pageSize={20} defaultPage={6} size="large" showTotal />
      </div>
    </div>
  );
}

function ControlledBlock() {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(20);
  const total = 320;
  const totalPages = Math.ceil(total / pageSize);
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      <div style={labelStyle}>
        현재 페이지 <strong>{page}</strong> / {totalPages} · pageSize <strong>{pageSize}</strong>
      </div>
      <Pagination
        total={total}
        pageSize={pageSize}
        page={page}
        onPageChange={setPage}
        onPageSizeChange={(n) => {
          setPageSize(n);
          setPage(1);
        }}
        showTotal
        showPerPage
        showGoTo
      />
    </div>
  );
}

export const Matrix: Story = {
  name: "Matrix",
  parameters: { layout: "padded" },
  render: () => (
    <StoryDocsMatrixPage
      title="Pagination"
      description="Medium·Large, 아이템 상태, 옵션 영역, controlled, 라이트·다크 대비를 비교합니다."
      figmaNode="5030-28833"
    >
      <FigmaLinkCard
        nodeId="5030-28833"
        caption="Components / Pagination — 구성 매트릭스 원본"
      />
      <section>
        <h4 style={{ margin: "0 0 12px", fontSize: 13, fontWeight: 600 }}>Sizes</h4>
        <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
          <div>
            <h4 style={labelStyle}>Medium (32px)</h4>
            <Pagination total={400} pageSize={20} defaultPage={6} size="medium" />
          </div>
          <div>
            <h4 style={labelStyle}>Large (40px)</h4>
            <Pagination total={400} pageSize={20} defaultPage={6} size="large" />
          </div>
        </div>
      </section>

      <section>
        <h4 style={{ margin: "0 0 12px", fontSize: 13, fontWeight: 600 }}>Item states</h4>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "120px 1fr",
            rowGap: 16,
            columnGap: 16,
            alignItems: "center",
            justifyItems: "start",
          }}
        >
          <div style={labelStyle}>Default</div>
          <div>
            <Pagination total={200} pageSize={20} defaultPage={6} size="medium" />
          </div>
          <div style={labelStyle}>Hover</div>
          <div>
            <Pagination
              total={200}
              pageSize={20}
              defaultPage={6}
              size="medium"
              forceItemState="hover"
            />
          </div>
          <div style={labelStyle}>Disable</div>
          <div>
            <Pagination
              total={200}
              pageSize={20}
              defaultPage={6}
              size="medium"
              forceItemState="disable"
            />
          </div>
        </div>
      </section>

      <section>
        <h4 style={{ margin: "0 0 12px", fontSize: 13, fontWeight: 600 }}>Optional areas</h4>
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div>
            <div style={labelStyle}>기본 (페이지만)</div>
            <Pagination total={85} pageSize={20} defaultPage={3} />
          </div>
          <div>
            <div style={labelStyle}>+ Total</div>
            <Pagination total={85} pageSize={20} defaultPage={3} showTotal />
          </div>
          <div>
            <div style={labelStyle}>+ Total + Per page</div>
            <Pagination total={85} pageSize={20} defaultPage={3} showTotal showPerPage />
          </div>
          <div>
            <div style={labelStyle}>+ Total + Per page + Go to</div>
            <Pagination
              total={85}
              pageSize={20}
              defaultPage={3}
              showTotal
              showPerPage
              showGoTo
            />
          </div>
        </div>
      </section>

      <section>
        <h4 style={{ margin: "0 0 12px", fontSize: 13, fontWeight: 600 }}>Interactive · controlled</h4>
        <ControlledBlock />
      </section>

      <section>
        <h4 style={{ margin: "0 0 12px", fontSize: 13, fontWeight: 600 }}>Light vs Dark</h4>
        <div
          style={{ display: "flex", gap: 24, alignItems: "flex-start", flexWrap: "wrap" }}
        >
          <ThemePanel theme="light" />
          <ThemePanel theme="dark" />
        </div>
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
  render: () => (
    <StoryDocsPage title="Pagination" description="페이지네이션 컴포넌트 사용 가이드입니다.">
      <StoryDocsSection title="개요">
        <StoryDocsParagraph>
          총 건수·페이지 크기·바로가기 영역은 옵션으로 켜고 끌 수 있습니다. 스토리 정렬은 Default →
          Matrix → Guideline 순이며, 상호작용 예시는 Matrix 하단에 있습니다.
        </StoryDocsParagraph>
      </StoryDocsSection>
    </StoryDocsPage>
  ),
};
