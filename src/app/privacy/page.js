'use client'
import { useEffect, useRef } from 'react'

// export const metadata = {
//   title: 'Privacy Policy | LooksPure',
//   description: 'Learn about how LooksPure handles your personal information',
// }

export default function PrivacyPage() {
  const headingRef = useRef(null)
  const sectionRefs = useRef([])

  useEffect(() => {
    // Animate heading on load
    if (headingRef.current) {
      headingRef.current.classList.add('animate-fadeIn')
    }

    // Animate sections with intersection observer
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fadeInUp')
            entry.target.style.opacity = 1
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.1 }
    )

    sectionRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref)
    })

    return () => {
      sectionRefs.current.forEach((ref) => {
        if (ref) observer.unobserve(ref)
      })
    }
  }, [])

  return (
    <main className="min-h-screen bg-white py-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative">
          {/* Decorative elements */}
          <div className="absolute -top-10 -left-10 w-40 h-40 bg-gray-100 rounded-full opacity-50 blur-3xl"></div>
          <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-gray-100 rounded-full opacity-50 blur-3xl"></div>
          
          <div className="relative">
            <h1 
              ref={headingRef}
              className="text-5xl font-bold mb-12 inline-block border-b-4 border-black pb-2 opacity-0 transition-opacity duration-700"
            >
              Privacy Policy
            </h1>
            
            <div className="space-y-6 text-lg">
              <p className="text-gray-500 italic">Last Updated: {new Date().toLocaleDateString()}</p>
              
              <div 
                ref={el => sectionRefs.current[0] = el}
                className="bg-white p-8 rounded-xl shadow-sm my-10 opacity-0 transform translate-y-8 transition-all duration-700"
              >
                <h2 className="text-2xl font-bold mb-6 text-black flex items-center">
                  <span className="w-10 h-10 bg-black text-white rounded-full flex items-center justify-center mr-4 text-sm">1</span>
                  Information We Collect
                </h2>
                <p>
                  At LooksPure, we value your privacy and are committed to protecting your personal data. We collect personal information that you voluntarily provide to us when you register on our website, express interest in obtaining information about us or our products, or otherwise contact us.
                </p>
              </div>
              
              <div 
                ref={el => sectionRefs.current[1] = el}
                className="bg-white p-8 rounded-xl shadow-sm my-10 opacity-0 transform translate-y-8 transition-all duration-700"
              >
                <h2 className="text-2xl font-bold mb-6 text-black flex items-center">
                  <span className="w-10 h-10 bg-black text-white rounded-full flex items-center justify-center mr-4 text-sm">2</span>
                  How We Use Your Information
                </h2>
                <p>
                  We use the information we collect to provide, maintain, and improve our services, to develop new ones, and to protect LooksPure and our users. We process your personal information for these purposes in reliance on our legitimate business interests, in order to enter into or perform a contract with you, with your consent, and/or for compliance with our legal obligations.
                </p>
              </div>
              
              <div 
                ref={el => sectionRefs.current[2] = el}
                className="bg-white p-8 rounded-xl shadow-sm my-10 opacity-0 transform translate-y-8 transition-all duration-700"
              >
                <h2 className="text-2xl font-bold mb-6 text-black flex items-center">
                  <span className="w-10 h-10 bg-black text-white rounded-full flex items-center justify-center mr-4 text-sm">3</span>
                  Sharing Your Information
                </h2>
                <p>
                  We do not share your personal information with third parties except as described in this privacy policy. We may share your information with our service providers who process your information to provide services to us or on our behalf.
                </p>
              </div>
              
              <div 
                ref={el => sectionRefs.current[3] = el}
                className="bg-white p-8 rounded-xl shadow-sm my-10 opacity-0 transform translate-y-8 transition-all duration-700"
              >
                <h2 className="text-2xl font-bold mb-6 text-black flex items-center">
                  <span className="w-10 h-10 bg-black text-white rounded-full flex items-center justify-center mr-4 text-sm">4</span>
                  Your Rights
                </h2>
                <p>
                  You have the right to access, update, or delete your personal information. You can also object to processing of your personal information, ask us to restrict processing of your personal information, or request portability of your personal information.
                </p>
              </div>
              
              <div 
                ref={el => sectionRefs.current[4] = el}
                className="bg-white p-8 rounded-xl shadow-sm my-10 opacity-0 transform translate-y-8 transition-all duration-700"
              >
                <h2 className="text-2xl font-bold mb-6 text-black flex items-center">
                  <span className="w-10 h-10 bg-black text-white rounded-full flex items-center justify-center mr-4 text-sm">5</span>
                  Cookies
                </h2>
                <p>
                  We use cookies and similar tracking technologies to track the activity on our service and hold certain information. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent.
                </p>
              </div>
              
              <div 
                ref={el => sectionRefs.current[5] = el}
                className="bg-white p-8 rounded-xl shadow-sm my-10 opacity-0 transform translate-y-8 transition-all duration-700"
              >
                <h2 className="text-2xl font-bold mb-6 text-black flex items-center">
                  <span className="w-10 h-10 bg-black text-white rounded-full flex items-center justify-center mr-4 text-sm">6</span>
                  Changes to This Privacy Policy
                </h2>
                <p>
                  We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the &quot;Last Updated&quot; date.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}