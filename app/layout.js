import { Inter } from "next/font/google";
import localFont from "next/font/local";
import { ThemeProvider } from "../components";
import "./globals.css";

const suisse = localFont({
  src: [
    {
      path: "../public/fonts/suisse/SuisseIntl-Light.ttf",
      weight: "300",
      style: "normal",
    },
    {
      path: "../public/fonts/suisse/SuisseIntl-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/suisse/SuisseIntl-Medium.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../public/fonts/suisse/SuisseIntl-SemiBold.ttf",
      weight: "600",
      style: "normal",
    },
    {
      path: "../public/fonts/suisse/SuisseIntl-Bold.ttf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-suisse",
});

const nohemi = localFont({
  src: [
    {
      path: "../public/fonts/Nohemi-Thin-BF6438cc57e2011.woff",
      weight: "100",
      style: "normal",
    },
    {
      path: "../public/fonts/Nohemi-ExtraLight-BF6438cc581502c.woff",
      weight: "200",
      style: "normal",
    },
    {
      path: "../public/fonts/Nohemi-Light-BF6438cc5702321.woff",
      weight: "300",
      style: "normal",
    },
    {
      path: "../public/fonts/Nohemi-Regular-BF6438cc579d934.woff",
      weight: "400",
      style: "normal",
    },
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
    {
      path: "../public/fonts/Nohemi-Bold-BF6438cc577b524.woff",
      weight: "700",
      style: "normal",
    },
    {
      path: "../public/fonts/Nohemi-ExtraBold-BF6438cc5761ae2.woff",
      weight: "800",
      style: "normal",
    },
    {
      path: "../public/fonts/Nohemi-Black-BF6438cc565e67b.woff",
      weight: "900",
      style: "normal",
    },
  ],
  variable: "--font-nohemi",
});

export const metadata = {
  applicationName: "Ikeogoli Ishie Portfolio",
  title: "Ikeogoli Ishie | Portfolio",
  description:
    "The portfolio of Ikeogoli Ishie, showcasing selected product design work across web and mobile experiences.",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${suisse.variable} ${nohemi.variable} h-full antialiased`}
    >
      <body className="min-h-full w-full bg-neutral-900">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
