"use client";

/**
 * Figma — Table example (node 18234:25392)
 * GridHeader · BodyCell · Checkbox · Input · Button · Badge · Pagination 조합.
 */

import { useCallback, useMemo, useState } from "react";
import type { CSSProperties } from "react";

import { Badge } from "@/components/badge/badge";
import { Button } from "@/components/button/button/button";
import { Checkbox } from "@/components/checkbox/checkbox";
import { Divider } from "@/components/divider/divider";
import { Input } from "@/components/Input/input";
import { Pagination } from "@/components/pagination/pagination";
import { BodyCell } from "@/components/table/bodycell";
import { GridHeader } from "@/components/table/gridheader";

type RowStatus = "active" | "pending" | "paused";

type DataRow = {
  id: string;
  name: string;
  description: string;
  category: string;
  date: string;
  status: RowStatus;
};

const DATA: DataRow[] = [
  {
    id: "r1",
    name: "Dataset · Training A",
    description: "GPU 클러스터 학습용 샘플 묶음",
    category: "ML",
    date: "2025-04-12",
    status: "active",
  },
  {
    id: "r2",
    name: "Policy document v3",
    description: "내부 검토 중인 정책 초안",
    category: "Docs",
    date: "2025-04-11",
    status: "pending",
  },
  {
    id: "r3",
    name: "Edge device logs",
    description: "지난 7일 수집 로그 아카이브",
    category: "Ops",
    date: "2025-04-10",
    status: "active",
  },
  {
    id: "r4",
    name: "Simulation batch #12",
    description: "물리 엔진 파라미터 스윕 결과",
    category: "Sim",
    date: "2025-04-09",
    status: "paused",
  },
  {
    id: "r5",
    name: "Annotation queue",
    description: "2차 라벨링 대기 건",
    category: "ML",
    date: "2025-04-08",
    status: "pending",
  },
  {
    id: "r6",
    name: "Release checklist",
    description: "RC 빌드 검증 항목",
    category: "Docs",
    date: "2025-04-07",
    status: "active",
  },
  {
    id: "r7",
    name: "Sensor calibration",
    description: "라이다·카메라 extrinsic",
    category: "Ops",
    date: "2025-04-06",
    status: "active",
  },
  {
    id: "r8",
    name: "Benchmark suite",
    description: "베이스라인 점수 비교 세트",
    category: "Sim",
    date: "2025-04-05",
    status: "paused",
  },
  {
    id: "r9",
    name: "User study notes",
    description: "가이드라인 리서치 메모",
    category: "Docs",
    date: "2025-04-04",
    status: "pending",
  },
  {
    id: "r10",
    name: "Model registry export",
    description: "ONNX 패키지 스냅샷",
    category: "ML",
    date: "2025-04-03",
    status: "active",
  },
  {
    id: "r11",
    name: "Fleet health weekly",
    description: "디바이스 가동률 요약",
    category: "Ops",
    date: "2025-04-02",
    status: "active",
  },
  {
    id: "r12",
    name: "Safety review pack",
    description: "시나리오별 리스크 표",
    category: "Docs",
    date: "2025-04-01",
    status: "pending",
  },
];

function StatusBadge({ status }: { status: RowStatus }) {
  if (status === "active") {
    return (
      <Badge variant="status" color="green" shape="round" size="sm">
        Active
      </Badge>
    );
  }
  if (status === "pending") {
    return (
      <Badge variant="status" color="yellow" shape="round" size="sm">
        Pending
      </Badge>
    );
  }
  return (
    <Badge variant="status" color="gray" shape="round" size="sm">
      Paused
    </Badge>
  );
}

const gridCols =
  "48px 40px 52px minmax(128px,1.1fr) minmax(168px,1.35fr) minmax(96px,0.75fr) 108px minmax(116px,0.95fr) 112px 44px";

const shell: CSSProperties = {
  width: "100%",
  maxWidth: 1180,
  margin: "0 auto",
};

const tableWrap: CSSProperties = {
  width: "100%",
  overflowX: "auto",
};

const grid: CSSProperties = {
  display: "grid",
  gridTemplateColumns: gridCols,
  border:
    "1px solid var(--border-surface-secondary, #ececee)",
  borderRadius: 10,
  overflow: "hidden",
  minWidth: 1020,
  background: "var(--bg-surface-base)",
};

const toolbar: CSSProperties = {
  display: "flex",
  flexWrap: "wrap",
  alignItems: "center",
  gap: 12,
  marginBottom: 20,
};

const footer: CSSProperties = {
  marginTop: 20,
  display: "flex",
  justifyContent: "flex-end",
};

