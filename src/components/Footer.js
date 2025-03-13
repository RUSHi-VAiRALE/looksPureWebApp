'use client'
import Link from 'next/link'
import { useState } from 'react'
import { FiChevronDown, FiChevronUp } from 'react-icons/fi'
import { FaFacebookF, FaInstagram, FaYoutube } from 'react-icons/fa'

export default function Footer() {
  const [openSection, setOpenSection] = useState(null)

  const toggleSection = (section) => {
    setOpenSection(openSection === section ? null : section)
  }

  return (
    <footer className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-gray-300 overflow-hidden">
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-emerald-900/10 to-teal-900/10"></div>
      
      {/* Radial Gradient Accent */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-emerald-500/20 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-teal-500/20 rounded-full filter blur-3xl"></div>
      </div>

      {/* Main Footer Content */}
      <div className="relative">
        {/* Main Footer */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Logo Section */}
            <div className="space-y-4">
              <Link href="/" className="block">
                <span className="text-3xl font-serif font-bold bg-gradient-to-r from-emerald-400 to-teal-500 bg-clip-text text-transparent">
                  LooksPure
                </span>
              </Link>
              <p className="text-sm">
                Your trusted source for natural and toxin-free beauty products.
              </p>
            </div>

            {/* Rest of the footer sections remain unchanged */}
            <div className="space-y-4">
              <div className="flex justify-between items-center md:block">
                <h3 className="text-lg font-semibold text-white">About Us</h3>
                <button 
                  className="md:hidden"
                  onClick={() => toggleSection('about')}
                >
                  {openSection === 'about' ? <FiChevronUp /> : <FiChevronDown />}
                </button>
              </div>
              <div className={`space-y-2 ${openSection === 'about' ? 'block' : 'hidden md:block'}`}>
                <Link href="/values" className="block hover:text-emerald-400">Our Values</Link>
                <Link href="/privacy" className="block hover:text-emerald-400">Privacy Policy</Link>
                <Link href="/terms" className="block hover:text-emerald-400">Terms & Conditions</Link>
                <Link href="/disclaimer" className="block hover:text-emerald-400">Disclaimer</Link>
                <Link href="/corporate" className="block hover:text-emerald-400">Corporate Information</Link>
              </div>
            </div>

            {/* Quick Links Section */}
            <div className="space-y-4">
              <div className="flex justify-between items-center md:block">
                <h3 className="text-lg font-semibold text-white">Quick Links</h3>
                <button 
                  className="md:hidden"
                  onClick={() => toggleSection('quick')}
                >
                  {openSection === 'quick' ? <FiChevronUp /> : <FiChevronDown />}
                </button>
              </div>
              <div className={`space-y-2 ${openSection === 'quick' ? 'block' : 'hidden md:block'}`}>
                <Link href="/knowledge" className="block hover:text-emerald-400">Knowledge</Link>
                <Link href="/faqs" className="block hover:text-emerald-400">FAQs</Link>
                <Link href="/return-policy" className="block hover:text-emerald-400">Return & Refund Policy</Link>
                <Link href="/track" className="block hover:text-emerald-400">Track Order</Link>
                <Link href="/help" className="block hover:text-emerald-400">Help Center</Link>
              </div>
            </div>

            {/* Contact Section */}
            <div className="space-y-4">
              <div className="flex justify-between items-center md:block">
                <h3 className="text-lg font-semibold text-white">Contact Us</h3>
                <button 
                  className="md:hidden"
                  onClick={() => toggleSection('contact')}
                >
                  {openSection === 'contact' ? <FiChevronUp /> : <FiChevronDown />}
                </button>
              </div>
              <div className={`space-y-4 ${openSection === 'contact' ? 'block' : 'hidden md:block'}`}>
                <p className="text-sm">
                  Need help? Fill out our form or email<br />
                  <a href="mailto:help@lookspure.com" className="text-emerald-400">
                    help@lookspure.com
                  </a>
                </p>
                <div className="flex space-x-4">
                  <a href="#" className="hover:text-emerald-400">
                    <FaFacebookF size={20} />
                  </a>
                  <a href="#" className="hover:text-emerald-400">
                    <FaInstagram size={20} />
                  </a>
                  <a href="#" className="hover:text-emerald-400">
                    <FaYoutube size={20} />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800/50 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-2 md:space-y-0">
              <p className="text-sm">
                Copyright © {new Date().getFullYear()} LooksPure. All rights reserved.
              </p>
              <div className="flex items-center space-x-2">
                <span className="text-sm">Made with</span>
                <span className="text-emerald-400">♥</span>
                <span className="text-sm">in India</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}