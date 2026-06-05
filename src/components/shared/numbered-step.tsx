import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/cn";

type NumberedStepProps = {
  number: number;
  title?: string;
  description: string;
  icon?: LucideIcon;
  className?: string;
};

export function NumberedStep({
  number,
  title,
  description,
  icon: Icon,
  className,
}: NumberedStepProps) {
  return (
    <div className={cn("space-y-4", className)}>
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-lg">
          {number}
        </div>
        {Icon ? (
          <div className="p-2 rounded-lg bg-primary/10">
            <Icon className="h-5 w-5 text-primary" />
          </div>
        ) : null}
      </div>
      <div className="space-y-2">
        {title ? <h3 className="font-semibold text-lg">{title}</h3> : null}
        <p className="text-sm text-muted-foreground leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  );
}

export function NumberedStepRow({
  number,
  description,
}: {
  number: number;
  description: string;
}) {
  return (
    <div className="flex gap-4 p-4 rounded-lg border border-border bg-card hover:bg-muted/50 transition-colors">
      <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-semibold flex-shrink-0">
        {number}
      </div>
      <p className="text-sm leading-relaxed pt-1">{description}</p>
    </div>
  );
}
