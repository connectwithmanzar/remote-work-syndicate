import Link from "next/link";
import { ArrowRight, BriefcaseBusiness, ShieldCheck } from "lucide-react";

import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { getJobs } from "@/lib/data/jobs";
import { getPlatformBySlug } from "@/lib/data/platforms";

function formatPay(min?: number, max?: number, currency = "USD") {
  if (!min && !max) return "Pay varies";
  if (min && max) return `${currency} ${min}–${max}/hr`;
  if (min) return `From ${currency} ${min}/hr`;
  return `Up to ${currency} ${max}/hr`;
}

export default function JobsPage() {
  const jobs = getJobs();

  return (
    <main>
      <Section className="border-b">
        <Container>
          <div className="max-w-3xl">
            <p className="mb-4 text-sm font-medium text-primary">
              Verified AI remote jobs
            </p>

            <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
              Browse curated AI remote work opportunities.
            </h1>

            <p className="mt-6 text-lg leading-8 text-muted-foreground">
              Explore AI trainer, evaluator, data annotation, coding evaluator,
              writing, and domain expert roles from remote AI work platforms.
            </p>
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <div className="grid gap-4">
            {jobs.map((job) => {
              const platform = getPlatformBySlug(job.platformSlug);

              return (
                <Link
                  key={job.id}
                  href={`/jobs/${job.slug}`}
                  className="group rounded-2xl border bg-card p-6 transition hover:border-primary/50"
                >
                  <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
                    <div>
                      <div className="mb-3 flex flex-wrap items-center gap-2">
                        <span className="rounded-full bg-muted px-3 py-1 text-xs">
                          {platform?.name ?? job.platformSlug}
                        </span>

                        <span className="rounded-full bg-muted px-3 py-1 text-xs">
                          {job.category.replaceAll("_", " ")}
                        </span>

                        {job.referralAvailable ? (
                          <span className="rounded-full border px-3 py-1 text-xs text-muted-foreground">
                            Referral available
                          </span>
                        ) : null}
                      </div>

                      <h2 className="text-2xl font-semibold">{job.title}</h2>

                      <p className="mt-3 max-w-3xl text-sm leading-6 text-muted-foreground">
                        {job.shortDescription}
                      </p>

                      <div className="mt-5 flex flex-wrap gap-2">
                        {job.skills.map((skill) => (
                          <span key={skill} className="rounded-full bg-muted px-3 py-1 text-xs">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="min-w-56 rounded-xl border bg-background p-4 text-sm">
                      <p className="font-medium">
                        {formatPay(job.payMin, job.payMax, job.payCurrency)}
                      </p>

                      <p className="mt-2 text-muted-foreground">
                        {job.workType.replaceAll("_", " ")} · {job.experienceLevel}
                      </p>

                      <p className="mt-2 text-muted-foreground">
                        Last verified: {job.lastVerifiedAt}
                      </p>
                    </div>
                  </div>

                  <div className="mt-6 flex items-center justify-between border-t pt-5">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <ShieldCheck className="size-4 text-primary" />
                      Active curated listing
                    </div>

                    <span className="inline-flex items-center text-sm font-medium text-primary">
                      View job
                      <ArrowRight className="ml-2 size-4 transition group-hover:translate-x-1" />
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>

          <div className="mt-8 rounded-2xl border bg-muted/20 p-6 text-sm leading-6 text-muted-foreground">
            <div className="flex gap-3">
              <BriefcaseBusiness className="mt-0.5 size-5 shrink-0 text-primary" />
              <p>
                Jobs are manually curated seed listings for the MVP. Expired jobs should not be shown as active,
                and every job should keep a visible last verified date.
              </p>
            </div>
          </div>
        </Container>
      </Section>
    </main>
  );
}
