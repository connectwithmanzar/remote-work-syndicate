import type { Metadata } from "next";
import { redirect } from "next/navigation";

import { Container } from "@/components/layout/container";
import { adminLoginAction } from "@/app/admin/actions";
import { isAdminAuthenticated } from "@/lib/admin/auth";

export const metadata: Metadata = {
  title: "Admin Login | Remote Work Syndicate",
  robots: {
    index: false,
    follow: false,
  },
};

type AdminPageProps = {
  searchParams: Promise<{
    error?: string;
  }>;
};

export default async function AdminPage({ searchParams }: AdminPageProps) {
  const authenticated = await isAdminAuthenticated();

  if (authenticated) {
    redirect("/admin/outcome-reports");
  }

  const params = await searchParams;
  const hasError = params.error === "invalid";

  return (
    <Container className="py-16">
      <div className="mx-auto max-w-md rounded-3xl border bg-background p-8 shadow-sm">
        <div className="space-y-2">
          <p className="text-sm font-medium uppercase tracking-wide text-muted-foreground">
            Admin
          </p>
          <h1 className="text-3xl font-bold tracking-tight">Sign in</h1>
          <p className="text-sm text-muted-foreground">
            Enter the admin password to review submitted outcome reports.
          </p>
        </div>

        <form action={adminLoginAction} className="mt-8 space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium" htmlFor="password">
              Admin password
            </label>
            <input
              required
              className="w-full rounded-xl border bg-background px-4 py-3 text-sm outline-none ring-offset-background focus:ring-2 focus:ring-ring"
              id="password"
              name="password"
              type="password"
            />
          </div>

          {hasError ? (
            <p className="rounded-xl border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive">
              Incorrect admin password.
            </p>
          ) : null}

          <button
            className="w-full rounded-xl bg-foreground px-4 py-3 text-sm font-semibold text-background transition hover:opacity-90"
            type="submit"
          >
            Sign in
          </button>
        </form>
      </div>
    </Container>
  );
}
