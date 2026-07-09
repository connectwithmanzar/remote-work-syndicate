import { ZodError } from "zod";

import { errorResponse, successResponse } from "@/lib/api/responses";
import { getSupabaseAdmin } from "@/lib/supabase/admin";
import { newsletterSchema } from "@/lib/validation/newsletter";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const input = newsletterSchema.parse(body);

    const supabase = getSupabaseAdmin();

    const { data, error } = await supabase
      .from("newsletter_signups")
      .insert({
        email: input.email,
        source: input.source ?? "unknown",
        consent: input.consent ?? false,
      })
      .select("id,email,source,consent,created_at")
      .single();

    if (error) {
      if (error.code === "23505") {
        return errorResponse(
          "DUPLICATE_RECORD",
          "This email is already subscribed.",
          undefined,
          409,
        );
      }

      return errorResponse(
        "INTERNAL_ERROR",
        "Something went wrong while subscribing.",
        error.message,
        500,
      );
    }

    return successResponse(
      {
        id: data.id,
        email: data.email,
        source: data.source,
        consent: data.consent,
        subscribed: true,
        createdAt: data.created_at,
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
