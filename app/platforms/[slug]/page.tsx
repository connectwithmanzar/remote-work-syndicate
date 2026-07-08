import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, CheckCircle2, ShieldCheck } from "lucide-react";

import { TrackedApplyLink } from "@/components/actions/tracked-apply-link";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { JsonLd } from "@/components/seo/JsonLd";
import { getJobsByPlatform } from "@/lib/data/jobs";
import { getPlatformBySlug, getPlatforms } from "@/lib/data/platforms";
import { breadcrumbListSchema } from "@/lib/seo/schema";

type PlatformDetailPageProps = {
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
  return getPlatforms().map((platform) => ({
    slug: platform.slug,
  }));
}

export async function generateMetadata({ params }: PlatformDetailPageProps) {
  const { slug } = await params;
  const platform = getPlatformBySlug(slug);

  if (!platform) {
    return {
      title: "Platform not found | Remote Work Syndicate",
    };
  }

  return {
    title: `${platform.name} Review: AI Remote Work Platform, Pay, Jobs & Application Process`,
    description: platform.shortDescription,
  };
}

export default async function PlatformDetailPage({ params }: PlatformDetailPageProps) {
  const { slug } = await params;
  const platform = getPlatformBySlug(slug);

  if (!platform) {
    notFound();
  }

  const jobs = getJobsByPlatform(platform.slug);

  const structuredData = breadcrumbListSchema([
    { name: "Home", path: "/" },
    { name: "Platforms", path: "/platforms" },
    { name: platform.name, path: `/platforms/${platform.slug}` },
  ]);

  return (
    <main>
      <JsonLd data={structuredData} />
      <Section className="border-b">
        <Container>
          <Link
            href="/platforms"
            className="mb-8 inline-flex items-center text-sm text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="mr-2 size-4" />
            Back to platforms
          </Link>

          <div className="grid gap-8 lg:grid-cols-[1fr_360px]">
            <div>
              <p className="mb-4 text-sm font-medium text-primary">
                AI work platform review
              </p>

              <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
                {platform.name} Review
              </h1>

              <p className="mt-6 text-lg leading-8 text-muted-foreground">
                {platform.overview}
              </p>

              <div className="mt-6 flex flex-wrap gap-2">
                {platform.bestFor.map((item) => (
                  <span key={item} className="rounded-full bg-muted px-3 py-1 text-xs">
                    Best for {item}
                  </span>
                ))}
              </div>
            </div>

            <aside className="rounded-2xl border bg-card p-6">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <ShieldCheck className="size-4 text-primary" />
                Independent platform intelligence
              </div>

              <dl className="mt-6 space-y-4 text-sm">
                <div>
                  <dt className="text-muted-foreground">Hiring status</dt>
                  <dd className="mt-1 font-medium">
                    {platform.hiringStatus.replaceAll("_", " ")}
                  </dd>
                </div>

                <div>
                  <dt className="text-muted-foreground">Pay range</dt>
                  <dd className="mt-1 font-medium">
                    {formatPay(platform.payMin, platform.payMax, platform.payCurrency)}
                  </dd>
                </div>

                <div>
                  <dt className="text-muted-foreground">Referral status</dt>
                  <dd className="mt-1 font-medium">
                    {platform.referralStatus.replaceAll("_", " ")}
                  </dd>
                </div>

                <div>
                  <dt className="text-muted-foreground">Trust score</dt>
                  <dd className="mt-1 font-medium">{platform.trustScore}/100</dd>
                </div>

                <div>
                  <dt className="text-muted-foreground">Last verified</dt>
                  <dd className="mt-1 font-medium">{platform.lastVerifiedAt}</dd>
                </div>
              </dl>

              <TrackedApplyLink
                destinationUrl={platform.websiteUrl}
                platformSlug={platform.slug}
                referralAvailable={platform.referralStatus === "available" || platform.referralStatus === "partner_only"}
                sourcePage={`/platforms/${platform.slug}`}
                className="mt-6 inline-flex h-11 w-full items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90"
              >
                Visit {platform.name}
                <ArrowRight className="ml-2 size-4" />
              </TrackedApplyLink>

              <p className="mt-4 text-xs leading-5 text-muted-foreground">
                Some links may become referral links where available. Recommendations should not be based only on referral payouts.
              </p>
            </aside>
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <div className="grid gap-6 lg:grid-cols-2">
            <div className="rounded-2xl border bg-card p-6">
              <h2 className="text-2xl font-semibold">Pros</h2>

              <ul className="mt-5 space-y-3 text-sm text-muted-foreground">
                {platform.pros.map((item) => (
                  <li key={item} className="flex gap-3">
                    <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-primary" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-2xl border bg-card p-6">
              <h2 className="text-2xl font-semibold">Things to consider</h2>

              <ul className="mt-5 space-y-3 text-sm text-muted-foreground">
                {platform.cons.map((item) => (
                  <li key={item} className="flex gap-3">
                    <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-primary" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </Section>

      <Section className="border-y bg-muted/20">
        <Container>
          <h2 className="text-3xl font-semibold tracking-tight">
            Current {platform.name} opportunities
          </h2>

          {jobs.length > 0 ? (
            <div className="mt-8 grid gap-4 md:grid-cols-3">
              {jobs.map((job) => (
                <Link
                  key={job.id}
                  href={`/jobs/${job.slug}`}
                  className="rounded-2xl border bg-card p-6 transition hover:border-primary/50"
                >
                  <h3 className="text-lg font-semibold">{job.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-muted-foreground">
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
          ) : (
            <div className="mt-8 rounded-2xl border bg-card p-6 text-sm text-muted-foreground">
              No active seed jobs listed for this platform yet. More verified opportunities can be added manually.
            </div>
          )}
        </Container>
      </Section>
    </main>
  );
}
