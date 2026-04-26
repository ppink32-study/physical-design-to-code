"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./sidebar.module.css";
import { BY_CATEGORY, CATEGORY_ORDER } from "./manifest";

export function Sidebar() {
  const pathname = usePathname() ?? "";

  return (
    <aside className={styles.sidebar} aria-label="Components navigation">
      {CATEGORY_ORDER.map((cat) => {
        const items = BY_CATEGORY[cat];
        if (!items || items.length === 0) return null;
        return (
          <div className={styles.group} key={cat}>
            <span className={styles.groupTitle}>{cat}</span>
            <ul className={styles.list}>
              {items.map((c) => {
                const href = `/design/${c.slug}`;
                const active = pathname === href;
                return (
                  <li key={c.slug}>
                    <Link
                      href={href}
                      className={`${styles.link} ${
                        active ? styles.linkActive : ""
                      }`}
                    >
                      <span className={styles.dot} aria-hidden />
                      {c.name}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        );
      })}
    </aside>
  );
}

export default Sidebar;
