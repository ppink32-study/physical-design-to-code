"use client";

import { useState } from "react";

import { Button } from "@/components/button/button/button";
import { Badge } from "@/components/badge/badge";
import { ProjectCardA } from "@/components/card/projectcardA";
import { ProjectCardB } from "@/components/card/projectcardB";
import { SearchToggleGroup } from "@/components/button/search-toggle-item/search-toggle-group";
import { SearchToggleItem } from "@/components/button/search-toggle-item/search-toggle-item";
import { Input } from "@/components/Input/input";
import { Select } from "@/components/select/select";
import { SelectList } from "@/components/select/selectlist";
import { SelectItem } from "@/components/select/selectitem";
import { ContentsTitleMain } from "@/components/title/contentstitlemain";
import { Divider } from "@/components/divider/divider";

import styles from "./projectlist.module.css";

export type ProjectListTheme = "standard" | "focus";

export type ProjectListPageProps = {
  theme?: ProjectListTheme;
  onThemeChange?: (theme: ProjectListTheme) => void;
};

const ROBOT_IMAGES = [
  "/robot/Unitree G1.jpg",
  "/robot/Dexmate Vega.jpg",
  "/robot/Robotis AI Worker.jpg",
  "/robot/Unitree Go2.jpg",
];

const CARD_A_DATA = [
  { title: "Traffic_Sign_Dataset", description: "Collected from urban intersections", members: "8 members", imageSrc: ROBOT_IMAGES[0] },
  { title: "Autonomous_Drive_v2", description: "Highway lane detection dataset", members: "5 members", imageSrc: ROBOT_IMAGES[1] },
  { title: "Pedestrian_Detect", description: "Crosswalk & sidewalk footage", members: "12 members", imageSrc: ROBOT_IMAGES[2] },
  { title: "Night_Vision_Set", description: "Low-light camera recordings", members: "3 members", imageSrc: ROBOT_IMAGES[3] },
  { title: "Parking_Lot_Cam", description: "Multi-angle parking dataset", members: "7 members", imageSrc: ROBOT_IMAGES[1] },
  { title: "Highway_Drone_Set", description: "Top-down highway aerial footage", members: "11 members", imageSrc: ROBOT_IMAGES[2] },
  { title: "Tunnel_Vision_Cam", description: "Tunnel illumination dataset", members: "4 members", imageSrc: ROBOT_IMAGES[0] },
  { title: "Indoor_Robot_Lab", description: "Lab indoor robot trajectories", members: "9 members", imageSrc: ROBOT_IMAGES[3] },
  { title: "Warehouse_Forklift", description: "Warehouse logistics scenarios", members: "6 members", imageSrc: ROBOT_IMAGES[2] },
  { title: "Drone_Delivery_v1", description: "Drone delivery routes", members: "2 members", imageSrc: ROBOT_IMAGES[0] },
  { title: "Surgical_Robot_Set", description: "Robotic surgery sequences", members: "14 members", imageSrc: ROBOT_IMAGES[1] },
  { title: "Farm_Tractor_AI", description: "Autonomous farming dataset", members: "5 members", imageSrc: ROBOT_IMAGES[3] },
  { title: "Subway_Platform_Cam", description: "Subway crowd analytics", members: "10 members", imageSrc: ROBOT_IMAGES[2] },
  { title: "Construction_Site", description: "Heavy machinery scenes", members: "7 members", imageSrc: ROBOT_IMAGES[0] },
  { title: "School_Zone_Detect", description: "School zone speed monitoring", members: "3 members", imageSrc: ROBOT_IMAGES[1] },
];

