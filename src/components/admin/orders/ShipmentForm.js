import { useState } from 'react';
import { FiX } from 'react-icons/fi';

export default function ShipmentForm({ packageData, orderData, onSubmit, onCancel }) {
  console.log("packageData : ",packageData)
  console.log("orderData : ",orderData)
  const [form, setForm] = useState({
    packageId: packageData.package_id,
    deliveryMethod: '',
    trackingNumber: '',
    courierName: '',
    shipmentDate: '',
    expectedDeliveryDate: '',
    shippingAddress: orderData.shipping_address || {
      attention: '',
      address: '',
      street2: '',
      city: '',
      state: '',
      zip: '',
      country: '',
      phone: ''
    },
    billingAddress: orderData.billing_address || {
      attention: '',
      address: '',
      street2: '',
      city: '',
      state: '',
      zip: '',
      country: '',
      phone: ''
    },
    pickupAddress: { name: '' },
    weight: packageData.weight,
    length: packageData.length,
    width: packageData.width,
    height: packageData.height,
    orderItems: packageData.line_items.map(item => {
      const orderItem = orderData.line_items.find(li => li.line_item_id === item.lineItemId || li.line_item_id === item.line_item_id);
      return {
        name: orderItem?.name || '',
        sku: orderItem?.sku || '',
        units: item.quantity,
        selling_price: orderItem?.price || 0,
        discount: orderItem?.discount || 0,
        tax: orderItem?.tax || 0,
        hsn: orderItem?.hsn || ''
      };
    })
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAddressChange = (type, field, value) => {
    setForm(prev => ({
      ...prev,
      [type]: {
        ...prev[type],
        [field]: value
      }
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
        <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
          <h3 className="text-lg font-medium text-gray-900">Create Shipment</h3>
          <button
            type="button"
            onClick={onCancel}
            className="text-gray-400 hover:text-gray-500"
          >
            <FiX className="h-5 w-5" />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="px-6 py-4 space-y-6">
          <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-gray-700">Delivery Method</label>
              <input
                type="text"
                name="deliveryMethod"
                value={form.deliveryMethod}
                onChange={handleInputChange}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Tracking Number</label>
              <input
                type="text"
                name="trackingNumber"
                value={form.trackingNumber}
                onChange={handleInputChange}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Courier Name</label>
              <input
                type="text"
                name="courierName"
                value={form.courierName}
                onChange={handleInputChange}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Shipment Date</label>
              <input
                type="date"
                name="shipmentDate"
                value={form.shipmentDate}
                onChange={handleInputChange}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Expected Delivery Date</label>
              <input
                type="date"
                name="expectedDeliveryDate"
                value={form.expectedDeliveryDate}
                onChange={handleInputChange}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Pickup Address (Name)</label>
              <input
                type="text"
                name="pickupAddress"
                value={form.pickupAddress.name}
                onChange={e => handleAddressChange('pickupAddress', 'name', e.target.value)}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                required
              />
            </div>
          </div>
          {/* Shipping Address */}
          <div>
            <h4 className="text-sm font-medium text-gray-700 mb-2">Shipping Address</h4>
            <div className="grid grid-cols-1 gap-y-2 gap-x-4 sm:grid-cols-3">
              {['attention', 'address', 'street2', 'city', 'state', 'zip', 'country', 'phone'].map(field => (
                <div key={field}>
                  <label className="block text-xs font-medium text-gray-600 capitalize">{field}</label>
                  <input
                    type="text"
                    value={form.shippingAddress[field] || ''}
                    onChange={e => handleAddressChange('shippingAddress', field, e.target.value)}
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                  />
                </div>
              ))}
            </div>
          </div>
          {/* Billing Address */}
          <div>
            <h4 className="text-sm font-medium text-gray-700 mb-2">Billing Address</h4>
            <div className="grid grid-cols-1 gap-y-2 gap-x-4 sm:grid-cols-3">
              {['attention', 'address', 'street2', 'city', 'state', 'zip', 'country', 'phone'].map(field => (
                <div key={field}>
                  <label className="block text-xs font-medium text-gray-600 capitalize">{field}</label>
                  <input
                    type="text"
                    value={form.billingAddress[field] || ''}
                    onChange={e => handleAddressChange('billingAddress', field, e.target.value)}
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                  />
                </div>
              ))}
            </div>
          </div>
          {/* Dimensions and Weight */}
          <div className="grid grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Weight (g)</label>
              <input
                type="number"
                name="weight"
                value={form.weight}
                onChange={handleInputChange}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                required
                min="1"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Length (cm)</label>
              <input
                type="number"
                name="length"
                value={form.length}
                onChange={handleInputChange}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                required
                min="1"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Width (cm)</label>
              <input
                type="number"
                name="width"
                value={form.width}
                onChange={handleInputChange}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                required
                min="1"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Height (cm)</label>
              <input
                type="number"
                name="height"
                value={form.height}
                onChange={handleInputChange}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                required
                min="1"
              />
            </div>
          </div>
          {/* Order Items */}
          <div>
            <h4 className="text-sm font-medium text-gray-700 mb-2">Order Items in Shipment</h4>
            <ul className="border rounded-md divide-y divide-gray-200">
              {form.orderItems.map((item, idx) => (
                <li key={idx} className="px-4 py-2 flex justify-between text-sm">
                  <span>{item.name} (SKU: {item.sku})</span>
                  <span>Qty: {item.units}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="mt-6 flex justify-end space-x-3">
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
            >
              Create Shipment
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}