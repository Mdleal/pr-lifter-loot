// Assuming Product type is still needed for ProductDetailPage or other parts.
// If Product type is also not needed elsewhere, this file might be removable or further cleaned.
export interface Product {
  id: string;
  name: string;
  category: string; // This might be less relevant if products are external
  price: number;
  originalPrice?: number;
  images: string[]; // URLs to images
  description: string;
  features?: string[];
  stock?: number; // May not be relevant if products are external
  ageRange?: string;
  colors?: { name: string; class: string; selectedClass: string }[]; // For UI selection
  rating?: number;
  reviews?: number;
  slug?: string; // for dynamic routing if products were internal
  sku?: string;
  brand?: string;
  dimensions?: string;
  weight?: string;
  material?: string;
  availability?: string; // e.g., "In Stock", "Out of Stock"
  tags?: string[];
  relatedProducts?: string[]; // Array of product IDs
  options?: Record<string, string[]>; // e.g. { Size: ["S", "M", "L"], Material: ["Cotton", "Polyester"] }
}

// CartItem type is removed as cart functionality is removed.
// export interface CartItem {
//   id: string; 
//   product: Product;
//   quantity: number;
//   selectedColor: { name: string; class: string; selectedClass: string };
//   unitPrice: number; 
// }

// You can add other application-wide types here if needed.
// For example, if you have user profiles, settings, etc.
// export interface UserProfile {
//   id: string;
//   name: string;
//   email: string;
//   // ... other fields
// }
