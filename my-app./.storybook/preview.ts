import type { Preview } from "@storybook/nextjs-vite";
import { withThemeByDataAttribute } from "@storybook/addon-themes";

// NOTE: `./docs-page-with-figma.tsx` 가 빈 파일 상태(import 시 SyntaxError)라
//       Storybook 전체 로딩이 깨져서 임시로 분리. 기본 DocsPage 가 사용됩니다.
//       복구되면 다시 import { DocsPageWithFigma } from "./docs-page-with-figma";
import { figmaDefaultDecorator } from "./figma-default-decorator";

import "../src/app/globals.css";

const preview: Preview = {
  parameters: {
    /** 기본 브러시 테마 툴 숨김 — `.storybook/manager.ts` 한글 라이트/다크 토글 사용 */
    themes: {
      disable: true,
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    backgrounds: { disable: true },
    layout: "centered",
    options: {
      storySort: (a, b) => {
        /** 사이드바 최상단 — `src/stories/revision-history.stories.tsx` 와 동일 문자열 */
        const REVISION_HISTORY_TITLE = "00 · 수정 히스토리";

        const FOUNDATION_PREFIX = "Design System/Foundation/";
        const FOUNDATION_ORDER = [
          "Typography",
          "Spacing",
          "Color & Shadow",
          "Icon",
          "Radius",
        ];
        const foundationRank = (title) => {
          if (!title.startsWith(FOUNDATION_PREFIX)) return -1;
          const sub = title.slice(FOUNDATION_PREFIX.length);
          const idx = FOUNDATION_ORDER.indexOf(sub);
          return idx === -1 ? 999 : idx;
        };

        if (a.title !== b.title) {
          const aRev = a.title === REVISION_HISTORY_TITLE;
          const bRev = b.title === REVISION_HISTORY_TITLE;
          if (aRev !== bRev) {
            if (aRev) return -1;
            return 1;
          }

          const fa = foundationRank(a.title);
          const fb = foundationRank(b.title);
          if (fa !== -1 || fb !== -1) {
            if (fa === -1) return 1;
            if (fb === -1) return -1;
            return fa - fb;
          }
          return a.title.localeCompare(b.title, undefined, { numeric: true });
        }
        const slug = (id) => (id.split("--").pop() ?? "").toLowerCase();
        const rank = (id) => {
          const s = slug(id);
          if (s === "default") return 0;
          if (s === "matrix") return 1;
          if (s.includes("matrix")) return 2;
          if (s === "guidelines" || s === "guideline") return 3;
          return 10;
        };
        const ra = rank(a.id);
        const rb = rank(b.id);
        if (ra !== rb) return ra - rb;
        return a.id.localeCompare(b.id, undefined, { numeric: true });
      },
    },
    docs: {
      // page: DocsPageWithFigma, // 임시 비활성 — 위 import 주석 참고
      /** Docs 하단에 모든 스토리를 펼치지 않음 — Primary + Controls 만 */
      hideStories: true,
    },
  },
  initialGlobals: {
    theme: "light",
  },
  decorators: [
    withThemeByDataAttribute({
      themes: {
        light: "light",
        dark: "dark",
      },
      defaultTheme: "light",
      attributeName: "data-theme",
      parentSelector: "html",
    }),
    figmaDefaultDecorator,
  ],
};

export default preview;
