'use client'
import { useState } from 'react';
import { useCart } from '@/context/CartContext';
import ProductImageCarousel from './product/ProductImageCarousel';
import ProductDetails from './product/ProductDetails';
import ProductInfo from './product/ProductInfo';
import RelatedProducts from './product/RelatedProducts';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function ProductDetail({ product }) {
  const [selectedShade, setSelectedShade] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [expandedSection, setExpandedSection] = useState('description');
  
  // Get cart functions from context
  const { addToCart } = useCart();
  
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
      addToCart(product, quantity);
      setIsAddingToCart(false);
    }, 500);
  };
  
  const toggleSection = (section) => {
    if (expandedSection === section) {
      setExpandedSection(null);
    } else {
      setExpandedSection(section);
    }
  };
  
  return (
    <div className="bg-white pt-[100px]"> 
      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {/* Mobile and Tablet Layout (default) */}
        <div className="lg:hidden">
          {/* Product Image Carousel */}
          <div>
            <ProductImageCarousel images={product.images} />
          </div>
          
          {/* Product Info */}
          <div className="mt-8">
            <ProductInfo 
              product={product}
              quantity={quantity}
              decreaseQuantity={decreaseQuantity}
              increaseQuantity={increaseQuantity}
              handleAddToCart={handleAddToCart}
              isAddingToCart={isAddingToCart}
            />
          </div>
          
          {/* Product Details Expandable Sections */}
          <div className="mt-8">
            <ProductDetails 
              product={product} 
              expandedSection={expandedSection} 
              toggleSection={toggleSection} 
            />
          </div>
        </div>
        
        {/* Desktop and Laptop Layout */}
        <div className="hidden lg:grid lg:grid-cols-2 lg:gap-x-8">
          {/* Product Images and Details - Left Column */}
          <div className="lg:max-w-lg lg:self-start overflow-y-auto">
            {/* Product Image Carousel */}
            <ProductImageCarousel images={product.images} />
            
            {/* Product Details Expandable Sections */}
            <ProductDetails 
              product={product} 
              expandedSection={expandedSection} 
              toggleSection={toggleSection} 
            />
          </div>
          
          {/* Product Info - Right Column */}
          <div className="mt-10 lg:mt-0 lg:ml-8">
            <ProductInfo 
              product={product}
              quantity={quantity}
              decreaseQuantity={decreaseQuantity}
              increaseQuantity={increaseQuantity}
              handleAddToCart={handleAddToCart}
              isAddingToCart={isAddingToCart}
            />
          </div>
        </div>
        
        {/* Related Products */}
        {/* <RelatedProducts products={product.relatedProducts} /> */}
      </div>
    </div>
  );
}