"use client";

import Image from "next/image";
import { Github } from "lucide-react";
import { useTranslations } from "next-intl";
import { Container } from "@/components/layout/container";
import { ExternalLink } from "@/components/shared/external-link";
import { siteConfig } from "@/lib/site";
import { BrowserDownloadMenu } from "./browser-download-menu";
import { HERO_IMAGES } from "./hero-images";

export function HeroContent() {
	const t = useTranslations("hero");

	return (
		<div className="space-y-8">
			<div className="space-y-4">
				<div className="inline-block px-3 py-1 rounded-full bg-muted text-sm">
					{t("badge")}
				</div>
				<h1 className="text-5xl lg:text-6xl font-bold leading-tight">
					{t("title")}{" "}
					<span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500">
						{t("titleHighlight")}
					</span>
				</h1>
				<p className="text-lg text-muted-foreground max-w-2xl">
					{t("description")}
				</p>
			</div>

			<div className="space-y-4">
				<div className="flex flex-wrap gap-3">
					<BrowserDownloadMenu />
					<ExternalLink
						href={siteConfig.github.url}
						className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-border hover:bg-muted"
					>
						<Github className="h-5 w-5" />
						{t("viewOnGitHub")}
					</ExternalLink>
				</div>
				<p className="text-sm text-muted-foreground">{t("footnote")}</p>
			</div>
		</div>
	);
}

export function HeroVisual() {
	const t = useTranslations("hero");

	return (
		<div className="relative">
			<div className="relative rounded-lg border border-border shadow-2xl overflow-hidden bg-card">
				<Image
					src={HERO_IMAGES.dashboard.src}
					alt={t("dashboardAlt")}
					width={HERO_IMAGES.dashboard.width}
					height={HERO_IMAGES.dashboard.height}
					priority
					className="w-full h-auto"
					sizes="(max-width: 1024px) 100vw, 50vw"
				/>
			</div>
			<div className="absolute -bottom-10 -left-10 w-[260px] rounded-xl border border-border shadow-2xl overflow-hidden hidden sm:block">
				<Image
					src={HERO_IMAGES.dropdown.src}
					alt={t("dropdownAlt")}
					width={HERO_IMAGES.dropdown.width}
					height={HERO_IMAGES.dropdown.height}
					className="w-full h-auto"
					sizes="260px"
				/>
			</div>
		</div>
	);
}

export function Hero() {
	return (
		<section className="relative pt-32 pb-20 px-6 lg:px-8 overflow-hidden">
			<div className="absolute top-0 right-0 w-[800px] h-[800px] bg-gradient-to-br from-red-500/20 via-orange-500/20 to-yellow-500/20 rounded-full blur-3xl -z-10 opacity-60" />
			<Container>
				<div className="grid lg:grid-cols-2 gap-12 items-center">
					<HeroContent />
					<HeroVisual />
				</div>
			</Container>
		</section>
	);
}
