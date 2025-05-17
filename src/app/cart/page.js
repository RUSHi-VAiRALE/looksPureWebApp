'use client'
import { FiShoppingBag, FiTrash2, FiArrowLeft } from 'react-icons/fi';
import { useCart } from '@/context/CartContext';
import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { auth } from '@/lib/firebase';
const API_BASE_URL = process.env.NEXT_PUBLIC_URL;
export default function CartPage() {
  const { 
    cart, 
    removeFromCart, 
    updateQuantity, 
    getCartTotal 
  } = useCart();
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('online');
  const router = useRouter();

  // Check if Razorpay is loaded
  useEffect(() => {
    const loadRazorpayScript = () => {
      return new Promise((resolve) => {
        const script = document.createElement('script');
        script.src = 'https://checkout.razorpay.com/v1/checkout.js';
        script.onload = () => resolve(true);
        script.onerror = () => resolve(false);
        document.body.appendChild(script);
      });
    };

    loadRazorpayScript();
  }, []);

  const handleOpenRazorpay = async (data) => {
    const options = {
      key: 'rzp_test_VHhB5zXuk19mbh',
      amount: data.amount,
      currency: data.currency,
      name: "LooksPure",
      description: 'Purchase from LooksPure',
      order_id: data.id,
      handler: async function(response) {
        console.log(response);
        
        // Create order details from cart items
        const orderItems = cart.map(item => ({
          productId: item.id,
          productName: item.name,
          productImage: item.image,
          quantity: item.quantity,
          price: item.price,
          shade: item.selectedShade.name,
          shadeId: item.selectedShade.id
        }));
        
        // Get user profile from localStorage
        const userProfile = JSON.parse(localStorage.getItem('userProfile') || '{}');
        
        // Get Firebase token
        const token = await auth.currentUser.getIdToken(true);
        
        // Verify payment and create order
        axios.post(`${API_BASE_URL}/api/orders/create`, {
          paymentResponse: response,
          orderItems: orderItems,
          totalAmount: data.amount/100,
          customerId: userProfile.customerId || null,
          shippingAddress: userProfile.shippingAddress || null,
          billingAddress: userProfile.billingAddress || null,
          paymentMethod: 'online'
        }, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        })
        .then(res => {
          console.log("Order created:", res.data);
          // Clear cart and redirect to success page
          // This would need to be implemented in your CartContext
        })
        .catch(err => {
          console.error("Order creation failed:", err);
          setIsProcessing(false);
        });
      },
      prefill: {
        name: "",
        email: auth.currentUser?.email || "",
        contact: ""
      },
      theme: {
        color: "#000000",
      }
    };
    
    const rzp = new window.Razorpay(options);
    rzp.open();
    setIsProcessing(false);
  };

  const handleCashOnDelivery = async () => {
    setIsProcessing(true);
    
    try {
      // Create order details from cart items
      const orderItems = cart.map(item => ({
        productId: item.id,
        productName: item.name,
        productImage: item.image,
        quantity: item.quantity,
        price: item.price,
        shade: item.selectedShade.name,
        shadeId: item.selectedShade.id
      }));
      
      // Get user profile from localStorage
      const userProfile = JSON.parse(localStorage.getItem('userProfile') || '{}');
      
      // Get Firebase token
      const token = await auth.currentUser.getIdToken(true);
      
      // Create order with COD payment method
      axios.post(`${API_BASE_URL}/api/orders/create`, {
        orderItems: orderItems,
        totalAmount: getCartTotal(),
        customerId: userProfile.customerId || null,
        shippingAddress: userProfile.shippingAddress || null,
        billingAddress: userProfile.billingAddress || null,
        paymentMethod: 'cod'
      }, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      .then(res => {
        console.log("COD Order created:", res.data);
      })
      .catch(err => {
        console.error("COD Order creation failed:", err);
        setIsProcessing(false);
      });
    } catch (error) {
      console.error("COD Order processing error:", error);
      setIsProcessing(false);
    }
  };

  const handlePayment = async () => {
    setIsProcessing(true);
    
    // Check if user is logged in
    if (!auth.currentUser) {
      alert("Please login to continue with checkout");
      router.push('/login');
      setIsProcessing(false);
      return;
    }
    
    // Store simplified cart details in localStorage
    const simplifiedCart = cart.map(item => ({
      id: item.id,
      price: item.price,
      quantity: item.quantity,
      image: item.image
    }));
    
    localStorage.setItem('cartDetails', JSON.stringify(simplifiedCart));
    
    // If Cash on Delivery is selected
    if (paymentMethod === 'cod') {
      handleCashOnDelivery();
      return;
    }
    
    // Online payment flow
    const amount = getCartTotal() * 100; // Convert to smallest currency unit (paise)
    
    const _data = {
      amount: amount,
      currency: "INR",
      items: cart.length
    };
    
    try {
      // Get Firebase token
      const token = await auth.currentUser.getIdToken(true);
      
      axios.post(`${API_BASE_URL}/api/payment/create-order`, _data, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
        .then(res => {
          console.log("Payment order created:", res.data);
          handleOpenRazorpay(res.data);
        })
        .catch(err => {
          console.error("Payment order creation failed:", err);
          setIsProcessing(false);
        });
    } catch (error) {
      console.error("Payment processing error:", error);
      setIsProcessing(false);
    }
  };
  // Rest of the component remains the same until the checkout button
  return (
      <div className="bg-white min-h-screen pt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-2xl md:text-3xl font-medium text-gray-900">Shopping Cart</h1>
            <Link href="/" className="text-sm text-gray-600 hover:text-gray-900 flex items-center">
              <FiArrowLeft className="mr-2" />
              Continue Shopping
            </Link>
          </div>

          {/* Empty cart section remains the same */}
          {cart.length === 0 ? (
            <div className="py-12 text-center bg-white rounded-lg shadow-sm border border-gray-100">
              <FiShoppingBag className="mx-auto h-16 w-16 text-gray-400" />
              <h3 className="mt-4 text-xl font-medium text-gray-900">Your cart is empty</h3>
              <p className="mt-2 text-gray-500">
                Looks like you haven&apos;t added any products to your cart yet.
              </p>
              <div className="mt-6">
                <Link
                  href="/"
                  className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-black hover:bg-gray-900"
                >
                  Start Shopping
                </Link>
              </div>
            </div>
          ) : (
            <div className="lg:grid lg:grid-cols-12 lg:gap-8">
              {/* Cart Items section remains the same */}
              <div className="lg:col-span-8">
                {/* Cart items code remains unchanged */}
                <div className="bg-white overflow-hidden shadow-sm rounded-lg border border-gray-200">
                  <ul className="divide-y divide-gray-200">
                    {cart.map((item) => (
                      
                      <li key={`${item.id}`} className="p-6">
                        <div className="flex flex-col sm:flex-row">
                          <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200 mb-4 sm:mb-0">
                            <Image
                              src={item.image}
                              alt={item.name}
                              width={96}
                              height={96}
                              className="h-full w-full object-cover object-center"
                            />
                          </div>

                          <div className="sm:ml-6 flex flex-1 flex-col">
                            <div className="flex justify-between">
                              <div>
                                <h3 className="text-base font-medium text-gray-900">
                                  <Link href={`/singleProduct/${item.id}`} className="hover:text-emerald-600">
                                    {item.name}
                                  </Link>
                                </h3>
                                <p className="mt-1 text-sm text-gray-500">{item.subtitle}</p>
                              </div>
                              <p className="text-base font-medium text-gray-900">₹{item.price.toFixed(2)}</p>
                            </div>
                            
                            <div className="flex justify-between items-end mt-4">
                              <div className="flex items-center border border-gray-300 rounded-md">
                                <button
                                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                  className="px-3 py-1 text-gray-600 hover:text-gray-900"
                                >
                                  -
                                </button>
                                <span className="px-3 py-1">{item.quantity}</span>
                                <button
                                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                  className="px-3 py-1 text-gray-600 hover:text-gray-900"
                                >
                                  +
                                </button>
                              </div>

                              <button
                                type="button"
                                onClick={() => removeFromCart(item.id)}
                                className="flex items-center text-sm font-medium text-red-600 hover:text-red-500"
                              >
                                <FiTrash2 className="mr-1" />
                                Remove
                              </button>
                            </div>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Order Summary - Right Side */}
              <div className="lg:col-span-4 mt-8 lg:mt-0">
                <div className="bg-white p-6 shadow-sm rounded-lg border border-gray-200">
                  <h2 className="text-lg font-medium text-gray-900 mb-4">Order Summary</h2>
                  
                  <div className="space-y-4">
                    <div className="flex justify-between border-b border-gray-200 pb-4">
                      <p className="text-gray-600">Subtotal</p>
                      <p className="font-medium">₹{getCartTotal().toFixed(2)}</p>
                    </div>
                    
                    <div className="flex justify-between border-b border-gray-200 pb-4">
                      <p className="text-gray-600">Shipping</p>
                      <p className="font-medium">Calculated at checkout</p>
                    </div>
                    
                    <div className="flex justify-between">
                      <p className="text-gray-900 font-medium">Total</p>
                      <p className="text-gray-900 font-medium">₹{getCartTotal().toFixed(2)}</p>
                    </div>
                  </div>
                  
                  {/* Payment Method Selection */}
                  <div className="mt-6">
                    <h3 className="text-sm font-medium text-gray-900 mb-3">Payment Method</h3>
                    <div className="space-y-3">
                      <label className="flex items-center">
                        <input
                          type="radio"
                          name="paymentMethod"
                          value="online"
                          checked={paymentMethod === 'online'}
                          onChange={() => setPaymentMethod('online')}
                          className="h-4 w-4 text-black focus:ring-black border-gray-300"
                        />
                        <span className="ml-2 text-sm text-gray-700">Online Payment</span>
                      </label>
                      <label className="flex items-center">
                        <input
                          type="radio"
                          name="paymentMethod"
                          value="cod"
                          checked={paymentMethod === 'cod'}
                          onChange={() => setPaymentMethod('cod')}
                          className="h-4 w-4 text-black focus:ring-black border-gray-300"
                        />
                        <span className="ml-2 text-sm text-gray-700">Cash on Delivery</span>
                      </label>
                    </div>
                  </div>
                  
                  <div className="mt-6">
                    <button
                      onClick={handlePayment}
                      disabled={isProcessing}
                      className="w-full flex items-center justify-center border border-transparent bg-black px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-gray-900 disabled:bg-gray-400 disabled:cursor-not-allowed"
                    >
                      {isProcessing ? 'Processing...' : paymentMethod === 'online' ? 'Proceed to Payment' : 'Place Order (COD)'}
                    </button>
                  </div>
                  
                  <div className="mt-4">
                    <Link
                      href="/"
                      className="w-full flex items-center justify-center px-6 py-3 text-base font-medium text-gray-700 hover:text-gray-900 border border-gray-300 hover:border-gray-400"
                    >
                      Continue Shopping
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
  );
}