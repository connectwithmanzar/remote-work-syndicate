import Link from "next/link";
import { ArrowRight, CheckCircle2, Sparkles } from "lucide-react";

import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { getFeaturedPlatforms } from "@/lib/data/platforms";

const quizQuestions = [
  "Country",
  "Primary skill category",
  "Years of experience",
  "English level",
  "Coding ability",
  "Domain expertise",
  "Preferred work type",
  "Available hours per week",
  "Desired pay range",
  "Platforms already applied to",
  "Current application outcomes",
];

export default function QuizPage() {
  const platforms = getFeaturedPlatforms(5);

  return (
    <main>
      <Section className="border-b">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[1fr_360px]">
            <div className="max-w-3xl">
              <p className="mb-4 inline-flex rounded-full border px-4 py-2 text-sm text-muted-foreground">
                Platform Match Quiz
              </p>

              <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
                Find the AI work platform that fits your profile.
              </h1>

              <p className="mt-6 text-lg leading-8 text-muted-foreground">
                Answer a few questions about your location, skills, experience,
                availability, and goals. Remote Work Syndicate will recommend
                platforms based on fit, not fake guarantees.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/quiz/results"
                  className="inline-flex h-11 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90"
                >
                  Start Quiz Preview
                  <ArrowRight className="ml-2 size-4" />
                </Link>

                <Link
                  href="/platforms"
                  className="inline-flex h-11 items-center justify-center rounded-md border bg-background px-8 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground"
                >
                  Browse Platforms
                </Link>
              </div>

              <p className="mt-6 text-sm text-muted-foreground">
                No login required. Email capture will stay optional.
              </p>
            </div>

            <aside className="rounded-2xl border bg-card p-6">
              <div className="flex items-center gap-3">
                <Sparkles className="size-5 text-primary" />
                <h2 className="text-xl font-semibold">What we match on</h2>
              </div>

              <ul className="mt-5 space-y-3 text-sm text-muted-foreground">
                {[
                  "Country eligibility",
                  "Skill fit",
                  "Experience level",
                  "English level",
                  "Coding ability",
                  "Availability",
                  "Desired pay range",
                ].map((item) => (
                  <li key={item} className="flex gap-3">
                    <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-primary" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </aside>
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <div className="mb-8">
            <p className="text-sm font-medium text-primary">Quiz structure</p>
            <h2 className="mt-2 text-3xl font-semibold tracking-tight">
              Questions we will use for recommendations
            </h2>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {quizQuestions.map((question, index) => (
              <div key={question} className="rounded-2xl border bg-card p-6">
                <p className="text-sm text-muted-foreground">
                  Question {index + 1}
                </p>
                <h3 className="mt-2 font-semibold">{question}</h3>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      <Section className="border-t bg-muted/20">
        <Container>
          <div className="mb-8">
            <p className="text-sm font-medium text-primary">Example outcomes</p>
            <h2 className="mt-2 text-3xl font-semibold tracking-tight">
              Platforms the quiz can recommend
            </h2>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {platforms.slice(0, 3).map((platform) => (
              <Link
                key={platform.id}
                href={`/platforms/${platform.slug}`}
                className="rounded-2xl border bg-card p-6 transition hover:border-primary/50"
              >
                <h3 className="text-xl font-semibold">{platform.name}</h3>
                <p className="mt-3 text-sm leading-6 text-muted-foreground">
                  {platform.shortDescription}
                </p>
                <p className="mt-5 text-sm text-muted-foreground">
                  Trust score: {platform.trustScore}/100
                </p>
              </Link>
            ))}
          </div>
        </Container>
      </Section>
    </main>
  );
}
