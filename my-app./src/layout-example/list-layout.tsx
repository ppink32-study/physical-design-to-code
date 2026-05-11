"use client";

/**
 * ListLayoutPage — Layout Example / List Layout
 *
 * 구조 (Foundation/Layout 의 List 타입 기준)
 *   1) GNB                          : 1920 × 56                          (Figma 52:86004)
 *   2) Detail Page Header Area      : height 68, padding 0 240 12 240    (Figma 52:86140)
 *   3) Main Contents Area           : padding 0 240 24 240               (Figma 52:86142)
 *      ┗ Step Panel (bg white, rounded 20, padding 24, gap 40)
 *         ┗ Section 1: Filter + ProjectCardA × 5 + show more   (Figma 52:86144)
 *         ┗ Divider                                            (Figma 52:86161)
 *         ┗ Section 2: Pending Invitation + ProjectCardB × 6   (Figma 58:74958)
 *
 * 모든 컴포넌트는 기존 components/* 만 사용.
 * 반응형은 clamp() 로 좌우 여백 fluid (240↔24), 콘텐츠는 viewport-48 까지 축소.
 */

import { useState } from "react";
import type { CSSProperties, ReactNode } from "react";

import { Button } from "@/components/button/button/button";
import { ProjectCardA } from "@/components/card/projectcardA";
import { ProjectCardB } from "@/components/card/projectcardB";
import { ContentsTitleMain } from "@/components/title/contentstitlemain";
import { Divider } from "@/components/divider/divider";
import { Empty } from "@/components/empty/empty";
import { Input } from "@/components/Input/input";
import { PageTitle } from "@/components/title/pagetitle";
import { ScrollArea } from "@/components/scroll/scroll";
import { Select } from "@/components/select/select";
import { SelectItem } from "@/components/select/selectitem";
import { SelectList } from "@/components/select/selectlist";

import { PageGnb, type PageGnbTheme } from "./page-gnb";
import styles from "./list-layout.module.css";

/* =================================================================
 * Data
 * =============================================================== */
const ROBOT_IMAGES = [
  "/robot/Unitree G1.jpg",
  "/robot/Dexmate Vega.jpg",
  "/robot/Robotis AI Worker.jpg",
  "/robot/Unitree Go2.jpg",
];

type ProjectAItem = {
  title: string;
  description: string;
  members: string;
  imageSrc: string;
  /** Figma 두 번째 카드처럼 mint 외곽선이 들어가는 강조 상태 */
  emphasized?: boolean;
};

const CARD_A_DATA: ProjectAItem[] = [
  { title: "Urban Navigation Pilot", description: "City-scale routing datasets and evaluation harnesses.", members: "8 members", imageSrc: ROBOT_IMAGES[0] },
  { title: "Teleop Fine Manipulation", description: "Dexterous tool-use episodes with force-torque traces.", members: "8 members", imageSrc: ROBOT_IMAGES[1] },
  { title: "Warehouse Pick v2", description: "Pick-place episodes with failure labels for policy learning.", members: "8 members", imageSrc: ROBOT_IMAGES[2] },
  { title: "Night Drive Corpus", description: "Low-light highway logs with synchronized lidar.", members: "8 members", imageSrc: ROBOT_IMAGES[3] },
  { title: "Dock-to-Dock Logistics", description: "Multi-agent scheduling under stochastic dwell times.", members: "8 members", imageSrc: ROBOT_IMAGES[0] },
  { title: "Highway Drone Set", description: "Top-down aerial highway footage.", members: "11 members", imageSrc: ROBOT_IMAGES[1] },
  { title: "Subway Platform Cam", description: "Subway crowd analytics dataset.", members: "10 members", imageSrc: ROBOT_IMAGES[2] },
  { title: "Construction Site", description: "Heavy machinery scenes for detection models.", members: "7 members", imageSrc: ROBOT_IMAGES[3] },
  { title: "Indoor Robot Lab", description: "Lab indoor trajectories and gripper logs.", members: "9 members", imageSrc: ROBOT_IMAGES[0] },
  { title: "Drone Delivery v1", description: "Drone delivery route corpus.", members: "2 members", imageSrc: ROBOT_IMAGES[1] },
];

