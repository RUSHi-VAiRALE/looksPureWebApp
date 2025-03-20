'use client'
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { FaStar } from "react-icons/fa";
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

export default function TrendingProducts({
  title = "TRENDING AT LOOKSPURE",
  categories = ["NEW LAUNCHES", "BESTSELLERS"],
  productData = [],
  viewAllLinks = ["/new-launches", "/bestsellers"],
  showRatings = true
}) {
  const [activeCategory, setActiveCategory] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  
  // Reset index when category changes
  useEffect(() => {
    setCurrentIndex(0);
  }, [activeCategory]);

  const handleCategoryChange = (index) => {
    if (index === activeCategory) return;
    
    setIsTransitioning(true);
    setTimeout(() => {
      setActiveCategory(index);
      setTimeout(() => {
        setIsTransitioning(false);
      }, 300);
    }, 300);
  };

  const getVisibleProducts = () => {
    if (typeof window !== 'undefined') {
      const width = window.innerWidth
      if (width >= 1280) return 4 // Desktop
      if (width >= 1024) return 3 // Laptop
      if (width >= 768) return 2 // Tablet
      return 1 // Mobile
    }
    return 4
  }

  const next = () => {
    const products = productData[activeCategory] || [];
    const visibleProducts = getVisibleProducts();
    setCurrentIndex((prev) => 
      Math.min(prev + visibleProducts, products.length - visibleProducts)
    );
  }

  const prev = () => {
    const visibleProducts = getVisibleProducts();
    setCurrentIndex((prev) => Math.max(prev - visibleProducts, 0));
  }

  const products = productData[activeCategory] || [];
  const viewAllLink = viewAllLinks[activeCategory] || "#";

  return (
    <section className="py-12 px-4 max-w-7xl mx-auto">
      {title && (
        <h2 className="text-center text-sm uppercase tracking-widest text-gray-500 mb-6">
          {title}
        </h2>
      )}
      
      {/* Category Tabs */}
      {categories.length > 1 && (
        <div className="flex justify-center mb-10">
          <div className="inline-flex border-b border-gray-200">
            {categories.map((category, index) => (
              <button
                key={index}
                className={`px-6 py-2 text-base font-medium transition-all duration-300 relative ${
                  activeCategory === index 
                    ? 'text-black' 
                    : 'text-gray-500 hover:text-gray-800'
                }`}
                onClick={() => handleCategoryChange(index)}
              >
                {category}
                {activeCategory === index && (
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-black"></span>
                )}
              </button>
            ))}
          </div>
        </div>
      )}
      
      {/* Products Carousel */}
      <div className="relative">
        <div className="overflow-hidden">
          <div 
            className={`flex transition-all duration-300 ${
              isTransitioning ? 'opacity-0' : 'opacity-100'
            }`}
            style={{ transform: `translateX(-${currentIndex * (100 / getVisibleProducts())}%)` }}
          >
            {products.map((product) => (
              <Link key={product.id} href="/singleProduct/1" className="w-full min-w-[100%] sm:min-w-[50%] lg:min-w-[25%] px-3 group">
                {/* Product Image */}
                <div className="relative mb-4 overflow-hidden bg-gray-100 rounded-sm aspect-square">
                  {product.discount && (
                    <div className="absolute top-2 left-2 z-10 bg-black text-white text-xs px-2 py-1">
                      {product.discount}
                    </div>
                  )}
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-contain p-4 transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                
                {/* Product Info */}
                <h3 className="text-sm font-medium uppercase tracking-wider mb-1">
                  {product.name}
                </h3>
                
                {showRatings && (
                  <div className="flex items-center mb-2">
                    <div className="flex mr-2">
                      {[...Array(5)].map((_, i) => (
                        <FaStar key={i} className="text-yellow-400 w-3 h-3" />
                      ))}
                    </div>
                    <span className="text-xs text-gray-500">({product.reviews})</span>
                  </div>
                )}
                
                <div className="flex items-center">
                  <span className="font-medium">₹{product.price.toFixed(2)}</span>
                  {product.originalPrice && (
                    <span className="ml-2 text-sm text-gray-500 line-through">
                      ₹{product.originalPrice.toFixed(2)}
                    </span>
                  )}
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Navigation Buttons */}
        {products.length > getVisibleProducts() && (
          <>
            <button
              onClick={prev}
              disabled={currentIndex === 0}
              className="absolute left-0 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full shadow-md disabled:opacity-50 z-10"
            >
              <FiChevronLeft size={24} />
            </button>
            <button
              onClick={next}
              disabled={currentIndex >= products.length - getVisibleProducts()}
              className="absolute right-0 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full shadow-md disabled:opacity-50 z-10"
            >
              <FiChevronRight size={24} />
            </button>
          </>
        )}
      </div>

      {/* View All Button */}
      {viewAllLink && (
        <div className="flex justify-center mt-10">
          <Link 
            href={viewAllLink}
            className="px-8 py-3 border border-black text-black hover:bg-black hover:text-white transition-colors duration-300 uppercase text-sm tracking-wider font-medium"
          >
            View All
          </Link>
        </div>
      )}
    </section>
  );
}