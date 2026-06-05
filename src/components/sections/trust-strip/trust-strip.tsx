import { Check, Globe, Lock, Zap } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { Section } from "@/components/layout/section";

export async function TrustStrip() {
  const t = await getTranslations("trustStrip");

  const badges = [
    { icon: Zap, label: t("chromeMv3") },
    { icon: Zap, label: t("firefoxMv2") },
    { icon: Globe, label: t("languages") },
    { icon: Lock, label: t("localFirst") },
    { icon: Check, label: t("noAccount") },
  ];

  return (
    <Section className="py-12 border-y border-border bg-muted/30">
      <div className="flex flex-wrap items-center justify-center gap-8">
        {badges.map((badge) => {
          const Icon = badge.icon;
          return (
            <div
              key={badge.label}
              className="flex items-center gap-2 text-sm text-muted-foreground"
            >
              <Icon className="h-4 w-4" />
              <span>{badge.label}</span>
            </div>
          );
        })}
      </div>
    </Section>
  );
}
