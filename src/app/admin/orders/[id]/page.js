'use client'
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { auth } from '@/lib/firebase';
import AdminLayout from '@/components/admin/AdminLayout';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import { ordersAPI } from '@/services/api/orders';
import { FiPlus } from 'react-icons/fi';
import PackageForm from '@/components/admin/orders/PackageForm';
import ShipmentForm from '@/components/admin/orders/ShipmentForm';
import PackageList from '@/components/admin/orders/PackageList';

export default function OrderDetailPage({ params }) {
  const orderId = params.id;
  const router = useRouter();
  const [order, setOrder] = useState(null);
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showPackageForm, setShowPackageForm] = useState(false);
  const [showShipmentForm, setShowShipmentForm] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [refreshData, setRefreshData] = useState(0);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const unsubscribe = auth.onAuthStateChanged(async (user) => {
          if (user) {
            const token = await user.getIdTokenResult();
            if (token.claims.admin) {
              loadOrderData();
            } else {
              router.push('/');
            }
          } else {
            router.push('/login');
          }
        });
        return () => unsubscribe();
      } catch (error) {
        setError('Authentication failed. Please log in again.');
        setLoading(false);
      }
    };
    checkAuth();
  }, [router, orderId, refreshData]);

  const loadOrderData = async () => {
    try {
      setLoading(true);
      const orderData = await ordersAPI.getOrderDetails(orderId);
      setOrder(orderData.salesorder || orderData); // support both formats

      // Only fetch packages if they exist
      if (orderData.salesorder?.packages && orderData.salesorder.packages.length > 0) {
        const packagesData = await ordersAPI.getOrderPackages(orderData.salesorder.packages[0].package_id);
        setPackages(packagesData || []);
      } else {
        setPackages([]);
      }
      setError(null);
    } catch (error) {
      setError('Failed to load order data. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleCreatePackage = async (packageData) => {
    try {
      await ordersAPI.createPackage({
        ...packageData,
        salesOrderId: orderId
      });
      setShowPackageForm(false);
      setRefreshData(prev => prev + 1);
    } catch (error) {
      setError('Failed to create package. Please try again.');
    }
  };

  const handleCreateShipment = async (shipmentData) => {
    try {
      await ordersAPI.createShipment(shipmentData);
      setShowShipmentForm(false);
      setSelectedPackage(null);
      setRefreshData(prev => prev + 1);
    } catch (error) {
      setError('Failed to create shipment. Please try again.');
    }
  };

  const openShipmentForm = (pkg) => {
    setSelectedPackage(pkg);
    setShowShipmentForm(true);
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex justify-center items-center h-64">
          <LoadingSpinner />
        </div>
      </AdminLayout>
    );
  }
  console.log("package : " , packages)
  if (error) {
    return (
      <AdminLayout>
        <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-red-700">{error}</p>
            </div>
          </div>
        </div>
      </AdminLayout>
    );
  }

  if (!order) {
    return (
      <AdminLayout>
        <div className="text-center py-12">
          <p>Order not found</p>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="sm:flex sm:items-center sm:justify-between">
          <div>
            <h1 className="text-xl font-semibold text-gray-900">Order #{order.order_number}</h1>
            <p className="mt-2 text-sm text-gray-700">
              {new Date(order.created_at).toLocaleDateString()} | Status: <span className="font-medium">{order.status}</span>
            </p>
          </div>
          <div className="mt-4 sm:mt-0">
            <button
              onClick={() => router.back()}
              className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
            >
              Back to Orders
            </button>
          </div>
        </div>

        {/* Order Details */}
        <div className="mt-8 bg-white shadow overflow-hidden sm:rounded-lg">
          <div className="px-4 py-5 sm:px-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900">Order Details</h3>
          </div>
          <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
            <dl className="sm:divide-y sm:divide-gray-200">
              <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Customer</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {order.customer_name}
                </dd>
              </div>
              <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Email</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {order.email}
                </dd>
              </div>
              {/* <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Total Amount</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  ₹{order.total_amount.toFixed(2)}
                </dd>
              </div> */}
              {/* <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Payment Method</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {order.payment_method}
                </dd>
              </div> */}
            </dl>
          </div>
        </div>

        {/* Order Items */}
        <div className="mt-8">
          <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">Order Items</h3>
          <div className="bg-white shadow overflow-hidden sm:rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Product
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    SKU
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Quantity
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Price
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Total
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {order.line_items.map((item) => (
                  <tr key={item.line_item_id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {item.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {item.sku}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {item.quantity}
                    </td>
                    {/* <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      ₹{item.price.toFixed(2)}
                    </td> */}
                    {/* <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      ₹{(item.price * item.quantity).toFixed(2)}
                    </td> */}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Packages & Shipments */}
        <div className="mt-8">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg leading-6 font-medium text-gray-900">Packages & Shipments</h3>
            <button
              onClick={() => setShowPackageForm(true)}
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
            >
              <FiPlus className="mr-2 -ml-1 h-4 w-4" />
              Create Package
            </button>
          </div>
          <PackageList
            packages={packages.package}
            order={order}
            onCreateShipment={openShipmentForm}
          />
        </div>
      </div>

      {/* Package Creation Modal */}
      {showPackageForm && (
        <PackageForm
          orderItems={order.line_items || order.salesorder?.line_items || []}
          onSubmit={handleCreatePackage}
          onCancel={() => setShowPackageForm(false)}
        />
      )}

      {/* Shipment Creation Modal */}
      {showShipmentForm && selectedPackage && (
        <ShipmentForm
          packageData={selectedPackage}
          orderData={order}
          onSubmit={handleCreateShipment}
          onCancel={() => {
            setShowShipmentForm(false);
            setSelectedPackage(null);
          }}
        />
      )}
    </AdminLayout>
  );
}