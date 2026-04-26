import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import type { CSSProperties, ReactNode } from "react";
import { Fragment } from "react";

import {
  Badge,
  type BadgeLineColor,
  type BadgeNoticeColor,
  type BadgeSolidColor,
  type BadgeStatusColor,
} from "@/components/badge/badge";
import { InputChip } from "@/components/chips/input-chip/input-chip";
import { Input } from "@/components/Input/input";
import { FigmaLinkCard } from "@/stories/figma-link-card";
import {
  StoryDocsMatrixPage,
  StoryDocsPage,
  StoryDocsParagraph,
  StoryPlaygroundFrame,
} from "@/stories/story-docs-shell";

/* ------------------------------------------------------------------ */
/* Icon
 * ------------------------------------------------------------------ */
function Icon({ src, size = 16 }: { src: string; size?: number }) {
  const style: CSSProperties = {
    display: "inline-block",
    width: size,
    height: size,
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
const GearIcon = ({ size = 16 }: { size?: number }) => (
  <Icon src="/icon/Gear.svg" size={size} />
);

/* ------------------------------------------------------------------ */
/* Meta
 * ------------------------------------------------------------------ */
const meta: Meta = {
  title: "Overview/Badge & Input — Matrix",
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "검수용: `Components/Badge` 의 **Variants · States** 와 `Components/Input` 의 **Variants · States** 스토리 구성을 한 스크롤 페이지에 통합했습니다.",
      },
    },
  },
};
export default meta;

type Story = StoryObj;

export const Playground: Story = {
  decorators: [
    (Story) => (
      <StoryPlaygroundFrame>
        <Story />
      </StoryPlaygroundFrame>
    ),
  ],
  render: () => (
    <p
      style={{
        margin: 0,
        fontSize: 14,
        color: "var(--context-foreground-surface-on-surface-secondary)",
      }}
    >
      Badge·Input 매트릭스 통합 페이지입니다. 아래 스크롤 영역 스토리를 선택해
      확인하세요.
    </p>
  ),
};

const h2: CSSProperties = {
  fontSize: 17,
  fontWeight: 600,
  margin: "0 0 14px",
  paddingBottom: 8,
  borderBottom: "2px solid var(--border-border-surface-border-surface)",
};

const h3: CSSProperties = {
  fontSize: 14,
  fontWeight: 600,
  margin: "18px 0 10px",
  color: "var(--context-foreground-surface-on-surface-base)",
};

const rowLabel: CSSProperties = {
  fontSize: 12,
  fontWeight: 500,
  color: "var(--context-foreground-surface-on-surface-hint)",
  marginBottom: 8,
};

const flexWrap: CSSProperties = {
  display: "flex",
  flexWrap: "wrap",
  gap: 8,
  alignItems: "center",
};

const gridStyle: CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(120px, max-content))",
  gap: 12,
  alignItems: "center",
  justifyItems: "start",
};

const rowStyle: CSSProperties = {
  display: "flex",
  gap: 12,
  alignItems: "center",
  flexWrap: "wrap",
};

const fieldColumn: CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: 8,
  width: 280,
};

const sectionBlock: CSSProperties = { marginBottom: 36 };

function MatrixSection({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section style={sectionBlock}>
      <h2 style={h2}>{title}</h2>
      {children}
    </section>
  );
}

/* ----- Badge color lists (badge.stories 와 동일) ----- */
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

/* ----- Input matrix ----- */
const inputTones = ["normal", "success", "error"] as const;
const inputStates = [
  "default",
  "focus",
  "filled",
  "disable",
  "readonly",
] as const;
const inputSizes = ["medium", "large"] as const;

/* ----- Chip field (Input States 스토리와 동일 패턴) ----- */
const chipFieldShellBase: CSSProperties = {
  display: "flex",
  flexWrap: "wrap",
  gap: 4,
  alignItems: "center",
  padding: "3px 8px",
  minHeight: 40,
  boxSizing: "border-box",
  backgroundColor:
    "var(--context-background-surface-bg-surface-base, #ffffff)",
  border:
    "1px solid var(--border-border-surface-border-surface, #d7d8dc)",
  borderRadius: "var(--radius-md, 6px)",
};

