import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const FeaturedCollection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isButtonHovered, setIsButtonHovered] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.25 }
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
      className="relative min-h-[85vh] flex items-center justify-center overflow-hidden"
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

      {/* Animated noise texture overlay */}
      <div 
        className="absolute inset-0 opacity-[0.06] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />
        
      {/* Subtle dot pattern */}
      <div 
        className="absolute inset-0 opacity-[0.08]"
        style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, rgba(255,255,255,0.12) 1px, transparent 0)`,
          backgroundSize: '32px 32px'
        }}
      />

      {/* Ambient glow orbs */}
      <div 
        className={`absolute w-96 h-96 rounded-full pointer-events-none transition-opacity duration-1000 ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}
        style={{
          top: '20%',
          left: '30%',
          background: 'radial-gradient(circle, hsl(38 90% 55% / 0.08) 0%, transparent 70%)',
          animation: 'glow-pulse 6s ease-in-out infinite',
        }}
      />
      <div 
        className={`absolute w-64 h-64 rounded-full pointer-events-none transition-opacity duration-1000 delay-300 ${
          isVisible ? "opacity-80" : "opacity-0"
        }`}
        style={{
          bottom: '25%',
          right: '25%',
          background: 'radial-gradient(circle, hsl(38 70% 50% / 0.06) 0%, transparent 70%)',
          animation: 'glow-pulse 5s ease-in-out infinite 1s',
        }}
      />

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-2xl mx-auto">
        <span
          className={`inline-block text-xs tracking-[0.25em] uppercase text-amber mb-8 transition-all duration-700 ease-premium ${
            isVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-4"
          }`}
        >
          New Collection
        </span>

        {/* Word by word headline reveal with blur */}
        <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-charcoal-foreground leading-tight mb-8 flex flex-wrap justify-center gap-x-4">
          {headlineWords.map((word, index) => (
            <span key={index} className="overflow-hidden inline-block">
              <span
                className={`inline-block transition-all duration-800 ease-premium ${
                  isVisible
                    ? "translate-y-0 blur-0 opacity-100"
                    : "translate-y-full blur-sm opacity-0"
                } ${word === "Amber" ? "italic text-amber" : ""}`}
                style={{ transitionDelay: `${150 + index * 180}ms` }}
              >
                {word}
              </span>
            </span>
          ))}
        </h2>

        <p
          className={`text-lg text-charcoal-foreground/70 mb-12 max-w-md mx-auto transition-all duration-800 ease-premium ${
            isVisible
              ? "opacity-100 translate-y-0 blur-0"
              : "opacity-0 translate-y-6 blur-sm"
          }`}
          style={{ transitionDelay: "600ms" }}
        >
          Lamps crafted from whiskey bottles, each one uniquely shaped by its
          original vessel.
        </p>

        <Link
          to="/category/amber-series"
          className={`inline-block transition-all duration-800 ease-premium ${
            isVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-6"
          }`}
          style={{ transitionDelay: "750ms" }}
          onMouseEnter={() => setIsButtonHovered(true)}
          onMouseLeave={() => setIsButtonHovered(false)}
        >
          <Button
            variant="outline"
            size="lg"
            className="relative border-charcoal-foreground/30 text-charcoal-foreground hover:text-charcoal hover:border-amber rounded-none px-10 py-7 text-sm tracking-wide transition-all duration-500 ease-premium overflow-hidden"
            style={{
              boxShadow: isButtonHovered 
                ? '0 0 40px hsl(38 90% 55% / 0.35), 0 0 80px hsl(38 90% 55% / 0.15)' 
                : 'none',
              backgroundColor: isButtonHovered ? 'hsl(38 90% 55%)' : 'transparent',
              transform: isButtonHovered ? 'translateY(-2px)' : 'translateY(0)',
            }}
          >
            Explore Collection
            <ArrowRight className={`ml-2 h-4 w-4 transition-transform duration-300 ${
              isButtonHovered ? 'translate-x-1' : ''
            }`} />
          </Button>
        </Link>
      </div>
    </section>
  );
};

export default FeaturedCollection;
