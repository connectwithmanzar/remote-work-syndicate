import Link from "next/link";
import { ArrowRight, BookOpen, CheckCircle2 } from "lucide-react";

import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { getGuides } from "@/lib/data/guides";

export default function GuidesPage() {
  const guides = getGuides();

  return (
    <main>
      <Section className="border-b">
        <Container>
          <div className="max-w-3xl">
            <p className="mb-4 text-sm font-medium text-primary">
              AI remote work guides
            </p>

            <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
              Learn how to choose, apply, and succeed on AI work platforms.
            </h1>

            <p className="mt-6 text-lg leading-8 text-muted-foreground">
              Practical guides for AI trainer jobs, platform applications, remote
              work safety, country eligibility, assessments, and interview preparation.
            </p>
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <div className="grid gap-4 md:grid-cols-3">
            {guides.map((guide) => (
              <Link
                key={guide.id}
                href={`/guides/${guide.slug}`}
                className="group rounded-2xl border bg-card p-6 transition hover:border-primary/50"
              >
                <div className="mb-5 flex items-center justify-between gap-4">
                  <span className="rounded-full bg-muted px-3 py-1 text-xs">
                    {guide.category}
                  </span>

                  <BookOpen className="size-5 text-primary" />
                </div>

                <h2 className="text-xl font-semibold">{guide.title}</h2>

                <p className="mt-3 text-sm leading-6 text-muted-foreground">
                  {guide.excerpt}
                </p>

                <div className="mt-6 flex items-center justify-between border-t pt-5">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <CheckCircle2 className="size-4 text-primary" />
                    Updated {guide.lastUpdatedAt}
                  </div>

                  <span className="inline-flex items-center text-sm font-medium text-primary">
                    Read guide
                    <ArrowRight className="ml-2 size-4 transition group-hover:translate-x-1" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </Container>
      </Section>
    </main>
  );
}
