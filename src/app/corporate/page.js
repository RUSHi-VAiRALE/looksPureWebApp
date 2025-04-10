'use client'
import { useEffect, useRef } from 'react'

// export const metadata = {
//   title: 'Corporate Information | LooksPure',
//   description: 'Learn about LooksPure company, our mission, and leadership team',
// }

export default function CorporatePage() {
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
            Corporate Information
          </h1>
          
          <div className="space-y-16 text-lg">
            {/* About Section */}
            <section 
              ref={el => sectionRefs.current[0] = el}
              className="opacity-0 transform translate-y-8 transition-all duration-700"
            >
              <h2 className="text-3xl font-bold mb-6">About LooksPure</h2>
              <div className="bg-white p-8 rounded-xl shadow-sm border-l-4 border-black">
                <p className="mb-4">
                  Founded in 2020, LooksPure is a leading beauty and skincare brand committed to transparency, 
                  effectiveness, and sustainability. We believe that beauty products should be formulated with 
                  clean, effective ingredients that deliver real results without compromising on safety.
                </p>
                <p>
                  Our mission is to revolutionize the beauty industry by providing honest, science-backed 
                  products that empower consumers to make informed choices about their skincare. We're dedicated 
                  to cutting through the marketing noise and offering straightforward solutions that work.
                </p>
              </div>
            </section>
            
            {/* Leadership Team */}
            <section 
              ref={el => sectionRefs.current[1] = el}
              className="opacity-0 transform translate-y-8 transition-all duration-700"
            >
              <h2 className="text-3xl font-bold mb-6">Leadership Team</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 border border-gray-100">
                  <div className="w-24 h-24 bg-gray-200 rounded-full mx-auto mb-4"></div>
                  <h3 className="text-xl font-bold text-center mb-2">Aanya Sharma</h3>
                  <p className="text-gray-500 text-center mb-4">Founder & CEO</p>
                  <p className="text-sm">
                    With over 15 years of experience in the beauty industry, Aanya founded LooksPure with a vision 
                    to create skincare products that prioritize transparency and efficacy.
                  </p>
                </div>
                
                <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 border border-gray-100">
                  <div className="w-24 h-24 bg-gray-200 rounded-full mx-auto mb-4"></div>
                  <h3 className="text-xl font-bold text-center mb-2">Vikram Patel</h3>
                  <p className="text-gray-500 text-center mb-4">Chief Scientific Officer</p>
                  <p className="text-sm">
                    Dr. Patel leads our research and development team, bringing his expertise in cosmetic chemistry 
                    and dermatological science to create innovative formulations.
                  </p>
                </div>
                
                <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 border border-gray-100">
                  <div className="w-24 h-24 bg-gray-200 rounded-full mx-auto mb-4"></div>
                  <h3 className="text-xl font-bold text-center mb-2">Neha Kapoor</h3>
                  <p className="text-gray-500 text-center mb-4">Chief Marketing Officer</p>
                  <p className="text-sm">
                    Neha oversees our marketing strategies, focusing on authentic communication and building 
                    meaningful connections with our community.
                  </p>
                </div>
                
                <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 border border-gray-100">
                  <div className="w-24 h-24 bg-gray-200 rounded-full mx-auto mb-4"></div>
                  <h3 className="text-xl font-bold text-center mb-2">Arjun Mehta</h3>
                  <p className="text-gray-500 text-center mb-4">Chief Operations Officer</p>
                  <p className="text-sm">
                    Arjun ensures that our supply chain and operations align with our commitment to sustainability 
                    and ethical business practices.
                  </p>
                </div>
              </div>
            </section>
            
            {/* Our Commitment */}
            <section 
              ref={el => sectionRefs.current[2] = el}
              className="opacity-0 transform translate-y-8 transition-all duration-700"
            >
              <h2 className="text-3xl font-bold mb-6">Our Commitments</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-black text-white p-6 rounded-lg">
                  <div className="w-16 h-16 bg-white text-black rounded-full flex items-center justify-center mb-4 mx-auto">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-center mb-4">Sustainability</h3>
                  <p className="text-sm text-center">
                    We're committed to reducing our environmental footprint through sustainable sourcing, 
                    eco-friendly packaging, and carbon-neutral shipping.
                  </p>
                </div>
                
                <div className="bg-white p-6 rounded-lg border-2 border-black">
                  <div className="w-16 h-16 bg-black text-white rounded-full flex items-center justify-center mb-4 mx-auto">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23-.693L5 14.5m14.8.8l1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0112 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-center mb-4">Ethical Testing</h3>
                  <p className="text-sm text-center">
                    We never test on animals and work only with suppliers who share our commitment to 
                    cruelty-free practices and ethical ingredient sourcing.
                  </p>
                </div>
                
                <div className="bg-white p-6 rounded-lg border-2 border-black">
                  <div className="w-16 h-16 bg-black text-white rounded-full flex items-center justify-center mb-4 mx-auto">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 15.75l-2.489-2.489m0 0a3.375 3.375 0 10-4.773-4.773 3.375 3.375 0 004.774 4.774zM21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-center mb-4">Transparency</h3>
                  <p className="text-sm text-center">
                    We believe in full disclosure about our ingredients, manufacturing processes, and 
                    business practices to empower informed consumer choices.
                  </p>
                </div>
              </div>
            </section>
            
            {/* Careers */}
            <section 
              ref={el => sectionRefs.current[3] = el}
              className="opacity-0 transform translate-y-8 transition-all duration-700"
            >
              <h2 className="text-3xl font-bold mb-6">Join Our Team</h2>
              <div className="bg-gray-50 p-8 rounded-lg border border-gray-200">
                <p className="mb-6">
                  We're always looking for passionate individuals who share our vision for transforming the beauty industry. 
                  Check out our current openings or send us your resume for future opportunities.
                </p>
                <a 
                  href="#" 
                  className="inline-block px-6 py-3 bg-black text-white rounded hover:bg-gray-800 transition-colors duration-300"
                >
                  View Open Positions
                </a>
              </div>
            </section>
          </div>
        </div>
      </div>
    </main>
  )
}