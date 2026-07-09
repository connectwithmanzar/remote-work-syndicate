import { NextResponse } from "next/server";

export type ApiErrorCode =
  | "VALIDATION_ERROR"
  | "DUPLICATE_RECORD"
  | "RATE_LIMITED"
  | "INTERNAL_ERROR";

export function successResponse(data: unknown, message?: string) {
  return NextResponse.json({
    success: true,
    data,
    message,
  });
}

export function errorResponse(
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
