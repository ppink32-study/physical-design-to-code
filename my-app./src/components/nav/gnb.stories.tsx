import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import Link from "next/link";

import { StoryPlaygroundFrame } from "@/stories/story-docs-shell";
import { Gnb, GnbIconButton, GnbItem } from "./gnb";

const meta: Meta<typeof Gnb> = {
  title: "Components/Gnb",
  component: Gnb,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    nextjs: {
      appDirectory: true,
    },
    docs: {
      description: {
        component:
          "상단 글로벌 내비게이션(GNB). Figma 디자인(Dark/Light, GNB·GNB/Select·GNB/Icon)을 그대로 구현했습니다. `<Gnb>` 컨테이너에 `brand` · `items` · `actions` 슬롯을 조합해 사용합니다.",
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Gnb>;


/* -----------------------------------------------------------------
 *  Frame1920 — Figma 기준 1920px 고정폭 프레임
 *  화면이 좁으면 가로 스크롤이 생깁니다.
 * ----------------------------------------------------------------- */
function Frame1920({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ overflowX: "auto", width: "100%" }}>
      <div style={{ width: 1920, minWidth: 1920 }}>{children}</div>
    </div>
  );
}

/* -----------------------------------------------------------------
 *  Logo placeholder — public/Logo.svg 가 있으면 자동 사용
 * ----------------------------------------------------------------- */
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

export const Playground: Story = {
  decorators: [
    (Story) => (
      <StoryPlaygroundFrame>
        <Story />
      </StoryPlaygroundFrame>
    ),
  ],
  args: {
    brand: <BrandLogo />,
    items: (
      <>
        <GnbItem href="/" selected>
          Home
        </GnbItem>
        <GnbItem href="/menu-1">Menu 1</GnbItem>
        <GnbItem href="/menu-2">Menu 1</GnbItem>
        <GnbItem href="/menu-3">Menu 1</GnbItem>
      </>
    ),
    actions: (
      <>
        <GnbIconButton aria-label="Notice" iconUrl="/icon/Notice.svg" />
        <GnbIconButton
          aria-label="Notifications"
          iconUrl="/icon/Noti.svg"
          alarm
        />
        <GnbIconButton aria-label="Settings" iconUrl="/icon/Gear.svg" />
      </>
    ),
  },
  decorators: [
    (Story) => (
      <Frame1920>
        <Story />
      </Frame1920>
    ),
  ],
};

/* =================================================================
 *  Light vs Dark
 * =============================================================== */
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

export const Dark: Story = {
  render: () => <GnbExample theme="dark" />,
  parameters: {
    backgrounds: { default: "dark" },
  },
};

export const Light: Story = {
  render: () => <GnbExample theme="light" />,
};

/* =================================================================
 *  GNB / Select 상태 매트릭스 (Default vs Selected · Light/Dark)
 * =============================================================== */
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
    <table
      style={{
        borderCollapse: "separate",
        borderSpacing: 0,
        fontSize: 12,
      }}
    >
      <thead>
        <tr>
          <th style={{ width: 56 }} />
          {columns.map((c) => (
            <th
              key={c}
              style={{
                textAlign: "center",
                fontWeight: 500,
                padding: "8px 12px",
                color: "#9747ff",
              }}
            >
              {c}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((row) => (
          <tr key={row.label}>
            <td
              style={{
                paddingRight: 12,
                textAlign: "right",
                color: "#9747ff",
                fontWeight: 500,
              }}
            >
              {row.label}
            </td>
            {columns.map((col) => (
              <td
                key={col}
                style={{
                  border: "1px dashed #9747ff",
                  background:
                    row.theme === "dark" ? "#141518" : "transparent",
                  padding: 0,
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

export const SelectStates: Story = {
  name: "GNB / Select",
  render: () => (
    <div style={{ padding: 24 }}>
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
    </div>
  ),
};

/* =================================================================
 *  GNB / Icon 상태 매트릭스
 * =============================================================== */
export const IconStates: Story = {
  name: "GNB / Icon",
  render: () => (
    <div style={{ padding: 24, display: "flex", flexDirection: "column", gap: 32 }}>
      {(["dark", "light"] as const).map((theme) => (
        <div key={theme}>
          <div
            style={{ marginBottom: 8, fontSize: 12, color: "#9747ff" }}
          >
            {theme}
          </div>
          <div
            data-theme={theme}
            style={{
              display: "inline-flex",
              gap: 16,
              padding: 24,
              background: theme === "dark" ? "#141518" : "transparent",
              border: "1px dashed #9747ff",
              borderRadius: 5,
            }}
          >
            <GnbIconButton aria-label="Default" iconUrl="/icon/Noti.svg" alarm />
            <GnbIconButton
              aria-label="Hovered"
              iconUrl="/icon/Noti.svg"
              alarm
              selected
            />
            <GnbIconButton
              aria-label="Selected"
              iconUrl="/icon/Noti.svg"
              alarm
              selected
            />
            <GnbIconButton aria-label="Default no alarm" iconUrl="/icon/Noti.svg" />
            <GnbIconButton
              aria-label="Hovered no alarm"
              iconUrl="/icon/Noti.svg"
              selected
            />
            <GnbIconButton
              aria-label="Selected no alarm"
              iconUrl="/icon/Noti.svg"
              selected
            />
          </div>
        </div>
      ))}
    </div>
  ),
};
