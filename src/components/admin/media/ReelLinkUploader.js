'use client'
import { useState } from 'react';
import { collection, addDoc, getFirestore } from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { app } from '@/lib/firebase';
import { FiX, FiUpload } from 'react-icons/fi';

export default function ReelLinkUploader({ onUploadSuccess }) {
  const [reelLink, setReelLink] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('home');
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [uploadType, setUploadType] = useState('video'); // 'link' or 'video'
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  
  const db = getFirestore(app);
  const storage = getStorage(app);

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

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    
    if (!selectedFile) return;
    
    // Validate file type
    if (!selectedFile.type.startsWith('video/')) {
      setError('Please select a valid video file');
      return;
    }
    
    // Check file size (limit to 100MB)
    if (selectedFile.size > 100 * 1024 * 1024) {
      setError('Video file is too large. Maximum size is 100MB');
      return;
    }
    
    setFile(selectedFile);
    setPreview({
      url: URL.createObjectURL(selectedFile),
      name: selectedFile.name
    });
    setError('');
  };

  const handleRemoveFile = () => {
    if (preview && preview.url) {
      URL.revokeObjectURL(preview.url);
    }
    setFile(null);
    setPreview(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate inputs
    if (uploadType === 'link') {
      if (!reelLink.trim()) {
        setError('Please enter a reel link');
        return;
      }
      
      if (!validateReelLink(reelLink)) {
        setError('Please enter a valid Instagram, YouTube, or TikTok link');
        return;
      }
    } else {
      if (!file) {
        setError('Please select a video to upload');
        return;
      }
    }
    
    if (!title.trim()) {
      setError('Please enter a title');
      return;
    }
    
    setUploading(true);
    setError('');
    setSuccess('');
    setUploadProgress(0);
    
    try {
      let reelData;
      
      if (uploadType === 'link') {
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
        reelData = {
          type: 'reel',
          platform,
          category,
          title,
          description,
          url: reelLink,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        };
      } else {
        // Upload video file
        const fileName = `${Date.now()}_${file.name.replace(/[^a-zA-Z0-9.]/g, '_')}`;
        const storageRef = ref(storage, `media/videos/${category}/${fileName}`);
        
        // Upload the file
        const uploadTask = uploadBytes(storageRef, file);
        
        // Wait for upload to complete
        const snapshot = await uploadTask;
        const downloadURL = await getDownloadURL(snapshot.ref);
        
        // Create data for Firestore
        reelData = {
          type: 'reel',
          category,
          title,
          description,
          file: {
            url: downloadURL,
            fileName: fileName,
            type: file.type,
            size: file.size
          },
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        };
      }
      
      // Save to Firestore
      await addDoc(collection(db, 'images'), reelData);
      
      setSuccess('Reel uploaded successfully');
      setReelLink('');
      setTitle('');
      setDescription('');
      
      if (uploadType === 'video') {
        handleRemoveFile();
      }
      
      if (onUploadSuccess) {
        onUploadSuccess();
      }
      
    } catch (error) {
      console.error('Error uploading reel:', error);
      setError('Failed to upload reel. Please try again.');
    } finally {
      setUploading(false);
      setUploadProgress(0);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Upload Type Selection */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Upload Type
          </label>
          <div className="flex space-x-4">
            {/* <button
              type="button"
              onClick={() => setUploadType('link')}
              className={`px-4 py-2 text-sm font-medium rounded-md ${
                uploadType === 'link' 
                  ? 'bg-black text-white' 
                  : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
              }`}
            >
              External Link
            </button> */}
            <button
              type="button"
              onClick={() => setUploadType('video')}
              className={`px-4 py-2 text-sm font-medium rounded-md ${
                uploadType === 'video' 
                  ? 'bg-black text-white' 
                  : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
              }`}
            >
              Upload Video
            </button>
          </div>
        </div>
        
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
        
        {/* Reel Link - Only show if uploadType is 'link' */}
        {uploadType === 'link' && (
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
              required={uploadType === 'link'}
            />
            <p className="mt-1 text-xs text-gray-500">
              Enter a valid Instagram, YouTube, or TikTok link
            </p>
          </div>
        )}
        
        {/* Video Upload - Only show if uploadType is 'video' */}
        {uploadType === 'video' && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Upload Video
            </label>
            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
              <div className="space-y-1 text-center">
                <FiUpload className="mx-auto h-12 w-12 text-gray-400" />
                <div className="flex text-sm text-gray-600">
                  <label
                    htmlFor="video-upload"
                    className="relative cursor-pointer bg-white rounded-md font-medium text-black hover:text-gray-700 focus-within:outline-none"
                  >
                    <span>Upload a video</span>
                    <input
                      id="video-upload"
                      name="video-upload"
                      type="file"
                      className="sr-only"
                      accept="video/*"
                      onChange={handleFileChange}
                      disabled={uploading}
                    />
                  </label>
                  <p className="pl-1">or drag and drop</p>
                </div>
                <p className="text-xs text-gray-500">
                  MP4, MOV, WEBM up to 100MB
                </p>
              </div>
            </div>
          </div>
        )}
        
        {/* Video Preview - Only show if a file is selected */}
        {uploadType === 'video' && preview && (
          <div className="mt-6">
            <h3 className="text-sm font-medium text-gray-700 mb-3">Selected Video</h3>
            <div className="relative">
              <video
                src={preview.url}
                controls
                className="w-full h-auto rounded-md"
              />
              <button
                type="button"
                onClick={handleRemoveFile}
                className="absolute top-2 right-2 bg-white rounded-full p-1 shadow-md"
              >
                <FiX className="h-4 w-4 text-gray-500" />
              </button>
              <p className="mt-2 text-sm text-gray-500">{preview.name}</p>
            </div>
          </div>
        )}
        
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
        
        {/* Upload Progress - Only show when uploading a video */}
        {uploading && uploadType === 'video' && uploadProgress > 0 && (
          <div className="mt-4">
            <div className="relative pt-1">
              <div className="flex mb-2 items-center justify-between">
                <div>
                  <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-black bg-gray-200">
                    Uploading
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-xs font-semibold inline-block text-black">
                    {uploadProgress}%
                  </span>
                </div>
              </div>
              <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-gray-200">
                <div
                  style={{ width: `${uploadProgress}%` }}
                  className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-black"
                ></div>
              </div>
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
            disabled={uploading || (uploadType === 'video' && !file) || (uploadType === 'link' && !reelLink)}
            className={`inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black ${
              (uploading || (uploadType === 'video' && !file) || (uploadType === 'link' && !reelLink)) ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {uploading ? 'Uploading...' : 'Upload Reel'}
          </button>
        </div>
      </form>
    </div>
  );
}