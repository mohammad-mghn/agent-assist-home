import { Download } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { Container } from "@/components/layout/container";
import { LogoLink } from "@/components/layout/logo-link";
import { ExternalLink } from "@/components/shared/external-link";
import { PrimaryButton } from "@/components/shared/primary-button";
import { LanguageSwitcher } from "./language-switcher";
import { ThemeToggle } from "./theme-toggle";
import { siteConfig } from "@/lib/site";

export async function Navigation() {
  const t = await getTranslations();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border px-6 lg:px-8">
      <Container>
        <div className="flex items-center justify-between h-[var(--header-height)]">
          <div className="flex items-center gap-8">
            <LogoLink />
            <div className="hidden md:flex items-center gap-6">
              <a
                href="#features"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                {t("common.features")}
              </a>
              <a
                href="#install"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                {t("common.install")}
              </a>
              <ExternalLink
                href={siteConfig.github.url}
                className="text-sm text-muted-foreground hover:text-foreground"
              >
                {t("common.github")}
              </ExternalLink>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <LanguageSwitcher />
            <ThemeToggle />
            <PrimaryButton href="#download" className="hidden sm:flex px-4 py-2 text-sm">
              <Download className="h-4 w-4" />
              {t("nav.download")}
            </PrimaryButton>
          </div>
        </div>
      </Container>
    </nav>
  );
}
