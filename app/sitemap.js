import { CASE_STUDY_SLUGS } from "../constants/caseStudies";
import { preventIndexing, siteUrl } from "../lib/seo";

export default function sitemap() {
  if (!siteUrl || preventIndexing) return [];
  return ["/", ...CASE_STUDY_SLUGS.map(slug => `/projects/${slug}`)].map(path => ({
    url: new URL(path, siteUrl).href,
  }));
}
