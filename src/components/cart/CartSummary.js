'use client'
import Link from 'next/link'

export default function CartSummary({ 
  cartTotal, 
  paymentMethod, 
  onPaymentMethodChange, 
  onCheckout, 
  isProcessing 
}) {
  return (
    <div className="lg:col-span-4 mt-8 lg:mt-0">
      <div className="bg-white p-6 shadow-sm rounded-lg border border-gray-200">
        <h2 className="text-lg font-medium text-gray-900 mb-4">Order Summary</h2>

        <div className="space-y-4">
          <div className="flex justify-between border-b border-gray-200 pb-4">
            <p className="text-gray-600">Subtotal</p>
            <p className="font-medium">₹{cartTotal.toFixed(2)}</p>
          </div>

          <div className="flex justify-between border-b border-gray-200 pb-4">
            <p className="text-gray-600">Shipping</p>
            <p className="font-medium">Calculated at checkout</p>
          </div>

          <div className="flex justify-between">
            <p className="text-gray-900 font-medium">Total</p>
            <p className="text-gray-900 font-medium">₹{cartTotal.toFixed(2)}</p>
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
                onChange={() => onPaymentMethodChange('online')}
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
                onChange={() => onPaymentMethodChange('cod')}
                className="h-4 w-4 text-black focus:ring-black border-gray-300"
              />
              <span className="ml-2 text-sm text-gray-700">Cash on Delivery</span>
            </label>
          </div>
        </div>

        <div className="mt-6">
          <button
            onClick={onCheckout}
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
  )
}

