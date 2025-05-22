'use client'
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  FiHome, 
  FiShoppingBag, 
  FiUsers, 
  FiDollarSign, 
  FiSettings, 
  FiPackage,
  FiBarChart2,
  FiGrid
} from 'react-icons/fi';

export default function AdminSidebar() {
  const pathname = usePathname();
  
  const isActive = (path) => {
    return pathname.startsWith(path);
  };
  
  const menuItems = [
    // { path: '/admin', icon: FiHome, label: 'Dashboard' },
    { path: '/admin/products/add', icon: FiPackage, label: 'Products' },
    { path: '/admin/orders', icon: FiShoppingBag, label: 'Orders' },
    { path: '/admin/customers', icon: FiUsers, label: 'Customers' },
    { path: '/admin/payments', icon: FiDollarSign, label: 'Payments' },
    // { path: '/admin/analytics', icon: FiBarChart2, label: 'Analytics' },
    { path: '/admin/media', icon: FiGrid, label: 'Upload images' },
    // { path: '/admin/settings', icon: FiSettings, label: 'Settings' },
  ];
  
  return (
    <div className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0 mt-24">
      <div className="flex-1 flex flex-col min-h-0 bg-white border-r border-gray-200">
        <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
          <div className="flex items-center flex-shrink-0 px-4">
            <Link href="/" className="text-2xl font-serif font-bold text-black">
              LooksPure
            </Link>
          </div>
          <nav className="mt-8 flex-1 px-2 space-y-1">
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.path}
                  href={item.path}
                  className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md ${
                    isActive(item.path)
                      ? 'bg-gray-100 text-black'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                >
                  <Icon
                    className={`mr-3 flex-shrink-0 h-5 w-5 ${
                      isActive(item.path) ? 'text-black' : 'text-gray-400 group-hover:text-gray-500'
                    }`}
                  />
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>
      </div>
    </div>
  );
}