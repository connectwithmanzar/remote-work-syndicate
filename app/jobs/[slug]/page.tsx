import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, CheckCircle2, ExternalLink, ShieldCheck } from "lucide-react";

import { TrackedApplyLink } from "@/components/actions/tracked-apply-link";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { JsonLd } from "@/components/seo/JsonLd";
import { getJobBySlug, getJobs } from "@/lib/data/jobs";
import { getPlatformBySlug } from "@/lib/data/platforms";
import { breadcrumbListSchema, jobPostingSchema } from "@/lib/seo/schema";

type JobDetailPageProps = {
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
  return getJobs().map((job) => ({
    slug: job.slug,
  }));
}

export async function generateMetadata({ params }: JobDetailPageProps) {
  const { slug } = await params;
  const job = getJobBySlug(slug);

  if (!job) {
    return {
      title: "Job not found | Remote Work Syndicate",
    };
  }

  const platform = getPlatformBySlug(job.platformSlug);

  return {
    title: `${job.title} at ${platform?.name ?? job.platformSlug} | Remote Work Syndicate`,
    description: job.shortDescription,
  };
}

export default async function JobDetailPage({ params }: JobDetailPageProps) {
  const { slug } = await params;
  const job = getJobBySlug(slug);

  if (!job) {
    notFound();
  }

  const platform = getPlatformBySlug(job.platformSlug);

  const structuredData = [
    jobPostingSchema(job, platform),
    breadcrumbListSchema([
      { name: "Home", path: "/" },
      { name: "Jobs", path: "/jobs" },
      { name: job.title, path: `/jobs/${job.slug}` },
    ]),
  ];

  return (
    <main>
      <JsonLd data={structuredData} />
      <Section className="border-b">
        <Container>
          <Link
            href="/jobs"
            className="mb-8 inline-flex items-center text-sm text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="mr-2 size-4" />
            Back to jobs
          </Link>

          <div className="grid gap-8 lg:grid-cols-[1fr_360px]">
            <div>
              <p className="mb-4 text-sm font-medium text-primary">
                Verified AI remote opportunity
              </p>

              <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
                {job.title}
              </h1>

              <p className="mt-4 text-lg text-muted-foreground">
                {platform?.name ?? job.platformSlug}
              </p>

              <p className="mt-6 text-lg leading-8 text-muted-foreground">
                {job.shortDescription}
              </p>

              <div className="mt-6 flex flex-wrap gap-2">
                <span className="rounded-full bg-muted px-3 py-1 text-xs">
                  {job.category.replaceAll("_", " ")}
                </span>

                <span className="rounded-full bg-muted px-3 py-1 text-xs">
                  {job.workType.replaceAll("_", " ")}
                </span>

                <span className="rounded-full bg-muted px-3 py-1 text-xs">
                  {job.experienceLevel}
                </span>

                {job.referralAvailable ? (
                  <span className="rounded-full border px-3 py-1 text-xs text-muted-foreground">
                    Referral available
                  </span>
                ) : null}
              </div>
            </div>

            <aside className="rounded-2xl border bg-card p-6">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <ShieldCheck className="size-4 text-primary" />
                Last verified: {job.lastVerifiedAt}
              </div>

              <dl className="mt-6 space-y-4 text-sm">
                <div>
                  <dt className="text-muted-foreground">Platform</dt>
                  <dd className="mt-1 font-medium">{platform?.name ?? job.platformSlug}</dd>
                </div>

                <div>
                  <dt className="text-muted-foreground">Pay range</dt>
                  <dd className="mt-1 font-medium">
                    {formatPay(job.payMin, job.payMax, job.payCurrency)}
                  </dd>
                </div>

                <div>
                  <dt className="text-muted-foreground">Remote eligibility</dt>
                  <dd className="mt-1 font-medium">
                    {job.remote ? "Remote" : "Not fully remote"}
                  </dd>
                </div>

                <div>
                  <dt className="text-muted-foreground">Countries allowed</dt>
                  <dd className="mt-1 font-medium">{job.countriesAllowed.join(", ")}</dd>
                </div>
              </dl>

              <TrackedApplyLink
                destinationUrl={job.applyUrl}
                platformSlug={job.platformSlug}
                jobSlug={job.slug}
                referralAvailable={job.referralAvailable}
                sourcePage={`/jobs/${job.slug}`}
                className="mt-6 inline-flex h-11 w-full items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90"
              >
                Apply on {platform?.name ?? "platform"}
                <ExternalLink className="ml-2 size-4" />
              </TrackedApplyLink>

              <p className="mt-4 text-xs leading-5 text-muted-foreground">
                Apply links may be tracked for product analytics. If a referral link is available,
                it should be clearly disclosed before launch.
              </p>
            </aside>
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <div className="grid gap-6 lg:grid-cols-3">
            <div className="rounded-2xl border bg-card p-6 lg:col-span-2">
              <h2 className="text-2xl font-semibold">Job overview</h2>

              <p className="mt-4 text-sm leading-7 text-muted-foreground">
                This opportunity is listed as an active curated seed job for the MVP.
                The role may involve AI evaluation, training, review, or domain-specific
                work depending on platform requirements.
              </p>

              <h3 className="mt-8 text-xl font-semibold">Required skills</h3>

              <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
                {job.skills.map((skill) => (
                  <li key={skill} className="flex gap-3">
                    <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-primary" />
                    <span>{skill}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-2xl border bg-card p-6">
              <h2 className="text-2xl font-semibold">Platform context</h2>

              {platform ? (
                <>
                  <p className="mt-4 text-sm leading-7 text-muted-foreground">
                    {platform.shortDescription}
                  </p>

                  <Link
                    href={`/platforms/${platform.slug}`}
                    className="mt-6 inline-flex items-center text-sm font-medium text-primary"
                  >
                    Read {platform.name} review
                    <ArrowRight className="ml-2 size-4" />
                  </Link>
                </>
              ) : (
                <p className="mt-4 text-sm leading-7 text-muted-foreground">
                  Platform details are not available yet.
                </p>
              )}
            </div>
          </div>
        </Container>
      </Section>
    </main>
  );
}
