import { NextResponse } from "next/server";
import { ZodError } from "zod";

import { newsletterSchema } from "@/lib/validation/newsletter";

type ApiErrorCode =
  | "VALIDATION_ERROR"
  | "DUPLICATE_RECORD"
  | "INTERNAL_ERROR";

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
