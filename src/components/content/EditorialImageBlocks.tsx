import { useEffect, useRef, useState } from "react";

// Import material images
import organicFormsImg from "@/assets/materials/organic-forms.jpg";
import industrialCraftImg from "@/assets/materials/industrial-craft.jpg";
import warmGlowImg from "@/assets/materials/warm-glow.jpg";

interface EditorialImage {
  caption: string;
  description: string;
  size: "large" | "medium" | "small";
  image: string;
}

const EditorialImageBlocks = () => {
  const [visibleItems, setVisibleItems] = useState<Set<number>>(new Set());
  const [hoveredItem, setHoveredItem] = useState<number | null>(null);
  const [activeSlide, setActiveSlide] = useState(0);
  const [scrollY, setScrollY] = useState(0);
  const [headerVisible, setHeaderVisible] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);

  const images: EditorialImage[] = [
    {
      caption: "Organic Forms",
      description: "Nature-inspired shapes formed through heat and hand-cut glass",
      size: "large",
      image: organicFormsImg,
    },
    {
      caption: "Industrial Craft",
      description: "Raw metal meets warm recycled glass",
      size: "medium",
      image: industrialCraftImg,
    },
    {
      caption: "Warm Glow",
      description: "Filament bulbs casting amber light through textured surfaces",
      size: "medium",
      image: warmGlowImg,
    },
  ];

  // Header visibility
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

  // Visibility observer for items with blur-in
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Number(entry.target.getAttribute("data-index"));
            setTimeout(() => {
              setVisibleItems((prev) => new Set([...prev, index]));
            }, index * 120);
          }
        });
      },
      { threshold: 0.15, rootMargin: "50px" }
    );

    const items = sectionRef.current?.querySelectorAll("[data-index]");
    items?.forEach((item) => observer.observe(item));

    return () => observer.disconnect();
  }, []);

  // Auto-looping cross-fade for process visualization - pause on hover
  useEffect(() => {
    if (isPaused) return;
    
    const interval = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % images.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [images.length, isPaused]);

  // Scroll-tied parallax
  useEffect(() => {
    const handleScroll = () => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        const progress = (window.innerHeight - rect.top) / (window.innerHeight + rect.height);
        setScrollY(progress);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section ref={sectionRef} className="px-6 lg:px-12 py-24 lg:py-36 relative">
      {/* Header with reveal animation */}
      <div 
        ref={headerRef}
        className={`mb-14 lg:mb-20 transition-all duration-800 ease-premium ${
          headerVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
        }`}
      >
        <span 
          className={`text-xs tracking-[0.2em] uppercase text-olive mb-3 block transition-all duration-700 ease-premium ${
            headerVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
          style={{ transitionDelay: "100ms" }}
        >
          Behind the Craft
        </span>
        <h2 
          className={`font-serif text-3xl lg:text-4xl text-foreground transition-all duration-700 ease-premium ${
            headerVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
          style={{ transitionDelay: "200ms" }}
        >
          Materials & Process
        </h2>
      </div>

      {/* Auto-looping process slideshow - visible on mobile with pause on hover */}
      <div 
        className="lg:hidden mb-14 relative aspect-[4/3] overflow-hidden"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onTouchStart={() => setIsPaused(true)}
        onTouchEnd={() => setTimeout(() => setIsPaused(false), 3000)}
      >
        {images.map((img, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-all duration-1000 ease-premium ${
              activeSlide === index 
                ? "opacity-100 scale-100" 
                : "opacity-0 scale-[1.02]"
            }`}
          >
            <img
              src={img.image}
              alt={img.caption}
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-0 left-0 right-0 p-5 bg-gradient-to-t from-charcoal/80 to-transparent">
              <p className="font-serif text-lg text-charcoal-foreground">{img.caption}</p>
              <p className="text-sm text-charcoal-foreground/70 mt-1">{img.description}</p>
            </div>
          </div>
        ))}
        
        {/* Slide indicators with animated progress */}
        <div className="absolute bottom-5 right-5 flex gap-2">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveSlide(index)}
              className={`h-2 rounded-full transition-all duration-500 ease-premium ${
                activeSlide === index 
                  ? "bg-amber w-8" 
                  : "bg-charcoal-foreground/30 w-2 hover:bg-charcoal-foreground/50"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Desktop grid layout with parallax and blur-in */}
      <div className="hidden lg:grid grid-cols-12 gap-5 lg:gap-8">
        {/* Large image with parallax */}
        <div
          data-index={0}
          className={`col-span-8 transition-all duration-800 ease-premium ${
            visibleItems.has(0)
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-10"
          }`}
          style={{
            filter: visibleItems.has(0) ? 'blur(0px)' : 'blur(10px)',
          }}
          onMouseEnter={() => setHoveredItem(0)}
          onMouseLeave={() => setHoveredItem(null)}
        >
          <div 
            className={`aspect-[16/10] relative overflow-hidden group transition-all duration-500 ease-premium ${
              hoveredItem === 0 ? 'shadow-2xl' : ''
            }`}
            style={{
              transform: hoveredItem === 0 ? 'translateY(-6px)' : 'translateY(0)',
            }}
          >
            <img 
              src={images[0].image}
              alt={images[0].caption}
              className="w-full h-full object-cover transition-transform duration-800 ease-premium"
              style={{
                transform: `translateY(${scrollY * 25}px) scale(1.12) ${
                  hoveredItem === 0 ? 'scale(1.15)' : ''
                }`,
              }}
            />
            
            {/* Warm glow on hover */}
            <div 
              className={`absolute inset-0 pointer-events-none transition-opacity duration-600 ease-premium ${
                hoveredItem === 0 ? "opacity-100" : "opacity-0"
              }`}
              style={{
                background: 'radial-gradient(ellipse at center, hsl(38 90% 55% / 0.18) 0%, transparent 70%)',
              }}
            />
            
            {/* Glow border effect */}
            <div 
              className={`absolute inset-0 pointer-events-none transition-all duration-500 ease-premium ${
                hoveredItem === 0 ? "opacity-100" : "opacity-0"
              }`}
              style={{
                boxShadow: 'inset 0 0 0 1px hsl(38 90% 55% / 0.3)',
              }}
            />
          </div>
          <div className="mt-5">
            <h3 className="font-serif text-lg text-foreground">{images[0].caption}</h3>
            <p 
              className={`text-sm text-muted-foreground mt-1 transition-all duration-500 ease-premium ${
                hoveredItem === 0 ? 'opacity-100 translate-y-0' : 'opacity-70 translate-y-1'
              }`}
            >
              {images[0].description}
            </p>
          </div>
        </div>

        {/* Medium images - stacked right with parallax */}
        <div className="col-span-4 space-y-5 lg:space-y-8">
          {[1, 2].map((idx) => (
            <div
              key={idx}
              data-index={idx}
              className={`transition-all duration-800 ease-premium ${
                visibleItems.has(idx)
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              }`}
              style={{ 
                transitionDelay: `${idx * 150}ms`,
                filter: visibleItems.has(idx) ? 'blur(0px)' : 'blur(10px)',
              }}
              onMouseEnter={() => setHoveredItem(idx)}
              onMouseLeave={() => setHoveredItem(null)}
            >
              <div 
                className={`${idx === 1 ? 'aspect-square' : 'aspect-[4/3]'} relative overflow-hidden group transition-all duration-500 ease-premium ${
                  hoveredItem === idx ? 'shadow-2xl' : ''
                }`}
                style={{
                  transform: hoveredItem === idx ? 'translateY(-6px)' : 'translateY(0)',
                }}
              >
                <img 
                  src={images[idx].image}
                  alt={images[idx].caption}
                  className="w-full h-full object-cover transition-transform duration-800 ease-premium"
                  style={{
                    transform: `translateY(${scrollY * (18 + idx * 6)}px) scale(1.12) ${
                      hoveredItem === idx ? 'scale(1.15)' : ''
                    }`,
                  }}
                />
                
                {/* Warm glow on hover */}
                <div 
                  className={`absolute inset-0 pointer-events-none transition-opacity duration-600 ease-premium ${
                    hoveredItem === idx ? "opacity-100" : "opacity-0"
                  }`}
                  style={{
                    background: 'radial-gradient(ellipse at center, hsl(38 90% 55% / 0.18) 0%, transparent 70%)',
                  }}
                />
                
                {/* Glow border effect */}
                <div 
                  className={`absolute inset-0 pointer-events-none transition-all duration-500 ease-premium ${
                    hoveredItem === idx ? "opacity-100" : "opacity-0"
                  }`}
                  style={{
                    boxShadow: 'inset 0 0 0 1px hsl(38 90% 55% / 0.3)',
                  }}
                />
              </div>
              <div className="mt-4">
                <p 
                  className={`text-sm text-muted-foreground transition-all duration-500 ease-premium ${
                    hoveredItem === idx ? 'opacity-100 translate-y-0' : 'opacity-70 translate-y-1'
                  }`}
                >
                  {images[idx].description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EditorialImageBlocks;
