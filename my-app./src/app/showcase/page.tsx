import type { Metadata } from "next";

import { ReviewToolbar } from "./_components/ReviewToolbar";
import {
  BadgeSection,
  ButtonSection,
  CheckboxSection,
  ChipsSection,
  DatePickerSection,
  DividerSection,
  EmptySection,
  FormSection,
  InputSection,
  LabelSection,
  LoaderSection,
  NavSection,
  PaginationSection,
  PlaybookBarSection,
  RadioSection,
  ScrollSection,
  SelectSection,
  TableSection,
  TabSection,
  TitleSection,
  ToggleSection,
  TooltipSection,
} from "./specs";
import styles from "./showcase.module.css";

export const metadata: Metadata = {
  title: "Showcase · 디자인 검수",
  description:
    "src/components 안의 모든 컴포넌트를 한 페이지에서 매트릭스 형태로 보여주는 디자인 검수용 화면.",
};

/* ----------------------------------------------------------------
 *  섹션 메타. 좌측 트리 구성 + 본문 렌더링 순서를 단일 소스로 관리
 * -------------------------------------------------------------- */

type SectionDef = {
  id: string;
  name: string;
  Render: React.ComponentType;
};

type Group = {
  category: string;
  sections: SectionDef[];
};

const GROUPS: Group[] = [
  {
    category: "Basics",
    sections: [
      { id: "button", name: "Button", Render: ButtonSection },
      { id: "badge", name: "Badge", Render: BadgeSection },
      { id: "divider", name: "Divider", Render: DividerSection },
      { id: "label", name: "Label", Render: LabelSection },
    ],
  },
  {
    category: "Form Inputs",
    sections: [
      { id: "input", name: "Input · TextArea", Render: InputSection },
      { id: "checkbox", name: "Checkbox", Render: CheckboxSection },
      { id: "radio", name: "Radio", Render: RadioSection },
      { id: "toggle", name: "Toggle", Render: ToggleSection },
      { id: "select", name: "Select", Render: SelectSection },
      { id: "datepicker", name: "DatePicker", Render: DatePickerSection },
      { id: "form", name: "Form", Render: FormSection },
    ],
  },
  {
    category: "Selection",
    sections: [
      { id: "chips", name: "Chips", Render: ChipsSection },
      { id: "tab", name: "Tab", Render: TabSection },
    ],
  },
  {
    category: "Data Display",
    sections: [
      { id: "table", name: "Table", Render: TableSection },
      { id: "pagination", name: "Pagination", Render: PaginationSection },
    ],
  },
  {
    category: "Layout",
    sections: [
      { id: "title", name: "Title", Render: TitleSection },
      { id: "empty", name: "Empty", Render: EmptySection },
      { id: "scroll", name: "Scroll", Render: ScrollSection },
      { id: "loader", name: "Loader", Render: LoaderSection },
      { id: "tooltip", name: "Tooltip", Render: TooltipSection },
      { id: "nav", name: "GNB", Render: NavSection },
    ],
  },
  {
    category: "Media",
    sections: [
      {
        id: "playbookcontrolbar",
        name: "Playback Control Bar",
        Render: PlaybookBarSection,
      },
    ],
  },
];

const TOTAL_SECTIONS = GROUPS.reduce((sum, g) => sum + g.sections.length, 0);

export default function ShowcasePage() {
  return (
    <div id="review-root" className={styles.shell}>
      {/* ───────── Left rail ───────── */}
      <aside className={styles.rail} aria-label="Components">
        <p className={styles.railTitle}>Components</p>
        {GROUPS.map((group) => (
          <div key={group.category} className={styles.railGroup}>
            <div className={styles.railGroupName}>{group.category}</div>
            <ul className={styles.railList}>
              {group.sections.map((s) => (
                <li key={s.id}>
                  <a href={`#${s.id}`} className={styles.railLink}>
                    {s.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </aside>

      {/* ───────── Main ───────── */}
      <main className={styles.main}>
        <header className={styles.head}>
          <span className={styles.eyebrow}>Design Review · Showcase</span>
          <h1 className={styles.title}>Component Canvas</h1>
          <p className={styles.desc}>
            모든 컴포넌트의 variant · state · color 조합을 매트릭스로 한 화면에
            모았습니다. 상단의 Canvas 옵션으로 배경을 바꿔 대비를 확인하고, GNB
            테마 토글로 light / dark 검수가 가능합니다.
          </p>
          <div className={styles.meta}>
            <span>
              <strong>{TOTAL_SECTIONS}</strong> components
            </span>
            <span>·</span>
            <span>
              <strong>{GROUPS.length}</strong> categories
            </span>
            <span>·</span>
            <span>좌측 트리에서 점프 / 인쇄·PDF 친화 레이아웃</span>
          </div>
        </header>

        <ReviewToolbar />

        {GROUPS.map((group) =>
          group.sections.map(({ id, Render }) => <Render key={id} />)
        )}
      </main>
    </div>
  );
}
