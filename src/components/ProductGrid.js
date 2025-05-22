'use client'
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FaHeart, FaRegHeart, FaStar } from 'react-icons/fa';
import { useCart } from '@/context/CartContext';
import DesktopFilters from './DesktopFilters';
import MobileFilters from './MobileFilters';
import SortOptions from './SortOptions';
import { getFirestore, collection, query, where, getDocs, orderBy } from 'firebase/firestore';
import { app } from '@/lib/firebase';

export default function ProductGrid({ category = 'All', bestsellersOnly = false }) {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [favorites, setFavorites] = useState({});
  const [inStockOnly, setInStockOnly] = useState(false);
  const [priceRange, setPriceRange] = useState([0, 2000]);
  const [sortOption, setSortOption] = useState('featured');
  const [showSortOptions, setShowSortOptions] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();
  const db = getFirestore(app);
  
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        let productsQuery;
        
        if (bestsellersOnly) {
          productsQuery = query(
            collection(db, 'products'), 
            where('isBestseller', '==', true),
            orderBy('createdAt', 'desc')
          );
        } else if (category !== 'All') {
          productsQuery = query(
            collection(db, 'products'), 
            where('category', '==', category),
            orderBy('createdAt', 'desc')
          );
        } else {
          productsQuery = query(
            collection(db, 'products'),
            orderBy('createdAt', 'desc')
          );
        }
        
        const querySnapshot = await getDocs(productsQuery);
        const productsData = [];
        
        querySnapshot.forEach((doc) => {
          productsData.push({
            id: doc.id,
            ...doc.data(),
            // Ensure price is a number for sorting
            price: parseFloat(doc.data().price || 0),
            salePrice: doc.data().salePrice ? parseFloat(doc.data().salePrice) : null
          });
        });
        
        setProducts(productsData);
        setFilteredProducts(productsData);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchProducts();
  }, [category, bestsellersOnly, db]);


  // Apply filters and sorting
  useEffect(() => {
    let result = [...products];
    
    // Apply in-stock filter
    if (inStockOnly) {
      result = result.filter(product => product.inStock);
    }
   
    // Apply price range filter
    result = result.filter(product => 
      product.price >= priceRange[0] && product.price <= priceRange[1]
    );
    
    // Apply sorting
    switch (sortOption) {
      case 'bestseller':
        result.sort((a, b) => (b.isBestseller ? 1 : 0) - (a.isBestseller ? 1 : 0));
        break;
      case 'az':
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'za':
        result.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case 'priceHighToLow':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'priceLowToHigh':
        result.sort((a, b) => a.price - b.price);
        break;
      default:
        // Default sorting (featured)
        break;
    }
    
    setFilteredProducts(result);
  }, [products, inStockOnly, priceRange, sortOption]);

  const toggleFavorite = (productId) => {
    setFavorites(prev => ({
      ...prev,
      [productId]: !prev[productId]
    }));
  };

  const handleAddToCart = (product) => {
    addToCart(product, 1);
  };

  // Product card component to avoid repetition
  const ProductCard = ({ product }) => (
    <div className="group relative overflow-hidden">
      {/* Sale Badge */}
      {product.onSale && (
        <div className="absolute top-0 left-0 z-10 bg-black text-white text-xs font-bold px-3 py-1">
          {product.discountPercentage ? `SAVE ${product.discountPercentage}%` : 'ON SALE'}
        </div>
      )}
      
      {/* Product Image */}
      <Link href={`/singleProduct/${product.id}`} className="block aspect-square overflow-hidden">
        <Image
          src={product.images[0].src}
          alt={product.name}
          width={300}
          height={300}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
        />
      </Link>
      
      {/* Product Info */}
      <div className="pt-4 pb-2 px-1">
        <div className="uppercase text-center text-xs font-medium mb-1">
          {product.name}
        </div>
        
        <div className="text-center mb-2">
          {product.onSale ? (
            <div className="flex justify-center items-center space-x-2">
              <p className="text-sm font-medium">₹{product.salePrice?.toFixed(2) || product.price.toFixed(2)}</p>
              <p className="text-xs text-gray-500 line-through">₹{product.price.toFixed(2)}</p>
            </div>
          ) : (
            <p className="text-sm font-medium">₹{product.price.toFixed(2)}</p>
          )}
        </div>
        
        {/* Rating Stars - Only show if rating is available */}
        {product.rating && (
          <div className="flex justify-center items-center mb-2">
            {[...Array(5)].map((_, i) => (
              <FaStar 
                key={i} 
                className={`w-3 h-3 ${i < Math.floor(product.rating) ? 'text-yellow-400' : 'text-gray-300'}`} 
              />
            ))}
            <span className="ml-1 text-xs text-gray-500">
              ({product.reviewCount || 0})
            </span>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="relative w-full">
      {/* Loading state */}
      {loading && (
        <div className="w-full py-20 flex justify-center items-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-black"></div>
        </div>
      )}

      {!loading && (
        <>
          {/* Mobile Filters - Only visible on smaller screens */}
          <div className="md:hidden">
            <MobileFilters 
              inStockOnly={inStockOnly}
              setInStockOnly={setInStockOnly}
              priceRange={priceRange}
              setPriceRange={setPriceRange}
              sortOption={sortOption}
              setSortOption={setSortOption}
              showFilters={showFilters}
              setShowFilters={setShowFilters}
              showSortOptions={showSortOptions}
              setShowSortOptions={setShowSortOptions}
            />
            
            {/* Mobile Product Grid */}
            <div className="grid grid-cols-2 gap-4 mt-4 px-4 sm:px-6 lg:px-12">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>

          {/* Desktop View with Sticky Filters */}
          <div className="hidden md:block w-full">
            <div className="w-full flex justify-end mb-6 border-b-1 border-gray-300">
              <SortOptions 
                sortOption={sortOption}
                setSortOption={setSortOption}
              />
            </div>
            
            <div className="flex px-4 sm:px-6 lg:px-12">
              {/* Left sidebar with filters */}
              <div className="w-48 flex-shrink-0">
                <div className="sticky top-24">
                  <DesktopFilters 
                    inStockOnly={inStockOnly}
                    setInStockOnly={setInStockOnly}
                    priceRange={priceRange}
                    setPriceRange={setPriceRange}
                    sortOption={sortOption}
                    setSortOption={setSortOption}
                  />
                </div>
              </div>
              
              {/* Product Grid - Right side */}
              <div className="flex-1 pl-8">
                <div className="grid grid-cols-3 lg:grid-cols-4 gap-6">
                  {filteredProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
                
                {/* Empty state when no products match filters */}
                {filteredProducts.length === 0 && (
                  <div className="py-12 text-center">
                    <p className="text-gray-500">No products match your current filters.</p>
                    <button 
                      onClick={() => {
                        setInStockOnly(false);
                        setPriceRange([0, 2000]);
                        setSortOption('featured');
                      }}
                      className="mt-4 text-sm text-black underline"
                    >
                      Reset all filters
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}