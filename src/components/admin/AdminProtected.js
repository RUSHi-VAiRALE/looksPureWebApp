'use client'
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { auth } from '@/lib/firebase';
import LoadingSpinner from '@/components/ui/LoadingSpinner';

export default function AdminProtected({ children }) {
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const router = useRouter();
  
  useEffect(() => {
    const checkAdminStatus = async () => {
      try {
        const unsubscribe = auth.onAuthStateChanged(async (user) => {
          if (!user) {
            router.push('/login');
            return;
          }
          
          // Get token and store it
          const token = await user.getIdToken();
          localStorage.setItem('authToken', token);
          
          // Check admin status
          const tokenResult = await user.getIdTokenResult();
          if (!tokenResult.claims.admin) {
            router.push('/unauthorized');
            return;
          }
          
          setIsAdmin(true);
          setLoading(false);
        });
        
        return () => unsubscribe();
      } catch (error) {
        console.error('Authentication error:', error);
        router.push('/login');
      }
    };
    
    checkAdminStatus();
  }, [router]);
  
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }
  
  if (!isAdmin) {
    return null; // Will redirect in useEffect
  }
  
  return children;
}