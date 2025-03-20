'use client'
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FaStar, FaRegStar, FaStarHalfAlt, FaHeart, FaRegHeart, FaShoppingBag, FaShare } from 'react-icons/fa';
import { IoMdCheckmark } from 'react-icons/io';
import { Tab } from '@headlessui/react';
import { useCart } from '@/context/CartContext';


function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function ProductDetail({ product }) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedShade, setSelectedShade] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  
  // Get cart functions from context
  const { addToCart } = useCart();
  
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
  
  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };
  
  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };
  
  const handleAddToCart = () => {
    setIsAddingToCart(true);
    
    // Simulate network delay for better UX
    setTimeout(() => {
      addToCart(product, quantity, product.shades[selectedShade]);
      setIsAddingToCart(false);
    }, 500);
  };
  
  const handleBuyNow = () => {
    addToCart(product, quantity, product.shades[selectedShade]);
    // Navigate to checkout page
    window.location.href = '/checkout';
  };
  
  return (
    <div className="bg-white pt-[100px]"> 
      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-2 lg:gap-x-8">
          {/* Product Images */}
          <div className="lg:max-w-lg lg:self-start">
            <div className="aspect-w-1 aspect-h-1 rounded-lg overflow-hidden">
              <Image
                src={product.images[selectedImage].src}
                alt={product.images[selectedImage].alt}
                width={600}
                height={600}
                className="w-full h-full object-center object-cover"
              />
            </div>
            
            {/* Image Thumbnails */}
            <div className="mt-4 grid grid-cols-4 gap-2">
              {product.images.map((image, index) => (
                <button
                  key={image.id}
                  onClick={() => setSelectedImage(index)}
                  className={classNames(
                    "relative rounded-md overflow-hidden",
                    selectedImage === index ? "ring-2 ring-emerald-500" : "ring-1 ring-gray-200"
                  )}
                >
                  <Image
                    src={image.src}
                    alt={image.alt}
                    width={100}
                    height={100}
                    className="w-full h-full object-center object-cover"
                  />
                </button>
              ))}
            </div>
          </div>
          
          {/* Product Info */}
          <div className="mt-10 lg:mt-0 lg:ml-8">
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
                  <p className="ml-3 text-sm font-medium text-red-600">{product.discount}</p>
                </>
              )}
            </div>
            
            {/* Stock Status */}
            <div className="mt-4 flex items-center">
              <IoMdCheckmark className="text-emerald-500" />
              <span className="ml-2 text-sm text-emerald-600">{product.stockStatus}</span>
            </div>
            
            {/* Description */}
            <div className="mt-6">
              <p className="text-base text-gray-700">{product.description}</p>
            </div>
            
            {/* Shade Selection */}
            {/* <div className="mt-8">
              <h3 className="text-sm font-medium text-gray-900">Shade</h3>
              <div className="mt-3 flex space-x-3">
                {product.shades.map((shade, index) => (
                  <button
                    key={shade.id}
                    onClick={() => setSelectedShade(index)}
                    className={classNames(
                      "relative rounded-full flex items-center justify-center w-10 h-10",
                      selectedShade === index ? "ring-2 ring-offset-2 ring-emerald-500" : ""
                    )}
                  >
                    <span 
                      className="absolute inset-1.5 rounded-full" 
                      style={{ backgroundColor: shade.color }}
                    />
                    <span className="sr-only">{shade.name}</span>
                  </button>
                ))}
              </div>
              <p className="mt-2 text-sm text-gray-500">{product.shades[selectedShade].name}</p>
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
            <div className="mt-8 flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <button 
                onClick={handleAddToCart}
                disabled={isAddingToCart}
                className={`flex-1 bg-emerald-600 text-white py-3 px-6 rounded-md hover:bg-emerald-700 transition-colors flex items-center justify-center ${isAddingToCart ? 'opacity-75 cursor-not-allowed' : ''}`}
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
              <button 
                onClick={handleBuyNow}
                className="flex-1 bg-black text-white py-3 px-6 rounded-md hover:bg-gray-800 transition-colors"
              >
                Buy Now
              </button>
            </div>
            
            {/* Share */}
            <div className="mt-6 flex items-center">
              <button className="flex items-center text-gray-500 hover:text-gray-700">
                <FaShare className="mr-2" />
                <span>Share</span>
              </button>
            </div>
          </div>
        </div>
        
        {/* Product Details Tabs */}
        <div className="mt-16">
          <Tab.Group>
            <Tab.List className="flex space-x-8 border-b border-gray-200">
              {['Details', 'How to Use', 'Ingredients', 'Reviews'].map((category) => (
                <Tab
                  key={category}
                  className={({ selected }) =>
                    classNames(
                      'py-4 px-1 text-sm font-medium focus:outline-none whitespace-nowrap',
                      selected
                        ? 'text-emerald-600 border-b-2 border-emerald-600'
                        : 'text-gray-500 hover:text-gray-700 border-b-2 border-transparent'
                    )
                  }
                >
                  {category}
                </Tab>
              ))}
            </Tab.List>
            <Tab.Panels className="mt-8">
              <Tab.Panel className="text-gray-700 space-y-4">
                <p>{product.longDescription}</p>
                <h3 className="font-medium text-gray-900 mt-6 mb-2">Features:</h3>
                <ul className="list-disc pl-5 space-y-2">
                  {product.features.map((feature, index) => (
                    <li key={index}>{feature}</li>
                  ))}
                </ul>
              </Tab.Panel>
              <Tab.Panel className="text-gray-700">
                <h3 className="font-medium text-gray-900 mb-4">Application Steps:</h3>
                <ol className="list-decimal pl-5 space-y-3">
                  {product.howToUse.map((step, index) => (
                    <li key={index} className="pl-2">{step}</li>
                  ))}
                </ol>
              </Tab.Panel>
              <Tab.Panel className="text-gray-700">
                <h3 className="font-medium text-gray-900 mb-4">Ingredients:</h3>
                <p className="leading-relaxed">{product.ingredients}</p>
              </Tab.Panel>
              <Tab.Panel className="text-gray-700">
                <div className="flex items-center mb-6">
                  <div className="flex items-center">
                    {renderStars(product.rating)}
                  </div>
                  <p className="ml-2 text-sm text-gray-500">
                    Based on {product.reviewCount} reviews
                  </p>
                </div>
                
                {/* Sample Reviews */}
                <div className="space-y-8">
                  <div className="border-b border-gray-200 pb-6">
                    <div className="flex items-center mb-2">
                      <div className="flex items-center text-yellow-400">
                        {[0, 1, 2, 3, 4].map((rating) => (
                          <FaStar key={rating} className={rating < 5 ? "text-yellow-400" : "text-gray-300"} />
                        ))}
                      </div>
                      <p className="ml-2 text-sm font-medium text-gray-900">Priya S.</p>
                      <span className="mx-2 text-gray-300">•</span>
                      <p className="text-sm text-gray-500">2 months ago</p>
                    </div>
                    <p className="text-gray-700">This blush is absolutely gorgeous! The formula is so lightweight and blends seamlessly into my skin. The peachy pink shade gives me the perfect natural flush. Will definitely repurchase!</p>
                  </div>
                  
                  <div className="border-b border-gray-200 pb-6">
                    <div className="flex items-center mb-2">
                      <div className="flex items-center text-yellow-400">
                        {[0, 1, 2, 3].map((rating) => (
                          <FaStar key={rating} className={rating < 4 ? "text-yellow-400" : "text-gray-300"} />
                        ))}
                        <FaRegStar />
                      </div>
                      <p className="ml-2 text-sm font-medium text-gray-900">Anjali R.</p>
                      <span className="mx-2 text-gray-300">•</span>
                      <p className="text-sm text-gray-500">1 month ago</p>
                    </div>
                    <p className="text-gray-700">I love the color and the skincare benefits, but I wish it lasted a bit longer on my oily skin. Still a great product though!</p>
                  </div>
                  
                  <div>
                    <div className="flex items-center mb-2">
                      <div className="flex items-center text-yellow-400">
                        {[0, 1, 2, 3, 4].map((rating) => (
                          <FaStar key={rating} className={rating < 5 ? "text-yellow-400" : "text-gray-300"} />
                        ))}
                      </div>
                      <p className="ml-2 text-sm font-medium text-gray-900">Meera K.</p>
                      <span className="mx-2 text-gray-300">•</span>
                      <p className="text-sm text-gray-500">3 weeks ago</p>
                    </div>
                    <p className="text-gray-700">This has become my go-to blush! The niacinamide in the formula has actually improved my skin texture over time. The berry blush shade is perfect for my deep skin tone. Highly recommend!</p>
                  </div>
                </div>
                
                {/* View All Reviews Button */}
                <div className="mt-8 text-center">
                  <button className="text-emerald-600 font-medium hover:text-emerald-700 transition-colors">
                    View All {product.reviewCount} Reviews
                  </button>
                </div>
              </Tab.Panel>
            </Tab.Panels>
          </Tab.Group>
        </div>
        
        {/* Related Products */}
        <div className="mt-20">
          <h2 className="text-2xl font-medium text-gray-900 mb-8">You May Also Like</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {product.relatedProducts.map((relatedProduct) => (
              <div key={relatedProduct.id} className="group">
                <div className="aspect-w-1 aspect-h-1 rounded-lg overflow-hidden bg-gray-100">
                  <Image
                    src={relatedProduct.image}
                    alt={relatedProduct.name}
                    width={300}
                    height={300}
                    className="w-full h-full object-center object-cover group-hover:opacity-90 transition-opacity"
                  />
                </div>
                <div className="mt-4">
                  <h3 className="text-sm font-medium text-gray-900">{relatedProduct.name}</h3>
                  <p className="text-xs text-gray-500 mt-1">{relatedProduct.subtitle}</p>
                  <p className="text-sm font-medium text-gray-900 mt-2">₹{relatedProduct.price.toFixed(2)}</p>
                </div>
                <Link
                  href={`/products/${relatedProduct.id}`}
                  className="mt-2 inline-block text-sm text-emerald-600 hover:text-emerald-700"
                >
                  View Product
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}