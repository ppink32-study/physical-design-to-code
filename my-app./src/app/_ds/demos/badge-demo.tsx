"use client";

import type { CSSProperties } from "react";

import {
  Badge,
  type BadgeLineColor,
  type BadgeNoticeColor,
  type BadgeSize,
  type BadgeSolidColor,
  type BadgeStatusColor,
} from "@/components/badge/badge";
import { DemoSection } from "../demo-block";
import m from "./badge-demo.module.css";

/* =================================================================
 *  Mask-icon helper
 * =============================================================== */
function MaskIcon({ src }: { src: string }) {
  const style: CSSProperties = {
    display: "block",
    width: "100%",
    height: "100%",
    background: "currentColor",
    WebkitMaskImage: `url(${src})`,
    maskImage: `url(${src})`,
    WebkitMaskRepeat: "no-repeat",
    maskRepeat: "no-repeat",
    WebkitMaskSize: "contain",
    maskSize: "contain",
    WebkitMaskPosition: "center",
    maskPosition: "center",
  };
  return <span aria-hidden="true" style={style} />;
}

const IconCheck = () => <MaskIcon src="/icon/Check.svg" />;
const IconStar = () => <MaskIcon src="/icon/Bookmark-Line.svg" />;

/* =================================================================
 *  Color 세트 (Figma 정의와 동일 순서)
 * =============================================================== */
const SOLID_COLORS: BadgeSolidColor[] = [
  "primary",
  "purple",
  "red",
  "green",
  "orange",
  "pink",
  "blue",
  "cyan",
  "gray",
  "opacity",
];

const LINE_COLORS: BadgeLineColor[] = [
  "gray",
  "purple",
  "cyan",
  "green",
  "red",
  "orange",
  "pink",
  "blue",
  "teal",
  "magenta",
  "gold",
];

const STATUS_COLORS: BadgeStatusColor[] = [
  "cyan",
  "blue",
  "yellow",
  "pink",
  "purple",
  "green",
  "red",
  "gray",
  "orange",
];

const NOTICE_COLORS: BadgeNoticeColor[] = ["red", "purple"];

const SOLID_SIZES: BadgeSize[] = ["xs", "sm", "lg"];
const LS_SIZES: BadgeSize[] = ["sm", "lg"];

/* =================================================================
 *  Matrix builder
 * =============================================================== */
