import localFont from "next/font/local";
import { ThemeProvider } from "../components";
import "./globals.css";
import { pageMetadata, preventIndexing, siteUrl } from "../lib/seo";
import AccessibilityControls from "../components/AccessibilityControls";

const suisse = localFont({
  src: [
    {
      path: "../public/fonts/suisse/SuisseIntl-Light.woff2",
      weight: "300",
      style: "normal",
    },
    {
      path: "../public/fonts/suisse/SuisseIntl-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/suisse/SuisseIntl-Medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../public/fonts/suisse/SuisseIntl-SemiBold.woff2",
      weight: "600",
      style: "normal",
    },
    {
      path: "../public/fonts/suisse/SuisseIntl-Bold.woff2",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-suisse",
  preload: false,
});

const nohemi = localFont({
  src: [
    {
      path: "../public/fonts/Nohemi-Medium-BF6438cc57ddecd.woff",
      weight: "500",
      style: "normal",
    },
    {
      path: "../public/fonts/Nohemi-SemiBold-BF6438cc57db2ff.woff",
      weight: "600",
      style: "normal",
    },
  ],
  variable: "--font-nohemi",
});

export const metadata = {
  ...pageMetadata(),
  applicationName: "Ikeogoli Ishie Portfolio",
  // Without a public origin this base is used only for preview sharing assets.
  // Canonical URLs and sitemap entries still require an explicit SITE_URL.
  metadataBase: siteUrl || new URL(process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000"),
  ...(preventIndexing ? { robots: { index: false, follow: false } } : {}),
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${suisse.variable} ${nohemi.variable} h-full antialiased`}
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(() => {
              let theme = "dark";
              try {
                if (localStorage.getItem("ikeogoli-theme") === "light") theme = "light";
              } catch {}
              document.documentElement.dataset.theme = theme;
            })();`,
          }}
        />
      </head>
      <body className="min-h-full w-full bg-neutral-900">
        <AccessibilityControls />
        {siteUrl && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org",
          "@graph": [
            { "@type": "WebSite", "@id": `${siteUrl.href}#website`, url: siteUrl.href, name: "Ikeogoli Ishie Portfolio", inLanguage: "en" },
            { "@type": "Person", "@id": `${siteUrl.href}#person`, name: "Ikeogoli Ishie", jobTitle: "Product Designer", url: siteUrl.href, sameAs: ["https://x.com/ikeogoliishie"] },
          ],
        }).replace(/</g, "\\u003c") }} />}
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
