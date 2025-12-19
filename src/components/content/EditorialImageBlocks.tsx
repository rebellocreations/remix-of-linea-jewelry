import { useEffect, useRef, useState } from "react";

interface EditorialImage {
  caption: string;
  description: string;
  size: "large" | "medium" | "small";
}

const EditorialImageBlocks = () => {
  const [visibleItems, setVisibleItems] = useState<Set<number>>(new Set());
  const sectionRef = useRef<HTMLElement>(null);

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

      {/* Masonry-style grid */}
      <div className="grid grid-cols-12 gap-4 lg:gap-6">
        {/* Large image */}
        <div
          data-index={0}
          className={`col-span-12 lg:col-span-8 transition-all duration-700 ease-editorial ${
            visibleItems.has(0)
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-8"
          }`}
        >
          <div className="aspect-[16/10] bg-beige relative overflow-hidden group">
            <div className="w-full h-full bg-gradient-to-br from-olive/20 to-beige flex items-center justify-center">
              <span className="font-serif text-xl text-muted-foreground italic">
                {images[0].caption}
              </span>
            </div>
            <div className="absolute inset-0 bg-charcoal/0 group-hover:bg-charcoal/10 transition-colors duration-500" />
          </div>
          <div className="mt-4">
            <h3 className="font-serif text-lg text-foreground">{images[0].caption}</h3>
            <p className="text-sm text-muted-foreground mt-1">{images[0].description}</p>
          </div>
        </div>

        {/* Medium image - stacked right */}
        <div className="col-span-12 lg:col-span-4 space-y-4 lg:space-y-6">
          <div
            data-index={1}
            className={`transition-all duration-700 ease-editorial ${
              visibleItems.has(1)
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
            style={{ transitionDelay: "100ms" }}
          >
            <div className="aspect-square bg-beige relative overflow-hidden group">
              <div className="w-full h-full bg-gradient-to-br from-amber/20 to-beige flex items-center justify-center">
                <span className="font-serif text-lg text-muted-foreground italic">
                  {images[1].caption}
                </span>
              </div>
              <div className="absolute inset-0 bg-charcoal/0 group-hover:bg-charcoal/10 transition-colors duration-500" />
            </div>
            <div className="mt-3">
              <p className="text-sm text-muted-foreground">{images[1].description}</p>
            </div>
          </div>

          <div
            data-index={2}
            className={`transition-all duration-700 ease-editorial ${
              visibleItems.has(2)
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
            style={{ transitionDelay: "200ms" }}
          >
            <div className="aspect-[4/3] bg-beige relative overflow-hidden group">
              <div className="w-full h-full bg-gradient-to-br from-charcoal/10 to-beige flex items-center justify-center">
                <span className="font-serif text-lg text-muted-foreground italic">
                  {images[2].caption}
                </span>
              </div>
              <div className="absolute inset-0 bg-charcoal/0 group-hover:bg-charcoal/10 transition-colors duration-500" />
            </div>
            <div className="mt-3">
              <p className="text-sm text-muted-foreground">{images[2].description}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EditorialImageBlocks;