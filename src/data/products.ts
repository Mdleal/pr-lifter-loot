import { Product, Color, ProductComponent, ProductVariant } from '../types';

// Define standard colors - can be kept for potential future use or removed if not needed
const kidsBarbellComponentColors: Color[] = [
  { name: 'Crimson Red', hex: '#DC143C', available: true, image: 'https://nextcloud.mike-d82.com/apps/files_sharing/publicpreview/pYgPMfL36SW3wEj?file=/&amp;fileId=155726&amp;x=1920&amp;y=1080&amp;a=true&amp;etag=ad693c036f101a4dc4693678ea83a072' },
  { name: 'Ocean Blue', hex: '#0077BE', available: true, image: 'https://nextcloud.mike-d82.com/apps/files_sharing/publicpreview/pYgPMfL36SW3wEj?file=/&amp;fileId=155726&amp;x=1920&amp;y=1080&amp;a=true&amp;etag=ad693c036f101a4dc4693678ea83a072' },
  { name: 'Hot Pink', hex: '#FF69B4', available: true, image: 'https://nextcloud.mike-d82.com/apps/files_sharing/publicpreview/BDRpDscCNoa6624?file=/&amp;fileId=155724&amp;x=1920&amp;y=1080&amp;a=true&amp;etag=92ef3f08273fa9d7f5bc7aecc0855ac6' },
  { name: 'Arctic White', hex: '#F0F8FF', available: true, image: '/images/product/barbell/plate-white.webp' },
  { name: 'Tropical Turquoise', hex: '#40E0D0', available: true, image: 'https://nextcloud.mike-d82.com/apps/files_sharing/publicpreview/BDRpDscCNoa6624?file=/&amp;fileId=155724&amp;x=1920&amp;y=1080&amp;a=true&amp;etag=92ef3f08273fa9d7f5bc7aecc0855ac6' }
];

// Empty products array
export const products: Product[] = [];

export const getFeaturedProducts = (): Product[] => {
  // Filters featured products. Since products array is empty, this will return an empty array.
  return products.filter(product => product.featured);
};

export const getProductById = (id: string): Product | undefined => {
  // Finds a product by ID. Since products array is empty, this will return undefined.
  return products.find(product => product.id === id);
};

export const getProductsByCategory = (category: string): Product[] => {
  // Filters products by category. Since products array is empty, this will return an empty array.
  return products.filter(product => product.category === category);
};
