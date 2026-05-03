import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { useState } from "react";
import type { CSSProperties } from "react";

import { Gnb, GnbIconButton, GnbItem } from "@/components/nav/gnb";
import { SearchToggleItem } from "@/components/button/search-toggle-item/search-toggle-item";
import { Num, type NumState } from "@/components/step/num";
import { Step } from "@/components/step/step";
import { Button } from "@/components/button/button/button";
import { Select } from "@/components/select/select";
import { TextArea } from "@/components/Input/textarea";
import { Label } from "@/components/label/label";

import { Layout } from "./index";

/* ----------------------------------------------------------------- */

const meta: Meta<typeof Layout> = {
  title: "Commons/Layout",
  component: Layout,
  parameters: {
    layout: "fullscreen",
    nextjs: { appDirectory: true },
    docs: { disable: true },
    /* Storybook viewport — 1920×1080 데스크톱 기본 */
    viewport: {
      defaultViewport: "desktop1920",
      viewports: {
        desktop1920: {
          name: "Desktop 1920×1080",
          styles: { width: "1920px", height: "1080px" },
          type: "desktop",
        },
      },
    },
  },
};
export default meta;
type Story = StoryObj<typeof Layout>;

/* -----------------------------------------------------------------
 *  공통 슬롯 콘텐츠
 * ----------------------------------------------------------------- */
function Logo() {
  return (
    <img
      src="/Logo_light.svg"
      alt="PhysicalWorks Forge"
      width={184}
      height={32}
      style={{ display: "block" }}
    />
  );
}

function InteractiveGnbItems() {
  const [selected, setSelected] = useState(0);
  const labels = ["Home", "Menu 1", "Menu 1", "Menu 1"];
  return (
    <>
      {labels.map((label, i) => (
        <GnbItem
          key={i}
          selected={i === selected}
          onClick={() => setSelected(i)}
        >
          {label}
        </GnbItem>
      ))}
    </>
  );
}

function SampleGnb() {
  return (
    <Gnb
      theme="light"
      brand={<Logo />}
      items={<InteractiveGnbItems />}
      actions={
        <>
          <GnbIconButton aria-label="알림" iconUrl="/icon/Noti.svg" alarm />
          <GnbIconButton aria-label="사용자" iconUrl="/icon/User.svg" />
          <GnbIconButton aria-label="연결" iconUrl="/icon/Connection.svg" />
          <GnbIconButton aria-label="설정" iconUrl="/icon/Gear.svg" />
          <div
            style={{
              display: "inline-flex",
              borderRadius: 8,
              background: "var(--context-background-surface-bg-surface-secondary)",
              flexShrink: 0,
            }}
          >
            <SearchToggleItem selected>Standard</SearchToggleItem>
            <SearchToggleItem>Focus</SearchToggleItem>
          </div>
        </>
      }
    />
  );
}

/* Header 영역 — Figma 18375:4176 정확 매칭
 *   구조: [Back btn (round icon-only)] [Title H3] [Bubble (icon + desc)] | [Save Draft] [Load Draft]
 *   외부: items-end, pb-12 (수직 정렬: 하단 정렬, 하단 12px 여백)
 *   내부 Page-title row: gap-40, items-center, flex-1
 *   왼쪽 cluster: gap-12, items-center
 *   Title: H3 (24px semibold, line-height 32, on-surface-base)
 *   Bubble: gap-8, h-32, pl-16 pr-12, radius (tl 50px, tr 1000px, br 1000px, bl 8px)
 *           icon 11×8 (Bubble.svg) + desc text (Body/Md-Medium 13px, on-surface-hint)
 *   Right group: gap-8, items-start, 2 buttons (Secondary Outline / Large + leadingIcon)
 */
