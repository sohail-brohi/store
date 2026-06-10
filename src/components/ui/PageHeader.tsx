import { cn } from "@/lib/utils";

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  className?: string;
}

export function PageHeader({ title, subtitle, className }: PageHeaderProps) {
  return (
    <div className={cn("mb-12 text-center", className)}>
      <h1 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">
        {title}
      </h1>
      {subtitle && <p className="mt-3 text-muted">{subtitle}</p>}
      <div className="mx-auto mt-4 h-0.5 w-16 bg-gold" />
    </div>
  );
}
