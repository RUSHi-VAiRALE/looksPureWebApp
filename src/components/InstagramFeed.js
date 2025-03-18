'use client'
import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

export default function InstagramFeed({ 
  title = "LOOKSPURE INSTA",
  posts = [],
  username = "lookspure",
  viewAllLink = `https://www.instagram.com/lookspure/`
}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const containerRef = useRef(null);
  const [visiblePosts, setVisiblePosts] = useState(6);
  
  // Handle responsive sizing
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width >= 1280) setVisiblePosts(6); // Desktop
      else if (width >= 1024) setVisiblePosts(5); // Laptop
      else if (width >= 768) setVisiblePosts(3); // Tablet
      else setVisiblePosts(2); // Mobile
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  const next = () => {
    if (currentIndex < posts.length - visiblePosts) {
      setCurrentIndex(prev => prev + 1);
    }
  };
  
  const prev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
    }
  };
  
  // Calculate card width based on visible posts
  const cardWidth = `calc(${100 / visiblePosts}% - 1rem)`;
  
  return (
    <section className="py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <h2 className="text-center text-2xl font-medium tracking-wider mb-10">
          {title}
        </h2>
        
        {/* Instagram Feed Carousel */}
        <div className="relative">
          <div className="overflow-hidden">
            <div 
              ref={containerRef}
              className="flex gap-[18px] transition-transform duration-300"
              style={{ transform: `translateX(-${currentIndex * (100 / visiblePosts)}%)` }}
            >
              {posts.map((post, index) => (
                <div 
                  key={post.id} 
                  className="flex-shrink-0 transition-all duration-300"
                  style={{ width: cardWidth }}
                >
                  <Link href={post.link} target="_blank" rel="noopener noreferrer">
                    <div className="relative aspect-[3/5] overflow-hidden rounded-md bg-gray-100 group">
                      {post.type === 'video' ? (
                        <video
                          src={post.media}
                          className="w-full h-full object-cover"
                          autoPlay
                          loop
                          muted
                          playsInline
                        />
                      ) : (
                        <img 
                          src={post.media} 
                          alt={post.caption || `Instagram post ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      )}
                      
                      {/* Hover Overlay */}
                      <div className="absolute inset-0 bg-black bg-opacity-30 opacity-0 group-hover:opacity-60 transition-opacity duration-300 flex items-center justify-center">
                        <span className="text-white text-sm font-medium">View on Instagram</span>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>
          
          {/* Navigation Buttons */}
          {posts.length > visiblePosts && (
            <>
              <button
                onClick={prev}
                disabled={currentIndex === 0}
                className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white p-2 rounded-full shadow-md disabled:opacity-50"
              >
                <FiChevronLeft size={24} />
              </button>
              <button
                onClick={next}
                disabled={currentIndex >= posts.length - visiblePosts}
                className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white p-2 rounded-full shadow-md disabled:opacity-50"
              >
                <FiChevronRight size={24} />
              </button>
            </>
          )}
        </div>
        
        
      </div>
    </section>
  );
}