"use client";

import { useEffect, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { CardShell } from "@/components/shared/card-shell";
import { ExternalLink } from "@/components/shared/external-link";
import { useBrowserDetection } from "@/hooks/use-browser-detection";
import { type GitHubRelease, getReleaseDownloadUrl } from "@/lib/github";
import { siteConfig } from "@/lib/site";
import { DownloadButton } from "./download-button";
import { InstallationTabs, QuickStartGuide } from "./installation-tabs";

type InstallationSectionProps = {
  initialRelease: GitHubRelease | null;
};

function formatPublishedDate(publishedAt: string, locale: string) {
  return new Intl.DateTimeFormat(locale, { dateStyle: "medium" }).format(
    new Date(publishedAt),
  );
}

export function InstallationSection({
  initialRelease,
}: InstallationSectionProps) {
  const t = useTranslations("installation");
  const locale = useLocale();
  const [browser, setBrowser] = useBrowserDetection();
  const [release, setRelease] = useState<GitHubRelease | null>(initialRelease);

  useEffect(() => {
    let cancelled = false;

    async function fetchLatestRelease() {
      try {
        const response = await fetch("/api/releases/latest");
        if (!response.ok) {
          return;
        }

        const data = (await response.json()) as GitHubRelease;
        if (!cancelled) {
          setRelease(data);
        }
      } catch {
        // Keep server-rendered release data when the client fetch fails.
      }
    }

    void fetchLatestRelease();
    return () => {
      cancelled = true;
    };
  }, []);

  const downloadUrl = getReleaseDownloadUrl(release, browser);
  const versionLabel =
    browser === "chrome" ? t("chromeStoreButton") : t("firefoxStoreButton");
  const downloadHint =
    browser === "chrome" ? t("chromeStoreHint") : t("firefoxStoreHint");

  return (
    <>
      <InstallationTabs browser={browser} onBrowserChange={setBrowser} />

      <CardShell id="download" className="p-8 space-y-6">
        <div className="space-y-2">
          <h3 className="text-xl font-semibold">{t("downloadTitle")}</h3>
          <p className="text-sm text-muted-foreground">
            {release ? (
              t("latestRelease", {
                tag: release.tagName,
                date: formatPublishedDate(release.publishedAt, locale),
              })
            ) : (
              <>
                {t("fetchingRelease")}{" "}
                <ExternalLink
                  href={siteConfig.github.releasesUrl}
                  className="underline underline-offset-4 hover:text-foreground"
                >
                  GitHub Releases
                </ExternalLink>
              </>
            )}
          </p>
        </div>

        <DownloadButton href={downloadUrl} label={versionLabel} />

        <p className="text-xs text-center text-muted-foreground">
          {downloadHint}
        </p>
      </CardShell>

      <QuickStartGuide />
    </>
  );
}
