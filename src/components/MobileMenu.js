'use client'
import Link from "next/link";
import { FiSearch, FiStar, FiUser, FiX } from 'react-icons/fi';
import { useEffect, useState } from 'react';
import { FaWhatsapp } from 'react-icons/fa';
import { auth } from '@/lib/firebase';

export default function MobileMenu({ isOpen, onClose, isActive }) {
  const [animationStarted, setAnimationStarted] = useState(false);
  const [showLoginDialog, setShowLoginDialog] = useState(false);
  const [user, setUser] = useState(null);
  
  // Check user authentication status
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
    });
    
    return () => unsubscribe();
  }, []);
  
  // Reset animation state when menu closes
  useEffect(() => {
    if (isOpen) {
      // Start animation after menu slide-in completes
      const timer = setTimeout(() => {
        setAnimationStarted(true);
      }, 300); // Reduced from 500ms to 300ms for better timing
      return () => clearTimeout(timer);
    } else {
      // Add a small delay before resetting animation state
      const timer = setTimeout(() => {
        setAnimationStarted(false);
        setShowLoginDialog(false);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);
  
  const menuItems = [
    { path: '/', label: 'New' },
    { path: '/skincare', label: 'Skin Care' },
    { path: '/offers', label: 'Offers' },
    { path: '/bestseller', label: 'Bestseller' },
  ];

  const handleLoginClick = (e) => {
    e.preventDefault();
    if (!user) {
      setShowLoginDialog(true);
    }
  };

  return (
    <>
      {/* Full Screen Mobile Menu - Slides from left to right */}
      <div 
        className={`fixed inset-0 bg-white w-[90%] z-50 transform transition-all duration-300 ease-in-out ${
          isOpen ? 'translate-x-0 shadow-2xl' : '-translate-x-full'
        }`}
        style={{ 
          transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)'
        }}
      >
        <div className="h-full flex flex-col">
          <div className="flex justify-between items-center p-6 border-b">
            <Link href="/" className="text-3xl font-serif font-bold text-black">
              LooksPure
            </Link>
            <button 
              onClick={onClose}
              className="p-2 rounded-full hover:bg-gray-100"
            >
              <FiX size={24} />
            </button>
          </div>
          
          <div className="flex-1 overflow-y-auto py-8 px-6">
            <div className="">
              {menuItems.map((item, index) => (
                <Link 
                  key={item.path}
                  href={item.path} 
                  className={`block text-md py-4 border-b border-gray-100 
                    ${isActive(item.path) ? 'text-black' : 'text-gray-700'}
                    transform transition-all duration-300 ease-out
                    ${animationStarted 
                      ? 'translate-y-0 opacity-100' 
                      : 'translate-y-[10px] opacity-0'
                    }`}
                  style={{ 
                    transitionDelay: animationStarted ? `${index * 150}ms` : '0ms',
                    transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)'
                  }}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
          
          {/* User profile or login section at bottom */}
          <div className={`p-6 border-t border-gray-100 transform transition-all duration-300 
            ${animationStarted 
              ? 'translate-y-0 opacity-100' 
              : 'translate-y-[20px] opacity-0'
            }`}
            style={{ 
              transitionDelay: animationStarted ? `${menuItems.length * 100 + 100}ms` : '0ms',
              transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)'
            }}
          >
            {user ? (
              <Link 
                href="/profile" 
                className="flex items-center space-x-3 py-2"
                onClick={onClose}
              >
                <div className="bg-gray-100 p-3 rounded-full">
                  <FiUser size={20} className="text-gray-700" />
                </div>
                <div>
                  <span className="block text-gray-700 capitalize">My Profile</span>
                  <span className="text-xs text-gray-500">{user.email || user.phoneNumber}</span>
                </div>
              </Link>
            ) : (
              <a href="#" 
                onClick={handleLoginClick}
                className="flex items-center space-x-3 py-2"
              >
                <div className="bg-gray-100 p-3 rounded-full">
                  <FiUser size={20} className="text-gray-700" />
                </div>
                <div>
                  <span className="block text-gray-700 capitalize">Account</span>
                </div>
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Login Dialog */}
      {showLoginDialog && (
        <div className="fixed inset-0 bg-black/70 z-[60] flex items-center justify-center p-4">
          <div className="bg-white rounded-lg w-full max-w-sm overflow-hidden shadow-xl transform transition-all">
            {/* Dialog Header */}
            <div className="relative bg-black text-white p-5 text-center">
              <button 
                onClick={() => setShowLoginDialog(false)}
                className="absolute right-3 top-3 text-white"
              >
                <FiX size={20} />
              </button>
              <div className="flex justify-center items-center mb-2">
                <span className="text-xl font-bold mr-1">LooksPure</span>
              </div>
              <p className="text-sm">Rule the world, one look at a time ;)</p>
            </div>
            
            {/* Dialog Content */}
            <div className="p-6">
              <h3 className="text-xl font-semibold text-center mb-4">Welcome to LooksPure</h3>
              <p className="text-sm text-center text-gray-600 mb-6">Get exciting deals :)</p>
              
              <div className="space-y-4">
                <div>
                  <input 
                    type="tel" 
                    placeholder="Phone number" 
                    className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-black"
                  />
                </div>
                
                <button className="w-full flex items-center justify-center space-x-2 bg-green-500 hover:bg-green-600 text-white py-3 rounded transition-colors">
                  <FaWhatsapp size={20} />
                  <span>Whatsapp Login</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Overlay for when menu is open */}
      <div 
        className={`fixed inset-0 bg-black/50 z-40 transition-opacity duration-300 ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
      ></div>
    </>
  );
}