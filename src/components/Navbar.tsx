import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Dumbbell, ShoppingCart } from 'lucide-react'; // Added ShoppingCart

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  const handleLinkClick = (isExternal: boolean = false) => {
    if (!isExternal) {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }
    setIsMenuOpen(false); 
  };

  return (
    <nav className="bg-sky-500 text-white sticky top-0 z-50 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center" onClick={() => handleLinkClick()}>
              <Dumbbell className="h-8 w-8 mr-2" />
              <span className="font-bold text-xl">PRLifterLoot</span>
            </Link>
          </div>
          
          <div className="hidden md:flex items-center space-x-4">
            <Link to="/" className="px-3 py-2 rounded-md hover:bg-sky-600 transition-colors" onClick={() => handleLinkClick()}>
              Home
            </Link>
            <a href="https://wordpress.mike-d82.com/products/" target="_blank" rel="noopener noreferrer" className="px-3 py-2 rounded-md hover:bg-sky-600 transition-colors" onClick={() => handleLinkClick(true)}>
              Products
            </a>
            <Link to="/about" className="px-3 py-2 rounded-md hover:bg-sky-600 transition-colors" onClick={() => handleLinkClick()}>
              About
            </Link>
            <Link to="/contact" className="px-3 py-2 rounded-md hover:bg-sky-600 transition-colors" onClick={() => handleLinkClick()}>
              Contact
            </Link>
            <a 
              href="https://wordpress.mike-d82.com/cart/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="px-3 py-2 rounded-md hover:bg-sky-600 transition-colors flex items-center" 
              onClick={() => handleLinkClick(true)}
              aria-label="View shopping cart"
            >
              <ShoppingCart className="h-6 w-6" />
            </a>
          </div>
          
          <div className="md:hidden flex items-center">
            <a 
              href="https://wordpress.mike-d82.com/cart/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="px-3 py-2 mr-2 hover:bg-sky-600 rounded-md" 
              onClick={() => handleLinkClick(true)}
              aria-label="View shopping cart"
            >
              <ShoppingCart className="h-6 w-6" />
            </a>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md hover:bg-sky-600 focus:outline-none"
              aria-expanded={isMenuOpen}
              aria-controls="mobile-menu"
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>
      
      {isMenuOpen && (
        <div className="md:hidden bg-sky-600" id="mobile-menu">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link 
              to="/" 
              className="block px-3 py-2 rounded-md hover:bg-sky-700 transition-colors"
              onClick={() => handleLinkClick()}
            >
              Home
            </Link>
            <a 
              href="https://wordpress.mike-d82.com/products/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="block px-3 py-2 rounded-md hover:bg-sky-700 transition-colors"
              onClick={() => handleLinkClick(true)}
            >
              Products
            </a>
            <Link 
              to="/about" 
              className="block px-3 py-2 rounded-md hover:bg-sky-700 transition-colors"
              onClick={() => handleLinkClick()}
            >
              About
            </Link>
            <Link 
              to="/contact" 
              className="block px-3 py-2 rounded-md hover:bg-sky-700 transition-colors"
              onClick={() => handleLinkClick()}
            >
              Contact
            </Link>
            {/* Cart link for mobile menu already handled by the icon in the mobile header */}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
