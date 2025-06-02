import { FiTruck } from 'react-icons/fi';

export default function ShipmentInfo({ shipment }) {
  return (
    <div className="text-right">
      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
        <FiTruck className="mr-1" /> Shipped
      </span>
      <p className="mt-1 text-sm text-gray-500">
        Tracking: {shipment.tracking_number}
      </p>
      <p className="text-sm text-gray-500">
        Via: {shipment.courier_name}
      </p>
    </div>
  );
}