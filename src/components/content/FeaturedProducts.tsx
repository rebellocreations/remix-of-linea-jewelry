import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { fetchProducts, ShopifyProduct } from "@/lib/shopify";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { motion, PanInfo } from "framer-motion";
import TextReveal from "@/components/animations/TextReveal";

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

      <div className="container mx-auto px-6 lg:px-12 mb-16">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-4">
            <TextReveal
              text="The Collections"
              className="font-serif text-4xl md:text-5xl lg:text-5xl text-[#1A1A1A] tracking-tight"
              as="h2"
            />
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="text-stone-500 max-w-lg text-lg font-light leading-relaxed"
            >
              Discover our signature pieces, each handcrafted from rescued glass bottles with meticulous attention to detail.
            </motion.p>
          </div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            <Link
              to="/collections"
              className="group inline-flex items-center gap-2 text-stone-900 font-medium tracking-wide hover:gap-3 transition-all duration-300 border-b border-stone-200 pb-1"
            >
              Explore all treasures
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </div>

      <div className="px-6 lg:px-12 relative">
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="space-y-6">
                <Skeleton className="aspect-[4/5] rounded-[2rem]" />
                <div className="space-y-3 px-2">
                  <Skeleton className="h-4 w-1/4" />
                  <Skeleton className="h-6 w-2/3" />
                  <Skeleton className="h-4 w-1/3" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
            {products.map((product, index) => {
              const image = product.node.images.edges?.[0]?.node;
              const price = product.node.priceRange.minVariantPrice;

              return (
                <motion.div
                  key={product.node.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{
                    duration: 0.8,
                    delay: (index % 3) * 0.1, // Stagger by column
                    ease: [0.22, 1, 0.36, 1]
                  }}
                >
                  <Link
                    to={`/product/${product.node.handle}`}
                    className="group block"
                    onMouseEnter={() => setHoveredItem(index)}
                    onMouseLeave={() => setHoveredItem(null)}
                  >
                    <div className="relative overflow-hidden rounded-[2rem] bg-[#F5F5F0] aspect-[4/5] shadow-sm transition-all duration-500 ease-smooth group-hover:shadow-2xl group-hover:-translate-y-2">
                      <div className="absolute inset-0 bg-[#F5EAD4]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-10" />

                      {image ? (
                        <img
                          src={image.url}
                          alt={image.altText || product.node.title}
                          loading="lazy"
                          className="relative z-0 w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
                        />
                      ) : (
                        <div className="flex items-center justify-center h-full text-muted-foreground/50 text-sm">
                          No Image
                        </div>
                      )}

                      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 ease-out">
                        <span className="bg-white/95 hover:bg-white text-[#1A1A1A] rounded-full px-8 py-3 shadow-xl backdrop-blur-sm text-[10px] uppercase tracking-[0.2em] font-medium inline-block whitespace-nowrap border border-black/5">
                          View Details
                        </span>
                      </div>
                    </div>

                    <div className="mt-8 text-center space-y-1.5 px-2">
                      <p className="text-[10px] text-olive/60 tracking-[0.2em] uppercase font-medium">
                        Handcrafted Glass
                      </p>
                      <h3 className="font-serif text-2xl text-[#1A1A1A] font-light leading-tight">
                        {product.node.title}
                      </h3>
                      <p className="text-xs text-stone-400 font-light tracking-wide pt-1">
                        {price.currencyCode} {parseFloat(price.amount).toFixed(2)}
                      </p>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        )}
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
    </section>
  );
};

export default FeaturedProducts;
