import type { Metadata } from "next";
import Image from "next/image";
import { Section } from "@/components/section";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about Omega Global Development (OGD): church roots, partnership-driven work, and a mission of restoration, empowerment, and sustainability.",
};

export default function AboutPage() {
  return (
    <>
      <section className="container pt-10">
        <div className="grid gap-8 md:grid-cols-12 md:items-center">
          <div className="md:col-span-7">
            <h1 className="text-3xl font-semibold md:text-4xl">About Omega Global Development</h1>
            <p className="mt-4 text-white/75">
              Omega Global Development (OGD) is a faith-based development organization investing in
              African communities through restoration, empowerment, and sustainability.
            </p>
            <p className="mt-4 text-white/75">
              Our story has church roots. We seek to empower beyond charity—partnering with churches,
              schools, and clinics, and supporting women empowerment, education, sports/arts, clinics,
              leader training, and sustainability.
            </p>
          </div>

          <div className="md:col-span-5">
            <div className="card overflow-hidden">
              <div className="relative aspect-[4/3] w-full">
                <Image
                  src="/works/roman-odintsov-11025021.jpg"
                  alt="Students studying together"
                  fill
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-black/55 via-black/15 to-transparent" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <Section title="Mission" eyebrow="Why we exist">
        <div className="card p-6">
          <p className="text-white/80">
            <span className="font-semibold">Mission statement:</span> Faith-based development org
            investing in African communities through restoration, empowerment, sustainability.
          </p>
        </div>
      </Section>

      <Section title="Core values" eyebrow="How we work">
  <div className="card p-6">
    <ul className="grid gap-2 text-sm text-white/80 sm:grid-cols-2">
      <li className="chip w-fit">Restoration</li>
      <li className="chip w-fit">Investment</li>
      <li className="chip w-fit">Change</li>
      <li className="chip w-fit">Enrichment</li>
    </ul>
  </div>
</Section>

<Section title="Faith statement" eyebrow="Great Commission">
        <div className="card p-6">
          <p className="text-white/80">
            Rooted in Matthew 28:20 and the Great Commission, we serve with faith and partnership,
            seeking restoration, empowerment, and sustainability.
          </p>
        </div>
      </Section>

      <Section title="Contact" eyebrow="Mailing address">
        <div className="card p-6">
          <div className="text-sm text-white/80">Omega Global Development</div>
          <div className="text-sm text-white/75">P.O. Box 22126, Beachwood Oh, 44122</div>
          <div className="mt-3 text-sm text-white/70">501(c)(3) nonprofit organization</div>
        </div>
      </Section>
    </>
  );
}
