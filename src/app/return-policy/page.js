'use client'
import { useEffect, useRef, useState } from 'react'

// export const metadata = {
//   title: 'Return & Refund Policy | LooksPure',
//   description: 'Learn about our return and refund policies',
// }

export default function ReturnPolicyPage() {
  const [activeSection, setActiveSection] = useState(null)
  const headingRef = useRef(null)
  const sectionRefs = useRef([])

  useEffect(() => {
    // Animate heading on load
    if (headingRef.current) {
      headingRef.current.classList.add('animate-fadeIn')
    }

    // Initial animation for first section
    if (sectionRefs.current[0]) {
      setTimeout(() => {
        sectionRefs.current[0].classList.add('animate-fadeIn')
        sectionRefs.current[0].style.opacity = 1
        setActiveSection(0)
      }, 500)
    }
  }, [])

  const toggleSection = (index) => {
    setActiveSection(activeSection === index ? null : index)
    
    if (sectionRefs.current[index] && activeSection !== index) {
      sectionRefs.current[index].classList.add('animate-fadeIn')
      sectionRefs.current[index].style.opacity = 1
    }
  }

  const sections = [
    {
      title: "Easy Return Policy",
      content: "Returns/replacements are accepted for unused products only in case of defects, damages during delivery, missing, or wrong products delivered. Return requests can be raised on the 'My Order' section within 15 days of delivery."
    },
    {
      title: "Eligibility for Returns",
      content: "To be eligible for a return, your item must be unused and in the same condition that you received it. It must also be in the original packaging. Several types of goods are exempt from being returned. Perishable goods such as food, flowers, newspapers or magazines cannot be returned. We also do not accept products that are intimate or sanitary goods, hazardous materials, or flammable liquids or gases."
    },
    {
      title: "Refunds Process",
      content: "Once your return is received and inspected, we will send you an email to notify you that we have received your returned item. We will also notify you of the approval or rejection of your refund. If you are approved, then your refund will be processed, and a credit will automatically be applied to your credit card or original method of payment, within a certain amount of days."
    },
    {
      title: "Late or Missing Refunds",
      content: "If you haven't received a refund yet, first check your bank account again. Then contact your credit card company, it may take some time before your refund is officially posted. Next contact your bank. There is often some processing time before a refund is posted. If you've done all of this and you still have not received your refund yet, please contact us at help@lookspure.com."
    },
    {
      title: "Exchanges",
      content: "We only replace items if they are defective or damaged. If you need to exchange it for the same item, send us an email at help@lookspure.com and send your item to the address provided."
    },
    {
      title: "Shipping",
      content: "To return your product, you should mail your product to the address we provide when you initiate a return. You will be responsible for paying for your own shipping costs for returning your item. Shipping costs are non-refundable. If you receive a refund, the cost of return shipping will be deducted from your refund."
    }
  ]

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
              Return &amp; Refund Policy
            </h1>
            
            <div className="space-y-6 text-lg">
              <p className="text-gray-500 italic">Last Updated: {new Date().toLocaleDateString()}</p>
              
              <div className="mt-10 space-y-4">
                {sections.map((section, index) => (
                  <div 
                    key={index}
                    ref={el => sectionRefs.current[index] = el}
                    className={`border border-gray-200 rounded-lg overflow-hidden transition-all duration-500 ${
                      index !== 0 && activeSection !== index ? 'opacity-0' : ''
                    }`}
                  >
                    <button
                      onClick={() => toggleSection(index)}
                      className={`flex justify-between items-center w-full text-left font-medium p-6 focus:outline-none transition-colors duration-300 ${
                        activeSection === index ? 'bg-black text-white' : 'bg-white text-black hover:bg-gray-50'
                      }`}
                    >
                      <span className="text-xl">{section.title}</span>
                      <span className={`transition-transform duration-300 ${
                        activeSection === index ? 'transform rotate-45' : ''
                      }`}>
                        +
                      </span>
                    </button>
                    
                    <div 
                      className={`overflow-hidden transition-all duration-500 ${
                        activeSection === index 
                          ? 'max-h-96 opacity-100' 
                          : 'max-h-0 opacity-0'
                      }`}
                    >
                      <div className="p-6 bg-gray-50">
                        <p>{section.content}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}