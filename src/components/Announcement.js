'use client'
import { useState, useEffect } from "react";
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

const announcements = [
  "Buy 2 products and get a Free Moisturizer",
  "Free Shipping on Orders Above ₹999",
  "New Customers Get 10% Off on First Order",
];

export default function Announcement() {
  const [currentAnnouncement, setCurrentAnnouncement] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentAnnouncement((prev) => (prev + 1) % announcements.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  const prevAnnouncement = () => {
    setCurrentAnnouncement((prev) => 
      prev === 0 ? announcements.length - 1 : prev - 1
    );
  };

  const nextAnnouncement = () => {
    setCurrentAnnouncement((prev) => 
      (prev + 1) % announcements.length
    );
  };

  return (
    <div className="announcement-bar py-2 fixed top-0 left-0 right-0 z-50 bg-black text-white transition-transform duration-300">
      <div className="container mx-auto text-center text-sm font-medium relative flex items-center justify-center">
        <button 
          onClick={prevAnnouncement} 
          className=" text-white mr-6 lg:mr-20 hover:text-gray-300 cursor-pointer transition-colors"
          aria-label="Previous announcement"
        >
          <FiChevronLeft size={20} />
        </button>
        
        <div className="border-b-1 uppercase text-[12px] font-light tracking-widest">
          {announcements[currentAnnouncement]}
        </div>
        
        <button 
          onClick={nextAnnouncement}  
          className=" text-white ml-6 lg:ml-20 hover:text-gray-300 cursor-pointer transition-colors"
          aria-label="Next announcement"
        >
          <FiChevronRight size={20} />
        </button>
      </div>
    </div>
  );
}