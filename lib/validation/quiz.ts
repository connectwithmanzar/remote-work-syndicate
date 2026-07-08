import { z } from "zod";

export const quizSchema = z.object({
  country: z.string().trim().min(1, "Country is required.").max(80),
  primarySkillCategory: z.string().trim().min(1, "Primary skill category is required.").max(80),
  yearsOfExperience: z.number().min(0).max(50),
  englishLevel: z.enum(["basic", "conversational", "professional", "native_like"]),
  codingAbility: z.enum(["none", "beginner", "intermediate", "advanced"]),
  domainExpertise: z.string().trim().max(120).optional(),
  preferredWorkType: z.enum(["part_time", "full_time", "contract", "freelance", "flexible"]),
  availableHoursPerWeek: z.number().min(1).max(80),
  desiredPayMin: z.number().min(0).max(1000).optional(),
  platformsAlreadyAppliedTo: z.array(z.string().trim().max(80)).optional(),
  currentApplicationOutcomes: z.array(z.string().trim().max(120)).optional(),
  email: z.string().trim().email().optional(),
  consentToSubscribe: z.boolean().optional(),
});

export type QuizInput = z.infer<typeof quizSchema>;
