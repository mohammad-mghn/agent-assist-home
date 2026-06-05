import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/cn";

type PrimaryButtonProps = ComponentProps<"a"> & {
  children: ReactNode;
};

export function PrimaryButton({
  children,
  className,
  ...props
}: PrimaryButtonProps) {
  return (
    <a
      className={cn(
        "inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-primary text-primary-foreground hover:opacity-90 transition-opacity font-medium",
        className,
      )}
      {...props}
    >
      {children}
    </a>
  );
}
