import { guides } from "@/lib/data/seed";
import type { Guide } from "@/lib/data/types";

export function getGuides(): Guide[] {
  return guides
    .filter((guide) => guide.status === "published")
    .sort((a, b) => b.lastUpdatedAt.localeCompare(a.lastUpdatedAt));
}

export function getLatestGuides(limit = 3): Guide[] {
  return getGuides().slice(0, limit);
}

export function getGuideBySlug(slug: string): Guide | undefined {
  return getGuides().find((guide) => guide.slug === slug);
}
