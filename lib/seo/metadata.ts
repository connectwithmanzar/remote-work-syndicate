import type { Metadata } from "next";

import type { Comparison, Guide, Job, Platform } from "@/lib/data/types";

const siteName = "Remote Work Syndicate";
const siteUrl = "https://www.remoteworksyndicate.com";

function absoluteUrl(path: string) {
  return `${siteUrl}${path.startsWith("/") ? path : `/${path}`}`;
}

function createMetadata({
  title,
  description,
  path,
}: {
  title: string;
  description: string;
  path: string;
}): Metadata {
  const url = absoluteUrl(path);

  return {
    title,
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description,
      url,
      siteName,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export function generatePlatformMetadata(platform: Platform): Metadata {
  return createMetadata({
    title: `${platform.name} Review: AI Remote Work Platform, Pay, Jobs & Application Process`,
    description: platform.shortDescription,
    path: `/platforms/${platform.slug}`,
  });
}

export function generateJobMetadata(job: Job): Metadata {
  return createMetadata({
    title: `${job.title} | Remote Work Syndicate`,
    description: job.shortDescription,
    path: `/jobs/${job.slug}`,
  });
}

export function generateGuideMetadata(guide: Guide): Metadata {
  return createMetadata({
    title: `${guide.title} | Remote Work Syndicate`,
    description: guide.excerpt,
    path: `/guides/${guide.slug}`,
  });
}

export function generateComparisonMetadata(comparison: Comparison): Metadata {
  return createMetadata({
    title: `${comparison.title} | Remote Work Syndicate`,
    description: comparison.excerpt,
    path: `/compare/${comparison.slug}`,
  });
}

export function generateCategoryMetadata(category: {
  name: string;
  slug: string;
  description?: string;
}): Metadata {
  return createMetadata({
    title: `${category.name} AI Remote Work Jobs | Remote Work Syndicate`,
    description:
      category.description ??
      `Browse ${category.name} AI remote work opportunities, platform guides, and application context.`,
    path: `/categories/${category.slug}`,
  });
}

export function generateCountryMetadata(country: {
  name: string;
  slug: string;
  description?: string;
}): Metadata {
  return createMetadata({
    title: `AI Remote Work Jobs in ${country.name} | Remote Work Syndicate`,
    description:
      country.description ??
      `Find AI remote work platforms, job opportunities, and eligibility guidance for applicants in ${country.name}.`,
    path: `/countries/${country.slug}`,
  });
}
