import type { Metadata } from "next";

import { OutcomeReportForm } from "@/components/forms/outcome-report-form";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";

export const metadata: Metadata = {
  title: "Submit an Outcome | Remote Work Syndicate",
  description:
    "Share your remote AI work application outcome, response time, pay experience, and platform feedback.",
};

export default function SubmitOutcomePage() {
  return (
    <main>
      <Section className="border-b">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <p className="mb-4 inline-flex rounded-full border px-4 py-2 text-sm text-muted-foreground">
              Community outcome reports
            </p>

            <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
              Share what happened after you applied.
            </h1>

            <p className="mt-6 text-lg leading-8 text-muted-foreground">
              Your report can help other remote AI work applicants understand
              real response times, assessments, pay ranges, and platform
              quality. Reports are not published automatically.
            </p>
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <div className="mx-auto max-w-4xl">
            <OutcomeReportForm />
          </div>
        </Container>
      </Section>
    </main>
  );
}
