import type { Metadata, Viewport } from "next";
import "./globals.css";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Providers } from "@/app/providers";

export const metadata: Metadata = {
  metadataBase: new URL("http://localhost:3000"),
  title: {
    default: "Omega Global Development (OGD)",
    template: "%s | Omega Global Development (OGD)",
  },
  description:
    "Omega Global Development (OGD) is a faith-based development organization investing in African communities through restoration, empowerment, and sustainability.",
  openGraph: {
    title: "Omega Global Development (OGD)",
    description:
      "A faith-based development organization investing in African communities through restoration, empowerment, and sustainability.",
    type: "website",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "OGD" }],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/og.png"],
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export const viewport: Viewport = {
  themeColor: "#6D28D9",
  colorScheme: "dark",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <a
          href="#content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-xl focus:bg-black/80 focus:px-4 focus:py-2"
        >
          Skip to content
        </a>
        <Providers>
          <SiteHeader />
        <main id="content" className="pb-20">
          {children}
        </main>
        <SiteFooter />
        </Providers>
      </body>
    </html>
  );
}
