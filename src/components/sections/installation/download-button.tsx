"use client";

import { Download } from "lucide-react";
import { useTranslations } from "next-intl";
import { ExternalLink } from "@/components/shared/external-link";

type DownloadButtonProps = {
  href: string;
  label?: string;
};

export function DownloadButton({ href, label }: DownloadButtonProps) {
  const t = useTranslations("installation");

  return (
    <ExternalLink
      href={href}
      className="flex items-center justify-center gap-2 px-6 py-4 rounded-lg bg-primary text-primary-foreground hover:opacity-90 font-medium"
    >
      <Download className="h-5 w-5" />
      <span>{label ?? t("downloadFallback")}</span>
    </ExternalLink>
  );
}
