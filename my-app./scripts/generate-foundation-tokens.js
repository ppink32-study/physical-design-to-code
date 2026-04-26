#!/usr/bin/env node
/* eslint-disable */
/**
 * Generate `src/app/_ds/demos/foundations/tokens.generated.ts` from the
 * Figma-exported Light/Dark tokens JSON files.
 *
 * - Preserves Figma's section hierarchy ("Context/Foreground/Blue") as section title
 * - Uses the leaf key ("on-blue-secondary") as row label
 * - Generates the matching CSS variable name (`--context-foreground-blue-on-blue-secondary`)
 * - Extracts Figma alias (e.g. "Blue/500") from aliasData for both themes
 *
 * Re-run whenever tokens change:
 *   node scripts/generate-foundation-tokens.js
 */

const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");
const LIGHT_JSON = path.join(ROOT, "src/commons/constants/json/Light.tokens.json");
const DARK_JSON = path.join(ROOT, "src/commons/constants/json/Dark.tokens.json");
const LIGHT_CSS = path.join(ROOT, "src/commons/constants/css/light.css");
const DARK_CSS = path.join(ROOT, "src/commons/constants/css/dark.css");
const OUT = path.join(
  ROOT,
  "src/app/_ds/demos/foundations/tokens.generated.ts"
);

function pathToCssVar(segments) {
  const joined = segments.join("/").toLowerCase();
  return "--" + joined.replace(/[\s_/]+/g, "-");
}

