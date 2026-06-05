import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { Container } from "./container";

type SectionProps = {
  id?: string;
  children: ReactNode;
  size?: "sm" | "md" | "lg";
  className?: string;
  containerClassName?: string;
};

export function Section({
  id,
  children,
  size = "lg",
  className,
  containerClassName,
}: SectionProps) {
  return (
    <section id={id} className={cn("py-20 px-6 lg:px-8", className)}>
      <Container size={size} className={containerClassName}>
        {children}
      </Container>
    </section>
  );
}
