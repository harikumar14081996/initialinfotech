import { ShieldCheck } from "lucide-react";

import { LoginForm } from "@/components/login-form";
import { Badge } from "@/components/ui/badge";

export const metadata = {
  title: "Admin Login",
};

export default async function AdminLoginPage({
  searchParams,
}: {
  searchParams: Promise<{ next?: string }>;
}) {
  const { next } = await searchParams;

  return (
    <div className="page-shell py-16">
      <div className="mx-auto grid max-w-4xl gap-6 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="section-card rounded-[2rem] p-8">
          <Badge>Admin access</Badge>
          <h1 className="mt-5 font-mono text-4xl font-semibold text-[var(--color-text)]">
            Manage services, company data, and employee records.
          </h1>
          <p className="mt-4 text-sm leading-7 text-[var(--color-muted)]">
            Use the configured admin or editor credentials. Admins can manage all content. Editors
            can manage employee records.
          </p>
          <div className="mt-8 flex items-center gap-3 rounded-[1.5rem] border border-[var(--color-line)] bg-white p-4 text-sm text-[var(--color-muted)]">
            <ShieldCheck className="h-5 w-5 text-[var(--color-accent)]" />
            Replace the default demo credentials in your local environment before production use.
          </div>
        </div>
        <LoginForm next={next || "/admin"} />
      </div>
    </div>
  );
}
