import Link from "next/link";
import { ArrowLeft, ArrowRight, AlertTriangle, CheckCircle2, Sparkles } from "lucide-react";

import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { getFeaturedPlatforms } from "@/lib/data/platforms";

const matchReasons = [
  "Strong remote AI work fit",
  "Good match for technical or domain expertise",
  "Relevant to global applicants",
  "Clear platform page and apply path available",
];

const warnings = [
  "Acceptance is not guaranteed",
  "Hiring status and role availability can change",
  "Always verify country eligibility before applying",
];

export default function QuizResultsPage() {
  const platforms = getFeaturedPlatforms(5);

  return (
    <main>
      <Section className="border-b">
        <Container>
          <Link
            href="/quiz"
            className="mb-8 inline-flex items-center text-sm text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="mr-2 size-4" />
            Back to quiz
          </Link>

          <div className="max-w-3xl">
            <p className="mb-4 inline-flex rounded-full border px-4 py-2 text-sm text-muted-foreground">
              Quiz results preview
            </p>

            <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
              Your best-fit AI work platforms.
            </h1>

            <p className="mt-6 text-lg leading-8 text-muted-foreground">
              This is the first MVP version of the results page. For now, it uses
              seed data and editorial fit signals. Next, we will connect this to
              real quiz answers and scoring logic.
            </p>
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <div className="grid gap-4">
            {platforms.map((platform, index) => {
              const score = Math.max(72, 94 - index * 5);

              return (
                <div key={platform.id} className="rounded-2xl border bg-card p-6">
                  <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
                    <div>
                      <div className="mb-4 flex flex-wrap items-center gap-2">
                        <span className="rounded-full bg-primary px-3 py-1 text-xs font-medium text-primary-foreground">
                          #{index + 1} match
                        </span>

                        <span className="rounded-full bg-muted px-3 py-1 text-xs">
                          {platform.hiringStatus.replaceAll("_", " ")}
                        </span>

                        <span className="rounded-full border px-3 py-1 text-xs text-muted-foreground">
                          Trust {platform.trustScore}/100
                        </span>
                      </div>

                      <h2 className="text-2xl font-semibold">{platform.name}</h2>

                      <p className="mt-3 max-w-3xl text-sm leading-6 text-muted-foreground">
                        {platform.shortDescription}
                      </p>

                      <div className="mt-5 flex flex-wrap gap-2">
                        {platform.bestFor.map((item) => (
                          <span key={item} className="rounded-full bg-muted px-3 py-1 text-xs">
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="rounded-2xl border bg-background p-5 text-center">
                      <p className="text-sm text-muted-foreground">Match score</p>
                      <p className="mt-2 text-4xl font-semibold">{score}%</p>
                    </div>
                  </div>

                  <div className="mt-8 grid gap-6 md:grid-cols-2">
                    <div>
                      <div className="mb-4 flex items-center gap-2">
                        <CheckCircle2 className="size-5 text-primary" />
                        <h3 className="font-semibold">Why this matches</h3>
                      </div>

                      <ul className="space-y-3 text-sm text-muted-foreground">
                        {matchReasons.slice(0, 3).map((reason) => (
                          <li key={reason} className="flex gap-3">
                            <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-primary" />
                            <span>{reason}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <div className="mb-4 flex items-center gap-2">
                        <AlertTriangle className="size-5 text-primary" />
                        <h3 className="font-semibold">Warnings</h3>
                      </div>

                      <ul className="space-y-3 text-sm text-muted-foreground">
                        {warnings.map((warning) => (
                          <li key={warning} className="flex gap-3">
                            <AlertTriangle className="mt-0.5 size-4 shrink-0 text-primary" />
                            <span>{warning}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="mt-8 flex flex-col gap-3 border-t pt-6 sm:flex-row">
                    <Link
                      href={`/platforms/${platform.slug}`}
                      className="inline-flex h-11 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90"
                    >
                      View {platform.name} Review
                      <ArrowRight className="ml-2 size-4" />
                    </Link>

                    <a
                      href={platform.websiteUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex h-11 items-center justify-center rounded-md border bg-background px-8 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground"
                    >
                      Visit Platform
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        </Container>
      </Section>

      <Section className="border-t bg-muted/20">
        <Container>
          <div className="rounded-2xl border bg-card p-6">
            <div className="flex items-center gap-3">
              <Sparkles className="size-5 text-primary" />
              <h2 className="text-2xl font-semibold">Next scoring upgrade</h2>
            </div>

            <p className="mt-4 text-sm leading-7 text-muted-foreground">
              Next, we will add real quiz inputs and rules-based scoring using country
              eligibility, skill match, experience, English level, coding ability,
              availability, and desired pay range.
            </p>
          </div>
        </Container>
      </Section>
    </main>
  );
}
