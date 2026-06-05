import { Suspense } from "react";
import { setRequestLocale } from "next-intl/server";
import { Navigation } from "@/components/chrome/navigation";
import { Footer } from "@/components/chrome/footer";
import { Hero } from "@/components/sections/hero/hero";
import { TrustStrip } from "@/components/sections/trust-strip/trust-strip";
import { Features } from "@/components/sections/features/features";
import { HowItWorks } from "@/components/sections/how-it-works/how-it-works";
import {
  Installation,
  InstallationFallback,
} from "@/components/sections/installation/installation";
import { Contributors } from "@/components/sections/contributors/contributors";
import { routing } from "@/i18n/routing";

type HomePageProps = {
  params: Promise<{ locale: string }>;
};

export default async function HomePage({ params }: HomePageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation />
      <main>
        <Hero />
        <TrustStrip />
        <Features />
        <HowItWorks />
        <Suspense fallback={<InstallationFallback />}>
          <Installation />
        </Suspense>
        <Contributors />
      </main>
      <Footer />
    </div>
  );
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}
