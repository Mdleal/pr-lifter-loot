import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
// Product data is now empty, so this page will likely show "Product not found".
// import { products } from '../data/products'; // This will be an empty array
import { Product } from '../types';
import { ChevronLeft, Star, ShieldCheck, Truck, MessageSquare } from 'lucide-react';

// Placeholder for fetching product data if it were from an API
// For now, it will try to find in an empty local array.
const getProductById = async (id: string): Promise<Product | undefined> => {
  // Simulate API call
  // In a real app, this would fetch from `../data/products` or an API
  // const product = products.find(p => p.id === id);
  // Since products array is empty, this will always be undefined for now.
  console.warn("Product data source is currently empty. ProductDetailPage will not find products.");
  return undefined; 
};


const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  // Selected color and quantity are no longer needed for cart functionality
  // const [selectedColor, setSelectedColor] = useState<{ name: string; class: string; selectedClass: string } | null>(null);
  // const [quantity, setQuantity] = useState(1);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // const { addToCart } = useCart(); // useCart removed

  useEffect(() => {
    if (!id) {
      navigate('/products'); // Redirect if no ID, which now goes to external
      return;
    }

    const fetchProduct = async () => {
      setLoading(true);
      const fetchedProduct = await getProductById(id);
      if (fetchedProduct) {
        setProduct(fetchedProduct);
        // if (fetchedProduct.colors && fetchedProduct.colors.length > 0) {
        //   setSelectedColor(fetchedProduct.colors[0]);
        // }
      } else {
        // Handle product not found, perhaps redirect or show a message
        // For now, product will remain null
      }
      setLoading(false);
    };

    fetchProduct();
  }, [id, navigate]);

  // const handleAddToCart = () => {
  //   if (product && selectedColor) {
  //     addToCart({
  //       id: `${product.id}-${selectedColor.name}`, // Unique ID for cart item
  //       product: product,
  //       quantity: quantity,
  //       selectedColor: selectedColor,
  //       unitPrice: product.price,
  //     });
  //     alert(`${product.name} added to cart!`);
  //     // Optionally navigate to cart page or show a success message
  //   }
  // };

  const handleImageThumbnailClick = (index: number) => {
    setCurrentImageIndex(index);
  };
  
  const nextImage = () => {
    if (product && product.images) {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % product.images.length);
    }
  };

  const prevImage = () => {
    if (product && product.images) {
      setCurrentImageIndex((prevIndex) => (prevIndex - 1 + product.images.length) % product.images.length);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[calc(100vh-200px)]">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-sky-500"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Product Not Found</h1>
        <p className="text-gray-600 mb-8">
          We couldn't find the product you're looking for. It might have been removed or the link is incorrect.
        </p>
        <Link
          to="/products" // This now redirects to the external WordPress site
          className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-sky-600 hover:bg-sky-700"
        >
          <ChevronLeft className="h-5 w-5 mr-2" />
          Back to Products
        </Link>
      </div>
    );
  }

  // const averageRating = product.rating || 4.5; // Default rating if none provided
  // const reviewCount = product.reviews || 0;

  return (
    <div className="bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-6">
          <Link to="/products" className="text-sky-600 hover:text-sky-700 flex items-center">
            <ChevronLeft className="h-5 w-5 mr-1" />
            Back to Products
          </Link>
        </div>

        <div className="lg:grid lg:grid-cols-2 lg:gap-x-8 lg:items-start">
          {/* Image gallery */}
          <div className="flex flex-col-reverse">
            {/* Image selector */}
            {product.images && product.images.length > 1 && (
              <div className="hidden mt-6 w-full max-w-2xl mx-auto sm:block lg:max-w-none">
                <div className="grid grid-cols-4 gap-6" aria-orientation="horizontal">
                  {product.images.map((image, index) => (
                    <button
                      key={index}
                      type="button"
                      className={`relative h-24 bg-white rounded-md flex items-center justify-center text-sm font-medium uppercase text-gray-900 cursor-pointer hover:bg-gray-50 focus:outline-none focus:ring focus:ring-offset-4 focus:ring-sky-500 ${
                        currentImageIndex === index ? 'ring-2 ring-offset-2 ring-sky-500' : ''
                      }`}
                      onClick={() => handleImageThumbnailClick(index)}
                    >
                      <span className="sr-only">{`Image ${index + 1}`}</span>
                      <span className="absolute inset-0 rounded-md overflow-hidden">
                        <img src={image} alt={`Thumbnail ${index + 1}`} className="w-full h-full object-center object-cover" />
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="w-full aspect-w-1 aspect-h-1 relative">
              <img
                src={product.images && product.images.length > 0 ? product.images[currentImageIndex] : 'https://via.placeholder.com/600x600.png?text=No+Image'}
                alt={product.name}
                className="w-full h-full object-center object-cover sm:rounded-lg shadow-lg"
              />
               {product.images && product.images.length > 1 && (
                <>
                  <button 
                    onClick={prevImage} 
                    className="absolute left-2 top-1/2 -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 transition"
                    aria-label="Previous image"
                  >
                    <ChevronLeft size={24} />
                  </button>
                  <button 
                    onClick={nextImage} 
                    className="absolute right-2 top-1/2 -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 transition"
                    aria-label="Next image"
                  >
                    <ChevronLeft size={24} className="transform rotate-180" />
                  </button>
                </>
              )}
            </div>
          </div>

          {/* Product info */}
          <div className="mt-10 px-4 sm:px-0 sm:mt-16 lg:mt-0">
            <h1 className="text-3xl font-extrabold tracking-tight text-gray-900">{product.name}</h1>

            <div className="mt-3">
              <h2 className="sr-only">Product information</h2>
              <p className="text-3xl text-gray-900">
                ${product.price.toFixed(2)}
                {product.originalPrice && product.originalPrice > product.price && (
                  <span className="ml-2 text-xl text-gray-500 line-through">${product.originalPrice.toFixed(2)}</span>
                )}
              </p>
            </div>

            {/* Reviews - simplified as cart is removed */}
            {product.rating !== undefined && product.reviews !== undefined && (
              <div className="mt-3">
                <h3 className="sr-only">Reviews</h3>
                <div className="flex items-center">
                  <div className="flex items-center">
                    {[0, 1, 2, 3, 4].map((rating) => (
                      <Star
                        key={rating}
                        className={`h-5 w-5 flex-shrink-0 ${
                          (product.rating || 0) > rating ? 'text-yellow-400' : 'text-gray-300'
                        }`}
                        aria-hidden="true"
                      />
                    ))}
                  </div>
                  <p className="sr-only">{product.rating} out of 5 stars</p>
                  {product.reviews > 0 && (
                     <a href="#reviews" className="ml-3 text-sm font-medium text-sky-600 hover:text-sky-500">
                        {product.reviews} reviews
                     </a>
                  )}
                </div>
              </div>
            )}


            <div className="mt-6">
              <h3 className="sr-only">Description</h3>
              <div
                className="text-base text-gray-700 space-y-6"
                dangerouslySetInnerHTML={{ __html: product.description || '' }}
              />
            </div>
            
            {/* Color selector - kept for UI, but not tied to cart */}
            {product.colors && product.colors.length > 0 && (
              <div className="mt-6">
                <h3 className="text-sm text-gray-600 font-medium">Color</h3>
                {/* Simplified color selector - no state change needed if not adding to cart */}
                <div className="flex items-center space-x-3 mt-2">
                  {product.colors.map((colorOption) => (
                    <button
                      key={colorOption.name}
                      type="button"
                      // onClick={() => setSelectedColor(colorOption)}
                      className={`relative -m-0.5 flex items-center justify-center rounded-full p-0.5 focus:outline-none 
                        ${'' /* selectedColor?.name === colorOption.name ? 'ring ring-offset-1 ring-sky-500' : ''*/ }`}
                      title={colorOption.name}
                    >
                      <span className="sr-only">{colorOption.name}</span>
                      <span
                        aria-hidden="true"
                        className={`h-8 w-8 ${colorOption.class} border border-black border-opacity-10 rounded-full`}
                      />
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity selector and Add to cart button removed */}
            {/* 
            <div className="mt-6">
              <label htmlFor="quantity" className="block text-sm font-medium text-gray-700">
                Quantity
              </label>
              <input
                type="number"
                id="quantity"
                name="quantity"
                min="1"
                value={quantity}
                onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                className="mt-1 block w-20 rounded-md border-gray-300 shadow-sm focus:border-sky-500 focus:ring-sky-500 sm:text-sm"
              />
            </div>

            <div className="mt-10 flex">
              <button
                type="button"
                onClick={handleAddToCart}
                className="w-full bg-sky-600 border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500"
              >
                Add to Cart
              </button>
            </div> 
            */}

            <div className="mt-10 border-t border-gray-200 pt-8">
                <h3 className="text-sm font-medium text-gray-900">Product Highlights</h3>
                <div className="mt-4 prose prose-sm text-gray-500">
                  <ul role="list">
                    {product.features?.map((feature) => (
                      <li key={feature}>{feature}</li>
                    ))}
                    {(!product.features || product.features.length === 0) && (
                        <li>No specific highlights listed. Check description for details.</li>
                    )}
                  </ul>
                </div>
            </div>
            
            <section aria-labelledby="shipping-heading" className="mt-10">
              <h2 id="shipping-heading" className="text-lg font-medium text-gray-900">
                Shipping & Returns
              </h2>
              <div className="mt-4 space-y-4 text-sm text-gray-500">
                <div className="flex items-start">
                  <Truck className="h-6 w-6 mr-2 flex-shrink-0 text-sky-500" />
                  <p>Standard shipping: 3-5 business days. Express options available at checkout. Free shipping on orders over $50 (if applicable).</p>
                </div>
                <div className="flex items-start">
                  <ShieldCheck className="h-6 w-6 mr-2 flex-shrink-0 text-sky-500" />
                  <p>Easy 30-day returns. We want you to be happy with your purchase!</p>
                </div>
              </div>
            </section>

            <section aria-labelledby="contact-heading" className="mt-10">
              <h2 id="contact-heading" className="text-lg font-medium text-gray-900">
                Have Questions?
              </h2>
              <div className="mt-4 flex items-start">
                <MessageSquare className="h-6 w-6 mr-2 flex-shrink-0 text-sky-500" />
                <p className="text-sm text-gray-500">
                  Our support team is here to help. 
                  <Link to="/contact" className="ml-1 font-medium text-sky-600 hover:text-sky-500">
                    Contact Us
                  </Link>
                </p>
              </div>
            </section>

          </div>
        </div>
        
        {/* Placeholder for Reviews Section if it exists */}
        {/* <div id="reviews" className="mt-16 pt-10 border-t border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900">Customer Reviews</h2>
          {product.reviews && product.reviews > 0 ? (
            <p className="mt-4 text-gray-600">Display reviews here...</p>
          ) : (
            <p className="mt-4 text-gray-600">No reviews yet for this product.</p>
          )}
        </div> */}

      </div>
    </div>
  );
};

export default ProductDetailPage;
