import Image from "next/image";
import { cn } from "@/lib/cn";

type BrowserIconProps = {
  className?: string;
};

export function ChromeIcon({ className }: BrowserIconProps) {
  return (
    <Image
      src="/icons/chrome.png"
      alt=""
      width={24}
      height={24}
      aria-hidden
      className={cn("h-6 w-6 shrink-0 rounded-full object-cover", className)}
    />
  );
}

export function FirefoxIcon({ className }: BrowserIconProps) {
  return (
    <Image
      src="/icons/firefox.png"
      alt=""
      width={24}
      height={24}
      aria-hidden
      className={cn("h-6 w-6 shrink-0 rounded-full object-cover", className)}
    />
  );
}

export function BrowserIconBadge({
  browser,
}: {
  browser: "chrome" | "firefox";
}) {
  return browser === "firefox" ? (
    <FirefoxIcon />
  ) : (
    <ChromeIcon />
  );
}
