"use client";

import { useRef, useState } from "react";
import { ChevronDown } from "lucide-react";
import { useTranslations } from "next-intl";
import {
  BrowserIconBadge,
  ChromeIcon,
  FirefoxIcon,
} from "@/components/icons/browser-icons";
import { ExternalLink } from "@/components/shared/external-link";
import { useBrowserDetection } from "@/hooks/use-browser-detection";
import { useClickOutside } from "@/hooks/use-click-outside";
import { BROWSER_COLORS, getBrowserInstallUrl } from "@/lib/browser";
import { siteConfig } from "@/lib/site";

export function BrowserDownloadMenu() {
  const t = useTranslations("hero");
  const tCommon = useTranslations("common");
  const browser = useBrowserDetection();
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useClickOutside(menuRef, () => setOpen(false), open);

  const browserLabel =
    browser === "firefox" ? tCommon("firefox") : tCommon("chrome");

  return (
    <div className="relative inline-flex" ref={menuRef}>
      <ExternalLink
        href={getBrowserInstallUrl(browser)}
        className="inline-flex items-center gap-2 px-6 py-3 rounded-s-lg font-medium transition-opacity hover:opacity-90"
        style={{
          backgroundColor: BROWSER_COLORS[browser],
          color: "white",
        }}
      >
        <BrowserIconBadge browser={browser} />
        {t("downloadFor", { browser: browserLabel })}
      </ExternalLink>
      <button
        type="button"
        aria-expanded={open}
        aria-haspopup="true"
        onClick={() => setOpen((value) => !value)}
        className="inline-flex items-center px-2 py-3 rounded-e-lg border-s border-white/25 transition-opacity hover:opacity-90"
        style={{
          backgroundColor: BROWSER_COLORS[browser],
          color: "white",
        }}
      >
        <ChevronDown
          className={`h-4 w-4 transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>
      {open ? (
        <div className="absolute top-full mt-2 end-0 w-full min-w-[240px] bg-card border border-border rounded-lg shadow-lg overflow-hidden z-10">
          <ExternalLink
            href={siteConfig.chromeWebStoreUrl}
            className="flex items-center gap-2 px-4 py-3 hover:bg-muted"
            style={{ color: BROWSER_COLORS.chrome }}
          >
            <ChromeIcon />
            {t("chromeBrowsers")}
          </ExternalLink>
          <ExternalLink
            href={siteConfig.github.releasesUrl}
            className="flex items-center gap-2 px-4 py-3 hover:bg-muted"
            style={{ color: BROWSER_COLORS.firefox }}
          >
            <FirefoxIcon />
            {tCommon("firefox")}
          </ExternalLink>
        </div>
      ) : null}
    </div>
  );
}