const CARD_B_DATA = [
  { title: "Shared_Robot_Arm", description: "Shared by AI Research Lab", members: "4 members", imageSrc: ROBOT_IMAGES[2] },
  { title: "Cloud_Lidar_v3", description: "Shared by Autonomous Systems", members: "9 members", imageSrc: ROBOT_IMAGES[0] },
  { title: "Sensor_Fusion_Kit", description: "Shared by Hardware Team", members: "6 members", imageSrc: ROBOT_IMAGES[3] },
  { title: "Annotation_Pipeline", description: "Shared by Data Ops", members: "8 members", imageSrc: ROBOT_IMAGES[1] },
  { title: "Edge_Inference_Node", description: "Shared by Platform Team", members: "5 members", imageSrc: ROBOT_IMAGES[2] },
  { title: "Reward_Model_Suite", description: "Shared by RL Lab", members: "12 members", imageSrc: ROBOT_IMAGES[0] },
  { title: "Vision_Eval_Kit", description: "Shared by Vision Team", members: "7 members", imageSrc: ROBOT_IMAGES[3] },
  { title: "Speech_Pipeline", description: "Shared by Speech Team", members: "10 members", imageSrc: ROBOT_IMAGES[1] },
  { title: "Telemetry_Hub", description: "Shared by Observability", members: "3 members", imageSrc: ROBOT_IMAGES[2] },
  { title: "Multimodal_Bench", description: "Shared by ML Research", members: "16 members", imageSrc: ROBOT_IMAGES[3] },
  { title: "Robot_Sim_Set", description: "Shared by Simulation Team", members: "11 members", imageSrc: ROBOT_IMAGES[0] },
  { title: "Drone_Eval_Kit", description: "Shared by Aerial Team", members: "5 members", imageSrc: ROBOT_IMAGES[1] },
];

const CARDS_PER_ROW_A = 5;
const CARDS_PER_ROW_B = 3;
const INITIAL_VISIBLE_A = CARDS_PER_ROW_A; // 1 row
const INITIAL_VISIBLE_B = CARDS_PER_ROW_B * 3; // 3 rows = 9개

const SORT_OPTIONS = ["Recently Added", "Name", "Most Members"] as const;

