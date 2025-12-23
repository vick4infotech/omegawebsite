import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

function slugify(input: string) {
  return input
    .toLowerCase()
    .trim()
    .replace(/['"]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

async function main() {
  const email = "admin@omegaglobaldevelopment.org";
  const password = "ChangeMe123!";
  const passwordHash = await bcrypt.hash(password, 12);

  await prisma.adminUser.upsert({
    where: { email },
    update: { passwordHash, role: "ADMIN" },
    create: { email, passwordHash, role: "ADMIN" },
  });

  const posts = [
    {
      title: "Welcome to Omega Global Development",
      excerpt:
        "A faith-based development organization investing in African communities through restoration, empowerment, and sustainability.",
      tags: "OGD,mission,faith",
      published: true,
      contentMarkdown: [
        "Omega Global Development (OGD) is a faith-based development organization investing in African communities through **restoration, empowerment, and sustainability**.",
        "",
        "Our work grows from church roots and partners with churches, schools, and clinics—moving beyond charity to sustainable impact.",
      ].join("\n"),
    },
    {
      title: "Restoration, Investment, Change, Enrichment",
      excerpt:
        "Our core values shape how we partner with communities and build long-term solutions.",
      tags: "values,restoration,investment,change,enrichment",
      published: true,
      contentMarkdown: [
        "### Our core values",
        "",
        "- **Restoration**",
        "- **Investment**",
        "- **Change**",
        "- **Enrichment**",
        "",
        "These values guide our initiatives in education, maternal health, and disaster relief.",
      ].join("\n"),
    },
  ];

  for (const p of posts) {
    const slug = slugify(p.title);
    await prisma.post.upsert({
      where: { slug },
      update: {
        title: p.title,
        excerpt: p.excerpt,
        tags: p.tags,
        published: p.published,
        contentMarkdown: p.contentMarkdown,
      },
      create: {
        title: p.title,
        slug,
        excerpt: p.excerpt,
        tags: p.tags,
        published: p.published,
        contentMarkdown: p.contentMarkdown,
      },
    });
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
    console.log("Seed complete.");
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
