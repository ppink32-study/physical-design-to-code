import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Fragment, useCallback, useState } from "react";

import { Toast, ToastViewport, type ToastType } from "./toasts";
import { FigmaLinkCard } from "@/stories/figma-link-card";
import {
  StoryDocsMatrixPage,
  StoryPlaygroundFrame,
} from "@/stories/story-docs-shell";

const meta: Meta<typeof Toast> = {
  title: "Components/Toasts/Toast",
  component: Toast,
  parameters: {
    layout: "centered",
    docs: { disable: true },
  },
  argTypes: {
    type: {
      control: "inline-radio",
      options: ["confirm", "success", "warning", "error"] as ToastType[],
    },
    message: { control: "text" },
    subText: { control: "text" },
    linkText: { control: "text" },
    duration: { control: { type: "number", min: 0, max: 10000, step: 500 } },
    role: { control: "inline-radio", options: ["status", "alert"] },
    onClose: { action: "close" },
    onLinkClick: { action: "linkClick" },
  },
  args: {
    type: "confirm",
    message: "메시지 영역입니다. max.w 400 이상은 줄바꿈처리",
  },
};
export default meta;

type Story = StoryObj<typeof Toast>;

export const Playground: Story = {
  decorators: [
    (Story) => (
      <StoryPlaygroundFrame>
        <Story />
      </StoryPlaygroundFrame>
    ),
  ],
};

const TYPES: readonly ToastType[] = ["confirm", "success", "warning", "error"] as const;

const TYPE_LABEL: Record<ToastType, string> = {
  confirm: "Confirm",
  success: "Success",
  warning: "Warning",
  error: "Error",
};

function LinkCloseDemo() {
  const [open, setOpen] = useState(true);
  if (!open) {
    return (
      <button
        type="button"
        onClick={() => setOpen(true)}
        style={{
          padding: "8px 12px",
          border: "1px solid var(--color-border-surface)",
          borderRadius: 4,
          background: "var(--color-surface-base)",
          cursor: "pointer",
          fontFamily: "var(--font-family-korean)",
        }}
      >
        다시 열기
      </button>
    );
  }
  return (
    <Toast
      type="confirm"
      message="메시지 영역입니다. max.w 400 이상은 줄바꿈처리"
      linkText="Link Text"
      onClose={() => setOpen(false)}
      onLinkClick={() => window.alert("Link clicked")}
    />
  );
}

function AutoDismissDemo() {
  const [open, setOpen] = useState(true);
  if (!open) {
    return (
      <button
        type="button"
        onClick={() => setOpen(true)}
        style={{
          padding: "8px 12px",
          border: "1px solid var(--color-border-surface)",
          borderRadius: 4,
          background: "var(--color-surface-base)",
          cursor: "pointer",
          fontFamily: "var(--font-family-korean)",
        }}
      >
        다시 열기
      </button>
    );
  }
  return (
    <Toast
      type="success"
      message="3초 후 자동으로 닫힙니다."
      duration={3000}
      onClose={() => setOpen(false)}
    />
  );
}

