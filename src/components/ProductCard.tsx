import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart } from 'lucide-react';
import { Product, Color } from '../types';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const handleLinkClick = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  let displayPrice = product.price;
  let mainImage = product.mainImage || '/images/placeholder.webp';
  let colorsToShowOnCard: Color[] = [];

  // If the product uses the old variant structure (for other products)
  // and has a default variant defined, use its price and image.
  if (product.variants && product.variants.length > 0 && product.defaultVariantIndex !== undefined) {
    const defaultVariant = product.variants[product.defaultVariantIndex];
    if (defaultVariant) {
      displayPrice = defaultVariant.price;
      if (defaultVariant.images && defaultVariant.images.length > 0) {
        mainImage = defaultVariant.images[0];
      }
      if (defaultVariant.availableColors) {
        colorsToShowOnCard = defaultVariant.availableColors.slice(0, 3);
      }
    }
  } 
  // For component-based products (like Kids Barbell) or simple products
  else if (product.components && product.components.length > 0) {
     // Show base price (already set) and main image (already set)
     // For colors, show from the first component as a sample
    colorsToShowOnCard = product.components[0].availableColors.slice(0, 3);
  }
  // If it's a simple product with no variants or components, but might have top-level availableColors (less likely with new structure)
  // This part might be redundant if all products follow either component or variant structure or are simple.

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:scale-105">
      <Link to={`/product/${product.id}`} onClick={handleLinkClick}>
        <div className="h-48 overflow-hidden">
          <img 
            src={mainImage} 
            alt={product.name} 
            className="w-full h-full object-cover"
          />
        </div>
      </Link>
      <div className="p-4">
        <Link to={`/product/${product.id}`} onClick={handleLinkClick}>
          <h3 className="text-lg font-semibold text-gray-800 mb-1">{product.name}</h3>
        </Link>
        <p className="text-gray-600 text-sm mb-2 line-clamp-2">{product.description}</p>
        <div className="flex items-center justify-between mt-4">
          <span className="text-sky-600 font-bold">${displayPrice.toFixed(2)}</span>
          <div className="flex items-center">
            {colorsToShowOnCard.length > 0 && (
              <div className="flex space-x-1 mr-3">
                {colorsToShowOnCard.map((color) => (
                  <div 
                    key={`${product.id}-cardcolor-${color.name}`}
                    className="w-4 h-4 rounded-full border border-gray-300"
                    style={{ backgroundColor: color.hex }}
                    title={color.name}
                  />
                ))}
              </div>
            )}
            <Link 
              to={`/product/${product.id}`}
              className="bg-sky-500 text-white p-2 rounded-full hover:bg-sky-600 transition-colors"
              onClick={handleLinkClick}
              aria-label={`View details for ${product.name}`}
            >
              <ShoppingCart className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
