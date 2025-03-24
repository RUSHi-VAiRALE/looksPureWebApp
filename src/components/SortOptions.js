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
    <div className="relative" ref={sortRef}>
      <button
        onClick={() => setShowSortOptions(!showSortOptions)}
        className="flex items-center text-sm text-gray-700 px-4 py-2 uppercase"
      >
        <span>SORT BY</span>
        <FaChevronDown className={`transition-transform ${showSortOptions ? 'rotate-180' : ''} ml-1`} />
      </button>
      
      {showSortOptions && (
        <div className="absolute right-0 mt-2 w-60 bg-white border border-gray-200 rounded-md shadow-lg z-10">
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
                className={`block w-full text-left px-4 py-2 text-sm ${
                  sortOption === option.value ? 'bg-gray-100 text-gray-900' : 'text-gray-700 hover:bg-gray-50'
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