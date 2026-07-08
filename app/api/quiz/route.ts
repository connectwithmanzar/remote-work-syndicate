import { ZodError } from "zod";

import { errorResponse, successResponse } from "@/lib/api/responses";
import { getFeaturedPlatforms } from "@/lib/data/platforms";
import { quizSchema } from "@/lib/validation/quiz";

export async function POST(request: Request) {
  try {
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

    return successResponse(
      {
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
