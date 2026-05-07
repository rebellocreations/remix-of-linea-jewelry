import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCartStore } from "@/stores/cartStore";
import { Loader2 } from "lucide-react";

const Checkout = () => {
  const navigate = useNavigate();
  const items = useCartStore((s) => s.items);
  const hasHydrated = useCartStore((s) => s._hasHydrated);
  const createCheckout = useCartStore((s) => s.createCheckout);
  const [error, setError] = useState<string | null>(null);
  const [checkoutUrl, setCheckoutUrl] = useState<string | null>(null);

  useEffect(() => {
    if (!hasHydrated) return;

    if (items.length === 0) {
      navigate("/collections", { replace: true });
      return;
    }

    let cancelled = false;

    const redirect = async () => {
      try {
        const url = await createCheckout();
        if (cancelled) return;

        if (url) {
          setCheckoutUrl(url);
          // replace() avoids adding an entry to history and is not flagged
          // as a cross-origin popup by Chrome's tab-under protection.
          window.location.replace(url);
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
  }, [hasHydrated]);

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
        ) : checkoutUrl ? (
          <>
            <Loader2 className="h-8 w-8 animate-spin text-foreground mx-auto" />
            <p className="text-foreground text-lg font-light">
              Redirecting to checkout…
            </p>
            <a
              href={checkoutUrl}
              className="text-sm underline text-muted-foreground hover:text-foreground transition-colors block"
            >
              Click here if you are not redirected
            </a>
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
