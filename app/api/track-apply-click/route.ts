import { ZodError } from "zod";

import { errorResponse, successResponse } from "@/lib/api/responses";
import { getSupabaseAdmin } from "@/lib/supabase/admin";
import { applyClickSchema } from "@/lib/validation/apply-click";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const input = applyClickSchema.parse(body);

    const supabase = getSupabaseAdmin();

    const { data, error } = await supabase
      .from("apply_click_events")
      .insert({
        destination_url: input.destinationUrl,
        platform_slug: input.platformSlug,
        job_slug: input.jobSlug || null,
        referral_available: input.referralAvailable ?? false,
        source_page: input.sourcePage || null,
      })
      .select("id,destination_url,platform_slug,job_slug,referral_available,created_at")
      .single();

    if (error) {
      return errorResponse(
        "INTERNAL_ERROR",
        "Something went wrong while tracking the apply click.",
        error.message,
        500,
      );
    }

    return successResponse(
      {
        clickId: data.id,
        destinationUrl: data.destination_url,
        platformSlug: data.platform_slug,
        jobSlug: data.job_slug,
        referralAvailable: data.referral_available,
        tracked: true,
        createdAt: data.created_at,
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
