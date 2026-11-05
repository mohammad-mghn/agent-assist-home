import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import {
  getMessages,
  getTranslations,
  setRequestLocale,
} from "next-intl/server";
import { hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { Providers } from "@/components/chrome/providers";
import { faviconPaths } from "@/components/chrome/logo";
import { getLocaleConfig } from "@/i18n/locales";
import { routing } from "@/i18n/routing";
import { siteConfig } from "@/lib/site";
import "../globals.css";

type LocaleLayoutProps = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: LocaleLayoutProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata" });

  return {
    metadataBase: new URL(siteConfig.url),
    title: {
      default: t("title"),
      template: `%s | ${siteConfig.name}`,
    },
    description: t("description"),
    openGraph: {
      title: t("title"),
      description: t("description"),
      url: siteConfig.url,
      siteName: siteConfig.name,
      type: "website",
      images: [
        {
          url: "/og.png",
          width: 2400,
          height: 1254,
          alt: siteConfig.name,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: t("title"),
      description: t("description"),
      images: ["/og.png"],
    },
    robots: {
      index: true,
      follow: true,
    },
    icons: {
      icon: [
        { url: faviconPaths.ico, sizes: "any" },
        { url: faviconPaths.png16, sizes: "16x16", type: "image/png" },
        { url: faviconPaths.png32, sizes: "32x32", type: "image/png" },
      ],
      apple: faviconPaths.apple,
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: LocaleLayoutProps) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);

  const messages = await getMessages();
  const { dir } = getLocaleConfig(locale);

  return (
    <html lang={locale} dir={dir} suppressHydrationWarning>
      <body>
        <Providers>
          <NextIntlClientProvider messages={messages}>
            {children}
          </NextIntlClientProvider>
        </Providers>
      </body>
    </html>
  );
}
