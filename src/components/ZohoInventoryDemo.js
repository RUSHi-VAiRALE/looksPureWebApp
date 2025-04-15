// ZohoInventoryDemo.js - Demo component for Zoho Inventory API integration
'use client';

import { useState, useEffect } from 'react';
import { getAuthorizationUrl, parseHashFragment, getStoredAccessToken, clearStoredTokens, fetchProducts, fetchProductById } from '../api/zoho';

const ZohoInventoryDemo = () => {
  const [accessToken, setAccessToken] = useState(null);
  const [products, setProducts] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Check for access token in URL hash or localStorage on component mount
  useEffect(() => {
    // First check if we have a token in the URL hash (from redirect)
    const tokenData = parseHashFragment();
    if (tokenData && tokenData.access_token) {
      setAccessToken(tokenData.access_token);
      // Clean up URL
      window.history.replaceState({}, document.title, window.location.pathname);
      return;
    }
    
    // If not in URL, check if we have a stored token
    const storedToken = getStoredAccessToken();
    if (storedToken) {
      setAccessToken(storedToken);
    }
  }, []);

  // Handle authorization
  const handleAuthorize = () => {
    const authUrl = getAuthorizationUrl();
    window.location.href = authUrl;
  };

  // Handle logout/clear tokens
  const handleLogout = () => {
    clearStoredTokens();
    setAccessToken(null);
    setProducts(null);
    setSelectedProduct(null);
  };

  // Handle fetching products
  const handleFetchProducts = async () => {
    if (!accessToken) {
      setError('No access token available. Please authorize first.');
      return;
    }
    
    setLoading(true);
    setError(null);
    
    try {
      const productsData = await fetchProducts(accessToken);
      setProducts(productsData);
      console.log('Products fetched:', productsData);
    } catch (err) {
      // If we get an authentication error, the token might be expired
      if (err.message.includes('401') || err.message.includes('auth')) {
        handleLogout(); // Clear the invalid token
        setError('Your session has expired. Please authorize again.');
      } else {
        setError('Failed to fetch products: ' + err.message);
      }
      console.error('Products fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  // Handle fetching a specific product
  const handleFetchProduct = async (itemId) => {
    if (!accessToken) {
      setError('No access token available. Please authorize first.');
      return;
    }
    
    setLoading(true);
    setError(null);
    
    try {
      const productData = await fetchProductById(accessToken, itemId);
      setSelectedProduct(productData);
      console.log('Product details fetched:', productData);
    } catch (err) {
      // If we get an authentication error, the token might be expired
      if (err.message.includes('401') || err.message.includes('auth')) {
        handleLogout(); // Clear the invalid token
        setError('Your session has expired. Please authorize again.');
      } else {
        setError('Failed to fetch product details: ' + err.message);
      }
      console.error('Product details fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">Zoho Inventory API Demo</h2>
      
      {/* Authorization Section */}
      <div className="mb-8 p-4 border border-gray-200 dark:border-gray-700 rounded-md">
        <h3 className="text-xl font-semibold mb-4 text-gray-700 dark:text-gray-300">1. Authorization</h3>
        
        {!accessToken ? (
          <button 
            onClick={handleAuthorize}
            disabled={loading}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-400"
          >
            {loading ? 'Processing...' : 'Authorize with Zoho'}
          </button>
        ) : (
          <div className="p-3 bg-green-100 dark:bg-green-900 rounded-md">
            <div className="flex justify-between items-center">
              <p className="text-green-800 dark:text-green-200">✓ Authorization successful!</p>
              <button
                onClick={handleLogout}
                className="text-sm px-3 py-1 bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200 rounded-md hover:bg-red-200 dark:hover:bg-red-800"
              >
                Logout
              </button>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Access token: {accessToken.substring(0, 10)}...</p>
          </div>
        )}
      </div>
      
      {/* Products Section */}
      <div className="mb-8 p-4 border border-gray-200 dark:border-gray-700 rounded-md">
        <h3 className="text-xl font-semibold mb-4 text-gray-700 dark:text-gray-300">2. Fetch Products</h3>
        
        <button 
          onClick={handleFetchProducts}
          disabled={loading || !accessToken}
          className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 disabled:bg-gray-400"
        >
          {loading ? 'Loading...' : 'Fetch All Products'}
        </button>
        
        {products && (
          <div className="mt-4">
            <h4 className="font-medium text-lg mb-2 text-gray-700 dark:text-gray-300">Products List:</h4>
            {products.items && products.items.length > 0 ? (
              <ul className="divide-y divide-gray-200 dark:divide-gray-700">
                {products.items.map(item => (
                  <li key={item.item_id} className="py-3">
                    <div className="flex justify-between items-center">
                      <span className="font-medium text-gray-800 dark:text-gray-200">{item.name}</span>
                      <button
                        onClick={() => handleFetchProduct(item.item_id)}
                        className="text-sm px-3 py-1 bg-gray-200 dark:bg-gray-700 rounded-md hover:bg-gray-300 dark:hover:bg-gray-600"
                      >
                        View Details
                      </button>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">SKU: {item.sku || 'N/A'}</p>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-600 dark:text-gray-400">No products found.</p>
            )}
          </div>
        )}
      </div>
      
      {/* Selected Product Details */}
      {selectedProduct && (
        <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-md">
          <h3 className="text-xl font-semibold mb-4 text-gray-700 dark:text-gray-300">3. Product Details</h3>
          
          <div className="bg-gray-100 dark:bg-gray-900 p-4 rounded-md">
            <h4 className="font-bold text-lg mb-2 text-gray-800 dark:text-gray-200">{selectedProduct.item?.name}</h4>
            
            <div className="grid grid-cols-2 gap-4 mt-3">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Item ID:</p>
                <p className="text-gray-800 dark:text-gray-200">{selectedProduct.item?.item_id}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">SKU:</p>
                <p className="text-gray-800 dark:text-gray-200">{selectedProduct.item?.sku || 'N/A'}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Status:</p>
                <p className="text-gray-800 dark:text-gray-200">{selectedProduct.item?.status || 'N/A'}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Stock on Hand:</p>
                <p className="text-gray-800 dark:text-gray-200">
                  {selectedProduct.item?.stock_on_hand !== undefined ? selectedProduct.item.stock_on_hand : 'N/A'}
                </p>
              </div>
            </div>
            
            {selectedProduct.item?.description && (
              <div className="mt-4">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Description:</p>
                <p className="text-gray-800 dark:text-gray-200">{selectedProduct.item.description}</p>
              </div>
            )}
          </div>
        </div>
      )}
      
      {/* Error Display */}
      {error && (
        <div className="mt-4 p-3 bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200 rounded-md">
          <p className="font-medium">Error:</p>
          <p>{error}</p>
        </div>
      )}
    </div>
  );
};

export default ZohoInventoryDemo;
