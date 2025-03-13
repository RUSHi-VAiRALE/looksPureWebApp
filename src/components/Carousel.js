'use client'
import { useEffect } from 'react'
import Image from 'next/image'

export function Carousel({ slides, currentSlide, setCurrentSlide, autoPlay = true, interval = 5000 }) {
  useEffect(() => {
    if (!autoPlay) return

    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, interval)

    return () => clearInterval(timer)
  }, [autoPlay, interval, slides.length, setCurrentSlide])

  return (
    <div className="relative w-full overflow-hidden
      h-[100px] xs:h-[113px] sm:h-[204.8px] md:h-[273px] xl:h-[682.66px]
    ">
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute w-full h-full transition-transform duration-500 ease-in-out ${
            index === currentSlide 
              ? 'translate-x-0' 
              : index < currentSlide 
                ? '-translate-x-full' 
                : 'translate-x-full'
          }`}
        >
          <Image
            src={slide.image}
            alt={slide.alt}
            fill
            sizes="(min-width: 2560px) 2560px, 
                   (min-width: 1024px) 1024px,
                   (min-width: 768px) 768px,
                   (min-width: 425px) 425px,
                   375px"
            className="object-cover w-full"
            quality={100}
            priority={index === 0}
          />
        </div>
      ))}
    </div>
  )
}