import { Globe2, MapPin, Sparkles } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { getCompanyInfo } from "@/lib/data";

export const metadata = {
  title: "About",
};

export default async function AboutPage() {
  const company = await getCompanyInfo();

  return (
    <div className="page-shell py-14 md:py-18">
      <Badge>About Initial Infotech</Badge>
      <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_0.9fr]">
        <div className="section-card rounded-[2rem] p-7 md:p-10">
          <h1 className="font-mono text-4xl font-semibold text-[var(--color-text)] md:text-5xl">
            {company.aboutTitle}
          </h1>
          <p className="mt-6 text-base leading-8 text-[var(--color-muted)]">{company.aboutBody}</p>
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            <div className="rounded-[1.5rem] border border-[var(--color-line)] bg-white p-5">
              <Sparkles className="h-5 w-5 text-[var(--color-accent)]" />
              <h2 className="mt-4 font-mono text-xl font-semibold">Mission</h2>
              <p className="mt-3 text-sm leading-7 text-[var(--color-muted)]">{company.mission}</p>
            </div>
            <div className="rounded-[1.5rem] border border-[var(--color-line)] bg-white p-5">
              <Globe2 className="h-5 w-5 text-[var(--color-accent)]" />
              <h2 className="mt-4 font-mono text-xl font-semibold">Global reach</h2>
              <p className="mt-3 text-sm leading-7 text-[var(--color-muted)]">
                {company.globalReach}
              </p>
            </div>
          </div>
        </div>

        <div className="section-card rounded-[2rem] p-7 md:p-10">
          <div className="flex items-center gap-3">
            <MapPin className="h-5 w-5 text-[var(--color-accent)]" />
            <p className="text-sm uppercase tracking-[0.2em] text-[var(--color-muted)]">
              Headquarters
            </p>
          </div>
          <p className="mt-6 font-mono text-3xl font-semibold">
            {company.city}, {company.region}
          </p>
          <p className="mt-4 text-sm leading-7 text-[var(--color-muted)]">
            {company.address}, {company.city}, {company.region} {company.postalCode},{" "}
            {company.country}
          </p>
          <div className="mt-10 rounded-[1.75rem] border border-[var(--color-line)] bg-white p-5">
            <p className="text-sm uppercase tracking-[0.2em] text-[var(--color-muted)]">
              What clients value
            </p>
            <ul className="mt-4 space-y-3 text-sm text-[var(--color-muted)]">
              <li>Structured delivery and milestone visibility</li>
              <li>Modern frontend and backend engineering</li>
              <li>Practical support across product, QA, and deployment</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
