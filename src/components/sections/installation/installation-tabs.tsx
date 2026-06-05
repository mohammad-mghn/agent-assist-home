"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { NumberedStepRow } from "@/components/shared/numbered-step";
import type { BrowserKind } from "@/lib/browser";

type InstallationTabsProps = {
  browser?: BrowserKind;
  onBrowserChange?: (browser: BrowserKind) => void;
};

export function InstallationTabs({
  browser: browserProp,
  onBrowserChange,
}: InstallationTabsProps = {}) {
  const t = useTranslations("installation");
  const [internalBrowser, setInternalBrowser] = useState<BrowserKind>("chrome");
  const browser = browserProp ?? internalBrowser;
  const setBrowser = onBrowserChange ?? setInternalBrowser;
  const steps =
    browser === "chrome"
      ? (t.raw("chromeSteps") as string[])
      : (t.raw("firefoxSteps") as string[]);

  return (
    <>
      <div className="flex gap-2 mb-8 border-b border-border">
        {(["chrome", "firefox"] as const).map((value) => (
          <button
            key={value}
            onClick={() => setBrowser(value)}
            className={`px-6 py-3 font-medium transition-colors border-b-2 ${
              browser === value
                ? "border-primary text-foreground"
                : "border-transparent text-muted-foreground hover:text-foreground"
            }`}
          >
            {value === "chrome" ? t("chromeTab") : t("firefoxTab")}
          </button>
        ))}
      </div>

      <div className="space-y-4 mb-12">
        {steps.map((step, index) => (
          <NumberedStepRow key={index} number={index + 1} description={step} />
        ))}
      </div>
    </>
  );
}

export function QuickStartGuide() {
  const t = useTranslations("installation");
  const steps = t.raw("quickStartSteps") as string[];

  return (
    <div className="mt-12 p-6 rounded-xl bg-muted/50 space-y-4">
      <h4 className="font-semibold">{t("quickStartTitle")}</h4>
      <ol className="space-y-2 text-sm text-muted-foreground list-decimal list-inside">
        {steps.map((step, index) => (
          <li key={index}>{step}</li>
        ))}
      </ol>
      <div className="flex items-center gap-2 text-sm">
        <div className="w-3 h-3 rounded-full bg-green-500" />
        <span className="text-muted-foreground">{t("greenActive")}</span>
        <div className="w-3 h-3 rounded-full bg-red-500 ms-4" />
        <span className="text-muted-foreground">{t("redDisabled")}</span>
      </div>
    </div>
  );
}
