import { headers } from "next/headers";
import { env } from "@/lib/env";
import { getStripe, isStripeConfigured } from "@/lib/stripe";
import { prisma } from "@/lib/prisma";
import Stripe from "stripe";

export async function POST(req: Request) {
  if (!isStripeConfigured()) {
    return new Response("Stripe not configured.", { status: 400 });
  }

  const stripe = getStripe();
  const body = await req.text();
  const sig = (await headers()).get("stripe-signature");

  if (!sig) return new Response("Missing stripe-signature header", { status: 400 });

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, sig, env.STRIPE_WEBHOOK_SECRET);
  } catch (err: any) {
    return new Response(`Webhook Error: ${err.message}`, { status: 400 });
  }

  try {
    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object as Stripe.Checkout.Session;
        const donationId = (session.metadata?.donationId ?? "").trim();
        const cause = session.metadata?.cause ?? "unknown";
        const interval = (session.metadata?.interval as string) ?? "one-time";

        const paymentIntentId =
          typeof session.payment_intent === "string" ? session.payment_intent : session.payment_intent?.id ?? null;

        if (donationId) {
          await prisma.donation.update({
            where: { id: donationId },
            data: {
              status: "paid",
              stripeSessionId: session.id,
              stripePaymentIntentId: paymentIntentId,
              cause,
              interval,
            },
          });
        } else {
          // Fallback: store without a pre-created donation row
          await prisma.donation.create({
            data: {
              amount: session.amount_total ?? 0,
              currency: session.currency ?? "usd",
              interval,
              cause,
              status: "paid",
              stripeSessionId: session.id,
              stripePaymentIntentId: paymentIntentId,
            },
          });
        }
        break;
      }
      case "checkout.session.expired": {
        const session = event.data.object as Stripe.Checkout.Session;
        const donationId = (session.metadata?.donationId ?? "").trim();
        if (donationId) {
          await prisma.donation.update({
            where: { id: donationId },
            data: { status: "canceled", stripeSessionId: session.id },
          });
        }
        break;
      }
      default:
        break;
    }
  } catch {
    // DB not ready or record missing.
    // Return 200 to avoid Stripe retry loops in local demos.
    return new Response("Event received (DB write skipped).", { status: 200 });
  }

  return new Response("ok", { status: 200 });
}

export const runtime = "nodejs";
