import Link from "next/link";
import { ArrowRight, Mail } from "lucide-react";

import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";

export const metadata = {
  title: "Contact | Remote Work Syndicate",
  description:
    "Contact Remote Work Syndicate for platform corrections, partnership questions, feedback, and privacy requests.",
};

export default function ContactPage() {
  return (
    <main>
      <Section className="border-b">
        <Container>
          <div className="max-w-3xl">
            <p className="mb-4 inline-flex rounded-full border px-4 py-2 text-sm text-muted-foreground">
              Contact
            </p>

            <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
              Contact Remote Work Syndicate
            </h1>

            <p className="mt-6 text-lg leading-8 text-muted-foreground">
              Use this page for platform corrections, broken links, partnership questions,
              privacy requests, and product feedback.
            </p>
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
            <div className="rounded-2xl border bg-card p-6 sm:p-8">
              <div className="flex items-center gap-3">
                <Mail className="size-5 text-primary" />
                <h2 className="text-2xl font-semibold">Contact email</h2>
              </div>

              <p className="mt-4 text-sm leading-7 text-muted-foreground">
                Add the final support email before launch. For now, this page acts as the contact
                placeholder required for the MVP trust foundation.
              </p>

              <div className="mt-6 rounded-xl border bg-muted/20 p-4 text-sm text-muted-foreground">
                hello@remoteworksyndicate.com
              </div>
            </div>

            <aside className="h-fit rounded-2xl border bg-card p-6">
              <h2 className="text-xl font-semibold">Need platform help?</h2>

              <p className="mt-3 text-sm leading-6 text-muted-foreground">
                Browse platform reviews first to understand pay, eligibility, role fit, and application context.
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
