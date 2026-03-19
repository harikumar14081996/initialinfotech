"use client";

import Image from "next/image";
import Link from "next/link";
import { Menu, X, Phone } from "lucide-react";
import { useState } from "react";

const links = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/registry", label: "Employee Directory" },
  { href: "/contact", label: "Contact" },
];

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-[var(--color-line)] bg-white/98 backdrop-blur-xl shadow-sm">
      <div className="page-shell flex items-center justify-between gap-4 py-3">
        {/* Logo */}
        <Link href="/" className="flex items-center shrink-0" onClick={() => setOpen(false)}>
          <Image
            src="/branding/logo.png"
            alt="Initial Infotech logo"
            width={600}
            height={370}
            className="h-[52px] w-auto object-contain"
            priority
          />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-1 md:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-lg px-3 py-2 text-sm font-medium text-[var(--color-muted)] transition-colors hover:bg-[var(--color-paper)] hover:text-[var(--color-accent)]"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* CTA */}
        <Link
          href="/contact"
          className="hidden md:inline-flex items-center gap-2 rounded-xl bg-[var(--color-accent)] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[var(--color-accent-strong)] shadow-sm"
          onClick={() => setOpen(false)}
        >
          <Phone className="h-4 w-4" />
          Get in touch
        </Link>

        {/* Mobile hamburger */}
        <button
          className="flex h-10 w-10 items-center justify-center rounded-xl border border-[var(--color-line)] text-[var(--color-text)] transition hover:bg-[var(--color-paper)] md:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((c) => !c)}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile drawer */}
      {open && (
        <div className="border-t border-[var(--color-line)] bg-white md:hidden">
          <div className="page-shell flex flex-col gap-1 py-4">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-xl border border-[var(--color-line)] px-4 py-3 text-sm font-medium text-[var(--color-text)] transition hover:bg-[var(--color-paper)] hover:text-[var(--color-accent)]"
                onClick={() => setOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/contact"
              className="mt-2 flex items-center justify-center gap-2 rounded-xl bg-[var(--color-accent)] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[var(--color-accent-strong)]"
              onClick={() => setOpen(false)}
            >
              <Phone className="h-4 w-4" />
              Get in touch
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