export function ProjectListPage({ theme = "focus", onThemeChange }: ProjectListPageProps) {
  const isStandard = theme === "standard";
  const cardType = isStandard ? "brand" : "light";

  const [sortOpen, setSortOpen] = useState(false);
  const [sortValue, setSortValue] = useState<(typeof SORT_OPTIONS)[number]>("Recently Added");

  // Show More — 한 줄씩 노출 (A: 5개/줄, B: 1개/줄)
  const [visibleA, setVisibleA] = useState(INITIAL_VISIBLE_A);
  const [visibleB, setVisibleB] = useState(INITIAL_VISIBLE_B);

  const visibleCardsA = CARD_A_DATA.slice(0, visibleA);
  const visibleCardsB = CARD_B_DATA.slice(0, visibleB);
  const hasMoreA = visibleA < CARD_A_DATA.length;
  const hasMoreB = visibleB < CARD_B_DATA.length;

  return (
    <div className={styles.root}>
      {/* GNB — Figma 25:28159 */}
      <div
        className={styles.gnb}
        data-theme={isStandard ? "brand" : "light"}
      >
        <div className={styles.gnbInner}>
          {/* 로고 — 184px 고정 */}
          <div className={styles.gnbLogo}>
            <img
              src={isStandard ? "/Logo_dark.svg" : "/Logo_light.svg"}
              alt="PhysicalWorks Forge"
              height={22}
            />
          </div>

          {/* 네비게이션 — flex-1, gap-36px */}
          <nav className={styles.gnbNav}>
            <span className={`${styles.gnbNavItem} ${styles.gnbNavItemActive}`}>Home</span>
            <span className={styles.gnbNavItem}>Menu 1</span>
            <span className={styles.gnbNavItem}>Menu 1</span>
            <span className={styles.gnbNavItem}>Menu 1</span>
          </nav>

          {/* 우측: 아이콘 × 4 + 테마 토글 */}
          <div className={styles.gnbRight}>
            <button className={`${styles.gnbIconBtn} ${styles.gnbIconBtnFill}`} type="button" aria-label="알림">
              <span className={`${styles.gnbIcon} ${styles.gnbIconNoti}`} aria-hidden="true" />
              <span className={styles.gnbNotiBadge} aria-hidden="true" />
            </button>
            <button className={styles.gnbIconBtn} type="button" aria-label="프로필">
              <span className={`${styles.gnbIcon} ${styles.gnbIconUser}`} aria-hidden="true" />
            </button>
            <button className={styles.gnbIconBtn} type="button" aria-label="연결">
              <span className={`${styles.gnbIcon} ${styles.gnbIconConnection}`} aria-hidden="true" />
            </button>
            <button className={styles.gnbIconBtn} type="button" aria-label="설정">
              <span className={`${styles.gnbIcon} ${styles.gnbIconGear}`} aria-hidden="true" />
            </button>
            <SearchToggleGroup aria-label="테마 선택">
              <SearchToggleItem
                selected={isStandard}
                onClick={() => onThemeChange?.("standard")}
              >
                Standard
              </SearchToggleItem>
              <SearchToggleItem
                selected={!isStandard}
                onClick={() => onThemeChange?.("focus")}
              >
                Focus
              </SearchToggleItem>
            </SearchToggleGroup>
          </div>
        </div>
      </div>

      {/* Main Area */}
      <div className={isStandard ? styles.mainAreaStandard : styles.mainAreaFocus}>
        <div className={styles.contentArea}>

          {/* Header */}
          <div className={styles.header}>
            <div className={styles.headerLeft}>
              <h1 className={styles.headerH1}>My Project</h1>
              <div className={styles.headerBubble}>
                <span
                  className={styles.bubbleIcon}
                  aria-hidden="true"
                />
                <span className={styles.bubbleText}>
                  Browse and manage all generated assets in one place
                </span>
              </div>
            </div>
            <Button
              variant="secondary-outline"
              size="large"
              shape="square"
              leftIcon={
                <img src="/icon/Add.svg" alt="" width={16} height={16} />
              }
            >
              Create Project
            </Button>
          </div>

          {/* Contents — Section 1 / Divider / Section 2 (gap-5xl) */}
          <div className={isStandard ? styles.contentsStandard : styles.contentsFocus}>

            {/* ============= Section 1 ============= */}
            <section className={styles.contentSection}>

            {/* Filter Bar — Figma 25:28077 */}
            <div className={styles.filterBar}>
              {/* Search Input — 240px / 좌측 Search 아이콘만 / trailing 아이콘 제거 */}
              <Input
                size="medium"
                placeholder="Search"
                leadingIcon
                trailingIcon={false}
                style={{ width: 240, flexShrink: 0 }}
              />

              {/* 오른쪽: chip 영역 + sort */}
              <div className={styles.filterRight}>
                {/* chip placeholder (Figma 빈 공간 — 추후 필터 칩 영역) */}
                <div className={styles.filterChipSlot} />

                {/* Sort Select — 클릭 시 드롭다운 토글 (220px 고정) */}
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

            {/* Project Card A Grid — 한 줄씩 노출 */}
            <div className={styles.cardAGrid}>
              {visibleCardsA.map((card, i) => (
                <ProjectCardA
                  key={i}
                  type={cardType}
                  state="default"
                  imageSrc={card.imageSrc}
                  title={card.title}
                  description={card.description}
                  members={card.members}
                />
              ))}
            </div>

            {/* Show More A — 한 줄(5개) 추가, 다 보이면 숨김 */}
            {hasMoreA && (
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
                      Math.min(v + CARDS_PER_ROW_A, CARD_A_DATA.length),
                    )
                  }
                >
                  show more
                </Button>
              </div>
            )}

            </section>

            {/* Divider — Section 1 / Section 2 사이 */}
            <Divider orientation="horizontal" />

            {/* ============= Section 2 ============= */}
            <section className={styles.contentSection}>

            {/* Pending Invitation 타이틀 — ContentsTitleMain 컴포넌트 */}
            <ContentsTitleMain
              title="Pending Invitation"
              badge={
                <Badge variant="solid" color="purple" size="lg" shape="round">
                  {CARD_B_DATA.length}
                </Badge>
              }
            />

            {/* Project Card B List — 한 줄(=1개)씩 노출 */}
            <div className={styles.cardBList}>
              {visibleCardsB.map((card, i) => (
                <ProjectCardB
                  key={i}
                  state="default"
                  imageSrc={card.imageSrc}
                  title={card.title}
                  description={card.description}
                  members={card.members}
                />
              ))}
            </div>

            {/* Show More B — 한 줄(1개) 추가, 다 보이면 숨김 */}
            {hasMoreB && (
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
                      Math.min(v + CARDS_PER_ROW_B, CARD_B_DATA.length),
                    )
                  }
                >
                  show more
                </Button>
              </div>
            )}

            </section>

          </div>
        </div>
      </div>
    </div>
  );
}

export default ProjectListPage;
