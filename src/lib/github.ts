import { siteConfig } from "./site";

export type GitHubReleaseAssets = {
  chrome?: string;
  firefox?: string;
};

export type GitHubRelease = {
  tagName: string;
  name: string;
  publishedAt: string;
  htmlUrl: string;
  assets: GitHubReleaseAssets;
};

type GitHubReleaseResponse = {
  tag_name: string;
  name: string;
  published_at: string;
  html_url: string;
  assets: Array<{
    name: string;
    browser_download_url: string;
  }>;
};

function parseReleaseAssets(
  assets: GitHubReleaseResponse["assets"],
): GitHubReleaseAssets {
  const result: GitHubReleaseAssets = {};

  for (const asset of assets) {
    const name = asset.name.toLowerCase();
    if (name.includes("chrome")) {
      result.chrome = asset.browser_download_url;
    }
    if (name.includes("firefox")) {
      result.firefox = asset.browser_download_url;
    }
  }

  return result;
}

function mapRelease(data: GitHubReleaseResponse): GitHubRelease {
  return {
    tagName: data.tag_name,
    name: data.name,
    publishedAt: data.published_at,
    htmlUrl: data.html_url,
    assets: parseReleaseAssets(data.assets),
  };
}

export async function getLatestRelease(options?: {
  revalidate?: number | false;
}): Promise<GitHubRelease | null> {
  const revalidate = options?.revalidate ?? 3600;

  try {
    const fetchOptions: RequestInit & { next?: { revalidate?: number } } = {
      headers: {
        Accept: "application/vnd.github+json",
        "User-Agent": "agent-assist-homepage",
      },
    };

    if (revalidate === false) {
      fetchOptions.cache = "no-store";
    } else {
      fetchOptions.next = { revalidate };
    }

    const response = await fetch(
      `https://api.github.com/repos/${siteConfig.github.repo}/releases/latest`,
      fetchOptions,
    );

    if (!response.ok) {
      return null;
    }

    const data = (await response.json()) as GitHubReleaseResponse;
    return mapRelease(data);
  } catch {
    return null;
  }
}

export function getReleaseDownloadUrl(
  _release: GitHubRelease | null,
  browser: "chrome" | "firefox",
): string {
  if (browser === "chrome") {
    return siteConfig.chromeWebStoreUrl;
  }

  return siteConfig.firefoxAddonUrl;
}
