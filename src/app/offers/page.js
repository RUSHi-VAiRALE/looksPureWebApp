import ProductGrid from '@/components/ProductGrid';
import Hero from '@/components/Hero';

function Offers() {
  return (<main className="min-h-screen w-full">
      {/* Hero Banner */}
      <Hero />
      
      {/* Skin Type Filter */}
      <div className="w-full mx-auto">
        {/* <h2 className="text-2xl font-bold text-gray-900 mb-8">Shop By Skin Type</h2>

        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                selectedCategory === category
                  ? 'bg-black text-white'
                  : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
              }`}
            >
              {category === 'all' ? 'All Types' : category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div> */}
        
        {/* Product Grid */}
        <ProductGrid category="Skincare" />
      </div>
      
      {/* Newsletter */}
    </main>
  )
}

export default Offers