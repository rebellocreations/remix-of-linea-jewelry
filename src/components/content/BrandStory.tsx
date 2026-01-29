import { useEffect, useRef, useState } from "react";
import brandStoryImage from "@/assets/brand-story.jpg";

const BrandStory = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [imageInView, setImageInView] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.15 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Image visibility for blur-in effect
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setImageInView(true);
        }
      },
      { threshold: 0.2 }
    );

    if (imageRef.current) {
      observer.observe(imageRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Slow parallax effect for the image
  useEffect(() => {
    const handleScroll = () => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        const scrollProgress = (window.innerHeight - rect.top) / (window.innerHeight + rect.height);
        setScrollY(scrollProgress * 60); // Max 60px parallax
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
      <div className="flex flex-col justify-center px-6 sm:px-8 lg:px-16 py-16 md:py-24 lg:py-36 order-2 lg:order-1">
        <div className="max-w-md mx-auto lg:mx-0 text-center lg:text-left">
          <span
            className={`inline-block text-[10px] md:text-xs tracking-[0.2em] uppercase text-olive mb-6 md:mb-10 transition-all duration-700 ease-premium ${isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-4"
              }`}
          >
            Our Story
          </span>

          {/* Line by line paragraph reveal with blur */}
          <div className="space-y-5 md:space-y-7">
            {paragraphs.map((text, index) => (
              <div key={index} className="overflow-hidden">
                <p
                  className={`font-serif text-xl sm:text-2xl lg:text-3xl leading-relaxed text-foreground transition-all duration-800 ease-premium ${isVisible
                      ? "translate-y-0 opacity-100 blur-0"
                      : "translate-y-full opacity-0 blur-sm"
                    }`}
                  style={{ transitionDelay: `${(index + 1) * 150}ms` }}
                >
                  {text}
                </p>
              </div>
            ))}
          </div>

          {/* Read more link with enhanced underline animation */}
          <a
            href="/about/our-story"
            className={`inline-block mt-10 md:mt-14 text-xs md:text-sm tracking-wide text-muted-foreground hover:text-foreground transition-all duration-700 ease-premium editorial-link ${isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-4"
              }`}
            style={{ transitionDelay: "800ms" }}
          >
            Read the full story
          </a>
        </div>
      </div>

      {/* Image column with parallax and blur-in */}
      <div
        ref={imageRef}
        className="relative h-[40vh] sm:h-[50vh] lg:h-auto order-1 lg:order-2 overflow-hidden"
      >
        <div
          className={`absolute inset-0 transition-all duration-1000 ease-premium ${imageInView ? "scale-100 blur-0 opacity-100" : "scale-110 blur-md opacity-0"
            }`}
          style={{
            transform: `translateY(${scrollY}px) ${imageInView ? 'scale(1.05)' : 'scale(1.15)'}`,
          }}
        >
          <img
            src={brandStoryImage}
            alt="Artisan hands crafting a lamp from recycled glass"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Grain texture overlay */}
        <div
          className="absolute inset-0 pointer-events-none opacity-25 mix-blend-overlay"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          }}
        />

        {/* Subtle warm gradient overlay */}
        <div
          className={`absolute inset-0 pointer-events-none transition-opacity duration-1000 ${imageInView ? "opacity-100" : "opacity-0"
            }`}
          style={{
            background: 'linear-gradient(to top, hsl(38 40% 20% / 0.3) 0%, transparent 50%)',
          }}
        />
      </div>
    </section>
  );
};

export default BrandStory;
