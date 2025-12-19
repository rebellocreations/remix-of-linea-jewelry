import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { ShoppingCart, Loader2 } from "lucide-react";
import { fetchProducts, ShopifyProduct } from "@/lib/shopify";
import { useCartStore } from "@/stores/cartStore";
import { toast } from "sonner";

const ShopifyProductGrid = () => {
  const [products, setProducts] = useState<ShopifyProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [addingToCart, setAddingToCart] = useState<string | null>(null);
  const addItem = useCartStore((state) => state.addItem);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await fetchProducts(20);
        setProducts(data);
      } catch (error) {
        console.error("Failed to load products:", error);
      } finally {
        setLoading(false);
      }
    };
    loadProducts();
  }, []);

  const handleAddToCart = async (product: ShopifyProduct, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    const variant = product.node.variants.edges[0]?.node;
    if (!variant) return;

    setAddingToCart(product.node.id);
    
    addItem({
      product,
      variantId: variant.id,
      variantTitle: variant.title,
      price: variant.price,
      quantity: 1,
      selectedOptions: variant.selectedOptions,
    });

    toast.success("Added to cart", {
      description: product.node.title,
      position: "top-center",
    });

    setTimeout(() => setAddingToCart(null), 500);
  };

  if (loading) {
    return (
      <section className="w-full px-6 py-12">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="space-y-3">
              <Skeleton className="aspect-square w-full" />
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
            </div>
          ))}
        </div>
      </section>
    );
  }

  if (products.length === 0) {
    return (
      <section className="w-full px-6 py-24">
        <div className="text-center">
          <h2 className="text-2xl font-light text-foreground mb-4">No products found</h2>
          <p className="text-muted-foreground mb-6">
            Your store doesn't have any products yet.
          </p>
          <p className="text-sm text-muted-foreground">
            Tell me what lamp products you'd like to add to your store!
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="w-full px-6 py-12">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
        {products.map((product) => {
          const image = product.node.images.edges[0]?.node;
          const price = product.node.priceRange.minVariantPrice;
          const isAddingThis = addingToCart === product.node.id;

          return (
            <Link
              key={product.node.id}
              to={`/product/${product.node.handle}`}
              className="group"
            >
              <Card className="overflow-hidden border-0 bg-transparent shadow-none">
                <div className="aspect-square relative overflow-hidden bg-secondary/10 rounded-lg">
                  {image ? (
                    <img
                      src={image.url}
                      alt={image.altText || product.node.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                      No image
                    </div>
                  )}
                  <Button
                    variant="secondary"
                    size="icon"
                    className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    onClick={(e) => handleAddToCart(product, e)}
                    disabled={isAddingThis}
                  >
                    {isAddingThis ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <ShoppingCart className="h-4 w-4" />
                    )}
                  </Button>
                </div>
                <div className="pt-4 space-y-1">
                  <h3 className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">
                    {product.node.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {price.currencyCode} {parseFloat(price.amount).toFixed(2)}
                  </p>
                </div>
              </Card>
            </Link>
          );
        })}
      </div>
    </section>
  );
};

export default ShopifyProductGrid;
