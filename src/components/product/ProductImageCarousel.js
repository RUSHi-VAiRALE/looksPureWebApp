'use client'
import { useState } from 'react';
import Image from 'next/image';

export default function ProductImageCarousel({ images }) {
  const [selectedImage, setSelectedImage] = useState(0);
  
  // Next image in carousel
  const nextImage = () => {
    setSelectedImage((prev) => (prev + 1) % images.length);
  };
  
  // Previous image in carousel
  const prevImage = () => {
    setSelectedImage((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };
  
  return (
    <div className="relative aspect-square overflow-hidden">
      <Image
        src={images[selectedImage].src}
        alt={images[selectedImage].alt}
        width={600}
        height={600}
        className="w-full h-full object-center object-cover"
      />
      
      {/* Carousel Controls */}
      <div className="absolute inset-0 flex items-center justify-between p-4">
        <button 
          onClick={prevImage}
          className="bg-white hover:cursor-pointer bg-opacity-70 rounded-full p-2 hover:bg-opacity-100 transition-all"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
          </svg>
        </button>
        <button 
          onClick={nextImage}
          className="bg-white hover:cursor-pointer bg-opacity-70 rounded-full p-2 hover:bg-opacity-100 transition-all"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
          </svg>
        </button>
      </div>
      
      {/* Carousel Indicators */}
      <div className="absolute bottom-4 left-0 right-0">
        <div className="flex justify-center space-x-2">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => setSelectedImage(index)}
              className={`h-2 w-2 hover:cursor-pointer rounded-full ${
                selectedImage === index ? 'bg-black' : 'bg-gray-300'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}