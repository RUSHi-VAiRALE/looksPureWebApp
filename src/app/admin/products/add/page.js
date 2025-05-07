'use client'
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { auth } from '@/lib/firebase';
import { app } from '@/lib/firebase';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import AdminLayout from '@/components/admin/AdminLayout';
import BasicInfoForm from '@/components/admin/products/BasicInfoForm';
import DescriptionForm from '@/components/admin/products/DescriptionForm';
import FeaturesForm from '@/components/admin/products/FeaturesForm';
import HowToUseForm from '@/components/admin/products/HowToUseForm';
import ImageUploadForm from '@/components/admin/products/ImageUploadForm';
const api_url = process.env.NEXT_PUBLIC_URL;

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
  const storage = getStorage(app);

  // Form state
  const [product, setProduct] = useState({
    name: '',
    subtitle: '',
    tagline: '',
    price: '',
    originalPrice: '',
    category: '',
    discount: '',
    rating: 4.5,
    reviewCount: 0,
    stockStatus: 'In Stock',
    description: '',
    longDescription: '',
    ingredients: '',
    isActive: true,
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
            else {
              router.push('/');
            }
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

  const handleImageAltChange = (id, altText) => {
    const updatedImageUrls = imageUrls.map(img => 
      img.id === id ? { ...img, alt: altText } : img
    );
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
      if (!product.name || !product.price || !product.sku || !product.category) {
        throw new Error('Product name, price, SKU, and category are required');
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
      const response = await fetch(`${api_url}/api/products`, {
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
        category: '',
        discount: '',
        rating: 4.5,
        reviewCount: 0,
        stockStatus: 'In Stock',
        description: '',
        longDescription: '',
        ingredients: '',
        isActive: true,
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
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <LoadingSpinner />
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Access Denied</h1>
          <p>You do not have permission to access this page.</p>
        </div>
      </div>
    );
  }

  return (
    <AdminLayout>
      <div className="py-6 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white shadow-sm rounded-lg p-6 border border-gray-100">
            <h1 className="text-2xl font-semibold text-gray-900 mb-6">Add New Product</h1>
            
            {error && (
              <div className="mb-6 bg-red-50 border-l-4 border-red-400 p-4">
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
              <div className="mb-6 bg-green-50 border-l-4 border-green-400 p-4">
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
            
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="space-y-6">
                <BasicInfoForm 
                  product={product} 
                  handleInputChange={handleInputChange} 
                  handleNumberInputChange={handleNumberInputChange} 
                />
                
                <div className="border-t border-gray-200 pt-6">
                  <DescriptionForm 
                    product={product} 
                    handleInputChange={handleInputChange} 
                  />
                </div>
                
                <div className="border-t border-gray-200 pt-6">
                  <FeaturesForm 
                    features={features} 
                    handleFeatureChange={handleFeatureChange} 
                    addFeature={addFeature} 
                    removeFeature={removeFeature} 
                  />
                </div>
                
                <div className="border-t border-gray-200 pt-6">
                  <HowToUseForm 
                    howToUse={howToUse} 
                    handleHowToUseChange={handleHowToUseChange} 
                    addHowToUse={addHowToUse} 
                    removeHowToUse={removeHowToUse} 
                  />
                </div>
                
                <div className="border-t border-gray-200 pt-6">
                  <ImageUploadForm 
                    imageUrls={imageUrls} 
                    handleImageChange={handleImageChange} 
                    removeImage={removeImage}
                    handleImageAltChange={handleImageAltChange}
                  />
                </div>
              </div>
              
              <div className="pt-5 border-t border-gray-200">
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
      </div>
    </AdminLayout>
  );
}