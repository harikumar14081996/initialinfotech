import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getCompanyInfo, getEmployees, getServices } from "@/lib/data";
import { iconMap, serviceImageMap, techStack } from "@/lib/constants";

export default async function HomePage() {
  const [company, services, employees] = await Promise.all([
    getCompanyInfo(),
    getServices(),
    getEmployees(),
  ]);

  return (
    <div className="pb-20">
      <section className="page-shell grid gap-10 py-14 lg:grid-cols-[1.15fr_0.85fr] lg:py-20">
        <div>
          <Badge>Tech-forward digital delivery</Badge>
          <div className="hero-accent-line mt-6" />
          <h1 className="mt-6 max-w-3xl font-mono text-5xl leading-tight font-semibold tracking-tight text-[var(--color-text)] md:text-7xl">
            Build software, mobile apps, and AI workflows that actually move the business.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-[var(--color-muted)]">
            {company.tagline} We help teams ship customer-facing products, internal systems, and
            intelligent automation from strategy through launch.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link href="/contact">
              <Button>
                Start a project
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link href="/registry">
              <Button variant="secondary">View employee directory</Button>
            </Link>
          </div>
          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            {[
              "Custom web platforms",
              "Mobile product delivery",
              "AI-powered operations",
            ].map((item) => (
              <div key={item} className="rounded-3xl border border-[var(--color-line)] bg-white p-4 shadow-[0_8px_18px_rgba(19,155,229,0.04)]">
                <CheckCircle2 className="h-5 w-5 text-[var(--color-accent)]" />
                <p className="mt-3 text-sm text-[var(--color-text)]">{item}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="hero-panel relative overflow-hidden rounded-[2rem] p-6 shadow-[0_12px_28px_rgba(19,155,229,0.06)]">
          <div className="absolute inset-x-0 top-0 h-1 bg-[linear-gradient(90deg,var(--color-accent),var(--color-secondary))]" />
          <div className="relative space-y-5">
            <div className="rounded-[1.75rem] border border-[var(--color-line)] bg-white p-5">
              <p className="text-sm uppercase tracking-[0.2em] text-[var(--color-secondary)]/80">
                Delivery profile
              </p>
              <p className="mt-4 font-mono text-3xl font-semibold text-[var(--color-text)]">Bardoli to global teams</p>
              <p className="mt-3 text-sm leading-7 text-[var(--color-muted)]">
                Product engineering, architecture, QA, and launch support with a practical
                business lens.
              </p>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="rounded-[1.5rem] border border-[var(--color-line)] bg-white p-5">
                <p className="text-3xl font-semibold text-[var(--color-accent)]">{services.length}+</p>
                <p className="mt-2 text-sm text-[var(--color-muted)]">Core service tracks</p>
              </div>
              <div className="rounded-[1.5rem] border border-[var(--color-line)] bg-white p-5">
                <p className="text-3xl font-semibold text-[var(--color-accent)]">{employees.length}+</p>
                <p className="mt-2 text-sm text-[var(--color-muted)]">Visible employee records</p>
              </div>
            </div>
            <div className="rounded-[1.75rem] border border-[var(--color-line)] bg-white p-5">
              <p className="text-sm font-medium text-[var(--color-secondary)]">Focused on clarity</p>
              <p className="mt-2 text-sm leading-7 text-[var(--color-muted)]">
                We combine clean implementation, practical architecture, and transparent
                communication so stakeholders always know where the work stands.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* University Hiring Section */}
      <section className="page-shell py-8 md:py-12">
        <div className="section-card flex flex-col items-center justify-between gap-8 rounded-[2rem] p-8 md:flex-row md:p-10">
          <div className="max-w-xl">
            <Badge>Campus Placements</Badge>
            <h2 className="mt-4 font-mono text-3xl font-semibold text-[var(--color-text)] md:text-4xl">
              Proudly hiring from Uka Tarsadia University
            </h2>
            <p className="mt-4 leading-7 text-[var(--color-muted)]">
              We actively recruit candidates from UTU to bring top-tier engineering talent directly into our teams. Our campus placement initiatives ensure that fresh perspectives and cutting-edge academic knowledge are continuously integrated into our software delivery pipeline.
            </p>
          </div>
          <div className="flex w-full max-w-[280px] shrink-0 items-center justify-center rounded-[1.5rem] border border-[var(--color-line)] bg-white p-8 shadow-sm md:w-auto">
            <Image
              src="/utu-logo.jpg"
              alt="Uka Tarsadia University Logo"
              width={180}
              height={180}
              className="object-contain drop-shadow-sm"
            />
          </div>
        </div>
      </section>

      <section className="page-shell py-8">
        <div className="flex items-end justify-between gap-6">
          <div>
            <Badge>Services</Badge>
            <h2 className="mt-4 font-mono text-3xl font-semibold text-[var(--color-text)] md:text-4xl">
              Capability areas built for business outcomes
            </h2>
          </div>
        </div>
        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {services.map((service) => {
            const Icon = iconMap[service.iconName as keyof typeof iconMap] ?? iconMap["globe-2"];
            const imgSrc = serviceImageMap[service.iconName] ?? "/services/software-dev.png";
            return (
              <div key={service.id} className="section-card flex flex-col overflow-hidden rounded-[1.8rem]">
                {/* Service illustration */}
                <div className="relative h-48 w-full overflow-hidden bg-[var(--color-paper)]">
                  <Image
                    src={imgSrc}
                    alt={service.title}
                    fill
                    className="object-cover object-center transition-transform duration-500 hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  {/* Icon badge over image */}
                  <div className="absolute bottom-3 left-3 flex h-10 w-10 items-center justify-center rounded-xl border border-[var(--color-line)] bg-white shadow-sm">
                    <Icon className="h-5 w-5 text-[var(--color-accent)]" />
                  </div>
                </div>
                {/* Content */}
                <div className="flex flex-1 flex-col p-6">
                  <h3 className="font-mono text-xl font-semibold text-[var(--color-text)]">{service.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-[var(--color-muted)]">
                    {service.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <section className="page-shell py-8">
        <div className="section-card overflow-hidden rounded-[2rem] p-6 md:p-8">
          <Badge>Tech stack</Badge>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {techStack.map((item) => (
              <div
                key={item}
                className="rounded-[1.4rem] border border-[var(--color-line)] bg-white px-4 py-5 text-sm font-medium text-[var(--color-text)]"
              >
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
