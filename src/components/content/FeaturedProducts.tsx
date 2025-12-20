import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

interface DemoProduct {
  id: string;
  name: string;
  price: string;
  handle: string;
  featured?: boolean;
}

const FeaturedProducts = () => {
  const [visibleItems, setVisibleItems] = useState<Set<number>>(new Set());
  const sectionRef = useRef<HTMLElement>(null);

  const demoProducts: DemoProduct[] = [
    {
      id: "1",
      name: "Amber Bottle Floor Lamp",
      price: "₹7,499",
      handle: "amber-bottle-floor-lamp",
    },
    {
      id: "2",
      name: "Olive Glass Table Lamp",
      price: "₹5,999",
      handle: "olive-glass-table-lamp",
      featured: true,
    },
    {
      id: "3",
      name: "Clear Cut Pendant Lamp",
      price: "₹6,499",
      handle: "clear-cut-pendant-lamp",
    },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Number(entry.target.getAttribute("data-index"));
            // Stagger the reveal
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

  return (
    <section 
      id="products" 
      ref={sectionRef} 
      className="px-6 lg:px-12 py-20 lg:py-32 bg-background"
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
              // Uneven vertical alignment - middle product lower
              index === 1 ? "md:mt-12" : index === 2 ? "md:-mt-8" : ""
            }`}
          >
            {/* Product image container with tilt hover */}
            <div 
              className={`relative overflow-hidden bg-beige ${
                product.featured ? "aspect-[3/4]" : "aspect-square"
              } transition-all duration-500 ease-editorial group-hover:shadow-2xl`}
              style={{
                transitionProperty: 'transform, box-shadow',
              }}
            >
              {/* Placeholder gradient for demo */}
              <div 
                className="w-full h-full bg-gradient-to-br from-beige to-olive/10 flex items-center justify-center transition-transform duration-500 ease-editorial group-hover:scale-[1.03] group-hover:rotate-[1deg]"
              >
                <span className="font-serif text-lg text-muted-foreground/50 italic">
                  {product.name.split(' ')[0]}
                </span>
              </div>

              {/* Expanding shadow on hover */}
              <div 
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{
                  boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.15) inset',
                }}
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
    </section>
  );
};

export default FeaturedProducts;
