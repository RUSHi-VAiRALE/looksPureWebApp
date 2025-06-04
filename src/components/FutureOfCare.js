'use client'
import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi'
import { MdCrueltyFree } from "react-icons/md";
import { BsTransparency } from "react-icons/bs";
import { CiDiscount1 } from "react-icons/ci";
import { FaFlask } from "react-icons/fa";
import { RiDiscountPercentFill } from "react-icons/ri";

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
      title: 'Clinically proven result',
      description: 'Ingredients sourced from across the world'
    },
    {
      icon: '/icons/global.svg',
      title: 'Cruelty free',
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
            Your skin deserves the best. Start your beauty journey with Lookspure.
          </h2>
          <p className="text-gray-600">
            Embrace Minimalist, where each element is chosen for its scientific merit, offering you authentic, effective skincare solutions.
          </p>
        </div>

        {/* Desktop/Tablet View - Changed to horizontal layout */}
        <div className="hidden sm:flex sm:flex-wrap sm:justify-center sm:items-center sm:gap-8 md:gap-12 lg:gap-16">
          {features.map((feature, index) => (
            <div
              key={index}
              ref={el => featureRefs.current[index] = el}
              className="flex flex-col items-center text-center opacity-0 transform translate-y-4 transition-all duration-700"
            >
              <div className="w-16 h-16 mb-6 relative">
                {/* React Icons */}
                <div className="w-full h-full flex items-center justify-center border border-gray-200 rounded-full">
                  {index === 0 && <BsTransparency className="w-8 h-8" />}
                  {index === 1 && <RiDiscountPercentFill className="w-8 h-8" />}
                  {index === 2 && <FaFlask className="w-8 h-8" />}
                  {index === 3 && <MdCrueltyFree className="w-8 h-8" />}
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
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
                    {currentIndex === 0 && <BsTransparency className="w-8 h-8" />}
                    {currentIndex === 1 && <RiDiscountPercentFill className="w-8 h-8" />}
                    {currentIndex === 2 && <FaFlask className="w-8 h-8" />}
                    {currentIndex === 3 && <MdCrueltyFree className="w-8 h-8" />}
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
                className={`h-1 rounded-full transition-all duration-300 ${index === currentIndex ? 'w-8 bg-black' : 'w-2 bg-gray-300'
                  }`}
              ></div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}