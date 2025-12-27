import type { Metadata } from "next";

import { AboutNarrative } from "@/components/sections/about-narrative";
import { site } from "@/config/site";

export const metadata: Metadata = {
  title: "About Us",
  description: `${site.acronym} is a faith-rooted nonprofit empowering communities across Africa through restoration, investment, change, and enrichment.`,
};

export default function AboutUsPage() {
  return <AboutNarrative />;
}
