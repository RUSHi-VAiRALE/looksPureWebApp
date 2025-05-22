'use client'
import { useState } from 'react';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { collection, addDoc, getFirestore } from 'firebase/firestore';
import { app } from '@/lib/firebase';
import { FiUpload, FiX } from 'react-icons/fi';

export default function ImageUploader({ onUploadSuccess }) {
  const [files, setFiles] = useState([]);
  const [previews, setPreviews] = useState([]);
  const [category, setCategory] = useState('home');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  
  const storage = getStorage(app);
  const db = getFirestore(app);

  const categories = [
    { id: 'home', name: 'Home' },
    { id: 'new', name: 'New Launches' },
    { id: 'skincare', name: 'Skin Care' },
    { id: 'offers', name: 'Offers' },
    { id: 'bestseller', name: 'Bestseller' }
  ];

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    
    // Validate file types
    const validFiles = selectedFiles.filter(file => 
      file.type.startsWith('image/')
    );
    
    if (validFiles.length !== selectedFiles.length) {
      setError('Some files were not images and were removed');
    }
    
    setFiles(validFiles);
    
    // Create previews
    const newPreviews = validFiles.map(file => ({
      id: Math.random().toString(36).substring(2),
      file,
      url: URL.createObjectURL(file),
      alt: file.name
    }));
    
    setPreviews(newPreviews);
  };

  const handleRemoveFile = (id) => {
    const updatedPreviews = previews.filter(preview => preview.id !== id);
    setPreviews(updatedPreviews);
    
    // Update files array to match previews
    const previewFiles = updatedPreviews.map(preview => preview.file);
    setFiles(previewFiles);
  };

  const handleAltChange = (id, newAlt) => {
    const updatedPreviews = previews.map(preview => 
      preview.id === id ? { ...preview, alt: newAlt } : preview
    );
    setPreviews(updatedPreviews);
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    
    if (files.length === 0) {
      setError('Please select at least one image to upload');
      return;
    }
    
    if (!title.trim()) {
      setError('Please enter a title');
      return;
    }
    
    setUploading(true);
    setError('');
    setSuccess('');
    
    try {
      const uploadedImages = [];
      
      // Upload each file to Firebase Storage
      for (const preview of previews) {
        const file = preview.file;
        const fileName = `${Date.now()}_${file.name.replace(/[^a-zA-Z0-9.]/g, '_')}`;
        const storageRef = ref(storage, `media/images/${category}/${fileName}`);
        
        const snapshot = await uploadBytes(storageRef, file);
        const downloadURL = await getDownloadURL(snapshot.ref);
        
        uploadedImages.push({
          url: downloadURL,
          alt: preview.alt || file.name,
          fileName: fileName,
          type: file.type,
          size: file.size
        });
      }
      
      // Save metadata to Firestore
      const mediaDoc = {
        type: 'image',
        category,
        title,
        description,
        files: uploadedImages,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      
      await addDoc(collection(db, 'images'), mediaDoc);
      
      setSuccess(`Successfully uploaded ${uploadedImages.length} image(s)`);
      setFiles([]);
      setPreviews([]);
      setTitle('');
      setDescription('');
      
      if (onUploadSuccess) {
        onUploadSuccess();
      }
      
    } catch (error) {
      console.error('Error uploading images:', error);
      setError('Failed to upload images. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div>
      <form onSubmit={handleUpload} className="space-y-6">
        {/* Category Selection */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Category
          </label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-black focus:border-black sm:text-sm rounded-md"
          >
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>
        
        {/* Title and Description */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Title
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-black focus:border-black sm:text-sm"
            placeholder="Enter image title"
            required
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Description (optional)
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={3}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-black focus:border-black sm:text-sm"
            placeholder="Enter image description"
          />
        </div>
        
        {/* File Upload */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Upload Images
          </label>
          <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
            <div className="space-y-1 text-center">
              <FiUpload className="mx-auto h-12 w-12 text-gray-400" />
              <div className="flex text-sm text-gray-600">
                <label
                  htmlFor="image-upload"
                  className="relative cursor-pointer bg-white rounded-md font-medium text-black hover:text-gray-700 focus-within:outline-none"
                >
                  <span>Upload images</span>
                  <input
                    id="image-upload"
                    name="image-upload"
                    type="file"
                    className="sr-only"
                    multiple
                    accept="image/*"
                    onChange={handleFileChange}
                    disabled={uploading}
                  />
                </label>
                <p className="pl-1">or drag and drop</p>
              </div>
              <p className="text-xs text-gray-500">
                PNG, JPG, GIF up to 10MB each
              </p>
            </div>
          </div>
        </div>
        
        {/* Image Previews */}
        {previews.length > 0 && (
          <div className="mt-6">
            <h3 className="text-sm font-medium text-gray-700 mb-3">Selected Images</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {previews.map((preview) => (
                <div key={preview.id} className="relative group">
                  <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-md bg-gray-200">
                    <img
                      src={preview.url}
                      alt={preview.alt}
                      className="h-full w-full object-cover object-center"
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveFile(preview.id)}
                      className="absolute top-1 right-1 bg-white rounded-full p-1 shadow-md opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <FiX className="h-4 w-4 text-gray-500" />
                    </button>
                  </div>
                  <input
                    type="text"
                    value={preview.alt}
                    onChange={(e) => handleAltChange(preview.id, e.target.value)}
                    className="mt-1 block w-full text-xs border-gray-300 rounded-md shadow-sm focus:ring-black focus:border-black"
                    placeholder="Alt text"
                  />
                </div>
              ))}
            </div>
          </div>
        )}
        
        {/* Error and Success Messages */}
        {error && (
          <div className="bg-red-50 border-l-4 border-red-400 p-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <FiX className="h-5 w-5 text-red-400" />
              </div>
              <div className="ml-3">
                <p className="text-sm text-red-700">{error}</p>
              </div>
            </div>
          </div>
        )}
        
        {success && (
          <div className="bg-green-50 border-l-4 border-green-400 p-4">
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
        
        {/* Submit Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={uploading || files.length === 0}
            className={`inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black ${
              (uploading || files.length === 0) ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {uploading ? 'Uploading...' : 'Upload Images'}
          </button>
        </div>
      </form>
    </div>
  );
}