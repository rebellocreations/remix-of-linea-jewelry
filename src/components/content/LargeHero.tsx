import heroImage from "@/assets/hero-image.png";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowDown } from "lucide-react";

const LargeHero = () => {
  return (
    <section className="w-full relative h-[90vh]">
      {/* Background Image */}
      <div className="absolute inset-0 w-full h-full">
        <img 
          src={heroImage} 
          alt="Handcrafted lamp by Rebello Creations" 
          className="w-full h-full object-cover"
        />
      </div>
      
      {/* Content Overlay */}
      <div className="relative z-10 h-full flex flex-col justify-center px-6 md:px-12 lg:px-20">
        <div className="max-w-xl">
          <h1 
            className="text-4xl md:text-5xl lg:text-6xl text-white leading-[1.1] mb-6 opacity-0 animate-fade-in"
            style={{ 
              fontFamily: 'Georgia, Times, serif',
              fontStyle: 'italic',
              fontWeight: 400,
              animationDelay: '0.2s',
              animationFillMode: 'forwards'
            }}
          >
            Handcrafted Lamps That Turn Waste Into Light
          </h1>
          <p 
            className="text-base md:text-lg text-white/90 font-light leading-relaxed mb-8 max-w-md opacity-0 animate-fade-in"
            style={{ 
              animationDelay: '0.5s',
              animationFillMode: 'forwards'
            }}
          >
            Transform your space with our sustainable lighting pieces, handmade from recycled bottles, metal, and industrial elements.
          </p>
          <div 
            className="opacity-0 animate-fade-in"
            style={{ 
              animationDelay: '0.8s',
              animationFillMode: 'forwards'
            }}
          >
            <Link to="/category/all">
              <Button 
                className="bg-teal-700 hover:bg-teal-800 text-white px-8 py-6 text-base rounded-full transition-all duration-300 hover:scale-105"
              >
                Shop Collection
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div 
        className="absolute bottom-8 right-8 z-10 flex items-center gap-2 text-white/80 opacity-0 animate-fade-in"
        style={{ 
          animationDelay: '1.1s',
          animationFillMode: 'forwards'
        }}
      >
        <span className="text-sm font-light tracking-wide">Scroll</span>
        <ArrowDown className="w-4 h-4 animate-bounce" />
      </div>

      {/* Slide Indicators */}
      <div 
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex items-center gap-2 opacity-0 animate-fade-in"
        style={{ 
          animationDelay: '1.1s',
          animationFillMode: 'forwards'
        }}
      >
        <div className="w-8 h-0.5 bg-white/40 rounded-full"></div>
        <div className="w-16 h-0.5 bg-white rounded-full"></div>
        <div className="w-8 h-0.5 bg-white/40 rounded-full"></div>
      </div>
    </section>
  );
};

export default LargeHero;
