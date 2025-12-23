import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { fetchProducts, ShopifyProduct } from "@/lib/shopify";
import { Skeleton } from "@/components/ui/skeleton";

const FeaturedProducts = () => {
  const [visibleItems, setVisibleItems] = useState<Set<number>>(new Set());
  const [hoveredItem, setHoveredItem] = useState<number | null>(null);
  const [scrollY, setScrollY] = useState(0);
  const [products, setProducts] = useState<ShopifyProduct[]>([]);
  const [loading, setLoading] = useState(true);

  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const load = async () => {
      try {
        // Keep it curated: show only a few items on the homepage.
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

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Number(entry.target.getAttribute("data-index"));
            setTimeout(() => {
              setVisibleItems((prev) => new Set([...prev, index]));
            }, index * 200);
          }
        });
      },
      { threshold: 0.2, rootMargin: "50px" }
    );

    const items = sectionRef.current?.querySelectorAll("[data-index]");
    items?.forEach((item) => observer.observe(item));

    return () => observer.disconnect();
  }, [products.length]);

  // Scroll-tied breathing effect
  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const getBreathingScale = (index: number) => {
    const offset = scrollY * 0.0002 + index * 0.3;
    const breathe = Math.sin(offset) * 0.01 + 1;
    return breathe;
  };

  return (
    <section
      id="products"
      ref={sectionRef}
      className="px-6 lg:px-12 py-20 lg:py-32 bg-background relative"
      aria-labelledby="featured-products"
    >
      <div className="flex items-end justify-between mb-12 lg:mb-16">
        <div>
          <span className="text-xs tracking-[0.2em] uppercase text-olive mb-2 block">
            Featured Lamps
          </span>
          <h2 id="featured-products" className="font-serif text-3xl lg:text-4xl text-foreground">
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

            return (
              <Link
                key={product.node.id}
                to={`/product/${product.node.handle}`}
                data-index={index}
                className={`group block transition-all duration-700 ease-editorial ${
                  visibleItems.has(index) ? "opacity-100" : "opacity-0"
                } ${index === 1 ? "md:mt-12" : index === 2 ? "md:-mt-8" : ""}`}
                onMouseEnter={() => setHoveredItem(index)}
                onMouseLeave={() => setHoveredItem(null)}
              >
                <div
                  className={`relative overflow-hidden bg-beige ${
                    isFeatured ? "aspect-[3/4]" : "aspect-square"
                  } transition-all duration-500 ease-editorial`}
                  style={{ transform: `scale(${getBreathingScale(index)})` }}
                >
                  <div
                    className={`absolute inset-0 transition-all duration-700 ${
                      hoveredItem === index ? "opacity-100" : "opacity-40"
                    }`}
                    style={{
                      background: `radial-gradient(ellipse 60% 50% at 50% 40%, hsl(38 90% 55% / ${
                        hoveredItem === index ? 0.4 : 0.15
                      }) 0%, transparent 70%)`,
                      animation: "ambientPulse 4s ease-in-out infinite",
                      animationDelay: `${index * 0.5}s`,
                    }}
                  />

                  {image ? (
                    <img
                      src={image.url}
                      alt={image.altText || `${product.node.title} handcrafted lamp`}
                      loading="lazy"
                      className={`relative z-10 w-full h-full object-cover transition-all duration-500 ease-editorial ${
                        hoveredItem === index ? "scale-[1.03] brightness-110 contrast-105" : ""
                      }`}
                    />
                  ) : (
                    <div className="relative z-10 w-full h-full grid place-items-center text-sm text-muted-foreground">
                      No image
                    </div>
                  )}

                  <div
                    className={`absolute inset-0 z-20 pointer-events-none transition-opacity duration-700 ${
                      hoveredItem === index ? "opacity-100" : "opacity-0"
                    }`}
                    style={{
                      background:
                        "radial-gradient(ellipse 50% 40% at 50% 35%, hsl(38 90% 55% / 0.25) 0%, transparent 60%)",
                    }}
                  />

                  <div
                    className={`absolute inset-0 z-0 transition-all duration-500 ${
                      hoveredItem === index ? "shadow-[0_25px_60px_-15px_rgba(0,0,0,0.2)]" : ""
                    }`}
                  />
                </div>

                <div className="mt-6 space-y-1">
                  <h3
                    className={`font-serif text-xl lg:text-2xl text-foreground transition-all duration-500 ease-editorial ${
                      visibleItems.has(index) ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                    }`}
                    style={{ transitionDelay: `${index * 200 + 200}ms` }}
                  >
                    {product.node.title}
                  </h3>
                  <p
                    className={`text-base text-muted-foreground transition-all duration-500 ease-editorial ${
                      visibleItems.has(index) ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                    }`}
                    style={{ transitionDelay: `${index * 200 + 350}ms` }}
                  >
                    {price.currencyCode} {parseFloat(price.amount).toFixed(2)}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      )}

      <div className="mt-12 text-center lg:hidden">
        <Link
          to="/category/shop"
          className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-300 editorial-link"
        >
          View all lamps
        </Link>
      </div>

      <style>{`
        @keyframes ambientPulse {
          0%, 100% { opacity: 0.6; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.05); }
        }
      `}</style>
    </section>
  );
};

export default FeaturedProducts;

