'use client'
import { useState, useRef, useEffect } from 'react';
import { FaChevronDown } from 'react-icons/fa';

export default function DesktopFilters({ 
  inStockOnly, 
  setInStockOnly, 
  priceRange, 
  setPriceRange, 
  sortOption, 
  setSortOption 
}) {
  const [showSortOptions, setShowSortOptions] = useState(false);
  const [showAvailability, setShowAvailability] = useState(true);
  const [showPrice, setShowPrice] = useState(true);
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

  const handlePriceRangeChange = (e) => {
    const value = parseInt(e.target.value);
    setPriceRange([0, value]);
  };

  const getSortLabel = () => {
    switch (sortOption) {
      case 'bestseller': return 'Bestseller';
      case 'az': return 'Alphabetically, A-Z';
      case 'za': return 'Alphabetically, Z-A';
      case 'priceHighToLow': return 'Price, High to Low';
      case 'priceLowToHigh': return 'Price, Low to High';
      default: return 'Featured';
    }
  };

  return (
    <div className="flex flex-col">
      {/* Sort Options - This will be rendered separately in the parent component */}
      <div className="hidden">
        <div className="relative" ref={sortRef}>
          <button
            onClick={() => setShowSortOptions(!showSortOptions)}
            className="flex items-center space-x-2 text-sm text-gray-700 px-4 py-2 uppercase"
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
      </div>

      {/* Filter sections - Left side */}
      <div className="space-y-6">
        {/* Availability Filter */}
        <div className="border-b-1 border-gray-300 pb-4">
          <button 
            onClick={() => setShowAvailability(!showAvailability)}
            className="flex items-center justify-between w-full text-[13px] tracking-widest text-gray-900 mb-3 uppercase"
          >
            <span>AVAILABILITY</span>
            <FaChevronDown className={`transition-transform ${showAvailability ? 'rotate-180' : ''}`} />
          </button>
          
          {showAvailability && (
            <div className="flex items-center mt-2">
              <input
                id="inStockOnly"
                type="checkbox"
                checked={inStockOnly}
                onChange={() => setInStockOnly(!inStockOnly)}
                className="h-4 w-4 text-gray-300 text-md focus:ring-black border-gray-300 rounded"
              />
              <label htmlFor="inStockOnly" className="ml-2 text-sm text-gray-700">
                In stock only
              </label>
            </div>
          )}
        </div>
        
        {/* Price Filter */}
        <div className="pb-4">
          <button 
            onClick={() => setShowPrice(!showPrice)}
            className="flex items-center justify-between w-full text-[13px] tracking-widest text-gray-900 mb-3 uppercase"
          >
            <span>PRICE</span>
            <FaChevronDown className={`transition-transform ${showPrice ? 'rotate-180' : ''}`} />
          </button>
          
          {showPrice && (
            <div className="space-y-2 mt-2">
              <input
                type="range"
                min="0"
                max="2000"
                step="100"
                value={priceRange[1]}
                onChange={handlePriceRangeChange}
                className="w-full h-[2px] bg-black rounded-lg appearance-none cursor-pointer"
              />
              <div className="flex justify-between text-xs text-gray-500">
                <span>₹0</span>
                <span>₹{priceRange[1]}</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}