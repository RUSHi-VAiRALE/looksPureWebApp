'use client'
import Link from "next/link";
import { useState, useEffect } from "react";
import { FiSearch, FiShoppingCart, FiStar, FiUser } from 'react-icons/fi';

export default function MainNavbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
        
        // Control announcement bar visibility
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

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [scrolled]);

  return (
    <nav className={`fixed ${scrolled ? 'top-0' : 'top-[36px]'} w-full z-40 transition-all duration-300 ${
      scrolled 
        ? 'bg-white shadow-md' 
        : 'bg-transparent'
    }`}>
      <div className={`container mx-auto px-6 max-w-7xl transition-all duration-300 ${
        scrolled ? 'bg-white' : 'bg-transparent'
      }`}>
        <div className={`flex items-center justify-between h-20 transition-all duration-300 ${
          scrolled ? 'bg-white' : 'bg-transparent'
        }`}>
          {/* Mobile Menu Button - Left side on mobile */}
          <div className="md:hidden order-1">
            <button 
              className={`p-2 rounded-full transition-colors duration-200 ${
                scrolled 
                  ? 'text-gray-700 hover:text-emerald-500 hover:bg-gray-100' 
                  : 'text-white hover:text-white hover:bg-white/20'
              }`}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>

          {/* Logo - Center on mobile */}
          <Link href="/" className="flex items-center group order-2 md:order-1 mx-auto md:mx-0">
            <span className={`text-3xl font-serif font-bold transition-all duration-300 ${
              scrolled
                ? 'bg-gradient-to-r from-emerald-500 to-teal-600 bg-clip-text text-transparent'
                : 'text-white'
            }`}>
              LooksPure
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8 order-2">
            <Link href="/" className={`text-lg font-medium transition-colors duration-200 relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 hover:after:w-full after:transition-all ${
              scrolled 
                ? 'text-gray-700 hover:text-emerald-500 after:bg-emerald-500' 
                : 'text-white hover:text-white after:bg-white'
            }`}>
              Home
            </Link>
            <Link href="/shop" className={`text-lg font-medium transition-colors duration-200 relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 hover:after:w-full after:transition-all ${
              scrolled 
                ? 'text-gray-700 hover:text-emerald-500 after:bg-emerald-500' 
                : 'text-white hover:text-white after:bg-white'
            }`}>
              Shop
            </Link>
            <Link href="/bestseller" className={`text-lg font-medium transition-colors duration-200 relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 hover:after:w-full after:transition-all ${
              scrolled 
                ? 'text-gray-700 hover:text-emerald-500 after:bg-emerald-500' 
                : 'text-white hover:text-white after:bg-white'
            }`}>
              Bestseller
            </Link>
            <Link href="/skincare" className={`text-lg font-medium transition-colors duration-200 relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 hover:after:w-full after:transition-all ${
              scrolled 
                ? 'text-gray-700 hover:text-emerald-500 after:bg-emerald-500' 
                : 'text-white hover:text-white after:bg-white'
            }`}>
              Skin Care
            </Link>
            <Link href="/track" className={`text-lg font-medium transition-colors duration-200 relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 hover:after:w-full after:transition-all ${
              scrolled 
                ? 'text-gray-700 hover:text-emerald-500 after:bg-emerald-500' 
                : 'text-white hover:text-white after:bg-white'
            }`}>
              Track Order
            </Link>
          </div>

          {/* Icons - Right side */}
          <div className="flex items-center space-x-2 md:space-x-4 order-3">
            <button className={`p-2 rounded-full transition-colors duration-200 ${
              scrolled 
                ? 'text-gray-700 hover:text-emerald-500 hover:bg-gray-100' 
                : 'text-white hover:text-white hover:bg-white/20'
            }`}>
              <FiShoppingCart size={22} />
            </button>
            <button className={`hidden md:block p-2 rounded-full transition-colors duration-200 ${
              scrolled 
                ? 'text-gray-700 hover:text-emerald-500 hover:bg-gray-100' 
                : 'text-white hover:text-white hover:bg-white/20'
            }`}>
              <FiStar size={22} />
            </button>
            <button className={`hidden md:block p-2 rounded-full transition-colors duration-200 ${
              scrolled 
                ? 'text-gray-700 hover:text-emerald-500 hover:bg-gray-100' 
                : 'text-white hover:text-white hover:bg-white/20'
            }`}>
              <FiSearch size={22} />
            </button>
            <button className={`hidden md:block p-2 rounded-full transition-colors duration-200 ${
              scrolled 
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
              <Link href="/" className="block px-4 py-3 text-gray-700 hover:text-emerald-500 hover:bg-gray-50 rounded-lg transition-colors">
                Home
              </Link>
              <Link href="/shop" className="block px-4 py-3 text-gray-700 hover:text-emerald-500 hover:bg-gray-50 rounded-lg transition-colors">
                Shop
              </Link>
              <Link href="/bestseller" className="block px-4 py-3 text-gray-700 hover:text-emerald-500 hover:bg-gray-50 rounded-lg transition-colors">
                Bestseller
              </Link>
              <Link href="/skincare" className="block px-4 py-3 text-gray-700 hover:text-emerald-500 hover:bg-gray-50 rounded-lg transition-colors">
                Skin Care
              </Link>
              <Link href="/track" className="block px-4 py-3 text-gray-700 hover:text-emerald-500 hover:bg-gray-50 rounded-lg transition-colors">
                Track Order
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}