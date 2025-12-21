import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export interface ShopifyCustomer {
  id: string;
  email: string;
  firstName: string | null;
  lastName: string | null;
  displayName: string;
  phone: string | null;
}

interface AuthStore {
  customer: ShopifyCustomer | null;
  accessToken: string | null;
  expiresAt: string | null;
  isLoading: boolean;
  isAuthPanelOpen: boolean;
  authView: 'login' | 'signup' | 'forgot' | 'menu';
  
  // Actions
  setCustomer: (customer: ShopifyCustomer | null) => void;
  setAccessToken: (token: string | null, expiresAt: string | null) => void;
  setLoading: (loading: boolean) => void;
  openAuthPanel: (view?: 'login' | 'signup' | 'forgot' | 'menu') => void;
  closeAuthPanel: () => void;
  setAuthView: (view: 'login' | 'signup' | 'forgot' | 'menu') => void;
  logout: () => void;
  isLoggedIn: () => boolean;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      customer: null,
      accessToken: null,
      expiresAt: null,
      isLoading: false,
      isAuthPanelOpen: false,
      authView: 'login',

      setCustomer: (customer) => set({ customer }),
      
      setAccessToken: (accessToken, expiresAt) => set({ accessToken, expiresAt }),
      
      setLoading: (isLoading) => set({ isLoading }),
      
      openAuthPanel: (view = 'login') => {
        const { customer } = get();
        set({ 
          isAuthPanelOpen: true, 
          authView: customer ? 'menu' : view 
        });
      },
      
      closeAuthPanel: () => set({ isAuthPanelOpen: false }),
      
      setAuthView: (authView) => set({ authView }),
      
      logout: () => set({ 
        customer: null, 
        accessToken: null, 
        expiresAt: null,
        authView: 'login'
      }),
      
      isLoggedIn: () => {
        const { accessToken, expiresAt } = get();
        if (!accessToken || !expiresAt) return false;
        return new Date(expiresAt) > new Date();
      },
    }),
    {
      name: 'shopify-auth',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        customer: state.customer,
        accessToken: state.accessToken,
        expiresAt: state.expiresAt,
      }),
    }
  )
);
