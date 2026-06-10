import { IMAGES } from "./images";

export const seedProducts = [
  {
    name: "Classic Wool Overcoat",
    slug: "classic-wool-overcoat",
    description:
      "Timeless wool overcoat crafted from premium Italian fabric. Features a tailored silhouette, notched lapels, and interior silk lining for refined warmth.",
    price: 24999,
    compareAtPrice: 32999,
    images: [
      "https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=800&q=80",
      "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=800&q=80",
    ],
    category: "men",
    sizes: ["S", "M", "L", "XL"],
    colors: ["Charcoal", "Navy"],
    stock: 24,
    isNewArrival: true,
    isBestseller: true,
    isOnSale: true,
    rating: 4.8,
    reviewCount: 42,
    tags: ["winter", "outerwear", "premium"],
    featured: true,
  },
  {
    name: "Silk Evening Gown",
    slug: "silk-evening-gown",
    description:
      "Elegant floor-length gown in pure silk charmeuse. Draped bodice with adjustable straps and a flowing skirt that moves beautifully.",
    price: 35999,
    images: [
      "https://images.unsplash.com/photo-1566174053879-31528523f8ae?w=800&q=80",
      "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=800&q=80",
    ],
    category: "women",
    sizes: ["XS", "S", "M", "L"],
    colors: ["Emerald", "Black", "Burgundy"],
    stock: 15,
    isNewArrival: true,
    isBestseller: true,
    isOnSale: false,
    rating: 4.9,
    reviewCount: 67,
    tags: ["evening", "formal", "silk"],
    featured: true,
  },
  {
    name: "Leather Crossbody Bag",
    slug: "leather-crossbody-bag",
    description:
      "Handcrafted full-grain leather crossbody with gold-tone hardware. Compact yet spacious with multiple interior compartments.",
    price: 12999,
    compareAtPrice: 15999,
    images: [
      "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=800&q=80",
      "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=800&q=80",
    ],
    category: "accessories",
    sizes: ["One Size"],
    colors: ["Tan", "Black", "Cognac"],
    stock: 40,
    isNewArrival: false,
    isBestseller: true,
    isOnSale: true,
    rating: 4.7,
    reviewCount: 89,
    tags: ["bags", "leather", "everyday"],
    featured: true,
  },
  {
    name: "Italian Leather Oxford Shoes",
    slug: "italian-leather-oxford-shoes",
    description:
      "Hand-stitched oxford shoes in polished calfskin leather. Goodyear welted construction for durability and timeless style.",
    price: 18999,
    images: [
      IMAGES.product.shoes,
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=80",
    ],
    category: "shoes",
    sizes: ["40", "41", "42", "43", "44", "45"],
    colors: ["Black", "Brown"],
    stock: 30,
    isNewArrival: true,
    isBestseller: false,
    isOnSale: false,
    rating: 4.6,
    reviewCount: 34,
    tags: ["formal", "leather", "oxford"],
    featured: true,
  },
  {
    name: "Kids Cotton Hoodie Set",
    slug: "kids-cotton-hoodie-set",
    description:
      "Soft organic cotton hoodie and jogger set for kids. Gentle on skin with playful embroidered details and ribbed cuffs.",
    price: 4999,
    compareAtPrice: 6499,
    images: [
      "https://images.unsplash.com/photo-1503919545889-aef636e10ad4?w=800&q=80",
      IMAGES.product.kids,
    ],
    category: "kids",
    sizes: ["2-3Y", "4-5Y", "6-7Y", "8-9Y"],
    colors: ["Navy", "Grey", "Pink"],
    stock: 50,
    isNewArrival: true,
    isBestseller: true,
    isOnSale: true,
    rating: 4.5,
    reviewCount: 28,
    tags: ["kids", "casual", "cotton"],
    featured: true,
  },
  {
    name: "Cashmere Crew Neck Sweater",
    slug: "cashmere-crew-neck-sweater",
    description:
      "Luxuriously soft 100% cashmere sweater with a relaxed fit. Perfect layering piece for transitional seasons.",
    price: 16999,
    images: [
      "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=800&q=80",
      "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=800&q=80",
    ],
    category: "men",
    sizes: ["S", "M", "L", "XL"],
    colors: ["Camel", "Grey", "Navy"],
    stock: 35,
    isNewArrival: false,
    isBestseller: true,
    isOnSale: false,
    rating: 4.8,
    reviewCount: 56,
    tags: ["cashmere", "knitwear", "winter"],
    featured: false,
  },
  {
    name: "Tailored Blazer",
    slug: "tailored-blazer-women",
    description:
      "Structured single-breasted blazer with peak lapels. Tailored from premium wool blend for a sharp, feminine silhouette.",
    price: 21999,
    compareAtPrice: 27999,
    images: [
      "https://images.unsplash.com/photo-1591369822096-ffd140ec948f?w=800&q=80",
      IMAGES.product.blazer,
    ],
    category: "women",
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["Black", "Beige", "White"],
    stock: 20,
    isNewArrival: false,
    isBestseller: false,
    isOnSale: true,
    rating: 4.7,
    reviewCount: 41,
    tags: ["blazer", "formal", "office"],
    featured: false,
  },
  {
    name: "Gold Chain Necklace",
    slug: "gold-chain-necklace",
    description:
      "18K gold-plated sterling silver chain necklace. Minimalist design that complements any outfit, day or night.",
    price: 7999,
    images: [
      "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=800&q=80",
      IMAGES.product.necklace,
    ],
    category: "accessories",
    sizes: ["One Size"],
    colors: ["Gold"],
    stock: 60,
    isNewArrival: true,
    isBestseller: false,
    isOnSale: false,
    rating: 4.4,
    reviewCount: 22,
    tags: ["jewelry", "necklace", "gold"],
    featured: false,
  },
  {
    name: "Suede Chelsea Boots",
    slug: "suede-chelsea-boots",
    description:
      "Classic Chelsea boots in premium suede with elastic side panels. Leather sole and cushioned insole for all-day comfort.",
    price: 15999,
    compareAtPrice: 19999,
    images: [
      "https://images.unsplash.com/photo-1608256246200-53e635b5b65f?w=800&q=80",
      IMAGES.product.boots,
    ],
    category: "shoes",
    sizes: ["40", "41", "42", "43", "44"],
    colors: ["Tan", "Black"],
    stock: 25,
    isNewArrival: false,
    isBestseller: true,
    isOnSale: true,
    rating: 4.6,
    reviewCount: 38,
    tags: ["boots", "suede", "casual"],
    featured: false,
  },
  {
    name: "Kids Denim Jacket",
    slug: "kids-denim-jacket",
    description:
      "Classic denim jacket for kids with soft washed finish. Button-front closure with chest pockets and adjustable waist tabs.",
    price: 3999,
    images: [
      IMAGES.product.kids,
    ],
    category: "kids",
    sizes: ["2-3Y", "4-5Y", "6-7Y", "8-9Y", "10-11Y"],
    colors: ["Light Wash", "Dark Wash"],
    stock: 45,
    isNewArrival: true,
    isBestseller: false,
    isOnSale: false,
    rating: 4.3,
    reviewCount: 15,
    tags: ["kids", "denim", "jacket"],
    featured: false,
  },
  {
    name: "Linen Summer Shirt",
    slug: "linen-summer-shirt",
    description:
      "Breathable pure linen shirt with a relaxed fit. Mother-of-pearl buttons and a curved hem for effortless summer style.",
    price: 8999,
    images: [
      "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=800&q=80",
    ],
    category: "men",
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: ["White", "Sky Blue", "Sand"],
    stock: 55,
    isNewArrival: true,
    isBestseller: false,
    isOnSale: false,
    rating: 4.5,
    reviewCount: 19,
    tags: ["summer", "linen", "casual"],
    featured: false,
  },
  {
    name: "Pleated Midi Skirt",
    slug: "pleated-midi-skirt",
    description:
      "Flowing pleated midi skirt in lightweight satin. Elastic waistband with hidden side zip for a flattering drape.",
    price: 10999,
    compareAtPrice: 13999,
    images: [
      "https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?w=800&q=80",
    ],
    category: "women",
    sizes: ["XS", "S", "M", "L"],
    colors: ["Champagne", "Black", "Rose"],
    stock: 30,
    isNewArrival: false,
    isBestseller: false,
    isOnSale: true,
    rating: 4.6,
    reviewCount: 31,
    tags: ["skirt", "pleated", "midi"],
    featured: false,
  },
];

