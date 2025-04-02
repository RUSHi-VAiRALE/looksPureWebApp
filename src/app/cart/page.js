'use client'
import { FiShoppingBag, FiTrash2, FiArrowLeft } from 'react-icons/fi';
import { useCart } from '@/context/CartContext';
import Image from 'next/image';
import Link from 'next/link';

export default function CartPage() {
  const { 
    cart, 
    removeFromCart, 
    updateQuantity, 
    getCartTotal 
  } = useCart();

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

          {cart.length === 0 ? (
            <div className="py-12 text-center bg-white rounded-lg shadow-sm border border-gray-100">
              <FiShoppingBag className="mx-auto h-16 w-16 text-gray-400" />
              <h3 className="mt-4 text-xl font-medium text-gray-900">Your cart is empty</h3>
              <p className="mt-2 text-gray-500">
                Looks like you haven't added any products to your cart yet.
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
              {/* Cart Items - Left Side */}
              <div className="lg:col-span-8">
                <div className="bg-white overflow-hidden shadow-sm rounded-lg border border-gray-200">
                  <ul className="divide-y divide-gray-200">
                    {cart.map((item) => (
                      <li key={`${item.id}-${item.selectedShade.id}`} className="p-6">
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
                                <p className="mt-1 text-sm text-gray-500">
                                  Shade: {item.selectedShade.name}
                                </p>
                              </div>
                              <p className="text-base font-medium text-gray-900">₹{item.price.toFixed(2)}</p>
                            </div>
                            
                            <div className="flex justify-between items-end mt-4">
                              <div className="flex items-center border border-gray-300 rounded-md">
                                <button
                                  onClick={() => updateQuantity(item.id, item.selectedShade.id, item.quantity - 1)}
                                  className="px-3 py-1 text-gray-600 hover:text-gray-900"
                                >
                                  -
                                </button>
                                <span className="px-3 py-1">{item.quantity}</span>
                                <button
                                  onClick={() => updateQuantity(item.id, item.selectedShade.id, item.quantity + 1)}
                                  className="px-3 py-1 text-gray-600 hover:text-gray-900"
                                >
                                  +
                                </button>
                              </div>

                              <button
                                type="button"
                                onClick={() => removeFromCart(item.id, item.selectedShade.id)}
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
                  
                  <div className="mt-6">
                    <Link
                      href="/checkout"
                      className="w-full flex items-center justify-center border border-transparent bg-black px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-gray-900"
                    >
                      Proceed to Checkout
                    </Link>
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