function SampleHeader() {
  const [draftMsg, setDraftMsg] = useState("");
  const titleStyle: CSSProperties = {
    margin: 0,
    font: '600 24px/32px var(--font-family-korean, "Pretendard", sans-serif)',
    color: "var(--context-foreground-surface-on-surface-base)",
    whiteSpace: "nowrap",
  };
  const bubbleStyle: CSSProperties = {
    display: "inline-flex",
    alignItems: "center",
    gap: 8,
    height: 32,
    paddingLeft: 16,
    paddingRight: 12,
    /* tl 50, tr 1000, br 1000, bl 8 — 말풍선 형태 */
    borderTopLeftRadius: 50,
    borderTopRightRadius: 1000,
    borderBottomRightRadius: 1000,
    borderBottomLeftRadius: 8,
    overflow: "hidden",
    /* Figma 18375:4177 정확 매칭 — context-foreground-surface-on-surface */
    color: "var(--context-foreground-surface-on-surface)",
    font: '500 13px/20px var(--font-family-korean, "Pretendard", sans-serif)',
    letterSpacing: "-0.052px",
    whiteSpace: "nowrap",
  };
  return (
    <div
      style={{
        display: "flex",
        alignItems: "flex-end",
        width: "100%",
        height: "100%",
        paddingBottom: 12,
        boxSizing: "border-box",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 40,
          flex: "1 0 0",
          minWidth: 0,
        }}
      >
        {/* 왼쪽: Back + Title + Bubble */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            flex: "1 0 0",
            minWidth: 0,
          }}
        >
          <Button
            variant="secondary-outline-white-invert"
            size="medium"
            shape="round"
            iconOnly
            aria-label="뒤로"
            onClick={() => alert("뒤로")}
            leftIcon={<img src="/icon/ChevronLeft.svg" alt="" width={16} height={16} />}
          />
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <h1 style={titleStyle}>Data Collect</h1>
            <span style={bubbleStyle}>
              <img src="/icon/Bubble.svg" alt="" width={11} height={8} style={{ flexShrink: 0 }} />
              {draftMsg || "Record robot teleoperation episodes, run validation, then save as a datasets"}
            </span>
          </div>
        </div>

        {/* 오른쪽: Save Draft + Load Draft */}
        <div style={{ display: "flex", alignItems: "flex-start", gap: 8, flexShrink: 0 }}>
          <Button
            variant="secondary-outline"
            size="large"
            onClick={() => {
              setDraftMsg(`Draft saved at ${new Date().toLocaleTimeString()}`);
              setTimeout(() => setDraftMsg(""), 2500);
            }}
            leftIcon={<img src="/icon/Save.svg" alt="" width={16} height={16} />}
          >
            Save Draft
          </Button>
          <Button
            variant="secondary-outline"
            size="large"
            onClick={() => {
              setDraftMsg("Draft loaded");
              setTimeout(() => setDraftMsg(""), 2500);
            }}
            leftIcon={<img src="/icon/Refresh.svg" alt="" width={16} height={16} />}
          >
            Load Draft
          </Button>
        </div>
      </div>
    </div>
  );
}

/* Stepper 영역 — 클릭으로 단계 이동 가능 (currentStep state 추적) */
const STEP_LABELS = ["Teleoperation", "Configure Parameters", "Save Datasets"] as const;

function SampleStepper({
  currentStep,
  onStepChange,
}: {
  currentStep: number;
  onStepChange: (i: number) => void;
}) {
  const wrapStyle: CSSProperties = {
    display: "flex",
    alignItems: "center",
    width: "100%",
    height: "100%",
    padding: "8px 24px",
    border: "2px solid rgba(67, 198, 193, 0.3)",
    borderRadius: 12,
    background:
      "linear-gradient(-0.26deg, #f6f6f6 2.29%, #f3f7ee 30.69%, #ddfcfa 104.75%)",
    boxShadow: "0 4px 7px rgba(0,0,0,0.06)",
    boxSizing: "border-box",
    gap: 12,
  };
  const dividerStyle: CSSProperties = {
    flex: "0 0 48px",
    height: 1,
    background: "var(--context-foreground-surface-on-surface-hint-muted)",
    opacity: 0.5,
  };
  const stepBtnStyle: CSSProperties = {
    display: "inline-flex",
    alignItems: "center",
    gap: 0,
    padding: 0,
    background: "transparent",
    border: 0,
    cursor: "pointer",
  };
  const numState = (i: number): NumState =>
    i < currentStep ? "finish" : i === currentStep ? "current" : "next";
  return (
    <div style={wrapStyle}>
      {STEP_LABELS.map((label, i) => (
        <span key={i} style={{ display: "inline-flex", alignItems: "center" }}>
          <button
            type="button"
            onClick={() => onStepChange(i)}
            style={stepBtnStyle}
            aria-label={`Step ${i + 1}: ${label}`}
          >
            <Num number={i + 1} state={numState(i)} mode="light" />
            <Step
              label={label}
              state={i === currentStep ? "active" : "default"}
              mode="light"
            />
          </button>
          {i < STEP_LABELS.length - 1 && <span aria-hidden style={dividerStyle} />}
        </span>
      ))}
    </div>
  );
}

