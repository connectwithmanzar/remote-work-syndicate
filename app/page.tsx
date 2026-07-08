import Link from "next/link";
import {
  ArrowRight,
  BriefcaseBusiness,
  CheckCircle2,
  Layers3,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { getPopularComparisons } from "@/lib/data/comparisons";
import { getLatestGuides } from "@/lib/data/guides";
import { getFeaturedJobs } from "@/lib/data/jobs";
import { getFeaturedPlatforms } from "@/lib/data/platforms";

const stats = [
  {
    label: "Platform intelligence",
    value: "Compare AI work platforms",
    icon: ShieldCheck,
  },
  {
    label: "Verified opportunities",
    value: "Browse curated remote AI jobs",
    icon: BriefcaseBusiness,
  },
  {
    label: "Profile matching",
    value: "Find platforms that fit your skills",
    icon: Sparkles,
  },
];

function formatPay(min?: number, max?: number, currency = "USD") {
  if (!min && !max) return "Pay varies";
  if (min && max) return `${currency} ${min}–${max}/hr`;
  if (min) return `From ${currency} ${min}/hr`;
  return `Up to ${currency} ${max}/hr`;
}

export default function Home() {
  const featuredPlatforms = getFeaturedPlatforms(3);
  const featuredJobs = getFeaturedJobs(3);
  const latestGuides = getLatestGuides(3);
  const popularComparisons = getPopularComparisons(2);

  return (
    <main className="min-h-screen bg-background text-foreground">
      <section className="relative overflow-hidden border-b px-6 py-24 sm:py-32">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,rgba(79,140,255,0.24),transparent_35%),radial-gradient(circle_at_top_right,rgba(139,92,246,0.20),transparent_30%)]" />

        <Container>
          <div className="max-w-3xl">
            <p className="mb-4 inline-flex rounded-full border px-4 py-2 text-sm text-muted-foreground">
              Independent AI remote work intelligence
            </p>

            <h1 className="text-4xl font-semibold tracking-tight sm:text-6xl">
              Find the AI work platform that actually fits your profile.
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-muted-foreground">
              Compare platforms like Mercor, micro1, Outlier, DataAnnotation, and more.
              Discover verified opportunities, understand the hiring process, and apply with better context.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/quiz"
                className="inline-flex h-11 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90"
              >
                Find My Best Platform
                <ArrowRight className="ml-2 size-4" />
              </Link>

              <Link
                href="/jobs"
                className="inline-flex h-11 items-center justify-center rounded-md border bg-background px-8 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground"
              >
                Browse Verified Jobs
              </Link>
            </div>

            <p className="mt-6 text-sm text-muted-foreground">
              Independent platform intelligence. Verified opportunities. No fake job guarantees.
            </p>
          </div>

          <div className="mt-16 grid gap-4 md:grid-cols-3">
            {stats.map((item) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.label}
                  className="rounded-2xl border bg-card p-6 shadow-sm"
                >
                  <Icon className="mb-4 size-6 text-primary" />
                  <p className="text-sm text-muted-foreground">{item.label}</p>
                  <p className="mt-2 font-medium">{item.value}</p>
                </div>
              );
            })}
          </div>
        </Container>
      </section>

      <Section>
        <Container>
          <div className="mb-8 flex items-end justify-between gap-6">
            <div>
              <p className="text-sm font-medium text-primary">Featured platforms</p>
              <h2 className="mt-2 text-3xl font-semibold tracking-tight">
                Compare trusted AI work platforms
              </h2>
            </div>

            <Link href="/platforms" className="hidden text-sm text-muted-foreground hover:text-foreground sm:block">
              View all platforms →
            </Link>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {featuredPlatforms.map((platform) => (
              <Link
                key={platform.id}
                href={`/platforms/${platform.slug}`}
                className="rounded-2xl border bg-card p-6 transition hover:border-primary/50"
              >
                <div className="mb-4 flex items-center justify-between gap-4">
                  <h3 className="text-xl font-semibold">{platform.name}</h3>
                  <span className="rounded-full border px-3 py-1 text-xs text-muted-foreground">
                    {platform.trustScore}/100
                  </span>
                </div>

                <p className="text-sm leading-6 text-muted-foreground">
                  {platform.shortDescription}
                </p>

                <div className="mt-5 flex flex-wrap gap-2">
                  {platform.bestFor.slice(0, 2).map((item) => (
                    <span key={item} className="rounded-full bg-muted px-3 py-1 text-xs">
                      {item}
                    </span>
                  ))}
                </div>

                <p className="mt-5 text-sm text-muted-foreground">
                  Last verified: {platform.lastVerifiedAt}
                </p>
              </Link>
            ))}
          </div>
        </Container>
      </Section>

      <Section className="border-y bg-muted/20">
        <Container>
          <div className="mb-8 flex items-end justify-between gap-6">
            <div>
              <p className="text-sm font-medium text-primary">Latest opportunities</p>
              <h2 className="mt-2 text-3xl font-semibold tracking-tight">
                Browse verified AI remote jobs
              </h2>
            </div>

            <Link href="/jobs" className="hidden text-sm text-muted-foreground hover:text-foreground sm:block">
              Browse jobs →
            </Link>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {featuredJobs.map((job) => (
              <Link
                key={job.id}
                href={`/jobs/${job.slug}`}
                className="rounded-2xl border bg-card p-6 transition hover:border-primary/50"
              >
                <div className="mb-4 flex items-start justify-between gap-4">
                  <h3 className="text-lg font-semibold">{job.title}</h3>
                  {job.referralAvailable ? (
                    <span className="rounded-full border px-3 py-1 text-xs text-muted-foreground">
                      Referral
                    </span>
                  ) : null}
                </div>

                <p className="text-sm leading-6 text-muted-foreground">
                  {job.shortDescription}
                </p>

                <p className="mt-5 font-medium">
                  {formatPay(job.payMin, job.payMax, job.payCurrency)}
                </p>

                <p className="mt-2 text-sm text-muted-foreground">
                  Last verified: {job.lastVerifiedAt}
                </p>
              </Link>
            ))}
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <div className="grid gap-6 lg:grid-cols-2">
            <div className="rounded-2xl border bg-card p-6">
              <div className="mb-4 flex items-center gap-3">
                <Layers3 className="size-5 text-primary" />
                <h2 className="text-2xl font-semibold">Popular comparisons</h2>
              </div>

              <div className="space-y-4">
                {popularComparisons.map((comparison) => (
                  <Link
                    key={comparison.id}
                    href={`/compare/${comparison.slug}`}
                    className="block rounded-xl border p-4 transition hover:border-primary/50"
                  >
                    <h3 className="font-medium">{comparison.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-muted-foreground">
                      {comparison.excerpt}
                    </p>
                  </Link>
                ))}
              </div>
            </div>

            <div className="rounded-2xl border bg-card p-6">
              <div className="mb-4 flex items-center gap-3">
                <CheckCircle2 className="size-5 text-primary" />
                <h2 className="text-2xl font-semibold">Latest guides</h2>
              </div>

              <div className="space-y-4">
                {latestGuides.map((guide) => (
                  <Link
                    key={guide.id}
                    href={`/guides/${guide.slug}`}
                    className="block rounded-xl border p-4 transition hover:border-primary/50"
                  >
                    <h3 className="font-medium">{guide.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-muted-foreground">
                      {guide.excerpt}
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </Section>
    </main>
  );
}
