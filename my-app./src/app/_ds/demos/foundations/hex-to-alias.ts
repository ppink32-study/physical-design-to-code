import { PALETTES } from "./palette";

/**
 * `#hex` → Figma seed alias (예: "Gray/500") 역매핑.
 * Gray 팔레트를 우선하고, 같은 hex 가 여러 팔레트에 존재할 때는 먼저 등록된 것을 사용한다.
 */
const HEX_TO_ALIAS = new Map<string, string>();

// Gray 를 먼저 삽입해 우선순위를 확보
const SORTED = [
  PALETTES.find((p) => p.id === "gray"),
  ...PALETTES.filter((p) => p.id !== "gray"),
].filter(Boolean) as typeof PALETTES;

for (const p of SORTED) {
  const name = p.name; // "Gray", "Mint", ...
  for (const step of p.steps) {
    const key = step.hex.toUpperCase();
    if (!HEX_TO_ALIAS.has(key)) {
      HEX_TO_ALIAS.set(key, `${name}/${step.step}`);
    }
  }
}

function normalizeHex(input: string): string | null {
  const v = input.trim().toUpperCase();
  if (!v.startsWith("#")) return null;
  const h = v.slice(1);
  if (h.length === 3) {
    return (
      "#" +
      h
        .split("")
        .map((c) => c + c)
        .join("")
    );
  }
  if (h.length === 6) return "#" + h;
  if (h.length === 8) return "#" + h.slice(0, 6); // ignore alpha
  return null;
}

/**
 * "#hex" 또는 "rgba(..)" 에서 seed alias 를 반환한다.
 * 매핑이 없으면 null.
 */
export function hexToAlias(value: string): string | null {
  if (!value) return null;
  const v = value.trim();

  if (v.startsWith("#")) {
    const n = normalizeHex(v);
    return n ? HEX_TO_ALIAS.get(n) ?? null : null;
  }

  const m = v.match(
    /rgba?\(\s*(\d+)[,\s]+(\d+)[,\s]+(\d+)(?:[,\s]+([\d.]+))?/
  );
  if (m) {
    const r = +m[1];
    const g = +m[2];
    const b = +m[3];
    const hex =
      "#" +
      [r, g, b]
        .map((n) => n.toString(16).padStart(2, "0"))
        .join("")
        .toUpperCase();
    const alias = HEX_TO_ALIAS.get(hex);
    if (!alias) return null;
    const a = m[4] !== undefined ? +m[4] : 1;
    if (a < 1) return `${alias} · ${Math.round(a * 100)}%`;
    return alias;
  }

  return null;
}
