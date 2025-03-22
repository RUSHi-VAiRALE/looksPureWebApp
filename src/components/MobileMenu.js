'use client'
import Link from "next/link";
import { FiSearch, FiStar, FiUser, FiX } from 'react-icons/fi';

export default function MobileMenu({ isOpen, onClose, isActive }) {
  return (
    <>
      {/* Full Screen Mobile Menu - Slides from left to right */}
      <div 
        className={`fixed inset-0 bg-white z-50 transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="h-full flex flex-col">
          <div className="flex justify-between items-center p-6 border-b">
            <Link href="/" className="text-3xl font-serif font-bold text-black">
              LooksPure
            </Link>
            <button 
              onClick={onClose}
              className="p-2 rounded-full hover:bg-gray-100"
            >
              <FiX size={24} />
            </button>
          </div>
          
          <div className="flex-1 overflow-y-auto py-8 px-6">
            <div className="space-y-6">
              <Link 
                href="/" 
                className={`block text-2xl font-medium py-3 border-b border-gray-100 ${
                  isActive('/') ? 'text-black' : 'text-gray-700'
                }`}
              >
                New
              </Link>
              <Link 
                href="/skincare" 
                className={`block text-2xl font-medium py-3 border-b border-gray-100 ${
                  isActive('/skincare') ? 'text-black' : 'text-gray-700'
                }`}
              >
                Skin Care
              </Link>
              <Link 
                href="/Offers" 
                className={`block text-2xl font-medium py-3 border-b border-gray-100 ${
                  isActive('/skincare') ? 'text-black' : 'text-gray-700'
                }`}
              >
                Offers
              </Link>
              <Link 
                href="/bestseller" 
                className={`block text-2xl font-medium py-3 border-b border-gray-100 ${
                  isActive('/bestseller') ? 'text-black' : 'text-gray-700'
                }`}
              >
                Bestseller
              </Link>
              
              <Link 
                href="/track" 
                className={`block text-2xl font-medium py-3 border-b border-gray-100 ${
                  isActive('/track') ? 'text-black' : 'text-gray-700'
                }`}
              >
                Track Order
              </Link>
            </div>
            
            <div className="mt-12 space-y-6">
              <div className="flex items-center space-x-4 py-3">
                <FiUser size={22} />
                <span className="text-lg">Account</span>
              </div>
              <div className="flex items-center space-x-4 py-3">
                <FiStar size={22} />
                <span className="text-lg">Wishlist</span>
              </div>
              <div className="flex items-center space-x-4 py-3">
                <FiSearch size={22} />
                <span className="text-lg">Search</span>
              </div>
            </div>
          </div>
          
          <div className="p-6 border-t">
            <div className="flex justify-center space-x-6">
              <a href="#" className="text-gray-600 hover:text-black">
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162 0 3.403 2.759 6.162 6.162 6.162 3.403 0 6.162-2.759 6.162-6.162 0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>
              <a href="#" className="text-gray-600 hover:text-black">
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Overlay for when menu is open */}
      <div 
        className={`fixed inset-0 bg-black/50 z-40 transition-opacity duration-300 ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
      ></div>
    </>
  );
}