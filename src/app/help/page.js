'use client'
import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'

// export const metadata = {
//   title: 'Help Center | LooksPure',
//   description: 'Get help with your LooksPure orders and products',
// }

export default function HelpPage() {
  const [activeTab, setActiveTab] = useState('orders')
  const headingRef = useRef(null)
  const contentRef = useRef(null)
  
  useEffect(() => {
    if (headingRef.current) {
      headingRef.current.classList.add('animate-fadeIn')
    }
    if (contentRef.current) {
      contentRef.current.classList.add('animate-fadeInUp')
    }
  }, [])

  return (
    <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-28">
      <div className="relative">
        {/* Decorative elements */}
        <div className="absolute -top-10 -left-10 w-40 h-40 bg-gray-100 rounded-full opacity-50 blur-3xl"></div>
        <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-gray-100 rounded-full opacity-50 blur-3xl"></div>
        
        <div className="relative">
          <h1 
            ref={headingRef}
            className="text-5xl font-bold mb-10 inline-block border-b-4 border-black pb-2 opacity-0 transition-opacity duration-700"
          >
            Help Center
          </h1>
          
          <div 
            ref={contentRef}
            className="space-y-6 text-lg opacity-0 transform translate-y-8 transition-all duration-700"
          >
            <p>Welcome to our Help Center. Find answers to your questions or contact our support team for assistance.</p>
            
            {/* Tabs */}
            <div className="border-b border-gray-200 mt-10">
              <div className="flex space-x-8">
                <button
                  onClick={() => setActiveTab('orders')}
                  className={`py-4 px-1 border-b-2 font-medium text-lg transition-colors duration-300 ${
                    activeTab === 'orders' 
                      ? 'border-black text-black' 
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  Order Issues
                </button>
                <button
                  onClick={() => setActiveTab('products')}
                  className={`py-4 px-1 border-b-2 font-medium text-lg transition-colors duration-300 ${
                    activeTab === 'products' 
                      ? 'border-black text-black' 
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  Product Information
                </button>
                <button
                  onClick={() => setActiveTab('contact')}
                  className={`py-4 px-1 border-b-2 font-medium text-lg transition-colors duration-300 ${
                    activeTab === 'contact' 
                      ? 'border-black text-black' 
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  Contact Us
                </button>
              </div>
            </div>
            
            {/* Tab Content */}
            <div className="mt-8">
              {/* Order Issues */}
              <div className={`transition-opacity duration-300 ${activeTab === 'orders' ? 'opacity-100' : 'hidden opacity-0'}`}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-all duration-300 hover:-translate-y-1">
                    <h2 className="text-2xl font-bold mb-4">Track Your Order</h2>
                    <p className="mb-4">Follow the status of your order from processing to delivery.</p>
                    <Link href="/track" className="inline-block px-4 py-2 bg-black text-white rounded hover:bg-gray-800 transition-colors duration-300">
                      Track Now
                    </Link>
                  </div>
                  
                  <div className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-all duration-300 hover:-translate-y-1">
                    <h2 className="text-2xl font-bold mb-4">Shipping Information</h2>
                    <p className="mb-4">Learn about our shipping methods, timeframes, and policies.</p>
                    <Link href="/faqs" className="inline-block px-4 py-2 bg-black text-white rounded hover:bg-gray-800 transition-colors duration-300">
                      View Shipping FAQs
                    </Link>
                  </div>
                  
                  <div className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-all duration-300 hover:-translate-y-1">
                    <h2 className="text-2xl font-bold mb-4">Returns & Refunds</h2>
                    <p className="mb-4">Understand our return policy and how to initiate a return.</p>
                    <Link href="/return-policy" className="inline-block px-4 py-2 bg-black text-white rounded hover:bg-gray-800 transition-colors duration-300">
                      Return Policy
                    </Link>
                  </div>
                  
                  <div className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-all duration-300 hover:-translate-y-1">
                    <h2 className="text-2xl font-bold mb-4">Missing or Damaged Items</h2>
                    <p className="mb-4">Report issues with your order and get assistance.</p>
                    <button onClick={() => setActiveTab('contact')} className="inline-block px-4 py-2 bg-black text-white rounded hover:bg-gray-800 transition-colors duration-300">
                      Contact Support
                    </button>
                  </div>
                </div>
              </div>
              
              {/* Product Information */}
              <div className={`transition-opacity duration-300 ${activeTab === 'products' ? 'opacity-100' : 'hidden opacity-0'}`}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-all duration-300 hover:-translate-y-1">
                    <h2 className="text-2xl font-bold mb-4">Product Ingredients</h2>
                    <p className="mb-4">Detailed information about the ingredients we use in our products.</p>
                    <Link href="/knowledge" className="inline-block px-4 py-2 bg-black text-white rounded hover:bg-gray-800 transition-colors duration-300">
                      Ingredient Guide
                    </Link>
                  </div>
                  
                  <div className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-all duration-300 hover:-translate-y-1">
                    <h2 className="text-2xl font-bold mb-4">Usage Instructions</h2>
                    <p className="mb-4">How to use our products for the best results.</p>
                    <Link href="/knowledge" className="inline-block px-4 py-2 bg-black text-white rounded hover:bg-gray-800 transition-colors duration-300">
                      Usage Guides
                    </Link>
                  </div>
                  
                  <div className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-all duration-300 hover:-translate-y-1">
                    <h2 className="text-2xl font-bold mb-4">Product Recommendations</h2>
                    <p className="mb-4">Get personalized product suggestions for your skin type and concerns.</p>
                    <Link href="/knowledge" className="inline-block px-4 py-2 bg-black text-white rounded hover:bg-gray-800 transition-colors duration-300">
                      Skin Guide
                    </Link>
                  </div>
                  
                  <div className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-all duration-300 hover:-translate-y-1">
                    <h2 className="text-2xl font-bold mb-4">Allergies & Sensitivities</h2>
                    <p className="mb-4">Information about potential allergens and sensitive skin considerations.</p>
                    <Link href="/faqs" className="inline-block px-4 py-2 bg-black text-white rounded hover:bg-gray-800 transition-colors duration-300">
                      Allergy FAQs
                    </Link>
                  </div>
                </div>
              </div>
              
              {/* Contact Us */}
              <div className={`transition-opacity duration-300 ${activeTab === 'contact' ? 'opacity-100' : 'hidden opacity-0'}`}>
                <p className="mb-6">Our customer support team is available to help you Monday through Friday, 9am to 6pm IST.</p>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 hover:shadow-md transition-all duration-300 hover:-translate-y-1">
                    <div className="w-12 h-12 bg-black text-white rounded-full flex items-center justify-center mb-4">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-bold mb-2">Email Us</h3>
                    <p className="mb-4">For the fastest response, please email us at:</p>
                    <a href="mailto:help@lookspure.com" className="text-blue-600 hover:underline">help@lookspure.com</a>
                  </div>
                  
                  <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 hover:shadow-md transition-all duration-300 hover:-translate-y-1">
                    <div className="w-12 h-12 bg-black text-white rounded-full flex items-center justify-center mb-4">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-bold mb-2">Call Us</h3>
                    <p className="mb-4">Customer Service:</p>
                    <p className="text-lg font-medium">+91 XX XXXX XXXX</p>
                  </div>
                  
                  <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 hover:shadow-md transition-all duration-300 hover:-translate-y-1">
                    <div className="w-12 h-12 bg-black text-white rounded-full flex items-center justify-center mb-4">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-bold mb-2">Write to Us</h3>
                    <p className="mb-4">
                      LooksPure Customer Support<br />
                      123 Beauty Lane<br />
                      Mumbai, Maharashtra 400001<br />
                      India
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}