export const seedBlogs = [
  {
    title: "The Art of Layering: Winter Style Guide",
    slug: "art-of-layering-winter-style-guide",
    excerpt:
      "Master the art of layering with our expert tips for staying warm while looking effortlessly chic this winter season.",
    content:
      "Winter fashion is all about balance — warmth without bulk, style without sacrifice. Start with a quality base layer in merino wool or silk, add a structured mid-layer like a cashmere sweater or tailored vest, and finish with a statement outer piece.\n\nThe key to successful layering is playing with textures and proportions. Mix chunky knits with sleek trousers, or pair a fitted turtleneck under an oversized coat. Don't forget accessories — a cashmere scarf and leather gloves can elevate any winter look.\n\nAt Luxee Store, we believe every layer should serve a purpose while contributing to your overall aesthetic. Invest in versatile pieces that work across multiple outfits, and you'll build a winter wardrobe that lasts for years.",
    image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1200&q=80",
    author: "Luxee Editorial",
    category: "Style Guide",
    readTime: 6,
  },
  {
    title: "Sustainable Luxury: Our Commitment to Ethical Fashion",
    slug: "sustainable-luxury-ethical-fashion",
    excerpt:
      "Discover how Luxee Store is redefining luxury fashion with sustainable practices and ethical sourcing.",
    content:
      "Luxury and sustainability are not mutually exclusive. At Luxee Store, we're committed to creating beautiful fashion that respects both people and planet.\n\nOur sustainability journey includes partnering with certified ethical manufacturers, using organic and recycled materials where possible, and implementing a circular fashion program for garment recycling.\n\nWe believe transparency is key — every product page includes information about materials and origin. When you shop with us, you're investing in quality pieces designed to last, reducing the environmental impact of fast fashion.",
    image: IMAGES.blog2,
    author: "Luxee Editorial",
    category: "Sustainability",
    readTime: 5,
  },
  {
    title: "5 Must-Have Accessories for Every Wardrobe",
    slug: "must-have-accessories-wardrobe",
    excerpt:
      "From statement bags to timeless jewelry, these five accessories will transform your everyday looks.",
    content:
      "Accessories are the finishing touch that can transform a simple outfit into a polished ensemble. Here are our top five must-haves:\n\n1. A quality leather crossbody bag — versatile enough for day to night\n2. Classic gold hoop earrings — timeless and flattering on everyone\n3. A silk scarf — wear it around your neck, in your hair, or on your bag\n4. A structured leather belt — defines your waist and adds sophistication\n5. Quality sunglasses — protect your eyes while making a style statement\n\nInvest in these staples and you'll always have the perfect finishing touch.",
    image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1200&q=80",
    author: "Luxee Editorial",
    category: "Accessories",
    readTime: 4,
  },
];

