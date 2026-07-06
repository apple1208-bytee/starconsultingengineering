import { cn } from "@/lib/utils";

export function Section({
  children,
  className,
  dark = false,
  id,
}: {
  children: React.ReactNode;
  className?: string;
  dark?: boolean;
  id?: string;
}) {
  return (
    <section
      id={id}
      className={cn("py-20 px-6 md:py-24", dark ? "bg-navy-900 text-white" : "", className)}
    >
      <div className="mx-auto max-w-[1280px]">{children}</div>
    </section>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  light = false,
  center = false,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  light?: boolean;
  center?: boolean;
}) {
  return (
    <div className={cn("max-w-2xl", center && "mx-auto text-center")}>
      {eyebrow && (
        <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-amber-500">
          {eyebrow}
        </p>
      )}
      <h2 className={cn("text-4xl font-bold leading-tight", light ? "text-white" : "text-navy-900")}>
        {title}
      </h2>
      {subtitle && (
        <p className={cn("mt-4 text-lg", light ? "text-steel-300" : "text-steel-600")}>{subtitle}</p>
      )}
    </div>
  );
}
