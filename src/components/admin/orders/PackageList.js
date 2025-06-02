import { FiPackage, FiTruck } from 'react-icons/fi';
import ShipmentInfo from './ShipmentInfo';

export default function PackageList({ packages, order, onCreateShipment }) {
  // Support both array and single package object
  let packageList = [];
  if (Array.isArray(packages)) {
    packageList = packages;
  } else if (packages && typeof packages === 'object' && packages.package_id) {
    packageList = [packages];
  }

  if (!packageList || packageList.length === 0) {
    return (
      <div className="bg-white shadow overflow-hidden sm:rounded-lg p-6 text-center">
        <FiPackage className="mx-auto h-12 w-12 text-gray-400" />
        <h3 className="mt-2 text-sm font-medium text-gray-900">No packages yet</h3>
        <p className="mt-1 text-sm text-gray-500">
          Create a package to start the shipping process.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-lg">
      <ul className="divide-y divide-gray-200">
        {packageList.map((pkg) => (
          <li key={pkg.package_id} className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-lg font-medium">{pkg.package_name || `Package #${pkg.package_number}`}</h4>
                <p className="text-sm text-gray-500">Package #{pkg.package_number}</p>
                <div className="mt-2 text-sm text-gray-500">
                  {/* If dimensions exist, show them */}
                  {pkg.length && pkg.width && pkg.height && (
                    <p>Dimensions: {pkg.length}x{pkg.width}x{pkg.height} cm</p>
                  )}
                  {/* If weight exists, show it */}
                  {pkg.weight && <p>Weight: {pkg.weight / 1000} kg</p>}
                  {/* Show status */}
                  <p>Status: {pkg.status || 'N/A'}</p>
                </div>
              </div>
              <div>
                {pkg.status === 'shipped' || pkg.shipment_id ? (
                  <ShipmentInfo shipment={pkg} />
                ) : (
                  <button
                    onClick={() => onCreateShipment(pkg)}
                    className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    <FiTruck className="mr-1" />
                    Create Shipment
                  </button>
                )}
              </div>
            </div>
            {/* Show package line items if available */}
            {pkg.line_items && pkg.line_items.length > 0 && (
              <div className="mt-4">
                <h5 className="text-sm font-medium text-gray-700 mb-2">Package Items:</h5>
                <ul className="border rounded-md divide-y divide-gray-200">
                  {pkg.line_items.map((item, idx) => (
                    <li key={item.line_item_id || idx} className="px-4 py-2 flex justify-between text-sm">
                      <span>{item.name || item.item_name}</span>
                      <span>Qty: {item.quantity}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}