import { signOut } from 'firebase/auth';
import { auth } from './firebase';

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