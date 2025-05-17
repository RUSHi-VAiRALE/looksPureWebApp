'use client'
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ordersAPI } from '@/services/api/orders';
import { FiChevronRight, FiPackage } from 'react-icons/fi';

export default function OrderHistory({ user }) {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await ordersAPI.getUserOrders(user.customerId, currentPage);
        console.log('Fetched orders:', response);
        setOrders(response.orders);
        setTotalPages(response.totalPages);
      } catch (error) {
        console.error('Error fetching orders:', error);
        setError('Failed to load order history');
      } finally {
        setLoading(false);
      }
    };
    
    if (user) {
      fetchOrders();
    }
  }, [user, currentPage]);
  
  const getOrderStatusClass = (status) => {
    switch (status.toLowerCase()) {
      case 'delivered':
        return 'bg-green-100 text-green-800';
      case 'shipped':
        return 'bg-blue-100 text-blue-800';
      case 'processing':
        return 'bg-yellow-100 text-yellow-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };
  
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };
  
  if (loading) {
    return <div className="p-4">Loading order history...</div>;
  }
  
  if (error) {
    return (
      <div className="p-4 bg-red-50 text-red-700 rounded-lg">
        {error}
      </div>
    );
  }
  
  if (orders.length === 0) {
    return (
      <div className="bg-white border border-gray-200 rounded-lg p-8 text-center">
        <div className="flex justify-center mb-4">
          <FiPackage size={48} className="text-gray-400" />
        </div>
        <h3 className="text-xl font-medium mb-2">No orders yet</h3>
        <p className="text-gray-600 mb-6">You haven&apos;t placed any orders yet.</p>
        <Link href="/skincare" className="px-6 py-3 bg-black text-white rounded-md hover:bg-gray-800 inline-block">
          Start Shopping
        </Link>
      </div>
    );
  }
  
  return (
    <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-xl font-semibold">Order History</h2>
      </div>
      
      <div className="divide-y divide-gray-200">
        {orders.map((order) => (
          <div key={order.id} className="p-6 hover:bg-gray-50">
            <div className="flex flex-col md:flex-row justify-between mb-4">
              <div>
                <p className="text-sm text-gray-500">Order #{order.id}</p>
                <p className="font-medium">{formatDate(order.date)}</p>
              </div>
              <div className="mt-2 md:mt-0">
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getOrderStatusClass(order.status)}`}>
                  {order.status}
                </span>
              </div>
            </div>
            
            <div className="mt-4 space-y-4">
              {order.items.slice(0, 2).map((item) => (
                <div key={item.productId} className="flex items-center">
                  <div className="w-16 h-16 bg-gray-100 rounded-md overflow-hidden relative flex-shrink-0">
                    <Image
                      src={item.productImage}
                      alt={item.productName}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="ml-4 flex-grow">
                    <h4 className="text-sm font-medium">{item.productName}</h4>
                    <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                  </div>
                  <div className="text-sm font-medium">
                    ₹{item.price.toFixed(2)}
                  </div>
                </div>
              ))}
              
              {order.items.length > 2 && (
                <p className="text-sm text-gray-500">
                  +{order.items.length - 2} more items
                </p>
              )}
            </div>
            
            <div className="mt-6 flex justify-between items-center">
              <div>
                <p className="text-sm font-medium">Total: ₹{order.totalAmount.toFixed(2)}</p>
              </div>
              <Link 
                href={`/orders/${order.id}`}
                className="flex items-center text-sm font-medium text-black hover:text-gray-700"
              >
                View Order Details
                <FiChevronRight className="ml-1" />
              </Link>
            </div>
          </div>
        ))}
      </div>
      
      {totalPages > 1 && (
        <div className="p-6 border-t border-gray-200 flex justify-center">
          <div className="flex space-x-2">
            <button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="px-4 py-2 border border-gray-300 rounded-md disabled:opacity-50"
            >
              Previous
            </button>
            <button
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="px-4 py-2 bg-black text-white rounded-md disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}