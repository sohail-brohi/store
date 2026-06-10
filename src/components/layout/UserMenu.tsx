"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { User, LogOut, Package, ChevronDown } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { cn } from "@/lib/utils";

export function UserMenu() {
  const { user, loading, logout } = useAuth();
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  if (loading) {
    return (
      <div className="h-9 w-9 animate-pulse rounded-full bg-border" aria-hidden />
    );
  }

  if (!user) {
    return (
      <Link
        href="/auth"
        className="p-2.5 text-muted transition-colors hover:text-gold"
        aria-label="Sign in"
      >
        <User size={19} />
      </Link>
    );
  }

  const handleLogout = async () => {
    setOpen(false);
    await logout();
    router.push("/");
  };

  const initials =
    user.displayName?.charAt(0)?.toUpperCase() ||
    user.email?.charAt(0)?.toUpperCase() ||
    "U";

  return (
    <div className="relative" ref={menuRef}>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1.5 rounded-sm p-1.5 text-muted transition-colors hover:text-gold"
        aria-label="Account menu"
        aria-expanded={open}
      >
        <span className="flex h-7 w-7 items-center justify-center rounded-full bg-gold text-xs font-bold text-black">
          {initials}
        </span>
        <ChevronDown size={14} className={cn("transition-transform", open && "rotate-180")} />
      </button>

      {open && (
        <div className="absolute right-0 top-full z-50 mt-2 w-52 rounded-sm border border-border bg-card py-1 shadow-lg">
          <div className="border-b border-border px-4 py-3">
            <p className="truncate text-sm font-medium">
              {user.displayName || "My Account"}
            </p>
            <p className="truncate text-xs text-muted">{user.email}</p>
          </div>
          <Link
            href="/account"
            className="flex items-center gap-2 px-4 py-2.5 text-sm hover:bg-gold/10 hover:text-gold"
            onClick={() => setOpen(false)}
          >
            <User size={16} />
            My Account
          </Link>
          <Link
            href="/orders"
            className="flex items-center gap-2 px-4 py-2.5 text-sm hover:bg-gold/10 hover:text-gold"
            onClick={() => setOpen(false)}
          >
            <Package size={16} />
            My Orders
          </Link>
          <button
            type="button"
            onClick={handleLogout}
            className="flex w-full items-center gap-2 px-4 py-2.5 text-sm text-red-400 hover:bg-red-500/10"
          >
            <LogOut size={16} />
            Sign Out
          </button>
        </div>
      )}
    </div>
  );
}
