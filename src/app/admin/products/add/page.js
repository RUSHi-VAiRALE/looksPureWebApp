'use client'
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { auth } from '@/lib/firebase';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import AdminLayout from '@/components/admin/AdminLayout';

export default function AddProductPage() {
  const router = useRouter();
  const [isAdmin, setIsAdmin] = useState(true);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [imageFiles, setImageFiles] = useState([]);
  const [imageUrls, setImageUrls] = useState([]);
  const [features, setFeatures] = useState(['']);
  const [howToUse, setHowToUse] = useState(['']);
  const storage = getStorage();

  // Form state
  const [product, setProduct] = useState({
    name: '',
    subtitle: '',
    tagline: '',
    price: '',
    originalPrice: '',
    discount: '',
    rating: 4.5,
    reviewCount: 0,
    stockStatus: 'In Stock',
    description: '',
    longDescription: '',
    ingredients: '',
    sku: `SKU-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
  });

  // Check if user is admin
  useEffect(() => {
    const checkAdmin = async () => {
      try {
        const unsubscribe = auth.onAuthStateChanged(async (user) => {
          if (user) {
            const token = await user.getIdTokenResult();
            if (token.claims.admin) {
              setIsAdmin(true);
            } 
            // else {
            //   router.push('/');
            // }
          } else {
            router.push('/login');
          }
          setLoading(false);
        });
        
        return () => unsubscribe();
      } catch (error) {
        console.error('Error checking admin status:', error);
        setLoading(false);
        router.push('/');
      }
    };
    
    checkAdmin();
  }, [router]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduct({
      ...product,
      [name]: value
    });
  };

  const handleNumberInputChange = (e) => {
    const { name, value } = e.target;
    setProduct({
      ...product,
      [name]: value === '' ? '' : parseFloat(value)
    });
  };

  const handleFeatureChange = (index, value) => {
    const updatedFeatures = [...features];
    updatedFeatures[index] = value;
    setFeatures(updatedFeatures);
  };

  const addFeature = () => {
    setFeatures([...features, '']);
  };

  const removeFeature = (index) => {
    const updatedFeatures = features.filter((_, i) => i !== index);
    setFeatures(updatedFeatures);
  };

  const handleHowToUseChange = (index, value) => {
    const updatedHowToUse = [...howToUse];
    updatedHowToUse[index] = value;
    setHowToUse(updatedHowToUse);
  };

  const addHowToUse = () => {
    setHowToUse([...howToUse, '']);
  };

  const removeHowToUse = (index) => {
    const updatedHowToUse = howToUse.filter((_, i) => i !== index);
    setHowToUse(updatedHowToUse);
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImageFiles([...imageFiles, ...files]);
    
    // Create preview URLs
    const newImageUrls = files.map(file => ({
      id: Date.now() + Math.random(),
      file,
      preview: URL.createObjectURL(file),
      alt: file.name
    }));
    
    setImageUrls([...imageUrls, ...newImageUrls]);
  };

  const removeImage = (id) => {
    const updatedImageUrls = imageUrls.filter(img => img.id !== id);
    setImageUrls(updatedImageUrls);
  };

  const uploadImages = async () => {
    const uploadedImages = [];
    
    for (let i = 0; i < imageUrls.length; i++) {
      const img = imageUrls[i];
      const storageRef = ref(storage, `products/${product.sku}/${Date.now()}_${img.file.name}`);
      
      try {
        const snapshot = await uploadBytes(storageRef, img.file);
        const downloadURL = await getDownloadURL(snapshot.ref);
        
        uploadedImages.push({
          id: i + 1,
          src: downloadURL,
          alt: img.alt || `${product.name} image ${i + 1}`
        });
      } catch (error) {
        console.error('Error uploading image:', error);
        throw new Error('Failed to upload images');
      }
    }
    
    return uploadedImages;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');
    setSuccess('');
    
    try {
      // Validate form
      if (!product.name || !product.price || !product.sku) {
        throw new Error('Product name, price, and SKU are required');
      }
      
      if (imageUrls.length === 0) {
        throw new Error('At least one product image is required');
      }
      
      // Filter out empty features and howToUse
      const filteredFeatures = features.filter(f => f.trim() !== '');
      const filteredHowToUse = howToUse.filter(h => h.trim() !== '');
      
      // Upload images to Firebase Storage
      const uploadedImages = await uploadImages();
      
      // Get Firebase token
      const token = await auth.currentUser.getIdToken(true);
      
      // Prepare product data
      const productData = {
        ...product,
        features: filteredFeatures,
        howToUse: filteredHowToUse,
        images: uploadedImages,
        createdAt: new Date().toISOString()
      };
      
      // Send to backend API
      const response = await fetch('/api/admin/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(productData)
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to create product');
      }
      
      const result = await response.json();
      setSuccess(`Product "${product.name}" created successfully with ID: ${result.productId}`);
      
      // Reset form
      setProduct({
        name: '',
        subtitle: '',
        tagline: '',
        price: '',
        originalPrice: '',
        discount: '',
        rating: 4.5,
        reviewCount: 0,
        stockStatus: 'In Stock',
        description: '',
        longDescription: '',
        ingredients: '',
        sku: `SKU-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      });
      setFeatures(['']);
      setHowToUse(['']);
      setImageUrls([]);
      setImageFiles([]);
      
    } catch (error) {
      console.error('Error creating product:', error);
      setError(error.message);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Access Denied</h1>
          <p>You do not have permission to access this page.</p>
        </div>
      </div>
    );
  }

  return (
    <AdminLayout>
      <div className="py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-2xl font-semibold text-gray-900">Add New Product</h1>
          
          {error && (
            <div className="mt-4 bg-red-50 border-l-4 border-red-400 p-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-red-700">{error}</p>
                </div>
              </div>
            </div>
          )}
          
          {success && (
            <div className="mt-4 bg-green-50 border-l-4 border-green-400 p-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-green-700">{success}</p>
                </div>
              </div>
            </div>
          )}
          
          <form onSubmit={handleSubmit} className="mt-6 space-y-8 divide-y divide-gray-200">
            <div className="space-y-8 divide-y divide-gray-200">
              {/* Basic Information */}
              <div>
                <h3 className="text-lg font-medium leading-6 text-gray-900">Basic Information</h3>
                <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                  <div className="sm:col-span-3">
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                      Product Name *
                    </label>
                    <div className="mt-1">
                      <input
                        type="text"
                        name="name"
                        id="name"
                        required
                        value={product.name}
                        onChange={handleInputChange}
                        className="shadow-sm focus:ring-black focus:border-black block w-full sm:text-sm border-gray-300 rounded-md"
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-3">
                    <label htmlFor="subtitle" className="block text-sm font-medium text-gray-700">
                      Subtitle
                    </label>
                    <div className="mt-1">
                      <input
                        type="text"
                        name="subtitle"
                        id="subtitle"
                        value={product.subtitle}
                        onChange={handleInputChange}
                        className="shadow-sm focus:ring-black focus:border-black block w-full sm:text-sm border-gray-300 rounded-md"
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-6">
                    <label htmlFor="tagline" className="block text-sm font-medium text-gray-700">
                      Tagline
                    </label>
                    <div className="mt-1">
                      <input
                        type="text"
                        name="tagline"
                        id="tagline"
                        value={product.tagline}
                        onChange={handleInputChange}
                        className="shadow-sm focus:ring-black focus:border-black block w-full sm:text-sm border-gray-300 rounded-md"
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-2">
                    <label htmlFor="price" className="block text-sm font-medium text-gray-700">
                      Price (₹) *
                    </label>
                    <div className="mt-1">
                      <input
                        type="number"
                        name="price"
                        id="price"
                        required
                        min="0"
                        step="0.01"
                        value={product.price}
                        onChange={handleNumberInputChange}
                        className="shadow-sm focus:ring-black focus:border-black block w-full sm:text-sm border-gray-300 rounded-md"
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-2">
                    <label htmlFor="originalPrice" className="block text-sm font-medium text-gray-700">
                      Original Price (₹)
                    </label>
                    <div className="mt-1">
                      <input
                        type="number"
                        name="originalPrice"
                        id="originalPrice"
                        min="0"
                        step="0.01"
                        value={product.originalPrice}
                        onChange={handleNumberInputChange}
                        className="shadow-sm focus:ring-black focus:border-black block w-full sm:text-sm border-gray-300 rounded-md"
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-2">
                    <label htmlFor="discount" className="block text-sm font-medium text-gray-700">
                      Discount
                    </label>
                    <div className="mt-1">
                      <input
                        type="text"
                        name="discount"
                        id="discount"
                        value={product.discount}
                        onChange={handleInputChange}
                        placeholder="e.g. 20% OFF"
                        className="shadow-sm focus:ring-black focus:border-black block w-full sm:text-sm border-gray-300 rounded-md"
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-2">
                    <label htmlFor="sku" className="block text-sm font-medium text-gray-700">
                      SKU *
                    </label>
                    <div className="mt-1">
                      <input
                        type="text"
                        name="sku"
                        id="sku"
                        required
                        value={product.sku}
                        onChange={handleInputChange}
                        className="shadow-sm focus:ring-black focus:border-black block w-full sm:text-sm border-gray-300 rounded-md"
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-2">
                    <label htmlFor="stockStatus" className="block text-sm font-medium text-gray-700">
                      Stock Status
                    </label>
                    <div className="mt-1">
                      <select
                        id="stockStatus"
                        name="stockStatus"
                        value={product.stockStatus}
                        onChange={handleInputChange}
                        className="shadow-sm focus:ring-black focus:border-black block w-full sm:text-sm border-gray-300 rounded-md"
                      >
                        <option value="In Stock">In Stock</option>
                        <option value="Out of Stock">Out of Stock</option>
                        <option value="Pre-order">Pre-order</option>
                      </select>
                    </div>
                  </div>

                  <div className="sm:col-span-2">
                    <label htmlFor="rating" className="block text-sm font-medium text-gray-700">
                      Initial Rating
                    </label>
                    <div className="mt-1">
                      <input
                        type="number"
                        name="rating"
                        id="rating"
                        min="0"
                        max="5"
                        step="0.1"
                        value={product.rating}
                        onChange={handleNumberInputChange}
                        className="shadow-sm focus:ring-black focus:border-black block w-full sm:text-sm border-gray-300 rounded-md"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div className="pt-8">
                <h3 className="text-lg font-medium leading-6 text-gray-900">Description</h3>
                <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                  <div className="sm:col-span-6">
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                      Short Description
                    </label>
                    <div className="mt-1">
                      <textarea
                        id="description"
                        name="description"
                        rows={3}
                        value={product.description}
                        onChange={handleInputChange}
                        className="shadow-sm focus:ring-black focus:border-black block w-full sm:text-sm border border-gray-300 rounded-md"
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-6">
                    <label htmlFor="longDescription" className="block text-sm font-medium text-gray-700">
                      Long Description
                    </label>
                    <div className="mt-1">
                      <textarea
                        id="longDescription"
                        name="longDescription"
                        rows={5}
                        value={product.longDescription}
                        onChange={handleInputChange}
                        className="shadow-sm focus:ring-black focus:border-black block w-full sm:text-sm border border-gray-300 rounded-md"
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-6">
                    <label htmlFor="ingredients" className="block text-sm font-medium text-gray-700">
                      Ingredients
                    </label>
                    <div className="mt-1">
                      <textarea
                        id="ingredients"
                        name="ingredients"
                        rows={3}
                        value={product.ingredients}
                        onChange={handleInputChange}
                        className="shadow-sm focus:ring-black focus:border-black block w-full sm:text-sm border border-gray-300 rounded-md"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Features */}
              <div className="pt-8">
                <h3 className="text-lg font-medium leading-6 text-gray-900">Features</h3>
                <div className="mt-6">
                  {features.map((feature, index) => (
                    <div key={index} className="flex items-center mb-3">
                      <input
                        type="text"
                        value={feature}
                        onChange={(e) => handleFeatureChange(index, e.target.value)}
                        placeholder="Enter a product feature"
                        className="shadow-sm focus:ring-black focus:border-black block w-full sm:text-sm border-gray-300 rounded-md"
                      />
                      <button
                        type="button"
                        onClick={() => removeFeature(index)}
                        className="ml-2 inline-flex items-center p-1 border border-transparent rounded-full shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                      >
                        <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={addFeature}
                    className="mt-2 inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
                  >
                    Add Feature
                  </button>
                </div>
              </div>

              {/* How To Use */}
              <div className="pt-8">
                <h3 className="text-lg font-medium leading-6 text-gray-900">How To Use</h3>
                <div className="mt-6">
                  {howToUse.map((step, index) => (
                    <div key={index} className="flex items-center mb-3">
                      <input
                        type="text"
                        value={step}
                        onChange={(e) => handleHowToUseChange(index, e.target.value)}
                        placeholder="Enter usage instructions"
                        className="shadow-sm focus:ring-black focus:border-black block w-full sm:text-sm border-gray-300 rounded-md"
                      />
                      <button
                        type="button"
                        onClick={() => removeHowToUse(index)}
                        className="ml-2 inline-flex items-center p-1 border border-transparent rounded-full shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                      >
                        <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={addHowToUse}
                    className="mt-2 inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
                  >
                    Add Step
                  </button>
                </div>
              </div>

              {/* Product Images */}
              <div className="pt-8">
                <h3 className="text-lg font-medium leading-6 text-gray-900">Product Images</h3>
                <div className="mt-6">
                  <div className="flex items-center">
                    <label className="block">
                      <span className="sr-only">Choose product images</span>
                      <input 
                        type="file" 
                        accept="image/*"
                        multiple
                        onChange={handleImageChange}
                        className="block w-full text-sm text-gray-500
                          file:mr-4 file:py-2 file:px-4
                          file:rounded-md file:border-0
                          file:text-sm file:font-semibold
                          file:bg-black file:text-white
                          hover:file:bg-gray-800"
                      />
                    </label>
                  </div>
                  
                  {imageUrls.length > 0 && (
                    <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
                      {imageUrls.map((img) => (
                        <div key={img.id} className="relative group">
                          <div className="aspect-w-1 aspect-h-1 rounded-lg bg-gray-100 overflow-hidden">
                            <img src={img.preview} alt={img.alt || 'Product image'} className="object-center object-cover" />
                            <button
                              type="button"
                              onClick={() => removeImage(img.id)}
                              className="absolute top-2 right-2 inline-flex items-center p-1 border border-transparent rounded-full shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                            >
                              <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                              </svg>
                            </button>
                          </div>
                          <input
                            type="text"
                            value={img.alt || ''}
                            onChange={(e) => {
                              const updatedImages = imageUrls.map(image => 
                                image.id === img.id ? { ...image, alt: e.target.value } : image
                              );
                              setImageUrls(updatedImages);
                            }}
                            placeholder="Image alt text"
                            className="mt-1 block w-full text-sm border-gray-300 rounded-md shadow-sm focus:ring-black focus:border-black"
                          />
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="pt-5">
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => router.push('/admin/products')}
                  className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black disabled:bg-gray-400"
                >
                  {submitting ? 'Creating...' : 'Create Product'}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </AdminLayout>
  );
}