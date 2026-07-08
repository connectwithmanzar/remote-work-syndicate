import Link from "next/link";
import { ArrowRight, ShieldCheck } from "lucide-react";

import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";

export const metadata = {
  title: "Referral Disclosure | Remote Work Syndicate",
  description:
    "How Remote Work Syndicate handles referral links, affiliate relationships, and independent platform recommendations.",
};

export default function ReferralDisclosurePage() {
  return (
    <main>
      <Section className="border-b">
        <Container>
          <div className="max-w-3xl">
            <p className="mb-4 inline-flex rounded-full border px-4 py-2 text-sm text-muted-foreground">
              Trust & disclosure
            </p>

            <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
              Referral Disclosure
            </h1>

            <p className="mt-6 text-lg leading-8 text-muted-foreground">
              Remote Work Syndicate may use referral or affiliate links for some
              platforms. This page explains how those links work and how we keep
              recommendations useful, transparent, and independent.
            </p>
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <div className="grid gap-8 lg:grid-cols-[1fr_320px]">
            <article className="rounded-2xl border bg-card p-6 sm:p-8">
              <div className="flex items-center gap-3">
                <ShieldCheck className="size-5 text-primary" />
                <h2 className="text-2xl font-semibold">Our disclosure policy</h2>
              </div>

              <div className="mt-6 space-y-6 text-sm leading-7 text-muted-foreground">
                <p>
                  Some apply buttons or platform links on Remote Work Syndicate may
                  use referral links, affiliate links, or tracked outbound links.
                  This means we may receive a commission, referral credit, or other
                  benefit if a user applies, signs up, or is accepted through a link.
                </p>

                <p>
                  Referral availability does not guarantee acceptance, payment, work
                  availability, or any specific outcome. Hiring decisions are made by
                  the destination platform, not Remote Work Syndicate.
                </p>

                <p>
                  Our goal is to help users compare platforms, understand fit, and
                  apply with better context. Recommendations should consider role fit,
                  country eligibility, hiring status, pay range, difficulty, user
                  profile, and verification quality — not only referral payouts.
                </p>

                <p>
                  We aim to clearly label referral availability wherever it matters,
                  especially on platform pages, job pages, apply buttons, and comparison
                  pages.
                </p>
              </div>
            </article>

            <aside className="h-fit rounded-2xl border bg-card p-6">
              <h2 className="text-xl font-semibold">Key promise</h2>

              <p className="mt-3 text-sm leading-6 text-muted-foreground">
                Remote Work Syndicate should never make fake job guarantees, fake
                income claims, or rank platforms only because they pay more.
              </p>

              <Link
                href="/platforms"
                className="mt-6 inline-flex h-11 w-full items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90"
              >
                Browse Platforms
                <ArrowRight className="ml-2 size-4" />
              </Link>
            </aside>
          </div>
        </Container>
      </Section>
    </main>
  );
}
