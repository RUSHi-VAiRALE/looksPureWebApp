'use client'
import { useState } from 'react';
import ImageUploader from './ImageUploader';
import VideoUploader from './VideoUploader';
import ReelLinkUploader from './ReelLinkUploader';
import MediaGallery from './MediaGallery';

export default function MediaUploadManager() {
  const [activeTab, setActiveTab] = useState('upload');
  const [mediaType, setMediaType] = useState('image');
  const [refreshGallery, setRefreshGallery] = useState(0);

  const handleUploadSuccess = () => {
    // Trigger gallery refresh when new media is uploaded
    setRefreshGallery(prev => prev + 1);
  };

  return (
    <div>
      {/* Tabs */}
      <div className="border-b border-gray-200 mb-6">
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => setActiveTab('upload')}
            className={`${
              activeTab === 'upload'
                ? 'border-black text-black'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
          >
            Upload Media
          </button>
          <button
            onClick={() => setActiveTab('gallery')}
            className={`${
              activeTab === 'gallery'
                ? 'border-black text-black'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
          >
            Media Gallery
          </button>
        </nav>
      </div>

      {activeTab === 'upload' && (
        <div>
          {/* Media Type Selector */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">Media Type</label>
            <div className="flex space-x-4">
              <button
                onClick={() => setMediaType('image')}
                className={`px-4 py-2 rounded-md ${
                  mediaType === 'image' 
                    ? 'bg-black text-white' 
                    : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                }`}
              >
                Images
              </button>
              <button
                onClick={() => setMediaType('video')}
                className={`px-4 py-2 rounded-md ${
                  mediaType === 'video' 
                    ? 'bg-black text-white' 
                    : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                }`}
              >
                Videos
              </button>
              <button
                onClick={() => setMediaType('reel')}
                className={`px-4 py-2 rounded-md ${
                  mediaType === 'reel' 
                    ? 'bg-black text-white' 
                    : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                }`}
              >
                Reels
              </button>
            </div>
          </div>

          {/* Media Upload Component */}
          <div className="mt-6">
            {mediaType === 'image' && <ImageUploader onUploadSuccess={handleUploadSuccess} />}
            {mediaType === 'video' && <VideoUploader onUploadSuccess={handleUploadSuccess} />}
            {mediaType === 'reel' && <ReelLinkUploader onUploadSuccess={handleUploadSuccess} />}
          </div>
        </div>
      )}

      {activeTab === 'gallery' && (
        <MediaGallery refreshTrigger={refreshGallery} />
      )}
    </div>
  );
}