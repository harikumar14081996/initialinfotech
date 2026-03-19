import Image from "next/image";
import Link from "next/link";
import { format } from "date-fns";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getEmployees } from "@/lib/data";

export const metadata = {
  title: "Employee Directory",
};

export default async function RegistryPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q = "" } = await searchParams;
  const employees = await getEmployees();
  const query = q.toLowerCase();
  const filtered = employees.filter((employee) =>
    [employee.name, employee.personalEmail].join(" ").toLowerCase().includes(query),
  );

  return (
    <div className="page-shell py-14">
      <div className="grid gap-5 md:grid-cols-2 md:items-end">
        <div className="md:pr-6">
          <Badge>Employee directory</Badge>
          <h1 className="mt-4 font-mono text-4xl font-semibold md:text-5xl">
            Public employee directory
          </h1>
        </div>
        <form className="flex w-full gap-3 md:justify-self-end md:self-end" action="/registry">
          <input
            name="q"
            defaultValue={q}
            placeholder="Search by name or email"
            className="h-12 flex-1 rounded-full border border-[var(--color-line)] bg-white px-4 text-sm text-[var(--color-text)] outline-none placeholder:text-[var(--color-muted)]"
          />
          <Button type="submit" className="shrink-0">
            Search
          </Button>
        </form>
      </div>

      <div className="mt-6 max-w-4xl space-y-3 text-sm leading-7 text-[var(--color-muted)]">
        <p>
          This directory is maintained to help with employment verification when the business owner
          or team may not be able to respond to every email request individually.
        </p>
        <p>
          Former employees, current employees, employers, recruiters, agencies, and document
          reviewers can refer to this page to confirm employment details, dates, and role history
          published by Initial Infotech.
        </p>
        <p>
          This page is designed to support professional and official verification needs by giving
          reviewers a clear reference point for employment records published by Initial Infotech.
        </p>
      </div>

      <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {filtered.map((employee) => (
          <div key={employee.id} className="section-card rounded-[1.8rem] p-5">
            <div className="flex items-start gap-4">
              <Image
                src={employee.photoUrl || "https://placehold.co/160x160/0d1b31/e8f0ff?text=II"}
                alt={employee.name}
                width={80}
                height={80}
                className="h-20 w-20 rounded-2xl object-cover"
              />
              <div className="min-w-0">
                <p className="font-mono text-xl font-semibold text-[var(--color-text)]">{employee.name}</p>
                <p className="mt-1 text-sm text-[var(--color-muted)]">{employee.personalEmail}</p>
                <Badge className="mt-3">
                  {employee.isActive ? "Currently Working" : "Former Employee"}
                </Badge>
              </div>
            </div>
            <div className="mt-5 grid gap-2 text-sm text-[var(--color-muted)]">
              <p>Date of Birth: {format(employee.dob, "dd MMM yyyy")}</p>
              <p>Start Date: {format(employee.startDate, "dd MMM yyyy")}</p>
              <p>
                End Date: {employee.endDate ? format(employee.endDate, "dd MMM yyyy") : "Active"}
              </p>
            </div>
            <Link href={`/registry/${employee.slug}`} className="mt-5 inline-flex">
              <Button variant="secondary">Open profile</Button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
