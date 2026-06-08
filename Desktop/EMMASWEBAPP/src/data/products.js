export const CATEGORIES = [
  { id: 'all', label: 'All' },
  { id: 'ready-to-wear', label: 'Ready-to-Wear' },
  { id: 'handbags', label: 'Handbags' },
  { id: 'fine-jewelry', label: 'Fine Jewelry' },
  { id: 'sunglasses', label: 'Sunglasses' },
];

export const SORT_OPTIONS = [
  { id: 'price-asc', label: 'Price: Low to High' },
  { id: 'price-desc', label: 'Price: High to Low' },
  { id: 'favorites', label: 'Customer Favorites' },
];

export const PRICE_MAX = 2000;

export const products = [
  {
    id: 'p1',
    name: 'Silk Double-Breasted Trench',
    category: 'ready-to-wear',
    type: 'apparel',
    price: 1890,
    favoriteScore: 98,
    image:
      'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=900&q=80',
      'https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=900&q=80',
    ],
    description:
      'Fluid Italian silk trench with hand-finished horn buttons and a detachable storm collar.',
    material: '100% Mulberry Silk · Horn Buttons · Cotton Lining',
    sizes: ['S', 'M', 'L', 'XL'],
  },
  {
    id: 'p2',
    name: 'Structured Wool Blazer',
    category: 'ready-to-wear',
    type: 'apparel',
    price: 1240,
    favoriteScore: 94,
    image:
      'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=900&q=80',
      'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=900&q=80',
    ],
    description:
      'Architectural shoulder line in traceable merino wool with satin-bound peak lapels.',
    material: 'Merino Wool · Satin Peak Lapels · Half Canvas Construction',
    sizes: ['S', 'M', 'L', 'XL'],
  },
  {
    id: 'p3',
    name: 'Cashmere Column Gown',
    category: 'ready-to-wear',
    type: 'apparel',
    price: 1950,
    favoriteScore: 97,
    image:
      'https://images.unsplash.com/photo-1566174053879-31528523f8ae?w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1566174053879-31528523f8ae?w=900&q=80',
      'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=900&q=80',
    ],
    description:
      'Bias-cut evening column in double-faced cashmere with an invisible back zip.',
    material: 'Double-Faced Cashmere · Silk Crepe Lining',
    sizes: ['S', 'M', 'L', 'XL'],
  },
  {
    id: 'p4',
    name: 'Linen Resort Set',
    category: 'ready-to-wear',
    type: 'apparel',
    price: 680,
    favoriteScore: 88,
    image:
      '/product-placeholder.svg',
    images: [
      '/product-placeholder.svg',
      '/product-placeholder.svg',
    ],
    description:
      'Relaxed tailoring in stone-washed Belgian linen with mother-of-pearl closures.',
    material: 'Belgian Linen · Mother-of-Pearl Buttons',
    sizes: ['S', 'M', 'L', 'XL'],
  },
  {
    id: 'p5',
    name: 'Italian Leather Tote',
    category: 'handbags',
    type: 'accessory',
    price: 1650,
    favoriteScore: 96,
    image:
      '/product-placeholder.svg',
    images: [
      '/product-placeholder.svg',
      '/product-placeholder.svg',
    ],
    description:
      'Hand-stitched Florentine calfskin tote with brushed gold hardware and suede interior.',
    material: 'Full-Grain Calfskin · Suede Lining · Gold-Plated Hardware',
    sizes: ['One-Size'],
  },
  {
    id: 'p6',
    name: 'Mini Calfskin Crossbody',
    category: 'handbags',
    type: 'accessory',
    price: 980,
    favoriteScore: 91,
    image:
      'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=900&q=80',
      'https://images.unsplash.com/photo-1594223274512-ad4803739b7c?w=900&q=80',
    ],
    description:
      'Compact silhouette with adjustable chain strap and magnetic flap closure.',
    material: 'Grained Calfskin · Chain Strap · Magnetic Closure',
    sizes: ['One-Size'],
  },
  {
    id: 'p7',
    name: 'Minimalist Gold Hoops',
    category: 'fine-jewelry',
    type: 'accessory',
    price: 420,
    favoriteScore: 93,
    image:
      '/product-placeholder.svg',
    images: [
      '/product-placeholder.svg',
      '/product-placeholder.svg',
    ],
    description:
      'Sculptural 18K gold hoops with a satin brush finish and secure click closure.',
    material: '18K Recycled Gold · Satin Brush Finish',
    sizes: ['One-Size'],
  },
  {
    id: 'p8',
    name: 'Diamond Pavé Pendant',
    category: 'fine-jewelry',
    type: 'accessory',
    price: 1850,
    favoriteScore: 99,
    image:
      'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=900&q=80',
      'https://images.unsplash.com/photo-1602173574767-37ac01994b2a?w=900&q=80',
    ],
    description:
      'Ethically sourced pavé diamonds set on a whisper-thin platinum chain.',
    material: 'Platinum · Conflict-Free Diamonds · Lobster Clasp',
    sizes: ['One-Size'],
  },
  {
    id: 'p9',
    name: 'Tortoiseshell Acetate Frames',
    category: 'sunglasses',
    type: 'accessory',
    price: 540,
    favoriteScore: 90,
    image:
      'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=900&q=80',
      'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=900&q=80',
    ],
    description:
      'Hand-polished acetate frames with polarized gradient lenses and titanium hinges.',
    material: 'Plant-Based Acetate · Polarized Lenses · Titanium Hinges',
    sizes: ['One-Size'],
  },
  {
    id: 'p10',
    name: 'Smoke Aviator Sunglasses',
    category: 'sunglasses',
    type: 'accessory',
    price: 620,
    favoriteScore: 87,
    image:
      '/product-placeholder.svg',
    images: [
      '/product-placeholder.svg',
      '/product-placeholder.svg',
    ],
    description:
      'Featherweight aviators with smoke gradient lenses and adjustable nose pads.',
    material: 'Titanium Frame · Smoke Gradient Lenses',
    sizes: ['One-Size'],
  },
  {
    id: 'p11',
    name: 'Silk Crepe Evening Shirt',
    category: 'ready-to-wear',
    type: 'apparel',
    price: 890,
    favoriteScore: 92,
    image:
      'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=900&q=80',
      'https://images.unsplash.com/photo-1469334031218-e42a524cbc72?w=900&q=80',
    ],
    description:
      'Fluid silk crepe shirt with concealed placket and elongated cuff details.',
    material: 'Silk Crepe · Mother-of-Pearl Buttons',
    sizes: ['S', 'M', 'L', 'XL'],
  },
  {
    id: 'p12',
    name: 'Pearl Strand Choker',
    category: 'fine-jewelry',
    type: 'accessory',
    price: 1120,
    favoriteScore: 95,
    image:
      '/product-placeholder.svg',
    images: [
      '/product-placeholder.svg',
      '/product-placeholder.svg',
    ],
    description:
      'Akoya pearls hand-knotted on silk thread with an 18K gold clasp.',
    material: 'Akoya Pearls · Silk Thread · 18K Gold Clasp',
    sizes: ['One-Size'],
  },
  {
    id: 'p13',
    name: 'Velvet Evening Clutch',
    category: 'handbags',
    type: 'accessory',
    price: 760,
    favoriteScore: 89,
    image:
      '/product-placeholder.svg',
    images: [
      '/product-placeholder.svg',
      '/product-placeholder.svg',
    ],
    description:
      'Midnight velvet clutch with crystal clasp and removable chain strap.',
    material: 'Silk Velvet · Crystal Clasp · Removable Chain',
    sizes: ['One-Size'],
  },
  {
    id: 'p14',
    name: 'Tailored Wide-Leg Trouser',
    category: 'ready-to-wear',
    type: 'apparel',
    price: 720,
    favoriteScore: 86,
    image:
      'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=900&q=80',
      'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=900&q=80',
    ],
    description:
      'High-rise wide leg in tropical wool with pressed crease and side zip.',
    material: 'Tropical Wool · Side Zip · Pressed Crease',
    sizes: ['S', 'M', 'L', 'XL'],
  },
];
