import React from "react";
import { addons, types, useGlobals } from "storybook/manager-api";

/** 상단 툴바: 한국어 / English 언어 전환
 *   storybook globals.locale 값(ko / en)을 갱신.
 *   각 story 의 render 함수가 ctx.globals.locale 으로 언어를 읽어 분기.
 */
const ADDON_ID = "ds-locale-toggle";

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

addons.register(ADDON_ID, () => {
  addons.add(`${ADDON_ID}/tool`, {
    title: "언어",
    type: types.TOOL,
    match: ({ viewMode, tabId }) =>
      Boolean(viewMode?.match(/^(story|docs)$/)) && !tabId,
    render: LocaleToggle,
  });
});
