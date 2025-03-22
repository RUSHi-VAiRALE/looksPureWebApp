'use client'
import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

export default function PromoBanner({ 
  banners, 
  height = 'half', // 'half' or 'full'
  autoPlay = true,
  interval = 5000,
  title = "DEAL FOR YOU",
  useGradient = false,
  gradientColors = 'from-pink-200 via-purple-200 to-blue-200' // Default gradient colors
}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  
  // Auto-play functionality
  useEffect(() => {
    if (!autoPlay) return;
    
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % banners.length);
    }, interval);
    
    return () => clearInterval(timer);
  }, [autoPlay, interval, banners.length]);
  
  const next = () => {
    setCurrentIndex((prev) => (prev + 1) % banners.length);
  };
  
  const prev = () => {
    setCurrentIndex((prev) => (prev - 1 + banners.length) % banners.length);
  };
  
  // Determine height class based on prop
  const heightClass = height === 'half' 
    ? 'h-[180px] sm:h-[220px] md:h-[250px] lg:h-[280px]' 
    : 'h-[300px] sm:h-[400px] md:h-[450px] lg:h-[500px]';
  
  return (
    <div className={`my-12 ${useGradient ? `bg-gradient-to-r ${gradientColors} py-8 rounded-lg` : ''}`}>
      {/* Title heading */}
      {title && (
        <h2 className="text-center text-xl md:text-2xl font-medium tracking-wider mb-6">
          {title}
        </h2>
      )}
      
      <div className={`relative w-full overflow-hidden ${heightClass} ${useGradient ? 'px-4' : ''}`}>
        {/* Banner Images */}
        <div className="relative w-full h-full">
          {banners.map((banner, index) => (
            <div
              key={banner.id}
              className={`absolute inset-0 transition-opacity duration-500 ${
                index === currentIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'
              }`}
            >
              <Image
                src={banner.image}
                alt={banner.title}
                fill
                className="object-cover"
                priority={index === 0}
              />
              
              {/* Content Overlay */}
              {/* <div className="absolute inset-0 flex items-center">
                <div className="container mx-auto px-4">
                  <div className="max-w-lg">
                    {banner.badge && (
                      <span className="inline-block bg-black text-white text-xs px-3 py-1 mb-3">
                        {banner.badge}
                      </span>
                    )}
                    
                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2">
                      {banner.title}
                    </h2>
                    
                    {banner.subtitle && (
                      <p className="text-sm sm:text-base mb-4">
                        {banner.subtitle}
                      </p>
                    )}
                    
                    {banner.ctaLink && (
                      <Link 
                        href={banner.ctaLink}
                        className="inline-block bg-emerald-500 text-white px-6 py-2 rounded-sm hover:bg-emerald-600 transition-colors"
                      >
                        {banner.ctaText || 'Shop Now'}
                      </Link>
                    )}
                  </div>
                </div>
              </div> */}
            </div>
          ))}
        </div>
        
        {/* Navigation Buttons */}
        <button
          onClick={prev}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-white/80 p-2 rounded-full shadow-md hover:bg-white"
        >
          <FiChevronLeft size={20} />
        </button>
        <button
          onClick={next}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-white/80 p-2 rounded-full shadow-md hover:bg-white"
        >
          <FiChevronRight size={20} />
        </button>
        
        {/* Indicators */}
        <div className="absolute bottom-4 left-0 right-0 z-20 flex justify-center gap-2">
          {banners.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`h-2 w-2 rounded-full transition-all ${
                currentIndex === index 
                  ? 'bg-white w-4' 
                  : 'bg-white/50'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}