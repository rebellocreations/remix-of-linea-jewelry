import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { ShopifyProduct, createStorefrontCheckout } from '@/lib/shopify';

export interface CartItem {
  product: ShopifyProduct;
  variantId: string;
  variantTitle: string;
  price: {
    amount: string;
    currencyCode: string;
  };
  quantity: number;
  selectedOptions: Array<{
    name: string;
    value: string;
  }>;
}

interface CartStore {
  items: CartItem[];
  cartId: string | null;
  checkoutUrl: string | null;
  isLoading: boolean;
  _hasHydrated: boolean;

  addItem: (item: CartItem) => void;
  updateQuantity: (variantId: string, quantity: number) => void;
  incrementQuantity: (variantId: string) => void;
  decrementQuantity: (variantId: string) => void;
  removeItem: (variantId: string) => void;
  clearCart: () => void;
  setCartId: (cartId: string) => void;
  setCheckoutUrl: (url: string) => void;
  setLoading: (loading: boolean) => void;
  setHasHydrated: (state: boolean) => void;
  createCheckout: () => Promise<string | null>;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      cartId: null,
      checkoutUrl: null,
      isLoading: false,
      _hasHydrated: false,

      setHasHydrated: (state) => set({ _hasHydrated: state }),

      addItem: (item) => {
        const { items } = get();
        const existingItem = items.find(i => i.variantId === item.variantId);
        const qty = Math.max(1, Math.round(Number(item.quantity)));

        if (existingItem) {
          set({
            items: items.map(i =>
              i.variantId === item.variantId
                ? { ...i, quantity: i.quantity + qty }
                : i
            )
          });
        } else {
          set({ items: [...items, { ...item, quantity: qty }] });
        }
      },

      updateQuantity: (variantId, quantity) => {
        if (quantity <= 0) {
          get().removeItem(variantId);
          return;
        }
        set({
          items: get().items.map(item =>
            item.variantId === variantId ? { ...item, quantity } : item
          )
        });
      },

      // Read live state to avoid stale closure bugs on rapid clicks
      incrementQuantity: (variantId) => {
        const items = get().items;
        const item = items.find(i => i.variantId === variantId);
        if (!item) return;
        set({
          items: items.map(i =>
            i.variantId === variantId ? { ...i, quantity: i.quantity + 1 } : i
          )
        });
      },

      decrementQuantity: (variantId) => {
        const items = get().items;
        const item = items.find(i => i.variantId === variantId);
        if (!item) return;
        if (item.quantity <= 1) {
          get().removeItem(variantId);
          return;
        }
        set({
          items: items.map(i =>
            i.variantId === variantId ? { ...i, quantity: i.quantity - 1 } : i
          )
        });
      },

      removeItem: (variantId) => {
        set({
          items: get().items.filter(item => item.variantId !== variantId)
        });
      },

      clearCart: () => {
        set({ items: [], cartId: null, checkoutUrl: null });
      },

      setCartId: (cartId) => set({ cartId }),
      setCheckoutUrl: (checkoutUrl) => set({ checkoutUrl }),
      setLoading: (isLoading) => set({ isLoading }),

      createCheckout: async () => {
        // Always read fresh state — never use a stale closure snapshot
        const items = get().items;
        if (items.length === 0) return null;

        get().setLoading(true);
        try {
          const checkoutUrl = await createStorefrontCheckout(
            items.map(item => ({
              variantId: item.variantId,
              quantity: Math.max(1, Math.round(Number(item.quantity))),
            }))
          );
          get().setCheckoutUrl(checkoutUrl);
          return checkoutUrl;
        } finally {
          get().setLoading(false);
        }
      }
    }),
    {
      name: 'shopify-cart',
      storage: createJSONStorage(() => localStorage),
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
    }
  )
);
