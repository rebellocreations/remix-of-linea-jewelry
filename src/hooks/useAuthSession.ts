import { useEffect } from 'react';
import { useAuthStore } from '@/stores/authStore';
import { getCustomer, customerLogout } from '@/lib/shopify';

/**
 * Hook to validate and restore Shopify customer session on app load.
 * Checks if stored token is still valid and refreshes customer data.
 */
export const useAuthSession = () => {
  const { 
    accessToken, 
    expiresAt, 
    setCustomer, 
    logout,
    customer 
  } = useAuthStore();

  useEffect(() => {
    const validateSession = async () => {
      // No token stored
      if (!accessToken) {
        return;
      }

      // Check if token is expired
      if (expiresAt && new Date(expiresAt) <= new Date()) {
        console.log('Session expired, logging out');
        logout();
        return;
      }

      // Token exists and not expired - validate with Shopify
      try {
        const customerData = await getCustomer(accessToken);
        
        if (customerData) {
          // Token is valid, update customer data in case it changed
          setCustomer(customerData);
        } else {
          // Token is invalid or customer not found
          console.log('Invalid session, logging out');
          logout();
        }
      } catch (error) {
        console.error('Error validating session:', error);
        // On error, keep the session but don't update customer
        // This handles network issues gracefully
      }
    };

    validateSession();
  }, [accessToken, expiresAt, setCustomer, logout]);

  return { 
    isAuthenticated: !!customer,
    customer 
  };
};

export default useAuthSession;

