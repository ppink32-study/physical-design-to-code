"use client";

import type { CSSProperties, ReactNode } from "react";

import {
  Button,
  type ButtonForceState,
  type ButtonSize,
  type ButtonVariant,
} from "@/components/button/button";
import { DemoSection, demoStyles as s } from "../demo-block";
import m from "./button-demo.module.css";

/* =================================================================
 *  Mask-icon helper  —  currentColor 상속
 * =============================================================== */
function MaskIcon({ src, label }: { src: string; label?: string }) {
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
  return <span role={label ? "img" : undefined} aria-label={label} style={style} />;
}

const IconDownload = () => <MaskIcon src="/icon/Download.svg" />;
const IconChevronRight = () => <MaskIcon src="/icon/ChevronRight.svg" />;
const IconConfig = () => <MaskIcon src="/icon/Config.svg" />;

/* =================================================================
 *  Data tables (공통)
 * =============================================================== */
type VariantRow = {
  variant: ButtonVariant;
  background?: "dark" | "light";
};

const VARIANT_ROWS: VariantRow[] = [
  { variant: "primary-solid" },
  { variant: "primary-outline" },
  { variant: "primary-ghost" },
  { variant: "secondary-solid" },
  { variant: "secondary-outline" },
  { variant: "secondary-outline-white-invert", background: "dark" },
  { variant: "secondary-outline-dark-invert", background: "light" },
  { variant: "secondary-ghost" },
  { variant: "gray" },
];

type StateCol = { label: string; force: ButtonForceState; disabled?: boolean };

const STATE_COLS: StateCol[] = [
  { label: "Default", force: "default" },
  { label: "Hover", force: "hover" },
  { label: "Disabled", force: "disable", disabled: true },
];

function cellClass(bg?: "dark" | "light") {
  if (bg === "dark") return `${m.cell} ${m.cellOnDark}`;
  if (bg === "light") return `${m.cell} ${m.cellOnLight}`;
  return m.cell;
}

const VARIANT_USE_CASES: Array<{
  variant: ButtonVariant;
  use: string;
  note?: string;
}> = [
  { variant: "primary-solid", use: "페이지 · 모달의 대표 CTA (저장, 확인, 제출)", note: "한 화면 1개 원칙" },
  { variant: "primary-outline", use: "primary 와 같은 의미지만 비중을 낮춘 보조 CTA" },
  { variant: "primary-ghost", use: "헤더 · 툴바처럼 배경이 있는 영역의 primary 액션" },
  { variant: "secondary-solid", use: "위험/전환 의도가 없는 일반 보조 액션" },
  { variant: "secondary-outline", use: "가장 일반적인 보조 액션 — 취소 · 닫기 · 이전", note: "모달 푸터 좌측 기본" },
  { variant: "secondary-outline-white-invert", use: "이미지 · 비디오 등 어두운 배경 위 반투명 흰 버튼" },
  { variant: "secondary-outline-dark-invert", use: "어두운 테마 위에 얹는 어두운 반투명 버튼" },
  { variant: "secondary-ghost", use: "인라인 텍스트성 액션 (더보기, 접기)" },
  { variant: "gray", use: "필터 · 카테고리 · 태그 계열 선택성 액션" },
];

type SizeSpec = {
  size: ButtonSize;
  label: string;
  height: number;
  paddingX: number;
  fontSize: number;
  lineHeight: number;
  iconSize: number;
  gap: number;
  radius: string;
  useCase: string;
};

const SIZE_SPECS: SizeSpec[] = [
  { size: "small", label: "Small", height: 24, paddingX: 6, fontSize: 12, lineHeight: 16, iconSize: 16, gap: 2, radius: "4px", useCase: "테이블 행 · 칩 · 인라인" },
  { size: "medium", label: "Medium", height: 32, paddingX: 12, fontSize: 14, lineHeight: 20, iconSize: 16, gap: 2, radius: "6px", useCase: "폼 인풋과 같은 높이" },
  { size: "large", label: "Large (default)", height: 40, paddingX: 16, fontSize: 16, lineHeight: 22, iconSize: 20, gap: 6, radius: "8px", useCase: "대부분의 페이지 CTA · 모달 푸터" },
  { size: "xlarge", label: "XLarge", height: 48, paddingX: 16, fontSize: 16, lineHeight: 22, iconSize: 20, gap: 6, radius: "8px", useCase: "온보딩 · 마케팅 · 빈 상태" },
];