function ViewportStackDemo() {
  const [toasts, setToasts] = useState<
    { id: number; type: ToastType; message: string }[]
  >([
    { id: 1, type: "confirm", message: "확인 토스트 예시" },
    { id: 2, type: "success", message: "작업이 성공적으로 완료되었습니다." },
    { id: 3, type: "warning", message: "주의가 필요한 항목입니다." },
    { id: 4, type: "error", message: "오류가 발생했습니다. 다시 시도해 주세요." },
  ]);

  const handleClose = useCallback((id: number) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const handleAdd = () => {
    const types: ToastType[] = ["confirm", "success", "warning", "error"];
    const type = types[Math.floor(Math.random() * types.length)];
    setToasts((prev) => [
      ...prev,
      {
        id: Date.now(),
        type,
        message: `새 ${type} 토스트 (${new Date().toLocaleTimeString()})`,
      },
    ]);
  };

  return (
    <div
      style={{
        position: "relative",
        minHeight: 360,
        background: "var(--color-surface-secondary)",
        padding: 24,
        fontFamily: "var(--font-family-korean)",
        color: "var(--color-on-surface-base)",
        borderRadius: 8,
        overflow: "hidden",
      }}
    >
      <button
        type="button"
        onClick={handleAdd}
        style={{
          padding: "8px 12px",
          border: "1px solid var(--color-border-surface)",
          borderRadius: 4,
          background: "var(--color-surface-base)",
          cursor: "pointer",
          fontFamily: "var(--font-family-korean)",
        }}
      >
        토스트 추가
      </button>
      <ToastViewport>
        {toasts.map((t) => (
          <Toast
            key={t.id}
            type={t.type}
            message={t.message}
            onClose={() => handleClose(t.id)}
          />
        ))}
      </ToastViewport>
    </div>
  );
}

export const Matrix: Story = {
  name: "Matrix",
  parameters: { layout: "padded" },
  render: (_args, ctx) => {
    const locale = ctx.globals && ctx.globals.locale === "en" ? "en" : "ko";
    return (
    <StoryDocsMatrixPage
      title="Toast"
      description={locale === "en"
        ? "Single-page review of four types · subText · link + close · long message · viewport · stack · auto-dismiss."
        : "4가지 타입·subText·링크+닫기·긴 메시지·뷰포트·스택·자동 닫힘을 한 페이지에서 확인합니다."}
      figmaNode="5307-14956"
    >
      <FigmaLinkCard
        nodeId="5307-14956"
        caption="Components / Toast — Type × Action 매트릭스 원본"
      />
      <section>
        <h4 style={{ margin: "0 0 12px", fontSize: 13, fontWeight: 600 }}>4 types</h4>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "100px 1fr",
            rowGap: 24,
            columnGap: 24,
            alignItems: "center",
          }}
        >
          {TYPES.map((t) => (
            <Fragment key={t}>
              <span style={{ fontSize: 12, color: "var(--color-on-surface-secondary)" }}>
                {TYPE_LABEL[t]}
              </span>
              <Toast type={t} message="메시지 영역입니다. max.w 400 이상은 줄바꿈처리" />
            </Fragment>
          ))}
        </div>
      </section>

      <section>
        <h4 style={{ margin: "0 0 12px", fontSize: 13, fontWeight: 600 }}>With subText</h4>
        <Toast
          type="confirm"
          message="메시지 영역입니다. max.w 400 이상은 줄바꿈처리"
          subText="Check the status in jobs on progress at the top."
        />
      </section>

      <section>
        <h4 style={{ margin: "0 0 12px", fontSize: 13, fontWeight: 600 }}>Link + close</h4>
        <LinkCloseDemo />
      </section>

      <section>
        <h4 style={{ margin: "0 0 12px", fontSize: 13, fontWeight: 600 }}>Long message</h4>
        <Toast
          type="warning"
          message="이 토스트 메시지는 매우 길어서 400px 최대 폭을 초과하므로 자동으로 줄바꿈 처리되어야 합니다. 디자인 스펙 · prompt 요구사항에 따라 word-break 와 overflow-wrap: anywhere 가 적용되어 영문 longWordWithNoSpacesShouldAlsoWrapCorrectly 역시 잘려서 표시됩니다."
          subText="subText 영역도 동일하게 줄바꿈됩니다. additionalStatusInformationAboutYourJobsOnProgress."
        />
      </section>

      <section>
        <h4 style={{ margin: "0 0 12px", fontSize: 13, fontWeight: 600 }}>
          ToastViewport — 단일 (레이아웃은 Matrix padded 기준 미리보기)
        </h4>
        <div
          style={{
            position: "relative",
            minHeight: 200,
            background: "var(--color-surface-secondary)",
            padding: 24,
            borderRadius: 8,
            color: "var(--color-on-surface-base)",
          }}
        >
          <p style={{ fontSize: 14, opacity: 0.7, margin: "0 0 12px" }}>
            실제 앱에서는 fullscreen 레이아웃으로 뷰포트를 페이지 루트에 두는 것을 권장합니다.
          </p>
          <ToastViewport>
            <Toast
              type="success"
              message="작업이 성공적으로 완료되었습니다."
              linkText="Link Text"
              onClose={() => undefined}
            />
          </ToastViewport>
        </div>
      </section>

      <section>
        <h4 style={{ margin: "0 0 12px", fontSize: 13, fontWeight: 600 }}>ToastViewport — stack</h4>
        <ViewportStackDemo />
      </section>

      <section>
        <h4 style={{ margin: "0 0 12px", fontSize: 13, fontWeight: 600 }}>Auto dismiss (3s)</h4>
        <AutoDismissDemo />
      </section>
    </StoryDocsMatrixPage>
    );
  },
};
