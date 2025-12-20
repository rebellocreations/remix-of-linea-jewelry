import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const FeaturedCollection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Track scroll for gradient shift
  useEffect(() => {
    const handleScroll = () => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        const progress = Math.max(0, Math.min(1, 
          (window.innerHeight - rect.top) / (window.innerHeight + rect.height)
        ));
        setScrollProgress(progress);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Split headline for word-by-word reveal
  const headlineWords = ["The", "Amber", "Series"];

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[80vh] flex items-center justify-center overflow-hidden"
    >
      {/* Dynamic gradient background - shifts from charcoal to amber tint */}
      <div 
        className="absolute inset-0 transition-all duration-1000"
        style={{
          background: `linear-gradient(to bottom, 
            hsl(30 10% 12%) 0%, 
            hsl(30 10% ${12 + scrollProgress * 3}%) 50%, 
            hsl(38 ${20 + scrollProgress * 30}% ${15 + scrollProgress * 5}%) 100%
          )`,
        }}
      />
        
      {/* Subtle texture pattern */}
      <div 
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, rgba(255,255,255,0.15) 1px, transparent 0)`,
          backgroundSize: '32px 32px'
        }}
      />

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-2xl mx-auto">
        <span
          className={`inline-block text-xs tracking-[0.25em] uppercase text-amber mb-6 transition-all duration-600 ease-editorial ${
            isVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-4"
          }`}
        >
          New Collection
        </span>

        {/* Word by word headline reveal */}
        <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-charcoal-foreground leading-tight mb-6 flex flex-wrap justify-center gap-x-4">
          {headlineWords.map((word, index) => (
            <span key={index} className="overflow-hidden inline-block">
              <span
                className={`inline-block transition-transform duration-700 ease-editorial ${
                  isVisible
                    ? "translate-y-0"
                    : "translate-y-full"
                } ${word === "Amber" ? "italic text-amber" : ""}`}
                style={{ transitionDelay: `${100 + index * 150}ms` }}
              >
                {word}
              </span>
            </span>
          ))}
        </h2>

        <p
          className={`text-lg text-charcoal-foreground/70 mb-10 max-w-md mx-auto transition-all duration-700 ease-editorial ${
            isVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-4"
          }`}
          style={{ transitionDelay: "500ms" }}
        >
          Lamps crafted from whiskey bottles, each one uniquely shaped by its
          original vessel.
        </p>

        <Link
          to="/category/amber-series"
          className={`inline-block transition-all duration-700 ease-editorial ${
            isVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-4"
          }`}
          style={{ transitionDelay: "650ms" }}
        >
          <Button
            variant="outline"
            size="lg"
            className="border-charcoal-foreground/30 text-charcoal-foreground hover:bg-amber hover:text-charcoal hover:border-amber rounded-none px-8 py-6 text-sm tracking-wide transition-all duration-500"
          >
            Explore Collection
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>
      </div>
    </section>
  );
};

export default FeaturedCollection;
