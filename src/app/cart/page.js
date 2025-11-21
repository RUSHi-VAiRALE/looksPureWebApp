'use client'
import { FiShoppingBag, FiArrowLeft } from 'react-icons/fi';
import { useCart } from '@/context/CartContext';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { auth } from '@/lib/firebase';
import AddressSelectionModal from '@/components/cart/AddressSelectionModal';
import CartItem from '@/components/cart/CartItem';
import CartSummary from '@/components/cart/CartSummary';
import OrderSuccessDialog from '@/components/cart/OrderSuccessDialog';
import OrderErrorDialog from '@/components/cart/OrderErrorDialog';

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
  const [showAddressModal, setShowAddressModal] = useState(false);
  const [selectedAddresses, setSelectedAddresses] = useState(null);
  const [showErrorDialog, setShowErrorDialog] = useState(false);
  const [orderError, setOrderError] = useState(null);
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

  // Handle order error
  const handleOrderError = (errorData, paymentId = null) => {
    setOrderError({
      ...errorData,
      paymentId: paymentId
    });
    setShowErrorDialog(true);
    setIsProcessing(false);
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
              // Handle ShipRocket or other errors
              handleOrderError(
                {
                  error: res.data.error || 'ORDER_ERROR',
                  message: res.data.message || 'Failed to create order. Please try again.',
                  details: res.data.details || null
                },
                response.razorpay_payment_id // Pass payment ID since payment was successful
              );
            }
          })
          .catch(err => {
            console.error("Order creation failed:", err);
            const errorData = err.response?.data || {};
            handleOrderError(
              {
                error: errorData.error || 'ORDER_ERROR',
                message: errorData.message || 'Failed to create order. Please try again.',
                details: errorData.details || null
              },
              response.razorpay_payment_id // Pass payment ID since payment was successful
            );
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
            // Handle ShipRocket or other errors (no payment ID for COD)
            handleOrderError({
              error: res.data.error || 'ORDER_ERROR',
              message: res.data.message || 'Failed to create order. Please try again.',
              details: res.data.details || null
            });
          }
        })
        .catch(err => {
          console.error("COD Order creation failed:", err);
          const errorData = err.response?.data || {};
          handleOrderError({
            error: errorData.error || 'ORDER_ERROR',
            message: errorData.message || 'Failed to create order. Please try again.',
            details: errorData.details || null
          });
        });
    } catch (error) {
      console.error("COD Order processing error:", error);
      handleOrderError({
        error: 'ORDER_ERROR',
        message: 'An unexpected error occurred. Please try again.',
        details: error.message
      });
    }
  };

  // Handle address selection from modal
  const handleAddressSelected = (addresses) => {
    setSelectedAddresses(addresses);
    setShowAddressModal(false);
    // Proceed with payment after address is selected
    proceedWithPayment(addresses);
  };

  // Open address modal for checkout
  const handleCheckout = () => {
    // Check if user is logged in
    if (!auth.currentUser) {
      alert("Please login to continue with checkout");
      router.push('/login');
      return;
    }

    // Show address selection modal
    setShowAddressModal(true);
  };

  // Proceed with payment after address is confirmed
  const proceedWithPayment = async (addresses) => {
    setIsProcessing(true);

    const { shippingAddress, billingAddress } = addresses;

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
      handleCashOnDelivery(shippingAddress, billingAddress);
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
          handleOpenRazorpay(res.data, shippingAddress, billingAddress);
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
            {/* Cart Items */}
            <div className="lg:col-span-8">
              <div className="bg-white overflow-hidden shadow-sm rounded-lg border border-gray-200">
                <ul className="divide-y divide-gray-200">
                  {cart.map((item) => (
                    <CartItem
                      key={item.id}
                      item={item}
                      onUpdateQuantity={updateQuantity}
                      onRemove={removeFromCart}
                    />
                  ))}
                </ul>
              </div>
            </div>

            {/* Cart Summary */}
            <CartSummary
              cartTotal={getCartTotal()}
              paymentMethod={paymentMethod}
              onPaymentMethodChange={setPaymentMethod}
              onCheckout={handleCheckout}
              isProcessing={isProcessing}
            />
          </div>
        )}
      </div>

      {/* Address Selection Modal */}
      <AddressSelectionModal
        isOpen={showAddressModal}
        onClose={() => setShowAddressModal(false)}
        onSelectAddress={handleAddressSelected}
      />

      {/* Order Success Dialog */}
      <OrderSuccessDialog
        orderData={orderSuccessData}
        isOpen={showSuccessDialog}
      />

      {/* Order Error Dialog */}
      <OrderErrorDialog
        error={orderError}
        isOpen={showErrorDialog}
        onClose={() => {
          setShowErrorDialog(false);
          setOrderError(null);
        }}
      />
    </div>
  );
}