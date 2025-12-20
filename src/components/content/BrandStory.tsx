import { useEffect, useRef, useState } from "react";

const BrandStory = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Parallax effect for the image
  useEffect(() => {
    const handleScroll = () => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        const scrollProgress = (window.innerHeight - rect.top) / (window.innerHeight + rect.height);
        setScrollY(scrollProgress * 50); // Max 50px parallax
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const paragraphs = [
    "Rebello Creations was born from the idea that waste does not need to disappear.",
    "It needs to be transformed.",
    "Each lamp begins its journey as a discarded bottle, rescued from landfills and given new purpose through heat, hand-cutting, and countless hours of careful assembly.",
    "We believe that sustainability isn't about sacrifice—it's about seeing beauty where others see waste.",
  ];

  return (
    <section
      ref={sectionRef}
      className="grid grid-cols-1 lg:grid-cols-2 min-h-screen"
    >
      {/* Text column */}
      <div className="flex flex-col justify-center px-8 lg:px-16 py-20 lg:py-32 order-2 lg:order-1">
        <div className="max-w-md">
          <span
            className={`inline-block text-xs tracking-[0.2em] uppercase text-olive mb-8 transition-all duration-600 ease-editorial ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-4"
            }`}
          >
            Our Story
          </span>

          {/* Line by line paragraph reveal */}
          <div className="space-y-6">
            {paragraphs.map((text, index) => (
              <div key={index} className="overflow-hidden">
                <p
                  className={`font-serif text-2xl lg:text-3xl leading-relaxed text-foreground transition-transform duration-700 ease-editorial ${
                    isVisible
                      ? "translate-y-0"
                      : "translate-y-full"
                  }`}
                  style={{ transitionDelay: `${(index + 1) * 150}ms` }}
                >
                  {text}
                </p>
              </div>
            ))}
          </div>

          {/* Read more link with underline animation */}
          <a
            href="/about/our-story"
            className={`inline-block mt-12 text-sm tracking-wide text-muted-foreground hover:text-foreground transition-all duration-600 ease-editorial editorial-link ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-4"
            }`}
            style={{ transitionDelay: "750ms" }}
          >
            Read the full story
          </a>
        </div>
      </div>

      {/* Image column with parallax and grain */}
      <div className="relative h-[60vh] lg:h-auto order-1 lg:order-2 overflow-hidden">
        <div
          className={`absolute inset-0 bg-beige transition-all duration-1000 ease-editorial ${
            isVisible ? "scale-100" : "scale-110"
          }`}
          style={{
            transform: `translateY(${scrollY}px) ${isVisible ? 'scale(1)' : 'scale(1.1)'}`,
          }}
        >
          {/* Placeholder - would use actual image */}
          <div className="w-full h-full bg-gradient-to-br from-beige to-olive/20 flex items-center justify-center">
            <div className="text-center text-muted-foreground">
              <p className="font-serif text-xl italic">Craft in progress</p>
              <p className="text-sm mt-2">Hands shaping glass</p>
            </div>
          </div>
        </div>
        
        {/* Grain texture overlay */}
        <div 
          className="absolute inset-0 pointer-events-none opacity-30 mix-blend-overlay"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          }}
        />
      </div>
    </section>
  );
};

export default BrandStory;
