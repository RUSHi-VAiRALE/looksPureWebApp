'use client'
import Hero from '@/components/Hero';
import ProductGrid from '@/components/ProductGrid';
import { FaCrown } from 'react-icons/fa';
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function BestsellerPage() {
    const [selectedCategory, setSelectedCategory] = useState('Skincare');
    const categories = ['Skincare', 'Makeup', 'Hair Care', 'Fragrance']
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <Hero />
      
      {/* Bestseller Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <FaCrown className="text-amber-500 mr-2 text-3xl" />
            <h1 className="text-3xl font-bold text-gray-900">Our Bestsellers</h1>
          </div>
          <p className="max-w-2xl mx-auto text-gray-600">
            Discover our most loved products that have won the hearts of our customers. 
            These bestsellers are customer favorites for a reason!
          </p>
        </div>
        
        {/* Featured Bestseller */}

        
        {/* Bestseller Categories */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                selectedCategory === category
                  ? 'bg-emerald-600 text-white'
                  : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
        
        {/* Bestseller Products Grid */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-8">All Bestsellers</h2>
          <ProductGrid bestsellersOnly={true} />
        </div>
      </div>
    </main>
  );
}