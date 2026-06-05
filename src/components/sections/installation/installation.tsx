import { getLatestRelease } from "@/lib/github";
import { getTranslations } from "next-intl/server";
import { Section } from "@/components/layout/section";
import { SectionHeader } from "@/components/layout/section-header";
import { InstallationSection } from "./installation-section";

type InstallationProps = {
  initialRelease: Awaited<ReturnType<typeof getLatestRelease>>;
};

async function InstallationContent({ initialRelease }: InstallationProps) {
  const t = await getTranslations("installation");

  return (
    <Section id="install" size="sm">
      <SectionHeader title={t("title")} subtitle={t("subtitle")} />
      <InstallationSection initialRelease={initialRelease} />
    </Section>
  );
}

export async function Installation() {
  const release = await getLatestRelease();
  return <InstallationContent initialRelease={release} />;
}

export async function InstallationFallback() {
  return <InstallationContent initialRelease={null} />;
}
