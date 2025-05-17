'use client'
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { FaStar } from "react-icons/fa";
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { collection, query, where, getDocs, orderBy, limit,getFirestore } from "firebase/firestore";
import { app } from "@/lib/firebase";
import ProductSpotlight from "./ProductSpotlight";

export default function TrendingProducts({
  title = "TRENDING AT LOOKSPURE",
  categories = ["NEW LAUNCHES", "BESTSELLERS"],
  viewAllLinks = ["/new-launches", "/bestsellers"],
  showRatings = true,
  maxProducts = 8
}) {
  const [activeCategory, setActiveCategory] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const db = getFirestore(app)
  // Reset index when category changes
  useEffect(() => {
    setCurrentIndex(0);
  }, [activeCategory]);

  // Fetch products based on active category
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError(null);
      
      try {
        const currentCategory = categories[activeCategory].toLowerCase().replace(/\s+/g, '');
        let productsQuery;
        
        // Different query logic based on category
        switch(currentCategory) {
          case 'newlaunches':
            // Get products created in the last 30 days
            const thirtyDaysAgo = new Date();
            thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
            
            productsQuery = query(
              collection(db, "products"),
              where("isActive", "==", true),
              orderBy("createdAt", "desc"),
              limit(maxProducts)
            );
            break;
            
          case 'bestsellers':
            productsQuery = query(
              collection(db, "products"),
              where("isActive", "==", true),
              orderBy("rating", "desc"),
              limit(maxProducts)
            );
            break;
            
          case 'eliteedition':
          case 'on-the-goessential':
          case 'lookspureplayrange':
          case 'skincareessentials':
            // Map UI categories to database categories
            const categoryMap = {
              'eliteedition': 'bestseller',
              'on-the-goessential': 'new',
              'lookspureplayrange': 'facecare',
              'skincareessentials': 'skincare'
            };
            
            const dbCategory = categoryMap[currentCategory] || currentCategory;
            
            productsQuery = query(
              collection(db, "products"),
              where("isActive", "==", true),
              where("category", "==", dbCategory),
              limit(maxProducts)
            );
            break;
            
          default:
            // Default query for any other category
            productsQuery = query(
              collection(db, "products"),
              where("category", "==", currentCategory),
              limit(maxProducts)
            );
        }
        
        const querySnapshot = await getDocs(productsQuery);
        const fetchedProducts = [];
        
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          fetchedProducts.push({
            id: doc.id,
            name: data.name,
            price: data.price,
            originalPrice: data.originalPrice,
            discount: data.discount,
            image: data.images && data.images.length > 0 ? data.images[0].src : '/placeholder.jpg',
            reviews: data.reviewCount || 0,
            rating: data.rating || 0
          });
        });
        
        setProducts(fetchedProducts);
      } catch (err) {
        console.error("Error fetching products:", err);
        setError("Failed to load products. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    
    fetchProducts();
  }, [activeCategory, categories, maxProducts]);

  const handleCategoryChange = (index) => {
    if (index === activeCategory) return;
    
    setIsTransitioning(true);
    setTimeout(() => {
      setActiveCategory(index);
      setTimeout(() => {
        setIsTransitioning(false);
      }, 300);
    }, 300);
  };

  const getVisibleProducts = () => {
    if (typeof window !== 'undefined') {
      const width = window.innerWidth
      if (width >= 1280) return 4 // Desktop
      if (width >= 1024) return 3 // Laptop
      if (width >= 768) return 2 // Tablet
      return 1 // Mobile
    }
    return 4
  }

  const next = () => {
    const visibleProducts = getVisibleProducts();
    setCurrentIndex((prev) => 
      Math.min(prev + visibleProducts, products.length - visibleProducts)
    );
  }

  const prev = () => {
    const visibleProducts = getVisibleProducts();
    setCurrentIndex((prev) => Math.max(prev - visibleProducts, 0));
  }

  const viewAllLink = viewAllLinks[activeCategory] || "#";
  console.log(products)
  return (
    <section className="py-12 px-4 max-w-7xl mx-auto">
      {title && (
        <h2 className="text-center text-sm uppercase tracking-widest text-gray-500 mb-6">
          {title}
        </h2>
      )}
      
      {/* Category Tabs */}
      {categories.length > 1 && (
        <div className="flex justify-center mb-10">
          <div className="inline-flex items-center">
            {categories.map((category, index) => (
              <button
                key={index}
                className={`px-2 sm:px-4 md:px-6 py-2 uppercase text-sm sm:text-base md:text-lg font-medium transition-all duration-300 tracking-[0.15em] sm:tracking-[0.2em] md:tracking-[0.3em] ${
                  activeCategory === index 
                    ? 'text-black' 
                    : 'text-black hover:text-gray-800'
                }`}
                onClick={() => handleCategoryChange(index)}
              >
                {category}
                {activeCategory === index && (
                  <div className="h-px w-full bg-black mt-2"></div>
                )}
              </button>
            ))}
          </div>
        </div>
      )}
      
      {/* Products Carousel */}
      <div className="relative">
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-black"></div>
          </div>
        ) : error ? (
          <div className="flex justify-center items-center h-64">
            <p className="text-red-500">{error}</p>
          </div>
        ) : products.length === 0 ? (
          <div className="flex justify-center items-center h-64">
            <p className="text-gray-500">No products available in this category.</p>
          </div>
        ) : (
          <div className="overflow-hidden">
            <div 
              className={`flex transition-all duration-300 ${
                isTransitioning ? 'opacity-0' : 'opacity-100'
              }`}
              style={{ transform: `translateX(-${currentIndex * (100 / getVisibleProducts())}%)` }}
            >
              {products.map((product) => (
                <Link key={product.id} href={`/singleProduct/${product.id}`} className="w-full min-w-[100%] sm:min-w-[50%] lg:min-w-[25%] px-3 group">
                  {/* Product Image */}
                  <div className="relative mb-4 overflow-hidden bg-gray-100 rounded-sm aspect-square h-[250px] w-full">
                    {product.discount && (
                      <div className="absolute top-2 left-2 z-10 bg-black text-white text-xs px-2 py-1">
                        {product.discount}%
                      </div>
                    )}
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                  
                  {/* Product Info */}
                    <h3 className="text-sm font-medium uppercase tracking-wider mb-1">
                      {product.name}
                    </h3>
                    
                    {showRatings && (
                      <div className="flex items-center mb-2">
                      <div className="flex mr-2">
                        {[...Array(5)].map((_, i) => (
                          <FaStar 
                            key={i} 
                            className={i < Math.floor(product.rating) ? "text-black w-3 h-3" : "text-gray-300 w-3 h-3"} 
                          />
                        ))}
                      </div>
                      <span className="text-xs text-gray-500">({product.reviews})</span>
                    </div>
                  )}
                  <div className="flex items-center">
                    <span className="font-medium">₹{product.price.toFixed(2)}</span>
                    {product.originalPrice && (
                      <span className="ml-2 text-sm text-gray-500 line-through">
                        ₹{product.originalPrice.toFixed(2)}
                      </span>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Navigation Buttons - Only show if we have products and more than visible count */}
        {!loading && !error && products.length > getVisibleProducts() && (
          <>
            <button
              onClick={prev}
              disabled={currentIndex === 0}
              className="absolute left-0 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full shadow-md disabled:opacity-50 z-10"
            >
              <FiChevronLeft size={24} />
            </button>
            <button
              onClick={next}
              disabled={currentIndex >= products.length - getVisibleProducts()}
              className="absolute right-0 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full shadow-md disabled:opacity-50 z-10"
            >
              <FiChevronRight size={24} />
            </button>
          </>
        )}
      </div>

      {/* View All Button - Only show if we have products */}
      {!loading && !error && products.length > 0 && viewAllLink && (
        <div className="flex justify-center mt-10">
          <Link 
            href={viewAllLink}
            className="px-8 py-3 border border-black text-white bg-black hover:bg-white hover:text-black transition-colors duration-300 uppercase text-sm tracking-wider font-medium"
          >
            View All
          </Link>
        </div>
      )}
    </section>
  );
}