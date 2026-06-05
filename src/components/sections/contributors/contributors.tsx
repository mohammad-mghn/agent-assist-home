import type { ComponentType, ReactNode } from "react";
import { Github, Linkedin, Mail, ExternalLink } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { Section } from "@/components/layout/section";
import { SectionHeader } from "@/components/layout/section-header";
import { CardShell } from "@/components/shared/card-shell";
import { ExternalLink as ExternalAnchor } from "@/components/shared/external-link";
import { PrimaryButton } from "@/components/shared/primary-button";
import { siteConfig } from "@/lib/site";

export async function Contributors() {
  const t = await getTranslations("contributors");
  const tCommon = await getTranslations("common");

  return (
    <Section size="md" className="bg-muted/30">
      <SectionHeader title={t("title")} subtitle={t("subtitle")} />

      <div className="grid md:grid-cols-2 gap-8 mb-12">
        {siteConfig.authors.map((member) => (
          <CardShell key={member.email} className="p-6 space-y-4">
            <div className="space-y-2">
              <h3 className="text-xl font-semibold">{member.name}</h3>
              <p className="text-sm text-muted-foreground">{member.role}</p>
            </div>
            <div className="flex flex-wrap gap-3">
              <MemberLink href={`mailto:${member.email}`} icon={Mail}>
                {tCommon("email")}
              </MemberLink>
              <MemberLink href={member.linkedin} icon={Linkedin} external>
                {tCommon("linkedIn")}
              </MemberLink>
              {"portfolio" in member && member.portfolio ? (
                <MemberLink href={member.portfolio} icon={ExternalLink} external>
                  {tCommon("portfolio")}
                </MemberLink>
              ) : null}
            </div>
          </CardShell>
        ))}
      </div>

      <CardShell highlighted className="p-8 bg-primary/5 text-center space-y-4">
        <h3 className="text-xl font-semibold">{t("openTitle")}</h3>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          {t("openDescription")}
        </p>
        <PrimaryButton href={siteConfig.github.url}>
          <Github className="h-5 w-5" />
          {t("contribute")}
        </PrimaryButton>
      </CardShell>
    </Section>
  );
}

function MemberLink({
  href,
  icon: Icon,
  children,
  external = false,
}: {
  href: string;
  icon: ComponentType<{ className?: string }>;
  children: ReactNode;
  external?: boolean;
}) {
  const className =
    "inline-flex items-center gap-2 px-3 py-2 rounded-lg border border-border hover:bg-muted transition-colors text-sm";

  if (external) {
    return (
      <ExternalAnchor href={href} className={className}>
        <Icon className="h-4 w-4" />
        {children}
      </ExternalAnchor>
    );
  }

  return (
    <a href={href} className={className}>
      <Icon className="h-4 w-4" />
      {children}
    </a>
  );
}
