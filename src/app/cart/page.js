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
    getCartTotal,
    clearCart
  } = useCart();
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('online');
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const [orderSuccessData, setOrderSuccessData] = useState(null);
  const router = useRouter();

  // Handle order success
  const handleOrderSuccess = (responseData) => {
    setOrderSuccessData(responseData);
    setShowSuccessDialog(true);
    clearCart(); // Clear the cart
    setIsProcessing(false);

    // Redirect to home page after 3 seconds
    setTimeout(() => {
      router.push('/');
    }, 3000);
  };

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

  const handleOpenRazorpay = async (data, shippingAddress, billingAddress) => {
    console.log("data :", data)
    const options = {
      key: 'rzp_test_VHhB5zXuk19mbh',
      amount: data.amount,
      currency: data.currency,
      name: "LooksPure",
      description: 'Purchase from LooksPure',
      order_id: data.id,
      handler: async function (response) {
        //console.log(response);
        console.log("cart :", cart)

        // Get user profile - try localStorage first, but use Firebase auth as primary source
        const userProfile = JSON.parse(localStorage.getItem('userProfile') || '{}');
        const currentUser = auth.currentUser;

        // Create detailed order items with comprehensive product information
        const orderItems = await cart.map(item => ({
          productId: item.id,
          productName: item.name,
          productSubtitle: item.subtitle || '',
          productImage: item.image,
          productCategory: item.category || '',
          productBrand: item.brand || 'LooksPure',
          productDescription: item.description || '',
          productSku: item.sku || item.id,
          productWeight: item.weight || 0, // in grams
          productDimensions: item.dimensions || { length: 0, width: 0, height: 0 },
          quantity: item.quantity,
          unitPrice: item.price,
          totalPrice: item.price * item.quantity,
          productUrl: `${process.env.NEXT_PUBLIC_URL}/singleProduct/${item.id}`,
          // Additional product details for Shiprocket
          productHsn: item.hsn || '',
          productGst: item.gst || 0,
          productMrp: item.mrp || item.price,
          productDiscount: item.discount || 0
        }));

        // Prepare comprehensive customer data using Firebase auth as primary source
        const customerData = {
          customerId: currentUser?.phoneNumber || userProfile.customerId || null,
          customerName: `${userProfile.firstName || ''} ${userProfile.lastName || ''}`.trim() || currentUser?.displayName || '',
          customerEmail: userProfile.email || currentUser?.email || '',
          customerPhone: currentUser?.phoneNumber || userProfile.mobile || shippingAddress?.phone || '',
          customerGender: userProfile.gender || '',
          customerDateOfBirth: userProfile.dateOfBirth || '',
          customerAnniversary: userProfile.anniversary || '',
          // Firebase user data
          firebaseUid: currentUser?.uid || null,
          firebaseEmail: currentUser?.email || null,
          firebaseDisplayName: currentUser?.displayName || null,
          firebasePhoneNumber: currentUser?.phoneNumber || null,
          // Profile data
          profilePicture: userProfile.profilePicture || '',
          preferences: userProfile.preferences || {},
          loyaltyPoints: userProfile.loyaltyPoints || 0,
          totalOrders: userProfile.totalOrders || 0,
          totalSpent: userProfile.totalSpent || 0
        };

        // Get Firebase token
        const token = await auth.currentUser.getIdToken(true);

        // Create comprehensive order payload for Shiprocket
        const orderPayload = {
          // Payment response from Razorpay
          paymentResponse: response,
          razorpayOrderId: data.id,
          razorpayPaymentId: response.razorpay_payment_id,
          razorpaySignature: response.razorpay_signature,

          // Order basic info
          orderItems: orderItems,
          totalAmount: data.amount / 100,
          subtotal: data.amount / 100,
          shippingCharges: 0, // Can be calculated later
          taxAmount: 0, // Can be calculated later
          discountAmount: 0, // Can be calculated later
          paymentMethod: 'online',
          paymentStatus: 'paid',
          orderStatus: 'confirmed',
          orderDate: new Date().toISOString(),

          // Customer data
          customer: customerData,

          // Address information
          shippingAddress: shippingAddress,
          billingAddress: billingAddress,

          // Cart information
          cartItems: cart.length,
          cartTotal: data.amount / 100,

          // Shiprocket specific data
          shiprocketData: {
            channel: 'web',
            source: 'website',
            customerName: customerData.customerName,
            customerEmail: customerData.customerEmail,
            customerPhone: customerData.customerPhone,
            orderDate: new Date().toISOString(),
            paymentMethod: 'prepaid',
            // Product details for Shiprocket
            products: orderItems.map(item => ({
              name: item.productName,
              sku: item.productSku,
              units: item.quantity,
              selling_price: item.unitPrice,
              discount: item.productDiscount,
              hsn: item.productHsn,
              tax_amount: item.productGst,
              weight: item.productWeight
            }))
          },

          // Additional metadata
          metadata: {
            userAgent: navigator.userAgent,
            platform: 'web',
            version: '1.0.0',
            source: 'cart_page',
            paymentGateway: 'razorpay'
          }
        };

        // Verify payment and create order
        axios.post(`${API_BASE_URL}/api/orders/create`, orderPayload, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        })
          .then(res => {
            console.log("Order created:", res.data);
            if (res.data.success) {
              handleOrderSuccess(res.data);
            } else {
              setIsProcessing(false);
            }
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

  const handleCashOnDelivery = async (shippingAddress, billingAddress) => {
    setIsProcessing(true);

    try {
      // Get user profile - try localStorage first, but use Firebase auth as primary source
      const userProfile = JSON.parse(localStorage.getItem('userProfile') || '{}');
      const currentUser = auth.currentUser;

      // Create detailed order items with comprehensive product information
      const orderItems = cart.map(item => ({
        productId: item.id,
        productName: item.name,
        productSubtitle: item.subtitle || '',
        productImage: item.image,
        productCategory: item.category || '',
        productBrand: item.brand || 'LooksPure',
        productDescription: item.description || '',
        productSku: item.sku || item.id,
        productWeight: item.weight || 0, // in grams
        productDimensions: item.dimensions || { length: 0, width: 0, height: 0 },
        quantity: item.quantity,
        unitPrice: item.price,
        totalPrice: item.price * item.quantity,
        productUrl: `${process.env.NEXT_PUBLIC_URL}/singleProduct/${item.id}`,
        // Additional product details for Shiprocket
        productHsn: item.hsn || '',
        productGst: item.gst || 0,
        productMrp: item.mrp || item.price,
        productDiscount: item.discount || 0
      }));

      // Prepare comprehensive customer data using Firebase auth as primary source
      const customerData = {
        customerId: currentUser?.phoneNumber || userProfile.customerId || null,
        customerName: `${userProfile.firstName || ''} ${userProfile.lastName || ''}`.trim() || currentUser?.displayName || '',
        customerEmail: userProfile.email || currentUser?.email || '',
        customerPhone: currentUser?.phoneNumber || userProfile.mobile || shippingAddress?.phone || '',
        customerGender: userProfile.gender || '',
        customerDateOfBirth: userProfile.dateOfBirth || '',
        customerAnniversary: userProfile.anniversary || '',
        // Firebase user data
        firebaseUid: currentUser?.uid || null,
        firebaseEmail: currentUser?.email || null,
        firebaseDisplayName: currentUser?.displayName || null,
        firebasePhoneNumber: currentUser?.phoneNumber || null,
        // Profile data
        profilePicture: userProfile.profilePicture || '',
        preferences: userProfile.preferences || {},
        loyaltyPoints: userProfile.loyaltyPoints || 0,
        totalOrders: userProfile.totalOrders || 0,
        totalSpent: userProfile.totalSpent || 0
      };

      // Get Firebase token
      const token = await auth.currentUser.getIdToken(true);

      // Create comprehensive order payload for Shiprocket
      const orderPayload = {
        // Order basic info
        orderItems: orderItems,
        totalAmount: getCartTotal(),
        subtotal: getCartTotal(),
        shippingCharges: 0, // Can be calculated later
        taxAmount: 0, // Can be calculated later
        discountAmount: 0, // Can be calculated later
        paymentMethod: 'cod',
        orderStatus: 'pending',
        orderDate: new Date().toISOString(),

        // Customer data
        customer: customerData,

        // Address information
        shippingAddress: shippingAddress,
        billingAddress: billingAddress,

        // Cart information
        cartItems: cart.length,
        cartTotal: getCartTotal(),

        // Shiprocket specific data
        shiprocketData: {
          channel: 'web',
          source: 'website',
          customerName: customerData.customerName,
          customerEmail: customerData.customerEmail,
          customerPhone: customerData.customerPhone,
          orderDate: new Date().toISOString(),
          paymentMethod: 'cod',
          // Product details for Shiprocket
          products: orderItems.map(item => ({
            name: item.productName,
            sku: item.productSku,
            units: item.quantity,
            selling_price: item.unitPrice,
            discount: item.productDiscount,
            hsn: item.productHsn,
            tax_amount: item.productGst,
            weight: item.productWeight
          }))
        },

        // Additional metadata
        metadata: {
          userAgent: navigator.userAgent,
          platform: 'web',
          version: '1.0.0',
          source: 'cart_page'
        }
      };

      // Create order with COD payment method
      axios.post(`${API_BASE_URL}/api/orders/create`, orderPayload, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      })
        .then(res => {
          console.log("COD Order created:", res.data);
          if (res.data.success) {
            handleOrderSuccess(res.data);
          } else {
            setIsProcessing(false);
          }
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

  // Function to validate user addresses
  const validateUserAddresses = async () => {
    try {
      // Check if user is authenticated
      if (!auth.currentUser) {
        throw new Error('User not authenticated');
      }

      // Get user phone number from Firebase auth
      const phoneNumber = auth.currentUser.phoneNumber;
      if (!phoneNumber) {
        throw new Error('Phone number not found');
      }

      // Get Firebase token for authentication
      const token = await auth.currentUser.getIdToken(true);

      // Check user addresses using phone number as customer ID
      const response = await axios.get(`${API_BASE_URL}/api/users/${phoneNumber}/addresses`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      const { shippingAddress, billingAddress } = response.data;

      // Check if addresses are missing
      if (!shippingAddress || !billingAddress) {
        return {
          isValid: false,
          message: 'Please fill your shipping and billing addresses first to proceed with the order.'
        };
      }

      return {
        isValid: true,
        shippingAddress,
        billingAddress
      };

    } catch (error) {
      console.error('Address validation error:', error);
      return {
        isValid: false,
        message: 'Unable to validate addresses. Please try again.'
      };
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

    // Validate user addresses before proceeding
    const addressValidation = await validateUserAddresses();

    if (!addressValidation.isValid) {
      alert(addressValidation.message);
      router.push('/profile');
      setIsProcessing(false);
      return;
    }

    // Store simplified cart details in localStorage
    const simplifiedCart = cart.map(item => ({
      id: item.id,
      price: item.price,
      quantity: item.quantity,
      name: item.name,
      image: item.image
    }));

    localStorage.setItem('cart', JSON.stringify(simplifiedCart));

    // If Cash on Delivery is selected
    if (paymentMethod === 'cod') {
      handleCashOnDelivery(addressValidation.shippingAddress, addressValidation.billingAddress);
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
          handleOpenRazorpay(res.data, addressValidation.shippingAddress, addressValidation.billingAddress);
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

      {/* Order Success Dialog */}
      {showSuccessDialog && orderSuccessData && (
        <div className="fixed inset-0 bg-black/70 z-[60] flex items-center justify-center p-4">
          <div className="bg-white rounded-lg w-full max-w-md overflow-hidden shadow-xl transform transition-all">
            {/* Dialog Header */}
            <div className="relative bg-green-500 text-white p-6 text-center">
              <div className="flex justify-center items-center mb-4">
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              </div>
              <h2 className="text-2xl font-bold">Order Successful!</h2>
              <p className="text-green-100 mt-2">Your order has been placed successfully</p>
            </div>

            {/* Dialog Content */}
            <div className="p-6">
              <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="font-medium text-gray-600">Order ID:</span>
                      <p className="font-semibold text-gray-900">{orderSuccessData.orderId}</p>
                    </div>
                    <div>
                      <span className="font-medium text-gray-600">ShipRocket ID:</span>
                      <p className="font-semibold text-gray-900">{orderSuccessData.shipRocketOrderId}</p>
                    </div>
                  </div>
                </div>

                <div className="text-center">
                  <p className="text-gray-600 mb-4">
                    {orderSuccessData.courierName && (
                      <>Your order will be shipped via <strong>{orderSuccessData.courierName}</strong></>
                    )}
                  </p>
                  <p className="text-sm text-gray-500">
                    You will be redirected to the home page in a few seconds...
                  </p>
                </div>

                <div className="flex space-x-3">
                  <button
                    onClick={() => router.push('/')}
                    className="flex-1 bg-black hover:bg-gray-900 text-white py-3 px-4 rounded transition-colors"
                  >
                    Go to Home
                  </button>
                  <button
                    onClick={() => router.push('/orders')}
                    className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-900 py-3 px-4 rounded transition-colors"
                  >
                    View Orders
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}