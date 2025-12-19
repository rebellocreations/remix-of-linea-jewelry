import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const FeaturedCollection = () => {
  const [isVisible, setIsVisible] = useState(false);
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

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[80vh] flex items-center justify-center overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-charcoal">
        {/* Gradient overlay for depth */}
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/80 to-charcoal/60" />
        
        {/* Subtle texture pattern */}
        <div 
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, rgba(255,255,255,0.15) 1px, transparent 0)`,
            backgroundSize: '32px 32px'
          }}
        />
      </div>

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

        <h2
          className={`font-serif text-4xl md:text-5xl lg:text-6xl text-charcoal-foreground leading-tight mb-6 transition-all duration-700 ease-editorial ${
            isVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-4"
          }`}
          style={{ transitionDelay: "100ms" }}
        >
          The <span className="italic text-amber">Amber</span> Series
        </h2>

        <p
          className={`text-lg text-charcoal-foreground/70 mb-10 max-w-md mx-auto transition-all duration-700 ease-editorial ${
            isVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-4"
          }`}
          style={{ transitionDelay: "200ms" }}
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
          style={{ transitionDelay: "300ms" }}
        >
          <Button
            variant="outline"
            size="lg"
            className="border-charcoal-foreground/30 text-charcoal-foreground hover:bg-charcoal-foreground hover:text-charcoal rounded-none px-8 py-6 text-sm tracking-wide transition-all duration-300"
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