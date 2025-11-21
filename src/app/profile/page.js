'use client'
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { getUserProfile } from '@/lib/auth';
import ProfileSidebar from '@/components/profile/ProfileSidebar';
import ProfileInfo from '@/components/profile/ProfileInfo';
import AddressBook from '@/components/profile/AddressBook';
import OrderHistory from '@/components/profile/OrderHistory';
import LoadingSpinner from '@/components/ui/LoadingSpinner';

export default function ProfilePage() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('addresses');
  const [userProfileData, setUserProfileData] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      console.log('currentUser', currentUser);
      if (currentUser) {
        setUser(currentUser);

        // Fetch user profile from Firestore using the auth utility
        try {
          const profile = await getUserProfile();
          if (profile) {
            setUserProfileData(profile);
            // Also store in localStorage for backward compatibility
            localStorage.setItem('userProfile', JSON.stringify(profile));
          } else {
            console.warn('User is authenticated but profile data not found in Firestore');
            // Try to get from localStorage as fallback
            const storedProfile = localStorage.getItem('userProfile');
            if (storedProfile) {
              const parsedProfile = JSON.parse(storedProfile);
              setUserProfileData(parsedProfile);
            } else {
              // No profile data found anywhere, redirect to complete profile
              router.push('/login');
            }
          }
        } catch (error) {
          console.error('Error fetching user profile:', error);
          router.push('/login');
        }
      } else {
        // User not authenticated, redirect to login
        router.push('/login');
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [router]);

  if (loading) {
    return <LoadingSpinner />;
  }

  // If not loading but no user or profile data, show a message
  if (!user || !userProfileData) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-32 sm:px-6 lg:px-8 text-center">
        <p>Unable to load profile information. Please try logging in again.</p>
        <button
          onClick={() => router.push('/login')}
          className="mt-4 px-4 py-2 bg-black text-white rounded-md"
        >
          Go to Login
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-32 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold mb-8">My Account</h1>

      <div className="flex flex-col md:flex-row gap-8">
        <div className="w-full md:w-1/4">
          <ProfileSidebar activeTab={activeTab} setActiveTab={setActiveTab} />
        </div>

        <div className="w-full md:w-3/4">
          {activeTab === 'profile' && <ProfileInfo user={userProfileData} />}
          {activeTab === 'orders' && <OrderHistory user={userProfileData} />}
        </div>
      </div>
    </div>
  );
}