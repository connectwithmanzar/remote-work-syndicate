import Link from "next/link";

import { Container } from "@/components/layout/container";

const footerLinks = [
  { label: "Referral disclosure", href: "/referral-disclosure" },
  { label: "Privacy", href: "/privacy" },
  { label: "Terms", href: "/terms" },
  { label: "Contact", href: "/contact" },
];

export function SiteFooter() {
  return (
    <footer className="border-t">
      <Container className="flex flex-col gap-6 py-10 text-sm text-muted-foreground md:flex-row md:items-center md:justify-between">
        <p>
          © {new Date().getFullYear()} Remote Work Syndicate. Independent AI remote work intelligence.
        </p>

        <nav className="flex flex-wrap gap-4">
          {footerLinks.map((item) => (
            <Link key={item.href} href={item.href} className="transition hover:text-foreground">
              {item.label}
            </Link>
          ))}
        </nav>
      </Container>
    </footer>
  );
}