type ProjectBItem = {
  title: string;
  description: string;
  members: string;
  imageSrc: string;
};

const CARD_B_DATA: ProjectBItem[] = [
  { title: "Traffic_Sign_Dataset", description: "Stakeholder review for next checkpoint drop.", members: "16 members", imageSrc: ROBOT_IMAGES[2] },
  { title: "Sim Lab Rollouts", description: "Invitation to review synthetic rollout bundles.", members: "16 members", imageSrc: ROBOT_IMAGES[0] },
  { title: "Edge Deploy Hardening", description: "Help validate OTA bundles across mixed robot fleets.", members: "16 members", imageSrc: ROBOT_IMAGES[3] },
  { title: "Safety Review Sprint", description: "Cross-team review for updated hazard taxonomy.", members: "16 members", imageSrc: ROBOT_IMAGES[1] },
  { title: "Customer Pilot — Site A", description: "Join the pilot workspace for on-site data capture.", members: "16 members", imageSrc: ROBOT_IMAGES[2] },
  { title: "Traffic_Sign_Dataset", description: "Collected from urban intersections", members: "16 members", imageSrc: ROBOT_IMAGES[0] },
  { title: "Cloud Lidar v3", description: "Shared by Autonomous Systems", members: "9 members", imageSrc: ROBOT_IMAGES[1] },
  { title: "Annotation Pipeline", description: "Shared by Data Ops", members: "8 members", imageSrc: ROBOT_IMAGES[3] },
];

/* =================================================================
 * Sort options — 사용자 지정 6개
 * =============================================================== */
const SORT_OPTIONS = [
  "Recently Added",
  "Oldest first",
  "Name (A-Z)",
  "Name (Z-A)",
  "Members (most)",
  "Members (least)",
] as const;
type SortOption = (typeof SORT_OPTIONS)[number];

function membersToNumber(s: string): number {
  const m = s.match(/\d+/);
  return m ? parseInt(m[0], 10) : 0;
}

function applySort<T extends { title: string; members: string }>(
  items: T[],
  sort: SortOption,
): T[] {
  const copy = [...items];
  switch (sort) {
    case "Oldest first":
      return copy.reverse();
    case "Name (A-Z)":
      return copy.sort((a, b) => a.title.localeCompare(b.title));
    case "Name (Z-A)":
      return copy.sort((a, b) => b.title.localeCompare(a.title));
    case "Members (most)":
      return copy.sort((a, b) => membersToNumber(b.members) - membersToNumber(a.members));
    case "Members (least)":
      return copy.sort((a, b) => membersToNumber(a.members) - membersToNumber(b.members));
    case "Recently Added":
    default:
      return copy;
  }
}

/* =================================================================
 * Show-more constants
 * =============================================================== */
const CARDS_PER_ROW_A = 5;
const CARDS_PER_ROW_B = 2;
const INITIAL_A = CARDS_PER_ROW_A; // 1행 = 5개
const INITIAL_B = CARDS_PER_ROW_B * 3; // 3행 = 6개

/* =================================================================
 * Public API
 * =============================================================== */
export type ListLayoutPageProps = {
  /** GNB 슬롯 (미지정 시 기본 PageGnb) */
  gnb?: ReactNode;
  /** Detail Page - Header Area 슬롯 (미지정 시 My Project + Create Project) */
  header?: ReactNode;
  /** Main Contents 영역 children (미지정 시 기본 Section 1/2 구성) */
  children?: ReactNode;
  /** controlled theme (미지정 시 내부 state) */
  theme?: PageGnbTheme;
  onThemeChange?: (next: PageGnbTheme) => void;
  className?: string;
  style?: CSSProperties;
};

