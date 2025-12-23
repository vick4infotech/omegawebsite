import { cn } from "@/lib/utils";

export function Section({
  title,
  eyebrow,
  children,
  className,
}: {
  title: string;
  eyebrow?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section className={cn("container py-12", className)}>
      <div className="mb-6 max-w-2xl">
        {eyebrow ? (
          <div className="mb-2 text-xs font-semibold uppercase tracking-wider text-white/60">
            {eyebrow}
          </div>
        ) : null}
        <h2 className="text-2xl font-semibold md:text-3xl">{title}</h2>
      </div>
      {children}
    </section>
  );
}
