import { platforms } from "@/lib/data/seed";
import type { Platform } from "@/lib/data/types";

export function getPlatforms(): Platform[] {
  return [...platforms].sort((a, b) => a.name.localeCompare(b.name));
}

export function getFeaturedPlatforms(limit = 3): Platform[] {
  return [...platforms]
    .sort((a, b) => b.trustScore - a.trustScore)
    .slice(0, limit);
}

export function getPlatformBySlug(slug: string): Platform | undefined {
  return platforms.find((platform) => platform.slug === slug);
}
