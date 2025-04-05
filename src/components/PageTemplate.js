'use client'
import { useEffect } from 'react'
import Link from 'next/link'
import { FiArrowLeft } from 'react-icons/fi'

export default function PageTemplate({ title, children }) {
  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <Link href="/" className="inline-flex items-center text-gray-600 hover:text-black">
            <FiArrowLeft className="mr-2" />
            Back to Home
          </Link>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm p-6 md:p-8">
          <h1 className="text-2xl md:text-3xl font-serif font-bold text-gray-900 mb-6">{title}</h1>
          <div className="prose prose-gray max-w-none">
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}