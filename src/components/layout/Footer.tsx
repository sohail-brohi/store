import Link from "next/link";
import { Share2, Mail, Phone, MapPin } from "lucide-react";

const shopLinks = [
  { href: "/products", label: "All Products" },
  { href: "/new-arrivals", label: "New Arrivals" },
  { href: "/sale", label: "Sale" },
  { href: "/products?category=men", label: "Men" },
  { href: "/products?category=women", label: "Women" },
  { href: "/products?category=accessories", label: "Accessories" },
];

const supportLinks = [
  { href: "/faq", label: "FAQ" },
  { href: "/shipping", label: "Shipping" },
  { href: "/returns", label: "Returns" },
  { href: "/size-guide", label: "Size Guide" },
  { href: "/track-order", label: "Track Order" },
  { href: "/contact", label: "Contact Us" },
];

const companyLinks = [
  { href: "/about", label: "About Us" },
  { href: "/blog", label: "Blog" },
  { href: "/careers", label: "Careers" },
  { href: "/privacy", label: "Privacy Policy" },
  { href: "/terms", label: "Terms of Service" },
];

export function Footer() {
  return (
    <footer className="border-t border-border bg-surface">
      <div className="mx-auto max-w-7xl px-4 py-16">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="mb-6 flex items-center gap-2">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-gold text-lg font-black text-black">
                L
              </span>
              <div>
                <span className="text-lg font-bold tracking-widest text-foreground">
                  LUXEE
                </span>
                <span className="block text-[10px] tracking-[0.3em] text-gold">
                  STORE
                </span>
              </div>
            </div>
            <p className="mb-6 text-sm leading-relaxed text-muted">
              Discover timeless pieces that define modern elegance. Premium
              fashion clothing and accessories for the discerning shopper.
            </p>
            <div className="flex gap-4">
              {[
                { href: "https://facebook.com/luxeesfashion", label: "Facebook" },
                { href: "https://instagram.com/luxeesfashion", label: "Instagram" },
                { href: "https://twitter.com/luxeesfashion", label: "Twitter" },
              ].map((social) => (
                <a
                  key={social.href}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-border text-muted transition-colors hover:border-gold hover:text-gold"
                >
                  <Share2 size={16} />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-widest text-gold">
              Shop
            </h3>
            <ul className="space-y-3">
              {shopLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted transition-colors hover:text-gold"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-widest text-gold">
              Support
            </h3>
            <ul className="space-y-3">
              {supportLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted transition-colors hover:text-gold"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-widest text-gold">
              Company
            </h3>
            <ul className="mb-6 space-y-3">
              {companyLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted transition-colors hover:text-gold"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="space-y-3 text-sm text-muted">
              <div className="flex items-start gap-2">
                <MapPin size={16} className="mt-0.5 shrink-0 text-gold" />
                <span>123 Fashion Avenue, Lahore, Punjab 54000, Pakistan</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone size={16} className="shrink-0 text-gold" />
                <span>+92-300-LUXEES</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail size={16} className="shrink-0 text-gold" />
                <span>contact@luxees.com</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border pt-8 sm:flex-row">
          <p className="text-xs text-muted">
            &copy; {new Date().getFullYear()} Luxee Store Premium Fashion. All
            rights reserved.
          </p>
          <div className="flex gap-4 text-xs text-muted">
            <Link href="/privacy" className="hover:text-gold transition-colors">
              Privacy
            </Link>
            <Link href="/terms" className="hover:text-gold transition-colors">
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
