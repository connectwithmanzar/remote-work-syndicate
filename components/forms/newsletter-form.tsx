"use client";

import { FormEvent, useState } from "react";

type NewsletterFormProps = {
  source?: string;
};

type FormStatus = "idle" | "loading" | "success" | "error";

export function NewsletterForm({ source = "website" }: NewsletterFormProps) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<FormStatus>("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setStatus("loading");
    setMessage("");

    try {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          source,
          consent: true,
        }),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(
          result?.error?.message ?? "Something went wrong. Please try again.",
        );
      }

      setEmail("");
      setStatus("success");
      setMessage(result.message ?? "You are subscribed.");
    } catch (error) {
      setStatus("error");
      setMessage(
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again.",
      );
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"
    >
      <div className="space-y-2">
        <h3 className="text-xl font-semibold tracking-tight text-slate-950">
          Get remote AI work updates
        </h3>
        <p className="text-sm leading-6 text-slate-600">
          Join the early list for new platform breakdowns, hiring updates, and
          practical remote work guides.
        </p>
      </div>

      <div className="mt-5 flex flex-col gap-3 sm:flex-row">
        <label className="sr-only" htmlFor="newsletter-email">
          Email address
        </label>
        <input
          id="newsletter-email"
          name="email"
          type="email"
          required
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="you@example.com"
          className="min-h-12 flex-1 rounded-full border border-slate-300 bg-white px-4 text-sm text-slate-950 outline-none transition focus:border-slate-950"
        />
        <button
          type="submit"
          disabled={status === "loading"}
          className="min-h-12 rounded-full bg-slate-950 px-6 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-70"
        >
          {status === "loading" ? "Joining..." : "Join list"}
        </button>
      </div>

      {message ? (
        <p
          className={`mt-3 text-sm ${
            status === "success" ? "text-emerald-700" : "text-red-700"
          }`}
        >
          {message}
        </p>
      ) : null}

      <p className="mt-3 text-xs leading-5 text-slate-500">
        No spam. We will use this only for Remote Work Syndicate updates.
      </p>
    </form>
  );
}
