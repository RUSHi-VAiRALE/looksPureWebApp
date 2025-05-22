'use client'
import { useState, useEffect } from 'react';
import { getFirestore, collection, getDocs, deleteDoc, doc, query, orderBy } from 'firebase/firestore';
import { getStorage, ref, deleteObject } from 'firebase/storage';
import { app } from '@/lib/firebase';
import { FiTrash2, FiExternalLink, FiImage, FiVideo, FiLink } from 'react-icons/fi';
import Image from 'next/image';

export default function MediaGallery({ refreshTrigger }) {
  const [mediaItems, setMediaItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  
  const db = getFirestore(app);
  const storage = getStorage(app);
  
  const categories = [
    { id: 'all', name: 'All Categories' },
    { id: 'home', name: 'Home' },
    { id: 'new', name: 'New Launches' },
    { id: 'skincare', name: 'Skin Care' },
    { id: 'offers', name: 'Offers' },
    { id: 'bestseller', name: 'Bestseller' }
  ];

  useEffect(() => {
    fetchMediaItems();
  }, [refreshTrigger, filter, selectedCategory]);

  const fetchMediaItems = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const mediaQuery = query(collection(db, 'images'), orderBy('createdAt', 'desc'));
      const querySnapshot = await getDocs(mediaQuery);
      
      let items = [];
      querySnapshot.forEach((doc) => {
        items.push({
          id: doc.id,
          ...doc.data()
        });
      });
      
      // Apply filters
      if (filter !== 'all') {
        items = items.filter(item => item.type === filter);
      }
      
      if (selectedCategory !== 'all') {
        items = items.filter(item => item.category === selectedCategory);
      }
      
      setMediaItems(items);
    } catch (err) {
      console.error('Error fetching media items:', err);
      setError('Failed to load media items. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (item) => {
    try {
      // Delete from Firestore
      await deleteDoc(doc(db, 'images', item.id));
      
      // Delete from Storage if it's an image or video
      if (item.type === 'image' && item.files) {
        for (const file of item.files) {
          if (file.fileName) {
            const fileRef = ref(storage, `media/images/${item.category}/${file.fileName}`);
            await deleteObject(fileRef);
          }
        }
      } else if (item.type === 'video' && item.file && item.file.fileName) {
        const fileRef = ref(storage, `media/videos/${item.category}/${item.file.fileName}`);
        await deleteObject(fileRef);
      }
      
      // Update the UI
      setMediaItems(mediaItems.filter(i => i.id !== item.id));
      setDeleteConfirm(null);
    } catch (err) {
      console.error('Error deleting item:', err);
      alert('Failed to delete item. Please try again.');
    }
  };

  const renderMediaItem = (item) => {
    switch (item.type) {
      case 'image':
        return (
          <div className="relative group">
            <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-md bg-gray-200">
              {item.files && item.files.length > 0 && (
                <Image
                  src={item.files[0].url}
                  alt={item.title}
                  width={200}
                  height={200}
                  className="h-full w-full object-cover object-center"
                />
              )}
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all flex items-center justify-center opacity-0 group-hover:opacity-100">
                <a 
                  href={item.files && item.files.length > 0 ? item.files[0].url : '#'} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="p-2 bg-white rounded-full mx-1"
                >
                  <FiExternalLink className="h-4 w-4" />
                </a>
                <button 
                  onClick={() => setDeleteConfirm(item.id)}
                  className="p-2 bg-white rounded-full mx-1 text-red-500"
                >
                  <FiTrash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
            <div className="mt-2">
              <div className="flex items-center">
                <FiImage className="mr-1 text-gray-500" />
                <span className="text-xs text-gray-500">
                  {item.files ? `${item.files.length} image(s)` : '0 images'}
                </span>
              </div>
              <h3 className="text-sm font-medium text-gray-900 truncate">{item.title}</h3>
              <p className="text-xs text-gray-500 capitalize">{item.category}</p>
            </div>
          </div>
        );
        
      case 'video':
        return (
          <div className="relative group">
            <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-md bg-gray-200">
              {item.file && item.file.url ? (
                <video 
                  src={item.file.url}
                  className="h-full w-full object-cover object-center"
                />
              ) : (
                <div className="flex items-center justify-center h-full bg-gray-100">
                  <FiVideo className="h-8 w-8 text-gray-400" />
                </div>
              )}
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all flex items-center justify-center opacity-0 group-hover:opacity-100">
                <a 
                  href={item.file ? item.file.url : '#'} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="p-2 bg-white rounded-full mx-1"
                >
                  <FiExternalLink className="h-4 w-4" />
                </a>
                <button 
                  onClick={() => setDeleteConfirm(item.id)}
                  className="p-2 bg-white rounded-full mx-1 text-red-500"
                >
                  <FiTrash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
            <div className="mt-2">
              <div className="flex items-center">
                <FiVideo className="mr-1 text-gray-500" />
                <span className="text-xs text-gray-500">Video</span>
              </div>
              <h3 className="text-sm font-medium text-gray-900 truncate">{item.title}</h3>
              <p className="text-xs text-gray-500 capitalize">{item.category}</p>
            </div>
          </div>
        );
        
      case 'reel':
        return (
          <div className="relative group">
            <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-md bg-gray-200">
              <div className="flex items-center justify-center h-full bg-gray-100">
                <FiLink className="h-8 w-8 text-gray-400" />
              </div>
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all flex items-center justify-center opacity-0 group-hover:opacity-100">
                <a 
                  href={item.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="p-2 bg-white rounded-full mx-1"
                >
                  <FiExternalLink className="h-4 w-4" />
                </a>
                <button 
                  onClick={() => setDeleteConfirm(item.id)}
                  className="p-2 bg-white rounded-full mx-1 text-red-500"
                >
                  <FiTrash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
            <div className="mt-2">
              <div className="flex items-center">
                <FiLink className="mr-1 text-gray-500" />
                <span className="text-xs text-gray-500 capitalize">{item.platform || 'Link'}</span>
              </div>
              <h3 className="text-sm font-medium text-gray-900 truncate">{item.title}</h3>
              <p className="text-xs text-gray-500 capitalize">{item.category}</p>
            </div>
          </div>
        );
        
      default:
        return null;
    }
  };

  return (
    <div>
      {/* Filters */}
      <div className="mb-6 flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Media Type</label>
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-black focus:border-black sm:text-sm rounded-md"
          >
            <option value="all">All Types</option>
            <option value="image">Images</option>
            <option value="video">Videos</option>
            <option value="reel">Reels</option>
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-black focus:border-black sm:text-sm rounded-md"
          >
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>
      </div>
      
      {/* Media Gallery */}
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-black"></div>
        </div>
      ) : error ? (
        <div className="bg-red-50 border-l-4 border-red-400 p-4">
          <div className="flex">
            <div className="ml-3">
              <p className="text-sm text-red-700">{error}</p>
            </div>
          </div>
        </div>
      ) : mediaItems.length === 0 ? (
        <div className="text-center py-12">
          <FiImage className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">No media items</h3>
          <p className="mt-1 text-sm text-gray-500">
            Get started by uploading some media.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {mediaItems.map((item) => (
            <div key={item.id}>
              {renderMediaItem(item)}
              
              {/* Delete Confirmation Modal */}
              {deleteConfirm === item.id && (
                <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
                  <div className="bg-white p-6 rounded-lg max-w-sm mx-auto">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Confirm Delete</h3>
                    <p className="text-sm text-gray-500 mb-4">
                      Are you sure you want to delete this item? This action cannot be undone.
                    </p>
                    <div className="flex justify-end space-x-3">
                      <button
                        onClick={() => setDeleteConfirm(null)}
                        className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={() => handleDelete(item)}
                        className="px-4 py-2 bg-red-600 border border-transparent rounded-md text-sm font-medium text-white hover:bg-red-700"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}