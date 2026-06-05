"use client";

import { useEffect, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { CardShell } from "@/components/shared/card-shell";
import { ExternalLink } from "@/components/shared/external-link";
import { type GitHubRelease, getReleaseDownloadUrl } from "@/lib/github";
import { siteConfig } from "@/lib/site";
import type { BrowserKind } from "@/lib/browser";
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
  const [browser, setBrowser] = useState<BrowserKind>("chrome");
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
  const versionLabel = release?.tagName
    ? t("downloadTag", { tag: release.tagName })
    : t("downloadFallback");
  const browserLabel =
    browser === "firefox" ? t("firefoxBuild") : t("chromeBuild");

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
          {t("downloadHint", { build: browserLabel })}
        </p>
      </CardShell>

      <QuickStartGuide />
    </>
  );
}
