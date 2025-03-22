'use client'
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FaHeart, FaRegHeart, FaStar } from 'react-icons/fa';
import { useCart } from '@/context/CartContext';
import { getProductsByCategory, getBestsellers } from '@/data/products';

export default function ProductGrid({ category = 'All', bestsellersOnly = false }) {
  const [products, setProducts] = useState([]);
  const [favorites, setFavorites] = useState({});
  const { addToCart } = useCart();
  
  useEffect(() => {
    // Load products based on props
    if (bestsellersOnly) {
      setProducts(getBestsellers());
    } else {
      setProducts(getProductsByCategory(category));
    }
  }, [category, bestsellersOnly]);

  const toggleFavorite = (productId) => {
    setFavorites(prev => ({
      ...prev,
      [productId]: !prev[productId]
    }));
  };

  const handleAddToCart = (product) => {
    addToCart(product, 1, product.shades[0]);
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {products.map((product) => (
        <div key={product.id} className="group relative bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow">
          {/* Favorite Button */}
          <button 
            onClick={() => toggleFavorite(product.id)}
            className="absolute top-2 right-2 z-10 p-1.5 bg-white/80 rounded-full"
          >
            {favorites[product.id] ? (
              <FaHeart className="text-red-500 w-5 h-5" />
            ) : (
              <FaRegHeart className="text-gray-400 w-5 h-5" />
            )}
          </button>
          
          {/* Bestseller Badge */}
          {product.isBestseller && (
            <div className="absolute top-2 left-2 z-10 bg-black text-white text-xs font-bold px-2 py-1 rounded">
              BESTSELLER
            </div>
          )}
          
          {/* Product Image */}
          <Link href={`/products/${product.id}`} className="block aspect-square overflow-hidden">
            <Image
              src={product.image}
              alt={product.name}
              width={300}
              height={300}
              className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
            />
          </Link>
          
          {/* Product Info */}
          <div className="p-4">
            <Link href={`/products/${product.id}`} className="block">
              <h3 className="text-sm font-medium text-gray-900 hover:text-emerald-600 transition-colors">
                {product.name}
              </h3>
              <p className="mt-1 text-xs text-gray-500">{product.category}</p>
            </Link>
            
            {/* Rating */}
            <div className="mt-1 flex items-center">
              <div className="flex items-center">
                <FaStar className="text-yellow-400 w-3 h-3" />
                <span className="ml-1 text-xs text-gray-500">{product.rating} ({product.reviewCount})</span>
              </div>
            </div>
            
            {/* Price and Add to Cart */}
            <div className="mt-2 flex justify-between items-center">
              <p className="text-sm font-medium text-gray-900">₹{product.price.toFixed(2)}</p>
              <button 
                onClick={() => handleAddToCart(product)}
                className="text-xs bg-black text-white px-3 py-1.5 rounded-md hover:bg-gray-800 transition-colors"
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}