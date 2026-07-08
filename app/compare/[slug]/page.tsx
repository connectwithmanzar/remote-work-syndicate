import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, CheckCircle2, GitCompare, Sparkles } from "lucide-react";

import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { JsonLd } from "@/components/seo/JsonLd";
import { getComparisonBySlug, getComparisons } from "@/lib/data/comparisons";
import { getJobsByPlatform } from "@/lib/data/jobs";
import { getPlatformBySlug } from "@/lib/data/platforms";
import { breadcrumbListSchema, comparisonPageSchema } from "@/lib/seo/schema";

type CompareDetailPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

function formatPay(min?: number, max?: number, currency = "USD") {
  if (!min && !max) return "Pay varies";
  if (min && max) return `${currency} ${min}–${max}/hr`;
  if (min) return `From ${currency} ${min}/hr`;
  return `Up to ${currency} ${max}/hr`;
}

export function generateStaticParams() {
  return getComparisons().map((comparison) => ({
    slug: comparison.slug,
  }));
}

export async function generateMetadata({ params }: CompareDetailPageProps) {
  const { slug } = await params;
  const comparison = getComparisonBySlug(slug);

  if (!comparison) {
    return {
      title: "Comparison not found | Remote Work Syndicate",
    };
  }

  return {
    title: `${comparison.title} | Remote Work Syndicate`,
    description: comparison.excerpt,
  };
}

export default async function CompareDetailPage({ params }: CompareDetailPageProps) {
  const { slug } = await params;
  const comparison = getComparisonBySlug(slug);

  if (!comparison) {
    notFound();
  }

  const platforms = comparison.platformSlugs
    .map((platformSlug) => getPlatformBySlug(platformSlug))
    .filter((platform) => platform !== undefined);

  const structuredData = [
    comparisonPageSchema(comparison),
    breadcrumbListSchema([
      { name: "Home", path: "/" },
      { name: "Compare", path: "/compare" },
      { name: comparison.title, path: `/compare/${comparison.slug}` },
    ]),
  ];

  return (
    <main>
      <JsonLd data={structuredData} />
      <Section className="border-b">
        <Container>
          <Link
            href="/compare"
            className="mb-8 inline-flex items-center text-sm text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="mr-2 size-4" />
            Back to comparisons
          </Link>

          <div className="max-w-3xl">
            <p className="mb-4 inline-flex rounded-full border px-4 py-2 text-sm text-muted-foreground">
              Platform comparison
            </p>

            <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
              {comparison.title}
            </h1>

            <p className="mt-6 text-lg leading-8 text-muted-foreground">
              {comparison.excerpt}
            </p>

            <div className="mt-6 flex flex-wrap gap-2">
              {platforms.map((platform) => (
                <Link
                  key={platform.slug}
                  href={`/platforms/${platform.slug}`}
                  className="rounded-full bg-muted px-3 py-1 text-xs hover:bg-muted/80"
                >
                  {platform.name}
                </Link>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <div className="rounded-2xl border bg-card p-6">
            <div className="flex items-center gap-3">
              <Sparkles className="size-5 text-primary" />
              <h2 className="text-2xl font-semibold">Summary verdict</h2>
            </div>

            <p className="mt-4 text-sm leading-7 text-muted-foreground">
              {comparison.verdict}
            </p>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {platforms.map((platform) => {
              const jobs = getJobsByPlatform(platform.slug);

              return (
                <div key={platform.id} className="rounded-2xl border bg-card p-6">
                  <h2 className="text-2xl font-semibold">{platform.name}</h2>

                  <p className="mt-3 text-sm leading-6 text-muted-foreground">
                    {platform.shortDescription}
                  </p>

                  <dl className="mt-6 space-y-4 text-sm">
                    <div>
                      <dt className="text-muted-foreground">Best for</dt>
                      <dd className="mt-1 font-medium">{platform.bestFor.join(", ")}</dd>
                    </div>

                    <div>
                      <dt className="text-muted-foreground">Pay range</dt>
                      <dd className="mt-1 font-medium">
                        {formatPay(platform.payMin, platform.payMax, platform.payCurrency)}
                      </dd>
                    </div>

                    <div>
                      <dt className="text-muted-foreground">Hiring status</dt>
                      <dd className="mt-1 font-medium">
                        {platform.hiringStatus.replaceAll("_", " ")}
                      </dd>
                    </div>

                    <div>
                      <dt className="text-muted-foreground">Referral status</dt>
                      <dd className="mt-1 font-medium">
                        {platform.referralStatus.replaceAll("_", " ")}
                      </dd>
                    </div>

                    <div>
                      <dt className="text-muted-foreground">Active seed jobs</dt>
                      <dd className="mt-1 font-medium">{jobs.length}</dd>
                    </div>
                  </dl>

                  <Link
                    href={`/platforms/${platform.slug}`}
                    className="mt-6 inline-flex items-center text-sm font-medium text-primary"
                  >
                    Read {platform.name} review
                    <ArrowRight className="ml-2 size-4" />
                  </Link>
                </div>
              );
            })}
          </div>
        </Container>
      </Section>

      <Section className="border-y bg-muted/20">
        <Container>
          <div className="mb-8 flex items-center gap-3">
            <GitCompare className="size-5 text-primary" />
            <h2 className="text-3xl font-semibold tracking-tight">
              Side-by-side decision factors
            </h2>
          </div>

          <div className="overflow-hidden rounded-2xl border bg-card">
            <div className="grid border-b p-4 text-sm font-medium md:grid-cols-3">
              <div>Factor</div>
              {platforms.map((platform) => (
                <div key={platform.id}>{platform.name}</div>
              ))}
            </div>

            {[
              {
                label: "Best fit",
                values: platforms.map((platform) => platform.bestFor.join(", ")),
              },
              {
                label: "Pay range",
                values: platforms.map((platform) =>
                  formatPay(platform.payMin, platform.payMax, platform.payCurrency),
                ),
              },
              {
                label: "Countries",
                values: platforms.map((platform) => platform.acceptedCountries.join(", ")),
              },
              {
                label: "Last verified",
                values: platforms.map((platform) => platform.lastVerifiedAt),
              },
            ].map((row) => (
              <div
                key={row.label}
                className="grid gap-3 border-b p-4 text-sm last:border-b-0 md:grid-cols-3"
              >
                <div className="font-medium">{row.label}</div>
                {row.values.map((value, index) => (
                  <div key={`${row.label}-${index}`} className="text-muted-foreground">
                    {value}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <div className="rounded-2xl border bg-card p-6">
            <h2 className="text-2xl font-semibold">Choose based on profile fit</h2>

            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {platforms.map((platform) => (
                <div key={platform.id} className="rounded-xl border p-4">
                  <h3 className="font-semibold">Choose {platform.name} if...</h3>

                  <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
                    {platform.bestFor.map((item) => (
                      <li key={item} className="flex gap-3">
                        <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-primary" />
                        <span>You are a strong fit for {item.toLowerCase()} work.</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <div className="mt-8 rounded-2xl border bg-muted/20 p-6">
              <h3 className="text-xl font-semibold">Still unsure?</h3>
              <p className="mt-3 text-sm leading-7 text-muted-foreground">
                The Platform Match Quiz should become the main decision tool once the quiz flow is built.
              </p>

              <Link
                href="/quiz"
                className="mt-6 inline-flex h-11 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90"
              >
                Find My Best Platform
                <ArrowRight className="ml-2 size-4" />
              </Link>
            </div>
          </div>
        </Container>
      </Section>
    </main>
  );
}
