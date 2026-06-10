import { cn } from "@/lib/utils";

export function LoadingSpinner({ className, fullScreen }: { className?: string; fullScreen?: boolean }) {
  return (
    <div
      className={cn(
        "flex items-center justify-center",
        fullScreen ? "min-h-[80vh]" : "py-20",
        className
      )}
    >
      <div className="flex flex-col items-center gap-4">
        <span className="luxee-loader flex h-16 w-16 items-center justify-center rounded-full bg-gold text-2xl font-black text-black shadow-lg shadow-gold/20">
          L
        </span>
        <p className="text-sm text-muted">Loading your experience...</p>
      </div>
    </div>
  );
}
