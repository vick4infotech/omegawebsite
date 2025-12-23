import type { Metadata } from "next";
import Image from "next/image";
import { Section } from "@/components/section";

export const metadata: Metadata = {
  title: "Our Team",
  description: "Meet the Omega Global Development (OGD) leadership and board.",
};

const team = [
  { name: "Lashelle Johnson", role: "CEO/Co-Founder", slug: "lashelle-johnson" },
  { name: "Donald Johnson", role: "Co-Founder", slug: "donald-johnson" },
  { name: "Kevin James", role: "Board President", slug: "kevin-james" },
  { name: "Dr. Emmanuel Ahmadu", role: "Board Member", slug: "emmanuel-ahmadu" },
  { name: "Courtney Mickens", role: "Board Member", slug: "courtney-mickens" },
  { name: "Dr. Gayle Terrell", role: "Board Member", slug: "gayle-terrell" },
  { name: "Dr. Will Pickens", role: "Board Member", slug: "will-pickens" },
  { name: "Ilona Jurewicz", role: "Board Member", slug: "ilona-jurewicz" },
  { name: "Brenda Elliot", role: "Board Member", slug: "brenda-elliot" },
  { name: "Alexis Bouza", role: "Partnership & Community Liaison (OGD & African Impact Marketplace)", slug: "alexis-bouza" },
  { name: "Kayitesi Norah", role: "Project Management Intern (East Africa)", slug: "kayitesi-norah" },
  { name: "Jeremy (Jeremiah) Bouza", role: "Impact Data & Analytics Officer (OGD & African Impact Marketplace)", slug: "jeremy-bouza" },
  { name: "Joshua Hill", role: "IT Technical Director", slug: "joshua-hill" },
  { name: "Bishop Musoni Wilberforce", role: "Regional Advisor East Africa", slug: "musoni-wilberforce" },
  { name: "Rashida Bah", role: "Regional Advisor West Africa", slug: "rashida-bah" },
] as const;

export default function TeamPage() {
  return (
    <>
      <section className="container pt-10">
        <h1 className="text-3xl font-semibold md:text-4xl">Our Team</h1>
        <p className="mt-3 max-w-2xl text-white/75">
          Leadership, board members, and staff serving the mission of restoration, empowerment, and
          sustainability.
        </p>
      </section>

      <Section title="Leadership & Board" eyebrow="People behind the mission">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {team.map((t) => (
            <article key={t.slug} className="card overflow-hidden">
              <div className="relative aspect-[4/3] w-full">
                <Image
                  src={`/team/${t.slug}.jpg`}
                  alt={`${t.name} portrait`}
                  fill
                  className="object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/65 to-transparent" />
              </div>
              <div className="p-5">
                <h2 className="text-base font-semibold">{t.name}</h2>
                <div className="mt-1 text-sm text-white/70">{t.role}</div>
                <div className="mt-3 text-sm text-white/70">Bio coming soon</div>
              </div>
            </article>
          ))}
        </div>
      </Section>
    </>
  );
}
