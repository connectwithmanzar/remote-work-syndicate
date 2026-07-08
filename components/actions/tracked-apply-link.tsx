"use client";

import { MouseEvent, ReactNode, useState } from "react";

type TrackedApplyLinkProps = {
  destinationUrl: string;
  platformSlug: string;
  jobSlug?: string;
  referralAvailable?: boolean;
  sourcePage?: string;
  children?: ReactNode;
  className?: string;
};

export function TrackedApplyLink({
  destinationUrl,
  platformSlug,
  jobSlug,
  referralAvailable = false,
  sourcePage = "website",
  children = "Apply now",
  className,
}: TrackedApplyLinkProps) {
  const [isTracking, setIsTracking] = useState(false);

  async function handleClick(event: MouseEvent<HTMLAnchorElement>) {
    event.preventDefault();

    if (isTracking) {
      return;
    }

    setIsTracking(true);

    try {
      await fetch("/api/track-apply-click", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          destinationUrl,
          platformSlug,
          jobSlug,
          referralAvailable,
          sourcePage,
        }),
      });
    } catch {
      // Tracking should never block the user from visiting the destination.
    } finally {
      window.open(destinationUrl, "_blank", "noopener,noreferrer");
      setIsTracking(false);
    }
  }

  return (
    <a
      href={destinationUrl}
      target="_blank"
      rel="noopener noreferrer"
      onClick={handleClick}
      className={
        className ??
        "inline-flex min-h-12 items-center justify-center rounded-full bg-slate-950 px-6 text-sm font-semibold text-white transition hover:bg-slate-800"
      }
    >
      {isTracking ? "Opening..." : children}
    </a>
  );
}
