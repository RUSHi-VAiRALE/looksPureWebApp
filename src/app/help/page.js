'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function HelpPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [viewMode, setViewMode] = useState('grid') // 'grid' or 'list'

  const helpArticles = [
    {
      id: 1,
      title: "How do I cancel my order?",
      description: "If you'd like to cancel your recent order, simply reply to this message (or send an email to help@lookspure.com) with the following information:. The sooner you contact us, the better...",
      category: "Orders"
    },
    {
      id: 2,
      title: "Do you offer refunds or exchanges?",
      description: "Yes, we offer refunds and exchanges within 7 (Seven) from the date of delivery. To be eligible for a refund or exchange,. For returns or exchanges, please contact our customer support at...",
      category: "Returns"
    },
    {
      id: 3,
      title: "I want to return my order?",
      description: "We offer return only in the following cases:. Returns must be initiated within 10 days of receiving your order. Return by mail. Reach out to our customer support team at...",
      category: "Returns"
    },
    {
      id: 4,
      title: "Where is my order / How do I track my order?",
      description: "Once your order has been placed and processed, you will receive a confirmation email with your order details. This email will include a tracking number and a link to our tracking page....",
      category: "Tracking"
    },
    {
      id: 5,
      title: "What are your shipping methods?",
      description: "We offer multiple shipping options to ensure your products reach you safely and on time. Standard shipping takes 3-5 business days, while express shipping takes 1-2 business days...",
      category: "Shipping"
    },
    {
      id: 6,
      title: "How to use skincare products correctly?",
      description: "For best results, follow our recommended skincare routine. Start with a gentle cleanser, apply serums to damp skin, and always finish with moisturizer and SPF during the day...",
      category: "Products"
    }
  ]

  const filteredArticles = helpArticles.filter(article =>
    article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    article.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    article.category.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-28">
            <h1 className="text-5xl font-bold text-gray-900 mb-2">Help Center</h1>
          </div>
        </div>
      </div>

      {/* Breadcrumb Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <nav className="flex items-center space-x-2 text-sm text-gray-500">
          <Link href="/" className="hover:text-gray-700 transition-colors">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
            </svg>
          </Link>
          <span>/</span>
          <span className="text-gray-400">All articles</span>
        </nav>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        {/* Search and View Controls */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
              </svg>
              <h2 className="text-2xl font-bold text-gray-900">All articles</h2>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            {/* Search Bar */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <input
                type="text"
                placeholder="Search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-black focus:border-black sm:text-sm"
              />
            </div>

            {/* View Mode Toggle */}
            <div className="flex items-center space-x-1 bg-gray-100 rounded-md p-1">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded ${viewMode === 'grid'
                  ? 'bg-white shadow-sm text-gray-900'
                  : 'text-gray-500 hover:text-gray-700'
                  }`}
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                </svg>
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded ${viewMode === 'list'
                  ? 'bg-white shadow-sm text-gray-900'
                  : 'text-gray-500 hover:text-gray-700'
                  }`}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Articles Section */}
        <div className="mb-8">
          <h3 className="text-lg font-medium text-gray-900 mb-6">Articles</h3>

          {/* Articles Grid/List */}
          <div className={viewMode === 'grid'
            ? "grid grid-cols-1 md:grid-cols-2 gap-6"
            : "space-y-4"
          }>
            {filteredArticles.map((article) => (
              <div
                key={article.id}
                className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-all duration-200 hover:border-gray-300 cursor-pointer group"
              >
                <div className="flex flex-col h-full">
                  <div className="flex-1">
                    <h4 className="text-lg font-semibold text-gray-900 mb-3 group-hover:text-black transition-colors">
                      {article.title}
                    </h4>
                    <p className="text-gray-600 text-sm leading-relaxed line-clamp-3">
                      {article.description}
                    </p>
                  </div>
                  <div className="mt-4 pt-4 border-t border-gray-100">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                      {article.category}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* No Results */}
          {filteredArticles.length === 0 && searchTerm && (
            <div className="text-center py-12">
              <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.034 0-3.9.785-5.291 2.09M6.343 6.343A8 8 0 1017.657 17.657 8 8 0 006.343 6.343z" />
              </svg>
              <h3 className="mt-4 text-lg font-medium text-gray-900">No articles found</h3>
              <p className="mt-2 text-gray-500">Try adjusting your search terms or browse all articles.</p>
            </div>
          )}
        </div>

        {/* Quick Links Section */}
        <div className="bg-gray-50 rounded-lg p-8 mt-12">
          <h3 className="text-xl font-semibold text-gray-900 mb-6">Need more help?</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Link href="/faqs" className="flex items-center space-x-3 p-4 bg-white rounded-lg border border-gray-200 hover:shadow-sm transition-all duration-200 hover:border-gray-300">
              <div className="flex-shrink-0">
                <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h4 className="font-medium text-gray-900">Browse FAQs</h4>
                <p className="text-sm text-gray-500">Find quick answers</p>
              </div>
            </Link>

            <a href="mailto:help@lookspure.com" className="flex items-center space-x-3 p-4 bg-white rounded-lg border border-gray-200 hover:shadow-sm transition-all duration-200 hover:border-gray-300">
              <div className="flex-shrink-0">
                <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <h4 className="font-medium text-gray-900">Email Support</h4>
                <p className="text-sm text-gray-500">help@lookspure.com</p>
              </div>
            </a>

            <Link href="/track" className="flex items-center space-x-3 p-4 bg-white rounded-lg border border-gray-200 hover:shadow-sm transition-all duration-200 hover:border-gray-300">
              <div className="flex-shrink-0">
                <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <div>
                <h4 className="font-medium text-gray-900">Track Order</h4>
                <p className="text-sm text-gray-500">Check status</p>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}