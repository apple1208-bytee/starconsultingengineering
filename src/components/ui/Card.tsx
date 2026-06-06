import { cn } from "@/lib/utils";

export function Card({
  className,
  children,
  hover = true,
}: {
  className?: string;
  children: React.ReactNode;
  hover?: boolean;
}) {
  return (
    <div
      className={cn(
        "rounded-lg border border-steel-200 bg-white p-6 shadow-sm",
        hover && "transition-all duration-200 hover:-translate-y-1 hover:shadow-[var(--shadow-card-hover)]",
        className
      )}
    >
      {children}
    </div>
  );
}
