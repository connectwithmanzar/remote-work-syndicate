import type { MetadataRoute } from "next";

import { getComparisons } from "@/lib/data/comparisons";
import { getGuides } from "@/lib/data/guides";
import { getJobs } from "@/lib/data/jobs";
import { getPlatforms } from "@/lib/data/platforms";

const siteUrl = "https://remoteworksyndicate.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "",
    "/platforms",
    "/jobs",
    "/guides",
    "/compare",
    "/quiz",
    "/referral-disclosure",
    "/privacy",
    "/terms",
    "/contact",
  ];

  const platformRoutes = getPlatforms().map((platform) => `/platforms/${platform.slug}`);
  const jobRoutes = getJobs().map((job) => `/jobs/${job.slug}`);
  const guideRoutes = getGuides().map((guide) => `/guides/${guide.slug}`);
  const comparisonRoutes = getComparisons().map((comparison) => `/compare/${comparison.slug}`);

  const routes = [
    ...staticRoutes,
    ...platformRoutes,
    ...jobRoutes,
    ...guideRoutes,
    ...comparisonRoutes,
  ];

  return routes.map((route) => ({
    url: `${siteUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : 0.7,
  }));
}
