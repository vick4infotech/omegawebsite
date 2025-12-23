import Stripe from "stripe";
import { env } from "@/lib/env";

export function getStripe() {
  // Allows the dev server to start even without real keys.
  // Routes validate and return a helpful error if still set to the default placeholder.
  return new Stripe(env.STRIPE_SECRET_KEY, {
    apiVersion: "2024-06-20",
    typescript: true,
  });
}

export function isStripeConfigured() {
  return (
    !!env.STRIPE_SECRET_KEY &&
    !env.STRIPE_SECRET_KEY.startsWith("sk_test_change_me") &&
    !env.STRIPE_SECRET_KEY.startsWith("sk_live_change_me")
  );
}
