export const env = {
  DATABASE_URL: process.env.DATABASE_URL ?? "file:./dev.db",
  NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET ?? "dev-secret-change-me",
  NEXTAUTH_URL: process.env.NEXTAUTH_URL ?? "http://localhost:3000",
  STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY ?? "sk_test_change_me",
  STRIPE_WEBHOOK_SECRET: process.env.STRIPE_WEBHOOK_SECRET ?? "whsec_change_me",
};
