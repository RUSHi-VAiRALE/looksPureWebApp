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
    <div className="relative w-full h-[50vh] md:h-[60vh]">
      <Carousel 
        slides={slides} 
        currentSlide={currentSlide} 
        setCurrentSlide={setCurrentSlide} 
        autoPlay={isHomePage} // Only autoplay on homepage
        interval={5000}
        singleImageAnimation={!isHomePage ? 'zoom-out' : null} // Apply zoom-out animation only for single images
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
    </div>
  )
}