export function ListLayoutPage({
  gnb,
  header,
  children,
  theme: themeProp,
  onThemeChange,
  className,
  style,
}: ListLayoutPageProps) {
  const rootClass = [styles.root, className].filter(Boolean).join(" ");

  /* ---- Theme (Standard / Focus) — background 분기 + PageGnb 동기화 ---- */
  const [themeState, setThemeState] = useState<PageGnbTheme>("standard");
  const theme = themeProp ?? themeState;
  const setTheme = (next: PageGnbTheme) => {
    if (themeProp === undefined) setThemeState(next);
    onThemeChange?.(next);
  };

  /* ---- Sort 드롭다운 ---- */
  const [sortOpen, setSortOpen] = useState(false);
  const [sortValue, setSortValue] = useState<SortOption>("Recently Added");

  /* ---- 검색 — Project / Pending Invitation 양쪽 동시 필터 ---- */
  const [searchQuery, setSearchQuery] = useState("");
  const normalizedQuery = searchQuery.trim().toLowerCase();
  const matchesQuery = (item: { title: string; description: string }) => {
    if (!normalizedQuery) return true;
    return (
      item.title.toLowerCase().includes(normalizedQuery) ||
      item.description.toLowerCase().includes(normalizedQuery)
    );
  };

  /* ---- Show more ---- */
  const [visibleA, setVisibleA] = useState(INITIAL_A);
  const [visibleB, setVisibleB] = useState(INITIAL_B);

  const filteredA = CARD_A_DATA.filter(matchesQuery);
  const sortedA = applySort(filteredA, sortValue);
  const visibleCardsA = sortedA.slice(0, visibleA);
  const hasMoreA = visibleA < sortedA.length;
  const isEmptyA = sortedA.length === 0;

  const filteredB = CARD_B_DATA.filter(matchesQuery);
  const visibleCardsB = filteredB.slice(0, visibleB);
  const hasMoreB = visibleB < filteredB.length;
  const isEmptyB = filteredB.length === 0;

  return (
    <div className={rootClass} style={style} data-theme={theme}>
      {/* 1) GNB — Figma 52:86004 (스크롤 영역 밖, 항상 상단 고정) */}
      {gnb ?? <PageGnb active="project" theme={theme} onThemeChange={setTheme} />}

      {/* 2) GNB 아래 — 실제 스크롤은 ScrollArea(기존 components/scroll) 가 담당 */}
      <ScrollArea className={styles.scrollArea} orientation="vertical">
      <div className={styles.contents}>
        {/* Detail Page - Header Area — Figma 52:86140 */}
        <div className={styles.headerArea}>
          {header ?? (
            <PageTitle
              type="2d"
              title="My Project"
              hint="Manage and monitor your robot foundation project."
              actions={
                <Button
                  variant="secondary-outline"
                  size="large"
                  shape="square"
                  leftIcon={
                    <img src="/icon/Add.svg" alt="" width={20} height={20} />
                  }
                >
                  Create Project
                </Button>
              }
            />
          )}
        </div>

        {/* Main Contents Area — Figma 52:86142 */}
        <div className={styles.mainContents}>
          {children ?? (
            <div className={styles.stepPanel}>
              {/* ============= Section 1 — Figma 52:86144 ============= */}
              <section className={styles.section}>
                {/* Filter Row — Search Input + Divider + Sort Select */}
                <div className={styles.filterRow}>
                  <Input
                    size="medium"
                    placeholder="Search"
                    leadingIcon
                    trailingIcon={false}
                    value={searchQuery}
                    onChange={(e) => {
                      setSearchQuery(e.target.value);
                      setVisibleA(INITIAL_A);
                      setVisibleB(INITIAL_B);
                    }}
                    style={{ width: 240, flexShrink: 0 }}
                  />

                  <div className={styles.filterRight}>
                    <div className={styles.sortWrap}>
                      <Select
                        type="label"
                        label="Sort by"
                        value={sortValue}
                        size="medium"
                        open={sortOpen}
                        onClick={() => setSortOpen((o) => !o)}
                        onBlur={() => setSortOpen(false)}
                        style={{ width: 220 }}
                      />
                      {sortOpen && (
                        <div className={styles.sortPopover}>
                          <SelectList style={{ width: 220 }}>
                            {SORT_OPTIONS.map((opt) => (
                              <SelectItem
                                key={opt}
                                selected={opt === sortValue}
                                onMouseDown={(e) => {
                                  // Select onBlur 보다 먼저 발화돼야 클릭 누락 방지
                                  e.preventDefault();
                                  setSortValue(opt);
                                  setSortOpen(false);
                                }}
                              >
                                {opt}
                              </SelectItem>
                            ))}
                          </SelectList>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Card Grid + Show More — Figma 52:86152
                    검색/정렬 결과 없으면 Empty Box (Figma 62:75761) */}
                <div className={styles.cardAreaWrap}>
                  {isEmptyA ? (
                    <div className={styles.emptyBox}>
                      <Empty
                        size="medium"
                        icon="data"
                        description="No projects match your search or sort."
                      />
                    </div>
                  ) : (
                    <div className={styles.cardAGrid}>
                      {visibleCardsA.map((card, i) => (
                        <ProjectCardA
                          key={`${card.title}-${i}`}
                          type={theme === "standard" ? "brand" : "light"}
                          state={card.emphasized ? "hover" : "default"}
                          imageSrc={card.imageSrc}
                          title={card.title}
                          description={card.description}
                          members={card.members}
                        />
                      ))}
                    </div>
                  )}

                  {!isEmptyA && hasMoreA && (
                    <div className={styles.showMoreRow}>
                      <Button
                        variant="secondary-outline"
                        size="medium"
                        shape="square"
                        leftIcon={
                          <img src="/icon/ChevronDown.svg" alt="" width={16} height={16} />
                        }
                        onClick={() =>
                          setVisibleA((v) =>
                            Math.min(v + CARDS_PER_ROW_A, sortedA.length),
                          )
                        }
                      >
                        show more
                      </Button>
                    </div>
                  )}
                </div>
              </section>

              {/* ============= Divider — Figma 52:86161 ============= */}
              <Divider orientation="horizontal" />

              {/* ============= Section 2 — Figma 58:74958 ============= */}
              <section className={styles.section}>
                {/* Title — Figma 52:86164 */}
                <ContentsTitleMain title="Pending Invitation" />

                {/* Card Grid + Show More — Figma 58:74959
                    검색 결과 없으면 Empty Box (Figma 62:75761) */}
                <div className={styles.cardAreaWrap}>
                  {isEmptyB ? (
                    <div className={styles.emptyBox}>
                      <Empty
                        size="medium"
                        icon="data"
                        description="No projects match your search or sort."
                      />
                    </div>
                  ) : (
                    <div className={styles.cardBGrid}>
                      {visibleCardsB.map((card, i) => (
                        <ProjectCardB
                          key={`${card.title}-${i}`}
                          state="default"
                          imageSrc={card.imageSrc}
                          title={card.title}
                          description={card.description}
                          members={card.members}
                        />
                      ))}
                    </div>
                  )}

                  {!isEmptyB && hasMoreB && (
                    <div className={styles.showMoreRow}>
                      <Button
                        variant="secondary-outline"
                        size="medium"
                        shape="square"
                        leftIcon={
                          <img src="/icon/ChevronDown.svg" alt="" width={16} height={16} />
                        }
                        onClick={() =>
                          setVisibleB((v) =>
                            Math.min(v + CARDS_PER_ROW_B, filteredB.length),
                          )
                        }
                      >
                        show more
                      </Button>
                    </div>
                  )}
                </div>
              </section>
            </div>
          )}
        </div>
      </div>
      </ScrollArea>
    </div>
  );
}

export default ListLayoutPage;
