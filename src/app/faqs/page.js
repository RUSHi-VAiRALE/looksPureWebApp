'use client'
import { useState } from 'react';
import { FiChevronDown, FiChevronUp } from 'react-icons/fi';

// export const metadata = {
//   title: 'FAQs | LooksPure',
//   description: 'Frequently asked questions about LooksPure products and services',
// }

export default function FAQsPage() {
  const [openFaq, setOpenFaq] = useState(null);
  
  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };
  
  const faqs = [
    {
      question: "What makes LooksPure products different?",
      answer: "LooksPure products are made with 100% natural ingredients and are free from harmful chemicals like parabens, sulfates, and synthetic fragrances. We prioritize your health and the environment in all our formulations."
    },
    {
      question: "Are your products suitable for sensitive skin?",
      answer: "Most of our products are formulated to be gentle and suitable for sensitive skin. However, we always recommend performing a patch test before using any new product, especially if you have sensitive skin or allergies."
    },
    {
      question: "Are your products cruelty-free?",
      answer: "Yes, all LooksPure products are cruelty-free. We never test on animals and we do not work with suppliers who test on animals."
    },
    {
      question: "How long will my order take to arrive?",
      answer: "Domestic orders typically arrive within 3-5 business days. International shipping times vary by location, but generally take 7-14 business days."
    },
    {
      question: "What is your return policy?",
      answer: "We accept returns within 30 days of purchase for unused and unopened products. Please visit our Return & Refund Policy page for more details."
    },
    {
      question: "Do you ship internationally?",
      answer: "Yes, we ship to most countries worldwide. Shipping costs and delivery times vary by location."
    },
    {
      question: "Are your packaging materials eco-friendly?",
      answer: "Yes, we use recyclable, biodegradable, or reusable packaging materials whenever possible as part of our commitment to sustainability."
    }
  ];
  
  return (
    <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-28">
      <h1 className="text-5xl font-bold mb-10">Frequently Asked Questions</h1>
      
      <div className="space-y-6 text-lg">
        <p>Find answers to commonly asked questions about our products, shipping, returns, and more.</p>
        
        <div className="mt-10 space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="border-b border-gray-200 pb-4">
              <button
                onClick={() => toggleFaq(index)}
                className="flex justify-between items-center w-full text-left font-medium text-gray-900 py-4 focus:outline-none"
              >
                <span className="text-xl">{faq.question}</span>
                {openFaq === index ? <FiChevronUp size={24} /> : <FiChevronDown size={24} />}
              </button>
              
              {openFaq === index && (
                <div className="mt-2 text-gray-600 pb-4">
                  <p>{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}