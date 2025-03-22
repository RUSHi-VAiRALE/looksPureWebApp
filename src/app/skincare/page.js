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
      
      <div className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Why Choose Our Skincare</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg p-8 text-center shadow-sm hover:shadow-md transition-shadow">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 text-black mb-4">
                <FaLeaf className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold mb-2">100% Natural</h3>
              <p className="text-gray-600">
                All our products are made with natural ingredients, free from harmful chemicals.
              </p>
            </div>
            
            <div className="bg-white rounded-lg p-8 text-center shadow-sm hover:shadow-md transition-shadow">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 text-black mb-4">
                <FaSpa className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Gentle Formulas</h3>
              <p className="text-gray-600">
                Gentle yet effective formulations suitable for all skin types.
              </p>
            </div>
            
            <div className="bg-white rounded-lg p-8 text-center shadow-sm hover:shadow-md transition-shadow">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 text-black mb-4">
                <FaShieldAlt className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Dermatologist Tested</h3>
              <p className="text-gray-600">
                All products are dermatologically tested and approved for daily use.
              </p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Newsletter */}
      <div className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-black rounded-2xl p-8 md:p-12 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">Join Our Skincare Community</h2>
          <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
            Subscribe to our newsletter for skincare tips, product updates, and exclusive offers.
          </p>
          <form className="max-w-md mx-auto flex flex-col sm:flex-row gap-2">
            <input
              type="email"
              placeholder="Your email address"
              className="flex-grow px-4 py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-white"
            />
            <button
              type="submit"
              className="bg-white text-black px-6 py-3 rounded-md font-medium hover:bg-gray-100 transition-colors"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}