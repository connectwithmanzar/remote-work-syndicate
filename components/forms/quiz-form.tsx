"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";

type FormStatus = "idle" | "loading" | "success" | "error";

type QuizRecommendation = {
  platformSlug: string;
  platformName: string;
  matchPercentage: number;
  reasons: string[];
  warnings: string[];
  suggestedRoles: string[];
};

export function QuizForm() {
  const [status, setStatus] = useState<FormStatus>("idle");
  const [message, setMessage] = useState("");
  const [recommendations, setRecommendations] = useState<QuizRecommendation[]>([]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    setStatus("loading");
    setMessage("");
    setRecommendations([]);

    const payload = {
      country: String(formData.get("country") ?? ""),
      primarySkillCategory: String(formData.get("primarySkillCategory") ?? ""),
      yearsOfExperience: Number(formData.get("yearsOfExperience") ?? 0),
      englishLevel: String(formData.get("englishLevel") ?? "professional"),
      codingAbility: String(formData.get("codingAbility") ?? "none"),
      domainExpertise: String(formData.get("domainExpertise") ?? ""),
      preferredWorkType: String(formData.get("preferredWorkType") ?? "flexible"),
      availableHoursPerWeek: Number(formData.get("availableHoursPerWeek") ?? 10),
      desiredPayMin: Number(formData.get("desiredPayMin") || 0),
      platformsAlreadyAppliedTo: String(formData.get("platformsAlreadyAppliedTo") ?? "")
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean),
      currentApplicationOutcomes: String(formData.get("currentApplicationOutcomes") ?? "")
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean),
      email: String(formData.get("email") ?? "") || undefined,
      consentToSubscribe: formData.get("consentToSubscribe") === "on",
    };

    try {
      const response = await fetch("/api/quiz", {
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

      setStatus("success");
      setMessage(result.message ?? "Quiz submitted successfully.");
      setRecommendations(result.data.recommendations ?? []);
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
    <div className="grid gap-8 lg:grid-cols-[1fr_380px]">
      <form
        onSubmit={handleSubmit}
        className="rounded-3xl border bg-card p-6 shadow-sm"
      >
        <div>
          <h2 className="text-2xl font-semibold tracking-tight">
            Start your platform match
          </h2>
          <p className="mt-2 text-sm leading-6 text-muted-foreground">
            This MVP recommendation is based on seed data. It is useful for
            product testing, not guaranteed hiring outcomes.
          </p>
        </div>

        <div className="mt-6 grid gap-5 md:grid-cols-2">
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
            <span className="text-sm font-medium">Primary skill category</span>
            <select
              name="primarySkillCategory"
              required
              defaultValue="ai_evaluation"
              className="h-11 w-full rounded-md border bg-background px-3 text-sm outline-none focus:border-primary"
            >
              <option value="ai_evaluation">AI evaluation</option>
              <option value="coding">Coding</option>
              <option value="writing">Writing</option>
              <option value="domain_expertise">Domain expertise</option>
              <option value="research">Research</option>
            </select>
          </label>

          <label className="space-y-2">
            <span className="text-sm font-medium">Years of experience</span>
            <input
              name="yearsOfExperience"
              type="number"
              min="0"
              max="50"
              required
              defaultValue="1"
              className="h-11 w-full rounded-md border bg-background px-3 text-sm outline-none focus:border-primary"
            />
          </label>

          <label className="space-y-2">
            <span className="text-sm font-medium">English level</span>
            <select
              name="englishLevel"
              defaultValue="professional"
              className="h-11 w-full rounded-md border bg-background px-3 text-sm outline-none focus:border-primary"
            >
              <option value="basic">Basic</option>
              <option value="conversational">Conversational</option>
              <option value="professional">Professional</option>
              <option value="native_like">Native-like</option>
            </select>
          </label>

          <label className="space-y-2">
            <span className="text-sm font-medium">Coding ability</span>
            <select
              name="codingAbility"
              defaultValue="beginner"
              className="h-11 w-full rounded-md border bg-background px-3 text-sm outline-none focus:border-primary"
            >
              <option value="none">None</option>
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="advanced">Advanced</option>
            </select>
          </label>

          <label className="space-y-2">
            <span className="text-sm font-medium">Preferred work type</span>
            <select
              name="preferredWorkType"
              defaultValue="flexible"
              className="h-11 w-full rounded-md border bg-background px-3 text-sm outline-none focus:border-primary"
            >
              <option value="part_time">Part-time</option>
              <option value="full_time">Full-time</option>
              <option value="contract">Contract</option>
              <option value="freelance">Freelance</option>
              <option value="flexible">Flexible</option>
            </select>
          </label>

          <label className="space-y-2">
            <span className="text-sm font-medium">Available hours per week</span>
            <input
              name="availableHoursPerWeek"
              type="number"
              min="1"
              max="80"
              required
              defaultValue="10"
              className="h-11 w-full rounded-md border bg-background px-3 text-sm outline-none focus:border-primary"
            />
          </label>

          <label className="space-y-2">
            <span className="text-sm font-medium">Desired minimum pay / hour</span>
            <input
              name="desiredPayMin"
              type="number"
              min="0"
              max="1000"
              defaultValue="10"
              className="h-11 w-full rounded-md border bg-background px-3 text-sm outline-none focus:border-primary"
            />
          </label>
        </div>

        <div className="mt-5 grid gap-5">
          <label className="space-y-2">
            <span className="text-sm font-medium">Domain expertise</span>
            <input
              name="domainExpertise"
              placeholder="Finance, law, medicine, software, education..."
              className="h-11 w-full rounded-md border bg-background px-3 text-sm outline-none focus:border-primary"
            />
          </label>

          <label className="space-y-2">
            <span className="text-sm font-medium">
              Platforms already applied to
            </span>
            <input
              name="platformsAlreadyAppliedTo"
              placeholder="Mercor, Outlier, micro1"
              className="h-11 w-full rounded-md border bg-background px-3 text-sm outline-none focus:border-primary"
            />
          </label>

          <label className="space-y-2">
            <span className="text-sm font-medium">
              Current application outcomes
            </span>
            <input
              name="currentApplicationOutcomes"
              placeholder="Applied, rejected, no response, accepted"
              className="h-11 w-full rounded-md border bg-background px-3 text-sm outline-none focus:border-primary"
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
            <input name="consentToSubscribe" type="checkbox" className="mt-1" />
            Send me Remote Work Syndicate updates.
          </label>
        </div>

        <button
          type="submit"
          disabled={status === "loading"}
          className="mt-6 inline-flex h-11 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-70"
        >
          {status === "loading" ? "Matching..." : "Get recommendations"}
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

      <aside className="rounded-3xl border bg-card p-6 shadow-sm">
        <h2 className="text-2xl font-semibold tracking-tight">
          Recommended platforms
        </h2>

        {recommendations.length > 0 ? (
          <div className="mt-5 space-y-4">
            {recommendations.map((recommendation) => (
              <div
                key={recommendation.platformSlug}
                className="rounded-2xl border bg-background p-4"
              >
                <div className="flex items-center justify-between gap-4">
                  <h3 className="font-semibold">
                    {recommendation.platformName}
                  </h3>
                  <span className="rounded-full bg-muted px-3 py-1 text-xs font-medium">
                    {recommendation.matchPercentage}% match
                  </span>
                </div>

                <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-muted-foreground">
                  {recommendation.reasons.map((reason) => (
                    <li key={reason}>{reason}</li>
                  ))}
                </ul>

                <Link
                  href={`/platforms/${recommendation.platformSlug}`}
                  className="mt-4 inline-flex text-sm font-medium text-primary"
                >
                  View platform review
                </Link>
              </div>
            ))}
          </div>
        ) : (
          <p className="mt-4 text-sm leading-6 text-muted-foreground">
            Fill out the quiz and your MVP recommendations will appear here.
          </p>
        )}
      </aside>
    </div>
  );
}
