'use client'
import { useState, useEffect } from 'react';
import { profileAPI } from '@/services/api/profile';
import AddressForm from './AddressForm';

export default function AddressBook({ user }) {
  const [addresses, setAddresses] = useState(null);
  const [loading, setLoading] = useState(true);
  const [savingShipping, setSavingShipping] = useState(false);
  const [savingBilling, setSavingBilling] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [isAddingShipping, setIsAddingShipping] = useState(false);
  const [isAddingBilling, setIsAddingBilling] = useState(false);

  useEffect(() => {
    const fetchAddresses = async () => {
      try {
        const data = await profileAPI.getUserAddresses(user.customerId);
        console.log(data)
        setAddresses(data);
      } catch (error) {
        console.error('Error fetching addresses:', error);
        setError('Failed to load address information');
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchAddresses();
    }
  }, [user]);

  // Clear messages after 5 seconds
  useEffect(() => {
    if (successMessage || error) {
      const timer = setTimeout(() => {
        setSuccessMessage('');
        setError('');
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [successMessage, error]);

  const handleSaveShippingAddress = async (addressData) => {
    setSavingShipping(true);
    setError('');
    setSuccessMessage('');

    try {
      const updatedAddress = await profileAPI.updateShippingAddress(user.customerId, addressData);

      setAddresses({
        ...addresses,
        shippingAddress: updatedAddress
      });

      setIsAddingShipping(false);
      setSuccessMessage('Shipping address saved successfully!');
    } catch (error) {
      console.error('Error saving shipping address:', error);
      setError('Failed to save shipping address. Please try again.');
    } finally {
      setSavingShipping(false);
    }
  };

  const handleSaveBillingAddress = async (addressData) => {
    setSavingBilling(true);
    setError('');
    setSuccessMessage('');

    try {
      const updatedAddress = await profileAPI.updateBillingAddress(user.customerId, addressData);

      setAddresses({
        ...addresses,
        billingAddress: updatedAddress
      });

      setIsAddingBilling(false);
      setSuccessMessage('Billing address saved successfully!');
    } catch (error) {
      console.error('Error saving billing address:', error);
      setError('Failed to save billing address. Please try again.');
    } finally {
      setSavingBilling(false);
    }
  };

  const getCategoryIcon = (category) => {
    const icons = {
      'Home': '🏠',
      'Office': '🏢',
      'Other': '📍'
    };
    return icons[category] || '📍';
  };

  if (loading && !addresses) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="flex items-center space-x-2">
          <svg className="animate-spin h-5 w-5 text-gray-600" viewBox="0 0 24 24">
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
              fill="none"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
          <span className="text-gray-600">Loading address information...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Success/Error Messages */}
      {successMessage && (
        <div className="p-4 bg-green-50 border border-green-200 text-green-700 rounded-lg flex items-center space-x-2">
          <svg className="h-5 w-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
          <span>{successMessage}</span>
        </div>
      )}

      {error && (
        <div className="p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg flex items-center space-x-2">
          <svg className="h-5 w-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
          </svg>
          <span>{error}</span>
        </div>
      )}

      {/* Shipping Address */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Shipping Address</h2>
          {addresses?.shippingAddress && !isAddingShipping && (
            <button
              onClick={() => setIsAddingShipping(true)}
              disabled={savingShipping || savingBilling}
              className="px-4 py-2 text-sm bg-black text-white rounded-md hover:bg-gray-800 disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              Edit
            </button>
          )}
        </div>

        {isAddingShipping || !addresses?.shippingAddress ? (
          <AddressForm
            initialData={addresses?.shippingAddress || {}}
            onSave={handleSaveShippingAddress}
            onCancel={() => setIsAddingShipping(false)}
            type="shipping"
            loading={savingShipping}
          />
        ) : (
          <div className="space-y-3">
            <div className="flex items-center space-x-2 mb-3">
              <span className="text-lg">{getCategoryIcon(addresses.shippingAddress.category)}</span>
              <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full font-medium">
                {addresses.shippingAddress.category || 'Home'}
              </span>
            </div>
            <div className="space-y-2 text-gray-700">
              <p className="font-medium">{addresses.shippingAddress.fullName}</p>
              <p>{addresses.shippingAddress.addressLine1}</p>
              {addresses.shippingAddress.addressLine2 && <p>{addresses.shippingAddress.addressLine2}</p>}
              <p>{addresses.shippingAddress.city}, {addresses.shippingAddress.state} {addresses.shippingAddress.postalCode}</p>
              <p>{addresses.shippingAddress.country}</p>
              <p>Phone: {addresses.shippingAddress.phone}</p>
            </div>
          </div>
        )}
      </div>

      {/* Billing Address */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Billing Address</h2>
          {addresses?.billingAddress && !isAddingBilling && (
            <button
              onClick={() => setIsAddingBilling(true)}
              disabled={savingShipping || savingBilling}
              className="px-4 py-2 text-sm bg-black text-white rounded-md hover:bg-gray-800 disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              Edit
            </button>
          )}
        </div>

        {isAddingBilling || !addresses?.billingAddress ? (
          <AddressForm
            initialData={addresses?.billingAddress || {}}
            onSave={handleSaveBillingAddress}
            onCancel={() => setIsAddingBilling(false)}
            type="billing"
            loading={savingBilling}
          />
        ) : (
          <div className="space-y-3">
            <div className="flex items-center space-x-2 mb-3">
              <span className="text-lg">{getCategoryIcon(addresses.billingAddress.category)}</span>
              <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full font-medium">
                {addresses.billingAddress.category || 'Home'}
              </span>
            </div>
            <div className="space-y-2 text-gray-700">
              <p className="font-medium">{addresses.billingAddress.fullName}</p>
              <p>{addresses.billingAddress.addressLine1}</p>
              {addresses.billingAddress.addressLine2 && <p>{addresses.billingAddress.addressLine2}</p>}
              <p>{addresses.billingAddress.city}, {addresses.billingAddress.state} {addresses.billingAddress.postalCode}</p>
              <p>{addresses.billingAddress.country}</p>
              <p>Phone: {addresses.billingAddress.phone}</p>
            </div>
          </div>
        )}

        {addresses?.shippingAddress && addresses?.billingAddress && !isAddingBilling && (
          <div className="mt-4 flex items-center">
            <input
              type="checkbox"
              id="sameAsShipping"
              className="h-4 w-4 text-black focus:ring-black border-gray-300 rounded"
              disabled={savingBilling}
              onChange={(e) => {
                if (e.target.checked && addresses?.shippingAddress) {
                  handleSaveBillingAddress({ ...addresses.shippingAddress });
                }
              }}
            />
            <label htmlFor="sameAsShipping" className="ml-2 block text-sm text-gray-700">
              Use shipping address as billing address
            </label>
          </div>
        )}
      </div>
    </div>
  );
}