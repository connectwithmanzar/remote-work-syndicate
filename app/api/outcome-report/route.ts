import { ZodError } from "zod";

import { checkRateLimit } from "@/lib/api/rate-limit";
import { errorResponse, successResponse } from "@/lib/api/responses";
import { getSupabaseAdmin } from "@/lib/supabase/admin";
import { outcomeReportSchema } from "@/lib/validation/outcome-report";

export async function POST(request: Request) {
  try {
    const rateLimit = await checkRateLimit(request, {
      namespace: "outcome-report",
      limit: 5,
      windowMs: 10 * 60 * 1000,
    });

    if (!rateLimit.allowed) {
      return errorResponse(
        "RATE_LIMITED",
        "Too many outcome reports submitted. Please try again later.",
        {
          limit: rateLimit.limit,
          remaining: rateLimit.remaining,
          resetAt: rateLimit.resetAt,
        },
        429,
      );
    }

    const body = await request.json();
    const input = outcomeReportSchema.parse(body);

    const supabase = getSupabaseAdmin();

    const { data, error } = await supabase
      .from("outcome_reports")
      .insert({
        platform_slug: input.platformSlug,
        job_slug: input.jobSlug || null,
        report_status: input.reportStatus,
        country: input.country,
        role_category: input.roleCategory,
        response_days: input.responseDays ?? null,
        interview_difficulty: input.interviewDifficulty ?? null,
        pay_rate: input.payRate ?? null,
        pay_currency: input.payCurrency || "USD",
        notes: input.notes || null,
        email: input.email || null,
        consent_to_contact: input.consentToContact ?? false,
        status: "pending_review",
        verification_level: "anonymous",
        published: false,
      })
      .select("id,platform_slug,status,verification_level,published,created_at")
      .single();

    if (error) {
      return errorResponse(
        "INTERNAL_ERROR",
        "Something went wrong while submitting the outcome report.",
        error.message,
        500,
      );
    }

    return successResponse(
      {
        reportId: data.id,
        platformSlug: data.platform_slug,
        status: data.status,
        verificationLevel: data.verification_level,
        published: data.published,
        createdAt: data.created_at,
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
