import { useState } from 'react';
import { FiX, FiPlus, FiMinus } from 'react-icons/fi';

export default function PackageForm({ orderItems, onSubmit, onCancel }) {
  const [packageData, setPackageData] = useState({
    packageName: `Package for Order`,
    packageNumber: `PKG-${Date.now().toString().slice(-6)}`,
    length: '',
    width: '',
    height: '',
    weight: '',
    items: []
  });
  
  const [selectedItems, setSelectedItems] = useState([]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPackageData({
      ...packageData,
      [name]: value
    });
  };

  const handleItemSelect = (e) => {
    const lineItemId = e.target.value;
    if (lineItemId && !selectedItems.includes(lineItemId)) {
      const item = orderItems.find(item => item.line_item_id === lineItemId);
      setSelectedItems([...selectedItems, lineItemId]);
      setPackageData({
        ...packageData,
        items: [
          ...packageData.items,
          {
            lineItemId,
            quantity: 1,
            maxQuantity: item.quantity - getAlreadyPackedQuantity(lineItemId)
          }
        ]
      });
    }
  };

  const getAlreadyPackedQuantity = (lineItemId) => {
    return packageData.items
      .filter(item => item.lineItemId === lineItemId)
      .reduce((sum, item) => sum + item.quantity, 0);
  };

  const handleQuantityChange = (index, value) => {
    const newItems = [...packageData.items];
    newItems[index].quantity = parseInt(value, 10);
    setPackageData({
      ...packageData,
      items: newItems
    });
  };

  const removeItem = (index) => {
    const newItems = [...packageData.items];
    const removedItemId = newItems[index].lineItemId;
    newItems.splice(index, 1);
    
    // Update selected items
    const newSelectedItems = selectedItems.filter(id => 
      id !== removedItemId || newItems.some(item => item.lineItemId === id)
    );
    
    setSelectedItems(newSelectedItems);
    setPackageData({
      ...packageData,
      items: newItems
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      ...packageData,
      length: parseFloat(packageData.length),
      width: parseFloat(packageData.width),
      height: parseFloat(packageData.height),
      weight: parseFloat(packageData.weight)
    });
  };

  const getItemName = (lineItemId) => {
    const item = orderItems.find(item => item.line_item_id === lineItemId);
    return item ? item.name : 'Unknown Item';
  };

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
        <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
          <h3 className="text-lg font-medium text-gray-900">Create Package</h3>
          <button
            type="button"
            onClick={onCancel}
            className="text-gray-400 hover:text-gray-500"
          >
            <FiX className="h-5 w-5" />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="px-6 py-4">
          <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
            <div className="sm:col-span-3">
              <label htmlFor="packageName" className="block text-sm font-medium text-gray-700">
                Package Name
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  name="packageName"
                  id="packageName"
                  value={packageData.packageName}
                  onChange={handleInputChange}
                  className="shadow-sm focus:ring-black focus:border-black block w-full sm:text-sm border-gray-300 rounded-md"
                  required
                />
              </div>
            </div>
            
            <div className="sm:col-span-3">
              <label htmlFor="packageNumber" className="block text-sm font-medium text-gray-700">
                Package Number
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  name="packageNumber"
                  id="packageNumber"
                  value={packageData.packageNumber}
                  onChange={handleInputChange}
                  className="shadow-sm focus:ring-black focus:border-black block w-full sm:text-sm border-gray-300 rounded-md"
                  required
                />
              </div>
            </div>
            
            <div className="sm:col-span-6">
              <h4 className="text-sm font-medium text-gray-700 mb-2">Package Dimensions</h4>
              <div className="grid grid-cols-4 gap-4">
                <div>
                  <label htmlFor="length" className="block text-sm font-medium text-gray-700">
                    Length (cm)
                  </label>
                  <input
                    type="number"
                    name="length"
                    id="length"
                    value={packageData.length}
                    onChange={handleInputChange}
                    className="mt-1 shadow-sm focus:ring-black focus:border-black block w-full sm:text-sm border-gray-300 rounded-md"
                    required
                    min="1"
                  />
                </div>
                <div>
                  <label htmlFor="width" className="block text-sm font-medium text-gray-700">
                    Width (cm)
                  </label>
                  <input
                    type="number"
                    name="width"
                    id="width"
                    value={packageData.width}
                    onChange={handleInputChange}
                    className="mt-1 shadow-sm focus:ring-black focus:border-black block w-full sm:text-sm border-gray-300 rounded-md"
                    required
                    min="1"
                  />
                </div>
                <div>
                  <label htmlFor="height" className="block text-sm font-medium text-gray-700">
                    Height (cm)
                  </label>
                  <input
                    type="number"
                    name="height"
                    id="height"
                    value={packageData.height}
                    onChange={handleInputChange}
                    className="mt-1 shadow-sm focus:ring-black focus:border-black block w-full sm:text-sm border-gray-300 rounded-md"
                    required
                    min="1"
                  />
                </div>
                <div>
                  <label htmlFor="weight" className="block text-sm font-medium text-gray-700">
                    Weight (g)
                  </label>
                  <input
                    type="number"
                    name="weight"
                    id="weight"
                    value={packageData.weight}
                    onChange={handleInputChange}
                    className="mt-1 shadow-sm focus:ring-black focus:border-black block w-full sm:text-sm border-gray-300 rounded-md"
                    required
                    min="1"
                  />
                </div>
              </div>
            </div>
            
            <div className="sm:col-span-6">
              <h4 className="text-sm font-medium text-gray-700 mb-2">Package Items</h4>
              
              <div className="mb-4">
                <label htmlFor="itemSelect" className="block text-sm font-medium text-gray-700">
                  Add Item
                </label>
                <select
                  id="itemSelect"
                  value=""
                  onChange={handleItemSelect}
                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-black focus:border-black sm:text-sm rounded-md"
                >
                  <option value="">Select an item</option>
                  {orderItems.map((item) => {
                    const packedQty = getAlreadyPackedQuantity(item.line_item_id);
                    const remainingQty = item.quantity - packedQty;
                    return remainingQty > 0 ? (
                      <option key={item.line_item_id} value={item.line_item_id}>
                        {item.name} ({remainingQty} available)
                      </option>
                    ) : null;
                  })}
                </select>
              </div>
              
              {packageData.items.length > 0 ? (
                <ul className="border rounded-md divide-y divide-gray-200">
                  {packageData.items.map((item, index) => (
                    <li key={index} className="px-4 py-3 flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-900">{getItemName(item.lineItemId)}</p>
                      </div>
                      <div className="flex items-center">
                        <label htmlFor={`quantity-${index}`} className="sr-only">Quantity</label>
                        <div className="flex items-center border border-gray-300 rounded-md">
                          <button
                            type="button"
                            onClick={() => handleQuantityChange(index, Math.max(1, item.quantity - 1))}
                            className="px-2 py-1 text-gray-600 hover:text-gray-900"
                          >
                            <FiMinus className="h-4 w-4" />
                          </button>
                          <input
                            type="number"
                            id={`quantity-${index}`}
                            value={item.quantity}
                            onChange={(e) => handleQuantityChange(index, Math.min(item.maxQuantity, parseInt(e.target.value, 10) || 1))}
                            min="1"
                            max={item.maxQuantity}
                            className="w-12 text-center border-0 focus:ring-0"
                          />
                          <button
                            type="button"
                            onClick={() => handleQuantityChange(index, Math.min(item.maxQuantity, item.quantity + 1))}
                            className="px-2 py-1 text-gray-600 hover:text-gray-900"
                          >
                            <FiPlus className="h-4 w-4" />
                          </button>
                        </div>
                        <button
                          type="button"
                          onClick={() => removeItem(index)}
                          className="ml-2 text-red-600 hover:text-red-800"
                        >
                          <FiX className="h-5 w-5" />
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="text-center py-4 text-sm text-gray-500 border border-dashed border-gray-300 rounded-md">
                  No items added to this package yet
                </div>
              )}
            </div>
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
              disabled={packageData.items.length === 0}
              className={`px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black ${packageData.items.length === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              Create Package
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}