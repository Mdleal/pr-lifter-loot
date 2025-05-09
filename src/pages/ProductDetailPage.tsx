import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getProductById } from '../data/products';
import { ShoppingCart, ChevronLeft, ChevronRight, Check, Minus, Plus } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { Product, Color, ProductComponent, SelectedComponent, ProductVariant, CartItem } from '../types';
import { RainbowButton } from '../components/ui/rainbow-button';

const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const product = getProductById(id || '');
  const { addToCart } = useCart();

  const [selectedComponentColors, setSelectedComponentColors] = useState<Record<string, Color>>({});
  const [selectedVariantIndex, setSelectedVariantIndex] = useState(product?.defaultVariantIndex ?? 0);
  const [currentVariant, setCurrentVariant] = useState<ProductVariant | undefined>(
     product?.variants && product.variants.length > 0 ? product.variants[selectedVariantIndex] : undefined
  );
  const [selectedVariantColor, setSelectedVariantColor] = useState<Color | undefined>(
    currentVariant?.availableColors ? currentVariant.availableColors[0] : undefined
  );

  const [quantity, setQuantity] = useState(1);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' });
    if (product) {
      if (product.components && product.components.length > 0) {
        const initialSelections: Record<string, Color> = {};
        product.components.forEach(comp => {
          if (comp.availableColors.length > 0) {
            initialSelections[comp.id] = comp.availableColors[0]; 
          }
        });
        setSelectedComponentColors(initialSelections);
        setCurrentVariant(undefined); 
        setSelectedVariantColor(undefined);
      } 
      else if (product.variants && product.variants.length > 0) {
        const initialVariantIdx = product.defaultVariantIndex ?? 0;
        setSelectedVariantIndex(initialVariantIdx);
        const variant = product.variants[initialVariantIdx];
        setCurrentVariant(variant);
        setSelectedVariantColor(variant?.availableColors ? variant.availableColors[0] : undefined);
        setSelectedComponentColors({});
      } else {
        setSelectedComponentColors({});
        setCurrentVariant(undefined);
        setSelectedVariantColor(undefined);
      }
      setQuantity(1);
      setCurrentImageIndex(0);
    }
  }, [product]);

  useEffect(() => {
    if (product?.variants && product.variants.length > selectedVariantIndex) {
      const newVariant = product.variants[selectedVariantIndex];
      setCurrentVariant(newVariant);
      const isSelectedColorAvailable = newVariant.availableColors?.some(c => c.name === selectedVariantColor?.name);
      if (!isSelectedColorAvailable || !selectedVariantColor) {
        setSelectedVariantColor(newVariant.availableColors ? newVariant.availableColors[0] : undefined);
      }
      setCurrentImageIndex(0); 
    }
  }, [selectedVariantIndex, product, selectedVariantColor?.name]);


  const handleLinkClick = (path: string = '/products') => {
    navigate(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Product Not Found</h2>
        <p className="text-gray-600 mb-8">The product you're looking for doesn't exist or has been removed.</p>
        <RainbowButton onClick={() => handleLinkClick()} className="px-6 py-3">
          Back to Products
        </RainbowButton>
      </div>
    );
  }

  const handlePrevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? product.galleryImages.length - 1 : prevIndex - 1
    );
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === product.galleryImages.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handleComponentColorSelect = (componentId: string, color: Color) => {
    setSelectedComponentColors(prev => ({ ...prev, [componentId]: color }));
    // If the selected color has a specific image, update the main displayed image
    if (color.image) {
      // Find if this image is in gallery, if so, set index, otherwise, consider how to display
      const galleryImageIndex = product.galleryImages.findIndex(img => img === color.image);
      if (galleryImageIndex !== -1) {
        setCurrentImageIndex(galleryImageIndex);
      }
      // If not in gallery, you might need a state for a "temporary main image" or add it to gallery logic
      // For now, we only switch if it's part of the gallery.
    }
  };

  const handleAddToCart = () => {
    if (!product) return;

    let cartId = product.id; // Default for simple products
    let itemSku: string | undefined = undefined;
    let finalSelectedComponents: SelectedComponent[] | undefined = undefined;
    let itemUnitPrice = product.price;
    let itemDisplayImage = product.mainImage;
    let itemSelectedVariantIdentifier: string | undefined = undefined;
    let itemSelectedVariantColorName: string | undefined = undefined;


    if (product.components && product.components.length > 0) {
      const componentsSelected = Object.values(selectedComponentColors).length === product.components.length &&
                                 Object.values(selectedComponentColors).every(color => color !== undefined);
      if (!componentsSelected) {
        alert("Please select a color for all components.");
        return;
      }
      finalSelectedComponents = product.components.map(comp => ({
        componentId: comp.id,
        componentName: comp.name,
        selectedColor: selectedComponentColors[comp.id]
      }));
      
      const skuParts = finalSelectedComponents.map(sc => `${sc.componentId.split('-').pop()?.substring(0,2)}${sc.selectedColor.name.substring(0,2)}`);
      itemSku = `${product.id.substring(0,5)}-${skuParts.join('')}`.toUpperCase();
      cartId = itemSku;
      // displayImage could be a composite or the main product image. For now, main product image.
      itemDisplayImage = product.mainImage; 

    } else if (currentVariant) {
      if (currentVariant.availableColors && currentVariant.availableColors.length > 0 && !selectedVariantColor) {
        alert("Please select a color for this variant.");
        return;
      }
      itemUnitPrice = currentVariant.price;
      itemDisplayImage = currentVariant.images[0] || product.mainImage;
      itemSelectedVariantIdentifier = currentVariant.identifier;
      itemSelectedVariantColorName = selectedVariantColor?.name;
      itemSku = currentVariant.sku ? (selectedVariantColor ? `${currentVariant.sku}-${selectedVariantColor.name.substring(0,3).toUpperCase()}` : currentVariant.sku) : undefined;
      
      if (itemSku) {
        cartId = itemSku;
      } else {
        cartId = `${product.id}-${currentVariant.identifier}${selectedVariantColor ? '-' + selectedVariantColor.name : ''}`;
      }
    }

    const itemToAdd: CartItem = {
      id: cartId.replace(/\s+/g, '-').replace(/[^\w-]+/g, ''), // Sanitize ID
      productId: product.id,
      productName: product.name,
      quantity,
      unitPrice: itemUnitPrice,
      displayImage: itemDisplayImage,
      selectedComponents: finalSelectedComponents,
      selectedVariantIdentifier: itemSelectedVariantIdentifier,
      selectedVariantColorName: itemSelectedVariantColorName,
      sku: itemSku,
    };

    addToCart(itemToAdd);
    alert(`Added ${quantity} ${product.name} to your cart!`);
  };

  const displayImage = product.galleryImages.length > 0 ? product.galleryImages[currentImageIndex] : product.mainImage;
  const galleryImages = product.galleryImages;
  const currentPrice = currentVariant ? currentVariant.price : product.price;


  return (
    <div className="bg-gradient-to-br from-sky-50 via-pink-50 to-yellow-50 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <button
          onClick={() => handleLinkClick()}
          className="inline-flex items-center text-sky-700 hover:text-sky-900 mb-8 group"
        >
          <ChevronLeft className="h-6 w-6 mr-1 transform group-hover:-translate-x-1 transition-transform duration-200" />
          <span className="font-semibold text-lg">Back to Products</span>
        </button>
        
        <div className="bg-white shadow-2xl rounded-xl p-6 md:p-10 lg:grid lg:grid-cols-2 lg:gap-12 items-start">
          {/* Product images */}
          <div className="mb-8 lg:mb-0">
            <div className="relative rounded-lg overflow-hidden bg-gray-100 aspect-square shadow-lg">
              <img
                src={displayImage}
                alt={`${product.name}${currentVariant ? ' - ' + currentVariant.identifier : ''}${selectedComponentColors && Object.keys(selectedComponentColors).length > 0 ? ' - Custom Configuration' : ''}`}
                className="w-full h-full object-contain transition-opacity duration-300"
              />
              
              {galleryImages.length > 1 && (
                <>
                  <button
                    onClick={handlePrevImage}
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 bg-white/80 backdrop-blur-sm p-3 rounded-full shadow-md hover:bg-white transition-colors"
                    aria-label="Previous image"
                  >
                    <ChevronLeft className="h-6 w-6 text-gray-700" />
                  </button>
                  <button
                    onClick={handleNextImage}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-white/80 backdrop-blur-sm p-3 rounded-full shadow-md hover:bg-white transition-colors"
                    aria-label="Next image"
                  >
                    <ChevronRight className="h-6 w-6 text-gray-700" />
                  </button>
                </>
              )}
            </div>
            
            {galleryImages.length > 1 && (
              <div className="mt-4 flex space-x-2 overflow-x-auto pb-2">
                {galleryImages.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`flex-shrink-0 w-20 h-20 rounded-md overflow-hidden border-2 transition-all duration-200 ${
                      currentImageIndex === index
                        ? 'border-sky-500 scale-105 shadow-lg' 
                        : 'border-transparent hover:border-sky-300'
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${product.name} thumbnail ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>
          
          {/* Product details */}
          <div className="mt-8 lg:mt-0">
            <h1 className="text-4xl font-extrabold text-gray-900 mb-2 tracking-tight">{product.name}</h1>
            <p className="text-3xl text-sky-600 font-bold mb-6">${currentPrice.toFixed(2)}</p>
            
            <div className="space-y-6">
              {product.components && product.components.length > 0 && product.components.map((component) => (
                <div key={component.id}>
                  <h3 className="text-md font-semibold text-gray-800 mb-2">{component.name}: <span className="text-gray-600 font-normal">{selectedComponentColors[component.id]?.name || 'Select color'}</span></h3>
                  <div className="flex flex-wrap gap-3">
                    {component.availableColors.map((color) => (
                      <button
                        key={color.name}
                        onClick={() => handleComponentColorSelect(component.id, color)}
                        className={`relative w-10 h-10 rounded-full border-2 transition-all duration-200 transform hover:scale-110
                          ${selectedComponentColors[component.id]?.name === color.name
                            ? 'border-sky-500 ring-2 ring-sky-500 ring-offset-1'
                            : color.hex === '#F0F8FF' || color.hex === '#FFFFFF' ? 'border-gray-400' : 'border-transparent'
                          }`}
                        style={{ backgroundColor: color.hex }}
                        title={color.name}
                        aria-label={`Select ${component.name} color ${color.name}`}
                      >
                        {color.image && ( // Display color image if available
                            <img src={color.image} alt={color.name} className="w-full h-full object-cover rounded-full" />
                        )}
                        {selectedComponentColors[component.id]?.name === color.name && (
                          <span className={`absolute inset-0 flex items-center justify-center ${!color.image ? '' : 'bg-black/30 rounded-full'}`}>
                            <Check className={`h-5 w-5 ${ (color.hex === '#F0F8FF' || color.hex === '#FFFFFF') && !color.image ? 'text-gray-700' : 'text-white'} drop-shadow-sm`} />
                          </span>
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              ))}

              {product.variants && product.variants.length > 0 && !product.components && (
                <div>
                  <h3 className="text-md font-semibold text-gray-800 mb-2">{currentVariant?.identifier ? `Type: ${currentVariant.identifier}` : 'Select Type'}</h3>
                  <div className="flex space-x-3">
                    {product.variants.map((variant, index) => (
                      <button
                        key={variant.identifier}
                        onClick={() => setSelectedVariantIndex(index)}
                        className={`px-4 py-2 rounded-lg border-2 text-sm font-medium transition-all duration-200
                          ${selectedVariantIndex === index 
                            ? 'bg-sky-600 text-white border-sky-600 shadow-md' 
                            : 'bg-white text-gray-700 border-gray-300 hover:border-sky-500 hover:text-sky-600'
                          }`}
                      >
                        {variant.identifier}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {currentVariant?.availableColors && currentVariant.availableColors.length > 0 && !product.components && (
                 <div>
                  <h3 className="text-md font-semibold text-gray-800 mb-2">Color: <span className="text-gray-600 font-normal">{selectedVariantColor?.name || 'Select color'}</span></h3>
                  <div className="flex flex-wrap gap-3">
                    {currentVariant.availableColors.map((color) => (
                      <button
                        key={color.name}
                        onClick={() => setSelectedVariantColor(color)}
                        className={`relative w-10 h-10 rounded-full border-2 transition-all duration-200 transform hover:scale-110
                          ${selectedVariantColor?.name === color.name
                            ? 'border-sky-500 ring-2 ring-sky-500 ring-offset-1'
                            : color.hex === '#F0F8FF' || color.hex === '#FFFFFF' ? 'border-gray-400' : 'border-transparent'
                          }`}
                        style={{ backgroundColor: color.hex }}
                        title={color.name}
                        aria-label={`Select color ${color.name}`}
                      >
                        {color.image && (
                            <img src={color.image} alt={color.name} className="w-full h-full object-cover rounded-full" />
                        )}
                        {selectedVariantColor?.name === color.name && (
                          <span className={`absolute inset-0 flex items-center justify-center ${!color.image ? '' : 'bg-black/30 rounded-full'}`}>
                            <Check className={`h-5 w-5 ${ (color.hex === '#F0F8FF' || color.hex === '#FFFFFF') && !color.image ? 'text-gray-700' : 'text-white'} drop-shadow-sm`} />
                          </span>
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              )}


              <div>
                <h3 className="text-md font-semibold text-gray-800 mb-2">Quantity</h3>
                <div className="flex items-center w-max border border-gray-300 rounded-lg">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-3 text-gray-600 hover:bg-gray-100 rounded-l-lg transition-colors"
                    aria-label="Decrease quantity"
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                  <input
                    type="number"
                    min="1"
                    value={quantity}
                    onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                    className="border-none px-3 py-2 w-16 text-center focus:outline-none focus:ring-0 appearance-none [-moz-appearance:textfield]"
                    aria-label="Current quantity"
                  />
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-3 text-gray-600 hover:bg-gray-100 rounded-r-lg transition-colors"
                    aria-label="Increase quantity"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
            
            <div className="mt-10">
              <RainbowButton
                onClick={handleAddToCart}
                className="w-full flex items-center justify-center text-lg py-3.5"
              >
                <ShoppingCart className="h-6 w-6 mr-3" />
                Add to Cart
              </RainbowButton>
            </div>

            <div className="mt-10 prose prose-sm sm:prose-base max-w-none text-gray-700">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Product Description</h3>
              <p>{product.description}</p>
              
              <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Details</h3>
              <ul className="list-disc pl-5 space-y-1">
                {product.ageRange && <li><strong>Age Range:</strong> {product.ageRange}</li>}
                {product.dimensions && <li><strong>Dimensions:</strong> {product.dimensions}</li>}
                <li><strong>Materials:</strong> Non-toxic, BPA-free</li>
                <li><strong>Care:</strong> Easy to clean with a damp cloth</li>
                <li><strong>Fun Factor:</strong> Guaranteed giggles and gains!</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
