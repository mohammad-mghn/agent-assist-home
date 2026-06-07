import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";
import { Navigation } from "@/components/chrome/navigation";
import { Footer } from "@/components/chrome/footer";
import { PrivacyPolicy } from "@/components/pages/privacy-policy";
import { routing } from "@/i18n/routing";
import { siteConfig } from "@/lib/site";

type PrivacyPageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({
  params,
}: PrivacyPageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "privacy.metadata" });

  return {
    title: t("title"),
    description: t("description"),
    openGraph: {
      title: t("title"),
      description: t("description"),
      url: `${siteConfig.url}/${locale}/privacy`,
      siteName: siteConfig.name,
      type: "website",
    },
  };
}

export default async function PrivacyPage({ params }: PrivacyPageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation />
      <main className="pt-[calc(var(--header-height)+3rem)] pb-20 px-6 lg:px-8">
        <PrivacyPolicy />
      </main>
      <Footer />
    </div>
  );
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}
