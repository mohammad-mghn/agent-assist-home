import { siteConfig } from "./site";

export type BrowserKind = "chrome" | "firefox";

export const BROWSER_COLORS: Record<BrowserKind, string> = {
  chrome: "#4285F4",
  firefox: "#FF7139",
};

export function detectBrowser(userAgent: string): BrowserKind {
  return userAgent.toLowerCase().includes("firefox") ? "firefox" : "chrome";
}

export function getBrowserInstallUrl(browser: BrowserKind): string {
  return browser === "chrome"
    ? siteConfig.chromeWebStoreUrl
    : siteConfig.firefoxAddonUrl;
}
