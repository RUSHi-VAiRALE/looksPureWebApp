'use client'
import Image from 'next/image'
import { FiStar } from 'react-icons/fi'

export default function ProductCard({ product }) {
  return (
    <div className="flex flex-col bg-white rounded-lg shadow-sm p-4 h-full">
      {/* Badge */}
      <div className="relative">
        <span className="absolute -top-4 -left-4 z-100 bg-pink-500 text-white text-xs px-2 py-1 rounded">
          {product.badge}
        </span>
        <div className="relative h-[200px] w-full mb-4">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-contain"
          />
        </div>
      </div>

      {/* Product Info */}
      <h3 className="text-lg font-semibold mb-2 line-clamp-2">{product.name}</h3>
      
      {/* Features */}
      <div className="flex flex-wrap gap-2 mb-2">
        {product.features.map((feature, index) => (
          <span key={index} className="text-sm text-gray-600">
            {index > 0 && <span className="mx-2">|</span>}
            {feature}
          </span>
        ))}
      </div>

      {/* Rating */}
      <div className="flex items-center gap-2 mb-2">
        <div className="flex items-center">
          <FiStar className="fill-yellow-400 text-yellow-400" />
          <span className="ml-1 text-sm">{product.rating}</span>
        </div>
        <span className="text-sm text-gray-500">
          {product.reviews} Reviews
        </span>
      </div>

      {/* Price */}
      <div className="flex items-center gap-2 mt-auto">
        <span className="text-lg font-bold">₹{product.price}</span>
        <span className="text-gray-500 line-through">₹{product.originalPrice}</span>
        <span className="text-green-600 text-sm">{product.discount}% off</span>
      </div>

      <button className="mt-4 w-full bg-emerald-500 text-white py-2 rounded hover:bg-emerald-600 transition-colors">
        ADD TO CART
      </button>
    </div>
  )
}