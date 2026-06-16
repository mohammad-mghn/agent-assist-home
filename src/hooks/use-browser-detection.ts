"use client";

import { useEffect, useState } from "react";
import { type BrowserKind, detectBrowser } from "@/lib/browser";

export function useBrowserDetection(
  defaultBrowser: BrowserKind = "chrome",
): [BrowserKind, (browser: BrowserKind) => void] {
  const [browser, setBrowser] = useState<BrowserKind>(defaultBrowser);

  useEffect(() => {
    setBrowser(detectBrowser(navigator.userAgent));
  }, []);

  return [browser, setBrowser];
}
