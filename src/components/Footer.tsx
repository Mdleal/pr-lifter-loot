import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter, Youtube, Dumbbell } from 'lucide-react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = [
    { name: 'About Us', path: '/about' },
    { name: 'Contact Us', path: '/contact' },
    // FAQ link removed
    // { name: 'FAQ', path: '/faq' },
    { name: 'Shipping Policy', path: '/shipping' },
    { name: 'Privacy Policy', path: '/privacy' },
    { name: 'Terms of Service', path: '/terms' },
  ];

  const socialLinks = [
    { name: 'Facebook', icon: <Facebook className="h-6 w-6" />, url: 'https://facebook.com' },
    { name: 'Instagram', icon: <Instagram className="h-6 w-6" />, url: 'https://instagram.com' },
    { name: 'Twitter', icon: <Twitter className="h-6 w-6" />, url: 'https://twitter.com' },
    { name: 'YouTube', icon: <Youtube className="h-6 w-6" />, url: 'https://youtube.com' },
  ];

  return (
    <footer className="bg-gray-800 text-gray-300">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Logo and About */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center text-white">
              <Dumbbell className="h-8 w-8 mr-2 text-sky-400" />
              <span className="font-bold text-xl">PRLifterLoot</span>
            </Link>
            <p className="text-sm">
              Equipping the next generation of lifters with fun, safe, and engaging fitness gear.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-sky-400 transition-colors"
                  aria-label={social.name}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">Quick Links</h3>
            <ul className="mt-4 space-y-2">
              {footerLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="text-base text-gray-300 hover:text-sky-400 transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
               {/* External Products Link */}
               <li>
                <a
                  href="https://wordpress.mike-d82.com/products/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-base text-gray-300 hover:text-sky-400 transition-colors"
                >
                  Products
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter Signup */}
          <div>
            <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">Stay Updated</h3>
            <p className="mt-4 text-base text-gray-300">
              Subscribe to our newsletter for the latest product releases, promotions, and fitness tips for kids.
            </p>
            <form className="mt-4 sm:flex sm:max-w-md">
              <label htmlFor="email-address" className="sr-only">
                Email address
              </label>
              <input
                type="email"
                name="email-address"
                id="email-address"
                autoComplete="email"
                required
                className="appearance-none min-w-0 w-full bg-white border border-transparent rounded-md py-2 px-4 text-base text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-sky-500"
                placeholder="Enter your email"
              />
              <div className="mt-3 rounded-md sm:mt-0 sm:ml-3 sm:flex-shrink-0">
                <button
                  type="submit"
                  className="w-full bg-sky-500 flex items-center justify-center border border-transparent rounded-md py-2 px-4 text-base font-medium text-white hover:bg-sky-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-sky-500"
                >
                  Subscribe
                </button>
              </div>
            </form>
          </div>
        </div>

        <div className="mt-8 border-t border-gray-700 pt-8 text-center">
          <p className="text-base text-gray-400">&copy; {currentYear} PRLifterLoot. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
