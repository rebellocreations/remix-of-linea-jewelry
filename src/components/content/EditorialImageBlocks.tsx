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
  const sectionRef = useRef<HTMLElement>(null);

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

  // Visibility observer
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
      { threshold: 0.2, rootMargin: "50px" }
    );

    const items = sectionRef.current?.querySelectorAll("[data-index]");
    items?.forEach((item) => observer.observe(item));

    return () => observer.disconnect();
  }, []);

  // Auto-looping cross-fade for process visualization
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % images.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [images.length]);

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
    <section ref={sectionRef} className="px-6 lg:px-12 py-20 lg:py-32 relative">
      <div className="mb-12 lg:mb-16">
        <span className="text-xs tracking-[0.2em] uppercase text-olive mb-2 block">
          Behind the Craft
        </span>
        <h2 className="font-serif text-3xl lg:text-4xl text-foreground">
          Materials & Process
        </h2>
      </div>

      {/* Auto-looping process slideshow - visible on mobile */}
      <div className="lg:hidden mb-12 relative aspect-[4/3] overflow-hidden">
        {images.map((img, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ease-editorial ${
              activeSlide === index ? "opacity-100" : "opacity-0"
            }`}
          >
            <img
              src={img.image}
              alt={img.caption}
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-charcoal/80 to-transparent">
              <p className="font-serif text-lg text-charcoal-foreground">{img.caption}</p>
              <p className="text-sm text-charcoal-foreground/70 mt-1">{img.description}</p>
            </div>
          </div>
        ))}
        
        {/* Slide indicators */}
        <div className="absolute bottom-4 right-4 flex gap-2">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveSlide(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                activeSlide === index ? "bg-amber w-6" : "bg-charcoal-foreground/30"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Desktop grid layout with parallax */}
      <div className="hidden lg:grid grid-cols-12 gap-4 lg:gap-6">
        {/* Large image with parallax */}
        <div
          data-index={0}
          className={`col-span-8 transition-all duration-700 ease-editorial ${
            visibleItems.has(0)
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-8"
          }`}
          style={{
            filter: visibleItems.has(0) ? 'blur(0px)' : 'blur(8px)',
          }}
          onMouseEnter={() => setHoveredItem(0)}
          onMouseLeave={() => setHoveredItem(null)}
        >
          <div 
            className={`aspect-[16/10] relative overflow-hidden group transition-all duration-500 ease-editorial ${
              hoveredItem === 0 ? 'shadow-2xl -translate-y-2' : ''
            }`}
          >
            <img 
              src={images[0].image}
              alt={images[0].caption}
              className="w-full h-full object-cover transition-transform duration-700"
              style={{
                transform: `translateY(${scrollY * 20}px) scale(1.1)`,
              }}
            />
            
            {/* Warm glow on hover */}
            <div 
              className={`absolute inset-0 pointer-events-none transition-opacity duration-500 ${
                hoveredItem === 0 ? "opacity-100" : "opacity-0"
              }`}
              style={{
                background: 'radial-gradient(ellipse at center, hsl(38 90% 55% / 0.15) 0%, transparent 70%)',
              }}
            />
            <div className="absolute inset-0 bg-charcoal/0 group-hover:bg-charcoal/10 transition-colors duration-500" />
          </div>
          <div className="mt-4">
            <h3 className="font-serif text-lg text-foreground">{images[0].caption}</h3>
            <p 
              className={`text-sm text-muted-foreground mt-1 transition-all duration-500 ${
                hoveredItem === 0 ? 'opacity-100 translate-y-0' : 'opacity-70 translate-y-1'
              }`}
            >
              {images[0].description}
            </p>
          </div>
        </div>

        {/* Medium images - stacked right with parallax */}
        <div className="col-span-4 space-y-4 lg:space-y-6">
          {[1, 2].map((idx) => (
            <div
              key={idx}
              data-index={idx}
              className={`transition-all duration-700 ease-editorial ${
                visibleItems.has(idx)
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
              style={{ 
                transitionDelay: `${idx * 100}ms`,
                filter: visibleItems.has(idx) ? 'blur(0px)' : 'blur(8px)',
              }}
              onMouseEnter={() => setHoveredItem(idx)}
              onMouseLeave={() => setHoveredItem(null)}
            >
              <div 
                className={`${idx === 1 ? 'aspect-square' : 'aspect-[4/3]'} relative overflow-hidden group transition-all duration-500 ease-editorial ${
                  hoveredItem === idx ? 'shadow-2xl -translate-y-2' : ''
                }`}
              >
                <img 
                  src={images[idx].image}
                  alt={images[idx].caption}
                  className="w-full h-full object-cover transition-transform duration-700"
                  style={{
                    transform: `translateY(${scrollY * (15 + idx * 5)}px) scale(1.1)`,
                  }}
                />
                
                {/* Warm glow on hover */}
                <div 
                  className={`absolute inset-0 pointer-events-none transition-opacity duration-500 ${
                    hoveredItem === idx ? "opacity-100" : "opacity-0"
                  }`}
                  style={{
                    background: 'radial-gradient(ellipse at center, hsl(38 90% 55% / 0.15) 0%, transparent 70%)',
                  }}
                />
                <div className="absolute inset-0 bg-charcoal/0 group-hover:bg-charcoal/10 transition-colors duration-500" />
              </div>
              <div className="mt-3">
                <p 
                  className={`text-sm text-muted-foreground transition-all duration-500 ${
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
