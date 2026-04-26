import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import type { CSSProperties, ReactNode } from "react";
import { useState } from "react";

import { Pagination, type PaginationSize } from "./pagination";
import styles from "./pagination.module.css";
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

const meta: Meta<typeof Pagination> = {
  title: "Components/Pagination",
  component: Pagination,
  parameters: {
    layout: "centered",
    docs: { disable: true },
  },
};
export default meta;
type Story = StoryObj<typeof Pagination>;

const labelStyle: CSSProperties = {
  fontSize: 12,
  color: "var(--context-foreground-surface-on-surface-hint)",
  marginBottom: 8,
};

const ICONS = {
  first: "/icon/DoubleChevronLeft.svg",
  prev: "/icon/ChevronLeft.svg",
  next: "/icon/ChevronRight.svg",
  last: "/icon/DoubleChevronRight.svg",
  ellipsis: "/icon/MoreHorizontal.svg",
} as const;

function PgIcon({ src }: { src: string }) {
  const style: CSSProperties = {
    WebkitMask: `url(${src}) center / contain no-repeat`,
    mask: `url(${src}) center / contain no-repeat`,
  };
  return <span className={styles.icon} style={style} aria-hidden="true" />;
}

/** Matrix 셀: `.root[data-size]` + `.page` 안에 단일/복수 item (Figma Item 매트릭스) */
function ItemHost({ size, children }: { size: PaginationSize; children: ReactNode }) {
  return (
    <div className={styles.root} data-size={size} style={{ display: "inline-flex" }}>
      <div className={styles.page} role="presentation">
        {children}
      </div>
    </div>
  );
}

type ItemCol = "normal" | "hover" | "selected" | "disabled";

function ItemMatrixCell({
  row,
  col,
  size,
}: {
  row: "prev" | "next" | "number" | "ellipsis";
  col: ItemCol;
  size: PaginationSize;
}) {
  const hover = col === "hover" ? "hover" : undefined;
  const dis = col === "disabled";

  if (row === "ellipsis") {
    return (
      <ItemHost size={size}>
        <span className={styles.item} data-icon="true" data-force-state={hover} aria-hidden="true">
          <PgIcon src={ICONS.ellipsis} />
        </span>
      </ItemHost>
    );
  }

  if (row === "number") {
    const selected = col === "selected";
    return (
      <ItemHost size={size}>
        <button
          type="button"
          className={styles.item}
          data-selected={selected || undefined}
          data-force-state={hover}
          disabled={dis}
          aria-current={selected ? "page" : undefined}
        >
          5
        </button>
      </ItemHost>
    );
  }

  if (row === "prev") {
    return (
      <ItemHost size={size}>
        <button
          type="button"
          className={styles.item}
          data-icon="true"
          data-force-state={hover}
          disabled={dis}
          aria-label="First page"
        >
          <PgIcon src={ICONS.first} />
        </button>
        <button
          type="button"
          className={styles.item}
          data-icon="true"
          data-force-state={hover}
          disabled={dis}
          aria-label="Previous page"
        >
          <PgIcon src={ICONS.prev} />
        </button>
      </ItemHost>
    );
  }

  /* next */
  return (
    <ItemHost size={size}>
      <button
        type="button"
        className={styles.item}
        data-icon="true"
        data-force-state={hover}
        disabled={dis}
        aria-label="Next page"
      >
        <PgIcon src={ICONS.next} />
      </button>
      <button
        type="button"
        className={styles.item}
        data-icon="true"
        data-force-state={hover}
        disabled={dis}
        aria-label="Last page"
      >
        <PgIcon src={ICONS.last} />
      </button>
    </ItemHost>
  );
}

const ITEM_COLS: ItemCol[] = ["normal", "hover", "selected", "disabled"];
const ITEM_ROWS: Array<"prev" | "next" | "number" | "ellipsis"> = [
  "prev",
  "next",
  "number",
  "ellipsis",
];

function ItemMatrixTable({ size }: { size: PaginationSize }) {
  const sizeLabel = size === "medium" ? "Medium (32px)" : "Large (40px)";
  return (
    <div style={{ marginBottom: 32 }}>
      <h4 style={{ margin: "0 0 12px", fontSize: 13, fontWeight: 600 }}>{sizeLabel}</h4>
      <div style={storyMatrixScrollWrap}>
        <table style={storyMatrixTableBase}>
          <thead>
            <tr>
              <th style={storyMatrixColHeaderStyle}>Pagination / Item</th>
              {ITEM_COLS.map((c) => (
                <th key={c} style={storyMatrixColHeaderStyle}>
                  {c === "normal"
                    ? "Normal"
                    : c === "hover"
                      ? "Hover"
                      : c === "selected"
                        ? "Selected"
                        : "Disable"}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {ITEM_ROWS.map((row) => (
              <tr key={row}>
                <th scope="row" style={storyMatrixRowHeaderStyle}>
                  {row === "prev"
                    ? "Prev"
                    : row === "next"
                      ? "Next"
                      : row === "number"
                        ? "Number"
                        : "Ellipsis"}
                </th>
                {ITEM_COLS.map((col) => (
                  <td key={col} style={storyMatrixCellStyle}>
                    <ItemMatrixCell row={row} col={col} size={size} />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
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
      description={
        <>
          상단: 전체 바 구성(Total · 페이지 네비 · Per page · Go to 레이블 + 입력 박스, 빈 값일 때
          안내 문구 Page). 하단:
          Figma <strong>Pagination / Item</strong> 매트릭스(Prev / Next / Number / Ellipsis ×
          Normal / Hover / Selected / Disable), Medium·Large 각각.
        </>
      }
      figmaNode="13286-33784"
    >
      <FigmaLinkCard
        nodeId="13286-33784"
        caption="Components / Pagination — Com (Medium·Large) 원본"
      />

      <section>
        <h4 style={{ margin: "0 0 12px", fontSize: 13, fontWeight: 600 }}>Pagination</h4>
        <p style={{ ...labelStyle, marginTop: 0 }}>
          Total · First/Prev/Numbers/Ellipsis/Next/Last · Per page · Go to (박스 안 입력, Enter)
        </p>
        <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
          <div>
            <h4 style={labelStyle}>Medium (32px)</h4>
            <Pagination
              total={400}
              pageSize={20}
              defaultPage={6}
              size="medium"
              showTotal
              showPerPage
              showGoTo
              siblingCount={1}
              boundaryCount={1}
            />
          </div>
          <div>
            <h4 style={labelStyle}>Large (40px)</h4>
            <Pagination
              total={400}
              pageSize={20}
              defaultPage={6}
              size="large"
              showTotal
              showPerPage
              showGoTo
              siblingCount={1}
              boundaryCount={1}
            />
          </div>
        </div>
      </section>

      <section style={{ marginTop: 40 }}>
        <h4 style={{ margin: "0 0 12px", fontSize: 13, fontWeight: 600 }}>Pagination / Item</h4>
        <ItemMatrixTable size="medium" />
        <ItemMatrixTable size="large" />
      </section>

      <section style={{ marginTop: 40 }}>
        <h4 style={{ margin: "0 0 12px", fontSize: 13, fontWeight: 600 }}>Interactive · controlled</h4>
        <ControlledBlock />
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
          총 건수·페이지 크기·Go to(레이블 밖 + 입력 박스·placeholder Page, Enter) 영역은 옵션으로 켜고
          끌 수
          있습니다. Matrix에서 전체 바·아이템 상태·controlled 예시를 확인하세요.
        </StoryDocsParagraph>
      </StoryDocsSection>
    </StoryDocsPage>
  ),
};
