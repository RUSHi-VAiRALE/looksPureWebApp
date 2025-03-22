'use client'
import Link from "next/link";
import { useState, useEffect } from "react";
import { FiSearch, FiShoppingCart, FiStar, FiUser } from 'react-icons/fi';
import { usePathname } from 'next/navigation';
import { useCart } from '@/context/CartContext';

export default function MainNavbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const isHomePage = pathname === '/';
  
  // Get cart state and functions
  const { cart, cartOpen, setCartOpen, getCartCount } = useCart();
  const cartItemCount = getCartCount();

  // Function to check if a route is active
  const isActive = (path) => {
    if (path === '/') {
      return pathname === '/';
    }
    return pathname.startsWith(path);
  };

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
        
        // Control announcement bar visibility only on homepage
        if (isHomePage) {
          const announcementBar = document.querySelector('.announcement-bar');
          if (announcementBar) {
            if (isScrolled) {
              announcementBar.style.transform = 'translateY(-100%)';
            } else {
              announcementBar.style.transform = 'translateY(0)';
            }
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [scrolled, isHomePage]);

  const navClasses = isHomePage
    ? `fixed ${scrolled ? 'top-0' : 'top-[36px]'} w-full z-40 transition-all duration-300 ${
        scrolled ? 'bg-white shadow-md' : 'bg-transparent'
      }`
    : 'fixed top-[36px] w-full z-40 bg-white shadow-md';

  const textClasses = isHomePage
    ? scrolled
      ? 'text-gray-700 hover:text-black after:bg-black'
      : 'text-white hover:text-white after:bg-white'
    : 'text-gray-700 hover:text-black after:bg-black';

  const iconClasses = isHomePage
    ? scrolled
      ? 'text-gray-700 hover:text-black hover:bg-gray-100'
      : 'text-white hover:text-white hover:bg-white/20'
    : 'text-gray-700 hover:text-black hover:bg-gray-100';

  const logoClasses = isHomePage
    ? scrolled
      ? 'bg-black bg-clip-text text-transparent'
      : 'text-white'
    : 'bg-black bg-clip-text text-transparent';

  // Update the textClasses to always include black for active routes
  const getNavLinkClasses = (path) => {
    const baseClasses = "text-lg font-medium transition-colors duration-200 relative after:absolute after:bottom-0 after:left-0 after:h-0.5";
    const activeIndicator = isActive(path) ? 'after:w-full' : 'after:w-0 hover:after:w-full';
    const afterTransition = "after:transition-all";
    
    if (!isHomePage || scrolled) {
      return `${baseClasses} ${activeIndicator} ${afterTransition} ${
        isActive(path) 
          ? 'text-black after:bg-black' 
          : 'text-gray-700 hover:text-black after:bg-black'
      }`;
    } else {
      return `${baseClasses} ${activeIndicator} ${afterTransition} ${
        isActive(path) 
          ? 'text-black after:bg-white font-semibold' 
          : 'text-white hover:text-white after:bg-white'
      }`;
    }
  };

  return (
    <nav className={navClasses}>
      <div className={`container mx-auto px-6 max-w-7xl ${!isHomePage || scrolled ? 'bg-white' : 'bg-transparent'}`}>
        <div className={`flex items-center justify-between h-20 ${!isHomePage || scrolled ? 'bg-white' : 'bg-transparent'}`}>
          {/* Mobile Menu Button */}
          <div className="md:hidden order-1">
            <button 
              className={`p-2 rounded-full transition-colors duration-200 ${iconClasses}`}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>

          {/* Logo */}
          <Link href="/" className="flex items-center group order-2 md:order-1 mx-auto md:mx-0">
            <span className={`text-3xl font-serif font-bold transition-all duration-300 ${logoClasses}`}>
              LooksPure
            </span>
          </Link>

          {/* Rest of your navigation code remains the same, just update the className strings 
              to use textClasses and iconClasses variables instead of the conditional classes */}
          <div className="hidden md:flex items-center space-x-8 order-2">
            <Link href="/" className={getNavLinkClasses('/')}>
              Home
            </Link>
            <Link href="/shop" className={getNavLinkClasses('/shop')}>
              Shop
            </Link>
            <Link href="/bestseller" className={getNavLinkClasses('/bestseller')}>
              Bestseller
            </Link>
            <Link href="/skincare" className={getNavLinkClasses('/skincare')}>
              Skin Care
            </Link>
            <Link href="/track" className={getNavLinkClasses('/track')}>
              Track Order
            </Link>
          </div>

          {/* Icons - Right side */}
          <div className="flex items-center space-x-2 md:space-x-4 order-3">
            <button 
              onClick={() => setCartOpen(true)}
              className={`p-2 rounded-full transition-colors duration-200 relative ${
                !isHomePage || scrolled 
                  ? 'text-gray-700 hover:text-black hover:bg-gray-100' 
                  : 'text-white hover:text-white hover:bg-white/20'
              }`}
            >
              <FiShoppingCart size={22} />
              {cartItemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-black text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {cartItemCount > 9 ? '9+' : cartItemCount}
                </span>
              )}
            </button>
            
            <button className={`hidden md:block p-2 rounded-full transition-colors duration-200 ${
              !isHomePage || scrolled 
                ? 'text-gray-700 hover:text-emerald-500 hover:bg-gray-100' 
                : 'text-white hover:text-white hover:bg-white/20'
            }`}>
              <FiStar size={22} />
            </button>
            <button className={`hidden md:block p-2 rounded-full transition-colors duration-200 ${
              !isHomePage || scrolled 
                ? 'text-gray-700 hover:text-emerald-500 hover:bg-gray-100' 
                : 'text-white hover:text-white hover:bg-white/20'
            }`}>
              <FiSearch size={22} />
            </button>
            <button className={`hidden md:block p-2 rounded-full transition-colors duration-200 ${
              !isHomePage || scrolled 
                ? 'text-gray-700 hover:text-emerald-500 hover:bg-gray-100' 
                : 'text-white hover:text-white hover:bg-white/20'
            }`}>
              <FiUser size={22} />
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-3 border-t border-gray-100 animate-fadeIn bg-white">
            <div className="px-2 space-y-1">
              <Link href="/" className={`block px-4 py-3 rounded-lg transition-colors ${
                isActive('/') ? 'text-black bg-gray-50' : 'text-gray-700 hover:text-black hover:bg-gray-50'
              }`}>
                Home
              </Link>
              <Link href="/shop" className={`block px-4 py-3 rounded-lg transition-colors ${isActive('/shop') 
                ? 'text-black bg-gray-50' 
                : 'text-gray-700 hover:text-black hover:bg-gray-50'}`}>
                Shop
              </Link>
              <Link href="/bestseller" className={`block px-4 py-3 rounded-lg transition-colors ${isActive('/bestseller') 
                ? 'text-black bg-gray-50' 
                : 'text-gray-700 hover:text-black hover:bg-gray-50'}`}>
                Bestseller
              </Link>
              <Link href="/skincare" className={`block px-4 py-3 rounded-lg transition-colors ${isActive('/skincare') 
                ? 'text-black bg-gray-50' 
                : 'text-gray-700 hover:text-black hover:bg-gray-50'}`}>
                Skin Care
              </Link>
              <Link href="/track" className={`block px-4 py-3 rounded-lg transition-colors ${isActive('/track') 
                ? 'text-black bg-gray-50' 
                : 'text-gray-700 hover:text-black hover:bg-gray-50'}`}>
                Track Order
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}