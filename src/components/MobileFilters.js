'use client'
import { FaFilter, FaSort, FaTimes, FaChevronDown } from 'react-icons/fa';
import { useEffect, useRef, useState } from 'react';

export default function MobileFilters({
  inStockOnly,
  setInStockOnly,
  priceRange,
  setPriceRange,
  sortOption,
  setSortOption,
  showFilters,
  setShowFilters,
  showSortOptions,
  setShowSortOptions
}) {
  const filterDrawerRef = useRef(null);
  const sortSheetRef = useRef(null);
  const [isFilterClosing, setIsFilterClosing] = useState(false);
  const [showPrice, setShowPrice] = useState(true);
  const [showAvailability, setShowAvailability] = useState(true);
  const [isSortClosing, setIsSortClosing] = useState(false);
  const [minPrice, setMinPrice] = useState(priceRange[0]);
  const [maxPrice, setMaxPrice] = useState(priceRange[1]);
  
  // Maximum price constant
  const MAX_PRICE = 2000;

  useEffect(() => {
    if (showFilters && filterDrawerRef.current) {
      // Force reflow to ensure animation works
      filterDrawerRef.current.style.transform = 'translateX(100%)';
      setTimeout(() => {
        if (filterDrawerRef.current) {
          filterDrawerRef.current.style.transform = 'translateX(0)';
        }
      }, 10);
      setIsFilterClosing(false);
    }
  }, [showFilters]);

  useEffect(() => {
    if (showSortOptions && sortSheetRef.current) {
      // Force reflow to ensure animation works
      sortSheetRef.current.style.transform = 'translateY(100%)';
      setTimeout(() => {
        if (sortSheetRef.current) {
          sortSheetRef.current.style.transform = 'translateY(0)';
        }
      }, 10);
      setIsSortClosing(false);
    }
  }, [showSortOptions]);

  // Update local state when priceRange prop changes
  useEffect(() => {
    setMinPrice(priceRange[0]);
    setMaxPrice(priceRange[1]);
  }, [priceRange]);

  const handleCloseFilters = () => {
    if (filterDrawerRef.current) {
      setIsFilterClosing(true);
      filterDrawerRef.current.style.transform = 'translateX(100%)';
      setTimeout(() => {
        setShowFilters(false);
        setIsFilterClosing(false);
      }, 300);
    } else {
      setShowFilters(false);
    }
  };

  const handleCloseSortOptions = () => {
    if (sortSheetRef.current) {
      setIsSortClosing(true);
      sortSheetRef.current.style.transform = 'translateY(100%)';
      setTimeout(() => {
        setShowSortOptions(false);
        setIsSortClosing(false);
      }, 300);
    } else {
      setShowSortOptions(false);
    }
  };

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
    <>
      {/* Mobile Filter and Sort Buttons - Styled like the image and made sticky */}
      <div className="sticky top-0 z-30 bg-white flex border-b-1 border-t-1 border-gray-300">
        <button
          onClick={() => setShowFilters(true)}
          className="flex-1 py-3 text-center text-[12px] text-gray-500 tracking-widest uppercase border-r-1 border-gray-300"
        >
          Filter
        </button>
        
        <button
          onClick={() => setShowSortOptions(true)}
          className="flex-1 py-3 text-center text-[12px] text-gray-500 tracking-widest uppercase flex items-center justify-center"
        >
          Sort By <FaChevronDown className="ml-1 text-[12px]" />
        </button>
      </div>
      
      {/* Mobile Filter Drawer - Opens from right */}
      {(showFilters || isFilterClosing) && (
        <div className="fixed inset-0 z-50">
          <div 
            className="absolute inset-0 bg-black/50 transition-opacity duration-300 ease-in-out" 
            style={{ opacity: isFilterClosing ? 0 : 1 }}
            onClick={handleCloseFilters}
          ></div>
          <div 
            ref={filterDrawerRef}
            className="absolute right-0 top-0 h-full w-[90%] bg-white shadow-xl transition-transform duration-300 ease-in-out"
            style={{ transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)' }}
          >
            <div className="p-4 border-b-1 border-gray-300">
              <div className="flex justify-between items-center">
                <h2 className="text-md text-gray-500 tracking-widest uppercase">Filters</h2>
                <button onClick={handleCloseFilters}>
                  <FaTimes />
                </button>
              </div>
            </div>
            
            <div className="p-4 space-y-6 overflow-y-auto" style={{ maxHeight: 'calc(100vh - 60px)' }}>
              {/* Availability Filter */}
              <div className="border-b-1 border-gray-300 pb-4">
                <button 
                  onClick={() => setShowAvailability(!showAvailability)}
                  className="flex items-center justify-between w-full text-[13px] tracking-widest text-gray-900 mb-3 uppercase"
                >
                  <span>Availability</span>
                  <FaChevronDown className={`transition-transform ${showAvailability ? 'rotate-180' : ''}`}/>
                </button>
                
                {showAvailability && <div className="flex items-center mt-2">
                  <input
                    id="mobileInStockOnly"
                    type="checkbox"
                    checked={inStockOnly}
                    onChange={() => setInStockOnly(!inStockOnly)}
                    className="h-4 w-4 text-black focus:ring-black border-gray-300 rounded"
                  />
                  <label htmlFor="mobileInStockOnly" className="ml-2 text-sm text-gray-700">
                    In stock only
                  </label>
                </div>}
              </div>
              
              {/* Price Filter */}
              <div className="pb-4">
                <button 
                  onClick={() => setShowPrice(!showPrice)}
                  className="flex items-center justify-between w-full text-[13px] tracking-widest text-gray-900 mb-3 uppercase"
                >
                  <span>Price</span>
                  <FaChevronDown className={`transition-transform ${showPrice ? 'rotate-180' : ''}`}/>
                </button>
                
                {showPrice && <div className="space-y-4 mt-2">
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
                </div>
}
              </div>
                  
              <button
                onClick={handleCloseFilters}
                className="absolute bottom-12 w-full bg-black text-white py-2 rounded-md mt-4"
              >
                View Results
              </button>
            </div>
          </div>
        </div>
      )}
      
      {/* Mobile Sort Bottom Sheet - Opens from bottom */}
      {(showSortOptions || isSortClosing) && (
        <div className="fixed inset-0 z-50">
          <div 
            className="absolute inset-0 bg-black/50 transition-opacity duration-300 ease-in-out" 
            style={{ opacity: isSortClosing ? 0 : 1 }}
            onClick={handleCloseSortOptions}
          ></div>
          <div 
            ref={sortSheetRef}
            className="absolute bottom-0 left-0 right-0 bg-[#F3F3F3] shadow-xl transition-transform duration-300 ease-in-out"
            style={{ transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)' }}
          >
            <div className="p-4 border-b-1 border-gray-300">
              <div className="flex relative justify-center items-center">
                <h2 className="text-lg tracking-widest text-gray-600">SORT BY</h2>
                <button className='absolute right-0' onClick={handleCloseSortOptions}>
                  <FaTimes />
                </button>
              </div>
            </div>
            
            <div className="p-2">
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
                    handleCloseSortOptions();
                  }}
                  className={`block w-full text-left text-gray-500 px-4 py-3 text-md ${
                    sortOption === option.value ? 'text-gray-900' : ''
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}