/* Main Contents — 흰 패널 + 실제 폼 컴포넌트 (Select/TextArea/Label) + 하단 버튼
 * Select 는 트리거 버튼만 제공하므로 — 데모용으로 클릭 시 옵션 순환.
 * 실제 production 에서는 SelectList + Popover 조합 필요.
 */
function useCycle<T>(options: readonly T[], initial: T) {
  const [value, setValue] = useState<T>(initial);
  const cycle = () => {
    const idx = options.indexOf(value);
    setValue(options[(idx + 1) % options.length]);
  };
  return { value, cycle };
}

const RESOLUTION_OPTIONS = ["Cosmos Predict-1", "1920×1080", "1280×720", "640×360"] as const;
const FPS_OPTIONS = ["Video → World", "24 fps", "30 fps", "60 fps"] as const;
const ASPECT_OPTIONS = ["Cosmos Predict-1", "16:9", "4:3", "1:1"] as const;
const FRAMES_OPTIONS = ["Video → World", "8 frames", "16 frames", "32 frames"] as const;
const MODEL_GROUP_OPTIONS = ["", "Cosmos", "Stable Video", "AnimateDiff"] as const;
const MODEL_OPTIONS = ["", "Predict-1", "Predict-2", "Predict-Lite"] as const;

function SampleContents({ onPrev, onNext }: { onPrev: () => void; onNext: () => void }) {
  const modelGroup = useCycle(MODEL_GROUP_OPTIONS, "");
  const model = useCycle(MODEL_OPTIONS, "");
  const resolution = useCycle(RESOLUTION_OPTIONS, "Cosmos Predict-1");
  const fps = useCycle(FPS_OPTIONS, "Video → World");
  const aspect = useCycle(ASPECT_OPTIONS, "Cosmos Predict-1");
  const frames = useCycle(FRAMES_OPTIONS, "Video → World");

  const panel: CSSProperties = {
    display: "flex",
    flexDirection: "column",
    flex: "1 0 0",
    minHeight: 0,
    background: "var(--context-background-surface-bg-surface-base)",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: "24px 24px 0",
    boxSizing: "border-box",
  };
  const sectionTitle: CSSProperties = {
    display: "flex",
    alignItems: "center",
    gap: 8,
    margin: 0,
    font: '600 20px/24px var(--font-family-korean, "Pretendard", sans-serif)',
    color: "var(--context-foreground-surface-on-surface-base)",
  };
  const fieldRow: CSSProperties = {
    display: "flex",
    gap: 24,
    paddingLeft: 36,
  };
  const fieldGroup: CSSProperties = {
    display: "flex",
    flexDirection: "column",
    gap: 4,
    flex: "1 0 0",
    minWidth: 0,
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", flex: "1 0 0", minHeight: 0 }}>
      <div style={panel}>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <h2 style={sectionTitle}>
            <Num number={1} state="current" mode="light" />
            Configure parameter
          </h2>

          <div style={fieldRow}>
            <div style={fieldGroup}>
              <Label size="small" mandatory>Model Group</Label>
              <Select
                placeholder="Select an option"
                value={modelGroup.value || undefined}
                onClick={modelGroup.cycle}
              />
            </div>
            <div style={fieldGroup}>
              <Label size="small" mandatory>Model</Label>
              <Select
                placeholder="Select an option"
                value={model.value || undefined}
                onClick={model.cycle}
              />
            </div>
          </div>

          <div style={fieldRow}>
            <div style={fieldGroup}>
              <Label size="small" mandatory>Resolution</Label>
              <Select value={resolution.value} onClick={resolution.cycle} />
            </div>
            <div style={fieldGroup}>
              <Label size="small" mandatory>FPS</Label>
              <Select value={fps.value} onClick={fps.cycle} />
            </div>
          </div>

          <div style={{ ...fieldRow, paddingRight: 24 }}>
            <div style={fieldGroup}>
              <Label size="small" mandatory>Text Prompt</Label>
              <TextArea placeholder="Enter a prompt" />
            </div>
          </div>

          <div style={{ ...fieldRow, paddingRight: 24 }}>
            <div style={fieldGroup}>
              <Label size="small" mandatory>Negative Prompt</Label>
              <TextArea placeholder="Enter a prompt" />
            </div>
          </div>

          <div style={fieldRow}>
            <div style={fieldGroup}>
              <Label size="small" mandatory>Aspect Ratio</Label>
              <Select value={aspect.value} onClick={aspect.cycle} />
            </div>
            <div style={fieldGroup}>
              <Label size="small" mandatory>Num Conditional Frames</Label>
              <Select value={frames.value} onClick={frames.cycle} />
            </div>
          </div>
        </div>
      </div>

      {/* 하단 버튼 영역 — 클릭 시 stepper 이동 */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "24px",
          background: "var(--context-background-surface-bg-surface-base)",
        }}
      >
        <Button variant="secondary-outline" size="large" onClick={onPrev}>
          Previous
        </Button>
        <Button variant="primary-solid" size="large" onClick={onNext}>
          Next
        </Button>
      </div>
    </div>
  );
}

