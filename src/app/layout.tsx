import type { Metadata } from "next";
import { Inter, Cormorant_Garamond } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/providers/Providers";
import { FirebaseAnalytics } from "@/components/analytics/FirebaseAnalytics";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-cormorant",
});

export const metadata: Metadata = {
  title: {
    default: "Luxee Store - Premium Fashion | Shop Luxury Clothing & Accessories",
    template: "%s | Luxee Store",
  },
  description:
    "Discover timeless pieces that define modern elegance. Shop premium fashion clothing, designer accessories, and new arrivals at Luxee Store. Free shipping on orders over PKR 5000.",
  keywords: [
    "luxury fashion",
    "premium clothing",
    "designer accessories",
    "men's fashion",
    "women's fashion",
    "kids fashion",
    "shoes",
    "new arrivals",
    "sale",
    "online fashion store Pakistan",
  ],
  authors: [{ name: "Luxee Store Premium Fashion" }],
  openGraph: {
    type: "website",
    siteName: "Luxee Store Premium Fashion",
    title: "Luxee Store - Premium Fashion Store | Shop Luxury Clothing",
    description:
      "Discover timeless pieces that define modern elegance. Shop premium fashion clothing and accessories at Luxee Store.",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    site: "@luxeesfashion",
    creator: "@luxeesfashion",
  },
};

export const viewport = {
  themeColor: "#c8941e",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){var s=localStorage.getItem("luxee-theme");var d=window.matchMedia("(prefers-color-scheme: dark)").matches;if(s==="light"||(!s&&!d))document.documentElement.classList.add("light");})();`,
          }}
        />
      </head>
      <body className={`${inter.variable} ${cormorant.variable} min-h-screen antialiased`}>
        <Providers>
          {children}
          <FirebaseAnalytics />
        </Providers>
      </body>
    </html>
  );
}
