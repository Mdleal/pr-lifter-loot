export interface Color {
  name: string;
  hex: string;
  available: boolean;
  image?: string; // Optional: URL for an image specific to this color choice (e.g., a red plate)
}

// For a single product that has multiple parts, each requiring a selection (e.g. Kids Barbell)
export interface ProductComponent {
  id: string; // e.g., "kids-barbell-25lb-plates", "kids-barbell-45lb-plates"
  name: string; // e.g., "25lb Plate Color", "45lb Plate Color"
  availableColors: Color[];
  // defaultColorName?: string; // Could be used to pre-select a color
}

// For products that are sold in different distinct versions (e.g. a 10kg dumbbell vs 20kg dumbbell)
// This is NOT for Kids Barbell's 25lb/45lb parts, but for other products.
export interface ProductVariant {
  identifier: string; // e.g., "10kg", "Large", "Standard"
  price: number;
  images: string[]; // Images specific to this variant
  availableColors?: Color[]; // If this variant itself can have color options (e.g. Large Red T-Shirt)
  sku?: string;
  stock?: number;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  category: string;
  featured: boolean;
  ageRange?: string;
  dimensions?: string;
  
  price: number; // Base price for the product (e.g., Kids Barbell set price)
  mainImage: string; // A representative image for the product card and default for detail page
  galleryImages: string[]; // Additional images for the detail page gallery

  // If the product has selectable components (like Kids Barbell)
  // These components are part of ONE product/price.
  components?: ProductComponent[];

  // If the product has distinct variants (e.g., different sizes of a t-shirt, or different weights of a standard dumbbell)
  // Each variant typically has its own price, SKU, images.
  // This would NOT be used for Kids Barbell if it's a single product with configurable parts.
  variants?: ProductVariant[];
  defaultVariantIndex?: number; // Index for 'variants' if they exist (for other products)
}

export interface SelectedComponent {
  componentId: string; // Matches ProductComponent.id
  componentName: string; // Matches ProductComponent.name
  selectedColor: Color;
}

export interface CartItem {
  id: string; // Unique ID for this cart entry (e.g., product.id + hash of selections)
  productId: string;
  productName: string;
  quantity: number;
  
  unitPrice: number; // The price for one unit of this configured item
  displayImage: string; // Image to show in cart

  // If the product in cart has configured components (like Kids Barbell)
  selectedComponents?: SelectedComponent[];

  // If the product in cart was a simple variant selection (for other products)
  selectedVariantIdentifier?: string; // e.g., "10kg"
  selectedVariantColorName?: string; // If the variant itself had a color choice
  sku?: string; // SKU of the final configured item or variant
}

export interface FAQ {
  question: string;
  answer: string;
}
