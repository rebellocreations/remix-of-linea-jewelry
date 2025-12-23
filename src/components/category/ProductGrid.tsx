import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import Pagination from "./Pagination";
import { fetchProducts, ShopifyProduct } from "@/lib/shopify";
import { Skeleton } from "@/components/ui/skeleton";

const ProductGrid = () => {
  const [products, setProducts] = useState<ShopifyProduct[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await fetchProducts(24);
        setProducts(data);
      } catch (e) {
        console.error("Failed to load Shopify products:", e);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  if (loading) {
    return (
      <section className="w-full px-6 mb-16" aria-label="Product grid loading">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {[...Array(12)].map((_, i) => (
            <div key={i} className="space-y-3">
              <Skeleton className="aspect-square w-full" />
              <Skeleton className="h-4 w-2/3" />
              <Skeleton className="h-4 w-1/3" />
            </div>
          ))}
        </div>
      </section>
    );
  }

  if (products.length === 0) {
    return (
      <section className="w-full px-6 mb-16" aria-label="No products found">
        <div className="py-12 text-center">
          <h2 className="font-serif text-2xl text-foreground">No products found</h2>
          <p className="mt-3 text-sm text-muted-foreground">
            In Shopify Admin, make sure your products are <span className="font-medium">Active</span> and available to the
            <span className="font-medium"> Online Store</span> sales channel.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="w-full px-6 mb-16" aria-label="Shopify products">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
        {products.map((product) => {
          const image = product.node.images.edges?.[0]?.node;
          const price = product.node.priceRange.minVariantPrice;

          return (
            <Link key={product.node.id} to={`/product/${product.node.handle}`} className="group">
              <Card className="border-none shadow-none bg-transparent group cursor-pointer">
                <CardContent className="p-0">
                  <div className="aspect-square mb-3 overflow-hidden bg-muted/10 relative">
                    {image ? (
                      <img
                        src={image.url}
                        alt={image.altText || `${product.node.title} lamp`}
                        loading="lazy"
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                      />
                    ) : (
                      <div className="w-full h-full grid place-items-center text-sm text-muted-foreground">No image</div>
                    )}
                    <div className="absolute inset-0 bg-black/[0.03]" />
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-light text-foreground">Lamp</p>
                    <div className="flex justify-between items-center gap-3">
                      <h3 className="text-sm font-medium text-foreground truncate">{product.node.title}</h3>
                      <p className="text-sm font-light text-foreground tabular-nums">
                        {price.currencyCode} {parseFloat(price.amount).toFixed(2)}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          );
        })}
      </div>

      {/* Keep existing pagination UI for now (can wire it to Shopify paging later if you want). */}
      <Pagination />
    </section>
  );
};

export default ProductGrid;
