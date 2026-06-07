import { getTranslations } from "next-intl/server";
import { Container } from "@/components/layout/container";
import { siteConfig } from "@/lib/site";

type PrivacySectionKey =
  | "overview"
  | "dataCollection"
  | "localStorage"
  | "pageAccess"
  | "noRemote"
  | "thirdParties"
  | "chromeSync"
  | "userControl"
  | "children"
  | "changes"
  | "contact";

const SECTION_ORDER: PrivacySectionKey[] = [
  "overview",
  "dataCollection",
  "localStorage",
  "pageAccess",
  "noRemote",
  "thirdParties",
  "chromeSync",
  "userControl",
  "children",
  "changes",
  "contact",
];

const SECTIONS_WITH_ITEMS: Partial<Record<PrivacySectionKey, true>> = {
  userControl: true,
};

export async function PrivacyPolicy() {
  const t = await getTranslations("privacy");

  return (
    <Container size="sm">
      <header className="mb-10 space-y-3">
        <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
          {t("title")}
        </h1>
        <p className="text-sm text-muted-foreground">{t("lastUpdated")}</p>
        <p className="text-muted-foreground">{t("intro")}</p>
      </header>

      <div className="space-y-10">
        {SECTION_ORDER.map((sectionKey) => (
          <section key={sectionKey} className="space-y-3">
            <h2 className="text-xl font-semibold tracking-tight">
              {t(`sections.${sectionKey}.title`)}
            </h2>
            {t
              .raw(`sections.${sectionKey}.paragraphs`)
              .map((paragraph: string, index: number) => (
                <p
                  key={`${sectionKey}-paragraph-${index}`}
                  className="text-muted-foreground leading-relaxed"
                >
                  {paragraph}
                </p>
              ))}
            {SECTIONS_WITH_ITEMS[sectionKey] && (
              <ul className="list-disc space-y-2 ps-5 text-muted-foreground leading-relaxed">
                {(t.raw(`sections.${sectionKey}.items`) as string[]).map(
                  (item, index) => (
                    <li key={`${sectionKey}-item-${index}`}>{item}</li>
                  ),
                )}
              </ul>
            )}
            {sectionKey === "contact" && (
              <ul className="space-y-2 text-muted-foreground">
                {siteConfig.authors.map((author) => (
                  <li key={author.email}>
                    <a
                      href={`mailto:${author.email}`}
                      className="text-foreground underline-offset-4 hover:underline"
                    >
                      {author.name} ({author.email})
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </section>
        ))}
      </div>
    </Container>
  );
}
