import { getTranslations } from "next-intl/server";
import { Section } from "@/components/layout/section";
import { SectionHeader } from "@/components/layout/section-header";
import { FeatureCard } from "@/components/shared/feature-card";
import { FEATURE_ITEMS } from "./features-data";

export async function Features() {
  const t = await getTranslations("features");
  const tCommon = await getTranslations("common");

  return (
    <Section id="features">
      <SectionHeader
        title={t("title")}
        subtitle={t("subtitle")}
        className="mb-16"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {FEATURE_ITEMS.map((feature) => (
          <FeatureCard
            key={feature.key}
            icon={feature.icon}
            title={t(`items.${feature.key}.title`)}
            description={t(`items.${feature.key}.description`)}
            highlight={feature.highlight}
            highlightLabel={feature.highlight ? tCommon("keyFeature") : undefined}
            size={feature.size}
            color={feature.color}
            bgColor={feature.bgColor}
          />
        ))}
      </div>
    </Section>
  );
}
