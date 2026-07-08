import { z } from "zod";

export const newsletterSchema = z.object({
  email: z
    .string()
    .trim()
    .email("Please enter a valid email address.")
    .max(320, "Email address is too long."),
  source: z.string().trim().max(120).optional(),
  consent: z.boolean().optional(),
});

export type NewsletterInput = z.infer<typeof newsletterSchema>;
