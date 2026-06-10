"use client";

import Link from "next/link";
import { useState } from "react";
import {
  Search,
  ShoppingBag,
  Heart,
  Menu,
  X,
  Sun,
  Moon,
} from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { useWishlist } from "@/contexts/WishlistContext";
import { useTheme } from "@/contexts/ThemeContext";
import { UserMenu } from "@/components/layout/UserMenu";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/products", label: "Shop" },
  { href: "/new-arrivals", label: "New Arrivals" },
  { href: "/sale", label: "Sale" },
  { href: "/blog", label: "Blog" },
  { href: "/about", label: "About" },
];

const categories = [
  { href: "/products?category=men", label: "Men" },
  { href: "/products?category=women", label: "Women" },
  { href: "/products?category=accessories", label: "Accessories" },
  { href: "/products?category=shoes", label: "Shoes" },
  { href: "/products?category=kids", label: "Kids" },
];

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { itemCount } = useCart();
  const { items: wishlistItems } = useWishlist();
  const { theme, toggleTheme } = useTheme();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/search?q=${encodeURIComponent(searchQuery)}`;
    }
  };

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur-md">
      <div className="bg-gold/10 border-b border-gold/20">
        <div className="mx-auto max-w-7xl px-4 py-2 text-center text-[11px] font-medium tracking-wide text-gold">
          Free shipping on orders over PKR 5,000 &nbsp;·&nbsp; Use code{" "}
          <span className="font-bold">LUXEE10</span> for 10% off
        </div>
      </div>

      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
        <button
          className="lg:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>

        <Link href="/" className="flex items-center gap-2.5">
          <span className="luxee-loader flex h-10 w-10 items-center justify-center rounded-full bg-gold text-lg font-black text-black">
            L
          </span>
          <div className="hidden sm:block">
            <span className="text-base font-bold tracking-[0.25em]">LUXEE</span>
            <span className="block text-[9px] tracking-[0.35em] text-gold">STORE</span>
          </div>
        </Link>

        <nav className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-[13px] font-medium uppercase tracking-wider text-muted transition-colors hover:text-gold"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-1">
          <button
            onClick={() => setSearchOpen(!searchOpen)}
            className="p-2.5 text-muted transition-colors hover:text-gold"
            aria-label="Search"
          >
            <Search size={19} />
          </button>
          <button
            onClick={toggleTheme}
            className="p-2.5 text-muted transition-colors hover:text-gold"
            aria-label="Toggle theme"
          >
            {theme === "dark" ? <Sun size={19} /> : <Moon size={19} />}
          </button>
          <Link href="/wishlist" className="relative p-2.5 text-muted transition-colors hover:text-gold">
            <Heart size={19} />
            {wishlistItems.length > 0 && (
              <span className="absolute right-1 top-1 flex h-4 w-4 items-center justify-center rounded-full bg-gold text-[9px] font-bold text-black">
                {wishlistItems.length}
              </span>
            )}
          </Link>
          <Link href="/cart" className="relative p-2.5 text-muted transition-colors hover:text-gold">
            <ShoppingBag size={19} />
            {itemCount > 0 && (
              <span className="absolute right-1 top-1 flex h-4 w-4 items-center justify-center rounded-full bg-gold text-[9px] font-bold text-black">
                {itemCount}
              </span>
            )}
          </Link>
          <UserMenu />
        </div>
      </div>

      {searchOpen && (
        <div className="border-t border-border px-4 py-3">
          <form onSubmit={handleSearch} className="mx-auto max-w-2xl">
            <div className="relative">
              <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search products..."
                className="w-full rounded-sm border border-border bg-card py-3 pl-11 pr-4 focus:border-gold focus:outline-none"
                autoFocus
              />
            </div>
          </form>
        </div>
      )}

      <div className="hidden lg:block border-t border-border">
        <div className="mx-auto flex max-w-7xl items-center justify-center gap-10 px-4 py-2.5">
          {categories.map((cat) => (
            <Link
              key={cat.href}
              href={cat.href}
              className="text-[11px] font-medium uppercase tracking-[0.2em] text-muted transition-colors hover:text-gold"
            >
              {cat.label}
            </Link>
          ))}
        </div>
      </div>

      {mobileOpen && (
        <div className="lg:hidden border-t border-border bg-background">
          <nav className="flex flex-col px-4 py-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="border-b border-border py-3.5 text-sm font-medium uppercase tracking-wider"
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <div className="mt-4 flex flex-wrap gap-2">
              {categories.map((cat) => (
                <Link
                  key={cat.href}
                  href={cat.href}
                  className={cn(
                    "rounded-sm border border-border px-3 py-1.5 text-[11px] uppercase tracking-wider text-muted"
                  )}
                  onClick={() => setMobileOpen(false)}
                >
                  {cat.label}
                </Link>
              ))}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
