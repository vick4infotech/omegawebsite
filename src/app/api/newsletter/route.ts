import { prisma } from "@/lib/prisma";
import { newsletterSchema } from "@/lib/validation";

export async function POST(req: Request) {
  const body = await req.json().catch(() => null);
  const parsed = newsletterSchema.safeParse(body);

  if (!parsed.success) {
    return Response.json({ error: "Invalid email." }, { status: 400 });
  }

  try {
    await prisma.newsletterSignup.upsert({
      where: { email: parsed.data.email },
      update: {},
      create: { email: parsed.data.email },
    });
    return Response.json({ ok: true });
  } catch {
    return Response.json({ error: "Database not ready. Run npm run setup." }, { status: 500 });
  }
}
