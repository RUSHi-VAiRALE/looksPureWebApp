import React from 'react';

// Assuming this is the structure of your BasicInfoForm component
// You'll need to modify the discount field to be read-only

export default function BasicInfoForm({ product, handleInputChange, handleNumberInputChange }) {
  return (
    <div>
      <h2 className="text-lg font-medium text-gray-900 mb-4">Basic Information</h2>
      <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
        <div className="sm:col-span-3">
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
            Product Name *
          </label>
          <div className="mt-1">
            <input
              type="text"
              name="name"
              id="name"
              required
              value={product.name}
              onChange={handleInputChange}
              className="shadow-sm p-2 border-1 focus:ring-black focus:border-black block w-full border-black sm:text-sm rounded-md"
            />
          </div>
        </div>

        <div className="sm:col-span-3">
          <label htmlFor="subtitle" className="block text-sm font-medium text-gray-700">
            Subtitle
          </label>
          <div className="mt-1">
            <input
              type="text"
              name="subtitle"
              id="subtitle"
              value={product.subtitle}
              onChange={handleInputChange}
              className="shadow-sm p-2 border-1 focus:ring-black focus:border-black block w-full sm:text-sm rounded-md"
            />
          </div>
        </div>

        <div className="sm:col-span-6">
          <label htmlFor="tagline" className="block text-sm font-medium text-gray-700">
            Tagline
          </label>
          <div className="mt-1">
            <input
              type="text"
              name="tagline"
              id="tagline"
              value={product.tagline}
              onChange={handleInputChange}
              className="shadow-sm p-2 border-1 focus:ring-black focus:border-black block w-full sm:text-sm rounded-md"
            />
          </div>
        </div>

        <div className="sm:col-span-3">
          <label htmlFor="category" className="block text-sm font-medium text-gray-700">
            Category *
          </label>
          <div className="mt-1">
            <select
              id="category"
              name="category"
              required
              value={product.category}
              onChange={handleInputChange}
              className="shadow-sm p-2 border-1 focus:ring-black focus:border-black block w-full sm:text-sm rounded-md"
            >
              <option value="">Select a category</option>
              <option value="skincare">Skin Care</option>
              <option value="haircare">Hair Care</option>
              <option value="bodycare">Body Care</option>
              <option value="facecare">Face Care</option>
              <option value="bestseller">Best Seller</option>
              <option value="new">New Arrivals</option>
            </select>
          </div>
        </div>

        <div className="sm:col-span-3">
          <label htmlFor="isActive" className="block text-sm font-medium text-gray-700">
            Product Status
          </label>
          <div className="mt-1">
            <select
              id="isActive"
              name="isActive"
              value={product.isActive}
              onChange={handleInputChange}
              className="shadow-sm p-2 border-1 focus:ring-black focus:border-black block w-full sm:text-sm rounded-md"
            >
              <option value={true}>Active</option>
              <option value={false}>Inactive</option>
            </select>
          </div>
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="price" className="block text-sm font-medium text-gray-700">
            Price (₹) *
          </label>
          <div className="mt-1">
            <input
              type="number"
              name="price"
              id="price"
              value={product.price}
              onChange={handleNumberInputChange}
              className="shadow-sm p-2 border-1 focus:ring-black focus:border-black block w-full border-black sm:text-sm rounded-md"
              required
              min="0"
              step="0.01"
            />
          </div>
        </div>
        
        <div className="sm:col-span-2">
          <label htmlFor="originalPrice" className="block text-sm font-medium text-gray-700">
            Original Price (₹)
          </label>
          <div className="mt-1">
            <input
              type="number"
              name="originalPrice"
              id="originalPrice"
              value={product.originalPrice}
              onChange={handleNumberInputChange}
              className="shadow-sm p-2 border-1 focus:ring-black focus:border-black block w-full border-black sm:text-sm rounded-md"
              min="0"
              step="0.01"
            />
          </div>
        </div>
        
        <div className="sm:col-span-2">
          <label htmlFor="discount" className="block text-sm font-medium text-gray-700">
            Discount (%)
          </label>
          <div className="mt-1">
            <input
              type="text"
              name="discount"
              id="discount"
              value={product.discount}
              className="bg-gray-100 shadow-sm block p-2 border-1 w-full sm:text-sm border-gray-300 rounded-md cursor-not-allowed"
              readOnly
            />
            <p className="mt-1 text-xs text-gray-500">Automatically calculated</p>
          </div>
        </div>
        
        <div className="sm:col-span-2">
          <label htmlFor="sku" className="block text-sm font-medium text-gray-700">
            SKU *
          </label>
          <div className="mt-1">
            <input
              type="text"
              name="sku"
              id="sku"
              required
              value={product.sku}
              onChange={handleInputChange}
              className="shadow-sm p-2 border-1 focus:ring-black focus:border-black block w-full sm:text-sm  rounded-md"
            />
          </div>
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="stockStatus" className="block text-sm font-medium text-gray-700">
            Stock Status
          </label>
          <div className="mt-1">
            <select
              id="stockStatus"
              name="stockStatus"
              value={product.stockStatus}
              onChange={handleInputChange}
              className="shadow-sm p-2 border-1 focus:ring-black focus:border-black block w-full sm:text-sm  rounded-md"
            >
              <option value="In Stock">In Stock</option>
              <option value="Out of Stock">Out of Stock</option>
              <option value="Pre-order">Pre-order</option>
            </select>
          </div>
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="rating" className="block text-sm font-medium text-gray-700">
            Initial Rating
          </label>
          <div className="mt-1">
            <input
              type="number"
              name="rating"
              id="rating"
              min="0"
              max="5"
              step="0.1"
              value={product.rating}
              onChange={handleNumberInputChange}
              className="shadow-sm p-2 border-1 focus:ring-black focus:border-black block w-full sm:text-sm  rounded-md"
            />
          </div>
        </div>
      </div>
    </div>
  );
}