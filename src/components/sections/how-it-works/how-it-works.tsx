import { PlusCircle, Power, Zap } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { Section } from "@/components/layout/section";
import { SectionHeader } from "@/components/layout/section-header";
import { NumberedStep } from "@/components/shared/numbered-step";

const STEPS = [
  { number: 1, icon: PlusCircle, key: "create" as const },
  { number: 2, icon: Power, key: "enable" as const },
  { number: 3, icon: Zap, key: "use" as const },
];

export async function HowItWorks() {
  const t = await getTranslations("howItWorks");

  return (
    <Section size="md" className="bg-muted/30">
      <SectionHeader title={t("title")} subtitle={t("subtitle")} />

      <div className="grid md:grid-cols-3 gap-8">
        {STEPS.map((step) => (
          <div key={step.number} className="relative">
            <NumberedStep
              number={step.number}
              icon={step.icon}
              title={t(`steps.${step.key}.title`)}
              description={t(`steps.${step.key}.description`)}
            />
            {step.number < STEPS.length ? (
              <div className="hidden md:block absolute top-6 -right-4 w-8 h-0.5 bg-border" />
            ) : null}
          </div>
        ))}
      </div>
    </Section>
  );
}
