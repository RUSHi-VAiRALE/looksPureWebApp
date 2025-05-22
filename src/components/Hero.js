'use client'
import { useState, useEffect } from 'react'
import { Carousel } from './Carousel'
import { usePathname } from 'next/navigation'
import { getFirestore, collection, query, where, getDocs } from 'firebase/firestore'
import { app } from '@/lib/firebase'

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [slides, setSlides] = useState([])
  const [loading, setLoading] = useState(true)
  const pathname = usePathname()
  const db = getFirestore(app)
  
  // Determine if we're on the homepage
  const isHomePage = pathname === '/'
  
  // Map pathname to category
  const getCategory = (path) => {
    const pathToCategory = {
      '/': 'home',
      '/skincare': 'skincare',
      '/new': 'new',
      '/offers': 'offers',
      '/bestseller': 'bestseller'
    }
    return pathToCategory[path] || 'home'
  }
  
  // Fetch media from Firebase
  useEffect(() => {
    const fetchMedia = async () => {
      setLoading(true)
      try {
        const category = getCategory(pathname)
        
        // Query Firebase for media with matching category
        const mediaQuery = query(
          collection(db, 'images'),
          where('category', '==', category),
          where('type', 'in', ['image', 'video'])
        )
        
        const querySnapshot = await getDocs(mediaQuery)
        const mediaItems = []
        
        querySnapshot.forEach((doc) => {
          const data = doc.data()
          
          if (data.type === 'image' && data.files && data.files.length > 0) {
            // Handle image type with multiple files
            data.files.forEach((file, index) => {
              mediaItems.push({
                id: `${doc.id}-${index}`,
                type: 'image',
                src: file.url,
                alt: file.alt || data.title || 'Lookspure image',
                animation: !isHomePage ? 'zoom-out' : null
              })
            })
          } else if (data.type === 'video' && data.file && data.file.url) {
            // Handle video type
            mediaItems.push({
              id: doc.id,
              type: 'video',
              src: data.file.url,
              hdSrc: data.file.url,
              alt: data.title || 'Lookspure video'
            })
          }
        })
        
        // Fallback slides if no media found
        if (mediaItems.length === 0) {
          const fallbackSlide = {
            id: 'fallback',
            type: 'image',
            src: "https://cdn.pixabay.com/photo/2018/08/14/13/48/botanical-3605603_1280.jpg",
            alt: "Lookspure skincare",
            animation: !isHomePage ? 'zoom-out' : null
          }
          setSlides([fallbackSlide])
        } else {
          setSlides(mediaItems)
        }
      } catch (error) {
        console.error("Error fetching media:", error)
        // Set fallback slide on error
        const errorSlide = {
          id: 'error',
          type: 'image',
          src: "https://cdn.pixabay.com/photo/2018/08/14/13/48/botanical-3605603_1280.jpg",
          alt: "Lookspure skincare",
          animation: !isHomePage ? 'zoom-out' : null
        }
        setSlides([errorSlide])
      } finally {
        setLoading(false)
      }
    }
    
    fetchMedia()
  }, [pathname, db, isHomePage])
  
  // Show loading state
  if (loading) {
    return (
      <div className="relative w-full h-[50vh] md:h-[60vh] bg-gray-100 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-black"></div>
      </div>
    )
  }
  
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