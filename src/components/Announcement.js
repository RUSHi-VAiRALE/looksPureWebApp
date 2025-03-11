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
    <div className="bg-emerald-500 text-white py-2">
      <div className="container mx-auto text-center">
        {announcements[currentAnnouncement]}
      </div>
    </div>
  );
}