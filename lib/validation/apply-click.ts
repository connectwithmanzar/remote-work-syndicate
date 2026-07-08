import { z } from "zod";

export const applyClickSchema = z.object({
  destinationUrl: z.string().trim().url("Destination URL must be valid."),
  platformSlug: z.string().trim().min(1, "Platform is required.").max(80),
  jobSlug: z.string().trim().max(120).optional(),
  referralAvailable: z.boolean().optional(),
  sourcePage: z.string().trim().max(200).optional(),
});

export type ApplyClickInput = z.infer<typeof applyClickSchema>;
