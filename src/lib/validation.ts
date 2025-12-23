import { z } from "zod";

export const donationSchema = z.object({
  amount: z.number().int().min(100, "Minimum donation is $1.00"),
  interval: z.enum(["one-time", "monthly"]),
  cause: z.string().min(1),
});

export const newsletterSchema = z.object({
  email: z.string().email(),
});

export const postSchema = z.object({
  title: z.string().min(3),
  excerpt: z.string().min(10),
  contentMarkdown: z.string().min(20),
  tags: z.string().optional().default(""),
  published: z.boolean().optional().default(false),
});
