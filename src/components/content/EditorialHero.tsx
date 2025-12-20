import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import heroImage from "@/assets/hero-image.png";

const EditorialHero = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const scrollToProducts = () => {
    document.getElementById("products")?.scrollIntoView({ behavior: "smooth" });
  };

  // Split headline for line-by-line mask reveal
  const headlineLines = ["Turning Waste", "Into Light"];

  return (
    <section ref={heroRef} className="min-h-screen relative">
      <div className="grid grid-cols-1 lg:grid-cols-2 min-h-screen">
        {/* Image - Left side */}
        <div className="relative h-[60vh] lg:h-screen order-1">
          <img
            src={heroImage}
            alt="Handcrafted lamp in warm interior"
            onLoad={() => setImageLoaded(true)}
            className={`w-full h-full object-cover transition-all duration-700 ease-editorial ${
              imageLoaded ? "opacity-100 scale-100" : "opacity-0 scale-105"
            }`}
          />
          {/* Subtle overlay for depth */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent to-background/10" />
          
          {/* Ambient glow effect on lamp - breathing animation */}
          <div 
            className={`absolute top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48 h-48 rounded-full pointer-events-none transition-opacity duration-1000 ${
              imageLoaded ? "opacity-100" : "opacity-0"
            }`}
            style={{
              background: 'radial-gradient(circle, hsl(38 90% 55% / 0.15) 0%, transparent 70%)',
              animation: 'ambientGlow 4s ease-in-out infinite',
            }}
          />
        </div>

        {/* Content - Right side */}
        <div className="flex flex-col justify-center px-8 lg:px-16 py-16 lg:py-0 order-2 bg-background">
          <div className="max-w-lg">
            {/* Category tag */}
            <span
              className={`inline-block text-xs tracking-[0.2em] uppercase text-olive mb-6 transition-all duration-500 ease-editorial ${
                isVisible && imageLoaded
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-4"
              }`}
              style={{ transitionDelay: "400ms" }}
            >
              Handcrafted Lighting
            </span>

            {/* Main headline - Line by line mask reveal */}
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl leading-[1.1] text-foreground mb-6">
              {headlineLines.map((line, index) => (
                <span key={index} className="block overflow-hidden">
                  <span
                    className={`block transition-transform duration-700 ease-editorial ${
                      isVisible && imageLoaded
                        ? "translate-y-0"
                        : "translate-y-full"
                    } ${index === 1 ? "italic text-olive" : ""}`}
                    style={{ transitionDelay: `${500 + index * 150}ms` }}
                  >
                    {line}
                  </span>
                </span>
              ))}
            </h1>

            {/* Description - fade in after headline */}
            <p
              className={`text-base lg:text-lg text-muted-foreground leading-relaxed mb-10 max-w-md transition-all duration-600 ease-editorial ${
                isVisible && imageLoaded
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-4"
              }`}
              style={{ transitionDelay: "800ms" }}
            >
              Each piece is cut, shaped, and assembled by hand using recycled
              glass bottles. No two lamps are ever the same.
            </p>

            {/* CTA Buttons - appear last with upward motion */}
            <div
              className={`flex items-center gap-6 transition-all duration-600 ease-editorial ${
                isVisible && imageLoaded
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-6"
              }`}
              style={{ transitionDelay: "1000ms" }}
            >
              <Link to="/category/shop">
                <Button
                  size="lg"
                  className="bg-charcoal text-charcoal-foreground hover:bg-charcoal/90 rounded-none px-8 py-6 text-sm tracking-wide transition-all duration-300"
                >
                  Explore Collection
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <button
                onClick={scrollToProducts}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-300 editorial-link"
              >
                View all lamps
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <button
        onClick={scrollToProducts}
        className={`absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-2 text-foreground/50 hover:text-foreground transition-all duration-500 ${
          isVisible && imageLoaded ? "opacity-100" : "opacity-0"
        }`}
        style={{ transitionDelay: "1200ms" }}
      >
        <span className="text-xs tracking-[0.2em] uppercase">Scroll</span>
        <div className="w-px h-8 bg-current animate-pulse" />
      </button>

      {/* Keyframe for ambient glow */}
      <style>{`
        @keyframes ambientGlow {
          0%, 100% {
            opacity: 0.6;
            transform: translate(-50%, -50%) scale(1);
          }
          50% {
            opacity: 1;
            transform: translate(-50%, -50%) scale(1.15);
          }
        }
      `}</style>
    </section>
  );
};

export default EditorialHero;
