export type LocaleCode = "en" | "en-gb" | "fa" | "ar" | "tr" | "ku";

export type LocaleConfig = {
  code: LocaleCode;
  extensionCode: "en-US" | "en-GB" | "fa" | "ar" | "tr" | "ku";
  flag: string;
  label: string;
  nativeLabel: string;
  dir: "ltr" | "rtl";
};

export const DEFAULT_LOCALE: LocaleCode = "fa";

export const LOCALES: LocaleConfig[] = [
  {
    code: "en",
    extensionCode: "en-US",
    flag: "🇺🇸",
    label: "English (US)",
    nativeLabel: "English (US)",
    dir: "ltr",
  },
  {
    code: "en-gb",
    extensionCode: "en-GB",
    flag: "🇬🇧",
    label: "English (UK)",
    nativeLabel: "English (UK)",
    dir: "ltr",
  },
  {
    code: "fa",
    extensionCode: "fa",
    flag: "🇮🇷",
    label: "Persian",
    nativeLabel: "فارسی",
    dir: "rtl",
  },
  {
    code: "ar",
    extensionCode: "ar",
    flag: "🇸🇦",
    label: "Arabic",
    nativeLabel: "العربية",
    dir: "rtl",
  },
  {
    code: "tr",
    extensionCode: "tr",
    flag: "🇹🇷",
    label: "Turkish",
    nativeLabel: "Türkçe",
    dir: "ltr",
  },
  {
    code: "ku",
    extensionCode: "ku",
    flag: "☀️",
    label: "Kurdish",
    nativeLabel: "کوردی",
    dir: "rtl",
  },
];

export function getLocaleConfig(locale: string): LocaleConfig {
  return LOCALES.find((item) => item.code === locale) ?? LOCALES[0]!;
}

export function getLocaleHrefLang(locale: LocaleCode): string {
  const config = getLocaleConfig(locale);
  if (config.extensionCode.startsWith("en")) {
    return config.extensionCode.toLowerCase();
  }
  return config.extensionCode;
}