function BtnIcon({ src, size = 16 }: { src: string; size?: number }) {
  const style: CSSProperties = {
    display: "inline-block",
    width: size,
    height: size,
    background: "currentColor",
    WebkitMaskImage: `url(${src})`,
    maskImage: `url(${src})`,
    WebkitMaskRepeat: "no-repeat",
    maskRepeat: "no-repeat",
    WebkitMaskPosition: "center",
    maskPosition: "center",
    WebkitMaskSize: "contain",
    maskSize: "contain",
  };
  return <span aria-hidden="true" style={style} />;
}

export function TableFigmaExample() {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [selected, setSelected] = useState<Set<string>>(new Set());

  const total = DATA.length;
  const pageRows = useMemo(() => {
    const start = (page - 1) * pageSize;
    return DATA.slice(start, start + pageSize);
  }, [page, pageSize]);

  const allOnPage =
    pageRows.length > 0 && pageRows.every((r) => selected.has(r.id));
  const someOnPage = pageRows.some((r) => selected.has(r.id));
  const headerIndeterminate = someOnPage && !allOnPage;

  const toggleRow = useCallback((id: string, checked: boolean) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (checked) next.add(id);
      else next.delete(id);
      return next;
    });
  }, []);

  const togglePage = useCallback(
    (checked: boolean) => {
      setSelected((prev) => {
        const next = new Set(prev);
        pageRows.forEach((r) => {
          if (checked) next.add(r.id);
          else next.delete(r.id);
        });
        return next;
      });
    },
    [pageRows],
  );

  return (
    <div style={shell}>
      <div style={toolbar}>
        <div style={{ flex: "1 1 200px", minWidth: 200, maxWidth: 320 }}>
          <Input type="search" placeholder="검색" size="medium" />
        </div>
        <Button variant="secondary-outline" size="medium">
          필터
        </Button>
        <Button variant="primary-solid" size="medium">
          등록
        </Button>
      </div>

      <Divider orientation="horizontal" />

      <div style={{ height: 20 }} aria-hidden />

      <div style={tableWrap}>
        <div style={grid} role="table" aria-label="데이터 테이블 예시">
          <GridHeader
            type="checkbox"
            checkboxSlot={
              <Checkbox
                checked={allOnPage}
                indeterminate={headerIndeterminate}
                onChange={(checked) => togglePage(checked)}
                aria-label="현재 페이지 모두 선택"
              />
            }
          />
          <GridHeader type="blank" />
          <GridHeader type="no">No.</GridHeader>
          <GridHeader headerFunction sortDirection="asc">
            이름
          </GridHeader>
          <GridHeader>설명</GridHeader>
          <GridHeader>유형</GridHeader>
          <GridHeader align="right">업데이트</GridHeader>
          <GridHeader>상태</GridHeader>
          <GridHeader align="center">작업</GridHeader>
          <GridHeader type="blank" width={44} />

          {pageRows.map((row, idx) => {
            const last = idx === pageRows.length - 1;
            return (
              <div key={row.id} style={{ display: "contents" }}>
                <BodyCell
                  type="checkbox"
                  lastRow={last}
                  checked={selected.has(row.id)}
                  onCheckedChange={(checked) => toggleRow(row.id, checked)}
                />
                <BodyCell type="blank" lastRow={last} />
                <BodyCell type="text-center" lastRow={last}>
                  {(page - 1) * pageSize + idx + 1}
                </BodyCell>
                <BodyCell type="text-left" lastRow={last}>
                  {row.name}
                </BodyCell>
                <BodyCell type="text-left" lastRow={last}>
                  {row.description}
                </BodyCell>
                <BodyCell type="text-left" lastRow={last}>
                  {row.category}
                </BodyCell>
                <BodyCell type="text-right" lastRow={last}>
                  {row.date}
                </BodyCell>
                <BodyCell type="badge" lastRow={last}>
                  <StatusBadge status={row.status} />
                </BodyCell>
                <BodyCell type="button-icon-only" lastRow={last}>
                  <Button
                    variant="secondary-outline"
                    size="small"
                    iconOnly
                    leftIcon={<BtnIcon src="/icon/Pencil-Line.svg" />}
                    aria-label="편집"
                  />
                  <Button
                    variant="secondary-outline"
                    size="small"
                    iconOnly
                    leftIcon={<BtnIcon src="/icon/Trash.svg" />}
                    aria-label="삭제"
                  />
                </BodyCell>
                <BodyCell
                  type="icon"
                  icon="/icon/MoreHorizontal.svg"
                  lastCol
                  lastRow={last}
                />
              </div>
            );
          })}
        </div>
      </div>

      <div style={footer}>
        <Pagination
          total={total}
          page={page}
          pageSize={pageSize}
          onPageChange={setPage}
          onPageSizeChange={(n) => {
            setPageSize(n);
            setPage(1);
          }}
          showTotal
          showPerPage
          showGoTo
          onGoToPage={setPage}
          size="medium"
        />
      </div>
    </div>
  );
}
