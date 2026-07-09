import type { Metadata } from "next";
import { redirect } from "next/navigation";

import { adminLogoutAction } from "@/app/admin/actions";
import { Container } from "@/components/layout/container";
import { getSupabaseAdmin } from "@/lib/supabase/admin";
import { isAdminAuthenticated } from "@/lib/admin/auth";

export const metadata: Metadata = {
  title: "Outcome Reports Admin | Remote Work Syndicate",
  robots: {
    index: false,
    follow: false,
  },
};

type OutcomeReportRow = {
  id: string;
  platform_slug: string | null;
  job_slug: string | null;
  report_status: string;
  country: string | null;
  role_category: string | null;
  email: string | null;
  status: string;
  verification_level: string;
  published: boolean;
  created_at: string;
};

function formatIndiaTime(value: string) {
  return new Intl.DateTimeFormat("en-IN", {
    dateStyle: "medium",
    timeStyle: "short",
    timeZone: "Asia/Kolkata",
  }).format(new Date(value));
}

export default async function OutcomeReportsAdminPage() {
  const authenticated = await isAdminAuthenticated();

  if (!authenticated) {
    redirect("/admin");
  }

  const supabase = getSupabaseAdmin();

  const { data, error } = await supabase
    .from("outcome_reports")
    .select(
      "id, platform_slug, job_slug, report_status, country, role_category, email, status, verification_level, published, created_at",
    )
    .order("created_at", { ascending: false })
    .limit(100);

  if (error) {
    throw new Error(`Unable to load outcome reports: ${error.message}`);
  }

  const reports = (data ?? []) as OutcomeReportRow[];

  return (
    <Container className="py-10">
      <div className="flex flex-col gap-4 border-b pb-6 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-sm font-medium uppercase tracking-wide text-muted-foreground">
            Admin
          </p>
          <h1 className="text-3xl font-bold tracking-tight">
            Outcome reports
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Review the latest submitted outcome reports. Times are shown in
            India/Kolkata time.
          </p>
        </div>

        <form action={adminLogoutAction}>
          <button
            className="rounded-xl border px-4 py-2 text-sm font-medium transition hover:bg-muted"
            type="submit"
          >
            Sign out
          </button>
        </form>
      </div>

      <div className="mt-8 overflow-hidden rounded-2xl border">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[1000px] text-left text-sm">
            <thead className="bg-muted/50 text-xs uppercase tracking-wide text-muted-foreground">
              <tr>
                <th className="px-4 py-3">Submitted</th>
                <th className="px-4 py-3">Platform</th>
                <th className="px-4 py-3">Job</th>
                <th className="px-4 py-3">Report</th>
                <th className="px-4 py-3">Country</th>
                <th className="px-4 py-3">Role</th>
                <th className="px-4 py-3">Email</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Published</th>
              </tr>
            </thead>
            <tbody>
              {reports.length > 0 ? (
                reports.map((report) => (
                  <tr className="border-t" key={report.id}>
                    <td className="px-4 py-3 text-muted-foreground">
                      {formatIndiaTime(report.created_at)}
                    </td>
                    <td className="px-4 py-3">{report.platform_slug ?? "—"}</td>
                    <td className="px-4 py-3">{report.job_slug ?? "—"}</td>
                    <td className="px-4 py-3">{report.report_status}</td>
                    <td className="px-4 py-3">{report.country ?? "—"}</td>
                    <td className="px-4 py-3">{report.role_category ?? "—"}</td>
                    <td className="px-4 py-3">{report.email ?? "—"}</td>
                    <td className="px-4 py-3">
                      <span className="rounded-full bg-muted px-3 py-1 text-xs font-medium">
                        {report.status}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      {report.published ? "Yes" : "No"}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    className="px-4 py-8 text-center text-muted-foreground"
                    colSpan={9}
                  >
                    No outcome reports found yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </Container>
  );
}
