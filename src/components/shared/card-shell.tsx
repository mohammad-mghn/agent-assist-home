import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type CardShellProps = {
  children: ReactNode;
  className?: string;
  highlighted?: boolean;
  id?: string;
};

export function CardShell({
  children,
  className,
  highlighted = false,
  id,
}: CardShellProps) {
  return (
    <div
      id={id}
      className={cn(
        "rounded-2xl border bg-card",
        highlighted ? "border-primary/20" : "border-border",
        className,
      )}
    >
      {children}
    </div>
  );
}
