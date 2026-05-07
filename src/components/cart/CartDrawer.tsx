import { useState, useEffect, useMemo } from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button, buttonVariants } from "@/components/ui/button";
import { ShoppingCart, Minus, Plus, Trash2, Lock, Loader2, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { useCartStore } from "@/stores/cartStore";

export const CartDrawer = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [checkoutHref, setCheckoutHref] = useState<string | null>(null);
  const [prefetchError, setPrefetchError] = useState(false);
  const [retryKey, setRetryKey] = useState(0);

  const items = useCartStore((s) => s.items);
  const removeItem = useCartStore((s) => s.removeItem);
  const incrementQuantity = useCartStore((s) => s.incrementQuantity);
  const decrementQuantity = useCartStore((s) => s.decrementQuantity);
  const createCheckout = useCartStore((s) => s.createCheckout);

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items.reduce((sum, item) => sum + (parseFloat(item.price.amount) * item.quantity), 0);
  const currencyCode = items[0]?.price.currencyCode || 'USD';

  const cartKey = useMemo(
    () => items.map(i => `${i.variantId}:${i.quantity}`).join(','),
    [items]
  );

  // Pre-fetch the Shopify checkout URL when the drawer opens or cart changes.
  // On success, the Checkout button renders as a plain <a href> — native
  // browser link-following works on all browsers without any navigation API.
  useEffect(() => {
    if (!isOpen || items.length === 0) {
      setCheckoutHref(null);
      setPrefetchError(false);
      return;
    }
    setCheckoutHref(null);
    setPrefetchError(false);
    let cancelled = false;

    createCheckout()
      .then(url => {
        if (cancelled) return;
        if (url) {
          setCheckoutHref(url);
        } else {
          console.error('[CartDrawer] createCheckout returned null');
          setPrefetchError(true);
        }
      })
      .catch(err => {
        if (cancelled) return;
        console.error('[CartDrawer] checkout pre-fetch failed:', err);
        setPrefetchError(true);
      });

    return () => { cancelled = true; };
  }, [isOpen, cartKey, retryKey]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleRetry = () => {
    setPrefetchError(false);
    setRetryKey(k => k + 1);
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <button className="p-2 text-foreground/80 hover:text-foreground transition-colors duration-300 relative">
          <ShoppingCart size={20} strokeWidth={1.5} />
          {totalItems > 0 && (
            <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-olive text-olive-foreground text-[10px] flex items-center justify-center">
              {totalItems}
            </span>
          )}
        </button>
      </SheetTrigger>

      <SheetContent className="w-full sm:max-w-lg flex flex-col h-full overflow-hidden">
        <SheetHeader className="flex-shrink-0">
          <SheetTitle>Shopping Cart</SheetTitle>
          <SheetDescription>
            {totalItems === 0 ? "Your cart is empty" : `${totalItems} item${totalItems !== 1 ? 's' : ''} in your cart`}
          </SheetDescription>
        </SheetHeader>

        <div className="flex flex-col flex-1 pt-6 min-h-0">
          {items.length === 0 ? (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center">
                <ShoppingCart className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">Your cart is empty</p>
              </div>
            </div>
          ) : (
            <>
              <div className="flex-1 overflow-y-auto pr-2 min-h-0">
                <div className="space-y-4">
                  {items.map((item) => (
                    <div key={item.variantId} className="flex gap-4 p-2 border-b border-border">
                      <div className="w-16 h-16 bg-secondary/20 rounded-md overflow-hidden flex-shrink-0">
                        {item.product.node.images?.edges?.[0]?.node && (
                          <img
                            src={item.product.node.images.edges[0].node.url}
                            alt={item.product.node.title}
                            className="w-full h-full object-cover"
                          />
                        )}
                      </div>

                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium truncate">{item.product.node.title}</h4>
                        {item.variantTitle !== "Default Title" && (
                          <p className="text-sm text-muted-foreground">
                            {item.selectedOptions.map(option => option.value).join(' • ')}
                          </p>
                        )}
                        <p className="font-semibold">
                          {item.price.currencyCode} {parseFloat(item.price.amount).toFixed(2)}
                        </p>
                      </div>

                      <div className="flex flex-col items-end gap-2 flex-shrink-0">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-6 w-6"
                          onClick={() => removeItem(item.variantId)}
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>

                        <div className="flex items-center gap-1">
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-6 w-6"
                            onClick={() => decrementQuantity(item.variantId)}
                          >
                            <Minus className="h-3 w-3" />
                          </Button>
                          <span className="w-8 text-center text-sm">{item.quantity}</span>
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-6 w-6"
                            onClick={() => incrementQuantity(item.variantId)}
                          >
                            <Plus className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex-shrink-0 space-y-4 pt-4 border-t bg-background">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-semibold">Total</span>
                  <span className="text-xl font-bold">
                    {currencyCode} {totalPrice.toFixed(2)}
                  </span>
                </div>

                {checkoutHref ? (
                  // Plain <a> tag — no Radix Slot, no Button wrapper.
                  // Native browser link-following is guaranteed same-tab on
                  // all browsers including iOS Safari, regardless of any
                  // scroll-lock or dialog context.
                  <a
                    href={checkoutHref}
                    target="_self"
                    className={cn(buttonVariants({ size: "lg" }), "w-full")}
                  >
                    <Lock className="w-4 h-4 mr-2" />
                    Checkout
                  </a>
                ) : prefetchError ? (
                  <Button
                    className="w-full"
                    size="lg"
                    variant="outline"
                    onClick={handleRetry}
                  >
                    <AlertCircle className="w-4 h-4 mr-2" />
                    Retry Checkout
                  </Button>
                ) : (
                  <Button className="w-full" size="lg" disabled>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Preparing Checkout...
                  </Button>
                )}
              </div>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default CartDrawer;
