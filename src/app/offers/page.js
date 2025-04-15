import ProductGrid from '@/components/ProductGrid';
import Hero from '@/components/Hero';
import { productDetails } from '@/data/productDetails';
import Image from 'next/image';
import Link from 'next/link';
function Offers() {
  return (<main className="max-w-2xl mx-auto px-4 py-8 pt-32 sm:px-6 lg:px-8">
      {/* Hero Banner */}
      {/* <Hero /> */}
      
      {/* Skin Type Filter */}
      {/* <div className="w-full mx-auto">
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
        {/* <ProductGrid category="Skincare" />
      </div> */}
      <h1 className='text-center text-3xl tracking-widest mt-8'>OFFER</h1>
      <div className="space-y-4">
          {/* <p>{productDetails.longDescription}</p> */}
          
          {/* Product Images in Description */}
          <div className="grid grid-cols-1 gap-4 mt-10">
            {productDetails.images.map((image, index) => (
              <Link key={index} href="/offers/1">
                <div className="aspect-square overflow-hidden">
                <Image
                  src={image.src}
                  alt={image.alt}
                  width={600}
                  height={600}
                  className="w-full h-full object-center object-cover"
                />
              </div>
              </Link>
            ))}
          </div>
          
          {/* <h3 className="font-medium text-gray-900 mt-6 mb-2">Features:</h3>
          <ul className="list-disc pl-5 space-y-2">
            {productDetails.features.map((feature, index) => (
              <li key={index}>{feature}</li>
            ))}
          </ul> */}
        </div>
      {/* Newsletter */}
    </main>
  )
}

export default Offers