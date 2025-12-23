import Image from "next/image";
import Link from "next/link";
import { DonationWidget } from "@/components/donation-widget";

export function HomeHero() {
  return (
    <section className="container pt-10 md:pt-14">
      <div className="grid gap-8 md:grid-cols-12 md:items-center">
        <div className="md:col-span-7">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/75">
            501(c)(3) nonprofit • Beachwood, OH
          </div>
          <h1 className="mt-4 text-3xl font-semibold tracking-tight md:text-5xl">
            Empower beyond charity—invest in sustainable community development.
          </h1>
          <p className="mt-4 max-w-xl text-base text-white/75 md:text-lg">
            Omega Global Development (OGD) partners with churches, schools, and clinics to support
            women empowerment, education, sports/arts, clinics, leader training, and long-term
            sustainability in African communities.
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <Link href="/projects" className="btn-secondary">
              Explore projects
            </Link>
            <Link href="/donate" className="btn-primary">
              Donate
            </Link>
          </div>

          <div className="mt-8 card overflow-hidden">
            <div className="relative aspect-[16/8] w-full">
              <Image
                src="/works/speakmediauganda-35305030.jpg"
                alt="Students walking to school"
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-5">
                <div className="text-sm font-semibold">Our mission</div>
                <div className="mt-1 text-sm text-white/75">
                  Faith-based development organization investing in African communities through
                  restoration, empowerment, and sustainability.
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="md:col-span-5">
          <DonationWidget />
          <div className="mt-3 text-xs text-white/60">
            Prefer to choose a project first?{" "}
            <Link className="link" href="/projects">
              View projects
            </Link>
            .
          </div>
        </div>
      </div>
    </section>
  );
}