type StateSpec = { name: string; trigger: string; impl: string; notes: string };

const STATE_SPECS: StateSpec[] = [
  { name: "Default", trigger: "기본", impl: "—", notes: "기본 배경 · 텍스트 · 테두리 토큰" },
  { name: "Hover", trigger: "커서 오버", impl: 'CSS :hover · [data-force-state="hover"]', notes: "스토리/데모에서 forceState 로 강제 시각화 가능" },
  { name: "Active", trigger: "클릭 중 (pressed)", impl: "현재 별도 스타일 없음 — Hover 와 동일", notes: "필요 시 :active 토큰을 추후 정의 예정" },
  { name: "Focus", trigger: "키보드 Tab", impl: "outline: none (커스텀 ring 미정의)", notes: "추후 토큰 기반 focus-ring 정의 예정" },
  { name: "Disabled", trigger: "비활성", impl: ':disabled · [aria-disabled=true] · [data-force-state="disable"]', notes: "disabled prop 또는 aria-disabled 모두 동일 처리" },
];

type AnatomyCard = { title: string; desc: string; node: ReactNode };

const ANATOMY_CARDS: AnatomyCard[] = [
  { title: "Text only", desc: "가장 기본 형태. 라벨은 1~2단어 동사형으로.", node: <Button>저장</Button> },
  {
    title: "Left icon + Text",
    desc: "아이콘이 동작의 대상(생성 · 다운로드)을 암시. 가장 자주 쓰이는 조합.",
    node: (
      <Button leftIcon={<IconDownload />} variant="secondary-outline">
        다운로드
      </Button>
    ),
  },
  {
    title: "Text + Right icon",
    desc: "진행/이동의 방향성 표현 (다음 · 자세히). 좌우 동시 사용은 지양.",
    node: <Button rightIcon={<IconChevronRight />}>다음</Button>,
  },
  {
    title: "Icon only",
    desc: "라벨 없이 아이콘만. 스크린리더용 이름은 aria-label 로 전달합니다.",
    node: (
      <Button
        iconOnly
        aria-label="설정"
        variant="secondary-outline"
        leftIcon={<IconConfig />}
      />
    ),
  },
];

function variantBackground(variant: ButtonVariant): "dark" | "light" | undefined {
  return VARIANT_ROWS.find((r) => r.variant === variant)?.background;
}

/* =================================================================
 *  Overview (단일 페이지)
 * =============================================================== */
