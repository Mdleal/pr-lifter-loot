import { Product, Color, ProductComponent, ProductVariant } from '../types';

// Define standard colors that can be used for components
const kidsBarbellComponentColors: Color[] = [
  { name: 'Crimson Red', hex: '#DC143C', available: true, image: 'https://nextcloud.mike-d82.com/apps/files_sharing/publicpreview/pYgPMfL36SW3wEj?file=/&fileId=155726&x=1920&y=1080&a=true&etag=ad693c036f101a4dc4693678ea83a072' },
  { name: 'Ocean Blue', hex: '#0077BE', available: true, image: 'https://nextcloud.mike-d82.com/apps/files_sharing/publicpreview/pYgPMfL36SW3wEj?file=/&fileId=155726&x=1920&y=1080&a=true&etag=ad693c036f101a4dc4693678ea83a072' },
  { name: 'Hot Pink', hex: '#FF69B4', available: true, image: 'https://nextcloud.mike-d82.com/apps/files_sharing/publicpreview/BDRpDscCNoa6624?file=/&fileId=155724&x=1920&y=1080&a=true&etag=92ef3f08273fa9d7f5bc7aecc0855ac6' },
  { name: 'Arctic White', hex: '#F0F8FF', available: true, image: '/images/product/barbell/plate-white.webp' },
  { name: 'Tropical Turquoise', hex: '#40E0D0', available: true, image: 'https://nextcloud.mike-d82.com/apps/files_sharing/publicpreview/BDRpDscCNoa6624?file=/&fileId=155724&x=1920&y=1080&a=true&etag=92ef3f08273fa9d7f5bc7aecc0855ac6' }
];

const kidsKettlebellMainImage = 'https://wordpress.mike-d82.com/wp-content/uploads/2024/04/kettlebell-toddler-clear-background-copy.png';

const kidsKettlebellVariants: ProductVariant[] = [
  {
    identifier: 'Black with Pink Stripe',
    price: 24.99,
    images: [kidsKettlebellMainImage], // Placeholder, ideally unique image for this variant
    sku: 'KK-BLK-PNK',
    stock: 50,
  },
  {
    identifier: 'Black with Blue Stripe',
    price: 24.99,
    images: [kidsKettlebellMainImage], // Placeholder
    sku: 'KK-BLK-BLU',
    stock: 50,
  },
  {
    identifier: 'Black with Red Stripe',
    price: 24.99,
    images: [kidsKettlebellMainImage], // Placeholder
    sku: 'KK-BLK-RED',
    stock: 50,
  },
  {
    identifier: 'Pink with White Stripe',
    price: 24.99,
    images: [kidsKettlebellMainImage], // Placeholder
    sku: 'KK-PNK-WHT',
    stock: 40,
  }
];


export const products: Product[] = [
  {
    id: 'kids-barbell-01',
    name: 'Kids Barbell Set',
    description: "Introduce your little one to the world of fitness with our specially designed Kids Barbell Set. Safe, lightweight, and colorful, it's perfect for developing coordination and strength through play. This set includes a bar, 25lb plates, and 45lb plates, with customizable colors for each set of plates. Made with durable, non-toxic materials.",
    category: 'Barbells',
    featured: true,
    ageRange: '3-7 years',
    dimensions: 'Bar: 90cm L x 2.5cm D. Plate sets included.',
    price: 79.99, // Base price for the set
    mainImage: 'https://nextcloud.mike-d82.com/apps/files_sharing/publicpreview/tLaWftps6MNLMTs?file=/&fileId=155723&x=1920&y=1080&a=true&etag=3429a52e438faa6ead8385bebed1383d',
    galleryImages: [
      '/images/product/barbell/kids-barbell-lifestyle-1.webp',
      '/images/product/barbell/kids-barbell-lifestyle-2.webp',
      '/images/product/barbell/kids-barbell-all-colors.webp',
      'https://nextcloud.mike-d82.com/apps/files_sharing/publicpreview/pYgPMfL36SW3wEj?file=/&fileId=155726&x=1920&y=1080&a=true&etag=ad693c036f101a4dc4693678ea83a072',
      'https://nextcloud.mike-d82.com/apps/files_sharing/publicpreview/BDRpDscCNoa6624?file=/&fileId=155724&x=1920&y=1080&a=true&etag=92ef3f08273fa9d7f5bc7aecc0855ac6',
      '/images/product/barbell/plate-white.webp',
    ],
    components: [
      {
        id: 'kids-barbell-25lb-plates',
        name: '25lb Plate Color',
        availableColors: kidsBarbellComponentColors,
      },
      {
        id: 'kids-barbell-45lb-plates',
        name: '45lb Plate Color',
        availableColors: kidsBarbellComponentColors,
      }
    ],
  },
  {
    id: 'kids-kettlebell-01',
    name: 'Kids Kettlebell',
    description: "Safe, fun, and perfectly sized for little hands, our Kids Kettlebell makes fitness an exciting adventure. Designed to encourage active play, it helps develop coordination, strength, and a love for movement from an early age. Made from durable, non-toxic materials, it’s built for enthusiastic playtimes.",
    category: 'Kettlebells',
    featured: true,
    ageRange: '3-7 years',
    dimensions: 'Approx. 15cm H x 10cm W', // Estimated
    price: kidsKettlebellVariants[0].price, // Price from the default variant
    mainImage: kidsKettlebellMainImage,
    galleryImages: [
      kidsKettlebellMainImage, // Add more relevant gallery images if available
      // e.g., '/images/product/kettlebell/kids-kettlebell-lifestyle-1.webp'
    ],
    variants: kidsKettlebellVariants,
    defaultVariantIndex: 0,
    // Note: The "custom" color option is not included as a standard variant.
    // Implementing custom color choices typically requires a different UI/backend approach.
  }
];

export const getFeaturedProducts = (): Product[] => {
  return products.filter(product => product.featured);
};

export const getProductById = (id: string): Product | undefined => {
  return products.find(product => product.id === id);
};

export const getProductsByCategory = (category: string): Product[] => {
  return products.filter(product => product.category === category);
};
