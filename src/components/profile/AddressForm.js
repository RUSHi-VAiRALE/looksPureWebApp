import { useState } from 'react';

export default function AddressForm({ initialData = {}, onSave, onCancel, type, loading = false }) {
  const [formData, setFormData] = useState({
    fullName: initialData.fullName || '',
    addressLine1: initialData.addressLine1 || '',
    addressLine2: initialData.addressLine2 || '',
    city: initialData.city || '',
    state: initialData.state || '',
    postalCode: initialData.postalCode || '',
    country: initialData.country || 'India',
    phone: initialData.phone || '',
    category: initialData.category || 'Home',
  });

  const addressCategories = [
    { value: 'Home', label: 'Home', icon: '🏠' },
    { value: 'Office', label: 'Office', icon: '🏢' },
    { value: 'Other', label: 'Other', icon: '📍' }
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Address Category
        </label>
        <div className="grid grid-cols-3 gap-3">
          {addressCategories.map((category) => (
            <label
              key={category.value}
              className={`relative flex items-center justify-center p-3 border rounded-lg cursor-pointer transition-all ${formData.category === category.value
                ? 'border-black bg-black text-white'
                : 'border-gray-300 hover:border-gray-400'
                }`}
            >
              <input
                type="radio"
                name="category"
                value={category.value}
                checked={formData.category === category.value}
                onChange={handleChange}
                className="sr-only"
              />
              <div className="flex flex-col items-center space-y-1">
                <span className="text-lg">{category.icon}</span>
                <span className="text-sm font-medium">{category.label}</span>
              </div>
            </label>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Full Name
        </label>
        <input
          type="text"
          name="fullName"
          value={formData.fullName}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-black"
          required
          disabled={loading}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Address Line 1
        </label>
        <input
          type="text"
          name="addressLine1"
          value={formData.addressLine1}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-black"
          required
          disabled={loading}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Address Line 2 (Optional)
        </label>
        <input
          type="text"
          name="addressLine2"
          value={formData.addressLine2}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-black"
          disabled={loading}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            City
          </label>
          <input
            type="text"
            name="city"
            value={formData.city}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-black"
            required
            disabled={loading}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            State
          </label>
          <input
            type="text"
            name="state"
            value={formData.state}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-black"
            required
            disabled={loading}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Postal Code
          </label>
          <input
            type="text"
            name="postalCode"
            value={formData.postalCode}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-black"
            required
            disabled={loading}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Country
          </label>
          <select
            name="country"
            value={formData.country}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-black"
            required
            disabled={loading}
          >
            <option value="India">India</option>
            <option value="United States">United States</option>
            <option value="United Kingdom">United Kingdom</option>
            <option value="Canada">Canada</option>
            <option value="Australia">Australia</option>
          </select>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Phone Number
        </label>
        <input
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-black"
          required
          disabled={loading}
        />
      </div>

      <div className="flex space-x-4 pt-4">
        <button
          type="submit"
          disabled={loading}
          className={`px-4 py-2 rounded-md transition-all flex items-center space-x-2 ${loading
            ? 'bg-gray-400 cursor-not-allowed'
            : 'bg-black hover:bg-gray-800'
            } text-white`}
        >
          {loading && (
            <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
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
          )}
          <span>
            {loading
              ? `Saving ${type === 'shipping' ? 'Shipping' : 'Billing'} Address...`
              : `Save ${type === 'shipping' ? 'Shipping' : 'Billing'} Address`
            }
          </span>
        </button>
        {initialData.fullName && (
          <button
            type="button"
            onClick={onCancel}
            disabled={loading}
            className={`px-4 py-2 border border-gray-300 rounded-md transition-all ${loading
              ? 'bg-gray-100 cursor-not-allowed text-gray-400'
              : 'hover:bg-gray-50'
              }`}
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}