import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { Skeleton } from "@/components/ui/skeleton";
import { fetchProducts, ShopifyProduct } from "@/lib/shopify";
import { useCartStore } from "@/stores/cartStore";
import { toast } from "sonner";
import { ShoppingBag } from "lucide-react";

const AsymmetricProductGrid = () => {
  const [products, setProducts] = useState<ShopifyProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [visibleItems, setVisibleItems] = useState<Set<number>>(new Set());
  const gridRef = useRef<HTMLDivElement>(null);
  const addItem = useCartStore((state) => state.addItem);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await fetchProducts(8);
        setProducts(data);
      } catch (error) {
        console.error("Failed to load products:", error);
      } finally {
        setLoading(false);
      }
    };
    loadProducts();
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Number(entry.target.getAttribute("data-index"));
            setVisibleItems((prev) => new Set([...prev, index]));
          }
        });
      },
      { threshold: 0.1, rootMargin: "50px" }
    );

    const items = gridRef.current?.querySelectorAll("[data-index]");
    items?.forEach((item) => observer.observe(item));

    return () => observer.disconnect();
  }, [products]);

  const handleAddToCart = (product: ShopifyProduct, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    const variant = product.node.variants.edges[0]?.node;
    if (!variant) return;

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
  };

  if (loading) {
    return (
      <section className="px-6 lg:px-12 py-20">
        <div className="grid grid-cols-12 gap-4 lg:gap-6">
          <div className="col-span-12 lg:col-span-7">
            <Skeleton className="aspect-[4/5] w-full" />
          </div>
          <div className="col-span-12 lg:col-span-5 grid grid-cols-2 gap-4">
            {[...Array(4)].map((_, i) => (
              <Skeleton key={i} className="aspect-square w-full" />
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (products.length === 0) {
    return (
      <section className="px-6 lg:px-12 py-32">
        <div className="text-center max-w-lg mx-auto">
          <h2 className="font-serif text-3xl lg:text-4xl text-foreground mb-4">
            No lamps yet
          </h2>
          <p className="text-muted-foreground mb-8">
            Your collection is waiting to be filled with handcrafted pieces.
          </p>
          <p className="text-sm text-muted-foreground">
            Tell me about the lamps you'd like to add to your store.
          </p>
        </div>
      </section>
    );
  }

  const featuredProduct = products[0];
  const gridProducts = products.slice(1, 5);

  return (
    <section id="products" className="px-6 lg:px-12 py-20 lg:py-32">
      {/* Section header */}
      <div className="flex items-end justify-between mb-12 lg:mb-16">
        <div>
          <span className="text-xs tracking-[0.2em] uppercase text-olive mb-2 block">
            The Collection
          </span>
          <h2 className="font-serif text-3xl lg:text-4xl text-foreground">
            Handcrafted Pieces
          </h2>
        </div>
        <Link
          to="/category/shop"
          className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-300 editorial-link hidden lg:block"
        >
          View all
        </Link>
      </div>

      <div ref={gridRef} className="grid grid-cols-12 gap-4 lg:gap-6">
        {/* Featured large product */}
        {featuredProduct && (
          <Link
            to={`/product/${featuredProduct.node.handle}`}
            data-index={0}
            className={`col-span-12 lg:col-span-7 group relative transition-all duration-700 ease-editorial ${
              visibleItems.has(0)
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
          >
            <div className="image-zoom aspect-[4/5] bg-beige relative overflow-hidden">
              {featuredProduct.node.images.edges[0]?.node ? (
                <img
                  src={featuredProduct.node.images.edges[0].node.url}
                  alt={
                    featuredProduct.node.images.edges[0].node.altText ||
                    featuredProduct.node.title
                  }
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                  No image
                </div>
              )}

              {/* Hover overlay */}
              <div className="absolute inset-0 bg-charcoal/0 group-hover:bg-charcoal/20 transition-colors duration-500" />

              {/* Quick add button */}
              <button
                onClick={(e) => handleAddToCart(featuredProduct, e)}
                className="absolute bottom-6 right-6 bg-background/95 backdrop-blur-sm p-4 opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-background"
              >
                <ShoppingBag size={20} />
              </button>
            </div>

            <div className="mt-6">
              <h3 className="font-serif text-2xl text-foreground mb-2">
                {featuredProduct.node.title}
              </h3>
              <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                {featuredProduct.node.description || "Handcrafted with care"}
              </p>
              <p className="text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                {featuredProduct.node.priceRange.minVariantPrice.currencyCode}{" "}
                {parseFloat(
                  featuredProduct.node.priceRange.minVariantPrice.amount
                ).toFixed(0)}
              </p>
            </div>
          </Link>
        )}

        {/* Smaller grid products */}
        <div className="col-span-12 lg:col-span-5 grid grid-cols-2 gap-4 lg:gap-6">
          {gridProducts.map((product, index) => (
            <Link
              key={product.node.id}
              to={`/product/${product.node.handle}`}
              data-index={index + 1}
              className={`group transition-all duration-700 ease-editorial ${
                visibleItems.has(index + 1)
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: `${(index + 1) * 100}ms` }}
            >
              <div className="image-zoom aspect-square bg-beige relative overflow-hidden">
                {product.node.images.edges[0]?.node ? (
                  <img
                    src={product.node.images.edges[0].node.url}
                    alt={
                      product.node.images.edges[0].node.altText ||
                      product.node.title
                    }
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-muted-foreground text-sm">
                    No image
                  </div>
                )}

                <div className="absolute inset-0 bg-charcoal/0 group-hover:bg-charcoal/20 transition-colors duration-500" />

                <button
                  onClick={(e) => handleAddToCart(product, e)}
                  className="absolute bottom-3 right-3 bg-background/95 backdrop-blur-sm p-3 opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-background"
                >
                  <ShoppingBag size={16} />
                </button>
              </div>

              <div className="mt-4">
                <h3 className="font-serif text-lg text-foreground group-hover:text-olive transition-colors duration-300">
                  {product.node.title}
                </h3>
                <p className="text-xs text-muted-foreground mt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {product.node.priceRange.minVariantPrice.currencyCode}{" "}
                  {parseFloat(
                    product.node.priceRange.minVariantPrice.amount
                  ).toFixed(0)}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Mobile view all link */}
      <div className="mt-12 text-center lg:hidden">
        <Link
          to="/category/shop"
          className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-300 editorial-link"
        >
          View all lamps
        </Link>
      </div>
    </section>
  );
};

export default AsymmetricProductGrid;