const chipFieldInputSlotStyle: CSSProperties = {
  flex: "1 1 72px",
  minWidth: 72,
  minHeight: 24,
  border: 0,
  outline: 0,
  background: "transparent",
  padding: 0,
  margin: 0,
  fontFamily: "var(--font-family-korean)",
  fontSize: "var(--font-size-body-base, 14px)",
  lineHeight: "var(--font-line-height-sm, 20px)",
  color: "var(--context-foreground-surface-on-surface-base, #141518)",
};

function ChipFieldDemo({
  title,
  shellStyle,
  chipLabels,
}: {
  title: string;
  shellStyle: CSSProperties;
  chipLabels: string[];
}) {
  return (
    <div style={{ marginBottom: 16 }}>
      <div style={rowLabel}>{title}</div>
      <div style={{ ...chipFieldShellBase, ...shellStyle }}>
        {chipLabels.map((t) => (
          <InputChip key={t} size="large" closeIcon>
            {t}
          </InputChip>
        ))}
        <input
          type="text"
          placeholder="Text"
          aria-label="태그 입력"
          style={chipFieldInputSlotStyle}
        />
      </div>
    </div>
  );
}

/* =================================================================
 * Story
 * =============================================================== */
export const Matrix: Story = {
  name: "Matrix",
  render: () => (
    <StoryDocsMatrixPage
      eyebrow="Overview"
      title="Badge & Input"
      description="Badge와 Input의 Variants·States 매트릭스를 한 페이지에서 스크롤하며 대조할 수 있습니다."
    >
      <FigmaLinkCard caption="Overview · Badge & Input — 통합 매트릭스" />

      {/* ========== BADGE VARIANTS ========== */}
      <MatrixSection title="Badge — Variants (= Badge / Variants 스토리)">
        <h3 style={h3}>Solid</h3>
        <div style={{ marginBottom: 20 }}>
          <div style={rowLabel}>Square · size = lg</div>
          <div style={gridStyle}>
            {SOLID_COLORS.map((c) => (
              <Badge key={`bv-sol-sq-${c}`} variant="solid" color={c} size="lg">
                Badge
              </Badge>
            ))}
          </div>
        </div>
        <div style={{ marginBottom: 20 }}>
          <div style={rowLabel}>Round · with icon · size = lg</div>
          <div style={gridStyle}>
            {SOLID_COLORS.map((c) => (
              <Badge
                key={`bv-sol-rd-${c}`}
                variant="solid"
                color={c}
                size="lg"
                shape="round"
                icon={<GearIcon size={16} />}
              >
                Badge
              </Badge>
            ))}
          </div>
        </div>

        <h3 style={h3}>Line</h3>
        <div style={{ marginBottom: 20 }}>
          <div style={rowLabel}>Square · with icon · size = lg</div>
          <div style={gridStyle}>
            {LINE_COLORS.map((c) => (
              <Badge
                key={`bv-ln-sq-${c}`}
                variant="line"
                color={c}
                size="lg"
                shape="square"
                icon={<GearIcon size={16} />}
              >
                Badge
              </Badge>
            ))}
          </div>
        </div>
        <div style={{ marginBottom: 20 }}>
          <div style={rowLabel}>Round · size = lg</div>
          <div style={gridStyle}>
            {LINE_COLORS.map((c) => (
              <Badge
                key={`bv-ln-rd-${c}`}
                variant="line"
                color={c}
                size="lg"
                shape="round"
              >
                Badge
              </Badge>
            ))}
          </div>
        </div>

        <h3 style={h3}>Status</h3>
        <div style={{ marginBottom: 20 }}>
          <div style={rowLabel}>Square · size = lg</div>
          <div style={gridStyle}>
            {STATUS_COLORS.map((c) => (
              <Badge
                key={`bv-st-sq-${c}`}
                variant="status"
                color={c}
                size="lg"
                shape="square"
              >
                Badge
              </Badge>
            ))}
          </div>
        </div>
        <div style={{ marginBottom: 20 }}>
          <div style={rowLabel}>Round · with count · size = lg</div>
          <div style={gridStyle}>
            {STATUS_COLORS.map((c) => (
              <Badge
                key={`bv-st-rd-${c}`}
                variant="status"
                color={c}
                size="lg"
                shape="round"
                count={1}
              >
                Badge
              </Badge>
            ))}
          </div>
        </div>

        <h3 style={h3}>Notice</h3>
        <div style={{ marginBottom: 12 }}>
          <div style={rowLabel}>0 · 1 · 두 자리 — count = 0 / 1 / 42 / 98</div>
          <div style={rowStyle}>
            {NOTICE_COLORS.map((c) => (
              <Badge key={`bv-n0-${c}`} variant="notice" color={c} count={0} />
            ))}
            {NOTICE_COLORS.map((c) => (
              <Badge key={`bv-n1-${c}`} variant="notice" color={c} count={1} />
            ))}
            {NOTICE_COLORS.map((c) => (
              <Badge key={`bv-n42-${c}`} variant="notice" color={c} count={42} />
            ))}
            {NOTICE_COLORS.map((c) => (
              <Badge key={`bv-n98-${c}`} variant="notice" color={c} count={98} />
            ))}
          </div>
        </div>
        <div>
          <div style={rowLabel}>99 이상은 +99 — count = 99 / 100 / 999</div>
          <div style={rowStyle}>
            {NOTICE_COLORS.map((c) => (
              <Badge key={`bv-n99-${c}`} variant="notice" color={c} count={99} />
            ))}
            {NOTICE_COLORS.map((c) => (
              <Badge key={`bv-n100-${c}`} variant="notice" color={c} count={100} />
            ))}
            {NOTICE_COLORS.map((c) => (
              <Badge key={`bv-n999-${c}`} variant="notice" color={c} count={999} />
            ))}
          </div>
        </div>
      </MatrixSection>

      {/* ========== BADGE STATES ========== */}
      <MatrixSection title="Badge — States (= Badge / States 스토리)">
        <div style={{ marginBottom: 20 }}>
          <div style={rowLabel}>Size (xs · sm · lg) — Solid · primary · square</div>
          <div style={rowStyle}>
            {(["xs", "sm", "lg"] as const).map((s) => (
              <Badge key={`bs-sz-${s}`} variant="solid" color="primary" size={s}>
                {s}
              </Badge>
            ))}
          </div>
        </div>
        <div style={{ marginBottom: 20 }}>
          <div style={rowLabel}>Shape (square · round) — Line · gray · lg</div>
          <div style={rowStyle}>
            {(["square", "round"] as const).map((sh) => (
              <Badge key={`bs-sh-${sh}`} variant="line" color="gray" size="lg" shape={sh}>
                {sh}
              </Badge>
            ))}
          </div>
        </div>
        <div style={{ marginBottom: 20 }}>
          <div style={rowLabel}>Icon 유무 — Solid · blue · lg</div>
          <div style={rowStyle}>
            <Badge variant="solid" color="blue" size="lg">
              Without icon
            </Badge>
            <Badge
              variant="solid"
              color="blue"
              size="lg"
              icon={<GearIcon size={16} />}
            >
              With icon
            </Badge>
          </div>
        </div>
        <div style={{ marginBottom: 20 }}>
          <div style={rowLabel}>Dot on/off — Status · green · lg</div>
          <div style={rowStyle}>
            <Badge variant="status" color="green" size="lg" dot>
              With dot
            </Badge>
            <Badge variant="status" color="green" size="lg" dot={false}>
              No dot
            </Badge>
          </div>
        </div>
        <div style={{ marginBottom: 20 }}>
          <div style={rowLabel}>Count 슬롯 — Status · purple · lg</div>
          <div style={rowStyle}>
            <Badge variant="status" color="purple" size="lg">
              Only label
            </Badge>
            <Badge variant="status" color="purple" size="lg" count={1}>
              With count
            </Badge>
            <Badge variant="status" color="purple" size="lg" count={99}>
              Wide count
            </Badge>
          </div>
        </div>
        <div style={{ marginBottom: 20 }}>
          <div style={rowLabel}>Notice — 1~98 그대로, 99+ 는 +99</div>
          <div style={rowStyle}>
            <Badge variant="notice" color="red" count={0} />
            <Badge variant="notice" color="red" count={1} />
            <Badge variant="notice" color="red" count={42} />
            <Badge variant="notice" color="red" count={98} />
            <Badge variant="notice" color="red" count={99} />
            <Badge variant="notice" color="red" count={100} />
            <Badge variant="notice" color="purple" count={999} />
          </div>
        </div>
        <div>
          <div style={rowLabel}>Size × Shape × Icon 매트릭스 — Solid · blue</div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "80px repeat(4, max-content)",
              rowGap: 12,
              columnGap: 24,
              alignItems: "center",
              justifyItems: "start",
            }}
          >
            <span />
            <span style={rowLabel}>square</span>
            <span style={rowLabel}>square + icon</span>
            <span style={rowLabel}>round</span>
            <span style={rowLabel}>round + icon</span>
            {(["xs", "sm", "lg"] as const).map((s) => (
              <Fragment key={`bs-mx-${s}`}>
                <span style={rowLabel}>{s}</span>
                <Badge variant="solid" color="blue" size={s} shape="square">
                  Badge
                </Badge>
                <Badge
                  variant="solid"
                  color="blue"
                  size={s}
                  shape="square"
                  icon={<GearIcon size={s === "lg" ? 16 : 12} />}
                >
                  Badge
                </Badge>
                <Badge variant="solid" color="blue" size={s} shape="round">
                  Badge
                </Badge>
                <Badge
                  variant="solid"
                  color="blue"
                  size={s}
                  shape="round"
                  icon={<GearIcon size={s === "lg" ? 16 : 12} />}
                >
                  Badge
                </Badge>
              </Fragment>
            ))}
          </div>
        </div>
      </MatrixSection>

      {/* ========== INPUT VARIANTS ========== */}
      <MatrixSection title="Input — Variants (= Input / Variants 스토리)">
        <div style={{ marginBottom: 20 }}>
          <div style={rowLabel}>Size — medium (32px) · large (40px)</div>
          <div style={rowStyle}>
            <div style={fieldColumn}>
              <span style={{ ...rowLabel, marginBottom: 4 }}>medium</span>
              <Input size="medium" placeholder="Text" />
            </div>
            <div style={fieldColumn}>
              <span style={{ ...rowLabel, marginBottom: 4 }}>large</span>
              <Input size="large" placeholder="Text" />
            </div>
          </div>
        </div>
        <div style={{ marginBottom: 20 }}>
          <div style={rowLabel}>Tone — normal · success · error</div>
          <div style={rowStyle}>
            {inputTones.map((t) => (
              <div key={`iv-ton-${t}`} style={fieldColumn}>
                <span style={{ ...rowLabel, marginBottom: 4 }}>{t}</span>
                <Input tone={t} placeholder="Text" defaultValue="Text" />
              </div>
            ))}
          </div>
        </div>
        <div style={{ marginBottom: 20 }}>
          <div style={rowLabel}>Password</div>
          <div style={fieldColumn}>
            <Input
              type="password"
              placeholder="Password"
              leadingIcon={false}
              defaultValue="secret"
            />
          </div>
        </div>
        <div style={{ marginBottom: 20 }}>
          <div style={rowLabel}>Counter — maxLength</div>
          <div style={fieldColumn}>
            <Input
              placeholder="Text"
              counter
              leadingIcon={false}
              trailingIcon={false}
              maxLength={50}
              defaultValue="Short"
            />
          </div>
        </div>
        <div style={{ marginBottom: 20 }}>
          <div style={rowLabel}>Counter 초과 + error 톤</div>
          <div style={fieldColumn}>
            <Input
              tone="error"
              defaultValue="Lorem ipsum dolor sit amet consectetur adipiscing elit, sed do."
              counter={{ current: 51, max: 50 }}
              leadingIcon={false}
            />
          </div>
        </div>
        <div style={{ marginBottom: 20 }}>
          <div style={rowLabel}>Clearable — focus 시 클리어</div>
          <div style={fieldColumn}>
            <Input
              defaultValue="Text"
              clearable
              forceState="focus"
              leadingIcon={false}
            />
          </div>
        </div>
        <div>
          <div style={rowLabel}>아이콘 없음 — leading / trailing 끔</div>
          <div style={fieldColumn}>
            <Input placeholder="Text" leadingIcon={false} trailingIcon={false} />
          </div>
        </div>
      </MatrixSection>

      {/* ========== INPUT STATES ========== */}
      <MatrixSection title="Input — States (= Input / States 스토리)">
        <h3 style={h3}>단일 상태 예시 — medium · normal</h3>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
            gap: 16,
          }}
        >
          {(
            [
              ["default", <Input key="is-d" placeholder="Text" />],
              [
                "focus + clearable",
                <Input
                  key="is-f"
                  placeholder="Text"
                  forceState="focus"
                  clearable
                  defaultValue="Text"
                />,
              ],
              ["filled", <Input key="is-fl" defaultValue="Text" forceState="filled" />],
              ["disabled", <Input key="is-dis" placeholder="Text" disabled />],
              ["readOnly", <Input key="is-ro" defaultValue="Text" readOnly />],
            ] as const
          ).map(([label, el]) => (
            <div key={label}>
              <div style={rowLabel}>{label}</div>
              <div style={fieldColumn}>{el}</div>
            </div>
          ))}
        </div>

        <h3 style={h3}>Password · Chip 1줄 · Chip 2줄</h3>
        <div style={{ marginBottom: 12 }}>
          <div style={rowLabel}>password</div>
          <div style={fieldColumn}>
            <Input
              type="password"
              placeholder="Password"
              leadingIcon={false}
              defaultValue="secret"
            />
          </div>
        </div>
        <ChipFieldDemo
          title="chip 1줄 — 칩 + 입력이 한 줄에 나란히"
          shellStyle={{
            flexWrap: "nowrap",
            overflow: "hidden",
            width: 400,
          }}
          chipLabels={["Tag1", "Tag2", "Tag3"]}
        />
        <ChipFieldDemo
          title="chip 2줄 — 좁은 너비(240px)에서 줄바꿈"
          shellStyle={{ width: 240 }}
          chipLabels={["Tag1", "Tag2", "Tag Name 긴 경우", "Tag4", "Tag5"]}
        />

        <h3 style={h3}>Size × tone × forceState 매트릭스</h3>
        {inputSizes.map((sz) => (
          <div key={`is-mx-${sz}`} style={{ marginBottom: 28 }}>
            <div style={{ ...rowLabel, fontSize: 13, marginBottom: 10 }}>
              size: {sz}
            </div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "88px repeat(5, minmax(128px, 1fr))",
                gap: "10px 12px",
                alignItems: "center",
                overflowX: "auto",
              }}
            >
              <span />
              {inputStates.map((s) => (
                <span
                  key={s}
                  style={{
                    fontSize: 11,
                    textAlign: "center",
                    color: "var(--context-foreground-surface-on-surface-hint)",
                  }}
                >
                  {s}
                </span>
              ))}
              {inputTones.map((t) => (
                <Fragment key={`${sz}-${t}`}>
                  <span
                    style={{
                      fontSize: 12,
                      color: "var(--context-foreground-surface-on-surface-hint)",
                    }}
                  >
                    {t}
                  </span>
                  {inputStates.map((st) => (
                    <Input
                      key={`${sz}-${t}-${st}`}
                      size={sz}
                      tone={t}
                      forceState={st}
                      placeholder="Text"
                      defaultValue={
                        st === "filled" ||
                        st === "readonly" ||
                        st === "focus"
                          ? "Text"
                          : ""
                      }
                      disabled={st === "disable"}
                      readOnly={st === "readonly"}
                      clearable={st === "focus"}
                    />
                  ))}
                </Fragment>
              ))}
            </div>
          </div>
        ))}
      </MatrixSection>
    </StoryDocsMatrixPage>
  ),
};

export const Guideline: Story = {
  name: "Guideline",
  parameters: {
    layout: "padded",
    controls: { hideNoControlsWarning: true, disable: true },
    actions: { disable: true },
  },
  render: () => (
    <StoryDocsPage
      eyebrow="Overview"
      title="Badge & Input"
      description="검수용 통합 매트릭스 페이지 사용 안내입니다."
    >
      <StoryDocsParagraph>
        이 페이지는 <strong>Badge</strong> 와 <strong>Input</strong> 컴포넌트 스토리의 variant·state
        매트릭스를 검수용으로 한 스크롤에 모은 것입니다. 개별 컴포넌트 문서는 각{" "}
        <code>Components/Badge</code>, <code>Components/Input</code> 의 Docs 탭을 참고하세요.
      </StoryDocsParagraph>
    </StoryDocsPage>
  ),
};
