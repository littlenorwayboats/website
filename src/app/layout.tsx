import type { CSSProperties } from "react";
import { Suspense } from "react";
import type { Metadata, Viewport } from "next";
import { Cinzel, Cormorant_Garamond } from "next/font/google";
import { SkipLink } from "@/components/SkipLink";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { JsonLd } from "@/components/JsonLd";
import { PreloadAssets } from "@/components/PreloadAssets";
import { PreviewFallback, PreviewGate } from "@/components/PreviewGate";
import { PreviewProvider } from "@/components/PreviewProvider";
import { cssImageSet } from "@/lib/images";
import {
  OG_IMAGE,
  SITE_DESCRIPTION,
  SITE_NAME,
  SITE_TITLE,
  siteUrl,
} from "@/lib/site";
import { organizationJsonLd } from "@/lib/structured-data";
import "./globals.css";

const display = Cinzel({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  display: "swap",
  variable: "--font-display",
});

const body = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
  variable: "--font-body",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#243644",
};

export const metadata: Metadata = {
  metadataBase: siteUrl,
  title: {
    default: SITE_TITLE,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: SITE_NAME,
    images: [OG_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    images: [OG_IMAGE.url],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  const walnut = cssImageSet("/images/textures/walnut-wood.jpg");

  return (
    <html
      lang="en"
      className={`${display.variable} ${body.variable} h-full`}
      style={{ "--tex-walnut": walnut } as CSSProperties}
    >
      <body className="flex min-h-full min-w-0 flex-col bg-norse-950 font-sans text-lg text-parchment antialiased">
        <JsonLd data={organizationJsonLd()} />
        <PreloadAssets />
        <SkipLink />
        <Suspense fallback={<PreviewFallback />}>
          <PreviewProvider>
            <Header />
            <div className="flex min-w-0 w-full flex-1 flex-col overflow-x-hidden">
              <PreviewGate>{children}</PreviewGate>
            </div>
          </PreviewProvider>
        </Suspense>
        <Footer />
      </body>
    </html>
  );
}
