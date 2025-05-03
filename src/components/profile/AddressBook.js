'use client'
import { useState, useEffect } from 'react';
import { profileAPI } from '@/services/api/profile';
import AddressForm from './AddressForm';

export default function AddressBook({ user }) {
  const [addresses, setAddresses] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
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
  
  const handleSaveShippingAddress = async (addressData) => {
    setLoading(true);
    
    try {
      const updatedAddress = await profileAPI.updateShippingAddress(user.customerId, addressData);
      
      setAddresses({
        ...addresses,
        shipping: updatedAddress
      });
      
      setIsAddingShipping(false);
    } catch (error) {
      console.error('Error saving shipping address:', error);
      setError('Failed to save shipping address');
    } finally {
      setLoading(false);
    }
  };
  
  const handleSaveBillingAddress = async (addressData) => {
    setLoading(true);
    
    try {
      const updatedAddress = await profileAPI.updateBillingAddress(user.customerId, addressData);
      
      setAddresses({
        ...addresses,
        billing: updatedAddress
      });
      
      setIsAddingBilling(false);
    } catch (error) {
      console.error('Error saving billing address:', error);
      setError('Failed to save billing address');
    } finally {
      setLoading(false);
    }
  };
  
  if (loading && !addresses) {
    return <div className="p-4">Loading address information...</div>;
  }
  
  if (error) {
    return (
      <div className="p-4 bg-red-50 text-red-700 rounded-lg">
        {error}
      </div>
    );
  }
  
  return (
    <div className="space-y-6">
      {/* Shipping Address */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Shipping Address</h2>
          {addresses?.shippingAddress
 && !isAddingShipping && (
            <button
              onClick={() => setIsAddingShipping(true)}
              className="px-4 py-2 text-sm bg-black text-white rounded-md hover:bg-gray-800"
            >
              Edit
            </button>
          )}
        </div>
        
        {isAddingShipping || !addresses?.shippingAddress
 ? (
          <AddressForm 
            initialData={addresses?.shipping || {}} 
            onSave={handleSaveShippingAddress}
            onCancel={() => setIsAddingShipping(false)}
            type="shipping"
          />
        ) : (
          <div className="space-y-2">
            <p>{addresses.shippingAddress
.address}</p>
            {addresses.shippingAddress
.addressLine2 && <p>{addresses.shippingAddress
  .addressLine2}</p>}
            <p>{addresses.shippingAddress
.city}, {addresses.shippingAddress
  .state} {addresses.shippingAddress
    .postalCode}</p>
            <p>{addresses.shippingAddress
.country}</p>
            <p>Phone: {addresses.shippingAddress
.phone}</p>
          </div>
        )}
        
        {/* {!addresses?.shippingAddress
 && !isAddingShipping && (
          <button
            onClick={() => setIsAddingShipping(true)}
            className="mt-4 px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800"
          >
            Add Shipping Address
          </button>
        )} */}
      </div>
      
      {/* Billing Address */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Billing Address</h2>
          {addresses?.
billingAddress
 && !isAddingBilling && (
            <button
              onClick={() => setIsAddingBilling(true)}
              className="px-4 py-2 text-sm bg-black text-white rounded-md hover:bg-gray-800"
            >
              Edit
            </button>
          )}
        </div>
        
        {isAddingBilling || !addresses?.
billingAddress
 ? (
          <AddressForm 
            initialData={addresses?.billing || {}} 
            onSave={handleSaveBillingAddress}
            onCancel={() => setIsAddingBilling(false)}
            type="billing"
          />
        ) : (
          <div className="space-y-2">
            <p>{addresses.
billingAddress
.address}</p>
            {addresses.
billingAddress
.addressLine2 && <p>{addresses.
  billingAddress
  .addressLine2}</p>}
            <p>{addresses.
billingAddress
.city}, {addresses.billingAddress.state} {addresses.
  billingAddress
  .postalCode}</p>
            <p>{addresses.
billingAddress
.country}</p>
            <p>Phone: {addresses.
billingAddress
.phone}</p>
          </div>
        )}
        
        {/* {!addresses?.billing && !isAddingBilling && (
          <button
            onClick={() => setIsAddingBilling(true)}
            className="mt-4 px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800"
          >
            Add Billing Address
          </button>
        )} */}
        
        {addresses?.shippingAddress && addresses?.
billingAddress
 && (
          <div className="mt-4 flex items-center">
            <input
              type="checkbox"
              id="sameAsShipping"
              className="h-4 w-4 text-black focus:ring-black border-gray-300 rounded"
              onChange={(e) => {
                if (e.target.checked && addresses?.shippingAddress) {
                  handleSaveBillingAddress({...addresses.shippingAddress});
                }
              }}
            />
            <label htmlFor="sameAsShipping" className="ml-2 block text-sm text-gray-700">
              Use shipping address as billing address
            </label>
          </div>
        )}
      </div>
      
      {/* Address Usage Notice */}
      {/* <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 text-sm text-gray-600">
        <p>Your addresses are used for shipping and billing purposes only. We will never share your personal information with third parties without your consent.</p>
      </div> */}
    </div>
  );
}