'use client'
import { useRouter } from 'next/navigation'

export default function OrderSuccessDialog({ orderData, isOpen }) {
    const router = useRouter()

    if (!isOpen || !orderData) return null

    return (
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
                                    <p className="font-semibold text-gray-900">{orderData.orderId}</p>
                                </div>
                                {orderData.shipRocketOrderId && (
                                    <div>
                                        <span className="font-medium text-gray-600">ShipRocket ID:</span>
                                        <p className="font-semibold text-gray-900">{orderData.shipRocketOrderId}</p>
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="text-center">
                            <p className="text-gray-600 mb-4">
                                {orderData.courierName && (
                                    <>Your order will be shipped via <strong>{orderData.courierName}</strong></>
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
    )
}

