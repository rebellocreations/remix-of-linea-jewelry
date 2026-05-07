import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCartStore } from "@/stores/cartStore";
import { Loader2 } from "lucide-react";

/**
 * Checkout page – redirects users to Shopify's hosted checkout.
 *
 * When the user lands on /checkout we:
 *   1. Read the cart items from the zustand store.
 *   2. Call createCheckout() which creates a Shopify Storefront cart and
 *      returns the checkout URL.
 *   3. Redirect the browser to that URL.
 *
 * If there are no items we send the user back to the shop page.
 */
const Checkout = () => {
  const navigate = useNavigate();
  const items = useCartStore((s) => s.items);
  const hasHydrated = useCartStore((s) => s._hasHydrated);
  const createCheckout = useCartStore((s) => s.createCheckout);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Wait for the Zustand persist store to rehydrate from localStorage before
    // acting on cart state — hydration is async so the initial render has items=[].
    if (!hasHydrated) return;

    if (items.length === 0) {
      navigate("/collections", { replace: true });
      return;
    }

    let cancelled = false;

    const redirect = async () => {
      try {
        const checkoutUrl = await createCheckout();
        if (cancelled) return;

        if (checkoutUrl) {
          window.location.href = checkoutUrl;
        } else {
          setError("Could not create checkout. Please try again.");
        }
      } catch (err) {
        if (cancelled) return;
        console.error("Checkout redirect failed:", err);
        setError("Something went wrong. Please try again.");
      }
    };

    redirect();

    return () => {
      cancelled = true;
    };
  }, [hasHydrated]); // re-run once hydration completes

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center space-y-4">
        {error ? (
          <>
            <p className="text-foreground text-lg font-light">{error}</p>
            <button
              onClick={() => navigate("/collections")}
              className="text-sm underline text-muted-foreground hover:text-foreground transition-colors"
            >
              Return to shop
            </button>
          </>
        ) : (
          <>
            <Loader2 className="h-8 w-8 animate-spin text-foreground mx-auto" />
            <p className="text-foreground text-lg font-light">
              Redirecting to checkout…
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default Checkout;