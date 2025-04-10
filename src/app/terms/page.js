'use client'
import { useEffect, useRef } from 'react'

// export const metadata = {
//   title: 'Terms & Conditions | LooksPure',
//   description: 'Terms and conditions for using LooksPure services',
// }

export default function TermsPage() {
  const headingRef = useRef(null)
  const sectionRefs = useRef([])

  useEffect(() => {
    // Animate heading on load
    if (headingRef.current) {
      headingRef.current.classList.add('animate-fadeIn')
    }

    // Animate sections on scroll
    const handleScroll = () => {
      sectionRefs.current.forEach((ref, index) => {
        if (!ref) return
        
        const rect = ref.getBoundingClientRect()
        const isVisible = rect.top < window.innerHeight - 100
        
        if (isVisible) {
          setTimeout(() => {
            ref.classList.add('animate-fadeInLeft')
            ref.style.opacity = 1
          }, index * 150)
        }
      })
    }

    // Initial check
    handleScroll()
    
    // Add scroll listener
    window.addEventListener('scroll', handleScroll)
    
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <main className="min-h-screen bg-white py-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative">
          {/* Decorative elements */}
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-gray-100 rounded-full opacity-50 blur-3xl"></div>
          <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-gray-100 rounded-full opacity-50 blur-3xl"></div>
          
          <div className="relative">
            <h1 
              ref={headingRef}
              className="text-5xl font-bold mb-12 inline-block border-b-4 border-black pb-2 opacity-0 transition-opacity duration-700"
            >
              Terms &amp; Conditions
            </h1>
            
            <div className="space-y-6 text-lg">
              <p className="text-gray-500 italic">Last Updated: {new Date().toLocaleDateString()}</p>
              
              <div 
                ref={el => sectionRefs.current[0] = el}
                className="border-l-4 border-black pl-6 py-2 my-8 opacity-0 transform -translate-x-8 transition-all duration-700"
              >
                <h2 className="text-2xl font-bold mb-4 text-black">1. Acceptance of Terms</h2>
                <p>
                  By accessing or using our website, you agree to be bound by these Terms and Conditions and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using or accessing this site.
                </p>
              </div>
              
              <div 
                ref={el => sectionRefs.current[1] = el}
                className="border-l-4 border-black pl-6 py-2 my-8 opacity-0 transform -translate-x-8 transition-all duration-700"
              >
                <h2 className="text-2xl font-bold mb-4 text-black">2. Use License</h2>
                <p>
                  Permission is granted to temporarily download one copy of the materials on LooksPure&apos;s website for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:
                </p>
                <ul className="list-disc pl-6 mt-4 space-y-2 bg-gray-100 p-4 rounded-lg">
                  <li>Modify or copy the materials</li>
                  <li>Use the materials for any commercial purpose</li>
                  <li>Attempt to decompile or reverse engineer any software contained on LooksPure&apos;s website</li>
                  <li>Remove any copyright or other proprietary notations from the materials</li>
                  <li>Transfer the materials to another person or &quot;mirror&quot; the materials on any other server</li>
                </ul>
              </div>
              
              <div 
                ref={el => sectionRefs.current[2] = el}
                className="border-l-4 border-black pl-6 py-2 my-8 opacity-0 transform -translate-x-8 transition-all duration-700"
              >
                <h2 className="text-2xl font-bold mb-4 text-black">3. Disclaimer</h2>
                <p>
                  The materials on LooksPure&apos;s website are provided on an &apos;as is&apos; basis. LooksPure makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
                </p>
              </div>
              
              <div 
                ref={el => sectionRefs.current[3] = el}
                className="border-l-4 border-black pl-6 py-2 my-8 opacity-0 transform -translate-x-8 transition-all duration-700"
              >
                <h2 className="text-2xl font-bold mb-4 text-black">4. Limitations</h2>
                <p>
                  In no event shall LooksPure or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on LooksPure&apos;s website, even if LooksPure or a LooksPure authorized representative has been notified orally or in writing of the possibility of such damage.
                </p>
              </div>
              
              <div 
                ref={el => sectionRefs.current[4] = el}
                className="border-l-4 border-black pl-6 py-2 my-8 opacity-0 transform -translate-x-8 transition-all duration-700"
              >
                <h2 className="text-2xl font-bold mb-4 text-black">5. Governing Law</h2>
                <p>
                  These terms and conditions are governed by and construed in accordance with the laws of India and you irrevocably submit to the exclusive jurisdiction of the courts in that location.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}