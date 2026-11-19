import type { Metadata, Viewport } from "next";
import { Alegreya, Alegreya_Sans, Amatic_SC, Cinzel, Cormorant_Garamond } from "next/font/google";
import { SkipLink } from "@/components/SkipLink";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { JsonLd } from "@/components/JsonLd";
import { PreviewGate } from "@/components/PreviewGate";
import { PreviewProvider } from "@/components/PreviewProvider";
import {
  OG_IMAGE,
  SITE_DESCRIPTION,
  SITE_NAME,
  SITE_TITLE,
  siteUrl,
} from "@/lib/site";
import { SITE_LAUNCHED } from "@/lib/preview";
import { organizationJsonLd } from "@/lib/structured-data";
import "./globals.css";

// Variable fonts: one file per style covers every weight.
const display = Cinzel({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-display",
});

const body = Cormorant_Garamond({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-body",
});

const hero = Amatic_SC({
  subsets: ["latin"],
  weight: "700",
  display: "swap",
  variable: "--font-hero",
});

const alegreya = Alegreya({
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
  variable: "--font-alegreya",
});

const alegreyaSans = Alegreya_Sans({
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
  variable: "--font-alegreya-sans",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
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
  return (
    <html
      lang="en"
      className={`${display.variable} ${body.variable} ${hero.variable} ${alegreya.variable} ${alegreyaSans.variable} h-full bg-norse-950`}
    >
      <body className="flex min-h-full min-w-0 flex-col bg-norse-950 font-alegreya text-lg font-normal text-parchment antialiased">
        <JsonLd data={organizationJsonLd()} />
        <SkipLink />
        {SITE_LAUNCHED ? (
          <>
            <Header />
            <div className="header-offset flex min-w-0 w-full flex-1 flex-col overflow-x-clip">
              {children}
            </div>
            <Footer />
          </>
        ) : (
          <PreviewProvider>
            <Header />
            <div className="header-offset flex min-w-0 w-full flex-1 flex-col overflow-x-clip">
              <PreviewGate>{children}</PreviewGate>
            </div>
            <Footer />
          </PreviewProvider>
        )}
      </body>
    </html>
  );
}
