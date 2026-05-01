import type { CSSProperties } from "react";
import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import Link from "next/link";

import { figmaNodeUrl } from "@/stories/story-figma-urls";
import { FigmaLinkCard } from "@/stories/figma-link-card";
import {
  storyMatrixCellStyle,
  storyMatrixColHeaderStyle,
  storyMatrixRowHeaderStyle,
  storyMatrixTableBase,
} from "@/stories/story-matrix-table-styles";
import { Gnb, GnbIconButton, GnbItem } from "./gnb";

const meta: Meta<typeof Gnb> = {
  title: "Components/Gnb",
  component: Gnb,
  parameters: {
    layout: "fullscreen",
    nextjs: {
      appDirectory: true,
    },
    figma: figmaNodeUrl("17945:4068"),
    docs: {
      description: {
        component:
          "상단 글로벌 내비게이션(GNB). Figma Dark/Light 및 GNB·GNB/Select·GNB/Icon 매트릭스와 동일한 구성은 **Matrix** 스토리에서만 확인합니다.",
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Gnb>;

/* -----------------------------------------------------------------
 *  Frame1920 — Figma 기준 1920px 고정폭 프레임
 * ----------------------------------------------------------------- */
function Frame1920({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ overflowX: "auto", width: "100%" }}>
      <div style={{ width: 1920, minWidth: 1920 }}>{children}</div>
    </div>
  );
}

function BrandLogo({ theme }: { theme?: "light" | "dark" } = {}) {
  const src = theme === "dark" ? "/Logo_dark.svg" : "/Logo_light.svg";
  return (
    <Link
      href="/"
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 8,
        textDecoration: "none",
        color: "var(--context-foreground-surface-on-surface-base)",
        flexShrink: 0,
      }}
      aria-label="Brand"
    >
      <img
        src={src}
        alt="Brand"
        width={184}
        height={32}
        style={{ display: "block", objectFit: "contain" }}
      />
    </Link>
  );
}

function GnbExample({ theme }: { theme: "light" | "dark" }) {
  return (
    <Frame1920>
      <div data-theme={theme} style={{ width: "100%" }}>
        <Gnb
          brand={<BrandLogo theme={theme} />}
          items={
            <>
              <GnbItem href="/" selected>
                Home
              </GnbItem>
              <GnbItem href="/menu-1">Menu 1</GnbItem>
              <GnbItem href="/menu-2">Menu 1</GnbItem>
              <GnbItem href="/menu-3">Menu 1</GnbItem>
            </>
          }
          actions={
            <>
              <GnbIconButton aria-label="Notice" iconUrl="/icon/Notice.svg" />
              <GnbIconButton
                aria-label="Notifications"
                iconUrl="/icon/Noti.svg"
                alarm
              />
              <GnbIconButton aria-label="Settings" iconUrl="/icon/Gear.svg" />
            </>
          }
        />
      </div>
    </Frame1920>
  );
}

