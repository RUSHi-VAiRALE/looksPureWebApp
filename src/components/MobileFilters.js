'use client'
import { FaFilter, FaSort, FaTimes, FaChevronDown } from 'react-icons/fa';

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
      {showFilters && (
        <div className="fixed inset-0 z-50">
          <div className="absolute inset-0 bg-black/50" onClick={() => setShowFilters(false)}></div>
          <div className="absolute right-0 top-0 h-full w-80 bg-white shadow-xl transform transition-transform duration-300 ease-in-out">
            <div className="p-4 border-b">
              <div className="flex justify-between items-center">
                <h2 className="text-lg font-medium">Filters</h2>
                <button onClick={() => setShowFilters(false)}>
                  <FaTimes />
                </button>
              </div>
            </div>
            
            <div className="p-4 space-y-6 overflow-y-auto" style={{ maxHeight: 'calc(100vh - 60px)' }}>
              {/* Availability Filter */}
              <div className="border-b pb-4">
                <button 
                  className="flex items-center justify-between w-full text-sm font-medium text-gray-900 mb-3 uppercase"
                >
                  <span>Availability</span>
                  <FaChevronDown />
                </button>
                
                <div className="flex items-center mt-2">
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
                </div>
              </div>
              
              {/* Price Filter */}
              <div className="border-b pb-4">
                <button 
                  className="flex items-center justify-between w-full text-sm font-medium text-gray-900 mb-3 uppercase"
                >
                  <span>Price</span>
                  <FaChevronDown />
                </button>
                
                <div className="space-y-2 mt-2">
                  <input
                    type="range"
                    min="0"
                    max="2000"
                    step="100"
                    value={priceRange[1]}
                    onChange={handlePriceRangeChange}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                  />
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>₹0</span>
                    <span>₹{priceRange[1]}</span>
                  </div>
                </div>
              </div>
              
              <button
                onClick={() => setShowFilters(false)}
                className="w-full bg-black text-white py-2 rounded-md mt-4"
              >
                Apply Filters
              </button>
            </div>
          </div>
        </div>
      )}
      
      {/* Mobile Sort Bottom Sheet - Opens from bottom */}
      {showSortOptions && (
        <div className="fixed inset-0 z-50">
          <div className="absolute inset-0 bg-black/50" onClick={() => setShowSortOptions(false)}></div>
          <div className="absolute bottom-0 left-0 right-0 bg-white rounded-t-xl shadow-xl">
            <div className="p-4 border-b">
              <div className="flex justify-between items-center">
                <h2 className="text-lg font-medium">Sort By</h2>
                <button onClick={() => setShowSortOptions(false)}>
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
                    setShowSortOptions(false);
                  }}
                  className={`block w-full text-left px-4 py-3 text-sm border-b border-gray-100 ${
                    sortOption === option.value ? 'bg-gray-50 font-medium' : ''
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