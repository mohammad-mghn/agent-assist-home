"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { cn } from "@/lib/cn";
import { headerControlClassName, headerIconClassName } from "./header-control";

export function ThemeToggle() {
  const t = useTranslations("theme");
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <button
      type="button"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className={cn(headerControlClassName, "w-9 shrink-0")}
      aria-label={t("toggle")}
    >
      {mounted ? (
        theme === "dark" ? (
          <Sun className={headerIconClassName} />
        ) : (
          <Moon className={headerIconClassName} />
        )
      ) : (
        <Sun className={headerIconClassName} />
      )}
    </button>
  );
}
