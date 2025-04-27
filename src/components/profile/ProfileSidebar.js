import { signOut } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { useRouter } from 'next/navigation';
import { FiUser, FiMapPin, FiShoppingBag, FiLogOut } from 'react-icons/fi';

export default function ProfileSidebar({ activeTab, setActiveTab }) {
  const router = useRouter();
  
  const handleLogout = async () => {
    try {
      localStorage.removeItem('userProfile');
      await signOut(auth);
      router.push('/');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };
  
  const menuItems = [
    { id: 'profile', label: 'Profile Information', icon: <FiUser /> },
    { id: 'addresses', label: 'Address Book', icon: <FiMapPin /> },
    { id: 'orders', label: 'Order History', icon: <FiShoppingBag /> },
  ];
  
  return (
    <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
      <ul className="divide-y divide-gray-200">
        {menuItems.map((item) => (
          <li key={item.id}>
            <button
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center px-4 py-3 text-left ${
                activeTab === item.id
                  ? 'bg-gray-100 text-black font-medium'
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              <span className="mr-3">{item.icon}</span>
              {item.label}
            </button>
          </li>
        ))}
        <li>
          <button
            onClick={handleLogout}
            className="w-full flex items-center px-4 py-3 text-left text-gray-700 hover:bg-gray-50"
          >
            <span className="mr-3"><FiLogOut /></span>
            Logout
          </button>
        </li>
      </ul>
    </div>
  );
}