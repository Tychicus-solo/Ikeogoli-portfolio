// Set SITE_URL to the final public origin. Never infer canonicals from request hosts.
const configuredUrl = process.env.SITE_URL;
export const siteUrl = configuredUrl ? new URL(configuredUrl) : undefined;
export const preventIndexing = !siteUrl || process.env.SITE_NOINDEX === "true" || process.env.VERCEL_ENV === "preview";
export const description = "The portfolio of Ikeogoli Ishie, showcasing selected product design work across web and mobile experiences.";
export const title = "Ikeogoli Ishie | Portfolio";
export const socialImage = { url: "/opengraph-image", width: 1200, height: 630, alt: "Ikeogoli Ishie — Product designer" };

export function pageMetadata({ pageTitle = title, summary = description, path = "/" } = {}) {
  return {
    title: pageTitle,
    description: summary,
    ...(siteUrl ? { alternates: { canonical: new URL(path, siteUrl).href } } : {}),
    openGraph: {
      title: pageTitle, description: summary, type: "website", siteName: title,
      ...(siteUrl ? { url: new URL(path, siteUrl).href, images: [socialImage] } : {}),
    },
    twitter: { card: "summary_large_image", title: pageTitle, description: summary, ...(siteUrl ? { images: [socialImage] } : {}) },
  };
}
