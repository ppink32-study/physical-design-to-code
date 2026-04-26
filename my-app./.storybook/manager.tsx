import React from "react";
import { addons, types, useGlobals } from "storybook/manager-api";

/** 기본 @storybook/addon-themes 툴바(브러시) 대신 한글 라이트/다크 전환 */
const ADDON_ID = "ds-theme-toggle";

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

function ThemeLightDarkToggle() {
  const [{ theme }, updateGlobals] = useGlobals();
  const resolved = theme === "dark" ? "dark" : "light";

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

addons.register(ADDON_ID, () => {
  addons.add(`${ADDON_ID}/tool`, {
    title: "테마",
    type: types.TOOL,
    match: ({ viewMode, tabId }) =>
      Boolean(viewMode?.match(/^(story|docs)$/)) && !tabId,
    render: ThemeLightDarkToggle,
  });
});