export const seedFAQs = [
  {
    question: "What is your shipping policy?",
    answer:
      "We offer free standard shipping on all orders over PKR 5,000. Standard delivery takes 3-5 business days within Pakistan. Express shipping (1-2 business days) is available for PKR 500.",
    category: "shipping",
    order: 1,
  },
  {
    question: "How can I track my order?",
    answer:
      "Once your order ships, you'll receive a confirmation email with a tracking number. You can also track your order from your account dashboard under 'My Orders'.",
    category: "shipping",
    order: 2,
  },
  {
    question: "What is your return policy?",
    answer:
      "We accept returns within 14 days of delivery for unworn items with original tags attached. Refunds are processed within 5-7 business days after we receive your return.",
    category: "returns",
    order: 3,
  },
  {
    question: "Do you offer cash on delivery?",
    answer:
      "Yes! Cash on delivery (COD) is available for all orders within Pakistan. A small COD fee of PKR 200 may apply for orders under PKR 3,000.",
    category: "payment",
    order: 4,
  },
  {
    question: "How do I find my size?",
    answer:
      "Each product page includes a detailed size guide. You can also visit our Size Guide page for comprehensive measurements. If you're between sizes, we recommend sizing up.",
    category: "sizing",
    order: 5,
  },
  {
    question: "Are your products authentic?",
    answer:
      "Absolutely. All products at Luxee Store are 100% authentic. We source directly from verified manufacturers and designers, and every item comes with a certificate of authenticity.",
    category: "general",
    order: 6,
  },
];

export const seedJobs = [
  {
    title: "Senior Fashion Buyer",
    department: "Merchandising",
    location: "Lahore, Pakistan",
    type: "Full-time",
    description:
      "Lead our buying team in curating seasonal collections. You'll work with international suppliers and analyze market trends to bring the best luxury fashion to our customers.",
    requirements: [
      "5+ years experience in fashion buying",
      "Strong understanding of luxury market trends",
      "Excellent negotiation skills",
      "Bachelor's degree in Fashion Merchandising or related field",
    ],
    active: true,
  },
  {
    title: "E-commerce Marketing Manager",
    department: "Marketing",
    location: "Lahore, Pakistan",
    type: "Full-time",
    description:
      "Drive our digital marketing strategy across social media, email, and paid channels. You'll be responsible for growing our online presence and customer acquisition.",
    requirements: [
      "3+ years in e-commerce marketing",
      "Experience with Meta Ads and Google Ads",
      "Strong analytical skills",
      "Creative mindset with attention to detail",
    ],
    active: true,
  },
  {
    title: "Customer Experience Specialist",
    department: "Customer Service",
    location: "Remote",
    type: "Full-time",
    description:
      "Be the voice of Luxee Store. Handle customer inquiries via email, chat, and phone while ensuring every interaction reflects our premium brand values.",
    requirements: [
      "2+ years in customer service",
      "Excellent written and verbal communication",
      "Passion for fashion and luxury brands",
      "Ability to work flexible hours",
    ],
    active: true,
  },
];

export const seedDiscountCodes = [
  {
    code: "LUXEE10",
    type: "percentage",
    value: 10,
    minOrder: 5000,
    maxUses: 1000,
    active: true,
  },
  {
    code: "WELCOME15",
    type: "percentage",
    value: 15,
    minOrder: 3000,
    maxUses: 500,
    active: true,
  },
];
