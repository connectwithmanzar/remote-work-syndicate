import Link from "next/link";
import { ArrowRight, BriefcaseBusiness, ShieldCheck, Sparkles } from "lucide-react";

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

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <section className="relative overflow-hidden border-b px-6 py-24 sm:py-32">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,rgba(79,140,255,0.24),transparent_35%),radial-gradient(circle_at_top_right,rgba(139,92,246,0.20),transparent_30%)]" />

        <div className="mx-auto max-w-6xl">
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
        </div>
      </section>
    </main>
  );
}
