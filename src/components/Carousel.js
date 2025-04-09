'use client'
import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'

export function Carousel({ slides, currentSlide, setCurrentSlide, autoPlay = true, interval = 5000, singleImageAnimation = null }) {
  const videoRefs = useRef({});
  const [isPaused, setIsPaused] = useState(false);
  const timerRef = useRef(null);

  // Setup and clear the autoplay timer
  useEffect(() => {
    if (!autoPlay || isPaused) return;
    
    timerRef.current = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, interval);

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [autoPlay, interval, slides.length, setCurrentSlide, isPaused]);

  // Handle video playback when slide changes
  useEffect(() => {
    // Pause all videos first
    Object.values(videoRefs.current).forEach(videoEl => {
      if (videoEl && !videoEl.paused) {
        videoEl.pause();
      }
    });

    // Play the current video if it's a video slide
    const currentSlideData = slides[currentSlide];
    if (currentSlideData.type === 'video') {
      const videoEl = videoRefs.current[currentSlideData.id];
      if (videoEl) {
        videoEl.currentTime = 0;
        setIsPaused(true); // Pause the carousel while video plays
        
        // Enhanced video quality settings
        videoEl.setAttribute('playsinline', '');
        videoEl.setAttribute('preload', 'auto');
        videoEl.style.objectFit = 'cover';
        
        // Set higher quality attributes
        if (currentSlideData.hdSrc) {
          videoEl.src = currentSlideData.hdSrc; // Use HD source if available
        }
        
        // Force HD quality when possible
        if (videoEl.canPlayType('video/mp4; codecs="avc1.64001E, mp4a.40.2"')) {
          videoEl.style.width = '100%';
          videoEl.style.height = '100%';
        }
        
        // Play with higher quality
        const playPromise = videoEl.play();
        if (playPromise !== undefined) {
          playPromise.catch(err => console.log('Video play error:', err));
        }
        
        // Add event listener for when video ends
        const handleVideoEnd = () => {
          setIsPaused(false); // Resume carousel when video ends
        };
        
        videoEl.addEventListener('ended', handleVideoEnd);
        
        // Clean up event listener
        return () => {
          videoEl.removeEventListener('ended', handleVideoEnd);
        };
      }
    } else {
      // If it's not a video slide, make sure carousel is running
      setIsPaused(false);
    }
  }, [currentSlide, slides]);

  // Determine if we should use the zoom-out animation
  const isSingleImageWithZoomAnimation = slides.length === 1 && singleImageAnimation === 'zoom-out';

  // Use a state to ensure animation triggers properly on first load
  const [animationLoaded, setAnimationLoaded] = useState(false);
  
  // Trigger animation after component mounts
  useEffect(() => {
    if (isSingleImageWithZoomAnimation && !animationLoaded) {
      // Increased delay to ensure animation triggers properly
      const timer = setTimeout(() => {
        setAnimationLoaded(true);
      }, 800); // Increased from 100ms to 800ms for a more noticeable delay
      
      return () => clearTimeout(timer);
    }
  }, [isSingleImageWithZoomAnimation, animationLoaded]);

  return (
    <div className="relative w-full h-full overflow-hidden">
      {slides.map((slide, index) => {
        // Apply different classes based on whether it's a single image with zoom animation
        const slideClasses = isSingleImageWithZoomAnimation
          ? 'absolute w-full h-full'
          : `absolute w-full h-full transition-transform duration-500 ease-in-out ${
              index === currentSlide 
                ? 'translate-x-0' 
                : index < currentSlide 
                  ? '-translate-x-full' 
                  : 'translate-x-full'
            }`;
            
        return (
          <div
            key={slide.id}
            className={slideClasses}
          >
            {slide.type === 'image' ? (
              <Image
                src={slide.src}
                alt={slide.alt}
                fill
                sizes="100vw"
                className={`object-cover w-full ${
                  isSingleImageWithZoomAnimation 
                    ? animationLoaded ? 'animate-slow-zoom-out' : 'scale-[1.2]'
                    : ''
                }`}
                quality={90}
                priority={true}
                onLoadingComplete={() => {
                  if (isSingleImageWithZoomAnimation && !animationLoaded) {
                    // Trigger animation after image loads
                    setAnimationLoaded(true);
                  }
                }}
              />
            ) : (
              <div className="relative w-full h-full">
                <video
                  ref={el => { if (el) videoRefs.current[slide.id] = el; }}
                  className="absolute inset-0 w-full h-full object-cover"
                  playsInline
                  muted
                  preload="auto"
                  aria-label={slide.alt}
                  src={slide.src}
                  poster={slide.poster || ''}
                  controlsList="nodownload"
                >
                  {slide.hdSrc && <source src={slide.hdSrc} type="video/mp4" />}
                  <source src={slide.src} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
            )}
          </div>
        );
      })}
      
      {/* Navigation controls only for multi-slide carousels */}
      {slides.length > 1 && (
        <>
          {/* Indicators */}
          <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 z-10">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`h-2 w-2 rounded-full transition-all ${
                  currentSlide === index 
                    ? 'bg-white w-4' 
                    : 'bg-white/50'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>

          {/* Navigation Arrows */}
          <button 
            onClick={() => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)}
            className="absolute sm:left-12 left-5 top-1/2 -translate-y-1/2 bg-black/20 p-2 rounded-full text-white hover:bg-black/40 transition-colors z-10"
            aria-label="Previous slide"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <button
            onClick={() => setCurrentSlide((prev) => (prev + 1) % slides.length)}
            className="absolute sm:right-12 right-5 top-1/2 -translate-y-1/2 bg-black/20 p-2 rounded-full text-white hover:bg-black/40 transition-colors z-10"
            aria-label="Next slide"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </>
      )}
    </div>
  )
}