import Image from "next/image";
import { siteConfig } from "@/lib/site";

const LOGO = {
  src: "/favicon/android-chrome-192x192.png",
  width: 192,
  height: 192,
} as const;

export const faviconPaths = {
  ico: "/favicon/favicon.ico",
  png16: "/favicon/favicon-16x16.png",
  png32: "/favicon/favicon-32x32.png",
  apple: "/favicon/apple-touch-icon.png",
  android192: "/favicon/android-chrome-192x192.png",
  android512: "/favicon/android-chrome-512x512.png",
} as const;

type LogoProps = {
  size?: number;
  className?: string;
  showName?: boolean;
};

export function Logo({ size = 32, className = "", showName = false }: LogoProps) {
  return (
    <span className={`inline-flex items-center gap-2 ${className}`}>
      <Image
        src={LOGO.src}
        alt={siteConfig.name}
        width={LOGO.width}
        height={LOGO.height}
        className="rounded-lg"
        style={{ width: size, height: size }}
        priority
      />
      {showName ? <span className="font-semibold">{siteConfig.name}</span> : null}
    </span>
  );
}
