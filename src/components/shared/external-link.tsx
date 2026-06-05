import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/cn";

type ExternalLinkProps = ComponentProps<"a"> & {
  children: ReactNode;
};

export function ExternalLink({
  children,
  className,
  target = "_blank",
  rel = "noopener noreferrer",
  ...props
}: ExternalLinkProps) {
  return (
    <a
      target={target}
      rel={rel}
      className={cn("transition-colors", className)}
      {...props}
    >
      {children}
    </a>
  );
}
