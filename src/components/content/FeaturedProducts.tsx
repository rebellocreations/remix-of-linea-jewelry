import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { fetchProducts, ShopifyProduct } from "@/lib/shopify";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { motion, PanInfo } from "framer-motion";

const FeaturedProducts = () => {
  const [visibleItems, setVisibleItems] = useState<Set<number>>(new Set());
  const [hoveredItem, setHoveredItem] = useState<number | null>(null);
  const [products, setProducts] = useState<ShopifyProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [headerVisible, setHeaderVisible] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isSwiping, setIsSwiping] = useState(false);

  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await fetchProducts(6); // Fetch more for carousel
        setProducts(data);
      } catch (e) {
        console.error("Failed to load featured Shopify products:", e);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  // No auto-slide - user controls the carousel manually for smoother experience

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

  // Product items visibility observer (Desktop)
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Number(entry.target.getAttribute("data-index"));
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
      className="px-4 sm:px-6 lg:px-12 py-16 md:py-24 lg:py-36 bg-background relative"
      aria-labelledby="featured-products"
    >
      {/* Header with reveal animation */}
      <div
        ref={headerRef}
        className={`flex items-end justify-between mb-10 md:mb-16 lg:mb-24 transition-all duration-1000 ease-out ${headerVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
      >
        <div>
          <span
            className={`text-[10px] md:text-xs tracking-[0.2em] uppercase text-olive/80 mb-2 md:mb-4 block transition-all duration-700 ease-out ${headerVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
            style={{ transitionDelay: "100ms" }}
          >
            Curated Collection
          </span>
          <h2
            id="featured-products"
            className={`font-serif text-2xl md:text-4xl lg:text-5xl text-foreground font-light tracking-tight transition-all duration-700 ease-out ${headerVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
            style={{ transitionDelay: "200ms" }}
          >
            Handcrafted Pieces
          </h2>
        </div>
        <Link
          to="/collections"
          className={`text-xs md:text-sm text-muted-foreground hover:text-foreground transition-all duration-500 border-b border-transparent hover:border-foreground pb-0.5 hidden sm:block ${headerVisible ? "opacity-100" : "opacity-0"
            }`}
          style={{ transitionDelay: "300ms" }}
        >
          View all
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
        <div className="relative">
          {/* Desktop Grid */}
          <div className="hidden sm:grid grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-12 lg:gap-x-12">
            {products.slice(0, 3).map((product, index) => {
              const image = product.node.images.edges?.[0]?.node;
              const price = product.node.priceRange.minVariantPrice;
              const isHovered = hoveredItem === index;
              const offsetClass = index === 1 ? "lg:mt-16" : index === 2 ? "lg:-mt-8" : "";

              return (
                <Link
                  key={product.node.id}
                  to={`/product/${product.node.handle}`}
                  data-index={index}
                  className={`group block transition-all duration-1000 ease-out ${visibleItems.has(index)
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-12 sm:translate-y-16"
                    } ${offsetClass}`}
                  onMouseEnter={() => setHoveredItem(index)}
                  onMouseLeave={() => setHoveredItem(null)}
                >
                  <div
                    className={`relative overflow-hidden rounded-xl md:rounded-2xl bg-[#F5F5F0] aspect-[4/5] transition-all duration-700 ease-smooth ${isHovered ? "shadow-xl translate-y-[-4px]" : "shadow-sm translate-y-0"
                      }`}
                  >
                    {image ? (
                      <img
                        src={image.url}
                        alt={image.altText || product.node.title}
                        className={`w-full h-full object-cover transition-transform duration-1000 ease-out ${isHovered ? "scale-110" : "scale-100"
                          }`}
                        loading="lazy"
                      />
                    ) : (
                      <div className="w-full h-full bg-olive/5 flex items-center justify-center">
                        <p className="text-xs text-olive/40 italic">Coming soon</p>
                      </div>
                    )}
                    <div className={`absolute inset-0 bg-amber/5 transition-opacity duration-700 ${isHovered ? "opacity-100" : "opacity-0"
                      }`} />
                  </div>

                  <div className="mt-4 md:mt-6 text-center space-y-1 px-2">
                    <h3 className="font-serif text-xl md:text-2xl text-foreground font-light leading-tight">
                      {product.node.title}
                    </h3>
                    <p className="text-[10px] md:text-xs text-olive/70 tracking-wide uppercase">
                      Handcrafted from recycled glass
                    </p>
                    <p className="text-sm text-muted-foreground font-medium pt-0.5 md:pt-1">
                      {price.currencyCode} {parseFloat(price.amount).toFixed(2)}
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>

          {/* Mobile Smooth Swipable Carousel */}
          <div className="sm:hidden overflow-hidden py-4">
            <motion.div
              drag="x"
              dragConstraints={{ left: -(products.length - 1) * 80 * window.innerWidth / 100, right: 0 }}
              dragElastic={0.1}
              dragTransition={{ bounceStiffness: 300, bounceDamping: 30 }}
              onDragStart={() => setIsSwiping(true)}
              onDragEnd={(_e, info: PanInfo) => {
                setIsSwiping(false);
                const swipeThreshold = 40;
                const velocity = info.velocity.x;

                if (velocity < -300 || info.offset.x < -swipeThreshold) {
                  setCurrentIndex((prev) => Math.min(prev + 1, products.length - 1));
                } else if (velocity > 300 || info.offset.x > swipeThreshold) {
                  setCurrentIndex((prev) => Math.max(prev - 1, 0));
                }
              }}
              animate={{ x: `-${currentIndex * 80}%` }}
              transition={{
                type: "tween",
                duration: 0.4,
                ease: [0.22, 1, 0.36, 1]
              }}
              className="flex cursor-grab active:cursor-grabbing touch-pan-y"
              style={{ touchAction: "pan-y" }}
            >
              {products.map((product) => {
                const image = product.node.images.edges?.[0]?.node;
                const price = product.node.priceRange.minVariantPrice;

                return (
                  <Link
                    key={`${product.node.id}-mobile`}
                    to={isSwiping ? "#" : `/product/${product.node.handle}`}
                    onClick={(e) => isSwiping && e.preventDefault()}
                    className="flex-shrink-0 w-[80%] px-3 group"
                    draggable={false}
                  >
                    <div className="relative overflow-hidden rounded-xl bg-[#F5F5F0] aspect-square shadow-sm">
                      {image ? (
                        <img
                          src={image.url}
                          alt={image.altText || product.node.title}
                          className="w-full h-full object-cover pointer-events-none select-none"
                          loading="lazy"
                          draggable={false}
                        />
                      ) : (
                        <div className="w-full h-full bg-olive/5 flex items-center justify-center">
                          <p className="text-xs text-olive/40 italic">Coming soon</p>
                        </div>
                      )}
                    </div>

                    <div className="mt-4 text-center space-y-0.5">
                      <h3 className="font-serif text-lg text-foreground font-light leading-tight">
                        {product.node.title}
                      </h3>
                      <p className="text-[10px] text-olive/70 tracking-wide uppercase">
                        Recycled Glass
                      </p>
                      <p className="text-xs text-muted-foreground font-medium">
                        {price.currencyCode} {parseFloat(price.amount).toFixed(2)}
                      </p>
                    </div>
                  </Link>
                );
              })}
            </motion.div>

            {/* Carousel indicators */}
            <div className="flex justify-center gap-2 mt-8">
              {products.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  className={`h-1.5 rounded-full transition-all duration-400 ease-out ${currentIndex === idx ? "bg-olive w-6" : "bg-olive/20 w-1.5"
                    }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default FeaturedProducts;
