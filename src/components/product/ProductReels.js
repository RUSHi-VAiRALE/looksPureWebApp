'use client'
import { useState, useRef, useEffect } from 'react';
import { FaPlay, FaPause, FaVolumeMute, FaVolumeUp } from 'react-icons/fa';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

export default function ProductReels({ reels }) {
  const [activeReel, setActiveReel] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef(null);
  const containerRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleReels, setVisibleReels] = useState(3);

  // Handle responsive sizing
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width >= 1024) setVisibleReels(3); // Desktop and Laptop
      else setVisibleReels(2); // Mobile and Tablet
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleReelClick = (index) => {
    setActiveReel(index);
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
      setIsPlaying(false);
    }
  };

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const next = () => {
    if (currentIndex < reels.length - visibleReels) {
      setCurrentIndex(prev => prev + 1);
    }
  };
  
  const prev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
    }
  };

  // Calculate card width based on visible reels
  const cardWidth = `calc(${100 / visibleReels}%)`;

  return (
    <div className="mt-8">
      <h3 className="text-sm font-medium text-gray-900 mb-4">Product Reels</h3>
      
      
      {/* Reels Carousel */}
      <div className="relative mt-0">
        <div className="overflow-hidden">
          <div 
            ref={containerRef}
            className="flex transition-transform duration-300"
            style={{ transform: `translateX(-${currentIndex * (100 / visibleReels)}%)` }}
          >
            {reels.map((reel, index) => (
              <div 
                key={reel.id} 
                className="flex-shrink-0 transition-all duration-300"
                style={{ width: cardWidth }}
              >
                <button
                  onClick={() => handleReelClick(index)}
                  className={`w-full aspect-[3/5] overflow-hidde`}
                >
                  <video
                    src={reel.media}
                    className="w-full h-full hover:cursor-pointer object-cover"
                    autoPlay
                    loop
                    playsInline
                    muted
                  />
                </button>
              </div>
            ))}
          </div>
        </div>
        
        {/* Navigation Buttons */}
        {reels.length > visibleReels && (
          <>
            <button
              onClick={prev}
              disabled={currentIndex === 0}
              className="absolute left-0 top-1/2 hover:cursor-pointer -translate-y-1/2 z-10 bg-white p-2 rounded-full shadow-md disabled:opacity-50"
            >
              <FiChevronLeft size={20} />
            </button>
            <button
              onClick={next}
              disabled={currentIndex >= reels.length - visibleReels}
              className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white p-2 rounded-full shadow-md hover:cursor-pointer disabled:opacity-50"
            >
              <FiChevronRight size={20} />
            </button>
          </>
        )}
      </div>
    </div>
  );
}