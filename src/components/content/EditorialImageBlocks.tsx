import { useEffect, useRef, useState } from "react";

interface EditorialImage {
  caption: string;
  description: string;
  size: "large" | "medium" | "small";
}

const EditorialImageBlocks = () => {
  const [visibleItems, setVisibleItems] = useState<Set<number>>(new Set());
  const [hoveredItem, setHoveredItem] = useState<number | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const images: EditorialImage[] = [
    {
      caption: "Organic Forms",
      description: "Nature-inspired shapes formed through heat and hand-cut glass",
      size: "large",
    },
    {
      caption: "Industrial Craft",
      description: "Raw metal meets warm recycled glass",
      size: "medium",
    },
    {
      caption: "Warm Glow",
      description: "Filament bulbs casting amber light through textured surfaces",
      size: "medium",
    },
    {
      caption: "The Process",
      description: "Hands working, shaping, assembling each unique piece",
      size: "small",
    },
  ];

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

  // Horizontal scroll on desktop
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const handleWheel = (e: WheelEvent) => {
      if (window.innerWidth >= 1024) {
        e.preventDefault();
        container.scrollLeft += e.deltaY;
      }
    };

    container.addEventListener("wheel", handleWheel, { passive: false });
    return () => container.removeEventListener("wheel", handleWheel);
  }, []);

  return (
    <section ref={sectionRef} className="px-6 lg:px-12 py-20 lg:py-32">
      <div className="mb-12 lg:mb-16">
        <span className="text-xs tracking-[0.2em] uppercase text-olive mb-2 block">
          Behind the Craft
        </span>
        <h2 className="font-serif text-3xl lg:text-4xl text-foreground">
          Materials & Process
        </h2>
      </div>

      {/* Horizontal scrolling container on desktop */}
      <div 
        ref={scrollContainerRef}
        className="lg:flex lg:gap-6 lg:overflow-x-auto lg:pb-8 lg:-mx-6 lg:px-6 lg:scrollbar-hide grid grid-cols-12 gap-4"
        style={{ scrollBehavior: 'smooth' }}
      >
        {/* Large image */}
        <div
          data-index={0}
          className={`col-span-12 lg:col-span-8 lg:flex-shrink-0 lg:w-[60vw] transition-all duration-700 ease-editorial ${
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
            className={`aspect-[16/10] bg-beige relative overflow-hidden group transition-all duration-500 ease-editorial ${
              hoveredItem === 0 ? 'shadow-2xl -translate-y-1' : ''
            }`}
          >
            <div className="w-full h-full bg-gradient-to-br from-olive/20 to-beige flex items-center justify-center">
              <span className="font-serif text-xl text-muted-foreground italic">
                {images[0].caption}
              </span>
            </div>
            <div className="absolute inset-0 bg-charcoal/0 group-hover:bg-charcoal/10 transition-colors duration-500" />
          </div>
          <div className="mt-4">
            <h3 className="font-serif text-lg text-foreground">{images[0].caption}</h3>
            <p 
              className={`text-sm text-muted-foreground mt-1 transition-opacity duration-500 ${
                hoveredItem === 0 ? 'opacity-100' : 'opacity-70'
              }`}
            >
              {images[0].description}
            </p>
          </div>
        </div>

        {/* Medium images - stacked on mobile, horizontal on desktop */}
        <div className="col-span-12 lg:col-span-4 lg:flex-shrink-0 lg:w-[35vw] space-y-4 lg:space-y-6 lg:flex lg:flex-col">
          <div
            data-index={1}
            className={`flex-1 transition-all duration-700 ease-editorial ${
              visibleItems.has(1)
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
            style={{ 
              transitionDelay: "100ms",
              filter: visibleItems.has(1) ? 'blur(0px)' : 'blur(8px)',
            }}
            onMouseEnter={() => setHoveredItem(1)}
            onMouseLeave={() => setHoveredItem(null)}
          >
            <div 
              className={`aspect-square bg-beige relative overflow-hidden group transition-all duration-500 ease-editorial ${
                hoveredItem === 1 ? 'shadow-2xl -translate-y-1' : ''
              }`}
            >
              <div className="w-full h-full bg-gradient-to-br from-amber/20 to-beige flex items-center justify-center">
                <span className="font-serif text-lg text-muted-foreground italic">
                  {images[1].caption}
                </span>
              </div>
              <div className="absolute inset-0 bg-charcoal/0 group-hover:bg-charcoal/10 transition-colors duration-500" />
            </div>
            <div className="mt-3">
              <p 
                className={`text-sm text-muted-foreground transition-opacity duration-500 ${
                  hoveredItem === 1 ? 'opacity-100' : 'opacity-70'
                }`}
              >
                {images[1].description}
              </p>
            </div>
          </div>

          <div
            data-index={2}
            className={`flex-1 transition-all duration-700 ease-editorial ${
              visibleItems.has(2)
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
            style={{ 
              transitionDelay: "200ms",
              filter: visibleItems.has(2) ? 'blur(0px)' : 'blur(8px)',
            }}
            onMouseEnter={() => setHoveredItem(2)}
            onMouseLeave={() => setHoveredItem(null)}
          >
            <div 
              className={`aspect-[4/3] bg-beige relative overflow-hidden group transition-all duration-500 ease-editorial ${
                hoveredItem === 2 ? 'shadow-2xl -translate-y-1' : ''
              }`}
            >
              <div className="w-full h-full bg-gradient-to-br from-charcoal/10 to-beige flex items-center justify-center">
                <span className="font-serif text-lg text-muted-foreground italic">
                  {images[2].caption}
                </span>
              </div>
              <div className="absolute inset-0 bg-charcoal/0 group-hover:bg-charcoal/10 transition-colors duration-500" />
            </div>
            <div className="mt-3">
              <p 
                className={`text-sm text-muted-foreground transition-opacity duration-500 ${
                  hoveredItem === 2 ? 'opacity-100' : 'opacity-70'
                }`}
              >
                {images[2].description}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Hide scrollbar utility */}
      <style>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </section>
  );
};

export default EditorialImageBlocks;
