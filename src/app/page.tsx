import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { HomeHero } from "@/components/hero";
import { Section } from "@/components/section";
import { causes } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Home",
};

export default function HomePage() {
  return (
    <>
      <HomeHero />

      <Section title="Who we are" eyebrow="Church roots • Global partnerships">
        <div className="grid gap-6 md:grid-cols-12">
          <div className="md:col-span-7">
            <p className="text-white/75">
              Omega Global Development (OGD) grows from church roots and a commitment to empower beyond
              charity. We partner with churches, schools, and clinics—supporting women empowerment,
              education, sports/arts, clinics, leader training, and sustainability.
            </p>
            <p className="mt-4 text-white/75">
              Our focus is on restoration, empowerment, and sustainable development that honors local
              leadership and community strength.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link className="btn-primary" href="/about">
                Learn more
              </Link>
              <Link className="btn-secondary" href="/donate">
                Donate
              </Link>
            </div>
          </div>

          <div className="md:col-span-5">
            <div className="card overflow-hidden">
              <div className="relative aspect-[4/3] w-full">
                <Image
                  src="/works/medium-shot-smiley-kids-window.jpg"
                  alt="Children waving from a classroom window"
                  fill
                  className="object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-black/55 via-black/10 to-transparent" />
              </div>
              <div className="p-5">
                <div className="text-sm font-semibold">Partner with us</div>
                <div className="mt-1 text-sm text-white/70">
                  Help fund initiatives in education, maternal health, and disaster relief.
                </div>
              </div>
            </div>
          </div>
        </div>
      </Section>

      <Section title="Initiatives" eyebrow="Where your giving goes">
        <div className="grid gap-4 md:grid-cols-3">
          {causes.map((c) => (
            <Link
              key={c.slug}
              href={`/donate?cause=${c.slug}`}
              className="card group overflow-hidden"
            >
              <div className="relative aspect-[16/10] w-full">
                <Image
                  src={c.image}
                  alt={c.name}
                  fill
                  className="object-cover transition duration-300 group-hover:scale-[1.03]"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <div className="text-sm font-semibold">{c.name}</div>
                  <div className="mt-1 text-xs text-white/70">{c.regions}</div>
                </div>
              </div>
              <div className="p-5">
                <p className="text-sm text-white/75">{c.description}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {c.tags.map((t) => (
                    <span className="chip" key={t}>
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </Section>

      <Section title="Give confidently" eyebrow="Transparency • Security • Impact">
        <div className="grid gap-4 md:grid-cols-3">
          {[
            {
              title: "Secure checkout",
              body: "Donations are processed via Stripe Checkout (test mode locally).",
            },
            {
              title: "Choose your cause",
              body: "Direct your gift toward education, maternal health, or disaster relief initiatives.",
            },
            {
              title: "Built for accessibility",
              body: "Keyboard navigation, focus states, and reduced-motion support are included.",
            },
          ].map((item) => (
            <div key={item.title} className="card p-6">
              <div className="text-base font-semibold">{item.title}</div>
              <p className="mt-2 text-sm text-white/75">{item.body}</p>
            </div>
          ))}
        </div>
      </Section>
    </>
  );
}
