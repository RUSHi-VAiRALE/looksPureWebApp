'use client'
import { useState, useEffect, useRef } from 'react'

// export const metadata = {
//   title: 'Beauty Knowledge | LooksPure',
//   description: 'Learn about skincare ingredients, routines, and beauty tips from LooksPure experts',
// }

export default function KnowledgePage() {
  const [activeCategory, setActiveCategory] = useState('ingredients')
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

  const categories = [
    { id: 'ingredients', name: 'Ingredients Guide' },
    { id: 'routines', name: 'Skincare Routines' },
    { id: 'concerns', name: 'Skin Concerns' },
    { id: 'tips', name: 'Beauty Tips' }
  ]

  const articles = {
    ingredients: [
      {
        title: "Understanding Hyaluronic Acid",
        excerpt: "Hyaluronic acid is a powerful humectant that can hold up to 1000 times its weight in water, making it essential for hydration.",
        image: "/images/placeholder.jpg"
      },
      {
        title: "The Power of Vitamin C",
        excerpt: "Vitamin C is a potent antioxidant that brightens skin, boosts collagen production, and protects against environmental damage.",
        image: "/images/placeholder.jpg"
      },
      {
        title: "Retinol: The Gold Standard",
        excerpt: "Retinol is considered the gold standard in anti-aging ingredients, promoting cell turnover and collagen production.",
        image: "/images/placeholder.jpg"
      },
      {
        title: "Niacinamide Benefits",
        excerpt: "Niacinamide is a versatile ingredient that helps with everything from reducing inflammation to strengthening the skin barrier.",
        image: "/images/placeholder.jpg"
      }
    ],
    routines: [
      {
        title: "Morning Skincare Routine",
        excerpt: "A proper morning routine sets the foundation for protected, healthy skin throughout the day.",
        image: "/images/placeholder.jpg"
      },
      {
        title: "Evening Skincare Routine",
        excerpt: "Your evening routine is crucial for repair and regeneration while you sleep.",
        image: "/images/placeholder.jpg"
      },
      {
        title: "Weekly Exfoliation Guide",
        excerpt: "Regular exfoliation removes dead skin cells and promotes a brighter, smoother complexion.",
        image: "/images/placeholder.jpg"
      },
      {
        title: "Seasonal Skincare Adjustments",
        excerpt: "How to adapt your skincare routine for different seasons and climate conditions.",
        image: "/images/placeholder.jpg"
      }
    ],
    concerns: [
      {
        title: "Treating Acne Effectively",
        excerpt: "Evidence-based approaches to treating different types of acne for clearer skin.",
        image: "/images/placeholder.jpg"
      },
      {
        title: "Hyperpigmentation Solutions",
        excerpt: "Understanding the causes of hyperpigmentation and the most effective treatments.",
        image: "/images/placeholder.jpg"
      },
      {
        title: "Managing Sensitive Skin",
        excerpt: "Gentle approaches to caring for reactive, sensitive skin without triggering inflammation.",
        image: "/images/placeholder.jpg"
      },
      {
        title: "Anti-Aging Strategies",
        excerpt: "Preventative and corrective measures for addressing signs of aging at any stage.",
        image: "/images/placeholder.jpg"
      }
    ],
    tips: [
      {
        title: "Layering Products Correctly",
        excerpt: "The right order to apply skincare products for maximum effectiveness.",
        image: "/images/placeholder.jpg"
      },
      {
        title: "Sunscreen Application Guide",
        excerpt: "How to properly apply and reapply sunscreen for optimal protection.",
        image: "/images/placeholder.jpg"
      },
      {
        title: "Skin-Friendly Diet Tips",
        excerpt: "Foods that support skin health and those that may trigger issues.",
        image: "/images/placeholder.jpg"
      },
      {
        title: "Travel Skincare Essentials",
        excerpt: "How to maintain your skincare routine while traveling and adapt to different environments.",
        image: "/images/placeholder.jpg"
      }
    ]
  }

  return (
    <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-28">
      <div className="relative">
        {/* Decorative elements */}
        <div className="absolute -top-10 -left-10 w-40 h-40 bg-gray-100 rounded-full opacity-50 blur-3xl"></div>
        <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-gray-100 rounded-full opacity-50 blur-3xl"></div>
        
        <div className="relative">
          <h1 
            ref={headingRef}
            className="text-5xl font-bold mb-10 inline-block border-b-4 border-black pb-2 opacity-0 transition-opacity duration-700"
          >
            Beauty Knowledge
          </h1>
          
          <div 
            ref={contentRef}
            className="space-y-6 text-lg opacity-0 transform translate-y-8 transition-all duration-700"
          >
            <p className="text-xl">Explore our collection of expert articles and guides to help you understand skincare ingredients, build effective routines, and address specific skin concerns.</p>
            
            {/* Category Tabs */}
            <div className="border-b border-gray-200 mt-10">
              <div className="flex flex-wrap space-x-2 sm:space-x-8">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setActiveCategory(category.id)}
                    className={`py-4 px-1 border-b-2 font-medium text-lg transition-colors duration-300 ${
                      activeCategory === category.id 
                        ? 'border-black text-black' 
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    {category.name}
                  </button>
                ))}
              </div>
            </div>
            
            {/* Articles Grid */}
            <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-8">
              {articles[activeCategory].map((article, index) => (
                <div 
                  key={index}
                  className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="relative h-48 w-full bg-gray-200">
                    {/* Replace with actual images when available */}
                    <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                      Image Placeholder
                    </div>
                  </div>
                  <div className="p-6">
                    <h2 className="text-2xl font-bold mb-2">{article.title}</h2>
                    <p className="text-gray-600 mb-4">{article.excerpt}</p>
                    <button className="text-black font-medium hover:underline inline-flex items-center">
                      Read More
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 ml-1">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                      </svg>
                    </button>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Newsletter Signup */}
            <div className="mt-16 p-8 bg-black text-white rounded-lg">
              <div className="max-w-3xl mx-auto text-center">
                <h2 className="text-2xl font-bold mb-4">Stay Updated with Beauty Knowledge</h2>
                <p className="mb-6">Subscribe to our newsletter to receive the latest skincare tips, product recommendations, and exclusive content.</p>
                <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                  <input 
                    type="email" 
                    placeholder="Your email address" 
                    className="flex-grow px-4 py-3 rounded text-black focus:outline-none focus:ring-2 focus:ring-gray-400"
                    required
                  />
                  <button 
                    type="submit" 
                    className="px-6 py-3 bg-white text-black rounded hover:bg-gray-200 transition-colors duration-300"
                  >
                    Subscribe
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}