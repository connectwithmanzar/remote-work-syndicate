import { ZodError } from "zod";

import { errorResponse, successResponse } from "@/lib/api/responses";
import { applyClickSchema } from "@/lib/validation/apply-click";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const input = applyClickSchema.parse(body);

    return successResponse(
      {
        clickId: `click_${Date.now()}`,
        destinationUrl: input.destinationUrl,
        platformSlug: input.platformSlug,
        jobSlug: input.jobSlug ?? null,
        referralAvailable: Boolean(input.referralAvailable),
        tracked: true,
      },
      "Apply click tracked successfully.",
    );
  } catch (error) {
    if (error instanceof ZodError) {
      return errorResponse(
        "VALIDATION_ERROR",
        "Please check the apply click request and try again.",
        error.flatten(),
        422,
      );
    }

    return errorResponse(
      "INTERNAL_ERROR",
      "Something went wrong while tracking the apply click.",
      undefined,
      500,
    );
  }
}
