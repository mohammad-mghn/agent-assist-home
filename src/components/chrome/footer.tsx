import type { ReactNode } from "react";
import { Github } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { LogoLink } from "@/components/layout/logo-link";
import { Container } from "@/components/layout/container";
import { ExternalLink } from "@/components/shared/external-link";
import { Link } from "@/i18n/navigation";
import { siteConfig } from "@/lib/site";

export async function Footer() {
  const t = await getTranslations("footer");
  const tCommon = await getTranslations("common");

  return (
    <footer className="py-12 px-6 lg:px-8 border-t border-border">
      <Container>
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div className="space-y-4">
            <LogoLink />
            <p className="text-sm text-muted-foreground">{t("tagline")}</p>
          </div>

          <FooterColumn title={t("product")}>
            <FooterLink href="#features">{tCommon("features")}</FooterLink>
            <FooterLink href="#install">{tCommon("install")}</FooterLink>
            <FooterLink href="#download">{tCommon("download")}</FooterLink>
          </FooterColumn>

          <FooterColumn title={t("project")}>
            <FooterLink href="/privacy">{t("privacy")}</FooterLink>
            <FooterLink href={siteConfig.github.url} external>
              {tCommon("github")}
            </FooterLink>
            <FooterLink
              href={`${siteConfig.github.url}/blob/main/home/LICENSE`}
              external
            >
              {t("mitLicense")}
            </FooterLink>
            <FooterLink href={`${siteConfig.github.url}/releases`} external>
              {t("releases")}
            </FooterLink>
          </FooterColumn>

          <FooterColumn title={t("contact")}>
            {siteConfig.authors.map((author) => (
              <FooterLink key={author.email} href={`mailto:${author.email}`}>
                {t("emailFor", { name: author.name.split(" ")[0]! })}
              </FooterLink>
            ))}
          </FooterColumn>
        </div>

        <div className="pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">{t("copyright")}</p>
          <ExternalLink
            href={siteConfig.github.url}
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
          >
            <Github className="h-4 w-4" />
            {tCommon("openSource")}
          </ExternalLink>
        </div>
      </Container>
    </footer>
  );
}

function FooterColumn({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <div className="space-y-4">
      <h4 className="font-semibold">{title}</h4>
      <ul className="space-y-2 text-sm text-muted-foreground">{children}</ul>
    </div>
  );
}

function FooterLink({
  href,
  children,
  external = false,
}: {
  href: string;
  children: ReactNode;
  external?: boolean;
}) {
  const className = "hover:text-foreground transition-colors";

  if (external) {
    return (
      <li>
        <ExternalLink href={href} className={className}>
          {children}
        </ExternalLink>
      </li>
    );
  }

  if (href.startsWith("/")) {
    return (
      <li>
        <Link href={href} className={className}>
          {children}
        </Link>
      </li>
    );
  }

  return (
    <li>
      <a href={href} className={className}>
        {children}
      </a>
    </li>
  );
}
