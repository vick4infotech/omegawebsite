  import type { Metadata } from "next";
  import Script from "next/script";
  import Image from "next/image";
  import { DonationWidget } from "@/components/donation-widget";
  import { Section } from "@/components/section";
  import { getCauseBySlug, causes } from "@/lib/utils";

  export const metadata: Metadata = {
    title: "Donate",
    description: "Donate to Omega Global Development (OGD) via Stripe Checkout.",
  };

  export default function DonatePage({
    searchParams,
  }: {
    searchParams?: { cause?: string };
  }) {
    const preselected = getCauseBySlug(searchParams?.cause).slug;

    const orgJsonLd = {
      "@context": "https://schema.org",
      "@type": "Organization",
      name: "Omega Global Development (OGD)",
      url: "http://localhost:3000",
      logo: "http://localhost:3000/brand/logo.jpg",
      address: {
        "@type": "PostalAddress",
        postOfficeBoxNumber: "22126",
        addressLocality: "Beachwood",
        addressRegion: "OH",
        postalCode: "44122",
        addressCountry: "US",
      },
    };

    const donateJsonLd = {
      "@context": "https://schema.org",
      "@type": "DonateAction",
      name: "Donate to Omega Global Development (OGD)",
      target: {
        "@type": "EntryPoint",
        urlTemplate: "http://localhost:3000/donate",
        actionPlatform: ["http://schema.org/DesktopWebPlatform", "http://schema.org/MobileWebPlatform"],
      },
    };

    return (
      <>
        <Script id="jsonld-org" type="application/ld+json">
          {JSON.stringify(orgJsonLd)}
        </Script>
        <Script id="jsonld-donate" type="application/ld+json">
          {JSON.stringify(donateJsonLd)}
        </Script>

        <section className="container pt-10">
          <div className="grid gap-8 md:grid-cols-12 md:items-start">
            <div className="md:col-span-7">
              <h1 className="text-3xl font-semibold md:text-4xl">Donate</h1>
              <p className="mt-3 max-w-2xl text-white/75">
                Direct your gift to a cause and support restoration, empowerment, and sustainability.
              </p>

              <div className="mt-6 card overflow-hidden">
                <div className="relative aspect-[16/9] w-full">
                  <Image
                    src="/works/photorealistic-kid-refugee-camp.jpg"
                    alt="Child in community setting"
                    fill
                    className="object-cover"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/15 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-5">
                    <div className="text-sm font-semibold">{getCauseBySlug(preselected).name}</div>
                    <div className="mt-1 text-sm text-white/75">
                      {getCauseBySlug(preselected).description}
                    </div>
                  </div>
                </div>
              </div>

              <Section title="Bank Transfer / ACH (Coming Soon)" eyebrow="Integration later" className="px-0">
                <div className="card p-6">
                  <p className="text-sm text-white/75">
                    We plan to support additional donation methods, including bank transfer / ACH.
                  </p>
                  <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-white/70">
                    <li>
                      Stripe ACH / bank debits integration hook (not implemented yet).
                      <pre className="mt-2 overflow-x-auto rounded-xl border border-white/10 bg-black/30 p-3 text-xs text-white/75">
{`// TODO: Implement Stripe ACH / bank debits
// 1) Collect donor bank details via Stripe Financial Connections
// 2) Create and confirm ACH payment method
// 3) Attach to a customer + store verification status in DB`}
                      </pre>
                    </li>
                    <li>
                      Manual bank transfer instructions + proof upload flow hook (not implemented yet).
                      <pre className="mt-2 overflow-x-auto rounded-xl border border-white/10 bg-black/30 p-3 text-xs text-white/75">
{`// TODO: Manual transfer flow
// 1) Show bank details + reference code
// 2) Allow upload of payment proof (e.g., receipt)
// 3) Admin review screen to mark donation as confirmed`}
                      </pre>
                    </li>
                  </ul>
                </div>
              </Section>
            </div>

            <div className="md:col-span-5">
              <DonationWidget initialCause={preselected} />
              <div className="mt-4 grid gap-3">
                <div className="card p-5">
                  <div className="text-sm font-semibold">Causes</div>
                  <div className="mt-3 grid gap-2 text-sm text-white/75">
                    {causes.map((c) => (
                      <div key={c.slug} className="flex items-center justify-between gap-3">
                        <span>{c.name}</span>
                        <span className="text-xs text-white/55">{c.slug}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="card p-5">
                  <div className="text-sm font-semibold">Tax-deductible</div>
                  <p className="mt-2 text-sm text-white/75">
                    Omega Global Development is a 501(c)(3) nonprofit organization.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </>
    );
  }
