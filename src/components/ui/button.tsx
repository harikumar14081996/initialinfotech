import * as React from "react";

import { cn } from "@/lib/utils";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "ghost" | "danger";
};

export function Button({
  className,
  variant = "primary",
  type = "button",
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={cn(
        "inline-flex items-center justify-center rounded-full px-5 py-3 text-sm font-semibold transition focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] focus:ring-offset-2 focus:ring-offset-white disabled:cursor-not-allowed disabled:opacity-60",
        variant === "primary" &&
          "bg-[var(--color-accent)] text-white shadow-[0_14px_30px_rgba(19,155,229,0.18)] hover:bg-[#0f8dd0]",
        variant === "secondary" &&
          "border border-[var(--color-line)] bg-white text-[var(--color-accent)] hover:bg-[var(--color-paper)]",
        variant === "ghost" && "text-[var(--color-muted)] hover:text-[var(--color-accent)]",
        variant === "danger" &&
          "border border-red-300 bg-red-50 text-red-700 hover:bg-red-100",
        className,
      )}
      {...props}
    />
  );
}
