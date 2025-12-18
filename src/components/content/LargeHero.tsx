import heroImage from "@/assets/hero-image.png";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowDown } from "lucide-react";

const LargeHero = () => {
  return (
    <section className="w-full relative min-h-[85vh] mb-16">
      {/* Background Image */}
      <div className="absolute inset-0 w-full h-full">
        <img 
          src={heroImage} 
          alt="Handcrafted lamp by Rebello Creations" 
          className="w-full h-full object-cover"
        />
      </div>
      
      {/* Content Overlay */}
      <div className="relative z-10 h-full min-h-[85vh] flex flex-col justify-center px-6 md:px-12 lg:px-20">
        <div className="max-w-xl">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-light text-white leading-tight mb-6 italic">
            Handcrafted Lamps That Turn Waste Into Light
          </h1>
          <p className="text-base md:text-lg text-white/90 font-light leading-relaxed mb-8 max-w-md">
            Transform your space with our sustainable lighting pieces, handmade from recycled bottles, metal, and industrial elements.
          </p>
          <Link to="/category/all">
            <Button 
              className="bg-teal-700 hover:bg-teal-800 text-white px-8 py-6 text-base rounded-full"
            >
              Shop Collection
            </Button>
          </Link>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 right-8 z-10 flex items-center gap-2 text-white/80">
        <span className="text-sm font-light">Scroll</span>
        <ArrowDown className="w-4 h-4" />
      </div>
    </section>
  );
};

export default LargeHero;
