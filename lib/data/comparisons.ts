import { comparisons } from "@/lib/data/seed";
import type { Comparison } from "@/lib/data/types";

export function getComparisons(): Comparison[] {
  return comparisons
    .filter((comparison) => comparison.status === "published")
    .sort((a, b) => b.lastUpdatedAt.localeCompare(a.lastUpdatedAt));
}

export function getPopularComparisons(limit = 3): Comparison[] {
  return getComparisons().slice(0, limit);
}

export function getComparisonBySlug(slug: string): Comparison | undefined {
  return getComparisons().find((comparison) => comparison.slug === slug);
}
