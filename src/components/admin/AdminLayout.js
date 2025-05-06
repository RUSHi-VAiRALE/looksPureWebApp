'use client'
import AdminSidebar from './AdminSidebar';
import AdminHeader from './AdminHeader';
import AdminProtected from './AdminProtected';

export default function AdminLayout({ children }) {
  return (
    <AdminProtected>
      <div className="min-h-screen bg-gray-100 mt-28">
        <AdminSidebar />
        <div className="md:pl-64 flex flex-col">
          <AdminHeader />
          <main className="flex-1">
            <div className="py-6">
              {children}
            </div>
          </main>
        </div>
      </div>
    </AdminProtected>
  );
}
