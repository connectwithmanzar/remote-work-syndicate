import { ZodError } from "zod";

import { errorResponse, successResponse } from "@/lib/api/responses";
import { newsletterSchema } from "@/lib/validation/newsletter";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const input = newsletterSchema.parse(body);

    return successResponse(
      {
        email: input.email,
        source: input.source ?? "unknown",
        subscribed: true,
      },
      "You are subscribed to Remote Work Syndicate updates.",
    );
  } catch (error) {
    if (error instanceof ZodError) {
      return errorResponse(
        "VALIDATION_ERROR",
        "Please check the newsletter form and try again.",
        error.flatten(),
        422,
      );
    }

    return errorResponse(
      "INTERNAL_ERROR",
      "Something went wrong while subscribing.",
      undefined,
      500,
    );
  }
}
