import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { fetchProductByHandle } from "@/lib/shopify";
import { useCartStore } from "@/stores/cartStore";
import { toast } from "sonner";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

const ProductDetail = () => {
  // NOTE: Route is /product/:productId, but we use it as the Shopify handle.
  const { productId } = useParams();
  const handle = productId || "";

  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState<any>(null);
  const [activeImage, setActiveImage] = useState(0);
  const addItem = useCartStore((s) => s.addItem);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const p = await fetchProductByHandle(handle);
        setProduct(p);
        setActiveImage(0);
      } catch (e) {
        console.error("Failed to load Shopify product:", e);
        setProduct(null);
      } finally {
        setLoading(false);
      }
    };

    if (handle) load();
  }, [handle]);

  const images = useMemo(() => product?.images?.edges?.map((e: any) => e.node) ?? [], [product]);
  const variant = product?.variants?.edges?.[0]?.node;
  const price = product?.priceRange?.minVariantPrice;

  const onAddToCart = () => {
    if (!product || !variant) return;

    addItem({
      product: { node: product },
      variantId: variant.id,
      variantTitle: variant.title,
      price: variant.price,
      quantity: 1,
      selectedOptions: variant.selectedOptions || [],
    });

    toast.success("Added to cart", {
      description: product.title,
      position: "top-center",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="pt-6" aria-label="Product details">
        <section className="w-full px-6">
          <div className="lg:hidden mb-6">
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink asChild>
                    <Link to="/">Home</Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink asChild>
                    <Link to="/category/shop">Shop</Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>{loading ? "Loading…" : product?.title || "Product"}</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
              <Skeleton className="aspect-square w-full" />
              <div className="space-y-4">
                <Skeleton className="h-10 w-3/4" />
                <Skeleton className="h-6 w-1/3" />
                <Skeleton className="h-24 w-full" />
                <Skeleton className="h-12 w-full" />
              </div>
            </div>
          ) : !product ? (
            <div className="py-16 text-center">
              <h1 className="font-serif text-3xl text-foreground">Product not found</h1>
              <p className="mt-3 text-sm text-muted-foreground">
                This product may be unpublished on the Online Store channel, or the handle may be incorrect.
              </p>
              <div className="mt-8">
                <Button asChild variant="secondary">
                  <Link to="/category/shop">Back to shop</Link>
                </Button>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
              <div>
                <div className="aspect-square overflow-hidden bg-muted/10">
                  {images[activeImage] ? (
                    <img
                      src={images[activeImage].url}
                      alt={images[activeImage].altText || `${product.title} lamp image`}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full grid place-items-center text-muted-foreground">No image</div>
                  )}
                </div>

                {images.length > 1 ? (
                  <div className="mt-4 grid grid-cols-5 gap-2">
                    {images.slice(0, 5).map((img: any, idx: number) => (
                      <button
                        key={img.url}
                        type="button"
                        className={`aspect-square overflow-hidden bg-muted/10 ring-1 transition-colors ${
                          idx === activeImage ? "ring-foreground/30" : "ring-border"
                        }`}
                        onClick={() => setActiveImage(idx)}
                        aria-label={`View image ${idx + 1}`}
                      >
                        <img
                          src={img.url}
                          alt={img.altText || `${product.title} thumbnail ${idx + 1}`}
                          className="w-full h-full object-cover"
                          loading="lazy"
                        />
                      </button>
                    ))}
                  </div>
                ) : null}
              </div>

              <div className="lg:sticky lg:top-6 lg:h-fit">
                <header>
                  <h1 className="font-serif text-3xl lg:text-4xl text-foreground">{product.title}</h1>
                  {price ? (
                    <p className="mt-3 text-lg text-muted-foreground tabular-nums">
                      {price.currencyCode} {parseFloat(price.amount).toFixed(2)}
                    </p>
                  ) : null}
                </header>

                {product.description ? (
                  <section className="mt-6">
                    <p className="text-sm leading-relaxed text-muted-foreground">{product.description}</p>
                  </section>
                ) : null}

                <section className="mt-8">
                  <Button className="w-full" size="lg" onClick={onAddToCart} disabled={!variant}>
                    Add to cart
                  </Button>
                  <p className="mt-3 text-xs text-muted-foreground">
                    Checkout is created via Shopify Storefront API from your cart.
                  </p>
                </section>
              </div>
            </div>
          )}
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default ProductDetail;
