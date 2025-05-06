import { auth } from '@/lib/firebase';

/**
 * Checks if the current user has admin privileges
 * @returns {Promise<boolean>} True if user is admin, false otherwise
 */
export const checkAdminStatus = async () => {
  try {
    const user = auth.currentUser;
    if (!user) return false;
    
    // Get token result which contains the claims
    const tokenResult = await user.getIdTokenResult(true);
    
    // Check if admin claim exists and is true
    return !!tokenResult.claims.admin;
  } catch (error) {
    console.error('Error checking admin status:', error);
    return false;
  }
};

/**
 * Higher-order component to protect admin routes
 * @param {Function} Component - The component to render if user is admin
 * @returns {Function} A wrapped component that checks admin status
 */
export function withAdminAuth(Component) {
  return function AdminProtectedRoute(props) {
    const [loading, setLoading] = useState(true);
    const [isAdmin, setIsAdmin] = useState(false);
    const router = useRouter();
    
    useEffect(() => {
      const checkAuth = async () => {
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
      
      checkAuth();
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
    
    return <Component {...props} />;
  };
}