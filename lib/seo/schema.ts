import type { Comparison, Guide, Job, Platform } from "@/lib/data/types";

const siteUrl = "https://remoteworksyndicate.com";

export type JsonLdObject = Record<string, unknown>;

function absoluteUrl(path: string) {
  return `${siteUrl}${path.startsWith("/") ? path : `/${path}`}`;
}

export function organizationSchema(): JsonLdObject {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Remote Work Syndicate",
    url: siteUrl,
    description:
      "Independent AI remote work intelligence for comparing platforms, finding verified opportunities, and applying with better context.",
  };
}

export function websiteSchema(): JsonLdObject {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Remote Work Syndicate",
    url: siteUrl,
    potentialAction: {
      "@type": "SearchAction",
      target: `${siteUrl}/jobs?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };
}

export function breadcrumbListSchema(
  items: Array<{
    name: string;
    path: string;
  }>,
): JsonLdObject {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function articleSchema(guide: Guide): JsonLdObject {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: guide.title,
    description: guide.excerpt,
    datePublished: guide.publishedAt,
    dateModified: guide.lastUpdatedAt,
    mainEntityOfPage: absoluteUrl(`/guides/${guide.slug}`),
    publisher: {
      "@type": "Organization",
      name: "Remote Work Syndicate",
    },
  };
}

export function jobPostingSchema(job: Job, platform?: Platform): JsonLdObject {
  return {
    "@context": "https://schema.org",
    "@type": "JobPosting",
    title: job.title,
    description: job.shortDescription,
    datePosted: job.lastVerifiedAt,
    employmentType: job.workType.toUpperCase(),
    hiringOrganization: {
      "@type": "Organization",
      name: platform?.name ?? job.platformSlug,
      sameAs: platform?.websiteUrl,
    },
    jobLocationType: job.remote ? "TELECOMMUTE" : undefined,
    applicantLocationRequirements: job.countriesAllowed.map((country) => ({
      "@type": "Country",
      name: country,
    })),
    directApply: false,
    url: absoluteUrl(`/jobs/${job.slug}`),
  };
}

export function comparisonPageSchema(comparison: Comparison): JsonLdObject {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: comparison.title,
    description: comparison.excerpt,
    url: absoluteUrl(`/compare/${comparison.slug}`),
  };
}
