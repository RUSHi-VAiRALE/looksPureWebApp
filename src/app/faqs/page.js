'use client'
import { useState, useEffect, useRef } from 'react'

// export const metadata = {
//   title: 'Frequently Asked Questions | LooksPure',
//   description: 'Find answers to common questions about LooksPure products and services',
// }

export default function FAQsPage() {
  const [openFaq, setOpenFaq] = useState(null)
  const headingRef = useRef(null)
  const contentRef = useRef(null)

  useEffect(() => {
    if (headingRef.current) {
      headingRef.current.classList.add('animate-fadeIn')
    }
    if (contentRef.current) {
      contentRef.current.classList.add('animate-fadeInUp')
    }
  }, [])

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index)
  }

  const faqs = [
    {
      category: "Orders & Shipping",
      questions: [
        {
          question: "How long does shipping take?",
          answer: "Standard shipping within India usually takes 3–5 business days. Express delivery options are available at checkout and typically take 1–2 business days for eligible pin codes."
        },
        {
          question: "Do you ship internationally?",
          answer: "Yes, we ship to select international destinations. Delivery timelines vary between 7–14 business days, depending on customs clearance and location."
        },
        {
          question: "How can I track my order?",
          answer: "Once your order is shipped, you'll receive a tracking (AWB) number via email and SMS. You can track your shipment using your AWB number, Order ID, or mobile number on our Track Order page or from your account dashboard."
        },
        {
          question: "What is your return policy?",
          answer: "Returns are accepted within 30 days of delivery for unused items in their original packaging. Once the return is received and inspected, a refund or resolution will be processed. Please refer to our Return Policy page for full details."
        }
      ]
    },
    {
      category: "Products & Ingredients",
      questions: [
        {
          question: "Are your products cruelty-free?",
          answer: "Yes, all LooksPure products are 100% cruelty-free. We never test on animals and do not work with suppliers who test on animals."
        },
        {
          question: "Are your products vegan?",
          answer: "Most of our products are vegan. Products that contain beeswax, honey, or other animal-derived ingredients are clearly labeled on our website and packaging."
        },
        {
          question: "Do your products contain parabens or sulfates?",
          answer: "No, all LooksPure products are formulated without parabens, sulfates, phthalates, and other potentially harmful ingredients. We prioritize clean, effective formulations."
        },
        {
          question: "How do I know which products are right for my skin type?",
          answer: "We recommend taking our skin quiz on the website to get personalized product recommendations. You can also contact our customer service team for personalized advice."
        }
      ]
    },
    {
      category: "Account & Payment",
      questions: [
        {
          question: "How do I create an account?",
          answer: "You can create an account by clicking the 'Account' icon in the top right corner of our website and selecting 'Create Account'. You'll need to provide your email address and create a password."
        },
        {
          question: "What payment methods do you accept?",
          answer: "We accept all major credit cards (Visa, Mastercard, American Express), PayPal, UPI, and net banking for Indian customers."
        },
        {
          question: "Is my payment information secure?",
          answer: "Yes, we use industry-standard encryption and security measures to protect your payment information. We are PCI DSS compliant and never store your full credit card details on our servers."
        },
        {
          question: "Can I change or cancel my order after it's placed?",
          answer: "We process orders quickly to ensure fast shipping. Please contact our customer service team immediately if you need to change or cancel your order, but we cannot guarantee changes once the order processing has begun."
        }
      ]
    }
  ]

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
            Frequently Asked Questions
          </h1>

          <div
            ref={contentRef}
            className="space-y-10 text-lg opacity-0 transform translate-y-8 transition-all duration-700"
          >
            {faqs.map((category, categoryIndex) => (
              <div key={categoryIndex} className="mb-12">
                <h2 className="text-3xl font-bold mb-6 inline-block border-b-2 border-gray-300 pb-2">
                  {category.category}
                </h2>

                <div className="space-y-4">
                  {category.questions.map((faq, faqIndex) => {
                    const index = `${categoryIndex}-${faqIndex}`
                    return (
                      <div
                        key={index}
                        className="border border-gray-200 rounded-lg overflow-hidden transition-all duration-300"
                      >
                        <button
                          onClick={() => toggleFaq(index)}
                          className={`flex justify-between items-center w-full text-left font-medium p-6 focus:outline-none transition-colors duration-300 ${openFaq === index ? 'bg-black text-white' : 'bg-white text-black hover:bg-gray-50'
                            }`}
                        >
                          <span className="text-xl">{faq.question}</span>
                          <span className={`transition-transform duration-300 ${openFaq === index ? 'transform rotate-45' : ''
                            }`}>
                            +
                          </span>
                        </button>

                        <div
                          className={`overflow-hidden transition-all duration-500 ${openFaq === index
                              ? 'max-h-96 opacity-100'
                              : 'max-h-0 opacity-0'
                            }`}
                        >
                          <div className="p-6 bg-gray-50">
                            <p>{faq.answer}</p>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            ))}

            <div className="mt-16 p-8 bg-gray-50 rounded-lg border border-gray-200">
              <h2 className="text-2xl font-bold mb-4">Still have questions?</h2>
              <p className="mb-6">If you couldn&apos;t find the answer to your question, please contact our customer support team.</p>
              <a
                href="/help"
                className="inline-block px-6 py-3 bg-black text-white rounded hover:bg-gray-800 transition-colors duration-300"
              >
                Contact Support
              </a>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}