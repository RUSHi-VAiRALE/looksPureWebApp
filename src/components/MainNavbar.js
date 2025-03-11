'use client'
import Link from "next/link";
import { useState } from "react";
import { FiSearch, FiShoppingCart, FiStar, FiUser } from 'react-icons/fi';

export default function MainNavbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-8 max-w-7xl">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <span className="text-3xl font-serif font-bold bg-gradient-to-r from-emerald-500 to-teal-600 bg-clip-text text-transparent">
              LooksPure
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <Link href="/" className="text-gray-700 hover:text-emerald-500 text-lg">
              Home
            </Link>
            <Link href="/shop" className="text-gray-700 hover:text-emerald-500 text-lg">
              Shop
            </Link>
            <Link href="/bestseller" className="text-gray-700 hover:text-emerald-500 text-lg">
              Bestseller
            </Link>
            <Link href="/skincare" className="text-gray-700 hover:text-emerald-500 text-lg">
              Skin Care
            </Link>
            <Link href="/track" className="text-gray-700 hover:text-emerald-500 text-lg">
              Track Order
            </Link>
          </div>

          {/* Icons */}
          <div className="hidden md:flex items-center space-x-3 ml-6">
            <button className="text-gray-700 hover:text-emerald-500 p-2">
              <FiStar size={22} />
            </button>
            <button className="text-gray-700 hover:text-emerald-500 p-2">
              <FiShoppingCart size={22} />
            </button>
            <button className="text-gray-700 hover:text-emerald-500">
              <FiSearch size={20} />
            </button>
            <button className="text-gray-700 hover:text-emerald-500 p-2">
              <FiUser size={22} />
            </button>
          </div>
          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-4">
            <button className="text-gray-700 hover:text-emerald-500">
              <FiSearch size={20} />
            </button>
            <button className="text-gray-700 hover:text-emerald-500">
              <FiShoppingCart size={20} />
            </button>
            <button 
              className="text-gray-700 hover:text-emerald-500"
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
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <Link href="/" className="block px-3 py-2 text-gray-700 hover:text-emerald-500">
                Home
              </Link>
              <Link href="/shop" className="block px-3 py-2 text-gray-700 hover:text-emerald-500">
                Shop
              </Link>
              <Link href="/bestseller" className="block px-3 py-2 text-gray-700 hover:text-emerald-500">
                Bestseller
              </Link>
              <Link href="/skincare" className="block px-3 py-2 text-gray-700 hover:text-emerald-500">
                Skin Care
              </Link>
              <Link href="/track" className="block px-3 py-2 text-gray-700 hover:text-emerald-500">
                Track Order
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}