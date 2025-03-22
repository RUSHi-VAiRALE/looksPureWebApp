'use client'
import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'

export function Carousel({ slides, currentSlide, setCurrentSlide, autoPlay = true, interval = 5000 }) {
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
        
        // Set video quality attributes
        videoEl.setAttribute('playsinline', '');
        videoEl.setAttribute('preload', 'auto');
        videoEl.style.objectFit = 'cover';
        
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

  return (
    <div className="relative w-full h-full overflow-hidden">
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
          {slide.type === 'image' ? (
            <Image
              src={slide.src}
              alt={slide.alt}
              fill
              sizes="100vw"
              className="object-cover w-full"
              quality={90}
              priority={index === 0}
            />
          ) : (
            <div className="relative aspect-video w-full h-full">
              <video
                ref={el => { if (el) videoRefs.current[slide.id] = el; }}
                className="absolute inset-0 w-full h-full object-cover"
                playsInline
                muted
                preload="auto"
                aria-label={slide.alt}
                src={slide.src}
              >
                {/* <source src={slide.src} type="video/mp4" />
                Your browser does not support the video tag. */}
              </video>
            </div>
          )}
        </div>
      ))}
    </div>
  )
}