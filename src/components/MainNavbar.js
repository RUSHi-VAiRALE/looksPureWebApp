'use client'
import Link from "next/link";
import { useState, useEffect } from "react";
import { FiSearch, FiShoppingCart, FiStar, FiUser } from 'react-icons/fi';
import { usePathname } from 'next/navigation';
import { useCart } from '@/context/CartContext';
import MobileMenu from './MobileMenu';

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

  // Close menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

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

    // Prevent body scroll when menu is open
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.body.style.overflow = '';
    };
  }, [scrolled, isHomePage, isMenuOpen]);

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
    <>
      <nav className={navClasses}>
        <div className={`container mx-auto px-6 max-w-7xl ${!isHomePage || scrolled ? 'bg-white' : 'bg-transparent'}`}>
          <div className={`flex items-center justify-between h-20 ${!isHomePage || scrolled ? 'bg-white' : 'bg-transparent'}`}>
            {/* Mobile Menu Button */}
            <div className="md:hidden order-1">
              <button 
                className={`p-2 rounded-full transition-colors duration-200 ${iconClasses}`}
                onClick={() => setIsMenuOpen(true)}
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

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8 order-2">
              <Link href="/" className={getNavLinkClasses('/')}>
                New
              </Link>
              <Link href="/skincare" className={getNavLinkClasses('/skincare')}>
                Skin Care
              </Link>
              <Link href="/offers" className={getNavLinkClasses('/skincare')}>
                Offers
              </Link>
              <Link href="/bestseller" className={getNavLinkClasses('/bestseller')}>
                Bestseller
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
        </div>
      </nav>

      {/* Use the MobileMenu component */}
      <MobileMenu 
        isOpen={isMenuOpen} 
        onClose={() => setIsMenuOpen(false)} 
        isActive={isActive} 
      />
    </>
  );
}