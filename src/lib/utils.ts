export function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export function slugify(input: string) {
  return input
    .toLowerCase()
    .trim()
    .replace(/['"]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export function formatUSD(cents: number) {
  const dollars = cents / 100;
  return dollars.toLocaleString(undefined, { style: "currency", currency: "USD" });
}

export const causes = [
  {
    slug: "education",
    name: "Global Empowerment Through Education",
    regions: "Rwanda, Gambia, South Sudan, Uganda, United States (Omega Reach)",
    description:
      "Investing in education and student support through partnerships with schools and communities.",
    tags: ["Education", "Youth"],
    image: "/works/roman-odintsov-11025021.jpg",
  },
  {
    slug: "maternal-health",
    name: "Maternal Health Initiative",
    regions: "Gambia/Guinea-Bissau (Bijagos Islands)",
    description:
      "Supporting mothers and babies through postnatal baby bags and clinic partnerships.",
    tags: ["Health", "Mothers"],
    image: "/works/close-up-kid-sitting-table.jpg",
  },
  {
    slug: "disaster-relief",
    name: "Disaster Relief",
    regions: "Drought/flooding response and resilience",
    description:
      "Strengthening resilience through greenhouses, dams, seeds, and diversification.",
    tags: ["Relief", "Resilience"],
    image: "/works/speakmediauganda-35305030.jpg",
  },
] as const;

export function getCauseBySlug(slug?: string | null) {
  return causes.find((c) => c.slug === slug) ?? causes[0];
}
