import { signOut, onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from './firebase';

/**
 * Logout the current user
 */
export const logout = async () => {
  try {
    // Clear user profile data from localStorage
    localStorage.removeItem('userProfile');

    // Sign out from Firebase
    await signOut(auth);

    return { success: true };
  } catch (error) {
    console.error('Logout error:', error);
    return { success: false, error };
  }
};

/**
 * Get current user's profile data from Firestore
 * @returns {Promise<Object|null>} User profile data or null if not found
 */
export const getUserProfile = async () => {
  try {
    const user = auth.currentUser;
    if (!user || !user.phoneNumber) {
      return null;
    }

    const userDoc = await getDoc(doc(db, 'customers', user.phoneNumber));

    if (!userDoc.exists()) {
      return null;
    }

    const userData = userDoc.data();
    return {
      customerId: userDoc.id,
      firstName: userData.firstName,
      lastName: userData.lastName,
      email: userData.email,
      mobile: userData.mobile,
      displayName: userData.displayName || `${userData.firstName} ${userData.lastName}`,
      shippingAddress: userData.shippingAddress || null,
      billingAddress: userData.billingAddress || null,
      uid: user.uid,
      phoneNumber: user.phoneNumber
    };
  } catch (error) {
    console.error('Error getting user profile:', error);
    return null;
  }
};

/**
 * Check if user is authenticated
 * @returns {Promise<boolean>} True if user is authenticated
 */
export const isAuthenticated = () => {
  return new Promise((resolve) => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      unsubscribe();
      resolve(!!user);
    });
  });
};

/**
 * Get current Firebase user
 * @returns {Promise<Object|null>} Firebase user object or null
 */
export const getCurrentUser = () => {
  return new Promise((resolve) => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      unsubscribe();
      resolve(user);
    });
  });
};

/**
 * Hook to listen to auth state changes
 * @param {Function} callback - Function to call when auth state changes
 * @returns {Function} Unsubscribe function
 */
export const onAuthChange = (callback) => {
  return onAuthStateChanged(auth, callback);
};