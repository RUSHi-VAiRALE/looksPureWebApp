import fetchAPI from './index';

// Profile related API calls
export const profileAPI = {
  // Get user profile
  getUserProfile: async (userId) => {
    return fetchAPI(`/api/users/${userId}/profile`);
  },
  
  // Get user addresses
  getUserAddresses: async (userId) => {
    return fetchAPI(`/api/users/${userId}/addresses`);
  },
  
  // Add or update shipping address
  updateShippingAddress: async (userId, addressData) => {
    return fetchAPI(`/api/users/${userId}/addresses/shipping`, {
      method: 'POST',
      body: JSON.stringify(addressData),
    });
  },
  
  // Add or update billing address
  updateBillingAddress: async (userId, addressData) => {
    return fetchAPI(`/api/users/${userId}/addresses/billing`, {
      method: 'POST',
      body: JSON.stringify(addressData),
    });
  },
  
};