import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import "../globals.css";
import { hasLang, languageTags, locales } from "@/lib/i18n/config";
import { LangProvider } from "@/lib/i18n/context";
import { SITE_NAME, SITE_URL } from "@/lib/site";

// Both languages are pre-rendered; any other first segment is rewritten by proxy.ts to "fr".
export const dynamicParams = false;
export const generateStaticParams = () => locales.map((lang) => ({ lang }));

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  applicationName: SITE_NAME,
  title: SITE_NAME,
  // Search Console / Bing Webmaster Tools ownership, set in Vercel once the properties exist.
  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION,
    other: process.env.BING_SITE_VERIFICATION
      ? { "msvalidate.01": process.env.BING_SITE_VERIFICATION }
      : undefined,
  },
};

export const viewport: Viewport = { themeColor: "#1c493c" };

export default async function RootLayout({ children, params }: LayoutProps<"/[lang]">) {
  const { lang } = await params;
  if (!hasLang(lang)) notFound();
  return (
    <html lang={languageTags[lang]}>
      <body>
        <LangProvider lang={lang}>{children}</LangProvider>
      </body>
    </html>
  );
}
