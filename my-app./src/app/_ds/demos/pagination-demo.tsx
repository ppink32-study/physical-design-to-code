"use client";

import { useState } from "react";
import { Pagination } from "@/components/pagination/pagination";
import { DemoSection, demoStyles as s } from "../demo-block";

export function PaginationDemo() {
  const [page, setPage] = useState(3);
  const [pageSize, setPageSize] = useState(20);

  return (
    <>
      <DemoSection title="Basic" description="total · pageSize에 따라 페이지 수 자동 계산">
        <Pagination
          total={240}
          pageSize={20}
          defaultPage={1}
        />
      </DemoSection>

      <DemoSection title="Controlled · Full options" description="showTotal · showPerPage · showGoTo">
        <div className={s.col}>
          <Pagination
            page={page}
            onPageChange={setPage}
            total={500}
            pageSize={pageSize}
            onPageSizeChange={setPageSize}
            showTotal
            showPerPage
            showGoTo
          />
          <div style={{ fontSize: 12, opacity: 0.7 }}>
            Page {page} · per page {pageSize}
          </div>
        </div>
      </DemoSection>

      <DemoSection title="Sizes" description="medium(default) · large">
        <div className={s.col}>
          <Pagination total={100} pageSize={10} defaultPage={1} size="medium" />
          <Pagination total={100} pageSize={10} defaultPage={1} size="large" />
        </div>
      </DemoSection>
    </>
  );
}

export default PaginationDemo;
