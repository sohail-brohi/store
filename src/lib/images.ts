/** Reliable fashion placeholder images (Unsplash — verified working) */
export const IMAGES = {
  hero: "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1920&q=80",
  newsletter: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1920&q=80",
  about: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1200&q=80",
  men: "https://images.unsplash.com/photo-1551028719-221c6c371a8b?w=600&q=80",
  women: "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=600&q=80",
  accessories: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=600&q=80",
  shoes: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&q=80",
  kids: "https://images.unsplash.com/photo-1503919545889-aef636e10ad4?w=600&q=80",
  blog1: "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1200&q=80",
  blog2: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1200&q=80",
  blog3: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=1200&q=80",
  product: {
    coat: "https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=800&q=80",
    gown: "https://images.unsplash.com/photo-1566174053879-31528523f8ae?w=800&q=80",
    bag: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=800&q=80",
    shoes: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=80",
    kids: "https://images.unsplash.com/photo-1503919545889-aef636e10ad4?w=800&q=80",
    sweater: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=800&q=80",
    blazer: "https://images.unsplash.com/photo-1591369822096-ffd140ec948f?w=800&q=80",
    necklace: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=800&q=80",
    boots: "https://images.unsplash.com/photo-1608256246200-53e635b5b65f?w=800&q=80",
    denim: "https://images.unsplash.com/photo-1503919545889-aef636e10ad4?w=800&q=80",
    shirt: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=800&q=80",
    skirt: "https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?w=800&q=80",
  },
} as const;

export function productImage(key: keyof typeof IMAGES.product, alt?: string) {
  return IMAGES.product[key] || IMAGES.product.coat;
}
