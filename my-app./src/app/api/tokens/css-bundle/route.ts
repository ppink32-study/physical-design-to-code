import { NextResponse } from "next/server";
import fs from "node:fs/promises";
import path from "node:path";

const CSS_DIR = path.resolve(
  process.cwd(),
  "src/commons/constants/css"
);

/** 디자인 토큰 CSS 번들 순서 — seed → primitives → theme 순으로 concat */
const ORDER = [
  "_seed.css",
  "opacity.css",
  "border-radius.css",
  "border-width.css",
  "size.css",
  "spacing.css",
  "typography.css",
  "light.css",
  "dark.css",
  "index.css",
];

export async function GET() {
  const parts: string[] = [
    "/*",
    " * design-tokens.css — auto-generated bundle",
    " * Sourced from src/commons/constants/css",
    " * Order:",
    ...ORDER.map((f) => ` *   - ${f}`),
    " */",
    "",
  ];

  for (const f of ORDER) {
    try {
      const content = await fs.readFile(path.join(CSS_DIR, f), "utf8");
      parts.push(`/* ======================= ${f} ======================= */`);
      parts.push(content.trimEnd());
      parts.push("");
    } catch {
      // skip missing
    }
  }

  const bundle = parts.join("\n");

  return new NextResponse(bundle, {
    status: 200,
    headers: {
      "Content-Type": "text/css; charset=utf-8",
      "Content-Disposition": `attachment; filename="design-tokens.css"`,
      "Cache-Control": "no-store",
    },
  });
}
