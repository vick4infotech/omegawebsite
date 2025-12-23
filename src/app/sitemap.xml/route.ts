import { prisma } from "@/lib/prisma";

function xmlEscape(str: string) {
  return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

export async function GET() {
  const base = "http://localhost:3000";

  let posts: Array<{ slug: string; updatedAt: Date }> = [];
  try {
    posts = await prisma.post.findMany({
      where: { published: true },
      select: { slug: true, updatedAt: true },
      orderBy: { updatedAt: "desc" },
    });
  } catch {
    // DB not yet migrated; still return a valid sitemap for core pages.
    posts = [];
  }

  const staticUrls = ["/", "/about", "/team", "/projects", "/blog", "/donate"];

  const urls = [
    ...staticUrls.map((path) => ({
      loc: `${base}${path}`,
      lastmod: new Date().toISOString(),
    })),
    ...posts.map((p) => ({
      loc: `${base}/blog/${p.slug}`,
      lastmod: p.updatedAt.toISOString(),
    })),
  ];

  const body =
    `<?xml version="1.0" encoding="UTF-8"?>` +
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">` +
    urls
      .map(
        (u) =>
          `<url><loc>${xmlEscape(u.loc)}</loc><lastmod>${xmlEscape(
            u.lastmod
          )}</lastmod></url>`
      )
      .join("") +
    `</urlset>`;

  return new Response(body, {
    headers: { "Content-Type": "application/xml; charset=utf-8" },
  });
}
