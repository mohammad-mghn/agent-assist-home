"use client";

import { useRef, useState } from "react";
import { ChevronDown } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { LOCALES, type LocaleCode } from "@/i18n/locales";
import { usePathname, useRouter } from "@/i18n/navigation";
import { LocaleFlagIcon } from "@/components/icons/locale-flag-icon";
import { useClickOutside } from "@/hooks/use-click-outside";
import { cn } from "@/lib/cn";
import { headerControlClassName } from "./header-control";

export function LanguageSwitcher() {
  const t = useTranslations("language");
  const locale = useLocale() as LocaleCode;
  const router = useRouter();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const currentLocale = LOCALES.find((item) => item.code === locale) ?? LOCALES[0]!;

  useClickOutside(menuRef, () => setOpen(false), open);

  function selectLocale(nextLocale: LocaleCode) {
    setOpen(false);
    router.replace(pathname, { locale: nextLocale });
  }

  return (
    <div className="relative" ref={menuRef}>
      <button
        type="button"
        aria-label={t("ariaLabel")}
        aria-expanded={open}
        onClick={() => setOpen((value) => !value)}
        className={cn(
          headerControlClassName,
          "gap-2 px-2.5 min-w-[2.25rem] sm:min-w-[8.5rem] lg:min-w-[11rem] justify-between",
        )}
      >
        <span className="inline-flex items-center gap-2 min-w-0">
          <LocaleFlagIcon locale={locale} />
          <span dir="auto" className="hidden sm:inline truncate text-sm">
            {currentLocale.nativeLabel}
          </span>
        </span>
        <ChevronDown
          className={cn(
            "h-4 w-4 shrink-0 text-muted-foreground transition-transform",
            open && "rotate-180",
          )}
        />
      </button>

      {open ? (
        <div className="absolute end-0 top-full z-50 mt-2 min-w-full overflow-hidden rounded-lg border border-border bg-card shadow-lg">
          {LOCALES.map((item) => (
            <button
              key={item.code}
              type="button"
              onClick={() => selectLocale(item.code)}
              className={cn(
                "flex w-full items-center gap-2 px-3 py-2 text-sm hover:bg-muted transition-colors",
                item.code === locale && "bg-muted",
              )}
            >
              <LocaleFlagIcon locale={item.code} />
              <span dir="auto">{item.nativeLabel}</span>
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}
