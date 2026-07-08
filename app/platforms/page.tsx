import Link from "next/link";
import { ArrowRight, ShieldCheck } from "lucide-react";

import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { getPlatforms } from "@/lib/data/platforms";

function formatPay(min?: number, max?: number, currency = "USD") {
  if (!min && !max) return "Pay varies";
  if (min && max) return `${currency} ${min}–${max}/hr`;
  if (min) return `From ${currency} ${min}/hr`;
  return `Up to ${currency} ${max}/hr`;
}

export default function PlatformsPage() {
  const platforms = getPlatforms();

  return (
    <main>
      <Section className="border-b">
        <Container>
          <div className="max-w-3xl">
            <p className="mb-4 text-sm font-medium text-primary">
              AI work platform directory
            </p>

            <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
              Compare AI remote work platforms before you apply.
            </h1>

            <p className="mt-6 text-lg leading-8 text-muted-foreground">
              Browse platforms by role fit, hiring status, pay range, country eligibility,
              referral availability, and last verified date.
            </p>
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <div className="grid gap-4 md:grid-cols-2">
            {platforms.map((platform) => (
              <Link
                key={platform.id}
                href={`/platforms/${platform.slug}`}
                className="group rounded-2xl border bg-card p-6 transition hover:border-primary/50"
              >
                <div className="mb-4 flex items-start justify-between gap-4">
                  <div>
                    <h2 className="text-2xl font-semibold">{platform.name}</h2>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {platform.hiringStatus.replaceAll("_", " ")}
                    </p>
                  </div>

                  <span className="rounded-full border px-3 py-1 text-xs text-muted-foreground">
                    Trust {platform.trustScore}/100
                  </span>
                </div>

                <p className="text-sm leading-6 text-muted-foreground">
                  {platform.shortDescription}
                </p>

                <div className="mt-5 flex flex-wrap gap-2">
                  {platform.bestFor.map((item) => (
                    <span key={item} className="rounded-full bg-muted px-3 py-1 text-xs">
                      {item}
                    </span>
                  ))}
                </div>

                <div className="mt-6 grid gap-3 text-sm sm:grid-cols-2">
                  <div>
                    <p className="text-muted-foreground">Pay range</p>
                    <p className="font-medium">
                      {formatPay(platform.payMin, platform.payMax, platform.payCurrency)}
                    </p>
                  </div>

                  <div>
                    <p className="text-muted-foreground">Referral status</p>
                    <p className="font-medium">
                      {platform.referralStatus.replaceAll("_", " ")}
                    </p>
                  </div>

                  <div>
                    <p className="text-muted-foreground">Remote regions</p>
                    <p className="font-medium">{platform.remoteRegions.join(", ")}</p>
                  </div>

                  <div>
                    <p className="text-muted-foreground">Last verified</p>
                    <p className="font-medium">{platform.lastVerifiedAt}</p>
                  </div>
                </div>

                <div className="mt-6 flex items-center justify-between border-t pt-5">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <ShieldCheck className="size-4 text-primary" />
                    Independent review
                  </div>

                  <span className="inline-flex items-center text-sm font-medium text-primary">
                    View details
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
