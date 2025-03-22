'use client'
import { useState, useEffect } from "react";

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

  return (
    <div className="announcement-bar py-2 fixed top-0 left-0 right-0 z-50 bg-black text-white transition-transform duration-300">
      <div className="container mx-auto text-center text-sm font-medium w-fit border-b-2">
        {announcements[currentAnnouncement]}
      </div>
    </div>
  );
}