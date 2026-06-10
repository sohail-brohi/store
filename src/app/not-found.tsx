import Link from "next/link";
import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center px-4 text-center">
      <span className="luxee-loader mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-gold text-3xl font-black text-black">
        L
      </span>
      <h1 className="font-display mb-2 text-4xl font-semibold">Page Not Found</h1>
      <p className="mb-8 max-w-md text-muted">
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
      </p>
      <div className="flex gap-4">
        <Link href="/">
          <Button size="lg">Go Home</Button>
        </Link>
        <Link href="/products">
          <Button variant="outline" size="lg">
            Shop Now
          </Button>
        </Link>
      </div>
    </div>
  );
}
