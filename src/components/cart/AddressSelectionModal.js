'use client'
import { useState, useEffect } from 'react'
import { FiX, FiPlus, FiEdit2, FiMapPin, FiCheck } from 'react-icons/fi'
import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore'
import { db, auth } from '@/lib/firebase'
import AddressForm from '@/components/profile/AddressForm'

export default function AddressSelectionModal({ isOpen, onClose, onSelectAddress }) {
  const [addresses, setAddresses] = useState([])
  const [selectedAddressId, setSelectedAddressId] = useState(null)
  const [loading, setLoading] = useState(true)
  const [showAddressForm, setShowAddressForm] = useState(false)
  const [editingAddress, setEditingAddress] = useState(null)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  // Fetch addresses from Firestore
  useEffect(() => {
    if (isOpen) {
      fetchAddresses()
    }
  }, [isOpen])

  const fetchAddresses = async () => {
    setLoading(true)
    setError('')
    
    try {
      const user = auth.currentUser
      if (!user || !user.phoneNumber) {
        throw new Error('User not authenticated')
      }

      // Fetch customer document from Firestore
      const customerDoc = await getDoc(doc(db, 'customers', user.phoneNumber))
      
      if (customerDoc.exists()) {
        const data = customerDoc.data()
        const addressList = []

        // Check for shipping address (legacy single address)
        if (data.shippingAddress && data.shippingAddress.fullName) {
          addressList.push({
            id: 'shipping',
            ...data.shippingAddress,
            category: data.shippingAddress.category || 'Home'
          })
        }

        // Check for multiple addresses array
        if (data.addresses && Array.isArray(data.addresses)) {
          data.addresses.forEach((addr, index) => {
            addressList.push({
              id: `address_${index}`,
              ...addr
            })
          })
        }

        setAddresses(addressList)

        // Auto-select first address if available
        if (addressList.length > 0 && !selectedAddressId) {
          setSelectedAddressId(addressList[0].id)
        }

        // Show form if no addresses exist
        if (addressList.length === 0) {
          setShowAddressForm(true)
        }
      } else {
        // No customer document, show form
        setShowAddressForm(true)
      }
    } catch (err) {
      console.error('Error fetching addresses:', err)
      setError('Failed to load addresses. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleSaveAddress = async (formData) => {
    setSaving(true)
    setError('')

    try {
      const user = auth.currentUser
      if (!user || !user.phoneNumber) {
        throw new Error('User not authenticated')
      }

      const customerRef = doc(db, 'customers', user.phoneNumber)
      const customerDoc = await getDoc(customerRef)

      let updatedAddresses = []

      if (customerDoc.exists()) {
        const data = customerDoc.data()
        updatedAddresses = data.addresses || []
      }

      if (editingAddress) {
        // Update existing address
        const index = updatedAddresses.findIndex(
          (addr) => addr.category === editingAddress.category && 
          addr.fullName === editingAddress.fullName
        )
        
        if (index !== -1) {
          updatedAddresses[index] = formData
        } else {
          updatedAddresses.push(formData)
        }
      } else {
        // Add new address
        updatedAddresses.push(formData)
      }

      // Save to Firestore
      await setDoc(customerRef, {
        addresses: updatedAddresses,
        updatedAt: serverTimestamp()
      }, { merge: true })

      // Refresh addresses
      await fetchAddresses()
      setShowAddressForm(false)
      setEditingAddress(null)
    } catch (err) {
      console.error('Error saving address:', err)
      setError('Failed to save address. Please try again.')
    } finally {
      setSaving(false)
    }
  }

  const handleEditAddress = (address) => {
    setEditingAddress(address)
    setShowAddressForm(true)
  }

  const handleAddNewAddress = () => {
    setEditingAddress(null)
    setShowAddressForm(true)
  }

  const handleCancelForm = () => {
    setShowAddressForm(false)
    setEditingAddress(null)
  }

  const handleConfirmAddress = () => {
    const selectedAddress = addresses.find(addr => addr.id === selectedAddressId)
    if (selectedAddress) {
      // Both shipping and billing are the same
      onSelectAddress({
        shippingAddress: selectedAddress,
        billingAddress: selectedAddress
      })
      onClose()
    } else {
      setError('Please select an address')
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/70 z-[60] flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-lg w-full max-w-3xl max-h-[90vh] overflow-hidden shadow-xl transform transition-all my-8">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between z-10">
          <h2 className="text-xl font-bold text-gray-900">
            {showAddressForm 
              ? (editingAddress ? 'Edit Address' : 'Add New Address')
              : 'Select Delivery Address'
            }
          </h2>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-gray-100 transition-colors"
          >
            <FiX size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="px-6 py-4 overflow-y-auto max-h-[calc(90vh-140px)]">
          {error && (
            <div className="mb-4 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
              {error}
            </div>
          )}

          {loading ? (
            <div className="flex items-center justify-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black"></div>
            </div>
          ) : showAddressForm ? (
            <AddressForm
              initialData={editingAddress || {}}
              onSave={handleSaveAddress}
              onCancel={addresses.length > 0 ? handleCancelForm : null}
              loading={saving}
            />
          ) : (
            <div className="space-y-4">
              {/* Address List */}
              {addresses.map((address) => (
                <div
                  key={address.id}
                  onClick={() => setSelectedAddressId(address.id)}
                  className={`relative border-2 rounded-lg p-4 cursor-pointer transition-all ${
                    selectedAddressId === address.id
                      ? 'border-black bg-gray-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  {/* Selection Indicator */}
                  <div className="absolute top-4 right-4">
                    {selectedAddressId === address.id ? (
                      <div className="w-6 h-6 bg-black rounded-full flex items-center justify-center">
                        <FiCheck className="text-white" size={16} />
                      </div>
                    ) : (
                      <div className="w-6 h-6 border-2 border-gray-300 rounded-full"></div>
                    )}
                  </div>

                  {/* Address Content */}
                  <div className="pr-10">
                    <div className="flex items-center space-x-2 mb-2">
                      <span className="text-lg">
                        {address.category === 'Home' ? '🏠' : address.category === 'Office' ? '🏢' : '📍'}
                      </span>
                      <span className="font-semibold text-gray-900">{address.category}</span>
                    </div>
                    
                    <p className="font-medium text-gray-900">{address.fullName}</p>
                    <p className="text-sm text-gray-600 mt-1">
                      {address.addressLine1}
                      {address.addressLine2 && `, ${address.addressLine2}`}
                    </p>
                    <p className="text-sm text-gray-600">
                      {address.city}, {address.state} - {address.postalCode}
                    </p>
                    <p className="text-sm text-gray-600">{address.country}</p>
                    <p className="text-sm text-gray-600 mt-1">Phone: {address.phone}</p>

                    {/* Edit Button */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        handleEditAddress(address)
                      }}
                      className="mt-3 flex items-center space-x-1 text-sm text-black hover:text-gray-700"
                    >
                      <FiEdit2 size={14} />
                      <span>Edit</span>
                    </button>
                  </div>
                </div>
              ))}

              {/* Add New Address Button */}
              <button
                onClick={handleAddNewAddress}
                className="w-full border-2 border-dashed border-gray-300 rounded-lg p-6 hover:border-black hover:bg-gray-50 transition-all flex items-center justify-center space-x-2 text-gray-600 hover:text-black"
              >
                <FiPlus size={20} />
                <span className="font-medium">Add New Address</span>
              </button>
            </div>
          )}
        </div>

        {/* Footer - Only show when not in form mode */}
        {!showAddressForm && !loading && addresses.length > 0 && (
          <div className="sticky bottom-0 bg-white border-t border-gray-200 px-6 py-4">
            <button
              onClick={handleConfirmAddress}
              disabled={!selectedAddressId}
              className="w-full bg-black text-white py-3 px-4 rounded-md hover:bg-gray-800 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors font-medium"
            >
              Deliver to this Address
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

