'use client'
import Link from "next/link";
import { useState } from "react";
import { FiSearch, FiShoppingCart, FiStar, FiUser } from 'react-icons/fi';

export default function MainNavbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-white backdrop-blur-sm bg-opacity-90 sticky top-0 z-50 border-b border-gray-100">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center group">
            <span className="text-3xl font-serif font-bold bg-gradient-to-r from-emerald-500 to-teal-600 bg-clip-text text-transparent transition-all duration-300 group-hover:from-teal-600 group-hover:to-emerald-500">
              LooksPure
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-gray-700 hover:text-emerald-500 text-lg font-medium transition-colors duration-200 relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 hover:after:w-full after:bg-emerald-500 after:transition-all">
              Home
            </Link>
            <Link href="/shop" className="text-gray-700 hover:text-emerald-500 text-lg font-medium transition-colors duration-200 relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 hover:after:w-full after:bg-emerald-500 after:transition-all">
              Shop
            </Link>
            <Link href="/bestseller" className="text-gray-700 hover:text-emerald-500 text-lg font-medium transition-colors duration-200 relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 hover:after:w-full after:bg-emerald-500 after:transition-all">
              Bestseller
            </Link>
            <Link href="/skincare" className="text-gray-700 hover:text-emerald-500 text-lg font-medium transition-colors duration-200 relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 hover:after:w-full after:bg-emerald-500 after:transition-all">
              Skin Care
            </Link>
            <Link href="/track" className="text-gray-700 hover:text-emerald-500 text-lg font-medium transition-colors duration-200 relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 hover:after:w-full after:bg-emerald-500 after:transition-all">
              Track Order
            </Link>
          </div>

          {/* Icons */}
          <div className="hidden md:flex items-center space-x-4 ml-6">
            <button className="text-gray-700 hover:text-emerald-500 p-2 rounded-full hover:bg-gray-100 transition-colors duration-200">
              <FiStar size={22} />
            </button>
            <button className="text-gray-700 hover:text-emerald-500 p-2 rounded-full hover:bg-gray-100 transition-colors duration-200">
              <FiShoppingCart size={22} />
            </button>
            <button className="text-gray-700 hover:text-emerald-500 p-2 rounded-full hover:bg-gray-100 transition-colors duration-200">
              <FiSearch size={20} />
            </button>
            <button className="text-gray-700 hover:text-emerald-500 p-2 rounded-full hover:bg-gray-100 transition-colors duration-200">
              <FiUser size={22} />
            </button>
          </div>
          
          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-4">
            <button className="text-gray-700 hover:text-emerald-500 p-2 rounded-full hover:bg-gray-100 transition-colors duration-200">
              <FiSearch size={20} />
            </button>
            <button className="text-gray-700 hover:text-emerald-500 p-2 rounded-full hover:bg-gray-100 transition-colors duration-200">
              <FiShoppingCart size={20} />
            </button>
            <button 
              className="text-gray-700 hover:text-emerald-500 p-2 rounded-full hover:bg-gray-100 transition-colors duration-200"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-3 border-t border-gray-100 animate-fadeIn">
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