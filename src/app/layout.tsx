import type { Metadata } from "next";
import localFont from "next/font/local";
import { Source_Sans_3 } from "next/font/google";
import { SkipLink } from "@/components/SkipLink";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { PreloadAssets } from "@/components/PreloadAssets";
import "./globals.css";

const display = localFont({
  src: [
    {
      path: "../fonts/Norsebold.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../fonts/Norsebold.otf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-norse",
  display: "swap",
});

const body = Source_Sans_3({
  subsets: ["latin"],
  variable: "--font-source-sans",
});

export const metadata: Metadata = {
  title: {
    default: "Little Norway Boats | Viking-Themed Electric Rentals",
    template: "%s | Little Norway Boats",
  },
  description:
    "Rent a Viking-themed electric Duffy boat. Quiet harbor cruises, sunset sails, and dog-friendly voyages with Little Norway Boats.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable} h-full`}>
      <body className="flex min-h-full flex-col antialiased">
        <PreloadAssets />
        <SkipLink />
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
