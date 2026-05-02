/**
 * Table — 통합 스토리 (Phase 6)
 * ----------------------------------------------------------------
 * `GridHeader` + `BodyCell` 을 실제 테이블 레이아웃으로 조립한 예시들.
 *
 *   - SimpleDataTable     : 간단한 데이터 표시 (Name / Status / Date / Actions)
 *   - InteractiveTable    : checkbox 열 + 정렬 가능한 header + button 액션
 *   - RichDataTable       : tree / multi-text / file / select 혼합 (풍부한 데이터)
 *   - LightDarkCompare    : Light / Dark 테마 비교
 *
 * 레이아웃 규칙
 *   - 테이블 전체는 `display: inline-flex; flex-direction: column` 의 단순 구조
 *   - 각 row 는 `display: flex` (GridHeader 또는 BodyCell 나열)
 *   - 마지막 컬럼은 lastCol / 마지막 row 는 lastRow 로 외곽 border 제거
 */

import { Fragment, useState } from "react";
import type { CSSProperties, ReactNode } from "react";
import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { StoryPlaygroundFrame } from "@/stories/story-docs-shell";
import { Badge } from "../badge/badge";
import { Button } from "../button/button/button";
import { Checkbox } from "../checkbox/checkbox";
import { BodyCell } from "./bodycell";
import { GridHeader } from "./gridheader";

const meta: Meta = {
  title: "Components/Table/Table (통합)",
  parameters: { layout: "fullscreen" },
};
export default meta;
type Story = StoryObj;

export const Playground: Story = {
  decorators: [
    (Story) => (
      <StoryPlaygroundFrame>
        <Story />
      </StoryPlaygroundFrame>
    ),
  ],
  render: () => (
    <p
      style={{
        margin: 0,
        padding: 24,
        fontSize: 14,
        color: "var(--context-foreground-surface-on-surface-secondary)",
      }}
    >
      GridHeader + BodyCell 조합 예시입니다. 사이드바에서 Simple Data Table 등을
      선택하세요.
    </p>
  ),
};

/* ------------------------------------------------------------------ */
/* 공통 helpers                                                        */
/* ------------------------------------------------------------------ */
const SearchIcon = () => (
  <span
    aria-hidden="true"
    style={{
      display: "inline-block",
      width: 16,
      height: 16,
      background: "currentColor",
      WebkitMaskImage: "url(/icon/Search.svg)",
      maskImage: "url(/icon/Search.svg)",
      WebkitMaskRepeat: "no-repeat",
      maskRepeat: "no-repeat",
      WebkitMaskSize: "contain",
      maskSize: "contain",
      WebkitMaskPosition: "center",
      maskPosition: "center",
      flexShrink: 0,
    }}
  />
);

const tableStyle: CSSProperties = {
  display: "inline-flex",
  flexDirection: "column",
  border: "var(--border-width-xs, 1px) solid var(--border-border-surface-border-surface-secondary, #ececee)",
  borderRadius: 4,
  background: "var(--context-background-surface-bg-surface-base, #fff)",
  fontFamily: "var(--font-family-korean)",
};
const rowStyle: CSSProperties = { display: "flex" };
const sectionStyle: CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: 8,
};
const sectionTitleStyle: CSSProperties = {
  fontSize: 12,
  color: "var(--context-foreground-surface-on-surface-hint, #787a88)",
};

/* ================================================================== */
/* 1) Simple Data Table                                               */
/* ================================================================== */
const SIMPLE_ROWS = [
  { name: "김영훈", tone: "green" as const, status: "활성", date: "2025-01-01" },
  { name: "박서준", tone: "yellow" as const, status: "대기", date: "2025-01-03" },
  { name: "이수민", tone: "red" as const, status: "오류", date: "2025-01-05" },
  { name: "최민호", tone: "green" as const, status: "활성", date: "2025-01-07" },
  { name: "정하늘", tone: "gray" as const, status: "종료", date: "2025-01-09" },
];

