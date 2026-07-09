"use client";

import { FormEvent, useState } from "react";

type FormStatus = "idle" | "loading" | "success" | "error";

export function OutcomeReportForm() {
  const [status, setStatus] = useState<FormStatus>("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);

    setStatus("loading");
    setMessage("");

    const payload = {
      platformSlug: String(formData.get("platformSlug") ?? ""),
      jobSlug: String(formData.get("jobSlug") ?? "") || undefined,
      reportStatus: String(formData.get("reportStatus") ?? "applied"),
      country: String(formData.get("country") ?? ""),
      roleCategory: String(formData.get("roleCategory") ?? ""),
      responseDays: Number(formData.get("responseDays") || 0),
      interviewDifficulty: Number(formData.get("interviewDifficulty") || 1),
      payRate: Number(formData.get("payRate") || 0),
      payCurrency: String(formData.get("payCurrency") ?? "USD"),
      notes: String(formData.get("notes") ?? "") || undefined,
      email: String(formData.get("email") ?? "") || undefined,
      consentToContact: formData.get("consentToContact") === "on",
    };

    try {
      const response = await fetch("/api/outcome-report", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(
          result?.error?.message ?? "Something went wrong. Please try again.",
        );
      }

      form.reset();
      setStatus("success");
      setMessage(result.message ?? "Outcome report submitted.");
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
      className="rounded-3xl border bg-card p-6 shadow-sm"
    >
      <div>
        <h2 className="text-2xl font-semibold tracking-tight">
          Share an application outcome
        </h2>
        <p className="mt-2 text-sm leading-6 text-muted-foreground">
          Help future applicants understand response times, interview difficulty,
          pay ranges, and real platform outcomes. Reports stay pending review.
        </p>
      </div>

      <div className="mt-6 grid gap-5 md:grid-cols-2">
        <label className="space-y-2">
          <span className="text-sm font-medium">Platform</span>
          <select
            name="platformSlug"
            required
            defaultValue="mercor"
            className="h-11 w-full rounded-md border bg-background px-3 text-sm outline-none focus:border-primary"
          >
            <option value="mercor">Mercor</option>
            <option value="micro1">micro1</option>
            <option value="outlier">Outlier</option>
            <option value="dataannotation">DataAnnotation</option>
            <option value="alignerr">Alignerr</option>
          </select>
        </label>

        <label className="space-y-2">
          <span className="text-sm font-medium">Job slug optional</span>
          <input
            name="jobSlug"
            placeholder="ai-domain-expert-mercor"
            className="h-11 w-full rounded-md border bg-background px-3 text-sm outline-none focus:border-primary"
          />
        </label>

        <label className="space-y-2">
          <span className="text-sm font-medium">Outcome status</span>
          <select
            name="reportStatus"
            required
            defaultValue="applied"
            className="h-11 w-full rounded-md border bg-background px-3 text-sm outline-none focus:border-primary"
          >
            <option value="planned_to_apply">Planned to apply</option>
            <option value="applied">Applied</option>
            <option value="assessment_received">Assessment received</option>
            <option value="interview_received">Interview received</option>
            <option value="accepted">Accepted</option>
            <option value="rejected">Rejected</option>
            <option value="waitlisted">Waitlisted</option>
            <option value="no_response">No response</option>
            <option value="started_work">Started work</option>
            <option value="paid">Paid</option>
          </select>
        </label>

        <label className="space-y-2">
          <span className="text-sm font-medium">Country</span>
          <input
            name="country"
            required
            defaultValue="India"
            className="h-11 w-full rounded-md border bg-background px-3 text-sm outline-none focus:border-primary"
          />
        </label>

        <label className="space-y-2">
          <span className="text-sm font-medium">Role category</span>
          <input
            name="roleCategory"
            required
            defaultValue="AI evaluation"
            className="h-11 w-full rounded-md border bg-background px-3 text-sm outline-none focus:border-primary"
          />
        </label>

        <label className="space-y-2">
          <span className="text-sm font-medium">Response days</span>
          <input
            name="responseDays"
            type="number"
            min="0"
            max="365"
            defaultValue="0"
            className="h-11 w-full rounded-md border bg-background px-3 text-sm outline-none focus:border-primary"
          />
        </label>

        <label className="space-y-2">
          <span className="text-sm font-medium">Interview difficulty</span>
          <select
            name="interviewDifficulty"
            defaultValue="3"
            className="h-11 w-full rounded-md border bg-background px-3 text-sm outline-none focus:border-primary"
          >
            <option value="1">1 — Very easy</option>
            <option value="2">2 — Easy</option>
            <option value="3">3 — Medium</option>
            <option value="4">4 — Hard</option>
            <option value="5">5 — Very hard</option>
          </select>
        </label>

        <div className="grid grid-cols-[1fr_110px] gap-3">
          <label className="space-y-2">
            <span className="text-sm font-medium">Pay rate</span>
            <input
              name="payRate"
              type="number"
              min="0"
              max="10000"
              defaultValue="0"
              className="h-11 w-full rounded-md border bg-background px-3 text-sm outline-none focus:border-primary"
            />
          </label>

          <label className="space-y-2">
            <span className="text-sm font-medium">Currency</span>
            <input
              name="payCurrency"
              defaultValue="USD"
              className="h-11 w-full rounded-md border bg-background px-3 text-sm outline-none focus:border-primary"
            />
          </label>
        </div>
      </div>

      <div className="mt-5 grid gap-5">
        <label className="space-y-2">
          <span className="text-sm font-medium">Notes optional</span>
          <textarea
            name="notes"
            rows={4}
            placeholder="What happened? How long did it take? Any useful warning for others?"
            className="w-full rounded-md border bg-background px-3 py-3 text-sm outline-none focus:border-primary"
          />
        </label>

        <label className="space-y-2">
          <span className="text-sm font-medium">Email optional</span>
          <input
            name="email"
            type="email"
            placeholder="you@example.com"
            className="h-11 w-full rounded-md border bg-background px-3 text-sm outline-none focus:border-primary"
          />
        </label>

        <label className="flex gap-3 text-sm text-muted-foreground">
          <input name="consentToContact" type="checkbox" className="mt-1" />
          I am okay being contacted for clarification before publication.
        </label>
      </div>

      <button
        type="submit"
        disabled={status === "loading"}
        className="mt-6 inline-flex h-11 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-70"
      >
        {status === "loading" ? "Submitting..." : "Submit outcome"}
      </button>

      {message ? (
        <p
          className={`mt-4 text-sm ${
            status === "success" ? "text-emerald-700" : "text-red-700"
          }`}
        >
          {message}
        </p>
      ) : null}
    </form>
  );
}
