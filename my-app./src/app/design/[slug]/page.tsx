import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Badge } from "@/components/badge/badge";
import { PageTitle } from "@/components/title/pagetitle";
import { BY_SLUG, COMPONENTS } from "../../_ds/manifest";
import { DEMO_REGISTRY } from "../../_ds/demos/registry";
import { FigmaLinkButton } from "../../_ds/figma-link";
import styles from "../design.module.css";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return COMPONENTS.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const entry = BY_SLUG[slug];
  if (!entry) return { title: "Not found" };
  return {
    title: `${entry.name} · Design Guidelines`,
    description: entry.description,
  };
}

export default async function ComponentDetailPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const entry = BY_SLUG[slug];
  const Demo = DEMO_REGISTRY[slug];
  if (!entry || !Demo) notFound();

  const idx = COMPONENTS.findIndex((c) => c.slug === slug);
  const prev = idx > 0 ? COMPONENTS[idx - 1] : null;
  const next = idx < COMPONENTS.length - 1 ? COMPONENTS[idx + 1] : null;

  return (
    <>
      <header className={styles.pageHead}>
        <div className={styles.breadcrumb}>
          <Link href="/">Overview</Link>
          <span className={styles.breadcrumbSep}>›</span>
          <Link href="/#categories">{entry.category}</Link>
          <span className={styles.breadcrumbSep}>›</span>
          <span className={styles.breadcrumbCurrent}>{entry.name}</span>
        </div>

        <div className={styles.pageTitleRow}>
          <PageTitle
            type="2d"
            title={entry.name}
            badges={
              <Badge variant="line" size="sm" shape="round" color="gray">
                {entry.category}
              </Badge>
            }
          />
          {entry.figma ? (
            <div className={styles.pageTitleActions}>
              <FigmaLinkButton figma={entry.figma} />
            </div>
          ) : null}
        </div>

        <p className={styles.pageDesc}>{entry.description}</p>

        {entry.tags && entry.tags.length > 0 ? (
          <div className={styles.tagRow}>
            {entry.tags.map((t) => (
              <Badge
                key={t}
                variant="line"
                size="sm"
                shape="round"
                color="gray"
              >
                {t}
              </Badge>
            ))}
          </div>
        ) : null}
      </header>

      <Demo />

      <nav className={styles.footerNav} aria-label="Pagination">
        {prev ? (
          <Link
            href={`/design/${prev.slug}`}
            className={`${styles.footerLink} ${styles.footerLinkPrev}`}
          >
            <span className={styles.footerLabel}>← Previous</span>
            <span className={styles.footerName}>{prev.name}</span>
          </Link>
        ) : (
          <span className={styles.footerLink} style={{ visibility: "hidden" }} />
        )}
        {next ? (
          <Link
            href={`/design/${next.slug}`}
            className={`${styles.footerLink} ${styles.footerLinkNext}`}
          >
            <span className={styles.footerLabel}>Next →</span>
            <span className={styles.footerName}>{next.name}</span>
          </Link>
        ) : (
          <span className={styles.footerLink} style={{ visibility: "hidden" }} />
        )}
      </nav>
    </>
  );
}