export const SimpleDataTable: Story = {
  render: () => (
    <div style={{ padding: 24 }}>
      <div style={sectionStyle}>
        <span style={sectionTitleStyle}>Simple Data Table</span>
        <div style={tableStyle} role="table">
          <div style={rowStyle} role="rowgroup">
            <GridHeader type="no" width={56}>No.</GridHeader>
            <GridHeader type="default" width={160} align="left" infoIcon>Name</GridHeader>
            <GridHeader type="default" width={120} headerFunction sortDirection="asc">Status</GridHeader>
            <GridHeader type="default" width={140} headerFunction sortDirection="none">Date</GridHeader>
            <GridHeader type="default" width={160}>Actions</GridHeader>
          </div>

          {SIMPLE_ROWS.map((r, idx) => {
            const isLast = idx === SIMPLE_ROWS.length - 1;
            return (
              <div key={r.name} style={rowStyle} role="row">
                <BodyCell type="text-center" width={56} lastRow={isLast}>
                  {String(idx + 1)}
                </BodyCell>
                <BodyCell type="text-left" width={160} lastRow={isLast}>
                  {r.name}
                </BodyCell>
                <BodyCell type="state" width={120} stateTone={r.tone} lastRow={isLast}>
                  {r.status}
                </BodyCell>
                <BodyCell type="text-left" width={140} lastRow={isLast}>
                  {r.date}
                </BodyCell>
                <BodyCell type="button" width={160} lastCol lastRow={isLast}>
                  <Button variant="secondary-outline" size="small">보기</Button>
                  <Button variant="secondary-outline" size="small">삭제</Button>
                </BodyCell>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  ),
};

/* ================================================================== */
/* 2) Interactive Table (checkbox + sortable + actions)               */
/* ================================================================== */
const INTERACTIVE_ROWS = [
  { id: "1", name: "Doc_2025_01.pdf", owner: "김영훈", size: "1.2MB", date: "2025-01-01" },
  { id: "2", name: "Report.pdf",      owner: "박서준", size: "3.4MB", date: "2025-01-03" },
  { id: "3", name: "Spec_v2.pdf",     owner: "이수민", size: "812KB", date: "2025-01-05" },
  { id: "4", name: "Notes.pdf",       owner: "최민호", size: "228KB", date: "2025-01-07" },
];

export const InteractiveTable: Story = {
  render: () => {
    function Demo() {
      const [checked, setChecked] = useState<Record<string, boolean>>({});
      const [focusedRow, setFocusedRow] = useState<string | null>(null);
      const allChecked =
        INTERACTIVE_ROWS.length > 0 &&
        INTERACTIVE_ROWS.every((r) => checked[r.id]);
      const someChecked = INTERACTIVE_ROWS.some((r) => checked[r.id]);

      const toggleAll = (next: boolean) => {
        const mapped: Record<string, boolean> = {};
        INTERACTIVE_ROWS.forEach((r) => { mapped[r.id] = next; });
        setChecked(mapped);
      };

      return (
        <div style={{ padding: 24 }}>
          <div style={sectionStyle}>
            <span style={sectionTitleStyle}>Interactive Table — checkbox + focus + button</span>
            <div style={tableStyle} role="table">
              <div style={rowStyle} role="rowgroup">
                <GridHeader
                  type="checkbox"
                  width={40}
                  checkboxSlot={
                    <Checkbox
                      checked={allChecked}
                      indeterminate={!allChecked && someChecked}
                      onChange={(e) => toggleAll(e.target.checked)}
                      aria-label="전체 선택"
                    />
                  }
                />
                <GridHeader type="default" width={200} headerFunction sortDirection="asc" align="left">
                  File
                </GridHeader>
                <GridHeader type="default" width={120} align="left">Owner</GridHeader>
                <GridHeader type="default" width={100}>Size</GridHeader>
                <GridHeader type="default" width={140} headerFunction sortDirection="none">Date</GridHeader>
                <GridHeader type="default" width={140}>Actions</GridHeader>
              </div>

              {INTERACTIVE_ROWS.map((r, idx) => {
                const isLast = idx === INTERACTIVE_ROWS.length - 1;
                const isChecked = !!checked[r.id];
                const state = isChecked ? "selected" : "enabled";
                return (
                  <div key={r.id} style={rowStyle} role="row">
                    <BodyCell
                      type="checkbox"
                      state={state}
                      width={40}
                      lastRow={isLast}
                      checked={isChecked}
                      onCheckedChange={(next) =>
                        setChecked((prev) => ({ ...prev, [r.id]: next }))
                      }
                    />
                    <BodyCell
                      type="file"
                      state={state}
                      focus={focusedRow === r.id}
                      width={200}
                      lastRow={isLast}
                      onClick={() => setFocusedRow(r.id)}
                    >
                      {r.name}
                    </BodyCell>
                    <BodyCell type="text-left" state={state} width={120} lastRow={isLast}>
                      {r.owner}
                    </BodyCell>
                    <BodyCell type="text-right" state={state} width={100} lastRow={isLast}>
                      {r.size}
                    </BodyCell>
                    <BodyCell type="text-left" state={state} width={140} lastRow={isLast}>
                      {r.date}
                    </BodyCell>
                    <BodyCell
                      type="button-icon-only"
                      state={state}
                      width={140}
                      lastCol
                      lastRow={isLast}
                    >
                      <Button
                        variant="secondary-outline"
                        size="small"
                        iconOnly
                        leftIcon={<SearchIcon />}
                        aria-label="search"
                      />
                      <Button
                        variant="secondary-outline"
                        size="small"
                        iconOnly
                        leftIcon={<SearchIcon />}
                        aria-label="search"
                      />
                    </BodyCell>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      );
    }
    return <Demo />;
  },
};

/* ================================================================== */
/* 3) Rich Data Table (tree + multi-sub + badge + select)             */
/* ================================================================== */
type RichRow = {
  id: string;
  depth: number;
  expanded?: boolean;
  name: string;
  count: number;
  type: string;
  lastUsed: string;
  note: string;
};
const RICH_ROWS: RichRow[] = [
  { id: "a",   depth: 0, expanded: true,  name: "Project A",  count: 99, type: "Folder", lastUsed: "2025-01-01", note: "메모 샘플" },
  { id: "a1",  depth: 1, expanded: true,  name: "datasets",   count: 12, type: "Folder", lastUsed: "2025-01-02", note: "데이터 셋"  },
  { id: "a11", depth: 2,                  name: "train.csv",  count: 1,  type: "CSV",    lastUsed: "2025-01-03", note: "훈련 데이터" },
  { id: "a12", depth: 2,                  name: "test.csv",   count: 1,  type: "CSV",    lastUsed: "2025-01-03", note: "평가 데이터" },
  { id: "b",   depth: 0,                  name: "Project B",  count: 3,  type: "Folder", lastUsed: "2025-01-05", note: "-"          },
];

export const RichDataTable: Story = {
  render: () => (
    <div style={{ padding: 24 }}>
      <div style={sectionStyle}>
        <span style={sectionTitleStyle}>Rich Data Table — tree + multi-sub + badge + select</span>
        <div style={tableStyle} role="table">
          <div style={rowStyle} role="rowgroup">
            <GridHeader type="expand-all" width={40} />
            <GridHeader type="default" width={253} align="left">Name</GridHeader>
            <GridHeader type="default" width={100}>Count</GridHeader>
            <GridHeader type="default" width={185} align="left">Type</GridHeader>
            <GridHeader type="default" width={223} align="left">Detail</GridHeader>
            <GridHeader type="default" width={61}>On</GridHeader>
          </div>

          {RICH_ROWS.map((r, idx) => {
            const isLast = idx === RICH_ROWS.length - 1;
            return (
              <div key={r.id} style={rowStyle} role="row">
                <BodyCell type="blank" width={40} lastRow={isLast} />
                <BodyCell type="tree" width={253} depth={r.depth} treeExpanded={r.expanded} lastRow={isLast}>
                  {r.name}
                </BodyCell>
                <BodyCell type="badge" width={100} lastRow={isLast}>
                  <Badge variant="status" color="purple" shape="round" size="sm">
                    {String(r.count)}
                  </Badge>
                </BodyCell>
                <BodyCell type="select" width={185} lastRow={isLast}>{r.type}</BodyCell>
                <BodyCell
                  type="multi-sub-text"
                  width={223}
                  lastRow={isLast}
                  subText={r.note}
                  badge={<Badge variant="solid" color="primary" shape="round" size="sm">New</Badge>}
                >
                  {r.name}
                </BodyCell>
                <BodyCell
                  type="switch"
                  width={61}
                  lastCol
                  lastRow={isLast}
                  defaultChecked={idx % 2 === 0}
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  ),
};

/* ================================================================== */
/* 4) Light / Dark compare                                            */
/* ================================================================== */
function MiniTable({ focusFirst = false }: { focusFirst?: boolean }) {
  return (
    <div style={tableStyle} role="table">
      <div style={rowStyle} role="rowgroup">
        <GridHeader type="no" width={56}>No.</GridHeader>
        <GridHeader type="default" width={160} align="left" headerFunction sortDirection="asc">Name</GridHeader>
        <GridHeader type="default" width={120}>Status</GridHeader>
        <GridHeader type="default" width={120}>Like</GridHeader>
      </div>
      {["김영훈", "박서준", "이수민"].map((name, idx) => (
        <div key={name} style={rowStyle} role="row">
          <BodyCell type="text-center" width={56} lastRow={idx === 2}>
            {String(idx + 1)}
          </BodyCell>
          <BodyCell
            type="text-left"
            width={160}
            focus={focusFirst && idx === 0}
            state={idx === 0 ? "selected" : "enabled"}
            lastRow={idx === 2}
          >
            {name}
          </BodyCell>
          <BodyCell
            type="state"
            width={120}
            stateTone={idx === 2 ? "red" : idx === 1 ? "yellow" : "green"}
            state={idx === 0 ? "selected" : "enabled"}
            lastRow={idx === 2}
          >
            {idx === 2 ? "오류" : idx === 1 ? "대기" : "활성"}
          </BodyCell>
          <BodyCell
            type="like"
            width={120}
            lastCol
            lastRow={idx === 2}
            liked={idx === 0}
            state={idx === 0 ? "selected" : "enabled"}
          />
        </div>
      ))}
    </div>
  );
}

function ThemeBlock({ theme, label, children }: { theme: "light" | "dark"; label: string; children: ReactNode }) {
  return (
    <div
      data-theme={theme}
      style={{
        padding: 24,
        background: "var(--context-background-surface-bg-surface-quarernary)",
        borderRadius: 8,
      }}
    >
      <div style={{ marginBottom: 12, fontSize: 12, color: theme === "light" ? "#787a88" : "#b3b4bc" }}>
        {label}
      </div>
      {children}
    </div>
  );
}

export const LightDarkCompare: Story = {
  render: () => (
    <div style={{ padding: 24, display: "flex", gap: 24, flexWrap: "wrap" }}>
      <ThemeBlock theme="light" label="Light">
        <MiniTable focusFirst />
      </ThemeBlock>
      <ThemeBlock theme="dark" label="Dark">
        <MiniTable focusFirst />
      </ThemeBlock>
    </div>
  ),
};

/* ================================================================== */
/* 5) All types overview (types 한눈에 보기)                           */
/* ================================================================== */
const ALL_TYPES_GROUPS: Array<{
  title: string;
  cells: () => ReactNode;
}> = [
  {
    title: "Phase 3 · Text / Blank",
    cells: () => (
      <Fragment>
        <BodyCell type="blank" />
        <BodyCell type="text-left">Left</BodyCell>
        <BodyCell type="text-left-icon">Left+Ic</BodyCell>
        <BodyCell type="text-center">Center</BodyCell>
        <BodyCell type="text-right" lastCol>1,234</BodyCell>
      </Fragment>
    ),
  },
  {
    title: "Phase 4 · Interaction",
    cells: () => (
      <Fragment>
        <BodyCell type="checkbox" />
        <BodyCell type="radio" />
        <BodyCell type="icon" />
        <BodyCell type="link" href="#">Link</BodyCell>
        <BodyCell type="button">
          <Button variant="secondary-outline" size="small">Btn</Button>
          <Button variant="secondary-outline" size="small">Btn</Button>
        </BodyCell>
        <BodyCell type="button-icon-only">
          <Button variant="secondary-outline" size="small" iconOnly leftIcon={<SearchIcon />} aria-label="search" />
          <Button variant="secondary-outline" size="small" iconOnly leftIcon={<SearchIcon />} aria-label="search" />
        </BodyCell>
        <BodyCell type="like" liked />
        <BodyCell type="switch" defaultChecked lastCol />
      </Fragment>
    ),
  },
  {
    title: "Phase 5 · Form / Data",
    cells: () => (
      <Fragment>
        <BodyCell type="text-field" placeholder="Placeholder" />
        <BodyCell type="search" placeholder="Placeholder" />
        <BodyCell type="select">Text</BodyCell>
        <BodyCell type="date-picker" />
        <BodyCell type="state" stateTone="blue">Active</BodyCell>
        <BodyCell type="badge">
          <Badge variant="status" color="purple" shape="round" size="sm">Badge</Badge>
          <Badge variant="status" color="purple" shape="round" size="sm">Badge</Badge>
        </BodyCell>
        <BodyCell type="file">File Name.pdf</BodyCell>
        <BodyCell type="tree">1depth Name</BodyCell>
        <BodyCell type="multi-normal" subText="Multiple line">Multiple line</BodyCell>
        <BodyCell
          type="multi-sub-text"
          subText="Sub Text"
          badge={<Badge variant="solid" color="primary" shape="round" size="sm">99</Badge>}
        >
          Multiple line Title 최대 한줄
        </BodyCell>
        <BodyCell type="video" lastCol />
      </Fragment>
    ),
  },
];

export const AllTypesShowcase: Story = {
  render: () => (
    <div style={{ padding: 24, display: "flex", flexDirection: "column", gap: 24 }}>
      {ALL_TYPES_GROUPS.map((g) => (
        <div key={g.title} style={sectionStyle}>
          <span style={sectionTitleStyle}>{g.title}</span>
          <div style={{ display: "inline-flex", border: "1px solid var(--border-border-surface-border-surface-secondary, #ececee)", borderRadius: 4, background: "var(--context-background-surface-bg-surface-base, #fff)" }}>
            {g.cells()}
          </div>
        </div>
      ))}
    </div>
  ),
};
