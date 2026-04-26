"use client";

import type { CSSProperties } from "react";

import { Button } from "@/components/button/button";
import { Loader, type LoaderColor, type LoaderSize } from "@/components/loader/loader";
import { DemoSection, demoStyles as s } from "../demo-block";

const cellStyle: CSSProperties = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: 12,
  padding: 20,
  borderRadius: 12,
  border:
    "1px solid color-mix(in srgb, var(--context-foreground-surface-on-surface-base) 8%, transparent)",
  background: "var(--context-background-surface-bg-surface-base)",
};

const captionStyle: CSSProperties = {
  fontSize: 12,
  fontWeight: 500,
  color: "var(--context-foreground-surface-on-surface-sub)",
};

const SIZES: Array<{ key: LoaderSize; label: string; px: number }> = [
  { key: "small", label: "Small", px: 24 },
  { key: "medium", label: "Medium", px: 32 },
  { key: "large", label: "Large (default)", px: 48 },
];

const COLORS: Array<{
  key: LoaderColor;
  label: string;
  background?: string;
  captionColor?: string;
}> = [
  { key: "mint", label: "Mint (default)" },
  { key: "gray", label: "Gray" },
  {
    key: "white",
    label: "White (on dark)",
    background: "var(--seed-color-gray-900, #1f2025)",
    captionColor: "rgba(255,255,255,0.8)",
  },
];

export function LoaderDemo() {
  return (
    <>
      <DemoSection
        title="Sizes"
        description="small(24px) · medium(32px) · large(48px, default). size prop 에 숫자를 전달하면 임의 픽셀값도 사용할 수 있습니다."
      >
        <div className={s.row} style={{ gap: 24 }}>
          {SIZES.map(({ key, label, px }) => (
            <div key={key} style={cellStyle}>
              <Loader size={key} />
              <span style={captionStyle}>
                {label} · {px}px
              </span>
            </div>
          ))}
        </div>
      </DemoSection>

      <DemoSection
        title="Colors"
        description="cyan(Figma 기본) · gray · white. 어두운 배경 위에서는 white 프리셋을 사용하세요."
      >
        <div className={s.row} style={{ gap: 24 }}>
          {COLORS.map(({ key, label, background, captionColor }) => (
            <div
              key={key}
              style={{
                ...cellStyle,
                background: background ?? cellStyle.background,
              }}
            >
              <Loader size="large" color={key} />
              <span
                style={{
                  ...captionStyle,
                  color: captionColor ?? captionStyle.color,
                }}
              >
                {label}
              </span>
            </div>
          ))}
        </div>
      </DemoSection>

      <DemoSection
        title="Usage"
        description="버튼 내부 · 페이지 전체 · 리스트 빈 자리 등 다양한 맥락에서의 사용 예시"
      >
        <div className={s.row} style={{ gap: 16, alignItems: "center" }}>
          <Button variant="primary-solid" disabled leftIcon={<Loader size={16} color="white" />}>
            저장 중...
          </Button>
          <Button variant="secondary-outline" disabled leftIcon={<Loader size={16} color="gray" />}>
            불러오는 중
          </Button>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              padding: "12px 16px",
              borderRadius: 12,
              background:
                "var(--context-background-surface-bg-surface-secondary, #f5f6f8)",
            }}
          >
            <Loader size="small" />
            <span
              style={{
                fontSize: 14,
                color: "var(--context-foreground-surface-on-surface-base)",
              }}
            >
              데이터를 불러오고 있어요.
            </span>
          </div>
        </div>
      </DemoSection>

      <DemoSection
        title="Accessibility"
        description="role='status' · aria-live='polite' · label prop 으로 스크린리더에 로딩 상태를 알립니다. prefers-reduced-motion 환경에서는 회전 속도가 느려집니다."
      >
        <div className={s.row} style={{ gap: 24 }}>
          <div style={cellStyle}>
            <Loader size="large" label="데이터 불러오는 중" />
            <span style={captionStyle}>label=&quot;데이터 불러오는 중&quot;</span>
          </div>
        </div>
      </DemoSection>
    </>
  );
}

export default LoaderDemo;
