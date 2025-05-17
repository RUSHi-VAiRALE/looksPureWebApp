import { useState } from 'react';
import { FaStar, FaRegStar, FaStarHalfAlt, FaHeart, FaRegHeart, FaShoppingBag, FaShare } from 'react-icons/fa';
import { IoMdCheckmark } from 'react-icons/io';
import ProductReels from './ProductReels';
import { productReels } from '@/data/productReels';
import { useCart } from '@/context/CartContext';

export default function ProductInfo({ 
  product, 
  quantity, 
  decreaseQuantity, 
  increaseQuantity, 
  handleAddToCart, 
  isAddingToCart 
}) {
  const [isFavorite, setIsFavorite] = useState(false);
  const { setCartOpen } = useCart();
  
  // Generate star rating
  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    
    for (let i = 0; i < fullStars; i++) {
      stars.push(<FaStar key={`full-${i}`} className="text-yellow-400" />);
    }
    
    if (hasHalfStar) {
      stars.push(<FaStarHalfAlt key="half" className="text-yellow-400" />);
    }
    
    const remainingStars = 5 - stars.length;
    for (let i = 0; i < remainingStars; i++) {
      stars.push(<FaRegStar key={`empty-${i}`} className="text-yellow-400" />);
    }
    
    return stars;
  };
  
  // Handle add to cart with drawer opening
  const handleAddToCartWithDrawer = () => {
    handleAddToCart();
    // Open the cart drawer after adding the item
    setTimeout(() => {
      setCartOpen(true);
    }, 300); // Small delay to ensure the item is added first
  };
  
  return (
    <div className="lg:sticky lg:top-[100px] lg:self-start">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-2xl font-medium text-gray-900">{product.name}</h1>
          <h2 className="text-lg text-gray-600 mt-1">{product.subtitle}</h2>
        </div>
        <button 
          onClick={() => setIsFavorite(!isFavorite)}
          className="p-2 text-gray-400 hover:text-red-500 transition-colors"
        >
          {isFavorite ? <FaHeart className="text-red-500" /> : <FaRegHeart />}
        </button>
      </div>
      
      {/* Rating */}
      <div className="mt-4 flex items-center">
        <div className="flex items-center">
          {renderStars(product.rating)}
        </div>
        <p className="ml-2 text-sm text-gray-500">
          {product.rating} ({product.reviewCount} reviews)
        </p>
      </div>
      
      {/* Price */}
      <div className="mt-6 flex items-center">
        <p className="text-2xl font-medium text-gray-900">₹{product.price.toFixed(2)}</p>
        {product.originalPrice && (
          <>
            <p className="ml-3 text-lg text-gray-500 line-through">₹{product.originalPrice.toFixed(2)}</p>
            <p className="ml-3 text-sm font-medium text-red-600">{product.discount}%</p>
          </>
        )}
      </div>
      
      {/* Stock Status */}
      <div className="mt-4 flex items-center">
        <IoMdCheckmark className="text-emerald-500" />
        <span className="ml-2 text-sm text-emerald-600">{product.stockStatus}</span>
      </div>
      
      {/* Description */}
      {/* <div className="mt-6">
        <p className="text-base text-gray-700">{product.description}</p>
      </div> */}
      
      {/* Quantity */}
      <div className="mt-8">
        <h3 className="text-sm font-medium text-gray-900">Quantity</h3>
        <div className="mt-2 flex items-center border border-gray-300 rounded-md w-32">
          <button 
            onClick={decreaseQuantity}
            className="px-3 py-1 text-gray-600 hover:text-gray-900"
          >
            -
          </button>
          <input
            type="text"
            value={quantity}
            readOnly
            className="w-full text-center border-0 focus:ring-0"
          />
          <button 
            onClick={increaseQuantity}
            className="px-3 py-1 text-gray-600 hover:text-gray-900"
          >
            +
          </button>
        </div>
      </div>
      
      {/* Add to Cart & Buy Now */}
      <div className="mt-8">
        <button 
          onClick={handleAddToCartWithDrawer}
          disabled={isAddingToCart}
          className={`w-full bg-black text-white py-3 px-6 rounded-none transition-colors flex items-center justify-center ${isAddingToCart ? 'opacity-75 cursor-not-allowed' : 'hover:bg-gray-800'}`}
        >
          {isAddingToCart ? (
            <>
              <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Adding...
            </>
          ) : (
            <>
              <FaShoppingBag className="mr-2" />
              Add to Cart
            </>
          )}
        </button>
      </div>
      
      {/* Product Reels */}
      <ProductReels reels={productReels} />
    </div>
  );
}