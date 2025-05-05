import axios from 'axios';
const api_url = process.env.NEXT_PUBLIC_URL
/**
 * Fetches sales orders from the backend
 * @param {Object} params - Query parameters
 * @param {number} params.page - Page number
 * @param {number} params.limit - Number of items per page
 * @param {string} params.status - Filter by order status
 * @param {string} params.customer_id - Filter by customer ID
 * @param {string} params.date_start - Filter by start date
 * @param {string} params.date_end - Filter by end date
 * @returns {Promise<Object>} - Sales orders data
 */
export async function fetchSalesOrders(params = {}) {
  try {
    const token = localStorage.getItem('authToken');
    
    if (!token) {
      throw new Error('Authentication token not found');
    }
    
    // Build query string
    const queryParams = new URLSearchParams();
    if (params.page) queryParams.append('page', params.page);
    if (params.limit) queryParams.append('limit', params.limit);
    if (params.status) queryParams.append('status', params.status);
    if (params.customer_id) queryParams.append('customer_id', params.customer_id);
    if (params.date_start) queryParams.append('date_start', params.date_start);
    if (params.date_end) queryParams.append('date_end', params.date_end);
    
    const response = await axios.get(`${api_url}/api/orders/sales?${queryParams.toString()}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    
    return response.data;
  } catch (error) {
    console.error('Error fetching sales orders:', error);
    throw error;
  }
}

/**
 * Fetches a single order by ID
 * @param {string} orderId - The order ID
 * @returns {Promise<Object>} - Order data
 */
export async function fetchOrderById(orderId) {
  try {
    const token = localStorage.getItem('authToken');
    
    if (!token) {
      throw new Error('Authentication token not found');
    }
    
    const response = await axios.get(`/api/orders/${orderId}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    
    return response.data;
  } catch (error) {
    console.error(`Error fetching order ${orderId}:`, error);
    throw error;
  }
}

/**
 * Updates an order's status
 * @param {string} orderId - The order ID
 * @param {string} status - The new status
 * @returns {Promise<Object>} - Updated order data
 */
export async function updateOrderStatus(orderId, status) {
  try {
    const token = localStorage.getItem('authToken');
    
    if (!token) {
      throw new Error('Authentication token not found');
    }
    
    const response = await axios.patch(`/api/orders/${orderId}/status`, 
      { status },
      {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      }
    );
    
    return response.data;
  } catch (error) {
    console.error(`Error updating order ${orderId}:`, error);
    throw error;
  }
}