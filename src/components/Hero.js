'use client'
import { useState, useEffect } from 'react'
import { Carousel } from './Carousel'
import { usePathname } from 'next/navigation'

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const pathname = usePathname()
  
  // Determine if we're on the homepage
  const isHomePage = pathname === '/'
  
  // Different slides for homepage vs other pages
  const homepageSlides = [
    {
      id: 1,
      type: 'video',
      src: "https://cdn.pixabay.com/video/2024/04/27/209634_tiny.mp4",
      hdSrc: "https://cdn.pixabay.com/video/2024/04/27/209634_tiny.mp4",
      alt: "Skincare application video"
    },
    {
      id: 2,
      type: 'image',
      src: "https://cdn.pixabay.com/photo/2018/08/14/13/48/botanical-3605603_1280.jpg",
      alt: "Natural skincare ingredients"
    },
    {
      id: 3, 
      type: 'image',
      src: "https://cdn.pixabay.com/photo/2020/07/09/06/01/red-maple-5385956_1280.jpg",
      alt: "Organic ingredients"
    },
    {
      id: 4,
      type: 'image',
      src: "https://cdn.pixabay.com/photo/2016/11/23/14/37/wood-1853403_1280.jpg",
      alt: "Sustainable packaging"
    }
  ]
  
  // Page-specific single images
  const pageImages = {
    '/skincare': {
      id: 1,
      type: 'image',
      src: "https://cdn.pixabay.com/photo/2018/08/14/13/48/botanical-3605603_1280.jpg",
      alt: "Skincare products",
      animation: 'zoom-out'
    },
    '/new': {
      id: 1,
      type: 'image',
      src: "https://cdn.pixabay.com/photo/2020/07/09/06/01/red-maple-5385956_1280.jpg",
      alt: "New arrivals",
      animation: 'zoom-out'
    },
    '/offers': {
      id: 1,
      type: 'image',
      src: "https://cdn.pixabay.com/photo/2020/07/09/06/01/red-maple-5385956_1280.jpg",
      alt: "Special offers",
      animation: 'zoom-out'
    }
  }
  
  // Determine which slides to use
  const slides = isHomePage ? homepageSlides : [pageImages[pathname] || homepageSlides[1]]
  
  return (
    <div className="relative w-full h-[70vh] md:h-[70vh]">
      <Carousel 
        slides={slides} 
        currentSlide={currentSlide} 
        setCurrentSlide={setCurrentSlide} 
        autoPlay={isHomePage} // Only autoplay on homepage
        interval={5000}
        singleImageAnimation={!isHomePage ? 'zoom-out' : null} // Apply zoom-out animation only for single images
      />
      
      {/* Overlay text */}
      {/* <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center text-white z-10 px-4">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 drop-shadow-lg">
            {isHomePage ? 'Pure Beauty, Naturally' : 
             pathname === '/skincare' ? 'Skincare Collection' :
             pathname === '/new' ? 'New Arrivals' :
             pathname === '/offers' ? 'Special Offers' : 'LooksPure'}
          </h1>
          <p className="text-xl md:text-2xl max-w-2xl mx-auto drop-shadow-md">
            {isHomePage ? 'Discover clean, effective skincare for your natural beauty journey' : 
             pathname === '/skincare' ? 'Nourish your skin with our natural formulations' :
             pathname === '/new' ? 'Be the first to try our latest innovations' :
             pathname === '/offers' ? 'Limited time deals on premium products' : 'Premium natural skincare'}
          </p>
        </div>
      </div> */}
      
      {/* Gradient overlay for better text visibility */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
    </div>
  )
}