import type { Metadata } from "next";
import type { Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { CosmicAnalyticsProvider } from "cosmic-analytics";
import ServiceWorkerRegistrar from "@/app/components/ServiceWorkerRegistrar";
import { BRAND_WHITE, BRAND_YELLOW } from "@/app/theme";

const primaryFont = Inter({
  weight: ["300", "400", "500", "600"],
  subsets: ["latin"],
});

// Change the title and description to your own.
export const metadata: Metadata = {
  title: "Daily Spark - Your Daily Motivation",
  description: "Get inspired every day with beautiful motivational thoughts. 365 unique thoughts to brighten your day and spark your potential.",
  applicationName: "Daily Spark",
  manifest: "/manifest.webmanifest",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Daily Spark",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: BRAND_YELLOW,
};

export default function RootLayout({
  children,
  
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={primaryFont.className}>
      <body
        className="antialiased bg-white text-gray-800 pt-[env(safe-area-inset-top)] pb-[env(safe-area-inset-bottom)]"
        style={{ backgroundColor: BRAND_WHITE }}
      >
        <ServiceWorkerRegistrar />
        <main className="min-h-[100dvh]">
          <CosmicAnalyticsProvider>
            {children}
          </CosmicAnalyticsProvider>
        </main>
      </body>
    </html>
  );
}