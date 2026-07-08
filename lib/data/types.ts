export type HiringStatus =
  | "actively_hiring"
  | "limited_hiring"
  | "waitlist"
  | "not_hiring"
  | "unknown";

export type ReferralStatus =
  | "available"
  | "not_available"
  | "unknown"
  | "partner_only"
  | "paused";

export type WorkType =
  | "part_time"
  | "full_time"
  | "contract"
  | "freelance"
  | "temporary"
  | "internship"
  | "unknown";

export type ExperienceLevel =
  | "beginner"
  | "intermediate"
  | "advanced"
  | "expert"
  | "any"
  | "unknown";

export type SkillCategory =
  | "ai_trainer"
  | "ai_evaluator"
  | "llm_evaluator"
  | "data_annotation"
  | "coding_evaluator"
  | "prompt_engineering"
  | "language_expert"
  | "domain_expert"
  | "software_engineering"
  | "data_science"
  | "machine_learning"
  | "research"
  | "writing"
  | "translation"
  | "other";

export type Platform = {
  id: string;
  name: string;
  slug: string;
  websiteUrl: string;
  shortDescription: string;
  overview: string;
  hiringStatus: HiringStatus;
  bestFor: string[];
  roleCategories: SkillCategory[];
  acceptedCountries: string[];
  remoteRegions: string[];
  payMin?: number;
  payMax?: number;
  payCurrency: string;
  payType: "hourly" | "fixed" | "monthly" | "annual" | "per_task" | "unknown";
  referralStatus: ReferralStatus;
  trustScore: number;
  pros: string[];
  cons: string[];
  lastVerifiedAt: string;
};

export type Job = {
  id: string;
  title: string;
  slug: string;
  platformSlug: string;
  category: SkillCategory;
  workType: WorkType;
  experienceLevel: ExperienceLevel;
  shortDescription: string;
  payMin?: number;
  payMax?: number;
  payCurrency: string;
  remote: boolean;
  countriesAllowed: string[];
  skills: string[];
  referralAvailable: boolean;
  applyUrl: string;
  lastVerifiedAt: string;
  status: "active" | "expired" | "needs_review";
};

export type Guide = {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  category: string;
  publishedAt: string;
  lastUpdatedAt: string;
  status: "published" | "draft";
};

export type Comparison = {
  id: string;
  title: string;
  slug: string;
  platformSlugs: string[];
  excerpt: string;
  verdict: string;
  lastUpdatedAt: string;
  status: "published" | "draft";
};