function Matrix<C extends string, S extends string>({
  rows,
  cols,
  render,
}: {
  rows: readonly C[];
  cols: Array<{
    key: string;
    label: string;
    size?: S;
    shape?: "square" | "round";
    extra?: string;
    count?: number;
  }>;
  render: (
    color: C,
    opts: {
      size?: S;
      shape?: "square" | "round";
      extra?: string;
      label: string;
      count?: number;
    },
  ) => React.ReactNode;
}) {
  return (
    <div
      className={m.matrix}
      style={{ "--cols": cols.length } as CSSProperties}
    >
      <div className={m.headerCell}>color</div>
      {cols.map((c) => (
        <div key={c.key} className={m.headerCell}>
          {c.label}
        </div>
      ))}
      {rows.map((color) => (
        <div key={color} style={{ display: "contents" }}>
          <div className={m.rowLabel}>{color}</div>
          {cols.map((c) => (
            <div key={c.key} className={m.cell}>
              {render(color, c)}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

/* =================================================================
 *  Support matrix (variant × options 지원 표)
 * =============================================================== */
type SupportRow = {
  variant: string;
  colors: string;
  sizes: string;
  shapes: string;
  icon: boolean;
  dot: boolean;
  count: boolean;
  note?: string;
};

const SUPPORT_ROWS: SupportRow[] = [
  {
    variant: "solid",
    colors: "10 (primary · purple · red · green · orange · pink · blue · cyan · gray · opacity)",
    sizes: "xs · sm · lg",
    shapes: "square · round",
    icon: true,
    dot: false,
    count: false,
  },
  {
    variant: "line",
    colors: "11 (gray · purple · cyan · green · red · orange · pink · blue · teal · magenta · gold)",
    sizes: "sm · lg",
    shapes: "square · round",
    icon: true,
    dot: false,
    count: false,
  },
  {
    variant: "status",
    colors: "9 (cyan · blue · yellow · pink · purple · green · red · gray · orange)",
    sizes: "sm · lg",
    shapes: "square · round",
    icon: false,
    dot: true,
    count: true,
    note: "dot 기본 true — dot={false} 로 숨김",
  },
  {
    variant: "notice",
    colors: "2 (red · purple)",
    sizes: "— (고정)",
    shapes: "— (round 고정)",
    icon: false,
    dot: false,
    count: true,
    note: "카운트 전용(0–9 한 자리) · max 15px · size/shape prop 무시",
  },
];

/* =================================================================
 *  Overview (단일 페이지)
 * =============================================================== */
function BadgeDemoContent() {
  return (
    <>
      {/* -----------------------------------------------------------
       * 0) Variants overview
       * --------------------------------------------------------- */}
      <DemoSection
        title="Variants 개요"
        description="solid · line · status · notice 4종. 각 variant 는 허용되는 color · size · shape 세트가 다릅니다."
      >
        <div className={m.variantOverview}>
          <div className={m.variantCard}>
            <div className={m.variantStage}>
              <Badge variant="solid" color="primary">Solid</Badge>
            </div>
            <div className={m.variantTitle}>solid</div>
            <div className={m.variantDesc}>
              배경 컬러가 채워진 기본 뱃지. 카테고리 · 강조 키워드에 사용.
            </div>
          </div>
          <div className={m.variantCard}>
            <div className={m.variantStage}>
              <Badge variant="line" color="purple">Line</Badge>
            </div>
            <div className={m.variantTitle}>line</div>
            <div className={m.variantDesc}>
              테두리만 있는 라이트한 뱃지. 정보성 태그 · 낮은 비중의 라벨.
            </div>
          </div>
          <div className={m.variantCard}>
            <div className={m.variantStage}>
              <Badge variant="status" color="green" count={12}>Active</Badge>
            </div>
            <div className={m.variantTitle}>status</div>
            <div className={m.variantDesc}>
              dot + 라벨 (+ 카운트) 조합. 상태 · 진행 단계 표시용.
            </div>
          </div>
          <div className={m.variantCard}>
            <div className={m.variantStage}>
              <Badge variant="notice" color="red" count={3} />
              <Badge variant="notice" color="purple" count={99} />
            </div>
            <div className={m.variantTitle}>notice</div>
            <div className={m.variantDesc}>
              아이콘 · 네비 옆 카운트. 0–9 한 자리만 표시(10+ 는 9) · 최대 너비 15px.
            </div>
          </div>
        </div>
      </DemoSection>

      {/* -----------------------------------------------------------
       * 1) Solid — 10 colors × 3 sizes
       * --------------------------------------------------------- */}
      <DemoSection
        title="1. Solid"
        description="10개 color × 3개 size (xs · sm · lg) 전체. 라벨은 각 color 이름이 그대로 들어갑니다."
      >
        <Matrix<BadgeSolidColor, BadgeSize>
          rows={SOLID_COLORS}
          cols={SOLID_SIZES.map((size) => ({ key: size, label: size, size }))}
          render={(color, { size }) => (
            <Badge variant="solid" color={color} size={size!}>
              {color}
            </Badge>
          )}
        />
      </DemoSection>

      {/* -----------------------------------------------------------
       * 2) Line — 11 colors × 2 sizes
       * --------------------------------------------------------- */}
      <DemoSection
        title="2. Line"
        description="11개 color × 2개 size (sm · lg). line 은 xs 를 지원하지 않습니다."
      >
        <Matrix<BadgeLineColor, BadgeSize>
          rows={LINE_COLORS}
          cols={LS_SIZES.map((size) => ({ key: size, label: size, size }))}
          render={(color, { size }) => (
            <Badge variant="line" color={color} size={size!}>
              {color}
            </Badge>
          )}
        />
      </DemoSection>

      {/* -----------------------------------------------------------
       * 3) Status — 9 colors × 2 sizes + with count
       * --------------------------------------------------------- */}
      <DemoSection
        title="3. Status"
        description="9개 color × 2개 size + 카운트 포함 변형. dot 은 기본 true — 숨기려면 dot={false}."
      >
        <Matrix<BadgeStatusColor, BadgeSize>
          rows={STATUS_COLORS}
          cols={[
            { key: "sm", label: "sm", size: "sm" as BadgeSize },
            { key: "lg", label: "lg", size: "lg" as BadgeSize },
            { key: "lg-count", label: "lg · count", size: "lg" as BadgeSize, extra: "count" },
            { key: "lg-nodot", label: "lg · no dot", size: "lg" as BadgeSize, extra: "nodot" },
          ]}
          render={(color, { size, extra }) => {
            if (extra === "count") {
              return (
                <Badge variant="status" color={color} size={size!} count={12}>
                  {color}
                </Badge>
              );
            }
            if (extra === "nodot") {
              return (
                <Badge variant="status" color={color} size={size!} dot={false}>
                  {color}
                </Badge>
              );
            }
            return (
              <Badge variant="status" color={color} size={size!}>
                {color}
              </Badge>
            );
          }}
        />
      </DemoSection>

      {/* -----------------------------------------------------------
       * 4) Notice — red / purple × count variations
       * --------------------------------------------------------- */}
      <DemoSection
        title="4. Notice"
        description="카운트 전용 뱃지. 색상 2종(red · purple) · 높이·너비 고정(최대 15px). 표시는 0–9 한 자리(10 이상은 9). count 또는 children 으로 전달."
      >
        <Matrix<BadgeNoticeColor, never>
          rows={NOTICE_COLORS}
          cols={[
            { key: "c0", label: "0", count: 0 },
            { key: "c1", label: "1", count: 1 },
            { key: "c9", label: "9", count: 9 },
            { key: "c99", label: "99→9", count: 99 },
          ]}
          render={(color, col) => (
            <Badge variant="notice" color={color} count={col.count!} />
          )}
        />
      </DemoSection>

      {/* -----------------------------------------------------------
       * 5) Shape — square vs round
       * --------------------------------------------------------- */}
      <DemoSection
        title="5. Shape"
        description="square(기본) · round. notice 는 항상 round 이므로 제외됩니다."
      >
        <Matrix<string, BadgeSize>
          rows={["solid", "line", "status"]}
          cols={[
            { key: "sm-square", label: "sm · square" },
            { key: "sm-round", label: "sm · round" },
            { key: "lg-square", label: "lg · square" },
            { key: "lg-round", label: "lg · round" },
          ]}
          render={(variant, { key }) => {
            const [size, shape] = key.split("-") as [BadgeSize, "square" | "round"];
            if (variant === "solid") {
              return (
                <Badge variant="solid" color="primary" size={size} shape={shape}>
                  Badge
                </Badge>
              );
            }
            if (variant === "line") {
              return (
                <Badge variant="line" color="purple" size={size} shape={shape}>
                  Badge
                </Badge>
              );
            }
            return (
              <Badge variant="status" color="green" size={size} shape={shape}>
                Active
              </Badge>
            );
          }}
        />
      </DemoSection>

      {/* -----------------------------------------------------------
       * 6) Icon combos — solid / line
       * --------------------------------------------------------- */}
      <DemoSection
        title="6. Icon 조합"
        description="solid · line variant 는 icon prop 으로 좌측에 아이콘을 배치할 수 있습니다. 아이콘은 currentColor 를 상속해 variant 색상과 조화됩니다."
      >
        <Matrix<string, BadgeSize>
          rows={["solid · primary", "solid · green", "line · purple", "line · gold"]}
          cols={[
            { key: "sm", label: "sm" },
            { key: "lg", label: "lg" },
          ]}
          render={(row, { key }) => {
            const size = key as BadgeSize;
            if (row.startsWith("solid · primary")) {
              return (
                <Badge variant="solid" color="primary" size={size} icon={<IconCheck />}>
                  Verified
                </Badge>
              );
            }
            if (row.startsWith("solid · green")) {
              return (
                <Badge variant="solid" color="green" size={size} icon={<IconCheck />}>
                  Completed
                </Badge>
              );
            }
            if (row.startsWith("line · purple")) {
              return (
                <Badge variant="line" color="purple" size={size} icon={<IconStar />}>
                  Featured
                </Badge>
              );
            }
            return (
              <Badge variant="line" color="gold" size={size} icon={<IconStar />}>
                Premium
              </Badge>
            );
          }}
        />
      </DemoSection>

      {/* -----------------------------------------------------------
       * 7) Support matrix
       * --------------------------------------------------------- */}
      <DemoSection
        title="7. variant × 옵션 지원 표"
        description="각 variant 가 허용하는 color · size · shape 범위와 사용 가능한 slot 을 한눈에 확인합니다."
      >
        <table className={m.table}>
          <thead>
            <tr>
              <th style={{ width: "10%" }}>Variant</th>
              <th style={{ width: "30%" }}>Colors</th>
              <th className={m.mono}>Sizes</th>
              <th className={m.mono}>Shapes</th>
              <th className={m.mono}>icon</th>
              <th className={m.mono}>dot</th>
              <th className={m.mono}>count</th>
              <th>비고</th>
            </tr>
          </thead>
          <tbody>
            {SUPPORT_ROWS.map((r) => (
              <tr key={r.variant}>
                <td><code>{r.variant}</code></td>
                <td>{r.colors}</td>
                <td className={m.mono}>{r.sizes}</td>
                <td className={m.mono}>{r.shapes}</td>
                <td className={r.icon ? m.check : m.cross}>
                  {r.icon ? "✓" : "—"}
                </td>
                <td className={r.dot ? m.check : m.cross}>
                  {r.dot ? "✓" : "—"}
                </td>
                <td className={r.count ? m.check : m.cross}>
                  {r.count ? "✓" : "—"}
                </td>
                <td className={m.muted}>{r.note ?? "—"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </DemoSection>
    </>
  );
}

/* =================================================================
 *  Entry
 * =============================================================== */
export function BadgeDemo() {
  return <BadgeDemoContent />;
}

export default BadgeDemo;
