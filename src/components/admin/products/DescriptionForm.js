import React from 'react';

export default function DescriptionForm({ product, handleInputChange }) {
  return (
    <div className="pt-8">
      <h3 className="text-lg font-medium leading-6 text-gray-900">Description</h3>
      <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
        <div className="sm:col-span-6">
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">
            Short Description
          </label>
          <div className="mt-1">
            <textarea
              id="description"
              name="description"
              rows={3}
              value={product.description}
              onChange={handleInputChange}
              className="shadow-sm focus:ring-black focus:border-black block w-full sm:text-sm p-2 border-1 rounded-md"
            />
          </div>
        </div>

        <div className="sm:col-span-6">
          <label htmlFor="longDescription" className="block text-sm font-medium text-gray-700">
            Long Description
          </label>
          <div className="mt-1">
            <textarea
              id="longDescription"
              name="longDescription"
              rows={5}
              value={product.longDescription}
              onChange={handleInputChange}
              className="shadow-sm focus:ring-black focus:border-black block w-full sm:text-sm p-2 border-1 rounded-md"
            />
          </div>
        </div>

        <div className="sm:col-span-6">
          <label htmlFor="ingredients" className="block text-sm font-medium text-gray-700">
            Ingredients
          </label>
          <div className="mt-1">
            <textarea
              id="ingredients"
              name="ingredients"
              rows={3}
              value={product.ingredients}
              onChange={handleInputChange}
              className="shadow-sm focus:ring-black focus:border-black block w-full sm:text-sm p-2 border-1 rounded-md"
            />
          </div>
        </div>
      </div>
    </div>
  );
}