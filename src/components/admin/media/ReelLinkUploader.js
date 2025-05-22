'use client'
import { useState } from 'react';
import { collection, addDoc, getFirestore } from 'firebase/firestore';
import { app } from '@/lib/firebase';
import { FiX } from 'react-icons/fi';

export default function ReelLinkUploader({ onUploadSuccess }) {
  const [reelLink, setReelLink] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('home');
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  
  const db = getFirestore(app);

  const categories = [
    { id: 'home', name: 'Home' },
    { id: 'new', name: 'New Launches' },
    { id: 'skincare', name: 'Skin Care' },
    { id: 'offers', name: 'Offers' },
    { id: 'bestseller', name: 'Bestseller' }
  ];

  const validateReelLink = (link) => {
    // Basic validation for Instagram, YouTube, or TikTok links
    const instagramRegex = /^https?:\/\/(www\.)?instagram\.com\/.+/i;
    const youtubeRegex = /^https?:\/\/(www\.)?(youtube\.com|youtu\.be)\/.+/i;
    const tiktokRegex = /^https?:\/\/(www\.)?(tiktok\.com)\/.+/i;
    
    return instagramRegex.test(link) || youtubeRegex.test(link) || tiktokRegex.test(link);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate inputs
    if (!reelLink.trim()) {
      setError('Please enter a reel link');
      return;
    }
    
    if (!validateReelLink(reelLink)) {
      setError('Please enter a valid Instagram, YouTube, or TikTok link');
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
      // Determine platform
      let platform = 'other';
      if (reelLink.includes('instagram.com')) {
        platform = 'instagram';
      } else if (reelLink.includes('youtube.com') || reelLink.includes('youtu.be')) {
        platform = 'youtube';
      } else if (reelLink.includes('tiktok.com')) {
        platform = 'tiktok';
      }
      
      // Save to Firestore
      const reelData = {
        type: 'reel',
        platform,
        category,
        title,
        description,
        url: reelLink,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      
      await addDoc(collection(db, 'images'), reelData);
      
      setSuccess('Reel link uploaded successfully');
      setReelLink('');
      setTitle('');
      setDescription('');
      
      if (onUploadSuccess) {
        onUploadSuccess();
      }
      
    } catch (error) {
      console.error('Error uploading reel link:', error);
      setError('Failed to upload reel link. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="space-y-6">
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
        
        {/* Reel Link */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Reel Link
          </label>
          <input
            type="url"
            value={reelLink}
            onChange={(e) => setReelLink(e.target.value)}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-black focus:border-black sm:text-sm"
            placeholder="https://www.instagram.com/reel/..."
            required
          />
          <p className="mt-1 text-xs text-gray-500">
            Enter a valid Instagram, YouTube, or TikTok link
          </p>
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
            placeholder="Enter reel title"
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
            placeholder="Enter reel description"
          />
        </div>
        
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
            disabled={uploading}
            className={`inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black ${
              uploading ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {uploading ? 'Uploading...' : 'Upload Reel Link'}
          </button>
        </div>
      </form>
    </div>
  );
}