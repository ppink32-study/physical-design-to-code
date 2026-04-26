import type { ReactNode } from "react";
import Sidebar from "../_ds/sidebar";
import styles from "./design.module.css";

export default function DesignLayout({ children }: { children: ReactNode }) {
  return (
    <div className={styles.shell}>
      <Sidebar />
      <div className={styles.main}>{children}</div>
    </div>
  );
}
