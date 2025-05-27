'use client'
import { useEffect, useRef } from 'react'

// export const metadata = {
//   title: 'Our Values | LooksPure',
//   description: 'Learn about the core values that drive LooksPure',
// }

export default function ValuesPage() {
  const headingRef = useRef(null)
  const paragraphRefs = useRef([])

  useEffect(() => {
    // Animate heading on load
    if (headingRef.current) {
      headingRef.current.classList.add('animate-fadeIn')
    }

    // Animate paragraphs sequentially
    paragraphRefs.current.forEach((ref, index) => {
      setTimeout(() => {
        if (ref) {
          ref.classList.add('animate-slideInRight')
          ref.style.opacity = 1
        }
      }, 300 + (index * 200))
    })
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
              Our Values
            </h1>
            
            <div className="space-y-8 text-lg">
              <div 
                ref={el => paragraphRefs.current[0] = el}
                className="bg-white p-8 rounded-xl shadow-sm border-l-4 border-black opacity-0 transform translate-x-8 transition-all duration-700"
              >
                <p>
                  Founded in 2025, Lookspure was born from a simple but powerful idea: skincare should be <strong className="text-black">HONEST</strong>, uncomplicated, and grounded in truth. We set out to challenge the norms of the beauty industry by championing clarity over confusion and facts over fear.
                </p>
              </div>
              
              <div 
                ref={el => paragraphRefs.current[1] = el}
                className="px-6 py-4 bg-gray-100 rounded-lg opacity-0 transform translate-x-8 transition-all duration-700"
              >
                <p>
                  The beauty space has become clouded with <em>misinformation</em>, exaggerated claims, and fear-driven marketing. As a result, consumers are often left overwhelmed and unsure of who or what to trust. We believe it&apos;s time for a change—a shift toward full transparency, where trust replaces doubt and every decision is guided by science and integrity.
                </p>
              </div>
              
              <div 
                ref={el => paragraphRefs.current[2] = el}
                className="p-8 bg-black text-white rounded-xl shadow-md my-8 opacity-0 transform translate-x-8 transition-all duration-700"
              >
                <p className="font-semibold text-xl italic">
                  &quot;We also believe in calling things what they are. Everything around us—including the air we breathe and the water we drink—is made of chemicals.&quot;
                </p>
              </div>
              
              <div 
                ref={el => paragraphRefs.current[3] = el}
                className="bg-white p-8 rounded-xl shadow-sm border-r-4 border-black opacity-0 transform translate-x-8 transition-all duration-700"
              >
                <p>
                  Instead of feeding fear, we focus on what truly matters: the <em>safety, purpose, and proven efficacy</em> of each ingredient. At Lookspure, our mission is clear: to offer products that do exactly what they claim—no marketing fluff, no scare tactics. Just clean, effective skincare made with intention and backed by <strong className="text-black">SCIENCE</strong>.
                </p>
              </div>
              
              <div 
                ref={el => paragraphRefs.current[4] = el}
                className="mt-16 mb-8 text-center opacity-0 transform translate-x-8 transition-all duration-700"
              >
                <h2 className="text-6xl font-bold text-black">
                  <span>Honest</span><span className="font-black">Skincare</span><span>.</span>
                </h2>
                <div className="mt-4 h-1 w-40 mx-auto bg-black rounded-full"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}