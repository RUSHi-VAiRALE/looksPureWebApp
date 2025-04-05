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
  const [minPrice, setMinPrice] = useState(priceRange[0]);
  const [maxPrice, setMaxPrice] = useState(priceRange[1]);
  const sortRef = useRef(null);
  
  // Maximum price constant
  const MAX_PRICE = 2000;

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

  // Update local state when priceRange prop changes
  useEffect(() => {
    setMinPrice(priceRange[0]);
    setMaxPrice(priceRange[1]);
  }, [priceRange]);

  const handleMinPriceChange = (e) => {
    const value = e.target.value === '' ? 0 : parseInt(e.target.value);
    if (isNaN(value)) return;
    
    const newMin = Math.min(value, maxPrice);
    setMinPrice(newMin);
    setPriceRange([newMin, maxPrice]);
  };

  const handleMaxPriceChange = (e) => {
    const value = e.target.value === '' ? 0 : parseInt(e.target.value);
    if (isNaN(value)) return;
    
    const newMax = Math.max(value, minPrice);
    setMaxPrice(newMax > MAX_PRICE ? MAX_PRICE : newMax);
    setPriceRange([minPrice, newMax > MAX_PRICE ? MAX_PRICE : newMax]);
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
          
          {/* Price Filter section */}
          {showPrice && (
            <div className="space-y-4 mt-2">
              {/* Price Range Slider */}
              <div className="relative pt-5 pr-2 mb-8">
                <div className="h-[2px] bg-gray-200 rounded-lg">
                  <div 
                    className="absolute h-[2px] bg-black rounded-lg"
                    style={{
                      left: `${(minPrice / MAX_PRICE) * 100}%`,
                      right: `${100 - (maxPrice / MAX_PRICE) * 100}%`
                    }}
                  ></div>
                </div>
                
                {/* Min price slider */}
                <input
                  type="range"
                  min="0"
                  max={MAX_PRICE}
                  step="50"
                  value={minPrice}
                  onChange={(e) => {
                    const value = parseInt(e.target.value);
                    if (value <= maxPrice) {
                      setMinPrice(value);
                      setPriceRange([value, maxPrice]);
                    }
                  }}
                  className="absolute top-0 left-0 w-full h-6 appearance-none bg-transparent cursor-pointer"
                  style={{ zIndex: 3, opacity: 0 }}
                />
                
                {/* Max price slider */}
                <input
                  type="range"
                  min="0"
                  max={MAX_PRICE}
                  step="50"
                  value={maxPrice}
                  onChange={(e) => {
                    const value = parseInt(e.target.value);
                    if (value >= minPrice) {
                      setMaxPrice(value);
                      setPriceRange([minPrice, value]);
                    }
                  }}
                  className="absolute top-0 left-0 w-full h-6 appearance-none bg-transparent cursor-pointer"
                  style={{ zIndex: 4, opacity: 0 }}
                />
                
                {/* Slider handles */}
                <div className="relative">
                  {/* Min price handle */}
                  <div 
                    className="absolute top-0.5 w-2 h-2 border-2 bg-black rounded-full -mt-[7px] cursor-pointer"
                    style={{ left: `${(minPrice / MAX_PRICE) * 100}%`, zIndex: 5 }}
                  ></div>
                  
                  {/* Max price handle */}
                  <div 
                    className="absolute top-0.5 w-2 h-2 border-2 bg-black border-black rounded-full -mt-[7px] cursor-pointer"
                    style={{ left: `${(maxPrice / MAX_PRICE) * 100}%`, zIndex: 5 }}
                  ></div>
                </div>
              </div>
              
              {/* Price Input Fields */}
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <span className="text-sm text-gray-500 mr-1">₹</span>
                  <input
                    type="text"
                    value={minPrice}
                    onChange={handleMinPriceChange}
                    className="w-16 p-1 text-sm border border-gray-300 rounded"
                  />
                </div>
                <span className="text-sm text-gray-500">to</span>
                <div className="flex items-center">
                  <span className="text-sm text-gray-500 mr-1">₹</span>
                  <input
                    type="text"
                    value={maxPrice}
                    onChange={handleMaxPriceChange}
                    className="w-16 p-1 text-sm border border-gray-300 rounded"
                  />
                </div>
              </div>
              
              {/* Price difference display */}
              <div className="text-center text-sm text-gray-500">
                Price range: ₹{maxPrice - minPrice}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}