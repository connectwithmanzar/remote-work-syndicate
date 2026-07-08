import { z } from "zod";

export const outcomeReportSchema = z.object({
  platformSlug: z.string().trim().min(1, "Platform is required.").max(80),
  jobSlug: z.string().trim().max(120).optional(),
  reportStatus: z.enum([
    "planned_to_apply",
    "applied",
    "assessment_received",
    "interview_received",
    "accepted",
    "rejected",
    "waitlisted",
    "no_response",
    "started_work",
    "paid",
  ]),
  country: z.string().trim().min(1, "Country is required.").max(80),
  roleCategory: z.string().trim().min(1, "Role category is required.").max(80),
  responseDays: z.number().min(0).max(365).optional(),
  interviewDifficulty: z.number().min(1).max(5).optional(),
  payRate: z.number().min(0).max(10000).optional(),
  payCurrency: z.string().trim().max(10).optional(),
  notes: z.string().trim().max(2000).optional(),
  email: z.string().trim().email().optional(),
  consentToContact: z.boolean().optional(),
});

export type OutcomeReportInput = z.infer<typeof outcomeReportSchema>;
