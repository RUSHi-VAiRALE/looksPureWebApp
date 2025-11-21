'use client'
import { useRouter } from 'next/navigation'
import { FiX, FiAlertCircle } from 'react-icons/fi'

export default function OrderErrorDialog({ error, isOpen, onClose }) {
    const router = useRouter()
    if (!isOpen || !error) return null

    const isShipRocketError = error.error === 'SHIPROCKET_ERROR'
    const hasPaymentId = error.paymentId

    return (
        <div className="fixed inset-0 bg-black/70 z-[60] flex items-center justify-center p-4">
            <div className="bg-white rounded-lg w-full max-w-md overflow-hidden shadow-xl transform transition-all">
                {/* Dialog Header */}
                <div className="relative bg-red-500 text-white p-6 text-center">
                    <button
                        onClick={onClose}
                        className="absolute right-3 top-3 text-white hover:bg-red-600 rounded-full p-1"
                    >
                        <FiX size={20} />
                    </button>
                    <div className="flex justify-center items-center mb-4">
                        <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                            <FiAlertCircle className="text-white" size={32} />
                        </div>
                    </div>
                    <h2 className="text-2xl font-bold">
                        {hasPaymentId ? 'Payment Successful, Shipping Issue' : 'Order Failed'}
                    </h2>
                    <p className="text-red-100 mt-2">
                        {hasPaymentId
                            ? 'Your payment was processed but there was an issue with shipping'
                            : 'There was an issue processing your order'
                        }
                    </p>
                </div>

                {/* Dialog Content */}
                <div className="p-6">
                    <div className="space-y-4">
                        {/* Error Message */}
                        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                            <p className="text-sm text-red-800 font-medium mb-2">Error Details:</p>
                            <p className="text-sm text-red-700">{error.message}</p>
                        </div>

                        {/* Payment ID if available */}
                        {hasPaymentId && (
                            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                                <p className="text-sm text-yellow-800 font-medium mb-2">Payment Information:</p>
                                <div className="space-y-1">
                                    <p className="text-sm text-yellow-700">
                                        <span className="font-semibold">Payment ID:</span> {error.paymentId}
                                    </p>
                                    <p className="text-xs text-yellow-600 mt-2">
                                        ⚠️ Please save this Payment ID and contact our support team. Your payment was successful and will be refunded or your order will be manually processed.
                                    </p>
                                </div>
                            </div>
                        )}

                        {/* ShipRocket specific error details */}
                        {isShipRocketError && error.details && (
                            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                                <p className="text-sm text-gray-700 font-medium mb-2">Technical Details:</p>
                                <div className="text-xs text-gray-600 space-y-1 max-h-32 overflow-y-auto">
                                    <pre className="whitespace-pre-wrap break-words">
                                        {JSON.stringify(error.details, null, 2)}
                                    </pre>
                                </div>
                            </div>
                        )}

                        {/* Action Buttons */}
                        <div className="flex flex-col space-y-3 pt-2">
                            {hasPaymentId ? (
                                <>
                                    <button
                                        onClick={() => {
                                            // Copy payment ID to clipboard
                                            navigator.clipboard.writeText(error.paymentId)
                                            alert('Payment ID copied to clipboard!')
                                        }}
                                        className="w-full bg-yellow-500 hover:bg-yellow-600 text-white py-3 px-4 rounded transition-colors font-medium"
                                    >
                                        Copy Payment ID
                                    </button>
                                    <a
                                        href={`mailto:support@lookspure.com?subject=Order Issue - Payment ID: ${error.paymentId}&body=Payment ID: ${error.paymentId}%0D%0A%0D%0APlease help me with my order. My payment was successful but shipping order creation failed.`}
                                        className="w-full bg-black hover:bg-gray-800 text-white py-3 px-4 rounded transition-colors font-medium text-center"
                                    >
                                        Contact Support
                                    </a>
                                </>
                            ) : (
                                <>
                                    <button
                                        onClick={onClose}
                                        className="w-full bg-black hover:bg-gray-800 text-white py-3 px-4 rounded transition-colors font-medium"
                                    >
                                        Try Again
                                    </button>
                                    <a
                                        href="mailto:support@lookspure.com?subject=Order Failed&body=I encountered an error while placing my order. Please help."
                                        className="w-full bg-gray-100 hover:bg-gray-200 text-gray-900 py-3 px-4 rounded transition-colors font-medium text-center"
                                    >
                                        Contact Support
                                    </a>
                                </>
                            )}
                            <button
                                onClick={() => router.push('/')}
                                className="w-full border border-gray-300 hover:border-gray-400 text-gray-700 hover:text-gray-900 py-3 px-4 rounded transition-colors font-medium"
                            >
                                Back to Home
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

