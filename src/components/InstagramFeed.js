'use client'
import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { SiGoogledisplayandvideo360 } from "react-icons/si";
import { getFirestore, collection, query, where, getDocs, orderBy, limit } from 'firebase/firestore';
import { app } from '@/lib/firebase';

export default function InstagramFeed({ 
  title = "LOOKSPURE REELS",
  username = "lookspure",
  viewAllLink = `https://www.instagram.com/lookspure/`,
  category = "home",
  maxReels = 10
}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const containerRef = useRef(null);
  const [visiblePosts, setVisiblePosts] = useState(6);
  
  // Fetch reels from Firebase
  useEffect(() => {
    const fetchReels = async () => {
      setLoading(true);
      try {
        const db = getFirestore(app);
        
        // Create query to get reels of specified category
        const reelsQuery = query(
          collection(db, 'images'),
          where('type', '==', 'reel'),
          where('category', '==', category),
          orderBy('createdAt', 'desc'),
          limit(maxReels)
        );
        
        const querySnapshot = await getDocs(reelsQuery);
        const reelsData = [];
        
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          
          // Only add reels that have a file with URL
          if (data.file && data.file.url) {
            reelsData.push({
              id: doc.id,
              type: 'video',
              media: data.file.url,
              caption: data.title || 'Lookspure Reel',
              link: data.url || viewAllLink, // Use external URL if available, otherwise default
              description: data.description || ''
            });
          }
        });
        
        setPosts(reelsData);
      } catch (error) {
        console.error("Error fetching reels:", error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchReels();
  }, [category, maxReels, viewAllLink]);
  
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
  
  if (loading) {
    return (
      <section className="py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-center text-2xl font-medium tracking-wider mb-10">
            {title}
          </h2>
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-black"></div>
          </div>
        </div>
      </section>
    );
  }
  
  if (posts.length === 0) {
    return (
      <section className="py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-center text-2xl font-medium tracking-wider mb-10">
            {title}
          </h2>
          <p className="text-center text-gray-500">No reels available at the moment.</p>
        </div>
      </section>
    );
  }
  
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
                        <span className="text-white text-sm font-medium"><SiGoogledisplayandvideo360 size={30}/></span>
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