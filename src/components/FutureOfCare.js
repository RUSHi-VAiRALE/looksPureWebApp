'use client'
import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi'

export default function FutureOfCare() {
  const headingRef = useRef(null)
  const featureRefs = useRef([])
  const [currentIndex, setCurrentIndex] = useState(0)
  
  useEffect(() => {
    // Simple animation on load
    if (headingRef.current) {
      headingRef.current.classList.add('opacity-100', 'translate-y-0')
    }
    
    featureRefs.current.forEach((ref, index) => {
      if (ref) {
        setTimeout(() => {
          ref.classList.add('opacity-100', 'translate-y-0')
        }, 300 + (index * 150))
      }
    })
  }, [])

  const features = [
    {
      icon: '/icons/transparency.svg', // You'll need to add these icons
      title: 'Transparency',
      description: 'Full disclosure of ingredients used & their concentration'
    },
    {
      icon: '/icons/affordable.svg',
      title: 'Affordable',
      description: 'Skincare accessible to all'
    },
    {
      icon: '/icons/global.svg',
      title: 'Only the best',
      description: 'Ingredients sourced from across the world'
    }
  ]

  const nextFeature = () => {
    setCurrentIndex((prev) => (prev + 1) % features.length)
  }

  const prevFeature = () => {
    setCurrentIndex((prev) => (prev - 1 + features.length) % features.length)
  }

  return (
    <section className="py-16 md:py-24 bg-white max-w-7xl mx-auto">
      <div className="container px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 
            ref={headingRef}
            className="text-3xl md:text-4xl font-bold mb-4 opacity-0 transform translate-y-4 transition-all duration-700"
          >
            The future of personal care is here
          </h2>
          <p className="text-gray-600">
            Embrace Minimalist, where each element is chosen for its scientific merit, offering you authentic, effective skincare solutions.
          </p>
        </div>
        
        {/* Desktop/Tablet View */}
        <div className="hidden sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
          {features.map((feature, index) => (
            <div 
              key={index}
              ref={el => featureRefs.current[index] = el}
              className="flex flex-col items-center text-center opacity-0 transform translate-y-4 transition-all duration-700"
            >
              <div className="w-16 h-16 mb-6 relative">
                {/* Placeholder for icon - replace with actual icons later */}
                <div className="w-full h-full flex items-center justify-center border border-gray-200 rounded-full">
                  {index === 0 && (
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" />
                    </svg>
                  )}
                  {index === 1 && (
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 0 1-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 0 1 4.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0 1 12 15a9.065 9.065 0 0 0-6.23-.693L5 14.5m14.8.8 1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0 1 12 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5" />
                    </svg>
                  )}
                  {index === 2 && (
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                    </svg>
                  )}
                  {index === 3 && (
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 0 1 3 12c0-1.605.42-3.113 1.157-4.418" />
                    </svg>
                  )}
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600 text-sm">{feature.description}</p>
            </div>
          ))}
        </div>
        
        {/* Mobile Carousel View */}
        <div className="sm:hidden">
          <div className="relative">
            {/* Current Feature */}
            <div className="flex justify-center">
              <div 
                className="flex flex-col items-center text-center w-full max-w-xs px-4"
              >
                <div className="w-16 h-16 mb-6 relative">
                  <div className="w-full h-full flex items-center justify-center border border-gray-200 rounded-full">
                    {currentIndex === 0 && (
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" />
                      </svg>
                    )}
                    {currentIndex === 1 && (
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 0 1-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 0 1 4.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0 1 12 15a9.065 9.065 0 0 0-6.23-.693L5 14.5m14.8.8 1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0 1 12 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5" />
                      </svg>
                    )}
                    {currentIndex === 2 && (
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                      </svg>
                    )}
                    {currentIndex === 3 && (
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 0 1 3 12c0-1.605.42-3.113 1.157-4.418" />
                      </svg>
                    )}
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-2">{features[currentIndex].title}</h3>
                <p className="text-gray-600 text-sm">{features[currentIndex].description}</p>
              </div>
            </div>
            
            {/* Navigation Buttons */}
            <button 
              onClick={prevFeature}
              className="absolute left-0 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full shadow-md"
            >
              <FiChevronLeft size={20} />
            </button>
            <button 
              onClick={nextFeature}
              className="absolute right-0 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full shadow-md"
            >
              <FiChevronRight size={20} />
            </button>
          </div>
          
          {/* Progress Bar */}
          <div className="flex justify-center mt-8 space-x-2">
            {features.map((_, index) => (
              <div 
                key={index} 
                className={`h-1 rounded-full transition-all duration-300 ${
                  index === currentIndex ? 'w-8 bg-black' : 'w-2 bg-gray-300'
                }`}
              ></div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}