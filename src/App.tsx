import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import ScrollToTopOnNavigate from './components/ScrollToTopOnNavigate';
import ExternalRedirect from './components/ExternalRedirect'; // Import the new component
import HomePage from './pages/HomePage';
// ProductsPage is no longer directly used for the /products route
// import ProductsPage from './pages/ProductsPage'; 
import ProductDetailPage from './pages/ProductDetailPage';
import CartPage from './pages/CartPage';
import FAQPage from './pages/FAQPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import AnimationDemoPage from './pages/AnimationDemoPage';
import PrivacyPolicyPage from './pages/PrivacyPolicyPage';
import TermsOfServicePage from './pages/TermsOfServicePage';
import ShippingPolicyPage from './pages/ShippingPolicyPage';

function App() {
  return (
    <CartProvider>
      <Router>
        <ScrollToTopOnNavigate />
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<HomePage />} />
              {/* Updated route for /products */}
              <Route 
                path="/products" 
                element={<ExternalRedirect to="https://wordpress.mike-d82.com/products/" />} 
              />
              {/* 
                If you still need to access the old ProductsPage for other purposes 
                (e.g., internal linking or specific component previews), 
                you could assign it a different path, for example:
                <Route path="/internal-products-listing" element={<ProductsPage />} />
              */}
              <Route path="/product/:id" element={<ProductDetailPage />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/faq" element={<FAQPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/animation-demo" element={<AnimationDemoPage />} />
              <Route path="/privacy" element={<PrivacyPolicyPage />} />
              <Route path="/terms" element={<TermsOfServicePage />} />
              <Route path="/shipping" element={<ShippingPolicyPage />} />
            </Routes>
          </main>
          <Footer />
          <ScrollToTop />
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;
