'use client'
import { useState } from 'react';
import { FiPackage, FiTruck, FiCheckCircle, FiClock } from 'react-icons/fi';
import Image from 'next/image';
import Link from 'next/link';

export default function TrackOrderPage() {
  const [searchType, setSearchType] = useState('orderID');
  const [trackingNumber, setTrackingNumber] = useState('');
  const [isTracking, setIsTracking] = useState(false);
  const [orderDetails, setOrderDetails] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!trackingNumber.trim()) return;
    
    // Simulate fetching order details
    setIsTracking(true);
    
    // Mock data for demonstration
    setTimeout(() => {
      setOrderDetails({
        id: trackingNumber || '12345678',
        date: '15 May, 2023',
        status: 'In Transit',
        estimatedDelivery: '20 May, 2023',
        items: [
          { id: 1, name: 'Hydrating Face Serum', price: 1299, quantity: 1, image: 'https://cdn.pixabay.com/photo/2018/01/16/10/20/cosmetics-3085578_1280.jpg' },
          { id: 2, name: 'Natural Glow Blush', price: 899, quantity: 2, image: 'https://cdn.pixabay.com/photo/2016/10/22/20/55/makeup-brushes-1761648_1280.jpg' }
        ],
        shippingAddress: {
          name: 'Priya Sharma',
          street: '123 Green Avenue',
          city: 'Mumbai',
          state: 'Maharashtra',
          pincode: '400001'
        },
        trackingSteps: [
          { id: 1, title: 'Order Placed', date: '15 May, 2023', completed: true },
          { id: 2, title: 'Processing', date: '16 May, 2023', completed: true },
          { id: 3, title: 'Shipped', date: '17 May, 2023', completed: true },
          { id: 4, title: 'In Transit', date: '18 May, 2023', completed: true },
          { id: 5, title: 'Out for Delivery', date: 'Pending', completed: false },
          { id: 6, title: 'Delivered', date: 'Pending', completed: false }
        ]
      });
    }, 1000);
  };
  
  const resetTracking = () => {
    setIsTracking(false);
    setOrderDetails(null);
    setTrackingNumber('');
  };
  
  return (
    <main className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto pt-20">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Track Your Order</h1>
          <p className="text-gray-600">Enter your order details to track your package</p>
        </div>
        
        {!isTracking || !orderDetails ? (
          <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
            <form onSubmit={handleSubmit}>
              <div className="mb-6">
                <div className="text-lg font-medium mb-4">Search By:</div>
                <div className="flex items-center space-x-8 mb-6">
                  <label className="flex items-center cursor-pointer">
                    <div className="relative w-6 h-6 mr-2">
                      <input 
                        type="radio" 
                        name="searchType" 
                        value="orderID" 
                        checked={searchType === 'orderID'} 
                        onChange={() => setSearchType('orderID')}
                        className="opacity-0 absolute w-full h-full cursor-pointer"
                      />
                      <div className={`w-5 h-5 border-2 rounded-full flex items-center justify-center ${searchType === 'orderID' ? 'border-black' : 'border-gray-400'}`}>
                        {searchType === 'orderID' && <div className="w-3 h-3 bg-black rounded-full"></div>}
                      </div>
                    </div>
                    <span>Order ID/No</span>
                  </label>
                  
                  <label className="flex items-center cursor-pointer">
                    <div className="relative w-6 h-6 mr-2">
                      <input 
                        type="radio" 
                        name="searchType" 
                        value="trackingID" 
                        checked={searchType === 'trackingID'} 
                        onChange={() => setSearchType('trackingID')}
                        className="opacity-0 absolute w-full h-full cursor-pointer"
                      />
                      <div className={`w-5 h-5 border-2 rounded-full flex items-center justify-center ${searchType === 'trackingID' ? 'border-black' : 'border-gray-400'}`}>
                        {searchType === 'trackingID' && <div className="w-3 h-3 bg-black rounded-full"></div>}
                      </div>
                    </div>
                    <span>Tracking ID/AWB</span>
                  </label>
                </div>
                
                <div className="flex flex-col md:flex-row gap-4">
                  <input
                    type="text"
                    value={trackingNumber}
                    onChange={(e) => setTrackingNumber(e.target.value)}
                    placeholder={searchType === 'orderID' ? "Enter Your Order ID starting with #" : "Enter Your Tracking ID/AWB"}
                    className="flex-1 border border-gray-300 rounded px-4 py-3 focus:outline-none focus:ring-1 focus:ring-black"
                    required
                  />
                  
                  <button
                    type="submit"
                    className="bg-black text-white py-3 px-6 rounded hover:bg-gray-800 transition-colors font-medium"
                  >
                    Track Your Order
                  </button>
                </div>
              </div>
              
              <p className="text-gray-700">Check current status of your shipment.</p>
            </form>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            {/* Order Header */}
            <div className="bg-emerald-600 text-white p-6">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-xl font-bold">Order #{orderDetails.id}</h2>
                  <p className="text-emerald-100">Placed on {orderDetails.date}</p>
                </div>
                <div className="text-right">
                  <span className="inline-flex items-center px-3 py-1 rounded-full bg-white text-emerald-700 text-sm font-medium">
                    {orderDetails.status}
                  </span>
                  <p className="text-emerald-100 mt-1">Est. Delivery: {orderDetails.estimatedDelivery}</p>
                </div>
              </div>
            </div>
            
            {/* Tracking Progress */}
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-900 mb-6">Tracking Information</h3>
              
              <div className="relative">
                {/* Progress Line */}
                <div className="absolute left-5 top-0 bottom-0 w-0.5 bg-gray-200"></div>
                
                {/* Steps */}
                <div className="space-y-8">
                  {orderDetails.trackingSteps.map((step) => (
                    <div key={step.id} className="relative flex items-start">
                      <div className={`absolute left-0 mt-1 flex items-center justify-center w-10 h-10 rounded-full ${
                        step.completed ? 'bg-emerald-600' : 'bg-gray-200'
                      }`}>
                        {step.completed ? (
                          <FiCheckCircle className="w-6 h-6 text-white" />
                        ) : (
                          <div className="w-3 h-3 bg-white rounded-full"></div>
                        )}
                      </div>
                      <div className="ml-14">
                        <h4 className={`font-medium ${step.completed ? 'text-gray-900' : 'text-gray-500'}`}>
                          {step.title}
                        </h4>
                        <p className={`text-sm ${step.completed ? 'text-gray-600' : 'text-gray-400'}`}>
                          {step.date}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Order Items */}
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Order Items</h3>
              
              <div className="space-y-4">
                {orderDetails.items.map((item) => (
                  <div key={item.id} className="flex items-center">
                    <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                      <Image
                        src={item.image}
                        alt={item.name}
                        width={64}
                        height={64}
                        className="h-full w-full object-cover object-center"
                      />
                    </div>
                    <div className="ml-4 flex-1">
                      <h4 className="text-sm font-medium text-gray-900">{item.name}</h4>
                      <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                    </div>
                    <p className="text-sm font-medium text-gray-900">₹{item.price.toFixed(2)}</p>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Shipping Address */}
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Shipping Address</h3>
              <address className="not-italic text-gray-600">
                <p className="font-medium text-gray-900">{orderDetails.shippingAddress.name}</p>
                <p>{orderDetails.shippingAddress.street}</p>
                <p>{orderDetails.shippingAddress.city}, {orderDetails.shippingAddress.state} {orderDetails.shippingAddress.pincode}</p>
              </address>
            </div>
            
            {/* Actions */}
            <div className="p-6 flex flex-wrap gap-4">
              <button
                onClick={resetTracking}
                className="bg-black text-white py-2 px-4 rounded-md hover:bg-gray-800 transition-colors font-medium"
              >
                Track Another Order
              </button>
              
              <Link 
                href="/help"
                className="bg-gray-200 text-gray-800 py-2 px-4 rounded-md hover:bg-gray-300 transition-colors font-medium"
              >
                Need Help?
              </Link>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}