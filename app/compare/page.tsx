import Link from "next/link";
import { ArrowRight, GitCompare, Sparkles } from "lucide-react";

import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { getComparisons } from "@/lib/data/comparisons";
import { getPlatformBySlug } from "@/lib/data/platforms";

export default function ComparePage() {
  const comparisons = getComparisons();

  return (
    <main>
      <Section className="border-b">
        <Container>
          <div className="max-w-3xl">
            <p className="mb-4 text-sm font-medium text-primary">
              Platform comparisons
            </p>

            <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
              Compare AI work platforms side by side.
            </h1>

            <p className="mt-6 text-lg leading-8 text-muted-foreground">
              Compare platforms by applicant fit, pay potential, difficulty,
              country eligibility, work type, and referral availability before applying.
            </p>
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <div className="grid gap-4 md:grid-cols-2">
            {comparisons.map((comparison) => {
              const platforms = comparison.platformSlugs
                .map((slug) => getPlatformBySlug(slug))
                .filter(Boolean);

              return (
                <Link
                  key={comparison.id}
                  href={`/compare/${comparison.slug}`}
                  className="group rounded-2xl border bg-card p-6 transition hover:border-primary/50"
                >
                  <div className="mb-5 flex items-center justify-between gap-4">
                    <GitCompare className="size-5 text-primary" />

                    <span className="rounded-full border px-3 py-1 text-xs text-muted-foreground">
                      Updated {comparison.lastUpdatedAt}
                    </span>
                  </div>

                  <h2 className="text-2xl font-semibold">{comparison.title}</h2>

                  <p className="mt-3 text-sm leading-6 text-muted-foreground">
                    {comparison.excerpt}
                  </p>

                  <div className="mt-5 flex flex-wrap gap-2">
                    {platforms.map((platform) => (
                      <span
                        key={platform?.slug}
                        className="rounded-full bg-muted px-3 py-1 text-xs"
                      >
                        {platform?.name}
                      </span>
                    ))}
                  </div>

                  <div className="mt-6 rounded-xl border bg-muted/20 p-4">
                    <div className="flex gap-3">
                      <Sparkles className="mt-0.5 size-4 shrink-0 text-primary" />
                      <p className="text-sm leading-6 text-muted-foreground">
                        {comparison.verdict}
                      </p>
                    </div>
                  </div>

                  <div className="mt-6 flex items-center justify-between border-t pt-5">
                    <span className="text-sm text-muted-foreground">
                      Decision guide
                    </span>

                    <span className="inline-flex items-center text-sm font-medium text-primary">
                      Compare platforms
                      <ArrowRight className="ml-2 size-4 transition group-hover:translate-x-1" />
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </Container>
      </Section>
    </main>
  );
}
