import { jobs } from "@/lib/data/seed";
import type { Job } from "@/lib/data/types";

export function getJobs(): Job[] {
  return jobs
    .filter((job) => job.status === "active")
    .sort((a, b) => b.lastVerifiedAt.localeCompare(a.lastVerifiedAt));
}

export function getFeaturedJobs(limit = 3): Job[] {
  return getJobs().slice(0, limit);
}

export function getJobBySlug(slug: string): Job | undefined {
  return getJobs().find((job) => job.slug === slug);
}

export function getJobsByPlatform(platformSlug: string): Job[] {
  return getJobs().filter((job) => job.platformSlug === platformSlug);
}
