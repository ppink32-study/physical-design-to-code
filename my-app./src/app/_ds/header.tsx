"use client";

import Link from "next/link";

import {
  Gnb,
  GnbIconButton,
  GnbItem,
} from "@/app/_ds/gnb";

import styles from "./header.module.css";
import { useTheme } from "./theme-provider";

export function Header() {
  const { theme, toggle } = useTheme();

  return (
    <Gnb
      brand={
        <Link href="/" className={styles.brand} aria-label="Design System — Home">
          <img
            src={theme === "dark" ? "/Logo_dark.svg" : "/Logo_light.svg"}
            alt="Design System"
            className={styles.logoImg}
            width={184}
            height={32}
          />
        </Link>
      }
      items={
        <>
          <GnbItem href="/" matchPath={(p) => p === "/"}>
            Overview
          </GnbItem>
          <GnbItem
            href="/design/button"
            matchPath={(p) => p.startsWith("/design")}
          >
            Components
          </GnbItem>
          <GnbItem href="/example" matchPath={(p) => p.startsWith("/example")}>
            Example
          </GnbItem>
        </>
      }
      actions={
        <GnbIconButton
          aria-label={`Switch to ${theme === "light" ? "dark" : "light"} theme`}
          title={`Current theme: ${theme}. Click to switch.`}
          iconUrl={theme === "light" ? "/icon/Sun.svg" : "/icon/Moon.svg"}
          onClick={toggle}
        />
      }
    />
  );
}

export default Header;
