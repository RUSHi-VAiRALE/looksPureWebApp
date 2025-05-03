import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { signOut } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { FiHome, FiBox, FiUsers, FiShoppingBag, FiSettings, FiLogOut, FiMenu, FiX } from 'react-icons/fi';

export default function AdminLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const router = useRouter();
  function NavLink({ href, icon, title, mobile = false }) {
    const router = useRouter();
    const isActive = router.pathname === href;
    
    const baseClasses = "group flex items-center px-2 py-2 text-sm font-medium rounded-md";
    const activeClasses = "bg-gray-100 text-gray-900";
    const inactiveClasses = "text-gray-600 hover:bg-gray-50 hover:text-gray-900";
    
    return (
      <Link
        href={href}
        className={`${baseClasses} ${isActive ? activeClasses : inactiveClasses} ${mobile ? 'text-base' : ''}`}
      >
        <span className={`mr-3 h-5 w-5 ${isActive ? 'text-gray-500' : 'text-gray-400 group-hover:text-gray-500'}`}>
          {icon}
        </span>
        {title}
      </Link>
    );
  }
  const handleLogout = async () => {
    try {
      await signOut(auth);
      localStorage.removeItem('userProfile');
      router.push('/login');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 mt-26">
      <div className="flex">
        {/* Sidebar for mobile */}
        <div className={`fixed inset-0 z-40 lg:hidden ${sidebarOpen ? 'block' : 'hidden'}`} aria-hidden="true">
          <div className="fixed inset-0 bg-gray-600 bg-opacity-75" onClick={() => setSidebarOpen(false)}></div>
          <div className="relative flex-1 flex flex-col max-w-xs w-full bg-white">
            <div className="absolute top-0 right-0 -mr-12 pt-2">
              <button
                type="button"
                className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                onClick={() => setSidebarOpen(false)}
              >
                <span className="sr-only">Close sidebar</span>
                <FiX className="h-6 w-6 text-white" />
              </button>
            </div>
            
            <div className="flex-1 h-0 pt-5 pb-4 overflow-y-auto">
              <div className="flex-shrink-0 flex items-center px-4">
                <h1 className="text-xl font-bold text-gray-900">LooksPure Admin</h1>
              </div>
              <nav className="mt-5 px-2 space-y-1">
                <NavLink href="/admin" icon={<FiHome />} title="Dashboard" mobile />
                {/* <NavLink href="/admin/products" icon={<FiBox />} title="Products" mobile /> */}
                {/* <NavLink href="/admin/orders" icon={<FiShoppingBag />} title="Orders" mobile />
                <NavLink href="/admin/customers" icon={<FiUsers />} title="Customers" mobile />
                <NavLink href="/admin/settings" icon={<FiSettings />} title="Settings" mobile /> */}
              </nav>
            </div>
            
            <div className="flex-shrink-0 flex border-t border-gray-200 p-4">
              <button
                onClick={handleLogout}
                className="flex items-center text-gray-600 hover:text-gray-900"
              >
                <FiLogOut className="mr-3 h-5 w-5 text-gray-500" />
                <span className="text-sm font-medium">Logout</span>
              </button>
            </div>
          </div>
        </div>

        {/* Static sidebar for desktop */}
        <div className="hidden lg:flex lg:flex-shrink-0">
          <div className="flex flex-col w-64">
            <div className="flex-1 flex flex-col min-h-0 border-r border-gray-200 bg-white">
              <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
                <div className="flex items-center flex-shrink-0 px-4">
                  <h1 className="text-xl font-bold text-gray-900">LooksPure Admin</h1>
                </div>
                <nav className="mt-5 flex-1 px-2 bg-white space-y-1">
                  <NavLink href="/admin" icon={<FiHome />} title="Dashboard" />
                  {/* <NavLink href="/admin/products" icon={<FiBox />} title="Products" />
                  <NavLink href="/admin/orders" icon={<FiShoppingBag />} title="Orders" />
                  <NavLink href="/admin/customers" icon={<FiUsers />} title="Customers" />
                  <NavLink href="/admin/settings" icon={<FiSettings />} title="Settings" /> */}
                </nav>
              </div>
              <div className="flex-shrink-0 flex border-t border-gray-200 p-4">
                <button
                  onClick={handleLogout}
                  className="flex items-center text-gray-600 hover:text-gray-900"
                >
                  <FiLogOut className="mr-3 h-5 w-5 text-gray-500" />
                  <span className="text-sm font-medium">Logout</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col w-0 flex-1 overflow-hidden">
          <div className="relative z-10 flex-shrink-0 flex h-16 bg-white shadow">
            <button
              type="button"
              className="px-4 border-r border-gray-200 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-black lg:hidden"
              onClick={() => setSidebarOpen(true)}
            >
              <span className="sr-only">Open sidebar</span>
              <FiMenu className="h-6 w-6" />
            </button>
            <div className="flex-1 px-4 flex justify-between">
              <div className="flex-1 flex">
                <div className="w-full flex md:ml-0">
                  <div className="relative w-full flex items-center">
                    <div className="text-lg font-semibold text-gray-900">
                      Admin Dashboard
                    </div>
                  </div>
                </div>
              </div>
              <div className="ml-4 flex items-center md:ml-6">
                <Link 
                  href="/"
                  className="px-3 py-1 text-sm text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-md"
                >
                  View Store
                </Link>
              </div>
            </div>
          </div>

          <main className="flex-1 relative overflow-y-auto focus:outline-none">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}

// Helper component for navigation links
