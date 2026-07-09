import { ZodError } from "zod";

import { checkRateLimit } from "@/lib/api/rate-limit";
import { errorResponse, successResponse } from "@/lib/api/responses";
import { getFeaturedPlatforms } from "@/lib/data/platforms";
import { getSupabaseAdmin } from "@/lib/supabase/admin";
import { quizSchema } from "@/lib/validation/quiz";

export async function POST(request: Request) {
  try {
    const rateLimit = await checkRateLimit(request, {
      namespace: "quiz",
      limit: 10,
      windowMs: 5 * 60 * 1000,
    });

    if (!rateLimit.allowed) {
      return errorResponse(
        "RATE_LIMITED",
        "Too many quiz submissions. Please try again in a few minutes.",
        {
          limit: rateLimit.limit,
          remaining: rateLimit.remaining,
          resetAt: rateLimit.resetAt,
        },
        429,
      );
    }

    const body = await request.json();
    const input = quizSchema.parse(body);

    const recommendations = getFeaturedPlatforms(5).map((platform, index) => ({
      platformSlug: platform.slug,
      platformName: platform.name,
      matchPercentage: Math.max(70, 94 - index * 5),
      reasons: [
        "Strong AI remote work platform fit.",
        `Relevant for ${input.primarySkillCategory} profiles.`,
        `Country eligibility should be verified for ${input.country}.`,
      ],
      warnings: [
        "Acceptance is not guaranteed.",
        "Hiring status and role availability can change.",
      ],
      suggestedRoles: platform.bestFor,
    }));

    const supabase = getSupabaseAdmin();

    const { data, error } = await supabase
      .from("quiz_submissions")
      .insert({
        country: input.country,
        primary_skill_category: input.primarySkillCategory,
        years_of_experience: input.yearsOfExperience,
        english_level: input.englishLevel,
        coding_ability: input.codingAbility,
        domain_expertise: input.domainExpertise || null,
        preferred_work_type: input.preferredWorkType,
        available_hours_per_week: input.availableHoursPerWeek,
        desired_pay_min: input.desiredPayMin ?? null,
        platforms_already_applied_to: input.platformsAlreadyAppliedTo ?? [],
        current_application_outcomes: input.currentApplicationOutcomes ?? [],
        email: input.email || null,
        consent_to_subscribe: input.consentToSubscribe ?? false,
        recommendations,
      })
      .select("id,created_at")
      .single();

    if (error) {
      return errorResponse(
        "INTERNAL_ERROR",
        "Something went wrong while saving quiz results.",
        error.message,
        500,
      );
    }

    return successResponse(
      {
        id: data.id,
        recommendations,
        submittedProfile: {
          country: input.country,
          primarySkillCategory: input.primarySkillCategory,
          yearsOfExperience: input.yearsOfExperience,
          englishLevel: input.englishLevel,
          codingAbility: input.codingAbility,
          preferredWorkType: input.preferredWorkType,
          availableHoursPerWeek: input.availableHoursPerWeek,
        },
        subscribed: Boolean(input.email && input.consentToSubscribe),
        createdAt: data.created_at,
      },
      "Quiz submitted successfully.",
    );
  } catch (error) {
    if (error instanceof ZodError) {
      return errorResponse(
        "VALIDATION_ERROR",
        "Please check the quiz answers and try again.",
        error.flatten(),
        422,
      );
    }

    return errorResponse(
      "INTERNAL_ERROR",
      "Something went wrong while processing quiz results.",
      undefined,
      500,
    );
  }
}
