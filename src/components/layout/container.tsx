import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type ContainerProps = {
  children: ReactNode;
  size?: "sm" | "md" | "lg";
  className?: string;
};

const sizeClasses = {
  sm: "max-w-4xl",
  md: "max-w-5xl",
  lg: "max-w-7xl",
} as const;

export function Container({
  children,
  size = "lg",
  className,
}: ContainerProps) {
  return (
    <div className={cn("mx-auto", sizeClasses[size], className)}>{children}</div>
  );
}
