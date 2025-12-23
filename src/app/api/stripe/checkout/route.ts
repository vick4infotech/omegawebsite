import { donationSchema } from "@/lib/validation";
import { getStripe, isStripeConfigured } from "@/lib/stripe";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  const body = await req.json().catch(() => null);
  const parsed = donationSchema.safeParse(body);

  if (!parsed.success) {
    return Response.json({ error: parsed.error.issues[0]?.message ?? "Invalid input" }, { status: 400 });
  }

  if (!isStripeConfigured()) {
    return Response.json(
      {
        error:
          "Stripe is not configured. Add real STRIPE_SECRET_KEY / STRIPE_WEBHOOK_SECRET values in .env to enable checkout (test mode).",
      },
      { status: 400 }
    );
  }

  const stripe = getStripe();

  const origin = req.headers.get("origin") ?? "http://localhost:3000";

  const { amount, interval, cause } = parsed.data;

  let donationId: string | null = null;
  try {
    const created = await prisma.donation.create({
      data: {
        amount,
        currency: "usd",
        interval,
        cause,
        status: "created",
      },
      select: { id: true },
    });
    donationId = created.id;
  } catch {
    // DB not ready; keep going to allow checkout, but note donation won't be tracked until DB is set.
    donationId = null;
  }

  const session = await stripe.checkout.sessions.create({
    mode: interval === "monthly" ? "subscription" : "payment",
    submit_type: interval === "monthly" ? undefined : "donate",
    payment_method_types: ["card"],
    line_items: [
      {
        quantity: 1,
        price_data: {
          currency: "usd",
          product_data: {
            name: "Donation — Omega Global Development (OGD)",
            description: `Cause: ${cause}`,
          },
          unit_amount: amount,
          recurring: interval === "monthly" ? { interval: "month" } : undefined,
        },
      },
    ],
    metadata: {
      cause,
      interval,
      donationId: donationId ?? "",
    },
    success_url: `${origin}/donate/thanks?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${origin}/donate?cause=${encodeURIComponent(cause)}`,
  });

  try {
    if (donationId) {
      await prisma.donation.update({
        where: { id: donationId },
        data: { stripeSessionId: session.id },
      });
    }
  } catch {
    // ignore
  }

  return Response.json({ url: session.url });
}