function OverviewPanel() {
  return (
    <>
      <DemoSection
        title="Variants 개요"
        description="9종 variant 의 우선순위·맥락을 한눈에 보고, 아래 매트릭스에서 default · hover · disabled 를 확인합니다."
      >
        <div className={m.variantOverview}>
          {VARIANT_USE_CASES.map(({ variant, use, note }) => {
            const bg = variantBackground(variant);
            const stageClass =
              bg === "dark"
                ? `${m.variantStage} ${m.variantStageOnDark}`
                : bg === "light"
                  ? `${m.variantStage} ${m.variantStageOnLight}`
                  : m.variantStage;
            return (
              <div key={variant} className={m.variantCard}>
                <div className={stageClass}>
                  <Button variant={variant}>Button</Button>
                </div>
                <div className={m.variantTitle}>{variant}</div>
                <div className={m.variantDesc}>{use}</div>
                {note ? <div className={m.variantNote}>{note}</div> : null}
              </div>
            );
          })}
        </div>
      </DemoSection>

      <DemoSection
        title="1. Variants"
        description="Figma variant 9종 × default / hover / disabled. invert 계열은 대비 배경 위에서 렌더링됩니다."
      >
        <div className={m.matrix}>
          <div className={m.headerCell} />
          {STATE_COLS.map((st) => (
            <div key={st.label} className={m.headerCell}>
              {st.label}
            </div>
          ))}

          {VARIANT_ROWS.map(({ variant, background }) => (
            <div key={variant} style={{ display: "contents" }}>
              <div className={m.rowLabel}>{variant}</div>
              {STATE_COLS.map((st) => (
                <div key={st.label} className={cellClass(background)}>
                  <Button
                    variant={variant}
                    forceState={st.force}
                    disabled={st.disabled}
                  >
                    Button
                  </Button>
                </div>
              ))}
            </div>
          ))}
        </div>

        <div style={{ marginTop: 20 }}>
          <table className={m.table}>
            <thead>
              <tr>
                <th style={{ width: "30%" }}>Variant</th>
                <th>사용 시점</th>
                <th style={{ width: "25%" }}>비고</th>
              </tr>
            </thead>
            <tbody>
              {VARIANT_USE_CASES.map((row) => (
                <tr key={row.variant}>
                  <td><code>{row.variant}</code></td>
                  <td>{row.use}</td>
                  <td className={m.muted}>{row.note ?? "—"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </DemoSection>

      <DemoSection
        title="2. Sizes"
        description="small · medium · large(기본) · xlarge 4단계. size 별 높이 · 패딩 · 아이콘 · gap 이 자동 결정됩니다."
      >
        <div className={s.row} style={{ gap: 12, alignItems: "flex-end" }}>
          <Button size="small">Small</Button>
          <Button size="medium">Medium</Button>
          <Button size="large">Large</Button>
          <Button size="xlarge">XLarge</Button>
        </div>

        <div style={{ marginTop: 20 }}>
          <table className={m.table}>
            <thead>
              <tr>
                <th>Size</th>
                <th className={m.numCol}>Height</th>
                <th className={m.numCol}>Padding-X</th>
                <th className={m.numCol}>Font</th>
                <th className={m.numCol}>Line-H</th>
                <th className={m.numCol}>Icon</th>
                <th className={m.numCol}>Gap</th>
                <th className={m.numCol}>Radius</th>
                <th>사용 시점</th>
              </tr>
            </thead>
            <tbody>
              {SIZE_SPECS.map((sp) => (
                <tr key={sp.size}>
                  <td><code>{sp.size}</code></td>
                  <td className={`${m.numCol} ${m.mono}`}>{sp.height}</td>
                  <td className={`${m.numCol} ${m.mono}`}>{sp.paddingX}</td>
                  <td className={`${m.numCol} ${m.mono}`}>{sp.fontSize}</td>
                  <td className={`${m.numCol} ${m.mono}`}>{sp.lineHeight}</td>
                  <td className={`${m.numCol} ${m.mono}`}>{sp.iconSize}</td>
                  <td className={`${m.numCol} ${m.mono}`}>{sp.gap}</td>
                  <td className={`${m.numCol} ${m.mono}`}>{sp.radius}</td>
                  <td>{sp.useCase}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </DemoSection>

      <DemoSection
        title="Shape"
        description="square(기본) · round. round 는 primary/secondary solid·outline 계열에서만 권장. ghost · gray 는 square 고정."
      >
        <div className={s.row}>
          <Button shape="square">Square</Button>
          <Button shape="round">Round</Button>
          <Button variant="secondary-outline" shape="round">Secondary Round</Button>
        </div>
      </DemoSection>

      <DemoSection
        title="3. States"
        description="버튼 인터랙션 상태와 구현 매커니즘. 데모에서는 forceState 로 강제 시각화, 프로덕션에서는 사용하지 않습니다."
      >
        <table className={m.table}>
          <thead>
            <tr>
              <th style={{ width: "14%" }}>State</th>
              <th style={{ width: "18%" }}>Trigger</th>
              <th style={{ width: "36%" }}>구현</th>
              <th>참고</th>
            </tr>
          </thead>
          <tbody>
            {STATE_SPECS.map((st) => (
              <tr key={st.name}>
                <td><strong>{st.name}</strong></td>
                <td>{st.trigger}</td>
                <td><span className={m.mono}>{st.impl}</span></td>
                <td className={m.muted}>{st.notes}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className={m.split2} style={{ marginTop: 16 }}>
          <div className={`${m.callout} ${m.calloutDo}`}>
            <span className={m.calloutHead}>Do</span>
            <ul className={m.calloutList}>
              <li>비활성화는 <code>disabled</code> 또는 <code>aria-disabled</code> 로 표현합니다.</li>
              <li>비활성 사유가 있으면 <code>Tooltip</code> 으로 보충 설명을 제공합니다.</li>
              <li>폼 제출 버튼에는 <code>type=&quot;submit&quot;</code> 을 명시합니다.</li>
            </ul>
          </div>
          <div className={`${m.callout} ${m.calloutDont}`}>
            <span className={m.calloutHead}>Don&apos;t</span>
            <ul className={m.calloutList}>
              <li>프로덕션 코드에 <code>forceState</code> 를 남기지 마세요 — 문서 전용입니다.</li>
              <li>비활성 대신 버튼을 숨기지 마세요 — 사용자는 다음 동작을 예측할 수 없습니다.</li>
            </ul>
          </div>
        </div>
      </DemoSection>

      <DemoSection
        title="4. 구조와 조합"
        description="아이콘 전용 · 아이콘+텍스트 · 텍스트 전용. 아이콘 크기와 gap 은 size prop 에 의해 자동 결정됩니다."
      >
        <div className={m.anatomyGrid}>
          {ANATOMY_CARDS.map((card) => (
            <div key={card.title} className={m.anatomyCard}>
              <div className={m.anatomyStage}>{card.node}</div>
              <div className={m.anatomyTitle}>{card.title}</div>
              <div className={m.anatomyDesc}>{card.desc}</div>
            </div>
          ))}
        </div>

        <div style={{ marginTop: 24 }}>
          <table className={m.table}>
            <thead>
              <tr>
                <th style={{ width: "14%" }}>Size</th>
                <th className={m.numCol}>Icon (with label)</th>
                <th className={m.numCol}>Icon (iconOnly)</th>
                <th className={m.numCol}>Label padding</th>
                <th className={m.numCol}>Icon ↔ Label gap</th>
                <th>비고</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><code>small</code></td>
                <td className={`${m.numCol} ${m.mono}`}>16 × 16</td>
                <td className={`${m.numCol} ${m.mono}`}>16 × 16</td>
                <td className={`${m.numCol} ${m.mono}`}>2 / 2</td>
                <td className={`${m.numCol} ${m.mono}`}>2</td>
                <td className={m.muted}>letter-spacing -0.5px</td>
              </tr>
              <tr>
                <td><code>medium</code></td>
                <td className={`${m.numCol} ${m.mono}`}>16 × 16</td>
                <td className={`${m.numCol} ${m.mono}`}>20 × 20</td>
                <td className={`${m.numCol} ${m.mono}`}>2 / 2</td>
                <td className={`${m.numCol} ${m.mono}`}>2</td>
                <td className={m.muted}>—</td>
              </tr>
              <tr>
                <td><code>large</code></td>
                <td className={`${m.numCol} ${m.mono}`}>20 × 20</td>
                <td className={`${m.numCol} ${m.mono}`}>24 × 24</td>
                <td className={`${m.numCol} ${m.mono}`}>2 / 2</td>
                <td className={`${m.numCol} ${m.mono}`}>6</td>
                <td className={m.muted}>기본 사이즈</td>
              </tr>
              <tr>
                <td><code>xlarge</code></td>
                <td className={`${m.numCol} ${m.mono}`}>20 × 20</td>
                <td className={`${m.numCol} ${m.mono}`}>24 × 24</td>
                <td className={`${m.numCol} ${m.mono}`}>2 / 2</td>
                <td className={`${m.numCol} ${m.mono}`}>6</td>
                <td className={m.muted}>—</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className={m.split2} style={{ marginTop: 16 }}>
          <div className={`${m.callout} ${m.calloutDo}`}>
            <span className={m.calloutHead}>Do</span>
            <ul className={m.calloutList}>
              <li>아이콘은 <code>mask-image</code> 기반 단색 SVG 로 <code>currentColor</code> 를 상속받게 합니다.</li>
              <li>Left icon 은 동작의 <em>대상</em>, Right icon 은 <em>방향</em>을 표현합니다.</li>
              <li>icon-only 버튼은 반드시 <code>aria-label</code> 을 제공합니다.</li>
              <li>라벨은 1~2단어 동사형으로 간결하게 유지합니다.</li>
            </ul>
          </div>
          <div className={`${m.callout} ${m.calloutDont}`}>
            <span className={m.calloutHead}>Don&apos;t</span>
            <ul className={m.calloutList}>
              <li>한 버튼에 <code>leftIcon</code> 과 <code>rightIcon</code> 을 동시에 사용하지 마세요.</li>
              <li>아이콘 위에 별도 <code>style</code> 로 width/height 를 덮어쓰지 마세요.</li>
              <li>의미가 다른 아이콘을 Left/Right 에 혼합하지 마세요(예: 저장 + 다음).</li>
            </ul>
          </div>
        </div>
      </DemoSection>
    </>
  );
}

/* =================================================================
 *  Entry
 * =============================================================== */
export function ButtonDemo() {
  return <OverviewPanel />;
}

export default ButtonDemo;
