import Image from "next/image";
import { StaticPage } from "@/components/content/StaticPage";
import { IMAGES } from "@/lib/images";

export const metadata = {
  title: "About Us",
  description: "Learn about Luxee Store - Pakistan's premier destination for luxury fashion.",
};

export default function AboutPage() {
  return (
    <StaticPage title="About Luxee Store" subtitle="Redefining luxury fashion in Pakistan">
      <div className="relative mb-8 aspect-[21/9] overflow-hidden rounded-sm">
        <Image src={IMAGES.about} alt="About Luxee Store" fill className="object-cover" sizes="100vw" />
      </div>

      <h2 className="text-xl font-semibold">Our Story</h2>
      <p>
        Founded in Lahore, Luxee Store was born from a passion for timeless elegance and modern
        sophistication. We believe that luxury fashion should be accessible, authentic, and inspiring.
      </p>

      <h2 className="text-xl font-semibold">Our Mission</h2>
      <p>
        To bring the world&apos;s finest fashion to discerning shoppers in Pakistan and beyond. We
        partner with renowned designers and ethical manufacturers to offer premium clothing,
        accessories, and footwear.
      </p>

      <h2 className="text-xl font-semibold">Why Choose Us</h2>
      <ul className="list-disc space-y-2 pl-6">
        <li>100% authentic premium products</li>
        <li>Curated collections updated weekly</li>
        <li>Free shipping on orders over PKR 5,000</li>
        <li>14-day hassle-free returns</li>
        <li>Dedicated 24/7 customer support</li>
        <li>Secure payment with COD available</li>
      </ul>

      <h2 className="text-xl font-semibold">Visit Us</h2>
      <p>
        123 Fashion Avenue, Lahore, Punjab 54000, Pakistan
        <br />
        Phone: +92-300-LUXEES
        <br />
        Email: contact@luxees.com
      </p>
    </StaticPage>
  );
}
