import { PageHeader } from "@/components/ui/PageHeader";
import { cn } from "@/lib/utils";

interface StaticPageProps {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  className?: string;
}

export function StaticPage({ title, subtitle, children, className }: StaticPageProps) {
  return (
    <div className={cn("mx-auto max-w-4xl px-4 py-12", className)}>
      <PageHeader title={title} subtitle={subtitle} />
      <div className="prose prose-invert light:prose-neutral max-w-none space-y-4 text-foreground/80">
        {children}
      </div>
    </div>
  );
}