/* 1920×1080 고정 캔버스 — Storybook viewport addon 미설치 환경에서도 정확한 사이즈 강제.
 * 반응형 미고려, 캔버스가 작으면 가로/세로 스크롤 노출.
 */
const FIXED_VIEWPORT_STYLE: CSSProperties = {
  width: "1920px",
  height: "1080px",
  minWidth: "1920px",
  minHeight: "1080px",
  overflow: "auto",
  boxSizing: "border-box",
};

/* -----------------------------------------------------------------
 *  Playground — 1920×1080 데스크톱, 모든 컴포넌트 인터랙티브
 * ----------------------------------------------------------------- */
function PlaygroundContent() {
  const [currentStep, setCurrentStep] = useState(1);
  const goPrev = () => setCurrentStep((s) => Math.max(0, s - 1));
  const goNext = () => setCurrentStep((s) => Math.min(STEP_LABELS.length - 1, s + 1));
  return (
    <div style={FIXED_VIEWPORT_STYLE}>
      <Layout
        gnb={<SampleGnb />}
        header={<SampleHeader />}
        stepper={<SampleStepper currentStep={currentStep} onStepChange={setCurrentStep} />}
      >
        <SampleContents onPrev={goPrev} onNext={goNext} />
      </Layout>
    </div>
  );
}

export const Playground: Story = {
  render: () => <PlaygroundContent />,
};

/* -----------------------------------------------------------------
 *  Bare — 슬롯 영역만 색상 placeholder 로 확인 (스펙 검증용)
 * ----------------------------------------------------------------- */
export const Bare: Story = {
  name: "Bare (영역 확인용)",
  render: () => (
    <div style={FIXED_VIEWPORT_STYLE}>
    <Layout
      gnb={
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
            height: "100%",
            background: "rgba(67, 198, 193, 0.2)",
            font: "600 12px/16px var(--font-family-korean)",
            color: "var(--context-foreground-surface-on-surface-base)",
          }}
        >
          GNB · width 100% × height 56px
        </div>
      }
      header={
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
            height: "100%",
            background: "rgba(151, 30, 255, 0.15)",
            font: "600 12px/16px var(--font-family-korean)",
          }}
        >
          Detail Page Header · 100% × 68 (1440 센터)
        </div>
      }
      stepper={
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
            height: "100%",
            background: "rgba(126, 242, 241, 0.4)",
            font: "600 12px/16px var(--font-family-korean)",
            borderRadius: 12,
          }}
        >
          Stepper · 1440 × 64
        </div>
      }
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flex: "1 0 0",
          background: "rgba(255, 255, 255, 0.6)",
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          font: "600 12px/16px var(--font-family-korean)",
        }}
      >
        Main Contents · 1440 × 잔여
      </div>
    </Layout>
    </div>
  ),
};
