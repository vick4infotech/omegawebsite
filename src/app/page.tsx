import { HeroSection } from "@/components/sections/hero";
import { DonationModule } from "@/components/sections/donation-module";
import { ImpactMapSection } from "@/components/sections/impact-map";
import { OurWorkSection } from "@/components/sections/our-work";
import { ImpactStatsSection } from "@/components/sections/impact-stats";
import { StoriesSection } from "@/components/sections/stories";
import { CtaBand } from "@/components/sections/cta-band";

export default function HomePage() {
  return (
    <>
      <HeroSection />

      <section className="container -mt-16 relative z-10 pb-10">
        <div className="grid gap-6 lg:grid-cols-[1.2fr_.8fr]">
          <div className="rounded-3xl border bg-card/70 p-6 shadow-sm backdrop-blur">
            <h2 className="text-2xl font-bold tracking-tight">Your generosity fuels restoration</h2>
            <p className="mt-2 max-w-2xl text-muted-foreground">
              Give once or monthly. This site demonstrates the donation experience—payment integration is a placeholder.
            </p>
            <div className="mt-5">
              <DonationModule />
            </div>
          </div>

          <div className="rounded-3xl border bg-card/70 p-6 shadow-sm backdrop-blur">
            <p className="text-xs font-semibold text-muted-foreground">Quick actions</p>
            <h3 className="mt-2 text-lg font-semibold">Explore by region</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              Use the impact map below to filter programs by country.
            </p>
            <div className="mt-4">
              <a
                href="#impact-map"
                className="inline-flex items-center rounded-2xl border bg-background px-4 py-2 text-sm font-semibold shadow-sm hover:bg-accent"
              >
                Jump to Impact Map
              </a>
            </div>
          </div>
        </div>
      </section>

      <ImpactMapSection />
      <OurWorkSection />
      <ImpactStatsSection />
      <StoriesSection />
      <CtaBand />
    </>
  );
}
