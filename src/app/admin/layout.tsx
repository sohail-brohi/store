export const dynamic = "force-dynamic";

import Link from "next/link";
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Users,
  FileText,
  MessageSquare,
  Star,
  Tag,
  Briefcase,
  HelpCircle,
  Database,
} from "lucide-react";

const adminNav = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/products", label: "Products", icon: Package },
  { href: "/admin/orders", label: "Orders", icon: ShoppingCart },
  { href: "/admin/reviews", label: "Reviews", icon: Star },
  { href: "/admin/messages", label: "Messages", icon: MessageSquare },
  { href: "/admin/blog", label: "Blog", icon: FileText },
  { href: "/admin/discounts", label: "Discounts", icon: Tag },
  { href: "/admin/jobs", label: "Jobs", icon: Briefcase },
  { href: "/admin/faq", label: "FAQ", icon: HelpCircle },
  { href: "/admin/users", label: "Users", icon: Users },
  { href: "/admin/seed", label: "Seed Data", icon: Database },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen">
      <aside className="hidden w-64 shrink-0 flex-col border-r border-border bg-card lg:flex">
        <div className="flex h-16 items-center gap-2 border-b border-border px-6">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gold text-sm font-black text-black">
            L
          </span>
          <span className="text-sm font-bold tracking-widest">ADMIN</span>
        </div>
        <nav className="flex-1 space-y-1 p-4">
          {adminNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-3 rounded-sm px-3 py-2.5 text-sm text-muted transition-colors hover:bg-gold/10 hover:text-gold"
            >
              <item.icon size={18} />
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="border-t border-border p-4">
          <Link
            href="/"
            className="block rounded-sm border border-border px-3 py-2 text-center text-xs text-muted hover:text-gold"
          >
            ← Back to Store
          </Link>
        </div>
      </aside>
      <main className="flex-1 overflow-auto">{children}</main>
    </div>
  );
}
