import Image from "next/image";
import Link from "next/link";
import { Mail, Phone, MapPin, User } from "lucide-react";
import { getCompanyInfo } from "@/lib/data";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
  { href: "/registry", label: "Employee Directory" },
];

const services = [
  "Software Development",
  "Mobile Applications",
  "AI & Automation",
  "IT Consulting",
];

export async function Footer() {
  const company = await getCompanyInfo();

  return (
    <footer className="border-t border-[var(--color-line)] bg-white">
      <div className="page-shell py-12">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand column */}
          <div className="lg:col-span-2">
            <Link href="/" className="inline-block">
              <Image
                src="/branding/logo.png"
                alt="Initial Infotech logo"
                width={600}
                height={370}
                className="h-[60px] w-auto object-contain"
              />
            </Link>
            <p className="mt-4 max-w-sm text-sm leading-7 text-[var(--color-muted)]">
              Modern software, mobile apps, and AI-enabled delivery from Bardoli
              for teams that need dependable execution and clear communication.
            </p>

            {/* Owner */}
            {company.ownerName && (
              <div className="mt-4 flex items-center gap-2 text-sm text-[var(--color-text)]">
                <User className="h-4 w-4 shrink-0 text-[var(--color-accent)]" />
                <span className="font-medium">{company.ownerName}</span>
                {company.ownerTitle && (
                  <span className="text-[var(--color-muted)]">· {company.ownerTitle}</span>
                )}
              </div>
            )}

            {/* Contact info */}
            <ul className="mt-4 space-y-2 text-sm text-[var(--color-muted)]">
              <li className="flex items-center gap-2">
                <MapPin className="h-4 w-4 shrink-0 text-[var(--color-accent)]" />
                Bardoli, Gujarat, India
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 shrink-0 text-[var(--color-accent)]" />
                <a href={`tel:${company.contactPhone}`} className="hover:text-[var(--color-accent)] transition-colors">
                  {company.contactPhone}
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 shrink-0 text-[var(--color-accent)]" />
                <a href={`mailto:${company.contactEmail}`} className="hover:text-[var(--color-accent)] transition-colors">
                  {company.contactEmail}
                </a>
              </li>
            </ul>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-[var(--color-text)]">
              Quick Links
            </h3>
            <ul className="space-y-2">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-[var(--color-muted)] transition-colors hover:text-[var(--color-accent)]"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal links */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-[var(--color-text)]">
              Legal
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/privacy-policy"
                  className="text-sm text-[var(--color-muted)] transition-colors hover:text-[var(--color-accent)]"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="text-sm text-[var(--color-muted)] transition-colors hover:text-[var(--color-accent)]"
                >
                  Terms & Conditions
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t border-[var(--color-line)] pt-6 sm:flex-row">
          <p className="text-xs text-[var(--color-muted)]">
            © 2026 Initial Infotech. All rights reserved.
          </p>
          <p className="text-xs text-[var(--color-muted)]">
            Built with ❤️ in Bardoli, Gujarat
          </p>
        </div>
      </div>
    </footer>
  );
}
