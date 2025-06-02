// Base API service for all API calls
const API_BASE_URL = process.env.NEXT_PUBLIC_URL;
import { auth } from '@/lib/firebase';

// Helper function for making API requests
async function fetchAPI(endpoint, options = {}) {
  const url = `${API_BASE_URL}${endpoint}`;
  
  // Default headers
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  };
  
  // Add auth token from Firebase if user is logged in
  const currentUser = auth.currentUser;
  if (currentUser) {
    try {
      const token = await currentUser.getIdToken(true);
      headers['Authorization'] = `Bearer ${token}`;
    } catch (tokenError) {
      console.error('Error getting Firebase token:', tokenError);
    }
  }
  
  const config = {
    ...options,
    headers,
  };
  
  try {
    const response = await fetch(url, config);

    // Handle 401 Unauthorized
    if (response.status === 401) {
      window.location.href = '/login';
      return null;
    }

    const contentType = response.headers.get('content-type');
    let data;
    if (contentType && contentType.includes('application/json')) {
      data = await response.json();
    } else {
      // Not JSON, get text (likely an error page)
      const text = await response.text();
      throw new Error(text || 'Unexpected response format');
    }

    if (!response.ok) {
      throw new Error(data.message || 'Something went wrong');
    }

    return data;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
}

export default fetchAPI;