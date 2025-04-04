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
    <footer className="relative bg-black text-gray-300 overflow-hidden">
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-pink-900/5 to-purple-900/5"></div>
      
      {/* Radial Gradient Accent */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-pink-500/20 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full filter blur-3xl"></div>
      </div>

      {/* Main Footer Content */}
      <div className="relative">
        {/* Main Footer */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Logo Section */}
            <div className="space-y-4">
              <Link href="/" className="block">
                <span className="text-3xl font-serif font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                  LooksPure
                </span>
              </Link>
              <p className="text-sm text-gray-400">
                Your trusted source for natural and toxin-free beauty products.
              </p>
            </div>

            {/* About Us Section */}
            <div className="space-y-4">
              <div className="flex justify-between items-center md:block">
                <h3 className="text-lg font-semibold text-white">About Us</h3>
                <button 
                  className="md:hidden text-gray-400"
                  onClick={() => toggleSection('about')}
                >
                  {openSection === 'about' ? <FiChevronUp /> : <FiChevronDown />}
                </button>
              </div>
              <div className={`space-y-2 ${openSection === 'about' ? 'block' : 'hidden md:block'}`}>
                <Link href="/values" className="block w-fit text-gray-400 hover:text-white hover:font-semibold">Our Values</Link>
                <Link href="/privacy" className="block w-fit text-gray-400 hover:text-white hover:font-semibold">Privacy Policy</Link>
                <Link href="/terms" className="block w-fit text-gray-400 hover:text-white hover:font-semibold">Terms & Conditions</Link>
                <Link href="/disclaimer" className="block w-fit text-gray-400 hover:text-white hover:font-semibold">Disclaimer</Link>
                <Link href="/corporate" className="block w-fit text-gray-400 hover:text-white hover:font-semibold">Corporate Information</Link>
              </div>
            </div>

            {/* Quick Links Section */}
            <div className="space-y-4">
              <div className="flex justify-between items-center md:block">
                <h3 className="text-lg font-semibold text-white">Quick Links</h3>
                <button 
                  className="md:hidden text-gray-400"
                  onClick={() => toggleSection('quick')}
                >
                  {openSection === 'quick' ? <FiChevronUp /> : <FiChevronDown />}
                </button>
              </div>
              <div className={`space-y-2 ${openSection === 'quick' ? 'block' : 'hidden md:block'}`}>
                <Link href="/knowledge" className="block w-fit text-gray-400 hover:text-white hover:font-semibold">Knowledge</Link>
                <Link href="/faqs" className="block w-fit text-gray-400 hover:text-white hover:font-semibold">FAQs</Link>
                <Link href="/return-policy" className="block w-fit text-gray-400 hover:text-white hover:font-semibold">Return & Refund Policy</Link>
                <Link href="/track" className="block w-fit text-gray-400 hover:text-white hover:font-semibold">Track Order</Link>
                <Link href="/help" className="block w-fit text-gray-400 hover:text-white hover:font-semibold">Help Center</Link>
              </div>
            </div>

            {/* Contact Section */}
            <div className="space-y-4">
              <div className="flex justify-between items-center md:block">
                <h3 className="text-lg font-semibold text-white">Contact Us</h3>
                <button 
                  className="md:hidden text-gray-400"
                  onClick={() => toggleSection('contact')}
                >
                  {openSection === 'contact' ? <FiChevronUp /> : <FiChevronDown />}
                </button>
              </div>
              <div className={`space-y-4 ${openSection === 'contact' ? 'block' : 'hidden md:block'}`}>
                <p className="text-sm text-gray-400">
                  Need help? Fill out our form or email<br />
                  <a href="mailto:help@lookspure.com" className="text-gray-300 hover:text-white hover:font-semibold">
                    help@lookspure.com
                  </a>
                </p>
                <div className="flex space-x-4">
                  <a href="#" className="text-gray-400 hover:text-white">
                    <FaFacebookF size={20} />
                  </a>
                  <a href="#" className="text-gray-400 hover:text-white">
                    <FaInstagram size={20} />
                  </a>
                  <a href="#" className="text-gray-400 hover:text-white">
                    <FaYoutube size={20} />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-2 md:space-y-0">
              <p className="text-sm text-gray-400">
                Copyright © {new Date().getFullYear()} LooksPure. All rights reserved.
              </p>
              <div className="flex items-center space-x-2 text-gray-400">
                <span className="text-sm">Made with</span>
                <span className="text-pink-400">♥</span>
                <span className="text-sm">in India</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}