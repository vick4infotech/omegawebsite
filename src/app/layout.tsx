import type { Metadata } from "next";

import "./globals.css";

import { site } from "@/config/site";
import { ThemeProvider } from "@/components/layout/theme-provider";
import { SmoothScroll } from "@/components/layout/smooth-scroll";
import { DonationProvider } from "@/components/layout/donation-context";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { PageTransition } from "@/components/layout/page-transition";

export const metadata: Metadata = {
  title: {
    default: site.name,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  metadataBase: new URL("https://www.omegaglobaldevelopment.org"),
  openGraph: {
    title: site.name,
    description: site.description,
    url: "/",
    siteName: site.name,
    images: [{ url: "/assets/hero.jpg", width: 1200, height: 630, alt: site.tagline }],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: site.name,
    description: site.description,
    images: ["/assets/hero.jpg"],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="ogd-grain min-h-screen bg-background font-sans text-foreground antialiased">
        <ThemeProvider>
          <SmoothScroll>
            <DonationProvider>
              <Navbar />
              <PageTransition>
                <main className="min-h-[70vh]">{children}</main>
              </PageTransition>
              <Footer />
            </DonationProvider>
          </SmoothScroll>
        </ThemeProvider>
      </body>
    </html>
  );
}
