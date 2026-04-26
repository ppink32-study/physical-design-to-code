import { NextResponse } from "next/server";
import fs from "node:fs/promises";
import path from "node:path";

const CSS_DIR = path.resolve(
  process.cwd(),
  "src/commons/constants/css"
);

export const ALLOWED_CSS_FILES = [
  "_seed.css",
  "border-radius.css",
  "border-width.css",
  "dark.css",
  "index.css",
  "light.css",
  "opacity.css",
  "size.css",
  "spacing.css",
  "typography.css",
] as const;

const ALLOWED = new Set<string>(ALLOWED_CSS_FILES);

export async function GET(
  _req: Request,
  ctx: { params: Promise<{ name: string }> }
) {
  const { name } = await ctx.params;
  if (!ALLOWED.has(name)) {
    return NextResponse.json({ error: "not found" }, { status: 404 });
  }
  const filePath = path.join(CSS_DIR, name);
  try {
    const data = await fs.readFile(filePath, "utf8");
    return new NextResponse(data, {
      status: 200,
      headers: {
        "Content-Type": "text/css; charset=utf-8",
        "Content-Disposition": `attachment; filename="${name}"`,
        "Cache-Control": "no-store",
      },
    });
  } catch {
    return NextResponse.json({ error: "not found" }, { status: 404 });
  }
}
