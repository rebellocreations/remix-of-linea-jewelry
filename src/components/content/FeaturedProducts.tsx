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
        className={`flex items-end justify-between mb-14 lg:mb-20 transition-all duration-800 ease-premium ${
          headerVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
        }`}
      >
        <div>
          <span 
            className={`text-xs tracking-[0.2em] uppercase text-olive mb-3 block transition-all duration-700 ease-premium ${
              headerVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
            style={{ transitionDelay: "100ms" }}
          >
            Featured Lamps
          </span>
          <h2 
            id="featured-products" 
            className={`font-serif text-3xl lg:text-4xl text-foreground transition-all duration-700 ease-premium ${
              headerVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
            style={{ transitionDelay: "200ms" }}
          >
            Handcrafted Pieces
          </h2>
        </div>
        <Link
          to="/category/shop"
          className={`text-sm text-muted-foreground hover:text-foreground transition-all duration-500 editorial-link hidden lg:block ${
            headerVisible ? "opacity-100" : "opacity-0"
          }`}
          style={{ transitionDelay: "300ms" }}
        >
          View all
        </Link>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {[...Array(3)].map((_, i) => (
            <div key={i} className={i === 1 ? "md:mt-12" : i === 2 ? "md:-mt-8" : ""}>
              <Skeleton className={i === 1 ? "aspect-[3/4]" : "aspect-square"} />
              <div className="mt-6 space-y-2">
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-5 w-1/3" />
              </div>
            </div>
          ))}
        </div>
      ) : products.length === 0 ? (
        <div className="py-10">
          <p className="text-sm text-muted-foreground">
            No Shopify products found. Make sure products are <span className="font-medium">Active</span> and available on the
            <span className="font-medium"> Online Store</span> sales channel.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {products.map((product, index) => {
            const image = product.node.images.edges?.[0]?.node;
            const price = product.node.priceRange.minVariantPrice;
            const isFeatured = index === 1;
            const isHovered = hoveredItem === index;

            return (
              <Link
                key={product.node.id}
                to={`/product/${product.node.handle}`}
                data-index={index}
                className={`group block transition-all duration-700 ease-premium ${
                  visibleItems.has(index) 
                    ? "opacity-100 translate-y-0" 
                    : "opacity-0 translate-y-12"
                } ${index === 1 ? "md:mt-12" : index === 2 ? "md:-mt-8" : ""}`}
                style={{ 
                  filter: visibleItems.has(index) ? 'blur(0px)' : 'blur(8px)',
                }}
                onMouseEnter={() => setHoveredItem(index)}
                onMouseLeave={() => setHoveredItem(null)}
              >
                {/* Image container with hover effects */}
                <div
                  className={`relative overflow-hidden bg-beige ${
                    isFeatured ? "aspect-[3/4]" : "aspect-square"
                  } transition-all duration-500 ease-premium ${
                    isHovered ? "shadow-2xl" : "shadow-none"
                  }`}
                  style={{
                    transform: isHovered ? 'translateY(-8px)' : 'translateY(0)',
                  }}
                >
                  {/* Ambient glow behind product */}
                  <div
                    className={`absolute inset-0 transition-opacity duration-700 ease-premium ${
                      isHovered ? "opacity-100" : "opacity-30"
                    }`}
                    style={{
                      background: `radial-gradient(ellipse 60% 50% at 50% 40%, hsl(38 90% 55% / ${
                        isHovered ? 0.35 : 0.12
                      }) 0%, transparent 70%)`,
                    }}
                  />

                  {image ? (
                    <img
                      src={image.url}
                      alt={image.altText || `${product.node.title} handcrafted lamp`}
                      loading="lazy"
                      className={`relative z-10 w-full h-full object-cover transition-all duration-600 ease-premium ${
                        isHovered ? "scale-[1.04] brightness-105" : "scale-100"
                      }`}
                    />
                  ) : (
                    <div className="relative z-10 w-full h-full grid place-items-center text-sm text-muted-foreground">
                      No image
                    </div>
                  )}

                  {/* Hover glow overlay */}
                  <div
                    className={`absolute inset-0 z-20 pointer-events-none transition-opacity duration-500 ease-premium ${
                      isHovered ? "opacity-100" : "opacity-0"
                    }`}
                    style={{
                      background:
                        "radial-gradient(ellipse 50% 40% at 50% 35%, hsl(38 90% 55% / 0.2) 0%, transparent 60%)",
                    }}
                  />
                  
                  {/* CTA that fades in on hover */}
                  <div 
                    className={`absolute bottom-4 left-4 right-4 z-30 transition-all duration-400 ease-premium ${
                      isHovered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                    }`}
                  >
                    <Button 
                      variant="secondary" 
                      size="sm" 
                      className="w-full bg-background/90 backdrop-blur-sm hover:bg-background text-foreground rounded-none text-xs tracking-wide"
                    >
                      View Details
                      <ArrowRight className="ml-2 h-3 w-3" />
                    </Button>
                  </div>
                </div>

                {/* Product info with staggered reveal */}
                <div className="mt-6 space-y-1">
                  <h3
                    className={`font-serif text-xl lg:text-2xl text-foreground transition-all duration-600 ease-premium ${
                      visibleItems.has(index) ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                    }`}
                    style={{ transitionDelay: `${index * 150 + 200}ms` }}
                  >
                    {product.node.title}
                  </h3>
                  <p
                    className={`text-base text-muted-foreground transition-all duration-600 ease-premium ${
                      visibleItems.has(index) ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                    }`}
                    style={{ transitionDelay: `${index * 150 + 350}ms` }}
                  >
                    {price.currencyCode} {parseFloat(price.amount).toFixed(2)}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      )}

      {/* Mobile view all link */}
      <div className="mt-14 text-center lg:hidden">
        <Link
          to="/category/shop"
          className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-500 editorial-link"
        >
          View all lamps
        </Link>
      </div>
    </section>
  );
};

export default FeaturedProducts;
