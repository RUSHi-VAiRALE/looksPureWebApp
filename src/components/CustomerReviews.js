'use client'
import { useState, useEffect } from "react";
import Image from "next/image";
import { FaStar } from "react-icons/fa";
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

export default function CustomerReviews({
  title = "What Our Customers Say",
  reviewsData = []
}) {
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const getVisibleReviews = () => {
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
    const visibleReviews = getVisibleReviews();
    setCurrentIndex((prev) => 
      Math.min(prev + visibleReviews, reviewsData.length - visibleReviews)
    );
  }

  const prev = () => {
    const visibleReviews = getVisibleReviews();
    setCurrentIndex((prev) => Math.max(prev - visibleReviews, 0));
  }

  return (
    <section className="py-12 px-4 max-w-7xl mx-auto">
      {title && (
        <h2 className="text-2xl font-bold mb-10">
          {title}
        </h2>
      )}
      
      {/* Reviews Carousel */}
      <div className="relative">
        <div className="overflow-hidden">
          <div 
            className={`flex transition-all duration-300 ${
              isTransitioning ? 'opacity-0' : 'opacity-100'
            }`}
            style={{ transform: `translateX(-${currentIndex * (100 / getVisibleReviews())}%)` }}
          >
            {reviewsData.map((review, index) => (
              <div key={index} className="w-full min-w-[100%] sm:min-w-[50%] lg:min-w-[30%] px-3 group">
                <div className="border border-gray-200 rounded-sm p-6 h-full flex flex-col">
                  {/* Review Date */}
                  <div className="flex justify-between">
                  {/* Reviewer Info */}
                  <div className="flex items-center mb-3">
                    <span className="font-medium mr-2">{review.name}</span>
                    {review.verified && (
                      <span className="text-xs text-gray-600">{review.verifiedType}</span>
                    )}
                  </div>
                  <div className="text-right text-xs text-gray-500 mb-2">
                    {review.date}
                  </div>
                  </div>
                  
                  {/* Star Rating */}
                  <div className="flex mb-3">
                    {[...Array(5)].map((_, i) => (
                      <FaStar 
                        key={i} 
                        className={`w-4 h-4 ${i < review.rating ? 'text-black' : 'text-gray-300'}`} 
                      />
                    ))}
                  </div>
                  
                  {/* Review Title */}
                  <h3 className="text-base font-medium mb-2">
                    {review.title}
                  </h3>
                  
                  {/* Review Content */}
                  <p className="text-sm text-gray-600 mb-4 flex-grow">
                    {review.content.length > 120 
                      ? `${review.content.substring(0, 120)}...` 
                      : review.content
                    }
                    {review.content.length > 120 && (
                      <button className="text-black font-medium ml-1">
                        Read more
                      </button>
                    )}
                  </p>
                  
                  {/* Product Info */}
                  <div className="flex items-center mt-auto pt-4 border-t border-gray-100">
                    <div className="w-12 h-12 relative bg-gray-50 mr-3">
                      <Image
                        src={review.productImage}
                        alt={review.productName}
                        fill
                        className="object-contain p-1"
                      />
                    </div>
                    <span className="text-xs">{review.productName}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Navigation Buttons */}
        {reviewsData.length > getVisibleReviews() && (
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
              disabled={currentIndex >= reviewsData.length - getVisibleReviews()}
              className="absolute right-0 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full shadow-md disabled:opacity-50 z-10"
            >
              <FiChevronRight size={24} />
            </button>
          </>
        )}
      </div>
    </section>
  );
}