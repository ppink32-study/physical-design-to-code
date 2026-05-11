/**
 * Storybook globals.locale 을 "ko" | "en" 으로 정규화하는 공용 헬퍼.
 *
 * 사용 예:
 *   export const Guideline: Story = {
 *     render: (_, ctx) => <Body locale={pickLocale(ctx.globals)} />,
 *   };
 */
export type Locale = "ko" | "en";

export function pickLocale(globals: unknown): Locale {
  if (
    typeof globals === "object" &&
    globals !== null &&
    (globals as { locale?: unknown }).locale === "en"
  ) {
    return "en";
  }
  return "ko";
}
