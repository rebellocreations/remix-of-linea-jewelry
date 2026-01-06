import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { fetchProducts, ShopifyProduct } from "@/lib/shopify";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const FeaturedProducts = () => {
  const [visibleItems, setVisibleItems] = useState<Set<number>>(new Set());
  const [hoveredItem, setHoveredItem] = useState<number | null>(null);
  const [products, setProducts] = useState<ShopifyProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [headerVisible, setHeaderVisible] = useState(false);

  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await fetchProducts(3);
        setProducts(data);
      } catch (e) {
        console.error("Failed to load featured Shopify products:", e);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  // Header visibility observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setHeaderVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (headerRef.current) {
      observer.observe(headerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Product items visibility observer with staggered reveal
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Number(entry.target.getAttribute("data-index"));
            // Staggered delay based on index
            setTimeout(() => {
              setVisibleItems((prev) => new Set([...prev, index]));
            }, index * 150);
          }
        });
      },
      { threshold: 0.15, rootMargin: "50px" }
    );

    const items = sectionRef.current?.querySelectorAll("[data-index]");
    items?.forEach((item) => observer.observe(item));

    return () => observer.disconnect();
  }, [products.length]);

  return (
    <section
      id="products"
      ref={sectionRef}
      className="px-6 lg:px-12 py-24 lg:py-36 bg-background relative"
      aria-labelledby="featured-products"
    >
      {/* Header with reveal animation */}
      <div
        ref={headerRef}
        className={`flex items-end justify-between mb-16 lg:mb-24 transition-all duration-1000 ease-out ${headerVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
      >
        <div>
          <span
            className={`text-xs tracking-[0.2em] uppercase text-olive/80 mb-4 block transition-all duration-700 ease-out ${headerVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
            style={{ transitionDelay: "100ms" }}
          >
            Curated Collection
          </span>
          <h2
            id="featured-products"
            className={`font-serif text-3xl md:text-4xl lg:text-5xl text-foreground font-light tracking-tight transition-all duration-700 ease-out ${headerVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
            style={{ transitionDelay: "200ms" }}
          >
            Handcrafted Pieces
          </h2>
        </div>
        <Link
          to="/category/shop"
          className={`text-sm text-muted-foreground hover:text-foreground transition-all duration-500 border-b border-transparent hover:border-foreground pb-0.5 hidden lg:block ${headerVisible ? "opacity-100" : "opacity-0"
            }`}
          style={{ transitionDelay: "300ms" }}
        >
          View all objects
        </Link>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
          {[...Array(3)].map((_, i) => (
            <div key={i} className={i === 1 ? "lg:mt-16" : ""}>
              <Skeleton className="aspect-[4/5] rounded-xl" />
              <div className="mt-6 space-y-3">
                <Skeleton className="h-6 w-2/3" />
                <Skeleton className="h-4 w-1/3" />
              </div>
            </div>
          ))}
        </div>
      ) : products.length === 0 ? (
        <div className="py-20 text-center">
          <p className="text-sm text-muted-foreground">
            No products found in the collection.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-16 lg:gap-x-12">
          {products.map((product, index) => {
            const image = product.node.images.edges?.[0]?.node;
            const price = product.node.priceRange.minVariantPrice;
            const isHovered = hoveredItem === index;

            // Masonry-like offset logic: 
            // 2nd item pushes down on desktop
            // 3rd item pulls up slightly on desktop if desired, or we just keep it simple
            const offsetClass = index === 1 ? "lg:mt-16" : index === 2 ? "lg:-mt-8" : "";

            return (
              <Link
                key={product.node.id}
                to={`/product/${product.node.handle}`}
                data-index={index}
                className={`group block transition-all duration-1000 ease-out ${visibleItems.has(index)
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-16"
                  } ${offsetClass}`}
                onMouseEnter={() => setHoveredItem(index)}
                onMouseLeave={() => setHoveredItem(null)}
              >
                {/* Image Card */}
                <div
                  className={`relative overflow-hidden rounded-2xl bg-[#F5F5F0] aspect-[4/5] transition-all duration-700 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] ${isHovered ? "shadow-xl translate-y-[-4px]" : "shadow-sm translate-y-0"
                    }`}
                >
                  {/* Warm overlay on hover */}
                  <div
                    className={`absolute inset-0 bg-[#F5EAD4]/20 transition-opacity duration-500 pointer-events-none z-10 ${isHovered ? "opacity-100" : "opacity-0"
                      }`}
                  />

                  {image ? (
                    <img
                      src={image.url}
                      alt={image.altText || product.node.title}
                      loading="lazy"
                      className={`relative z-0 w-full h-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] ${isHovered ? "scale-105" : "scale-100"
                        }`}
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full text-muted-foreground/50 text-sm">
                      No Image
                    </div>
                  )}

                  {/* Floating Action Button */}
                  <div
                    className={`absolute bottom-6 left-1/2 -translate-x-1/2 z-20 transition-all duration-500 ease-out ${isHovered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                      }`}
                  >
                    <Button
                      variant="secondary"
                      className="bg-white/90 hover:bg-white text-foreground rounded-full px-6 shadow-md backdrop-blur-sm h-10 text-xs uppercase tracking-wider font-medium"
                    >
                      View Item
                    </Button>
                  </div>
                </div>

                {/* Content */}
                <div className="mt-6 text-center space-y-1.5 px-2">
                  <h3 className="font-serif text-2xl text-foreground font-light">
                    {product.node.title}
                  </h3>
                  <p className="text-xs text-olive/70 tracking-wide uppercase">
                    Handcrafted from recycled glass
                  </p>
                  <p className="text-sm text-muted-foreground font-medium pt-1">
                    {price.currencyCode} {parseFloat(price.amount).toFixed(2)}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      )}

      {/* Mobile Footer Link */}
      <div className="mt-16 text-center lg:hidden">
        <Link
          to="/category/shop"
          className="inline-block text-sm text-muted-foreground border-b border-muted-foreground/30 hover:border-foreground pb-1 transition-all duration-300"
        >
          View all objects
        </Link>
      </div>
    </section>
  );
};

export default FeaturedProducts;
