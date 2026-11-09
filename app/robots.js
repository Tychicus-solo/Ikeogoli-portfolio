import { preventIndexing, siteUrl } from "../lib/seo";

export default function robots() {
  return {
    rules: { userAgent: "*", ...(preventIndexing ? { disallow: "/" } : { allow: "/" }) },
    ...(siteUrl && !preventIndexing ? { sitemap: new URL("/sitemap.xml", siteUrl).href } : {}),
  };
}
