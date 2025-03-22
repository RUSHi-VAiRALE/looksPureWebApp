'use client'
import Hero from '@/components/Hero';
import ProductGrid from '@/components/ProductGrid';
import { useState } from 'react';

export default function ShopPage() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const categories = ['All', 'Skincare', 'Makeup', 'Hair Care', 'Body Care', 'Fragrance'];

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <Hero />
      
      {/* Shop Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">Our Products</h1>
        
        {/* Category Filter */}
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
              {category}
            </button>
          ))}
        </div>
        
        {/* Product Grid */}
        <ProductGrid category={selectedCategory} />
      </div>
    </main>
  );
}