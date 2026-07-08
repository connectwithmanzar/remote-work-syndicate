import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";

export const metadata = {
  title: "Terms | Remote Work Syndicate",
  description:
    "Terms for using Remote Work Syndicate, an independent AI remote work intelligence platform.",
};

export default function TermsPage() {
  return (
    <main>
      <Section className="border-b">
        <Container>
          <div className="max-w-3xl">
            <p className="mb-4 inline-flex rounded-full border px-4 py-2 text-sm text-muted-foreground">
              Legal
            </p>

            <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
              Terms of Use
            </h1>

            <p className="mt-6 text-lg leading-8 text-muted-foreground">
              These MVP terms explain the basic expectations for using Remote Work Syndicate.
            </p>
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <article className="max-w-3xl rounded-2xl border bg-card p-6 text-sm leading-7 text-muted-foreground sm:p-8">
            <h2 className="text-2xl font-semibold text-foreground">Independent information platform</h2>
            <p className="mt-4">
              Remote Work Syndicate is an independent AI remote work intelligence platform. We are not a
              hiring platform, employer, recruiter, or staffing agency.
            </p>

            <h2 className="mt-8 text-2xl font-semibold text-foreground">No job guarantees</h2>
            <p className="mt-4">
              We do not guarantee job offers, interviews, income, acceptance, platform availability, or
              specific application outcomes.
            </p>

            <h2 className="mt-8 text-2xl font-semibold text-foreground">External links</h2>
            <p className="mt-4">
              Some links lead to third-party platforms. Users should verify role details, eligibility,
              payment terms, and platform legitimacy before applying.
            </p>

            <h2 className="mt-8 text-2xl font-semibold text-foreground">Referral links</h2>
            <p className="mt-4">
              Some links may be referral, affiliate, or tracked links. See the referral disclosure page
              for more detail.
            </p>
          </article>
        </Container>
      </Section>
    </main>
  );
}
