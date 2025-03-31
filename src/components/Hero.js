'use client'
import { useState } from 'react'
import { Carousel } from './Carousel'

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0)
  
  const slides = [
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
      type: 'video',
      src: "https://cdn.pixabay.com/video/2017/09/15/12004-234428494_tiny.mp4",
      hdSrc: "https://cdn.pixabay.com/video/2017/09/15/12004-234428494_tiny.mp4",
      alt: "Product showcase video"
    },
    {
      id: 5,
      type: 'image',
      src: "https://cdn.pixabay.com/photo/2023/12/04/15/14/bottle-8429706_1280.jpg", 
      alt: "Product bottle"
    }
  ]
  
  return (
    <section className="relative w-full overflow-hidden h-[40vh] lg:h-[80vh] z-10">
      <Carousel
        slides={slides}
        currentSlide={currentSlide}
        setCurrentSlide={setCurrentSlide}
        autoPlay={true}
        interval={5000}
      />
      
      {/* Indicators */}
      <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`h-2 w-2 rounded-full transition-all ${
              currentSlide === index 
                ? 'bg-white w-4' 
                : 'bg-white/50'
            }`}
          />
        ))}
      </div>

      {/* Navigation Arrows */}
      <button 
        onClick={() => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)}
        className="absolute sm:left-12 left-5 top-1/2 -translate-y-1/2 bg-black/20 p-2 rounded-full text-white hover:bg-black/40 transition-colors"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      <button
        onClick={() => setCurrentSlide((prev) => (prev + 1) % slides.length)}
        className="absolute sm:right-12 right-5 top-1/2 -translate-y-1/2 bg-black/20 p-2 rounded-full text-white hover:bg-black/40 transition-colors"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </section>
  )
}