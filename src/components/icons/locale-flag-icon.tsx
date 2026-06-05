import Image from "next/image";
import { cn } from "@/lib/cn";
import type { LocaleCode } from "@/i18n/locales";

const FLAG_SIZE = 24;

type LocaleFlagIconProps = {
  locale: LocaleCode;
  className?: string;
};

export function LocaleFlagIcon({ locale, className }: LocaleFlagIconProps) {
  return (
    <Image
      src={`/icons/flags/${locale}.png`}
      alt=""
      width={FLAG_SIZE}
      height={FLAG_SIZE}
      aria-hidden
      className={cn(
        "h-6 w-6 shrink-0 rounded-full object-cover ring-1 ring-border/60",
        className,
      )}
    />
  );
}
