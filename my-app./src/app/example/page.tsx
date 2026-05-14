import Link from "next/link";
import type { Metadata } from "next";

import { Badge } from "@/components/badge/badge";
import { PageTitle } from "@/components/title/pagetitle";
import { FigmaLinkButton } from "../_ds/figma-link";
import styles from "../design/design.module.css";
import { TableFigmaExample } from "./table-figma-example";

export const metadata: Metadata = {
  title: "Table example · Design Guidelines",
  description:
    "Figma 테이블 예시(node 18234:25392)를 GridHeader·BodyCell·Pagination 등으로 구현한 참고 페이지입니다.",
};

const figmaRef = {
  primary: { nodeId: "18234-25392", label: "Table example" },
} as const;

export default function ExamplePage() {
  return (
    <main className={styles.main}>
      <header className={styles.pageHead}>
        <div className={styles.breadcrumb}>
          <Link href="/">Overview</Link>
          <span className={styles.breadcrumbSep}>›</span>
          <span className={styles.breadcrumbCurrent}>Table example</span>
        </div>

        <div className={styles.pageTitleRow}>
          <PageTitle
            type="2d"
            title="Table example"
            hint="Physical AI Platform — Data grid 레이아웃 참고용"
            badges={
              <Badge variant="line" size="sm" shape="round" color="gray">
                Example
              </Badge>
            }
            actions={<FigmaLinkButton figma={figmaRef} />}
          />
        </div>

        <p className={styles.pageDesc}>
          Figma{" "}
          <a
            href="https://www.figma.com/design/myQPboBEUAPxUwlvH9MH2R/Physical-AI-Platfrom-Design-Guideline?node-id=18234-25392&m=dev"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "var(--on-primary-hover)" }}
          >
            Table example (18234:25392)
          </a>
          와 동일한 구조로, 프로젝트의 GridHeader·BodyCell·Checkbox·Input·Button·Badge·Pagination 을
          조합해 구현했습니다.
        </p>
      </header>

      <TableFigmaExample />
    </main>
  );
}
