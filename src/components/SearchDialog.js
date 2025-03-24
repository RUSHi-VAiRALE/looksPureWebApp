'use client'
import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FiSearch, FiX } from 'react-icons/fi';

export default function SearchDialog({ isOpen, onClose }) {
  const searchInputRef = useRef(null);
  const dialogRef = useRef(null);
  const [imagesLoaded, setImagesLoaded] = useState(false);

  // Focus the search input when dialog opens
  useEffect(() => {
    if (isOpen && searchInputRef.current) {
      setTimeout(() => {
        searchInputRef.current.focus();
      }, 100);
    }
  }, [isOpen]);

  // Handle click outside to close
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dialogRef.current && !dialogRef.current.contains(event.target)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4">
      <div 
        ref={dialogRef}
        className="bg-white rounded-lg shadow-2xl w-full max-w-2xl transform transition-all duration-300 ease-in-out"
        style={{ maxHeight: 'calc(100vh - 120px)', overflowY: 'auto' }}
      >
        {/* Search Header */}
        <div className="p-4 border-b border-gray-100">
          <div className="flex justify-between items-center">
            <div className="flex items-center flex-1">
              <FiSearch size={20} className="text-gray-500 mr-2" />
              <input 
                ref={searchInputRef}
                type="text" 
                placeholder="Search products..." 
                className="w-full outline-none text-lg"
              />
            </div>
            <button 
              onClick={onClose}
              className="ml-4 p-2 text-gray-500 hover:text-black rounded-full hover:bg-gray-100"
            >
              <FiX size={20} />
            </button>
          </div>
        </div>
        
        <div className="p-6">
          {/* Popular Choices */}
          <div className="mb-8">
            <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-4 flex items-center">
              <span className="mr-2">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M3 13H11V3H3V13ZM3 21H11V15H3V21ZM13 21H21V11H13V21ZM13 3V9H21V3H13Z" fill="currentColor"/>
                </svg>
              </span>
              Popular Choices
            </h3>
            <div className="flex flex-wrap gap-3">
              <Link href="/foundation" className="border border-gray-300 rounded px-4 py-2 text-sm flex items-center hover:bg-gray-50">
                Skin Care
                <svg className="ml-2" width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M16.01 11H4V13H16.01V16L20 12L16.01 8V11Z" fill="currentColor"/>
                </svg>
              </Link>
              <Link href="/concealer" className="border border-gray-300 rounded px-4 py-2 text-sm flex items-center hover:bg-gray-50">
                Serum
                <svg className="ml-2" width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M16.01 11H4V13H16.01V16L20 12L16.01 8V11Z" fill="currentColor"/>
                </svg>
              </Link>
              <Link href="/lipstick" className="border border-gray-300 rounded px-4 py-2 text-sm flex items-center hover:bg-gray-50">
                Face Wash
                <svg className="ml-2" width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M16.01 11H4V13H16.01V16L20 12L16.01 8V11Z" fill="currentColor"/>
                </svg>
              </Link>
            </div>
          </div>
          
          {/* Recommended For You */}
          <div>
            <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-4 flex items-center">
              <span className="mr-2">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20ZM11 16H13V18H11V16ZM12.61 6.04C10.55 5.74 8.73 7.01 8.18 8.83C8 9.41 8.44 10 9.05 10H9.25C9.66 10 9.99 9.71 10.13 9.33C10.45 8.44 11.4 7.83 12.43 8.05C13.38 8.25 14.08 9.23 14 10.2C13.9 11.26 12.97 11.94 12 12V14C12 14.55 12.45 15 13 15C13.55 15 14 14.55 14 14V13.69C15.5 12.67 16.2 10.72 15.56 8.91C14.96 7.23 13.86 6.15 12.61 6.04Z" fill="currentColor"/>
                </svg>
              </span>
              Recommended For You
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <div className="product-card">
                <div className="bg-gray-100 rounded-lg aspect-square flex items-center justify-center mb-2 overflow-hidden">
                  <img 
                    src="https://cdn.pixabay.com/photo/2015/02/19/19/04/shampoo-642517_1280.jpg" 
                    alt="Hydrating Face Serum" 
                    className="w-full h-full object-cover"
                    crossOrigin="anonymous"
                    loading="lazy"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Crect width='100' height='100' fill='%23f3f4f6'/%3E%3Cpath d='M30,40 L70,40 L70,60 L30,60 Z' fill='%23d1d5db'/%3E%3Ctext x='50' y='50' font-family='sans-serif' font-size='10' text-anchor='middle' alignment-baseline='middle' fill='%236b7280'%3EImage%3C/text%3E%3C/svg%3E";
                    }}
                  />
                </div>
                <h4 className="text-xs uppercase font-medium text-center">Hydrating Face Serum</h4>
                <p className="text-center text-sm font-medium mt-1">RS. 1299</p>
              </div>
              <div className="product-card">
                <div className="bg-gray-100 rounded-lg aspect-square flex items-center justify-center mb-2 overflow-hidden">
                  <img 
                    src="https://cdn.pixabay.com/photo/2019/05/19/07/46/shampoo-4213395_1280.jpg" 
                    alt="Nourishing Face Cream" 
                    className="w-full h-full object-cover"
                    crossOrigin="anonymous"
                    loading="lazy"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Crect width='100' height='100' fill='%23f3f4f6'/%3E%3Cpath d='M30,40 L70,40 L70,60 L30,60 Z' fill='%23d1d5db'/%3E%3Ctext x='50' y='50' font-family='sans-serif' font-size='10' text-anchor='middle' alignment-baseline='middle' fill='%236b7280'%3EImage%3C/text%3E%3C/svg%3E";
                    }}
                  />
                </div>
                <h4 className="text-xs uppercase font-medium text-center">Nourishing Face Cream</h4>
                <p className="text-center text-sm font-medium mt-1">RS. 1299</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Semi-transparent backdrop */}
      <div className="fixed inset-0 bg-black/30 -z-10"></div>
    </div>
  );
}