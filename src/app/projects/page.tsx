import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { causes } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Explore initiatives in education, maternal health, and disaster relief. Every project routes directly to donate with a preselected cause.",
};

const allTags = ["All", "Education", "Youth", "Health", "Mothers", "Relief", "Resilience"] as const;

export default function ProjectsPage({
  searchParams,
}: {
  searchParams?: { tag?: string };
}) {
  const tag = searchParams?.tag ?? "All";
  const filtered =
    tag === "All"
      ? causes
      : causes.filter((c) => c.tags.includes(tag as any));

  return (
    <>
      <section className="container pt-10">
        <h1 className="text-3xl font-semibold md:text-4xl">Projects</h1>
        <p className="mt-3 max-w-2xl text-white/75">
          Browse initiatives and choose a cause. Each project links to the donation page with the
          cause preselected.
        </p>

        <div className="mt-6 flex flex-wrap gap-2">
          {allTags.map((t) => (
            <Link
              key={t}
              href={t === "All" ? "/projects" : `/projects?tag=${encodeURIComponent(t)}`}
              className={`chip ${tag === t ? "border-white/35 bg-white/10" : ""}`}
              aria-current={tag === t ? "page" : undefined}
            >
              {t}
            </Link>
          ))}
        </div>
      </section>

      <section className="container py-12">
        <div className="grid gap-4 md:grid-cols-3">
          {filtered.map((c) => (
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
                <div className="mt-4 text-sm text-white/85">
                  Donate to this project <span aria-hidden>→</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
