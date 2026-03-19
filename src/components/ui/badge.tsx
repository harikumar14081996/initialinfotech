import type React from "react";

import { cn } from "@/lib/utils";

export function Badge({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border border-[var(--color-line)] bg-[var(--color-paper)] px-3 py-1 text-xs font-medium uppercase tracking-[0.18em] text-[var(--color-accent)] shadow-[0_6px_18px_rgba(19,155,229,0.05)]",
        className,
      )}
    >
      {children}
    </span>
  );
}
