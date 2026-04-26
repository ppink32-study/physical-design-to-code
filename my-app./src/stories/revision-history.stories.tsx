import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import type { CSSProperties } from "react";

import {
  StoryDocsPage,
  StoryDocsParagraph,
  StoryDocsSection,
  StoryDocsNote,
} from "@/stories/story-docs-shell";

/**
 * Storybook `meta.component` 슬롯용 — 실제 UI는 Overview 스토리 render 에서 구성합니다.
 */
function RevisionHistoryStub() {
  return null;
}

/** 한 줄 기록 — `REVISION_HISTORY_ENTRIES` 에 추가하면 목차·본문이 자동 렌더됩니다. */
type RevisionHistoryEntry = {
  /** 목차·섹션 앵커 (`#id`). storyHref 가 있으면 목차는 외부 링크 우선 */
  id: string;
  date: string;
  summary: string;
  /** 다른 스토리로 이동: `?path=/story/components-divider--guideline` 형태 */
  storyHref?: string;
};

/**
 * 수정 이력 데이터.
 * 내용 추가는 요청 시에만 반영합니다 — 비워 두면 목차·기록 섹션은 안내 문구만 표시됩니다.
 */
const REVISION_HISTORY_ENTRIES: RevisionHistoryEntry[] = [];

const linkStyle: CSSProperties = {
  fontSize: 15,
  fontWeight: 600,
  color: "var(--context-foreground-primary-on-primary-hover)",
  textDecoration: "none",
};

const sectionAnchorStyle: CSSProperties = {
  scrollMarginTop: 24,
};

const meta: Meta<typeof RevisionHistoryStub> = {
  title: "00 · 수정 히스토리",
  component: RevisionHistoryStub,
  parameters: {
    layout: "padded",
    docs: { disable: true },
  },
};

export default meta;
type Story = StoryObj<typeof RevisionHistoryStub>;

function RevisionHistoryBody() {
  const entries = REVISION_HISTORY_ENTRIES;

  return (
    <>
      <StoryDocsSection
        title="목차"
        description="날짜·수정 항목을 누르면 아래 해당 위치(앵커)로 이동합니다. 다른 스토리로 바로 갈 때는 항목에 storyHref 를 넣습니다."
      >
        {entries.length === 0 ? (
          <StoryDocsNote>기록된 항목이 없습니다. 내용 추가를 요청해 주시면 반영합니다.</StoryDocsNote>
        ) : (
          <nav aria-label="수정 히스토리 목차">
            <ul
              style={{
                listStyle: "none",
                padding: 0,
                margin: 0,
                display: "flex",
                flexDirection: "column",
                gap: 10,
              }}
            >
              {entries.map((e) => {
                const href = e.storyHref ?? `#${e.id}`;
                const isHash = href.startsWith("#");
                return (
                  <li key={e.id}>
                    <a
                      href={href}
                      {...(isHash ? {} : { target: "_top", rel: "noreferrer" })}
                      style={linkStyle}
                    >
                      {e.date} — {e.summary}
                    </a>
                  </li>
                );
              })}
            </ul>
          </nav>
        )}
      </StoryDocsSection>

      <StoryDocsSection title="기록" description="날짜별 상세.">
        {entries.length === 0 ? (
          <StoryDocsNote>항목이 없으면 이 영역은 비어 있습니다.</StoryDocsNote>
        ) : (
          entries.map((e) => (
            <section key={e.id} id={e.id} style={sectionAnchorStyle}>
              <StoryDocsParagraph>
                <strong>{e.date}</strong> — {e.summary}
              </StoryDocsParagraph>
            </section>
          ))
        )}
      </StoryDocsSection>
    </>
  );
}

export const Overview: Story = {
  name: "Overview",
  parameters: {
    controls: { hideNoControlsWarning: true, disable: true },
    actions: { disable: true },
  },
  render: () => (
    <StoryDocsPage
      eyebrow="Design System"
      title="수정 히스토리"
      description="디자인·문서·스토리북 변경을 날짜와 항목으로 남깁니다. 목차에서 앵커로 이동하거나, 항목에 지정한 링크로 다른 스토리를 열 수 있습니다."
    >
      <RevisionHistoryBody />
    </StoryDocsPage>
  ),
};
