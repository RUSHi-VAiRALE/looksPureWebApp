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
              Our values
            </h1>
            
            <div className="space-y-8 text-lg">
              <div 
                ref={el => paragraphRefs.current[0] = el}
                className="bg-white p-8 rounded-xl shadow-sm border-l-4 border-black opacity-0 transform translate-x-8 transition-all duration-700"
              >
                <p>
                  Founded in 2020 with the belief that beauty industry requires a revolution with respect to <strong className="text-black">TRANSPARENCY</strong>. There is lot of inaccurate advice &amp; incorrect claims being made by beauty brands which results in fear mongering, misconceptions and eventually consumers making wrong decisions.
                </p>
              </div>
              
              <div 
                ref={el => paragraphRefs.current[1] = el}
                className="px-6 py-4 bg-gray-100 rounded-lg opacity-0 transform translate-x-8 transition-all duration-700"
              >
                <p>
                  For example, the <em>blind march</em> towards beauty products with &apos;Natural&apos; claims is really concerning. There is a misconception that 100% natural is safe &amp; effective and anything that sounds like a chemical is unsafe. This is completely wrong.
                </p>
              </div>
              
              <div 
                ref={el => paragraphRefs.current[2] = el}
                className="p-8 bg-black text-white rounded-xl shadow-md my-8 opacity-0 transform translate-x-8 transition-all duration-700"
              >
                <p className="font-semibold text-xl italic">
                  &quot;Everything is a chemical – water is a chemical – therefore, chemical-free products don&apos;t exist.&quot;
                </p>
              </div>
              
              <div 
                ref={el => paragraphRefs.current[3] = el}
                className="bg-white p-8 rounded-xl shadow-sm border-r-4 border-black opacity-0 transform translate-x-8 transition-all duration-700"
              >
                <p>
                  We wanted to address this issue of <em>lack of transparency</em> through a range of products that are straightforward, honest and do what they claim to do. No unnecessary marketing fluff. And this is how <strong className="text-black">Minimalist</strong> was born.
                </p>
              </div>
              
              <div 
                ref={el => paragraphRefs.current[4] = el}
                className="mt-16 mb-8 text-center opacity-0 transform translate-x-8 transition-all duration-700"
              >
                <h2 className="text-6xl font-bold text-black">
                  <span>Hide</span><span className="font-black">Nothing</span><span>.</span>
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