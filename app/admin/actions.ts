"use server";

import { redirect } from "next/navigation";

import {
  clearAdminSession,
  setAdminSession,
  verifyAdminPassword,
} from "@/lib/admin/auth";

export async function adminLoginAction(formData: FormData) {
  const password = formData.get("password");

  if (typeof password !== "string" || !verifyAdminPassword(password)) {
    redirect("/admin?error=invalid");
  }

  await setAdminSession();

  redirect("/admin/outcome-reports");
}

export async function adminLogoutAction() {
  await clearAdminSession();

  redirect("/admin");
}
