import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, BookOpen, CheckCircle2 } from "lucide-react";

import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { JsonLd } from "@/components/seo/JsonLd";
import { getGuideBySlug, getGuides } from "@/lib/data/guides";
import { articleSchema, breadcrumbListSchema } from "@/lib/seo/schema";

type GuideDetailPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return getGuides().map((guide) => ({
    slug: guide.slug,
  }));
}

export async function generateMetadata({ params }: GuideDetailPageProps) {
  const { slug } = await params;
  const guide = getGuideBySlug(slug);

  if (!guide) {
    return {
      title: "Guide not found | Remote Work Syndicate",
    };
  }

  return {
    title: `${guide.title} | Remote Work Syndicate`,
    description: guide.excerpt,
  };
}

export default async function GuideDetailPage({ params }: GuideDetailPageProps) {
  const { slug } = await params;
  const guide = getGuideBySlug(slug);

  if (!guide) {
    notFound();
  }

  const structuredData = [
    articleSchema(guide),
    breadcrumbListSchema([
      { name: "Home", path: "/" },
      { name: "Guides", path: "/guides" },
      { name: guide.title, path: `/guides/${guide.slug}` },
    ]),
  ];

  return (
    <main>
      <JsonLd data={structuredData} />
      <Section className="border-b">
        <Container>
          <Link
            href="/guides"
            className="mb-8 inline-flex items-center text-sm text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="mr-2 size-4" />
            Back to guides
          </Link>

          <div className="max-w-3xl">
            <p className="mb-4 inline-flex rounded-full border px-4 py-2 text-sm text-muted-foreground">
              {guide.category}
            </p>

            <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
              {guide.title}
            </h1>

            <p className="mt-6 text-lg leading-8 text-muted-foreground">
              {guide.excerpt}
            </p>

            <div className="mt-6 flex flex-wrap gap-3 text-sm text-muted-foreground">
              <span>Published: {guide.publishedAt}</span>
              <span>·</span>
              <span>Last updated: {guide.lastUpdatedAt}</span>
            </div>
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <div className="grid gap-8 lg:grid-cols-[1fr_320px]">
            <article className="rounded-2xl border bg-card p-6 sm:p-8">
              <div className="flex items-center gap-3">
                <BookOpen className="size-5 text-primary" />
                <p className="text-sm font-medium text-primary">
                  MVP guide draft
                </p>
              </div>

              <h2 className="mt-6 text-2xl font-semibold">
                What this guide covers
              </h2>

              <p className="mt-4 text-sm leading-7 text-muted-foreground">
                This is the initial MVP version of the guide page. It gives the
                structure needed for SEO-ready content while we continue adding
                full editorial sections, platform links, examples, and application
                preparation advice.
              </p>

              <div className="mt-8 space-y-4">
                {[
                  "Who this guide is for",
                  "What skills matter most",
                  "How to evaluate platform fit",
                  "Common application mistakes",
                  "What to do before applying",
                ].map((item) => (
                  <div key={item} className="flex gap-3 rounded-xl border p-4">
                    <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-primary" />
                    <p className="text-sm text-muted-foreground">{item}</p>
                  </div>
                ))}
              </div>

              <div className="mt-8 rounded-2xl border bg-muted/20 p-6">
                <h3 className="text-xl font-semibold">Trust note</h3>
                <p className="mt-3 text-sm leading-7 text-muted-foreground">
                  Remote Work Syndicate should avoid fake income guarantees,
                  fake hiring claims, and exaggerated success promises. Guides
                  should help users make better decisions before applying.
                </p>
              </div>
            </article>

            <aside className="h-fit rounded-2xl border bg-card p-6">
              <h2 className="text-xl font-semibold">Next step</h2>

              <p className="mt-3 text-sm leading-6 text-muted-foreground">
                Not sure which platform fits your profile? Take the Platform
                Match Quiz once the quiz flow is ready.
              </p>

              <Link
                href="/quiz"
                className="mt-6 inline-flex h-11 w-full items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90"
              >
                Find My Best Platform
                <ArrowRight className="ml-2 size-4" />
              </Link>
            </aside>
          </div>
        </Container>
      </Section>
    </main>
  );
}
