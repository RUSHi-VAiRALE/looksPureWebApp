'use client'
import { useState } from 'react'
import ProductCard from './ProductCard'
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi'

export default function ProductCarousel({ title, description, products }) {
  const [currentIndex, setCurrentIndex] = useState(0)

  const getVisibleProducts = () => {
    if (typeof window !== 'undefined') {
      const width = window.innerWidth
      if (width >= 1280) return 4 // Desktop
      if (width >= 1024) return 3 // Laptop
      if (width >= 768) return 3 // Tablet
      return 1 // Mobile
    }
    return 4
  }

  const next = () => {
    const visibleProducts = getVisibleProducts()
    setCurrentIndex((prev) => 
      Math.min(prev + visibleProducts, products.length - visibleProducts)
    )
  }

  const prev = () => {
    const visibleProducts = getVisibleProducts()
    setCurrentIndex((prev) => Math.max(prev - visibleProducts, 0))
  }

  return (
    <section className="py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
            <p className="text-gray-600 mt-1">{description}</p>
          </div>
          <button className="text-emerald-500 hover:text-emerald-600">
            VIEW ALL
          </button>
        </div>

        {/* Carousel */}
        <div className="relative">
          <div className="overflow-hidden">
            <div 
              className="flex transition-transform duration-300 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * (100 / getVisibleProducts())}%)` }}
            >
              {products.map((product) => (
                <div 
                  key={product.id}
                  className="w-full min-w-[100%] sm:min-w-[33.333%] lg:min-w-[25%] px-2"
                >
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Buttons */}
          <button
            onClick={prev}
            disabled={currentIndex === 0}
            className="absolute left-0 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full shadow-md disabled:opacity-50"
          >
            <FiChevronLeft size={24} />
          </button>
          <button
            onClick={next}
            disabled={currentIndex >= products.length - getVisibleProducts()}
            className="absolute right-0 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full shadow-md disabled:opacity-50"
          >
            <FiChevronRight size={24} />
          </button>
        </div>
      </div>
    </section>
  )
}