function stripAliasPrefix(name) {
  if (!name) return null;
  return name.replace(/^_Color\//, "").replace(/^_Seed\//, "");
}

function walk(obj, segs, out) {
  if (!obj || typeof obj !== "object") return;
  if (obj.$type) {
    const leaf = {
      path: segs.slice(0, -1),
      leaf: segs[segs.length - 1],
      cssVar: pathToCssVar(segs),
      hex: obj.$value?.hex || null,
      alias:
        stripAliasPrefix(
          obj.$extensions?.["com.figma.aliasData"]?.targetVariableName
        ) || null,
    };
    out.push(leaf);
    return;
  }
  for (const k of Object.keys(obj)) walk(obj[k], [...segs, k], out);
}

function parseCssVars(src) {
  const map = {};
  const re = /^\s+(--[a-z0-9-]+):\s*([^;]+);/gim;
  let m;
  while ((m = re.exec(src)) !== null) {
    map[m[1]] = m[2].trim();
  }
  return map;
}

function categoryOf(sectionPath) {
  if (sectionPath.startsWith("Context/Foreground/")) return "foreground";
  if (sectionPath === "Context/Background/Tint") return "tint";
  if (sectionPath.startsWith("Context/Background/")) return "background";
  if (sectionPath.startsWith("Accent/")) return "accent";
  if (sectionPath === "Border/Neutral") return "borderNeutral";
  if (sectionPath === "Border/Border Surface") return "borderSurface";
  if (sectionPath === "Border/OpacityBorder") return "borderOpacity";
  if (sectionPath === "Border") return "border";
  if (sectionPath === "Opacity") return "opacity";
  if (sectionPath === "bg Transparency") return "bgTransparency";
  return "other";
}

const CATEGORY_META = {
  foreground: {
    title: "Foreground",
    description: "텍스트·아이콘 전경 색상.",
    order: 1,
  },
  background: {
    title: "Background",
    description: "표면·중립 배경 색상.",
    order: 2,
  },
  tint: {
    title: "Tint",
    description: "시맨틱 톤의 옅은 배경 팔레트.",
    order: 3,
  },
  accent: {
    title: "Accent",
    description: "컬러별 액센트 스케일.",
    order: 4,
  },
  border: {
    title: "Border",
    description: "시맨틱 보더 색상.",
    order: 5,
  },
  borderNeutral: {
    title: "Border · Neutral",
    description: "중립 보더 스케일.",
    order: 6,
  },
  borderSurface: {
    title: "Border · Surface",
    description: "Surface 레이어용 보더.",
    order: 7,
  },
  borderOpacity: {
    title: "Border · Opacity",
    description: "반투명 보더 토큰.",
    order: 8,
  },
  opacity: {
    title: "Opacity",
    description: "반투명 오버레이 컬러.",
    order: 9,
  },
  bgTransparency: {
    title: "BG · Transparency",
    description: "Alert 등에서 쓰는 반투명 배경 토큰.",
    order: 10,
  },
  other: {
    title: "Other",
    description: "분류되지 않은 토큰.",
    order: 99,
  },
};

function main() {
  const lightTree = JSON.parse(fs.readFileSync(LIGHT_JSON, "utf8"));
  const darkTree = JSON.parse(fs.readFileSync(DARK_JSON, "utf8"));
  const lightCss = parseCssVars(fs.readFileSync(LIGHT_CSS, "utf8"));
  const darkCss = parseCssVars(fs.readFileSync(DARK_CSS, "utf8"));

  const lightLeaves = [];
  const darkLeaves = [];
  walk(lightTree, [], lightLeaves);
  walk(darkTree, [], darkLeaves);

  // Index dark leaves by cssVar for merging
  const darkMap = new Map();
  for (const d of darkLeaves) darkMap.set(d.cssVar, d);

  // Group by (categoryId, sectionPath)
  /** @type {Map<string, Map<string, any>>} */
  const grouped = new Map();

  for (const L of lightLeaves) {
    const sectionPath = L.path.join("/");
    const cat = categoryOf(sectionPath);
    const D = darkMap.get(L.cssVar);
    const lightVal = lightCss[L.cssVar] || L.hex || "";
    const darkVal = darkCss[L.cssVar] || D?.hex || lightVal;

    const token = {
      name: L.cssVar,
      leafName: L.leaf,
      light: lightVal,
      dark: darkVal,
      lightAlias: L.alias,
      darkAlias: D?.alias || null,
    };

    if (!grouped.has(cat)) grouped.set(cat, new Map());
    const sections = grouped.get(cat);
    if (!sections.has(sectionPath)) sections.set(sectionPath, []);
    sections.get(sectionPath).push(token);
  }

  // Build ordered output
  const categories = [...grouped.keys()].sort(
    (a, b) => (CATEGORY_META[a]?.order || 99) - (CATEGORY_META[b]?.order || 99)
  );

  const output = categories.map((cat) => {
    const sections = grouped.get(cat);
    const sectionList = [...sections.entries()].map(([sectionPath, tokens]) => ({
      id: sectionPath.toLowerCase().replace(/[\s/]+/g, "-"),
      path: sectionPath,
      tokens,
    }));
    return {
      id: cat,
      title: CATEGORY_META[cat]?.title || cat,
      description: CATEGORY_META[cat]?.description || "",
      sections: sectionList,
    };
  });

  const lines = [];
  lines.push("/* eslint-disable */");
  lines.push("// ⚠️  AUTO-GENERATED by scripts/generate-foundation-tokens.js");
  lines.push("//     Source of truth: Light.tokens.json / Dark.tokens.json");
  lines.push("//     DO NOT EDIT DIRECTLY. Re-run the script to regenerate.");
  lines.push("");
  lines.push("export type SemanticToken = {");
  lines.push("  /** Full CSS variable name incl. leading -- */");
  lines.push("  name: string;");
  lines.push("  /** Leaf key as stored in Figma (e.g. `on-blue-secondary`) */");
  lines.push("  leafName: string;");
  lines.push("  /** Value on light theme */");
  lines.push("  light: string;");
  lines.push("  /** Value on dark theme */");
  lines.push("  dark: string;");
  lines.push("  /** Figma alias for light theme (e.g. `Blue/500`) */");
  lines.push("  lightAlias: string | null;");
  lines.push("  /** Figma alias for dark theme */");
  lines.push("  darkAlias: string | null;");
  lines.push("};");
  lines.push("");
  lines.push("export type SemanticSection = {");
  lines.push("  /** Slug for anchor / key */");
  lines.push("  id: string;");
  lines.push("  /** Original Figma path (e.g. `Context/Foreground/Blue`) */");
  lines.push("  path: string;");
  lines.push("  tokens: SemanticToken[];");
  lines.push("};");
  lines.push("");
  const catIds = output.map((g) => JSON.stringify(g.id));
  lines.push("export type SemanticGroupId = " + catIds.join(" | ") + ";");
  lines.push("");
  lines.push("export type SemanticGroup = {");
  lines.push("  id: SemanticGroupId;");
  lines.push("  title: string;");
  lines.push("  description: string;");
  lines.push("  sections: SemanticSection[];");
  lines.push("};");
  lines.push("");
  lines.push("export const SEMANTIC_GROUPS: SemanticGroup[] = [");
  for (const g of output) {
    lines.push("  {");
    lines.push(`    id: ${JSON.stringify(g.id)},`);
    lines.push(`    title: ${JSON.stringify(g.title)},`);
    lines.push(`    description: ${JSON.stringify(g.description)},`);
    lines.push(`    sections: [`);
    for (const s of g.sections) {
      lines.push("      {");
      lines.push(`        id: ${JSON.stringify(s.id)},`);
      lines.push(`        path: ${JSON.stringify(s.path)},`);
      lines.push(`        tokens: [`);
      for (const t of s.tokens) {
        lines.push(
          "          " +
            JSON.stringify({
              name: t.name,
              leafName: t.leafName,
              light: t.light,
              dark: t.dark,
              lightAlias: t.lightAlias,
              darkAlias: t.darkAlias,
            }) +
            ","
        );
      }
      lines.push("        ],");
      lines.push("      },");
    }
    lines.push("    ],");
    lines.push("  },");
  }
  lines.push("];");
  lines.push("");

  fs.mkdirSync(path.dirname(OUT), { recursive: true });
  fs.writeFileSync(OUT, lines.join("\n"), "utf8");

  const totalTokens = output.reduce(
    (s, g) => s + g.sections.reduce((ss, sec) => ss + sec.tokens.length, 0),
    0
  );
  const totalSections = output.reduce((s, g) => s + g.sections.length, 0);
  console.log(
    `[foundation-tokens] wrote ${OUT} (${totalTokens} tokens, ${totalSections} sections, ${output.length} groups)`
  );
}

main();
