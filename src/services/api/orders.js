import fetchAPI from './index';

// Orders related API calls
export const ordersAPI = {
  // Get user orders
  getUserOrders: async (userId, page = 1, limit = 10) => {
    return fetchAPI(`/api/users/${userId}/orders?page=${page}&limit=${limit}`);
  },
  
  // Get order details
  getOrderDetails: async (orderId) => {
    return fetchAPI(`/api/orders/sales/${orderId}`);
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
  },
  
  // Create package for order
  createPackage: async (packageData) => {
    return fetchAPI('/api/packages/create', {
      method: 'POST',
      body: JSON.stringify(packageData),
    });
  },
  
  // Create shipment for package
  createShipment: async (shipmentData) => {
    return fetchAPI('/api/shipments/create', {
      method: 'POST',
      body: JSON.stringify(shipmentData),
    });
  },
  
  // Get packages for an order
  getOrderPackages: async (orderId) => {
    return fetchAPI(`/api/packages/${orderId}`);
  },
  
  // Get shipments for a package
  getPackageShipments: async (packageId) => {
    return fetchAPI(`/api/shipments/${packageId}`);
  }
};