'use client'
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { FiArrowLeft, FiPackage, FiTruck, FiCheck, FiClock } from 'react-icons/fi';
import { ordersAPI } from '@/services/api/orders';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import LoadingSpinner from '@/components/ui/LoadingSpinner';

export default function OrderDetailsPage({ params }) {
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [user, setUser] = useState(null);
  const router = useRouter();
  const { id } = params;
  
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
      } else {
        router.push('/login');
      }
    });
    
    return () => unsubscribe();
  }, [router]);
  
  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const data = await ordersAPI.getOrderDetails(id);
        setOrder(data);
      } catch (error) {
        console.error('Error fetching order details:', error);
        setError('Failed to load order details');
      } finally {
        setLoading(false);
      }
    };
    
    if (user && id) {
      fetchOrderDetails();
    }
  }, [id, user]);
  
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };
  
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
  
  if (loading) {
    return <LoadingSpinner />;
  }
  
  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="p-4 bg-red-50 text-red-700 rounded-lg">
          {error}
        </div>
      </div>
    );
  }
  
  if (!order) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="p-4 bg-yellow-50 text-yellow-700 rounded-lg">
          Order not found
        </div>
      </div>
    );
  }
  
  return (
    <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-8">
        <Link href="/profile" className="flex items-center text-gray-600 hover:text-black">
          <FiArrowLeft className="mr-2" />
          Back to Profile
        </Link>
      </div>
      
      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden mb-8">
        <div className="p-6 border-b border-gray-200">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
            <div>
              <h1 className="text-2xl font-bold">Order #{order.orderNumber}</h1>
              <p className="text-gray-600">Placed on {formatDate(order.orderDate)}</p>
            </div>
            <span className={`mt-2 md:mt-0 inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getOrderStatusClass(order.status)}`}>
              {order.status}
            </span>
          </div>
        </div>
        
        {/* Order Timeline */}
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold mb-4">Order Status</h2>
          <div className="relative">
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gray-200"></div>
            
            <div className="relative flex items-start mb-6">
              <div className="flex items-center justify-center w-16">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${order.status === 'Cancelled' ? 'bg-red-100' : 'bg-green-100'}`}>
                  <FiCheck className={order.status === 'Cancelled' ? 'text-red-600' : 'text-green-600'} />
                </div>
              </div>
              <div className="ml-2">
                <h3 className="text-base font-medium">Order Placed</h3>
                <p className="text-sm text-gray-500">{formatDate(order.orderDate)}</p>
              </div>
            </div>
            
            <div className="relative flex items-start mb-6">
              <div className="flex items-center justify-center w-16">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  order.status === 'Cancelled' ? 'bg-red-100' : 
                  (order.status === 'Processing' || order.status === 'Shipped' || order.status === 'Delivered') ? 'bg-green-100' : 'bg-gray-100'
                }`}>
                  <FiPackage className={
                    order.status === 'Cancelled' ? 'text-red-600' : 
                    (order.status === 'Processing' || order.status === 'Shipped' || order.status === 'Delivered') ? 'text-green-600' : 'text-gray-400'
                  } />
                </div>
              </div>
              <div className="ml-2">
                <h3 className="text-base font-medium">Processing</h3>
                <p className="text-sm text-gray-500">
                  {order.processingDate ? formatDate(order.processingDate) : 'Pending'}
                </p>
              </div>
            </div>
            
            <div className="relative flex items-start mb-6">
              <div className="flex items-center justify-center w-16">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  order.status === 'Cancelled' ? 'bg-red-100' : 
                  (order.status === 'Shipped' || order.status === 'Delivered') ? 'bg-green-100' : 'bg-gray-100'
                }`}>
                  <FiTruck className={
                    order.status === 'Cancelled' ? 'text-red-600' : 
                    (order.status === 'Shipped' || order.status === 'Delivered') ? 'text-green-600' : 'text-gray-400'
                  } />
                </div>
              </div>
              <div className="ml-2">
                <h3 className="text-base font-medium">Shipped</h3>
                <p className="text-sm text-gray-500">
                  {order.shippingDate ? formatDate(order.shippingDate) : 'Pending'}
                </p>
                {order.trackingNumber && (
                  <p className="text-sm">
                    Tracking #: 
                    <Link href={`/track?number=${order.trackingNumber}`} className="ml-1 text-black underline">
                      {order.trackingNumber}
                    </Link>
                  </p>
                )}
              </div>
            </div>
            
            <div className="relative flex items-start">
              <div className="flex items-center justify-center w-16">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  order.status === 'Cancelled' ? 'bg-red-100' : 
                  order.status === 'Delivered' ? 'bg-green-100' : 'bg-gray-100'
                }`}>
                  <FiCheck className={
                    order.status === 'Cancelled' ? 'text-red-600' : 
                    order.status === 'Delivered' ? 'text-green-600' : 'text-gray-400'
                  } />
                </div>
              </div>
              <div className="ml-2">
                <h3 className="text-base font-medium">Delivered</h3>
                <p className="text-sm text-gray-500">
                  {order.deliveryDate ? formatDate(order.deliveryDate) : 'Pending'}
                </p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Order Items */}
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold mb-4">Order Items</h2>
          <div className="divide-y divide-gray-200">
            {order.items.map((item) => (
              <div key={item.id} className="py-4 flex">
                <div className="w-20 h-20 bg-gray-100 rounded-md overflow-hidden relative flex-shrink-0">
                  <Image
                    src={item.productImage}
                    alt={item.productName}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="ml-4 flex-grow">
                  <h4 className="font-medium">{item.productName}</h4>
                  <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                  {item.variant && (
                    <p className="text-sm text-gray-500">{item.variant}</p>
                  )}
                </div>
                <div className="text-right">
                  <p className="font-medium">₹{item.price.toFixed(2)}</p>
                  <p className="text-sm text-gray-500">₹{(item.price * item.quantity).toFixed(2)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Order Summary */}
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
          <div className="space-y-2">
            <div className="flex justify-between">
              <p className="text-gray-600">Subtotal</p>
              <p>₹{order.subtotal.toFixed(2)}</p>
            </div>
            <div className="flex justify-between">
              <p className="text-gray-600">Shipping</p>
              <p>₹{order.shippingCost.toFixed(2)}</p>
            </div>
            {order.discount > 0 && (
              <div className="flex justify-between">
                <p className="text-gray-600">Discount</p>
                <p>-₹{order.discount.toFixed(2)}</p>
              </div>
            )}
            {order.tax > 0 && (
              <div className="flex justify-between">
                <p className="text-gray-600">Tax</p>
                <p>₹{order.tax.toFixed(2)}</p>
              </div>
            )}
            <div className="border-t border-gray-200 pt-2 mt-2">
              <div className="flex justify-between font-medium">
                <p>Total</p>
                <p>₹{order.totalAmount.toFixed(2)}</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Shipping Address */}
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold mb-4">Shipping Address</h2>
          <div className="space-y-1">
            <p className="font-medium">{order.shippingAddress.fullName}</p>
            <p>{order.shippingAddress.addressLine1}</p>
            {order.shippingAddress.addressLine2 && <p>{order.shippingAddress.addressLine2}</p>}
            <p>{order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.postalCode}</p>
            <p>{order.shippingAddress.country}</p>
            <p>Phone: {order.shippingAddress.phone}</p>
          </div>
        </div>
        
        {/* Payment Information */}
        <div className="p-6">
          <h2 className="text-lg font-semibold mb-4">Payment Information</h2>
          <div className="space-y-2">
            <div className="flex justify-between">
              <p className="text-gray-600">Payment Method</p>
              <p>{order.paymentMethod}</p>
            </div>
            <div className="flex justify-between">
              <p className="text-gray-600">Payment Status</p>
              <p className={order.paymentStatus === 'Paid' ? 'text-green-600' : 'text-yellow-600'}>
                {order.paymentStatus}
              </p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Action Buttons */}
      {order.status !== 'Cancelled' && order.status !== 'Delivered' && (
        <div className="flex justify-end space-x-4">
          <button 
            className="px-4 py-2 border border-red-600 text-red-600 rounded-md hover:bg-red-50"
            onClick={() => {
              // Handle cancel order
            }}
          >
            Cancel Order
          </button>
        </div>
      )}
      
      {order.status === 'Delivered' && (
        <div className="flex justify-end space-x-4">
          <Link 
            href={`/orders/${id}/return`}
            className="px-4 py-2 border border-black text-black rounded-md hover:bg-gray-50"
          >
            Return Items
          </Link>
        </div>
      )}
    </div>
  );
}