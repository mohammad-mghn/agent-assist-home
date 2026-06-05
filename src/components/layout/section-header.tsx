import { cn } from "@/lib/cn";

type SectionHeaderProps = {
  title: string;
  subtitle?: string;
  className?: string;
  subtitleClassName?: string;
};

export function SectionHeader({
  title,
  subtitle,
  className,
  subtitleClassName,
}: SectionHeaderProps) {
  return (
    <div className={cn("text-center space-y-4 mb-12", className)}>
      <h2 className="text-4xl font-bold">{title}</h2>
      {subtitle ? (
        <p
          className={cn(
            "text-lg text-muted-foreground max-w-2xl mx-auto",
            subtitleClassName,
          )}
        >
          {subtitle}
        </p>
      ) : null}
    </div>
  );
}
