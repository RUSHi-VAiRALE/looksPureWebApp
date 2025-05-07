import React from 'react';

export default function ImageUploadForm({ imageUrls, handleImageChange, removeImage }) {
  return (
    <div className="pt-8">
      <h3 className="text-lg font-medium leading-6 text-gray-900">Product Images</h3>
      <div className="mt-6">
        <div className="flex items-center">
          <label className="block">
            <span className="sr-only">Choose product images</span>
            <input 
              type="file" 
              accept="image/*"
              multiple
              onChange={handleImageChange}
              className="block w-full text-sm text-gray-500
                file:mr-4 file:py-2 file:px-4
                file:rounded-md file:border-0
                file:text-sm file:font-semibold
                file:bg-black file:text-white
                hover:file:bg-gray-800" 
            />
          </label>
        </div>
        
        {imageUrls.length > 0 && (
          <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
            {imageUrls.map((img) => (
              <div key={img.id} className="relative group">
                <div className="aspect-w-1 aspect-h-1 rounded-lg bg-gray-100 overflow-hidden">
                  <img src={img.preview} alt={img.alt || 'Product image'} className="object-center object-cover" />
                  <button
                    type="button"
                    onClick={() => removeImage(img.id)}
                    className="absolute top-2 right-2 inline-flex items-center p-1 border border-transparent rounded-full shadow-sm text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
                  >
                    <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </button>
                </div>
                <input
                  type="text"
                  value={img.alt || ''}
                  onChange={(e) => {
                    const updatedImages = imageUrls.map(image => 
                      image.id === img.id ? { ...image, alt: e.target.value } : image
                    );
                    // This will need to be handled in the parent component
                  }}
                  placeholder="Image alt text"
                  className="mt-1 block w-full text-sm border-gray-300 rounded-md shadow-sm focus:ring-black focus:border-black"
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}