function MatrixTable({
  columns,
  rows,
  cell,
}: {
  columns: string[];
  rows: { label: string; theme: "light" | "dark" }[];
  cell: (col: string, theme: "light" | "dark") => React.ReactNode;
}) {
  return (
    <table style={{ ...storyMatrixTableBase, fontSize: 12 }}>
      <thead>
        <tr>
          <th style={{ ...storyMatrixColHeaderStyle, width: 56 }} />
          {columns.map((c) => (
            <th key={c} style={storyMatrixColHeaderStyle}>
              {c}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((row) => (
          <tr key={row.label}>
            <td style={storyMatrixRowHeaderStyle}>{row.label}</td>
            {columns.map((col) => (
              <td
                key={col}
                style={{
                  ...storyMatrixCellStyle,
                  padding: 0,
                  background:
                    row.theme === "dark"
                      ? "#141518"
                      : "var(--context-background-surface-bg-surface-base)",
                }}
              >
                <div data-theme={row.theme}>{cell(col, row.theme)}</div>
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

const sectionTitleStyle: CSSProperties = {
  margin: "0 0 12px",
  fontSize: 13,
  fontWeight: 600,
  color: "var(--context-foreground-surface-on-surface-base)",
};

const matrixThGroup: CSSProperties = {
  ...storyMatrixColHeaderStyle,
  textAlign: "center",
};

const matrixThSub: CSSProperties = {
  ...storyMatrixColHeaderStyle,
  textAlign: "center",
  fontSize: 12,
};

type IconInteraction = "default" | "hover" | "selected";

function IconAlarmMatrixCell({
  theme,
  alarm,
  interaction,
}: {
  theme: "dark" | "light";
  alarm: boolean;
  interaction: IconInteraction;
}) {
  const hover = interaction === "hover";
  const selected = interaction === "selected";
  return (
    <td style={{ ...storyMatrixCellStyle, padding: 0 }}>
      <div
        data-theme={theme}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          minHeight: 72,
          padding: "16px 20px",
          background: theme === "dark" ? "#141518" : "#ffffff",
        }}
      >
        <GnbIconButton
          aria-label={`${theme} alarm=${String(alarm)} ${interaction}`}
          iconUrl="/icon/Noti.svg"
          alarm={alarm}
          selected={selected}
          forceState={hover ? "hover" : undefined}
        />
      </div>
    </td>
  );
}

/** GNB / Icon — alarm True·False × Default·Hovered·Selected (Dark / Light) */
function IconAlarmMatrixTable() {
  const subCols: IconInteraction[] = ["default", "hover", "selected"];
  const themes: Array<{ label: string; theme: "dark" | "light" }> = [
    { label: "Dark", theme: "dark" },
    { label: "Light", theme: "light" },
  ];

  return (
    <table style={{ ...storyMatrixTableBase, fontSize: 12 }}>
      <thead>
        <tr>
          <th rowSpan={2} style={{ ...storyMatrixColHeaderStyle, width: 56 }} />
          <th colSpan={3} style={matrixThGroup}>
            alarm: True
          </th>
          <th colSpan={3} style={matrixThGroup}>
            alarm: False
          </th>
        </tr>
        <tr>
          {[true, false].flatMap((alarmGroup) =>
            subCols.map((s) => (
              <th key={`${alarmGroup}-${s}`} style={matrixThSub}>
                {s === "default"
                  ? "Default"
                  : s === "hover"
                    ? "Hovered"
                    : "Selected"}
              </th>
            )),
          )}
        </tr>
      </thead>
      <tbody>
        {themes.map((row) => (
          <tr key={row.theme}>
            <td style={storyMatrixRowHeaderStyle}>{row.label}</td>
            {[true, false].flatMap((alarm) =>
              subCols.map((interaction) => (
                <IconAlarmMatrixCell
                  key={`${row.theme}-${alarm}-${interaction}`}
                  theme={row.theme}
                  alarm={alarm}
                  interaction={interaction}
                />
              )),
            )}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

/** Figma GNB 매트릭스: 전체 바(Dark/Light) · Select · Icon */
export const Matrix: Story = {
  name: "Matrix",
  parameters: {
    layout: "fullscreen",
    nextjs: { appDirectory: true },
  },
  render: () => (
    <div
      style={{
        boxSizing: "border-box",
        minHeight: "100vh",
        overflow: "auto",
        background: "var(--context-background-surface-bg-surface-secondary, #f5f5f7)",
        padding: 24,
      }}
    >
      <div
        style={{
          maxWidth: 2000,
          margin: "0 auto",
          display: "flex",
          flexDirection: "column",
          gap: 40,
        }}
      >
        <FigmaLinkCard
          nodeId="17945-4068"
          caption="Components / GNB — Dark·Light 및 Select·Icon 매트릭스 원본"
        />

        <section>
          <h3 style={sectionTitleStyle}>GNB</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <GnbExample theme="dark" />
            <GnbExample theme="light" />
          </div>
        </section>

        <section>
          <h3 style={sectionTitleStyle}>GNB / Select</h3>
          <MatrixTable
            columns={["Default", "Selected"]}
            rows={[
              { label: "Dark", theme: "dark" },
              { label: "Light", theme: "light" },
            ]}
            cell={(col) => (
              <ul
                style={{
                  margin: 0,
                  padding: 0,
                  listStyle: "none",
                  display: "inline-flex",
                }}
              >
                <GnbItem selected={col === "Selected"}>Menu 1</GnbItem>
              </ul>
            )}
          />
        </section>

        <section>
          <h3 style={sectionTitleStyle}>GNB / Icon</h3>
          <IconAlarmMatrixTable />
        </section>
      </div>
    </div>
  ),
};
