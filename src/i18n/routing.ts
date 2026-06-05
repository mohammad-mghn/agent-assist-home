import { defineRouting } from "next-intl/routing";
import { DEFAULT_LOCALE, LOCALES } from "./locales";

export const routing = defineRouting({
  locales: LOCALES.map((locale) => locale.code),
  defaultLocale: DEFAULT_LOCALE,
  localePrefix: "always",
});
