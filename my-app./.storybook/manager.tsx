import React from "react";
import { addons, types, useGlobals } from "storybook/manager-api";

/** 상단 툴바
 *   - 한국어 / English 언어 전환 → globals.locale (ko/en)
 *   - 라이트 / 다크 테마 전환    → globals.theme (light/dark, html[data-theme])
 */
const LOCALE_ADDON_ID = "ds-locale-toggle";
const THEME_ADDON_ID  = "ds-theme-toggle";

const wrapStyle: React.CSSProperties = {
  display: "flex",
  alignItems: "stretch",
  borderRadius: 6,
  overflow: "hidden",
  boxShadow: "inset 0 0 0 1px rgba(0, 0, 0, 0.12)",
};

function segment(active: boolean): React.CSSProperties {
  return {
    padding: "6px 11px",
    fontSize: 12,
    lineHeight: 1.2,
    border: "none",
    cursor: "pointer",
    fontFamily: "inherit",
    background: active ? "rgba(0, 0, 0, 0.09)" : "transparent",
    fontWeight: active ? 600 : 400,
    color: "inherit",
  };
}

function LocaleToggle() {
  const [{ locale }, updateGlobals] = useGlobals();
  const resolved: "ko" | "en" = locale === "en" ? "en" : "ko";

  return (
    <div style={wrapStyle} title="가이드라인 언어 (한국어 / English)">
      <button
        type="button"
        style={{
          ...segment(resolved === "ko"),
          borderRight: "1px solid rgba(0, 0, 0, 0.12)",
        }}
        aria-pressed={resolved === "ko"}
        onClick={() => updateGlobals({ locale: "ko" })}
      >
        한국어
      </button>
      <button
        type="button"
        style={segment(resolved === "en")}
        aria-pressed={resolved === "en"}
        onClick={() => updateGlobals({ locale: "en" })}
      >
        English
      </button>
    </div>
  );
}

function ThemeLightDarkToggle() {
  const [{ theme }, updateGlobals] = useGlobals();
  const resolved: "light" | "dark" = theme === "dark" ? "dark" : "light";

  return (
    <div style={wrapStyle} title="html data-theme (라이트 / 다크)">
      <button
        type="button"
        style={{
          ...segment(resolved === "light"),
          borderRight: "1px solid rgba(0, 0, 0, 0.12)",
        }}
        aria-pressed={resolved === "light"}
        onClick={() => updateGlobals({ theme: "light" })}
      >
        라이트
      </button>
      <button
        type="button"
        style={segment(resolved === "dark")}
        aria-pressed={resolved === "dark"}
        onClick={() => updateGlobals({ theme: "dark" })}
      >
        다크
      </button>
    </div>
  );
}

addons.register(LOCALE_ADDON_ID, () => {
  addons.add(`${LOCALE_ADDON_ID}/tool`, {
    title: "언어",
    type: types.TOOL,
    match: ({ viewMode, tabId }) =>
      Boolean(viewMode?.match(/^(story|docs)$/)) && !tabId,
    render: LocaleToggle,
  });
});

addons.register(THEME_ADDON_ID, () => {
  addons.add(`${THEME_ADDON_ID}/tool`, {
    title: "테마",
    type: types.TOOL,
    match: ({ viewMode, tabId }) =>
      Boolean(viewMode?.match(/^(story|docs)$/)) && !tabId,
    render: ThemeLightDarkToggle,
  });
});
