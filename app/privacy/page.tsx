import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";

export const metadata = {
  title: "Privacy Policy | Remote Work Syndicate",
  description:
    "Privacy policy for Remote Work Syndicate, including how basic user submissions and analytics may be handled.",
};

export default function PrivacyPage() {
  return (
    <main>
      <Section className="border-b">
        <Container>
          <div className="max-w-3xl">
            <p className="mb-4 inline-flex rounded-full border px-4 py-2 text-sm text-muted-foreground">
              Legal
            </p>

            <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
              Privacy Policy
            </h1>

            <p className="mt-6 text-lg leading-8 text-muted-foreground">
              Remote Work Syndicate is built to help users discover and compare AI remote work opportunities.
              This MVP privacy page explains the basic principles we follow while the product is early.
            </p>
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <article className="max-w-3xl rounded-2xl border bg-card p-6 text-sm leading-7 text-muted-foreground sm:p-8">
            <h2 className="text-2xl font-semibold text-foreground">Information we may collect</h2>
            <p className="mt-4">
              We may collect information users submit through forms, including newsletter signup emails,
              quiz answers, outcome reports, and apply-click events. In the MVP, these features may be
              stored locally, in Supabase, or mimicked until integrations are complete.
            </p>

            <h2 className="mt-8 text-2xl font-semibold text-foreground">How we use information</h2>
            <p className="mt-4">
              We use submitted information to improve platform recommendations, understand application
              outcomes, send requested updates, and improve the product experience.
            </p>

            <h2 className="mt-8 text-2xl font-semibold text-foreground">What we do not do</h2>
            <p className="mt-4">
              We should not sell private user submissions, publish raw community reports, or expose private
              form data publicly. Community insights should be aggregated before being shown.
            </p>

            <h2 className="mt-8 text-2xl font-semibold text-foreground">Contact</h2>
            <p className="mt-4">
              For privacy questions, use the contact page. This page should be reviewed before public launch.
            </p>
          </article>
        </Container>
      </Section>
    </main>
  );
}
