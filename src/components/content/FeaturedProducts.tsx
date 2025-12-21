import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

// Import demo product images
import amberFloorLamp from "@/assets/products/amber-floor-lamp.jpg";
import oliveTableLamp from "@/assets/products/olive-table-lamp.jpg";
import clearPendantLamp from "@/assets/products/clear-pendant-lamp.jpg";

interface DemoProduct {
  id: string;
  name: string;
  price: string;
  handle: string;
  image: string;
  featured?: boolean;
}

const FeaturedProducts = () => {
  const [visibleItems, setVisibleItems] = useState<Set<number>>(new Set());
  const [hoveredItem, setHoveredItem] = useState<number | null>(null);
  const [scrollY, setScrollY] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);

  const demoProducts: DemoProduct[] = [
    {
      id: "1",
      name: "Amber Bottle Floor Lamp",
      price: "₹7,499",
      handle: "amber-bottle-floor-lamp",
      image: amberFloorLamp,
    },
    {
      id: "2",
      name: "Olive Glass Table Lamp",
      price: "₹5,999",
      handle: "olive-glass-table-lamp",
      image: oliveTableLamp,
      featured: true,
    },
    {
      id: "3",
      name: "Clear Cut Pendant Lamp",
      price: "₹6,499",
      handle: "clear-cut-pendant-lamp",
      image: clearPendantLamp,
    },
  ];

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
  }, []);

  // Scroll-tied breathing effect
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Calculate breathing scale based on scroll
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
    >
      {/* Section header */}
      <div className="flex items-end justify-between mb-12 lg:mb-16">
        <div>
          <span className="text-xs tracking-[0.2em] uppercase text-olive mb-2 block">
            Featured Lamps
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

      {/* Product grid with uneven alignment */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
        {demoProducts.map((product, index) => (
          <Link
            key={product.id}
            to={`/product/${product.handle}`}
            data-index={index}
            className={`group block transition-all duration-700 ease-editorial ${
              visibleItems.has(index)
                ? "opacity-100"
                : "opacity-0"
            } ${
              index === 1 ? "md:mt-12" : index === 2 ? "md:-mt-8" : ""
            }`}
            onMouseEnter={() => setHoveredItem(index)}
            onMouseLeave={() => setHoveredItem(null)}
          >
            {/* Product image container with ambient glow */}
            <div 
              className={`relative overflow-hidden bg-beige ${
                product.featured ? "aspect-[3/4]" : "aspect-square"
              } transition-all duration-500 ease-editorial`}
              style={{
                transform: `scale(${getBreathingScale(index)})`,
              }}
            >
              {/* Ambient glow behind lamp - pulses slowly */}
              <div 
                className={`absolute inset-0 transition-all duration-700 ${
                  hoveredItem === index 
                    ? "opacity-100" 
                    : "opacity-40"
                }`}
                style={{
                  background: `radial-gradient(ellipse 60% 50% at 50% 40%, hsl(38 90% 55% / ${hoveredItem === index ? 0.4 : 0.15}) 0%, transparent 70%)`,
                  animation: 'ambientPulse 4s ease-in-out infinite',
                  animationDelay: `${index * 0.5}s`,
                }}
              />

              <img 
                src={product.image}
                alt={product.name}
                className={`relative z-10 w-full h-full object-cover transition-all duration-500 ease-editorial ${
                  hoveredItem === index 
                    ? "scale-[1.03] brightness-110 contrast-105" 
                    : ""
                }`}
              />

              {/* Warm glow overlay on hover - lamp "turns on" */}
              <div 
                className={`absolute inset-0 z-20 pointer-events-none transition-opacity duration-700 ${
                  hoveredItem === index ? "opacity-100" : "opacity-0"
                }`}
                style={{
                  background: `radial-gradient(ellipse 50% 40% at 50% 35%, hsl(38 90% 55% / 0.25) 0%, transparent 60%)`,
                }}
              />

              {/* Subtle shadow expansion */}
              <div 
                className={`absolute inset-0 z-0 transition-all duration-500 ${
                  hoveredItem === index 
                    ? "shadow-[0_25px_60px_-15px_rgba(0,0,0,0.2)]" 
                    : ""
                }`}
              />
            </div>

            {/* Product info - sequential reveal */}
            <div className="mt-6 space-y-1">
              <h3 
                className={`font-serif text-xl lg:text-2xl text-foreground transition-all duration-500 ease-editorial ${
                  visibleItems.has(index)
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-4"
                }`}
                style={{ transitionDelay: `${index * 200 + 200}ms` }}
              >
                {product.name}
              </h3>
              <p 
                className={`text-base text-muted-foreground transition-all duration-500 ease-editorial ${
                  visibleItems.has(index)
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-4"
                }`}
                style={{ transitionDelay: `${index * 200 + 350}ms` }}
              >
                {product.price}
              </p>
            </div>
          </Link>
        ))}
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

      {/* Ambient pulse animation */}
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
