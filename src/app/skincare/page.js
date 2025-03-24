'use client'
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FaLeaf, FaSpa, FaShieldAlt } from 'react-icons/fa';
import ProductGrid from '@/components/ProductGrid';
import { getProductsByCategory } from '@/data/products';
import Hero from '@/components/Hero';

export default function SkincarePage() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const categories = ['all', 'dry', 'oily', 'combination', 'sensitive'];
  
  return (
    <main className="min-h-screen">
      {/* Hero Banner */}
      <Hero />
      
      {/* Skin Type Filter */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-8">Shop By Skin Type</h2>

        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                selectedCategory === category
                  ? 'bg-black text-white'
                  : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
              }`}
            >
              {category === 'all' ? 'All Types' : category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>
        
        {/* Product Grid */}
        <ProductGrid category="Skincare" />
      </div>
      
      {/* Newsletter */}
    </main>
  );
}