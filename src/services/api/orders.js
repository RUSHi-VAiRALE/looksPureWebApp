import fetchAPI from './index';

// Orders related API calls
export const ordersAPI = {
  // Get user orders
  getUserOrders: async (userId, page = 1, limit = 10) => {
    return fetchAPI(`/users/${userId}/orders?page=${page}&limit=${limit}`);
  },
  
  // Get order details
  getOrderDetails: async (orderId) => {
    return fetchAPI(`/orders/${orderId}`);
  },
  
  // Cancel order
  cancelOrder: async (orderId, reason) => {
    return fetchAPI(`/orders/${orderId}/cancel`, {
      method: 'POST',
      body: JSON.stringify({ reason }),
    });
  },
  
  // Return order
  returnOrder: async (orderId, items, reason) => {
    return fetchAPI(`/orders/${orderId}/return`, {
      method: 'POST',
      body: JSON.stringify({ items, reason }),
    });
  }
};