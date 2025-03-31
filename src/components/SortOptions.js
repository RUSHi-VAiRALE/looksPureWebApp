'use client'
import { useState, useRef, useEffect } from 'react';
import { FaChevronDown } from 'react-icons/fa';

export default function SortOptions({ sortOption, setSortOption }) {
  const [showSortOptions, setShowSortOptions] = useState(false);
  const sortRef = useRef(null);

  // Close sort dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sortRef.current && !sortRef.current.contains(event.target)) {
        setShowSortOptions(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="relative border-l-1 border-gray-300" ref={sortRef}>
      <button
        onClick={() => setShowSortOptions(!showSortOptions)}
        className="flex items-center text-[12px] text-gray-400 hover:text-black tracking-widest px-12 py-4 uppercase"
      >
        <span>SORT BY</span>
        <FaChevronDown className={`transition-transform ${showSortOptions ? 'rotate-180' : ''} ml-1`} />
      </button>
      
      {showSortOptions && (
        <div className="absolute right-0 mt-2 w-60 bg-[#F3F3F3] border border-gray-200 shadow-lg z-10">
          <div className="py-1">
            {[
              { value: 'featured', label: 'Featured' },
              { value: 'bestseller', label: 'Bestseller' },
              { value: 'az', label: 'Alphabetically, A-Z' },
              { value: 'za', label: 'Alphabetically, Z-A' },
              { value: 'priceHighToLow', label: 'Price, High to Low' },
              { value: 'priceLowToHigh', label: 'Price, Low to High' },
            ].map((option) => (
              <button
                key={option.value}
                onClick={() => {
                  setSortOption(option.value);
                  setShowSortOptions(false);
                }}
                className={`block w-full text-left px-4 py-2 text-sm cursor-pointer ${
                  sortOption === option.value ? 'bg-gray-100 text-gray-600' : 'text-gray-400 hover:text-gray-600'
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}