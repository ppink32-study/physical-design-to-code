"use client";

import { GridHeader } from "@/components/table/gridheader";
import { BodyCell } from "@/components/table/bodycell";
import { Checkbox } from "@/components/checkbox/checkbox";
import { DemoSection, demoStyles as s } from "../demo-block";

const rows = [
  { id: 1, name: "Alice Kim", role: "Designer", status: "Active" },
  { id: 2, name: "Brian Lee", role: "Engineer", status: "Pending" },
  { id: 3, name: "Chloe Park", role: "PM", status: "Inactive" },
];

export function TableDemo() {
  return (
    <>
      <DemoSection
        title="Basic table"
        description="GridHeader + BodyCell을 조합해 데이터를 나열합니다. checkbox · no · default 헤더 타입 시연."
      >
        <div style={{ width: "100%", overflowX: "auto" }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "56px 64px 1fr 1fr 1fr",
              border: "1px solid var(--bg-sub-2)",
              borderRadius: 10,
              overflow: "hidden",
              minWidth: 620,
            }}
          >
            <GridHeader type="checkbox" checkboxSlot={<Checkbox />} />
            <GridHeader type="no">No.</GridHeader>
            <GridHeader headerFunction sortDirection="asc">
              Name
            </GridHeader>
            <GridHeader>Role</GridHeader>
            <GridHeader>Status</GridHeader>

            {rows.map((r, idx) => (
              <div
                key={r.id}
                style={{ display: "contents" }}
              >
                <BodyCell type="checkbox" lastRow={idx === rows.length - 1} />
                <BodyCell type="text-center" lastRow={idx === rows.length - 1}>
                  {idx + 1}
                </BodyCell>
                <BodyCell type="text-left" lastRow={idx === rows.length - 1}>
                  {r.name}
                </BodyCell>
                <BodyCell type="text-left" lastRow={idx === rows.length - 1}>
                  {r.role}
                </BodyCell>
                <BodyCell type="text-left" lastCol lastRow={idx === rows.length - 1}>
                  {r.status}
                </BodyCell>
              </div>
            ))}
          </div>
        </div>
      </DemoSection>

      <DemoSection
        title="Cell types"
        description="20+ BodyCell type 중 대표 예시"
        more={
          <div className={s.grid3}>
            <BodyCell type="link" href="#">Link</BodyCell>
            <BodyCell type="badge">Badge</BodyCell>
            <BodyCell type="state" stateTone="green">Active</BodyCell>
            <BodyCell type="file">document.pdf</BodyCell>
            <BodyCell type="multi-sub-text" subText="sub">Main</BodyCell>
            <BodyCell type="tree" depth={1} treeExpanded>
              Child
            </BodyCell>
          </div>
        }
      >
        <div className={s.grid3}>
          <BodyCell type="text-left">Plain text</BodyCell>
          <BodyCell type="checkbox" />
          <BodyCell type="like" liked />
        </div>
      </DemoSection>

      <DemoSection title="GridHeader variants" description="single(32) vs double(64) sizes">
        <div className={s.col}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr 1fr",
              border: "1px solid var(--bg-sub-2)",
              borderRadius: 8,
              overflow: "hidden",
            }}
          >
            <GridHeader size="single">Single</GridHeader>
            <GridHeader size="single" headerFunction sortDirection="desc">
              Sortable
            </GridHeader>
            <GridHeader size="single" infoIcon>
              With info
            </GridHeader>
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr 1fr",
              border: "1px solid var(--bg-sub-2)",
              borderRadius: 8,
              overflow: "hidden",
            }}
          >
            <GridHeader size="double">Double</GridHeader>
            <GridHeader size="double" type="expand-all" />
            <GridHeader size="double" type="collapse-all" />
          </div>
        </div>
      </DemoSection>
    </>
  );
}

export default TableDemo;
