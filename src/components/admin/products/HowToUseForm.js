import React from 'react';

export default function HowToUseForm({ howToUse, handleHowToUseChange, addHowToUse, removeHowToUse }) {
  return (
    <div className="pt-8">
      <h3 className="text-lg font-medium leading-6 text-gray-900">How To Use</h3>
      <div className="mt-6">
        {howToUse.map((step, index) => (
          <div key={index} className="flex items-center mb-3">
            <input
              type="text"
              value={step}
              onChange={(e) => handleHowToUseChange(index, e.target.value)}
              placeholder="Enter usage instructions"
              className="shadow-sm focus:ring-black focus:border-black block w-full sm:text-sm p-2 border-1 rounded-md"
            />
            <button
              type="button"
              onClick={() => removeHowToUse(index)}
              className="ml-2 inline-flex items-center p-1 border border-transparent rounded-full shadow-sm text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
            >
              <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={addHowToUse}
          className="mt-2 inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
        >
          Add Step
        </button>
      </div>
    </div>
  );
}