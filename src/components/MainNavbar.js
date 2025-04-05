'use client'
import Link from "next/link";
import { useState, useEffect } from "react";
import { FiSearch, FiShoppingCart, FiStar, FiUser, FiX } from 'react-icons/fi';
import { usePathname } from 'next/navigation';
import { useCart } from '@/context/CartContext';
import MobileMenu from './MobileMenu';
import SearchDialog from './SearchDialog';
import { FaShippingFast } from "react-icons/fa";
import logo from "../../public/2.png"
import Image from "next/image";

export default function MainNavbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const pathname = usePathname();
  
  // Check if current page should have forced scrolled style
  const shouldForceScrolledStyle = pathname.includes('/singleProduct/') || pathname.includes('/track') || pathname.includes('/cart') || pathname.includes('/values')
  || pathname.includes('/privacy') || pathname.includes('/terms')||pathname.includes('/disclaimer') || pathname.includes('/corporate')||pathname.includes('/knowledge')
  ||pathname.includes('/faqs') || pathname.includes('/help') || pathname.includes('/return-policy');
  
  // Set initial scrolled state based on the current page
  useEffect(() => {
    if (shouldForceScrolledStyle && window.scrollY > 10) {
      console.log(shouldForceScrolledStyle)
      setScrolled(true);
    }
  }, [pathname, shouldForceScrolledStyle]);
  
  // Changed to treat all pages like home page
  const isHomePage = true;
  
  // Get cart state and functions
  const { cart, cartOpen, setCartOpen, getCartCount } = useCart();
  const cartItemCount = getCartCount();

  // Function to check if a route is active - improved to handle any path
  const isActive = (path) => {
    if (path === '/') {
      return pathname === '/';
    }
    
    // Handle dynamic routes like /singleProduct/[id]
    if (pathname.includes('/singleProduct/')) {
      if (path === '/singleProduct') {
        return true;
      }
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
        
        // Control announcement bar visibility on all pages now
        const announcementBar = document.querySelector('.announcement-bar');
        if (announcementBar) {
          if (isScrolled) {
            announcementBar.style.transform = 'translateY(-100%)';
          } else {
            announcementBar.style.transform = 'translateY(0)';
          }
        }
      }
    };

    // Prevent body scroll when menu is open
    if (isMenuOpen || isSearchOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.body.style.overflow = '';
    };
  }, [scrolled, isHomePage, isMenuOpen, isSearchOpen, shouldForceScrolledStyle]);

  // Determine if we should apply scrolled styles (either actually scrolled or hovered or forced)
  const shouldApplyScrolledStyles = scrolled || isHovered || shouldForceScrolledStyle;

  // Updated navClasses to apply to all pages
  const navClasses = `fixed ${scrolled ? 'top-0' : 'top-[36px]'} w-full z-40 transition-all duration-300 ${
    shouldApplyScrolledStyles ? 'bg-white shadow-md' : 'bg-transparent'
  }`;

  // Updated textClasses to apply to all pages
  const textClasses = shouldApplyScrolledStyles
    ? 'text-gray-700 hover:text-black after:bg-black'
    : 'text-white hover:text-white after:bg-white';

  // Updated iconClasses to apply to all pages
  const iconClasses = shouldApplyScrolledStyles
    ? 'text-gray-700 hover:text-black hover:bg-gray-100'
    : 'text-white hover:text-white hover:bg-white/20';

  // Updated logoClasses to apply to all pages
  const logoClasses = shouldApplyScrolledStyles
    ? 'bg-black bg-clip-text text-transparent'
    : 'text-white';

  // Update the getNavLinkClasses to apply to all pages
  const getNavLinkClasses = (path) => {
    const baseClasses = "text-md transition-colors duration-200 relative after:absolute after:bottom-0 after:left-0 after:h-0.5";
    const activeIndicator = isActive(path) ? 'after:w-full' : 'after:w-0 hover:after:w-full';
    const afterTransition = "after:transition-all";
    
    if (shouldApplyScrolledStyles) {
      return `${baseClasses} ${activeIndicator} ${afterTransition} ${
        isActive(path) 
          ? 'text-black after:bg-black' 
          : 'text-gray-700 hover:text-black after:bg-black'
      }`;
    } else {
      return `${baseClasses} ${activeIndicator} ${afterTransition} ${
        isActive(path) 
          ? 'text-white after:bg-white font-semibold' 
          : 'text-white hover:text-black after:bg-black'
      }`;
    }
  };

  return (
    <>
      <nav 
        className={navClasses}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className={`container mx-auto px-6 max-w-7xl ${shouldApplyScrolledStyles ? 'bg-white' : 'bg-transparent'}`}>
          <div className={`flex items-center justify-between h-16 ${shouldApplyScrolledStyles ? 'bg-white' : 'bg-transparent'}`}>
            {/* Mobile Menu Button */}
            <div className="lg:hidden order-1">
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
            <Link href="/" className="flex items-center gap-1 group order-2 lg:order-2 mx-auto md:mx-0">
              <Image 
                src={logo}
                alt="logo"
                width={30}
                height={30}
                className="object-contain"
              />
              <span className={`text-3xl font-serif font-bold transition-all duration-300 ${logoClasses}`}>
                LooksPure
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-12 order-2">
              <Link href="/new" className={getNavLinkClasses('/new')}>
                New
              </Link>
              <Link href="/skincare" className={getNavLinkClasses('/skincare')}>
                Skin Care
              </Link>
              <Link href="/offers" className={getNavLinkClasses('/offers')}>
                Offers
              </Link>
              <Link href="/bestseller" className={getNavLinkClasses('/bestseller')}>
                Bestseller
              </Link>
              
              {/* <Link href="" className={getNavLinkClasses('/track')}>
                Track Order
              </Link> */}
            </div>

            {/* Icons - Right side */}
            <div className="flex items-center space-x-2 md:space-x-4 order-3">
             <button 
                onClick={() => setIsSearchOpen(true)}
                className={`p-2 rounded-full transition-colors duration-200 ${
                  shouldApplyScrolledStyles 
                    ? 'text-gray-700 hover:text-black hover:bg-gray-100' 
                    : 'text-white hover:text-white hover:bg-white/20'
                }`}
              >
                <FiSearch size={22} />
              </button>
              <button className={`hidden md:block p-2 rounded-full transition-colors duration-200 ${
                shouldApplyScrolledStyles 
                  ? 'text-gray-700 hover:text-black hover:bg-gray-100' 
                  : 'text-white hover:text-white hover:bg-white/20'
              }`}>
                <FiUser size={22} />
              </button>
              <Link href="/cart" 
                className={`p-2 rounded-full transition-colors duration-200 relative ${
                  shouldApplyScrolledStyles 
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
              </Link>
              <Link href="/track" className={`hidden md:block p-2 rounded-full transition-colors duration-200 ${
                shouldApplyScrolledStyles 
                  ? 'text-gray-700 hover:text-black hover:bg-gray-100' 
                  : 'text-white hover:text-white hover:bg-white/20'
              }`}>
                <FaShippingFast size={22}/>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Use the SearchDialog component */}
      <SearchDialog isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />

      {/* Use the MobileMenu component */}
      <MobileMenu 
        isOpen={isMenuOpen} 
        onClose={() => setIsMenuOpen(false)} 
        isActive={isActive} 
      />
    </>
  );
}