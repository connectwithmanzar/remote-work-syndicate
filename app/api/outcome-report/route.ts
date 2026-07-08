import { NextResponse } from "next/server";
import { ZodError } from "zod";

import { outcomeReportSchema } from "@/lib/validation/outcome-report";

type ApiErrorCode = "VALIDATION_ERROR" | "INTERNAL_ERROR";

function successResponse(data: unknown, message?: string) {
  return NextResponse.json({
    success: true,
    data,
    message,
  });
}

function errorResponse(
  code: ApiErrorCode,
  message: string,
  details?: unknown,
  status = 400,
) {
  return NextResponse.json(
    {
      success: false,
      error: {
        code,
        message,
        details,
      },
    },
    { status },
  );
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const input = outcomeReportSchema.parse(body);

    return successResponse(
      {
        reportId: `report_${Date.now()}`,
        platformSlug: input.platformSlug,
        status: "pending_review",
        verificationLevel: "anonymous",
        published: false,
      },
      "Thanks for sharing your outcome. It has been received and will stay pending review before anything is published.",
    );
  } catch (error) {
    if (error instanceof ZodError) {
      return errorResponse(
        "VALIDATION_ERROR",
        "Please check the outcome report form and try again.",
        error.flatten(),
        422,
      );
    }

    return errorResponse(
      "INTERNAL_ERROR",
      "Something went wrong while submitting the outcome report.",
      undefined,
      500,
    );
  }
}
