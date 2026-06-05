import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/cn";
import { CardShell } from "./card-shell";

type FeatureCardProps = {
  icon: LucideIcon;
  title: string;
  description: string;
  highlight?: boolean;
  highlightLabel?: string;
  size?: "medium" | "large";
  color: string;
  bgColor: string;
};

export function FeatureCard({
  icon: Icon,
  title,
  description,
  highlight = false,
  highlightLabel,
  size = "medium",
  color,
  bgColor,
}: FeatureCardProps) {
  return (
    <CardShell
      highlighted={highlight}
      className={cn(
        "p-6 hover:shadow-lg transition-all group",
        size === "large" ? "lg:col-span-2" : "",
      )}
    >
      <div className="flex items-start gap-4">
        <div
          className={cn(
            "p-3 rounded-xl flex-shrink-0 group-hover:scale-110 transition-transform relative",
            bgColor,
          )}
        >
          <div
            className={cn(
              "absolute inset-0 bg-gradient-to-br opacity-70 rounded-xl",
              color,
            )}
          />
          <Icon className="h-6 w-6 relative z-10 text-white" />
        </div>
        <div className="space-y-2">
          <h3 className="font-semibold">{title}</h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {description}
          </p>
          {highlight && highlightLabel ? (
            <div
              className={cn(
                "inline-flex items-center gap-1 px-2 py-1 rounded-md text-xs font-medium mt-2",
                bgColor,
              )}
            >
              <span className={cn("bg-gradient-to-r bg-clip-text text-transparent", color)}>
                {highlightLabel}
              </span>
            </div>
          ) : null}
        </div>
      </div>
    </CardShell>
  );
}
